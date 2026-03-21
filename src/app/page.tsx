"use client";

import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import LottieAnimation from "@/components/LottieAnimation";
import HeroHeadline from "@/components/HeroHeadline";
import ConicGradientButton from "@/components/ConicGradientButton";
import PlejjLogo from "@/components/PlejjLogo";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";

const ChromeBrowserAnimation = lazy(() => import("@/components/ChromeBrowserAnimation"));
const IPhoneMockups = lazy(() => import("@/components/IPhoneMockups"));

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

const mobileSlideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
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
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        ticking = false;
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
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        ticking = false;
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
const FlowArrow = ({ delay = 0 }: { delay?: number }) => (
  <div className="flex items-center justify-center shrink-0" style={{ width: 24 }}>
    <svg
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
      className="flow-arrow"
      style={{ animationDelay: `${delay}s` }}
    >
      <path d="M2 8 L18 8 M14 4 L18 8 L14 12" stroke="rgba(99,102,241,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const matchingSteps = [
  {
    num: "01",
    title: "Founders Pitch",
    label: "FOR FOUNDERS",
    labelColor: "#7C5CFC",
    desc: "Record a 60-second video pitch and upload your deck. Our proprietary AI scoring engine, trained on institutional VC evaluation criteria, evaluates your startup holistically.",
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
    title: "We Evaluate You",
    label: "FOR FOUNDERS",
    labelColor: "#7C5CFC",
    desc: "Our AI scores your idea and our team evaluates your drive, communication, and leadership. Once admitted, we standardize your materials into a clean, VC-ready format. Only the top 15% make it through.",
    color: "#4A6CF7",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15l2 2 4-4" />
        <path d="M16 3l2-1.5M18 6l2.5-.5M16.5 1L17 3.5" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Swipe & Match",
    label: "BOTH SIDES",
    labelColor: "#059669",
    desc: "Our AI matching engine curates each investor's feed based on their thesis. Investors browse and express interest. Founders see who is interested and accept or pass. Both say yes? It is a match.",
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
  },
];

