import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Plejj",
  description:
    "Meet the founders behind Plejj and learn why we are building the AI-powered fundraising marketplace that connects serious founders with real capital.",
  openGraph: {
    title: "About | Plejj",
    description:
      "Meet the founders behind Plejj and learn why we are building the AI-powered fundraising marketplace that connects serious founders with real capital.",
  },
  twitter: {
    title: "About | Plejj",
    description:
      "Meet the founders behind Plejj and learn why we are building the AI-powered fundraising marketplace that connects serious founders with real capital.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
