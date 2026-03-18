import type { FlagsResponse } from "./types";

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

export interface ExtensionUsage {
  totals: { requests: number; characters: number; events: number };
  services: { translations: number; tts: number; stt: number };
  users: { total: number; sessions: number; downloads: number };
  recentActivity: Array<{ event_name: string; properties: any; user_id: string; created_at: string }>;
}

export interface TttUsage {
  totals: { stt: number; translate: number; tts: number; characters: number; requests: number };
  recentActivity: Array<{ service: string; characters: number; success: boolean; created_at: string }>;
}

export async function fetchExtensionUsage(): Promise<ExtensionUsage> {
  return proxyFetch<ExtensionUsage>("/extension-usage", {});
}

export async function fetchTttUsage(): Promise<TttUsage> {
  return proxyFetch<TttUsage>("/ttt-usage", {});
}
