import { test } from 'node:test';
import assert from 'node:assert/strict';
import { OPERATIONS_IDLE_MS, operationsIdleExpired, needsOperationsIdle } from './operations-idle';
test('operations inactivity expires at eight hours, not before', () => {
  assert.equal(OPERATIONS_IDLE_MS, 28800000);
  assert.equal(operationsIdleExpired(1000, 28800999), false);
  assert.equal(operationsIdleExpired(1000, 28801000), true);
});
test('idle sign-out applies only to designated operations account with dashboard role', () => {
  assert.equal(needsOperationsIdle({ email: 'admin@languagebridge.app', role: 'super_admin', permissions: ['view_dashboard'] }), true);
  for (const role of ['champion', 'district_admin']) assert.equal(needsOperationsIdle({ email: 'teacher@school.org', role, permissions: ['view_dashboard'] }), false);
  assert.equal(needsOperationsIdle({ email: 'admin@languagebridge.app', role: 'district_admin', permissions: ['view_dashboard'] }), false);
});