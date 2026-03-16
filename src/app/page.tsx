"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import IPhoneMockups from "@/components/IPhoneMockups";
import LottieAnimation from "@/components/LottieAnimation";
import HeroHeadline from "@/components/HeroHeadline";

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const el = btnRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        const x = Math.round(dx * 0.05 * 10) / 10;
        const y = Math.round(dy * 0.05 * 10) / 10;
        el.style.transform = `translate(${x}px, ${y}px)`;
      } else {
        el.style.transform = "translate(0, 0)";
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={btnRef}
      style={{
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


const narrativeText = "The startup world is full of ideas. The problem has never been building. It is getting in front of the right people.";

function getWordVariants(mobile: boolean) {
  const yOffset = mobile ? 3 : 5;
  const ease = [0.25, 0.1, 0.25, 1.0] as const;
  return {
    hidden: { opacity: 0, y: yOffset, filter: "blur(3px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: i * 0.045, duration: 0.45, ease },
    }),
  };
}

function NarrativeLine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  const wordVariants = getWordVariants(isMobile);
  const words = narrativeText.split(" ");

  // "people." is the last word — find its index
  const accentIndex = words.findIndex((w) => w.startsWith("people"));

  return (
    <section
      className="scroll-stack-section flex items-center justify-center px-6 py-20 md:py-0 w-full"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 2,
        backgroundColor: '#FAF9F7',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <div ref={ref} style={{ maxWidth: "620px", textAlign: "center" }}>
        <p
          className="text-[20px] md:text-[26px] lg:text-[30px] leading-[1.6]"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 400,
            color: "#334155",
          }}
        >
          {words.map((word, i) => {
            const isAccent = i === accentIndex;
            return (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={wordVariants}
                className={`inline-block mr-[0.3em] ${isAccent ? "narrative-accent-word" : ""}`}
                style={
                  isAccent
                    ? {
                        background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                    : undefined
                }
              >
                {word}
              </motion.span>
            );
          })}
        </p>
      </div>
    </section>
  );
}

/* ---- CSS Door Animation ---- */
function DoorAnimation({ animate }: { animate: boolean }) {
  return (
    <div style={{ width: 160, height: 150, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Door frame */}
      <div style={{
        width: 80, height: 110, border: '2px solid #6366F1', borderRadius: 6,
        position: 'relative', overflow: 'visible', background: 'transparent',
        perspective: 500,
        opacity: animate ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}>
        {/* Glow behind door */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 60, height: 80,
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.15), rgba(139,92,246,0.08), transparent)',
          borderRadius: '50%',
          opacity: animate ? 1 : 0,
          transition: 'opacity 0.5s ease 0.6s',
          zIndex: 0,
        }} />
        {/* Door panel */}
        <div style={{
          position: 'absolute', top: 2, left: 2, width: 74, height: 104,
          background: 'rgba(99,102,241,0.08)', borderRadius: 4,
          transformOrigin: 'left center',
          transform: animate ? 'rotateY(-65deg)' : 'rotateY(0deg)',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
          zIndex: 1,
        }}>
          {/* Door knob */}
          <div style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
            width: 8, height: 8, borderRadius: '50%', background: '#6366F1', opacity: 0.6,
          }} />
        </div>
      </div>
      {/* Threshold line */}
      <div style={{
        position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        width: 84, height: 1, background: 'rgba(99,102,241,0.2)',
        opacity: animate ? 1 : 0,
        transition: 'opacity 0.3s ease 0.2s',
      }} />
    </div>
  );
}

