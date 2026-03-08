import { useState } from "react";
import { hasAuth, clearAuth } from "./adminApi";
import AdminLogin from "./AdminLogin";
import AdminNav from "./AdminNav";
import OverviewTab from "./OverviewTab";
import FlagsTab from "./FlagsTab";
import ActivityTab from "./ActivityTab";

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(hasAuth());
  const [activeTab, setActiveTab] = useState("overview");

  const handleSignOut = () => {
    clearAuth();
    setAuthenticated(false);
  };

  const handleAuthError = () => {
    clearAuth();
    setAuthenticated(false);
  };

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
