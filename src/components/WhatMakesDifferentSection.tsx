"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

/* ─────────────────────────────────────────────
   SCROLL-DRIVEN: "What Makes UrgenC Different"

   Desktop: 250vh tall wrapper with sticky inner
   viewport. Cards activate one at a time as user
   scrolls. Progress spine fills on the left.

   Mobile: Simple stacked whileInView reveals.
   ───────────────────────────────────────────── */

// ── Stage Data ──────────────────────────────
const stages = [
  {
    id: "door",
    number: "01",
    title: "A Door That Didn\u2019t Exist",
    description:
      "Fundraising has always been about who you know. UrgenC makes it about what you are building. For the first time, access is earned by your idea.",
    accent: "#6366F1",
  },
  {
    id: "vetted",
    number: "02",
    title: "Every Startup Is Vetted",
    description:
      "Every startup goes through a multi-factor review before investors ever see them. No noise. No spam. If it is on UrgenC, it passed the bar.",
    accent: "#7C5CFC",
  },
  {
    id: "match",
    number: "03",
    title: "If You Match, You Meet",
    description:
      "Mutual interest is a commitment. Every match gets a 20-minute call within 72 hours. Ghost and you lose your spot.",
    accent: "#8B5CF6",
  },
];

// ── Icon Components ─────────────────────────

function DoorIcon({ active, hovered }: { active: boolean; hovered: boolean }) {
  return (
    <div style={{ perspective: 500, width: 56, height: 72 }}>
      <motion.div
        animate={{
          rotateY: active ? -45 : 0,
          boxShadow: hovered
            ? "0 8px 32px rgba(99,102,241,0.6), 0 0 60px rgba(99,102,241,0.2)"
            : active
            ? "0 6px 24px rgba(99,102,241,0.4)"
            : "0 4px 16px rgba(99,102,241,0.2)",
        }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: 56,
          height: 72,
          borderRadius: 10,
          background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
          transformOrigin: "left center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 5,
            left: 5,
            right: 5,
            bottom: 5,
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.15)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))",
          }}
        />
        <motion.div
          animate={{ scale: hovered ? 1.3 : 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.8)",
            boxShadow: "0 0 8px rgba(255,255,255,0.4)",
          }}
        />
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.6, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                position: "absolute",
                right: -20,
                top: "20%",
                bottom: "20%",
                width: 24,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)",
                transformOrigin: "left center",
                borderRadius: "0 4px 4px 0",
                filter: "blur(2px)",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function ShieldIcon({
  active,
  hovered,
}: {
  active: boolean;
  hovered: boolean;
}) {
  return (
    <motion.div
      animate={{
        scale: hovered ? 1.12 : 1,
        boxShadow: hovered
          ? "0 8px 32px rgba(124,92,252,0.6), 0 0 60px rgba(124,92,252,0.2)"
          : active
          ? "0 6px 24px rgba(124,92,252,0.4)"
          : "0 4px 16px rgba(124,92,252,0.2)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        width: 56,
        height: 56,
        borderRadius: 14,
        background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={active ? { x: [-60, 80] } : { x: -60 }}
        transition={
          active ? { duration: 0.8, delay: 0.4, ease: "easeInOut" } : {}
        }
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 40,
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          transform: "skewX(-20deg)",
        }}
      />
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M5 13l4 4L19 7"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            active
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}

function CalendarIcon({
  active,
  hovered,
}: {
  active: boolean;
  hovered: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <motion.div
        animate={{
          scale: hovered ? 1.12 : 1,
          boxShadow: hovered
            ? "0 8px 32px rgba(139,92,246,0.6), 0 0 60px rgba(139,92,246,0.2)"
            : active
            ? "0 6px 24px rgba(139,92,246,0.4)"
            : "0 4px 16px rgba(139,92,246,0.2)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 16,
            background: "rgba(0,0,0,0.18)",
            display: "flex",
            justifyContent: "center",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: 4,
              height: 9,
              background: "rgba(255,255,255,0.6)",
              borderRadius: 2,
              marginTop: -3,
            }}
          />
          <div
            style={{
              width: 4,
              height: 9,
              background: "rgba(255,255,255,0.6)",
              borderRadius: 2,
              marginTop: -3,
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
            padding: "6px 9px",
            placeItems: "center",
          }}
        >
          {[0.3, 0.3, 0.3, 0.3, 0.9, 0.3].map((opacity, i) => (
            <motion.div
              key={i}
              animate={
                active && i === 4
                  ? {
                      scale: [1, 1.4, 1],
                      boxShadow: [
                        "0 0 0px rgba(255,255,255,0)",
                        "0 0 8px rgba(255,255,255,0.6)",
                        "0 0 4px rgba(255,255,255,0.3)",
                      ],
                    }
                  : {}
              }
              transition={
                active && i === 4 ? { duration: 0.6, delay: 0.5 } : {}
              }
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: `rgba(255,255,255,${opacity})`,
              }}
            />
          ))}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0, y: 4 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#6366F1",
          fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
          letterSpacing: "0.5px",
        }}
      >
        72h
      </motion.span>
    </div>
  );
}

