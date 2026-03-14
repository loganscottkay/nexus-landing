"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ScoringPreview, MatchingPreview, AccountabilityPreview } from "@/components/HowItWorksPreviews";
import IPhoneMockups from "@/components/IPhoneMockups";
import LottieAnimation from "@/components/LottieAnimation";

const ease = [0.25, 0.4, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const sectionFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const cardStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const viewportConfig = { once: true, amount: 0.2 as const };

/* ---- Animation Hooks ---- */

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);
  return scrollY;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return progress;
}

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
function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className="scroll-progress-bar"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}

/* ---- Parallax Background Orbs ---- */
function ParallaxOrbs({ scrollY, reduced }: { scrollY: number; reduced: boolean }) {
  const factor = reduced ? 0 : 1;
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      <div
        className="parallax-orb parallax-orb-1"
        style={{ transform: `translateY(${scrollY * 0.05 * factor}px)`, willChange: "transform" }}
      />
      <div
        className="parallax-orb parallax-orb-2"
        style={{ transform: `translateY(${scrollY * 0.08 * factor}px)`, willChange: "transform" }}
      />
      <div
        className="parallax-orb parallax-orb-3"
        style={{ transform: `translateY(${scrollY * 0.03 * factor}px)`, willChange: "transform" }}
      />
    </div>
  );
}

/* ---- Magnetic CTA Button ---- */
function MagneticButton({
  children,
  href,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const btnRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const el = btnRef.current;
    if (!el) return;

    let curX = 0, curY = 0;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let newX = 0, newY = 0;
      if (dist < 80) {
        newX = Math.round(dx * 0.05 * 10) / 10;
        newY = Math.round(dy * 0.05 * 10) / 10;
      }
      if (newX !== curX || newY !== curY) {
        curX = newX;
        curY = newY;
        setOffset({ x: newX, y: newY });
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={btnRef}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.2s ease-out",
        display: "inline-block",
      }}
    >
      <Link href={href} className={className} style={style}>
        {children}
      </Link>
    </div>
  );
}

/* ---- Section wrapper ---- */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      variants={sectionFadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ duration: 0.6, ease }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ---- SVG Icons ---- */
function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-blue">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-violet">
      <path d="M12 3v1m0 16v1m-7.07-2.93l.71-.71M18.36 5.64l.71-.71M3 12h1m16 0h1M5.64 5.64l-.71-.71m13.43 13.43l-.71-.71" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-blue">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8m-4-4v4" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
}

/* ---- How It Works Section with Interactive Preview ---- */
const howItWorksCards = [
  {
    num: "01",
    icon: <ShieldIcon />,
    title: "Join & Get Scored",
    desc: "Pitch deck. 60-second video. Scored on vision, team, market, and momentum. Less than 15% of applicants get into the founding cohort.",
    lottie: "/animations/play-button.json",
    lottieClass: "lottie-brand-violet",
  },
  {
    num: "02",
    icon: <SparkleIcon />,
    title: "Investors Set Their Feed",
    desc: "Investors pick which industries and stages they care about. Their feed only shows startups that match. You show up in the feeds of investors who are actually looking for what you are building.",
  },
  {
    num: "03",
    icon: <PhoneIcon />,
    title: "Move Fast or Move On",
    desc: "Investors enter your queue. You get one 72-hour window per investor to schedule. Show traction or get cycled out. Ghost a call and you are removed. This keeps your spot on UrgenC earned, not given.",
  },
];

const CYCLE_DURATION = 6000;
const RESUME_DELAY = 2000;
const STEPS = ["01", "02", "03"] as const;

