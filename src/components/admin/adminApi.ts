import { supabase } from '@/integrations/supabase/client';

async function proxyFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const { data, error } = await supabase.functions.invoke('admin-proxy', {
    body: { endpoint: path, params },
  });
  if (error) {
    if (error.context?.status === 401 || error.context?.status === 403) window.dispatchEvent(new Event('lb-admin-access-lost'));
    throw new Error('Could not load admin data.');
  }
  return data as T;
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

export interface Signup {
  full_name: string;
  email: string;
  role: string | null;
  organization: string;
  created_at: string;
}

export async function fetchExtensionUsage(): Promise<ExtensionUsage> {
  return proxyFetch<ExtensionUsage>("/extension-usage", {});
}

export async function fetchTttUsage(): Promise<TttUsage> {
  return proxyFetch<TttUsage>("/ttt-usage", {});
}

export async function fetchSignups(): Promise<Signup[]> {
  const res = await proxyFetch<{ signups: Signup[] }>("/signups");
  return res.signups;
}
