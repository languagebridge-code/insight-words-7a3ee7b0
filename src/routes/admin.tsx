import { createFileRoute, redirect } from "@tanstack/react-router";
import Admin from "@/pages/Admin";
import { supabase } from '@/integrations/supabase/client';
import { adminSession } from '@/lib/admin-session.functions';
import { adminIdleExpired } from '@/lib/admin-policy';

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: async ({ context }) => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: '/admin/login', search: { denied: false, updated: false }, replace: true });
    let allowed = false;
    try { allowed = (await adminSession()).isAdmin; } catch { /* Fail closed. */ }
    const key = `lb-admin-activity:${data.user.id}`;
    const last = localStorage.getItem(key);
    if (!allowed || (last !== null && adminIdleExpired(Number(last), Date.now()))) {
      await context.queryClient.cancelQueries(); context.queryClient.clear();
      await supabase.auth.signOut();
      throw redirect({ to: '/admin/login', search: { denied: !allowed, updated: false }, replace: true });
    }
    if (last === null) localStorage.setItem(key, String(Date.now()));
    return { adminUserId: data.user.id };
  },
  head: () => ({
    meta: [
      {
            "title": "LanguageBridge Administration"
      },
      {
            "name": "description",
            "content": "Authorized LanguageBridge account administration."
      },
      {
            "property": "og:title",
            "content": "LanguageBridge Administration"
      },
      {
            "property": "og:description",
            "content": "Authorized LanguageBridge account administration."
      },
      {
            "property": "og:type",
            "content": "website"
      },
      {
            "name": "twitter:card",
            "content": "summary_large_image"
      },
      {
            "name": "robots",
            "content": "noindex, nofollow"
      }
]
  }),
  component: Admin,
});
