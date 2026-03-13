import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function getSupabase() {
  const url = Deno.env.get("SUPABASE_URL")!;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  return createClient(url, key);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { endpoint, params } = body;

    const supabase = getSupabase();

    // TTT usage from ttt_usage_log
    if (endpoint === "/ttt-usage") {
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

    // Extension usage from analytics_events
    if (endpoint === "/extension-usage") {
      const { data, error } = await supabase
        .from("analytics_events")
        .select("event_name, properties, user_id, session_id, created_at")
        .order("created_at", { ascending: false })
        .limit(1000);

      if (error) {
        console.error("Extension usage query error:", error);
        return new Response(JSON.stringify({ error: "Query failed" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const rows = data || [];
      const services = { translations: 0, tts: 0, stt: 0 };
      let totalCharacters = 0;
      const uniqueUsers = new Set<string>();
      const uniqueSessions = new Set<string>();

      for (const row of rows) {
        uniqueUsers.add(row.user_id);
        uniqueSessions.add(row.session_id);
        const chars = (row.properties as any)?.text_length || (row.properties as any)?.characters || 0;
        totalCharacters += typeof chars === "number" ? chars : parseInt(chars) || 0;

        if (row.event_name === "translation") services.translations++;
        else if (row.event_name === "tts") services.tts++;
        else if (row.event_name === "stt") services.stt++;
      }

      const result = {
        totals: {
          requests: services.translations + services.tts + services.stt,
          characters: totalCharacters,
          events: rows.length,
        },
        services,
        users: {
          total: uniqueUsers.size,
          sessions: uniqueSessions.size,
        },
        recentActivity: rows.slice(0, 20),
      };

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid endpoint" }), {
      status: 400,
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
