"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

const ease = [0.25, 0.4, 0.25, 1] as const;

const GLOW_SHADOW = "0 8px 32px rgba(74, 108, 247, 0.08), 0 0 0 1px rgba(74, 108, 247, 0.06)";

function useGlassHover() {
  const onMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const glass = e.currentTarget.querySelector(".glass") as HTMLElement | null;
    if (glass) glass.style.boxShadow = GLOW_SHADOW;
  }, []);
  const onMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const glass = e.currentTarget.querySelector(".glass") as HTMLElement | null;
    if (glass) glass.style.boxShadow = "";
  }, []);
  return { onMouseEnter, onMouseLeave };
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

/* ─── Animated Counter Hook ─── */
function useCountUp(target: number, duration = 1200, delay = 0) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (inView && !started) setStarted(true);
  }, [inView, started]);

  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else setValue(target);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [started, target, duration, delay]);

  return { ref, value };
}

/* ─── Stat with Counter Animation ─── */
function Stat({ target, decimals = 0, suffix = "", label, trend, trendDir, delay = 0 }: {
  target: number; decimals?: number; suffix?: string; label: string; trend: string; trendDir: "up" | "down" | "flat"; delay?: number;
}) {
  const { ref, value } = useCountUp(target, 1200, delay);
  const colors = { up: "#059669", down: "#EF4444", flat: "#64748B" };
  const bgs = { up: "rgba(5,150,105,0.08)", down: "rgba(239,68,68,0.08)", flat: "rgba(100,116,139,0.08)" };
  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <div className="text-center" ref={ref}>
      <p className="text-[28px] md:text-[32px] font-semibold text-text-primary leading-none">
        {display}{suffix}
      </p>
      <p className="text-[11px] md:text-[12px] uppercase tracking-[1px] text-text-muted mt-1.5">{label}</p>
      <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: bgs[trendDir], color: colors[trendDir] }}>
        {trendDir === "up" && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15" /></svg>}
        {trendDir === "down" && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>}
        {trend}
      </span>
    </div>
  );
}

/* ─── Engagement Ring ─── */
function EngagementRing({ score }: { score: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const r = 42;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div ref={ref} className="flex flex-col items-center shrink-0" style={{ minWidth: "160px" }}>
      <div className="relative w-[100px] h-[100px]">
        <svg width="100" height="100" viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="8" />
          <defs><linearGradient id="engGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4A6CF7" /><stop offset="100%" stopColor="#7C5CFC" /></linearGradient></defs>
          <circle
            cx="50" cy="50" r={r} fill="none" stroke="url(#engGrad)" strokeWidth="8" strokeLinecap="round"
            transform="rotate(-90 50 50)"
            strokeDasharray={circ}
            strokeDashoffset={inView ? offset : circ}
            style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.25, 0.4, 0.25, 1)", willChange: "stroke-dashoffset" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[28px] font-bold text-text-primary leading-none" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>{score}</span>
          <span className="text-[11px] text-text-muted leading-none ml-[2px]">/100</span>
        </div>
      </div>
      <p className="text-[13px] text-text-muted text-center mt-2">Engagement Score</p>
      <span className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-[rgba(5,150,105,0.08)] text-[#059669] mt-1.5">Top 5%</span>
    </div>
  );
}

/* ─── Sector Bar Chart ─── */
function SectorBars() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const data = [
    { label: "AI / Machine Learning", count: 12 },
    { label: "SaaS", count: 8 },
    { label: "Fintech", count: 5 },
    { label: "Climate Tech", count: 3 },
    { label: "Health Tech", count: 2 },
  ];
  const max = Math.max(...data.map((d) => d.count));

  return (
    <div ref={ref} className="space-y-3">
      {data.map((d, i) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="text-[13px] text-text-secondary w-[130px] shrink-0 truncate">{d.label}</span>
          <div className="flex-1 h-2 rounded-full bg-black/[0.04] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: inView ? `${(d.count / max) * 100}%` : "0%",
                background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                transition: `width 0.6s cubic-bezier(0.25, 0.4, 0.25, 1) ${i * 60}ms`,
                willChange: "width",
              }}
            />
          </div>
          <span className="text-[13px] text-text-muted w-6 text-right shrink-0">{d.count}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Card entrance variants ─── */
const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease },
  }),
};

