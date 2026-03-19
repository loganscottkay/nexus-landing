"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

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


function UserTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={active ? color : "rgba(255,255,255,0.2)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SearchTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={active ? color : "rgba(255,255,255,0.2)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function MatchesTabIcon({ active, color }: { active?: boolean; color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={active ? color : "rgba(255,255,255,0.2)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

/* ---- Typing Indicator (3 pulsing dots) ---- */
function TypingIndicator({ color }: { color: string }) {
  return (
    <>
      <style>{`
        @keyframes typingDotBounce {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-1.5px); }
        }
      `}</style>
      <div style={{ display: "flex", gap: "1.5px", alignItems: "center" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: "2px",
              height: "2px",
              borderRadius: "50%",
              background: color,
              animation: `typingDotBounce 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}

/* ---- Notification Dot (pulsing) ---- */
function NotificationDot({ color }: { color: string }) {
  return (
    <>
      <style>{`
        @keyframes notifDotPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
      <div style={{
        position: "absolute",
        top: "-1px",
        right: "-1px",
        width: "3px",
        height: "3px",
        borderRadius: "50%",
        background: color,
        animation: "notifDotPulse 2s ease-in-out infinite",
      }} />
    </>
  );
}

/* ---- Animated Progress Bar ---- */
function AnimatedBar({ targetWidth, color, isVisible }: { targetWidth: string; color: string; isVisible: boolean }) {
  const [width, setWidth] = useState("0%");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setWidth(targetWidth));
      });
    }
  }, [isVisible, targetWidth]);

  return (
    <div style={{
      width,
      height: "100%",
      borderRadius: "9999px",
      background: color,
      transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
    }} />
  );
}

/* ---- Status Bar ---- */
function StatusBar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 12px 0",
      height: "28px",
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const glassCard = {
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "10px",
};

