import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup Qualification Standards | Plejj",
  description:
    "Learn what it takes to get accepted on Plejj. Our startup qualification process ensures only serious, investment-ready founders make it to the marketplace.",
  openGraph: {
    title: "Startup Qualification Standards | Plejj",
    description:
      "Learn what it takes to get accepted on Plejj. Our startup qualification process ensures only serious, investment-ready founders make it to the marketplace.",
  },
  twitter: {
    title: "Startup Qualification Standards | Plejj",
    description:
      "Learn what it takes to get accepted on Plejj. Our startup qualification process ensures only serious, investment-ready founders make it to the marketplace.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
