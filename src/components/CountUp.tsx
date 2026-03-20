"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 1500,
  decimals = 0,
  delay = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  delay?: number;
}) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const [glowFlash, setGlowFlash] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && !started) setStarted(true);
  }, [isInView, started]);

  useEffect(() => {
    if (!started) return;

    const timeout = setTimeout(() => {
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(eased * target);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setValue(target);
          setGlowFlash(true);
          setTimeout(() => setGlowFlash(false), 600);
        }
      };

      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timeout);
  }, [started, target, duration, delay]);

  const display =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString();

  return (
    <span ref={ref} className={glowFlash ? "stat-glow-flash" : ""}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
