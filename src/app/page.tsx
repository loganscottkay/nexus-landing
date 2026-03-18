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

function MatchingFlowSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const labelColors: Record<string, { bg: string; text: string }> = {
    "FOR FOUNDERS": { bg: "rgba(99, 102, 241, 0.15)", text: "#818CF8" },
    "FOR INVESTORS": { bg: "rgba(99, 102, 241, 0.15)", text: "#A78BFA" },
    "BOTH SIDES": { bg: "rgba(16, 185, 129, 0.15)", text: "#34D399" },
  };

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 5000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const goTo = useCallback((dir: number) => {
    setCurrentSlide((prev) => (prev + dir + 4) % 4);
    resetTimer();
  }, [resetTimer]);

  const step = matchingSteps[currentSlide];

  // SVG icons with gradient stroke for the TV slides
  const tvIcons = [
    <svg key="cam" width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="tvIconGrad1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6366F1" /><stop offset="50%" stopColor="#A78BFA" /><stop offset="100%" stopColor="#8B5CF6" /></linearGradient></defs><polygon points="23 7 16 12 23 17 23 7" stroke="url(#tvIconGrad1)" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="url(#tvIconGrad1)" /></svg>,
    <svg key="sliders" width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="tvIconGrad2" x1="0" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#6366F1" /><stop offset="50%" stopColor="#A78BFA" /><stop offset="100%" stopColor="#8B5CF6" /></linearGradient></defs><line x1="4" y1="21" x2="4" y2="14" stroke="url(#tvIconGrad2)" /><line x1="4" y1="10" x2="4" y2="3" stroke="url(#tvIconGrad2)" /><line x1="12" y1="21" x2="12" y2="12" stroke="url(#tvIconGrad2)" /><line x1="12" y1="8" x2="12" y2="3" stroke="url(#tvIconGrad2)" /><line x1="20" y1="21" x2="20" y2="16" stroke="url(#tvIconGrad2)" /><line x1="20" y1="12" x2="20" y2="3" stroke="url(#tvIconGrad2)" /><line x1="1" y1="14" x2="7" y2="14" stroke="url(#tvIconGrad2)" /><line x1="9" y1="8" x2="15" y2="8" stroke="url(#tvIconGrad2)" /><line x1="17" y1="16" x2="23" y2="16" stroke="url(#tvIconGrad2)" /></svg>,
    <svg key="check" width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="tvIconGrad3" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6366F1" /><stop offset="50%" stopColor="#A78BFA" /><stop offset="100%" stopColor="#8B5CF6" /></linearGradient></defs><polyline points="20 6 9 17 4 12" stroke="url(#tvIconGrad3)" /></svg>,
    <svg key="phone" width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="tvIconGrad4" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6366F1" /><stop offset="50%" stopColor="#A78BFA" /><stop offset="100%" stopColor="#8B5CF6" /></linearGradient></defs><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="url(#tvIconGrad4)" /></svg>,
  ];

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

            {/* Retro TV frame */}
            <motion.div
              variants={tierCard}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="w-full mx-auto"
              style={{ maxWidth: 700 }}
            >
              <div
                style={{
                  borderRadius: 12,
                  border: '3px solid #1a1a2e',
                  background: '#0F0F1A',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Title bar */}
                <div
                  className="flex items-center justify-center relative"
                  style={{
                    height: 36,
                    background: 'repeating-linear-gradient(0deg, #1a1a2e 0px, #1a1a2e 2px, #12122a 2px, #12122a 4px)',
                  }}
                >
                  {/* Small square button left */}
                  <div
                    className="absolute left-3"
                    style={{
                      width: 12,
                      height: 12,
                      border: '1.5px solid #2a2a4a',
                      borderRadius: 2,
                      background: '#0F0F1A',
                    }}
                  />
                  {/* Title pill */}
                  <div
                    style={{
                      padding: '2px 14px',
                      border: '1px solid #2a2a4a',
                      borderRadius: 9999,
                      fontFamily: 'monospace',
                      fontSize: 10,
                      color: '#c0c0e0',
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                    }}
                  >
                    The Matching Flow
                  </div>
                </div>

                {/* Screen area */}
                <div
                  style={{
                    margin: 6,
                    border: '2px solid #2a2a4a',
                    borderRadius: 4,
                    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)',
                    background: '#0F0F1A',
                    minHeight: 300,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="flex flex-col items-center justify-center text-center px-6 py-10 md:px-10 md:py-10"
                    >
                      {/* Icon */}
                      <div className="mb-5">
                        {tvIcons[currentSlide]}
                      </div>

                      {/* Label pill */}
                      <span
                        className="inline-block rounded-full px-3 py-1 text-[10px] tracking-[2px] uppercase font-medium mb-4"
                        style={{
                          background: labelColors[step.label]?.bg || 'rgba(99,102,241,0.15)',
                          color: labelColors[step.label]?.text || '#818CF8',
                        }}
                      >
                        {step.label}
                      </span>

                      {/* Step number */}
                      <p
                        style={{
                          fontFamily: 'monospace',
                          fontSize: 11,
                          color: 'rgba(255,255,255,0.4)',
                          letterSpacing: 2,
                          marginBottom: 8,
                          textTransform: 'uppercase',
                        }}
                      >
                        Step {step.num}
                      </p>

                      {/* Animated gradient title */}
                      <h3
                        className="tv-gradient-title mb-4"
                        style={{
                          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                          fontSize: 28,
                          fontWeight: 700,
                        }}
                      >
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p
                        style={{
                          color: 'rgba(255,255,255,0.6)',
                          fontSize: 15,
                          lineHeight: 1.7,
                          maxWidth: 480,
                        }}
                      >
                        {step.desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom control bar */}
                <div
                  className="flex items-center justify-between px-4"
                  style={{
                    height: 46,
                    background: 'repeating-linear-gradient(0deg, #1a1a2e 0px, #1a1a2e 2px, #12122a 2px, #12122a 4px)',
                  }}
                >
                  {/* Prev button */}
                  <button
                    onClick={() => goTo(-1)}
                    aria-label="Previous step"
                    style={{
                      width: 30,
                      height: 24,
                      border: '1.5px solid #2a2a4a',
                      borderRadius: 3,
                      background: '#0F0F1A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c0c0e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>

                  {/* Counter */}
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 12,
                      color: '#c0c0e0',
                      letterSpacing: 1,
                    }}
                  >
                    {currentSlide + 1}/4
                  </span>

                  {/* Next button */}
                  <button
                    onClick={() => goTo(1)}
                    aria-label="Next step"
                    style={{
                      width: 30,
                      height: 24,
                      border: '1.5px solid #2a2a4a',
                      borderRadius: 3,
                      background: '#0F0F1A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c0c0e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
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

      {/* Background gradient blobs */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      >
        <div className="blob blob-blue animate-blob-1 -top-[5%] right-[10%]" />
        <div className="blob blob-lavender animate-blob-2 top-[40%] -left-[5%]" />
        <div className="blob blob-peach animate-blob-3 bottom-[10%] right-[20%]" />
      </div>

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
      <div className="scroll-stack-section w-full" style={{ position: 'relative', zIndex: 6, backgroundColor: '#FAF9F7', minHeight: '100vh' }}>
      <Section className="relative z-10 w-full flex items-center justify-center py-20" style={{}}>
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
      <footer className="relative w-full" style={{ zIndex: 6, backgroundColor: '#FAF9F7', borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        {/* Subtle gradient accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent 20%, rgba(99,102,241,0.2) 50%, transparent 80%)" }}
        />
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-[48px] pb-[40px] md:pt-[80px] md:pb-[60px]">

          {/* MOBILE layout: single column, centered, stacked */}
          <div className="flex flex-col items-center text-center md:hidden">
            {/* Brand */}
            <div className="mb-[28px]">
              <Link
                href="/"
                className="text-[24px] font-normal"
                style={{ fontFamily: "'Instrument Serif', serif", color: "#0F172A" }}
              >
                UrgenC
              </Link>
              <p className="text-[13px] mt-1" style={{ color: "#94A3B8", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                Where Real Ideas Meet Real Capital.
              </p>
            </div>

            {/* Product */}
            <div className="mb-[28px]">
              <h4
                className="text-[12px] font-semibold uppercase mb-3"
                style={{ letterSpacing: "2px", color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Product
              </h4>
              <div className="flex flex-col">
                <Link href="/waitlist" className="text-[15px] transition-colors duration-200 hover:text-[#6366F1]" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: "2.0" }}>
                  Join the Waitlist
                </Link>
                <Link href="/qualifications/startup" className="text-[15px] transition-colors duration-200 hover:text-[#6366F1]" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: "2.0" }}>
                  Startup Qualifications
                </Link>
                <Link href="/qualifications/investor" className="text-[15px] transition-colors duration-200 hover:text-[#6366F1]" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: "2.0" }}>
                  Investor Qualifications
                </Link>
              </div>
            </div>

            {/* Company */}
            <div className="mb-[28px]">
              <h4
                className="text-[12px] font-semibold uppercase mb-3"
                style={{ letterSpacing: "2px", color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Company
              </h4>
              <div className="flex flex-col">
                <Link href="/story" className="text-[15px] transition-colors duration-200 hover:text-[#6366F1]" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: "2.0" }}>
                  About
                </Link>
                <a href="mailto:hello@urgenc.com" className="text-[15px] transition-colors duration-200 hover:text-[#6366F1]" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: "2.0" }}>
                  Contact
                </a>
              </div>
            </div>

            {/* Legal */}
            <div className="mb-[28px]">
              <h4
                className="text-[12px] font-semibold uppercase mb-3"
                style={{ letterSpacing: "2px", color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Legal
              </h4>
              <div className="flex flex-col">
                <span className="text-[15px]" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: "2.0" }}>
                  Terms of Service
                </span>
                <span className="text-[15px]" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: "2.0" }}>
                  Privacy Policy
                </span>
              </div>
            </div>

            {/* Disclaimer + Copyright */}
            <p className="text-[12px] text-center px-4 leading-[1.6]" style={{ color: "#94A3B8", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              UrgenC is a matching and meeting platform. We do not provide investment advice, facilitate financial transactions, or act as a broker-dealer. All investment decisions and transactions occur off-platform between the parties involved.
            </p>
            <p className="text-center text-[12px] mt-4" style={{ color: "#94A3B8", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              &copy; 2026 UrgenC. All rights reserved.
            </p>
          </div>

          {/* DESKTOP layout: 4-column grid */}
          <div className="hidden md:grid grid-cols-4 gap-8">
            {/* Column 1 — Brand */}
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-[28px] font-normal"
                style={{ fontFamily: "'Instrument Serif', serif", color: "#0F172A" }}
              >
                UrgenC
              </Link>
              <p className="text-[14px]" style={{ color: "#94A3B8", fontFamily: "var(--font-dm-sans), sans-serif", maxWidth: "200px" }}>
                Where Real Ideas Meet Real Capital.
              </p>
            </div>

            {/* Column 2 — Product */}
            <div className="flex flex-col">
              <h4
                className="text-[13px] font-semibold uppercase mb-4"
                style={{ letterSpacing: "2px", color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Product
              </h4>
              <div className="flex flex-col">
                <Link href="/waitlist" className="text-[15px] transition-colors duration-200 hover:text-[#6366F1]" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: "2.2" }}>
                  Join the Waitlist
                </Link>
                <Link href="/qualifications/startup" className="text-[15px] transition-colors duration-200 hover:text-[#6366F1]" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: "2.2" }}>
                  Startup Qualifications
                </Link>
                <Link href="/qualifications/investor" className="text-[15px] transition-colors duration-200 hover:text-[#6366F1]" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: "2.2" }}>
                  Investor Qualifications
                </Link>
              </div>
            </div>

            {/* Column 3 — Company */}
            <div className="flex flex-col">
              <h4
                className="text-[13px] font-semibold uppercase mb-4"
                style={{ letterSpacing: "2px", color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Company
              </h4>
              <div className="flex flex-col">
                <Link href="/story" className="text-[15px] transition-colors duration-200 hover:text-[#6366F1]" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: "2.2" }}>
                  About
                </Link>
                <a href="mailto:hello@urgenc.com" className="text-[15px] transition-colors duration-200 hover:text-[#6366F1]" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: "2.2" }}>
                  Contact
                </a>
              </div>
            </div>

            {/* Column 4 — Legal */}
            <div className="flex flex-col">
              <h4
                className="text-[13px] font-semibold uppercase mb-4"
                style={{ letterSpacing: "2px", color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Legal
              </h4>
              <div className="flex flex-col">
                <span className="text-[15px]" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: "2.2" }}>
                  Terms of Service
                </span>
                <span className="text-[15px]" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: "2.2" }}>
                  Privacy Policy
                </span>
              </div>
            </div>
          </div>

          {/* Divider + Disclaimer + Copyright (desktop) */}
          <div className="hidden md:block mt-12" style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
            <p className="text-[13px] text-center max-w-[700px] mx-auto mt-8 leading-[1.6]" style={{ color: "#94A3B8", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              UrgenC is a matching and meeting platform. We do not provide investment advice, facilitate financial transactions, or act as a broker-dealer. All investment decisions and transactions occur off-platform between the parties involved.
            </p>
            <p className="text-center text-[13px] mt-4" style={{ color: "#94A3B8", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              &copy; 2026 UrgenC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
