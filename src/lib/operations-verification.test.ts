import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verifyOperations } from '../../supabase/functions/_shared/operations-access';
const config = { authBase: 'https://auth.example.org', publicKey: 'test-public-key', azureBase: 'https://azure.example.org/api' };
const user = { id: 'admin-id', email: 'admin@languagebridge.app', email_confirmed_at: '2026-10-17' };
const layer = { userId: 'admin-id', email: 'admin@languagebridge.app', role: 'super_admin', permissions: ['view_dashboard'] };
test('missing and invalid JWTs are rejected before private reads', async () => {
  let calls = 0;
  const send: typeof fetch = async () => { calls++; return new Response('{}', { status: 401 }); };
  assert.equal((await verifyOperations(null, config, send)).ok, false);
  assert.equal(calls, 0);
  assert.deepEqual(await verifyOperations('Bearer invalid', config, send), { ok: false, status: 401, error: 'Identity verification failed' });
});
test('operations require confirmed designated email', async () => {
  for (const identity of [{ ...user, email: 'teacher@school.org' }, { ...user, email_confirmed_at: undefined }]) {
    let calls = 0; const send: typeof fetch = async () => { calls++; return Response.json(identity); };
    assert.deepEqual(await verifyOperations('Bearer test-token', config, send), { ok: false, status: 403, error: 'Not authorized' });
    assert.equal(calls, 1);
  }
});
test('operations require matching Azure super-admin and view_dashboard', async () => {
  for (const invalid of [{ ...layer, role: 'district_admin' }, { ...layer, permissions: [] }, { ...layer, permissions: 'view_dashboard' }, { ...layer, userId: 'other-id' }]) {
    const send: typeof fetch = async url => Response.json(String(url).endsWith('/auth/v1/user') ? user : invalid);
    assert.equal((await verifyOperations('Bearer test-token', config, send)).ok, false);
  }
  const send: typeof fetch = async url => Response.json(String(url).endsWith('/auth/v1/user') ? user : layer);
  assert.deepEqual(await verifyOperations('Bearer test-token', config, send), { ok: true, user });
});
test('Azure failure fails closed', async () => {
  const send: typeof fetch = async url => String(url).endsWith('/auth/v1/user') ? Response.json(user) : new Response('unavailable', { status: 500 });
  assert.deepEqual(await verifyOperations('Bearer test-token', config, send), { ok: false, status: 502, error: 'Operations verification failed' });
});