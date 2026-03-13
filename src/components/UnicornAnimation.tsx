"use client";

import React from "react";
import UnicornSVG from "./UnicornSVG";

const SPARKLE_COLORS = ["#F5D76E", "#7C5CFC", "#4A6CF7", "#F5D76E", "#7C5CFC", "#4A6CF7", "#F5D76E", "#7C5CFC"];

export default function UnicornAnimation() {
  return (
    <>
      <div
        className="wl-unicorn-track pointer-events-none absolute left-0 w-full overflow-hidden"
        style={{ top: "200px", zIndex: 1, height: "120px" }}
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
                top: `${25 + (i % 3) * 10}px`,
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
          <UnicornSVG
            size={70}
            prefix="wl"
            maneClass="wl-unicorn-mane"
            legClasses={{ fl: "wl-leg-fl", fr: "wl-leg-fr", bl: "wl-leg-bl", br: "wl-leg-br" }}
          />
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

        /* Horn sparkle pulse */
        .wl-horn-sparkle {
          animation: wlHornSparkle 1.5s ease-in-out infinite;
        }
        @keyframes wlHornSparkle {
          0%, 100% { opacity: 0.6; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @media (max-width: 767px) {
          .wl-unicorn-track {
            top: 160px !important;
          }
          .wl-unicorn-runner svg {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </>
  );
}