/* ---- Mini Dashboard Content (Investor - Dark Mode Teal) ---- */
function InvestorScreen({ isVisible }: { isVisible: boolean }) {
  const font = "var(--font-dm-sans), sans-serif";
  const [feedIndex, setFeedIndex] = useState(0);
  const [showCurrent, setShowCurrent] = useState(true);
  const [statsPulsed, setStatsPulsed] = useState(false);

  const allStartups = [
    { initial: "V", name: "VaultSync", desc: "Decentralized data infrastructure", status: "Review", statusColor: "#FBBF24", statusBg: "rgba(251,191,36,0.12)", gradient: "linear-gradient(135deg, #1E3A5F, #3B82F6)", accent: "#3B82F6", sparkline: "0,7 5,5 10,6 15,3 20,4 25,1 30,0" },
    { initial: "N", name: "NovaBridge", desc: "AI-powered lending platform", status: "Matched", statusColor: "#34D399", statusBg: "rgba(52,211,153,0.12)", gradient: "linear-gradient(135deg, #164E63, #0E7490)", accent: "#0E7490", sparkline: "0,6 5,7 10,4 15,5 20,2 25,1 30,0" },
    { initial: "P", name: "Patchwork", desc: "Urban goods marketplace", status: "New", statusColor: "#22D3EE", statusBg: "rgba(6,182,212,0.12)", gradient: "linear-gradient(135deg, #312E81, #6366F1)", accent: "#6366F1", sparkline: "0,7 6,5 12,6 18,3 24,2 30,0" },
  ];

  // Crossfade: toggle showCurrent, then advance index
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCurrent(false); // fade out current
      setTimeout(() => {
        setFeedIndex((prev) => (prev + 1) % allStartups.length);
        setShowCurrent(true); // fade in next
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [allStartups.length]);

  // Trigger stat pulse once on first visibility
  useEffect(() => {
    if (isVisible && !statsPulsed) {
      setStatsPulsed(true);
    }
  }, [isVisible, statsPulsed]);

  const currentSet = [
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

  return (
    <div className="phone-screen-glow-investor" style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(145deg, #0B1120 0%, #0E1A2E 30%, #122035 50%, #0D1B30 70%, #0A1222 100%)",
      fontSize: 0,
      position: "relative",
    }}>
      {/* Radial accent glow */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60%", background: "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Status bar */}
      <StatusBar />

      {/* Greeting */}
      <div style={{ padding: "6px 10px 3px", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "10px", fontWeight: 700, color: "#F1F5F9", fontFamily: font, letterSpacing: "-0.2px" }}>
          Good afternoon, Jordan <span style={{ fontSize: "9px" }}>&#128075;</span>
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
          <span style={{ fontSize: "5.5px", color: "rgba(255,255,255,0.4)" }}>&#183;</span>
          <span style={{ fontSize: "5.5px", color: "rgba(255,255,255,0.55)", fontFamily: font }}>AI/ML, Fintech</span>
        </div>
      </div>

      {/* Stats card */}
      <div className="phone-glass-card" style={{
        margin: "6px 10px 10px",
        padding: "10px",
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "10px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Hero stat */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "7px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              className={`stat-pulse-investor ${statsPulsed ? "stat-pulse-animate" : ""}`}
              style={{ fontSize: "20px", fontWeight: 700, color: "#F1F5F9", fontFamily: font, lineHeight: 1 }}
            >{statNums[0]}</div>
            <div style={{ fontSize: "5px", color: "rgba(255,255,255,0.4)", fontFamily: font, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "2px" }}>New Startups</div>
            <TrendPill value="+3" />
          </div>
          <svg width="40" height="18" viewBox="0 0 40 18" fill="none" style={{ marginTop: "-4px" }}>
            <polyline points="0,16 7,13 14,10 20,12 26,7 33,4 40,1" stroke="#22D3EE" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="0,16 7,13 14,10 20,12 26,7 33,4 40,1 40,18 0,18" fill="url(#tealFade)" />
            <defs><linearGradient id="tealFade" x1="0" y1="0" x2="0" y2="18"><stop offset="0%" stopColor="#22D3EE" stopOpacity="0.15" /><stop offset="100%" stopColor="#22D3EE" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>
        {/* Secondary stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2px", textAlign: "center" }}>
          {[
            { label: "MATCHES", trend: "+2", idx: 1 },
            { label: "MEETINGS", trend: "+1", idx: 2 },
            { label: "SAVED", trend: "New", idx: 3 },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                className={`stat-pulse-investor ${statsPulsed ? "stat-pulse-animate" : ""}`}
                style={{
                  fontSize: "13px", fontWeight: 700, color: "#F1F5F9", fontFamily: font, lineHeight: 1,
                  animationDelay: statsPulsed ? `${s.idx * 0.1}s` : undefined,
                }}
              >{statNums[s.idx]}</div>
              <div style={{ fontSize: "5px", color: "rgba(255,255,255,0.4)", fontFamily: font, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "2px" }}>{s.label}</div>
              <TrendPill value={s.trend} />
            </div>
          ))}
        </div>

        {/* Engagement bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "6px", paddingTop: "6px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize: "6px", color: "rgba(255,255,255,0.55)", fontFamily: font, whiteSpace: "nowrap" }}>Engagement</span>
          <div style={{ flex: 1, height: "3px", borderRadius: "9999px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <AnimatedBar targetWidth="84%" color="linear-gradient(90deg, #06B6D4, #22D3EE)" isVisible={isVisible} />
          </div>
          <span style={{ fontSize: "6.5px", color: "#22D3EE", fontWeight: 700, fontFamily: font }}>84%</span>
        </div>
      </div>

      {/* Section separator */}
      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.04)", margin: "0 10px 5px" }} />

      {/* Feed section — crossfade */}
      <div style={{ flex: 1, padding: "3px 10px 2px", display: "flex", flexDirection: "column", minHeight: 0, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "5px" }}>
          <span style={{ fontSize: "8.5px", fontWeight: 700, color: "#F1F5F9", fontFamily: font }}>Your Feed</span>
          <span style={{
            fontSize: "5.5px", color: "#22D3EE", background: "rgba(6,182,212,0.18)",
            borderRadius: "9999px", padding: "2px 7px", fontWeight: 600, fontFamily: font,
            border: "0.5px solid rgba(34,211,238,0.2)",
          }}>New</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "3%", overflow: "hidden" }}>
          {currentSet.map((c, idx) => (
            <div
              key={`feed-${c.name}`}
              className={`phone-glass-card ${idx === 2 ? "phone-feed-row-3" : ""}`}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "3% 4%",
                background: "rgba(255,255,255,0.07)",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.10)",
                borderLeft: `2px solid ${c.accent}`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                flex: 1,
                minHeight: 0,
                opacity: showCurrent ? 1 : 0,
                transition: "opacity 0.4s ease-in-out",
              }}
            >
              <div style={{
                width: "18px", height: "18px", borderRadius: "50%", background: c.gradient, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "6.5px", fontWeight: 700, color: "#fff", fontFamily: font,
                border: `1.5px solid ${c.accent}4D`,
              }}>{c.initial}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "8px", color: "#F1F5F9", fontFamily: font, fontWeight: 700 }}>{c.name}</div>
                <div style={{ fontSize: "6.5px", color: "rgba(255,255,255,0.55)", fontFamily: font, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.desc}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px", flexShrink: 0 }}>
                <span style={{
                  fontSize: "5.5px", color: c.statusColor, background: c.statusBg.replace("0.12", "0.18"),
                  borderRadius: "9999px", padding: "2px 7px", fontFamily: font, fontWeight: 600,
                  border: `0.5px solid ${c.statusColor}33`,
                }}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section separator */}
      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.04)", margin: "4px 10px 0" }} />

      {/* Queue section */}
      <div style={{ padding: "6px 10px 4px", position: "relative", zIndex: 1 }}>
        {/* Gradient header bar */}
        <div style={{ height: "2px", borderRadius: "9999px", background: "linear-gradient(90deg, #06B6D4, #22D3EE, transparent)", marginBottom: "5px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "5px" }}>
          <span style={{ fontSize: "8.5px", fontWeight: 700, color: "#F1F5F9", fontFamily: font }}>Meeting Queue</span>
          <ClockIcon />
          <div style={{ marginLeft: "auto" }}>
            <TypingIndicator color="#22D3EE" />
          </div>
        </div>
        {[
          { pos: "1", name: "Luminary AI", isActive: true, time: "47m", match: "92%", avatar: "linear-gradient(135deg, #0E7490, #06B6D4)", posBg: "linear-gradient(135deg, #06B6D4, #22D3EE)" },
          { pos: "2", name: "Terraform Health", isActive: false, time: "2h", match: "87%", avatar: "linear-gradient(135deg, #1E3A5F, #3B82F6)", posBg: "rgba(255,255,255,0.1)" },
        ].map((q) => (
          <div key={q.pos} className={`phone-glass-card ${q.isActive ? "queue-pulse-teal" : ""}`} style={{
            display: "flex", alignItems: "center", gap: "5px", marginBottom: "3%",
            padding: "3% 4%",
            background: q.isActive ? "rgba(6,182,212,0.08)" : "rgba(255,255,255,0.07)",
            borderRadius: "10px",
            border: q.isActive ? "1px solid rgba(6,182,212,0.15)" : "1px solid rgba(255,255,255,0.10)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}>
            <div style={{
              width: "16px", height: "16px", borderRadius: "50%",
              background: q.posBg, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "7px", fontWeight: 700, color: q.isActive ? "#fff" : "rgba(255,255,255,0.5)", fontFamily: font,
            }}>{q.pos}</div>
            <div style={{
              width: "14px", height: "14px", borderRadius: "50%",
              background: q.avatar, flexShrink: 0,
              border: "1.5px solid rgba(6,182,212,0.3)",
            }} />
            <span style={{ fontSize: "8px", color: "#F1F5F9", fontFamily: font, fontWeight: 600, flex: 1 }}>{q.name}</span>
            {q.isActive && <span className="active-dot" />}
            <span style={{
              fontSize: "5.5px", color: q.isActive ? "#22D3EE" : "rgba(255,255,255,0.55)",
              background: q.isActive ? "rgba(6,182,212,0.18)" : "rgba(255,255,255,0.08)",
              borderRadius: "9999px", padding: "2px 7px", fontWeight: 600, fontFamily: font,
              border: q.isActive ? "0.5px solid rgba(34,211,238,0.2)" : "0.5px solid rgba(255,255,255,0.08)",
            }}>{q.time}</span>
            <span style={{
              fontSize: "5.5px", color: "#34D399", background: "rgba(52,211,153,0.18)",
              borderRadius: "9999px", padding: "2px 7px", fontWeight: 600, fontFamily: font,
              border: "0.5px solid rgba(52,211,153,0.2)",
            }}>{q.match}</span>
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
          { icon: <HomeTabIcon active color="#22D3EE" />, label: "Home", active: true },
          { icon: <SearchTabIcon color="#22D3EE" />, label: "Search", active: false },
          { icon: <MatchesTabIcon color="#22D3EE" />, label: "Matches", active: false, hasNotif: true },
          { icon: <UserTabIcon color="#22D3EE" />, label: "Profile", active: false },
        ].map((tab) => (
          <div key={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px", position: "relative" }}>
            <div style={{ position: "relative", transform: "scale(1.25)", transformOrigin: "center" }}>
              {tab.icon}
              {tab.hasNotif && <NotificationDot color="#22D3EE" />}
            </div>
            {tab.active && (
              <span style={{
                fontSize: "5px", fontFamily: font,
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
  const [statsPulsed, setStatsPulsed] = useState(false);

  // Trigger stat pulse once on first visibility
  useEffect(() => {
    if (isVisible && !statsPulsed) {
      setStatsPulsed(true);
    }
  }, [isVisible, statsPulsed]);

  // Count-up stats
  const stat47 = useCountUp(47, 1500, isVisible);
  const stat8 = useCountUp(8, 1500, isVisible);
  const stat2 = useCountUp(2, 1500, isVisible);
  const stat12 = useCountUp(12, 1500, isVisible);
  const statNums = [stat47, stat8, stat2, stat12];

  return (
    <div className="phone-screen-glow-founder" style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(145deg, #0E0B1F 0%, #150E2A 30%, #1A1235 50%, #140F2C 70%, #0D0A1E 100%)",
      fontSize: 0,
      position: "relative",
    }}>
      {/* Radial accent glow */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60%", background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Status bar */}
      <StatusBar />

      {/* Greeting */}
      <div style={{ padding: "6px 10px 3px", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "10px", fontWeight: 700, color: "#F1F5F9", fontFamily: font, letterSpacing: "-0.2px" }}>
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
          <span style={{ fontSize: "5.5px", color: "rgba(255,255,255,0.4)" }}>&#183;</span>
          <span style={{ fontSize: "5.5px", color: "rgba(255,255,255,0.55)", fontFamily: font }}>Luminary AI</span>
        </div>
      </div>

      {/* Stats card */}
      <div className="phone-glass-card" style={{
        margin: "6px 10px 10px",
        padding: "10px",
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "10px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Hero stat */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "7px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              className={`stat-pulse-founder ${statsPulsed ? "stat-pulse-animate" : ""}`}
              style={{ fontSize: "20px", fontWeight: 700, color: "#F1F5F9", fontFamily: font, lineHeight: 1 }}
            >{statNums[0]}</div>
            <div style={{ fontSize: "5px", color: "rgba(255,255,255,0.4)", fontFamily: font, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "2px" }}>Views</div>
            <TrendPill value="+12" color="#A78BFA" />
          </div>
          <svg width="40" height="18" viewBox="0 0 40 18" fill="none" style={{ marginTop: "-4px" }}>
            <polyline points="0,17 5,14 10,12 16,13 22,8 28,9 34,4 37,3 40,0" stroke="#A78BFA" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="0,17 5,14 10,12 16,13 22,8 28,9 34,4 37,3 40,0 40,18 0,18" fill="url(#violetFade)" />
            <defs><linearGradient id="violetFade" x1="0" y1="0" x2="0" y2="18"><stop offset="0%" stopColor="#A78BFA" stopOpacity="0.15" /><stop offset="100%" stopColor="#A78BFA" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>
        {/* Secondary stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2px", textAlign: "center" }}>
          {[
            { label: "INTERESTED", trend: "+3", idx: 1 },
            { label: "MEETINGS", trend: "+1", idx: 2 },
            { label: "SCORE", trend: "+5", idx: 3 },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                className={`stat-pulse-founder ${statsPulsed ? "stat-pulse-animate" : ""}`}
                style={{
                  fontSize: "13px", fontWeight: 700, color: "#F1F5F9", fontFamily: font, lineHeight: 1,
                  animationDelay: statsPulsed ? `${s.idx * 0.1}s` : undefined,
                }}
              >{statNums[s.idx]}</div>
              <div style={{ fontSize: "5px", color: "rgba(255,255,255,0.4)", fontFamily: font, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "2px" }}>{s.label}</div>
              <TrendPill value={s.trend} color="#A78BFA" />
            </div>
          ))}
        </div>

        {/* Profile strength bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "6px", paddingTop: "6px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize: "6px", color: "rgba(255,255,255,0.55)", fontFamily: font, whiteSpace: "nowrap" }}>Profile Strength</span>
          <div style={{ flex: 1, height: "3px", borderRadius: "9999px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <AnimatedBar targetWidth="78%" color="linear-gradient(90deg, #8B5CF6, #A78BFA)" isVisible={isVisible} />
          </div>
          <span style={{ fontSize: "6.5px", color: "#A78BFA", fontWeight: 700, fontFamily: font }}>78%</span>
        </div>
      </div>

      {/* Section separator */}
      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.04)", margin: "0 10px 5px" }} />

      {/* Queue section */}
      <div style={{ flex: 1, padding: "3px 10px 2px", display: "flex", flexDirection: "column", minHeight: 0, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "2px" }}>
          <span style={{ fontSize: "8.5px", fontWeight: 700, color: "#F1F5F9", fontFamily: font }}>Investor Queue</span>
        </div>
        <div style={{ fontSize: "5.5px", color: "rgba(255,255,255,0.45)", fontFamily: font, fontStyle: "italic", marginBottom: "5px" }}>
          One at a time &#183; 72h windows
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "3%", overflow: "hidden" }}>
          {[
            { pos: "1", initials: "SC", name: "Sarah Chen", firm: "Stratton Ventures", status: "Active", statusColor: "#34D399", statusBg: "rgba(52,211,153,0.18)", isActive: true, avatarBg: "linear-gradient(135deg, #4C1D95, #7C3AED)", posBg: "linear-gradient(135deg, #8B5CF6, #A78BFA)" },
            { pos: "2", initials: "MW", name: "Marcus Webb", firm: "Founder Collective", status: "Waiting", statusColor: "#FBBF24", statusBg: "rgba(251,191,36,0.18)", isActive: false, avatarBg: "linear-gradient(135deg, #312E81, #6366F1)", posBg: "rgba(255,255,255,0.1)" },
            { pos: "3", initials: "ER", name: "Elena Rodriguez", firm: "Elevation", status: "Waiting", statusColor: "#FBBF24", statusBg: "rgba(251,191,36,0.18)", isActive: false, avatarBg: "linear-gradient(135deg, #581C87, #9333EA)", posBg: "rgba(255,255,255,0.1)" },
            { pos: "4", initials: "JP", name: "James Park", firm: "Root Ventures", status: "New", statusColor: "#A78BFA", statusBg: "rgba(139,92,246,0.18)", isActive: false, avatarBg: "linear-gradient(135deg, #1E3A5F, #6366F1)", posBg: "rgba(255,255,255,0.1)" },
          ].map((q) => (
            <div
              key={q.pos}
              className={`phone-glass-card ${q.isActive ? "queue-pulse-violet" : ""} ${q.pos === "4" ? "phone-queue-row-4" : ""}`}
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                padding: "3% 4%",
                background: q.isActive ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.07)",
                borderRadius: "10px",
                border: q.isActive ? "1px solid rgba(139,92,246,0.15)" : "1px solid rgba(255,255,255,0.10)",
                borderLeft: q.isActive ? "2px solid #8B5CF6" : undefined,
                flex: 1,
                minHeight: 0,
                boxShadow: q.isActive ? "0 0 12px rgba(139,92,246,0.08), inset 0 1px 0 rgba(255,255,255,0.08)" : "inset 0 1px 0 rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <div style={{
                width: "16px", height: "16px", borderRadius: "50%",
                background: q.posBg, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "7px", fontWeight: 700, color: q.isActive ? "#fff" : "rgba(255,255,255,0.5)", fontFamily: font,
              }}>{q.pos}</div>
              <div
                className={q.isActive ? "avatar-glow-ring" : undefined}
                style={{
                  width: "16px", height: "16px", borderRadius: "50%",
                  background: q.avatarBg, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "4.5px", fontWeight: 700, color: "#fff", fontFamily: font,
                  border: "1.5px solid rgba(139,92,246,0.3)",
                }}
              >{q.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "8px", color: "#F1F5F9", fontFamily: font, fontWeight: 600 }}>{q.name}</div>
                <div style={{ fontSize: "6.5px", color: "rgba(255,255,255,0.55)", fontFamily: font }}>{q.firm}</div>
              </div>
              {q.isActive && (
                <>
                  <span className="active-dot" />
                  <span style={{
                    fontSize: "3.5px", color: "#fff", background: "#22C55E",
                    borderRadius: "2px", padding: "1px 3px", fontWeight: 700, fontFamily: font,
                    letterSpacing: "0.3px", lineHeight: 1.2,
                  }}>LIVE</span>
                </>
              )}
              <span style={{
                fontSize: "5.5px", color: q.statusColor, background: q.statusBg,
                borderRadius: "9999px", padding: "2px 7px", fontWeight: 600, fontFamily: font,
                border: `0.5px solid ${q.statusColor}33`,
              }}>{q.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section separator */}
      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.04)", margin: "4px 10px 0" }} />

      {/* Action button with shimmer */}
      <div style={{ padding: "6px 10px 4px", flexShrink: 0, position: "relative", zIndex: 1 }}>
        <div className="cta-glow-pulse" style={{
          background: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
          borderRadius: "10px",
          padding: "8px",
          textAlign: "center",
          boxShadow: "0 4px 15px rgba(139,92,246,0.3)",
          position: "relative",
          overflow: "hidden",
        }}>
          <span style={{ fontSize: "7.5px", color: "#fff", fontWeight: 700, fontFamily: font, position: "relative", zIndex: 1 }}>
            Schedule Meeting &#8594;
          </span>
          {/* Shimmer sweep - 5% opacity, 6s cycle */}
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
          { icon: <MatchesTabIcon color="#A78BFA" />, label: "Matches", active: false, hasNotif: true },
          { icon: <UserTabIcon color="#A78BFA" />, label: "Profile", active: false },
        ].map((tab) => (
          <div key={tab.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px", position: "relative" }}>
            <div style={{ position: "relative", transform: "scale(1.25)", transformOrigin: "center" }}>
              {tab.icon}
              {tab.hasNotif && <NotificationDot color="#A78BFA" />}
            </div>
            {tab.active && (
              <span style={{
                fontSize: "5px", fontFamily: font,
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

/* ---- Phone Body (shared between inline + modal) ---- */
function PhoneBody({
  children,
  hovered,
  enlarged,
}: {
  children: React.ReactNode;
  hovered: boolean;
  enlarged?: boolean;
}) {
  return (
    <div
      className="iphone-frame-outer"
      style={{
        width: enlarged ? "340px" : "260px",
        height: enlarged ? "694px" : "530px",
        borderRadius: "48px",
        background: "linear-gradient(180deg, #2C2C2E 0%, #1C1C1E 15%, #2A2A2C 50%, #1C1C1E 85%, #2C2C2E 100%)",
        padding: enlarged ? "13px" : "10px",
        position: "relative",
        boxShadow: hovered
          ? "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.03), 0 35px 90px rgba(0,0,0,0.25), 0 12px 24px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.06)"
          : "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.03), 0 25px 50px rgba(0,0,0,0.12), 0 12px 24px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Metallic sheen - top edge highlight */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "20px",
        right: "20px",
        height: "1px",
        background: "rgba(255,255,255,0.12)",
        borderRadius: "1px",
        zIndex: 5,
        pointerEvents: "none",
      }} />
      {/* Bottom edge highlight */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "20px",
        right: "20px",
        height: "1px",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "1px",
        zIndex: 5,
        pointerEvents: "none",
      }} />
      {/* Hover sheen overlay */}
      <div className="iphone-frame-sheen" />

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

        {/* Screen content area (edge-to-edge) */}
        <div style={{ height: "100%", overflow: "hidden" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---- Enlarge Modal ---- */
function PhoneEnlargeModal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => {
    setShow(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setShow(true));
    });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  return createPortal(
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: show ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Close button — larger tap target on mobile */}
      <button
        onClick={handleClose}
        className="phone-enlarge-close"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "none",
          color: "#fff",
          fontSize: "14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 101,
        }}
      >
        &#x2715;
      </button>

      {/* Enlarged phone — fullscreen on mobile */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`phone-enlarge-inner ${show ? "glass-reveal-modal" : ""}`}
        style={{
          maxWidth: "85vw",
          position: "relative",
          ...(!show ? {
            opacity: 0,
            transform: "scale(0.9)",
          } : {}),
        }}
      >
        <PhoneBody hovered={false} enlarged>
          {children}
        </PhoneBody>
      </div>
    </div>,
    document.body
  );
}

/* ---- iPhone Frame ---- */
function IPhoneFrame({
  children,
  label,
  subtitle,
  index,
  accentColor,
  onVisible,
  onEnlarge,
}: {
  children: React.ReactNode;
  label: string;
  subtitle: string;
  index: number;
  accentColor: string;
  onVisible?: () => void;
  onEnlarge: () => void;
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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div
        onClick={onEnlarge}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onEnlarge(); }}
        className={visible ? (index === 0 ? "glass-reveal-entrance" : "glass-reveal-entrance-delayed") : ""}
        style={{
          cursor: "pointer",
          position: "relative",
          ...(!visible ? {
            opacity: 0,
            transform: "translateY(40px)",
          } : {}),
          perspective: "1200px",
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

        {/* Phone container with float + hover + 3D tilt */}
        <div
          className="iphone-float"
          style={{
            animationDelay: index === 1 ? "2s" : "0s",
            transform: hovered
              ? `translateY(-10px) scale(1.02) rotateY(0deg)`
              : `translateY(0) scale(1) rotateY(${index === 0 ? "3deg" : "-3deg"})`,
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
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
              <PhoneBody hovered={hovered}>
                {children}
              </PhoneBody>
            </div>
          </div>

          {/* Diagonal shine/reflection effect */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "48px",
            background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)",
            pointerEvents: "none",
            zIndex: 10,
            transform: "scale(var(--phone-scale))",
            transformOrigin: "top left",
            width: "260px",
            height: "530px",
          }} />

          {/* Surface reflection below phone */}
          <div style={{
            position: "absolute",
            top: "var(--phone-height)",
            left: "5%",
            width: "90%",
            height: "40px",
            background: "linear-gradient(180deg, rgba(0,0,0,0.03), transparent)",
            filter: "blur(8px)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 0,
          }} />
        </div>
      </div>

      {/* Label below phone */}
      <div
        className="text-center mt-5"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 0.8s ease-out ${index === 0 ? 0.4 : 0.7}s`,
        }}
      >
        <div
          className="font-semibold"
          style={{
            fontSize: "16px",
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
        <div
          className="phone-enlarge-hint"
          style={{
            fontSize: "12px",
            color: "rgba(0,0,0,0.3)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            marginTop: "6px",
          }}
        >
          <span className="hidden md:inline">Click to enlarge</span>
          <span className="md:hidden">Tap to enlarge</span>
        </div>
      </div>
    </div>
  );
}

/* ---- Main Component ---- */
export default function IPhoneMockups() {
  const [phonesVisible, setPhonesVisible] = useState(false);
  const [enlargedPhone, setEnlargedPhone] = useState<string | null>(null);
  const handleVisible = useCallback(() => setPhonesVisible(true), []);

  return (
    <section
      className="relative z-10 iphone-section pt-[80px] pb-[60px] lg:pt-10 lg:pb-20"
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

      {/* Phones container — reversed on mobile so Founder phone shows first */}
      <div
        className="iphone-phones-container relative flex flex-col-reverse md:flex-row items-center md:items-start justify-center"
        style={{ gap: "var(--phone-gap)", flexWrap: "nowrap" }}
      >
        <SparkleParticles />

        <IPhoneFrame
          label="Investor Dashboard"
          subtitle="Browse startups. Express interest. Get matched."
          index={0}
          accentColor="#22D3EE"
          onVisible={handleVisible}
          onEnlarge={() => setEnlargedPhone("investor")}
        >
          <InvestorScreen isVisible={phonesVisible} />
        </IPhoneFrame>

        <IPhoneFrame
          label="Startup Dashboard"
          subtitle="Track interest. Manage your queue. Schedule calls."
          index={1}
          accentColor="#A78BFA"
          onEnlarge={() => setEnlargedPhone("founder")}
        >
          <FounderScreen isVisible={phonesVisible} />
        </IPhoneFrame>
      </div>

      {/* Enlarge modal */}
      {enlargedPhone === "investor" && (
        <PhoneEnlargeModal onClose={() => setEnlargedPhone(null)}>
          <InvestorScreen isVisible={true} />
        </PhoneEnlargeModal>
      )}
      {enlargedPhone === "founder" && (
        <PhoneEnlargeModal onClose={() => setEnlargedPhone(null)}>
          <FounderScreen isVisible={true} />
        </PhoneEnlargeModal>
      )}
    </section>
  );
}
