import { schoolRequestSchema } from "./school-registry";

export async function forwardSchoolAdmin(input: unknown, email: string | undefined, config: { admins?: string | undefined; base?: string | undefined; key?: string | undefined }, send: typeof fetch = fetch) {
  const fail = (error: string, status: number) => ({ status, body: { error } as unknown });
  if (!email) return fail("Not signed in", 401);
  const admins = (config.admins ?? "").split(",").map(e => e.trim().toLowerCase()).filter(Boolean);
  if (!admins.includes(email.toLowerCase())) return fail("Not authorized", 403);
  if (!config.base || !config.key) return fail("Azure admin API not connected yet", 503);
  const parsed = schoolRequestSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid request", 400);
  const data = parsed.data;
  let base: URL;
  try { base = new URL(config.base); } catch { return fail("Azure admin API not connected yet", 503); }
  if (base.protocol !== "https:" || base.username || base.password || base.search || base.hash) return fail("Azure admin API not connected yet", 503);
  const url = `${base.href.replace(/\/$/, "")}/schools${data.action === "update" ? `/${encodeURIComponent(data.code)}` : ""}`;
  try {
    const res = await send(url, {
      method: data.action === "list" ? "GET" : data.action === "create" ? "POST" : "PATCH",
      headers: { "x-functions-key": config.key, "Content-Type": "application/json" },
      ...(data.action === "list" ? {} : { body: JSON.stringify(data.data) }),
      signal: AbortSignal.timeout(15000), redirect: "error",
    });
    const text = await res.text();
    let body: unknown;
    try { body = text ? JSON.parse(text) : {}; } catch { return fail("Azure admin API returned an invalid response", 502); }
    return { status: res.status, body };
  } catch { return fail("Unable to reach Azure admin API", 502); }
}