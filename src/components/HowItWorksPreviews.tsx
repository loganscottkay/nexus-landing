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
      <span className="text-[11px] tracking-[2px] uppercase font-medium" style={{ color: "#94A3B8" }}>{label}</span>
      <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "#64748B" }}>
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
      <span className="text-[12px] w-[90px] shrink-0" style={{ color: "#64748B" }}>{label}</span>
      <div className="flex-1 h-[6px] rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.04)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #4A6CF7, #7C5CFC)" }}
          initial={{ width: 0 }}
          animate={{ width: started ? `${score}%` : 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1], delay: 0 }}
        />
      </div>
      <span className="text-[13px] font-semibold w-[28px] text-right tabular-nums" style={{ color: "#334155" }}>
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
      <PreviewLabel label="WAITLIST REVIEW" statusText="Processing" dotColor="green" />

      {/* Startup card */}
      <div className="rounded-xl p-4 mb-5" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex items-start gap-3">
          {/* Fake company icon */}
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}>
            <span className="text-white text-[14px] font-bold">HR</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[14px] font-semibold" style={{ color: "#0F172A" }}>Helix Robotics</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-blue/20 text-accent-blue">AI/Robotics</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              {/* Pitch deck thumbnail */}
              <div className="w-[52px] h-[36px] rounded-md flex items-center justify-center" style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 8h20" /></svg>
              </div>
              {/* Video thumbnail */}
              <div className="w-[52px] h-[36px] rounded-md flex items-center justify-center relative" style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(0,0,0,0.35)"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                <span className="absolute bottom-0.5 right-1 text-[8px]" style={{ color: "#94A3B8" }}>60s</span>
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
      <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between">
          <span className="text-[13px]" style={{ color: "#64748B" }}>Overall UrgenC Score</span>
          <div className="flex items-center gap-3">
            <span className="text-[28px] font-bold tabular-nums" style={{ color: "#0F172A" }}>
              {active ? overallScore : 0}<span className="text-[16px]" style={{ color: "#94A3B8" }}>/100</span>
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
   CARD 02 — FEED PREFERENCES PREVIEW
   ================================================================ */

const industryPills = ["AI/ML", "Fintech", "HealthTech"];
const stagePills = ["Pre-Seed", "Seed"];

const feedCards = [
  { name: "Luminary AI", sector: "AI/ML" },
  { name: "Stackpay", sector: "Fintech" },
];

