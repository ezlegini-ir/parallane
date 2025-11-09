import type { Metadata } from "next";
import "@parallane/ui/globals.css";
import "./fonts.css";
import { Toaster } from "@parallane/ui/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      style={{ fontFamily: "KalamehWeb" }}
      className={`antialiased custom-scrollbar`}
    >
      <body>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Admin - parallane",
    template: "%s - parallane",
  },
  icons: {
    icon: "/favicon.svg",
  },
  description: "parallane Panel",
};
