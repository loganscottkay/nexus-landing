"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ---- Tiny SVG Icons for tab bars and UI elements ---- */
function BriefcaseIcon() {
  return (
    <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  );
}

function ClockIcon({ color = "#0F172A" }: { color?: string }) {
  return (
    <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/* ---- Tab Bar Icons ---- */
function HomeTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={active ? color : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    </svg>
  );
}

function DashTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={active ? color : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" fill={active ? color : "none"} />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function DropsTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={active ? color : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  );
}

function SavedTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={active ? color : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  );
}

function CalendarTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={active ? color : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function UserTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={active ? color : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/* ---- Trend Pill ---- */
function TrendPill({ value }: { value: string }) {
  return (
    <span style={{
      fontSize: "4px",
      color: "#16A34A",
      background: "rgba(22,163,74,0.1)",
      borderRadius: "3px",
      padding: "1px 3px",
      fontWeight: 600,
      fontFamily: "var(--font-dm-sans), sans-serif",
      display: "inline-block",
      marginTop: "1px",
    }}>
      {value}
    </span>
  );
}

/* ---- Mini Dashboard Content (Investor) ---- */
function InvestorScreen() {
  const font = "var(--font-dm-sans), sans-serif";
  return (
    <div className="w-full h-full bg-white relative" style={{
      fontSize: "0",
      boxShadow: "inset 0 2px 10px rgba(0,0,0,0.03), inset 0 -2px 10px rgba(0,0,0,0.03)",
    }}>
      {/* Top area */}
      <div style={{ padding: "10px 10px 4px" }}>
        <div style={{ fontSize: "9px", fontWeight: 600, color: "#0F172A", fontFamily: font }}>
          Good afternoon, Jordan
        </div>
        <div style={{ fontSize: "7px", color: "#64748B", marginTop: "2px", fontFamily: font }}>
          Friday, March 13
        </div>
      </div>

      {/* Glassmorphic info bar */}
      <div style={{
        margin: "4px 10px",
        padding: "4px 8px",
        borderRadius: "6px",
        background: "rgba(74,108,247,0.06)",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}>
        <BriefcaseIcon />
        <span style={{ fontSize: "6px", color: "#0D9488", fontWeight: 600, fontFamily: font }}>Investor View</span>
        <span style={{ fontSize: "6px", color: "#CBD5E1" }}>|</span>
        <span style={{ fontSize: "6px", color: "#64748B", fontFamily: font }}>AI/ML, Fintech, SaaS</span>
      </div>

      {/* Stats card */}
      <div style={{
        margin: "6px 10px",
        padding: "8px",
        borderRadius: "8px",
        background: "rgba(74,108,247,0.04)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 4px", textAlign: "center" }}>
          {[
            { num: "14", label: "STARTUPS IN FEED", trend: "+3" },
            { num: "5", label: "INTERESTS SENT", trend: "+2" },
            { num: "3", label: "MATCHES", trend: "+1" },
            { num: "2", label: "CALLS SCHEDULED", trend: "New" },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", fontFamily: font, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "5px", color: "#64748B", fontFamily: font, textTransform: "uppercase", letterSpacing: "0.3px", marginTop: "2px" }}>{s.label}</div>
              <TrendPill value={s.trend} />
            </div>
          ))}
        </div>

        {/* Engagement score */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", paddingTop: "6px", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
          <div style={{
            width: "16px", height: "16px", borderRadius: "50%",
            background: "conic-gradient(#4A6CF7 0% 94%, #E2E8F0 94% 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <div style={{
              width: "11px", height: "11px", borderRadius: "50%", background: "rgba(74,108,247,0.04)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "6px", fontWeight: 700, color: "#4A6CF7", fontFamily: font,
            }}>94</div>
          </div>
          <span style={{ fontSize: "5px", color: "#64748B", fontFamily: font }}>Engagement Score</span>
        </div>
      </div>

      {/* Feed section */}
      <div style={{ padding: "4px 10px 2px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
          <span style={{ fontSize: "7px", fontWeight: 600, color: "#0F172A", fontFamily: font }}>New in Your Feed</span>
          <span style={{
            fontSize: "4px", color: "#fff", background: "#4A6CF7",
            borderRadius: "3px", padding: "1px 3px", fontWeight: 600, fontFamily: font,
          }}>New</span>
        </div>
        {[
          { initials: "NB", name: "NovaBridge", desc: "AI tutoring for underserved...", sector: "EdTech", color: "#4A6CF7" },
          { initials: "PW", name: "Patchwork", desc: "Connecting local artisans...", sector: "Marketplace", color: "#22C55E" },
          { initials: "SF", name: "SignalFi", desc: "Real-time fraud detection...", sector: "Fintech", color: "#0D9488" },
        ].map((c) => (
          <div key={c.name} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%", background: c.color, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "3px", fontWeight: 700, color: "#fff", fontFamily: font,
            }}>{c.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "6px", color: "#0F172A", fontFamily: font, fontWeight: 600 }}>{c.name}</div>
              <div style={{ fontSize: "5px", color: "#94A3B8", fontFamily: font, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.desc}</div>
            </div>
            <span style={{
              fontSize: "5px", color: c.color, background: `${c.color}15`,
              borderRadius: "3px", padding: "1px 3px", fontFamily: font, fontWeight: 500, flexShrink: 0,
            }}>{c.sector}</span>
          </div>
        ))}
      </div>

      {/* Queue section */}
      <div style={{ padding: "4px 10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "4px" }}>
          <ClockIcon />
          <span style={{ fontSize: "7px", fontWeight: 600, color: "#0F172A", fontFamily: font }}>Your Meeting Queue</span>
        </div>
        {[
          { pos: "1", name: "Luminary AI", status: "ACTIVE", statusColor: "#16A34A", time: "47h", timeColor: "#4A6CF7", posBg: "linear-gradient(135deg, #4A6CF7, #7C5CFC)", posColor: "#fff", avatar: "#4A6CF7" },
          { pos: "2", name: "Terraform Health", status: "Next up", statusColor: "#94A3B8", time: "", timeColor: "", posBg: "#E2E8F0", posColor: "#64748B", avatar: "#7C5CFC" },
        ].map((q) => (
          <div key={q.pos} style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "3px" }}>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: q.posBg, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "4px", fontWeight: 700, color: q.posColor, fontFamily: font,
            }}>{q.pos}</div>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: q.avatar, flexShrink: 0, opacity: 0.7,
            }} />
            <span style={{ fontSize: "6px", color: "#0F172A", fontFamily: font, fontWeight: 600, flex: 1 }}>{q.name}</span>
            {q.status === "ACTIVE" ? (
              <span style={{
                fontSize: "4px", color: "#fff", background: q.statusColor,
                borderRadius: "3px", padding: "1px 3px", fontWeight: 600, fontFamily: font,
              }}>ACTIVE</span>
            ) : (
              <span style={{ fontSize: "5px", color: q.statusColor, fontFamily: font }}>{q.status}</span>
            )}
            {q.time && (
              <span style={{ fontSize: "6px", color: q.timeColor, fontFamily: font, fontWeight: 600 }}>{q.time}</span>
            )}
          </div>
        ))}
      </div>

      {/* Bottom tab bar */}
      <div style={{
        position: "absolute", bottom: "16px", left: 0, right: 0,
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "5px 12px 2px",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        background: "rgba(255,255,255,0.95)",
      }}>
        {[
          { icon: <HomeTabIcon color="#4A6CF7" />, label: "Home" },
          { icon: <DashTabIcon active color="#4A6CF7" />, label: "Dashboard" },
          { icon: <DropsTabIcon color="#4A6CF7" />, label: "Drops" },
          { icon: <SavedTabIcon color="#4A6CF7" />, label: "Saved" },
          { icon: <CalendarTabIcon color="#4A6CF7" />, label: "Schedule" },
        ].map((tab, i) => (
          <div key={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
            {tab.icon}
            <span style={{
              fontSize: "4px", fontFamily: font,
              color: i === 1 ? "#4A6CF7" : "#94A3B8",
              fontWeight: i === 1 ? 600 : 400,
            }}>{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Mini Dashboard Content (Founder) ---- */
function FounderScreen() {
  const font = "var(--font-dm-sans), sans-serif";
  return (
    <div className="w-full h-full bg-white relative" style={{
      fontSize: "0",
      boxShadow: "inset 0 2px 10px rgba(0,0,0,0.03), inset 0 -2px 10px rgba(0,0,0,0.03)",
    }}>
      {/* Top area */}
      <div style={{ padding: "10px 10px 4px" }}>
        <div style={{ fontSize: "9px", fontWeight: 600, color: "#0F172A", fontFamily: font }}>
          Good afternoon, Alex
        </div>
        <div style={{ fontSize: "7px", color: "#64748B", marginTop: "2px", fontFamily: font }}>
          Friday, March 13
        </div>
      </div>

      {/* Stats card */}
      <div style={{
        margin: "6px 10px",
        padding: "8px",
        borderRadius: "8px",
        background: "rgba(124,92,252,0.04)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 4px", textAlign: "center" }}>
          {[
            { num: "47", label: "PITCH VIEWS", trend: "+12" },
            { num: "8", label: "INTERESTED", trend: "+3" },
            { num: "2", label: "CALLS DONE", trend: "+1" },
            { num: "12", label: "DECK VIEWS", trend: "+5" },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", fontFamily: font, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "5px", color: "#64748B", fontFamily: font, textTransform: "uppercase", letterSpacing: "0.3px", marginTop: "2px" }}>{s.label}</div>
              <TrendPill value={s.trend} />
            </div>
          ))}
        </div>

        {/* Profile strength */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", paddingTop: "6px", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
          <div style={{
            width: "16px", height: "16px", borderRadius: "50%",
            background: "conic-gradient(#7C5CFC 0% 78%, #E2E8F0 78% 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <div style={{
              width: "11px", height: "11px", borderRadius: "50%", background: "rgba(124,92,252,0.04)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "5px", fontWeight: 700, color: "#7C5CFC", fontFamily: font,
            }}>78%</div>
          </div>
          <span style={{ fontSize: "5px", color: "#64748B", fontFamily: font }}>Profile Strength</span>
        </div>
      </div>

      {/* Queue section */}
      <div style={{ padding: "4px 10px 2px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "2px" }}>
          <ClockIcon color="#0F172A" />
          <span style={{ fontSize: "7px", fontWeight: 600, color: "#0F172A", fontFamily: font }}>Investor Queue</span>
        </div>
        <div style={{ fontSize: "5px", color: "#94A3B8", fontFamily: font, fontStyle: "italic", marginBottom: "4px" }}>
          One at a time. 72h windows.
        </div>
        {[
          { pos: "1", name: "Sarah Chen", firm: "Gradient Ventures", status: "ACTIVE", statusColor: "#16A34A", time: "47h left", timeColor: "#4A6CF7", posBg: "linear-gradient(135deg, #7C5CFC, #4A6CF7)", posColor: "#fff", avatar: "#E879F9" },
          { pos: "2", name: "Marcus Webb", firm: "Founder Collective", status: "Next", statusColor: "#94A3B8", time: "", timeColor: "", posBg: "#E2E8F0", posColor: "#64748B", avatar: "#4A6CF7" },
          { pos: "3", name: "Elena Rodriguez", firm: "Precursor", status: "Waiting", statusColor: "#94A3B8", time: "", timeColor: "", posBg: "#E2E8F0", posColor: "#64748B", avatar: "#F59E0B" },
          { pos: "4", name: "James Park", firm: "Lux Capital", status: "Waiting", statusColor: "#94A3B8", time: "", timeColor: "", posBg: "#E2E8F0", posColor: "#64748B", avatar: "#22C55E" },
        ].map((q) => (
          <div key={q.pos} style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "3px" }}>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: q.posBg, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "4px", fontWeight: 700, color: q.posColor, fontFamily: font,
            }}>{q.pos}</div>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: q.avatar, flexShrink: 0, opacity: 0.7,
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "6px", color: "#0F172A", fontFamily: font, fontWeight: 600 }}>{q.name}</div>
              <div style={{ fontSize: "5px", color: "#94A3B8", fontFamily: font }}>{q.firm}</div>
            </div>
            {q.status === "ACTIVE" ? (
              <>
                <span style={{
                  fontSize: "4px", color: "#fff", background: q.statusColor,
                  borderRadius: "3px", padding: "1px 3px", fontWeight: 600, fontFamily: font,
                }}>ACTIVE</span>
                <span style={{ fontSize: "5px", color: q.timeColor, fontFamily: font, fontWeight: 600 }}>{q.time}</span>
              </>
            ) : (
              <span style={{ fontSize: "5px", color: q.statusColor, fontFamily: font }}>{q.status}</span>
            )}
          </div>
        ))}
      </div>

      {/* Schedule button */}
      <div style={{ padding: "6px 10px 2px" }}>
        <div style={{
          background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
          borderRadius: "9999px",
          padding: "4px 8px",
          textAlign: "center",
        }}>
          <span style={{ fontSize: "6px", color: "#fff", fontWeight: 600, fontFamily: font }}>
            Schedule Meeting with Sarah →
          </span>
        </div>
      </div>

      {/* Upcoming section */}
      <div style={{ padding: "6px 10px", textAlign: "center" }}>
        <div style={{ fontSize: "6px", color: "#94A3B8", fontFamily: font, fontStyle: "italic" }}>
          No upcoming calls yet
        </div>
        <div style={{ fontSize: "5px", color: "#7C5CFC", fontFamily: font, marginTop: "2px" }}>
          Schedule your first meeting
        </div>
      </div>

      {/* Bottom tab bar */}
      <div style={{
        position: "absolute", bottom: "16px", left: 0, right: 0,
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "5px 12px 2px",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        background: "rgba(255,255,255,0.95)",
      }}>
        {[
          { icon: <HomeTabIcon color="#7C5CFC" />, label: "Home" },
          { icon: <DashTabIcon active color="#7C5CFC" />, label: "Dashboard" },
          { icon: <SavedTabIcon color="#7C5CFC" />, label: "Interests" },
          { icon: <CalendarTabIcon color="#7C5CFC" />, label: "Schedule" },
          { icon: <UserTabIcon color="#7C5CFC" />, label: "Profile" },
        ].map((tab, i) => (
          <div key={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
            {tab.icon}
            <span style={{
              fontSize: "4px", fontFamily: font,
              color: i === 1 ? "#7C5CFC" : "#94A3B8",
              fontWeight: i === 1 ? 600 : 400,
            }}>{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Sparkle Particles ---- */
function SparkleParticles() {
  const particles = [
    { color: "#FFD700", delay: "0s", duration: "5s", left: "30%" },
    { color: "#4A6CF7", delay: "1.2s", duration: "6s", left: "45%" },
    { color: "#7C5CFC", delay: "0.5s", duration: "5.5s", left: "55%" },
    { color: "#FFD700", delay: "2s", duration: "6.5s", left: "65%" },
    { color: "#4A6CF7", delay: "3s", duration: "5s", left: "50%" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: 1 }}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="sparkle-particle"
          style={{
            position: "absolute",
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            background: p.color,
            left: p.left,
            bottom: "20%",
            opacity: 0,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

/* ---- iPhone Frame ---- */
function IPhoneFrame({
  children,
  href,
  label,
  subtitle,
  index,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
  subtitle: string;
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const entranceDelay = index * 0.15;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <Link
        href={href}
        className="block cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? `translateY(0) translateX(0)`
            : `translateY(60px) translateX(${index === 0 ? "-30px" : "30px"})`,
          transition: `opacity 0.8s ease-out ${entranceDelay}s, transform 0.8s ease-out ${entranceDelay}s`,
        }}
      >
        {/* Phone container with float + hover */}
        <div
          className="iphone-float"
          style={{
            animationDelay: index === 1 ? "2s" : "0s",
            transform: hovered ? "translateY(-8px)" : "translateY(0)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease",
            filter: hovered ? "brightness(1.05)" : "brightness(1)",
            position: "relative",
          }}
        >
          {/* Outer phone frame */}
          <div
            className="iphone-frame-outer"
            style={{
              width: "var(--phone-width)",
              height: "var(--phone-height)",
              borderRadius: "44px",
              background: "#1A1A1A",
              padding: "8px",
              position: "relative",
              boxShadow: hovered
                ? "0 40px 100px rgba(0,0,0,0.2)"
                : "0 30px 80px rgba(0,0,0,0.15)",
            }}
          >
            {/* Reflective highlight on top-left edge */}
            <div style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              right: "60%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              borderRadius: "44px",
              zIndex: 5,
              pointerEvents: "none",
            }} />

            {/* Side buttons - left (volume) */}
            <div style={{ position: "absolute", left: "-3px", top: "120px", width: "3px", height: "24px", background: "#2A2A2A", borderRadius: "2px 0 0 2px" }} />
            <div style={{ position: "absolute", left: "-3px", top: "155px", width: "3px", height: "30px", background: "#2A2A2A", borderRadius: "2px 0 0 2px" }} />
            <div style={{ position: "absolute", left: "-3px", top: "195px", width: "3px", height: "30px", background: "#2A2A2A", borderRadius: "2px 0 0 2px" }} />
            {/* Side button - right (power) */}
            <div style={{ position: "absolute", right: "-3px", top: "160px", width: "3px", height: "40px", background: "#2A2A2A", borderRadius: "0 2px 2px 0" }} />

            {/* Screen area */}
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "36px",
                overflow: "hidden",
                position: "relative",
                background: "#fff",
              }}
            >
              {/* Dynamic Island */}
              <div style={{
                position: "absolute",
                top: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "22px",
                borderRadius: "9999px",
                background: "#000",
                zIndex: 10,
              }}>
                {/* Camera dot */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "18px",
                  transform: "translateY(-50%)",
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  background: "#2A2A2A",
                }} />
              </div>

              {/* Screen content area (below dynamic island) */}
              <div style={{ paddingTop: "40px", height: "100%", overflow: "hidden" }}>
                {children}
              </div>

              {/* Home indicator */}
              <div style={{
                position: "absolute",
                bottom: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100px",
                height: "4px",
                borderRadius: "9999px",
                background: "rgba(0,0,0,0.2)",
                zIndex: 10,
              }} />
            </div>
          </div>
        </div>
      </Link>

      {/* Label below phone */}
      <div
        className="text-center mt-5"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 0.8s ease-out ${entranceDelay + 0.2}s`,
        }}
      >
        <div
          className="font-semibold"
          style={{
            fontSize: "var(--label-size)",
            color: "#0F172A",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "var(--sublabel-size)",
            color: "#64748B",
            fontFamily: "var(--font-dm-sans), sans-serif",
            marginTop: "4px",
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}

/* ---- Main Component ---- */
export default function IPhoneMockups() {
  return (
    <section
      className="relative z-10 iphone-section"
      style={{
        paddingTop: "80px",
        paddingBottom: "80px",
        /* CSS custom properties for responsive sizing */
        ["--phone-width" as string]: "300px",
        ["--phone-height" as string]: "612px",
        ["--phone-gap" as string]: "48px",
        ["--label-size" as string]: "16px",
        ["--sublabel-size" as string]: "13px",
      }}
    >
      {/* Eyebrow */}
      <div className="text-center mb-3">
        <span
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "3px",
            fontWeight: 600,
            background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          SEE WHAT IS INSIDE
        </span>
      </div>

      {/* Title */}
      <h2
        className="text-center mb-3"
        style={{
          fontSize: "32px",
          fontFamily: "'Instrument Serif', serif",
          color: "#0F172A",
          fontWeight: 400,
        }}
      >
        A Sneak Peek at the App
      </h2>

      {/* Subtitle */}
      <p
        className="text-center mx-auto mb-12"
        style={{
          fontSize: "16px",
          color: "#64748B",
          maxWidth: "500px",
          fontFamily: "var(--font-dm-sans), sans-serif",
          lineHeight: 1.6,
          padding: "0 24px",
        }}
      >
        Explore what the experience looks like for founders and investors.
      </p>

      {/* Phones container */}
      <div
        className="iphone-phones-container relative flex items-start justify-center"
        style={{ gap: "var(--phone-gap)", flexWrap: "nowrap" }}
      >
        <SparkleParticles />

        <IPhoneFrame
          href="/dashboard/investor"
          label="Investor Dashboard"
          subtitle="Browse startups. Express interest. Get matched."
          index={0}
        >
          <InvestorScreen />
        </IPhoneFrame>

        <IPhoneFrame
          href="/dashboard/founder"
          label="Startup Dashboard"
          subtitle="Track interest. Manage your queue. Schedule calls."
          index={1}
        >
          <FounderScreen />
        </IPhoneFrame>
      </div>
    </section>
  );
}
