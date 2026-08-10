const ALLOWED_ORIGINS = [
  "https://www.languagebridge.app",
  "https://languagebridge.app",
  "https://insight-words.lovable.app",
];

const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/[a-z0-9-]+\.lovable\.app$/i,
  /^https:\/\/[a-z0-9-]+\.lovableproject\.com$/i,
  /^http:\/\/localhost(:\d+)?$/i,
];

const BASE_HEADERS = {
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Vary": "Origin",
};

function isAllowed(origin: string, allowExtensions: boolean): boolean {
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(origin))) return true;
  if (allowExtensions && /^chrome-extension:\/\/[a-p]+$/i.test(origin)) return true;
  return false;
}

/**
 * Build CORS headers for a request, restricting the allowed origin to
 * known LanguageBridge properties. Pass allowExtensions=true for endpoints
 * that are legitimately called from the Chrome extension.
 */
export function buildCorsHeaders(req: Request, allowExtensions = false): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  const allowOrigin = isAllowed(origin, allowExtensions) ? origin : ALLOWED_ORIGINS[0];
  return { ...BASE_HEADERS, "Access-Control-Allow-Origin": allowOrigin };
}
