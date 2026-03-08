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
    const { endpoint, params } = await req.json();

    const allowedEndpoints = ["/api/admin-stats", "/api/get-flags"];
    if (!allowedEndpoints.includes(endpoint)) {
      return new Response(JSON.stringify({ error: "Invalid endpoint" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("NETLIFY_ADMIN_API_KEY");
    if (!apiKey) {
      console.error("NETLIFY_ADMIN_API_KEY not set");
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(endpoint, NETLIFY_BASE);
    url.searchParams.set("apiKey", apiKey);
    if (params) {
      Object.entries(params).forEach(([k, v]) =>
        url.searchParams.set(k, v as string)
      );
    }

    console.log("Proxying to:", url.pathname);

    const apiRes = await fetch(url.toString());
    const text = await apiRes.text();

    // Check if response is JSON
    const contentType = apiRes.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.error("Non-JSON response from Netlify:", apiRes.status, text.substring(0, 200));
      return new Response(
        JSON.stringify({ error: "Upstream returned non-JSON response", status: apiRes.status }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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
