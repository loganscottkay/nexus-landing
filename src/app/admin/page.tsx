"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ease = [0.25, 0.4, 0.25, 1] as const;

type Tab = "overview" | "applications" | "users" | "analytics";

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl ${className}`} style={{
      background: "rgba(255, 255, 255, 0.45)",
      backdropFilter: "blur(20px) saturate(1.2)",
      WebkitBackdropFilter: "blur(20px) saturate(1.2)",
      border: "1px solid rgba(255, 255, 255, 0.6)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
    }}>{children}</div>
  );
}

/* ─── Admin Sidebar ─── */
const adminNav = [
  { label: "Overview", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
  { label: "Applications", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" /></svg>, badge: 12 },
  { label: "Users", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg> },
  { label: "Analytics", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg> },
  { label: "Settings", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg> },
];

/* ─── Application Review Card ─── */
function AppCard({ app, onAction }: { app: typeof applications[0]; onAction: (id: number, action: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState("");

  const criteria = app.type === "Startup"
    ? ["Market Opportunity", "Team Strength", "Traction Quality", "Pitch Clarity", "Investor Fit"]
    : ["Investment Experience", "Thesis Clarity", "Network Value", "Platform Fit", "Verification"];

  const avg = Object.values(scores).length > 0 ? Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length : 0;

  return (
    <GlassCard className="overflow-hidden">
      {/* Collapsed row */}
      <button onClick={() => setExpanded(!expanded)} className="w-full p-5 flex items-center gap-3 text-left hover:bg-black/[0.01] transition-colors">
        <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium shrink-0 ${app.type === "Startup" ? "bg-accent-violet/10 text-accent-violet" : "bg-accent-blue/10 text-accent-blue"}`}>{app.type}</span>
        <span className="text-[16px] font-semibold text-text-primary flex-1 min-w-0 truncate">{app.name}</span>
        <span className="text-[14px] text-text-muted hidden sm:block shrink-0">{app.detail}</span>
        <span className="text-[13px] text-text-muted shrink-0">{app.time}</span>
        <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium shrink-0 ${
          app.status === "Pending" ? "bg-[rgba(217,119,6,0.08)] text-[#D97706]" :
          app.status === "In Review" ? "bg-accent-blue/10 text-accent-blue" :
          app.status === "Approved" ? "bg-[rgba(5,150,105,0.08)] text-[#059669]" :
          "bg-black/[0.05] text-text-muted"
        }`}>{app.status}</span>
        {avg > 0 && (
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0" style={{ background: avg >= 3.5 ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)" : avg >= 2.5 ? "#D97706" : "#EF4444" }}>
            {avg.toFixed(1)}
          </div>
        )}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" className={`transition-transform duration-200 shrink-0 ${expanded ? "rotate-180" : ""}`}><polyline points="6 9 12 15 18 9" /></svg>
      </button>

      {/* Expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.3, ease }} className="overflow-hidden">
            <div className="p-6 pt-0 flex flex-col md:flex-row gap-6">
              {/* Left: data */}
              <div className="flex-1 min-w-0">
                <div className="border-t border-black/[0.04] pt-5">
                  {app.type === "Startup" ? (
                    <div className="space-y-4">
                      <div><p className="text-[11px] uppercase tracking-[1px] text-text-muted mb-1">Company</p><p className="text-[15px] text-text-primary">{app.name}</p></div>
                      <div><p className="text-[11px] uppercase tracking-[1px] text-text-muted mb-1">One-liner</p><p className="text-[15px] text-text-secondary">{app.oneLiner}</p></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.25)" }}><p className="text-[20px] font-semibold text-text-primary">{app.mrr}</p><p className="text-[11px] text-text-muted">MRR</p></div>
                        <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.25)" }}><p className="text-[20px] font-semibold text-text-primary">{app.users}</p><p className="text-[11px] text-text-muted">Users</p></div>
                      </div>
                      <div><p className="text-[11px] uppercase tracking-[1px] text-text-muted mb-1">Team</p><p className="text-[15px] text-text-secondary">{app.team}</p></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div><p className="text-[11px] uppercase tracking-[1px] text-text-muted mb-1">Name</p><p className="text-[15px] text-text-primary">{app.name}</p></div>
                      <div><p className="text-[11px] uppercase tracking-[1px] text-text-muted mb-1">Firm</p><p className="text-[15px] text-text-secondary">{app.firm}</p></div>
                      <div><p className="text-[11px] uppercase tracking-[1px] text-text-muted mb-1">Thesis</p><p className="text-[15px] text-text-secondary">{app.thesis}</p></div>
                      <div><p className="text-[11px] uppercase tracking-[1px] text-text-muted mb-1">Check Size</p><p className="text-[15px] text-text-primary">{app.checkSize}</p></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: scoring */}
              <div className="w-full md:w-[280px] shrink-0">
                <div className="border-t md:border-t-0 md:border-l border-black/[0.04] pt-5 md:pt-0 md:pl-6">
                  <p className="text-[12px] uppercase tracking-[1px] text-text-muted mb-3">Scoring</p>
                  {criteria.map((c) => (
                    <div key={c} className="mb-3">
                      <p className="text-[13px] text-text-primary mb-1.5">{c}</p>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button key={n} onClick={() => setScores((p) => ({ ...p, [c]: n }))}
                            className="w-7 h-7 rounded-full text-[12px] font-bold transition-all duration-200 hover:scale-105"
                            style={{
                              background: scores[c] === n ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)" : "rgba(0,0,0,0.05)",
                              color: scores[c] === n ? "white" : "#64748B",
                              border: scores[c] === n ? "none" : "1px solid rgba(0,0,0,0.1)",
                            }}>
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {avg > 0 && (
                    <div className="mt-4 mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[24px] font-semibold text-text-primary">{avg.toFixed(1)}</span>
                        <span className="text-[14px] text-text-muted">/5</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-black/[0.04] mt-2 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(avg / 5) * 100}%`, background: avg >= 3.5 ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)" : avg >= 2.5 ? "#D97706" : "#EF4444" }} />
                      </div>
                    </div>
                  )}

                  <p className="text-[12px] uppercase tracking-[1px] text-text-muted mb-2 mt-4">Notes</p>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Internal notes..."
                    className="w-full rounded-xl text-[14px] text-text-primary placeholder:text-text-muted p-3 outline-none min-h-[80px] resize-y"
                    style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(0,0,0,0.06)" }} />

                  <div className="mt-4 space-y-2">
                    <button onClick={() => onAction(app.id, "approve")} className="w-full h-11 rounded-xl text-white text-[14px] font-semibold transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)", boxShadow: "0 4px 12px rgba(74,108,247,0.3)" }}>Approve</button>
                    <button onClick={() => onAction(app.id, "waitlist")} className="w-full h-10 rounded-xl text-[14px] font-medium text-[#D97706] transition-colors hover:bg-[rgba(217,119,6,0.05)]" style={{ border: "1px solid rgba(217,119,6,0.2)" }}>Waitlist</button>
                    <button onClick={() => onAction(app.id, "reject")} className="w-full h-10 rounded-xl text-[14px] font-medium text-[#EF4444]/70 transition-colors hover:bg-[rgba(239,68,68,0.05)]" style={{ border: "1px solid rgba(239,68,68,0.15)" }}>Reject</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

