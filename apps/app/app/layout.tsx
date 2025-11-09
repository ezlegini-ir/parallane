import "@parallane/ui/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`antialiased custom-scrollbar dark bg-slate-950 ${inter.variable}`}
    >
      <GoogleAnalytics gaId={process.env.GA_MEASUREMENT_ID!} />
      <body>
        {children}
        <Toaster theme="system" position="top-right" richColors />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Parallane",
    template: "%s - Parallane",
  },
  description: "Parallane: Where Lanes Meet Mastery.",
  icons: {
    icon: "/logos/favicon.svg",
  },
  keywords: ["Parallane", "Ui Design Course", "Web Design Course"],
  authors: [{ name: "Parallane", url: process.env.NEXT_PUBLIC_BASE_URL }],
  creator: "Parallane",
  publisher: "Parallane",
  openGraph: {
    title: "Parallane",
    description: "Parallane: Where Lanes Meet Mastery.",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "Parallane",
    locale: "en",
    type: "website",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Parallane",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parallane",
    description: "Parallane: Where Lanes Meet Mastery.",
    images: ["/og-cover.png"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  alternates: {
    canonical: "/",
  },
};
