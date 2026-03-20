'use client';
import Lottie from 'lottie-react';
import { useEffect, useState, useRef } from 'react';

interface LottieAnimationProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
}

export default function LottieAnimation({ src, className, loop = true, autoplay = true, style }: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const lottieRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    fetch(src)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(() => {});
  }, [src]);

  if (!animationData) return null;

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={reducedMotion ? false : loop}
      autoplay={reducedMotion ? false : autoplay}
      className={className}
      style={style}
    />
  );
}
