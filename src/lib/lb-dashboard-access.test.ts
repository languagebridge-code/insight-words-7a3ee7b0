import { test } from "node:test";
import assert from "node:assert/strict";
import { isOperationsAccount, isOperationsRoute, hasOperationsRole, matchesDashboardIdentity } from "./lb-dashboard-access";

test("only confirmed admin@languagebridge.app can occupy the Operations seat", () => {
  const confirmed = { id: "admin-id", email_confirmed_at: "2026-10-17" };
  assert.equal(isOperationsAccount({ ...confirmed, email: "admin@languagebridge.app" }), true);
  assert.equal(isOperationsAccount({ ...confirmed, email: "languagebridge.contact@gmail.com" }), false);
  assert.equal(isOperationsAccount({ ...confirmed, email: "admin@languagebridge.app.attacker.com" }), false);
  assert.equal(isOperationsAccount({ id: "admin-id", email: "admin@languagebridge.app" }), false);
});

test("every Operations and flag endpoint is restricted, not district insight endpoints", () => {
  for (const route of ["ops/health", "ops/overview", "ops/pricing", "ops/districts", "ops/invite", "dashboard", "flag-queue", `flag-queue/${"a".repeat(64)}/action`]) assert.equal(isOperationsRoute(route), true);
  for (const route of ["auth-layer", "insights/summary", "insights/students"]) assert.equal(isOperationsRoute(route), false);
});

test("admin email does not grant a role without Azure dashboard permission", () => {
  assert.equal(hasOperationsRole({ role: "super_admin", permissions: ["view_dashboard"] }), true);
  assert.equal(hasOperationsRole({ role: "district_admin", permissions: ["view_dashboard"] }), false);
  assert.equal(hasOperationsRole({ role: "super_admin", permissions: [] }), false);
});

test("Azure auth-layer must belong to the verified signed-in user", () => {
  const user = { id: "admin-id", email: "languagebridge.contact@gmail.com" };
  assert.equal(matchesDashboardIdentity({ userId: "admin-id", email: "languagebridge.contact@gmail.com" }, user), true);
  assert.equal(matchesDashboardIdentity({ userId: "other-id", email: "languagebridge.contact@gmail.com" }, user), false);
});