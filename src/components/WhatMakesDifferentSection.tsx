"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   3D ROTATING CAROUSEL: "What Makes UrgenC Different"

   Three cards rotate continuously in 3D space.
   Hover pauses rotation (desktop).
   Touch/drag rotates manually (mobile).
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
    background:
      "linear-gradient(160deg, #0F172A 0%, #1E1B4B 40%, #312E81 100%)",
    iconStroke: "#818CF8",
    accentBar: "linear-gradient(90deg, #6366F1, #818CF8)",
    icon: "shield" as const,
    rotateY: 0,
  },
  {
    id: "traction",
    title: "On-App Traction",
    description:
      "Earn visibility through traction. If you don\u2019t show it, you\u2019re off.",
    tag: "EARN IT",
    tagColor: "#A78BFA",
    tagBg: "rgba(167,139,250,0.15)",
    background:
      "linear-gradient(160deg, #1E1B4B 0%, #4C1D95 40%, #6D28D9 100%)",
    iconStroke: "#A78BFA",
    accentBar: "linear-gradient(90deg, #7C3AED, #A78BFA)",
    icon: "pulse" as const,
    rotateY: 120,
  },
  {
    id: "accountability",
    title: "Accountability",
    description: "Match means meet. No-shows don\u2019t stay.",
    tag: "NO GHOSTING",
    tagColor: "#818CF8",
    tagBg: "rgba(99,102,241,0.15)",
    background:
      "linear-gradient(160deg, #312E81 0%, #4338CA 40%, #6366F1 100%)",
    iconStroke: "#818CF8",
    accentBar: "linear-gradient(90deg, #4338CA, #818CF8)",
    icon: "check" as const,
    rotateY: 240,
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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

/* Hover scale when paused */
.carousel-ring.paused .carousel-card-slot:nth-child(1):hover {
  transform: rotateY(0deg) translateZ(var(--tz)) scale(1.05);
}
.carousel-ring.paused .carousel-card-slot:nth-child(2):hover {
  transform: rotateY(120deg) translateZ(var(--tz)) scale(1.05);
}
.carousel-ring.paused .carousel-card-slot:nth-child(3):hover {
  transform: rotateY(240deg) translateZ(var(--tz)) scale(1.05);
}
.carousel-ring.paused .carousel-card-slot:hover .carousel-card-inner {
  box-shadow: 0 12px 48px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3);
}

/* Responsive variables */
:root {
  --card-width: 280px;
  --card-height: 320px;
  --tz: 300px;
  --carousel-height: 420px;
}

@media (max-width: 767px) {
  :root {
    --card-width: 260px;
    --card-height: 320px;
    --tz: 200px;
    --carousel-height: 380px;
  }
}
`;

// ── Carousel Card ──────────────────────────

function CarouselCard({ card }: { card: (typeof cards)[0] }) {
  const IconComp = iconMap[card.icon];

  return (
    <div className="carousel-card-slot">
      <div
        className="carousel-card-inner"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20,
          padding: "32px 28px",
          background: card.background,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
          overflow: "hidden",
          position: "relative",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Inner glow overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Icon container */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: card.tagBg,
            border: `1px solid ${card.iconStroke}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
            position: "relative",
            zIndex: 1,
          }}
        >
          <IconComp stroke={card.iconStroke} />
        </div>

        {/* Tag pill */}
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "4px 12px",
            borderRadius: 999,
            background: card.tagBg,
            marginBottom: 12,
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: card.tagColor,
              letterSpacing: "1.5px",
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            }}
          >
            {card.tag}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#FFFFFF",
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            margin: "0 0 8px 0",
            position: "relative",
            zIndex: 1,
          }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            margin: 0,
            position: "relative",
            zIndex: 1,
            flex: 1,
          }}
        >
          {card.description}
        </p>

        {/* Accent bar at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: card.accentBar,
            borderRadius: "0 0 20px 20px",
          }}
        />
      </div>
    </div>
  );
}

// ── Main Section ────────────────────────────
export default function WhatMakesDifferentSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

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

    // Get current computed rotation from the matrix
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

    // Resume CSS animation
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
        {/* ── Header ── */}
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

        {/* ── 3D Carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div
            className="carousel-scene"
            style={{
              height: "var(--carousel-height)",
              overflow: "visible",
            }}
            onMouseEnter={() => {
              ringRef.current?.classList.add("paused");
            }}
            onMouseLeave={() => {
              if (!dragRef.current.isDragging) {
                ringRef.current?.classList.remove("paused");
              }
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={ringRef}
              className={`carousel-ring${!isInView ? " paused" : ""}`}
            >
              {cards.map((card) => (
                <CarouselCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
