import { describe, it, expect } from 'vitest';
import { isAllowedAdmin, adminPasswordError, adminIdleExpired, ADMIN_IDLE_MS } from './admin-policy';
describe('admin rules', () => {
  it('allows only the configured administrator account', () => {
    expect(isAllowedAdmin('admin@languagebridge.app', 'admin@languagebridge.app')).toBe(true);
    expect(isAllowedAdmin('teacher@languagebridge.app', 'admin@languagebridge.app')).toBe(false);
    expect(isAllowedAdmin(undefined, 'admin@languagebridge.app')).toBe(false);
    expect(isAllowedAdmin('admin@languagebridge.app', undefined)).toBe(false);
  });
  it('requires at least 12 password characters', () => {
    expect(adminPasswordError('abcdefghijk', 'abcdefghijk')).not.toBeNull();
    expect(adminPasswordError('abcdefghijkl', 'abcdefghijkl')).toBeNull();
  });
  it('requires matching confirmation', () => {
    expect(adminPasswordError('abcdefghijkl', 'abcdefghijklX')).not.toBeNull();
  });
  it('expires exactly after 8 hours of inactivity', () => {
    expect(ADMIN_IDLE_MS).toBe(28800000);
    expect(adminIdleExpired(1000, 28800999)).toBe(false);
    expect(adminIdleExpired(1000, 28801000)).toBe(true);
  });
});