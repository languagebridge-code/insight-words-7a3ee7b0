import assert from "node:assert/strict";
import { test } from "node:test";
import { redirectToStaffDashboard } from "../routes/teacher-auth";

test("legacy teacher sign-in redirects to the shared staff dashboard", () => {
  assert.throws(() => redirectToStaffDashboard(""), (result: unknown) => {
    const redirect = result as { options: { to: string; replace: boolean } };
    assert.equal(redirect.options.to, "/dashboard");
    assert.equal(redirect.options.replace, true);
    return true;
  });
});

test("legacy teacher links preserve password-recovery hashes", () => {
  const hash = "type=recovery&access_token=test-recovery-token";
  assert.throws(() => redirectToStaffDashboard(hash), (result: unknown) => {
    const redirect = result as { options: { hash: string } };
    assert.equal(redirect.options.hash, hash);
    return true;
  });
});