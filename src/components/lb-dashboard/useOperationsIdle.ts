import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { AuthLayer } from '@/lib/lb-dashboard-api';
import { needsOperationsIdle, operationsIdleExpired } from '@/lib/operations-idle';

export function useOperationsIdle(auth: AuthLayer) {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!needsOperationsIdle(auth)) return;
    const key = `lb-operations-activity:${auth.userId}`;
    let leaving = false;
    const exit = async () => {
      if (leaving) return;
      leaving = true;
      await queryClient.cancelQueries(); queryClient.clear();
      await supabase.auth.signOut();
    };
    const check = () => {
      const value = localStorage.getItem(key);
      if (value === null || operationsIdleExpired(Number(value), Date.now())) { void exit(); return false; }
      return true;
    };
    const activity = () => { if (check()) localStorage.setItem(key, String(Date.now())); };
    if (localStorage.getItem(key) === null) localStorage.setItem(key, String(Date.now()));
    check();
    const events = ['pointerdown', 'pointermove', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, activity, { passive: true }));
    window.addEventListener('focus', check); document.addEventListener('visibilitychange', check);
    window.addEventListener('lb-operations-access-lost', exit);
    const timer = window.setInterval(check, 15000);
    return () => { clearInterval(timer); events.forEach(event => window.removeEventListener(event, activity)); window.removeEventListener('focus', check); document.removeEventListener('visibilitychange', check); window.removeEventListener('lb-operations-access-lost', exit); };
  }, [auth, queryClient]);
}