"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ---- Mini Dashboard Content (Investor) ---- */
function InvestorScreen() {
  return (
    <div className="w-full h-full bg-white relative" style={{ fontSize: "0" }}>
      {/* Top area */}
      <div style={{ padding: "10px 10px 6px" }}>
        <div style={{ fontSize: "8px", fontWeight: 600, color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif" }}>
          Good afternoon, Jordan
        </div>
        <div style={{ fontSize: "6px", color: "#94A3B8", marginTop: "2px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
          Friday, March 13
        </div>
      </div>

      {/* Glassmorphic info bar */}
      <div style={{ margin: "4px 10px", padding: "4px 8px", borderRadius: "6px", background: "linear-gradient(135deg, rgba(74,108,247,0.1), rgba(124,92,252,0.08))", backdropFilter: "blur(4px)" }}>
        <div style={{ fontSize: "5px", color: "#4A6CF7", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500 }}>
          Investor View | Sectors: AI/ML, Fintech
        </div>
      </div>

      {/* Stats card */}
      <div style={{ margin: "6px 10px", padding: "8px", borderRadius: "8px", background: "rgba(74,108,247,0.05)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "4px", textAlign: "center" }}>
          {[
            { num: "14", label: "In Feed" },
            { num: "5", label: "Interested" },
            { num: "3", label: "Queue" },
            { num: "2", label: "Meetings" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif" }}>{s.num}</div>
              <div style={{ fontSize: "5px", color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feed section */}
      <div style={{ padding: "4px 10px" }}>
        <div style={{ fontSize: "7px", fontWeight: 600, color: "#0F172A", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
          New in Your Feed
        </div>
        {[
          { name: "Helix Robotics", color: "#4A6CF7", sector: "AI/ML" },
          { name: "PayGrid Finance", color: "#7C5CFC", sector: "Fintech" },
          { name: "CloudNine Health", color: "#22c55e", sector: "Health" },
        ].map((c) => (
          <div key={c.name} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: c.color, flexShrink: 0 }} />
            <span style={{ fontSize: "6px", color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500 }}>{c.name}</span>
            <span style={{ fontSize: "5px", color: "#fff", background: c.color, borderRadius: "3px", padding: "1px 3px", fontFamily: "var(--font-dm-sans), sans-serif" }}>{c.sector}</span>
          </div>
        ))}
      </div>

      {/* Queue section */}
      <div style={{ padding: "6px 10px" }}>
        <div style={{ fontSize: "7px", fontWeight: 600, color: "#0F172A", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
          Your Meeting Queue
        </div>
        {[
          { pos: "1", name: "Luminary AI" },
          { pos: "2", name: "NovaPay" },
        ].map((q) => (
          <div key={q.pos} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(74,108,247,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5px", fontWeight: 700, color: "#4A6CF7", fontFamily: "var(--font-dm-sans), sans-serif" }}>{q.pos}</div>
            <span style={{ fontSize: "6px", color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif" }}>{q.name}</span>
          </div>
        ))}
      </div>

      {/* Bottom tab bar */}
      <div style={{ position: "absolute", bottom: "20px", left: 0, right: 0, display: "flex", justifyContent: "space-around", padding: "6px 16px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ width: "6px", height: "6px", borderRadius: "2px", background: i === 0 ? "#4A6CF7" : "#CBD5E1" }} />
        ))}
      </div>
    </div>
  );
}

/* ---- Mini Dashboard Content (Founder) ---- */
function FounderScreen() {
  return (
    <div className="w-full h-full bg-white relative" style={{ fontSize: "0" }}>
      {/* Top area */}
      <div style={{ padding: "10px 10px 6px" }}>
        <div style={{ fontSize: "8px", fontWeight: 600, color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif" }}>
          Good afternoon, Alex
        </div>
        <div style={{ fontSize: "6px", color: "#94A3B8", marginTop: "2px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
          Friday, March 13
        </div>
      </div>

      {/* Stats card */}
      <div style={{ margin: "6px 10px", padding: "8px", borderRadius: "8px", background: "rgba(124,92,252,0.05)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "4px", textAlign: "center" }}>
          {[
            { num: "8", label: "Views" },
            { num: "4", label: "Interested" },
            { num: "2", label: "Queue" },
            { num: "1", label: "Calls" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif" }}>{s.num}</div>
              <div style={{ fontSize: "5px", color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Queue section */}
      <div style={{ padding: "4px 10px" }}>
        <div style={{ fontSize: "7px", fontWeight: 600, color: "#0F172A", marginBottom: "4px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
          Investor Queue
        </div>
        {[
          { pos: "1", name: "Jordan M.", status: "Reviewing" },
          { pos: "2", name: "Sarah K.", status: "Interested" },
          { pos: "3", name: "David L.", status: "Matched" },
          { pos: "4", name: "Emily R.", status: "Pending" },
        ].map((q) => (
          <div key={q.pos} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(124,92,252,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5px", fontWeight: 700, color: "#7C5CFC", fontFamily: "var(--font-dm-sans), sans-serif" }}>{q.pos}</div>
            <span style={{ fontSize: "6px", color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif", flex: 1 }}>{q.name}</span>
            <span style={{ fontSize: "5px", color: "#7C5CFC", fontFamily: "var(--font-dm-sans), sans-serif" }}>{q.status}</span>
          </div>
        ))}
      </div>

      {/* Profile strength */}
      <div style={{ padding: "8px 10px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{
          width: "28px", height: "28px", borderRadius: "50%",
          background: "conic-gradient(#7C5CFC 0% 78%, #E2E8F0 78% 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}>
          <div style={{
            width: "22px", height: "22px", borderRadius: "50%", background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "6px", fontWeight: 700, color: "#7C5CFC", fontFamily: "var(--font-dm-sans), sans-serif",
          }}>78%</div>
        </div>
        <div>
          <div style={{ fontSize: "6px", fontWeight: 600, color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif" }}>Profile Strength</div>
          <div style={{ fontSize: "5px", color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", marginTop: "1px" }}>Add video pitch to reach 100%</div>
        </div>
      </div>

      {/* Bottom tab bar */}
      <div style={{ position: "absolute", bottom: "20px", left: 0, right: 0, display: "flex", justifyContent: "space-around", padding: "6px 16px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ width: "6px", height: "6px", borderRadius: "2px", background: i === 0 ? "#7C5CFC" : "#CBD5E1" }} />
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
              }} />

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
        ["--phone-width" as string]: "280px",
        ["--phone-height" as string]: "570px",
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
