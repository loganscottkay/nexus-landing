"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
      <p className="text-[10px] md:text-[12px] uppercase tracking-[1px] text-text-muted mt-1.5">{label}</p>
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
          <span className="text-[12px] text-text-muted leading-none ml-[2px]">/100</span>
        </div>
      </div>
      <p className="text-[13px] text-text-muted text-center mt-2">Engagement Score</p>
      <span className="text-[12px] px-2.5 py-1 rounded-full font-medium bg-[rgba(5,150,105,0.08)] text-[#059669] mt-1.5">Top 5%</span>
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
          <span className="text-[13px] text-text-secondary w-[100px] md:w-[130px] shrink-0 truncate">{d.label}</span>
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

/* ─── Collapsible Pipeline Stage (mobile) ─── */
function PipelineStage({ title, count, color, children, defaultOpen = true }: {
  title: string; count: number; color: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/[0.04] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center w-full py-3 min-h-[44px]"
      >
        <div className="w-[3px] h-4 rounded-full mr-2 shrink-0" style={{ backgroundColor: color }} />
        <span className="text-[12px] uppercase tracking-[1px] text-text-muted flex-1 text-left">
          {title} <span className="text-text-primary">({count})</span>
        </span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="pb-3 space-y-2">{children}</div>}
    </div>
  );
}

/* ─── Pipeline Item Card ─── */
function PipelineItem({ name, sub, icon }: { name: string; sub: string; icon: React.ReactNode }) {
  return (
    <div
      className="rounded-lg p-3"
      style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}
    >
      <p className="text-[13px] font-semibold text-text-primary">{name}</p>
      <p className="text-[12px] text-text-muted flex items-center gap-1 mt-0.5">
        {icon}
        {sub}
      </p>
    </div>
  );
}

