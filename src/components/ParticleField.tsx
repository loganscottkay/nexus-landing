"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip on mobile / reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      const width = w();
      const height = h();
      // Reduced particle count from 38 to 20
      particles = Array.from({ length: 20 }, () => {
        const isLarge = Math.random() < 0.15;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: isLarge ? 3 + Math.random() : 1.5 + Math.random() * 1,
          opacity: isLarge ? 0.15 + Math.random() * 0.1 : 0.08 + Math.random() * 0.1,
        };
      });
    };

    const handleResize = () => {
      resize();
      init();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Throttle to ~30fps instead of 60fps
    let lastDraw = 0;
    const draw = (time: number) => {
      animationId = requestAnimationFrame(draw);

      if (time - lastDraw < 33) return; // ~30fps
      lastDraw = time;

      const width = w();
      const height = h();
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      // Connecting lines (O(n^2) but with 20 particles it's only 190 checks)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22500) {
            const dist = Math.sqrt(d2);
            const fade = 1 - dist / 150;
            const pulse = (Math.sin(time * 0.0008 + i + j * 0.7) + 1) * 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${fade * pulse * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      }
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
