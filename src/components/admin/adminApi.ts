import type { AdminStats, FlagsResponse } from "./types";

const NETLIFY_BASE = "https://exquisite-croissant-4288dd.netlify.app";
const PROXY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-proxy`;

export function getApiKey(): string | null {
  return localStorage.getItem("languagebridge_admin_key");
}

export function setApiKey(key: string) {
  localStorage.setItem("languagebridge_admin_key", key);
}

export function clearApiKey() {
  localStorage.removeItem("languagebridge_admin_key");
}

export function hasApiKey(): boolean {
  return !!getApiKey();
}

async function directFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const key = getApiKey();
  if (!key) throw new Error("NOT_AUTHENTICATED");

  const url = new URL(path, NETLIFY_BASE);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: { "X-API-Key": key },
  });

  if (res.status === 401 || res.status === 403) {
    clearApiKey();
    throw new Error("NOT_AUTHENTICATED");
  }
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function proxyFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const key = getApiKey();
  if (!key) throw new Error("NOT_AUTHENTICATED");

  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint: path, params, apiKey: key }),
  });

  if (res.status === 401 || res.status === 403) {
    clearApiKey();
    throw new Error("NOT_AUTHENTICATED");
  }
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function smartFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  try {
    return await directFetch<T>(path, params);
  } catch (e: any) {
    if (e.message === "NOT_AUTHENTICATED") throw e;
    // CORS or network error — fall back to proxy
    return proxyFetch<T>(path, params);
  }
}

export async function fetchAdminStats(limit = 50): Promise<AdminStats> {
  return smartFetch<AdminStats>("/.netlify/functions/admin-stats", { limit: String(limit) });
}

export async function fetchFlags(status?: string, limit = 100): Promise<FlagsResponse> {
  const params: Record<string, string> = { limit: String(limit) };
  if (status && status !== "all") params.status = status;
  return smartFetch<FlagsResponse>("/.netlify/functions/get-flags", params);
}
