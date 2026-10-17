import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lbApi, errorMessage, type AuthLayer } from "@/lib/lb-dashboard-api";
import DashboardSignIn from "@/components/lb-dashboard/DashboardSignIn";
import LbDashboardShell from "@/components/lb-dashboard/LbDashboardShell";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// /dashboard — the real LanguageBridge dashboard. Sign-in (invite-only),
// then GET auth-layer decides which views the user sees.

const Dashboard = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [authLayer, setAuthLayer] = useState<AuthLayer | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loadingLayer, setLoadingLayer] = useState(false);
  // Invite and password-reset links arrive with type=invite / type=recovery
  const [setPasswordMode, setSetPasswordMode] = useState(
    () => typeof window !== "undefined" && /type=(invite|recovery)/.test(window.location.hash),
  );

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
      setSessionReady(true);
      if (event === "SIGNED_OUT") setAuthLayer(null);
    });
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setSessionReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session || setPasswordMode) return;
    setLoadingLayer(true);
    lbApi
      .authLayer()
      .then(setAuthLayer)
      .catch((err) => setAuthError(errorMessage(err)))
      .finally(() => setLoadingLayer(false));
  }, [session, setPasswordMode]);

  if (!sessionReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Skeleton className="h-12 w-48" />
      </div>
    );
  }

  if (!session || setPasswordMode) {
    return (
      <DashboardSignIn
        mode={setPasswordMode ? "set-password" : "signin"}
        onPasswordSet={() => {
          setSetPasswordMode(false);
          // Clean the hash so a refresh doesn't reopen the password screen
          window.history.replaceState(null, "", window.location.pathname);
        }}
      />
    );
  }

  if (loadingLayer) {
    return (
      <div className="min-h-screen bg-background p-6 space-y-4 max-w-6xl mx-auto">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Couldn't load your dashboard</CardTitle>
            <CardDescription>{authError}</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button onClick={() => window.location.reload()}>Try again</Button>
            <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!authLayer) return null;

  if (!authLayer.permissions?.includes("view_dashboard")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>No dashboard access yet</CardTitle>
            <CardDescription>
              Your account doesn't have dashboard access yet — contact LanguageBridge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <LbDashboardShell auth={authLayer} />;
};

export default Dashboard;
