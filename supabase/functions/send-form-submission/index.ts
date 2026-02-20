import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ZOHO_TOKEN_URL = "https://accounts.zoho.com/oauth/v2/token";
const ZOHO_MAIL_API = "https://mail.zoho.com/api/accounts";

async function getZohoAccessToken(): Promise<string> {
  const clientId = Deno.env.get("ZOHO_CLIENT_ID");
  const clientSecret = Deno.env.get("ZOHO_CLIENT_SECRET");
  const refreshToken = Deno.env.get("ZOHO_REFRESH_TOKEN");

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Zoho credentials not configured");
  }

  const response = await fetch(ZOHO_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();
  if (!data.access_token) {
    console.error("Zoho token error:", JSON.stringify(data));
    throw new Error("Failed to get Zoho access token");
  }

  return data.access_token;
}

async function getZohoAccountId(accessToken: string): Promise<string> {
  const response = await fetch(ZOHO_MAIL_API, {
    headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
  });

  const data = await response.json();
  if (!data.data || data.data.length === 0) {
    throw new Error("No Zoho Mail accounts found");
  }

  return data.data[0].accountId;
}

async function sendZohoEmail(
  to: string,
  subject: string,
  htmlContent: string
): Promise<void> {
  const accessToken = await getZohoAccessToken();
  const accountId = await getZohoAccountId(accessToken);

  const response = await fetch(`${ZOHO_MAIL_API}/${accountId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fromAddress: "justin@languagebridge.app",
      toAddress: to,
      subject,
      content: htmlContent,
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    console.error("Zoho send error:", JSON.stringify(result));
    throw new Error(`Zoho email failed [${response.status}]`);
  }

  console.log("Email sent successfully via Zoho Mail");
}

const mailchimpApiKey = Deno.env.get("MAILCHIMP_API_KEY");
const mailchimpAudienceId = "03cb9eee8c";

const addToMailchimp = async (email: string, firstName: string, lastName: string) => {
  if (!mailchimpApiKey) {
    console.error("MAILCHIMP_API_KEY not set");
    return;
  }

  const datacenter = mailchimpApiKey.split("-")[1];
  const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`anystring:${mailchimpApiKey}`)}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        merge_fields: { FNAME: firstName, LNAME: lastName },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Mailchimp error:", error);
    } else {
      console.log("Successfully added to Mailchimp:", email);
    }
  } catch (error) {
    console.error("Error adding to Mailchimp:", error);
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { type } = body;

    let emailHtml = "";
    let subject = "";

    if (type === "pilot") {
      subject = "New Ohio Pilot Application";
      emailHtml = `
        <h2>New Ohio Pilot Application</h2>
        <p><strong>Contact Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone || "Not provided"}</p>
        <p><strong>School/District:</strong> ${body.school}</p>
        <p><strong>Role:</strong> ${body.role}</p>
        <p><strong>Number of ELL Students:</strong> ${body.studentCount}</p>
        <p><strong>Primary Languages:</strong> ${body.languages}</p>
        <p><strong>How They Heard About Us:</strong> ${body.hearAbout || "Not specified"}</p>
        <p><strong>Grant Interest:</strong> ${body.grantInterest ? "Yes" : "No"}</p>
        <p><strong>Additional Info:</strong></p>
        <p>${body.additionalInfo || "None provided"}</p>
      `;
    } else if (type === "general") {
      subject = "New General Interest Form Submission";
      emailHtml = `
        <h2>New General Interest Form</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Organization:</strong> ${body.organization || "Not provided"}</p>
        <p><strong>Interest:</strong></p>
        <p>${body.interest}</p>
      `;

      const nameParts = body.name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      await addToMailchimp(body.email, firstName, lastName);
    } else if (type === "free-signup") {
      subject = "New Free Tier Signup";
      emailHtml = `
        <h2>New Free Tier Signup</h2>
        <p>A new user has signed up for the free tier and downloaded the extension.</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `;
    }

    const recipientEmail = type === "free-signup" ? "admin@languagebridge.app" : "contact@languagebridge.app";
    console.log(`Sending email to ${recipientEmail}`);

    await sendZohoEmail(recipientEmail, subject, emailHtml);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
