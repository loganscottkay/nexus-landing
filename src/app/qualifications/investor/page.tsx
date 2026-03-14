"use client";

import { useState, useRef, useEffect } from "react";
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

const applicationCards = [
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
];

const onAppCards = [
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
      "Your queue position is based on when you express interest. Earlier interest = earlier meeting window.",
    ],
    why: "Founders invest months building. Show up.",
  },
];

const rejectionCard = {
  icon: "rejected",
  title: "What Gets You Rejected",
  items: [
    "Unverifiable identity",
    "No thesis or stated range",
    "Fraudulent activity history",
    "Using platform to harvest decks without intent",
  ],
  why: null as string | null,
  isRejection: true,
};

type CardData = {
  icon: string;
  title: string;
  items: string[];
  why: string | null;
  isRejection?: boolean;
};

function QualCard({ card, index }: { card: CardData; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const iconAnimationType =
    card.icon === "rejected"
      ? "shake"
      : card.icon === "value"
        ? "glow"
        : "pulse";

  const iconAnimationStyle: React.CSSProperties | undefined = inView
    ? {
        animation:
          iconAnimationType === "pulse"
            ? "icon-pulse 0.4s ease"
            : iconAnimationType === "shake"
              ? "icon-shake 0.3s ease"
              : "icon-glow 0.5s ease",
      }
    : undefined;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="qual-card relative rounded-xl md:rounded-2xl p-6 md:p-8"
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(167,139,250,0.14), rgba(196,148,233,0.10), rgba(130,180,237,0.08), rgba(167,139,250,0.06)), rgba(255, 255, 255, 0.5)"
            : "linear-gradient(135deg, rgba(167,139,250,0.08), rgba(196,148,233,0.06), rgba(130,180,237,0.05), rgba(167,139,250,0.04)), rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: card.isRejection
            ? `1px solid rgba(239, 68, 68, ${hovered ? 0.2 : 0.12})`
            : `1px solid rgba(0, 0, 0, ${hovered ? 0.1 : 0.06})`,
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? "0 20px 50px rgba(0, 0, 0, 0.08)" : "0 0 0 rgba(0, 0, 0, 0)",
          transition: "all 0.4s ease",
        }}
      >
        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-2">
          <span
            style={{
              color: card.isRejection ? "rgba(239, 68, 68, 0.7)" : "#4A6CF7",
              ...iconAnimationStyle,
            }}
          >
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
          {card.items.map((item, bulletIdx) => (
            <div
              key={item}
              className="flex items-start gap-3"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-10px)",
                transition: `opacity 0.3s ease ${0.3 + bulletIdx * 0.1}s, transform 0.3s ease ${0.3 + bulletIdx * 0.1}s`,
              }}
            >
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
      <style>{`
        @keyframes icon-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        @keyframes icon-shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-3px); } 40% { transform: translateX(3px); } 60% { transform: translateX(-2px); } 80% { transform: translateX(2px); } }
        @keyframes icon-glow { 0%, 100% { filter: drop-shadow(0 0 0px transparent); } 50% { filter: drop-shadow(0 0 8px rgba(74,108,247,0.5)); } }
      `}</style>
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
            className="text-[16px] md:text-[18px] text-center mb-10 max-w-lg mx-auto leading-[1.7]"
            style={{ color: "#94A3B8" }}
          >
            UrgenC welcomes investors of all sizes. Here is how we verify you are serious.
          </motion.p>

          {/* Confidentiality Notice Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.12 }}
            className="mx-auto mb-12"
            style={{ maxWidth: "700px" }}
          >
            <div
              className="flex items-start gap-4 rounded-2xl"
              style={{
                background: "rgba(74, 108, 247, 0.04)",
                border: "1px solid rgba(74, 108, 247, 0.12)",
                padding: "20px 28px",
              }}
            >
              <span className="shrink-0 mt-0.5" style={{ color: "#4A6CF7" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <rect x="9" y="9" width="6" height="7" rx="1" />
                  <path d="M10 9V7a2 2 0 114 0v2" />
                </svg>
              </span>
              <div>
                <p
                  className="font-semibold mb-1"
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "16px",
                    color: "#4A6CF7",
                  }}
                >
                  Confidentiality Agreement
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "14px",
                    color: "#475569",
                    lineHeight: 1.6,
                  }}
                >
                  By joining UrgenC, you agree to keep all startup information confidential. Pitch decks, financials, and strategies shared with you are for investment evaluation only. Misuse results in permanent removal and potential legal action.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 1: Application Qualifications */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-center mb-10"
          >
            <p
              className="gradient-text font-medium mb-3"
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "3px",
              }}
            >
              Application Qualifications
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "14px",
                color: "#94A3B8",
              }}
            >
              What you need to apply for the founding cohort.
            </p>
          </motion.div>

          <div className="flex flex-col" style={{ gap: "20px" }}>
            {applicationCards.map((card, i) => (
              <QualCard key={card.title} card={card} index={i} />
            ))}
          </div>

          {/* Section 2: On-App Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-center mt-10 mb-10"
          >
            <p
              className="gradient-text font-medium mb-3"
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "3px",
              }}
            >
              On-App Requirements
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "14px",
                color: "#94A3B8",
              }}
            >
              What is expected of you once you are on the platform.
            </p>
          </motion.div>

          <div className="flex flex-col" style={{ gap: "20px" }}>
            {onAppCards.map((card, i) => (
              <QualCard key={card.title} card={card} index={i} />
            ))}
          </div>

          {/* What Gets You Rejected */}
          <div className="mt-8">
            <QualCard card={rejectionCard} index={0} />
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
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
