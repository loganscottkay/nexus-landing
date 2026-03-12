"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const ease = [0.25, 0.4, 0.25, 1] as const;

const icons: Record<string, React.ReactNode> = {
  identity: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  readiness: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  thesis: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  confidentiality: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <rect x="9" y="9" width="6" height="7" rx="1" />
      <path d="M10 9V7a2 2 0 114 0v2" />
    </svg>
  ),
  value: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  accountability: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
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
    icon: "identity",
    title: "Identity Verification",
    items: [
      "Valid legal name matching government ID",
      "Verifiable LinkedIn profile (6+ months active)",
      "Verified email and phone",
      "Location disclosure",
    ],
    why: "Every investor on UrgenC is a real, verified person.",
  },
  {
    icon: "readiness",
    title: "Investment Readiness",
    items: [
      "Declare investment range ($1K to $500K+)",
      "Capital available within 90 days",
      "First-time investors welcome (onboarding provided)",
    ],
    why: "Your range determines your tier.",
  },
  {
    icon: "thesis",
    title: "Investment Thesis",
    items: [
      "Written thesis on what excites you",
      "Sector preferences selected",
      "Stage preferences selected",
    ],
    why: "Clear thesis = better matches.",
  },
  {
    icon: "confidentiality",
    title: "Confidentiality Agreement",
    items: [
      "By joining UrgenC, you agree to keep all startup information confidential",
      "Pitch decks, financials, and strategies shared with you are for investment evaluation only",
      "Misuse results in permanent removal and potential legal action",
    ],
    why: "Founders trust us with their ideas. We protect that trust.",
  },
  {
    icon: "value",
    title: "Value Beyond Capital",
    items: [
      "Mentorship, connections, expertise, hiring network",
      "Optional but heavily weighted in matching",
    ],
    why: "Founders prefer investors who bring more than a check.",
  },
  {
    icon: "accountability",
    title: "Accountability Agreement",
    items: [
      "Respond to matches within 72 hours",
      "Attend calls or cancel with 24hr notice",
      "Ghosting = warning then removal",
      "Honest post-call ratings",
    ],
    why: "Founders invest months building. Show up.",
  },
  {
    icon: "rejected",
    title: "What Gets You Rejected",
    items: [
      "Unverifiable identity",
      "No thesis or stated range",
      "Fraudulent activity history",
      "Using platform to harvest decks without intent",
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

export default function InvestorQualifications() {
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
            Investor Qualification Standards
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.06 }}
            className="text-[16px] md:text-[18px] text-center mb-12 max-w-lg mx-auto leading-[1.7]"
            style={{ color: "#94A3B8" }}
          >
            UrgenC welcomes investors of all sizes. Here is how we verify you are serious.
          </motion.p>

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
              href="/apply/investor"
              className="inline-flex items-center gap-2 px-10 py-4 text-[16px] font-semibold text-white rounded-full transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                boxShadow: "0 6px 25px rgba(74, 108, 247, 0.35)",
              }}
            >
              Ready to Apply?
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
