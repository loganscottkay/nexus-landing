"use client";

import React from "react";

/* Simple unicorn SVG - reuses the detailed one but with waitlist-prefixed gradient IDs */
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
        <linearGradient id="wlBody" x1="10" y1="30" x2="65" y2="65">
          <stop stopColor="#F0E6FF" />
          <stop offset="1" stopColor="#C4B5E0" />
        </linearGradient>
        <linearGradient id="wlMane" x1="30" y1="5" x2="50" y2="35">
          <stop stopColor="#4A6CF7" />
          <stop offset="0.5" stopColor="#7C5CFC" />
          <stop offset="1" stopColor="#D946EF" />
        </linearGradient>
        <linearGradient id="wlHorn" x1="54" y1="0" x2="58" y2="20">
          <stop stopColor="#D4AF37" />
          <stop offset="0.85" stopColor="#F5D76E" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id="wlWing" x1="30" y1="25" x2="45" y2="40">
          <stop stopColor="rgba(255,255,255,0.4)" />
          <stop offset="1" stopColor="rgba(196,181,224,0.4)" />
        </linearGradient>
      </defs>

      {/* Tail */}
      <path
        className="wl-unicorn-tail"
        d="M8 42C3 36 -2 38 2 44C5 48 4 46 8 50C6 46 1 42 4 38"
        stroke="url(#wlMane)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        style={{ transformOrigin: "8px 44px" }}
      />

      {/* Body */}
      <ellipse cx="35" cy="44" rx="20" ry="12" fill="url(#wlBody)" />

      {/* Back wing */}
      <path
        className="wl-unicorn-wing"
        d="M30 34C27 26 22 22 20 28C18 34 24 36 30 36Z"
        fill="url(#wlWing)"
        style={{ transformOrigin: "30px 34px" }}
      />
      {/* Front wing */}
      <path
        className="wl-unicorn-wing"
        d="M34 32C32 24 28 20 26 26C24 32 29 34 34 34Z"
        fill="url(#wlWing)"
        style={{ transformOrigin: "34px 32px" }}
      />

      {/* Neck */}
      <path d="M48 38C49 32 52 26 50 22C48 18 46 20 46 24L44 38Z" fill="url(#wlBody)" />

      {/* Head */}
      <ellipse cx="53" cy="21" rx="7" ry="6" fill="url(#wlBody)" />

      {/* Ear */}
      <path d="M50 15L48 10L51 14Z" fill="#C4B5E0" />

      {/* Horn */}
      <path d="M56 15L58 4L54 14Z" fill="url(#wlHorn)" />
      <path d="M55.5 12L57 8" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
      <path d="M55.8 10L57.2 6" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />

      {/* Eye */}
      <circle cx="55" cy="20" r="1.5" fill="#1E1B4B" />
      <circle cx="55.5" cy="19.5" r="0.5" fill="white" />

      {/* Nostril */}
      <circle cx="59" cy="22" r="0.7" fill="#B8A5D4" />

      {/* Mane strands */}
      <path className="wl-unicorn-mane" d="M50 14C48 11 45 15 43 12C41 9 39 14 37 11" stroke="url(#wlMane)" strokeWidth="3" strokeLinecap="round" fill="none" style={{ transformOrigin: "44px 13px" }} />
      <path className="wl-unicorn-mane" d="M49 17C47 14 44 18 42 15C40 12 38 17 36 14" stroke="url(#wlMane)" strokeWidth="2.5" strokeLinecap="round" fill="none" style={{ transformOrigin: "43px 16px" }} />
      <path className="wl-unicorn-mane" d="M48 20C46 17 44 21 42 18C40 15 38 20 36 17" stroke="url(#wlMane)" strokeWidth="2" strokeLinecap="round" fill="none" style={{ transformOrigin: "42px 18px" }} />
      <path className="wl-unicorn-mane" d="M47 23C45 20 43 24 41 21" stroke="url(#wlMane)" strokeWidth="2" strokeLinecap="round" fill="none" style={{ transformOrigin: "44px 22px" }} />

      {/* Front legs */}
      <line className="wl-leg-fl" x1="42" y1="53" x2="44" y2="66" stroke="#B8A5D4" strokeWidth="3.5" strokeLinecap="round" />
      <line className="wl-leg-fr" x1="36" y1="53" x2="34" y2="66" stroke="#B8A5D4" strokeWidth="3.5" strokeLinecap="round" />

      {/* Back legs */}
      <line className="wl-leg-bl" x1="30" y1="53" x2="28" y2="66" stroke="#B8A5D4" strokeWidth="3.5" strokeLinecap="round" />
      <line className="wl-leg-br" x1="24" y1="53" x2="26" y2="66" stroke="#B8A5D4" strokeWidth="3.5" strokeLinecap="round" />

      {/* Hooves */}
      <circle className="wl-leg-fl" cx="44" cy="66" r="1.5" fill="#9B8EC4" />
      <circle className="wl-leg-fr" cx="34" cy="66" r="1.5" fill="#9B8EC4" />
      <circle className="wl-leg-bl" cx="28" cy="66" r="1.5" fill="#9B8EC4" />
      <circle className="wl-leg-br" cx="26" cy="66" r="1.5" fill="#9B8EC4" />
    </svg>
  );
}

