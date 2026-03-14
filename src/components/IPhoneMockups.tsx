"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

/* ---- Tiny SVG Icons ---- */
function BriefcaseIcon() {
  return (
    <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    </svg>
  );
}

function ClockIcon({ color = "rgba(255,255,255,0.3)" }: { color?: string }) {
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
    <svg width="8" height="8" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={active ? color : "rgba(255,255,255,0.2)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    </svg>
  );
}

function DashTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={active ? color : "rgba(255,255,255,0.2)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" fill={active ? color : "none"} />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function DropsTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={active ? color : "rgba(255,255,255,0.2)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  );
}

function SavedTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={active ? color : "rgba(255,255,255,0.2)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  );
}

function CalendarTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={active ? color : "rgba(255,255,255,0.2)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function UserTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={active ? color : "rgba(255,255,255,0.2)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function InterestsTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={active ? color : "rgba(255,255,255,0.2)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

/* ---- Status Bar ---- */
function StatusBar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "4px 12px 0",
      height: "16px",
    }}>
      <span style={{ fontSize: "7px", fontWeight: 600, color: "#F8FAFC", fontFamily: "var(--font-dm-sans), sans-serif" }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
        {/* Signal */}
        <svg width="10" height="7" viewBox="0 0 20 14" fill="none">
          <rect x="0" y="10" width="3" height="4" rx="0.5" fill="#F8FAFC" />
          <rect x="5" y="7" width="3" height="7" rx="0.5" fill="#F8FAFC" />
          <rect x="10" y="4" width="3" height="10" rx="0.5" fill="#F8FAFC" />
          <rect x="15" y="0" width="3" height="14" rx="0.5" fill="#F8FAFC" />
        </svg>
        {/* WiFi */}
        <svg width="9" height="7" viewBox="0 0 18 14" fill="#F8FAFC">
          <path d="M9 11a2 2 0 100 4 2 2 0 000-4zM3.5 7.5a8 8 0 0111 0" stroke="#F8FAFC" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M0.5 4.5a12 12 0 0117 0" stroke="#F8FAFC" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
        {/* Battery */}
        <svg width="14" height="7" viewBox="0 0 28 14" fill="none">
          <rect x="0.5" y="0.5" width="23" height="13" rx="2" stroke="#F8FAFC" strokeWidth="1" />
          <rect x="2" y="2" width="18" height="10" rx="1" fill="#F8FAFC" />
          <rect x="25" y="4" width="2" height="6" rx="1" fill="#F8FAFC" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

/* ---- Trend Pill ---- */
function TrendPill({ value, color = "#34D399" }: { value: string; color?: string }) {
  return (
    <span style={{
      fontSize: "4px",
      color: color,
      background: `${color}1A`,
      borderRadius: "3px",
      padding: "1px 3px",
      fontWeight: 600,
      fontFamily: "var(--font-dm-sans), sans-serif",
      display: "inline-block",
      marginTop: "1px",
    }}>
      &#9650; {value}
    </span>
  );
}

/* ---- Animated Counter Hook ---- */
function useCountUp(target: number, duration: number, shouldStart: boolean) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [shouldStart, target, duration]);

  return value;
}

/* ---- Glassmorphic card style helper ---- */
const glassCard = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "10px",
};

