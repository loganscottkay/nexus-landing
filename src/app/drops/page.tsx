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

interface Milestone {
  date: string;
  text: string;
}

interface Startup {
  id: number;
  name: string;
  initials: string;
  color: string;
  oneLiner: string;
  sector: string;
  stage: string;
  location: string;
  founded: string;
  metrics: { value: string; label: string; trend: string; trendDir: "up" | "down" }[];
  askAmount: string;
  askDisplay: string;
  fundAllocation: { label: string; pct: number; color: string }[];
  askBullets: string[];
  founders: Founder[];
  milestones: Milestone[];
  nexusScore: number;
  pitchFounder: { name: string; title: string; initials: string; color: string };
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
    location: "San Francisco, CA",
    founded: "Jun 2025",
    metrics: [
      { value: "$45K", label: "MRR", trend: "+22%", trendDir: "up" },
      { value: "2,400", label: "Active Users", trend: "+18%", trendDir: "up" },
      { value: "180%", label: "MoM Growth", trend: "+12%", trendDir: "up" },
      { value: "$2M", label: "Pipeline", trend: "+35%", trendDir: "up" },
    ],
    askAmount: "$1.5M Seed Round",
    askDisplay: "Raising $1.5M Seed Round",
    fundAllocation: [
      { label: "Engineering", pct: 55, color: "#4A6CF7" },
      { label: "Go-to-Market", pct: 30, color: "#7C5CFC" },
      { label: "Operations", pct: 15, color: "#94A3B8" },
    ],
    askBullets: [
      "Investors with AI/SaaS expertise",
      "$100K-$500K check sizes",
      "Strategic value beyond capital",
    ],
    founders: [
      { initials: "AR", color: "#4A6CF7", name: "Alex Rivera", title: "CEO & Co-Founder" },
      { initials: "JK", color: "#7C5CFC", name: "Jordan Kim", title: "CTO & Co-Founder" },
      { initials: "SO", color: "#0d9488", name: "Sam Okafor", title: "Head of Sales" },
    ],
    milestones: [
      { date: "Mar 2026", text: "Closed $500K pre-seed" },
      { date: "Jan 2026", text: "Launched v2.0 with AI contract comparison" },
      { date: "Nov 2025", text: "First 1,000 users milestone" },
    ],
    nexusScore: 87,
    pitchFounder: { name: "Alex Rivera", title: "CEO & Co-Founder", initials: "AR", color: "#4A6CF7" },
  },
  {
    id: 2,
    name: "Stackpay",
    initials: "SP",
    color: "#0d9488",
    oneLiner: "Embedded payroll infrastructure for platforms",
    sector: "Fintech / Infrastructure",
    stage: "Seed Stage",
    location: "New York, NY",
    founded: "Mar 2025",
    metrics: [
      { value: "$82K", label: "MRR", trend: "+28%", trendDir: "up" },
      { value: "34", label: "Enterprise Clients", trend: "+6", trendDir: "up" },
      { value: "22%", label: "MoM Growth", trend: "+3%", trendDir: "up" },
      { value: "$4.1M", label: "Pipeline", trend: "+41%", trendDir: "up" },
    ],
    askAmount: "$3M Seed Round",
    askDisplay: "Raising $3M Seed Round",
    fundAllocation: [
      { label: "Engineering", pct: 45, color: "#4A6CF7" },
      { label: "Go-to-Market", pct: 35, color: "#7C5CFC" },
      { label: "Operations", pct: 20, color: "#94A3B8" },
    ],
    askBullets: [
      "Fintech operators or former founders",
      "$250K-$750K check sizes",
      "Distribution partnerships in payroll/HR",
    ],
    founders: [
      { initials: "MO", color: "#0d9488", name: "Marcus Obi", title: "CEO & Founder" },
      { initials: "LW", color: "#4A6CF7", name: "Lisa Wang", title: "CTO" },
      { initials: "DK", color: "#7C5CFC", name: "David Ko", title: "COO" },
    ],
    milestones: [
      { date: "Feb 2026", text: "Signed 3 Fortune 500 pilots" },
      { date: "Dec 2025", text: "$50K MRR milestone" },
      { date: "Aug 2025", text: "Launched public API" },
    ],
    nexusScore: 91,
    pitchFounder: { name: "Marcus Obi", title: "CEO & Founder", initials: "MO", color: "#0d9488" },
  },
  {
    id: 3,
    name: "Terraform Health",
    initials: "TH",
    color: "#7C5CFC",
    oneLiner: "Predictive diagnostics using wearable biosignals",
    sector: "Health Tech / AI",
    stage: "Pre-Seed",
    location: "Boston, MA",
    founded: "Sep 2025",
    metrics: [
      { value: "$12K", label: "MRR", trend: "+45%", trendDir: "up" },
      { value: "890", label: "Beta Users", trend: "+120", trendDir: "up" },
      { value: "340%", label: "MoM Growth", trend: "+80%", trendDir: "up" },
      { value: "$800K", label: "Pipeline", trend: "+25%", trendDir: "up" },
    ],
    askAmount: "$750K Pre-Seed Round",
    askDisplay: "Raising $750K Pre-Seed Round",
    fundAllocation: [
      { label: "R&D", pct: 60, color: "#4A6CF7" },
      { label: "Clinical Trials", pct: 25, color: "#7C5CFC" },
      { label: "Operations", pct: 15, color: "#94A3B8" },
    ],
    askBullets: [
      "Health tech or biotech investors",
      "$50K-$200K check sizes",
      "Clinical trial connections",
    ],
    founders: [
      { initials: "EN", color: "#7C5CFC", name: "Elena Navarro", title: "CEO & Co-Founder" },
      { initials: "RT", color: "#0d9488", name: "Raj Thakur", title: "CTO" },
      { initials: "CM", color: "#4A6CF7", name: "Claire Moore", title: "Chief Science Officer" },
    ],
    milestones: [
      { date: "Feb 2026", text: "FDA pre-submission meeting scheduled" },
      { date: "Dec 2025", text: "500 beta users onboarded" },
      { date: "Oct 2025", text: "Published peer-reviewed validation study" },
    ],
    nexusScore: 78,
    pitchFounder: { name: "Elena Navarro", title: "CEO & Co-Founder", initials: "EN", color: "#7C5CFC" },
  },
  {
    id: 4,
    name: "Canopy Analytics",
    initials: "CA",
    color: "#059669",
    oneLiner: "Real-time carbon tracking for supply chains",
    sector: "Climate Tech / Analytics",
    stage: "Seed Stage",
    location: "Austin, TX",
    founded: "Jan 2025",
    metrics: [
      { value: "$67K", label: "MRR", trend: "+15%", trendDir: "up" },
      { value: "18", label: "Enterprise Clients", trend: "+4", trendDir: "up" },
      { value: "15%", label: "MoM Growth", trend: "-2%", trendDir: "down" },
      { value: "$3.2M", label: "Pipeline", trend: "+52%", trendDir: "up" },
    ],
    askAmount: "$2.5M Seed Round",
    askDisplay: "Raising $2.5M Seed Round",
    fundAllocation: [
      { label: "Engineering", pct: 50, color: "#4A6CF7" },
      { label: "Go-to-Market", pct: 30, color: "#7C5CFC" },
      { label: "Operations", pct: 20, color: "#94A3B8" },
    ],
    askBullets: [
      "Climate-focused or ESG investors",
      "$200K-$500K check sizes",
      "Enterprise procurement introductions",
    ],
    founders: [
      { initials: "TJ", color: "#059669", name: "Tomas Jensen", title: "CEO & Co-Founder" },
      { initials: "NB", color: "#4A6CF7", name: "Nadia Brooks", title: "CTO" },
      { initials: "KL", color: "#7C5CFC", name: "Kevin Liu", title: "Head of Sales" },
    ],
    milestones: [
      { date: "Mar 2026", text: "Partnered with 2 Fortune 100 companies" },
      { date: "Jan 2026", text: "Crossed $50K MRR" },
      { date: "Sep 2025", text: "Won TechCrunch Disrupt Climate category" },
    ],
    nexusScore: 83,
    pitchFounder: { name: "Tomas Jensen", title: "CEO & Co-Founder", initials: "TJ", color: "#059669" },
  },
  {
    id: 5,
    name: "Briefly",
    initials: "Br",
    color: "#e67e22",
    oneLiner: "AI meeting assistant that writes follow-ups that actually get read",
    sector: "Productivity / AI",
    stage: "Pre-Seed",
    location: "Los Angeles, CA",
    founded: "Nov 2025",
    metrics: [
      { value: "$8K", label: "MRR", trend: "+62%", trendDir: "up" },
      { value: "4,200", label: "Users", trend: "+800", trendDir: "up" },
      { value: "210%", label: "MoM Growth", trend: "+30%", trendDir: "up" },
      { value: "$500K", label: "Pipeline", trend: "+18%", trendDir: "up" },
    ],
    askAmount: "$600K Pre-Seed Round",
    askDisplay: "Raising $600K Pre-Seed Round",
    fundAllocation: [
      { label: "Engineering", pct: 60, color: "#4A6CF7" },
      { label: "Go-to-Market", pct: 30, color: "#7C5CFC" },
      { label: "Operations", pct: 10, color: "#94A3B8" },
    ],
    askBullets: [
      "SaaS or productivity-focused investors",
      "$25K-$150K check sizes",
      "GTM and distribution expertise",
    ],
    founders: [
      { initials: "AZ", color: "#e67e22", name: "Ava Zhang", title: "CEO & Co-Founder" },
      { initials: "BT", color: "#4A6CF7", name: "Ben Torres", title: "CTO" },
      { initials: "JP", color: "#0d9488", name: "Jess Park", title: "Head of Product" },
    ],
    milestones: [
      { date: "Feb 2026", text: "4,000 users, viral growth on LinkedIn" },
      { date: "Jan 2026", text: "Launched Chrome extension" },
      { date: "Dec 2025", text: "First 1,000 users in 3 weeks" },
    ],
    nexusScore: 74,
    pitchFounder: { name: "Ava Zhang", title: "CEO & Co-Founder", initials: "AZ", color: "#e67e22" },
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

/* ─── LinkedIn Icon ─── */
function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent-blue hover:opacity-70 transition-opacity cursor-pointer">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
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

  const scoreColor = startup.nexusScore >= 85 ? "#059669" : startup.nexusScore >= 75 ? "#4A6CF7" : "#D97706";

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
        className="w-full max-w-[620px] mx-4 rounded-3xl overflow-y-auto max-h-[calc(100vh-220px)]"
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(24px) saturate(1.3)",
          WebkitBackdropFilter: "blur(24px) saturate(1.3)",
          border: "1px solid rgba(255, 255, 255, 0.65)",
          boxShadow:
            "0 8px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 0 0 1px rgba(74, 108, 247, 0.08)",
        }}
      >
        <div className="p-7 md:p-9">
          {/* ═══ HEADER ═══ */}
          <div className="flex items-start gap-4 mb-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ backgroundColor: startup.color }}
            >
              {startup.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[22px] md:text-[24px] font-semibold text-text-primary">
                    <Link href={`/startup/${startup.id}`} className="hover:underline">
                      {startup.name}
                    </Link>
                  </h2>
                  <p className="text-text-muted text-[15px] md:text-[16px]">
                    {startup.oneLiner}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 shrink-0">
                  <span className="px-2.5 py-1 rounded-full text-[11px] text-accent-blue bg-accent-blue/5 border border-accent-blue/20">
                    {startup.sector}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] text-accent-violet bg-accent-violet/5 border border-accent-violet/20">
                    {startup.stage}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-16 mb-6">
            <span className="flex items-center gap-1 text-[12px] text-text-muted px-2 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              {startup.location}
            </span>
            <span className="text-[12px] text-text-muted">Founded {startup.founded}</span>
          </div>

          {/* ═══ VIDEO PITCH ═══ */}
          <div className="mb-6">
            <div className="relative rounded-2xl overflow-hidden bg-[#0F172A] aspect-video flex items-center justify-center cursor-pointer group">
              {/* 60 sec pill */}
              <span className="absolute top-3 left-3 z-10 text-[11px] text-white/80 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">60 sec pitch</span>
              {/* Play button */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <polygon points="8,5 20,12 8,19" />
                </svg>
              </div>
              <span className="absolute bottom-3 right-3 text-white/50 text-[12px] bg-black/30 px-2 py-0.5 rounded">1:00</span>
            </div>
            <div className="flex items-center gap-2.5 mt-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold shrink-0" style={{ backgroundColor: startup.pitchFounder.color }}>
                {startup.pitchFounder.initials}
              </div>
              <p className="text-[13px] text-text-secondary">
                <span className="font-medium text-text-primary">{startup.pitchFounder.name}</span>, {startup.pitchFounder.title}
              </p>
            </div>
          </div>

          {/* ═══ KEY METRICS ═══ */}
          <div className="grid grid-cols-2 gap-3 mb-6">
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
                <p className="text-[12px] text-text-muted mb-1">{m.label}</p>
                <span className={`inline-flex items-center gap-0.5 text-[11px] font-medium ${m.trendDir === "up" ? "text-[#059669]" : "text-[#EF4444]"}`}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    {m.trendDir === "up" ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
                  </svg>
                  {m.trend}
                </span>
              </div>
            ))}
          </div>

          {/* ═══ THE ASK ═══ */}
          <div className="mb-6">
            <p className="text-text-primary text-[18px] md:text-[20px] font-semibold mb-3">
              {startup.askDisplay}
            </p>
            {/* Stacked bar */}
            <div className="flex h-2.5 rounded-full overflow-hidden mb-2">
              {startup.fundAllocation.map((f) => (
                <div key={f.label} className="h-full" style={{ width: `${f.pct}%`, backgroundColor: f.color }} />
              ))}
            </div>
            <div className="flex gap-4 mb-4">
              {startup.fundAllocation.map((f) => (
                <span key={f.label} className="flex items-center gap-1.5 text-[11px] text-text-muted">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: f.color }} />
                  {f.label} {f.pct}%
                </span>
              ))}
            </div>
            <p className="text-text-muted text-[12px] tracking-[2px] uppercase mb-2">Looking for</p>
            <ul className="flex flex-col gap-1.5">
              {startup.askBullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0" />
                  <span className="text-text-secondary text-[14px] leading-[1.5]">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ═══ TEAM ═══ */}
          <div className="mb-6">
            <p className="text-text-muted text-[12px] tracking-[2px] uppercase mb-3">
              Team
            </p>
            <div className="flex gap-5">
              {startup.founders.map((f) => (
                <div key={f.name} className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold mb-1.5"
                    style={{ backgroundColor: f.color }}
                  >
                    {f.initials}
                  </div>
                  <p className="text-text-primary text-[12px] font-medium text-center">
                    {f.name}
                  </p>
                  <p className="text-text-muted text-[11px] text-center">{f.title}</p>
                  <div className="mt-1">
                    <LinkedInIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ TRACTION HIGHLIGHTS ═══ */}
          <div className="mb-6">
            <p className="text-text-muted text-[12px] tracking-[2px] uppercase mb-3">
              Traction
            </p>
            <div className="space-y-0">
              {startup.milestones.map((m, i) => (
                <div key={m.date} className="flex gap-3 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-accent-blue shrink-0 mt-1.5" />
                    {i < startup.milestones.length - 1 && (
                      <div className="w-px flex-1 bg-black/[0.08]" />
                    )}
                  </div>
                  <div className="pb-3">
                    <p className="text-text-muted text-[11px]">{m.date}</p>
                    <p className="text-text-primary text-[13px]">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ NEXUS SCORE ═══ */}
          <div className="rounded-xl p-4 mb-4" style={{ background: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.5)" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-semibold text-text-primary">Urgenc Score: {startup.nexusScore}/100</span>
              <span className="text-[12px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${scoreColor}12`, color: scoreColor }}>
                {startup.nexusScore >= 85 ? "Strong" : startup.nexusScore >= 75 ? "Promising" : "Early"}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-black/[0.04] overflow-hidden mb-2">
              <div className="h-full rounded-full" style={{ width: `${startup.nexusScore}%`, background: `linear-gradient(135deg, #4A6CF7, #7C5CFC)` }} />
            </div>
            <p className="text-[11px] text-text-muted">Scored on vision, team, market, defensibility, and momentum</p>
          </div>

          {/* ═══ VIEW FULL PROFILE ═══ */}
          <Link
            href={`/startup/${startup.id}`}
            className="inline-flex items-center gap-1.5 text-accent-blue text-[14px] font-medium hover:underline"
          >
            View Full Profile
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              animation: allDone ? "none" : "pulse-gentle 3s ease-in-out infinite",
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
              <div className="relative w-full max-w-[660px] mx-auto flex-1 flex items-center justify-center">
                {/* Next card preview */}
                {currentIndex + 1 < total && !exitDirection && (
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ transform: "scale(0.95)", opacity: 0.4 }}
                  >
                    <div
                      className="w-full max-w-[620px] mx-4 h-[400px] rounded-3xl"
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
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
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
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(239, 68, 68, 0.3)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.45)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)";
                    e.currentTarget.style.transform = "scale(1)";
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
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(74, 108, 247, 0.3)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.45)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)";
                    e.currentTarget.style.transform = "scale(1)";
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
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(5, 150, 105, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
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
