import FloatingBanner from "@/components/FloatingBanner";
import Footer from "@/components/Footer";
import MobileNavbar from "@/components/MobileNavbar";
import NavBar from "@/components/NavBar";
import SquarePattern from "@/components/SquarePattern";
import NotifBar from "@parallane/ui/components/NotifBar";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-hidden">
      <SquarePattern />
      <div
        className={`relative pb-10 md:pb-0 antialiased max-w-screen-xl mx-auto p-4 grid grid-rows-[auto_1fr_auto] min-h-screen dark`}
      >
        <div className="relative max-w-screen-xl mx-auto w-full">
          <div className="absolute -right-20 md:-right-40 -top-32 md:-top-72 h-[500px] md:h-[800px] aspect-square bg-blue-950/50 rounded-full blur-[100px] transition-all" />
          <div className="absolute -right-8 md:-right-16 -top-40 md:-top-80 h-[300px] md:h-[400px]  aspect-square bg-blue-900/60 rounded-full blur-[100px] transition-all" />
        </div>

        <div
          className={`pb-10 md:pb-0 antialiased overflow-x-hidden grid grid-rows-[auto_1fr_auto] min-h-screen dark`}
        >
          <div>
            <NotifBar />
            <NavBar />
          </div>

          <main className="z-50 pt-14">
            {children}
            <FloatingBanner />
            <MobileNavbar />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