/* ---- Mini Dashboard Content (Investor - Dark Mode Teal) ---- */
function InvestorScreen({ isVisible }: { isVisible: boolean }) {
  const font = "var(--font-dm-sans), sans-serif";
  const [feedIndex, setFeedIndex] = useState(0);
  const [feedPhase, setFeedPhase] = useState<"visible" | "exiting" | "entering">("visible");

  const allStartups = [
    { initial: "N", name: "NovaBridge", desc: "AI-powered tutoring platform", sector: "EdTech", gradient: "linear-gradient(135deg, #164E63, #0E7490)" },
    { initial: "P", name: "Patchwork", desc: "Artisan goods marketplace", sector: "Marketplace", gradient: "linear-gradient(135deg, #1E3A5F, #2563EB)" },
    { initial: "S", name: "SignalFi", desc: "Real-time fraud detection", sector: "Fintech", gradient: "linear-gradient(135deg, #312E81, #4F46E5)" },
    { initial: "D", name: "DeepCure", desc: "Drug discovery with ML", sector: "BioTech", gradient: "linear-gradient(135deg, #0E7490, #06B6D4)" },
    { initial: "V", name: "VaultSync", desc: "Decentralized data mesh", sector: "Infra", gradient: "linear-gradient(135deg, #1E3A5F, #3B82F6)" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Start exit animation
      setFeedPhase("exiting");
      setTimeout(() => {
        setFeedIndex((prev) => (prev + 1) % allStartups.length);
        setFeedPhase("entering");
        setTimeout(() => {
          setFeedPhase("visible");
        }, 400);
      }, 550); // 400ms exit + 150ms pause
    }, 3000);
    return () => clearInterval(interval);
  }, [allStartups.length]);

  const visibleStartups = [
    allStartups[feedIndex % allStartups.length],
    allStartups[(feedIndex + 1) % allStartups.length],
    allStartups[(feedIndex + 2) % allStartups.length],
  ];

  // Count-up stats
  const stat14 = useCountUp(14, 1500, isVisible);
  const stat5 = useCountUp(5, 1500, isVisible);
  const stat3 = useCountUp(3, 1500, isVisible);
  const stat2 = useCountUp(2, 1500, isVisible);
  const statNums = [stat14, stat5, stat3, stat2];

  const getFeedItemStyle = (idx: number): React.CSSProperties => {
    const baseDelay = idx * 0.08;
    if (feedPhase === "exiting") {
      return {
        transform: "translateY(-8px)",
        opacity: 0,
        transition: `transform 0.4s ease-out ${baseDelay}s, opacity 0.4s ease-out ${baseDelay}s`,
      };
    }
    if (feedPhase === "entering") {
      return {
        transform: "translateY(0)",
        opacity: 1,
        transition: `transform 0.4s ease-out ${baseDelay}s, opacity 0.4s ease-out ${baseDelay}s`,
      };
    }
    return {
      transform: "translateY(0)",
      opacity: 1,
      transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
    };
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(180deg, #0A0E1A 0%, #0F172A 100%)",
      fontSize: 0,
    }}>
      {/* Status bar */}
      <StatusBar />

      {/* Greeting */}
      <div style={{ padding: "6px 10px 3px" }}>
        <div style={{ fontSize: "9px", fontWeight: 700, color: "#F1F5F9", fontFamily: font, letterSpacing: "-0.2px" }}>
          Good afternoon, Jordan
        </div>
        <div style={{
          marginTop: "3px",
          display: "inline-flex",
          alignItems: "center",
          gap: "3px",
          background: "rgba(6,182,212,0.15)",
          border: "1px solid rgba(6,182,212,0.2)",
          borderRadius: "9999px",
          padding: "2px 7px",
        }}>
          <BriefcaseIcon />
          <span style={{ fontSize: "5.5px", color: "#22D3EE", fontWeight: 600, fontFamily: font }}>Investor</span>
          <span style={{ fontSize: "5.5px", color: "rgba(255,255,255,0.25)" }}>&#183;</span>
          <span style={{ fontSize: "5.5px", color: "rgba(255,255,255,0.4)", fontFamily: font }}>AI/ML, Fintech</span>
        </div>
      </div>

      {/* Stats card */}
      <div style={{
        margin: "5px 10px",
        padding: "7px 8px",
        ...glassCard,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "2px", textAlign: "center" }}>
          {[
            { label: "IN FEED", trend: "+3" },
            { label: "INTERESTED", trend: "+2" },
            { label: "MATCHED", trend: "+1" },
            { label: "SCHEDULED", trend: "New" },
          ].map((s, i) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#F1F5F9", fontFamily: font, lineHeight: 1 }}>{statNums[i]}</div>
              <div style={{ fontSize: "3.5px", color: "rgba(255,255,255,0.25)", fontFamily: font, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "2px" }}>{s.label}</div>
              <TrendPill value={s.trend} />
            </div>
          ))}
        </div>

        {/* Engagement bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "5px", paddingTop: "5px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize: "4.5px", color: "rgba(255,255,255,0.4)", fontFamily: font, whiteSpace: "nowrap" }}>Engagement</span>
          <div style={{ flex: 1, height: "3px", borderRadius: "9999px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <div style={{ width: "94%", height: "100%", borderRadius: "9999px", background: "linear-gradient(90deg, #06B6D4, #22D3EE)" }} />
          </div>
          <span style={{ fontSize: "5.5px", color: "#22D3EE", fontWeight: 700, fontFamily: font }}>94/100</span>
        </div>
      </div>

      {/* Feed section */}
      <div style={{ flex: 1, padding: "3px 10px 2px", display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
          <span style={{ fontSize: "7px", fontWeight: 700, color: "#F1F5F9", fontFamily: font }}>Your Feed</span>
          <span style={{
            fontSize: "4px", color: "#22D3EE", background: "rgba(6,182,212,0.12)",
            borderRadius: "9999px", padding: "1px 5px", fontWeight: 600, fontFamily: font,
          }}>New</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2%", overflow: "hidden" }}>
          {visibleStartups.map((c, idx) => (
            <div
              key={`${feedIndex}-${c.name}`}
              className={idx === 2 ? "phone-feed-row-3" : ""}
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                padding: "2.5% 3%",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                flex: 1,
                minHeight: 0,
                ...getFeedItemStyle(idx),
              }}
            >
              <div style={{
                width: "14px", height: "14px", borderRadius: "50%", background: c.gradient, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "5.5px", fontWeight: 700, color: "#fff", fontFamily: font,
              }}>{c.initial}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "6.5px", color: "#F1F5F9", fontFamily: font, fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontSize: "5px", color: "rgba(255,255,255,0.4)", fontFamily: font, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.desc}</div>
              </div>
              <span style={{
                fontSize: "4px", color: "#22D3EE", background: "rgba(6,182,212,0.12)",
                borderRadius: "9999px", padding: "1.5px 5px", fontFamily: font, fontWeight: 600, flexShrink: 0,
              }}>{c.sector}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Queue section */}
      <div style={{ padding: "3px 10px 4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "4px" }}>
          <span style={{ fontSize: "7px", fontWeight: 700, color: "#F1F5F9", fontFamily: font }}>Meeting Queue</span>
          <ClockIcon />
        </div>
        {[
          { pos: "1", name: "Luminary AI", status: "ACTIVE", isActive: true, time: "47h", avatar: "linear-gradient(135deg, #0E7490, #06B6D4)", posBg: "linear-gradient(135deg, #06B6D4, #22D3EE)" },
          { pos: "2", name: "Terraform Health", status: "Next", isActive: false, time: "", avatar: "linear-gradient(135deg, #1E3A5F, #3B82F6)", posBg: "rgba(255,255,255,0.1)" },
        ].map((q) => (
          <div key={q.pos} className={q.isActive ? "queue-pulse-teal" : ""} style={{
            display: "flex", alignItems: "center", gap: "4px", marginBottom: "2%",
            padding: "2.5% 3%",
            background: q.isActive ? "rgba(6,182,212,0.06)" : "rgba(255,255,255,0.04)",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{
              width: "12px", height: "12px", borderRadius: "50%",
              background: q.posBg, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "5.5px", fontWeight: 700, color: q.isActive ? "#fff" : "rgba(255,255,255,0.5)", fontFamily: font,
            }}>{q.pos}</div>
            <div style={{
              width: "10px", height: "10px", borderRadius: "50%",
              background: q.avatar, flexShrink: 0,
            }} />
            <span style={{ fontSize: "6.5px", color: "#F1F5F9", fontFamily: font, fontWeight: 600, flex: 1 }}>{q.name}</span>
            {q.isActive ? (
              <>
                <span className="active-pulse" style={{
                  fontSize: "4px", color: "#22D3EE", background: "rgba(6,182,212,0.12)",
                  borderRadius: "9999px", padding: "1.5px 5px", fontWeight: 600, fontFamily: font,
                }}>ACTIVE</span>
                <span style={{ fontSize: "5.5px", color: "#22D3EE", fontFamily: font, fontWeight: 700 }}>{q.time}</span>
              </>
            ) : (
              <span style={{ fontSize: "5px", color: "rgba(255,255,255,0.35)", fontFamily: font }}>{q.status}</span>
            )}
          </div>
        ))}
      </div>

      {/* Bottom tab bar */}
      <div style={{
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "5px 12px 8px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(0,0,0,0.3)",
        flexShrink: 0,
      }}>
        {[
          { icon: <HomeTabIcon color="#22D3EE" />, label: "Home", active: false },
          { icon: <DashTabIcon active color="#22D3EE" />, label: "Dashboard", active: true },
          { icon: <DropsTabIcon color="#22D3EE" />, label: "Drops", active: false },
          { icon: <SavedTabIcon color="#22D3EE" />, label: "Saved", active: false },
          { icon: <CalendarTabIcon color="#22D3EE" />, label: "Schedule", active: false },
        ].map((tab) => (
          <div key={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
            {tab.icon}
            {tab.active && (
              <span style={{
                fontSize: "4px", fontFamily: font,
                color: "#22D3EE",
                fontWeight: 600,
              }}>{tab.label}</span>
            )}
          </div>
        ))}
      </div>

      {/* Home indicator */}
      <div style={{
        display: "flex", justifyContent: "center", paddingBottom: "4px",
        background: "rgba(0,0,0,0.3)",
        flexShrink: 0,
      }}>
        <div style={{
          width: "80px", height: "2px", borderRadius: "9999px",
          background: "rgba(255,255,255,0.2)",
        }} />
      </div>
    </div>
  );
}

/* ---- Mini Dashboard Content (Founder - Dark Mode Violet) ---- */
function FounderScreen({ isVisible }: { isVisible: boolean }) {
  const font = "var(--font-dm-sans), sans-serif";
  const [timeToggle, setTimeToggle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeToggle((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Count-up stats
  const stat47 = useCountUp(47, 1500, isVisible);
  const stat8 = useCountUp(8, 1500, isVisible);
  const stat2 = useCountUp(2, 1500, isVisible);
  const stat12 = useCountUp(12, 1500, isVisible);
  const statNums = [stat47, stat8, stat2, stat12];

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(180deg, #0A0E1A 0%, #0F172A 100%)",
      fontSize: 0,
    }}>
      {/* Status bar */}
      <StatusBar />

      {/* Greeting */}
      <div style={{ padding: "6px 10px 3px" }}>
        <div style={{ fontSize: "9px", fontWeight: 700, color: "#F1F5F9", fontFamily: font, letterSpacing: "-0.2px" }}>
          Good afternoon, Alex
        </div>
        <div style={{
          marginTop: "3px",
          display: "inline-flex",
          alignItems: "center",
          gap: "3px",
          background: "rgba(139,92,246,0.15)",
          border: "1px solid rgba(139,92,246,0.2)",
          borderRadius: "9999px",
          padding: "2px 7px",
        }}>
          <RocketIcon />
          <span style={{ fontSize: "5.5px", color: "#A78BFA", fontWeight: 600, fontFamily: font }}>Founder</span>
          <span style={{ fontSize: "5.5px", color: "rgba(255,255,255,0.25)" }}>&#183;</span>
          <span style={{ fontSize: "5.5px", color: "rgba(255,255,255,0.4)", fontFamily: font }}>Luminary AI</span>
        </div>
      </div>

      {/* Stats card */}
      <div style={{
        margin: "5px 10px",
        padding: "7px 8px",
        ...glassCard,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "2px", textAlign: "center" }}>
          {[
            { label: "VIEWS", trend: "+12" },
            { label: "INTERESTED", trend: "+3" },
            { label: "CALLS", trend: "+1" },
            { label: "DECK VIEWS", trend: "+5" },
          ].map((s, i) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#F1F5F9", fontFamily: font, lineHeight: 1 }}>{statNums[i]}</div>
              <div style={{ fontSize: "3.5px", color: "rgba(255,255,255,0.25)", fontFamily: font, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "2px" }}>{s.label}</div>
              <TrendPill value={s.trend} color="#A78BFA" />
            </div>
          ))}
        </div>

        {/* Profile strength bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "5px", paddingTop: "5px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize: "4.5px", color: "rgba(255,255,255,0.4)", fontFamily: font, whiteSpace: "nowrap" }}>Profile Strength</span>
          <div style={{ flex: 1, height: "3px", borderRadius: "9999px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <div style={{ width: "78%", height: "100%", borderRadius: "9999px", background: "linear-gradient(90deg, #8B5CF6, #A78BFA)" }} />
          </div>
          <span style={{ fontSize: "5.5px", color: "#A78BFA", fontWeight: 700, fontFamily: font }}>78%</span>
        </div>
      </div>

      {/* Queue section */}
      <div style={{ flex: 1, padding: "3px 10px 2px", display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "2px" }}>
          <span style={{ fontSize: "7px", fontWeight: 700, color: "#F1F5F9", fontFamily: font }}>Investor Queue</span>
        </div>
        <div style={{ fontSize: "4.5px", color: "rgba(255,255,255,0.35)", fontFamily: font, fontStyle: "italic", marginBottom: "4px" }}>
          One at a time &#183; 72h windows
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2%", overflow: "hidden" }}>
          {[
            { pos: "1", initials: "SC", name: "Sarah Chen", firm: "Gradient Ventures", status: "ACTIVE", isActive: true, avatarBg: "linear-gradient(135deg, #4C1D95, #7C3AED)", posBg: "linear-gradient(135deg, #8B5CF6, #A78BFA)" },
            { pos: "2", initials: "MW", name: "Marcus Webb", firm: "Founder Collective", status: "Next", isActive: false, avatarBg: "linear-gradient(135deg, #312E81, #6366F1)", posBg: "rgba(255,255,255,0.1)" },
            { pos: "3", initials: "ER", name: "Elena Rodriguez", firm: "Precursor", status: "Waiting", isActive: false, avatarBg: "linear-gradient(135deg, #581C87, #9333EA)", posBg: "rgba(255,255,255,0.1)" },
            { pos: "4", initials: "JP", name: "James Park", firm: "Lux Capital", status: "Waiting", isActive: false, avatarBg: "linear-gradient(135deg, #1E3A5F, #6366F1)", posBg: "rgba(255,255,255,0.1)" },
          ].map((q) => (
            <div
              key={q.pos}
              className={`${q.isActive ? "queue-pulse-violet" : ""} ${q.pos === "4" ? "phone-queue-row-4" : ""}`}
              style={{
                display: "flex", alignItems: "center", gap: "4px",
                padding: "2.5% 3%",
                background: q.isActive ? "rgba(139,92,246,0.06)" : "rgba(255,255,255,0.04)",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                flex: 1,
                minHeight: 0,
              }}
            >
              <div style={{
                width: "12px", height: "12px", borderRadius: "50%",
                background: q.posBg, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "5.5px", fontWeight: 700, color: q.isActive ? "#fff" : "rgba(255,255,255,0.5)", fontFamily: font,
              }}>{q.pos}</div>
              <div style={{
                width: "12px", height: "12px", borderRadius: "50%",
                background: q.avatarBg, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "3.5px", fontWeight: 700, color: "#fff", fontFamily: font,
              }}>{q.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "6.5px", color: "#F1F5F9", fontFamily: font, fontWeight: 600 }}>{q.name}</div>
                <div style={{ fontSize: "5px", color: "rgba(255,255,255,0.4)", fontFamily: font }}>{q.firm}</div>
              </div>
              {q.isActive ? (
                <>
                  <span className="active-pulse" style={{
                    fontSize: "4px", color: "#A78BFA", background: "rgba(139,92,246,0.12)",
                    borderRadius: "9999px", padding: "1.5px 5px", fontWeight: 600, fontFamily: font,
                  }}>ACTIVE</span>
                  <span style={{ fontSize: "5.5px", color: "#A78BFA", fontFamily: font, fontWeight: 700, transition: "opacity 0.3s" }}>{timeToggle ? "46h" : "47h"}</span>
                </>
              ) : (
                <span style={{ fontSize: "5px", color: "rgba(255,255,255,0.35)", fontFamily: font }}>{q.status}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action button with shimmer */}
      <div style={{ padding: "4px 10px 4px", flexShrink: 0 }}>
        <div style={{
          background: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
          borderRadius: "10px",
          padding: "7px",
          textAlign: "center",
          boxShadow: "0 4px 15px rgba(139,92,246,0.3)",
          position: "relative",
          overflow: "hidden",
        }}>
          <span style={{ fontSize: "6.5px", color: "#fff", fontWeight: 700, fontFamily: font, position: "relative", zIndex: 1 }}>
            Schedule Meeting &#8594;
          </span>
          {/* Shimmer sweep - 5% opacity, 5s cycle */}
          <div className="phone-shimmer-sweep" style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "40%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
          }} />
        </div>
      </div>

      {/* Bottom tab bar */}
      <div style={{
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "5px 12px 8px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(0,0,0,0.3)",
        flexShrink: 0,
      }}>
        {[
          { icon: <HomeTabIcon color="#A78BFA" />, label: "Home", active: false },
          { icon: <DashTabIcon active color="#A78BFA" />, label: "Dashboard", active: true },
          { icon: <InterestsTabIcon color="#A78BFA" />, label: "Interests", active: false },
          { icon: <CalendarTabIcon color="#A78BFA" />, label: "Scheduling", active: false },
          { icon: <UserTabIcon color="#A78BFA" />, label: "Profile", active: false },
        ].map((tab) => (
          <div key={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
            {tab.icon}
            {tab.active && (
              <span style={{
                fontSize: "4px", fontFamily: font,
                color: "#A78BFA",
                fontWeight: 600,
              }}>{tab.label}</span>
            )}
          </div>
        ))}
      </div>

      {/* Home indicator */}
      <div style={{
        display: "flex", justifyContent: "center", paddingBottom: "4px",
        background: "rgba(0,0,0,0.3)",
        flexShrink: 0,
      }}>
        <div style={{
          width: "80px", height: "2px", borderRadius: "9999px",
          background: "rgba(255,255,255,0.2)",
        }} />
      </div>
    </div>
  );
}

/* ---- Sparkle Particles ---- */
function SparkleParticles() {
  const particles = [
    { color: "#FFD700", delay: "0s", duration: "6s", left: "35%" },
    { color: "#06B6D4", delay: "1.5s", duration: "6s", left: "45%" },
    { color: "#8B5CF6", delay: "0.8s", duration: "6s", left: "55%" },
    { color: "#FFD700", delay: "2.5s", duration: "6s", left: "60%" },
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
  accentColor,
  onVisible,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
  subtitle: string;
  index: number;
  accentColor: string;
  onVisible?: () => void;
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
          onVisible?.();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onVisible]);

  const entranceDelay = index * 0.2;

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
            ? "translateY(0) translateX(0) rotateY(0deg)"
            : `translateY(80px) translateX(${index === 0 ? "-20px" : "20px"}) rotateY(${index === 0 ? "5deg" : "-5deg"})`,
          transition: `opacity 0.9s ease-out ${entranceDelay}s, transform 0.9s ease-out ${entranceDelay}s`,
          perspective: "1000px",
        }}
      >
        {/* Glow behind phone on hover */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}14 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* Phone container with float + hover */}
        <div
          className="iphone-float"
          style={{
            animationDelay: index === 1 ? "2s" : "0s",
            transform: hovered
              ? `translateY(-10px) rotateY(${index === 0 ? "3deg" : "-3deg"})`
              : "translateY(0) rotateY(0deg)",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Scale wrapper for proportional sizing */}
          <div style={{
            width: "var(--phone-width)",
            height: "var(--phone-height)",
            position: "relative",
          }}>
            <div style={{
              width: "260px",
              height: "530px",
              transform: "scale(var(--phone-scale))",
              transformOrigin: "top left",
            }}>
              {/* Outer phone frame */}
              <div
                className="iphone-frame-outer"
                style={{
                  width: "260px",
                  height: "530px",
                  borderRadius: "48px",
                  background: "#1C1C1E",
                  padding: "10px",
              position: "relative",
              boxShadow: hovered
                ? "0 35px 90px rgba(0,0,0,0.25), 0 10px 30px rgba(0,0,0,0.1)"
                : "0 25px 70px rgba(0,0,0,0.18), 0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            {/* Metallic sheen - top edge highlight */}
            <div style={{
              position: "absolute",
              top: 0,
              left: "20px",
              right: "20px",
              height: "1px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "1px",
              zIndex: 5,
              pointerEvents: "none",
            }} />
            {/* Metallic sheen - diagonal gradient */}
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "48px",
              background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 5,
            }} />

            {/* Side buttons - left (mute switch) */}
            <div style={{ position: "absolute", left: "-3px", top: "100px", width: "3px", height: "14px", background: "#2C2C2E", borderRadius: "2px 0 0 2px" }} />
            {/* Volume up */}
            <div style={{ position: "absolute", left: "-3px", top: "122px", width: "3px", height: "28px", background: "#2C2C2E", borderRadius: "2px 0 0 2px" }} />
            {/* Volume down */}
            <div style={{ position: "absolute", left: "-3px", top: "154px", width: "3px", height: "28px", background: "#2C2C2E", borderRadius: "2px 0 0 2px" }} />
            {/* Side button - right (power) */}
            <div style={{ position: "absolute", right: "-3px", top: "145px", width: "3px", height: "36px", background: "#2C2C2E", borderRadius: "0 2px 2px 0" }} />

            {/* Screen area */}
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "38px",
                overflow: "hidden",
                position: "relative",
                background: "#0A0E1A",
              }}
            >
              {/* Dynamic Island */}
              <div style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "76px",
                height: "24px",
                borderRadius: "9999px",
                background: "#000",
                zIndex: 10,
              }}>
                {/* Camera dot */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "20px",
                  transform: "translateY(-50%)",
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  background: "#1A1A1A",
                }} />
              </div>

              {/* Screen content area (below dynamic island) */}
              <div style={{ paddingTop: "38px", height: "100%", overflow: "hidden" }}>
                {children}
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Label below phone */}
      <div
        className="text-center mt-5"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 0.8s ease-out ${entranceDelay + 0.2}s, color 0.3s ease`,
        }}
      >
        <div
          className="font-semibold"
          style={{
            fontSize: "var(--label-size)",
            color: hovered ? accentColor : "#0F172A",
            fontFamily: "var(--font-dm-sans), sans-serif",
            transition: "color 0.3s ease",
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
  const [phonesVisible, setPhonesVisible] = useState(false);
  const handleVisible = useCallback(() => setPhonesVisible(true), []);

  return (
    <section
      className="relative z-10 iphone-section pt-[80px] pb-[60px] lg:py-20"
      style={{
        /* CSS custom properties for responsive sizing */
        ["--phone-width" as string]: "230px",
        ["--phone-height" as string]: "469px",
        ["--phone-gap" as string]: "44px",
        ["--phone-scale" as string]: "0.8846",
        ["--label-size" as string]: "16px",
        ["--sublabel-size" as string]: "13px",
      }}
    >
      {/* Gradient accent bar */}
      <div style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #A855F7)', margin: '0 auto 16px auto' }} />

      {/* Eyebrow */}
      <div className="text-center mb-3">
        <span
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "3px",
            fontWeight: 700,
            background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
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
          accentColor="#22D3EE"
          onVisible={handleVisible}
        >
          <InvestorScreen isVisible={phonesVisible} />
        </IPhoneFrame>

        <IPhoneFrame
          href="/dashboard/founder"
          label="Startup Dashboard"
          subtitle="Track interest. Manage your queue. Schedule calls."
          index={1}
          accentColor="#A78BFA"
        >
          <FounderScreen isVisible={phonesVisible} />
        </IPhoneFrame>
      </div>
    </section>
  );
}
