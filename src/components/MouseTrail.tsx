"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  time: number;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isTouchRef = useRef<boolean>(false);

  useEffect(() => {
    // Desktop only — bail on touch devices
    const isTouch =
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(hover: none)").matches;
    if (isTouch) {
      isTouchRef.current = true;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const TRAIL_LENGTH = 25;
    const SMOOTHING = 0.3;
    const FADE_TIMEOUT = 1500; // ms
    const MAX_DELTA = 100; // ms cap to prevent jumps after tab switch

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function onPointerMove(e: PointerEvent) {
      const now = performance.now();
      const points = pointsRef.current;

      if (points.length > 0) {
        const last = points[points.length - 1];
        // Smooth toward cursor
        const x = last.x + (e.clientX - last.x) * SMOOTHING;
        const y = last.y + (e.clientY - last.y) * SMOOTHING;
        points.push({ x, y, time: now });
      } else {
        points.push({ x: e.clientX, y: e.clientY, time: now });
      }

      // Trim to max length
      if (points.length > TRAIL_LENGTH) {
        points.splice(0, points.length - TRAIL_LENGTH);
      }
    }
    document.addEventListener("pointermove", onPointerMove, { passive: true });

    function draw(timestamp: number) {
      const rawDelta = timestamp - (lastTimeRef.current || timestamp);
      lastTimeRef.current = timestamp;

      // Cap delta to prevent jumps after tab switches
      if (rawDelta > MAX_DELTA) {
        pointsRef.current = [];
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const points = pointsRef.current;
      const now = performance.now();

      // Remove points older than fade timeout
      while (points.length > 0 && now - points[0].time > FADE_TIMEOUT) {
        points.shift();
      }

      if (points.length < 2) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx!.globalCompositeOperation = "lighter";

      for (let i = 1; i < points.length; i++) {
        const t = i / (points.length - 1); // 0 at tail, 1 at head
        const age = now - points[i].time;
        const ageFade = Math.max(0, 1 - age / FADE_TIMEOUT);

        // Width: 0.5 at tail → 2 at head
        const lineWidth = 0.5 + t * 1.5;
        // Opacity: 0 at tail → 1 at head, multiplied by age fade
        const opacity = t * ageFade;

        if (opacity <= 0) continue;

        // Gradient color along trail: indigo (#6366F1) → violet (#8B5CF6)
        const r = Math.round(99 + t * (139 - 99));
        const g = Math.round(102 + t * (92 - 102));
        const b = Math.round(241 + t * (246 - 241));

        ctx!.beginPath();
        ctx!.moveTo(points[i - 1].x, points[i - 1].y);
        ctx!.lineTo(points[i].x, points[i].y);
        ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx!.lineWidth = lineWidth;
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        ctx!.stroke();
      }

      ctx!.globalCompositeOperation = "source-over";

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (isTouchRef.current) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
