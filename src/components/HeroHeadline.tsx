'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface HeroHeadlineProps {
  lines: { text: string; isGradient: boolean }[][];
  prefersReduced: boolean;
}

const smoothDecel = [0.16, 1, 0.3, 1] as const;

const lineConfigs = [
  { delay: 0.6, y: 45, duration: 0.9 },
  { delay: 0.8, y: 35, duration: 0.8 },
];

export default function HeroHeadline({ lines, prefersReduced }: HeroHeadlineProps) {
  const [shimmerActive, setShimmerActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const timer = setTimeout(() => setShimmerActive(true), 1800);
    return () => clearTimeout(timer);
  }, [prefersReduced]);

  // Handle parallax with direct DOM manipulation instead of React state
  useEffect(() => {
    if (prefersReduced) return;
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.style.transform = `translateY(${window.scrollY * -0.15}px)`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="mb-8 relative"
      style={{
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
      {lines.map((segments, lineIndex) => {
        const config = lineConfigs[lineIndex] || lineConfigs[0];
        return (
          <motion.h1
            key={lineIndex}
            initial={prefersReduced ? false : { opacity: 0, y: config.y }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: config.duration, delay: config.delay, ease: smoothDecel }}
            className="text-[clamp(38px,10vw,44px)] sm:text-[44px] md:text-[56px] lg:text-[80px] xl:text-[88px] 2xl:text-[96px] font-normal leading-[1.05] md:leading-[1.0] tracking-[-0.02em]"
            style={{
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
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontWeight: 400,
                      fontStyle: 'normal',
                    }}
                  >
                    {segment.text}
                  </span>
                );
              }
              return (
                <span
                  key={segIndex}
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontWeight: 400,
                  }}
                >
                  {segment.text}
                </span>
              );
            })}
          </motion.h1>
        );
      })}
    </div>
  );
}