/* ─── Saved Section Content ─── */
function SavedContent() {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[18px] font-semibold text-text-primary flex items-center gap-2">
          {bookmarkIcon}
          Saved <span className="text-text-muted font-normal">(7)</span>
        </h3>
        <Link href="/saved" className="text-accent-blue text-[14px] hover:underline">View All</Link>
      </div>
      {[
        { initials: "LA", color: "#4A6CF7", name: "Luminary AI", sector: "AI/ML" },
        { initials: "SP", color: "#0d9488", name: "Stackpay", sector: "Fintech" },
        { initials: "NP", color: "#7C5CFC", name: "NeuralPath", sector: "Dev Tools" },
        { initials: "GG", color: "#059669", name: "GreenGrid", sector: "Climate" },
        { initials: "AR", color: "#e67e22", name: "Archetype", sector: "Enterprise" },
      ].map((s, i, arr) => (
        <div key={s.name} className={`flex items-center gap-2.5 py-2.5 min-h-[44px] hover:bg-black/[0.02] transition-all duration-200 cursor-pointer rounded-lg -mx-2 px-2 hover:-translate-y-px hover:shadow-sm ${i < arr.length - 1 ? "border-b border-black/[0.04]" : ""}`}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-semibold shrink-0" style={{ backgroundColor: s.color }}>{s.initials}</div>
          <span className="text-[14px] font-semibold text-text-primary flex-1">{s.name}</span>
          <span className="text-[12px] px-2 py-0.5 rounded-full bg-accent-blue/5 text-accent-blue border border-accent-blue/15">{s.sector}</span>
          <Link href="/startup/1" className="text-accent-blue text-[13px] hover:underline shrink-0 ml-2">Review</Link>
        </div>
      ))}
      <Link href="/saved" className="text-accent-blue text-[13px] hover:underline mt-3 inline-block">View all 7 saved</Link>
    </>
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

const clockIcon = <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
const calIcon = <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /></svg>;
const chatIcon = <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>;

/* ─── Section Title Icons ─── */
const compassIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>;
const clockSectionIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
const bookmarkIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>;
const funnelIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>;

/* ─── Filter Toggle Data ─── */
interface FilterState {
  industries: Record<string, boolean>;
  stages: Record<string, boolean>;
}

const defaultFilters: FilterState = {
  industries: {
    "AI / Machine Learning": true,
    "SaaS": true,
    "Fintech": true,
    "Health Tech": false,
    "Climate Tech": false,
    "Consumer": false,
    "Marketplace": false,
    "Developer Tools": true,
  },
  stages: {
    "Pre-Seed": true,
    "Seed": true,
    "Series A": false,
  },
};

/* ─── Filter Toggle Row ─── */
function FilterToggle({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200"
      style={{
        background: active ? "rgba(8,145,178,0.1)" : "rgba(0,0,0,0.03)",
        border: `1px solid ${active ? "rgba(8,145,178,0.3)" : "rgba(0,0,0,0.06)"}`,
        color: active ? "#0891B2" : "#94A3B8",
      }}
    >
      <span>{label}</span>
      <div
        className="w-8 h-[18px] rounded-full relative transition-all duration-200"
        style={{
          background: active ? "rgba(8,145,178,0.3)" : "rgba(0,0,0,0.1)",
        }}
      >
        <div
          className="w-3.5 h-3.5 rounded-full absolute top-[2px] transition-all duration-200"
          style={{
            background: active ? "#0891B2" : "#94A3B8",
            left: active ? "16px" : "2px",
          }}
        />
      </div>
    </button>
  );
}

/* ─── Filter Panel Content (shared between desktop and mobile) ─── */
function FilterPanelContent({ filters, setFilters }: { filters: FilterState; setFilters: React.Dispatch<React.SetStateAction<FilterState>> }) {
  return (
    <>
      <h3 className="text-[16px] font-semibold text-text-primary mb-1" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Your Feed Filters</h3>
      <p className="text-[12px] text-text-muted mb-5">Your daily feed only shows startups matching these filters.</p>

      {/* Industries */}
      <p className="text-[11px] uppercase tracking-[1.5px] text-text-muted mb-2 font-semibold">Industries</p>
      <div className="space-y-1.5 mb-5">
        {Object.entries(filters.industries).map(([name, active]) => (
          <FilterToggle
            key={name}
            label={name}
            active={active}
            onToggle={() => setFilters((prev) => ({
              ...prev,
              industries: { ...prev.industries, [name]: !prev.industries[name] },
            }))}
          />
        ))}
      </div>

      {/* Stage */}
      <p className="text-[11px] uppercase tracking-[1.5px] text-text-muted mb-2 font-semibold">Stage</p>
      <div className="space-y-1.5 mb-5">
        {Object.entries(filters.stages).map(([name, active]) => (
          <FilterToggle
            key={name}
            label={name}
            active={active}
            onToggle={() => setFilters((prev) => ({
              ...prev,
              stages: { ...prev.stages, [name]: !prev.stages[name] },
            }))}
          />
        ))}
      </div>

      {/* Investment Range */}
      <p className="text-[11px] uppercase tracking-[1.5px] text-text-muted mb-2 font-semibold">Investment Range</p>
      <div className="flex items-center justify-between mb-5">
        <span className="text-[15px] font-semibold text-text-primary">$100K - $500K</span>
        <button className="text-[13px] font-medium" style={{ color: "#0891B2" }}>Edit</button>
      </div>

      <p className="text-[11px] text-text-muted">Filters updated 2h ago</p>
    </>
  );
}

/* ─── Meeting Queue Section ─── */
function MeetingQueue() {
  const queueItems = [
    { initials: "LA", color: "#4A6CF7", name: "Luminary AI", sector: "AI/ML", position: 1, active: true, status: "47h remaining", statusLabel: "ACTIVE" },
    { initials: "TH", color: "#7C5CFC", name: "Terraform Health", sector: "Health Tech", position: 2, active: false, status: "Next up", statusLabel: "" },
    { initials: "SP", color: "#0d9488", name: "Stackpay", sector: "Fintech", position: 3, active: false, status: "Estimated: ~6 days", statusLabel: "" },
  ];

  return (
    <div>
      <h3 className="text-[18px] font-semibold text-text-primary mb-1 flex items-center gap-2" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
        {clockSectionIcon}
        Your Meeting Queue
      </h3>
      <p className="text-[13px] mb-5" style={{ color: "#64748B" }}>First to express interest = first to meet. Each window is 72 hours.</p>

      {/* Desktop Queue */}
      <div className="hidden md:block space-y-0">
        {queueItems.map((q, i) => (
          <div key={q.name}>
            <div className="flex items-center gap-4 py-3">
              {/* Position circle */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold shrink-0"
                style={{
                  background: q.position === 1 ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)" : "rgba(0,0,0,0.06)",
                  color: q.position === 1 ? "white" : "#475569",
                }}
              >
                {q.position}
              </div>

              {/* Avatar + name + sector */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-semibold shrink-0" style={{ backgroundColor: q.color }}>
                  {q.initials}
                </div>
                <span className="text-[16px] font-semibold text-text-primary">{q.name}</span>
                <span className="text-[12px] px-2 py-0.5 rounded-full bg-accent-blue/5 text-accent-blue border border-accent-blue/15">{q.sector}</span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 shrink-0">
                {q.active ? (
                  <>
                    <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(5,150,105,0.1)", color: "#059669" }}>ACTIVE</span>
                    <span className="text-[15px] font-medium" style={{ color: "#4A6CF7" }}>47h remaining</span>
                  </>
                ) : (
                  <span className="text-[14px] text-text-muted">{q.status}</span>
                )}
              </div>
            </div>

            {/* Connecting line between items */}
            {i < queueItems.length - 1 && (
              <div className="flex items-center pl-[15px]">
                <div className="w-[2px] h-6" style={{ background: "rgba(0,0,0,0.06)" }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Queue */}
      <div className="md:hidden space-y-0">
        {queueItems.map((q, i) => (
          <div key={q.name}>
            <div className="flex items-start gap-3 py-3">
              {/* Position circle */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold shrink-0 mt-1"
                style={{
                  background: q.position === 1 ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)" : "rgba(0,0,0,0.06)",
                  color: q.position === 1 ? "white" : "#475569",
                }}
              >
                {q.position}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-semibold shrink-0" style={{ backgroundColor: q.color }}>
                    {q.initials}
                  </div>
                  <div>
                    <span className="text-[16px] font-semibold text-text-primary block">{q.name}</span>
                    <span className="text-[12px] px-2 py-0.5 rounded-full bg-accent-blue/5 text-accent-blue border border-accent-blue/15 inline-block mt-0.5">{q.sector}</span>
                  </div>
                </div>
                {/* Status below on mobile */}
                <div className="mt-2">
                  {q.active ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(5,150,105,0.1)", color: "#059669" }}>ACTIVE</span>
                      <span className="text-[15px] font-medium" style={{ color: "#4A6CF7" }}>47h remaining</span>
                    </div>
                  ) : (
                    <span className="text-[14px] text-text-muted">{q.status}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Connecting line between items */}
            {i < queueItems.length - 1 && (
              <div className="flex items-center pl-[15px]">
                <div className="w-[2px] h-4" style={{ background: "rgba(0,0,0,0.06)" }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info box */}
      <div className="rounded-xl p-3 mt-4" style={{ background: "rgba(74,108,247,0.03)" }}>
        <p className="text-[13px] text-text-muted leading-[1.5]">
          When the active window closes, the next startup moves up automatically. If you do not schedule within your window, you lose your spot.
        </p>
      </div>
    </div>
  );
}

export default function InvestorDashboard() {
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

      {/* Main Content */}
      <div className="flex-1 md:ml-[240px] md:mr-[280px] relative z-10 pb-[80px] md:pb-8">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-8">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease }}
            className="mb-4"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-[22px] md:text-[28px] font-normal text-text-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {mounted ? getGreeting() : "Good morning"}, Jordan
              </h1>
              <p className="text-text-muted text-[13px] md:text-[14px] mt-1 md:mt-0">{today}</p>
            </div>
          </motion.div>

          {/* Investor View Banner */}
          <div style={{ background: "rgba(8,145,178,0.05)" }} className="rounded-xl px-4 py-2.5 mb-4 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a4 4 0 00-8 0v2" />
            </svg>
            <span className="text-[12px] font-semibold" style={{ color: "#0891B2" }}>Investor View</span>
            <span className="text-[12px] text-text-muted mx-1">|</span>
            <span className="text-[12px] text-text-muted">Sectors: AI/ML, Fintech, SaaS</span>
          </div>

          {/* Mobile Filters Button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="px-3 py-1.5 rounded-full text-[13px] font-medium"
              style={{ background: "rgba(8,145,178,0.1)", color: "#0891B2" }}
            >
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filters
              </span>
            </button>
          </div>

          {/* Engagement Scorecard */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            {...glassHover}
          >
            <div className="glass rounded-2xl p-4 md:p-8 mb-4 md:mb-6" style={{ background: "linear-gradient(135deg, rgba(74,108,247,0.06), rgba(6,182,212,0.04))", backdropFilter: "blur(20px)", border: "1px solid rgba(0,0,0,0.06)" }}>
              {/* Desktop: horizontal row with dividers */}
              <div className="hidden md:flex md:items-center gap-8">
                <div className="flex flex-wrap justify-between gap-6 flex-1">
                  <Stat target={14} label="Startups in Your Feed" trend="this week" trendDir="flat" delay={0} />
                  <div className="w-px h-10 self-center bg-black/[0.06]" />
                  <Stat target={5} label="Interests Sent" trend="↑ 2 this week" trendDir="up" delay={150} />
                  <div className="w-px h-10 self-center bg-black/[0.06]" />
                  <Stat target={3} label="Mutual Matches" trend="↑ 1 new" trendDir="up" delay={300} />
                  <div className="w-px h-10 self-center bg-black/[0.06]" />
                  <Stat target={2} label="Calls Scheduled" trend="next: tomorrow" trendDir="up" delay={450} />
                  <div className="w-px h-10 self-center bg-black/[0.06]" />
                  <Stat target={4} label="Video Pitches Watched" trend="today" trendDir="flat" delay={600} />
                </div>
                <div className="border-l border-black/[0.06] pl-8">
                  <EngagementRing score={94} />
                </div>
              </div>
              {/* Mobile: 2-column grid, 5th stat spans full width, ring below */}
              <div className="md:hidden">
                <div className="grid grid-cols-2 gap-4">
                  <Stat target={14} label="Startups in Feed" trend="this week" trendDir="flat" delay={0} />
                  <Stat target={5} label="Interests Sent" trend="↑ 2 this week" trendDir="up" delay={150} />
                  <Stat target={3} label="Mutual Matches" trend="↑ 1 new" trendDir="up" delay={300} />
                  <Stat target={2} label="Calls Scheduled" trend="next: tomorrow" trendDir="up" delay={450} />
                  <div className="col-span-2">
                    <Stat target={4} label="Video Pitches Watched" trend="today" trendDir="flat" delay={600} />
                  </div>
                </div>
                <div className="border-t border-black/[0.06] pt-6 mt-6 flex justify-center">
                  <EngagementRing score={94} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Grid - single column on mobile, 2 columns on desktop */}
          <div className="flex flex-col md:grid md:grid-cols-[1fr_0.65fr] gap-4 md:gap-5">
            {/* LEFT */}
            <div className="flex flex-col gap-4 md:gap-5">
              {/* New in Your Feed */}
              <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" {...glassHover}>
                <div className="glass rounded-2xl p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4 md:mb-5">
                    <div className="flex items-center gap-2">
                      {compassIcon}
                      <h3 className="text-[18px] font-semibold text-text-primary">New in Your Feed</h3>
                      <span className="text-[12px] px-2.5 py-1 rounded-full font-semibold text-white" style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}>New</span>
                    </div>
                    <Link href="/drops" className="text-accent-blue text-[14px] hover:underline">Open Feed</Link>
                  </div>
                  <p className="text-[12px] text-text-muted italic mb-3">Startups that match your filters, refreshed daily.</p>
                  {[
                    { initials: "TH", color: "#7C5CFC", name: "Terraform Health", desc: "Predictive diagnostics using wearable biosignals", sector: "Health Tech", stage: "Pre-Seed" },
                    { initials: "CA", color: "#059669", name: "Canopy Analytics", desc: "Real-time carbon tracking for supply chains", sector: "Climate Tech", stage: "Seed" },
                    { initials: "Br", color: "#e67e22", name: "Briefly", desc: "AI meeting assistant that writes follow-ups", sector: "AI/SaaS", stage: "Pre-Seed" },
                  ].map((s, i, arr) => (
                    <Link key={s.name} href="/drops" className={`block py-3 min-h-[60px] cursor-pointer hover:bg-black/[0.02] -mx-2 px-2 rounded-lg transition-all duration-200 ${i < arr.length - 1 ? "border-b border-black/[0.04]" : ""}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: s.color }}>{s.initials}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[15px] font-semibold text-text-primary">{s.name}</p>
                          <p className="text-[13px] text-text-muted truncate">{s.desc}</p>
                          {/* Mobile pills */}
                          <div className="flex gap-1.5 flex-wrap mt-1.5 md:hidden">
                            <span className="text-[12px] px-2 py-0.5 rounded-full bg-accent-blue/5 text-accent-blue border border-accent-blue/15">{s.sector}</span>
                            <span className="text-[12px] px-2 py-0.5 rounded-full bg-black/[0.03] text-text-muted border border-black/[0.06]">{s.stage}</span>
                          </div>
                        </div>
                        {/* Desktop pills */}
                        <div className="hidden md:flex gap-1.5 shrink-0">
                          <span className="text-[12px] px-2 py-0.5 rounded-full bg-accent-blue/5 text-accent-blue border border-accent-blue/15">{s.sector}</span>
                          <span className="text-[12px] px-2 py-0.5 rounded-full bg-black/[0.03] text-text-muted border border-black/[0.06]">{s.stage}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Saved - mobile only (appears below Feed on mobile) */}
              <motion.div custom={1.5} variants={cardVariants} initial="hidden" animate="visible" className="md:hidden" {...glassHover}>
                <div className="glass rounded-2xl p-4">
                  <SavedContent />
                </div>
              </motion.div>

              {/* Your Meeting Queue */}
              <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" {...glassHover}>
                <div className="glass rounded-2xl p-4 md:p-6">
                  <MeetingQueue />
                </div>
              </motion.div>

              {/* Pipeline */}
              <motion.div custom={2.5} variants={cardVariants} initial="hidden" animate="visible" {...glassHover}>
                <div className="glass rounded-2xl p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4 md:mb-5">
                    <h3 className="text-[18px] font-semibold text-text-primary flex items-center gap-2">
                      {funnelIcon}
                      Your Pipeline
                    </h3>
                    <Link href="/matches" className="text-accent-blue text-[14px] hover:underline">View All</Link>
                  </div>

                  {/* Desktop: 3-column kanban */}
                  <div className="hidden md:grid grid-cols-3 gap-3">
                    {/* Waiting */}
                    <div>
                      <p className="text-[12px] uppercase tracking-[1px] text-text-muted mb-3" style={{ borderLeft: "3px solid #4A6CF7", paddingLeft: "8px" }}>Waiting <span className="text-text-primary">(2)</span></p>
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
                            <p className="text-[12px] text-text-muted flex items-center gap-1 mt-0.5">
                              {clockIcon}
                              {c.sub}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    {/* Call Booked */}
                    <div>
                      <p className="text-[12px] uppercase tracking-[1px] text-text-muted mb-3" style={{ borderLeft: "3px solid #7C5CFC", paddingLeft: "8px" }}>Call Booked <span className="text-text-primary">(2)</span></p>
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
                            <p className="text-[12px] text-text-muted flex items-center gap-1 mt-0.5">
                              {calIcon}
                              {c.sub}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    {/* In Progress */}
                    <div>
                      <p className="text-[12px] uppercase tracking-[1px] text-text-muted mb-3" style={{ borderLeft: "3px solid #059669", paddingLeft: "8px" }}>In Progress <span className="text-text-primary">(1)</span></p>
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
                          <p className="text-[12px] text-text-muted flex items-center gap-1 mt-0.5">
                            {chatIcon}
                            Both continue
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile: collapsible stages */}
                  <div className="md:hidden">
                    <PipelineStage title="Waiting" count={2} color="#4A6CF7">
                      <PipelineItem name="Luminary AI" sub="47h remaining" icon={clockIcon} />
                      <PipelineItem name="Stackpay" sub="Sent 2 days ago" icon={clockIcon} />
                    </PipelineStage>
                    <PipelineStage title="Call Booked" count={2} color="#7C5CFC">
                      <PipelineItem name="Terraform Health" sub="Call Mar 15" icon={calIcon} />
                      <PipelineItem name="Canopy Analytics" sub="Scheduling..." icon={calIcon} />
                    </PipelineStage>
                    <PipelineStage title="In Progress" count={1} color="#059669">
                      <PipelineItem name="Briefly" sub="Both continue" icon={chatIcon} />
                    </PipelineStage>
                  </div>
                </div>
              </motion.div>

              {/* Scheduled Calls */}
              <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible" {...glassHover}>
                <div className="glass rounded-2xl p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4 md:mb-5">
                    <h3 className="text-[18px] font-semibold text-text-primary">Scheduled Calls</h3>
                    <Link href="/matches" className="text-accent-blue text-[14px] hover:underline">View All</Link>
                  </div>
                  {[
                    { initials: "TH", color: "#7C5CFC", name: "Terraform Health", desc: "Predictive diagnostics", time: "Mar 15, 3:00 PM", relative: "In 6 days" },
                    { initials: "CA", color: "#059669", name: "Canopy Analytics", desc: "Carbon tracking", time: "Mar 17, 11:00 AM", relative: "In 8 days" },
                  ].map((c, i, arr) => (
                    <div key={c.name} className={`flex items-center gap-3 py-3 min-h-[44px] hover:bg-black/[0.02] transition-all duration-200 cursor-pointer rounded-lg -mx-2 px-2 hover:-translate-y-px hover:shadow-sm ${i < arr.length - 1 ? "border-b border-black/[0.04]" : ""}`}>
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
            <div className="flex flex-col gap-4 md:gap-5">
              {/* Saved - desktop only (on mobile it renders after Feed above) */}
              <motion.div custom={4} variants={cardVariants} initial="hidden" animate="visible" className="hidden md:block" {...glassHover}>
                <div className="glass rounded-2xl p-4 md:p-6">
                  <SavedContent />
                </div>
              </motion.div>

              {/* Sector Activity */}
              <motion.div custom={5} variants={cardVariants} initial="hidden" animate="visible" {...glassHover}>
                <div className="glass rounded-2xl p-4 md:p-6">
                  <h3 className="text-[16px] font-semibold text-text-primary mb-4">Sector Activity</h3>
                  <SectorBars />
                </div>
              </motion.div>

              {/* This Week */}
              <motion.div custom={6} variants={cardVariants} initial="hidden" animate="visible" {...glassHover}>
                <div className="glass rounded-2xl p-4 md:p-6">
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

      {/* Desktop Filter Panel - fixed right */}
      <div
        className="hidden md:flex flex-col w-[280px] shrink-0 h-screen fixed right-0 top-0 z-20 overflow-y-auto p-5"
        style={{
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(24px) saturate(1.2)",
          borderLeft: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <FilterPanelContent filters={filters} setFilters={setFilters} />
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-y-auto md:hidden"
              style={{
                maxHeight: "70vh",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(24px) saturate(1.2)",
                boxShadow: "0 -8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <div className="p-5">
                {/* Drag handle */}
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-1 rounded-full bg-black/20" />
                </div>
                {/* Close button */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[16px] font-semibold text-text-primary" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Filters</h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.05)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <FilterPanelContent filters={filters} setFilters={setFilters} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
