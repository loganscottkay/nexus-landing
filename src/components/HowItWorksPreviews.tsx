"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================================================================
   SHARED HELPERS
   ================================================================ */

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) {
      setValue(0);
      return;
    }
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, trigger]);

  return value;
}

function StatusDot({ color }: { color: string }) {
  const bg = color === "green" ? "#22c55e" : color === "blue" ? "#4A6CF7" : "#f59e0b";
  return (
    <span className="relative flex h-2 w-2">
      <span
        className="absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{ backgroundColor: bg, animation: "pulse-gentle 2s ease-in-out infinite" }}
      />
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: bg }} />
    </span>
  );
}

function PreviewLabel({ label, statusText, dotColor }: { label: string; statusText: string; dotColor: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <span className="text-[11px] tracking-[2px] uppercase text-white/40 font-medium">{label}</span>
      <span className="flex items-center gap-1.5 text-[11px] text-white/50">
        <StatusDot color={dotColor} />
        {statusText}
      </span>
    </div>
  );
}

/* ================================================================
   CARD 01 — SCORING PREVIEW
   ================================================================ */

const scoringCategories = [
  { label: "Vision", score: 92 },
  { label: "Team", score: 88 },
  { label: "Market", score: 85 },
  { label: "Defensibility", score: 78 },
  { label: "Momentum", score: 71 },
];

function ScoringBar({ label, score, delay, active }: { label: string; score: number; delay: number; active: boolean }) {
  const [started, setStarted] = useState(false);
  const value = useCountUp(score, 0.6, started);

  useEffect(() => {
    if (!active) {
      setStarted(false);
      return;
    }
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [active, delay]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-[12px] text-white/60 w-[90px] shrink-0">{label}</span>
      <div className="flex-1 h-[6px] rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #4A6CF7, #7C5CFC)" }}
          initial={{ width: 0 }}
          animate={{ width: started ? `${score}%` : 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1], delay: 0 }}
        />
      </div>
      <span className="text-[13px] font-semibold text-white/80 w-[28px] text-right tabular-nums">
        {started ? value : 0}
      </span>
    </div>
  );
}

