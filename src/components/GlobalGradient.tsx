"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
} from "framer-motion";

const BLOBS = [
  { color: "rgba(99,102,241,0.04)", speed: 20, phaseOffset: 0 },
  { color: "rgba(139,92,246,0.03)", speed: 26, phaseOffset: (Math.PI * 2) / 3 },
  { color: "rgba(167,139,250,0.02)", speed: 32, phaseOffset: (Math.PI * 4) / 3 },
];

function OrbitBlob({ color, speed, phaseOffset }: { color: string; speed: number; phaseOffset: number }) {
  const phase = useMotionValue(0);

  const left = useTransform(phase, (v) => `${50 + 25 * Math.cos(v + phaseOffset)}%`);
  const top = useTransform(phase, (v) => `${50 + 25 * Math.sin(v + phaseOffset)}%`);

  useEffect(() => {
    const control = animate(phase, Math.PI * 2, {
      duration: speed,
      repeat: Infinity,
      ease: "linear",
    });
    return () => control.stop();
  }, [phase, speed]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "40vw",
        height: "40vw",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        left,
        top,
        x: "-50%",
        y: "-50%",
      }}
    />
  );
}

function MouseBlob() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 28 });

  useEffect(() => {
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "40vw",
        height: "40vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.03) 0%, transparent 70%)",
        left: springX,
        top: springY,
        x: "-50%",
        y: "-50%",
      }}
    />
  );
}

export default function GlobalGradient() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isDesktop) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
        filter: "blur(100px)",
      }}
    >
      {BLOBS.map((blob, i) => (
        <OrbitBlob key={i} color={blob.color} speed={blob.speed} phaseOffset={blob.phaseOffset} />
      ))}
      <MouseBlob />
    </div>
  );
}
