import assert from "node:assert/strict";
import { test } from "node:test";
import { staffInviteOptions, staffPasswordResetOptions } from "./staff-invite-options";

test("staff invites return to the published dashboard", () => {
  assert.equal(staffInviteOptions().redirectTo, "https://languagebridge.app/dashboard");
});

test("staff password resets return to the published dashboard, not the requesting preview", () => {
  assert.equal(staffPasswordResetOptions().redirectTo, "https://languagebridge.app/dashboard");
});