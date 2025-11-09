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
    default: "parallane",
    template: "%s - parallane",
  },
  description: "parallane: Design Without Limits",
  icons: {
    icon: "/favicon.svg",
  },
  keywords: ["parallane", "Ui Design Course", "Web Design Course"],
  authors: [{ name: "parallane", url: process.env.NEXT_PUBLIC_BASE_URL }],
  creator: "parallane",
  publisher: "parallane",
  openGraph: {
    title: "parallane",
    description: "parallane: Design Without Limits",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "parallane",
    locale: "en",
    type: "website",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "parallane",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "parallane",
    description: "parallane: Design Without Limits",
    images: ["/og-cover.png"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  alternates: {
    canonical: "/",
  },
};
