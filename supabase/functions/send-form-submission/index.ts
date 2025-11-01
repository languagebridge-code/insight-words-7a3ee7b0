import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
        <p><strong>School Name:</strong> ${body.schoolName}</p>
        <p><strong>District:</strong> ${body.district}</p>
        <p><strong>Contact Name:</strong> ${body.contactName}</p>
        <p><strong>Role:</strong> ${body.role}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Number of ELL Students:</strong> ${body.studentCount}</p>
        <p><strong>Grade Levels:</strong> ${body.grades}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message}</p>
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
    }

    console.log("Sending email to languagebridge.contact@gmail.com");

    const emailResponse = await resend.emails.send({
      from: "LanguageBridge <onboarding@resend.dev>",
      to: ["languagebridge.contact@gmail.com"],
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
