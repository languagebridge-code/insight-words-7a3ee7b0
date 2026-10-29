import { useState, useEffect, useCallback } from "react";
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { adminIdleExpired } from '@/lib/admin-policy';
import AdminNav from "./AdminNav";
import OverviewTab from "./OverviewTab";
import FlagsTab from "./FlagsTab";
import ActivityTab from "./ActivityTab";
import SignupsTab from "./SignupsTab";
import SchoolsTab from "./SchoolsTab";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const signOut = useCallback(async () => {
    setLeaving(true);
    await queryClient.cancelQueries(); queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: '/admin/login', search: { denied: false, updated: false }, replace: true });
  }, [navigate, queryClient]);
  useEffect(() => {
    let key: string | undefined;
    let active = true;
    void supabase.auth.getUser().then(({ data }) => { if (active && data.user) key = `lb-admin-activity:${data.user.id}`; });
    const check = () => {
      if (!key) return;
      const last = localStorage.getItem(key);
      if (!last || adminIdleExpired(Number(last), Date.now())) void signOut();
    };
    const activity = () => {
      if (!key) return;
      const last = localStorage.getItem(key);
      if (!last || adminIdleExpired(Number(last), Date.now())) { void signOut(); return; }
      localStorage.setItem(key, String(Date.now()));
    };
    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart', 'pointermove'];
    events.forEach(event => window.addEventListener(event, activity, { passive: true }));
    window.addEventListener('focus', check);
    document.addEventListener('visibilitychange', check);
    window.addEventListener('lb-admin-access-lost', signOut);
    const { data: { subscription } } = supabase.auth.onAuthStateChange(event => {
      if (event === 'SIGNED_OUT') { setLeaving(true); void navigate({ to: '/admin/login', search: { denied: false, updated: false }, replace: true }); }
      if (event === 'USER_UPDATED' || event === 'SIGNED_IN') void router.invalidate();
    });
    const timer = window.setInterval(check, 15000);
    return () => { active = false; clearInterval(timer); subscription.unsubscribe(); events.forEach(event => window.removeEventListener(event, activity)); window.removeEventListener('focus', check); document.removeEventListener('visibilitychange', check); window.removeEventListener('lb-admin-access-lost', signOut); };
  }, [navigate, router, signOut]);

  if (leaving) return null;

  return (
    <div className="min-h-screen" style={{ background: "#f7f7f7" }}>
      <AdminNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSignOut={signOut}
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        {activeTab === "overview" && (
          <OverviewTab
            onNavigateToFlags={() => setActiveTab("flags")}
            onAuthError={() => {}}
          />
        )}
        {activeTab === "flags" && <FlagsTab onAuthError={() => {}} />}
        {activeTab === "activity" && <ActivityTab onAuthError={() => {}} />}
        {activeTab === "signups" && <SignupsTab />}
        {activeTab === "schools" && <SchoolsTab />}
      </div>
    </div>
  );
};

export default AdminDashboard;
