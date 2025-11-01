import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PilotApplicationData {
  type: "pilot";
  schoolName: string;
  district: string;
  contactName: string;
  role: string;
  email: string;
  phone: string;
  studentCount: string;
  grades: string;
  message: string;
}

interface GeneralInterestData {
  type: "general";
  name: string;
  email: string;
  organization?: string;
  interest: string;
}

type FormSubmission = PilotApplicationData | GeneralInterestData;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: FormSubmission = await req.json();
    console.log("Received form submission:", data.type);

    let emailHtml = "";
    let emailSubject = "";

    if (data.type === "pilot") {
      emailSubject = `New Pilot Application: ${data.schoolName}`;
      emailHtml = `
        <h2>New Pilot Application Received</h2>
        <h3>School Information</h3>
        <p><strong>School Name:</strong> ${data.schoolName}</p>
        <p><strong>District:</strong> ${data.district}</p>
        <p><strong>Student Count:</strong> ${data.studentCount}</p>
        <p><strong>Grade Levels:</strong> ${data.grades}</p>
        
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${data.contactName}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        
        <h3>School's Needs</h3>
        <p>${data.message}</p>
      `;
    } else {
      emailSubject = `New General Interest: ${data.name}`;
      emailHtml = `
        <h2>New General Interest Received</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.organization ? `<p><strong>Organization:</strong> ${data.organization}</p>` : ""}
        
        <h3>Their Interest</h3>
        <p>${data.interest}</p>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "LanguageBridge <onboarding@resend.dev>",
      to: ["languagebridge.contact@gmail.com"],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-form-submission function:", error);
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
