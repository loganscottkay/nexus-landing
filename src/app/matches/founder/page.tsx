"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

const ease = [0.25, 0.4, 0.25, 1] as const;

type Tab = "upcoming" | "completed" | "all";

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`glass transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(124,92,252,0.08),0_0_0_1px_rgba(124,92,252,0.06)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Upcoming Match Card ─── */
function UpcomingCard({ match }: { match: typeof upcomingMatches[0] }) {
  const [prepOpen, setPrepOpen] = useState(false);
  const [notes, setNotes] = useState("");

  return (
    <GlassCard className="p-7 md:p-8">
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ backgroundColor: match.color }}>{match.initials}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[18px] md:text-[20px] font-semibold text-text-primary">{match.name}</h3>
          <p className="text-[15px] text-text-muted">{match.firm}</p>
          <p className="text-[14px] text-text-muted mt-0.5">{match.desc}</p>
        </div>
        <span className={`text-[12px] px-3 py-1.5 rounded-full font-medium shrink-0 flex items-center gap-1.5 ${
          match.status === "Confirmed" ? "bg-[rgba(5,150,105,0.08)] text-[#059669]" :
          match.status === "Scheduling..." ? "bg-[rgba(217,119,6,0.08)] text-[#D97706]" :
          "bg-accent-violet/10 text-accent-violet"
        }`}>
          {match.status === "Confirmed" && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>}
          {match.status === "Scheduling..." && <div className="w-3 h-3 border-2 border-[#D97706] border-t-transparent rounded-full animate-spin" />}
          {match.status}
        </span>
      </div>

      {/* Call Details */}
      {match.status === "Confirmed" && match.datetime && (
        <div className="rounded-2xl p-5 mb-5" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)" }}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <div>
                <p className="text-[16px] md:text-[17px] font-semibold text-text-primary">{match.datetime}</p>
                <p className="text-[13px] text-text-muted">{match.relative}</p>
              </div>
            </div>
            <a href="#" className="text-accent-violet text-[14px] flex items-center gap-1 hover:underline shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Add to Calendar
            </a>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-1.5 text-[13px] text-text-muted">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              20 min
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-text-muted">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="23 7 16 12 23 17" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
              Video Call
            </div>
            <span className="text-[13px] px-3 py-1 rounded-full text-text-muted" style={{ background: "rgba(0,0,0,0.04)" }}>Join Call</span>
          </div>
        </div>
      )}

      {match.status === "Scheduling..." && (
        <p className="text-[14px] text-text-muted mb-5 italic">Finding a time that works for both parties. You will be notified when confirmed.</p>
      )}

      {/* Prep Section */}
      <button onClick={() => setPrepOpen(!prepOpen)} className="flex items-center gap-2 text-[15px] font-semibold text-text-primary hover:text-accent-violet transition-colors">
        Prep for this call
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${prepOpen ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence>
        {prepOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 space-y-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
              {/* Key metrics */}
              <div className="grid grid-cols-4 gap-2">
                {(match.metrics || []).map((m) => (
                  <div key={m.label} className="text-center rounded-xl py-2.5 px-2" style={{ background: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.4)" }}>
                    <p className="text-[16px] font-semibold text-text-primary">{m.value}</p>
                    <p className="text-[11px] text-text-muted">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div>
                <p className="text-[12px] text-text-muted uppercase tracking-[1px] mb-2">Your Notes</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Your private notes for this call..."
                  className="w-full rounded-xl text-[14px] text-text-primary placeholder:text-text-muted p-3 outline-none transition-all duration-200 resize-y min-h-[80px]"
                  style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(0,0,0,0.06)" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(124,92,252,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,92,252,0.1)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>

              {/* Suggested Questions */}
              <div>
                <p className="text-[12px] text-text-muted uppercase tracking-[1px] mb-2">Suggested Questions</p>
                <div className="space-y-2">
                  {["What is their typical follow-on strategy?", "How hands-on are they with portfolio companies?", "What is their decision timeline?"].map((q) => (
                    <p key={q} className="text-[14px] text-text-muted italic">{q}</p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

/* ─── Completed Match Card ─── */
function CompletedCard({ match }: { match: typeof completedMatches[0] }) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <GlassCard className="p-7 md:p-8">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ backgroundColor: match.color }}>{match.initials}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[18px] md:text-[20px] font-semibold text-text-primary">{match.name}</h3>
          <p className="text-[15px] text-text-muted">{match.firm}</p>
          <p className="text-[14px] text-text-muted mt-0.5">{match.desc}</p>
        </div>
        <span className="text-[13px] text-text-muted shrink-0">Completed {match.completedDate}</span>
      </div>

      {/* Outcome */}
      <div className="rounded-2xl p-5 mb-4" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)" }}>
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="text-[12px] text-text-muted uppercase tracking-[1px] mb-1">Your Rating</p>
            <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < match.yourRating ? "#D4AF37" : "rgba(0,0,0,0.08)"} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            ))}</div>
          </div>
          <div>
            <p className="text-[12px] text-text-muted uppercase tracking-[1px] mb-1">Their Rating</p>
            {match.theirRating ? (
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < match.theirRating! ? "#D4AF37" : "rgba(0,0,0,0.08)"} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              ))}</div>
            ) : (
              <p className="text-[14px] text-text-muted italic">Pending</p>
            )}
          </div>
          <div>
            {match.mutual ? (
              <span className="text-[13px] px-3 py-1.5 rounded-full bg-[rgba(5,150,105,0.08)] text-[#059669] font-medium flex items-center gap-1.5" style={{ boxShadow: "0 0 12px rgba(5, 150, 105, 0.15)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
                Mutual Interest
              </span>
            ) : (
              <span className="text-[13px] px-3 py-1.5 rounded-full bg-black/[0.04] text-text-muted font-medium">No Follow-Up</span>
            )}
          </div>
        </div>
      </div>

      {/* Shared Contact */}
      {match.mutual && match.contactEmail && (
        <>
          <button onClick={() => setContactOpen(!contactOpen)} className="text-accent-violet text-[14px] hover:underline flex items-center gap-1.5 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
            {contactOpen ? "Hide Contact Info" : "View Shared Contact Info"}
          </button>
          <AnimatePresence>
            {contactOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease }}
                className="overflow-hidden"
              >
                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}>
                  <p className="text-[14px] text-text-primary font-medium">{match.contactEmail}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </GlassCard>
  );
}

/* ─── Data ─── */
const upcomingMatches: { id: number; initials: string; color: string; name: string; firm: string; desc: string; status: "Confirmed" | "Scheduling..."; datetime: string | undefined; relative: string | undefined; metrics: { value: string; label: string }[] }[] = [];

const completedMatches: { id: number; initials: string; color: string; name: string; firm: string; desc: string; completedDate: string; yourRating: number; theirRating: number | null; mutual: boolean; contactEmail: string | undefined }[] = [
  {
    id: 1,
    initials: "PS",
    color: "#059669",
    name: "Priya Sharma",
    firm: "Lightspeed Venture Partners",
    desc: "Wednesday, March 5 at 2:00 PM EST",
    completedDate: "March 5",
    yourRating: 4,
    theirRating: 4,
    mutual: true,
    contactEmail: "priya.sharma@lsvp.com",
  },
  {
    id: 2,
    initials: "DK",
    color: "#4A6CF7",
    name: "David Kim",
    firm: "a16z",
    desc: "Saturday, March 8 at 10:30 AM EST",
    completedDate: "March 8",
    yourRating: 5,
    theirRating: null,
    mutual: false,
    contactEmail: undefined,
  },
];

/* ─── Page ─── */
export default function FounderMatchesPage() {
  const [tab, setTab] = useState<Tab>("upcoming");

  const tabs: { key: Tab; label: string }[] = [
    { key: "upcoming", label: "Upcoming" },
    { key: "completed", label: "Completed" },
    { key: "all", label: "All" },
  ];

  const tabIndex = tabs.findIndex((t) => t.key === tab);

  return (
    <div className="min-h-screen flex bg-base text-text-primary relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 top-[5%] right-[15%]" />
        <div className="blob blob-lavender animate-blob-2 bottom-[20%] left-[8%]" />
        <div className="blob blob-peach animate-blob-3 top-[50%] right-[25%]" />
      </div>

      <Sidebar role="founder" activeLabel="Matches" />

      <div className="flex-1 md:ml-[240px] relative z-10 pb-20 md:pb-8">
        <div className="max-w-[780px] mx-auto px-4 md:px-8 pt-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease }} className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h1 className="text-[24px] md:text-[28px] font-normal text-text-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>Your Matches</h1>

            {/* Segmented Toggle */}
            <div className="relative flex rounded-full p-1" style={{ background: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.5)", minWidth: "280px" }}>
              {/* Sliding indicator */}
              <div
                className="absolute top-1 bottom-1 rounded-full"
                style={{
                  width: `calc(${100 / tabs.length}%)`,
                  background: "linear-gradient(135deg, #7C5CFC, #4A6CF7)",
                  transform: `translateX(${tabIndex * 100}%)`,
                  transition: "transform 0.25s ease-out",
                }}
              />
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`relative z-10 flex-1 py-2 rounded-full text-[14px] font-medium text-center transition-colors duration-200 ${tab === t.key ? "text-white" : "text-[#64748B] hover:text-text-primary"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-5"
            >
              {(tab === "upcoming" || tab === "all") &&
                upcomingMatches.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease }}
                  >
                    {tab === "all" && (
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-accent-violet/8 text-accent-violet font-medium mb-2 inline-block">Upcoming</span>
                    )}
                    <UpcomingCard match={m} />
                  </motion.div>
                ))}

              {(tab === "completed" || tab === "all") &&
                completedMatches.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (tab === "all" ? upcomingMatches.length : 0) * 0.1 + i * 0.1, ease }}
                  >
                    {tab === "all" && (
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-black/[0.05] text-text-muted font-medium mb-2 inline-block">Completed</span>
                    )}
                    <CompletedCard match={m} />
                  </motion.div>
                ))}

              {tab === "upcoming" && upcomingMatches.length === 0 && (
                <div className="text-center py-20">
                  <h2 className="text-[24px] font-normal text-text-primary mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>No upcoming calls yet</h2>
                  <p className="text-text-muted text-[16px] mb-6">Once you schedule and confirm a time with an investor, it will appear here.</p>
                  <Link href="/dashboard/founder/scheduling" className="inline-block px-6 py-3 rounded-full text-white text-[15px] font-semibold" style={{ background: "linear-gradient(135deg, #7C5CFC, #4A6CF7)", boxShadow: "0 4px 15px rgba(124,92,252,0.3)" }}>Schedule Now</Link>
                </div>
              )}

              {tab === "completed" && completedMatches.length === 0 && (
                <div className="text-center py-20">
                  <h2 className="text-[24px] font-normal text-text-primary mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>No completed calls yet</h2>
                  <p className="text-text-muted text-[16px]">After your chemistry calls, they will appear here with ratings and outcomes.</p>
                </div>
              )}

              {tab === "all" && upcomingMatches.length === 0 && completedMatches.length > 0 && (
                <div className="rounded-2xl p-4 mb-5" style={{ background: "rgba(74,108,247,0.04)", border: "1px solid rgba(74,108,247,0.1)" }}>
                  <p className="text-[14px] text-text-secondary">Sarah Chen is next in your queue. <Link href="/dashboard/founder/scheduling" className="text-accent-violet hover:underline">Schedule your meeting</Link> to continue.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
