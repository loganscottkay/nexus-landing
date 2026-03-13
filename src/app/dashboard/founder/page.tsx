"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

const ease = [0.25, 0.4, 0.25, 1] as const;

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

/* ─── Profile Ring ─── */
function ProfileRing({ pct }: { pct: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <svg ref={ref} width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
      <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="8" />
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C5CFC" />
          <stop offset="100%" stopColor="#4A6CF7" />
        </linearGradient>
      </defs>
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="8"
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
        strokeDasharray={circ}
        strokeDashoffset={inView ? offset : circ}
        style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
      />
      <text x="60" y="58" textAnchor="middle" fill="#0F172A" fontSize="28" fontWeight="600" fontFamily="var(--font-dm-sans), sans-serif">{pct}%</text>
      <text x="60" y="76" textAnchor="middle" fill="#94A3B8" fontSize="12" fontFamily="var(--font-dm-sans), sans-serif">Profile Strength</text>
    </svg>
  );
}

/* ─── Deck Views Bar Chart ─── */
function DeckChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const data = [3, 5, 2, 7, 4, 6, 8, 3, 9, 5, 4, 7, 6, 12];
  const max = Math.max(...data);

  return (
    <div ref={ref} className="flex items-end gap-1.5 h-[100px]">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-full transition-all duration-600"
            style={{
              height: inView ? `${(v / max) * 80}px` : "0px",
              background: "linear-gradient(to top, #7C5CFC, #4A6CF7)",
              transitionDelay: `${i * 30}ms`,
              minWidth: "6px",
              maxWidth: "10px",
            }}
          />
          {i % 3 === 0 && (
            <span className="text-[12px] text-text-muted">{14 - i}d</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Stat with Trend ─── */
function Stat({ value, label, trend, trendDir }: { value: string; label: string; trend: string; trendDir: "up" | "down" | "flat" | "new" }) {
  const colors = { up: "#059669", down: "#EF4444", flat: "#64748B", new: "#7C5CFC" };
  const bgs = { up: "rgba(5,150,105,0.08)", down: "rgba(239,68,68,0.08)", flat: "rgba(100,116,139,0.08)", new: "rgba(124,92,252,0.08)" };
  return (
    <div className="text-center">
      <p className="text-[28px] md:text-[32px] font-semibold text-text-primary leading-none">{value}</p>
      <p className="text-[10px] md:text-[12px] uppercase tracking-[1px] text-text-muted mt-1.5">{label}</p>
      <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: bgs[trendDir], color: colors[trendDir] }}>
        {trendDir === "up" && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15" /></svg>}
        {trendDir === "down" && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>}
        {trendDir === "flat" && <span>-</span>}
        {trendDir === "new" && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
        {trend}
      </span>
    </div>
  );
}

function GlassCard({ children, className = "", style: styleProp }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-2xl ${className}`} style={{
      background: "rgba(255, 255, 255, 0.45)",
      backdropFilter: "blur(20px) saturate(1.2)",
      WebkitBackdropFilter: "blur(20px) saturate(1.2)",
      border: "1px solid rgba(255, 255, 255, 0.6)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
      ...styleProp,
    }}>
      {children}
    </div>
  );
}

/* ─── Profile Strength Content ─── */
function ProfileStrengthContent() {
  return (
    <>
      <h3 className="text-[18px] font-semibold text-text-primary mb-5">Profile Strength</h3>
      <ProfileRing pct={78} />
      <div className="mt-6 space-y-2.5">
        {[
          { label: "Company basics", done: true },
          { label: "Traction metrics", done: true },
          { label: "Team profiles", done: true },
          { label: "Pitch deck", done: true },
          { label: "Video pitch", done: false },
          { label: "Investor preferences", done: true },
        ].map((item) => (
          <div key={item.label} className={`flex items-center gap-2.5 py-1.5 px-2 rounded-lg min-h-[44px] ${!item.done ? "bg-[rgba(217,119,6,0.06)]" : ""}`}>
            {item.done ? (
              <div className="w-5 h-5 rounded-full bg-[#059669] flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-[#D97706]/30 shrink-0" />
            )}
            <span className={`text-[14px] flex-1 ${!item.done ? "text-[#D97706] font-medium" : "text-text-primary"}`}>{item.label}</span>
            {!item.done && <Link href="/settings/founder" className="text-accent-violet text-[13px] hover:underline shrink-0">Add</Link>}
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── Time Slot Options ─── */
const timeSlotOptions = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM",
];

/* ─── Investor Queue Data ─── */
const queueInvestors = [
  { initials: "SC", color: "#4A6CF7", name: "Sarah Chen", firm: "Gradient Ventures", checkSize: "$250K-$1M", position: 1 },
  { initials: "MW", color: "#7C5CFC", name: "Marcus Webb", firm: "Founder Collective", checkSize: "$100K-$500K", position: 2 },
  { initials: "ER", color: "#D97706", name: "Elena Rodriguez", firm: "Precursor Ventures", checkSize: "$100K-$250K", position: 3 },
  { initials: "JP", color: "#0d9488", name: "James Park", firm: "Lux Capital", checkSize: "$500K-$2M", position: 4 },
];

export default function FounderDashboard() {
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);
  const [slots, setSlots] = useState([
    { date: "", time: "10:00 AM" },
    { date: "", time: "2:00 PM" },
    { date: "", time: "11:00 AM" },
  ]);

  useEffect(() => setMounted(true), []);

  const handleSlotChange = (index: number, field: "date" | "time", value: string) => {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSendProposal = () => {
    setProposalSent(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    // Reset after close animation
    setTimeout(() => {
      setProposalSent(false);
      setSlots([
        { date: "", time: "10:00 AM" },
        { date: "", time: "2:00 PM" },
        { date: "", time: "11:00 AM" },
      ]);
    }, 300);
  };

  return (
    <div className="min-h-screen flex bg-base text-text-primary relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 top-[5%] right-[15%]" />
        <div className="blob blob-lavender animate-blob-2 bottom-[20%] left-[8%]" />
        <div className="blob blob-peach animate-blob-3 top-[50%] right-[25%]" />
      </div>

      <Sidebar role="founder" activeLabel="Dashboard" />

      <div className="flex-1 md:ml-[240px] relative z-10 pb-[80px] md:pb-8">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-8">
          {/* Greeting */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease }} className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-[22px] md:text-[28px] font-normal text-text-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {mounted ? getGreeting() : "Good evening"}, Alex
              </h1>
              <p className="text-text-muted text-[13px] md:text-[14px] mt-1 md:mt-0">{today}</p>
            </div>
          </motion.div>

          {/* Activity Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1, ease }}>
            <GlassCard className="p-4 md:p-8 mb-4 md:mb-6" style={{ background: "linear-gradient(135deg, rgba(74,108,247,0.08), rgba(124,92,252,0.06), rgba(6,182,212,0.05))", border: "1px solid rgba(0,0,0,0.06)" }}>
              {/* Desktop: horizontal row with dividers */}
              <div className="hidden md:flex flex-wrap justify-between gap-6">
                <Stat value="47" label="Investors Saw Your Pitch" trend="↑ 12%" trendDir="up" />
                <div className="w-px h-10 self-center bg-black/[0.06]" />
                <Stat value="8" label="Investors Interested" trend="↑ 33%" trendDir="up" />
                <div className="w-px h-10 self-center bg-black/[0.06]" />
                <Stat value="4" label="Mutual Matches" trend="↑ 100%" trendDir="up" />
                <div className="w-px h-10 self-center bg-black/[0.06]" />
                <Stat value="3" label="Calls Completed" trend="this month" trendDir="flat" />
                <div className="w-px h-10 self-center bg-black/[0.06]" />
                <Stat value="12" label="Deck Views" trend="↑ 20%" trendDir="up" />
              </div>
              {/* Mobile: 2-column grid, 5th stat spans full width */}
              <div className="md:hidden grid grid-cols-2 gap-4">
                <Stat value="47" label="Profile Views" trend="↑ 12%" trendDir="up" />
                <Stat value="8" label="Investors Interested" trend="↑ 33%" trendDir="up" />
                <Stat value="4" label="Mutual Matches" trend="↑ 100%" trendDir="up" />
                <Stat value="3" label="Calls Completed" trend="this month" trendDir="flat" />
                <div className="col-span-2">
                  <Stat value="12" label="Deck Views" trend="↑ 20%" trendDir="up" />
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Grid - single column on mobile, 2 columns on desktop */}
          <div className="flex flex-col md:grid md:grid-cols-[1fr_0.65fr] gap-4 md:gap-5">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-4 md:gap-5">
              {/* Investor Queue */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2, ease }}>
                <GlassCard className="p-4 md:p-6">
                  <h3 className="text-[18px] font-semibold text-text-primary mb-1" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Investor Queue</h3>
                  <p className="text-[13px] mb-5" style={{ color: "#64748B" }}>One investor at a time. 72 hours per window. No pressure.</p>

                  {/* Desktop Queue */}
                  <div className="hidden md:block">
                    {queueInvestors.map((inv, i, arr) => (
                      <div key={inv.name}>
                        <div className="flex items-center gap-3 py-3">
                          {/* Position circle */}
                          <div
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-[13px] font-bold shrink-0"
                            style={inv.position === 1
                              ? { background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)", color: "white" }
                              : { background: "rgba(0,0,0,0.06)", color: "#475569" }
                            }
                          >
                            {inv.position}
                          </div>

                          {/* Avatar */}
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                            style={{ backgroundColor: inv.color }}
                          >
                            {inv.initials}
                          </div>

                          {/* Name + details */}
                          <div className="flex-1 min-w-0">
                            <p className="text-[16px] font-semibold text-text-primary">{inv.name}</p>
                            <p className="text-[13px] text-text-muted">{inv.firm} &middot; {inv.checkSize}</p>
                          </div>

                          {/* Status */}
                          <div className="shrink-0 flex flex-col items-end gap-1.5">
                            {inv.position === 1 ? (
                              <>
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-semibold uppercase tracking-[0.5px] px-2 py-0.5 rounded-full" style={{ background: "rgba(5,150,105,0.1)", color: "#059669" }}>Active</span>
                                  <span className="text-[13px] text-text-muted">Schedule Now</span>
                                </div>
                                <span className="text-[15px] font-semibold" style={{ color: "#4A6CF7" }}>47h left</span>
                                <button
                                  onClick={() => setModalOpen(true)}
                                  className="px-4 py-2 rounded-full text-[13px] font-semibold text-white cursor-pointer transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                                  style={{
                                    background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                                    boxShadow: "0 4px 14px rgba(124,92,252,0.3)",
                                  }}
                                >
                                  Schedule Meeting
                                </button>
                              </>
                            ) : (
                              <span className="text-[14px] text-text-muted">Window opens after #{inv.position - 1}</span>
                            )}
                          </div>
                        </div>

                        {/* Connecting line between items */}
                        {i < arr.length - 1 && (
                          <div className="flex items-center pl-[15px]">
                            <div className="w-[2px] h-[20px]" style={{ background: "rgba(0,0,0,0.06)" }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mobile Queue */}
                  <div className="md:hidden">
                    {queueInvestors.map((inv, i, arr) => (
                      <div key={inv.name}>
                        <div className="py-3">
                          <div className="flex items-center gap-3">
                            {/* Position circle */}
                            <div
                              className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-[13px] font-bold shrink-0"
                              style={inv.position === 1
                                ? { background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)", color: "white" }
                                : { background: "rgba(0,0,0,0.06)", color: "#475569" }
                              }
                            >
                              {inv.position}
                            </div>

                            {/* Avatar */}
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                              style={{ backgroundColor: inv.color }}
                            >
                              {inv.initials}
                            </div>

                            {/* Name + details */}
                            <div className="flex-1 min-w-0">
                              <p className="text-[16px] font-semibold text-text-primary">{inv.name}</p>
                              <p className="text-[13px] text-text-muted">{inv.firm} &middot; {inv.checkSize}</p>
                            </div>
                          </div>

                          {/* Status on new line below */}
                          <div className="mt-2 ml-[82px]">
                            {inv.position === 1 ? (
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-semibold uppercase tracking-[0.5px] px-2 py-0.5 rounded-full" style={{ background: "rgba(5,150,105,0.1)", color: "#059669" }}>Active</span>
                                  <span className="text-[13px] text-text-muted">Schedule Now</span>
                                  <span className="text-[15px] font-semibold ml-auto" style={{ color: "#4A6CF7" }}>47h left</span>
                                </div>
                                <button
                                  onClick={() => setModalOpen(true)}
                                  className="w-full px-4 py-2.5 rounded-full text-[13px] font-semibold text-white cursor-pointer transition-all duration-200 hover:opacity-90"
                                  style={{
                                    background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                                    boxShadow: "0 4px 14px rgba(124,92,252,0.3)",
                                  }}
                                >
                                  Schedule Meeting
                                </button>
                              </div>
                            ) : (
                              <span className="text-[14px] text-text-muted">Window opens after #{inv.position - 1}</span>
                            )}
                          </div>
                        </div>

                        {/* Connecting line between items */}
                        {i < arr.length - 1 && (
                          <div className="flex items-center pl-[15px]">
                            <div className="w-[2px] h-[16px]" style={{ background: "rgba(0,0,0,0.06)" }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Info box */}
                  <div className="mt-4 rounded-xl p-3" style={{ background: "rgba(74,108,247,0.03)" }}>
                    <p className="text-[13px] leading-[1.6]" style={{ color: "#475569" }}>You only meet one investor at a time. When each 72-hour window closes, the next investor moves up. Take your time with each conversation.</p>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Profile Strength - mobile only (appears after queue on mobile) */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25, ease }} className="md:hidden">
                <GlassCard className="p-4">
                  <ProfileStrengthContent />
                </GlassCard>
              </motion.div>

              {/* Upcoming Calls */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.28, ease }}>
                <GlassCard className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4 md:mb-5">
                    <h3 className="text-[18px] font-semibold text-text-primary">Upcoming Calls</h3>
                    <Link href="/matches/founder" className="text-accent-violet text-[14px] hover:underline">View All</Link>
                  </div>
                  {[
                    { initials: "PS", color: "#059669", name: "Priya Sharma", firm: "Lightspeed", time: "Mar 12, 2:00 PM", relative: "In 3 days" },
                    { initials: "DK", color: "#4A6CF7", name: "David Kim", firm: "a16z", time: "Mar 14, 10:30 AM", relative: "In 5 days" },
                  ].map((call, i, arr) => (
                    <div key={call.name} className={`flex items-center gap-3 py-3 min-h-[44px] ${i < arr.length - 1 ? "border-b border-black/[0.04]" : ""}`}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" style={{ backgroundColor: call.color }}>{call.initials}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-semibold text-text-primary">{call.name}</p>
                        <p className="text-[13px] text-text-muted">{call.firm}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[13px] px-3 py-1 rounded-full text-text-primary" style={{ background: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.5)" }}>{call.time}</span>
                        <p className="text-[12px] text-text-muted mt-1">{call.relative}</p>
                      </div>
                    </div>
                  ))}
                </GlassCard>
              </motion.div>

              {/* Deck Activity */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.36, ease }}>
                <GlassCard className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4 md:mb-5">
                    <h3 className="text-[18px] font-semibold text-text-primary">Deck Activity</h3>
                    <Link href="/dashboard/founder/analytics" className="text-accent-violet text-[14px] hover:underline">Full Analytics</Link>
                  </div>
                  <DeckChart />
                  <p className="text-[12px] text-text-muted mt-3 mb-5">Last 14 days</p>
                  <p className="text-[13px] text-text-muted uppercase tracking-[1px] mb-3">Recent Viewers</p>
                  {[
                    { initials: "SC", color: "#4A6CF7", name: "Sarah Chen", firm: "Gradient Ventures", time: "2h ago" },
                    { initials: "MW", color: "#7C5CFC", name: "Marcus Webb", firm: "Founder Collective", time: "Yesterday" },
                    { initials: "ER", color: "#D97706", name: "Elena Rodriguez", firm: "Precursor", time: "3 days ago" },
                  ].map((v) => (
                    <div key={v.name} className="flex items-center gap-2.5 py-2 min-h-[44px]">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-semibold shrink-0" style={{ backgroundColor: v.color }}>{v.initials}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-text-primary">{v.name}</p>
                        <p className="text-[12px] text-text-muted">{v.firm}</p>
                      </div>
                      <span className="text-[12px] text-text-muted shrink-0">{v.time}</span>
                    </div>
                  ))}
                </GlassCard>
              </motion.div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-4 md:gap-5">
              {/* Profile Strength - desktop only (on mobile it renders after queue above) */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35, ease }} className="hidden md:block">
                <GlassCard className="p-4 md:p-6">
                  <ProfileStrengthContent />
                </GlassCard>
              </motion.div>

              {/* Quick Actions */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.43, ease }}>
                <GlassCard className="p-4 md:p-5">
                  <h3 className="text-[16px] font-semibold text-text-primary mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Update Your Metrics", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>, highlight: false, href: "/settings/founder" },
                      { label: "Edit Your Profile", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>, highlight: false, href: "/settings/founder" },
                      { label: "Record Video Pitch", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>, highlight: true, href: "/settings/founder" },
                      { label: "Preview Your Public Profile", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>, highlight: false, href: "/startup/1" },
                    ].map((action) => (
                      <Link key={action.label} href={action.href} className={`flex items-center gap-3 p-4 min-h-[48px] rounded-xl transition-all duration-200 hover:-translate-y-0.5 ${action.highlight ? "bg-accent-violet/[0.06]" : ""}`} style={{ background: action.highlight ? undefined : "rgba(255,255,255,0.25)", border: `1px solid ${action.highlight ? "rgba(124,92,252,0.15)" : "rgba(255,255,255,0.3)"}` }}>
                        {action.icon}
                        <span className="text-[15px] font-semibold text-text-primary flex-1">{action.label}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </Link>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Match Insights */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.51, ease }}>
                <GlassCard className="p-4 md:p-6">
                  <h3 className="text-[16px] font-semibold text-text-primary mb-4">Match Insights</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[14px] mb-1.5">
                        <span className="text-text-secondary">Avg Investor Match Score</span>
                        <span className="font-semibold text-text-primary">87%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-black/[0.04] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: "87%", background: "linear-gradient(135deg, #7C5CFC, #4A6CF7)" }} />
                      </div>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-text-secondary">Most Interest From</span>
                      <span className="text-accent-violet font-medium">AI/SaaS Investors</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-text-secondary">Peak View Time</span>
                      <span className="text-text-muted">Tuesdays at 9am</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scheduling Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.3)" }}
              onClick={handleCloseModal}
            />

            {/* Desktop Modal (centered card) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease }}
              className="hidden md:block fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px]"
            >
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(40px)",
                  WebkitBackdropFilter: "blur(40px)",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                {!proposalSent ? (
                  <>
                    <h2 className="text-[20px] font-semibold text-text-primary mb-1" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Schedule Your Chemistry Call</h2>
                    <p className="text-[15px] text-text-muted mb-5">With Sarah Chen</p>

                    <p className="text-[14px] font-semibold text-text-primary mb-3">Propose 3 times:</p>

                    <div className="flex flex-col gap-3">
                      {slots.map((slot, idx) => (
                        <div key={idx} className="flex gap-3">
                          <input
                            type="date"
                            value={slot.date}
                            onChange={(e) => handleSlotChange(idx, "date", e.target.value)}
                            className="flex-1 px-3 py-2.5 rounded-xl text-[14px] text-text-primary outline-none transition-colors"
                            style={{
                              background: "rgba(255,255,255,0.6)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(0,0,0,0.08)",
                            }}
                          />
                          <select
                            value={slot.time}
                            onChange={(e) => handleSlotChange(idx, "time", e.target.value)}
                            className="flex-1 px-3 py-2.5 rounded-xl text-[14px] text-text-primary outline-none transition-colors appearance-none cursor-pointer"
                            style={{
                              background: "rgba(255,255,255,0.6)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(0,0,0,0.08)",
                            }}
                          >
                            {timeSlotOptions.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleSendProposal}
                      className="w-full mt-5 px-4 py-3 rounded-full text-[15px] font-semibold text-white cursor-pointer transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                      style={{
                        background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                        boxShadow: "0 4px 14px rgba(124,92,252,0.3)",
                      }}
                    >
                      Send Proposal &rarr;
                    </button>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: "#4A6CF7" }} />
                      <p className="text-[18px] font-semibold text-text-primary">Waiting for Sarah Chen to respond...</p>
                    </div>
                    <p className="text-[14px] text-text-muted">Proposed 3 times. Waiting for response.</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Mobile Modal (bottom sheet) */}
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.3, ease }}
              className="md:hidden fixed z-50 bottom-0 left-0 right-0"
            >
              <div
                className="rounded-t-3xl p-5 pb-8"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(40px)",
                  WebkitBackdropFilter: "blur(40px)",
                  boxShadow: "0 -8px 40px rgba(0,0,0,0.1)",
                }}
              >
                {/* Drag handle */}
                <div className="w-10 h-1 rounded-full bg-black/10 mx-auto mb-5" />

                {!proposalSent ? (
                  <>
                    <h2 className="text-[20px] font-semibold text-text-primary mb-1" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Schedule Your Chemistry Call</h2>
                    <p className="text-[15px] text-text-muted mb-5">With Sarah Chen</p>

                    <p className="text-[14px] font-semibold text-text-primary mb-3">Propose 3 times:</p>

                    <div className="flex flex-col gap-3">
                      {slots.map((slot, idx) => (
                        <div key={idx} className="flex gap-3">
                          <input
                            type="date"
                            value={slot.date}
                            onChange={(e) => handleSlotChange(idx, "date", e.target.value)}
                            className="flex-1 px-3 py-2.5 rounded-xl text-[14px] text-text-primary outline-none"
                            style={{
                              background: "rgba(255,255,255,0.6)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(0,0,0,0.08)",
                            }}
                          />
                          <select
                            value={slot.time}
                            onChange={(e) => handleSlotChange(idx, "time", e.target.value)}
                            className="flex-1 px-3 py-2.5 rounded-xl text-[14px] text-text-primary outline-none appearance-none cursor-pointer"
                            style={{
                              background: "rgba(255,255,255,0.6)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(0,0,0,0.08)",
                            }}
                          >
                            {timeSlotOptions.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleSendProposal}
                      className="w-full mt-5 px-4 py-3 rounded-full text-[15px] font-semibold text-white cursor-pointer transition-all duration-200 hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                        boxShadow: "0 4px 14px rgba(124,92,252,0.3)",
                      }}
                    >
                      Send Proposal &rarr;
                    </button>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: "#4A6CF7" }} />
                      <p className="text-[18px] font-semibold text-text-primary">Waiting for Sarah Chen to respond...</p>
                    </div>
                    <p className="text-[14px] text-text-muted">Proposed 3 times. Waiting for response.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
