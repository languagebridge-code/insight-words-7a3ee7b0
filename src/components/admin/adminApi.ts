import type { AdminStats, FlagsResponse } from "./types";

const PROXY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-proxy`;

async function proxyFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint: path, params }),
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchAdminStats(limit = 50): Promise<AdminStats> {
  return proxyFetch<AdminStats>("/.netlify/functions/admin-stats", { limit: String(limit) });
}

export async function fetchFlags(status?: string, limit = 100): Promise<FlagsResponse> {
  const params: Record<string, string> = { limit: String(limit) };
  if (status && status !== "all") params.status = status;
  return proxyFetch<FlagsResponse>("/.netlify/functions/get-flags", params);
}

export interface TttUsage {
  totals: { stt: number; translate: number; tts: number; characters: number; requests: number };
  recentActivity: Array<{ service: string; characters: number; success: boolean; created_at: string }>;
}

export async function fetchTttUsage(): Promise<TttUsage> {
  // Always goes through proxy (local DB query)
  return proxyFetch<TttUsage>("/ttt-usage", {});
}
