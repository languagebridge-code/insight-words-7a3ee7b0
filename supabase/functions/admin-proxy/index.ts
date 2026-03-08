import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NETLIFY_BASE = "https://exquisite-croissant-4288dd.netlify.app";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { endpoint, params, apiKey } = await req.json();

    const allowedEndpoints = [
      "/.netlify/functions/admin-stats",
      "/.netlify/functions/get-flags",
    ];
    if (!allowedEndpoints.includes(endpoint)) {
      return new Response(JSON.stringify({ error: "Invalid endpoint" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use provided key or fall back to server secret
    const key = apiKey || Deno.env.get("NETLIFY_ADMIN_API_KEY");
    if (!key) {
      return new Response(JSON.stringify({ error: "No API key" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(endpoint, NETLIFY_BASE);
    if (params) {
      Object.entries(params).forEach(([k, v]) =>
        url.searchParams.set(k, v as string)
      );
    }

    const apiRes = await fetch(url.toString(), {
      headers: { "X-API-Key": key },
    });

    const contentType = apiRes.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await apiRes.text();
      console.error("Non-JSON from Netlify:", apiRes.status, text.substring(0, 200));
      return new Response(
        JSON.stringify({ error: "Upstream error", status: apiRes.status }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const text = await apiRes.text();
    return new Response(text, {
      status: apiRes.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("admin-proxy error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
