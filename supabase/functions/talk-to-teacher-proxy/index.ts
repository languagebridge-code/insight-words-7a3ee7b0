import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type Endpoint = "speechRecognition" | "translate" | "textToSpeech";

const DEFAULT_BASE = "https://api.languagebridge.app";
const FALLBACK_NETLIFY_BASE = Deno.env.get("TTT_NETLIFY_BASE") || "";
const TRIAL_KEY = Deno.env.get("TTT_TRIAL_KEY") || "trial_march2026";

function endpointPath(base: string, endpoint: Endpoint): string {
  // Supports both:
  // - https://api.languagebridge.app/api/<endpoint>
  // - https://<site>.netlify.app/.netlify/functions/<endpoint>
  if (base.includes("/.netlify/functions")) {
    return `${base.replace(/\/$/, "")}/${endpoint}`;
  }
  return `${base.replace(/\/$/, "")}/api/${endpoint}`;
}

async function parseJsonSafely(res: Response): Promise<any> {
  const contentType = res.headers.get("content-type") || "";

  if (!contentType.toLowerCase().includes("application/json")) {
    const textResponse = await res.text();
    const preview = textResponse.substring(0, 240);

    console.error("[talk-to-teacher-proxy] Expected JSON but got:", contentType || "unknown");
    console.error("[talk-to-teacher-proxy] Response preview:", preview);

    if (preview.trim().startsWith("<!") || preview.toLowerCase().includes("<html")) {
      throw new Error(`Upstream returned HTML (status ${res.status}).`);
    }

    throw new Error(`Unexpected upstream response format: ${contentType || "unknown"}`);
  }

  return res.json();
}

async function forwardWithFallback(endpoint: Endpoint, payload: Record<string, unknown>) {
  const primaryBase = Deno.env.get("TTT_UPSTREAM_BASE") || DEFAULT_BASE;
  const bases = [primaryBase, FALLBACK_NETLIFY_BASE].filter(Boolean);

  const errors: string[] = [];

  for (const base of bases) {
    const url = endpointPath(base, endpoint);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${TRIAL_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await parseJsonSafely(res);

      if (!res.ok) {
        const msg = data?.message || data?.error || `Upstream error (${res.status})`;
        errors.push(`${url} -> ${msg}`);
        continue;
      }

      console.log(`[talk-to-teacher-proxy] Success via ${url}`);
      return { data, source: url };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push(`${url} -> ${message}`);
      console.error(`[talk-to-teacher-proxy] Failed via ${url}:`, message);
    }
  }

  throw new Error(errors.join(" | "));
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const endpoint = body?.endpoint as Endpoint;
    const payload = (body?.payload || {}) as Record<string, unknown>;

    if (!endpoint || !["speechRecognition", "translate", "textToSpeech"].includes(endpoint)) {
      return new Response(
        JSON.stringify({ error: "Invalid endpoint." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data } = await forwardWithFallback(endpoint, payload);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown proxy error";

    return new Response(
      JSON.stringify({ success: false, error: `Load failed: ${message}` }),
      {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
