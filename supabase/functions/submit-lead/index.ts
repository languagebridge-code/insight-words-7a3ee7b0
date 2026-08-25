import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { buildCorsHeaders } from "../_shared/cors.ts";

const ZOHO_TOKEN_URL = "https://accounts.zoho.com/oauth/v2/token";
const ZOHO_MAIL_API = "https://mail.zoho.com/api/accounts";
const NOTIFY_TO = "contact@languagebridge.app";
const FROM_ADDRESS = "justin@languagebridge.app";

function escapeHtml(value: unknown): string {
  const map: Record<string, string> = {
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  };
  return String(value ?? "").replace(/[&<>"']/g, (m) => map[m]);
}

async function sendZohoEmail(to: string, subject: string, htmlContent: string): Promise<void> {
  const clientId = Deno.env.get("ZOHO_CLIENT_ID");
  const clientSecret = Deno.env.get("ZOHO_CLIENT_SECRET");
  const refreshToken = Deno.env.get("ZOHO_REFRESH_TOKEN");
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Zoho credentials not configured");
  }

  const tokenRes = await fetch(ZOHO_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) throw new Error("Failed to get Zoho access token");

  const accountsRes = await fetch(ZOHO_MAIL_API, {
    headers: { Authorization: `Zoho-oauthtoken ${tokenData.access_token}` },
  });
  const accountsData = await accountsRes.json();
  const accountId = accountsData?.data?.[0]?.accountId;
  if (!accountId) throw new Error("No Zoho Mail accounts found");

  const res = await fetch(`${ZOHO_MAIL_API}/${accountId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${tokenData.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fromAddress: FROM_ADDRESS, toAddress: to, subject, content: htmlContent }),
  });
  if (!res.ok) {
    console.error("Zoho send error", res.status);
    throw new Error("Zoho email failed");
  }
}

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = buildCorsHeaders(req, false);
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const json = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  try {
    const body = await req.json();
    const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

    const name = str(body.name);
    const email = str(body.email);
    const role = str(body.role);
    const source = str(body.source).slice(0, 100) || "website";
    const pagePath = str(body.pagePath).slice(0, 200);
    const message = str(body.message);

    if (!name || name.length > 200) return json({ error: "Please enter your name." }, 400);
    if (!email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Please enter a valid email address." }, 400);
    }
    if (role.length > 120) return json({ error: "Role is too long." }, 400);
    if (message.length > 2000) return json({ error: "Message is too long." }, 400);

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: dbError } = await supabaseAdmin.from("leads").insert({
      name,
      email,
      role: role || null,
      source,
      page_path: pagePath || null,
      message: message || null,
    });

    if (dbError) {
      console.error("Database error:", dbError);
      return json({ error: "Something went wrong. Please try again." }, 500);
    }

    // Notification + auto-reply are best-effort; the lead is already saved.
    try {
      await sendZohoEmail(
        NOTIFY_TO,
        `New lead: ${name}${role ? ` (${role})` : ""}`,
        `<h2>New LanguageBridge lead</h2>
         <p><strong>Name:</strong> ${escapeHtml(name)}</p>
         <p><strong>Email:</strong> ${escapeHtml(email)}</p>
         <p><strong>Role:</strong> ${escapeHtml(role || "Not provided")}</p>
         <p><strong>Source:</strong> ${escapeHtml(source)} ${escapeHtml(pagePath)}</p>
         <p><strong>Message:</strong><br>${escapeHtml(message || "None")}</p>`
      );
    } catch (e) {
      console.error("Notification email failed:", e);
    }

    try {
      await sendZohoEmail(
        email,
        "Thanks for reaching out to LanguageBridge",
        `<p>Hi ${escapeHtml(name.split(" ")[0])},</p>
         <p>Thanks for asking about LanguageBridge. I got your note and I'll get back to you personally within one business day with next steps and answers to anything you're wondering about.</p>
         <p>In the meantime, you can look through our compliance details and feature overview at <a href="https://www.languagebridge.app/faq">languagebridge.app/faq</a>.</p>
         <p>Talk soon,<br>Justin Bernard<br>Founder, LanguageBridge</p>`
      );
    } catch (e) {
      console.error("Auto-reply email failed:", e);
    }

    return json({ success: true }, 200);
  } catch (error) {
    console.error("submit-lead error:", error);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
};

serve(handler);