function HowItWorksSection() {
  const [activeCard, setActiveCard] = useState<string>("01");
  const [isHovering, setIsHovering] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [progress, setProgress] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRafRef = useRef<number>(0);
  const cycleStartRef = useRef<number>(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const advanceToNext = useCallback(() => {
    setActiveCard((prev) => {
      const idx = STEPS.indexOf(prev as typeof STEPS[number]);
      return STEPS[(idx + 1) % STEPS.length];
    });
  }, []);

  const startProgressAnimation = useCallback(() => {
    cycleStartRef.current = performance.now();
    cancelAnimationFrame(progressRafRef.current);

    const animate = (now: number) => {
      const elapsed = now - cycleStartRef.current;
      const p = Math.min(elapsed / CYCLE_DURATION, 1);
      setProgress(p);
      if (p < 1) {
        progressRafRef.current = requestAnimationFrame(animate);
      }
    };
    progressRafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    cancelAnimationFrame(progressRafRef.current);

    if (!inViewport || isHovering) return;

    startProgressAnimation();
    cycleTimerRef.current = setTimeout(() => {
      advanceToNext();
    }, CYCLE_DURATION);

    return () => {
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
      cancelAnimationFrame(progressRafRef.current);
    };
  }, [activeCard, inViewport, isHovering, advanceToNext, startProgressAnimation]);

  const handleMouseEnter = useCallback((cardNum: string) => {
    setIsHovering(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    cancelAnimationFrame(progressRafRef.current);
    setActiveCard(cardNum);
    setProgress(0);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    resumeTimerRef.current = setTimeout(() => {
      setActiveCard((prev) => prev);
    }, RESUME_DELAY);
  }, []);

  useEffect(() => {
    return () => {
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      cancelAnimationFrame(progressRafRef.current);
    };
  }, []);

  const activeIndex = STEPS.indexOf(activeCard as typeof STEPS[number]);

  return (
    <Section id="how-it-works" className="relative z-10 px-6 py-20 lg:py-20 max-w-6xl mx-auto">
      <div ref={sectionRef}>
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-text-muted text-[13px] tracking-[3px] uppercase mb-4"
          >
            App Overview
          </motion.p>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-[36px] md:text-[44px] font-normal text-center mb-16"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            App Overview
          </motion.h2>

          {/* Two-column layout: cards left, preview right */}
          <motion.div variants={cardStagger} className="flex flex-col lg:flex-row gap-8 w-full">
            {/* Left: Compact cards */}
            <div className="flex flex-col gap-4 lg:w-[360px] shrink-0">
              {howItWorksCards.map((card) => (
                <motion.div
                  key={card.num}
                  variants={fadeUp}
                  transition={{ duration: 0.6, ease }}
                  onMouseEnter={() => handleMouseEnter(card.num)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={`glow-card-wrapper h-full transition-all duration-300 ${
                      activeCard === card.num ? "hiw-card-active" : ""
                    }`}
                  >
                    <div className="glass p-5 md:p-6 h-full relative overflow-hidden">
                      <span
                        className="step-number text-[48px] font-normal text-text-primary/[0.06] absolute top-3 right-4 leading-none select-none"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {card.num}
                      </span>
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="shrink-0">{card.icon}</div>
                          <h3 className="text-[17px] md:text-[18px] font-semibold text-text-primary">
                            {card.title}
                          </h3>
                          {(card as { lottie?: string }).lottie && (
                            <LottieAnimation
                              src={(card as { lottie: string }).lottie}
                              loop={true}
                              className={`w-[48px] h-[48px] shrink-0 ${(card as { lottieClass?: string }).lottieClass || ''}`}
                            />
                          )}
                        </div>
                        <p className="text-text-secondary text-[14px] leading-[1.6]">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Preview area + progress dots */}
            <div className="flex flex-1 flex-col gap-4">
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, ease }}
                className="flex-1 min-h-[350px] lg:min-h-[450px] rounded-2xl p-6 md:p-8 relative overflow-hidden"
                style={{
                  background: "rgba(15, 20, 35, 0.92)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >

                {/* Preview content */}
                <div className="relative h-full">
                  <AnimatePresence mode="wait">
                    {activeCard === "01" && (
                      <motion.div
                        key="scoring"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                        className="h-full"
                      >
                        <ScoringPreview active={activeCard === "01"} />
                      </motion.div>
                    )}
                    {activeCard === "02" && (
                      <motion.div
                        key="matching"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                        className="h-full"
                      >
                        <MatchingPreview active={activeCard === "02"} />
                      </motion.div>
                    )}
                    {activeCard === "03" && (
                      <motion.div
                        key="accountability"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                        className="h-full"
                      >
                        <AccountabilityPreview active={activeCard === "03"} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-3">
                {STEPS.map((step, i) => (
                  <div
                    key={step}
                    className="relative flex items-center justify-center cursor-pointer"
                    onClick={() => { setActiveCard(step); setIsHovering(false); setProgress(0); }}
                  >
                    <div
                      className="w-2 h-2 rounded-full transition-colors duration-300"
                      style={{
                        background: i === activeIndex
                          ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)"
                          : "rgba(255, 255, 255, 0.2)",
                      }}
                    />
                    {i === activeIndex && !isHovering && (
                      <svg
                        className="absolute"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        style={{ transform: "rotate(-90deg)" }}
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          fill="none"
                          stroke="url(#progressGrad)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeDasharray={`${progress * 37.7} 37.7`}
                        />
                        <defs>
                          <linearGradient id="progressGrad" x1="0" y1="0" x2="16" y2="16">
                            <stop stopColor="#4A6CF7" />
                            <stop offset="1" stopColor="#7C5CFC" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
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

const matchingSteps = [
  {
    num: "01",
    title: "Founders Pitch",
    label: "FOR FOUNDERS",
    labelColor: "#7C5CFC",
    desc: "Record a 60-second video. Upload your deck. Get scored on vision, team, market, and momentum. Top 15% get in.",
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
    desc: "Pick your industries, stage, and investment range. Your feed only shows startups that fit. No noise.",
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
    labelColor: "#D4AF37",
    desc: "Investors express interest. Founders see a queue. First to swipe = first to meet. Swipe early or get stuck in line.",
    color: "#D4AF37",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Chemistry Call",
    label: "BOTH SIDES",
    labelColor: "#059669",
    desc: "Your queue refreshes every 72 hours. Meet one investor at a time without the pressure of scheduling five calls in a week. Each meeting gets your full attention.",
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
  const labelColors: Record<string, { bg: string; text: string }> = {
    "FOR FOUNDERS": { bg: "rgba(124, 92, 252, 0.1)", text: "#7C5CFC" },
    "FOR INVESTORS": { bg: "rgba(74, 108, 247, 0.1)", text: "#4A6CF7" },
    "BOTH SIDES": { bg: "rgba(212, 175, 55, 0.1)", text: "#D4AF37" },
  };

  return (
    <Section className="relative z-10 px-6 py-20 lg:py-20 max-w-6xl mx-auto">
      <motion.div
        variants={cardStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="flex flex-col items-center"
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease }}
          className="gradient-text text-[13px] tracking-[3px] uppercase mb-4 font-medium"
        >
          The Matching Flow
        </motion.p>
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6, ease }}
          className="text-[36px] md:text-[44px] font-normal text-center mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Swipe. Match. Meet.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease }}
          className="text-center max-w-[600px] text-[17px] leading-[1.7] mb-16"
          style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Here is how it works for both sides.
        </motion.p>

        {/* Desktop: horizontal flow with connecting lines */}
        <motion.div
          variants={cardStagger}
          className="hidden md:flex gap-0 w-full items-stretch"
        >
          {matchingSteps.map((step, i) => (
            <React.Fragment key={step.num}>
              {/* Connecting line between steps */}
              {i > 0 && (
                <div className="flex items-center justify-center shrink-0">
                  <div className="w-[40px] xl:w-[60px] h-[2px] relative overflow-hidden">
                    <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #4A6CF7, #7C5CFC)", opacity: 0.3 }} />
                    <div
                      className="matching-flow-dot absolute top-[-2px] w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                        boxShadow: "0 0 6px rgba(74,108,247,0.6)",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Step card */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="flex-1 max-w-[280px] w-full min-h-[240px]"
              >
                <div className={`glow-card-wrapper h-full matching-card-${step.label === "FOR FOUNDERS" ? "founders" : step.label === "FOR INVESTORS" ? "investors" : "both"}`}>
                  <div
                    className="matching-flow-card h-full rounded-2xl p-6 transition-all duration-300"
                    data-label={step.label}
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3)), linear-gradient(135deg, rgba(167,139,250,0.08), rgba(196,148,233,0.06), rgba(130,180,237,0.05), rgba(167,139,250,0.04))",
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
                      {(step as { lottie?: string }).lottie && (
                        <LottieAnimation
                          src={(step as { lottie: string }).lottie}
                          loop={true}
                          className="lottie-brand w-[36px] h-[36px] shrink-0"
                        />
                      )}
                    </div>
                    <p className="text-[14px] text-text-muted leading-[1.6]">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>

        {/* Mobile: vertical timeline flow */}
        <motion.div
          variants={cardStagger}
          className="md:hidden relative w-full"
        >
          {/* Vertical connecting line */}
          <div
            className="absolute left-[11px] top-[12px] bottom-[12px] w-[2px]"
            style={{
              background: "linear-gradient(180deg, #4A6CF7, #7C5CFC)",
              opacity: 0.25,
            }}
          />

          <div className="flex flex-col gap-5">
            {matchingSteps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="flex items-start gap-0"
              >
                {/* Numbered circle on the timeline */}
                <div
                  className="shrink-0 w-[24px] h-[24px] rounded-full flex items-center justify-center z-10 mt-5"
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
                      background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3)), linear-gradient(135deg, rgba(167,139,250,0.08), rgba(196,148,233,0.06), rgba(130,180,237,0.05), rgba(167,139,250,0.04))",
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
                      {(step as { lottie?: string }).lottie && (
                        <LottieAnimation
                          src={(step as { lottie: string }).lottie}
                          loop={true}
                          className="lottie-brand w-[36px] h-[36px] shrink-0"
                        />
                      )}
                    </div>
                    <p className="text-[13px] text-text-muted leading-[1.6]">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

/* ---- Scroll Down Indicator ---- */
function ScrollDownIndicator({ scrollY }: { scrollY: number }) {
  const opacity = scrollY > 200 ? 0 : 1;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.8 }}
      className="mt-6 flex justify-center"
      style={{ opacity, transition: "opacity 0.3s ease" }}
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
  const scrollY = useScrollY();
  const scrollProgress = useScrollProgress();
  const prefersReduced = usePrefersReducedMotion();

  return (
    <main className="relative min-h-screen bg-base text-text-primary overflow-x-clip">
      {/* Scroll progress indicator */}
      <ScrollProgressBar progress={scrollProgress} />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Parallax background orbs */}
      <ParallaxOrbs scrollY={scrollY} reduced={prefersReduced} />

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
      <section className="relative z-10 pt-[120px] lg:pt-[180px] pb-[80px] lg:pb-[30px]">
        {/* Desktop bottom gradient fade */}
        <div
          className="hidden lg:block absolute bottom-0 left-0 right-0 h-[60px] pointer-events-none z-20"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.02))" }}
        />
        {/* Centered hero text */}
        <div className="flex flex-col items-center justify-center text-center px-6 max-w-[700px] lg:max-w-[780px] mx-auto relative z-10">
          <div className="flex flex-col items-center">
            {/* Eyebrow - gradient text, first to appear */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="text-[10px] md:text-[12px] tracking-[3px] md:tracking-[5px] uppercase mb-6 font-medium"
              style={{ color: "rgba(99,102,241,0.6)" }}
            >
              Founding Cohort Coming Soon
            </motion.p>

            {/* Headline - clip-path reveal from bottom */}
            <div
              className="mb-8 relative"
              style={{
                willChange: prefersReduced ? "auto" : "transform",
                transform: prefersReduced ? "none" : `translateY(${scrollY * -0.15}px)`,
              }}
            >
              {/* Luminous halo behind headline */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  width: "600px",
                  height: "300px",
                  background: "radial-gradient(ellipse, rgba(139,92,246,0.06), transparent 70%)",
                  zIndex: -1,
                }}
              />
              <motion.h1
                initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[68px] xl:text-[76px] font-bold leading-[1.05] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-playfair), serif", color: "#0F172A", textShadow: "0 0 40px rgba(74,108,247,0.08)" }}
              >
                Where <span className="gradient-text-animate">Real Ideas</span>
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[68px] xl:text-[76px] font-bold leading-[1.05] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-playfair), serif", color: "#0F172A", textShadow: "0 0 40px rgba(74,108,247,0.08)" }}
              >
                Meet <span className="gradient-text-animate">Real Capital.</span>
              </motion.h1>
            </div>

            {/* Subtitle - staggered line reveals with parallax */}
            <div
              className="mb-12"
              style={{
                willChange: prefersReduced ? "auto" : "transform",
                transform: prefersReduced ? "none" : `translateY(${scrollY * -0.1}px)`,
              }}
            >
              <div
                className="text-[17px] max-w-full px-2 md:max-w-[600px] md:px-0 leading-[2.0] text-center"
                style={{ color: "#475569", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {[
                  <>UrgenC is the first real fundraising app.</>,
                  <>Founders pitch. Investors swipe.</>,
                  <>Mutual interest = <em style={{ fontStyle: "italic" }}>guaranteed meeting.</em></>,
                  <>No shows get <em style={{ fontStyle: "italic" }}>removed.</em></>,
                ].map((line, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 + i * 0.15, ease }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTA - scale bounce entrance + magnetic effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex justify-center"
            >
              <MagneticButton
                href="/waitlist"
                className="group btn-shimmer btn-auto-shimmer btn-hero-glow inline-flex items-center justify-center gap-2 px-11 py-[18px] text-[16px] md:text-[17px] font-semibold text-white rounded-2xl"
                style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 20px rgba(74,108,247,0.2)" }}
              >
                Join the Waitlist
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </MagneticButton>
            </motion.div>

            {/* Scroll-down indicator */}
            <ScrollDownIndicator scrollY={scrollY} />
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <HowItWorksSection />

      {/* ============ HOW MATCHING WORKS ============ */}
      <MatchingFlowSection />

      {/* ============ IPHONE MOCKUPS ============ */}
      <IPhoneMockups />

      {/* ============ FINAL CTA ============ */}
      <Section className="relative z-10 pt-[80px] pb-[80px]">
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center text-center px-6"
        >
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-[40px] font-normal text-center"
            style={{ fontFamily: "var(--font-playfair), serif", color: "#0F172A" }}
          >
            Ready to Join the <span className="gradient-text-animate">Network</span>?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-[17px] leading-[1.7] mt-4 max-w-[520px] mx-auto"
            style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Founding cohort coming soon. Join the waitlist to be first in line when we launch.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="mt-8"
          >
            <Link
              href="/waitlist"
              className="group btn-shimmer btn-auto-shimmer inline-flex items-center justify-center gap-2 px-10 py-4 text-[16px] font-semibold text-white rounded-full transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(74,108,247,0.25)]"
              style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Join the Waitlist &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </Section>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-10">
        <div>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col items-center gap-4">
            <Link
              href="/"
              className="text-[18px] font-normal text-text-primary"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              UrgenC
            </Link>
            <p className="text-[12px] text-center max-w-[600px]" style={{ color: "#94A3B8" }}>
              UrgenC is a matching and meeting platform. We do not provide investment advice, facilitate financial transactions, or act as a broker-dealer. All investment decisions and transactions occur off-platform between the parties involved.
            </p>
            <p className="text-text-muted/60 text-[13px]">
              &copy; 2026 UrgenC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
