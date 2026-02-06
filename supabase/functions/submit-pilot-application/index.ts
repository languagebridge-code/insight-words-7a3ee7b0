import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PilotApplication {
  name: string;
  email: string;
  schoolName: string;
  role: string;
  numStudents: number;
  languages?: string;
  timeline?: string;
  heardFrom?: string;
  phone?: string;
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

    const application: PilotApplication = await req.json();
    
    console.log("Received pilot application:", application);

    // Insert into database
    const { data, error } = await supabaseClient
      .from("pilot_applications")
      .insert({
        name: application.name,
        email: application.email,
        school_name: application.schoolName,
        role: application.role,
        num_students: application.numStudents,
        languages: application.languages,
        timeline: application.timeline,
        heard_from: application.heardFrom,
        phone: application.phone,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    console.log("Application saved to database:", data);

    // Send confirmation email to applicant
    try {
      await resend.emails.send({
        from: "LanguageBridge <onboarding@resend.dev>",
        to: [application.email],
        subject: "Your LanguageBridge Pilot Application",
        html: `
          <h1>Thank you for your interest, ${application.name}!</h1>
          <p>We've received your pilot application for <strong>${application.schoolName}</strong>.</p>
          <p><strong>Application Details:</strong></p>
          <ul>
            <li>Number of Students: ${application.numStudents}</li>
            <li>Languages Needed: ${application.languages || "Not specified"}</li>
            <li>Desired Timeline: ${application.timeline || "Not specified"}</li>
          </ul>
          <p>We'll review your application and get back to you within 1-2 business days.</p>
          <p>Questions? Reply to this email or call us at (216) 800-6020.</p>
          <p>Best regards,<br>Justin & The LanguageBridge Team</p>
        `,
      });
      console.log("Confirmation email sent to applicant");
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
    }

    // Send notification email to admin
    try {
      await resend.emails.send({
        from: "LanguageBridge <onboarding@resend.dev>",
        to: ["contact@languagebridge.app"],
        subject: `New Pilot Application: ${application.schoolName}`,
        html: `
          <h2>New Pilot Application Received</h2>
          <p><strong>Name:</strong> ${application.name}</p>
          <p><strong>Email:</strong> ${application.email}</p>
          <p><strong>Phone:</strong> ${application.phone || "Not provided"}</p>
          <p><strong>School:</strong> ${application.schoolName}</p>
          <p><strong>Role:</strong> ${application.role}</p>
          <p><strong>Number of Students:</strong> ${application.numStudents}</p>
          <p><strong>Languages Needed:</strong> ${application.languages || "Not specified"}</p>
          <p><strong>Timeline:</strong> ${application.timeline || "Not specified"}</p>
          <p><strong>Heard From:</strong> ${application.heardFrom || "Not specified"}</p>
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
    console.error("Error in submit-pilot-application:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while submitting your application. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
