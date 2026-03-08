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
    title: "Identity Verification",
    items: [
      "Valid full legal name matching government ID",
      "Verifiable LinkedIn profile with professional history",
      "Verified email address",
      "Location disclosure",
    ],
    why: "Every investor is verified. This protects founders from scammers.",
  },
  {
    title: "Investment Readiness",
    items: [
      "Declare intended investment range ($1K to $500K+)",
      "Capital available to deploy within 90 days",
      "First-time investors welcome, brief education onboarding provided after acceptance",
    ],
    why: "Your range determines your tier. Founders know what to expect.",
  },
  {
    title: "Investment Thesis",
    items: [
      "Written thesis on what companies excite you",
      "Sector preferences selected",
      "Stage preferences selected",
    ],
    why: "Clear thesis means better matches. You find what you want faster.",
  },
  {
    title: "Value Beyond Capital",
    items: [
      "Describe what you bring: mentorship, connections, expertise, hiring network",
      "Optional but heavily weighted in matching",
    ],
    why: "Founders prefer investors who add strategic value beyond a check.",
  },
  {
    title: "Accountability Agreement",
    items: [
      "Respond to matches within 72 hours",
      "Attend scheduled calls or cancel with 24hr notice",
      "Ghosting after matching leads to warning then removal",
      "Provide honest post-call ratings",
    ],
    why: "Founders invest months building. The least you can do is show up.",
  },
  {
    title: "What Gets You Rejected",
    items: [
      "Unverifiable identity",
      "No investment thesis or stated range",
      "History of fraudulent activity",
      "Refusing accountability agreement",
      "Using platform to harvest decks without genuine intent",
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
            Nexus welcomes investors of all sizes. Here is how we verify you are serious.
          </motion.p>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {cards.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                transition={{ duration: 0.5, ease }}
              >
                <div
                  className="glow-card-wrapper"
                >
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
                      className="text-[20px] font-semibold text-text-primary mb-4"
                      style={card.isRejection ? { color: "#DC2626" } : undefined}
                    >
                      {card.title}
                    </h3>

                    <ul className="space-y-2.5 mb-4">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0"
                            style={{
                              background: card.isRejection
                                ? "#EF4444"
                                : "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                            }}
                          />
                          <span className="text-text-secondary text-[15px] leading-[1.7]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {card.why && (
                      <p className="text-accent-blue text-[14px] italic leading-[1.6]">
                        Why: {card.why}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
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