export function ScoringPreview({ active }: { active: boolean }) {
  const overallScore = useCountUp(83, 1.2, active);
  const [showAccepted, setShowAccepted] = useState(false);

  useEffect(() => {
    if (!active) {
      setShowAccepted(false);
      return;
    }
    const t = setTimeout(() => setShowAccepted(true), 2200);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="h-full flex flex-col">
      <PreviewLabel label="APPLICATION REVIEW" statusText="Processing" dotColor="green" />

      {/* Startup card */}
      <div className="rounded-xl p-4 mb-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-start gap-3">
          {/* Fake company icon */}
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}>
            <span className="text-white text-[14px] font-bold">HR</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white text-[14px] font-semibold">Helix Robotics</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-blue/20 text-accent-blue">AI/Robotics</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              {/* Pitch deck thumbnail */}
              <div className="w-[52px] h-[36px] rounded-md flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 8h20" /></svg>
              </div>
              {/* Video thumbnail */}
              <div className="w-[52px] h-[36px] rounded-md flex items-center justify-center relative" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                <span className="absolute bottom-0.5 right-1 text-[8px] text-white/40">60s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoring bars */}
      <div className="space-y-2.5 mb-6">
        {scoringCategories.map((cat, i) => (
          <ScoringBar key={cat.label} label={cat.label} score={cat.score} delay={0.3 + i * 0.2} active={active} />
        ))}
      </div>

      {/* Overall score */}
      <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-white/50">Overall Nexus Score</span>
          <div className="flex items-center gap-3">
            <span className="text-[28px] font-bold text-white tabular-nums">
              {active ? overallScore : 0}<span className="text-[16px] text-white/40">/100</span>
            </span>
            <AnimatePresence>
              {showAccepted && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider"
                  style={{
                    background: "rgba(34, 197, 94, 0.15)",
                    color: "#22c55e",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                    boxShadow: "0 0 12px rgba(34, 197, 94, 0.2)",
                  }}
                >
                  ACCEPTED
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   CARD 02 — TIER MATCHING PREVIEW
   ================================================================ */

const tiers = [
  {
    label: "$100K+",
    color: "#22c55e",
    bg: "rgba(34, 197, 94, 0.08)",
    border: "rgba(34, 197, 94, 0.2)",
    startup: { name: "Stackpay", tag: "Fintech", mrr: "$82K MRR", users: "34 Clients", initial: "S", grad: "linear-gradient(135deg, #22c55e, #14b8a6)" },
    investor: { name: "Jordan C.", firm: "Apex Ventures", initial: "JC", grad: "linear-gradient(135deg, #4A6CF7, #6366f1)" },
  },
  {
    label: "$10K-$100K",
    color: "#4A6CF7",
    bg: "rgba(74, 108, 247, 0.08)",
    border: "rgba(74, 108, 247, 0.2)",
    startup: { name: "Luminary AI", tag: "AI/ML", mrr: "$45K MRR", users: "2.4K Users", initial: "L", grad: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" },
    investor: { name: "Maria K.", firm: "Angel", initial: "MK", grad: "linear-gradient(135deg, #7C5CFC, #a855f7)" },
  },
  {
    label: "$1K-$10K",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.08)",
    border: "rgba(245, 158, 11, 0.2)",
    startup: { name: "Terraform Health", tag: "HealthTech", mrr: "Pre-revenue", users: "890 Waitlist", initial: "T", grad: "linear-gradient(135deg, #f59e0b, #ef4444)" },
    investor: { name: "Sam T.", firm: "First Check", initial: "ST", grad: "linear-gradient(135deg, #f59e0b, #ef4444)" },
  },
];

export function MatchingPreview({ active }: { active: boolean }) {
  const [visibleTiers, setVisibleTiers] = useState(0);
  const [matchedTier, setMatchedTier] = useState(-1);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    if (!active) {
      setVisibleTiers(0);
      setMatchedTier(-1);
      setShowLabel(false);
      return;
    }

    // Stagger tiers in
    const t1 = setTimeout(() => setVisibleTiers(1), 300);
    const t2 = setTimeout(() => setVisibleTiers(2), 600);
    const t3 = setTimeout(() => setVisibleTiers(3), 900);

    // Animate match connections one by one
    const t4 = setTimeout(() => setMatchedTier(0), 1500);
    const t5 = setTimeout(() => setMatchedTier(1), 2200);
    const t6 = setTimeout(() => setMatchedTier(2), 2900);
    const t7 = setTimeout(() => setShowLabel(true), 3500);

    // Loop: reset and replay
    const t8 = setTimeout(() => {
      setVisibleTiers(0);
      setMatchedTier(-1);
      setShowLabel(false);
    }, 7000);
    const t9 = setTimeout(() => setVisibleTiers(1), 7300);
    const t10 = setTimeout(() => setVisibleTiers(2), 7600);
    const t11 = setTimeout(() => setVisibleTiers(3), 7900);
    const t12 = setTimeout(() => setMatchedTier(0), 8500);
    const t13 = setTimeout(() => setMatchedTier(1), 9200);
    const t14 = setTimeout(() => setMatchedTier(2), 9900);
    const t15 = setTimeout(() => setShowLabel(true), 10500);

    return () => {
      [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15].forEach(clearTimeout);
    };
  }, [active]);

  return (
    <div className="h-full flex flex-col">
      <PreviewLabel label="TIER MATCHING" statusText="Active" dotColor="blue" />

      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-3">
          {tiers.map((tier, i) => (
            <AnimatePresence key={tier.label}>
              {visibleTiers > i && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl p-3 relative"
                  style={{ background: tier.bg, border: `1px solid ${tier.border}` }}
                >
                  {/* Tier label */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider"
                      style={{ background: `${tier.color}20`, color: tier.color, border: `1px solid ${tier.color}40` }}
                    >
                      {tier.label}
                    </span>
                    <div className="flex-1 h-[1px]" style={{ background: `${tier.color}15` }} />
                  </div>

                  {/* Investor -> Connection -> Startup row */}
                  <div className="flex items-center gap-2">
                    {/* Investor */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                        style={{ background: tier.investor.grad }}
                      >
                        {tier.investor.initial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-[11px] font-semibold truncate">{tier.investor.name}</p>
                        <p className="text-[9px] text-white/35 truncate">{tier.investor.firm}</p>
                      </div>
                    </div>

                    {/* Connection line */}
                    <div className="w-[50px] h-[2px] relative shrink-0 mx-1">
                      <div className="absolute inset-0 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
                      {matchedTier >= i ? (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{ background: `linear-gradient(90deg, ${tier.color}, ${tier.color}90)`, boxShadow: `0 0 8px ${tier.color}60` }}
                        />
                      ) : (
                        <div className="connection-dot absolute top-[-1px] w-1.5 h-1.5 rounded-full" style={{ background: tier.color, boxShadow: `0 0 4px ${tier.color}`, animationDuration: "1.5s" }} />
                      )}
                    </div>

                    {/* Startup */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                        style={{ background: tier.startup.grad }}
                      >
                        {tier.startup.initial}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-white text-[11px] font-semibold truncate">{tier.startup.name}</p>
                          <span className="text-[8px] px-1.5 py-0.5 rounded-full shrink-0" style={{ background: `${tier.color}15`, color: tier.color }}>{tier.startup.tag}</span>
                        </div>
                        <p className="text-[9px] text-white/35">{tier.startup.mrr} · {tier.startup.users}</p>
                      </div>
                    </div>

                    {/* Match indicator */}
                    <AnimatePresence>
                      {matchedTier >= i && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: `${tier.color}20` }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={tier.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Bottom summary */}
        <AnimatePresence>
          {showLabel && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-3 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-[12px] text-white/40">Every investor sees startups at their level</span>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md" style={{ background: "rgba(74, 108, 247, 0.15)", color: "#4A6CF7" }}>
                3 tiers matched
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================================================================
   CARD 03 — ACCOUNTABILITY DASHBOARD PREVIEW
   ================================================================ */

function MiniSparkline({ trend }: { trend: "up" | "flat" | "down" }) {
  const paths = {
    up: "M0 12 L4 10 L8 11 L12 8 L16 6 L20 3",
    flat: "M0 8 L4 7 L8 6 L12 7 L16 7 L20 6",
    down: "M0 4 L4 5 L8 5 L12 7 L16 9 L20 12",
  };
  const color = trend === "up" ? "#22c55e" : trend === "flat" ? "#f59e0b" : "#ef4444";
  return (
    <svg width="40" height="16" viewBox="0 0 20 14" className="shrink-0">
      <path d={paths[trend]} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TypewriterText({ text, active }: { text: string; active: boolean }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [active, text]);

  return (
    <span>
      {displayed}
      {active && displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[13px] bg-white/60 ml-0.5" style={{ animation: "pulse-gentle 0.8s ease-in-out infinite" }} />
      )}
    </span>
  );
}

const dashboardRows = [
  {
    name: "Luminary AI",
    days: "23 days active",
    traction: "Traction: Strong",
    arrow: "↑",
    status: "green" as const,
    trend: "up" as const,
    removed: false,
  },
  {
    name: "CloudNine Health",
    days: "28 days active",
    traction: "Traction: Slowing",
    arrow: "",
    status: "amber" as const,
    trend: "flat" as const,
    removed: false,
  },
  {
    name: "PayGrid",
    days: "31 days",
    traction: "REMOVED",
    arrow: "",
    status: "red" as const,
    trend: "down" as const,
    removed: true,
    reason: "No investor interest",
  },
];

export function AccountabilityPreview({ active }: { active: boolean }) {
  const [visibleRows, setVisibleRows] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);

  useEffect(() => {
    if (!active) {
      setVisibleRows(0);
      setShowStats(false);
      setShowTypewriter(false);
      return;
    }
    const t1 = setTimeout(() => setVisibleRows(1), 300);
    const t2 = setTimeout(() => setVisibleRows(2), 600);
    const t3 = setTimeout(() => setVisibleRows(3), 900);
    const t4 = setTimeout(() => setShowStats(true), 1300);
    const t5 = setTimeout(() => setShowTypewriter(true), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [active]);

  const statusColors = {
    green: { bg: "rgba(34, 197, 94, 0.1)", border: "rgba(34, 197, 94, 0.2)", text: "#22c55e", icon: "✓" },
    amber: { bg: "rgba(245, 158, 11, 0.1)", border: "rgba(245, 158, 11, 0.2)", text: "#f59e0b", icon: "⚠" },
    red: { bg: "rgba(239, 68, 68, 0.1)", border: "rgba(239, 68, 68, 0.2)", text: "#ef4444", icon: "✕" },
  };

  return (
    <div className="h-full flex flex-col">
      <PreviewLabel label="PLATFORM HEALTH" statusText="Monitoring" dotColor="amber" />

      {/* Dashboard rows */}
      <div className="space-y-2.5 mb-6">
        {dashboardRows.map((row, i) => {
          const sc = statusColors[row.status];
          return (
            <AnimatePresence key={row.name}>
              {visibleRows > i && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: row.removed ? 0.4 : 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl p-3.5 flex items-center gap-3"
                  style={{ background: sc.bg, border: `1px solid ${sc.border}` }}
                >
                  {/* Status icon */}
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0"
                    style={{ background: `${sc.text}20`, color: sc.text }}>
                    {sc.icon}
                  </span>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[13px] font-semibold text-white ${row.removed ? "line-through" : ""}`}>{row.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-white/40">{row.days}{row.removed ? " - " : ""}</span>
                      <span className="text-[11px] font-medium" style={{ color: sc.text }}>
                        {row.traction} {row.arrow}
                      </span>
                    </div>
                    {row.removed && row.reason && (
                      <span className="text-[10px] text-white/30 mt-0.5 block">{row.reason}</span>
                    )}
                  </div>

                  {/* Sparkline */}
                  <MiniSparkline trend={row.trend} />
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Stats row */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 mb-4"
          >
            <div className="flex-1 rounded-lg p-3 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-[10px] text-white/40 mb-0.5">Platform Churn</p>
              <p className="text-[16px] font-bold text-white">12%<span className="text-[11px] text-white/40 ml-1">monthly</span></p>
            </div>
            <div className="flex-1 rounded-lg p-3 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-[10px] text-white/40 mb-0.5">Active Quality Score</p>
              <p className="text-[16px] font-bold text-white">94<span className="text-[11px] text-white/40">/100</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Typewriter */}
      <div className="mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-[13px] text-white/50 italic h-[20px]">
          <TypewriterText text="Only serious founders remain." active={showTypewriter} />
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   DEFAULT STATE
   ================================================================ */

export function DefaultPreview() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      {/* Nexus logo mark */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6"
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L40 14v20L24 44 8 34V14L24 4z" stroke="url(#nexGrad)" strokeWidth="1.5" fill="none" />
          <path d="M24 12L34 18v12L24 36 14 30V18L24 12z" stroke="url(#nexGrad)" strokeWidth="1" fill="none" opacity="0.5" />
          <defs>
            <linearGradient id="nexGrad" x1="8" y1="4" x2="40" y2="44">
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#7C5CFC" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      <motion.p
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-[14px] text-white/30 tracking-wide"
      >
        Hover to preview
      </motion.p>
    </div>
  );
}
