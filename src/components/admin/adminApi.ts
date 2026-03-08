import { supabase } from "@/integrations/supabase/client";

const PROXY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-proxy`;

async function getAuthHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("NOT_AUTHENTICATED");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function proxyFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const headers = await getAuthHeaders();
  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ endpoint, params }),
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error("NOT_AUTHENTICATED");
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${res.status} - ${text}`);
  }
  return res.json();
}

export async function fetchAdminStats(limit = 50) {
  return proxyFetch<any>("/api/admin-stats", { limit: String(limit) });
}

export async function fetchFlags(status?: string, limit = 100) {
  const params: Record<string, string> = { limit: String(limit) };
  if (status && status !== "all") params.status = status;
  return proxyFetch<any>("/api/get-flags", params);
}
