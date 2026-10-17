import assert from "node:assert/strict";
import { test } from "node:test";
import { staffInviteOptions } from "./staff-invite-options";

test("staff invites return to the published dashboard", () => {
  assert.equal(staffInviteOptions().redirectTo, "https://languagebridge.app/dashboard");
});