import { useState } from "react";
import AdminNav from "./AdminNav";
import OverviewTab from "./OverviewTab";
import FlagsTab from "./FlagsTab";
import ActivityTab from "./ActivityTab";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen" style={{ background: "#f7f7f7" }}>
      <AdminNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSignOut={() => window.location.href = "/"}
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
      </div>
    </div>
  );
};

export default AdminDashboard;
