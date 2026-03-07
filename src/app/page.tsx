"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CountUp from "@/components/CountUp";
import ParticleField from "@/components/ParticleField";

const ease = [0.25, 0.4, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const sectionFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const viewportConfig = { once: true, amount: 0.2 as const };

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      variants={sectionFadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ duration: 0.6, ease }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ---- FAQ Accordion ---- */
function FAQSection() {
  const faqs = [
    { q: "How does the matching algorithm work?", a: "Our algorithm analyzes your investment thesis, sector preferences, check size, and past behavior to surface 3-5 highly compatible startups each morning. It learns from your feedback to improve over time." },
    { q: "What does the vetting process look like?", a: "Every startup goes through a multi-step review: team background checks, financial verification, product assessment, and reference calls. We accept fewer than 25% of applicants." },
    { q: "How are chemistry calls structured?", a: "Chemistry calls are 20-minute structured video calls. Both parties receive a brief ahead of time. After the call, both sides rate the interaction and indicate whether they want to continue the conversation." },
    { q: "Is there a cost to join?", a: "Nexus is free during our early access period. We plan to introduce a premium tier with additional features, but core matching will always have a free option." },
    { q: "How is my data protected?", a: "All data is encrypted at rest and in transit. Pitch decks are only shared with matched investors who have signed our NDA framework. You control exactly what information is visible." },
  ];
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <motion.div key={i} variants={fadeUp} transition={{ duration: 0.5, ease }}>
          <div className="glass overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="text-[16px] font-semibold text-text-primary pr-4">{faq.q}</span>
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"
                className={`shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <p className="px-6 pb-6 text-text-secondary text-[15px] leading-[1.7]">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---- SVG Icons ---- */
function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-blue">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-violet">
      <path d="M12 3v1m0 16v1m-7.07-2.93l.71-.71M18.36 5.64l.71-.71M3 12h1m16 0h1M5.64 5.64l-.71-.71m13.43 13.43l-.71-.71" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-blue">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8m-4-4v4" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
}

/* ---- Small Arrow Icon ---- */
function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ---- Ticker number effect ---- */
function TickerValue({ value }: { value: string }) {
  const [display, setDisplay] = React.useState(() =>
    value.split("").map((c) => (/\d/.test(c) ? "0" : c)).join("")
  );

  useEffect(() => {
    const chars = value.split("");
    const digits = "0123456789";
    let frame = 0;
    const totalFrames = 8;
    const interval = 1500 / totalFrames;

    const timer = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(
          chars
            .map((c) =>
              /\d/.test(c) ? digits[Math.floor(Math.random() * 10)] : c
            )
            .join("")
        );
      }
    }, interval);

    return () => clearInterval(timer);
  }, [value]);

  return <>{display}</>;
}

/* ---- Floating Dashboard Mockups ---- */
function InvestorFeedCard() {
  return (
    <div
      className="w-[300px] min-h-[380px] rounded-2xl p-5 dashboard-card relative"
      style={{
        background: "rgba(10, 10, 15, 0.88)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(74, 108, 247, 0.2)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-white/50 text-[11px] tracking-[2px] uppercase">Investor Feed</p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] live-dot-pulse" />
          <span className="text-[10px] text-[#22c55e]/70">Live</span>
        </div>
      </div>

      {/* Startup card mockup */}
      <div className="bg-white/[0.05] rounded-xl p-4 mb-3 border border-white/[0.06]">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4A6CF7] to-[#7C5CFC] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
            L
          </div>
          <div>
            <p className="text-white text-[14px] font-semibold leading-tight">Luminary AI</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4A6CF7]/20 text-[#4A6CF7] inline-block mt-0.5">
              AI / ML
            </span>
          </div>
        </div>
        {/* 2x2 metrics grid with ticker effect */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[11px]">
          <div><p className="text-white/30 text-[9px]">MRR</p><p className="text-white font-medium"><TickerValue value="$45K" /></p></div>
          <div><p className="text-white/30 text-[9px]">Users</p><p className="text-white font-medium"><TickerValue value="2.4K" /></p></div>
          <div><p className="text-white/30 text-[9px]">Growth</p><p className="text-white font-medium text-[#22c55e]"><TickerValue value="180%" /></p></div>
          <div><p className="text-white/30 text-[9px]">Pipeline</p><p className="text-white font-medium"><TickerValue value="$2M" /></p></div>
        </div>
      </div>

      {/* Action buttons with sequential pulse on load */}
      <div className="flex justify-center gap-3.5 pt-1">
        <div className="w-9 h-9 rounded-full border border-red-400/20 bg-red-400/5 flex items-center justify-center text-red-400/50 cursor-default action-pulse-red">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </div>
        <div className="w-9 h-9 rounded-full border border-[#4A6CF7]/25 bg-[#4A6CF7]/8 flex items-center justify-center text-[#4A6CF7]/60 cursor-default action-pulse-blue">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
        </div>
        <div className="w-9 h-9 rounded-full border border-[#22c55e]/25 bg-[#22c55e]/8 flex items-center justify-center text-[#22c55e]/60 cursor-default action-pulse-green">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
      </div>
    </div>
  );
}

function MatchAnalyticsCard() {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - 0.94);

  return (
    <div
      className="w-[300px] min-h-[380px] rounded-2xl p-5 dashboard-card"
      style={{
        background: "rgba(10, 10, 15, 0.88)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(124, 92, 252, 0.2)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-white/50 text-[11px] tracking-[2px] uppercase">Match Analytics</p>
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-[#4A6CF7]" />
          <span className="text-[10px] text-[#4A6CF7]/70 updated-fade-in">Updated</span>
        </div>
      </div>

      {/* Score ring + label - 70px */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-[70px] h-[70px] shrink-0">
          <svg viewBox="0 0 70 70" className="w-full h-full -rotate-90">
            <circle cx="35" cy="35" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4A6CF7" />
                <stop offset="100%" stopColor="#7C5CFC" />
              </linearGradient>
            </defs>
            <circle
              cx="35" cy="35" r={r} fill="none"
              stroke="url(#scoreGrad)" strokeWidth="5" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={offset}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-white text-[18px] font-bold">94</span>
        </div>
        <div className="text-[11px]">
          <p className="text-white/30">Engagement</p>
          <p className="text-white font-medium text-[13px]">Score</p>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#22c55e]/10 text-[#22c55e] mt-1 inline-block">Top 5%</span>
        </div>
      </div>

      {/* Mini line chart */}
      <div className="mb-4 px-1">
        <svg viewBox="0 0 200 50" className="w-full h-[40px]">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4A6CF7" />
              <stop offset="100%" stopColor="#7C5CFC" />
            </linearGradient>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A6CF7" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,35 L50,28 L100,32 L150,18 L200,8" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round" className="chart-line-draw" />
          <path d="M0,35 L50,28 L100,32 L150,18 L200,8 L200,50 L0,50 Z" fill="url(#areaGrad)" />
          {[{ x: 0, y: 35 }, { x: 50, y: 28 }, { x: 100, y: 32 }, { x: 150, y: 18 }, { x: 200, y: 8 }].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#4A6CF7" stroke="rgba(10,10,15,0.88)" strokeWidth="1.5" />
          ))}
        </svg>
      </div>

      {/* Stats */}
      <div className="space-y-2 text-[12px] mb-4">
        <div className="flex justify-between">
          <span className="text-white/30">Matches This Week</span>
          <span className="text-white font-medium">7</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/30">Follow-Up Rate</span>
          <span className="text-white font-medium">89%</span>
        </div>
      </div>

      {/* Top Sectors */}
      <div>
        <p className="text-white/30 text-[10px] mb-2">Top Sectors</p>
        <div className="space-y-1.5">
          {[
            { label: "AI", width: "85%" },
            { label: "SaaS", width: "60%" },
            { label: "Fintech", width: "40%" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-white/40 text-[9px] w-[36px]">{s.label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: s.width, background: "linear-gradient(90deg, #4A6CF7, #7C5CFC)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MatchNotificationCard() {
  return (
    <div
      className="w-[230px] rounded-xl p-5 dashboard-card relative"
      style={{
        background: "rgba(10, 10, 15, 0.88)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(74, 108, 247, 0.2)",
      }}
    >
      {/* Notification badge */}
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500" />

      {/* Avatars with animated connection line */}
      <div className="flex items-center justify-center mb-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4A6CF7] to-[#6C5CE7] flex items-center justify-center text-white text-[10px] font-bold shrink-0 relative z-10 border-2 border-[rgba(10,10,15,0.88)]">
          SC
        </div>
        <div className="w-10 h-[2px] relative overflow-hidden mx-[-2px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A6CF7]/30 to-[#7C5CFC]/30" />
          <div
            className="connection-dot absolute top-[-1px] w-2 h-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.6)", filter: "blur(0.5px)" }}
          />
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#B06CFC] flex items-center justify-center text-white text-[10px] font-bold shrink-0 relative z-10 border-2 border-[rgba(10,10,15,0.88)]">
          LA
        </div>
      </div>
      <p className="text-white text-[14px] font-semibold text-center">New Match</p>
      <p className="text-white/25 text-[11px] text-center mt-1">2:34 PM</p>
    </div>
  );
}

function ChemistryCallCard() {
  return (
    <div
      className="w-[230px] rounded-xl p-5 dashboard-card"
      style={{
        background: "rgba(10, 10, 15, 0.88)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(124, 92, 252, 0.2)",
      }}
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8m-4-4v4" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
      <p className="text-white text-[14px] font-semibold text-center">Call Scheduled</p>
      <p className="text-white/30 text-[11px] text-center mt-1">Tomorrow at 3:00 PM</p>
      <div className="flex justify-center gap-2 mt-3">
        <div className="w-7 h-7 rounded-full bg-[#4A6CF7]/15 border border-[#4A6CF7]/25 flex items-center justify-center text-white text-[8px] font-bold">SC</div>
        <div className="w-7 h-7 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/25 flex items-center justify-center text-white text-[8px] font-bold">TH</div>
      </div>
    </div>
  );
}

/* ---- Main Page ---- */
export default function Home() {
  const blobsRef = useRef<HTMLDivElement>(null);

  /* Parallax scroll for background blobs */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (blobsRef.current) {
            blobsRef.current.style.transform = `translateY(${window.scrollY * 0.1}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-base text-text-primary">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Background gradient blobs with parallax */}
      <div
        ref={blobsRef}
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        style={{ willChange: "transform" }}
      >
        <div className="blob blob-blue animate-blob-1 -top-[5%] right-[10%]" />
        <div className="blob blob-lavender animate-blob-2 top-[40%] -left-[5%]" />
        <div className="blob blob-peach animate-blob-3 bottom-[10%] right-[20%]" />
      </div>

      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative z-10 min-h-screen">
        {/* Floating dashboards */}
        <div className="absolute inset-0 overflow-hidden hidden xl:block pointer-events-none">
          {/* Left: Investor Feed */}
          <div
            className="absolute left-[3%] 2xl:left-[5%] top-1/2 -translate-y-1/2 pointer-events-auto dashboard-entrance"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="dashboard-group relative">
              <div className="glow-behind glow-behind-blue" />
              <div className="animate-float">
                <InvestorFeedCard />
              </div>
            </div>
          </div>

          {/* Right: Match Analytics */}
          <div
            className="absolute right-[3%] 2xl:right-[5%] top-1/2 -translate-y-1/2 pointer-events-auto dashboard-entrance"
            style={{ animationDelay: "0.9s" }}
          >
            <div className="dashboard-group relative">
              <div className="glow-behind glow-behind-violet" />
              <div className="animate-float-delayed">
                <MatchAnalyticsCard />
              </div>
            </div>
          </div>
        </div>

        {/* Centered hero text */}
        <div className="flex flex-col items-center justify-center text-center px-6 min-h-screen max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            transition={{ delayChildren: 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Eyebrow - gradient text */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="gradient-text text-[13px] tracking-[5px] uppercase mb-6 font-medium"
            >
              The Curated Investment Marketplace
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="text-[44px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-normal leading-[1.1] tracking-tight mb-8"
              style={{ fontFamily: "'Instrument Serif', serif", textShadow: "0 0 40px rgba(74,108,247,0.08)" }}
            >
              Where Capital
              <br />
              Meets <span className="gradient-text">Vision</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="text-[17px] md:text-[19px] max-w-[540px] mb-12 leading-[1.8]"
              style={{ color: "#475569" }}
            >
              Nexus connects vetted startups with accredited investors through
              intelligent daily matching. No cold emails. No noise. Just signal.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/apply/investor"
                className="group btn-shimmer btn-hero-glow inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-semibold text-white rounded-2xl"
                style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
              >
                Apply as Investor
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/apply/startup"
                className="group btn-shimmer btn-hero-secondary inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-medium"
              >
                Apply as Startup
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Invitation pill */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="mt-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] text-text-muted/70"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                border: "1px solid rgba(0, 0, 0, 0.04)",
                backdropFilter: "blur(8px)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              By invitation only. Currently accepting applications.
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <Section id="how-it-works" className="relative z-10 px-6 py-24 md:py-32 max-w-6xl mx-auto">
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-text-muted text-[13px] tracking-[3px] uppercase mb-4"
          >
            The Process
          </motion.p>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-[36px] md:text-[44px] font-normal text-center mb-16"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            How It Works
          </motion.h2>

          <motion.div
            variants={cardStagger}
            className="grid md:grid-cols-3 gap-6 md:gap-8 w-full"
          >
            {[
              {
                num: "01",
                icon: <ShieldIcon />,
                title: "Apply & Get Vetted",
                desc: "Submit your profile for review by our curation team. We accept fewer than 25% of applicants to maintain network quality.",
              },
              {
                num: "02",
                icon: <SparkleIcon />,
                title: "Get Matched Daily",
                desc: "Our algorithm delivers 3-5 highly compatible matches to your feed each morning. No endless scrolling, just signal.",
              },
              {
                num: "03",
                icon: <PhoneIcon />,
                title: "Take Chemistry Calls",
                desc: "When interest is mutual, we schedule a structured 20-minute intro call. No scheduling back-and-forth.",
              },
            ].map((card) => (
              <motion.div
                key={card.num}
                variants={fadeUp}
                transition={{ duration: 0.6, ease }}
              >
                <div className="glow-card-wrapper h-full">
                  <div className="glass p-8 md:p-10 h-full relative overflow-hidden">
                    <span
                      className="step-number text-[60px] font-normal text-text-primary/[0.06] absolute top-4 right-6 leading-none select-none"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {card.num}
                    </span>
                    <div className="relative">
                      <div className="mb-5">{card.icon}</div>
                      <h3 className="text-[18px] md:text-[20px] font-semibold mb-3 text-text-primary">
                        {card.title}
                      </h3>
                      <p className="text-text-secondary text-[15px] md:text-[16px] leading-[1.7]">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* ============ STATS (DARK SECTION) ============ */}
      <section className="relative z-10 py-24 md:py-32 bg-dark-section overflow-hidden">
        <ParticleField />
        <div className="grid-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(74,108,247,0.08)_0%,_rgba(124,92,252,0.05)_40%,_transparent_70%)]" />
        </div>

        <motion.div
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: 0.6, ease }}
          className="relative max-w-6xl mx-auto px-6"
        >
          <div className="glass-dark px-6 py-12 md:px-16 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center">
              {[
                { target: 500, prefix: "", suffix: "+", label: "Vetted Startups", decimals: 0 },
                { target: 2.1, prefix: "$", suffix: "B+", label: "In Deal Flow", decimals: 1 },
                { target: 89, prefix: "", suffix: "%", label: "Call-to-Follow-Up Rate", decimals: 0 },
                { target: 4.8, prefix: "", suffix: "", label: "Avg Match Rating", decimals: 1 },
              ].map((stat, index) => (
                <div key={stat.label}>
                  <p
                    className="text-[32px] sm:text-[40px] md:text-[52px] font-normal text-white leading-none mb-2"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    <CountUp
                      target={stat.target}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      delay={index * 200}
                    />
                  </p>
                  <p className="text-[#9CA3AF] text-[13px] md:text-[14px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-12 left-0 right-0 h-px overflow-hidden pointer-events-none">
          <div className="sweep-line" />
        </div>
      </section>

      {/* ============ FOR INVESTORS / FOR STARTUPS ============ */}
      <Section id="for-investors" className="relative z-10 px-6 py-24 md:py-32 max-w-6xl mx-auto">
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid md:grid-cols-2 gap-6 md:gap-8"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
          >
            <div className="glow-card-wrapper h-full">
              <div className="glass p-8 md:p-10 h-full flex flex-col">
                <h3
                  className="text-[28px] md:text-[32px] font-normal mb-8 text-text-primary"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  For Investors
                </h3>
                <ul className="flex flex-col gap-4 flex-1">
                  {[
                    "Pre-vetted deal flow matched to your thesis",
                    "No more sorting through hundreds of cold pitches",
                    "Structured intro calls save you 10+ hours per week",
                    "See engagement data on every startup",
                    "First-look advantage on emerging companies",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent-blue mt-2 shrink-0" />
                      <span className="text-text-secondary text-[15px] md:text-[16px] leading-[1.7]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/apply/investor"
                  className="btn-primary btn-pulse-target px-6 py-3.5 text-[15px] font-medium mt-8 text-center"
                >
                  Apply as Investor
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            id="for-startups"
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
          >
            <div className="glow-card-wrapper h-full">
              <div className="glass p-8 md:p-10 h-full flex flex-col">
                <h3
                  className="text-[28px] md:text-[32px] font-normal mb-8 text-text-primary"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  For Startups
                </h3>
                <ul className="flex flex-col gap-4 flex-1">
                  {[
                    "Direct access to investors actively looking for you",
                    "Know exactly who viewed your deck",
                    "72-hour response guarantee on every match",
                    "Structured calls that actually lead to follow-ups",
                    "Join a network that signals credibility",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent-violet mt-2 shrink-0" />
                      <span className="text-text-secondary text-[15px] md:text-[16px] leading-[1.7]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/apply/startup"
                  className="btn-primary btn-pulse-target px-6 py-3.5 text-[15px] font-medium mt-8 text-center"
                >
                  Apply as Startup
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* ============ TESTIMONIALS ============ */}
      <Section className="relative z-10 px-6 py-24 md:py-32 max-w-6xl mx-auto">
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-text-muted text-[13px] tracking-[3px] uppercase mb-4"
          >
            From the Network
          </motion.p>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-[36px] md:text-[44px] font-normal text-center mb-16"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            What Members Are Saying
          </motion.h2>

          <motion.div
            variants={cardStagger}
            className="grid md:grid-cols-3 gap-6 md:gap-8 w-full"
          >
            {[
              {
                quote: "I used to spend 15 hours a week sorting through cold pitches. Nexus cut that to under an hour. The match quality is unreal.",
                name: "Sarah Chen",
                title: "Partner, Gradient Ventures",
                initials: "SC",
                color: "#4A6CF7",
              },
              {
                quote: "We closed our seed round in 3 weeks. Every investor we talked to through Nexus actually understood our space.",
                name: "Marcus Obi",
                title: "CEO, Stackpay",
                initials: "MO",
                color: "#0d9488",
              },
              {
                quote: "The chemistry calls are a game changer. 20 minutes, structured, no fluff. Both sides know if there is a fit immediately.",
                name: "Elena Rodriguez",
                title: "GP, Precursor Ventures",
                initials: "ER",
                color: "#7C5CFC",
              },
            ].map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={fadeUp}
                transition={{ duration: 0.6, ease }}
              >
                <div className="glow-card-wrapper h-full">
                  <div className="glass p-8 md:p-10 h-full flex flex-col">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-accent-blue/20 mb-5 shrink-0"
                    >
                      <path
                        d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"
                        fill="currentColor"
                      />
                      <path
                        d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 .997 0 1.031 1 1.031z"
                        fill="currentColor"
                      />
                    </svg>
                    <p className="text-text-secondary text-[15px] md:text-[16px] leading-[1.7] flex-1 mb-6">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                        style={{ backgroundColor: testimonial.color }}
                      >
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-text-primary">
                          {testimonial.name}
                        </p>
                        <p className="text-[13px] text-text-muted">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* ============ FAQ ============ */}
      <Section id="faq" className="relative z-10 px-6 py-24 md:py-32 max-w-3xl mx-auto">
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-text-muted text-[13px] tracking-[3px] uppercase mb-4"
          >
            Questions
          </motion.p>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-[36px] md:text-[44px] font-normal text-center mb-12"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Frequently Asked
          </motion.h2>

          <motion.div variants={cardStagger} className="w-full">
            <FAQSection />
          </motion.div>
        </motion.div>
      </Section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative z-10 py-24 md:py-32">
        {/* Floating decorative cards */}
        <div className="absolute inset-0 overflow-hidden hidden lg:block pointer-events-none">
          {/* Left: Match Notification */}
          <div
            className="absolute left-[4%] xl:left-[8%] 2xl:left-[12%] top-1/2 -translate-y-1/2 pointer-events-auto dashboard-entrance"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="dashboard-group relative">
              <div className="glow-behind glow-behind-blue" style={{ width: "250px", height: "250px" }} />
              <div className="animate-float">
                <MatchNotificationCard />
              </div>
            </div>
          </div>

          {/* Right: Chemistry Call */}
          <div
            className="absolute right-[4%] xl:right-[8%] 2xl:right-[12%] top-1/2 -translate-y-1/2 pointer-events-auto dashboard-entrance"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="dashboard-group relative">
              <div className="glow-behind glow-behind-violet" style={{ width: "250px", height: "250px" }} />
              <div className="animate-float-delayed">
                <ChemistryCallCard />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Content */}
        <motion.div
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: 0.6, ease }}
          className="relative max-w-4xl mx-auto px-6 text-center"
        >
          <motion.div
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col items-center"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="text-[36px] md:text-[48px] font-normal mb-6"
              style={{ fontFamily: "'Instrument Serif', serif", textShadow: "0 0 40px rgba(74,108,247,0.08)" }}
            >
              Ready to Join the <span className="gradient-text">Network</span>?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="text-[17px] md:text-[18px] mb-10 max-w-xl leading-[1.7]"
              style={{ color: "#475569" }}
            >
              Nexus is built for people who value quality over quantity. Apply
              today and get access to a network that actually moves the needle.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
            >
              <Link
                href="/apply/investor"
                className="group btn-shimmer btn-hero-glow inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-semibold text-white rounded-2xl"
                style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
              >
                Apply for Access
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <p className="text-text-muted/50 text-[13px] mt-6">
                Applications reviewed within 48 hours.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-10 mt-12">
        <div className="border-t border-black/[0.06]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <a
              href="#"
              className="text-[14px] font-bold tracking-[0.3em] text-text-primary"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              NEXUS
            </a>
            <p className="text-text-muted/60 text-[13px]">
              &copy; 2026 Nexus. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-text-muted/60 hover:text-text-secondary transition-colors duration-300 text-[13px]"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-text-muted/60 hover:text-text-secondary transition-colors duration-300 text-[13px]"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
