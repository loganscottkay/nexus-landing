"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const ease = [0.25, 0.4, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cards = [
  {
    num: 1,
    title: "Identity Verification",
    items: [
      "Valid legal name matching government ID",
      "Verifiable LinkedIn profile (6+ months active)",
      "Verified email and phone",
      "Location disclosure",
    ],
    why: "Every investor on Urgenc is a real, verified person.",
  },
  {
    num: 2,
    title: "Investment Readiness",
    items: [
      "Declare investment range ($1K to $500K+)",
      "Capital available within 90 days",
      "First-time investors welcome (onboarding provided)",
    ],
    why: "Your range determines your tier.",
  },
  {
    num: 3,
    title: "Investment Thesis",
    items: [
      "Written thesis on what excites you",
      "Sector preferences selected",
      "Stage preferences selected",
    ],
    why: "Clear thesis = better matches.",
  },
  {
    num: 4,
    title: "Value Beyond Capital",
    items: [
      "Mentorship, connections, expertise, hiring network",
      "Optional but heavily weighted in matching",
    ],
    why: "Founders prefer investors who bring more than a check.",
  },
  {
    num: 5,
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
    num: 6,
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

export default function InvestorQualifications() {
  return (
    <main className="relative min-h-screen bg-base text-text-primary">
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 -top-[5%] right-[10%]" />
        <div className="blob blob-lavender animate-blob-2 top-[50%] -left-[5%]" />
        <div className="blob blob-peach animate-blob-3 bottom-[5%] right-[20%]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 md:pt-36 pb-20 px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-[800px] mx-auto"
        >
          {/* Header */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-[32px] md:text-[40px] font-normal text-center mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Investor Qualification Standards
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-text-muted text-[16px] md:text-[18px] text-center mb-12 max-w-lg mx-auto leading-[1.7]"
          >
            Urgenc welcomes investors of all sizes. Here is how we verify you are serious.
          </motion.p>

          {/* Cards with progress indicator */}
          <div className="relative">
            {/* Vertical progress line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-[2px] hidden md:block" style={{ background: "rgba(0,0,0,0.06)" }}>
              <motion.div
                className="w-full rounded-full"
                style={{ background: "linear-gradient(180deg, #4A6CF7, #7C5CFC)", transformOrigin: "top" }}
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 2, ease: [0.25, 0.4, 0.25, 1] }}
              />
            </div>

            <div className="flex flex-col gap-4">
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  transition={{ duration: 0.4, ease, delay: i * 0.08 }}
                  className="relative md:pl-16"
                >
                  {/* Numbered circle on the line */}
                  {card.num && (
                    <div className="absolute left-0 md:left-1.5 top-8 w-7 h-7 rounded-full hidden md:flex items-center justify-center text-[11px] font-bold text-white z-10" style={{ background: card.isRejection ? "#EF4444" : "linear-gradient(135deg, #4A6CF7, #7C5CFC)", boxShadow: `0 0 12px ${card.isRejection ? "rgba(239,68,68,0.3)" : "rgba(74, 108, 247, 0.3)"}` }}>
                      {card.num}
                    </div>
                  )}

                  <div className="glow-card-wrapper">
                    <div
                      className="glass p-8 relative overflow-hidden"
                      style={
                        card.isRejection
                          ? {
                              background: "rgba(239, 68, 68, 0.03)",
                              border: "1px solid rgba(239, 68, 68, 0.1)",
                            }
                          : undefined
                      }
                    >
                      <h3
                        className="text-[20px] font-semibold text-text-primary mb-2"
                        style={card.isRejection ? { color: "#DC2626" } : undefined}
                      >
                        {card.title}
                      </h3>

                      {card.why && (
                        <p className="text-text-muted text-[14px] italic mb-4">
                          {card.why}
                        </p>
                      )}

                      <ul className="space-y-2">
                        {card.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <div
                              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                              style={{
                                background: card.isRejection
                                  ? "#EF4444"
                                  : "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                              }}
                            />
                            <span className="text-text-secondary text-[15px] leading-[1.6]">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
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
        </motion.div>
      </div>
    </main>
  );
}
