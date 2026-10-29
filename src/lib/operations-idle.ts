import { hasOperationsRole, OPERATIONS_ADMIN_EMAIL } from './lb-dashboard-access';
export const OPERATIONS_IDLE_MS = 8 * 60 * 60 * 1000;
export function operationsIdleExpired(last: number, now: number) { return !Number.isFinite(last) || now - last >= OPERATIONS_IDLE_MS; }
export function needsOperationsIdle(auth: { email: string; role?: string; isSuperAdmin?: boolean; permissions?: string[] }) {
  return auth.email.toLowerCase() === OPERATIONS_ADMIN_EMAIL && hasOperationsRole(auth);
}