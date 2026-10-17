import { createFileRoute } from "@tanstack/react-router";

// Server route: /api/lb-dashboard/*
//
// The ONLY path from languagebridge.app's dashboard to the LanguageBridge Azure
// backend. It forwards the signed-in user's Supabase access token; the backend
// verifies it and decides what that user may see. This proxy holds NO API key and
// makes NO access decisions — it only whitelists routes and passes the token on.
// (Same-origin, so CORS headers are informational only.)
//
// Frontend calls:  POST|GET|PUT  /api/lb-dashboard/<route>
//   with header   Authorization: Bearer <supabase session access_token>

// Route → allowed methods. Nothing else reaches the backend.
const ALLOWED: Record<string, string[]> = {
  "auth-layer": ["GET"],
  "insights/summary": ["POST"],
  "insights/students": ["POST"],
  dashboard: ["POST"],
  "flag-queue": ["GET"],
  "ops/health": ["GET"],
  "ops/overview": ["GET"],
  "ops/pricing": ["GET", "PUT"],
  "ops/districts": ["GET", "PUT"],
  "ops/invite": ["POST"],
};
const FLAG_ACTION = /^flag-queue\/[a-f0-9]{64}\/action$/; // POST

function cors(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type, apikey, x-client-info",
    "Content-Type": "application/json",
  };
}

const json = (status: number, body: unknown, headers: Record<string, string>) =>
  new Response(JSON.stringify(body), { status, headers });

async function handle(request: Request): Promise<Response> {
  const LB_API_BASE = process.env["LB_API_BASE"] ?? "";
  const ORIGIN = process.env["LB_DASHBOARD_ORIGIN"] ?? "https://languagebridge.app";
  const headers = cors(ORIGIN);

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (!LB_API_BASE) return json(500, { error: "PROXY_MISCONFIGURED", details: "LB_API_BASE not set" }, headers);

  const url = new URL(request.url);
  const route = url.pathname.replace(/^.*\/lb-dashboard\/?/, "");
  const allowed = ALLOWED[route] ?? (FLAG_ACTION.test(route) ? ["POST"] : null);
  if (!allowed) return json(404, { error: "UNKNOWN_ROUTE" }, headers);
  if (!allowed.includes(request.method)) return json(405, { error: "METHOD_NOT_ALLOWED" }, headers);

  const auth = request.headers.get("Authorization") ?? "";
  if (!auth.startsWith("Bearer ")) return json(401, { error: "MISSING_TOKEN" }, headers);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);
  try {
    const upstream = await fetch(`${LB_API_BASE}/${route}${url.search}`, {
      method: request.method,
      headers: { "Content-Type": "application/json", Authorization: auth },
      body: request.method === "GET" ? null : await request.text(),
      signal: controller.signal,
    });
    return new Response(await upstream.text(), { status: upstream.status, headers });
  } catch (err) {
    const aborted = (err as Error)?.name === "AbortError";
    return json(aborted ? 504 : 502, { error: aborted ? "REQUEST_TIMEOUT" : "PROXY_UPSTREAM_ERROR" }, headers);
  } finally {
    clearTimeout(timer);
  }
}

export const Route = createFileRoute("/api/lb-dashboard/$")({
  server: {
    handlers: {
      GET: ({ request }: { request: Request }) => handle(request),
      POST: ({ request }: { request: Request }) => handle(request),
      PUT: ({ request }: { request: Request }) => handle(request),
      OPTIONS: ({ request }: { request: Request }) => handle(request),
    },
  },
});
