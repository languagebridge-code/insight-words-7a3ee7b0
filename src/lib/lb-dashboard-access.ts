// Additional restriction, never a role grant: Azure remains the role authority.
export const OPERATIONS_ADMIN_EMAIL = "admin@languagebridge.app";

export interface VerifiedDashboardUser {
  id: string;
  email?: string;
  email_confirmed_at?: string;
}

export function isOperationsAccount(user: VerifiedDashboardUser): boolean {
  return Boolean(user.email_confirmed_at) && user.email?.toLowerCase() === OPERATIONS_ADMIN_EMAIL;
}

export function isOperationsRoute(route: string): boolean {
  return route.startsWith("ops/") || route === "dashboard" || route === "flag-queue" || route.startsWith("flag-queue/");
}

export function hasOperationsRole(layer: { role?: string; isSuperAdmin?: boolean; permissions?: string[] }): boolean {
  return (layer.role === "super_admin" || layer.isSuperAdmin === true) && layer.permissions?.includes("view_dashboard") === true;
}

export function matchesDashboardIdentity(layer: { userId?: string; email?: string }, user: VerifiedDashboardUser): boolean {
  return layer.userId === user.id && Boolean(user.email) && layer.email?.toLowerCase() === user.email?.toLowerCase();
}