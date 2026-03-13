"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const ease = [0.25, 0.4, 0.25, 1] as const;

const icons: Record<string, React.ReactNode> = {
  team: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  idea: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
    </svg>
  ),
  materials: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  traction: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  protection: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <rect x="9" y="9" width="6" height="7" rx="1" />
      <path d="M10 9V7a2 2 0 114 0v2" />
    </svg>
  ),
  accountability: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  rejected: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

const cards = [
  {
    icon: "team",
    title: "Founding Team",
    items: [
      "At least one full-time committed founder",
      "Verifiable LinkedIn profiles",
      "Relevant experience or domain knowledge",
      "Student founders welcome with enrollment proof",
    ],
    why: "We bet on people first.",
  },
  {
    icon: "idea",
    title: "The Idea & Vision",
    items: [
      "Clearly defined problem and customer",
      "Why now is the right time",
      "What makes your approach hard to replicate",
      "Realistic 3-year vision",
    ],
    why: "Clarity of thought beats a perfect business plan.",
  },
  {
    icon: "materials",
    title: "Required Materials",
    items: [
      "Pitch deck (PDF, any stage of polish)",
      "60-second video pitch (required)",
      "Registered entity or commit to incorporating in 30 days",
    ],
    why: "The video pitch is how investors evaluate you.",
  },
  {
    icon: "protection",
    title: "Your Ideas Are Protected",
    items: [
      "Every investor on UrgenC agrees to a platform-wide confidentiality agreement",
      "Your pitch deck, financials, and strategy are protected",
      "Investors who violate confidentiality are permanently removed and may face legal action",
      "We take idea protection seriously",
    ],
    why: "Your ideas deserve protection.",
  },
  {
    icon: "traction",
    title: "Traction (Flexible)",
    items: [
      "Pre-revenue? Show LOIs, waitlists, pilots, press, grants",
      "Revenue stage? Share MRR, growth, users, pipeline",
    ],
    why: "500 waitlist signups with a plan beats $10K MRR without one.",
  },
  {
    icon: "accountability",
    title: "Accountability Agreement",
    items: [
      "Update metrics every 14 days",
      "Respond to investor interest within 72 hours",
      "No traction after 30 days may mean removal",
      "Attend calls or give 24hr cancellation notice",
      "Meetings are queued one at a time with a 72-hour window each. No pressure to schedule everything at once.",
    ],
    why: "This is what keeps UrgenC elite.",
  },
  {
    icon: "rejected",
    title: "What Gets You Rejected",
    items: [
      "No deck or video submitted",
      "Unverifiable identity",
      "No clear problem or customer",
      "Fraudulent claims",
    ],
    why: null,
    isRejection: true,
  },
];

function QualCard({ card, index }: { card: typeof cards[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative rounded-xl md:rounded-2xl p-6 md:p-8"
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: card.isRejection
            ? `1px solid rgba(239, 68, 68, ${hovered ? 0.2 : 0.12})`
            : `1px solid rgba(0, 0, 0, ${hovered ? 0.1 : 0.06})`,
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          boxShadow: hovered ? "0 8px 30px rgba(0, 0, 0, 0.08)" : "0 0 0 rgba(0, 0, 0, 0)",
          transition: "all 0.25s ease",
        }}
      >
        {/* Step counter */}
        <span
          className="absolute top-6 right-6 select-none"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "36px",
            fontWeight: 600,
            color: "rgba(0, 0, 0, 0.08)",
            lineHeight: 1,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-2">
          <span style={{ color: card.isRejection ? "rgba(239, 68, 68, 0.7)" : "#4A6CF7" }}>
            {icons[card.icon]}
          </span>
          <h3
            className="font-semibold"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "20px",
              color: card.isRejection ? "#DC2626" : "#0F172A",
            }}
          >
            {card.title}
          </h3>
        </div>

        {/* Why line */}
        {card.why && (
          <p
            className="italic mb-4"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px",
              color: "#7C5CFC",
            }}
          >
            {card.why}
          </p>
        )}

        {/* Requirements */}
        <div className="flex flex-col" style={{ gap: "12px" }}>
          {card.items.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span
                className="shrink-0 rounded-full mt-[7px]"
                style={{
                  width: "6px",
                  height: "6px",
                  background: card.isRejection
                    ? "rgba(239, 68, 68, 0.7)"
                    : "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "15px",
                  color: "#475569",
                  lineHeight: 1.6,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function StartupQualifications() {
  return (
    <main className="relative min-h-screen text-[#0F172A]">
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[#FAFAF9]" />
        <div className="blob blob-blue animate-blob-1 -top-[5%] right-[10%]" />
        <div className="blob blob-lavender animate-blob-2 top-[50%] -left-[5%]" />
        <div className="blob blob-peach animate-blob-3 bottom-[5%] right-[20%]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 md:pt-36 pb-20 px-6">
        <div className="max-w-[700px] mx-auto">
          {/* Header */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-[32px] md:text-[40px] font-normal text-center mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Startup Qualification Standards
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.06 }}
            className="text-[16px] md:text-[18px] text-center mb-12 max-w-lg mx-auto leading-[1.7]"
            style={{ color: "#94A3B8" }}
          >
            We accept less than 15% of applicants. Here is what we look for.
          </motion.p>

          {/* Waitlist note */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.12 }}
            className="flex flex-col items-center mb-12"
          >
            <div
              className="rounded-xl px-[16px] py-[16px] max-w-[700px] w-full text-center"
              style={{
                background: "rgba(74, 108, 247, 0.05)",
                border: "1px solid rgba(74, 108, 247, 0.15)",
              }}
            >
              <p
                className="text-[14px] leading-[1.7] mb-4"
                style={{ color: "#4A6CF7", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                These are the qualifications for the founding cohort. Right now, we are accepting waitlist signups. If your idea scores well, you will be invited to submit the full application.
              </p>
              <Link
                href="/waitlist"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-[14px] font-semibold text-white rounded-full"
                style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
              >
                Join the Waitlist &rarr;
              </Link>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col" style={{ gap: "20px" }}>
            {cards.map((card, i) => (
              <QualCard key={card.title} card={card} index={i} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-center mt-12"
          >
            <Link
              href="/waitlist"
              className="inline-flex items-center gap-2 px-10 py-4 text-[16px] font-semibold text-white rounded-full transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                boxShadow: "0 6px 25px rgba(74, 108, 247, 0.35)",
              }}
            >
              Join the Waitlist &rarr;
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
