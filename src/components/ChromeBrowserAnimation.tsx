"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

/* ---- Config ---- */
const TYPE_SPEED = 27;
const DELETE_SPEED = 14;
const PAUSE_AFTER_TYPE = 400;
const PAUSE_BETWEEN = 250;

const QUERIES = [
  "How to find investors for my startup?",
  "How to find early stage startups to invest in?",
  "What is an app where founders pitch, investors swipe, and every match gets a guaranteed meeting?",
];

/* ---- Component ---- */
export default function ChromeBrowserAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);
  const [searchHighlight, setSearchHighlight] = useState(false);
  const [fadeToWhite, setFadeToWhite] = useState(false);
  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [showBrand, setShowBrand] = useState(false);

  /* Responsive check */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Cursor blink */
  useEffect(() => {
    if (!showCursor) return;
    const iv = setInterval(() => setCursorBlink((v) => !v), 500);
    return () => clearInterval(iv);
  }, [showCursor]);

  /* Keep text scrolled to end (cursor visible) */
  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollLeft = textContainerRef.current.scrollWidth;
    }
  }, [searchText]);

  /* Timer helpers */
  const schedule = useCallback((fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay);
    timersRef.current.push(t);
  }, []);

  const cleanup = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  /* Reset all state for looping */
  const resetState = useCallback(() => {
    setSearchText("");
    setShowCursor(false);
    setCursorBlink(true);
    setSearchHighlight(false);
    setFadeToWhite(false);
    setShowLoadingBar(false);
    setShowResults(false);
    setShowGlitch(false);
    setShowBrand(false);
  }, []);

  /* Main animation sequence */
  const runAnimation = useCallback(() => {
    cleanup();
    resetState();

    let t = 0;
    const at = (fn: () => void, ms: number) => {
      t += ms;
      schedule(fn, t);
    };

    // Show cursor after initial pause
    at(() => setShowCursor(true), 500);

    // --- Sequence 1: type, pause, delete ---
    const s1 = QUERIES[0];
    for (let i = 1; i <= s1.length; i++) {
      const txt = s1.slice(0, i);
      at(() => setSearchText(txt), TYPE_SPEED);
    }
    at(() => {}, PAUSE_AFTER_TYPE);
    for (let i = s1.length - 1; i >= 0; i--) {
      const txt = s1.slice(0, i);
      at(() => setSearchText(txt), DELETE_SPEED);
    }
    at(() => {}, PAUSE_BETWEEN);

    // --- Sequence 2: type, pause, delete ---
    const s2 = QUERIES[1];
    for (let i = 1; i <= s2.length; i++) {
      const txt = s2.slice(0, i);
      at(() => setSearchText(txt), TYPE_SPEED);
    }
    at(() => {}, PAUSE_AFTER_TYPE);
    for (let i = s2.length - 1; i >= 0; i--) {
      const txt = s2.slice(0, i);
      at(() => setSearchText(txt), DELETE_SPEED);
    }
    at(() => {}, PAUSE_BETWEEN);

    // --- Sequence 3: type final ---
    const s3 = QUERIES[2];
    for (let i = 1; i <= s3.length; i++) {
      const txt = s3.slice(0, i);
      at(() => setSearchText(txt), TYPE_SPEED);
    }
    at(() => {}, 300);

    // --- Press Enter ---
    at(() => setSearchHighlight(true), 0);
    at(() => {
      setSearchHighlight(false);
      setFadeToWhite(true);
    }, 300);
    at(() => setShowLoadingBar(true), 300);
    at(() => {
      setShowLoadingBar(false);
      setShowResults(true);
    }, 500);

    // Show fake results briefly, then trigger glitch transition
    at(() => {
      setShowResults(false);
      setShowCursor(false);
      setShowGlitch(true);
    }, 1200);

    // After glitch plays (~1.4s), resolve into brand/hero
    at(() => {
      setShowGlitch(false);
      setShowBrand(true);
    }, 1400);

    // Hold brand for 2.5 seconds, then fade out
    at(() => {
      setShowBrand(false);
    }, 2500);

    // Wait for fade out transition, then reset and loop
    at(() => {
      setFadeToWhite(false);
    }, 400);

    at(() => {
      resetState();
    }, 600);

    // Restart
    at(() => {
      runAnimation();
    }, 600);
  }, [schedule, cleanup, resetState]);

  /* IntersectionObserver to start on scroll */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          runAnimation();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 2,
        backgroundColor: "#FAF9F7",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes chromeLoadBar {
          0% { width: 0; }
          100% { width: 100%; }
        }
        @keyframes brandGlow {
          0%, 100% { transform: scale(1); opacity: 0.08; }
          50% { transform: scale(1.1); opacity: 0.12; }
        }
        @keyframes glitchSlice {
          0% { clip-path: inset(0 0 100% 0); }
          5% { clip-path: inset(80% 0 0 0); }
          10% { clip-path: inset(10% 0 60% 0); }
          15% { clip-path: inset(40% 0 20% 0); }
          20% { clip-path: inset(0 0 70% 0); }
          25% { clip-path: inset(60% 0 10% 0); }
          30% { clip-path: inset(20% 0 40% 0); }
          35% { clip-path: inset(70% 0 5% 0); }
          40% { clip-path: inset(5% 0 80% 0); }
          45% { clip-path: inset(50% 0 30% 0); }
          50% { clip-path: inset(15% 0 50% 0); }
          55% { clip-path: inset(65% 0 15% 0); }
          60% { clip-path: inset(30% 0 35% 0); }
          65% { clip-path: inset(0 0 55% 0); }
          70% { clip-path: inset(45% 0 25% 0); }
          75% { clip-path: inset(75% 0 0 0); }
          80% { clip-path: inset(25% 0 45% 0); }
          85% { clip-path: inset(55% 0 20% 0); }
          90% { clip-path: inset(10% 0 30% 0); }
          95% { clip-path: inset(35% 0 10% 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes glitchShiftR {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(3px, -2px); }
          20% { transform: translate(-4px, 1px); }
          30% { transform: translate(2px, 3px); }
          40% { transform: translate(-3px, -1px); }
          50% { transform: translate(4px, 2px); }
          60% { transform: translate(-2px, -3px); }
          70% { transform: translate(3px, 1px); }
          80% { transform: translate(-1px, 2px); }
          90% { transform: translate(2px, -2px); }
        }
        @keyframes glitchShiftB {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-3px, 2px); }
          20% { transform: translate(4px, -1px); }
          30% { transform: translate(-2px, -3px); }
          40% { transform: translate(3px, 1px); }
          50% { transform: translate(-4px, -2px); }
          60% { transform: translate(2px, 3px); }
          70% { transform: translate(-3px, -1px); }
          80% { transform: translate(1px, -2px); }
          90% { transform: translate(-2px, 2px); }
        }
        @keyframes glitchFlicker {
          0% { opacity: 1; }
          5% { opacity: 0.6; }
          10% { opacity: 1; }
          15% { opacity: 0.3; }
          20% { opacity: 1; }
          25% { opacity: 0.8; }
          30% { opacity: 0.4; }
          35% { opacity: 1; }
          40% { opacity: 0.7; }
          45% { opacity: 1; }
          50% { opacity: 0.5; }
          55% { opacity: 0.9; }
          60% { opacity: 1; }
          65% { opacity: 0.6; }
          70% { opacity: 1; }
          75% { opacity: 0.8; }
          80% { opacity: 1; }
          85% { opacity: 0.4; }
          90% { opacity: 0.9; }
          95% { opacity: 1; }
          100% { opacity: 1; }
        }
        @keyframes scanlineMove {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes glitchNoise {
          0% { background-position: 0 0; }
          10% { background-position: -5% -10%; }
          20% { background-position: 10% 5%; }
          30% { background-position: -15% 15%; }
          40% { background-position: 5% -5%; }
          50% { background-position: -10% 10%; }
          60% { background-position: 15% 0; }
          70% { background-position: 0 15%; }
          80% { background-position: -5% -15%; }
          90% { background-position: 10% 5%; }
          100% { background-position: 0 0; }
        }
        @keyframes heroMaterialize {
          0% { opacity: 0; transform: scale(1.02); filter: brightness(1.8) blur(4px); }
          40% { opacity: 0.7; transform: scale(1.005); filter: brightness(1.2) blur(1px); }
          100% { opacity: 1; transform: scale(1); filter: brightness(1) blur(0); }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: isMobile ? "60vh" : "80vh",
          maxHeight: isMobile ? "80vh" : undefined,
          padding: isMobile ? "24px 16px" : "40px 24px",
          position: "relative",
        }}
      >
        {/* ---- Browser Frame ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            width: "100%",
            maxWidth: isMobile ? "100%" : 1000,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.08)",
            transform: isMobile
              ? "none"
              : "perspective(2000px) rotateX(1deg) rotateY(-0.5deg)",
          }}
        >
          {/* == Title Bar == */}
          <div
            style={{
              height: isMobile ? 32 : 38,
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              background: "#DEE1E6",
            }}
          >
            {/* Traffic lights */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 30% 30%, #FF8A80, #FF5F57)",
                  boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.15)",
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 30% 30%, #FFD98A, #FEBC2E)",
                  boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.15)",
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 30% 30%, #69F0AE, #28C840)",
                  boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.15)",
                }}
              />
            </div>
            {/* Tab */}
            <div
              style={{
                marginLeft: 12,
                height: isMobile ? 26 : 30,
                background: "#F1F3F4",
                borderRadius: "8px 8px 0 0",
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                alignSelf: "flex-end",
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  background: "#4285F4",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "white", fontSize: 7, fontWeight: 700 }}>G</span>
              </div>
              <span style={{ fontSize: 12, color: "#5F6368", whiteSpace: "nowrap" }}>Google</span>
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ marginLeft: 4, flexShrink: 0, cursor: "default" }}
              >
                <line x1="1" y1="1" x2="7" y2="7" />
                <line x1="7" y1="1" x2="1" y2="7" />
              </svg>
            </div>
          </div>

          {/* == Address Bar == */}
          <div
            style={{
              height: isMobile ? 36 : 40,
              background: "#F1F3F4",
              display: "flex",
              alignItems: "center",
              padding: isMobile ? "0 8px" : "0 12px",
              gap: isMobile ? 6 : 8,
            }}
          >
            {/* Navigation arrows (desktop) */}
            {!isMobile && (
              <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4v6h6" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
              </div>
            )}
            {/* URL bar */}
            <div
              style={{
                flex: 1,
                height: 32,
                background: "white",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                gap: 6,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span style={{ fontSize: 13, color: "#5F6368", fontFamily: "Arial, sans-serif" }}>google.com</span>
            </div>
            {/* Profile circle */}
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#C4C7CC", flexShrink: 0 }} />
            {/* Menu dots (desktop) */}
            {!isMobile && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#5F6368">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            )}
          </div>

          {/* == Bookmarks Bar (desktop only) == */}
          {!isMobile && (
            <div
              style={{
                height: 26,
                background: "#F1F3F4",
                display: "flex",
                alignItems: "center",
                padding: "0 14px",
                gap: 16,
                borderTop: "1px solid #DEE1E6",
              }}
            >
              <span style={{ fontSize: 11, color: "#5F6368" }}>Gmail</span>
              <span style={{ fontSize: 11, color: "#5F6368" }}>YouTube</span>
              <span style={{ fontSize: 11, color: "#5F6368" }}>Maps</span>
            </div>
          )}

          {/* == Content Area == */}
          <div
            style={{
              background: "white",
              position: "relative",
              minHeight: isMobile ? 350 : 480,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobile ? "32px 16px" : "50px 24px",
              overflow: "hidden",
            }}
          >
            {/* Loading bar */}
            {showLoadingBar && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, zIndex: 5 }}>
                <div
                  style={{
                    height: "100%",
                    background: "#4285F4",
                    animation: "chromeLoadBar 0.5s ease-in-out forwards",
                  }}
                />
              </div>
            )}

            {/* White fade overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "white",
                zIndex: 3,
                opacity: fadeToWhite ? 1 : 0,
                transition: "opacity 0.3s ease",
                pointerEvents: "none",
              }}
            />

            {/* Fake search results overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 4,
                background: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: isMobile ? "20px 16px" : "30px 50px",
                opacity: showResults ? 1 : 0,
                transition: "opacity 0.3s ease",
                pointerEvents: showResults ? "auto" : "none",
              }}
            >
              <div style={{ height: 14, background: "#1A0DAB", borderRadius: 3, marginBottom: 6, width: "55%", opacity: 0.15 }} />
              <div style={{ height: 10, background: "#006621", borderRadius: 3, marginBottom: 10, width: "35%", opacity: 0.12 }} />
              <div style={{ height: 8, background: "#E8E8E8", borderRadius: 3, marginBottom: 6, width: "80%" }} />
              <div style={{ height: 8, background: "#F0F0F0", borderRadius: 3, marginBottom: 20, width: "65%" }} />
              <div style={{ height: 14, background: "#1A0DAB", borderRadius: 3, marginBottom: 6, width: "50%", opacity: 0.15 }} />
              <div style={{ height: 10, background: "#006621", borderRadius: 3, marginBottom: 10, width: "40%", opacity: 0.12 }} />
              <div style={{ height: 8, background: "#E8E8E8", borderRadius: 3, width: "70%" }} />
            </div>

            {/* Glitch transition overlay */}
            {showGlitch && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 7,
                  background: "#0a0a0f",
                  animation: "glitchFlicker 1.4s steps(1) forwards",
                  overflow: "hidden",
                }}
              >
                {/* RGB channel shift - Red */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,0,0,0.4)",
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: isMobile ? 32 : 44,
                    fontWeight: 400,
                    mixBlendMode: "screen",
                    animation: "glitchShiftR 0.3s steps(2) infinite",
                  }}
                >
                  Urgen<span style={{ opacity: 0.8 }}>C</span>
                </div>
                {/* RGB channel shift - Blue */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(80,80,255,0.4)",
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: isMobile ? 32 : 44,
                    fontWeight: 400,
                    mixBlendMode: "screen",
                    animation: "glitchShiftB 0.25s steps(2) infinite",
                  }}
                >
                  Urgen<span style={{ opacity: 0.8 }}>C</span>
                </div>
                {/* Center text with clip-path glitch */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: isMobile ? 32 : 44,
                    fontWeight: 400,
                    animation: "glitchSlice 0.4s steps(1) infinite",
                  }}
                >
                  Urgen<span style={{ color: "#6366F1" }}>C</span>
                </div>
                {/* Scan lines overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                    pointerEvents: "none",
                    animation: "scanlineMove 0.8s linear infinite",
                  }}
                />
                {/* Noise grain texture */}
                <div
                  style={{
                    position: "absolute",
                    inset: "-50%",
                    width: "200%",
                    height: "200%",
                    background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                    opacity: 0.5,
                    mixBlendMode: "overlay",
                    animation: "glitchNoise 0.2s steps(3) infinite",
                    pointerEvents: "none",
                  }}
                />
                {/* Horizontal glitch bars */}
                <div
                  style={{
                    position: "absolute",
                    top: "20%",
                    left: 0,
                    right: 0,
                    height: "8%",
                    background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.15) 20%, rgba(139,92,246,0.2) 50%, rgba(99,102,241,0.15) 80%, transparent 100%)",
                    transform: "translateX(-10%)",
                    animation: "glitchShiftR 0.15s steps(1) infinite",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: 0,
                    right: 0,
                    height: "5%",
                    background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.1) 30%, rgba(139,92,246,0.15) 60%, transparent 100%)",
                    transform: "translateX(15%)",
                    animation: "glitchShiftB 0.2s steps(1) infinite",
                  }}
                />
              </div>
            )}

            {/* Brand reveal inside browser - mini hero */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 6,
                background:
                  "linear-gradient(180deg, #FAF9F7 0%, #F0EEFF 30%, #EDE9FE 50%, #F5F0FF 70%, #FAF9F7 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: showBrand ? 1 : 0,
                transition: "opacity 0.4s ease",
                pointerEvents: showBrand ? "auto" : "none",
                padding: isMobile ? "0 16px" : "0 24px",
                overflow: "hidden",
                animation: showBrand ? "heroMaterialize 0.6s ease-out forwards" : "none",
              }}
            >
              {/* Animated glow behind content */}
              <div
                style={{
                  position: "absolute",
                  width: isMobile ? 250 : 400,
                  height: isMobile ? 150 : 250,
                  borderRadius: "50%",
                  background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
                  animation: "brandGlow 3s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              />

              {/* Eyebrow */}
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: isMobile ? 10 : 12,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(99,102,241,0.6)",
                  marginBottom: isMobile ? 10 : 14,
                }}
              >
                Founding Cohort Coming Soon
              </span>

              {/* Main headline */}
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: isMobile ? 26 : 38,
                  color: "#0F172A",
                  fontWeight: 400,
                  textAlign: "center",
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                Where{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Real Ideas
                </span>
                <br />
                Meet{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Real Capital.
                </span>
              </h2>

              {/* Tagline */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: isMobile ? 11 : 14,
                  color: "#64748B",
                  marginTop: isMobile ? 8 : 12,
                  textAlign: "center",
                  maxWidth: 380,
                  lineHeight: 1.6,
                }}
              >
                The only fundraising app where meetings are guaranteed.
              </p>

              {/* Mini CTA button */}
              <div
                style={{
                  marginTop: isMobile ? 14 : 18,
                  padding: isMobile ? "8px 20px" : "10px 24px",
                  background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                  borderRadius: 8,
                  color: "white",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: isMobile ? 11 : 13,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
                }}
              >
                Join the Waitlist
              </div>

              {/* University crests row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? 10 : 16,
                  marginTop: isMobile ? 16 : 22,
                }}
              >
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: isMobile ? 9 : 11, color: "#94A3B8" }}>
                  Built in Boston
                </span>
                <div style={{ display: "flex", gap: isMobile ? 6 : 10, alignItems: "center" }}>
                  <div style={{ width: isMobile ? 22 : 28, height: isMobile ? 22 : 28, borderRadius: "50%", overflow: "hidden" }}>
                    <img src="/images/universities/bu-crest.png" alt="BU" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ width: isMobile ? 22 : 28, height: isMobile ? 22 : 28, borderRadius: "50%", overflow: "hidden" }}>
                    <img src="/images/universities/neu-crest.png" alt="NEU" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ width: isMobile ? 22 : 28, height: isMobile ? 22 : 28, borderRadius: "50%", overflow: "hidden" }}>
                    <img src="/images/universities/hbs-crest.png" alt="HBS" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                </div>
              </div>

              {/* Bottom gradient accent line */}
              <div
                style={{
                  width: 60,
                  height: 2,
                  background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
                  borderRadius: 1,
                  marginTop: isMobile ? 16 : 22,
                }}
              />
            </div>

            {/* Google Homepage */}
            <div
              style={{
                fontSize: isMobile ? 60 : 92,
                fontWeight: 400,
                fontFamily: "'Product Sans', Arial, sans-serif",
                marginBottom: isMobile ? 20 : 32,
                lineHeight: 1,
                userSelect: "none",
                letterSpacing: "-1px",
              }}
            >
              <span style={{ color: "#4285F4" }}>G</span>
              <span style={{ color: "#EA4335" }}>o</span>
              <span style={{ color: "#FBBC05" }}>o</span>
              <span style={{ color: "#4285F4" }}>g</span>
              <span style={{ color: "#34A853" }}>l</span>
              <span style={{ color: "#EA4335" }}>e</span>
            </div>

            {/* Search bar */}
            <div
              style={{
                width: isMobile ? "85%" : "70%",
                maxWidth: 600,
                height: isMobile ? 42 : 46,
                background: searchHighlight ? "#E8F0FE" : "white",
                border: "1px solid #DFE1E5",
                borderRadius: 24,
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                gap: 10,
                transition: "background 0.15s ease, box-shadow 0.15s ease",
                boxShadow: searchText
                  ? "0 1px 6px rgba(32,33,36,0.12)"
                  : "none",
              }}
            >
              {/* Search icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9AA0A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              {/* Text container with auto-scroll */}
              <div
                ref={textContainerRef}
                style={{
                  flex: 1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: isMobile ? 14 : 16,
                    color: "#202124",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {searchText}
                </span>
                {showCursor && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 1,
                      height: "1.2em",
                      background: cursorBlink ? "#202124" : "transparent",
                      marginLeft: 1,
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
              {/* Mic icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="#4285F4" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#34A853" />
              </svg>
              {/* Camera icon */}
              {!isMobile && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9AA0A6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </div>

            {/* Buttons */}
            {!isMobile && (
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button
                  style={{
                    background: "#F8F9FA",
                    border: "1px solid #F8F9FA",
                    borderRadius: 4,
                    fontSize: 14,
                    color: "#3C4043",
                    padding: "10px 20px",
                    cursor: "default",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Google Search
                </button>
                <button
                  style={{
                    background: "#F8F9FA",
                    border: "1px solid #F8F9FA",
                    borderRadius: 4,
                    fontSize: 14,
                    color: "#3C4043",
                    padding: "10px 20px",
                    cursor: "default",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  I&apos;m Feeling Lucky
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
