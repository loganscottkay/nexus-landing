"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

const ease = [0.25, 0.4, 0.25, 1] as const;

type Tab = "profile" | "account" | "notifications" | "billing" | "privacy";

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass ${className}`}>{children}</div>
  );
}

function GlassInput({ value, onChange, placeholder, prefix, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; prefix?: string; type?: string }) {
  return (
    <div className="relative">
      {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-[16px]">{prefix}</span>}
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full h-[52px] rounded-xl text-[16px] text-text-primary placeholder:text-text-muted outline-none transition-all duration-200"
        style={{ background: "rgba(255,255,255,0.3)", backdropFilter: "blur(4px)", border: "1px solid rgba(0,0,0,0.08)", paddingLeft: prefix ? "32px" : "16px", paddingRight: "16px" }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(124,92,252,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,92,252,0.1)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
      />
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className="w-11 h-6 rounded-full p-0.5 transition-all duration-200 shrink-0"
      style={{ background: checked ? "linear-gradient(135deg, #7C5CFC, #4A6CF7)" : "rgba(0,0,0,0.08)" }}>
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
  const [founderName, setFounderName] = useState("Alex Rivera");
  const [title, setTitle] = useState("CEO & Co-Founder");
  const [email, setEmail] = useState("alex@luminaryai.com");
  const [website, setWebsite] = useState("luminaryai.com");
  const [linkedIn, setLinkedIn] = useState("");

  const [mrr, setMrr] = useState("$47K");
  const [momGrowth, setMomGrowth] = useState("180%");
  const [totalUsers, setTotalUsers] = useState("2,400");
  const [nrr, setNrr] = useState("140%");

  const [oneLiner, setOneLiner] = useState("AI-powered contract analysis that helps legal teams review documents 10x faster");

  const [raising, setRaising] = useState("$2M Seed Round");
  const [checkSize, setCheckSize] = useState("$100K - $500K");

  const [selectedSectors, setSelectedSectors] = useState(["AI/ML", "SaaS", "Legal Tech", "Enterprise"]);
  const [selectedStages, setSelectedStages] = useState(["Seed"]);

  const allSectors = ["AI/ML", "SaaS", "Legal Tech", "Enterprise", "Fintech", "Dev Tools", "Health Tech", "Consumer"];
  const allStages = ["Pre-Seed", "Seed", "Series A"];

  const toggleSector = (s: string) => setSelectedSectors((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const toggleStage = (s: string) => setSelectedStages((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const teamMembers = [
    { initials: "AR", name: "Alex Rivera", role: "CEO & Co-Founder", gradient: "from-[#7C5CFC] to-[#4A6CF7]" },
    { initials: "MP", name: "Maya Patel", role: "CTO", gradient: "from-[#F59E0B] to-[#EF4444]" },
    { initials: "JL", name: "Jordan Lee", role: "Head of Product", gradient: "from-[#059669] to-[#0D9488]" },
  ];

  return (
    <div className="space-y-5">
      {/* Startup Profile Badge */}
      <div className="rounded-2xl p-5 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.35)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid transparent", backgroundClip: "padding-box", boxShadow: "0 4px 16px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(124,92,252,0.15)" }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #7C5CFC, #4A6CF7)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[2px] text-text-muted mb-0.5">Startup Profile</p>
          <div className="flex items-center gap-2">
            <p className="text-[16px] font-semibold text-text-primary">Luminary AI</p>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold text-white" style={{ background: "linear-gradient(135deg, #7C5CFC, #4A6CF7)" }}>Founder</span>
          </div>
        </div>
      </div>

      {/* Company Info */}
      <GlassCard className="p-7">
        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-[18px] font-semibold text-text-primary">Company Info</h3>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0 cursor-pointer hover:opacity-80 transition-opacity" style={{ background: "linear-gradient(135deg, #7C5CFC, #4A6CF7)" }}>LA</div>
            <p className="text-[13px] text-text-muted">Click to upload logo</p>
          </div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Company Name</p><GlassInput value={companyName} onChange={setCompanyName} /></div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Founder Name</p><GlassInput value={founderName} onChange={setFounderName} /></div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Title</p><GlassInput value={title} onChange={setTitle} /></div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Email</p><GlassInput value={email} onChange={setEmail} type="email" /></div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Website</p><GlassInput value={website} onChange={setWebsite} placeholder="yourcompany.com" /></div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">LinkedIn URL</p><GlassInput value={linkedIn} onChange={setLinkedIn} placeholder="https://linkedin.com/in/..." /></div>
        </div>
      </GlassCard>

      {/* Traction Metrics */}
      <GlassCard className="p-7">
        <h3 className="text-[18px] font-semibold text-text-primary mb-6">Traction Metrics</h3>
        <div className="space-y-4">
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Monthly Recurring Revenue</p><GlassInput value={mrr} onChange={setMrr} /></div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">MoM Growth Rate</p><GlassInput value={momGrowth} onChange={setMomGrowth} /></div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Total Users</p><GlassInput value={totalUsers} onChange={setTotalUsers} /></div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Net Revenue Retention</p><GlassInput value={nrr} onChange={setNrr} /></div>
        </div>
      </GlassCard>

      {/* Team Members */}
      <GlassCard className="p-7">
        <h3 className="text-[18px] font-semibold text-text-primary mb-6">Team Members</h3>
        <div className="space-y-3">
          {teamMembers.map((m) => (
            <div key={m.name} className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)" }}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white text-[13px] font-bold shrink-0`}>{m.initials}</div>
                <div>
                  <p className="text-[15px] font-medium text-text-primary">{m.name}</p>
                  <p className="text-[13px] text-text-muted">{m.role}</p>
                </div>
              </div>
              <a href="#" className="text-accent-blue text-[13px] hover:underline">Edit</a>
            </div>
          ))}
        </div>
        <button className="mt-4 px-5 py-2.5 rounded-xl text-[14px] font-medium text-text-secondary transition-colors hover:bg-black/[0.03]" style={{ background: "rgba(255,255,255,0.3)", border: "1px solid rgba(0,0,0,0.08)" }}>
          Add Team Member
        </button>
      </GlassCard>

      {/* Pitch Materials */}
      <GlassCard className="p-7">
        <h3 className="text-[18px] font-semibold text-text-primary mb-6">Pitch Materials</h3>
        <div className="space-y-5">
          {/* Pitch Deck */}
          <div className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(124,92,252,0.1)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              </div>
              <div>
                <p className="text-[15px] font-medium text-text-primary">Pitch Deck</p>
                <p className="text-[13px] text-text-muted">luminary-ai-deck-v3.pdf &middot; Uploaded Mar 1, 2024</p>
              </div>
            </div>
            <a href="#" className="text-accent-blue text-[13px] hover:underline">Replace</a>
          </div>

          {/* Video Pitch */}
          <div className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(245,158,11,0.1)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
              </div>
              <div>
                <p className="text-[15px] font-medium text-text-primary">Video Pitch</p>
                <p className="text-[13px] text-[#F59E0B]">Not uploaded</p>
              </div>
            </div>
            <button className="px-4 py-2 rounded-full text-[13px] font-medium text-white" style={{ background: "linear-gradient(135deg, #7C5CFC, #4A6CF7)" }}>Upload</button>
          </div>

          {/* One-liner */}
          <div>
            <p className="text-[14px] font-semibold text-text-primary mb-2">One-liner</p>
            <textarea value={oneLiner} onChange={(e) => setOneLiner(e.target.value)} className="w-full rounded-xl text-[16px] text-text-primary placeholder:text-text-muted p-4 outline-none transition-all duration-200 resize-y min-h-[100px]"
              style={{ background: "rgba(255,255,255,0.3)", border: "1px solid rgba(0,0,0,0.08)" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(124,92,252,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,92,252,0.1)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
        </div>
      </GlassCard>

      {/* Investment Preferences */}
      <GlassCard className="p-7">
        <h3 className="text-[18px] font-semibold text-text-primary mb-6">Investment Preferences</h3>
        <div className="space-y-5">
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Raising</p><GlassInput value={raising} onChange={setRaising} /></div>
          <div><p className="text-[14px] font-semibold text-text-primary mb-2">Preferred Check Size</p><GlassInput value={checkSize} onChange={setCheckSize} /></div>
          <div>
            <p className="text-[14px] font-semibold text-text-primary mb-3">Sector Tags</p>
            <div className="flex flex-wrap gap-2">
              {allSectors.map((s) => (
                <button key={s} onClick={() => toggleSector(s)}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${selectedSectors.includes(s) ? "text-white" : "text-text-secondary hover:bg-black/[0.04]"}`}
                  style={selectedSectors.includes(s) ? { background: "linear-gradient(135deg, #7C5CFC, #4A6CF7)" } : { background: "rgba(255,255,255,0.3)", border: "1px solid rgba(0,0,0,0.08)" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-text-primary mb-3">Stage</p>
            <div className="flex flex-wrap gap-2">
              {allStages.map((s) => (
                <button key={s} onClick={() => toggleStage(s)}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${selectedStages.includes(s) ? "text-white" : "text-text-secondary hover:bg-black/[0.04]"}`}
                  style={selectedStages.includes(s) ? { background: "linear-gradient(135deg, #7C5CFC, #4A6CF7)" } : { background: "rgba(255,255,255,0.3)", border: "1px solid rgba(0,0,0,0.08)" }}>
                  {s}
                </button>
              ))}
            </div>
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
            <div><p className="text-[14px] font-semibold text-text-primary">Email</p><p className="text-[14px] text-text-muted">alex@luminaryai.com</p></div>
            <a href="#" className="text-accent-blue text-[14px] hover:underline">Change</a>
          </div>
          <div className="flex items-center justify-between py-3">
            <div><p className="text-[14px] font-semibold text-text-primary">Password</p><p className="text-[14px] text-text-muted">Last changed 14 days ago</p></div>
            <a href="#" className="text-accent-blue text-[14px] hover:underline">Change Password</a>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-7">
        <h3 className="text-[18px] font-semibold text-text-primary mb-6">Connected Accounts</h3>
        {[
          { name: "Google Calendar", connected: true, detail: "alex@luminaryai.com" },
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
    deckViews: true, profileViews: true, weekly: true,
    email: true, push: true, sms: false,
  });

  const set = (key: keyof typeof notifs) => (v: boolean) => setNotifs((p) => ({ ...p, [key]: v }));

  return (
    <GlassCard className="p-7">
      <p className="text-[12px] uppercase tracking-[2px] text-text-muted mb-2">Investor Activity</p>
      <NotifRow label="New investor interest" desc="When an investor expresses interest in your startup" checked={notifs.newInterest} onChange={set("newInterest")} />
      <NotifRow label="Interest expiring soon" desc="Reminder when investor interest is about to expire" checked={notifs.expiring} onChange={set("expiring")} />
      <NotifRow label="Match confirmed" desc="When a chemistry call is scheduled with an investor" checked={notifs.matchConfirm} onChange={set("matchConfirm")} />

      <div className="my-5 h-px bg-black/[0.04]" />
      <p className="text-[12px] uppercase tracking-[2px] text-text-muted mb-2">Call Reminders</p>
      <NotifRow label="24 hours before call" desc="Reminder one day before a scheduled call" checked={notifs.day} onChange={set("day")} />
      <NotifRow label="15 minutes before call" desc="Final reminder before your call" checked={notifs.fifteen} onChange={set("fifteen")} />
      <NotifRow label="Post-call rating reminder" desc="Reminder to rate your call if you have not already" checked={notifs.postCall} onChange={set("postCall")} />

      <div className="my-5 h-px bg-black/[0.04]" />
      <p className="text-[12px] uppercase tracking-[2px] text-text-muted mb-2">Profile & Deck</p>
      <NotifRow label="New deck views" desc="When an investor views your pitch deck" checked={notifs.deckViews} onChange={set("deckViews")} />
      <NotifRow label="Profile views" desc="When an investor views your startup profile" checked={notifs.profileViews} onChange={set("profileViews")} />
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
        <p className="text-[14px] text-text-muted">Basic access to the UrgenC platform</p>
      </div>

      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.3)", border: "1px solid rgba(124,92,252,0.15)", boxShadow: "0 0 0 1px rgba(124,92,252,0.08)" }}>
        <h3 className="text-[20px] font-semibold text-text-primary mb-1">Upgrade to UrgenC Premium for Startups</h3>
        <p className="text-[28px] font-semibold text-text-primary">$149<span className="text-[14px] text-text-muted font-normal">/mo</span></p>
        <ul className="mt-4 space-y-2.5 mb-6">
          {["Featured placement in investor feeds", "Detailed deck analytics with viewer identity", "Priority call scheduling", "Profile boost (2x visibility)", "Monthly fundraising strategy report"].map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: "#7C5CFC" }} />
              <span className="text-[15px] text-text-secondary">{f}</span>
            </li>
          ))}
        </ul>
        <button className="w-full h-12 rounded-full text-white text-[16px] font-semibold transition-all duration-300 hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #7C5CFC, #4A6CF7)", boxShadow: "0 4px 15px rgba(124,92,252,0.3)" }}>
          Upgrade Now
        </button>
        <p className="text-[13px] text-text-muted text-center mt-3">14-day free trial. Cancel anytime.</p>
      </div>
    </GlassCard>
  );
}

