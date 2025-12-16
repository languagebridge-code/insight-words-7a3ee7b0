import { User } from "@supabase/supabase-js";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
  // Demo mode - bypass authentication
  const demoUser = {
    id: 'demo-user',
    email: 'demo@languagebridge.app',
  } as User;

  return (
    <DashboardLayout user={demoUser}>
      <DashboardContent />
    </DashboardLayout>
  );
};

export default Dashboard;
