import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';
import logo from '@/assets/languagebridge-logo-light.svg';

const ROLES = [
  'Teacher',
  'EL Mentor',
  'School/District Administrator',
  'Other Educator',
  'Just Exploring',
];

const schema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(255),
  password: z.string().min(6, 'Password must be at least 6 characters').max(72),
  role: z.string().min(1, 'Please choose your role'),
});

export function TTTAuthScreen() {
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signup') {
        const parsed = schema.safeParse({ fullName, email, password, role });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0]?.message ?? 'Invalid input');
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/teacher`,
            data: { full_name: parsed.data.fullName, role: parsed.data.role },
          },
        });
        if (error) {
          toast.error(
            error.message.includes('already registered')
              ? 'That email already has an account. Please log in instead.'
              : error.message,
          );
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) {
          toast.error(
            error.message === 'Invalid login credentials'
              ? 'Invalid email or password. Please try again.'
              : error.message,
          );
          return;
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #742a69 0%, #f37030 80%, #ffc755 100%)' }}
    >
      <header className="px-4 py-4 flex justify-center">
        <img src={logo} alt="LanguageBridge" className="h-8" />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-8">
        <div
          className="w-full max-w-md rounded-2xl p-6 shadow-xl"
          style={{ background: '#ffffff' }}
        >
          <h1 className="text-2xl font-bold" style={{ color: '#4a1a45' }}>
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-sm mt-1 mb-5" style={{ color: '#742a69' }}>
            {mode === 'signup'
              ? 'This helps us know who\u2019s using LanguageBridge so we can support you better.'
              : 'Log in to continue to Talk to Teacher.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="ttt-name" className="block text-sm font-medium mb-1" style={{ color: '#4a1a45' }}>
                  Full name
                </label>
                <input
                  id="ttt-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full rounded-lg border px-3 py-2.5 outline-hidden focus:ring-2"
                  style={{ borderColor: '#f5eaf4', color: '#4a1a45' }}
                />
              </div>
            )}

            <div>
              <label htmlFor="ttt-email" className="block text-sm font-medium mb-1" style={{ color: '#4a1a45' }}>
                Email address
              </label>
              <input
                id="ttt-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2.5 outline-hidden focus:ring-2"
                style={{ borderColor: '#f5eaf4', color: '#4a1a45' }}
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label htmlFor="ttt-role" className="block text-sm font-medium mb-1" style={{ color: '#4a1a45' }}>
                  Your role
                </label>
                <select
                  id="ttt-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full rounded-lg border px-3 py-2.5 bg-white outline-hidden focus:ring-2"
                  style={{ borderColor: '#f5eaf4', color: '#4a1a45' }}
                >
                  <option value="">Select your role</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="ttt-password" className="block text-sm font-medium mb-1" style={{ color: '#4a1a45' }}>
                Password
              </label>
              <input
                id="ttt-password"
                type="password"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2.5 outline-hidden focus:ring-2"
                style={{ borderColor: '#f5eaf4', color: '#4a1a45' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-3 font-semibold text-white disabled:opacity-60"
              style={{ background: 'linear-gradient(90deg, #f37030 0%, #ffc755 100%)' }}
            >
              {loading
                ? 'Please wait\u2026'
                : mode === 'signup'
                  ? 'Create account'
                  : 'Log in'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className="w-full text-sm mt-4 underline"
            style={{ color: '#742a69' }}
          >
            {mode === 'signup'
              ? 'Already have an account? Log in'
              : 'Need an account? Sign up'}
          </button>
        </div>
      </main>
    </div>
  );
}
