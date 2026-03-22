import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import PageAtmosphere from "@/components/PageAtmosphere";
import CursorGlow from "@/components/CursorGlow";
import ZoomPrevention from "@/components/ZoomPrevention";
import { Analytics } from "@vercel/analytics/react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Plejj | Where Real Ideas Meet Real Capital",
  description:
    "Plejj is the AI-powered fundraising marketplace where serious founders pitch, investors swipe, and mutual interest unlocks a real meeting. Join the waitlist.",
  metadataBase: new URL("https://joinplejj.com"),
  openGraph: {
    title: "Plejj | Where Real Ideas Meet Real Capital",
    description:
      "Plejj is the AI-powered fundraising marketplace where serious founders pitch, investors swipe, and mutual interest unlocks a real meeting. Join the waitlist.",
    url: "https://joinplejj.com",
    siteName: "Plejj",
    type: "website",
    images: [
      {
        url: "/plejj-logo-white.png",
        alt: "Plejj Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plejj | Where Real Ideas Meet Real Capital",
    description:
      "Plejj is the AI-powered fundraising marketplace where serious founders pitch, investors swipe, and mutual interest unlocks a real meeting. Join the waitlist.",
    images: ["/plejj-logo-white.png"],
  },
  icons: {
    icon: [
      { url: "/unicorn-favicon.svg", type: "image/svg+xml" },
      { url: "/unicorn-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/unicorn-favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-sans antialiased overflow-x-clip"
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        <ZoomPrevention />
        <PageAtmosphere />
        <CursorGlow />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
