"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   3D ROTATING CAROUSEL: "What Makes UrgenC Different"

   Three cards rotate continuously in 3D space.
   Never pauses — constant smooth rotation.
   Touch/drag rotates manually (mobile).
   Wrapped in a dark retro-TV container with
   floating particles behind the carousel.
   ───────────────────────────────────────────── */

// ── Card Data ──────────────────────────────
const cards = [
  {
    id: "exclusivity",
    title: "Exclusivity",
    description: "Curated founders. Serious investors. No noise.",
    tag: "CURATED",
    tagColor: "#818CF8",
    tagBg: "rgba(99,102,241,0.15)",
    iconStroke: "#818CF8",
    accentBar: "linear-gradient(90deg, #6366F1, #818CF8)",
    icon: "shield" as const,
    rotateY: 0,
    silkClass: "silk-card-1" as const,
  },
  {
    id: "traction",
    title: "On-App Traction",
    description:
      "Earn visibility through traction. If you don\u2019t show it, you\u2019re off.",
    tag: "EARN IT",
    tagColor: "#A78BFA",
    tagBg: "rgba(167,139,250,0.15)",
    iconStroke: "#A78BFA",
    accentBar: "linear-gradient(90deg, #7C3AED, #A78BFA)",
    icon: "pulse" as const,
    rotateY: 120,
    silkClass: "silk-card-2" as const,
  },
  {
    id: "accountability",
    title: "Accountability",
    description: "Match means meet. No-shows don\u2019t stay.",
    tag: "NO GHOSTING",
    tagColor: "#818CF8",
    tagBg: "rgba(99,102,241,0.15)",
    iconStroke: "#818CF8",
    accentBar: "linear-gradient(90deg, #4338CA, #818CF8)",
    icon: "check" as const,
    rotateY: 240,
    silkClass: "silk-card-3" as const,
  },
];

// ── SVG Icons ──────────────────────────────

