"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ScoringPreview, MatchingPreview, AccountabilityPreview } from "@/components/HowItWorksPreviews";

const ease = [0.25, 0.4, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const sectionFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
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

/* ---- Email Capture ---- */
function EmailCapture() {
  const [submitted, setSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  return (
    <Section className="relative z-10 px-6 py-16 max-w-[500px] mx-auto text-center">
      <p className="text-[18px] font-semibold text-text-primary mb-2" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
        Not ready to apply yet?
      </p>
      <p className="text-[15px] mb-6" style={{ color: "#64748B" }}>
        {submitted ? "Thank you! We will keep you posted." : "Get notified when we launch and hear about early access opportunities."}
      </p>
      {!submitted && (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-center">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full flex-grow h-[48px] rounded-xl px-4 text-[15px] text-text-primary placeholder:text-text-muted/50 outline-none"
            style={{
              background: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(0, 0, 0, 0.06)",
            }}
          />
          <button
            type="submit"
            className="h-[48px] px-6 rounded-xl text-[15px] font-semibold text-white w-full sm:w-auto sm:shrink-0"
            style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
          >
            Subscribe
          </button>
        </form>
      )}
      {submitted && (
        <div className="flex items-center justify-center gap-2 h-[48px]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-[15px] font-semibold" style={{ color: "#22c55e" }}>Subscribed!</span>
        </div>
      )}
    </Section>
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
    title: "Apply & Get Scored",
    desc: "Pitch deck. 60-second video. Scored on vision, team, market, and momentum. Less than 15% get in.",
  },
  {
    num: "02",
    icon: <SparkleIcon />,
    title: "Investors Set Their Feed",
    desc: "Your investment size determines your match tier. Small checks see early-stage founders. Larger checks see proven traction.",
  },
  {
    num: "03",
    icon: <PhoneIcon />,
    title: "Move Fast or Move On",
    desc: "72 hours to take the call. 30 days to show traction. Ghost and you are gone. Every conversation on UrgenC is between two serious people.",
  },
];

const CYCLE_DURATION = 6000; // 6 seconds per demo
const RESUME_DELAY = 2000; // 2 seconds before auto-cycle resumes
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

  // Viewport detection - start auto-cycle when section enters view
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

  // Advance to next card in cycle
  const advanceToNext = useCallback(() => {
    setActiveCard((prev) => {
      const idx = STEPS.indexOf(prev as typeof STEPS[number]);
      return STEPS[(idx + 1) % STEPS.length];
    });
  }, []);

  // Progress animation loop
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

  // Auto-cycle logic
  useEffect(() => {
    // Clear any existing timers
    if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    cancelAnimationFrame(progressRafRef.current);

    if (!inViewport || isHovering) return;

    // Start progress bar and schedule next advance
    startProgressAnimation();
    cycleTimerRef.current = setTimeout(() => {
      advanceToNext();
    }, CYCLE_DURATION);

    return () => {
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
      cancelAnimationFrame(progressRafRef.current);
    };
  }, [activeCard, inViewport, isHovering, advanceToNext, startProgressAnimation]);

  // Hover handlers
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
    // Resume auto-cycle after delay, continuing from the currently active card
    resumeTimerRef.current = setTimeout(() => {
      // Trigger a re-run of the auto-cycle effect by toggling a state
      setActiveCard((prev) => prev); // force effect re-run via isHovering change
    }, RESUME_DELAY);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      cancelAnimationFrame(progressRafRef.current);
    };
  }, []);

  const activeIndex = STEPS.indexOf(activeCard as typeof STEPS[number]);

  return (
    <Section id="how-it-works" className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
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
            The Process
          </motion.p>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-[36px] md:text-[44px] font-normal text-center mb-16"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            How It Works
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
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {card.num}
                      </span>
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="shrink-0">{card.icon}</div>
                          <h3 className="text-[17px] md:text-[18px] font-semibold text-text-primary">
                            {card.title}
                          </h3>
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
            <div className="hidden lg:flex flex-1 flex-col gap-4">
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, ease }}
                className="flex-1 min-h-[450px] rounded-3xl p-6 md:p-8 relative overflow-hidden"
                style={{
                  background: "rgba(10, 10, 15, 0.9)",
                  border: "1px solid transparent",
                  backgroundClip: "padding-box",
                }}
              >
                {/* Gradient border */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    padding: "1px",
                    background: "linear-gradient(135deg, rgba(74, 108, 247, 0.2), rgba(124, 92, 252, 0.2), rgba(74, 108, 247, 0.1))",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMaskComposite: "xor",
                  }}
                />

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
              <div className="hidden lg:flex items-center justify-center gap-3">
                {STEPS.map((step, i) => (
                  <div key={step} className="relative flex items-center justify-center">
                    {/* Background dot */}
                    <div
                      className="w-2 h-2 rounded-full transition-colors duration-300"
                      style={{
                        background: i === activeIndex
                          ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)"
                          : "rgba(255, 255, 255, 0.1)",
                      }}
                    />
                    {/* Progress ring around active dot */}
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
                          stroke="rgba(255,255,255,0.06)"
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

/* ---- Floating Dashboard Mockups ---- */

function FounderPitchCard() {
  const [scoreWidth, setScoreWidth] = useState(0);
  const [scoreNum, setScoreNum] = useState(0);
  const [showAccepted, setShowAccepted] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setCardVisible(true), 200);
    // Start score bar animation 1s after card appears
    const t2 = setTimeout(() => {
      setScoreWidth(87);
      // Count up the score number over 1.5s
      let start = 0;
      const end = 87;
      const duration = 1500;
      const stepTime = duration / end;
      const counter = setInterval(() => {
        start++;
        setScoreNum(start);
        if (start >= end) clearInterval(counter);
      }, stepTime);
    }, 1200);
    const t3 = setTimeout(() => setShowAccepted(true), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div
      className="w-[300px] h-[380px] rounded-2xl p-5 dashboard-card relative overflow-hidden flex flex-col"
      style={{
        background: "rgba(15, 20, 40, 0.75)",
        backdropFilter: "blur(40px)",
        border: "none",
        opacity: cardVisible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      <div className="relative flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-white/50 text-[11px] tracking-[3px] uppercase font-medium">Founder Pitch</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] rec-dot-pulse" />
            <span className="text-[11px] text-[#ef4444]/80 font-medium">REC</span>
          </div>
        </div>

        {/* Avatar + Name */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-[48px] h-[48px] rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(15, 20, 40, 0.9)",
              border: "2px solid transparent",
              backgroundClip: "padding-box",
              boxShadow: "0 0 0 2px #4A6CF7, 0 0 0 3px #7C5CFC",
            }}
          >
            <span className="text-white font-semibold text-[16px]">AR</span>
          </div>
          <div>
            <p className="text-white font-semibold text-[16px] leading-tight">Alex Rivera</p>
            <p className="text-white/50 text-[13px] leading-tight">Luminary AI</p>
          </div>
        </div>

        {/* 60-second pitch sub-card */}
        <div
          className="rounded-xl px-3 py-3 flex items-center gap-3 mb-5"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <polygon points="8,5 20,12 8,19" />
            </svg>
          </div>
          <p className="text-white text-[13px] flex-1">60-second Video Pitch</p>
          <p className="text-white/40 text-[12px] tabular-nums">1:00</p>
        </div>

        {/* UrgenC Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/40 text-[10px] tracking-[2px] uppercase">UrgenC Score</p>
            <p className="text-white font-semibold text-[16px] tabular-nums">
              {scoreNum}/100
            </p>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${scoreWidth}%`,
                background: "linear-gradient(90deg, #4A6CF7, #7C5CFC)",
                transition: "width 1.5s ease-out",
              }}
            />
          </div>
        </div>

        {/* Accepted pill */}
        <div className="flex justify-center">
          <div
            className="px-4 py-1.5 rounded-full text-[12px] uppercase tracking-[2px] font-semibold transition-opacity duration-500 accepted-pill-glow"
            style={{
              opacity: showAccepted ? 1 : 0,
              background: "rgba(5, 150, 105, 0.2)",
              border: "1px solid rgba(5, 150, 105, 0.4)",
              color: "#34D399",
            }}
          >
            Accepted
          </div>
        </div>
      </div>
    </div>
  );
}

const swipeStartups = [
  { name: "Luminary AI", tag: "AI / ML", mrr: "$45K MRR", score: "87", initial: "L", color: "#4A6CF7" },
  { name: "Stackpay", tag: "Fintech", mrr: "$82K MRR", score: "91", initial: "S", color: "#7C5CFC" },
  { name: "Terraform Health", tag: "HealthTech", mrr: "$12K MRR", score: "78", initial: "T", color: "#06B6D4" },
];

function InvestorMatchCard() {
  const [idx, setIdx] = useState(0);
  const [cardVisible, setCardVisible] = useState(true);
  const [showMatched, setShowMatched] = useState(false);
  const [greenPulse, setGreenPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Pulse the green button
      setGreenPulse(true);

      // Fade out current card
      setTimeout(() => {
        setGreenPulse(false);
        setCardVisible(false);
      }, 400);

      // After fade out completes, swap to next startup and fade in
      setTimeout(() => {
        setIdx((p) => (p + 1) % swipeStartups.length);
        setCardVisible(true);
        setShowMatched(true);
      }, 700);

      // Hide matched text before next cycle
      setTimeout(() => {
        setShowMatched(false);
      }, 2700);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const s = swipeStartups[idx];

  return (
    <div
      className="w-[300px] h-[380px] rounded-2xl p-5 dashboard-card relative overflow-hidden flex flex-col"
      style={{
        background: "rgba(15, 20, 40, 0.75)",
        backdropFilter: "blur(40px)",
        border: "none",
      }}
    >
      <div className="relative flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-white/50 text-[11px] tracking-[3px] uppercase font-medium">Investor Feed</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#34D399] live-dot-pulse" />
            <span className="text-[11px] text-[#34D399]/80 font-medium">Live</span>
          </div>
        </div>

        {/* Single card area - only ONE card rendered at a time */}
        <div className="relative mb-4 flex-1 overflow-hidden" style={{ minHeight: "170px" }}>
          <div
            className="absolute inset-0 rounded-xl p-4"
            style={{
              background: "rgba(255, 255, 255, 0.10)",
              border: "1px solid rgba(255,255,255,0.08)",
              opacity: cardVisible ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              <div
                className="w-[36px] h-[36px] rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}88)` }}
              >
                <span className="text-white font-semibold text-[14px]">{s.initial}</span>
              </div>
              <p className="text-white font-semibold text-[15px]">{s.name}</p>
            </div>
            <div className="mb-2.5">
              <span
                className="text-[10px] px-2 py-0.5 rounded-full inline-block"
                style={{
                  background: "rgba(74, 108, 247, 0.25)",
                  color: "#818CF8",
                }}
              >
                {s.tag}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-white/60 text-[12px]">{s.mrr}</p>
              <p className="text-white/60 text-[12px]">Score: {s.score}</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-3 mb-3">
          {/* Pass */}
          <div
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-default"
            style={{
              background: "rgba(239, 68, 68, 0.2)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </div>
          {/* Save */}
          <div
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-default"
            style={{
              background: "rgba(74, 108, 247, 0.2)",
              border: "1px solid rgba(74, 108, 247, 0.4)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          </div>
          {/* Interested */}
          <div
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-default transition-all duration-300"
            style={{
              background: "rgba(52, 211, 153, 0.2)",
              border: `1px solid rgba(52, 211, 153, ${greenPulse ? "0.7" : "0.4"})`,
              boxShadow: greenPulse ? "0 0 20px rgba(52, 211, 153, 0.5)" : "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
        </div>

        {/* Matched notification */}
        <div className="h-[24px] flex items-center justify-center">
          <p
            className="text-[13px] text-center font-medium matched-text-glow"
            style={{
              color: "#34D399",
              opacity: showMatched ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            Matched! Call in 48hrs
          </p>
        </div>
      </div>
    </div>
  );
}

function MatchNotificationCard() {
  const [flash, setFlash] = useState(false);
  const [textGlow, setTextGlow] = useState(false);

  useEffect(() => {
    // Flash every 5s when dot reaches middle
    const t = setInterval(() => {
      setFlash(true);
      setTimeout(() => {
        setFlash(false);
        setTextGlow(true);
      }, 300);
      setTimeout(() => setTextGlow(false), 1500);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="w-[280px] rounded-2xl p-5 dashboard-card relative"
      style={{
        background: "linear-gradient(135deg, rgba(74,108,247,0.12), rgba(124,92,252,0.10), rgba(6,182,212,0.08)), rgba(15,20,40,0.75)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(74, 108, 247, 0.2)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] live-dot-pulse" />
        <span className="text-white/50 text-[11px] tracking-[2px] uppercase">New Match</span>
      </div>

      {/* Connection visual */}
      <div className="flex items-center justify-between mb-5">
        {/* Investor */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#4A6CF7] to-[#6C5CE7] flex items-center justify-center text-white text-[11px] font-bold border-2 border-[rgba(10,10,15,0.85)] avatar-ripple">
            SC
          </div>
          <p className="text-white text-[11px] font-medium">Sarah C.</p>
          <p className="text-white/30 text-[10px]">Gradient Ventures</p>
        </div>

        {/* Animated connection line with traveling dot */}
        <div className="flex-1 mx-3 h-[2px] relative overflow-hidden">
          <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(90deg, #4A6CF7, #7C5CFC)", opacity: 0.3 }} />
          <div
            className="match-dot-travel absolute top-[-2px] w-2 h-2 rounded-full"
            style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)", boxShadow: "0 0 8px rgba(74,108,247,0.8)" }}
          />
          {/* Center flash */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-300"
            style={{
              background: flash ? "rgba(255,255,255,0.9)" : "transparent",
              boxShadow: flash ? "0 0 20px rgba(124, 92, 252, 0.8), 0 0 40px rgba(74, 108, 247, 0.5)" : "none",
              transform: `translate(-50%, -50%) scale(${flash ? 2 : 0})`,
            }}
          />
        </div>

        {/* Startup */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#B06CFC] flex items-center justify-center text-white text-[11px] font-bold border-2 border-[rgba(10,10,15,0.85)] avatar-ripple" style={{ animationDelay: "1.5s" }}>
            LA
          </div>
          <p className="text-white text-[11px] font-medium">Luminary AI</p>
          <p className="text-white/30 text-[10px]">AI/ML Startup</p>
        </div>
      </div>

      {/* Status + CTA */}
      <p
        className="text-white text-[13px] text-center mb-3 transition-all duration-500"
        style={textGlow ? { textShadow: "0 0 12px rgba(124, 92, 252, 0.8), 0 0 24px rgba(74, 108, 247, 0.4)" } : {}}
      >
        Mutual interest confirmed
      </p>
      <div className="flex justify-center">
        <div
          className="px-4 py-1.5 rounded-full text-[11px] font-medium text-white"
          style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
        >
          Schedule Call
        </div>
      </div>
    </div>
  );
}

const callTimes = ["Tomorrow at 3:00 PM", "Today at 4:30 PM", "Wednesday at 11:00 AM"];

function ChemistryCallCard() {
  const [timeIdx, setTimeIdx] = useState(0);
  const [btnPulse, setBtnPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTimeIdx((p) => (p + 1) % callTimes.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setBtnPulse(true);
      setTimeout(() => setBtnPulse(false), 800);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="w-[280px] rounded-2xl p-5 dashboard-card"
      style={{
        background: "linear-gradient(135deg, rgba(74,108,247,0.12), rgba(124,92,252,0.10), rgba(6,182,212,0.08)), rgba(15,20,40,0.75)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(124, 92, 252, 0.2)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-[#4A6CF7]" />
        <span className="text-white/50 text-[11px] tracking-[2px] uppercase">Upcoming Call</span>
      </div>

      {/* Call title */}
      <div className="flex items-center gap-2.5 mb-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8m-4-4v4" />
        </svg>
        <p className="text-white text-[15px] font-semibold">Chemistry Call</p>
      </div>

      {/* Date/time - crossfade */}
      <div className="relative h-[20px] mb-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={timeIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="text-white/40 text-[14px] absolute"
          >
            {callTimes[timeIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Participants with ripple */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A6CF7] to-[#6C5CE7] flex items-center justify-center text-white text-[9px] font-bold border-2 border-[rgba(10,10,15,0.85)] avatar-ripple-sm">
            SC
          </div>
          <span className="text-white/60 text-[11px]">Sarah C.</span>
        </div>
        <span className="text-white/15 text-[10px]">&amp;</span>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#B06CFC] flex items-center justify-center text-white text-[9px] font-bold border-2 border-[rgba(10,10,15,0.85)] avatar-ripple-sm" style={{ animationDelay: "1.5s" }}>
            LA
          </div>
          <span className="text-white/60 text-[11px]">Luminary AI</span>
        </div>
      </div>

      <p className="text-white/25 text-[12px] mb-4">Duration: 20 min</p>

      {/* Join Call button with periodic pulse */}
      <div className="flex justify-center">
        <div
          className="px-4 py-1.5 rounded-full text-[11px] font-medium text-white transition-shadow duration-300"
          style={{
            background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
            boxShadow: btnPulse ? "0 0 20px rgba(74, 108, 247, 0.6), 0 0 40px rgba(124, 92, 252, 0.3)" : "none",
          }}
        >
          Join Call
        </div>
      </div>
    </div>
  );
}

/* ---- Matching Flow Section ---- */
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
    desc: "Investors express interest. Founders accept or pass. When both say yes, it is a match.",
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
    desc: "Every match gets a 20-minute video call within 72 hours. No ghosting or you are removed.",
    color: "#059669",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
];

function MatchingFlowSection() {
  return (
    <Section className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
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
          style={{ fontFamily: "'Instrument Serif', serif" }}
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

        {/* Step flow - horizontal on desktop, vertical on mobile */}
        <motion.div
          variants={cardStagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:flex gap-4 w-full"
        >
          {matchingSteps.map((step, i) => (
            <React.Fragment key={step.num}>
              {/* Connecting line between steps */}
              {i > 0 && (
                <div className="hidden lg:flex items-center justify-center lg:py-0 py-2">
                  {/* Desktop: horizontal line */}
                  <div className="hidden lg:block w-[40px] xl:w-[60px] h-[2px] relative overflow-hidden shrink-0">
                    <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #4A6CF7, #7C5CFC)", opacity: 0.3 }} />
                    <div
                      className="matching-flow-dot absolute top-[-2px] w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                        boxShadow: "0 0 6px rgba(74,108,247,0.6)",
                      }}
                    />
                  </div>
                  {/* Mobile: vertical line */}
                  <div className="lg:hidden w-[2px] h-[32px] relative overflow-hidden">
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #4A6CF7, #7C5CFC)", opacity: 0.3 }} />
                  </div>
                </div>
              )}

              {/* Step card */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="flex-1 max-w-none md:max-w-none lg:max-w-[280px] w-full min-h-[240px]"
              >
                <div className="glow-card-wrapper h-full">
                  <div
                    className="h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-[3px]"
                    style={{
                      background: "rgba(255, 255, 255, 0.45)",
                      backdropFilter: "blur(40px)",
                      WebkitBackdropFilter: "blur(40px)",
                      border: "1px solid rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <div className="mb-4">{step.icon}</div>
                    <p className="text-[10px] tracking-[2px] uppercase mb-1.5 font-medium" style={{ color: step.labelColor, letterSpacing: "2px" }}>
                      {step.label}
                    </p>
                    <p className="text-[11px] tracking-[2px] uppercase mb-2 font-medium" style={{ color: step.color }}>
                      Step {step.num}
                    </p>
                    <h3
                      className="text-[17px] font-semibold text-text-primary mb-2"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-text-muted leading-[1.6]">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}

/* ---- Main Page ---- */
export default function Home() {
  /* Blobs are purely decorative, no parallax to avoid dark wash on scroll */

  return (
    <main className="relative min-h-screen bg-base text-text-primary">
      {/* Noise overlay */}
      <div className="noise-overlay" />

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
      <section className="relative z-10 min-h-screen">
        {/* Floating dashboards - hidden below 1100px */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hero-cards-container">
          {/* Left: Founder Pitch */}
          <div
            className="absolute left-[3%] 2xl:left-[5%] top-1/2 -translate-y-1/2 pointer-events-auto dashboard-entrance"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="dashboard-group relative">
              <div className="glow-behind glow-behind-blue" />
              <div className="animate-float">
                <FounderPitchCard />
              </div>
            </div>
          </div>

          {/* Right: Investor Match */}
          <div
            className="absolute right-[3%] 2xl:right-[5%] top-1/2 -translate-y-1/2 pointer-events-auto dashboard-entrance"
            style={{ animationDelay: "0.9s" }}
          >
            <div className="dashboard-group relative">
              <div className="glow-behind glow-behind-violet" />
              <div className="animate-float-delayed">
                <InvestorMatchCard />
              </div>
            </div>
          </div>
        </div>

        {/* Centered hero text */}
        <div className="flex flex-col items-center justify-center text-center px-6 min-h-screen max-w-5xl mx-auto relative z-10 pt-[120px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            transition={{ delayChildren: 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Eyebrow - gradient text */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="gradient-text text-[10px] md:text-[13px] tracking-[2px] md:tracking-[5px] uppercase mb-6 font-medium"
            >
              Founding Cohort Now Open
            </motion.p>

            {/* Headline - 2 staggered lines */}
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease }}
                className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-normal leading-[1.1] tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif", color: "#0F172A", textShadow: "0 0 40px rgba(74,108,247,0.08)" }}
              >
                Where <span className="gradient-text">Real Ideas</span>
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease }}
                className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-normal leading-[1.1] tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif", color: "#0F172A", textShadow: "0 0 40px rgba(74,108,247,0.08)" }}
              >
                Meet <span className="gradient-text">Real Capital.</span>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="text-[17px] max-w-full px-2 md:max-w-[600px] md:px-0 mb-12 leading-[1.8] text-center"
              style={{ color: "#475569", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              UrgenC is the first real fundraising app.<br />
              Founders pitch. Investors swipe.<br />
              When interest is mutual, the meeting is guaranteed.<br />
              Everyone here actually meets. If you don&apos;t, you&apos;re removed.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/waitlist"
                className="w-full sm:w-auto group btn-shimmer btn-hero-glow inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-semibold text-white rounded-2xl"
                style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
              >
                Join the Waitlist
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/apply/investor"
                className="w-full sm:w-auto group btn-shimmer btn-hero-secondary inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-medium"
              >
                I&apos;m an Investor
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* University pill */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] text-text-muted/70 text-center"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                border: "1px solid rgba(0, 0, 0, 0.04)",
                backdropFilter: "blur(8px)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Every application scored by a proprietary system built with entrepreneurship faculty from HBS, BU, and Northeastern.
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <HowItWorksSection />

      {/* ============ HOW MATCHING WORKS ============ */}
      <MatchingFlowSection />

      {/* ============ THE FOUNDING COHORT ============ */}
      <Section className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
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
            className="gradient-text text-[13px] tracking-[4px] uppercase mb-4 font-medium"
          >
            Early Access
          </motion.p>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-[36px] font-normal text-center mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            The Founding Cohort
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-center max-w-[700px] text-[17px] leading-[1.7] mb-12"
            style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Think of it like Y Combinator, but your idea can just be an idea. We are building the founding cohort now. Join the waitlist to be considered. If your idea scores well, we invite you to complete the full application.
          </motion.p>

          {/* Benefit cards */}
          <motion.div
            variants={cardStagger}
            className="grid md:grid-cols-3 gap-6 w-full mb-10"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
              <div className="glow-card-wrapper h-full">
                <div className="glass p-7 h-full" style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(40px)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
                    <path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
                    <polyline points="12 3 12 15" />
                    <path d="M8 7l4-4 4 4" />
                    <rect x="2" y="12" width="20" height="2" rx="1" />
                  </svg>
                  <h3 className="text-[18px] font-semibold text-text-primary mb-2" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Early Access</h3>
                  <p className="text-[15px] text-text-muted leading-[1.6]">Platform access before anyone else. Build your profile and start matching first.</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
              <div className="glow-card-wrapper h-full">
                <div className="glass p-7 h-full" style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(40px)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <h3 className="text-[18px] font-semibold text-text-primary mb-2" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Discounted Premium</h3>
                  <p className="text-[15px] text-text-muted leading-[1.6]">Lock in the lowest rate on premium features. Forever.</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
              <div className="glow-card-wrapper h-full">
                <div className="glass p-7 h-full" style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(40px)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
                    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                  </svg>
                  <h3 className="text-[18px] font-semibold text-text-primary mb-2" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Direct Founder Access</h3>
                  <p className="text-[15px] text-text-muted leading-[1.6]">Direct line to Logan and Benjamin. Shape the product with us.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* For Founders / For Investors details */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="w-full mb-10 rounded-2xl p-6 md:p-8 grid md:grid-cols-2 gap-8"
            style={{
              background: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0, 0, 0, 0.06)",
            }}
          >
            <div>
              <p className="text-[12px] uppercase tracking-[3px] text-text-muted mb-3" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>For Founders:</p>
              <p className="text-[15px] leading-[1.7] text-text-secondary" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                Step 1: Join the waitlist. Tell us your idea in 60 seconds. Step 2: If we like what we see, we invite you to submit the full application with your pitch deck and video. Step 3: Get accepted and start matching with investors.
              </p>
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-[3px] text-text-muted mb-3" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>For Investors:</p>
              <p className="text-[15px] leading-[1.7] text-text-secondary" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                Investors apply directly. No waitlist. Tell us your thesis, your investment range, and what kind of founders excite you. If accepted, you start seeing matches immediately.
              </p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col sm:flex-row gap-4 mb-4"
          >
            <Link
              href="/waitlist"
              className="w-full sm:w-auto group btn-shimmer btn-hero-glow inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-semibold text-white rounded-2xl"
              style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
            >
              Join the Waitlist
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/apply/investor"
              className="w-full sm:w-auto group btn-shimmer btn-hero-secondary inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-medium"
            >
              Apply as Investor
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-[13px] text-text-muted"
          >
            100 startup spots. 20 investor spots. First come, first evaluated.
          </motion.p>
        </motion.div>
      </Section>

      {/* ============ FOR INVESTORS / FOR STARTUPS ============ */}
      <Section id="for-investors" className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid md:grid-cols-2 gap-6 md:gap-8"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
          >
            <div className="h-full rounded-2xl p-8 md:p-10 flex flex-col" style={{ background: "rgba(255, 255, 255, 0.45)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", border: "1px solid rgba(0, 0, 0, 0.06)" }}>
                <h3
                  className="text-[28px] md:text-[32px] font-normal mb-8 text-text-primary"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  For Investors
                </h3>
                <ul className="flex flex-col gap-4 flex-1">
                  {[
                    "Founding cohort = lifetime free access. Apply before spots close.",
                    "First time investing? Good. UrgenC is built for you.",
                    "Every founder scored on vision, team, market, and momentum.",
                    "Browse. Match. 20-minute call. That is the whole process.",
                    "No obligations. Express interest, take the call, decide from there. Simple.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent-blue mt-2 shrink-0" />
                      <span className="text-text-secondary text-[15px] md:text-[16px] leading-[1.7]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/apply/investor"
                  className="inline-flex items-center justify-center w-full px-6 py-3.5 text-[15px] font-semibold text-white rounded-full mt-8"
                  style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
                >
                  Apply as Investor
                </Link>
            </div>
          </motion.div>

          <motion.div
            id="for-startups"
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
          >
            <div className="h-full rounded-2xl p-8 md:p-10 flex flex-col" style={{ background: "rgba(255, 255, 255, 0.45)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", border: "1px solid rgba(0, 0, 0, 0.06)" }}>
                <h3
                  className="text-[28px] md:text-[32px] font-normal mb-8 text-text-primary"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  For Startups
                </h3>
                <ul className="flex flex-col gap-4 flex-1">
                  {[
                    "Founding members get first access to the investor network.",
                    "Your video pitch matters more than your revenue. Pre-revenue welcome.",
                    "Get matched with investors in days, not 6 months.",
                    "No traction in 30 days? You get cycled out. Stay sharp.",
                    "We guarantee the meeting. We do not guarantee the deal. Your pitch does the rest.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent-violet mt-2 shrink-0" />
                      <span className="text-text-secondary text-[15px] md:text-[16px] leading-[1.7]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/waitlist"
                  className="inline-flex items-center justify-center w-full px-6 py-3.5 text-[15px] font-semibold text-white rounded-full mt-8"
                  style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
                >
                  Join the Waitlist
                </Link>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* ============ iMESSAGE MOCKUP ============ */}
      <Section className="relative z-10 px-6 py-20">
        <div className="flex flex-col items-center">
          {/* iMessage card */}
          <div
            className="w-full max-w-[380px] mx-4 overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              borderRadius: "24px",
              border: "1px solid rgba(0, 0, 0, 0.06)",
            }}
          >
            {/* iMessage header bar */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: "rgba(0, 0, 0, 0.03)" }}
            >
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="8 2 2 8 8 14" />
              </svg>
              <p
                className="font-semibold text-[15px]"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0F172A" }}
              >
                Jake
              </p>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>

            {/* Message bubbles */}
            <div className="px-4 py-4 flex flex-col gap-2.5">
              {/* Received */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.1, ease }}
                className="flex justify-start"
              >
                <div
                  className="px-3.5 py-2.5 max-w-[260px] text-[14px]"
                  style={{
                    background: "rgba(0, 0, 0, 0.06)",
                    borderRadius: "18px 18px 18px 6px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    color: "#0F172A",
                  }}
                >
                  Dude I literally just built an app with AI in my dorm
                </div>
              </motion.div>

              {/* Sent */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.4, ease }}
                className="flex justify-end"
              >
                <div
                  className="px-3.5 py-2.5 max-w-[260px] text-[14px] text-white"
                  style={{
                    background: "#4A6CF7",
                    borderRadius: "18px 18px 6px 18px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  Wait what?? That is insane
                </div>
              </motion.div>

              {/* Received */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.7, ease }}
                className="flex justify-start"
              >
                <div
                  className="px-3.5 py-2.5 max-w-[260px] text-[14px]"
                  style={{
                    background: "rgba(0, 0, 0, 0.06)",
                    borderRadius: "18px 18px 18px 6px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    color: "#0F172A",
                  }}
                >
                  Yeah but there is no way I am gonna find an investor
                </div>
              </motion.div>

              {/* Sent */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 1.0, ease }}
                className="flex justify-end"
              >
                <div
                  className="px-3.5 py-2.5 max-w-[260px] text-[14px] text-white"
                  style={{
                    background: "#4A6CF7",
                    borderRadius: "18px 18px 6px 18px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  Bro use UrgenC
                </div>
              </motion.div>

              {/* Received */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 1.3, ease }}
                className="flex justify-start"
              >
                <div
                  className="px-3.5 py-2.5 max-w-[260px] text-[14px]"
                  style={{
                    background: "rgba(0, 0, 0, 0.06)",
                    borderRadius: "18px 18px 18px 6px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    color: "#0F172A",
                  }}
                >
                  What is that?
                </div>
              </motion.div>

              {/* Sent - the explanation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 1.6, ease }}
                className="flex justify-end"
              >
                <div
                  className="px-3.5 py-2.5 max-w-[260px] text-[14px] text-white"
                  style={{
                    background: "#4A6CF7",
                    borderRadius: "18px 18px 6px 18px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  It is like Tinder but for startups and investors. You pitch, investors swipe, and if they like you they match and you get on a call
                </div>
              </motion.div>

              {/* Link preview bubble */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 2.0, ease }}
                className="flex justify-end"
              >
                <div
                  className="max-w-[260px] overflow-hidden"
                  style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "16px",
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                  }}
                >
                  {/* Gradient top bar */}
                  <div
                    className="w-full"
                    style={{
                      height: "4px",
                      background: "linear-gradient(90deg, #4A6CF7, #7C5CFC)",
                    }}
                  />
                  <div className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#7C5CFC" strokeWidth="1.5" />
                        <path d="M8 12a4 4 0 108 0 4 4 0 00-8 0z" fill="#4A6CF7" opacity="0.6" />
                      </svg>
                      <span className="text-[11px]" style={{ color: "#94A3B8" }}>urgenc.com</span>
                    </div>
                    <p
                      className="text-[13px] font-semibold mb-0.5"
                      style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0F172A" }}
                    >
                      UrgenC | Where Capital Meets Vision
                    </p>
                    <p className="text-[12px]" style={{ color: "#94A3B8" }}>
                      A matching app for startups and investors.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Caption below */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 2.3, ease }}
            className="mt-6 text-center text-[13px] italic"
            style={{ color: "#94A3B8" }}
          >
            This is the conversation happening on every college campus right now.
          </motion.p>
        </div>
      </Section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative z-10 py-20">
        {/* Floating decorative cards */}
        <div className="absolute inset-0 overflow-hidden hidden lg:block pointer-events-none">
          {/* Left: Match Notification */}
          <div
            className="absolute left-[4%] xl:left-[8%] 2xl:left-[12%] top-1/2 -translate-y-1/2 pointer-events-auto dashboard-entrance"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="dashboard-group relative">
              <div className="glow-behind glow-behind-blue" style={{ width: "280px", height: "280px" }} />
              <div className="animate-float">
                <MatchNotificationCard />
              </div>
            </div>
          </div>

          {/* Right: Chemistry Call */}
          <div
            className="absolute right-[4%] xl:right-[8%] 2xl:right-[12%] top-1/2 -translate-y-1/2 pointer-events-auto dashboard-entrance"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="dashboard-group relative">
              <div className="glow-behind glow-behind-violet" style={{ width: "280px", height: "280px" }} />
              <div className="animate-float-delayed">
                <ChemistryCallCard />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Content */}
        <motion.div
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: 0.6, ease }}
          className="relative max-w-4xl mx-auto px-6 text-center"
        >
          <motion.div
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col items-center"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="text-[28px] md:text-[36px] lg:text-[48px] font-normal mb-6"
              style={{ fontFamily: "'Instrument Serif', serif", textShadow: "0 0 40px rgba(74,108,247,0.08)" }}
            >
              Ready to Join the <span className="gradient-text">Network</span>?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="text-[17px] md:text-[18px] mb-10 max-w-xl leading-[1.7]"
              style={{ color: "#475569" }}
            >
              Founding members get early access, discounted premium, and a direct line to us. Spots are limited.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col items-center"
            >
              <Link
                href="/waitlist"
                className="group btn-shimmer btn-hero-glow inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-semibold text-white rounded-2xl"
                style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
              >
                Join the Waitlist
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Urgency pill */}
              <div
                className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full text-[14px] text-center"
                style={{
                  background: "rgba(245, 158, 11, 0.05)",
                  border: "1px solid rgba(245, 158, 11, 0.15)",
                  color: "#92400E",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                67 of 100 startup spots remaining. 14 of 20 investor spots remaining.
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ============ EMAIL CAPTURE ============ */}
      <div className="relative z-10 border-t" style={{ borderColor: "rgba(0, 0, 0, 0.06)" }}>
        <EmailCapture />
      </div>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-10">
        <div className="border-t border-black/[0.06]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="text-[18px] font-normal text-text-primary"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              UrgenC
            </Link>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[12px] text-center max-w-[600px]" style={{ color: "#94A3B8" }}>
                UrgenC is a matching and meeting platform. We do not provide investment advice, facilitate financial transactions, or act as a broker-dealer. All investment decisions and transactions occur off-platform between the parties involved.
              </p>
              <p className="text-text-muted/60 text-[13px]">
                &copy; 2026 UrgenC. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/apply/investor"
                className="text-text-muted/60 hover:text-text-secondary transition-colors duration-300 text-[13px]"
              >
                Apply as Investor
              </Link>
              <a
                href="#"
                className="text-text-muted/60 hover:text-text-secondary transition-colors duration-300 text-[13px]"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-text-muted/60 hover:text-text-secondary transition-colors duration-300 text-[13px]"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