/* ─── Fake Data ─── */
const applications = [
  { id: 1, type: "Startup" as const, name: "Helix Robotics", detail: "Robotics, Seed", time: "2h ago", status: "Pending", oneLiner: "Autonomous warehouse robots for mid-market logistics", mrr: "$28K", users: "4 pilots", team: "3 founders, ex-Boston Dynamics", firm: "", thesis: "", checkSize: "" },
  { id: 2, type: "Investor" as const, name: "Rachel Foster", detail: "Sequoia, Partner", time: "5h ago", status: "Pending", oneLiner: "", mrr: "", users: "", team: "", firm: "Sequoia Capital", thesis: "Early-stage enterprise software with strong founder-market fit. Focus on AI and developer tools.", checkSize: "$500K - $2M" },
  { id: 3, type: "Startup" as const, name: "PayGrid", detail: "Fintech, Seed", time: "Yesterday", status: "In Review", oneLiner: "Payment orchestration for multi-vendor marketplaces", mrr: "$52K", users: "12 platforms", team: "2 founders, ex-Stripe", firm: "", thesis: "", checkSize: "" },
  { id: 4, type: "Investor" as const, name: "Thomas Wright", detail: "Independent Angel", time: "Yesterday", status: "Pending", oneLiner: "", mrr: "", users: "", team: "", firm: "Independent", thesis: "Angel investing in pre-seed B2B SaaS. Former CTO, 15 years enterprise experience.", checkSize: "$25K - $100K" },
  { id: 5, type: "Startup" as const, name: "CloudNine Health", detail: "Health Tech, Pre-Seed", time: "2 days ago", status: "Pending", oneLiner: "AI-powered mental health screening for employers", mrr: "$3K", users: "180 beta", team: "2 founders, clinical psychologist + ML engineer", firm: "", thesis: "", checkSize: "" },
];