/* ---- CSS Shield Animation ---- */
function ShieldAnimation({ animate }: { animate: boolean }) {
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setShowPulse(true), 700);
    return () => clearTimeout(t);
  }, [animate]);

  return (
    <div style={{ width: 160, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 80, height: 95, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Shield outline (behind) */}
        <div style={{
          position: 'absolute', top: -2, left: -2, width: 84, height: 99,
          clipPath: 'polygon(50% 0%, 100% 15%, 100% 60%, 50% 100%, 0% 60%, 0% 15%)',
          background: '#6366F1',
          opacity: animate ? 0.15 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 0,
        }} />
        {/* Shield shape */}
        <div style={{
          width: 80, height: 95,
          clipPath: 'polygon(50% 0%, 100% 15%, 100% 60%, 50% 100%, 0% 60%, 0% 15%)',
          background: 'linear-gradient(180deg, rgba(99,102,241,0.1), rgba(99,102,241,0.04))',
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: animate ? 'scale(1)' : 'scale(0)',
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
          zIndex: 1,
        }}>
          {/* Shield border effect */}
          <div style={{
            position: 'absolute', inset: 0,
            clipPath: 'polygon(50% 0%, 100% 15%, 100% 60%, 50% 100%, 0% 60%, 0% 15%)',
            boxShadow: 'inset 0 0 0 2px #6366F1',
          }} />
          {/* Checkmark */}
          <div style={{
            width: 24, height: 14,
            borderBottom: '3.5px solid #059669', borderLeft: '3.5px solid #059669',
            transform: animate ? 'rotate(-45deg) scale(1)' : 'rotate(-45deg) scale(0)',
            transformOrigin: 'center',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s',
            marginTop: -4,
          }} />
        </div>
        {/* Pulse ring */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: showPulse ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%) scale(0.8)',
          width: 100, height: 110, borderRadius: '50%',
          border: '2px solid rgba(5,150,105,0.3)',
          opacity: showPulse ? 0 : 0,
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
          zIndex: 2,
          pointerEvents: 'none',
        }} />
        {/* Persistent green glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 90, height: 100, borderRadius: '50%',
          boxShadow: '0 0 15px rgba(5,150,105,0.1)',
          opacity: animate ? 1 : 0,
          transition: 'opacity 0.3s ease 0.8s',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      </div>
    </div>
  );
}

/* ---- CSS Match Animation ---- */
function MatchAnimation({ animate }: { animate: boolean }) {
  const [showDot, setShowDot] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const t1 = setTimeout(() => setShowDot(true), 800);
    const t2 = setTimeout(() => setShowCalendar(true), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [animate]);

  return (
    <div style={{ width: 160, height: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      {/* Two circles that slide together */}
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative', height: 40 }}>
        {/* Left circle (investor) */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366F1, #818CF8)',
          transform: animate ? 'translateX(0px)' : 'translateX(-20px)',
          opacity: animate ? 1 : 0,
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
          flexShrink: 0,
        }} />
        {/* Connection line */}
        <div style={{
          height: 3, borderRadius: 2,
          background: 'linear-gradient(90deg, #6366F1, #F5D76E, #8B5CF6)',
          width: animate ? 24 : 0,
          transition: 'width 0.4s ease 0.5s',
          flexShrink: 0,
        }} />
        {/* Gold match dot */}
        <div style={{
          position: 'absolute', left: '50%',
          transform: showDot ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0)',
          width: 12, height: 12, borderRadius: '50%',
          background: '#F5D76E',
          boxShadow: showDot ? '0 0 12px rgba(245,215,110,0.5)' : 'none',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          zIndex: 2,
        }} />
        {/* Right circle (founder) */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, #7C3AED, #8B5CF6)',
          transform: animate ? 'translateX(0px)' : 'translateX(20px)',
          opacity: animate ? 1 : 0,
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
          flexShrink: 0,
        }} />
      </div>
      {/* Labels */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', width: 110,
        opacity: animate ? 1 : 0,
        transition: 'opacity 0.3s ease 0.3s',
      }}>
        <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.25)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>Investor</span>
        <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.25)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>Founder</span>
      </div>
      {/* Calendar + 72h */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        opacity: showCalendar ? 1 : 0,
        transform: showCalendar ? 'translateY(0px)' : 'translateY(8px)',
        transition: 'all 0.4s ease',
      }}>
        <div style={{
          width: 24, height: 24, border: '2px solid #0F172A', borderRadius: 4,
          position: 'relative', opacity: 0.6,
        }}>
          {/* Calendar binding bumps */}
          <div style={{ position: 'absolute', top: -4, left: 5, width: 3, height: 6, background: '#0F172A', borderRadius: 1 }} />
          <div style={{ position: 'absolute', top: -4, right: 5, width: 3, height: 6, background: '#0F172A', borderRadius: 1 }} />
          {/* Small checkmark inside calendar */}
          <div style={{
            position: 'absolute', bottom: 3, left: '50%',
            transform: 'translateX(-50%) rotate(-45deg)',
            width: 8, height: 5,
            borderBottom: '2px solid #059669', borderLeft: '2px solid #059669',
          }} />
        </div>
        <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 16, fontWeight: 700, color: '#6366F1' }}>72h</span>
      </div>
    </div>
  );
}