/* ─── Privacy Tab ─── */
function PrivacyTab() {
  const [showInFeeds, setShowInFeeds] = useState(true);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showTeam, setShowTeam] = useState(true);

  return (
    <div className="space-y-5">
      <GlassCard className="p-7">
        <h3 className="text-[18px] font-semibold text-text-primary mb-5">Profile Visibility</h3>
        <NotifRow label="Show in investor feeds" desc="When off, your startup will be hidden from investor discovery feeds" checked={showInFeeds} onChange={setShowInFeeds} />
        <NotifRow label="Show traction metrics publicly" desc="When off, investors cannot see your metrics until matched" checked={showMetrics} onChange={setShowMetrics} />
        <NotifRow label="Show team profiles publicly" desc="When off, team member details are hidden from your public profile" checked={showTeam} onChange={setShowTeam} />
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
        <p className="text-[13px] text-text-muted mt-2">Blocked investors will never see your startup profile or be able to express interest.</p>
      </GlassCard>
    </div>
  );
}

/* ─── Main Page ─── */
export default function FounderSettingsPage() {
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

      <Sidebar role="founder" activeLabel="Settings" />

      <div className="flex-1 md:ml-[240px] relative z-10 pb-20 md:pb-8">
        <div className="max-w-[680px] mx-auto px-4 md:px-8 pt-8">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease }}
            className="text-[24px] md:text-[28px] font-normal text-text-primary mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>Settings</motion.h1>

          {/* Tab Bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1, ease }}
            className="relative rounded-full p-1 mb-8 overflow-x-auto flex" style={{ background: "rgba(255,255,255,0.3)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.5)" }}>
            {/* Sliding indicator */}
            <div
              className="absolute top-1 bottom-1 rounded-full pointer-events-none"
              style={{
                width: `calc(${100 / tabs.length}%)`,
                background: "linear-gradient(135deg, #7C5CFC, #4A6CF7)",
                transform: `translateX(${tabs.findIndex((t) => t.key === activeTab) * 100}%)`,
                transition: "transform 0.25s ease-out",
              }}
            />
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`relative z-10 flex-1 px-4 py-2.5 rounded-full text-[14px] font-medium transition-colors duration-200 whitespace-nowrap text-center ${activeTab === t.key ? "text-white" : "text-text-muted hover:text-text-primary"}`}>
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