const activityFeed = [
  { icon: "blue", text: "Luminary AI matched with Sarah Chen (Gradient Ventures)", time: "12 min ago" },
  { icon: "green", text: "Stackpay completed chemistry call with Marcus Webb", time: "1h ago" },
  { icon: "violet", text: "New application: Helix Robotics (Startup)", time: "2h ago" },
  { icon: "blue", text: "Priya Sharma viewed Terraform Health pitch deck", time: "3h ago" },
  { icon: "green", text: "Application approved: NeuralPath (Startup)", time: "5h ago" },
  { icon: "amber", text: "Interest expiring: Elena Rodriguez -> Luminary AI (8h left)", time: "6h ago" },
];

/* ─── Page ─── */
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [apps, setApps] = useState(applications);

  const handleAction = (id: number, action: string) => {
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status: action === "approve" ? "Approved" : action === "waitlist" ? "Waitlisted" : "Rejected" } : a));
  };

  return (
    <div className="min-h-screen flex bg-base text-text-primary relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 top-[5%] right-[15%]" style={{ opacity: 0.5 }} />
        <div className="blob blob-lavender animate-blob-2 bottom-[20%] left-[8%]" style={{ opacity: 0.5 }} />
      </div>

      {/* Admin Sidebar */}
      <motion.aside
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease }}
        className="hidden md:flex flex-col w-[220px] shrink-0 h-screen fixed left-0 top-0 z-30"
        style={{ background: "rgba(15, 23, 42, 0.95)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="px-5 pt-7 pb-6">
          <span className="text-lg font-bold tracking-[0.3em] text-white/90">URGENC</span>
          <p className="text-[11px] text-white/30 mt-0.5 tracking-wider">ADMIN</p>
        </div>
        <nav className="flex-1 px-3">
          {adminNav.map((item) => {
            const isActive = (activeTab === "overview" && item.label === "Overview") || (activeTab === "applications" && item.label === "Applications") || (activeTab === "users" && item.label === "Users") || (activeTab === "analytics" && item.label === "Analytics");
            return (
              <button key={item.label}
                onClick={() => {
                  if (item.label === "Overview") setActiveTab("overview");
                  else if (item.label === "Applications") setActiveTab("applications");
                  else if (item.label === "Users") setActiveTab("users");
                  else if (item.label === "Analytics") setActiveTab("analytics");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-[14px] transition-all duration-200 relative ${isActive ? "text-white font-medium" : "text-[#94A3B8] hover:text-white/80 hover:bg-white/[0.04]"}`}>
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent-blue rounded-full" />}
                <span className="relative">
                  {item.icon}
                  {item.badge && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#EF4444] text-white text-[9px] font-bold flex items-center justify-center">{item.badge}</span>}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="px-5 py-4 border-t border-white/[0.06]">
          <p className="text-[13px] text-[#94A3B8]">Admin: Logan Kay</p>
          <Link href="/dashboard/investor" className="text-accent-blue text-[13px] hover:underline mt-1 inline-block">Back to App</Link>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 md:ml-[220px] relative z-10 pb-8">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-8">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}>
                <h1 className="text-[24px] md:text-[28px] font-normal text-text-primary mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>Admin Dashboard</h1>

                {/* Stats */}
                <GlassCard className="p-6 md:p-8 mb-6">
                  <div className="flex flex-wrap justify-between gap-6">
                    {[
                      { val: "12", label: "Pending Apps", pill: "Needs Review", pillColor: "#D97706", pillBg: "rgba(217,119,6,0.08)" },
                      { val: "247", label: "Active Startups", pill: "+8%", pillColor: "#059669", pillBg: "rgba(5,150,105,0.08)" },
                      { val: "89", label: "Active Investors", pill: "+12%", pillColor: "#059669", pillBg: "rgba(5,150,105,0.08)" },
                      { val: "34", label: "Matches/Week", pill: "+15%", pillColor: "#059669", pillBg: "rgba(5,150,105,0.08)" },
                      { val: "28", label: "Calls Done", pill: "+22%", pillColor: "#059669", pillBg: "rgba(5,150,105,0.08)" },
                      { val: "4.3", label: "Avg Rating", pill: "flat", pillColor: "#64748B", pillBg: "rgba(100,116,139,0.08)" },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="text-[28px] md:text-[32px] font-semibold text-text-primary leading-none">{s.val}</p>
                        <p className="text-[11px] uppercase tracking-[1px] text-text-muted mt-1.5">{s.label}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ background: s.pillBg, color: s.pillColor }}>{s.pill}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <div className="grid md:grid-cols-[1fr_0.65fr] gap-5">
                  {/* App Queue */}
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-[18px] font-semibold text-text-primary">Application Queue</h3>
                      <button onClick={() => setActiveTab("applications")} className="text-accent-blue text-[14px] hover:underline">Review All</button>
                    </div>
                    {apps.slice(0, 5).map((app, i, arr) => (
                      <div key={app.id} className={`flex items-center gap-3 py-3 ${i < arr.length - 1 ? "border-b border-black/[0.04]" : ""}`}>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${app.type === "Startup" ? "bg-accent-violet/10 text-accent-violet" : "bg-accent-blue/10 text-accent-blue"}`}>{app.type}</span>
                        <span className="text-[15px] font-semibold text-text-primary flex-1 truncate">{app.name}</span>
                        <span className="text-[13px] text-text-muted shrink-0">{app.time}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${app.status === "Pending" ? "bg-[rgba(217,119,6,0.08)] text-[#D97706]" : "bg-accent-blue/10 text-accent-blue"}`}>{app.status}</span>
                      </div>
                    ))}
                  </GlassCard>

                  {/* Activity Feed */}
                  <GlassCard className="p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <h3 className="text-[18px] font-semibold text-text-primary">Live Activity</h3>
                      <div className="w-2 h-2 rounded-full bg-[#059669] animate-pulse-gentle" />
                    </div>
                    {activityFeed.map((e, i) => {
                      const colors: Record<string, string> = { blue: "#4A6CF7", green: "#059669", violet: "#7C5CFC", amber: "#D97706" };
                      return (
                        <div key={i} className="flex gap-3 py-2.5">
                          <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: colors[e.icon] }} />
                          <div>
                            <p className="text-[14px] text-text-secondary">{e.text}</p>
                            <p className="text-[12px] text-text-muted">{e.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </GlassCard>
                </div>
              </motion.div>
            )}

            {activeTab === "applications" && (
              <motion.div key="apps" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-[22px] font-semibold text-text-primary">Applications</h1>
                  <div className="flex gap-2">
                    {["All (47)", "Startups (31)", "Investors (16)"].map((f) => (
                      <span key={f} className="text-[13px] px-3 py-1.5 rounded-full cursor-pointer transition-colors hover:bg-black/[0.03]" style={{ background: f.startsWith("All") ? "rgba(255,255,255,0.4)" : "transparent", border: "1px solid rgba(0,0,0,0.06)" }}>{f}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  {apps.map((app) => (
                    <AppCard key={app.id} app={app} onAction={handleAction} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "users" && (
              <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}>
                <h1 className="text-[22px] font-semibold text-text-primary mb-6">Users</h1>
                <GlassCard className="p-6">
                  <div className="mb-5">
                    <input type="text" placeholder="Search users by name, email, or company..."
                      className="w-full h-[48px] rounded-xl text-[15px] text-text-primary placeholder:text-text-muted outline-none px-4 transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.3)", border: "1px solid rgba(0,0,0,0.08)" }} />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead><tr className="text-[12px] uppercase tracking-[1px] text-text-muted">
                        <th className="pb-3 font-medium">User</th><th className="pb-3 font-medium">Type</th><th className="pb-3 font-medium">Status</th><th className="pb-3 font-medium">Joined</th><th className="pb-3 font-medium">Last Active</th>
                      </tr></thead>
                      <tbody>
                        {[
                          { name: "Luminary AI", email: "alex@luminary.ai", type: "Startup", status: "Active", joined: "Sep 2025", active: "2h ago" },
                          { name: "Sarah Chen", email: "sarah@gradient.google", type: "Investor", status: "Active", joined: "Oct 2025", active: "1h ago" },
                          { name: "Stackpay", email: "marcus@stackpay.com", type: "Startup", status: "Active", joined: "Nov 2025", active: "5h ago" },
                          { name: "Marcus Webb", email: "marcus@foundercollective.com", type: "Investor", status: "Active", joined: "Dec 2025", active: "3 days ago" },
                          { name: "Terraform Health", email: "elena@terraform.health", type: "Startup", status: "Active", joined: "Jan 2026", active: "1d ago" },
                        ].map((u) => (
                          <tr key={u.email} className="border-t border-black/[0.04]">
                            <td className="py-3"><p className="text-[14px] font-semibold text-text-primary">{u.name}</p><p className="text-[12px] text-text-muted">{u.email}</p></td>
                            <td><span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${u.type === "Startup" ? "bg-accent-violet/10 text-accent-violet" : "bg-accent-blue/10 text-accent-blue"}`}>{u.type}</span></td>
                            <td><span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-[rgba(5,150,105,0.08)] text-[#059669]">{u.status}</span></td>
                            <td className="text-[13px] text-text-muted">{u.joined}</td>
                            <td className="text-[13px] text-text-muted">{u.active}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[13px] text-text-muted mt-4">Showing 1-5 of 336 users</p>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}>
                <h1 className="text-[22px] font-semibold text-text-primary mb-6">Analytics</h1>
                <div className="grid md:grid-cols-2 gap-5">
                  <GlassCard className="p-6">
                    <h3 className="text-[18px] font-semibold text-text-primary mb-4">Match Success Rate</h3>
                    <div className="flex items-center justify-center py-8">
                      <svg width="160" height="160" viewBox="0 0 160 160">
                        <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="16" />
                        <circle cx="80" cy="80" r="60" fill="none" stroke="url(#donutGrad)" strokeWidth="16" strokeLinecap="round" transform="rotate(-90 80 80)" strokeDasharray={`${0.42 * 377} ${377}`} />
                        <circle cx="80" cy="80" r="60" fill="none" stroke="#94A3B8" strokeWidth="16" strokeLinecap="round" transform="rotate(61 80 80)" strokeDasharray={`${0.31 * 377} ${377}`} opacity="0.3" />
                        <defs><linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4A6CF7" /><stop offset="100%" stopColor="#7C5CFC" /></linearGradient></defs>
                        <text x="80" y="76" textAnchor="middle" fill="#0F172A" fontSize="28" fontWeight="700">42%</text>
                        <text x="80" y="94" textAnchor="middle" fill="#94A3B8" fontSize="12">Success Rate</text>
                      </svg>
                    </div>
                    <div className="flex justify-center gap-6 text-[13px]">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }} />Mutual Interest</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#94A3B8]/30" />One-Sided</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-black/[0.06]" />No Follow-Up</span>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <h3 className="text-[18px] font-semibold text-text-primary mb-4">Platform Funnel</h3>
                    <div className="space-y-3 py-4">
                      {[
                        { label: "Applications Received", count: 247, pct: "100%", width: "100%" },
                        { label: "Approved", count: 156, pct: "63%", width: "63%" },
                        { label: "Profile Complete", count: 134, pct: "86%", width: "54%" },
                        { label: "First Match", count: 98, pct: "73%", width: "40%" },
                        { label: "Call Completed", count: 67, pct: "68%", width: "27%" },
                      ].map((s) => (
                        <div key={s.label}>
                          <div className="flex justify-between text-[13px] mb-1">
                            <span className="text-text-secondary">{s.label}</span>
                            <span className="text-text-primary font-medium">{s.count} <span className="text-text-muted">({s.pct})</span></span>
                          </div>
                          <div className="h-6 rounded-lg bg-black/[0.03] overflow-hidden">
                            <div className="h-full rounded-lg" style={{ width: s.width, background: "linear-gradient(135deg, rgba(74,108,247,0.15), rgba(124,92,252,0.25))" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <h3 className="text-[18px] font-semibold text-text-primary mb-4">Top Sectors</h3>
                    <div className="space-y-3">
                      {[
                        { label: "AI / ML", count: 78 },
                        { label: "SaaS", count: 52 },
                        { label: "Fintech", count: 38 },
                        { label: "Health Tech", count: 31 },
                        { label: "Climate Tech", count: 24 },
                        { label: "Developer Tools", count: 18 },
                      ].map((d) => (
                        <div key={d.label} className="flex items-center gap-3">
                          <span className="text-[13px] text-text-secondary w-[120px] shrink-0">{d.label}</span>
                          <div className="flex-1 h-2 rounded-full bg-black/[0.04] overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${(d.count / 78) * 100}%`, background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }} />
                          </div>
                          <span className="text-[13px] text-text-muted w-8 text-right shrink-0">{d.count}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <h3 className="text-[18px] font-semibold text-text-primary mb-4">Weekly Summary</h3>
                    <div className="space-y-4 py-2">
                      {[
                        { label: "New Applications", value: "47", change: "+12" },
                        { label: "Matches Created", value: "34", change: "+8" },
                        { label: "Calls Scheduled", value: "28", change: "+6" },
                        { label: "Avg Time to Match", value: "2.3 days", change: "-0.4d" },
                        { label: "Platform NPS", value: "72", change: "+5" },
                      ].map((s) => (
                        <div key={s.label} className="flex items-center justify-between">
                          <span className="text-[15px] text-text-secondary">{s.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[16px] font-semibold text-text-primary">{s.value}</span>
                            <span className="text-[12px] text-[#059669] font-medium">{s.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
