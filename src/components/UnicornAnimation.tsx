"use client";

import React, { useEffect, useRef, useCallback } from "react";

/* ===== Sparkle shape factories ===== */
function makeStar(size: number, color: string): HTMLDivElement {
  const el = document.createElement("div");
  el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 8 8"><path d="M4 0L4.7 3.3L8 4L4.7 4.7L4 8L3.3 4.7L0 4L3.3 3.3Z" fill="${color}"/></svg>`;
  el.style.position = "absolute";
  el.style.pointerEvents = "none";
  return el;
}

function makeCircle(size: number, color: string): HTMLDivElement {
  const el = document.createElement("div");
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.borderRadius = "50%";
  el.style.background = color;
  el.style.position = "absolute";
  el.style.pointerEvents = "none";
  return el;
}

function makeDiamond(size: number, color: string): HTMLDivElement {
  const el = document.createElement("div");
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.background = color;
  el.style.transform = "rotate(45deg)";
  el.style.position = "absolute";
  el.style.pointerEvents = "none";
  return el;
}

const SPARKLE_COLORS = ["#F5D76E", "#4A6CF7", "#7C5CFC", "#D946EF", "#FFFFFF"];

function randomSparkle(): HTMLDivElement {
  const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
  const type = Math.floor(Math.random() * 3);
  if (type === 0) return makeStar(8, color);
  if (type === 1) return makeCircle(4, color);
  return makeDiamond(6, color);
}

function burstSparkle(size: number): HTMLDivElement {
  const color =
    Math.random() > 0.4
      ? "#F5D76E"
      : SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
  const type = Math.floor(Math.random() * 3);
  if (type === 0) return makeStar(size, color);
  if (type === 1) return makeCircle(size * 0.6, color);
  return makeDiamond(size * 0.7, color);
}

/* ===== Arc path math ===== */
// Quadratic bezier: P(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
function quadBezier(
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number]
): [number, number] {
  const u = 1 - t;
  return [
    u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
  ];
}

function quadBezierAngle(
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number]
): number {
  const u = 1 - t;
  const dx = 2 * u * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
  const dy = 2 * u * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
  return Math.atan2(dy, dx) * (180 / Math.PI);
}

