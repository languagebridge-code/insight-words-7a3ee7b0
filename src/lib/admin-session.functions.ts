import { createServerFn } from '@tanstack/react-start';
import { setResponseHeader, setResponseStatus } from '@tanstack/react-start/server';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { isAllowedAdmin } from './admin-policy';

export const adminSession = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    setResponseHeader('Cache-Control', 'no-store');
    const { data, error } = await context.supabase.auth.getUser();
    if (error || !data.user) { setResponseStatus(401); return { isAdmin: false, status: 401 }; }
    if (!isAllowedAdmin(data.user.email, process.env['ADMIN_EMAILS'])) {
      setResponseStatus(403); return { isAdmin: false, status: 403 };
    }
    return { isAdmin: true, status: 200 };
  });