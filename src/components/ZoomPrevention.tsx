"use client";

import { useEffect } from "react";

export default function ZoomPrevention() {
  useEffect(() => {
    let lastTouchEnd = 0;

    // Prevent pinch-to-zoom on touchmove — block any multi-finger touch
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        return;
      }
      // @ts-expect-error -- scale exists on TouchEvent in Safari
      if (e.scale !== undefined && e.scale !== 1) {
        e.preventDefault();
      }
    };

    // Prevent double-tap zoom
    const onTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // Prevent Safari gesture events (pinch/rotate)
    const onGesture = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    document.addEventListener("touchend", onTouchEnd, { passive: false });
    document.addEventListener("gesturestart", onGesture, { passive: false, capture: true });
    document.addEventListener("gesturechange", onGesture, { passive: false, capture: true });
    document.addEventListener("gestureend", onGesture, { passive: false, capture: true });

    return () => {
      document.removeEventListener("touchmove", onTouchMove, { capture: true });
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("gesturestart", onGesture, { capture: true });
      document.removeEventListener("gesturechange", onGesture, { capture: true });
      document.removeEventListener("gestureend", onGesture, { capture: true });
    };
  }, []);

  return null;
}
