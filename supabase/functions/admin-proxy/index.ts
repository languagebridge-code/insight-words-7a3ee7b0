import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    const body = await req.json();
    const { endpoint, params, apiKey } = body;

    // Special endpoint: get TTT usage from local DB
    if (endpoint === "/ttt-usage") {
      const url = Deno.env.get("SUPABASE_URL");
      const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (!url || !serviceKey) {
        return new Response(JSON.stringify({ error: "Not configured" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const supabase = createClient(url, serviceKey);
      const { data, error } = await supabase
        .from("ttt_usage_log")
        .select("service, characters, success, created_at")
        .order("created_at", { ascending: false })
        .limit(500);

      if (error) {
        console.error("TTT usage query error:", error);
        return new Response(JSON.stringify({ error: "Query failed" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Aggregate
      const totals = { stt: 0, translate: 0, tts: 0, characters: 0, requests: 0 };
      for (const row of data || []) {
        totals.requests++;
        totals.characters += row.characters || 0;
        if (row.service === "stt") totals.stt++;
        else if (row.service === "translate") totals.translate++;
        else if (row.service === "tts") totals.tts++;
      }

      return new Response(JSON.stringify({ totals, recentActivity: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Netlify proxy endpoints
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
