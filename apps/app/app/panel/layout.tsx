import { SideBar } from "@/app/panel/components/SideBar";
import { getSessionUser } from "@/data/user";
import NotifBar from "@parallane/ui/components/NotifBar";
import { Button } from "@parallane/ui/components/ui/button";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@parallane/ui/components/ui/sidebar";
import UserBar from "@parallane/ui/components/UserBar";
import { Home } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  if (!user) redirect("/login");

  if (!user.emailVerified || !user?.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <div>
      <SidebarProvider>
        <SideBar user={user} />
        <main className="sm:max-w-screen-xl w-full mx-auto p-4">
          <div className="flex justify-between items-center mb-3 lg:hidden">
            <SidebarTrigger variant={"outline"} size={"icon"} className="p-5" />

            <div className="flex gap-2">
              <Link className="mr-auto" href={"/"}>
                <Button
                  className=" text-slate-500"
                  size={"icon"}
                  variant={"outline"}
                >
                  <Home />
                </Button>
              </Link>
              <UserBar user={user!} />
            </div>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <NotifBar />

            <div className="hidden lg:block ml-auto">
              <UserBar user={user!} />
            </div>
          </div>

          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}

export const metadata: Metadata = {
  title: {
    default: "User Panel",
    template: "%s - User Panel",
  },
};
