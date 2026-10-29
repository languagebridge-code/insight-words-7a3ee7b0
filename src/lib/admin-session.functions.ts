import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader, setResponseHeader, setResponseStatus } from '@tanstack/react-start/server';
import { createClient } from '@supabase/supabase-js';
import { isAllowedAdmin } from './admin-policy';

export const adminSession = createServerFn({ method: 'POST' })
  .handler(async () => {
    setResponseHeader('Cache-Control', 'no-store');
    const token = getRequestHeader('authorization')?.match(/^Bearer (.+)$/i)?.[1];
    if (!token) { setResponseStatus(401); return { isAdmin: false, status: 401 }; }
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    if (!url || !key) { setResponseStatus(503); return { isAdmin: false, status: 503 }; }
    const auth = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
        headers.set('apikey', key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { data, error } = await auth.auth.getUser(token);
    if (error || !data.user) { setResponseStatus(401); return { isAdmin: false, status: 401 }; }
    if (!isAllowedAdmin(data.user.email, process.env['ADMIN_EMAILS'])) {
      setResponseStatus(403); return { isAdmin: false, status: 403 };
    }
    return { isAdmin: true, status: 200 };
  });