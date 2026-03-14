"use client";

import { useState, useRef, useEffect } from "react";
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

const applicationCards = [
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
];

const onAppCards = [
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
      "Update metrics monthly",
      "Respond to investor interest within 72 hours",
      "Startups that don't show progress within 30 days may be moved to inactive status",
    ],
    why: "This is what keeps UrgenC elite.",
  },
];

const rejectionCard = {
  icon: "rejected",
  title: "What Gets You Rejected",
  items: [
    "No deck or video submitted",
    "Unverifiable identity",
    "No clear problem or customer",
    "Misrepresentation of any kind",
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
    const node = cardRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const iconAnimationType =
    card.icon === "rejected"
      ? "shake"
      : card.icon === "idea"
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
              {!card.isRejection && (
                <span
                  className="shrink-0 rounded-full mt-[7px]"
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                  }}
                />
              )}
              {card.isRejection && (
                <span
                  className="shrink-0 rounded-full mt-[7px]"
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "rgba(239, 68, 68, 0.7)",
                  }}
                />
              )}
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
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes icon-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        @keyframes icon-shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-3px); } 40% { transform: translateX(3px); } 60% { transform: translateX(-2px); } 80% { transform: translateX(2px); } }
        @keyframes icon-glow { 0%, 100% { filter: drop-shadow(0 0 0px transparent); } 50% { filter: drop-shadow(0 0 8px rgba(74,108,247,0.5)); } }
      `}} />
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
            className="text-[16px] md:text-[18px] text-center mb-10 max-w-lg mx-auto leading-[1.7]"
            style={{ color: "#94A3B8" }}
          >
            Less than 15% of applicants will get in. Here is what we will look for when applications open.
          </motion.p>

          {/* Protection Notice Banner */}
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
                background: "rgba(5, 150, 101, 0.04)",
                border: "1px solid rgba(5, 150, 101, 0.12)",
                padding: "20px 28px",
              }}
            >
              <span className="shrink-0 mt-0.5" style={{ color: "#059669" }}>
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
                    color: "#059669",
                  }}
                >
                  Your Ideas Are Protected
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "14px",
                    color: "#475569",
                    lineHeight: 1.6,
                  }}
                >
                  Every investor on UrgenC agrees to a platform-wide confidentiality agreement. Your pitch deck, financials, and strategy are protected. Investors who violate confidentiality are permanently removed and may face legal action.
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
            <div style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #A855F7)', margin: '0 auto 16px auto' }} />
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
            <div style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #A855F7)', margin: '0 auto 16px auto' }} />
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
