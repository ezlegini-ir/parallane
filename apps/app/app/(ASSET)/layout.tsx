import SimpleFooter from "@/components/SimpleFooter";
import NotifBar from "@parallane/ui/components/NotifBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`max-w-screen-xl mx-auto p-3 grid grid-cols-1 grid-rows-[auto_1fr_auto] h-screen`}
    >
      <div>
        <NotifBar />
      </div>
      <main className="relative mt-20">{children}</main>
      <SimpleFooter />
    </div>
  );
}
