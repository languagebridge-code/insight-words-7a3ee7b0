// lb-proxy — the ONLY place the LanguageBridge shared API key is used.
// Forwards three whitelisted routes to the LanguageBridge Azure Functions.
//
// Secrets: LB_API_KEY (required), LB_API_BASE (optional override).

import { buildCorsHeaders } from "../_shared/cors.ts";

const LB_API_BASE = Deno.env.get("LB_API_BASE") || "https://languagebridge-api.azurewebsites.net/api";
const LB_API_KEY = Deno.env.get("LB_API_KEY") || "";

const ALLOWED = new Set(["speech-to-text", "translate", "tts-router"]);

Deno.serve(async (req) => {
  const cors = { ...buildCorsHeaders(req), "Content-Type": "application/json" };

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "METHOD_NOT_ALLOWED" }), { status: 405, headers: cors });
  }

  const route = new URL(req.url).pathname.split("/").filter(Boolean).pop() || "";
  if (!ALLOWED.has(route)) {
    return new Response(JSON.stringify({ error: "UNKNOWN_ROUTE" }), { status: 404, headers: cors });
  }
  if (!LB_API_KEY) {
    console.error("[lb-proxy] LB_API_KEY not set");
    return new Response(JSON.stringify({ error: "PROXY_MISCONFIGURED" }), { status: 500, headers: cors });
  }

  const rawBody = await req.text();

  // STT bodies are large (base64 audio) — allow up to ~45s of 16kHz WAV.
  const timeout = route === "speech-to-text" ? 40000 : 20000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const upstream = await fetch(`${LB_API_BASE}/${route}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-lb-api-key": LB_API_KEY },
      body: rawBody,
      signal: controller.signal,
    });
    const text = await upstream.text();
    return new Response(text, { status: upstream.status, headers: cors });
  } catch (err) {
    const aborted = (err as Error)?.name === "AbortError";
    console.error("[lb-proxy] upstream failure:", (err as Error)?.message);
    return new Response(
      JSON.stringify({ error: aborted ? "REQUEST_TIMEOUT" : "PROXY_UPSTREAM_ERROR" }),
      { status: aborted ? 504 : 502, headers: cors },
    );
  } finally {
    clearTimeout(timer);
  }
});
