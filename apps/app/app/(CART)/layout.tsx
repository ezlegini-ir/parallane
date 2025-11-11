import MobileNavbar from "@/components/MobileNavbar";
import SimpleFooter from "@/components/SimpleFooter";
import { authenticateSession } from "@/lib/auth";
import NotifBar from "@parallane/ui/components/NotifBar";
import { Metadata } from "next";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await authenticateSession();

  return (
    <div
      className={`max-w-screen-xl mx-auto p-3 grid grid-cols-1 grid-rows-[auto_1fr_auto] h-screen `}
    >
      <div>
        <NotifBar />
      </div>
      <main className="relative md:mt-20 pb-20 md:pb-0">
        {children}
        <MobileNavbar />
      </main>

      <div className="hidden md:block">
        <SimpleFooter />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Cart",
    template: "%s - Parallane",
  },
};
