import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactSubmission {
  name: string;
  email: string;
  school?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const submission: ContactSubmission = await req.json();
    
    console.log("Received contact form submission:", submission);

    // Insert into database
    const { data, error } = await supabaseClient
      .from("contact_submissions")
      .insert({
        name: submission.name,
        email: submission.email,
        school: submission.school,
        message: submission.message,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    console.log("Submission saved to database:", data);

    // Send confirmation email to sender
    try {
      await resend.emails.send({
        from: "LanguageBridge <onboarding@resend.dev>",
        to: [submission.email],
        subject: "We received your message!",
        html: `
          <h1>Thank you for contacting us, ${submission.name}!</h1>
          <p>We've received your message and will get back to you within 24 hours.</p>
          <p><strong>Your message:</strong></p>
          <p>${submission.message}</p>
          <p>Questions? Call us at (216) 800-6020.</p>
          <p>Best regards,<br>Justin & The LanguageBridge Team</p>
        `,
      });
      console.log("Confirmation email sent");
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
    }

    // Send notification email to admin
    try {
      await resend.emails.send({
        from: "LanguageBridge <onboarding@resend.dev>",
        to: ["contact@languagebridge.app"],
        subject: `New Contact Form: ${submission.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${submission.name}</p>
          <p><strong>Email:</strong> ${submission.email}</p>
          <p><strong>School:</strong> ${submission.school || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <p>${submission.message}</p>
        `,
      });
      console.log("Notification email sent to admin");
    } catch (emailError) {
      console.error("Error sending admin notification:", emailError);
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-contact-form:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while submitting your message. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
