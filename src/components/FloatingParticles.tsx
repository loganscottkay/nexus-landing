"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  opacity: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(false);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const isMobileRef = useRef(false);

  const initParticles = useCallback((w: number, h: number) => {
    const isMobile = window.innerWidth < 768;
    isMobileRef.current = isMobile;
    const count = isMobile ? 20 : 30;
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const speed = 0.3;
      const angle = Math.random() * Math.PI * 2;
      // Add +-40% variation to speed so they don't all move uniformly
      const speedVar = speed * (0.6 + Math.random() * 0.8);
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speedVar,
        vy: Math.sin(angle) * speedVar,
        size: 1 + Math.random(),
        baseOpacity: 0.2 + Math.random() * 0.3,
        opacity: 0.2 + Math.random() * 0.3,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to match parent
    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particlesRef.current.length === 0) {
        initParticles(rect.width, rect.height);
      }
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    // IntersectionObserver to start/stop animation
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) animate();
      },
      { threshold: 0.1 }
    );
    io.observe(parent);

    // Mouse tracking (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileRef.current) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = null;
    };
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    function animate() {
      if (!isVisibleRef.current || !ctx || !canvas) return;

      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;

      for (const p of particlesRef.current) {
        // Mouse repel + glow boost
        let glowBoost = false;
        if (mouse) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            glowBoost = true;
            // Gentle repel force, stronger when closer
            const force = (100 - dist) / 100 * 0.8;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
          }
        }

        // Dampen velocity back toward base speed
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Ensure minimum speed so particles keep drifting
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < 0.15) {
          const angle = Math.atan2(p.vy, p.vx);
          p.vx = Math.cos(angle) * 0.15;
          p.vy = Math.sin(angle) * 0.15;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;

        // Set opacity
        p.opacity = glowBoost ? 0.8 : p.baseOpacity;

        // Draw with glow
        ctx.save();
        ctx.shadowBlur = glowBoost ? 16 : 8;
        ctx.shadowColor = "rgba(139,92,246,0.4)";
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      io.disconnect();
      ro.disconnect();
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
