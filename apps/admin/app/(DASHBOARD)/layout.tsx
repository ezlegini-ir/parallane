import DashboardHeader from "@/components/DashboardHeader";
import {
  SidebarInset,
  SidebarProvider,
} from "@parallane/ui/components/ui/sidebar";
import DashboardSidebar from "../../components/sidebar/Dashboard-Sidebar";
import { authenticateSession } from "@/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await authenticateSession();

  return (
    <div className="">
      <SidebarProvider>
        <DashboardSidebar />

        <SidebarInset className="bg-[#fafafa]">
          <main className="w-full  mx-auto p-3 lg:px-12 lg:p-4 space-y-4 ">
            <DashboardHeader />
            <div>{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