/* ===== Unicorn SVG ===== */
function UnicornSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="uBody" x1="10" y1="30" x2="65" y2="65">
          <stop stopColor="#F0E6FF" />
          <stop offset="1" stopColor="#C4B5E0" />
        </linearGradient>
        <linearGradient id="uMane" x1="30" y1="5" x2="50" y2="35">
          <stop stopColor="#4A6CF7" />
          <stop offset="0.5" stopColor="#7C5CFC" />
          <stop offset="1" stopColor="#D946EF" />
        </linearGradient>
        <linearGradient id="uHorn" x1="54" y1="0" x2="58" y2="20">
          <stop stopColor="#D4AF37" />
          <stop offset="0.85" stopColor="#F5D76E" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id="uWing" x1="30" y1="25" x2="45" y2="40">
          <stop stopColor="rgba(255,255,255,0.4)" />
          <stop offset="1" stopColor="rgba(196,181,224,0.4)" />
        </linearGradient>
      </defs>

      {/* Tail */}
      <path
        className="unicorn-tail"
        d="M8 42C3 36 -2 38 2 44C5 48 4 46 8 50C6 46 1 42 4 38"
        stroke="url(#uMane)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        style={{ transformOrigin: "8px 44px" }}
      />

      {/* Body */}
      <ellipse cx="35" cy="44" rx="20" ry="12" fill="url(#uBody)" />

      {/* Back wing */}
      <path
        className="unicorn-wing"
        d="M30 34C27 26 22 22 20 28C18 34 24 36 30 36Z"
        fill="url(#uWing)"
        style={{ transformOrigin: "30px 34px" }}
      />
      {/* Front wing */}
      <path
        className="unicorn-wing"
        d="M34 32C32 24 28 20 26 26C24 32 29 34 34 34Z"
        fill="url(#uWing)"
        style={{ transformOrigin: "34px 32px" }}
      />

      {/* Neck */}
      <path d="M48 38C49 32 52 26 50 22C48 18 46 20 46 24L44 38Z" fill="url(#uBody)" />

      {/* Head */}
      <ellipse cx="53" cy="21" rx="7" ry="6" fill="url(#uBody)" />

      {/* Ear */}
      <path d="M50 15L48 10L51 14Z" fill="#C4B5E0" />

      {/* Horn - spiral */}
      <path d="M56 15L58 4L54 14Z" fill="url(#uHorn)" />
      <path d="M55.5 12L57 8" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
      <path d="M55.8 10L57.2 6" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />

      {/* Eye */}
      <circle cx="55" cy="20" r="1.5" fill="#1E1B4B" />
      <circle cx="55.5" cy="19.5" r="0.5" fill="white" />

      {/* Nostril */}
      <circle cx="59" cy="22" r="0.7" fill="#B8A5D4" />

      {/* Mane strands */}
      <path
        className="unicorn-mane"
        d="M50 14C48 11 45 15 43 12C41 9 39 14 37 11"
        stroke="url(#uMane)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        style={{ transformOrigin: "44px 13px" }}
      />
      <path
        className="unicorn-mane"
        d="M49 17C47 14 44 18 42 15C40 12 38 17 36 14"
        stroke="url(#uMane)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        style={{ transformOrigin: "43px 16px" }}
      />
      <path
        className="unicorn-mane"
        d="M48 20C46 17 44 21 42 18C40 15 38 20 36 17"
        stroke="url(#uMane)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{ transformOrigin: "42px 18px" }}
      />
      <path
        className="unicorn-mane"
        d="M47 23C45 20 43 24 41 21"
        stroke="url(#uMane)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{ transformOrigin: "44px 22px" }}
      />

      {/* Front legs */}
      <line className="unicorn-leg-fl" x1="42" y1="53" x2="44" y2="66" stroke="#B8A5D4" strokeWidth="3.5" strokeLinecap="round" />
      <line className="unicorn-leg-fr" x1="36" y1="53" x2="34" y2="66" stroke="#B8A5D4" strokeWidth="3.5" strokeLinecap="round" />

      {/* Back legs */}
      <line className="unicorn-leg-bl" x1="30" y1="53" x2="28" y2="66" stroke="#B8A5D4" strokeWidth="3.5" strokeLinecap="round" />
      <line className="unicorn-leg-br" x1="24" y1="53" x2="26" y2="66" stroke="#B8A5D4" strokeWidth="3.5" strokeLinecap="round" />

      {/* Hooves - small darker tips */}
      <circle className="unicorn-leg-fl" cx="44" cy="66" r="1.5" fill="#9B8EC4" />
      <circle className="unicorn-leg-fr" cx="34" cy="66" r="1.5" fill="#9B8EC4" />
      <circle className="unicorn-leg-bl" cx="28" cy="66" r="1.5" fill="#9B8EC4" />
      <circle className="unicorn-leg-br" cx="26" cy="66" r="1.5" fill="#9B8EC4" />
    </svg>
  );
}

