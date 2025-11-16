import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterSubscription {
  email: string;
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

    const { email }: NewsletterSubscription = await req.json();
    
    console.log("Received newsletter subscription:", email);

    // Insert into database (will fail if email already exists due to UNIQUE constraint)
    const { data, error } = await supabaseClient
      .from("newsletter_subscriptions")
      .insert({ email })
      .select()
      .single();

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === "23505") {
        return new Response(
          JSON.stringify({ success: false, message: "This email is already subscribed" }),
          {
            status: 409,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
      console.error("Database error:", error);
      throw error;
    }

    console.log("Subscription saved to database:", data);

    // Send welcome email
    try {
      await resend.emails.send({
        from: "LanguageBridge <onboarding@resend.dev>",
        to: [email],
        subject: "Welcome to LanguageBridge Updates!",
        html: `
          <h1>Thanks for subscribing!</h1>
          <p>You're now subscribed to LanguageBridge updates.</p>
          <p>You'll receive:</p>
          <ul>
            <li>Product updates and new features</li>
            <li>Grant funding opportunities</li>
            <li>Success stories from schools</li>
            <li>Tips for supporting ELL students</li>
          </ul>
          <p>Questions? Reply to this email or call us at (216) 800-6020.</p>
          <p>Best regards,<br>Justin & The LanguageBridge Team</p>
        `,
      });
      console.log("Welcome email sent");
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
    }

    // Notify admin
    try {
      await resend.emails.send({
        from: "LanguageBridge <onboarding@resend.dev>",
        to: ["info@languagebridge.app"],
        subject: "New Newsletter Subscriber",
        html: `<p>New newsletter subscription: <strong>${email}</strong></p>`,
      });
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
    console.error("Error in subscribe-newsletter:", error);
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
