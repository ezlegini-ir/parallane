import FloatingBanner from "@/components/FloatingBanner";
import Footer from "@/components/Footer";
import MobileNavbar from "@/components/MobileNavbar";
import SquarePattern from "@/components/SquarePattern";
import NotifBar from "@parallane/ui/components/NotifBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-hidden">
      <SquarePattern />
      <div className="relative max-w-screen-xl mx-auto w-full">
        <div className="absolute -right-20 md:-right-40 -top-32 md:-top-72 h-[500px] md:h-[800px] aspect-square bg-blue-950/50 rounded-full blur-[100px] transition-all" />
        <div className="absolute -right-8 md:-right-16 -top-40 md:-top-80 h-[300px] md:h-[400px]  aspect-square bg-blue-900/60 rounded-full blur-[100px] transition-all" />
      </div>

      <div
        className={`pb-10 md:pb-0 antialiased overflow-x-hidden mx-auto grid grid-rows-[auto_1fr_auto] min-h-screen dark`}
      >
        <div className="text-right pr-60">
          <NotifBar />
        </div>

        <main className="z-50">
          {children}
          <FloatingBanner />
          <MobileNavbar />
        </main>

        <Footer />
      </div>
    </div>
  );
}