const icons = [DoorIcon, ShieldIcon, CalendarIcon];

// ── Spine Dot (glowing dot on progress spine) ──
function SpineDot({
  state,
  index,
}: {
  state: "future" | "active" | "past";
  index: number;
}) {
  const accent = stages[index].accent;
  const isActive = state === "active";
  const isPast = state === "past";
  const visible = isActive || isPast;

  return (
    <motion.div
      animate={{
        scale: visible ? 1 : 0.5,
        opacity: visible ? 1 : 0.3,
      }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: isPast ? `${accent}99` : accent,
        boxShadow: isActive
          ? `0 0 14px ${accent}90, 0 0 28px ${accent}50`
          : isPast
          ? `0 0 8px ${accent}40`
          : "none",
        position: "relative",
        zIndex: 5,
        flexShrink: 0,
      }}
    >
      {/* Pulse ring when active */}
      {isActive && (
        <motion.div
          animate={{
            scale: [1, 2, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            border: `1.5px solid ${accent}60`,
          }}
        />
      )}
    </motion.div>
  );
}

// ── Desktop Stage Card (scroll-driven) ──
function DesktopStageCard({
  stage,
  index,
  state,
}: {
  stage: (typeof stages)[0];
  index: number;
  state: "future" | "active" | "past";
}) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = icons[index];
  const isActive = state === "active";
  const isPast = state === "past";
  const isFuture = state === "future";

  return (
    <motion.div
      className="differentiator-card"
      animate={{
        opacity: isActive ? 1 : isPast ? 0.6 : 0.35,
        scale: isActive ? 1 : isFuture ? 0.97 : 0.99,
        filter: isFuture ? "blur(2px)" : "blur(0px)",
        y: isFuture ? 6 : 0,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 18,
        background: isActive
          ? "linear-gradient(135deg, rgba(220,215,255,0.95), rgba(212,218,255,0.92), rgba(225,215,252,0.94))"
          : "linear-gradient(135deg, rgba(220,215,255,0.7), rgba(212,218,255,0.6), rgba(225,215,252,0.65))",
        backdropFilter: "blur(12px)",
        border: isActive
          ? "1px solid rgba(99,102,241,0.3)"
          : "1px solid rgba(99,102,241,0.08)",
        boxShadow: isActive
          ? "0 8px 32px rgba(99,102,241,0.12), 0 0 0 1px rgba(99,102,241,0.04), inset 0 1px 0 rgba(255,255,255,0.5)"
          : "0 2px 12px rgba(99,102,241,0.04), inset 0 1px 0 rgba(255,255,255,0.2)",
        padding: "24px 28px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition:
          "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Shimmer sweep on active */}
      {isActive && (
        <motion.div
          initial={{ x: -200 }}
          animate={{ x: 700 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.15 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 120,
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
            transform: "skewX(-20deg)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Hover shimmer */}
      {hovered && isActive && (
        <motion.div
          initial={{ x: -200 }}
          animate={{ x: 700 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 120,
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            transform: "skewX(-20deg)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Stage number */}
      <motion.span
        animate={{ opacity: isActive ? 0.8 : 0.3 }}
        transition={{ duration: 0.3 }}
        style={{
          fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: stage.accent,
          letterSpacing: "2px",
          display: "block",
          marginBottom: 12,
        }}
      >
        {stage.number}
      </motion.span>

      {/* Icon + Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 10,
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <IconComponent active={isActive} hovered={hovered && isActive} />
        </div>
        <h3
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#0F172A",
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            margin: 0,
          }}
        >
          {stage.title}
        </h3>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 14,
          color: "#475569",
          lineHeight: 1.75,
          fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
          margin: 0,
        }}
      >
        {stage.description}
      </p>
    </motion.div>
  );
}

// ── Mobile Stage Card (whileInView) ──
function MobileStageCard({
  stage,
  index,
}: {
  stage: (typeof stages)[0];
  index: number;
}) {
  const [hovered] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const IconComponent = icons[index];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="differentiator-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        borderRadius: 18,
        background:
          "linear-gradient(135deg, rgba(220,215,255,0.9), rgba(212,218,255,0.85), rgba(225,215,252,0.88))",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(99,102,241,0.1)",
        boxShadow:
          "0 2px 12px rgba(99,102,241,0.06), inset 0 1px 0 rgba(255,255,255,0.3)",
        overflow: "hidden",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      {/* Icon centered */}
      <div
        className="icon-column"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 0 12px 0",
        }}
      >
        <IconComponent active={inView} hovered={hovered} />
      </div>

      {/* Text */}
      <div
        className="text-column"
        style={{ padding: "12px 20px 24px 20px" }}
      >
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#0F172A",
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            margin: 0,
            marginBottom: 6,
          }}
        >
          {stage.title}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "#475569",
            lineHeight: 1.75,
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            margin: 0,
          }}
        >
          {stage.description}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main Section ────────────────────────────
export default function WhatMakesDifferentSection() {
  const [isMobile, setIsMobile] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(-1);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll-driven progress for desktop
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to active stage
  // 0-0.15: header visible, no card active
  // 0.15-0.38: card 0 active
  // 0.38-0.62: card 1 active
  // 0.62-0.85: card 2 active
  // 0.85-1.0: all done, show pill
  const getStageFromProgress = useCallback((p: number) => {
    if (p < 0.15) return -1;
    if (p < 0.38) return 0;
    if (p < 0.62) return 1;
    if (p < 0.85) return 2;
    return 3; // all done
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return;
    const stage = getStageFromProgress(latest);
    setActiveStage(stage);
  });

  // Spine fill progress (mapped to scroll)
  const spineFill = useTransform(scrollYProgress, [0.12, 0.85], [0, 100]);
  const spineHeight = useTransform(spineFill, (v) => `${v}%`);

  const getCardState = (
    index: number
  ): "future" | "active" | "past" => {
    if (activeStage === index) return "active";
    if (activeStage > index) return "past";
    return "future";
  };

  // ── MOBILE RENDER ──
  if (isMobile) {
    return (
      <section
        className="scroll-stack-section relative z-10 w-full"
        style={{
          position: "relative",
          zIndex: 3,
          backgroundColor: "#FAF9F7",
          paddingTop: 40,
          paddingBottom: 48 + 120,
        }}
      >
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div
              style={{
                width: 60,
                height: 4,
                borderRadius: 9999,
                background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
                margin: "0 auto 16px auto",
              }}
            />
            <p
              className="text-[12px] tracking-[3px] uppercase mb-4"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 600,
                color: "#6366F1",
              }}
            >
              Why UrgenC
            </p>
            <h2
              className="text-[28px] md:text-[36px] font-normal text-center mb-4"
              style={{
                fontFamily: "'Instrument Serif', serif",
                color: "#0F172A",
                fontWeight: 400,
              }}
            >
              What Makes UrgenC Different
            </h2>
            <p
              className="text-center max-w-[480px] text-[15px] leading-[1.7] italic mb-8"
              style={{
                color: "#64748B",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              Three reasons this has never existed before.
            </p>
          </motion.div>

          {/* Mobile Cards */}
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              padding: "0 16px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {stages.map((stage, index) => (
              <MobileStageCard key={stage.id} stage={stage} index={index} />
            ))}

            {/* Bottom pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 24px",
                  borderRadius: 999,
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))",
                  border: "1px solid rgba(99,102,241,0.15)",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#6366F1",
                    fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                    letterSpacing: "0.5px",
                  }}
                >
                  That&apos;s the UrgenC pipeline
                </span>
                <span style={{ color: "#6366F1", fontSize: 14 }}>
                  &rarr;
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // ── DESKTOP RENDER ──
  return (
    <div
      ref={outerRef}
      style={{
        height: "250vh",
        position: "relative",
        zIndex: 3,
      }}
    >
      <section
        className="scroll-stack-section relative z-10 w-full"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 3,
          backgroundColor: "#FAF9F7",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          className="max-w-[1100px] mx-auto w-full"
          style={{ padding: "0 24px" }}
        >
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
            style={{ marginBottom: 36 }}
          >
            <div
              style={{
                width: 60,
                height: 4,
                borderRadius: 9999,
                background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
                margin: "0 auto 16px auto",
              }}
            />
            <p
              className="text-[12px] tracking-[3px] uppercase mb-4"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 600,
                color: "#6366F1",
              }}
            >
              Why UrgenC
            </p>
            <h2
              className="text-[28px] md:text-[36px] font-normal text-center mb-4"
              style={{
                fontFamily: "'Instrument Serif', serif",
                color: "#0F172A",
                fontWeight: 400,
              }}
            >
              What Makes UrgenC Different
            </h2>
            <p
              className="text-center max-w-[480px] text-[15px] leading-[1.7] italic mb-0"
              style={{
                color: "#64748B",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              Three reasons this has never existed before.
            </p>
          </motion.div>

          {/* ── Pipeline Container ── */}
          <div
            style={{
              maxWidth: 620,
              margin: "0 auto",
              position: "relative",
              display: "flex",
              gap: 28,
            }}
          >
            {/* ── Progress Spine ── */}
            <div
              style={{
                width: 14,
                position: "relative",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Background track */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 2,
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.1) 10%, rgba(99,102,241,0.1) 90%, transparent 100%)",
                  borderRadius: 1,
                }}
              />
              {/* Animated fill */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 2,
                  height: spineHeight,
                  background:
                    "linear-gradient(180deg, #6366F1, #7C5CFC, #8B5CF6)",
                  borderRadius: 1,
                  opacity: 0.7,
                }}
              />

              {/* Spine dots positioned at each card */}
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  width: 14,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 22,
                  paddingBottom: 22,
                }}
              >
                {stages.map((_, index) => (
                  <SpineDot
                    key={index}
                    state={getCardState(index)}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* ── Cards Column ── */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {stages.map((stage, index) => (
                <DesktopStageCard
                  key={stage.id}
                  stage={stage}
                  index={index}
                  state={getCardState(index)}
                />
              ))}

              {/* Bottom pill - shows when all cards done */}
              <motion.div
                animate={
                  activeStage >= 3
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 12 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 12,
                  pointerEvents: activeStage >= 3 ? "auto" : "none",
                }}
              >
                <motion.div
                  animate={
                    activeStage >= 3
                      ? {
                          boxShadow: [
                            "0 0 0 0 rgba(99,102,241,0.3)",
                            "0 0 0 12px rgba(99,102,241,0)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 24px",
                    borderRadius: 999,
                    background:
                      "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))",
                    border: "1px solid rgba(99,102,241,0.15)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#6366F1",
                      fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                      letterSpacing: "0.5px",
                    }}
                  >
                    That&apos;s the UrgenC pipeline
                  </span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{ color: "#6366F1", fontSize: 14 }}
                  >
                    &rarr;
                  </motion.span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
