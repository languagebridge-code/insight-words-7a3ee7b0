import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const mailchimpApiKey = Deno.env.get("MAILCHIMP_API_KEY");
const mailchimpAudienceId = "03cb9eee8c";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const addToMailchimp = async (email: string, firstName: string, lastName: string) => {
  if (!mailchimpApiKey) {
    console.error("MAILCHIMP_API_KEY not set");
    return;
  }

  // Extract datacenter from API key (e.g., "key-us1" -> "us1")
  const datacenter = mailchimpApiKey.split("-")[1];
  const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(`anystring:${mailchimpApiKey}`)}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
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

      // Add to Mailchimp mailing list
      const nameParts = body.name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      await addToMailchimp(body.email, firstName, lastName);
    }

    console.log("Sending email to contact@languagebridge.app");

    const emailResponse = await resend.emails.send({
      from: "LanguageBridge <noreply@languagebridge.app>",
      to: ["contact@languagebridge.app"],
      subject: subject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
