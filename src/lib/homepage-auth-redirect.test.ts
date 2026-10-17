import assert from "node:assert/strict";
import { test } from "node:test";
import { homepageAuthDestination } from "./homepage-auth-redirect";

for (const part of ["access_token=example", "type=invite", "type=recovery", "token_hash=example", "code=example"]) {
  for (const separator of ["?", "#"]) {
    test(`homepage redirects ${separator}${part} to dashboard`, () => {
      assert.equal(homepageAuthDestination(`/${separator}${part}`), `/dashboard${separator}${part}`);
    });
  }
}

test("preserves the entire query and hash byte for byte", () => {
  const suffix = "?utm_source=a%20b&state=x%2By&state=z#access_token=example%2Fvalue&type=invite&refresh_token=sample";
  assert.equal(homepageAuthDestination(`/${suffix}`), `/dashboard${suffix}`);
});

test("ordinary homepage links do not redirect", () => {
  assert.equal(homepageAuthDestination("/?utm_source=invite#demo"), null);
  assert.equal(homepageAuthDestination("/?type=other"), null);
});

test("does not redirect dashboard callbacks again", () => {
  assert.equal(homepageAuthDestination("/dashboard?code=example"), null);
});