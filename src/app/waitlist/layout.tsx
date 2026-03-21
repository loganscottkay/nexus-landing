import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Waitlist | Plejj",
  description:
    "Get early access to Plejj, the AI-powered fundraising marketplace. Sign up for the waitlist and be first in line when we launch.",
  openGraph: {
    title: "Join the Waitlist | Plejj",
    description:
      "Get early access to Plejj, the AI-powered fundraising marketplace. Sign up for the waitlist and be first in line when we launch.",
  },
  twitter: {
    title: "Join the Waitlist | Plejj",
    description:
      "Get early access to Plejj, the AI-powered fundraising marketplace. Sign up for the waitlist and be first in line when we launch.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