const SPARKLE_COLORS = ["#F5D76E", "#7C5CFC", "#4A6CF7", "#F5D76E", "#7C5CFC", "#4A6CF7", "#F5D76E", "#7C5CFC"];

export default function UnicornAnimation() {
  return (
    <>
      <div
        className="wl-unicorn-track pointer-events-none absolute left-0 w-full overflow-hidden"
        style={{ top: "200px", zIndex: 1, height: "100px" }}
      >
        <div className="wl-unicorn-runner" style={{ willChange: "transform" }}>
          {/* 8 sparkle dots with staggered CSS delays */}
          {SPARKLE_COLORS.map((color, i) => (
            <div
              key={i}
              className="wl-sparkle"
              style={{
                animationDelay: `${i * 0.25}s`,
                left: `${-8 - i * 8}px`,
                top: `${20 + (i % 3) * 10}px`,
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: color,
                }}
              />
            </div>
          ))}
          <UnicornSVG size={60} />
        </div>
      </div>

      <style>{`
        /* Horizontal run: left to right, 5 seconds, once */
        .wl-unicorn-runner {
          position: relative;
          display: inline-block;
          opacity: 0;
          animation: wlFadeIn 0.2s ease-out 0.3s forwards, wlRun 5s linear 0.3s forwards, wlBounce 0.3s ease-in-out infinite;
        }
        @keyframes wlFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes wlRun {
          0% { transform: translateX(-120px); }
          100% { transform: translateX(calc(100vw + 120px)); }
        }
        @keyframes wlBounce {
          0%, 100% { margin-top: 0; }
          50% { margin-top: -3px; }
        }

        /* Sparkle trail: simple fade out */
        .wl-sparkle {
          position: absolute;
          opacity: 0;
          animation: wlSparkleFade 1s ease-out infinite;
        }
        @keyframes wlSparkleFade {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-12px); }
        }

        /* Leg gallop */
        .wl-leg-fl { animation: wlLegF 0.3s ease-in-out infinite; transform-origin: center top; }
        .wl-leg-fr { animation: wlLegF 0.3s ease-in-out infinite 0.15s; transform-origin: center top; }
        .wl-leg-bl { animation: wlLegB 0.3s ease-in-out infinite; transform-origin: center top; }
        .wl-leg-br { animation: wlLegB 0.3s ease-in-out infinite 0.15s; transform-origin: center top; }
        @keyframes wlLegF {
          0% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
          100% { transform: rotate(-15deg); }
        }
        @keyframes wlLegB {
          0% { transform: rotate(15deg); }
          50% { transform: rotate(-15deg); }
          100% { transform: rotate(15deg); }
        }

        /* Mane flutter */
        .wl-unicorn-mane {
          animation: wlMane 0.3s ease-in-out infinite alternate;
        }
        @keyframes wlMane {
          0% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }

        /* Tail flutter */
        .wl-unicorn-tail {
          animation: wlTail 0.3s ease-in-out infinite alternate;
        }
        @keyframes wlTail {
          0% { transform: rotate(-6deg); }
          100% { transform: rotate(6deg); }
        }

        /* Wing flap */
        .wl-unicorn-wing {
          animation: wlWing 0.4s ease-in-out infinite;
        }
        @keyframes wlWing {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.7); }
        }

        @media (max-width: 767px) {
          .wl-unicorn-track {
            top: 160px !important;
          }
          .wl-unicorn-runner svg {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </>
  );
}
