"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";
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

/* ---- Waitlist Counter with CountUp ---- */
function WaitlistCountUp({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [value, setValue] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  React.useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return <span ref={ref} className="font-semibold" style={{ color: "#0F172A" }}>{value}</span>;
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
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-grow h-[48px] rounded-xl px-4 text-[15px] text-text-primary placeholder:text-text-muted/50 outline-none"
            style={{
              background: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(0, 0, 0, 0.06)",
            }}
          />
          <button
            type="submit"
            className="h-[48px] px-6 rounded-xl text-[15px] font-semibold text-white shrink-0"
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
    desc: "Submit your pitch deck and 60-second video. Our proprietary scoring system, built with faculty from HBS, BU, and Northeastern, evaluates vision, team, market, and momentum. Less than 15% get in.",
  },
  {
    num: "02",
    icon: <SparkleIcon />,
    title: "Get Matched by Fit",
    desc: "Our algorithm pairs investors with startups at their level. We are launching with investments up to $25K matched with early-stage startups. As the platform grows, higher tiers unlock. Your investment size determines your match tier.",
  },
  {
    num: "03",
    icon: <PhoneIcon />,
    title: "Move Fast or Move On",
    desc: "72 hours to take the call. 30 days to show traction. No-shows and ghosters get removed. Every conversation on Nexus is between two serious people.",
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
    <Section id="how-it-works" className="relative z-10 px-6 py-24 md:py-32 max-w-6xl mx-auto">
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
                        <p className="text-text-secondary text-[14px] leading-[1.6] line-clamp-2">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Preview area + progress dots */}
            <div className="flex-1 flex flex-col gap-4">
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
              <div className="flex items-center justify-center gap-3">
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

const feedStartups = [
  { name: "Luminary AI", initial: "L", tag: "AI / ML", mrr: "$45K", users: "2.4K", growth: "180%", pipeline: "$2M", gradFrom: "#4A6CF7", gradTo: "#7C5CFC" },
  { name: "Stackpay", initial: "S", tag: "Fintech", mrr: "$82K", users: "34", usersLabel: "Clients", growth: "95%", pipeline: "$4.1M", gradFrom: "#22c55e", gradTo: "#14b8a6" },
  { name: "Terraform Health", initial: "T", tag: "HealthTech", mrr: "$12K", users: "890", growth: "240%", pipeline: "$800K", gradFrom: "#f59e0b", gradTo: "#ef4444" },
];

function InvestorFeedCard() {
  const [idx, setIdx] = useState(0);
  const [matchCount, setMatchCount] = useState(247);
  const [greenPulse, setGreenPulse] = useState(false);

  useEffect(() => {
    // Cycle startups every 4s
    const t = setInterval(() => setIdx((p) => (p + 1) % feedStartups.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // Match counter every 3s
    const t = setInterval(() => setMatchCount((p) => p + 1), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // Green button pulse every 6s
    const t = setInterval(() => {
      setGreenPulse(true);
      setTimeout(() => setGreenPulse(false), 800);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const s = feedStartups[idx];

  return (
    <div
      className="w-[320px] h-[420px] rounded-2xl p-6 dashboard-card relative overflow-hidden"
      style={{
        background: "rgba(10, 10, 15, 0.92)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(74, 108, 247, 0.25)",
        boxShadow: "0 0 40px rgba(74, 108, 247, 0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Inner depth gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3))" }} />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-white/60 text-[12px] tracking-[2px] uppercase font-medium">Investor Feed</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] live-dot-pulse" />
            <span className="text-[11px] text-[#22c55e]/80">Live</span>
          </div>
        </div>

        {/* Match counter */}
        <p className="text-white/30 text-[11px] mb-4">
          <span className="text-white/60 font-medium tabular-nums">{matchCount}</span> matches today
        </p>

        {/* Startup card mockup - crossfade */}
        <div className="bg-white/[0.06] rounded-xl p-4 mb-4 border border-white/[0.08]">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0"
                  style={{ background: `linear-gradient(135deg, ${s.gradFrom}, ${s.gradTo})` }}
                >
                  {s.initial}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-[15px] font-semibold leading-tight">{s.name}</p>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#4A6CF7]/20 text-[#4A6CF7] inline-block mt-1">
                    {s.tag}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                <div><p className="text-white/35 text-[10px] mb-0.5">MRR</p><p className="text-white font-medium text-[13px]">{s.mrr}</p></div>
                <div><p className="text-white/35 text-[10px] mb-0.5">{s.usersLabel || "Users"}</p><p className="text-white font-medium text-[13px]">{s.users}</p></div>
                <div><p className="text-white/35 text-[10px] mb-0.5">Growth</p><p className="text-white font-medium text-[13px] text-[#22c55e]">{s.growth}</p></div>
                <div><p className="text-white/35 text-[10px] mb-0.5">Pipeline</p><p className="text-white font-medium text-[13px]">{s.pipeline}</p></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 pt-1">
          <div className="w-10 h-10 rounded-full border border-red-400/20 bg-red-400/5 flex items-center justify-center text-red-400/50 cursor-default">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#4A6CF7]/25 bg-[#4A6CF7]/8 flex items-center justify-center text-[#4A6CF7]/60 cursor-default">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          </div>
          <div
            className="w-10 h-10 rounded-full border border-[#22c55e]/25 bg-[#22c55e]/8 flex items-center justify-center text-[#22c55e]/60 cursor-default transition-shadow duration-300"
            style={greenPulse ? { boxShadow: "0 0 16px rgba(34, 197, 94, 0.6)" } : {}}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Chart data sets that rotate */
const chartDataSets = [
  [35, 28, 32, 18, 8],
  [30, 22, 28, 15, 12],
  [38, 32, 20, 25, 6],
];

function MatchAnalyticsCard() {
  const r = 28;
  const circ = 2 * Math.PI * r;

  const [engScore, setEngScore] = useState(94);
  const [scoreGlow, setScoreGlow] = useState(false);
  const [updatedBlink, setUpdatedBlink] = useState(false);
  const [activeInvestors, setActiveInvestors] = useState(89);
  const [chartIdx, setChartIdx] = useState(0);
  const [chartProgress, setChartProgress] = useState(0);

  const offset = circ * (1 - engScore / 100);

  // Engagement score tick every 8s
  useEffect(() => {
    const t = setInterval(() => {
      setEngScore(95);
      setScoreGlow(true);
      setTimeout(() => { setEngScore(94); setScoreGlow(false); }, 2000);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  // Updated blink every 5s
  useEffect(() => {
    const t = setInterval(() => {
      setUpdatedBlink(true);
      setTimeout(() => setUpdatedBlink(false), 600);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  // Active investors counter every 5s
  useEffect(() => {
    const t = setInterval(() => setActiveInvestors((p) => p + 1), 5000);
    return () => clearInterval(t);
  }, []);

  // Animate chart: draw over 2s, pause 2s, then reset with new data
  useEffect(() => {
    let raf: number;
    let start: number;
    const drawDuration = 2000;
    const pauseDuration = 2000;
    const totalCycle = drawDuration + pauseDuration;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = (ts - start) % totalCycle;
      if (elapsed < drawDuration) {
        setChartProgress(elapsed / drawDuration);
      } else {
        setChartProgress(1);
        // At the end of pause, switch data
        if (elapsed >= totalCycle - 50) {
          start = ts;
          setChartIdx((p) => (p + 1) % chartDataSets.length);
        }
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const points = chartDataSets[chartIdx];
  const buildPath = (pts: number[]) => pts.map((y, i) => `${i === 0 ? "M" : "L"}${i * 50},${y}`).join(" ");
  const fullPath = buildPath(points);
  const areaPath = `${fullPath} L200,50 L0,50 Z`;

  // Calculate total path length for stroke-dasharray animation
  const pathLength = 210; // approximate

  return (
    <div
      className="w-[320px] h-[420px] rounded-2xl p-6 dashboard-card relative overflow-hidden"
      style={{
        background: "rgba(10, 10, 15, 0.92)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(124, 92, 252, 0.25)",
        boxShadow: "0 0 40px rgba(124, 92, 252, 0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Inner depth gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3))" }} />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-white/60 text-[12px] tracking-[2px] uppercase font-medium">Match Analytics</p>
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full bg-[#4A6CF7] transition-all duration-300"
              style={updatedBlink ? { boxShadow: "0 0 8px #4A6CF7", transform: "scale(1.5)" } : {}}
            />
            <span
              className="text-[11px] transition-opacity duration-300"
              style={{ color: updatedBlink ? "rgba(74, 108, 247, 1)" : "rgba(74, 108, 247, 0.7)" }}
            >
              Updated
            </span>
          </div>
        </div>

        {/* Active investors counter */}
        <p className="text-white/30 text-[11px] mb-4">
          Active investors: <span className="text-white/60 font-medium tabular-nums">{activeInvestors}</span>
        </p>

        {/* Score ring + label */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-[72px] h-[72px] shrink-0">
            <svg viewBox="0 0 70 70" className="w-full h-full -rotate-90">
              <circle cx="35" cy="35" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4A6CF7" />
                  <stop offset="100%" stopColor="#7C5CFC" />
                </linearGradient>
              </defs>
              <circle
                cx="35" cy="35" r={r} fill="none"
                stroke="url(#scoreGrad)" strokeWidth="5" strokeLinecap="round"
                strokeDasharray={circ} strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
            <span
              className="absolute inset-0 flex items-center justify-center text-white text-[20px] font-bold transition-all duration-300"
              style={scoreGlow ? { textShadow: "0 0 12px rgba(74, 108, 247, 0.8)" } : {}}
            >
              {engScore}
            </span>
          </div>
          <div className="text-[12px]">
            <p className="text-white/35">Engagement</p>
            <p className="text-white font-semibold text-[14px]">Score</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#22c55e]/10 text-[#22c55e] mt-1 inline-block">Top 5%</span>
          </div>
        </div>

        {/* Animated line chart */}
        <div className="mb-5 px-1">
          <svg viewBox="0 0 200 50" className="w-full h-[44px]">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4A6CF7" />
                <stop offset="100%" stopColor="#7C5CFC" />
              </linearGradient>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A6CF7" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#areaGrad)" style={{ opacity: chartProgress }} />
            <path
              d={fullPath}
              fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round"
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength * (1 - chartProgress)}
            />
            {points.map((y, i) => (
              <circle
                key={i} cx={i * 50} cy={y} r="3"
                fill="#4A6CF7" stroke="rgba(10,10,15,0.92)" strokeWidth="1.5"
                style={{ opacity: chartProgress > (i / points.length) ? 1 : 0, transition: "opacity 0.2s" }}
              />
            ))}
          </svg>
        </div>

        {/* Stats */}
        <div className="space-y-2.5 text-[13px] mb-5">
          <div className="flex justify-between">
            <span className="text-white/35">Matches This Week</span>
            <span className="text-white font-medium">7</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/35">Follow-Up Rate</span>
            <span className="text-white font-medium">89%</span>
          </div>
        </div>

        {/* Top Sectors with breathing bars */}
        <div>
          <p className="text-white/35 text-[11px] mb-2">Top Sectors</p>
          <div className="space-y-2">
            {[
              { label: "AI", width: 85 },
              { label: "SaaS", width: 60 },
              { label: "Fintech", width: 40 },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-white/45 text-[10px] w-[40px]">{s.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full sector-bar-breathe"
                    style={{
                      width: `${s.width}%`,
                      background: "linear-gradient(90deg, #4A6CF7, #7C5CFC)",
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
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
        background: "rgba(10, 10, 15, 0.85)",
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
        background: "rgba(10, 10, 15, 0.85)",
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

/* ---- Main Page ---- */
export default function Home() {
  const blobsRef = useRef<HTMLDivElement>(null);

  /* Parallax scroll for background blobs */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (blobsRef.current) {
            blobsRef.current.style.transform = `translateY(${window.scrollY * 0.1}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-base text-text-primary">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Background gradient blobs with parallax */}
      <div
        ref={blobsRef}
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        style={{ willChange: "transform" }}
      >
        <div className="blob blob-blue animate-blob-1 -top-[5%] right-[10%]" />
        <div className="blob blob-lavender animate-blob-2 top-[40%] -left-[5%]" />
        <div className="blob blob-peach animate-blob-3 bottom-[10%] right-[20%]" />
      </div>

      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative z-10 min-h-screen">
        {/* Floating dashboards */}
        <div className="absolute inset-0 overflow-hidden hidden xl:block pointer-events-none">
          {/* Left: Investor Feed */}
          <div
            className="absolute left-[3%] 2xl:left-[5%] top-1/2 -translate-y-1/2 pointer-events-auto dashboard-entrance"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="dashboard-group relative">
              <div className="glow-behind glow-behind-blue" />
              <div className="animate-float">
                <InvestorFeedCard />
              </div>
            </div>
          </div>

          {/* Right: Match Analytics */}
          <div
            className="absolute right-[3%] 2xl:right-[5%] top-1/2 -translate-y-1/2 pointer-events-auto dashboard-entrance"
            style={{ animationDelay: "0.9s" }}
          >
            <div className="dashboard-group relative">
              <div className="glow-behind glow-behind-violet" />
              <div className="animate-float-delayed">
                <MatchAnalyticsCard />
              </div>
            </div>
          </div>
        </div>

        {/* Centered hero text */}
        <div className="flex flex-col items-center justify-center text-center px-6 min-h-screen max-w-5xl mx-auto relative z-10">
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
              className="gradient-text text-[13px] tracking-[5px] uppercase mb-6 font-medium"
            >
              Launching Spring 2026 | Founding Cohort Now Open
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="text-[44px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-normal leading-[1.1] tracking-tight mb-8"
              style={{ fontFamily: "'Instrument Serif', serif", textShadow: "0 0 40px rgba(74,108,247,0.08)" }}
            >
              Where Capital
              <br />
              Meets <span className="gradient-text">Vision</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="text-[17px] md:text-[19px] max-w-[600px] mb-12 leading-[1.8]"
              style={{ color: "#475569" }}
            >
              A matching app for startups and investors. Founders pitch. Investors browse. When interest is mutual, they connect. Not everyone gets in. Less than 15% of applicants are accepted. We are now accepting applications for our founding cohort.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/apply/investor"
                className="group btn-shimmer btn-hero-glow inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-semibold text-white rounded-2xl"
                style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
              >
                Apply as Investor
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/apply/startup"
                className="group btn-shimmer btn-hero-secondary inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-medium"
              >
                Apply as Startup
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Waitlist counter */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[15px]"
              style={{
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse shrink-0" />
              <span style={{ color: "#64748B" }}>
                <WaitlistCountUp target={412} duration={1500} /> founders and <WaitlistCountUp target={203} duration={1500} /> investors have applied
              </span>
            </motion.div>

            {/* University pill */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] text-text-muted/70"
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

      {/* ============ WHY WE BUILT THIS ============ */}
      <Section className="relative z-10 px-6 py-24 md:py-32 max-w-4xl mx-auto">
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
            className="text-[36px] font-normal text-center mb-8"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Best Friends. Different Paths. One Mission.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-center max-w-[680px] text-[17px] leading-[1.8] mb-12"
            style={{ color: "#475569", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Best friends since high school. Different paths through Boston. Same frustration: the startup world felt impossible to break into. So we built the door. Nexus exists because we believe being a founder or investor should be attainable for anyone willing to do the work.
          </motion.p>

          {/* Founder cards */}
          <motion.div
            variants={cardStagger}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="glass p-5 flex items-center gap-3 max-w-[280px]"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0"
                style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
              >
                LK
              </div>
              <div>
                <p className="text-[16px] font-semibold text-text-primary">Logan Kay</p>
                <p className="text-[13px] text-text-muted">Co-Founder</p>
                <p className="text-[13px] text-text-muted">Boston University | AI &amp; Ops @ Harvard Business School</p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="glass p-5 flex items-center gap-3 max-w-[280px]"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0"
                style={{ background: "linear-gradient(135deg, #7C5CFC, #B06CFC)" }}
              >
                BK
              </div>
              <div>
                <p className="text-[16px] font-semibold text-text-primary">Ben Kay</p>
                <p className="text-[13px] text-text-muted">Co-Founder</p>
                <p className="text-[13px] text-text-muted">Northeastern University | Institutional Equity @ Morgan Stanley</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Read Our Full Story CTA */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="mt-10"
          >
            <Link
              href="/story"
              className="group btn-shimmer btn-hero-secondary inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-medium"
            >
              Read Our Full Story
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </Section>

      {/* ============ HOW IT WORKS ============ */}
      <HowItWorksSection />

      {/* ============ STATS (DARK SECTION) ============ */}
      <section className="relative z-10 py-24 md:py-32 bg-dark-section overflow-hidden">
        <ParticleField />
        <div className="grid-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(74,108,247,0.08)_0%,_rgba(124,92,252,0.05)_40%,_transparent_70%)]" />
        </div>

        <motion.div
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: 0.6, ease }}
          className="relative max-w-6xl mx-auto px-6"
        >
          <div className="glass-dark px-6 py-12 md:px-16 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center">
              {[
                { value: "Up to $25K", label: "Launch Investment Tier" },
                { value: "<15%", label: "Target Acceptance Rate" },
                { value: "72hrs", label: "Match Response Window" },
                { value: "30 days", label: "To Prove Traction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-[32px] sm:text-[40px] md:text-[52px] font-normal text-white leading-none mb-2"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[#9CA3AF] text-[13px] md:text-[14px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-12 left-0 right-0 h-px overflow-hidden pointer-events-none">
          <div className="sweep-line" />
        </div>
      </section>

      {/* ============ THE FOUNDING COHORT ============ */}
      <Section className="relative z-10 px-6 py-24 md:py-32 max-w-6xl mx-auto">
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
            Before Nexus opens to the public, we are hand-selecting 100 startups and 50 investors to be our founding members. This is for people who want to be first, not people who want to wait and see. Founding members get permanent benefits that will never be offered again.
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
                  <p className="text-[15px] text-text-muted leading-[1.6]">Founding members get access to the platform before it opens to the public. Start building your profile and network ahead of everyone else.</p>
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
                  <p className="text-[15px] text-text-muted leading-[1.6]">Founding members lock in a permanently discounted rate on premium features. As pricing scales, yours stays low.</p>
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
                  <p className="text-[15px] text-text-muted leading-[1.6]">A direct line to Logan and Ben. Share feedback, suggest features, and help shape the direction of Nexus as it grows.</p>
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
                You have an idea, a team, or early traction. You want investors who actually get what you are building. You are willing to put yourself on camera for 60 seconds and be held accountable. Apply and get scored by our system. If you make the cut, you are in the founding class.
              </p>
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-[3px] text-text-muted mb-3" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>For Investors:</p>
              <p className="text-[15px] leading-[1.7] text-text-secondary" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                You have been watching the startup wave and want in. Maybe it is your first investment. Maybe your tenth. The amount does not matter as much as the conviction. You will be matched with startups scored and vetted by our system. Show up, take the calls, and back what excites you.
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
              href="/apply/startup"
              className="group btn-shimmer btn-hero-glow inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-semibold text-white rounded-2xl"
              style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
            >
              Apply as Founder
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/apply/investor"
              className="group btn-shimmer btn-hero-secondary inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-medium"
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
            100 startup spots. 50 investor spots. First come, first evaluated.
          </motion.p>
        </motion.div>
      </Section>

      {/* ============ FOR INVESTORS / FOR STARTUPS ============ */}
      <Section id="for-investors" className="relative z-10 px-6 py-24 md:py-32 max-w-6xl mx-auto">
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
            <div className="glow-card-wrapper h-full">
              <div className="glass p-8 md:p-10 h-full flex flex-col">
                <h3
                  className="text-[28px] md:text-[32px] font-normal mb-8 text-text-primary"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  For Investors
                </h3>
                <ul className="flex flex-col gap-4 flex-1">
                  {[
                    "Founding cohort members get lifetime free access. Apply now before spots close.",
                    "First time investing in a startup? Nexus is literally built for you. No experience required.",
                    "Every founder has been scored on vision, team, market, and momentum by our proprietary system.",
                    "You browse. You match. You take a 20-minute chemistry call. That is the whole process.",
                    "Everyone is talking about startups and AI. This is how you actually get involved instead of watching from the sidelines.",
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
                  className="btn-primary btn-pulse-target px-6 py-3.5 text-[15px] font-medium mt-8 text-center"
                >
                  Apply as Investor
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            id="for-startups"
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
          >
            <div className="glow-card-wrapper h-full">
              <div className="glass p-8 md:p-10 h-full flex flex-col">
                <h3
                  className="text-[28px] md:text-[32px] font-normal mb-8 text-text-primary"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  For Startups
                </h3>
                <ul className="flex flex-col gap-4 flex-1">
                  {[
                    "Founding startup members get lifetime benefits and first access to the investor network.",
                    "Your 60-second video pitch and vision matter more than your revenue. Pre-revenue founders welcome.",
                    "Stop spending 6 months fundraising. Get matched with interested investors in days.",
                    "30 days to show traction or you get cycled out. This keeps you accountable and the platform elite.",
                    "Less than 15% of startups get accepted. Being on Nexus is a credibility signal in itself.",
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
                  href="/apply/startup"
                  className="btn-primary btn-pulse-target px-6 py-3.5 text-[15px] font-medium mt-8 text-center"
                >
                  Apply as Startup
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative z-10 py-24 md:py-32">
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
              className="text-[36px] md:text-[48px] font-normal mb-6"
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
              The founding cohort is filling up. Founding members get lifetime free access, priority matching, and a voice in building the platform. Whether you want to invest in startups or raise from investors who actually care, the door is open. For now.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col items-center"
            >
              <Link
                href="/apply/investor"
                className="group btn-shimmer btn-hero-glow inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-semibold text-white rounded-2xl"
                style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
              >
                Apply for Access
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Urgency pill */}
              <div
                className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full text-[14px]"
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
                67 of 100 startup spots remaining. 38 of 50 investor spots remaining.
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
            <a
              href="#"
              className="text-[14px] font-bold tracking-[0.3em] text-text-primary"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              NEXUS
            </a>
            <p className="text-text-muted/60 text-[13px]">
              &copy; 2026 Nexus. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
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
