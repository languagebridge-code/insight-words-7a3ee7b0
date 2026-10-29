// Dependency-free policy shared by Edge and TanStack server handlers.
export const OPERATIONS_ADMIN_EMAIL = 'admin@languagebridge.app';
export interface VerifiedDashboardUser { id: string; email?: string; email_confirmed_at?: string }
export function isOperationsAccount(user: VerifiedDashboardUser): boolean {
  return Boolean(user.email_confirmed_at) && user.email?.toLowerCase() === OPERATIONS_ADMIN_EMAIL;
}
export function isOperationsRoute(route: string): boolean {
  return route.startsWith('ops/') || route === 'dashboard' || route === 'flag-queue' || route.startsWith('flag-queue/');
}
export function hasOperationsRole(layer: { role?: string; isSuperAdmin?: boolean; permissions?: string[] }): boolean {
  return (layer.role === 'super_admin' || layer.isSuperAdmin === true) && Array.isArray(layer.permissions) && layer.permissions.includes('view_dashboard');
}
export function matchesDashboardIdentity(layer: { userId?: string; email?: string }, user: VerifiedDashboardUser): boolean {
  return layer.userId === user.id && Boolean(user.email) && layer.email?.toLowerCase() === user.email?.toLowerCase();
}
export type OperationsVerification = { ok: true; user: VerifiedDashboardUser } | { ok: false; status: number; error: string };
export async function verifyOperations(authorization: string | null, config: { authBase?: string | undefined; publicKey?: string | undefined; azureBase?: string | undefined }, send: typeof fetch = fetch): Promise<OperationsVerification> {
  const fail = (status: number, error: string): OperationsVerification => ({ ok: false, status, error });
  if (!authorization || !/^Bearer\s+\S+$/i.test(authorization)) return fail(401, 'Not signed in');
  if (!config.authBase || !config.publicKey || !config.azureBase) return fail(503, 'Operations verification is not connected');
  try {
    const signal = AbortSignal.timeout(15000);
    const identity = await send(`${config.authBase.replace(/\/$/, '')}/auth/v1/user`, { headers: { apikey: config.publicKey, Authorization: authorization }, signal, redirect: 'error' });
    if (!identity.ok) return fail(identity.status >= 500 ? 502 : 401, 'Identity verification failed');
    const user = await identity.json() as VerifiedDashboardUser;
    if (!user.id) return fail(401, 'Identity verification failed');
    if (!isOperationsAccount(user)) return fail(403, 'Not authorized');
    const role = await send(`${config.azureBase.replace(/\/$/, '')}/auth-layer`, { headers: { Authorization: authorization }, signal, redirect: 'error' });
    if (!role.ok) return fail(role.status === 401 || role.status === 403 ? role.status : 502, 'Operations verification failed');
    const layer = await role.json();
    if (!layer || !matchesDashboardIdentity(layer, user) || !hasOperationsRole(layer)) return fail(403, 'Not authorized');
    return { ok: true, user };
  } catch { return fail(502, 'Operations verification failed'); }
}