import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Qualification Standards | Plejj",
  description:
    "See how Plejj verifies investors before they access the marketplace. Our qualification process ensures founders only connect with serious, accredited capital.",
  openGraph: {
    title: "Investor Qualification Standards | Plejj",
    description:
      "See how Plejj verifies investors before they access the marketplace. Our qualification process ensures founders only connect with serious, accredited capital.",
  },
  twitter: {
    title: "Investor Qualification Standards | Plejj",
    description:
      "See how Plejj verifies investors before they access the marketplace. Our qualification process ensures founders only connect with serious, accredited capital.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
