'use client';
import { useEffect, useRef, useState } from 'react';

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const elRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    const updatePosition = () => {
      if (elRef.current) {
        elRef.current.style.left = posRef.current.x - 200 + 'px';
        elRef.current.style.top = posRef.current.y - 200 + 'px';
      }
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    rafRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

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
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        willChange: 'left, top',
      }}
    />
  );
}
