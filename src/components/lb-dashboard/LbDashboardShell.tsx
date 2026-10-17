import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "@/lib/router-compat";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import type { AuthLayer } from "@/lib/lb-dashboard-api";
import { hasOperationsRole, OPERATIONS_ADMIN_EMAIL } from "@/lib/lb-dashboard-access";
import languageBridgeLogo from "@/assets/languagebridge-logo.svg";
import HealthBannerBar from "./HealthBannerBar";
import DistrictInsights from "./DistrictInsights";
import MyStudents from "./MyStudents";
import LbOperations from "./LbOperations";

// Dashboard shell: role-based navigation, health banner bar for super-admins
// on every view, sign-out. No third-party trackers on these pages.

type View = "insights" | "students" | "ops";

const LbDashboardShell = ({ auth }: { auth: AuthLayer }) => {
  // Presentation only. The proxy independently verifies identity and Azure role.
  const isSuper = auth.email.toLowerCase() === OPERATIONS_ADMIN_EMAIL && hasOperationsRole(auth);
  const [view, setView] = useState<View>("insights");
  const [opsHealthFocus, setOpsHealthFocus] = useState(0);

  const nav: { id: View; label: string }[] = [
    { id: "insights", label: "District insights" },
    ...(auth.role !== "district_admin" ? [{ id: "students" as View, label: "My students" }] : []),
    ...(isSuper ? [{ id: "ops" as View, label: "LB Operations" }] : []),
  ];

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border/50 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={languageBridgeLogo} alt="LanguageBridge" className="h-8 w-auto" />
          </Link>
          <nav className="flex gap-1 overflow-x-auto" aria-label="Dashboard">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                aria-current={view === item.id ? "page" : undefined}
                className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap transition-colors ${
                  view === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden sm:block text-xs text-muted-foreground truncate max-w-[200px]">{auth.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4 mr-1" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {isSuper && (
          <HealthBannerBar
            onViewHealth={() => {
              setView("ops");
              setOpsHealthFocus((n) => n + 1); // remount ops on Health tab
            }}
          />
        )}
        {view === "insights" && <DistrictInsights auth={auth} />}
        {view === "students" && auth.role !== "district_admin" && <MyStudents auth={auth} />}
        {view === "ops" && isSuper && <LbOperations key={opsHealthFocus} initialTab="health" />}
      </main>
    </div>
  );
};

export default LbDashboardShell;
