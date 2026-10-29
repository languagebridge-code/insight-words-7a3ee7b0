import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatDashboardMetric, seatUsagePercent } from './dashboard-metrics';

test('missing purchased seats from the live summary remain unavailable, not zero', () => {
  assert.equal(formatDashboardMetric(null), 'Not available');
  assert.equal(seatUsagePercent(45, null), null);
});
test('missing values and unavailable currency never throw or fabricate measurements', () => {
  for (const value of [null, undefined, NaN, Infinity]) {
    assert.equal(formatDashboardMetric(value), 'Not available');
    assert.equal(formatDashboardMetric(value, true), 'Not available');
  }
});
test('real zero, currency and known seat capacity are preserved', () => {
  assert.equal(formatDashboardMetric(0), '0');
  assert.equal(formatDashboardMetric(0.59, true), '$0.59');
  assert.equal(seatUsagePercent(45, 50), 90);
  assert.equal(seatUsagePercent(0, 50), 0);
  assert.equal(seatUsagePercent(45, 0), null);
});