/* ---- Mobile vertical timeline with centered circles ---- */
function MobileTimeline({
  matchingSteps,
  labelColors,
  cardStagger,
  mobileSlideFromLeft,
}: {
  matchingSteps: { num: string; title: string; label: string; labelColor: string; desc: string; color: string; icon: React.ReactNode }[];
  labelColors: Record<string, { bg: string; text: string }>;
  cardStagger: Variants;
  mobileSlideFromLeft: Variants;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineStyle, setLineStyle] = useState<{ top: number; height: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const first = circleRefs.current[0];
      const last = circleRefs.current[matchingSteps.length - 1];
      if (!first || !last) return;

      const containerRect = container.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();

      const top = firstRect.top - containerRect.top + firstRect.height / 2;
      const bottom = lastRect.top - containerRect.top + lastRect.height / 2;
      setLineStyle({ top, height: bottom - top });
    };

    // Measure after layout settles (animations may shift things)
    const t1 = setTimeout(measure, 100);
    const t2 = setTimeout(measure, 600);
    const t3 = setTimeout(measure, 1200);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", measure);
    };
  }, [matchingSteps.length]);

  return (
    <motion.div
      variants={cardStagger}
      className="md:hidden relative w-full"
      ref={containerRef}
    >
      {/* Vertical connecting line — spans from circle 1 center to last circle center */}
      {lineStyle && (
        <div
          className="absolute left-[11px] w-[2px] rounded-full"
          style={{
            top: `${lineStyle.top}px`,
            height: `${lineStyle.height}px`,
            background: "linear-gradient(180deg, #4A6CF7 0%, #6358E8 50%, #7C5CFC 100%)",
            opacity: 0.22,
          }}
        />
      )}

      <div className="flex flex-col gap-5">
        {matchingSteps.map((step, i) => (
          <motion.div
            key={step.num}
            variants={mobileSlideFromLeft}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-0"
          >
            {/* Numbered circle on the timeline — vertically centered with card */}
            <div
              ref={(el) => { circleRefs.current[i] = el; }}
              className="shrink-0 w-[24px] h-[24px] rounded-full flex items-center justify-center z-10"
              style={{
                background: `linear-gradient(135deg, ${step.color}, ${step.labelColor})`,
                boxShadow: `0 0 8px ${step.color}40`,
              }}
            >
              <span className="text-white text-[11px] font-semibold leading-none">{i + 1}</span>
            </div>

            {/* Card */}
            <div className={`flex-1 ml-4 matching-card-${step.label === "FOR FOUNDERS" ? "founders" : step.label === "FOR INVESTORS" ? "investors" : "both"}`}>
              <div
                className="matching-flow-card rounded-2xl p-5"
                data-label={step.label}
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3)), linear-gradient(135deg, rgba(212,175,55,0.04), rgba(167,139,250,0.05), rgba(196,148,233,0.03))",
                  backdropFilter: "blur(20px) saturate(1.8)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.8)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="shrink-0"
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: [0.9, 1.15, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  >
                    {step.icon}
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: 0.2 + i * 0.1 }}
                    className="inline-block rounded-full px-2.5 py-0.5 text-[10px] tracking-[2px] uppercase font-medium"
                    style={{
                      background: labelColors[step.label]?.bg || "rgba(124,92,252,0.1)",
                      color: labelColors[step.label]?.text || step.labelColor,
                    }}
                  >
                    {step.label}
                  </motion.span>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h3
                    className="text-[16px] font-semibold text-text-primary"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p className="text-[13px] text-text-muted leading-[1.6]">{step.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function MatchingFlowSection() {
  const labelColors: Record<string, { bg: string; text: string }> = {
    "FOR FOUNDERS": { bg: "rgba(124, 92, 252, 0.1)", text: "#7C5CFC" },
    "FOR INVESTORS": { bg: "rgba(74, 108, 247, 0.1)", text: "#4A6CF7" },
    "BOTH SIDES": { bg: "rgba(5, 150, 105, 0.12)", text: "#059669" },
  };

  return (
    <div className="scroll-stack-section w-full" style={{ position: 'relative', zIndex: 4, backgroundColor: '#FAF9F7', minHeight: '100vh', overflow: 'hidden' }}>
    <Section className="relative z-10 px-6 py-20 lg:pt-20 lg:pb-[50px] w-full" style={{}}>
      <div className="max-w-6xl mx-auto">
      <motion.div
        variants={cardStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="flex flex-col items-center"
      >
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

        {/* Desktop: horizontal flow with animated arrows */}
        <motion.div
          variants={cardStagger}
          className="hidden lg:flex gap-0 w-full items-stretch justify-center"
        >
          {matchingSteps.map((step, i) => (
            <React.Fragment key={step.num}>
              {/* Animated flow arrow between steps */}
              {i > 0 && <FlowArrow delay={(i - 1) * 0.5} />}

              {/* Step card */}
              <motion.div
                variants={tierCard}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease }}
                className="flex-1 max-w-[220px] w-full min-h-[240px]"
              >
                <div className={`glow-card-wrapper h-full matching-card-${step.label === "FOR FOUNDERS" ? "founders" : step.label === "FOR INVESTORS" ? "investors" : "both"}`}>
                  <div
                    className="matching-flow-card h-full rounded-2xl p-6 transition-all duration-300 flex flex-col"
                    data-label={step.label}
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3)), linear-gradient(135deg, rgba(212,175,55,0.04), rgba(167,139,250,0.05), rgba(196,148,233,0.03))",
                      backdropFilter: "blur(20px) saturate(1.8)",
                      WebkitBackdropFilter: "blur(20px) saturate(1.8)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
                    }}
                  >
                    <motion.div
                      className="mb-4"
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: [0.9, 1.15, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    >
                      {step.icon}
                    </motion.div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: 0.2 + i * 0.1 }}
                      className="inline-block rounded-full px-2.5 py-0.5 text-[10px] tracking-[2px] uppercase font-medium mb-1.5"
                      style={{
                        background: labelColors[step.label]?.bg || "rgba(124,92,252,0.1)",
                        color: labelColors[step.label]?.text || step.labelColor,
                      }}
                    >
                      {step.label}
                    </motion.span>
                    <p className="text-[11px] tracking-[2px] uppercase mb-2 font-medium" style={{ color: step.color }}>
                      Step {step.num}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <h3
                        className="text-[17px] font-semibold text-text-primary"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[14px] text-text-muted leading-[1.6] flex-1">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>

        {/* Tablet: 2x2 grid with horizontal arrows */}
        <motion.div
          variants={cardStagger}
          className="hidden md:grid lg:hidden grid-cols-2 gap-4 w-full"
        >
          {matchingSteps.map((step, i) => (
            <React.Fragment key={step.num}>
              {/* Horizontal arrow between card 1→2 and card 3→4 */}
              {(i === 1 || i === 3) && (
                <div className="absolute" style={{ display: 'none' }} />
              )}
              <motion.div
                variants={tierCard}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease }}
                className="w-full min-h-[240px]"
              >
                <div className={`glow-card-wrapper h-full matching-card-${step.label === "FOR FOUNDERS" ? "founders" : step.label === "FOR INVESTORS" ? "investors" : "both"}`}>
                  <div
                    className="matching-flow-card h-full rounded-2xl p-6 transition-all duration-300 flex flex-col"
                    data-label={step.label}
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3)), linear-gradient(135deg, rgba(212,175,55,0.04), rgba(167,139,250,0.05), rgba(196,148,233,0.03))",
                      backdropFilter: "blur(20px) saturate(1.8)",
                      WebkitBackdropFilter: "blur(20px) saturate(1.8)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
                    }}
                  >
                    <motion.div
                      className="mb-4"
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: [0.9, 1.15, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    >
                      {step.icon}
                    </motion.div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: 0.2 + i * 0.1 }}
                      className="inline-block rounded-full px-2.5 py-0.5 text-[10px] tracking-[2px] uppercase font-medium mb-1.5"
                      style={{
                        background: labelColors[step.label]?.bg || "rgba(124,92,252,0.1)",
                        color: labelColors[step.label]?.text || step.labelColor,
                      }}
                    >
                      {step.label}
                    </motion.span>
                    <p className="text-[11px] tracking-[2px] uppercase mb-2 font-medium" style={{ color: step.color }}>
                      Step {step.num}
                    </p>
                    <div className="flex items-center gap-2 mb-2 min-h-[44px]">
                      <h3
                        className="text-[17px] font-semibold text-text-primary"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[14px] text-text-muted leading-[1.6] flex-1">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>

        {/* Mobile: vertical timeline flow */}
        <MobileTimeline matchingSteps={matchingSteps} labelColors={labelColors} cardStagger={cardStagger} mobileSlideFromLeft={mobileSlideFromLeft} />

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
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        ticking = false;
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
      <section className="scroll-stack-section relative z-10 pt-[150px] lg:pt-[220px] pb-[45px] lg:pb-[50px]" style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#FAF9F7', minHeight: '100vh', overflow: 'hidden' }}>
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
                className="text-[16px] md:text-[18px] max-w-full px-2 md:max-w-[700px] md:px-0 leading-[1.8] md:leading-[2.0] text-center"
                style={{ color: "#475569", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {[
                  <>The AI-powered fundraising marketplace where meetings actually happen.</>,
                  <>Curated founders pitch, investors swipe.</>,
                  <>Mutual interest unlocks a meeting &mdash; don&apos;t show up, you&apos;re out.</>,
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
                <span style={{ fontWeight: 700 }}>Join the Waitlist</span>
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
                    <Image
                      src="/images/universities/bu-crest.png"
                      alt="Boston University"
                      width={55}
                      height={55}
                      className="crest-img"
                      style={{ objectFit: "cover", mixBlendMode: "multiply" }}
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
                    <Image
                      src="/images/universities/neu-crest.png"
                      alt="Northeastern University"
                      width={55}
                      height={55}
                      className="crest-img"
                      style={{ objectFit: "contain", mixBlendMode: "multiply" }}
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
                    <Image
                      src="/images/universities/hbs-crest.png"
                      alt="Harvard Business School"
                      width={74}
                      height={74}
                      className="crest-img crest-img-hbs"
                      style={{ objectFit: "contain", mixBlendMode: "multiply", marginTop: "10px" }}
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
      <div className="scroll-stack-section w-full" style={{ position: 'relative', zIndex: 3, backgroundColor: '#FAF9F7' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center text-center px-6 pt-20 pb-0 md:pt-[108px] md:pb-0"
        >
          <motion.h2
            variants={tierTitle}
            transition={{ duration: 0.8, delay: 0.2, ease: smoothDecel }}
            className="text-[28px] md:text-[40px] font-normal text-center max-w-[600px]"
            style={{ fontFamily: "'Instrument Serif', serif", color: "#0F172A", lineHeight: 1.3 }}
          >
            Everyone&apos;s been searching for this. No one&apos;s built it.{" "}
            <span className="gradient-text-animate" style={{ fontWeight: 600 }}>Until now.</span>
          </motion.h2>
        </motion.div>
      </div>
      <SectionErrorBoundary>
        <Suspense fallback={null}>
          <ChromeBrowserAnimation />
        </Suspense>
      </SectionErrorBoundary>

      {/* ============ HOW MATCHING WORKS ============ */}
      <SectionErrorBoundary>
        <MatchingFlowSection />
      </SectionErrorBoundary>

      {/* ============ IPHONE MOCKUPS ============ */}
      <div className="scroll-stack-section lg:pb-[100px] w-full" style={{ position: 'relative', zIndex: 5, backgroundColor: '#FAF9F7', minHeight: '100vh', overflow: 'hidden' }}>
        <SectionErrorBoundary>
          <Suspense fallback={null}>
            <IPhoneMockups />
          </Suspense>
        </SectionErrorBoundary>
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
              <span style={{ fontWeight: 700 }}>Join the Waitlist &rarr;</span>
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
            display: block;
            padding: 0;
            background: transparent;
            border: none;
            border-radius: 0;
            box-shadow: none;
            font-size: 13px;
            font-weight: 400;
            color: #6B7280;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            transition: color 0.2s ease;
            text-decoration: none;
          }
          .footer-link:hover {
            background: transparent;
            box-shadow: none;
            transform: none;
            color: #4B5563;
          }
        `}</style>

        <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-[48px] pb-[40px] md:pt-[80px] md:pb-[60px]">

          {/* MOBILE layout */}
          <div className="flex flex-col items-center text-center md:hidden">
            {/* Brand */}
            <div className="mb-[32px]">
              <Link href="/" className="inline-flex">
                <PlejjLogo size={24} />
              </Link>
              <p className="text-[14px] mt-1.5" style={{ color: "#6366F1", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500 }}>
                Where Real Ideas Meet Real Capital.
              </p>
            </div>

            {/* Product */}
            <div className="mb-[28px]">
              <h4
                className="uppercase mb-3"
                style={{ letterSpacing: "2px", fontWeight: 700, color: "#6B7280", fontSize: "11px", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Product
              </h4>
              <div className="flex flex-col items-center gap-[8px]">
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
                style={{ letterSpacing: "2px", fontWeight: 700, color: "#6B7280", fontSize: "11px", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Company
              </h4>
              <div className="flex flex-col items-center gap-[8px]">
                <Link href="/story" className="footer-link">
                  About
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div className="mb-[28px]">
              <h4
                className="uppercase mb-3"
                style={{ letterSpacing: "2px", fontWeight: 700, color: "#6B7280", fontSize: "11px", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Legal
              </h4>
              <div className="flex flex-col items-center gap-[8px]">
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
              <p className="text-center px-4 leading-[1.6]" style={{ fontSize: "12px", color: "#6B7280", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                Plejj is a matching and meeting platform. We do not provide investment advice, facilitate financial transactions, or act as a broker-dealer. All investment decisions and transactions occur off-platform between the parties involved.
              </p>
              <p className="text-center mt-4" style={{ fontSize: "12px", color: "#6B7280", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                &copy; 2026 Plejj. All rights reserved.
              </p>
            </div>
          </div>

          {/* DESKTOP layout: 4-column grid */}
          <div className="hidden md:grid grid-cols-4 gap-8">
            {/* Column 1 - Brand */}
            <div className="flex flex-col gap-2">
              <Link href="/" className="inline-flex">
                <PlejjLogo size={28} />
              </Link>
              <p className="text-[14px]" style={{ color: "#6366F1", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500, maxWidth: "220px" }}>
                Where Real Ideas Meet Real Capital.
              </p>
            </div>

            {/* Column 2 - Product */}
            <div className="flex flex-col">
              <h4
                className="uppercase mb-4"
                style={{ letterSpacing: "2px", fontWeight: 700, color: "#6B7280", fontSize: "11px", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Product
              </h4>
              <div className="flex flex-col gap-[8px]">
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
                style={{ letterSpacing: "2px", fontWeight: 700, color: "#6B7280", fontSize: "11px", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Company
              </h4>
              <div className="flex flex-col gap-[8px]">
                <Link href="/story" className="footer-link">
                  About
                </Link>
              </div>
            </div>

            {/* Column 4 - Legal */}
            <div className="flex flex-col">
              <h4
                className="uppercase mb-4"
                style={{ letterSpacing: "2px", fontWeight: 700, color: "#6B7280", fontSize: "11px", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Legal
              </h4>
              <div className="flex flex-col gap-[8px]">
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
            <p className="text-center max-w-[700px] mx-auto leading-[1.6]" style={{ fontSize: "12px", color: "#6B7280", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              Plejj is a matching and meeting platform. We do not provide investment advice, facilitate financial transactions, or act as a broker-dealer. All investment decisions and transactions occur off-platform between the parties involved.
            </p>
            <p className="text-center mt-4" style={{ fontSize: "12px", color: "#6B7280", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              &copy; 2026 Plejj. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
