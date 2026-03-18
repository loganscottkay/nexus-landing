"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import IPhoneMockups from "@/components/IPhoneMockups";
import LottieAnimation from "@/components/LottieAnimation";
import HeroHeadline from "@/components/HeroHeadline";
import WhatMakesDifferentSection from "@/components/WhatMakesDifferentSection";
import TypewriterQuote from "@/components/TypewriterQuote";
import ConicGradientButton from "@/components/ConicGradientButton";

const ease = [0.25, 0.4, 0.25, 1] as const;
const smoothDecel = [0.16, 1, 0.3, 1] as const;

const sectionFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/* Tiered animation variants for choreographed section reveals */
const tierGradientBar = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1 },
};

const tierEyebrow = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const tierTitle = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const tierSubtitle = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const tierCard = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const tierCta = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const cardStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const viewportConfig = { once: true, amount: 0.2 as const };

/* ---- Animation Hooks ---- */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ---- Scroll Progress Bar ---- */
function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (barRef.current) {
          const h = document.documentElement.scrollHeight - window.innerHeight;
          const p = h > 0 ? Math.min(window.scrollY / h, 1) : 0;
          barRef.current.style.transform = `scaleX(${p})`;
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);
  return <div ref={barRef} className="scroll-progress-bar" style={{ transform: "scaleX(0)" }} />;
}

