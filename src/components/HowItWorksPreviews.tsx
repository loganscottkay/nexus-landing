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
   CARD 02 — MATCHING PREVIEW
   ================================================================ */

export function MatchingPreview({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0); // 0=connecting, 1=matched, 2=notification
  const matchScore = useCountUp(94, 0.5, phase >= 1);

  useEffect(() => {
    if (!active) {
      setPhase(0);
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 1800);
    const t2 = setTimeout(() => setPhase(2), 2600);
    // Loop
    const t3 = setTimeout(() => setPhase(0), 6000);
    const t4 = setTimeout(() => setPhase(1), 7800);
    const t5 = setTimeout(() => setPhase(2), 8600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [active]);

  return (
    <div className="h-full flex flex-col">
      <PreviewLabel label="MATCHING ENGINE" statusText="Active" dotColor="blue" />

      {/* Match visualization */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center gap-4 w-full max-w-[360px] mx-auto mb-6">
          {/* Investor */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-12 h-12 rounded-full mb-2 flex items-center justify-center text-white font-bold text-[14px]" style={{ background: "linear-gradient(135deg, #4A6CF7, #6366f1)" }}>
              JC
            </div>
            <span className="text-white text-[13px] font-semibold">Jordan C.</span>
            <span className="text-[11px] text-white/40">Apex Ventures</span>
            <span className="text-[10px] text-white/30 mt-0.5">$100K-$500K</span>
          </div>

          {/* Connection line */}
          <div className="flex-1 relative h-[2px] mx-2">
            <div className="absolute inset-0 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
            {phase === 0 && (
              <>
                <div className="connection-dot absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "#4A6CF7", boxShadow: "0 0 6px #4A6CF7", animationDuration: "1.2s" }} />
                <div className="connection-dot absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "#7C5CFC", boxShadow: "0 0 6px #7C5CFC", animationDuration: "1.2s", animationDelay: "0.4s" }} />
                <div className="connection-dot absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "#4A6CF7", boxShadow: "0 0 6px #4A6CF7", animationDuration: "1.2s", animationDelay: "0.8s" }} />
              </>
            )}
            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 2 }}
                animate={{ opacity: [1, 0], scale: [1, 3] }}
                transition={{ duration: 0.6 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)", boxShadow: "0 0 20px rgba(74, 108, 247, 0.8)" }}
              />
            )}
          </div>

          {/* Startup */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-12 h-12 rounded-full mb-2 flex items-center justify-center text-white font-bold text-[14px]" style={{ background: "linear-gradient(135deg, #7C5CFC, #a855f7)" }}>
              AR
            </div>
            <span className="text-white text-[13px] font-semibold">Alex R.</span>
            <span className="text-[11px] text-white/40">Luminary AI</span>
            <span className="text-[10px] text-white/30 mt-0.5">Seed Stage</span>
          </div>
        </div>

        {/* Match result */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-4"
            >
              <span className="text-[22px] font-bold text-white tabular-nums">Match Score: {matchScore}%</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compatibility indicators */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap justify-center gap-2 mb-4"
            >
              {[
                { label: "Sector Fit: AI/ML", delay: 0 },
                { label: "Stage Fit: Seed", delay: 0.15 },
                { label: "Check Size: $250K", delay: 0.3 },
              ].map((item) => (
                <motion.span
                  key={item.label}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay, duration: 0.2 }}
                  className="text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={{ background: "rgba(34, 197, 94, 0.1)", color: "#22c55e", border: "1px solid rgba(34, 197, 94, 0.2)" }}
                >
                  {item.label} <span>&#10003;</span>
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="w-full max-w-[320px] rounded-xl p-3.5"
              style={{ background: "rgba(74, 108, 247, 0.1)", border: "1px solid rgba(74, 108, 247, 0.2)" }}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(74, 108, 247, 0.2)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white mb-0.5">New Match!</p>
                  <p className="text-[11px] text-white/50 leading-relaxed">You have been matched with Luminary AI. Take the call within 72 hours.</p>
                </div>
              </div>
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
