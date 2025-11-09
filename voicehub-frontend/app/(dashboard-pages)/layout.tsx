import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../modules/dashboard/ui/components/dashboard-sidebar";
import { DashboardNavbar } from "../modules/dashboard/ui/components/dashboard-navbar";
import { AgentProvider } from "../modules/dashboard/lib/agent-context";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <AgentProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="flex flex-col h-screen w-screen bg-muted">
          <DashboardNavbar />
          {children}
        </main>
      </SidebarProvider>
    </AgentProvider>
  );
};

export default Layout;
