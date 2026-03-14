'use client';
import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    let rafId: number;
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (elRef.current) {
          elRef.current.style.left = (e.clientX - 200) + 'px';
          elRef.current.style.top = (e.clientY - 200) + 'px';
          elRef.current.style.opacity = '1';
        }
      });
    };

    const handleLeave = () => {
      if (elRef.current) elRef.current.style.opacity = '0';
    };
    const handleEnter = () => {
      if (elRef.current) elRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={elRef}
      style={{
        position: 'fixed',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'left, top',
      }}
    />
  );
}
