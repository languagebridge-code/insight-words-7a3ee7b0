import { test as it, describe } from 'node:test';
import assert from 'node:assert/strict';
import { isAllowedAdmin, adminPasswordError, adminIdleExpired, ADMIN_IDLE_MS } from './admin-policy';
describe('admin rules', () => {
  it('allows only the configured administrator account', () => {
    assert.equal(isAllowedAdmin('admin@languagebridge.app', 'admin@languagebridge.app'), true);
    assert.equal(isAllowedAdmin('teacher@languagebridge.app', 'admin@languagebridge.app'), false);
    assert.equal(isAllowedAdmin(undefined, 'admin@languagebridge.app'), false);
    assert.equal(isAllowedAdmin('admin@languagebridge.app', undefined), false);
  });
  it('requires at least 12 password characters', () => {
    assert.notEqual(adminPasswordError('abcdefghijk', 'abcdefghijk'), null);
    assert.equal(adminPasswordError('abcdefghijkl', 'abcdefghijkl'), null);
  });
  it('requires matching confirmation', () => {
    assert.notEqual(adminPasswordError('abcdefghijkl', 'abcdefghijklX'), null);
  });
  it('expires exactly after 8 hours of inactivity', () => {
    assert.equal(ADMIN_IDLE_MS, 28800000);
    assert.equal(adminIdleExpired(1000, 28800999), false);
    assert.equal(adminIdleExpired(1000, 28801000), true);
  });
});