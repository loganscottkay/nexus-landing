"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

const ease = [0.25, 0.4, 0.25, 1] as const;

/* ─── Chart Data ─── */
const mrrData = [
  { month: "Oct", value: 8000 },
  { month: "Nov", value: 14000 },
  { month: "Dec", value: 22000 },
  { month: "Jan", value: 28000 },
  { month: "Feb", value: 36000 },
  { month: "Mar", value: 45000 },
];

/* ─── SVG Chart ─── */
function MRRChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setDrawn(true), 100);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const width = 680;
  const height = 240;
  const padL = 60;
  const padR = 20;
  const padT = 20;
  const padB = 40;

  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const maxVal = 50000;
  const yTicks = [0, 10000, 20000, 30000, 40000, 50000];

  const points = mrrData.map((d, i) => ({
    x: padL + (i / (mrrData.length - 1)) * chartW,
    y: padT + chartH - (d.value / maxVal) * chartH,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x},${padT + chartH} L${points[0].x},${padT + chartH} Z`;

  const pathLength = 1200;

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A6CF7" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#4A6CF7" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {yTicks.map((tick) => {
        const y = padT + chartH - (tick / maxVal) * chartH;
        return (
          <g key={tick}>
            <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
            <text x={padL - 8} y={y + 4} textAnchor="end" fill="#94A3B8" fontSize="11" fontFamily="var(--font-dm-sans), sans-serif">
              ${tick / 1000}K
            </text>
          </g>
        );
      })}

      {/* X labels */}
      {mrrData.map((d, i) => (
        <text key={d.month} x={points[i].x} y={height - 8} textAnchor="middle" fill="#94A3B8" fontSize="12" fontFamily="var(--font-dm-sans), sans-serif">
          {d.month}
        </text>
      ))}

      {/* Area */}
      <path d={areaPath} fill="url(#areaGrad)" opacity={drawn ? 1 : 0} style={{ transition: "opacity 0.5s ease 0.8s" }} />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke="#4A6CF7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        strokeDashoffset={drawn ? 0 : pathLength}
        style={{ transition: `stroke-dashoffset 1.2s ease-out` }}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#4A6CF7" stroke="#FAFAF9" strokeWidth="2" opacity={drawn ? 1 : 0} style={{ transition: `opacity 0.3s ease ${0.8 + i * 0.1}s` }} />
      ))}
    </svg>
  );
}

/* ─── Section Wrapper ─── */
function SectionCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay, ease }}
      className="rounded-3xl mb-5"
      style={{
        background: "rgba(255, 255, 255, 0.45)",
        backdropFilter: "blur(20px) saturate(1.2)",
        WebkitBackdropFilter: "blur(20px) saturate(1.2)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
      }}
    >
      <div className="p-8 md:p-10">{children}</div>
    </motion.div>
  );
}

/* ─── Milestones ─── */
const milestones = [
  { date: "Mar 2026", text: "Closed $500K pre-seed from Precursor Ventures" },
  { date: "Jan 2026", text: "Launched v2.0 with AI contract comparison" },
  { date: "Nov 2025", text: "First 1,000 users milestone" },
  { date: "Sep 2025", text: "Y Combinator S25 batch acceptance" },
  { date: "Jun 2025", text: "Company founded, initial MVP launched" },
];

/* ─── Team ─── */
const team = [
  {
    initials: "AR",
    color: "#4A6CF7",
    name: "Alex Rivera",
    title: "CEO & Co-Founder",
    bio: "Former senior PM at Palantir. Stanford CS.",
  },
  {
    initials: "JK",
    color: "#7C5CFC",
    name: "Jordan Kim",
    title: "CTO & Co-Founder",
    bio: "Ex-Google Brain researcher. PhD MIT.",
  },
  {
    initials: "SO",
    color: "#0d9488",
    name: "Sam Okafor",
    title: "Head of Sales",
    bio: "8 years enterprise SaaS. Previously at Datadog.",
  },
];

/* ─── Main Page ─── */
export default function StartupProfilePage() {
  const [lockHovered, setLockHovered] = useState(false);

  return (
    <div className="min-h-screen flex bg-base text-text-primary relative">
      {/* Noise */}
      <div className="noise-overlay" />

      {/* Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 top-[5%] right-[15%]" />
        <div className="blob blob-lavender animate-blob-2 bottom-[25%] left-[8%]" />
        <div className="blob blob-peach animate-blob-3 top-[55%] right-[25%]" />
      </div>

      <Sidebar role="investor" activeLabel="Daily Drops" />

      {/* ─── Main Content ─── */}
      <div className="flex-1 md:ml-[240px] relative z-10 pb-28">
        <div className="max-w-[780px] mx-auto px-4 md:px-8 pt-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease }}
          >
            <Link
              href="/drops"
              className="inline-flex items-center gap-1.5 text-accent-blue text-[14px] font-medium mb-6 hover:underline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Matches
            </Link>
          </motion.div>

          {/* ═══ HEADER CARD ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <SectionCard>
              <div className="flex items-start gap-5 mb-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0" style={{ backgroundColor: "#4A6CF7" }}>
                  LA
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-[24px] md:text-[28px] font-semibold text-text-primary">Luminary AI</h1>
                  <p className="text-text-muted text-[16px] md:text-[17px] mt-1">AI-powered contract analysis for legal teams</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-3 py-1.5 rounded-full text-[13px] text-accent-blue bg-accent-blue/5 border border-accent-blue/20">AI / Machine Learning</span>
                    <span className="px-3 py-1.5 rounded-full text-[13px] text-accent-blue bg-accent-blue/5 border border-accent-blue/20">Enterprise SaaS</span>
                    <span className="px-3 py-1.5 rounded-full text-[13px] text-accent-violet bg-accent-violet/5 border border-accent-violet/20">Seed Stage</span>
                    <span className="px-3 py-1.5 rounded-full text-[13px] text-text-secondary bg-black/[0.03] border border-black/[0.06] flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      San Francisco, CA
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[12px] text-text-muted ml-[76px]">Founded Jun 2025</p>
            </SectionCard>
          </motion.div>

          {/* ═══ VIDEO PITCH (PROMINENT) ═══ */}
          <SectionCard delay={0.05}>
            <h2 className="text-[20px] md:text-[22px] font-normal text-text-primary mb-5" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Founder Pitch
            </h2>
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
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" style={{ backgroundColor: "#4A6CF7" }}>
                AR
              </div>
              <p className="text-[14px] text-text-secondary">
                <span className="font-medium text-text-primary">Alex Rivera</span>, CEO & Co-Founder
              </p>
            </div>
          </SectionCard>

          {/* ═══ KEY METRICS ═══ */}
          <SectionCard delay={0.1}>
            <h2 className="text-[20px] md:text-[22px] font-normal text-text-primary mb-5" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Key Metrics
            </h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {[
                { value: "$45K", label: "Monthly Revenue", trend: "+22%", trendDir: "up" as const, color: "#4A6CF7" },
                { value: "2,400", label: "Active Users", trend: "+18%", trendDir: "up" as const, color: "#7C5CFC" },
                { value: "180%", label: "MoM Growth", trend: "+12%", trendDir: "up" as const, color: "#059669" },
                { value: "$2M", label: "Pipeline Value", trend: "+35%", trendDir: "up" as const, color: "#D97706" },
              ].map((m) => (
                <motion.div
                  key={m.label}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease }}
                  className="rounded-xl p-5"
                  style={{
                    background: "rgba(255, 255, 255, 0.35)",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    borderTop: `2px solid ${m.color}`,
                  }}
                >
                  <p className="text-[24px] md:text-[28px] font-semibold text-text-primary">{m.value}</p>
                  <p className="text-[12px] text-text-muted uppercase tracking-[1px] mt-1 mb-1">{m.label}</p>
                  <span className={`inline-flex items-center gap-0.5 text-[11px] font-medium ${m.trendDir === "up" ? "text-[#059669]" : "text-[#EF4444]"}`}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      {m.trendDir === "up" ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
                    </svg>
                    {m.trend}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </SectionCard>

          {/* ═══ THE ASK ═══ */}
          <SectionCard delay={0.15}>
            <h2 className="text-[20px] md:text-[22px] font-normal text-text-primary mb-5" style={{ fontFamily: "'Instrument Serif', serif" }}>
              The Ask
            </h2>
            <p className="text-[20px] md:text-[22px] font-semibold text-text-primary mb-5">Raising $1.5M Seed Round</p>

            <p className="text-text-muted text-[12px] tracking-[2px] uppercase mb-4">Use of Funds</p>
            {/* Stacked bar */}
            <div className="flex h-3 rounded-full overflow-hidden mb-3">
              <div className="h-full" style={{ width: "55%", backgroundColor: "#4A6CF7" }} />
              <div className="h-full" style={{ width: "30%", backgroundColor: "#7C5CFC" }} />
              <div className="h-full" style={{ width: "15%", backgroundColor: "#94A3B8" }} />
            </div>
            <div className="flex gap-4 mb-6">
              <span className="flex items-center gap-1.5 text-[12px] text-text-muted">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#4A6CF7" }} />
                Engineering 55%
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-text-muted">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#7C5CFC" }} />
                Go-to-Market 30%
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-text-muted">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#94A3B8" }} />
                Operations 15%
              </span>
            </div>

            <p className="text-text-muted text-[12px] tracking-[2px] uppercase mt-6 mb-3">Ideal Investor Profile</p>
            <ul className="flex flex-col gap-2.5">
              {[
                "Experience in AI/SaaS B2B sales cycles",
                "Check sizes between $100K-$500K",
                "Can provide enterprise customer introductions",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-accent-blue mt-1.5 shrink-0" />
                  <span className="text-text-secondary text-[15px] leading-[1.6]">{item}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* ═══ TEAM ═══ */}
          <SectionCard delay={0.2}>
            <h2 className="text-[20px] md:text-[22px] font-normal text-text-primary mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
              The Team
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {team.map((m) => (
                <div
                  key={m.name}
                  className="rounded-2xl p-6 relative"
                  style={{
                    background: "rgba(255, 255, 255, 0.25)",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0" style={{ backgroundColor: m.color }}>
                      {m.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[17px] font-semibold text-text-primary">{m.name}</p>
                      <p className="text-[14px] text-text-muted">{m.title}</p>
                      <p className="text-[14px] text-text-secondary mt-1">{m.bio}</p>
                    </div>
                  </div>
                  <a href="#" className="absolute bottom-5 right-5 text-accent-blue hover:opacity-70 transition-opacity">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ═══ TRACTION ═══ */}
          <SectionCard delay={0.25}>
            <h2 className="text-[20px] md:text-[22px] font-normal text-text-primary mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Traction & Milestones
            </h2>

            {/* Chart */}
            <div className="mb-10">
              <MRRChart />
            </div>

            {/* Timeline */}
            <p className="text-text-muted text-[12px] tracking-[2px] uppercase mb-5">Key Milestones</p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {milestones.map((m, i) => (
                <motion.div
                  key={m.date}
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4, ease }}
                  className="flex gap-4 relative"
                >
                  {/* Vertical line */}
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-blue shrink-0 mt-1" />
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-black/[0.1]" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="text-text-muted text-[13px]">{m.date}</p>
                    <p className="text-text-primary text-[15px] mt-0.5">{m.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </SectionCard>

          {/* ═══ NEXUS SCORE ═══ */}
          <SectionCard delay={0.28}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[20px] md:text-[22px] font-normal text-text-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Nexus Score
              </h2>
              <span className="text-[13px] font-medium px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(5,150,105,0.08)", color: "#059669" }}>
                Strong
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-[36px] font-semibold text-text-primary">87</span>
              <span className="text-[16px] text-text-muted">/100</span>
            </div>
            <div className="h-2 rounded-full bg-black/[0.04] overflow-hidden mb-3">
              <div className="h-full rounded-full" style={{ width: "87%", background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }} />
            </div>
            <p className="text-[13px] text-text-muted">Scored on vision, team, market, defensibility, and momentum</p>
          </SectionCard>

          {/* ═══ PITCH DECK ═══ */}
          <SectionCard delay={0.3}>
            <h2 className="text-[20px] md:text-[22px] font-normal text-text-primary mb-5" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Pitch Deck
            </h2>

            {/* NDA notice */}
            <div className="rounded-xl p-5 mb-6" style={{ background: "rgba(217, 119, 6, 0.05)", border: "1px solid rgba(217, 119, 6, 0.15)" }}>
              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div>
                  <p className="text-[14px] leading-[1.6]" style={{ color: "#92400E" }}>
                    This document is confidential. By viewing, you agree to the Nexus Mutual NDA. Your access is watermarked and logged.
                  </p>
                  <a href="#" className="text-[14px] font-medium mt-1 inline-block hover:underline" style={{ color: "#D97706" }}>
                    View NDA Terms
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              className="w-full h-[52px] rounded-full text-white text-[16px] font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                boxShadow: "0 4px 15px rgba(74, 108, 247, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(74, 108, 247, 0.4)";
                setLockHovered(true);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(74, 108, 247, 0.3)";
                setLockHovered(false);
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              >
                {lockHovered ? (
                  <>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 019.33-2.5" />
                  </>
                ) : (
                  <>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </>
                )}
              </svg>
              View Pitch Deck
            </button>
          </SectionCard>
        </div>
      </div>

      {/* ─── Sticky Action Bar ─── */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8, ease }}
        className="fixed bottom-0 left-0 md:left-[240px] right-0 z-40 h-20 flex items-center justify-between px-6 md:px-10"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(24px) saturate(1.2)",
          WebkitBackdropFilter: "blur(24px) saturate(1.2)",
          borderTop: "1px solid rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Left: context */}
        <div className="hidden sm:block min-w-0 mr-4">
          <p className="text-[15px] font-semibold text-text-primary truncate">Luminary AI</p>
          <p className="text-[13px] text-text-muted truncate">AI-powered contract analysis for legal teams</p>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Pass */}
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-250"
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
              e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(239, 68, 68, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.5)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Save */}
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-250"
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(74, 108, 247, 0.1)";
              e.currentTarget.style.borderColor = "rgba(74, 108, 247, 0.3)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(74, 108, 247, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.5)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
          </button>

          {/* Interested */}
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-250"
            style={{
              background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
              boxShadow: "0 4px 16px rgba(74, 108, 247, 0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(124, 92, 252, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(74, 108, 247, 0.35)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