/* ---- Pillar Row (full-width, alternating layout) ---- */
function PillarRow({ title, desc, Animation, index }: { title: string; desc: string; Animation: React.ComponentType<{ animate: boolean }>; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rowInView = useInView(ref, { once: true, amount: 0.15 });
  const [iconAnimate, setIconAnimate] = useState(false);

  useEffect(() => {
    if (!rowInView) return;
    const t = setTimeout(() => setIconAnimate(true), 200);
    return () => clearTimeout(t);
  }, [rowInView]);

  const isReversed = index === 1;
  const textSlideX = isReversed ? 20 : -20;
  const animSlideX = isReversed ? -20 : 20;

  return (
    <div ref={ref} className="max-w-[960px] mx-auto py-[24px] md:py-[36px]">
      <div
        className={`flex flex-col items-center gap-[20px] md:flex-row md:items-center md:gap-[56px] ${isReversed ? 'md:flex-row-reverse' : ''}`}
      >
        {/* Animation side */}
        <motion.div
          className="flex-shrink-0 flex items-center justify-center w-[140px] h-[130px] md:w-[200px] md:h-[160px]"
          initial={{ opacity: 0, x: animSlideX }}
          animate={rowInView ? { opacity: 1, x: 0 } : { opacity: 0, x: animSlideX }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center w-full h-full scale-[0.8] md:scale-100">
            <Animation animate={iconAnimate} />
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          className="flex-1 text-center md:text-left px-[16px] md:px-0"
          initial={{ opacity: 0, x: textSlideX }}
          animate={rowInView ? { opacity: 1, x: 0 } : { opacity: 0, x: textSlideX }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3
            className="text-[22px] md:text-[24px] font-bold"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0F172A", letterSpacing: "-0.01em" }}
          >
            {title}
          </h3>
          <p
            className="text-[14px] md:text-[15px] mt-3"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#475569", lineHeight: 1.75 }}
          >
            {desc}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ---- Differentiator Rows Data ---- */
const differentiatorRows = [
  {
    title: "A Door That Didn\u2019t Exist",
    desc: "Fundraising has always been about who you know. UrgenC makes it about what you are building. First-time founders get the same shot as serial entrepreneurs. For the first time, access is earned by your idea.",
    Animation: DoorAnimation,
  },
  {
    title: "Every Startup Is Vetted",
    desc: "This is not an open marketplace. Every startup goes through a multi-factor review before investors ever see them. No noise. No spam. No half-baked pitches. If it is on UrgenC, it passed the bar.",
    Animation: ShieldAnimation,
  },
  {
    title: "If You Match, You Meet",
    desc: "On every other platform, interest leads nowhere. On UrgenC, mutual interest is a commitment. Every match gets a 20-minute call within 72 hours. Ghost and you lose your spot. This is not networking. It is a system built for real conversations.",
    Animation: MatchAnimation,
  },
];

function WhatMakesDifferentSection() {
  return (
    <Section className="scroll-stack-section relative z-10 px-5 md:px-6 py-[60px] md:py-[80px] w-full" style={{ position: 'sticky', top: 0, zIndex: 3, backgroundColor: '#FAF9F7', minHeight: '100vh', overflow: 'hidden' }}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center"
        >
          {/* Gradient bar */}
          <motion.div
            variants={tierGradientBar}
            transition={{ duration: 0.4, delay: 0, ease }}
            style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #6366F1, #8B5CF6)', margin: '0 auto 16px auto', transformOrigin: 'center' }}
          />
          {/* Eyebrow */}
          <motion.p
            variants={tierEyebrow}
            transition={{ duration: 0.4, delay: 0.1, ease }}
            className="text-[12px] tracking-[3px] uppercase mb-4"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 600,
              color: "#6366F1",
            }}
          >
            Why UrgenC
          </motion.p>
          {/* Title */}
          <motion.h2
            variants={tierTitle}
            transition={{ duration: 0.7, delay: 0.2, ease: smoothDecel }}
            className="text-[30px] md:text-[44px] font-normal text-center mb-4"
            style={{ fontFamily: "'Instrument Serif', serif", color: "#0F172A", fontWeight: 400 }}
          >
            What Makes UrgenC Different
          </motion.h2>
          {/* Subtitle */}
          <motion.p
            variants={tierSubtitle}
            transition={{ duration: 0.5, delay: 0.35, ease }}
            className="text-center max-w-[480px] text-[17px] leading-[1.7] italic"
            style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Three reasons this has never existed before.
          </motion.p>
        </motion.div>

        {/* Gap then pillar rows */}
        <div className="mt-[40px] md:mt-[56px]">
          {differentiatorRows.map((row, i) => (
            <React.Fragment key={row.title}>
              <PillarRow title={row.title} desc={row.desc} Animation={row.Animation} index={i} />
              {i < differentiatorRows.length - 1 && (
                <div className="max-w-[80px] md:max-w-[200px] my-[20px] md:my-[32px] mx-auto" style={{ height: 1, background: 'rgba(0,0,0,0.04)' }} />
              )}
            </React.Fragment>
          ))}
        </div>
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
  const labelColors: Record<string, { bg: string; text: string }> = {
    "FOR FOUNDERS": { bg: "rgba(124, 92, 252, 0.1)", text: "#7C5CFC" },
    "FOR INVESTORS": { bg: "rgba(74, 108, 247, 0.1)", text: "#4A6CF7" },
    "BOTH SIDES": { bg: "rgba(5, 150, 105, 0.12)", text: "#059669" },
  };

  return (
    <Section className="scroll-stack-section relative z-10 px-6 py-20 lg:pt-20 lg:pb-[100px] w-full" style={{ position: 'sticky', top: 0, zIndex: 4, backgroundColor: '#FAF9F7', minHeight: '100vh', overflow: 'hidden' }}>
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
          className="hidden lg:flex gap-0 w-full items-stretch"
        >
          {matchingSteps.map((step, i) => (
            <React.Fragment key={step.num}>
              {/* Animated flow arrow between steps */}
              {i > 0 && <FlowArrow delay={(i - 1) * 0.5} />}

              {/* Step card */}
              <motion.div
                variants={tierCard}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease }}
                className="flex-1 max-w-[280px] w-full min-h-[240px]"
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
                      {(step as { lottie?: string }).lottie && (
                        <LottieAnimation
                          src={(step as { lottie: string }).lottie}
                          loop={true}
                          className="lottie-brand w-[36px] h-[36px] shrink-0"
                        />
                      )}
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
                    <p className="text-[14px] text-text-muted leading-[1.6] flex-1">{step.desc}</p>
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
                variants={mobileSlideFromLeft}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
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
      </div>
    </Section>
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
                className="text-[14px] md:text-[16px] max-w-full px-2 md:max-w-[600px] md:px-0 leading-[1.8] md:leading-[2.0] text-center"
                style={{ color: "#475569", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {[
                  <>UrgenC is the first real fundraising app.</>,
                  <>Founders pitch. Investors swipe.</>,
                  <>Mutual interest means a guaranteed meeting.</>,
                  <>If you don&apos;t show up, you don&apos;t stay.</>,
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
              <MagneticButton
                href="/waitlist"
                className="group btn-shimmer btn-auto-shimmer btn-hero-glow inline-flex items-center justify-center gap-2 px-11 py-[18px] text-[16px] md:text-[17px] font-semibold text-white rounded-2xl"
                style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 20px rgba(74,108,247,0.2)" }}
              >
                Join the Waitlist
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </MagneticButton>
            </motion.div>

            {/* Credibility strip */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "100%", margin: "36px auto 20px", padding: 0 }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4rem", width: "100%", maxWidth: "100%", margin: "0 auto", padding: 0 }}>
                {/* BU Crest */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.8, ease }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", width: "80px", height: "95px", margin: 0, padding: 0 }}
                >
                  <div className="transition-transform duration-300 md:hover:scale-[1.08] cursor-pointer" style={{ width: "55px", height: "55px", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img
                      src="/images/universities/bu-crest.png"
                      alt="Boston University"
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
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", width: "80px", height: "95px", margin: 0, padding: 0 }}
                >
                  <div className="transition-transform duration-300 md:hover:scale-[1.08] cursor-pointer" style={{ width: "55px", height: "55px", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img
                      src="/images/universities/neu-crest.png"
                      alt="Northeastern University"
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
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", width: "80px", height: "95px", margin: 0, padding: 0 }}
                >
                  <div className="transition-transform duration-300 md:hover:scale-[1.08] cursor-pointer" style={{ width: "74px", height: "74px", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "9px" }}>
                    <img
                      src="/images/universities/hbs-crest.png"
                      alt="Harvard Business School"
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
      <NarrativeLine />

      {/* ============ WHAT MAKES URGENC DIFFERENT ============ */}
      <WhatMakesDifferentSection />

      {/* ============ HOW MATCHING WORKS ============ */}
      <MatchingFlowSection />

      {/* ============ IPHONE MOCKUPS ============ */}
      <div className="scroll-stack-section lg:pb-[100px] w-full" style={{ position: 'sticky', top: 0, zIndex: 5, backgroundColor: '#FAF9F7', minHeight: '100vh', overflow: 'hidden' }}>
        <IPhoneMockups />
      </div>

      {/* ============ FINAL CTA ============ */}
      <Section className="scroll-stack-section relative z-10 w-full flex items-center justify-center py-20" style={{ position: 'relative', zIndex: 6, backgroundColor: '#FAF9F7', minHeight: '100vh' }}>
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
            <Link
              href="/waitlist"
              className="group btn-shimmer btn-auto-shimmer btn-hero-glow inline-flex items-center justify-center gap-2 px-10 py-4 text-[16px] font-semibold text-white rounded-full transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(74,108,247,0.25)]"
              style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Join the Waitlist &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </Section>

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
