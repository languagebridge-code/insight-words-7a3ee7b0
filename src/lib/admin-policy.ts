export const ADMIN_IDLE_MS = 8 * 60 * 60 * 1000;
export function isAllowedAdmin(email: string | undefined, allowlist: string | undefined) {
  return !!email && (allowlist ?? '').split(',').map(value => value.trim().toLowerCase()).filter(Boolean).includes(email.toLowerCase());
}
export function adminPasswordError(password: string, confirmation: string) {
  if (password.length < 12) return 'Use at least 12 characters.';
  if (password !== confirmation) return 'Passwords must match.';
  return null;
}
export function adminIdleExpired(lastActivity: number, now: number) {
  return !Number.isFinite(lastActivity) || now - lastActivity >= ADMIN_IDLE_MS;
}