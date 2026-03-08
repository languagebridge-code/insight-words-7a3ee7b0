import type { AdminStats, FlagsResponse } from "./types";

const BASE_URL = "https://exquisite-croissant-4288dd.netlify.app";

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

async function apiFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const key = getApiKey();
  if (!key) throw new Error("NOT_AUTHENTICATED");

  const url = new URL(path, BASE_URL);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: { "X-API-Key": key },
  });

  if (res.status === 401 || res.status === 403) {
    clearApiKey();
    throw new Error("NOT_AUTHENTICATED");
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function fetchAdminStats(limit = 50): Promise<AdminStats> {
  return apiFetch<AdminStats>("/.netlify/functions/admin-stats", { limit: String(limit) });
}

export async function fetchFlags(status?: string, limit = 100): Promise<FlagsResponse> {
  const params: Record<string, string> = { limit: String(limit) };
  if (status && status !== "all") params.status = status;
  return apiFetch<FlagsResponse>("/.netlify/functions/get-flags", params);
}
