"use client";

import { useEffect } from "react";

export default function ZoomPrevention() {
  useEffect(() => {
    let lastTouchEnd = 0;

    // Prevent pinch-to-zoom on touchmove
    const onTouchMove = (e: TouchEvent) => {
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

    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd, { passive: false });
    document.addEventListener("gesturestart", onGesture, { passive: false });
    document.addEventListener("gesturechange", onGesture, { passive: false });
    document.addEventListener("gestureend", onGesture, { passive: false });

    return () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("gesturestart", onGesture);
      document.removeEventListener("gesturechange", onGesture);
      document.removeEventListener("gestureend", onGesture);
    };
  }, []);

  return null;
}
