"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import UnicornSVG from "./UnicornSVG";
import PlejjLogo from "./PlejjLogo";

/* ---- Config ---- */
const TYPE_SPEED = 27;
const DELETE_SPEED = 14;
const PAUSE_AFTER_TYPE = 400;
const PAUSE_BETWEEN = 250;

const SPARKLE_COLORS = ["#F5D76E", "#7C5CFC", "#4A6CF7", "#F5D76E", "#7C5CFC", "#4A6CF7", "#F5D76E", "#7C5CFC"];

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

    // Show fake results briefly, then show brand and stay
    at(() => {
      setShowResults(false);
      setShowCursor(false);
      setShowBrand(true);
    }, 1200);
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
        /* Unicorn animations for browser mockup */
        .cb-unicorn-left {
          position: relative;
          display: inline-block;
          opacity: 0;
          animation: cbFadeIn 0.2s ease-out 0.3s forwards, cbRunLeft 4s linear 0.3s forwards;
        }
        .cb-unicorn-right {
          position: absolute;
          right: 0;
          display: inline-block;
          opacity: 0;
          animation: cbFadeIn 0.2s ease-out 0.3s forwards, cbRunRight 4s linear 0.3s forwards;
        }
        @keyframes cbFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes cbRunLeft {
          0% { transform: translateX(-80px); }
          100% { transform: translateX(calc(100vw + 80px)); }
        }
        @keyframes cbRunRight {
          0% { transform: translateX(80px); }
          100% { transform: translateX(calc(-100vw - 80px)); }
        }
        .cb-sparkle {
          position: absolute;
          opacity: 0;
          animation: cbSparkleFade 1s ease-out infinite;
        }
        @keyframes cbSparkleFade {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-12px); }
        }
        .cb-leg-fl { animation: cbLegF 0.3s ease-in-out infinite; transform-origin: center top; }
        .cb-leg-fr { animation: cbLegF 0.3s ease-in-out infinite 0.15s; transform-origin: center top; }
        .cb-leg-bl { animation: cbLegB 0.3s ease-in-out infinite; transform-origin: center top; }
        .cb-leg-br { animation: cbLegB 0.3s ease-in-out infinite 0.15s; transform-origin: center top; }
        @keyframes cbLegF {
          0% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
          100% { transform: rotate(-15deg); }
        }
        @keyframes cbLegB {
          0% { transform: rotate(15deg); }
          50% { transform: rotate(-15deg); }
          100% { transform: rotate(15deg); }
        }
        .cb-unicorn-mane {
          animation: cbMane 0.3s ease-in-out infinite alternate;
        }
        @keyframes cbMane {
          0% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }
        .cbL-horn-sparkle, .cbR-horn-sparkle {
          animation: cbHornSparkle 1.5s ease-in-out infinite;
        }
        @keyframes cbHornSparkle {
          0%, 100% { opacity: 0.6; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes brandRevealIn {
          0% { opacity: 0; transform: scale(1.03); filter: blur(6px) brightness(1.4); }
          50% { opacity: 0.8; transform: scale(1.01); filter: blur(1px) brightness(1.1); }
          100% { opacity: 1; transform: scale(1); filter: blur(0) brightness(1); }
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
              <span style={{ fontSize: 13, color: "#5F6368", fontFamily: "Arial, sans-serif" }}>{showBrand ? "plejj.app" : "google.com"}</span>
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

            {/* Brand reveal - premium cinematic moment */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 6,
                background:
                  "linear-gradient(180deg, #FAF9F7 0%, #F0EEFF 25%, #EDE9FE 45%, #F0EEFF 65%, #FAF9F7 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: showBrand ? 1 : 0,
                transition: "opacity 0.5s ease",
                pointerEvents: showBrand ? "auto" : "none",
                padding: isMobile ? "0 16px" : "0 24px",
                overflow: "hidden",
                animation: showBrand ? "brandRevealIn 0.8s cubic-bezier(0.25, 0.4, 0.25, 1) forwards" : "none",
              }}
            >
              {/* Large soft radial glow behind logo */}
              <div
                style={{
                  position: "absolute",
                  width: isMobile ? 300 : 500,
                  height: isMobile ? 300 : 500,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
                  animation: "brandGlow 4s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              />
              {/* Secondary warm glow */}
              <div
                style={{
                  position: "absolute",
                  width: isMobile ? 200 : 350,
                  height: isMobile ? 120 : 200,
                  borderRadius: "50%",
                  background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)",
                  transform: "translateY(-20px)",
                  pointerEvents: "none",
                }}
              />

              {/* Logo - large and properly styled */}
              <h2
                style={{
                  textAlign: "center",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                <PlejjLogo size={isMobile ? 48 : 72} />
              </h2>

              {/* Tagline */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: isMobile ? 12 : 16,
                  color: "#2D2D2D",
                  marginTop: isMobile ? 10 : 16,
                  textAlign: "center",
                  maxWidth: 400,
                  lineHeight: 1.7,
                  letterSpacing: "0.01em",
                }}
              >
                Where the only thing between your idea and capital is a 60-second pitch.
              </p>

              {/* Unicorn animations */}
              {showBrand && (
                <>
                  {/* Left unicorn - runs left to right */}
                  <div
                    className="cb-unicorn-track"
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: isMobile ? 20 : 40,
                      width: "100%",
                      height: "80px",
                      overflow: "hidden",
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  >
                    <div className="cb-unicorn-left" style={{ willChange: "transform" }}>
                      {SPARKLE_COLORS.map((color, i) => (
                        <div
                          key={i}
                          className="cb-sparkle"
                          style={{
                            animationDelay: `${i * 0.25}s`,
                            left: `${-8 - i * 8}px`,
                            top: `${20 + (i % 3) * 5}px`,
                          }}
                        >
                          <div
                            style={{
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              background: color,
                            }}
                          />
                        </div>
                      ))}
                      <UnicornSVG
                        size={isMobile ? 50 : 60}
                        prefix="cbL"
                        maneClass="cb-unicorn-mane"
                        legClasses={{ fl: "cb-leg-fl", fr: "cb-leg-fr", bl: "cb-leg-bl", br: "cb-leg-br" }}
                      />
                    </div>
                  </div>

                  {/* Right unicorn - runs right to left (mirrored) */}
                  <div
                    className="cb-unicorn-track"
                    style={{
                      position: "absolute",
                      right: 0,
                      bottom: isMobile ? 20 : 40,
                      width: "100%",
                      height: "80px",
                      overflow: "hidden",
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  >
                    <div className="cb-unicorn-right" style={{ willChange: "transform" }}>
                      {SPARKLE_COLORS.map((color, i) => (
                        <div
                          key={i}
                          className="cb-sparkle"
                          style={{
                            animationDelay: `${i * 0.25}s`,
                            right: `${-8 - i * 8}px`,
                            top: `${20 + (i % 3) * 5}px`,
                          }}
                        >
                          <div
                            style={{
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              background: color,
                            }}
                          />
                        </div>
                      ))}
                      <div style={{ transform: "scaleX(-1)" }}>
                        <UnicornSVG
                          size={isMobile ? 50 : 60}
                          prefix="cbR"
                          maneClass="cb-unicorn-mane"
                          legClasses={{ fl: "cb-leg-fl", fr: "cb-leg-fr", bl: "cb-leg-bl", br: "cb-leg-br" }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
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
