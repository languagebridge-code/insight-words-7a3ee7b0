import { test } from "node:test";
import assert from "node:assert/strict";
import { generatedSchoolCode, schoolCodePattern, schoolFormSchema, itPolicy, visibleSchools, type School } from "./school-registry";
import { forwardSchoolAdmin } from "./school-admin.server";
test("district abbreviation is uppercased in OLEN-CO-01", () => assert.equal(generatedSchoolCode("olen", "CO", "01"), "OLEN-CO-01"));
test("codes require 3 to 5 letters, a supported region, and two digits", () => {
  for (const code of ["ABC-NEO-01", "ABCDE-INT-99", "OLEN-CO-01", "ABC-NWO-01", "ABC-SEO-01", "ABC-SWO-01"]) assert.equal(schoolCodePattern.test(code), true);
  for (const code of ["AB-CO-01", "ABCDEF-CO-01", "ABC-XX-01", "ABC-CO-1", "abc-CO-01"]) assert.equal(schoolCodePattern.test(code), false);
});
test("license end must be strictly after start", () => {
  assert.equal(schoolFormSchema.safeParse({ districtName: "Olentangy", status: "pilot", licenseStart: "2026-10-29", licenseEnd: "2026-10-29" }).success, false);
  assert.equal(schoolFormSchema.safeParse({ districtName: "Olentangy", status: "pilot", licenseStart: "2026-10-29", licenseEnd: "2027-08-29" }).success, true);
});
test("seat cap is a nonnegative whole number", () => { for (const seatCap of [-1, 2.5]) assert.equal(schoolFormSchema.safeParse({ districtName: "Olentangy", status: "pilot", seatCap }).success, false); });
test("only 10mo and 12mo terms are accepted", () => { for (const licenseTerm of ["10mo", "12mo"]) assert.equal(schoolFormSchema.safeParse({ districtName: "Olentangy", status: "pilot", licenseTerm }).success, true); assert.equal(schoolFormSchema.safeParse({ districtName: "Olentangy", status: "pilot", licenseTerm: "24mo" }).success, false); });
test("IT policy contains exactly schoolCode.Value", () => assert.deepEqual(JSON.parse(itPolicy("OLEN-CO-01")), { schoolCode: { Value: "OLEN-CO-01" } }));
test("sort by region then code and filter district search", () => {
  const rows: School[] = [{ code: "ZZZ-NEO-01", region: "NEO", districtName: "North", status: "active" }, { code: "OLEN-CO-02", region: "CO", districtName: "Olentangy", status: "pilot" }, { code: "OLEN-CO-01", region: "CO", districtName: "Olentangy", status: "active" }];
  assert.deepEqual(visibleSchools(rows, "all", "all", "").map(s => s.code), ["OLEN-CO-01", "OLEN-CO-02", "ZZZ-NEO-01"]);
  assert.deepEqual(visibleSchools(rows, "CO", "active", "olentangy").map(s => s.code), ["OLEN-CO-01"]);
});
test("unsigned and non-admin requests never reach Azure", async () => {
  let calls = 0; const send: typeof fetch = async () => { calls++; return new Response("[]"); };
  const config = { admins: "admin@languagebridge.app", base: "https://example.org/api", key: "test-only" };
  assert.equal((await forwardSchoolAdmin({ action: "list" }, undefined, config, send)).status, 401);
  assert.deepEqual((await forwardSchoolAdmin({ action: "list" }, "teacher@example.org", config, send)).body, { error: "Not authorized" });
  assert.equal(calls, 0);
});
test("admin sees not connected when Azure secrets are absent", async () => assert.deepEqual(await forwardSchoolAdmin({ action: "list" }, "admin@languagebridge.app", { admins: "admin@languagebridge.app" }), { status: 503, body: { error: "Azure admin API not connected yet" } }));
test("bridge uses exact list/create/update API shapes and preserves Azure errors", async () => {
  const calls: { url: string; init: RequestInit | undefined }[] = [];
  const send: typeof fetch = async (url, init) => { calls.push({ url: String(url), init }); return new Response(JSON.stringify({ error: "Code already exists" }), { status: 409 }); };
  const config = { admins: " ADMIN@languagebridge.app ", base: "https://example.org/api/", key: "test-only" };
  await forwardSchoolAdmin({ action: "list" }, "admin@languagebridge.app", config, send);
  const result = await forwardSchoolAdmin({ action: "create", data: { code: "OLEN-CO-01", districtName: "Olentangy", status: "pilot" } }, "admin@languagebridge.app", config, send);
  await forwardSchoolAdmin({ action: "update", code: "OLEN-CO-01", data: { status: "expired" } }, "admin@languagebridge.app", config, send);
  assert.equal(calls[0]?.init?.method, "GET"); assert.equal(calls[0]?.init?.body, undefined);
  assert.equal(calls[1]?.init?.method, "POST"); assert.equal(calls[2]?.url, "https://example.org/api/schools/OLEN-CO-01"); assert.equal(calls[2]?.init?.method, "PATCH");
  assert.deepEqual(JSON.parse(String(calls[2]?.init?.body)), { status: "expired" });
  assert.deepEqual(result, { status: 409, body: { error: "Code already exists" } });
});