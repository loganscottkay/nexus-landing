'use client';
import React, { useEffect, useState, useRef } from 'react';

interface HeroHeadlineProps {
  lines: { text: string; isGradient: boolean }[][];
  prefersReduced: boolean;
  scrollY: number;
}

function LetterSpan({
  char,
  index,
  isGradient,
  baseDelay,
  prefersReduced,
}: {
  char: string;
  index: number;
  isGradient: boolean;
  baseDelay: number;
  prefersReduced: boolean;
}) {
  const stagger = isGradient ? 0.05 : 0.02;
  const delay = baseDelay + index * stagger;

  if (prefersReduced) {
    return (
      <span style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    );
  }

  return (
    <span
      className="hero-letter"
      style={{
        animationDelay: `${delay}s`,
        display: 'inline-block',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  );
}

export default function HeroHeadline({ lines, prefersReduced, scrollY }: HeroHeadlineProps) {
  const [shimmerActive, setShimmerActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const timer = setTimeout(() => setShimmerActive(true), 1800);
    return () => clearTimeout(timer);
  }, [prefersReduced]);

  let globalCharIndex = 0;

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
      {lines.map((segments, lineIndex) => {
        const lineEl = (
          <h1
            key={lineIndex}
            className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[68px] xl:text-[76px] font-bold leading-[1.05] tracking-[-0.02em]"
            style={{
              fontFamily: 'var(--font-playfair), serif',
              color: '#0F172A',
              textShadow: '0 0 40px rgba(74,108,247,0.08)',
            }}
          >
            {segments.map((segment, segIndex) => {
              const chars = segment.text.split('');
              const startIndex = globalCharIndex;
              globalCharIndex += chars.length;

              if (segment.isGradient) {
                return (
                  <span
                    key={segIndex}
                    className={`gradient-text-animate gradient-shimmer-wrap${shimmerActive ? ' shimmer-active' : ''}`}
                  >
                    {chars.map((char, i) => (
                      <LetterSpan
                        key={i}
                        char={char}
                        index={startIndex + i}
                        isGradient={true}
                        baseDelay={0.5}
                        prefersReduced={prefersReduced}
                      />
                    ))}
                  </span>
                );
              }

              return (
                <React.Fragment key={segIndex}>
                  {chars.map((char, i) => (
                    <LetterSpan
                      key={i}
                      char={char}
                      index={startIndex + i}
                      isGradient={false}
                      baseDelay={0.5}
                      prefersReduced={prefersReduced}
                    />
                  ))}
                </React.Fragment>
              );
            })}
          </h1>
        );
        return lineEl;
      })}
    </div>
  );
}