function ShieldSVG({ stroke }: { stroke: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L3.5 6.5V11.5C3.5 16.45 7.16 21.07 12 22C16.84 21.07 20.5 16.45 20.5 11.5V6.5L12 2Z"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PulseSVG({ stroke }: { stroke: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12H6L9 4L15 20L18 12H21"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleSVG({ stroke }: { stroke: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.5" stroke={stroke} strokeWidth="1.8" />
      <path
        d="M8.5 12.5L10.5 14.5L15.5 9.5"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const iconMap = {
  shield: ShieldSVG,
  pulse: PulseSVG,
  check: CheckCircleSVG,
};

// ── CSS Keyframes (injected once) ──────────
const carouselCSS = `
@keyframes carouselSpin {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(360deg); }
}

.carousel-scene {
  perspective: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-ring {
  width: var(--card-width);
  height: var(--card-height);
  position: relative;
  transform-style: preserve-3d;
  animation: carouselSpin 18s linear infinite;
}

.carousel-ring.paused {
  animation-play-state: paused;
}

.carousel-card-slot {
  position: absolute;
  width: var(--card-width);
  height: var(--card-height);
  backface-visibility: hidden;
}

.carousel-card-slot:nth-child(1) {
  transform: rotateY(0deg) translateZ(var(--tz));
}
.carousel-card-slot:nth-child(2) {
  transform: rotateY(120deg) translateZ(var(--tz));
}
.carousel-card-slot:nth-child(3) {
  transform: rotateY(240deg) translateZ(var(--tz));
}

/* Neon flicker animation for TV title */
@keyframes neonFlickerOn {
  0%   { opacity: 0.3; text-shadow: none; }
  10%  { opacity: 1; text-shadow: 0 0 7px rgba(99,102,241,0.8), 0 0 10px rgba(99,102,241,0.6), 0 0 21px rgba(99,102,241,0.4), 0 0 42px rgba(99,102,241,0.2); }
  20%  { opacity: 0.4; text-shadow: none; }
  35%  { opacity: 1; text-shadow: 0 0 7px rgba(99,102,241,0.8), 0 0 10px rgba(99,102,241,0.6), 0 0 21px rgba(99,102,241,0.4), 0 0 42px rgba(99,102,241,0.2); }
  40%  { opacity: 0.5; text-shadow: 0 0 4px rgba(99,102,241,0.3); }
  50%, 100% { opacity: 1; text-shadow: 0 0 7px rgba(99,102,241,0.8), 0 0 10px rgba(99,102,241,0.6), 0 0 21px rgba(99,102,241,0.4), 0 0 42px rgba(99,102,241,0.2); }
}

.neon-title-glow {
  opacity: 0.3;
}

.neon-title-glow.active {
  animation: neonFlickerOn 0.5s ease-out forwards;
}

/* ── Silk Wave Keyframes ── */
@keyframes silkFlow1 {
  0%   { background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%; }
  25%  { background-position: 100% 0%, 0% 100%, 30% 70%, 0% 0%; }
  50%  { background-position: 100% 100%, 0% 0%, 70% 30%, 0% 0%; }
  75%  { background-position: 0% 100%, 100% 0%, 50% 50%, 0% 0%; }
  100% { background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%; }
}
@keyframes silkFlow2 {
  0%   { background-position: 100% 100%, 0% 0%, 50% 50%, 0% 0%; }
  25%  { background-position: 0% 100%, 100% 0%, 70% 30%, 0% 0%; }
  50%  { background-position: 0% 0%, 100% 100%, 30% 70%, 0% 0%; }
  75%  { background-position: 100% 0%, 0% 100%, 50% 50%, 0% 0%; }
  100% { background-position: 100% 100%, 0% 0%, 50% 50%, 0% 0%; }
}
@keyframes silkFlow3 {
  0%   { background-position: 50% 0%, 50% 100%, 50% 50%, 0% 0%; }
  25%  { background-position: 0% 50%, 100% 50%, 30% 70%, 0% 0%; }
  50%  { background-position: 50% 100%, 50% 0%, 70% 30%, 0% 0%; }
  75%  { background-position: 100% 50%, 0% 50%, 50% 50%, 0% 0%; }
  100% { background-position: 50% 0%, 50% 100%, 50% 50%, 0% 0%; }
}

/* Silk background base */
.silk-bg {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  overflow: hidden;
  z-index: 0;
}
.silk-bg-inner {
  position: absolute;
  inset: 0;
  background-size: 200% 200%, 200% 200%, 150% 150%, 100% 100%;
  filter: blur(1px) contrast(1.2);
}
/* Noise grain overlay */
.silk-bg-grain {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: repeating-conic-gradient(rgba(255,255,255,0.08) 0% 25%, transparent 0% 50%);
  background-size: 4px 4px;
  pointer-events: none;
  z-index: 1;
}
/* Dark overlay for readability */
.silk-bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.1);
  pointer-events: none;
  z-index: 2;
}

/* Card 1 — Deep Indigo Silk (135deg) */
.silk-card-1 .silk-bg-inner {
  background:
    radial-gradient(ellipse at 30% 20%, #312E81 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, #4338CA 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, #1E1B4B 0%, transparent 60%),
    linear-gradient(135deg, #3730A3, #1E1B4B);
  animation: silkFlow1 9s ease-in-out infinite;
}

/* Card 2 — Royal Violet Silk (225deg) */
.silk-card-2 .silk-bg-inner {
  background:
    radial-gradient(ellipse at 30% 20%, #6D28D9 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, #7C3AED 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, #4C1D95 0%, transparent 60%),
    linear-gradient(225deg, #5B21B6, #4C1D95);
  animation: silkFlow2 11s ease-in-out infinite;
}

/* Card 3 — Electric Indigo Silk (180deg) */
.silk-card-3 .silk-bg-inner {
  background:
    radial-gradient(ellipse at 30% 20%, #4F46E5 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, #6366F1 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, #312E81 0%, transparent 60%),
    linear-gradient(180deg, #4338CA, #312E81);
  animation: silkFlow3 13s ease-in-out infinite;
}

/* Responsive variables */
:root {
  --card-width: 240px;
  --card-height: 290px;
  --tz: 260px;
  --carousel-height: 380px;
}

@media (max-width: 767px) {
  :root {
    --card-width: 210px;
    --card-height: 260px;
    --tz: 180px;
    --carousel-height: 340px;
  }

  .carousel-ring {
    will-change: transform;
    transform: translateZ(0);
  }
}
`;

// ── Silk Wave Background (CSS-only, works on mobile + desktop) ──
function SilkWaveBg() {
  return (
    <div className="silk-bg">
      <div className="silk-bg-inner" />
      <div className="silk-bg-grain" />
      <div className="silk-bg-overlay" />
    </div>
  );
}

// ── Floating Particles Canvas (inside TV container) ──
function TVParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 20 : 30;

    interface P { x: number; y: number; r: number; o: number; dx: number; dy: number }
    let particles: P[] = [];

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      if (!canvas) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1 + Math.random(),
        o: 0.2 + Math.random() * 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
      }));
    }

    function draw() {
      if (!canvas || !ctx || !running) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(139,92,246,0.4)";

      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
      raf = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          running = true;
          draw();
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.1 }
    );

    resize();
    seed();
    observer.observe(canvas);

    const handleResize = () => { resize(); seed(); };
    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
}

