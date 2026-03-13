import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import lbIcon from "@/assets/languagebridge-icon-256.png";

interface AdminNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSignOut: () => void;
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "flags", label: "Flags" },
  { id: "activity", label: "Activity" },
];

const AdminNav = ({ activeTab, onTabChange, onSignOut }: AdminNavProps) => {
  return (
    <nav
      className="sticky top-0 z-50 px-4 sm:px-6"
      style={{ background: "linear-gradient(135deg, #742a69 0%, #f37030 80%, #ffc755 100%)" }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <img src={lbIcon} alt="LanguageBridge" className="h-8 w-8 rounded" />
          <span className="text-white font-bold text-lg hidden sm:inline">
            Language<span className="font-extrabold">Bridge</span>
          </span>
          <span className="text-white/70 text-sm hidden md:inline ml-1">Admin Dashboard</span>
        </div>

        <div className="flex items-center gap-1 bg-white/15 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === tab.id
                  ? "bg-white text-[#4a1a45] shadow-sm"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
            Pilot: Greenbriar
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSignOut}
            className="text-white/90 hover:text-white hover:bg-white/10 gap-1.5"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
