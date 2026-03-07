"use client";

import { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  PanInfo,
} from "framer-motion";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

const ease = [0.25, 0.4, 0.25, 1] as const;

/* ─── Fake Data ─── */
interface Founder {
  initials: string;
  color: string;
  name: string;
  title: string;
}

interface Startup {
  id: number;
  name: string;
  initials: string;
  color: string;
  oneLiner: string;
  sector: string;
  stage: string;
  metrics: { value: string; label: string }[];
  askAmount: string;
  askBullets: string[];
  founders: Founder[];
}

const startups: Startup[] = [
  {
    id: 1,
    name: "Luminary AI",
    initials: "LA",
    color: "#4A6CF7",
    oneLiner: "AI-powered contract analysis for legal teams",
    sector: "AI / Machine Learning",
    stage: "Seed Stage",
    metrics: [
      { value: "$45K", label: "MRR" },
      { value: "2,400", label: "Users" },
      { value: "180%", label: "MoM Growth" },
      { value: "$2M", label: "Pipeline" },
    ],
    askAmount: "$1.5M Seed Round",
    askBullets: [
      "Investors with AI/SaaS expertise",
      "Check sizes $100K-$500K",
      "Strategic value beyond capital",
    ],
    founders: [
      { initials: "SK", color: "#4A6CF7", name: "Sarah Kim", title: "CEO" },
      { initials: "JR", color: "#7C5CFC", name: "James Rivera", title: "CTO" },
      { initials: "AP", color: "#0d9488", name: "Anika Patel", title: "CPO" },
    ],
  },
  {
    id: 2,
    name: "Stackpay",
    initials: "SP",
    color: "#0d9488",
    oneLiner: "Embedded payroll infrastructure for platforms",
    sector: "Fintech / Infrastructure",
    stage: "Seed Stage",
    metrics: [
      { value: "$82K", label: "MRR" },
      { value: "34", label: "Enterprise Clients" },
      { value: "22%", label: "MoM Growth" },
      { value: "$4.1M", label: "Pipeline" },
    ],
    askAmount: "$3M Seed Round",
    askBullets: [
      "Fintech operators or former founders",
      "Check sizes $250K-$750K",
      "Distribution partnerships in payroll/HR",
    ],
    founders: [
      { initials: "MO", color: "#0d9488", name: "Marcus Obi", title: "CEO" },
      { initials: "LW", color: "#4A6CF7", name: "Lisa Wang", title: "CTO" },
      { initials: "DK", color: "#7C5CFC", name: "David Ko", title: "COO" },
    ],
  },
  {
    id: 3,
    name: "Terraform Health",
    initials: "TH",
    color: "#7C5CFC",
    oneLiner: "Predictive diagnostics using wearable biosignals",
    sector: "Health Tech / AI",
    stage: "Pre-Seed",
    metrics: [
      { value: "$12K", label: "MRR" },
      { value: "890", label: "Beta Users" },
      { value: "340%", label: "MoM Growth" },
      { value: "$800K", label: "Pipeline" },
    ],
    askAmount: "$750K Pre-Seed Round",
    askBullets: [
      "Health tech or biotech investors",
      "Check sizes $50K-$200K",
      "Clinical trial connections",
    ],
    founders: [
      { initials: "EN", color: "#7C5CFC", name: "Elena Navarro", title: "CEO" },
      { initials: "RT", color: "#0d9488", name: "Raj Thakur", title: "CTO" },
      { initials: "CM", color: "#4A6CF7", name: "Claire Moore", title: "CSO" },
    ],
  },
  {
    id: 4,
    name: "Canopy Analytics",
    initials: "CA",
    color: "#059669",
    oneLiner: "Real-time carbon tracking for supply chains",
    sector: "Climate Tech / Analytics",
    stage: "Seed Stage",
    metrics: [
      { value: "$67K", label: "MRR" },
      { value: "18", label: "Enterprise Clients" },
      { value: "15%", label: "MoM Growth" },
      { value: "$3.2M", label: "Pipeline" },
    ],
    askAmount: "$2.5M Seed Round",
    askBullets: [
      "Climate-focused or ESG investors",
      "Check sizes $200K-$500K",
      "Enterprise procurement introductions",
    ],
    founders: [
      { initials: "TJ", color: "#059669", name: "Tomas Jensen", title: "CEO" },
      { initials: "NB", color: "#4A6CF7", name: "Nadia Brooks", title: "CTO" },
      { initials: "KL", color: "#7C5CFC", name: "Kevin Liu", title: "Head of Sales" },
    ],
  },
  {
    id: 5,
    name: "Briefly",
    initials: "Br",
    color: "#e67e22",
    oneLiner: "AI meeting assistant that writes follow-ups that actually get read",
    sector: "Productivity / AI",
    stage: "Pre-Seed",
    metrics: [
      { value: "$8K", label: "MRR" },
      { value: "4,200", label: "Users" },
      { value: "210%", label: "MoM Growth" },
      { value: "$500K", label: "Pipeline" },
    ],
    askAmount: "$600K Pre-Seed Round",
    askBullets: [
      "SaaS or productivity-focused investors",
      "Check sizes $25K-$150K",
      "GTM and distribution expertise",
    ],
    founders: [
      { initials: "AZ", color: "#e67e22", name: "Ava Zhang", title: "CEO" },
      { initials: "BT", color: "#4A6CF7", name: "Ben Torres", title: "CTO" },
      { initials: "JP", color: "#0d9488", name: "Jess Park", title: "Head of Product" },
    ],
  },
];


