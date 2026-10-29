import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { adminSession } from '@/lib/admin-session.functions';
import AdminAuthFrame from '@/components/admin/AdminAuthFrame';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/admin_/login')({
  validateSearch: (search: Record<string, unknown>) => ({ denied: search['denied'] === true || search['denied'] === 'true', updated: search['updated'] === true || search['updated'] === 'true' }),
  head: () => ({ meta: [
    { title: 'Admin sign in | LanguageBridge' }, { name: 'description', content: 'Sign in to LanguageBridge administration.' },
    { property: 'og:title', content: 'Admin sign in | LanguageBridge' }, { property: 'og:description', content: 'Sign in to LanguageBridge administration.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex, nofollow' },
  ] }),
  component: AdminLogin,
});
function AdminLogin() {
  const navigate = useNavigate();
  const checkAdmin = useServerFn(adminSession);
  const { denied, updated } = Route.useSearch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgot, setForgot] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { if (updated) toast.success('Password updated, please sign in', { id: 'admin-password-updated' }); }, [updated]);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setLoading(true); setError('');
    if (forgot) {
      try { await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/admin/reset-password` }); }
      catch { /* Same response regardless of account or delivery result. */ }
      finally { setSent(true); setLoading(false); }
      return;
    }
    try {
      const result = await supabase.auth.signInWithPassword({ email, password });
      if (result.error) { setError('Email or password is incorrect.'); return; }
      const access = await checkAdmin();
      if (!access.isAdmin) { await supabase.auth.signOut(); setError('This account does not have admin access.'); return; }
      if (result.data.user) localStorage.setItem(`lb-admin-activity:${result.data.user.id}`, String(Date.now()));
      setPassword('');
      await navigate({ to: '/admin', replace: true });
    } catch { await supabase.auth.signOut(); setError('Email or password is incorrect.'); }
    finally { setLoading(false); }
  };
  return <AdminAuthFrame title={forgot ? 'Reset admin password' : 'Admin sign in'}>
    {sent ? <p role="status" className="text-sm mb-6">If that email has an admin account, a reset link is on its way.</p> : <form onSubmit={submit} className="space-y-5">
      <div className="space-y-2"><Label htmlFor="admin-email">Email</Label><Input id="admin-email" type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} /></div>
      {!forgot && <div className="space-y-2"><Label htmlFor="admin-password">Password</Label><Input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /></div>}
      {(error || denied) && <p role="alert" className="text-destructive text-sm">{error || 'This account does not have admin access.'}</p>}
      <Button className="w-full" type="submit" disabled={loading}>{loading ? 'Please wait...' : forgot ? 'Send reset link' : 'Sign in'}</Button>
    </form>}
    <Button variant="link" className="w-full mt-3" onClick={() => { setForgot(!forgot); setSent(false); setError(''); setPassword(''); }}>{forgot ? 'Back to sign in' : 'Forgot password?'}</Button>
  </AdminAuthFrame>;
}