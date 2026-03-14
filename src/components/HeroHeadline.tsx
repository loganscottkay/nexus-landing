'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface HeroHeadlineProps {
  lines: { text: string; isGradient: boolean }[][];
  prefersReduced: boolean;
  scrollY: number;
}

const ease = [0.25, 0.4, 0.25, 1] as const;

export default function HeroHeadline({ lines, prefersReduced, scrollY }: HeroHeadlineProps) {
  const [shimmerActive, setShimmerActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const timer = setTimeout(() => setShimmerActive(true), 1800);
    return () => clearTimeout(timer);
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="mb-8 relative"
      style={{
        willChange: prefersReduced ? 'auto' : 'transform',
        transform: prefersReduced ? 'none' : `translateY(${scrollY * -0.15}px)`,
        perspective: '600px',
      }}
    >
      {/* Luminous halo behind headline */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.06), transparent 70%)',
          zIndex: -1,
        }}
      />
      {lines.map((segments, lineIndex) => (
        <motion.h1
          key={lineIndex}
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 + lineIndex * 0.3, ease }}
          className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[68px] xl:text-[76px] font-bold leading-[1.05] tracking-[-0.02em]"
          style={{
            fontFamily: 'var(--font-playfair), serif',
            color: '#0F172A',
            textShadow: '0 0 40px rgba(74,108,247,0.08)',
          }}
        >
          {segments.map((segment, segIndex) => {
            if (segment.isGradient) {
              return (
                <span
                  key={segIndex}
                  className={`gradient-text-animate gradient-shimmer-wrap${shimmerActive ? ' shimmer-active' : ''}`}
                >
                  {segment.text}
                </span>
              );
            }
            return <React.Fragment key={segIndex}>{segment.text}</React.Fragment>;
          })}
        </motion.h1>
      ))}
    </div>
  );
}