/* ─── Countdown hook ─── */
function useCountdown() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calcTime = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(8, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    };
    calcTime();
    const interval = setInterval(calcTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

/* ─── Startup Card ─── */
function StartupCard({
  startup,
  onPass,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSave,
  onInterested,
}: {
  startup: Startup;
  onPass: () => void;
  onSave: () => void;
  onInterested: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-8, 0, 8]);
  const passOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0]);
  const interestedOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -120) {
      onPass();
    } else if (info.offset.x > 120) {
      onInterested();
    }
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
    >
      {/* Swipe indicators */}
      <motion.div
        className="absolute top-8 left-8 z-20 px-4 py-2 rounded-xl border-2 border-red-400 text-red-400 font-bold text-lg rotate-[-12deg]"
        style={{ opacity: passOpacity }}
      >
        PASS
      </motion.div>
      <motion.div
        className="absolute top-8 right-8 z-20 px-4 py-2 rounded-xl border-2 border-accent-blue text-accent-blue font-bold text-lg rotate-[12deg]"
        style={{ opacity: interestedOpacity }}
      >
        INTERESTED
      </motion.div>

      <div
        className="w-full max-w-[600px] mx-4 rounded-3xl overflow-y-auto max-h-[calc(100vh-220px)]"
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(24px) saturate(1.3)",
          WebkitBackdropFilter: "blur(24px) saturate(1.3)",
          border: "1px solid rgba(255, 255, 255, 0.65)",
          boxShadow:
            "0 8px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
        }}
      >
        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ backgroundColor: startup.color }}
            >
              {startup.initials}
            </div>
            <div>
              <h2 className="text-[22px] md:text-[24px] font-bold text-text-primary">
                <Link href={`/startup/${startup.id}`} className="hover:underline">
                  {startup.name}
                </Link>
              </h2>
              <p className="text-text-secondary text-[15px] md:text-[16px]">
                {startup.oneLiner}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1.5 rounded-full text-[13px] text-accent-blue bg-accent-blue/5 border border-accent-blue/20">
              {startup.sector}
            </span>
            <span className="px-3 py-1.5 rounded-full text-[13px] text-accent-blue bg-accent-blue/5 border border-accent-blue/20">
              {startup.stage}
            </span>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {startup.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl p-4"
                style={{
                  background: "rgba(255, 255, 255, 0.35)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
              >
                <p className="text-[22px] md:text-[24px] font-semibold text-text-primary">
                  {m.value}
                </p>
                <p className="text-[13px] text-text-muted">{m.label}</p>
              </div>
            ))}
          </div>

          {/* The Ask */}
          <div className="mb-8">
            <p className="text-text-muted text-[12px] tracking-[2px] uppercase mb-3">
              Looking For
            </p>
            <p className="text-text-primary text-[17px] font-semibold mb-3">
              {startup.askAmount}
            </p>
            <ul className="flex flex-col gap-2">
              {startup.askBullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 shrink-0" />
                  <span className="text-text-secondary text-[15px] leading-[1.6]">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div className="mb-6">
            <p className="text-text-muted text-[12px] tracking-[2px] uppercase mb-4">
              Team
            </p>
            <div className="flex gap-6">
              {startup.founders.map((f) => (
                <div key={f.name} className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold mb-2"
                    style={{ backgroundColor: f.color }}
                  >
                    {f.initials}
                  </div>
                  <p className="text-text-primary text-[13px] font-medium">
                    {f.name}
                  </p>
                  <p className="text-text-muted text-[12px]">{f.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* View Deck */}
          <Link
            href={`/startup/${startup.id}`}
            className="inline-flex items-center gap-1.5 text-accent-blue text-[15px] font-medium hover:underline"
          >
            View Pitch Deck
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── All Caught Up ─── */
function AllCaughtUp() {
  const countdown = useCountdown();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="flex flex-col items-center text-center px-6"
    >
      <h2
        className="text-[28px] md:text-[32px] font-normal text-text-primary mb-4"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        All Caught Up
      </h2>
      <p className="text-text-secondary text-[16px] mb-6">
        Your next matches arrive in
      </p>
      <div
        className="px-6 py-3 rounded-full text-[24px] font-semibold text-text-primary tracking-wide mb-8"
        style={{
          background: "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {countdown}
      </div>
      <Link
        href="/drops"
        className="text-accent-blue text-[15px] font-medium hover:underline"
      >
        Review Saved Startups
      </Link>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function DropsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(
    null
  );
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const total = startups.length;
  const remaining = total - currentIndex;
  const allDone = currentIndex >= total;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const advance = useCallback(
    (direction: "left" | "right") => {
      if (allDone) return;
      setExitDirection(direction);
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setExitDirection(null);
      }, 300);
    },
    [allDone]
  );

  const handlePass = useCallback(() => advance("left"), [advance]);
  const handleInterested = useCallback(() => advance("right"), [advance]);
  const handleSave = useCallback(() => {
    if (allDone) return;
    const startup = startups[currentIndex];
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(startup.id)) {
        next.delete(startup.id);
      } else {
        next.add(startup.id);
        setToast(`${startup.name} saved to your list`);
        setTimeout(() => setToast(null), 2500);
      }
      return next;
    });
  }, [currentIndex, allDone]);

  const isSaved = !allDone && currentIndex < startups.length && savedIds.has(startups[currentIndex]?.id);

  return (
    <div className="h-screen flex bg-base text-text-primary overflow-hidden relative">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-[14px] font-medium text-text-primary whitespace-nowrap"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 top-[10%] right-[15%]" />
        <div className="blob blob-lavender animate-blob-2 bottom-[20%] left-[10%]" />
        <div className="blob blob-peach animate-blob-3 top-[50%] right-[30%]" />
      </div>

      <Sidebar role="investor" activeLabel="Daily Drops" />

      {/* ─── Main Content ─── */}
      <div className="flex-1 md:ml-[240px] flex flex-col h-screen relative z-10">
        {/* Top bar */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease }}
          className="px-6 md:px-10 pt-6 pb-4 flex items-center justify-between shrink-0"
        >
          <div>
            <h1
              className="text-[24px] md:text-[28px] font-normal text-text-primary"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Your Daily Matches
            </h1>
            <p className="text-text-muted text-[14px] mt-0.5">{today}</p>
          </div>

          <motion.div
            key={remaining}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25 }}
            className="px-4 py-2 rounded-full text-[14px] font-medium relative overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Blue fill bar */}
            <div
              className="absolute inset-0 bg-accent-blue/10 transition-all duration-500"
              style={{
                width: `${allDone ? 0 : (remaining / total) * 100}%`,
              }}
            />
            <span className="relative text-text-primary">
              {allDone
                ? "0 remaining"
                : `${remaining} of ${total} remaining`}
            </span>
          </motion.div>
        </motion.header>

        {/* Card area */}
        <div className="flex-1 flex flex-col items-center justify-center relative pb-4">
          {allDone ? (
            <AllCaughtUp />
          ) : (
            <>
              {/* Card stack */}
              <div className="relative w-full max-w-[640px] mx-auto flex-1 flex items-center justify-center">
                {/* Next card preview */}
                {currentIndex + 1 < total && !exitDirection && (
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ transform: "scale(0.95)", opacity: 0.4 }}
                  >
                    <div
                      className="w-full max-w-[600px] mx-4 h-[400px] rounded-3xl"
                      style={{
                        background: "rgba(255, 255, 255, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.4)",
                      }}
                    />
                  </div>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={startups[currentIndex].id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      x: exitDirection === "left" ? -300 : 300,
                      rotate: exitDirection === "left" ? -10 : 10,
                      transition: { duration: 0.3, ease },
                    }}
                    transition={{ duration: 0.4, ease }}
                    className="absolute inset-0"
                  >
                    <StartupCard
                      startup={startups[currentIndex]}
                      onPass={handlePass}
                      onSave={handleSave}
                      onInterested={handleInterested}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease }}
                className="flex items-center gap-5 py-4 shrink-0"
              >
                {/* Pass */}
                <button
                  onClick={handlePass}
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-250"
                  style={{
                    background: "rgba(255, 255, 255, 0.45)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                    boxShadow:
                      "0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                    e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(239, 68, 68, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.45)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)";
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Save */}
                <button
                  onClick={handleSave}
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-250"
                  style={{
                    background: "rgba(255, 255, 255, 0.45)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                    boxShadow:
                      "0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(74, 108, 247, 0.1)";
                    e.currentTarget.style.borderColor = "rgba(74, 108, 247, 0.3)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(74, 108, 247, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.45)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)";
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill={isSaved ? "#4A6CF7" : "none"} stroke="#4A6CF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-200">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                  </svg>
                </button>

                {/* Interested */}
                <button
                  onClick={handleInterested}
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-250"
                  style={{
                    background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(74, 108, 247, 0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(124, 92, 252, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(74, 108, 247, 0.35)";
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}
