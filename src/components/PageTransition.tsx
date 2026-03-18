"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const SVG_PATH =
  "M43 259C296 11.5688 994 -3 922.994 498.259C851.988 999.517 281.229 1004.28 123 767C-35.2287 529.721 179 259 472 259C765 259 792 498.259 659 654C526 809.741 319 755 285 669.001C251 583.001 299 452 496 452C693 452 876.073 639.171 935 937.001";

const SESSION_KEY = "page-transition-enter";

interface GSAPInstance {
  to: (target: SVGPathElement, vars: Record<string, unknown>) => void;
}

function loadGSAP(): Promise<GSAPInstance> {
  return new Promise((resolve, reject) => {
    const win = window as unknown as { gsap?: GSAPInstance };
    if (win.gsap) {
      resolve(win.gsap);
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js";
    script.onload = () => resolve((window as unknown as { gsap: GSAPInstance }).gsap);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function isInternalLink(anchor: HTMLAnchorElement): boolean {
  // Must be same hostname
  if (anchor.hostname !== window.location.hostname) return false;
  // Skip hash-only links (same page)
  if (
    anchor.pathname === window.location.pathname &&
    anchor.hash &&
    anchor.search === window.location.search
  )
    return false;
  // Skip mailto/tel
  const proto = anchor.protocol;
  if (proto === "mailto:" || proto === "tel:") return false;
  // Skip links with target="_blank" or download
  if (anchor.target === "_blank" || anchor.hasAttribute("download"))
    return false;
  return true;
}

export default function PageTransition() {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Enter animation (page just loaded)
  useEffect(() => {
    if (!mounted) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.removeItem(SESSION_KEY);
      return;
    }

    const shouldAnimate = sessionStorage.getItem(SESSION_KEY);
    if (!shouldAnimate) return;
    sessionStorage.removeItem(SESSION_KEY);

    const path = pathRef.current;
    const overlay = overlayRef.current;
    if (!path || !overlay) return;

    animatingRef.current = true;
    overlay.style.pointerEvents = "all";

    const totalLength = path.getTotalLength();
    // Start fully drawn and thick (screen covered — no gaps)
    path.style.stroke = "#8B5CF6";
    path.style.strokeDasharray = `${totalLength + 10}`;
    path.style.strokeDashoffset = "0";
    path.style.strokeWidth = "35%";
    path.style.opacity = "1";

    // Fallback timer
    const fallback = setTimeout(() => {
      overlay.style.pointerEvents = "none";
      path.style.opacity = "0";
      path.style.stroke = "none";
      path.style.strokeWidth = "0";
      animatingRef.current = false;
    }, 3000);

    loadGSAP().then((gsap) => {
      gsap.to(path, {
        strokeDashoffset: totalLength,
        strokeWidth: "5%",
        duration: 1.25,
        delay: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          clearTimeout(fallback);
          overlay.style.pointerEvents = "none";
          path.style.opacity = "0";
          path.style.stroke = "none";
          path.style.strokeWidth = "0";
          animatingRef.current = false;
        },
      });
    });
  }, [mounted]);

  // Exit animation (intercept link clicks)
  useEffect(() => {
    if (!mounted) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function handleClick(e: MouseEvent) {
      if (animatingRef.current) return;

      // Find closest anchor
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      if (!isInternalLink(anchor)) return;

      // Skip if modifier keys held (open in new tab, etc.)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      const href = anchor.href;

      const path = pathRef.current;
      const overlay = overlayRef.current;
      if (!path || !overlay) {
        window.location.href = href;
        return;
      }

      animatingRef.current = true;
      overlay.style.pointerEvents = "all";

      const totalLength = path.getTotalLength();
      // Start invisible
      path.style.stroke = "#8B5CF6";
      path.style.strokeDasharray = `${totalLength}`;
      path.style.strokeDashoffset = `${totalLength}`;
      path.style.strokeWidth = "5%";
      path.style.opacity = "1";

      loadGSAP().then((gsap) => {
        gsap.to(path, {
          strokeDashoffset: 0,
          strokeWidth: "30%",
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            sessionStorage.setItem(SESSION_KEY, "1");
            window.location.href = href;
          },
        });
      });
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: "-15%",
          left: "-15%",
          width: "130%",
          height: "130%",
        }}
      >
        <path
          ref={pathRef}
          d={SVG_PATH}
          fill="none"
          stroke="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0, strokeWidth: 0 }}
        />
      </svg>
    </div>,
    document.body
  );
}
