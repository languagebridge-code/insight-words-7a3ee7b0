import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { supabase } from '@/integrations/supabase/client';
import { adminSession } from '@/lib/admin-session.functions';
import { adminPasswordError } from '@/lib/admin-policy';
import AdminAuthFrame from '@/components/admin/AdminAuthFrame';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/admin_/reset-password')({
  head: () => ({ meta: [
    { title: 'Reset admin password | LanguageBridge' }, { name: 'description', content: 'Secure password recovery for LanguageBridge administrators.' },
    { property: 'og:title', content: 'Reset admin password | LanguageBridge' }, { property: 'og:description', content: 'Secure password recovery for LanguageBridge administrators.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex, nofollow' },
  ] }), component: AdminReset,
});
function AdminReset() {
  const navigate = useNavigate();
  const checkAdmin = useServerFn(adminSession);
  const [state, setState] = useState<'checking' | 'ready' | 'invalid'>('checking');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    let active = true;
    const authorize = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user || !(await checkAdmin()).isAdmin) { if (active) setState('invalid'); return; }
        if (active) setState('ready');
      } catch { if (active) setState('invalid'); }
    };
    const { data: { subscription } } = supabase.auth.onAuthStateChange(event => {
      if (event === 'PASSWORD_RECOVERY') void authorize();
    });
    const initialize = async () => {
      const hash = new URLSearchParams(window.location.hash.slice(1));
      const query = new URLSearchParams(window.location.search);
      const type = hash.get('type') ?? query.get('type');
      try {
        if (query.get('error') || hash.get('error')) throw new Error('Invalid link');
        const tokenHash = query.get('token_hash');
        const code = query.get('code');
        if (tokenHash && (type === 'recovery' || type === 'invite')) {
          const result = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
          if (result.error) throw result.error;
        } else if (code) {
          // getSession waits for the client's automatic URL-code exchange.
          const result = await supabase.auth.getSession();
          if (result.error || !result.data.session) throw new Error('Invalid link');
        } else if (type !== 'recovery' && type !== 'invite') throw new Error('Invalid link');
        else {
          const result = await supabase.auth.getSession();
          if (result.error || !result.data.session) throw new Error('Invalid link');
        }
        await authorize();
        window.history.replaceState(null, '', '/admin/reset-password');
      } catch { if (active) setState('invalid'); }
    };
    void initialize();
    return () => { active = false; subscription.unsubscribe(); };
  }, [checkAdmin]);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); const issue = adminPasswordError(password, confirmation);
    if (issue) { setError(issue); return; }
    setSaving(true); setError('');
    try {
      if (!(await checkAdmin()).isAdmin) throw new Error('Access denied');
      const result = await supabase.auth.updateUser({ password });
      if (result.error) throw result.error;
      await supabase.auth.signOut();
      await navigate({ to: '/admin/login', search: { updated: true, denied: false }, replace: true });
    } catch { setError('Password could not be updated. Please request a new reset link.'); }
    finally { setSaving(false); }
  };
  return <AdminAuthFrame title="Set admin password">
    {state === 'checking' ? <p role="status">Checking your reset link...</p> : state === 'invalid' ? <div><p role="alert" className="text-sm mb-4">This reset link is invalid or expired. Please request a new one.</p><Link to="/admin/login" search={{ denied: false, updated: false }} className="text-primary underline">Back to admin sign in</Link></div> : <form onSubmit={submit} className="space-y-5">
      <div className="space-y-2"><Label htmlFor="new-admin-password">New password</Label><Input id="new-admin-password" type="password" autoComplete="new-password" minLength={12} required value={password} onChange={e => setPassword(e.target.value)} /></div>
      <div className="space-y-2"><Label htmlFor="confirm-admin-password">Confirm password</Label><Input id="confirm-admin-password" type="password" autoComplete="new-password" minLength={12} required value={confirmation} onChange={e => setConfirmation(e.target.value)} /></div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={saving}>{saving ? 'Saving...' : 'Update password'}</Button>
    </form>}
  </AdminAuthFrame>;
}