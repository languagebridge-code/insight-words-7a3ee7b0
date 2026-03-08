import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLogin from "./AdminLogin";
import AdminNav from "./AdminNav";
import OverviewTab from "./OverviewTab";
import FlagsTab from "./FlagsTab";
import ActivityTab from "./ActivityTab";
import { Skeleton } from "@/components/ui/skeleton";

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: isAdmin } = await supabase.rpc("has_role", {
          _user_id: session.user.id,
          _role: "admin",
        });
        setAuthenticated(!!isAdmin);
      }
      setChecking(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        setAuthenticated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAuthenticated(false);
  };

  const handleAuthError = () => {
    setAuthenticated(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5eaf4" }}>
        <Skeleton className="h-64 w-96 rounded-xl" />
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onAuthenticated={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen" style={{ background: "#f7f7f7" }}>
      <AdminNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSignOut={handleSignOut}
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        {activeTab === "overview" && (
          <OverviewTab
            onNavigateToFlags={() => setActiveTab("flags")}
            onAuthError={handleAuthError}
          />
        )}
        {activeTab === "flags" && <FlagsTab onAuthError={handleAuthError} />}
        {activeTab === "activity" && <ActivityTab onAuthError={handleAuthError} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