// ── Mobile Carousel Card (silk wave, inside 3D carousel) ──
function MobileCarouselCard({ card }: { card: (typeof cards)[0] }) {
  const IconComp = iconMap[card.icon];

  return (
    <div className="carousel-card-slot">
      <div
        className={card.silkClass}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20,
          padding: "22px 20px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
          overflow: "hidden",
          position: "relative",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <SilkWaveBg />
        <div style={{ position: "absolute", inset: 0, borderRadius: 20, background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)", pointerEvents: "none", zIndex: 3 }} />
        <div style={{ width: 42, height: 42, borderRadius: 10, background: card.tagBg, border: `1px solid ${card.iconStroke}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, position: "relative", zIndex: 4 }}>
          <IconComp stroke={card.iconStroke} />
        </div>
        <div style={{ display: "inline-flex", alignSelf: "flex-start", padding: "4px 12px", borderRadius: 999, background: card.tagBg, border: `1px solid ${card.tagColor}30`, marginBottom: 10, position: "relative", zIndex: 4 }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: card.tagColor, letterSpacing: "2px", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>{card.tag}</span>
        </div>
        <h3 className="tv-gradient-title" style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", letterSpacing: "-0.3px", margin: "0 0 5px 0", position: "relative", zIndex: 4 }}>{card.title}</h3>
        <p style={{ fontSize: 12, fontWeight: 400, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontFamily: "var(--font-dm-sans), sans-serif", margin: 0, position: "relative", zIndex: 4, flex: 1 }}>{card.description}</p>
      </div>
    </div>
  );
}

// ── Carousel Card (desktop) ────────────────

function CarouselCard({ card }: { card: (typeof cards)[0] }) {
  const IconComp = iconMap[card.icon];

  return (
    <div className="carousel-card-slot">
      <div
        className={`carousel-card-inner ${card.silkClass}`}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20,
          padding: "26px 22px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
          overflow: "hidden",
          position: "relative",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {/* Silk wave background */}
        <SilkWaveBg />

        {/* Inner glow overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        {/* Icon container */}
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            background: card.tagBg,
            border: `1px solid ${card.iconStroke}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
            position: "relative",
            zIndex: 4,
          }}
        >
          <IconComp stroke={card.iconStroke} />
        </div>

        {/* Tag pill */}
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "5px 14px",
            borderRadius: 999,
            background: card.tagBg,
            border: `1px solid ${card.tagColor}30`,
            marginBottom: 10,
            position: "relative",
            zIndex: 4,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: card.tagColor,
              letterSpacing: "2px",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
            }}
          >
            {card.tag}
          </span>
        </div>

        {/* Title */}
        <h3
          className="tv-gradient-title"
          style={{
            fontSize: 20,
            fontWeight: 700,
            fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
            letterSpacing: "-0.3px",
            margin: "0 0 6px 0",
            position: "relative",
            zIndex: 4,
          }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            fontFamily: "var(--font-dm-sans), sans-serif",
            margin: 0,
            position: "relative",
            zIndex: 4,
            flex: 1,
          }}
        >
          {card.description}
        </p>
      </div>
    </div>
  );
}

