'use client';
import React, { useState, useEffect } from 'react';

interface InteractiveCardProps {
  children: React.ReactNode;
  isHovering?: boolean;
  onHoverChange?: (hovering: boolean) => void;
  style?: React.CSSProperties;
  className?: string;
}

export default function InteractiveCard({ children, isHovering: externalHovering, onHoverChange, style, className }: InteractiveCardProps) {
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
    const xTilt = (e.clientX - rect.left) / rect.width - 0.5;
    const yTilt = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.transform = `perspective(800px) rotateX(${-yTilt * 4}deg) rotateY(${xTilt * 4}deg) translateY(-4px)`;
  };

  const handleEnter = () => {
    if (isMobile) return;
    setIsHovering(true);
    onHoverChange?.(true);
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    setIsHovering(false);
    onHoverChange?.(false);
  };

  const hovering = externalHovering ?? isHovering;

  return (
    <div
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: 'relative',
        width: '100%',
        transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s',
        willChange: 'transform',
        maxWidth: 700,
        margin: '0 auto',
        borderRadius: 20,
        border: `1.5px solid ${hovering ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.12)'}`,
        boxShadow: hovering
          ? '0 8px 32px rgba(99,102,241,0.1)'
          : isMobile
            ? '0 6px 24px rgba(99,102,241,0.08)'
            : '0 4px 20px rgba(99,102,241,0.06)',
        background: 'linear-gradient(135deg, rgba(220,215,255,0.95), rgba(212,218,255,0.9), rgba(225,215,252,0.93))',
        overflow: 'hidden',
        borderBottom: isMobile ? '2px solid rgba(99,102,241,0.08)' : undefined,
        ...style,
      }}
    >
      {/* Cursor glow - desktop only */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(99,102,241,0.08), transparent 60%)`,
          opacity: hovering ? 1 : 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
          borderRadius: 20,
          zIndex: 0,
        }} />
      )}
      {children}
    </div>
  );
}