/* ---- Parallax Background Orbs ---- */
function ParallaxOrbs({ reduced }: { reduced: boolean }) {
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);
  const orb3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (orb1.current) orb1.current.style.transform = `translateY(${y * 0.05}px)`;
        if (orb2.current) orb2.current.style.transform = `translateY(${y * 0.08}px)`;
        if (orb3.current) orb3.current.style.transform = `translateY(${y * 0.03}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      <div ref={orb1} className="parallax-orb parallax-orb-1" />
      <div ref={orb2} className="parallax-orb parallax-orb-2" />
      <div ref={orb3} className="parallax-orb parallax-orb-3" />
    </div>
  );
}

/* ---- Section wrapper ---- */
function Section({
  children,
  className = "",
  id,
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.section
      id={id}
      variants={sectionFadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ duration: 0.5, ease }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}




/* ---- Small Arrow Icon ---- */
function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* Flow arrow SVG between cards (desktop only) */


const matchingSteps = [
  {
    num: "01",
    title: "Founders Pitch",
    label: "FOR FOUNDERS",
    labelColor: "#7C5CFC",
    desc: "Record a 60-second video pitch and upload your deck. The app scores you on five factors. Top 15% get accepted.",
    color: "#4A6CF7",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Investors Set Filters",
    label: "FOR INVESTORS",
    labelColor: "#4A6CF7",
    desc: "Choose your industries, stage preferences, and check size. Your daily feed only shows startups that match your criteria.",
    color: "#7C5CFC",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Swipe & Match",
    label: "BOTH SIDES",
    labelColor: "#059669",
    desc: "Investors browse and express interest. Founders see who is interested and accept or pass. Both say yes? It is a match.",
    color: "#059669",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Chemistry Call",
    label: "BOTH SIDES",
    labelColor: "#059669",
    desc: "Every match gets a 20-minute video call within 72 hours. One investor at a time through the queue system. No scheduling chaos.",
    color: "#059669",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    lottie: "/animations/chat-connect.json",
  },
];

/* ─── Hand-drawn SVG icons for sticky notes ─── */
const stickyIcons = [
  // Video camera (hand-drawn style)
  <svg key="cam" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23.2 7.1L16.1 11.8L22.8 17.1L23.2 7.1Z" />
    <path d="M1.2 5.3C1 5.8 0.9 6.2 1 6.8L1.1 17.2C1 18.1 1.8 19.1 2.8 19.2L14.2 19C15.2 19.1 16.1 18.2 16 17.1L16.1 6C16.2 5 15.3 4.9 14.3 5L2.8 4.8C2 4.9 1.3 5 1.2 5.3Z" />
  </svg>,
  // Sliders/filter (hand-drawn style)
  <svg key="sliders" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4.1" y1="21.2" x2="3.9" y2="14.1" />
    <line x1="4.2" y1="9.8" x2="3.8" y2="2.9" />
    <line x1="12.1" y1="21.1" x2="11.9" y2="12.2" />
    <line x1="12.2" y1="7.9" x2="11.8" y2="3.1" />
    <line x1="20.1" y1="20.8" x2="19.9" y2="16.1" />
    <line x1="20.2" y1="11.9" x2="19.8" y2="3.2" />
    <line x1="1.1" y1="14.2" x2="6.9" y2="13.8" />
    <line x1="9.2" y1="8.1" x2="14.8" y2="7.9" />
    <line x1="17.1" y1="16.2" x2="22.9" y2="15.8" />
  </svg>,
  // Checkmark (hand-drawn style)
  <svg key="check" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.1 6.2L9.2 17.1L3.9 11.8" />
    <circle cx="12" cy="12" r="10.5" strokeDasharray="3 3" opacity="0.3" />
  </svg>,
  // Phone (hand-drawn style)
  <svg key="phone" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.1 16.8v3.1a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6.1-5.9 19.8 19.8 0 01-3.1-8.7A2 2 0 014.2 2.1h2.9a2 2 0 012.1 1.7 12.8 12.8 0 00.7 2.8 2 2 0 01-.4 2.1L8.2 10a16 16 0 005.9 5.9l1.3-1.3a2 2 0 012.1-.4 12.8 12.8 0 002.8.7A2 2 0 0122.1 16.8z" />
  </svg>,
];

const stickyNoteColors = ['#FFF9C4', '#E8F5E9', '#E3F2FD', '#F3E5F5'];
const stickyNoteRotations = [-1, 0.5, -0.7, 1.2];

function MatchingFlowSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(3, prev + 1));
  }, []);

  return (
    <div className="scroll-stack-section w-full" style={{ position: 'relative', zIndex: 4, backgroundColor: '#FAF9F7', minHeight: '100vh', overflow: 'hidden' }}>
      <Section className="relative z-10 px-6 py-20 lg:pt-20 lg:pb-[100px] w-full" style={{}}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col items-center"
          >
            {/* Section header */}
            <motion.div
              variants={tierGradientBar}
              transition={{ duration: 0.4, delay: 0, ease }}
              style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #A855F7)', margin: '0 auto 16px auto', transformOrigin: 'center' }}
            />
            <motion.p
              variants={tierEyebrow}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="gradient-text text-[13px] tracking-[3px] uppercase mb-4"
              style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", fontWeight: 700 }}
            >
              The Matching Flow
            </motion.p>
            <motion.h2
              variants={tierTitle}
              transition={{ duration: 0.8, delay: 0.2, ease: smoothDecel }}
              className="text-[36px] md:text-[44px] font-normal text-center mb-4"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Swipe. Match. Meet.
            </motion.h2>
            <motion.p
              variants={tierSubtitle}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="text-center max-w-[600px] text-[17px] leading-[1.7] mb-16"
              style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              The complete flow from pitch to meeting.
            </motion.p>

            {/* Paper background container */}
            <motion.div
              variants={tierCard}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="w-full mx-auto"
              style={{ maxWidth: 800 }}
            >
              <div
                className="relative mx-auto"
                style={{
                  maxWidth: 800,
                  borderRadius: 12,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  padding: isMobile ? '24px 16px' : '40px',
                  background: '#FFF8E7',
                  overflow: 'hidden',
                  margin: isMobile ? '0 -8px' : undefined,
                }}
              >
                {/* Lined paper pattern */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                  <defs>
                    <pattern id="lined-paper" patternUnits="userSpaceOnUse" width="100%" height="28">
                      <line x1="0" y1="28" x2="100%" y2="28" stroke="rgba(180,160,140,0.2)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#lined-paper)" />
                </svg>

                {/* Vintage paper texture overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: `
                      radial-gradient(ellipse at 20% 30%, rgba(139,69,19,0.08) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 70%, rgba(139,69,19,0.06) 0%, transparent 50%),
                      radial-gradient(ellipse at 50% 10%, rgba(139,69,19,0.04) 0%, transparent 40%),
                      radial-gradient(ellipse at 10% 80%, rgba(139,69,19,0.05) 0%, transparent 45%)
                    `,
                  }}
                />

                {/* Noise texture overlay */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.15 }}>
                  <filter id="paper-noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#paper-noise)" />
                </svg>

                {/* Stacking slider area */}
                <div className="relative" style={{ minHeight: isMobile ? 300 : 320 }}>
                  {/* Stack of cards */}
                  <div
                    className="relative mx-auto"
                    style={{ width: '100%', maxWidth: isMobile ? '100%' : 380, height: isMobile ? 260 : 280 }}
                  >
                    {matchingSteps.map((step, idx) => {
                      const isActive = idx === currentSlide;
                      const isBehind = idx < currentSlide;
                      const isAhead = idx > currentSlide;
                      const stackOffset = (idx - currentSlide);

                      return (
                        <AnimatePresence key={idx} mode="popLayout">
                          {!isBehind && (
                            <motion.div
                              key={`card-${idx}`}
                              initial={isAhead ? { x: 300, opacity: 0 } : false}
                              animate={{
                                x: isActive ? 0 : (isMobile ? 0 : stackOffset * 15),
                                y: isActive ? 0 : stackOffset * 6,
                                opacity: isActive ? 1 : Math.max(0, 1 - stackOffset * 0.25),
                                scale: isActive ? 1 : 1 - stackOffset * 0.03,
                                rotate: isActive ? stickyNoteRotations[idx] : stickyNoteRotations[idx] * 0.5,
                              }}
                              exit={{ x: -300, opacity: 0 }}
                              transition={{ duration: 0.35, ease: 'easeInOut' }}
                              className="absolute inset-0"
                              style={{
                                width: '100%',
                                height: isMobile ? 260 : 280,
                                background: stickyNoteColors[idx],
                                borderRadius: 4,
                                boxShadow: '2px 4px 12px rgba(0,0,0,0.1)',
                                zIndex: 10 - stackOffset,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '24px 20px',
                                textAlign: 'center',
                              }}
                            >
                              {/* Tape element */}
                              <div
                                style={{
                                  position: 'absolute',
                                  top: -6,
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  width: 40,
                                  height: 12,
                                  background: 'rgba(255,255,255,0.6)',
                                  border: '1px solid rgba(200,200,200,0.4)',
                                  borderRadius: 1,
                                }}
                              />

                              {/* Hand-drawn icon */}
                              <div className="mb-3">
                                {stickyIcons[idx]}
                              </div>

                              {/* Label tag */}
                              <span
                                style={{
                                  fontSize: 10,
                                  letterSpacing: 2,
                                  textTransform: 'uppercase',
                                  color: '#1a1a1a',
                                  fontWeight: 600,
                                  fontFamily: "var(--font-dm-sans), sans-serif",
                                  marginBottom: 4,
                                }}
                              >
                                {step.label}
                              </span>

                              {/* Step number */}
                              <span
                                style={{
                                  fontFamily: "'Caveat', cursive",
                                  fontSize: 12,
                                  color: '#666',
                                  marginBottom: 6,
                                }}
                              >
                                STEP {step.num}
                              </span>

                              {/* Title */}
                              <h3
                                style={{
                                  fontFamily: "'Caveat', cursive",
                                  fontSize: 24,
                                  fontWeight: 700,
                                  color: '#1a1a1a',
                                  marginBottom: 8,
                                  lineHeight: 1.2,
                                }}
                              >
                                {step.title}
                              </h3>

                              {/* Hand-drawn underline decoration */}
                              <svg width="60" height="6" viewBox="0 0 60 6" style={{ marginBottom: 10 }}>
                                <path d="M2 4C10 2 20 3 30 2.5C40 2 50 3.5 58 2" stroke="#333" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3" />
                              </svg>

                              {/* Description */}
                              <p
                                style={{
                                  fontSize: 14,
                                  color: '#555',
                                  lineHeight: 1.6,
                                  fontFamily: "var(--font-dm-sans), sans-serif",
                                  maxWidth: 320,
                                }}
                              >
                                {step.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      );
                    })}
                  </div>
                </div>

                {/* Arrow buttons */}
                <div className="flex items-center justify-center gap-4 mt-8 relative z-20">
                  <button
                    onClick={goPrev}
                    disabled={currentSlide === 0}
                    aria-label="Previous step"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: '#fff',
                      border: '1px solid #e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: currentSlide === 0 ? 'default' : 'pointer',
                      opacity: currentSlide === 0 ? 0.3 : 1,
                      transition: 'opacity 0.2s, background 0.2s',
                    }}
                    onMouseEnter={(e) => { if (currentSlide !== 0) e.currentTarget.style.background = '#f3f3f3'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>

                  <span style={{ fontFamily: "'Caveat', cursive", fontSize: 16, color: '#666' }}>
                    {currentSlide + 1} / 4
                  </span>

                  <button
                    onClick={goNext}
                    disabled={currentSlide === 3}
                    aria-label="Next step"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: '#fff',
                      border: '1px solid #e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: currentSlide === 3 ? 'default' : 'pointer',
                      opacity: currentSlide === 3 ? 0.3 : 1,
                      transition: 'opacity 0.2s, background 0.2s',
                    }}
                    onMouseEnter={(e) => { if (currentSlide !== 3) e.currentTarget.style.background = '#f3f3f3'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}

/* ---- Scroll Down Indicator ---- */
function ScrollDownIndicator() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (elRef.current) {
          elRef.current.style.opacity = window.scrollY > 200 ? "0" : "1";
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <motion.div
      ref={elRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 2.2 }}
      className="mt-6 flex justify-center"
      style={{ transition: "opacity 0.3s ease" }}
    >
      <LottieAnimation
        src="/animations/scroll-down.json"
        loop={true}
        className="lottie-brand-subtle w-[30px] h-[45px] md:w-[40px] md:h-[60px]"
      />
    </motion.div>
  );
}

/* ---- Main Page ---- */
export default function Home() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <main className="relative min-h-screen bg-base text-text-primary overflow-x-clip">
      {/* Scroll progress indicator */}
      <ScrollProgressBar />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Parallax background orbs */}
      <ParallaxOrbs reduced={prefersReduced} />


      <Navbar />

      {/* ============ HERO ============ */}
      <section className="scroll-stack-section relative z-10 pt-[150px] lg:pt-[220px] pb-[80px] lg:pb-[50px]" style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#FAF9F7', minHeight: '100vh', overflow: 'hidden' }}>
        {/* Subtle abstract landscape-depth gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: -1,
            background: `
              linear-gradient(180deg,
                rgba(250,249,247,1) 0%,
                rgba(237,233,254,0.15) 30%,
                rgba(219,234,254,0.12) 50%,
                rgba(220,252,231,0.08) 70%,
                rgba(250,249,247,1) 100%
              )
            `,
          }}
        />
        {/* Luminous radial glow behind headline */}
        <div
          className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: '1000px',
            height: '600px',
            background: 'radial-gradient(ellipse 500px 300px at 50% 50%, rgba(99,102,241,0.05), transparent)',
            zIndex: -1,
          }}
        />
        {/* Desktop bottom gradient fade */}
        <div
          className="hidden lg:block absolute bottom-0 left-0 right-0 h-[60px] pointer-events-none z-20"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.02))" }}
        />
        {/* Centered hero text */}
        <div className="flex flex-col items-center justify-center text-center px-6 max-w-[700px] lg:max-w-[900px] mx-auto relative z-10">
          <div className="flex flex-col items-center w-full">
            {/* Eyebrow - DM Sans uppercase, first to appear */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease }}
              className="text-[10px] md:text-[12px] tracking-[3px] md:tracking-[5px] uppercase mb-6"
              style={{ color: "rgba(99,102,241,0.6)", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", fontWeight: 700 }}
            >
              Founding Cohort Coming Soon
            </motion.p>

            {/* Headline - letter-by-letter stagger reveal */}
            <HeroHeadline
              lines={[
                [
                  { text: "Where ", isGradient: false },
                  { text: "Real Ideas", isGradient: true },
                ],
                [
                  { text: "Meet ", isGradient: false },
                  { text: "Real Capital.", isGradient: true },
                ],
              ]}
              prefersReduced={prefersReduced}
            />

            {/* Subtitle - staggered line reveals with parallax */}
            <div
              className="mb-12"
            >
              <div
                className="text-[12.5px] md:text-[16px] max-w-full px-2 md:max-w-[600px] md:px-0 leading-[1.8] md:leading-[2.0] text-center"
                style={{ color: "#475569", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {[
                  <>The only fundraising app where meetings are guaranteed.</>,
                  <>Founders pitch. Investors swipe.</>,
                  <>Mutual interest unlocks a guaranteed meeting&mdash;no cold emails, no ghosting.</>,
                ].map((line, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + i * 0.12, ease }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTA - scale bounce entrance + magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex justify-center"
            >
              <ConicGradientButton
                href="/waitlist"
                className="group btn-shimmer btn-auto-shimmer btn-hero-glow inline-flex items-center justify-center gap-2 px-11 py-[18px] text-[16px] md:text-[17px] font-semibold text-white rounded-2xl"
                style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 20px rgba(74,108,247,0.2)" }}
                borderRadius="1rem"
              >
                Join the Waitlist
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </ConicGradientButton>
            </motion.div>

            {/* Credibility strip */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "100%", margin: "36px auto 20px", padding: 0 }}>
              <div className="crest-row" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4rem", width: "100%", maxWidth: "100%", margin: "0 auto", padding: 0 }}>
                {/* BU Crest */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.8, ease }}
                  className="crest-item"
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", width: "80px", height: "95px", margin: 0, padding: 0 }}
                >
                  <div className="crest-circle transition-transform duration-300 md:hover:scale-[1.08] cursor-pointer" style={{ width: "55px", height: "55px", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img
                      src="/images/universities/bu-crest.png"
                      alt="Boston University"
                      className="crest-img"
                      style={{ width: "55px", height: "55px", objectFit: "cover", mixBlendMode: "multiply" }}
                    />
                  </div>
                  <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#475569", marginTop: "8px", textAlign: "center" }}>
                    BU
                  </span>
                </motion.div>

                {/* NEU Crest */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.9, ease }}
                  className="crest-item"
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", width: "80px", height: "95px", margin: 0, padding: 0 }}
                >
                  <div className="crest-circle transition-transform duration-300 md:hover:scale-[1.08] cursor-pointer" style={{ width: "55px", height: "55px", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img
                      src="/images/universities/neu-crest.png"
                      alt="Northeastern University"
                      className="crest-img"
                      style={{ width: "55px", height: "55px", objectFit: "contain", mixBlendMode: "multiply" }}
                    />
                  </div>
                  <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#475569", marginTop: "8px", textAlign: "center" }}>
                    NEU
                  </span>
                </motion.div>

                {/* HBS Crest */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 2.0, ease }}
                  className="crest-item crest-item-hbs"
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", width: "80px", height: "95px", margin: 0, padding: 0 }}
                >
                  <div className="crest-circle crest-circle-hbs transition-transform duration-300 md:hover:scale-[1.08] cursor-pointer" style={{ width: "74px", height: "74px", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "9px" }}>
                    <img
                      src="/images/universities/hbs-crest.png"
                      alt="Harvard Business School"
                      className="crest-img crest-img-hbs"
                      style={{ width: "74px", height: "74px", objectFit: "contain", mixBlendMode: "multiply", marginTop: "10px" }}
                    />
                  </div>
                  <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#475569", marginTop: "8px", textAlign: "center" }}>
                    HBS
                  </span>
                </motion.div>
              </div>

              {/* Built in Boston */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 2.2, ease }}
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontSize: "15px",
                  color: "#64748B",
                  letterSpacing: "0.5px",
                  marginTop: "20px",
                  width: "100%",
                  textAlign: "center",
                  padding: 0,
                }}
              >
                Built in Boston
              </motion.p>
            </div>

            {/* Scroll-down indicator */}
            <ScrollDownIndicator />
          </div>
        </div>
      </section>

      {/* ============ NARRATIVE HOOK ============ */}
      <TypewriterQuote />

      {/* ============ HOW MATCHING WORKS ============ */}
      <MatchingFlowSection />

      {/* ============ WHAT MAKES URGENC DIFFERENT ============ */}
      <WhatMakesDifferentSection />

      {/* ============ IPHONE MOCKUPS ============ */}
      <div className="scroll-stack-section lg:pb-[100px] w-full" style={{ position: 'relative', zIndex: 5, backgroundColor: '#FAF9F7', minHeight: '100vh', overflow: 'hidden' }}>
        <IPhoneMockups />
      </div>

      {/* ============ FINAL CTA ============ */}
      <div className="scroll-stack-section w-full" style={{ position: 'relative', zIndex: 6, backgroundColor: '#FAF9F7' }}>
      <Section className="relative z-10 w-full flex items-center justify-center py-20 md:py-10" style={{}}>
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center text-center px-6"
        >
          <motion.div
            variants={tierGradientBar}
            transition={{ duration: 0.4, delay: 0, ease }}
            style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #A855F7)', margin: '0 auto 16px auto', transformOrigin: 'center' }}
          />
          <motion.h2
            variants={tierTitle}
            transition={{ duration: 0.8, delay: 0.2, ease: smoothDecel }}
            className="text-[40px] font-normal text-center"
            style={{ fontFamily: "'Instrument Serif', serif", color: "#0F172A" }}
          >
            Ready to Join the <span className="gradient-text-animate">Network</span>?
          </motion.h2>

          <motion.p
            variants={tierSubtitle}
            transition={{ duration: 0.5, delay: 0.4, ease }}
            className="text-[17px] leading-[1.7] mt-4 max-w-[520px] mx-auto"
            style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Founding cohort coming soon. Join the waitlist to be first in line when we launch.
          </motion.p>

          <motion.div
            variants={tierCta}
            transition={{ duration: 0.4, delay: 0.8, ease }}
            className="mt-8"
          >
            <ConicGradientButton
              href="/waitlist"
              className="group btn-shimmer btn-auto-shimmer btn-hero-glow inline-flex items-center justify-center gap-2 px-10 py-4 text-[16px] font-semibold text-white rounded-full transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(74,108,247,0.25)]"
              style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)", fontFamily: "var(--font-dm-sans), sans-serif" }}
              borderRadius="9999px"
            >
              Join the Waitlist &rarr;
            </ConicGradientButton>
          </motion.div>
        </motion.div>
      </Section>
      </div>

      {/* ============ FOOTER ============ */}
      <footer
        className="relative w-full"
        style={{
          zIndex: 6,
          background: "#ffffff",
          borderTop: "1px solid rgba(99,102,241,0.08)",
        }}
      >
        <style>{`
          .footer-link {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 10px;
            background: linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(240,240,245,0.8) 100%);
            border: 1px solid rgba(99,102,241,0.08);
            box-shadow: 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8);
            font-size: 13px;
            font-weight: 500;
            color: #475569;
            font-family: var(--font-dm-sans), sans-serif;
            transition: all 0.2s ease;
            text-decoration: none;
          }
          .footer-link:hover {
            background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,250,0.95) 100%);
            box-shadow: 0 4px 12px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9);
            transform: translateY(-1px);
            color: #6366F1;
          }
        `}</style>

        <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-[48px] pb-[40px] md:pt-[80px] md:pb-[60px]">

          {/* MOBILE layout */}
          <div className="flex flex-col items-center text-center md:hidden">
            {/* Brand */}
            <div className="mb-[32px]">
              <Link
                href="/"
                className="text-[28px] font-normal"
                style={{ fontFamily: "'Instrument Serif', serif", color: "#0F172A" }}
              >
                UrgenC
              </Link>
              <p className="text-[14px] mt-1.5" style={{ color: "#6366F1", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500 }}>
                Where Real Ideas Meet Real Capital.
              </p>
            </div>

            {/* Product */}
            <div className="mb-[28px]">
              <h4
                className="uppercase mb-3"
                style={{ letterSpacing: "2px", fontWeight: 700, color: "#0F172A", fontSize: "11px", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Product
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                <Link href="/waitlist" className="footer-link">
                  Join the Waitlist
                </Link>
                <Link href="/qualifications/startup" className="footer-link">
                  Startup Qualifications
                </Link>
                <Link href="/qualifications/investor" className="footer-link">
                  Investor Qualifications
                </Link>
              </div>
            </div>

            {/* Company */}
            <div className="mb-[28px]">
              <h4
                className="uppercase mb-3"
                style={{ letterSpacing: "2px", fontWeight: 700, color: "#0F172A", fontSize: "11px", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Company
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                <Link href="/story" className="footer-link">
                  About
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div className="mb-[28px]">
              <h4
                className="uppercase mb-3"
                style={{ letterSpacing: "2px", fontWeight: 700, color: "#0F172A", fontSize: "11px", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Legal
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="footer-link" style={{ cursor: "default" }}>
                  Terms of Service
                </span>
                <span className="footer-link" style={{ cursor: "default" }}>
                  Privacy Policy
                </span>
              </div>
            </div>

            {/* Disclaimer + Copyright */}
            <div style={{ borderTop: "1px solid rgba(99,102,241,0.06)", paddingTop: "24px", marginTop: "4px", width: "100%" }}>
              <p className="text-center px-4 leading-[1.6]" style={{ fontSize: "12px", color: "#A0AEC0", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                UrgenC is a matching and meeting platform. We do not provide investment advice, facilitate financial transactions, or act as a broker-dealer. All investment decisions and transactions occur off-platform between the parties involved.
              </p>
              <p className="text-center mt-4" style={{ fontSize: "12px", color: "#A0AEC0", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                &copy; 2026 UrgenC. All rights reserved.
              </p>
            </div>
          </div>

          {/* DESKTOP layout: 4-column grid */}
          <div className="hidden md:grid grid-cols-4 gap-8">
            {/* Column 1 - Brand */}
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-[32px] font-normal"
                style={{ fontFamily: "'Instrument Serif', serif", color: "#0F172A" }}
              >
                UrgenC
              </Link>
              <p className="text-[14px]" style={{ color: "#6366F1", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500, maxWidth: "220px" }}>
                Where Real Ideas Meet Real Capital.
              </p>
            </div>

            {/* Column 2 - Product */}
            <div className="flex flex-col">
              <h4
                className="uppercase mb-4"
                style={{ letterSpacing: "2px", fontWeight: 700, color: "#0F172A", fontSize: "11px", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Product
              </h4>
              <div className="flex flex-wrap gap-2">
                <Link href="/waitlist" className="footer-link">
                  Join the Waitlist
                </Link>
                <Link href="/qualifications/startup" className="footer-link">
                  Startup Qualifications
                </Link>
                <Link href="/qualifications/investor" className="footer-link">
                  Investor Qualifications
                </Link>
              </div>
            </div>

            {/* Column 3 - Company */}
            <div className="flex flex-col">
              <h4
                className="uppercase mb-4"
                style={{ letterSpacing: "2px", fontWeight: 700, color: "#0F172A", fontSize: "11px", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Company
              </h4>
              <div className="flex flex-wrap gap-2">
                <Link href="/story" className="footer-link">
                  About
                </Link>
              </div>
            </div>

            {/* Column 4 - Legal */}
            <div className="flex flex-col">
              <h4
                className="uppercase mb-4"
                style={{ letterSpacing: "2px", fontWeight: 700, color: "#0F172A", fontSize: "11px", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Legal
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="footer-link" style={{ cursor: "default" }}>
                  Terms of Service
                </span>
                <span className="footer-link" style={{ cursor: "default" }}>
                  Privacy Policy
                </span>
              </div>
            </div>
          </div>

          {/* Divider + Disclaimer + Copyright (desktop) */}
          <div className="hidden md:block mt-12" style={{ borderTop: "1px solid rgba(99,102,241,0.06)", paddingTop: "32px" }}>
            <p className="text-center max-w-[700px] mx-auto leading-[1.6]" style={{ fontSize: "12px", color: "#A0AEC0", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              UrgenC is a matching and meeting platform. We do not provide investment advice, facilitate financial transactions, or act as a broker-dealer. All investment decisions and transactions occur off-platform between the parties involved.
            </p>
            <p className="text-center mt-4" style={{ fontSize: "12px", color: "#A0AEC0", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              &copy; 2026 UrgenC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