// ── Main Section ────────────────────────────
export default function WhatMakesDifferentSection() {
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Touch drag state for mobile
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    currentRotation: 0,
  });

  // Inject CSS once
  useEffect(() => {
    const id = "carousel-3d-styles";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = carouselCSS;
    document.head.appendChild(style);
  }, []);

  // IntersectionObserver to start animation when in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Touch handlers for mobile drag-to-rotate
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const ring = ringRef.current;
    if (!ring) return;

    const computed = window.getComputedStyle(ring);
    const matrix = computed.transform;
    let currentY = 0;
    if (matrix && matrix !== "none") {
      const match = matrix.match(/matrix3d\((.+)\)/);
      if (match) {
        const values = match[1].split(",").map(Number);
        currentY = Math.round(
          Math.atan2(values[8], values[0]) * (180 / Math.PI)
        );
      }
    }

    dragRef.current = {
      isDragging: true,
      startX: e.touches[0].clientX,
      currentRotation: currentY,
    };

    ring.classList.add("paused");
    ring.style.transform = `rotateY(${currentY}deg)`;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragRef.current.isDragging) return;
    const ring = ringRef.current;
    if (!ring) return;

    const deltaX = e.touches[0].clientX - dragRef.current.startX;
    const rotation = dragRef.current.currentRotation + deltaX * 0.5;
    ring.style.transform = `rotateY(${rotation}deg)`;
  }, []);

  const handleTouchEnd = useCallback(() => {
    dragRef.current.isDragging = false;
    const ring = ringRef.current;
    if (!ring) return;

    ring.style.transform = "";
    ring.classList.remove("paused");
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scroll-stack-section relative z-10 w-full"
      style={{
        position: "relative",
        zIndex: 3,
        backgroundColor: "#FAF9F7",
        paddingTop: 60,
        paddingBottom: 168,
      }}
    >
      <div className="max-w-[1100px] mx-auto" style={{ padding: "0 24px" }}>
        {/* ── Header (stays above TV container) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
          style={{ marginBottom: 48 }}
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

        {/* ── Dark TV Container ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto"
          style={{ maxWidth: 960 }}
        >
          <div
            style={{
              borderRadius: 12,
              border: "3px solid #2a2a4a",
              background: "#0F0F1A",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* ── TV Title Bar ── */}
            <div
              className="flex items-center justify-center relative"
              style={{
                height: 40,
                background:
                  "repeating-linear-gradient(to bottom, #0F0F1A 0px, #0F0F1A 2px, #2a2a4a 2px, #2a2a4a 4px)",
              }}
            >
              {/* Small square button left */}
              <div
                className="absolute left-3"
                style={{
                  width: 12,
                  height: 12,
                  border: "1.5px solid #2a2a4a",
                  borderRadius: 2,
                  background: "#0F0F1A",
                }}
              />
              {/* Title pill with neon glow */}
              <div
                className={`neon-title-glow${isInView ? " active" : ""}`}
                style={{
                  padding: "2px 16px",
                  border: "1px solid #2a2a4a",
                  borderRadius: 9999,
                  fontFamily: "monospace",
                  fontSize: 14,
                  color: "#818CF8",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Why UrgenC
              </div>
            </div>

            {/* ── Screen Area with particles + carousel ── */}
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                padding: "24px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Floating particles behind carousel */}
              <TVParticlesCanvas />

              {/* 3D Carousel */}
              <div
                className="carousel-scene"
                style={{
                  height: "var(--carousel-height)",
                  overflow: "visible",
                  position: "relative",
                  zIndex: 1,
                }}
                onTouchStart={isMobile ? undefined : handleTouchStart}
                onTouchMove={isMobile ? undefined : handleTouchMove}
                onTouchEnd={isMobile ? undefined : handleTouchEnd}
              >
                <div
                  ref={ringRef}
                  className={`carousel-ring${!isInView ? " paused" : ""}`}
                >
                  {cards.map((card) =>
                    isMobile ? (
                      <MobileCarouselCard key={card.id} card={card} />
                    ) : (
                      <CarouselCard key={card.id} card={card} />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
