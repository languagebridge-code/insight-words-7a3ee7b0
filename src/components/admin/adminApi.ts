import type { AdminStats, FlagsResponse } from "./types";

const BASE_URL = "https://exquisite-croissant-4288dd.netlify.app";

function getApiKey(): string | null {
  return localStorage.getItem("lb_admin_key");
}

export function setApiKey(key: string) {
  localStorage.setItem("lb_admin_key", key);
}

export function clearApiKey() {
  localStorage.removeItem("lb_admin_key");
}

export function hasApiKey(): boolean {
  return !!getApiKey();
}

async function apiFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const key = getApiKey();
  if (!key) throw new Error("NOT_AUTHENTICATED");

  const url = new URL(path, BASE_URL);
  url.searchParams.set("apiKey", key);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());

  if (res.status === 401) {
    clearApiKey();
    throw new Error("NOT_AUTHENTICATED");
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function fetchAdminStats(limit = 50): Promise<AdminStats> {
  return apiFetch<AdminStats>("/api/admin-stats", { limit: String(limit) });
}

export async function fetchFlags(status?: string, limit = 100): Promise<FlagsResponse> {
  const params: Record<string, string> = { limit: String(limit) };
  if (status && status !== "all") params.status = status;
  return apiFetch<FlagsResponse>("/api/get-flags", params);
}