/* ─── Pipeline item entrance variants ─── */
const pipelineItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease },
  }),
};

export default function InvestorDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const glassHover = useGlassHover();

  return (
    <div className="min-h-screen flex bg-base text-text-primary relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 top-[5%] right-[15%]" />
        <div className="blob blob-lavender animate-blob-2 bottom-[20%] left-[8%]" />
        <div className="blob blob-peach animate-blob-3 top-[50%] right-[25%]" />
      </div>

      <Sidebar role="investor" activeLabel="Dashboard" />

      <div className="flex-1 md:ml-[240px] relative z-10 pb-20 md:pb-8">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-8">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease }}
            className="flex items-center justify-between mb-8"
          >
            <h1 className="text-[24px] md:text-[28px] font-normal text-text-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {mounted ? getGreeting() : "Good morning"}, Jordan
            </h1>
            <p className="text-text-muted text-[14px] hidden sm:block">{today}</p>
          </motion.div>

          {/* Engagement Scorecard */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            {...glassHover}
          >
            <div className="glass p-6 md:p-8 mb-6">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex flex-wrap justify-between gap-6 flex-1">
                  <Stat target={23} label="Startups Reviewed" trend="this week" trendDir="flat" delay={0} />
                  <div className="hidden md:block w-px h-10 self-center bg-black/[0.06]" />
                  <Stat target={7} label="Interests Sent" trend="40%" trendDir="up" delay={150} />
                  <div className="hidden md:block w-px h-10 self-center bg-black/[0.06]" />
                  <Stat target={5} label="Matches Made" trend="25%" trendDir="up" delay={300} />
                  <div className="hidden md:block w-px h-10 self-center bg-black/[0.06]" />
                  <Stat target={4} label="Calls Completed" trend="100%" trendDir="up" delay={450} />
                  <div className="hidden md:block w-px h-10 self-center bg-black/[0.06]" />
                  <Stat target={3.2} decimals={1} suffix="m" label="Avg Response" trend="fast" trendDir="up" delay={600} />
                </div>
                <div className="border-t md:border-t-0 md:border-l border-black/[0.06] pt-6 md:pt-0 md:pl-8">
                  <EngagementRing score={94} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid md:grid-cols-[1fr_0.65fr] gap-5">
            {/* LEFT */}
            <div className="flex flex-col gap-5">
              {/* Daily Drops */}
              <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" {...glassHover}>
                <div className="glass p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[18px] font-semibold text-text-primary">Daily Drops</h3>
                      <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold text-white" style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}>New</span>
                    </div>
                    <Link href="/drops" className="text-accent-blue text-[14px] hover:underline">Open Feed</Link>
                  </div>
                  {[
                    { initials: "TH", color: "#7C5CFC", name: "Terraform Health", desc: "Predictive diagnostics using wearable biosignals", sector: "Health Tech", stage: "Pre-Seed" },
                    { initials: "CA", color: "#059669", name: "Canopy Analytics", desc: "Real-time carbon tracking for supply chains", sector: "Climate Tech", stage: "Seed" },
                    { initials: "Br", color: "#e67e22", name: "Briefly", desc: "AI meeting assistant that writes follow-ups", sector: "AI/SaaS", stage: "Pre-Seed" },
                  ].map((s, i, arr) => (
                    <Link key={s.name} href="/drops" className={`flex items-center gap-3 py-3 cursor-pointer hover:bg-black/[0.02] hover:-translate-y-px hover:shadow-sm -mx-2 px-2 rounded-lg transition-all duration-200 ${i < arr.length - 1 ? "border-b border-black/[0.04]" : ""}`}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: s.color }}>{s.initials}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-semibold text-text-primary">{s.name}</p>
                        <p className="text-[13px] text-text-muted truncate">{s.desc}</p>
                      </div>
                      <div className="hidden sm:flex gap-1.5 shrink-0">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-blue/5 text-accent-blue border border-accent-blue/15">{s.sector}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/[0.03] text-text-muted border border-black/[0.06]">{s.stage}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Pipeline */}
              <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" {...glassHover}>
                <div className="glass p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[18px] font-semibold text-text-primary">Your Pipeline</h3>
                    <Link href="/matches" className="text-accent-blue text-[14px] hover:underline">View All</Link>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Interested */}
                    <div>
                      <p className="text-[11px] uppercase tracking-[1px] text-text-muted mb-3" style={{ borderLeft: "3px solid #4A6CF7", paddingLeft: "8px" }}>Interested <span className="text-text-primary">(2)</span></p>
                      <div className="space-y-2">
                        {[
                          { name: "Luminary AI", sub: "47h remaining" },
                          { name: "Stackpay", sub: "Sent 2 days ago" },
                        ].map((c, i) => (
                          <motion.div
                            key={c.name}
                            custom={i}
                            variants={pipelineItemVariants}
                            initial="hidden"
                            animate="visible"
                            className="rounded-lg p-3"
                            style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}
                          >
                            <p className="text-[13px] font-semibold text-text-primary">{c.name}</p>
                            <p className="text-[11px] text-text-muted flex items-center gap-1 mt-0.5">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                              {c.sub}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    {/* Matched */}
                    <div>
                      <p className="text-[11px] uppercase tracking-[1px] text-text-muted mb-3" style={{ borderLeft: "3px solid #7C5CFC", paddingLeft: "8px" }}>Matched <span className="text-text-primary">(2)</span></p>
                      <div className="space-y-2">
                        {[
                          { name: "Terraform Health", sub: "Call Mar 15" },
                          { name: "Canopy Analytics", sub: "Scheduling..." },
                        ].map((c, i) => (
                          <motion.div
                            key={c.name}
                            custom={i}
                            variants={pipelineItemVariants}
                            initial="hidden"
                            animate="visible"
                            className="rounded-lg p-3"
                            style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}
                          >
                            <p className="text-[13px] font-semibold text-text-primary">{c.name}</p>
                            <p className="text-[11px] text-text-muted flex items-center gap-1 mt-0.5">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /></svg>
                              {c.sub}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    {/* Talking */}
                    <div>
                      <p className="text-[11px] uppercase tracking-[1px] text-text-muted mb-3" style={{ borderLeft: "3px solid #059669", paddingLeft: "8px" }}>Talking <span className="text-text-primary">(1)</span></p>
                      <div className="space-y-2">
                        <motion.div
                          custom={0}
                          variants={pipelineItemVariants}
                          initial="hidden"
                          animate="visible"
                          className="rounded-lg p-3"
                          style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}
                        >
                          <p className="text-[13px] font-semibold text-text-primary">Briefly</p>
                          <p className="text-[11px] text-text-muted flex items-center gap-1 mt-0.5">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                            Both continue
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Scheduled Calls */}
              <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible" {...glassHover}>
                <div className="glass p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[18px] font-semibold text-text-primary">Scheduled Calls</h3>
                    <Link href="/matches" className="text-accent-blue text-[14px] hover:underline">View All</Link>
                  </div>
                  {[
                    { initials: "TH", color: "#7C5CFC", name: "Terraform Health", desc: "Predictive diagnostics", time: "Mar 15, 3:00 PM", relative: "In 6 days" },
                    { initials: "CA", color: "#059669", name: "Canopy Analytics", desc: "Carbon tracking", time: "Mar 17, 11:00 AM", relative: "In 8 days" },
                  ].map((c, i, arr) => (
                    <div key={c.name} className={`flex items-center gap-3 py-3 hover:bg-black/[0.02] transition-all duration-200 cursor-pointer rounded-lg -mx-2 px-2 hover:-translate-y-px hover:shadow-sm ${i < arr.length - 1 ? "border-b border-black/[0.04]" : ""}`}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" style={{ backgroundColor: c.color }}>{c.initials}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-semibold text-text-primary">{c.name}</p>
                        <p className="text-[13px] text-text-muted">{c.desc}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[13px] px-3 py-1 rounded-full text-text-primary" style={{ background: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.5)" }}>{c.time}</span>
                        <p className="text-[12px] text-text-muted mt-1">{c.relative}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-5">
              {/* Saved */}
              <motion.div custom={4} variants={cardVariants} initial="hidden" animate="visible" {...glassHover}>
                <div className="glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[18px] font-semibold text-text-primary">Saved <span className="text-text-muted font-normal">(7)</span></h3>
                    <Link href="/saved" className="text-accent-blue text-[14px] hover:underline">View All</Link>
                  </div>
                  {[
                    { initials: "LA", color: "#4A6CF7", name: "Luminary AI", sector: "AI/ML" },
                    { initials: "SP", color: "#0d9488", name: "Stackpay", sector: "Fintech" },
                    { initials: "NP", color: "#7C5CFC", name: "NeuralPath", sector: "Dev Tools" },
                    { initials: "GG", color: "#059669", name: "GreenGrid", sector: "Climate" },
                    { initials: "AR", color: "#e67e22", name: "Archetype", sector: "Enterprise" },
                  ].map((s, i, arr) => (
                    <div key={s.name} className={`flex items-center gap-2.5 py-2.5 hover:bg-black/[0.02] transition-all duration-200 cursor-pointer rounded-lg -mx-2 px-2 hover:-translate-y-px hover:shadow-sm ${i < arr.length - 1 ? "border-b border-black/[0.04]" : ""}`}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-semibold shrink-0" style={{ backgroundColor: s.color }}>{s.initials}</div>
                      <span className="text-[14px] font-semibold text-text-primary flex-1">{s.name}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-accent-blue/5 text-accent-blue border border-accent-blue/15">{s.sector}</span>
                      <Link href="/startup/1" className="text-accent-blue text-[13px] hover:underline shrink-0 ml-2">Review</Link>
                    </div>
                  ))}
                  <Link href="/saved" className="text-accent-blue text-[13px] hover:underline mt-3 inline-block">View all 7 saved</Link>
                </div>
              </motion.div>

              {/* Sector Activity */}
              <motion.div custom={5} variants={cardVariants} initial="hidden" animate="visible" {...glassHover}>
                <div className="glass p-6">
                  <h3 className="text-[16px] font-semibold text-text-primary mb-4">Sector Activity</h3>
                  <SectorBars />
                </div>
              </motion.div>

              {/* This Week */}
              <motion.div custom={6} variants={cardVariants} initial="hidden" animate="visible" {...glassHover}>
                <div className="glass p-6">
                  <h3 className="text-[16px] font-semibold text-text-primary mb-4">This Week</h3>
                  <div className="space-y-4">
                    {[
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="1.5"><path d="M12 3v1m0 16v1m-7.07-2.93l.71-.71M18.36 5.64l.71-.71M3 12h1m16 0h1M5.64 5.64l-.71-.71m13.43 13.43l-.71-.71" /><circle cx="12" cy="12" r="4" /></svg>, text: <>Your match quality improved <span className="font-semibold text-text-primary">12%</span> based on your feedback patterns</> },
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>, text: <>Most active sector: <span className="font-semibold text-text-primary">AI/ML</span> with 12 startups reviewed</> },
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>, text: <>Your avg response time (<span className="font-semibold text-text-primary">3.2 min</span>) is faster than 95% of investors</> },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5">{item.icon}</div>
                        <p className="text-[14px] text-text-secondary leading-[1.5]">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
