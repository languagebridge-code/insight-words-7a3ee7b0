import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const NETLIFY_BASE = "https://exquisite-croissant-4288dd.netlify.app";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const dashPassword = Deno.env.get("ADMIN_DASHBOARD_PASSWORD");

    if (!dashPassword) {
      return new Response(JSON.stringify({ error: "Not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Auth check action
    if (body.action === "auth") {
      if (body.password === dashPassword) {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify password on every data request
    if (body.password !== dashPassword) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate endpoint
    const { endpoint, params } = body;
    const allowedEndpoints = ["/api/admin-stats", "/api/get-flags"];
    if (!allowedEndpoints.includes(endpoint)) {
      return new Response(JSON.stringify({ error: "Invalid endpoint" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Proxy to Netlify
    const apiKey = Deno.env.get("NETLIFY_ADMIN_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const url = new URL(endpoint, NETLIFY_BASE);
    url.searchParams.set("apiKey", apiKey);
    if (params) {
      Object.entries(params).forEach(([k, v]) =>
        url.searchParams.set(k, v as string)
      );
    }

    const apiRes = await fetch(url.toString());
    const data = await apiRes.json();

    return new Response(JSON.stringify(data), {
      status: apiRes.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
