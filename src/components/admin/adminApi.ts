import { supabase } from '@/integrations/supabase/client';
import type { SchoolRequest } from '@/lib/school-registry';

async function proxyFetch<T>(path: string, params: unknown = {}): Promise<T> {
  const { data, error } = await supabase.functions.invoke('admin-proxy', {
    body: { endpoint: path, params },
  });
  if (error) {
    const status = error.context?.status;
    if (status === 401 || status === 403) window.dispatchEvent(new Event('lb-operations-access-lost'));
    let message = 'Could not load operations data.';
    try { const body = await error.context?.json(); if (typeof body?.error === 'string') message = body.error; } catch { /* Generic fallback. */ }
    throw new OperationsDataError(message, status ?? 500);
  }
  return data as T;
}
export class OperationsDataError extends Error { constructor(message: string, public status: number) { super(message); } }
export function requestSchoolAdmin(input: SchoolRequest): Promise<unknown> { return proxyFetch('/school-admin', input); }

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
