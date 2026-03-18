import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import PageAtmosphere from "@/components/PageAtmosphere";
import CursorGlow from "@/components/CursorGlow";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UrgenC | Where Capital Meets Vision",
  description:
    "A curated marketplace connecting vetted startups with accredited investors through intelligent matching.",
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
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-sans antialiased overflow-x-clip"
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        <PageAtmosphere />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
