import NavBar from "@/components/NavBar";
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
      className={`p-3 lg:px-10 grid grid-cols-1 grid-rows-[auto_1fr_auto] h-screen`}
    >
      <div>
        <NotifBar />
        <NavBar />
      </div>
      <main className="relative py-6 lg:py-10">{children}</main>
      <SimpleFooter />
    </div>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Classroom",
    template: "%s - Classroom",
  },
  description: "Parallane Classroom, where educational skills are shaped.",
};