export function MatchingPreview({ active }: { active: boolean }) {
  const [selectedIndustries, setSelectedIndustries] = useState(0);
  const [selectedStages, setSelectedStages] = useState(0);
  const [checkSize, setCheckSize] = useState(false);
  const [visibleFeed, setVisibleFeed] = useState(0);
  const [showReady, setShowReady] = useState(false);

  const runAnimation = React.useCallback(() => {
    setSelectedIndustries(0);
    setSelectedStages(0);
    setCheckSize(false);
    setVisibleFeed(0);
    setShowReady(false);

    const t1 = setTimeout(() => setSelectedIndustries(1), 600);
    const t2 = setTimeout(() => setSelectedIndustries(2), 1200);
    const t3 = setTimeout(() => setSelectedStages(1), 2000);
    const t4 = setTimeout(() => setSelectedStages(2), 2600);
    const t5 = setTimeout(() => setCheckSize(true), 3200);
    const t6 = setTimeout(() => setVisibleFeed(1), 4200);
    const t7 = setTimeout(() => setVisibleFeed(2), 4600);
    const t8 = setTimeout(() => setShowReady(true), 5400);

    return [t1, t2, t3, t4, t5, t6, t7, t8];
  }, []);

  useEffect(() => {
    if (!active) {
      setSelectedIndustries(0);
      setSelectedStages(0);
      setCheckSize(false);
      setVisibleFeed(0);
      setShowReady(false);
      return;
    }

    let timers = runAnimation();
    const loop = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = runAnimation();
    }, 8000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [active, runAnimation]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <span className="text-[11px] tracking-[2px] uppercase font-medium" style={{ color: "#94A3B8" }}>FEED PREFERENCES</span>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="space-y-5 mb-6">
          {/* Industries */}
          <div>
            <p className="text-[11px] mb-2 font-medium" style={{ color: "#64748B" }}>Industries</p>
            <div className="flex gap-2">
              {industryPills.map((pill, i) => {
                const isSelected = selectedIndustries > i;
                return (
                  <span
                    key={pill}
                    className="text-[11px] px-3 py-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: isSelected ? "rgba(74, 108, 247, 0.12)" : "rgba(0,0,0,0.04)",
                      color: isSelected ? "#4A6CF7" : "rgba(0,0,0,0.3)",
                      border: `1px solid ${isSelected ? "rgba(74, 108, 247, 0.3)" : "rgba(0,0,0,0.06)"}`,
                      boxShadow: isSelected ? "0 0 8px rgba(74, 108, 247, 0.15)" : "none",
                    }}
                  >
                    {pill}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Stage */}
          <div>
            <p className="text-[11px] mb-2 font-medium" style={{ color: "#64748B" }}>Stage</p>
            <div className="flex gap-2">
              {stagePills.map((pill, i) => {
                const isSelected = selectedStages > i;
                return (
                  <span
                    key={pill}
                    className="text-[11px] px-3 py-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: isSelected ? "rgba(124, 92, 252, 0.12)" : "rgba(0,0,0,0.04)",
                      color: isSelected ? "#7C5CFC" : "rgba(0,0,0,0.3)",
                      border: `1px solid ${isSelected ? "rgba(124, 92, 252, 0.3)" : "rgba(0,0,0,0.06)"}`,
                      boxShadow: isSelected ? "0 0 8px rgba(124, 92, 252, 0.15)" : "none",
                    }}
                  >
                    {pill}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Check Size */}
          <div>
            <p className="text-[11px] mb-2 font-medium" style={{ color: "#64748B" }}>Check Size</p>
            <AnimatePresence>
              {checkSize ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-[14px] font-semibold"
                  style={{ color: "#0F172A" }}
                >
                  $50K - $250K
                </motion.span>
              ) : (
                <span className="text-[14px]" style={{ color: "rgba(0,0,0,0.15)" }}>---</span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mini feed cards */}
        <div className="space-y-2 mb-4">
          {feedCards.map((s, i) => (
            <AnimatePresence key={s.name}>
              {visibleFeed > i && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg px-3 py-2.5 flex items-center gap-3"
                  style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <span className="text-[12px] font-semibold flex-1" style={{ color: "#0F172A" }}>{s.name}</span>
                  <span
                    className="text-[9px] px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(74, 108, 247, 0.1)", color: "#4A6CF7" }}
                  >
                    {s.sector}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Ready text */}
        <div className="mt-auto pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <AnimatePresence>
            {showReady && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[13px]"
                style={{ color: "#64748B" }}
              >
                Your personalized feed is ready
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   CARD 03 — YOUR ACCOUNTABILITY (FOUNDER PERSPECTIVE)
   ================================================================ */

function CountdownHours({ active }: { active: boolean }) {
  const [hours, setHours] = useState(47);

  useEffect(() => {
    if (!active) {
      setHours(47);
      return;
    }
    const interval = setInterval(() => {
      setHours((prev) => {
        if (prev <= 45) return 47;
        return prev - 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [active]);

  return <span className="tabular-nums">{hours}h</span>;
}

export function AccountabilityPreview({ active }: { active: boolean }) {
  const [visibleRows, setVisibleRows] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const tractionScore = useCountUp(72, 1.0, showScore);

  useEffect(() => {
    if (!active) {
      setVisibleRows(0);
      setShowScore(false);
      setShowWarning(false);
      return;
    }
    const t1 = setTimeout(() => setVisibleRows(1), 300);
    const t2 = setTimeout(() => setVisibleRows(2), 600);
    const t3 = setTimeout(() => setVisibleRows(3), 900);
    const t4 = setTimeout(() => setVisibleRows(4), 1200);
    const t5 = setTimeout(() => setShowScore(true), 1600);
    const t6 = setTimeout(() => setShowWarning(true), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6); };
  }, [active]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
        <span className="text-[11px] tracking-[2px] uppercase font-medium" style={{ color: "#94A3B8" }}>YOUR ACCOUNTABILITY</span>
      </div>

      {/* Timeline checklist */}
      <div className="space-y-3 mb-6">
        {/* Row 1: Sarah Chen - completed */}
        <AnimatePresence>
          {visibleRows >= 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(34, 197, 94, 0.15)" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[12px]" style={{ color: "#475569" }}>Sarah Chen</span>
                <span className="text-[11px] ml-2" style={{ color: "#94A3B8" }}>Call completed March 5</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Row 2: David Kim - completed */}
        <AnimatePresence>
          {visibleRows >= 2 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(34, 197, 94, 0.15)" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[12px]" style={{ color: "#475569" }}>David Kim</span>
                <span className="text-[11px] ml-2" style={{ color: "#94A3B8" }}>Call completed March 8</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Row 3: Marcus Webb - countdown */}
        <AnimatePresence>
          {visibleRows >= 3 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(74, 108, 247, 0.15)" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[12px]" style={{ color: "#475569" }}>Marcus Webb</span>
                <span className="text-[11px] ml-2 font-medium" style={{ color: "#4A6CF7" }}>
                  <CountdownHours active={active} /> left to schedule
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Row 4: Metrics update due */}
        <AnimatePresence>
          {visibleRows >= 4 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(245, 158, 11, 0.15)" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              </span>
              <span className="text-[12px]" style={{ color: "#f59e0b" }}>Metrics update due in 12 days</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Traction Score bar */}
      <AnimatePresence>
        {showScore && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium" style={{ color: "#64748B" }}>Traction Score</span>
              <span className="text-[13px] font-bold tabular-nums" style={{ color: "#0F172A" }}>
                {active ? tractionScore : 0}<span className="text-[11px]" style={{ color: "#94A3B8" }}>/100</span>
              </span>
            </div>
            <div className="h-[8px] rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.04)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #4A6CF7, #7C5CFC)",
                  animation: "pulse-gentle 2s ease-in-out infinite",
                }}
                initial={{ width: 0 }}
                animate={{ width: "72%" }}
                transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Warning text */}
      <div className="mt-auto pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <AnimatePresence>
          {showWarning && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[12px]"
              style={{ color: "rgba(239, 68, 68, 0.7)" }}
            >
              No traction after 30 days = removal
            </motion.p>
          )}
        </AnimatePresence>
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
      {/* UrgenC logo mark */}
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
        className="text-[14px] tracking-wide"
        style={{ color: "#94A3B8" }}
      >
        Hover to preview
      </motion.p>
    </div>
  );
}