/* ===== Main Component ===== */
export default function UnicornAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const unicornRef = useRef<HTMLDivElement>(null);
  const sparkleContainerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const hasTriggeredTextRef = useRef(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const unicornSize = isMobile ? 50 : 80;
  const DURATION = 4000; // 4s
  const SPARKLE_INTERVAL = 150; // ms
  const MAX_SPARKLES = isMobile ? 10 : 20;

  const spawnTrailSparkle = useCallback(
    (x: number, y: number) => {
      const sc = sparkleContainerRef.current;
      if (!sc) return;
      if (sc.childElementCount > MAX_SPARKLES * 2) return;

      const el = randomSparkle();
      el.style.left = `${x + Math.random() * 10 - 5}px`;
      el.style.top = `${y + Math.random() * 10}px`;
      el.style.opacity = "1";
      el.style.transition = "none";
      sc.appendChild(el);

      const driftX = (Math.random() - 0.5) * 20;
      const driftY = -(10 + Math.random() * 20);
      const rotateDeg = Math.random() * 180;

      requestAnimationFrame(() => {
        el.style.transition =
          "opacity 1.2s ease-out, transform 1.2s ease-out";
        el.style.opacity = "0";
        el.style.transform = `translate(${driftX}px, ${driftY}px) scale(0) rotate(${rotateDeg}deg)`;
      });

      setTimeout(() => {
        el.remove();
      }, 1300);
    },
    [MAX_SPARKLES]
  );

  const triggerTextInteraction = useCallback(() => {
    if (hasTriggeredTextRef.current) return;
    hasTriggeredTextRef.current = true;

    // Find the headline
    const headline = document.querySelector("[data-unicorn-headline]") as HTMLElement;
    if (!headline) return;

    const fullText = headline.textContent || "";
    // Split into "Get " and "Early Access." parts
    const parts = fullText.split(/(Early Access\.)/);

    // Wrap each letter in a span
    headline.innerHTML = "";
    let charIndex = 0;
    parts.forEach((part) => {
      if (part === "Early Access.") {
        const gradientSpan = document.createElement("span");
        gradientSpan.className = "gradient-text unicorn-gradient-shift";
        for (const char of part) {
          const s = document.createElement("span");
          s.textContent = char;
          s.style.display = "inline-block";
          s.style.animation = `unicornLetterPulse 0.4s ease-out ${charIndex * 0.03}s both`;
          if (char === " ") s.style.width = "0.3em";
          gradientSpan.appendChild(s);
          charIndex++;
        }
        headline.appendChild(gradientSpan);
      } else {
        for (const char of part) {
          const s = document.createElement("span");
          s.textContent = char;
          s.style.display = "inline-block";
          s.style.animation = `unicornLetterPulse 0.4s ease-out ${charIndex * 0.03}s both`;
          if (char === " ") s.style.width = "0.3em";
          headline.appendChild(s);
          charIndex++;
        }
      }
    });

    // Burst sparkles from headline area
    const rect = headline.getBoundingClientRect();
    const sc = sparkleContainerRef.current;
    if (sc) {
      const burstCount = isMobile ? 15 : 25;
      for (let i = 0; i < burstCount; i++) {
        const el = burstSparkle(isMobile ? 8 : 12);
        const cx = rect.left + rect.width * Math.random();
        const cy = rect.top + rect.height * Math.random();
        el.style.left = `${cx}px`;
        el.style.top = `${cy}px`;
        el.style.opacity = "1";
        el.style.zIndex = "9999";
        sc.appendChild(el);

        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 60;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;

        requestAnimationFrame(() => {
          el.style.transition =
            "opacity 1s ease-out, transform 1s ease-out";
          el.style.opacity = "0";
          el.style.transform = `translate(${dx}px, ${dy}px) scale(0) rotate(${Math.random() * 360}deg)`;
        });

        setTimeout(() => el.remove(), 1100);
      }
    }

    // Restore headline after animations
    setTimeout(() => {
      const gradEl = headline.querySelector(".unicorn-gradient-shift");
      if (gradEl) gradEl.classList.add("unicorn-gradient-back");

      // Add lingering shimmer
      headline.style.textShadow = "0 0 10px rgba(212,175,55,0.1)";
      setTimeout(() => {
        headline.style.transition = "text-shadow 3s ease-out";
        headline.style.textShadow = "none";
      }, 100);
    }, 800);

    // Fully restore original text after everything settles
    setTimeout(() => {
      headline.innerHTML = `Get <span class="gradient-text">Early Access.</span>`;
      headline.style.textShadow = "";
      headline.style.transition = "";
    }, 4500);
  }, [isMobile]);

  useEffect(() => {
    const unicorn = unicornRef.current;
    if (!unicorn) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Arc control points
    const p0: [number, number] = [-100, vh + 50]; // start off-screen bottom-left
    const p1: [number, number] = [vw * 0.5, isMobile ? -vh * 0.2 : -vh * 0.35]; // peak above center
    const p2: [number, number] = [vw + 100, vh + 50]; // exit off-screen bottom-right

    let startTime: number | null = null;
    let lastSparkleTime = 0;

    unicorn.style.willChange = "transform";

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / DURATION, 1);

      const [x, y] = quadBezier(t, p0, p1, p2);
      const angle = quadBezierAngle(t, p0, p1, p2);

      unicorn.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

      // Spawn sparkles
      if (timestamp - lastSparkleTime > SPARKLE_INTERVAL && t < 0.95) {
        spawnTrailSparkle(x + unicornSize * 0.2, y + unicornSize * 0.5);
        lastSparkleTime = timestamp;
      }

      // Trigger text interaction near center (t ~0.45-0.55)
      if (t >= 0.45 && t <= 0.55 && !hasTriggeredTextRef.current) {
        triggerTextInteraction();
      }

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Remove unicorn from DOM
        unicorn.style.display = "none";
        // Clean up remaining sparkles after a delay
        setTimeout(() => {
          const sc = sparkleContainerRef.current;
          if (sc) sc.innerHTML = "";
        }, 1500);
      }
    };

    // Small delay so page renders first
    const timeout = setTimeout(() => {
      animFrameRef.current = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [unicornSize, isMobile, spawnTrailSparkle, triggerTextInteraction]);

  return (
    <>
      {/* Sparkle container (full viewport) */}
      <div
        ref={sparkleContainerRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 50 }}
      />

      {/* Unicorn element */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 50 }}
      >
        <div
          ref={unicornRef}
          className="unicorn-gallop"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: unicornSize,
            height: unicornSize,
          }}
        >
          <UnicornSVG size={unicornSize} />
        </div>
      </div>

      <style>{`
        /* Galloping body bounce */
        .unicorn-gallop {
          animation: unicornGallopBounce 0.3s ease-in-out infinite;
        }
        @keyframes unicornGallopBounce {
          0%, 100% { margin-top: 0; }
          50% { margin-top: -3px; }
        }

        /* Leg galloping */
        .unicorn-leg-fl {
          animation: legFront 0.3s ease-in-out infinite;
          transform-origin: center top;
        }
        .unicorn-leg-fr {
          animation: legFront 0.3s ease-in-out infinite 0.15s;
          transform-origin: center top;
        }
        .unicorn-leg-bl {
          animation: legBack 0.3s ease-in-out infinite;
          transform-origin: center top;
        }
        .unicorn-leg-br {
          animation: legBack 0.3s ease-in-out infinite 0.15s;
          transform-origin: center top;
        }
        @keyframes legFront {
          0% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
          100% { transform: rotate(-15deg); }
        }
        @keyframes legBack {
          0% { transform: rotate(15deg); }
          50% { transform: rotate(-15deg); }
          100% { transform: rotate(15deg); }
        }

        /* Mane flutter */
        .unicorn-mane {
          animation: maneWave 0.2s ease-in-out infinite alternate;
        }
        @keyframes maneWave {
          0% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }

        /* Tail flutter */
        .unicorn-tail {
          animation: tailWave 0.2s ease-in-out infinite alternate;
        }
        @keyframes tailWave {
          0% { transform: rotate(-8deg) scaleX(0.95); }
          100% { transform: rotate(8deg) scaleX(1.05); }
        }

        /* Wing flap */
        .unicorn-wing {
          animation: wingFlap 0.4s ease-in-out infinite;
        }
        @keyframes wingFlap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.7); }
        }

        /* Letter pulse when unicorn passes through */
        @keyframes unicornLetterPulse {
          0% { transform: scale(1); text-shadow: none; }
          50% { transform: scale(1.08); text-shadow: 0 0 30px rgba(212,175,55,0.6); }
          100% { transform: scale(1); text-shadow: none; }
        }

        /* Gradient shift on "Early Access" */
        .unicorn-gradient-shift {
          animation: gradientToGold 0.5s ease-out forwards;
        }
        @keyframes gradientToGold {
          0% {
            background: linear-gradient(135deg, #4A6CF7, #7C5CFC);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          50% {
            background: linear-gradient(135deg, #D4AF37, #F5D76E);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          100% {
            background: linear-gradient(135deg, #D4AF37, #F5D76E);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        .unicorn-gradient-back {
          animation: gradientBackToBlue 0.8s ease-out forwards !important;
        }
        @keyframes gradientBackToBlue {
          0% {
            background: linear-gradient(135deg, #D4AF37, #F5D76E);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          100% {
            background: linear-gradient(135deg, #4A6CF7, #7C5CFC);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      `}</style>
    </>
  );
}
