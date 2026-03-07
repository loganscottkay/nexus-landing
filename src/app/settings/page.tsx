"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

const ease = [0.25, 0.4, 0.25, 1] as const;

type Tab = "profile" | "account" | "notifications" | "billing" | "privacy";

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

function GlassInput({ value, onChange, placeholder, prefix, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; prefix?: string; type?: string }) {
  return (
    <div className="relative">
      {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-[16px]">{prefix}</span>}
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full h-[52px] rounded-xl text-[16px] text-text-primary placeholder:text-text-muted outline-none transition-all duration-200"
        style={{ background: "rgba(255,255,255,0.3)", backdropFilter: "blur(4px)", border: "1px solid rgba(0,0,0,0.08)", paddingLeft: prefix ? "32px" : "16px", paddingRight: "16px" }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(74,108,247,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74,108,247,0.1)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
      />
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className="w-11 h-6 rounded-full p-0.5 transition-all duration-200 shrink-0"
      style={{ background: checked ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)" : "rgba(0,0,0,0.08)" }}>
      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function NotifRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between py-3">
      <div className="flex-1 mr-4">
        <p className="text-[15px] text-text-primary font-medium">{label}</p>
        <p className="text-[13px] text-text-muted">{desc}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

/* ─── Profile Tab ─── */
function ProfileTab() {
  const [companyName, setCompanyName] = useState("Luminary AI");
  const [oneLiner, setOneLiner] = useState("AI-powered contract analysis for legal teams");
  const [website, setWebsite] = useState("https://luminary.ai");
  const [location, setLocation] = useState("San Francisco, CA");
  const [mrr, setMrr] = useState("45,000");
  const [users, setUsers] = useState("2,400");
  const [growth, setGrowth] = useState("180");
  const [pipeline, setPipeline] = useState("2,000,000");
  const [raiseAmount, setRaiseAmount] = useState("1,500,000");
  const [prevFunding, setPrevFunding] = useState("500,000");
  const [idealInvestor, setIdealInvestor] = useState("Investors with AI/SaaS B2B experience who can provide enterprise customer introductions. Check sizes $100K-$500K preferred.");

  return (
    <div className="space-y-5">
      {/* Company Info */}
      <GlassCard className="p-7">
        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-[18px] font-semibold text-text-primary">Company Information</h3>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-accent-blue flex items-center justify-center text-white text-2xl font-bold shrink-0 cursor-pointer hover:opacity-80 transition-opacity">LA</div>
            <p className="text-[13px] text-text-muted">Click to upload logo</p>
          </div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Company Name</p><GlassInput value={companyName} onChange={setCompanyName} /></div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">One-liner<span className="text-[12px] text-text-muted ml-2">{oneLiner.length}/80</span></p><GlassInput value={oneLiner} onChange={(v) => setOneLiner(v.slice(0, 80))} /></div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Website</p><GlassInput value={website} onChange={setWebsite} /></div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Location</p><GlassInput value={location} onChange={setLocation} /></div>
        </div>
      </GlassCard>

      {/* Metrics */}
      <GlassCard className="p-7">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[18px] font-semibold text-text-primary">Your Metrics</h3>
          <span className="text-[13px] text-text-muted">Last updated 3 days ago</span>
        </div>
        <div className="space-y-3">
          {[
            { label: "Monthly Revenue", value: mrr, onChange: setMrr, prefix: "$", trend: "+22%" },
            { label: "Active Users", value: users, onChange: setUsers, trend: "+18%" },
            { label: "MoM Growth", value: growth, onChange: setGrowth, suffix: "%" },
            { label: "Pipeline Value", value: pipeline, onChange: setPipeline, prefix: "$", trend: "+35%" },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-4 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)" }}>
              <span className="text-[15px] font-semibold text-text-primary flex-1">{m.label}</span>
              <div className="w-[140px]"><GlassInput value={m.value} onChange={m.onChange} prefix={m.prefix} /></div>
              {m.trend && <span className="text-[12px] text-[#059669] font-medium shrink-0">{m.trend}</span>}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Team */}
      <GlassCard className="p-7">
        <h3 className="text-[18px] font-semibold text-text-primary mb-6">Your Team</h3>
        <div className="space-y-3">
          {[
            { initials: "AR", color: "#4A6CF7", name: "Alex Rivera", title: "CEO & Co-Founder" },
            { initials: "JK", color: "#7C5CFC", name: "Jordan Kim", title: "CTO & Co-Founder" },
            { initials: "SO", color: "#0d9488", name: "Sam Okafor", title: "Head of Sales" },
          ].map((m) => (
            <div key={m.name} className="flex items-center gap-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.4)" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0" style={{ backgroundColor: m.color }}>{m.initials}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[16px] font-semibold text-text-primary">{m.name}</p>
                <p className="text-[14px] text-text-muted">{m.title}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Investment Preferences */}
      <GlassCard className="p-7">
        <h3 className="text-[18px] font-semibold text-text-primary mb-6">What You Are Looking For</h3>
        <div className="space-y-4">
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Target Raise Amount</p><GlassInput value={raiseAmount} onChange={setRaiseAmount} prefix="$" /></div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Previously Raised</p><GlassInput value={prevFunding} onChange={setPrevFunding} prefix="$" /></div>
          <div>
            <p className="text-[14px] font-semibold text-text-primary mb-2">Ideal Investor Description</p>
            <textarea value={idealInvestor} onChange={(e) => setIdealInvestor(e.target.value)} className="w-full rounded-xl text-[16px] text-text-primary placeholder:text-text-muted p-4 outline-none transition-all duration-200 resize-y min-h-[100px]"
              style={{ background: "rgba(255,255,255,0.3)", border: "1px solid rgba(0,0,0,0.08)" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(74,108,247,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74,108,247,0.1)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

/* ─── Account Tab ─── */
function AccountTab() {
  return (
    <div className="space-y-5">
      <GlassCard className="p-7">
        <h3 className="text-[18px] font-semibold text-text-primary mb-6">Account Details</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-black/[0.04]">
            <div><p className="text-[14px] font-semibold text-text-primary">Email</p><p className="text-[14px] text-text-muted">alex@luminary.ai</p></div>
            <a href="#" className="text-accent-blue text-[14px] hover:underline">Change</a>
          </div>
          <div className="flex items-center justify-between py-3">
            <div><p className="text-[14px] font-semibold text-text-primary">Password</p><p className="text-[14px] text-text-muted">Last changed 30 days ago</p></div>
            <a href="#" className="text-accent-blue text-[14px] hover:underline">Change Password</a>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-7">
        <h3 className="text-[18px] font-semibold text-text-primary mb-6">Connected Accounts</h3>
        {[
          { name: "Google Calendar", connected: true, detail: "alex@luminary.ai" },
          { name: "LinkedIn", connected: false, detail: "" },
        ].map((a) => (
          <div key={a.name} className="flex items-center justify-between py-3 px-4 rounded-xl mb-3" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)" }}>
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full shrink-0 ${a.connected ? "bg-[#059669]" : "bg-black/10"}`} />
              <div>
                <p className="text-[15px] font-medium text-text-primary">{a.name}</p>
                {a.connected && <p className="text-[13px] text-text-muted">Connected as {a.detail}</p>}
              </div>
            </div>
            {a.connected ? (
              <a href="#" className="text-text-muted text-[13px] hover:underline">Disconnect</a>
            ) : (
              <button className="px-4 py-2 rounded-full text-[13px] font-medium text-text-secondary" style={{ background: "rgba(255,255,255,0.3)", border: "1px solid rgba(0,0,0,0.08)" }}>Connect</button>
            )}
          </div>
        ))}
      </GlassCard>

      <div className="rounded-3xl p-7" style={{ background: "rgba(239,68,68,0.03)", border: "1px solid rgba(239,68,68,0.1)" }}>
        <h3 className="text-[18px] font-semibold text-text-primary mb-4">Danger Zone</h3>
        <button className="px-5 py-2.5 rounded-xl text-[14px] font-medium text-[#EF4444] transition-colors hover:bg-[rgba(239,68,68,0.05)]" style={{ border: "1px solid rgba(239,68,68,0.15)" }}>
          Deactivate Account
        </button>
        <p className="text-[13px] text-[#EF4444]/50 mt-3 cursor-pointer hover:underline">Delete Account Permanently</p>
      </div>
    </div>
  );
}

/* ─── Notifications Tab ─── */
function NotificationsTab() {
  const [notifs, setNotifs] = useState({
    newInterest: true, expiring: true, matchConfirm: true,
    day: true, fifteen: true, postCall: true,
    deckView: false, profileView: false, weekly: true,
    email: true, push: true, sms: false,
  });

  const set = (key: keyof typeof notifs) => (v: boolean) => setNotifs((p) => ({ ...p, [key]: v }));

  return (
    <GlassCard className="p-7">
      <p className="text-[12px] uppercase tracking-[2px] text-text-muted mb-2">Match Activity</p>
      <NotifRow label="New investor interest" desc="When an investor expresses interest in your startup" checked={notifs.newInterest} onChange={set("newInterest")} />
      <NotifRow label="Interest expiring soon" desc="Reminder when you have less than 12 hours to respond" checked={notifs.expiring} onChange={set("expiring")} />
      <NotifRow label="Match confirmed" desc="When a chemistry call is scheduled" checked={notifs.matchConfirm} onChange={set("matchConfirm")} />

      <div className="my-5 h-px bg-black/[0.04]" />
      <p className="text-[12px] uppercase tracking-[2px] text-text-muted mb-2">Call Reminders</p>
      <NotifRow label="24 hours before call" desc="Reminder one day before a scheduled call" checked={notifs.day} onChange={set("day")} />
      <NotifRow label="15 minutes before call" desc="Final reminder before your call" checked={notifs.fifteen} onChange={set("fifteen")} />
      <NotifRow label="Post-call rating reminder" desc="Reminder to rate your call if you have not already" checked={notifs.postCall} onChange={set("postCall")} />

      <div className="my-5 h-px bg-black/[0.04]" />
      <p className="text-[12px] uppercase tracking-[2px] text-text-muted mb-2">Profile & Deck</p>
      <NotifRow label="Deck viewed" desc="When an investor views your pitch deck" checked={notifs.deckView} onChange={set("deckView")} />
      <NotifRow label="Profile viewed" desc="When your profile appears in an investor daily drop" checked={notifs.profileView} onChange={set("profileView")} />
      <NotifRow label="Weekly summary" desc="Weekly email digest of your activity and metrics" checked={notifs.weekly} onChange={set("weekly")} />

      <div className="my-5 h-px bg-black/[0.04]" />
      <p className="text-[12px] uppercase tracking-[2px] text-text-muted mb-2">Communication</p>
      <NotifRow label="Email notifications" desc="Receive notifications via email" checked={notifs.email} onChange={set("email")} />
      <NotifRow label="Push notifications" desc="Browser and mobile push notifications" checked={notifs.push} onChange={set("push")} />
      <NotifRow label="SMS notifications" desc="Requires phone number" checked={notifs.sms} onChange={set("sms")} />
    </GlassCard>
  );
}

/* ─── Billing Tab ─── */
function BillingTab() {
  return (
    <GlassCard className="p-7">
      <div className="rounded-xl p-5 mb-6" style={{ background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.4)" }}>
        <p className="text-[16px] font-semibold text-text-primary mb-1">Free Plan</p>
        <p className="text-[14px] text-text-muted">Basic access to the Nexus platform</p>
      </div>

      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.3)", border: "1px solid rgba(74,108,247,0.15)", boxShadow: "0 0 0 1px rgba(124,92,252,0.08)" }}>
        <h3 className="text-[20px] font-semibold text-text-primary mb-1">Upgrade to Nexus Premium</h3>
        <p className="text-[28px] font-semibold text-text-primary">$149<span className="text-[14px] text-text-muted font-normal">/mo</span></p>
        <ul className="mt-4 space-y-2.5 mb-6">
          {["Featured placement in investor feeds", "Detailed deck analytics with viewer identity", "Priority call scheduling", "Profile boost (2x visibility)", "Monthly fundraising strategy report"].map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-accent-blue mt-1.5 shrink-0" />
              <span className="text-[15px] text-text-secondary">{f}</span>
            </li>
          ))}
        </ul>
        <button className="w-full h-12 rounded-full text-white text-[16px] font-semibold transition-all duration-300 hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)", boxShadow: "0 4px 15px rgba(74,108,247,0.3)" }}>
          Upgrade Now
        </button>
        <p className="text-[13px] text-text-muted text-center mt-3">14-day free trial. Cancel anytime.</p>
      </div>
    </GlassCard>
  );
}

/* ─── Privacy Tab ─── */
function PrivacyTab() {
  const [showInDrops, setShowInDrops] = useState(true);
  const [allowDownloads, setAllowDownloads] = useState(false);
  const [showLinkedIn, setShowLinkedIn] = useState(true);

  return (
    <div className="space-y-5">
      <GlassCard className="p-7">
        <h3 className="text-[18px] font-semibold text-text-primary mb-5">Profile Visibility</h3>
        <NotifRow label="Show my startup in daily drops" desc="When off, your profile will be hidden from all investor feeds" checked={showInDrops} onChange={setShowInDrops} />
        <NotifRow label="Allow deck downloads" desc="When off, investors can only view your deck in-browser" checked={allowDownloads} onChange={setAllowDownloads} />
        <NotifRow label="Show team LinkedIn profiles" desc="When off, LinkedIn links are hidden from your public profile" checked={showLinkedIn} onChange={setShowLinkedIn} />
      </GlassCard>

      <GlassCard className="p-7">
        <h3 className="text-[18px] font-semibold text-text-primary mb-5">Data & Privacy</h3>
        <button className="px-5 py-2.5 rounded-xl text-[14px] font-medium text-text-secondary transition-colors hover:bg-black/[0.03]" style={{ background: "rgba(255,255,255,0.3)", border: "1px solid rgba(0,0,0,0.08)" }}>
          Download My Data
        </button>
        <p className="text-[13px] text-text-muted mt-2">Download a copy of all your data including profile, metrics, and activity history.</p>
      </GlassCard>

      <GlassCard className="p-7">
        <h3 className="text-[18px] font-semibold text-text-primary mb-5">Blocked Investors</h3>
        <p className="text-[14px] text-text-muted">You have not blocked any investors.</p>
        <p className="text-[13px] text-text-muted mt-2">Blocked investors will never see your profile in their daily drops.</p>
      </GlassCard>
    </div>
  );
}

/* ─── Main Page ─── */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const tabs: { key: Tab; label: string }[] = [
    { key: "profile", label: "Profile" },
    { key: "account", label: "Account" },
    { key: "notifications", label: "Notifications" },
    { key: "billing", label: "Billing" },
    { key: "privacy", label: "Privacy" },
  ];

  const content: Record<Tab, React.ReactNode> = {
    profile: <ProfileTab />,
    account: <AccountTab />,
    notifications: <NotificationsTab />,
    billing: <BillingTab />,
    privacy: <PrivacyTab />,
  };

  return (
    <div className="min-h-screen flex bg-base text-text-primary relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 top-[5%] right-[15%]" />
        <div className="blob blob-lavender animate-blob-2 bottom-[20%] left-[8%]" />
        <div className="blob blob-peach animate-blob-3 top-[50%] right-[25%]" />
      </div>

      <Sidebar role="investor" activeLabel="Settings" />

      <div className="flex-1 md:ml-[240px] relative z-10 pb-20 md:pb-8">
        <div className="max-w-[680px] mx-auto px-4 md:px-8 pt-8">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease }}
            className="text-[24px] md:text-[28px] font-normal text-text-primary mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>Settings</motion.h1>

          {/* Tab Bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1, ease }}
            className="rounded-2xl p-1.5 mb-8 overflow-x-auto flex gap-1" style={{ background: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.5)" }}>
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 whitespace-nowrap relative ${activeTab === t.key ? "text-text-primary" : "text-text-muted hover:text-text-primary"}`}>
                {activeTab === t.key && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full" style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }} />}
                {t.label}
              </button>
            ))}
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}>
              {content[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
