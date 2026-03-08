const PROXY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-proxy`;

async function proxyFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint, params }),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
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
