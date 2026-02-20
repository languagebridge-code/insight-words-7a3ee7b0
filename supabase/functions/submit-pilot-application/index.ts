import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Server-side input validation
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const schoolName = typeof body.schoolName === "string" ? body.schoolName.trim() : "";
    const role = typeof body.role === "string" ? body.role.trim() : "";
    const numStudents = typeof body.numStudents === "number" ? body.numStudents : 0;
    const languages = typeof body.languages === "string" ? body.languages.trim() : "";
    const timeline = typeof body.timeline === "string" ? body.timeline.trim() : "";
    const heardFrom = typeof body.heardFrom === "string" ? body.heardFrom.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    if (!name || name.length > 200) {
      return new Response(JSON.stringify({ error: "Name is required (max 200 characters)." }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "A valid email address is required." }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!schoolName || schoolName.length > 300) {
      return new Response(JSON.stringify({ error: "School name is required (max 300 characters)." }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!role || role.length > 100) {
      return new Response(JSON.stringify({ error: "Role is required (max 100 characters)." }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (numStudents < 0 || numStudents > 100000) {
      return new Response(JSON.stringify({ error: "Number of students must be between 0 and 100,000." }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Use service role key to bypass RLS (no public INSERT policy exists)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: dbError } = await supabaseAdmin
      .from("pilot_applications")
      .insert({
        name,
        email,
        school_name: schoolName,
        role,
        num_students: numStudents,
        languages: languages || null,
        timeline: timeline || null,
        heard_from: heardFrom || null,
        phone: phone || null,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "An error occurred. Please try again." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send confirmation email to applicant
    try {
      await resend.emails.send({
        from: "LanguageBridge <onboarding@resend.dev>",
        to: [email],
        subject: "Your LanguageBridge Pilot Application",
        html: `
          <h1>Thank you for your interest, ${escapeHtml(name)}!</h1>
          <p>We've received your pilot application for <strong>${escapeHtml(schoolName)}</strong>.</p>
          <p><strong>Application Details:</strong></p>
          <ul>
            <li>Number of Students: ${numStudents}</li>
            <li>Languages Needed: ${escapeHtml(languages || "Not specified")}</li>
            <li>Desired Timeline: ${escapeHtml(timeline || "Not specified")}</li>
          </ul>
          <p>We'll review your application and get back to you within 1-2 business days.</p>
          <p>Questions? Reply to this email or call us at (216) 800-6020.</p>
          <p>Best regards,<br>Justin &amp; The LanguageBridge Team</p>
        `,
      });
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
    }

    // Send notification email to admin
    try {
      await resend.emails.send({
        from: "LanguageBridge <onboarding@resend.dev>",
        to: ["contact@languagebridge.app"],
        subject: `New Pilot Application: ${escapeHtml(schoolName)}`,
        html: `
          <h2>New Pilot Application Received</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
          <p><strong>School:</strong> ${escapeHtml(schoolName)}</p>
          <p><strong>Role:</strong> ${escapeHtml(role)}</p>
          <p><strong>Number of Students:</strong> ${numStudents}</p>
          <p><strong>Languages Needed:</strong> ${escapeHtml(languages || "Not specified")}</p>
          <p><strong>Timeline:</strong> ${escapeHtml(timeline || "Not specified")}</p>
          <p><strong>Heard From:</strong> ${escapeHtml(heardFrom || "Not specified")}</p>
        `,
      });
    } catch (emailError) {
      console.error("Error sending admin notification:", emailError);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in submit-pilot-application:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while submitting your application. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
