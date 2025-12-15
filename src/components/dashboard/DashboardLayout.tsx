import { ReactNode, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  LogOut,
  GraduationCap,
  Building2,
  School,
} from "lucide-react";
import languageBridgeLogo from "@/assets/languagebridge-logo.png";

interface DashboardLayoutProps {
  user: User;
  children: ReactNode;
}

const DashboardLayout = ({ user, children }: DashboardLayoutProps) => {
  const [activeView, setActiveView] = useState("overview");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "students", label: "Students", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const hierarchyItems = [
    { id: "district", label: "District View", icon: Building2 },
    { id: "school", label: "School View", icon: School },
    { id: "classroom", label: "My Classroom", icon: GraduationCap },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border/50">
          <SidebarHeader className="p-4 border-b border-border/50">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={languageBridgeLogo}
                alt="LanguageBridge"
                className="h-8 w-auto"
              />
            </Link>
          </SidebarHeader>

          <SidebarContent className="p-2">
            <div className="mb-4">
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Navigation
              </p>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveView(item.id)}
                      className={`w-full justify-start gap-3 ${
                        activeView === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>

            <div>
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Hierarchy
              </p>
              <SidebarMenu>
                {hierarchyItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveView(item.id)}
                      className={`w-full justify-start gap-3 ${
                        activeView === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.user_metadata?.full_name || "Teacher"}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border/50 px-6 py-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <div>
                <h1 className="text-xl font-semibold text-foreground">Teacher Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Demo Mode - Sample analytics data
                </p>
              </div>
            </div>
          </header>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
