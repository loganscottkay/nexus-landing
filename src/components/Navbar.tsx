"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Startup Qualifications", href: "/qualifications/startup" },
  { label: "Investor Qualifications", href: "/qualifications/investor" },
  { label: "How It Works", href: "/#how-it-works", scrollId: "how-it-works" },
  { label: "For Investors", href: "/#for-investors", scrollId: "for-investors" },
  { label: "For Startups", href: "/#for-startups", scrollId: "for-startups" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [moonSettled, setMoonSettled] = useState(false);
  const [starSettled, setStarSettled] = useState(false);
  const applyRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Remove will-change after entrance animation completes
  useEffect(() => {
    const moonTimer = setTimeout(() => setMoonSettled(true), 1300);
    const starTimer = setTimeout(() => setStarSettled(true), 1600); // 0.3s after moon
    return () => { clearTimeout(moonTimer); clearTimeout(starTimer); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (applyRef.current && !applyRef.current.contains(e.target as Node)) {
        setApplyOpen(false);
      }
    };
    if (applyOpen) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [applyOpen]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)",
        backdropFilter: "blur(40px) saturate(1.3)",
        WebkitBackdropFilter: "blur(40px) saturate(1.3)",
        borderBottom: "1px solid rgba(0,0,0,0.04)",
      }}
    >
      {/* Bottom shimmer line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden transition-opacity duration-300"
        style={{ opacity: scrolled ? 0.35 : 0.2 }}
      >
        <div className="nav-shimmer-line absolute inset-0" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 xl:h-20">
        {/* Far left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-[10px] shrink-0 relative"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          {/* Sparkle trail particles */}
          {!moonSettled && (
            <>
              <span className="moon-sparkle moon-sparkle-1" />
              <span className="moon-sparkle moon-sparkle-2" />
              <span className="moon-sparkle moon-sparkle-3" />
              <span className="moon-sparkle moon-sparkle-4" />
            </>
          )}

          {/* Crescent Moon */}
          <div
            ref={moonRef}
            className={`nav-moon${moonSettled ? " settled" : ""}`}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Main gradient: slate to cool blue-gray */}
                <linearGradient id="moon-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#6B7B95" />
                  <stop offset="50%" stopColor="#8494AB" />
                  <stop offset="100%" stopColor="#5A6A82" />
                </linearGradient>
                {/* Inner shadow for dimensionality */}
                <filter id="moon-shadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                  <feOffset dx="0.5" dy="0.5" result="offset" />
                  <feFlood floodColor="#3A4A5E" floodOpacity="0.3" />
                  <feComposite in2="offset" operator="in" result="shadow" />
                  <feMerge>
                    <feMergeNode in="shadow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Highlight for realism */}
                <radialGradient id="moon-highlight" cx="30%" cy="25%" r="45%">
                  <stop offset="0%" stopColor="#C8D0DC" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#C8D0DC" stopOpacity="0" />
                </radialGradient>
                {/* Crescent mask: white = visible, black = hidden */}
                <mask id="crescent-mask">
                  <circle cx="16" cy="16" r="13" fill="white" />
                  <circle cx="22" cy="14" r="11" fill="black" />
                </mask>
              </defs>
              {/* Main crescent body */}
              <circle
                cx="16"
                cy="16"
                r="13"
                fill="url(#moon-grad)"
                mask="url(#crescent-mask)"
                filter="url(#moon-shadow)"
              />
              {/* Highlight overlay */}
              <circle
                cx="16"
                cy="16"
                r="13"
                fill="url(#moon-highlight)"
                mask="url(#crescent-mask)"
              />
            </svg>
          </div>

          {/* NEXUS text */}
          <span
            className="text-lg md:text-xl font-bold tracking-[0.3em] transition-all duration-300"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              ...(logoHovered
                ? {
                    background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }
                : { color: "#0F172A" }),
            }}
          >
            NEXUS
            <span className="relative ml-[-0.15em]">
              <span className="nav-logo-dot" />
            </span>
          </span>
        </Link>

        {/* Center: Nav links */}
        <div className="hidden xl:flex items-center" style={{ gap: "28px" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={link.scrollId ? (e) => scrollToSection(e, link.scrollId!) : undefined}
              className="nav-link text-text-secondary text-[14px] whitespace-nowrap"
              style={{ letterSpacing: "0.3px", fontWeight: 500 }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Far right: Action buttons */}
        <div className="hidden xl:flex items-center shrink-0" style={{ gap: "16px" }}>
          <Link
            href="/login"
            className="nav-signin-premium text-text-secondary text-[14px]"
            style={{ letterSpacing: "0.3px", fontWeight: 500 }}
          >
            Sign In
          </Link>

          <div className="relative" ref={applyRef}>
            <button
              onClick={() => setApplyOpen(!applyOpen)}
              className="nav-apply-btn flex items-center gap-1.5 text-[14px] font-semibold text-white"
              style={{ letterSpacing: "0.3px" }}
            >
              Apply Now
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200"
                style={{ transform: applyOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Dropdown */}
            <div
              className="absolute right-0 top-full mt-3 w-[240px] transition-all duration-200"
              style={{
                opacity: applyOpen ? 1 : 0,
                transform: applyOpen ? "translateY(0)" : "translateY(-8px)",
                pointerEvents: applyOpen ? "auto" : "none",
              }}
            >
              {/* Triangle connector */}
              <div className="absolute -top-[7px] right-[40px] w-0 h-0"
                style={{
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderBottom: "8px solid rgba(74, 108, 247, 0.3)",
                }}
              />
              <div className="absolute -top-[6px] right-[41px] w-0 h-0"
                style={{
                  borderLeft: "7px solid transparent",
                  borderRight: "7px solid transparent",
                  borderBottom: "7px solid rgba(255, 255, 255, 0.9)",
                }}
              />

              <div
                className="rounded-2xl p-2 relative overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    padding: "1px",
                    background: "linear-gradient(135deg, rgba(74,108,247,0.15), rgba(124,92,252,0.15), rgba(74,108,247,0.08))",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor" as const,
                    WebkitMaskComposite: "xor" as const,
                  }}
                />

                <Link
                  href="/apply/investor"
                  onClick={() => setApplyOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] text-text-primary font-medium transition-all duration-150 hover:bg-[rgba(74,108,247,0.05)] hover:text-[#4A6CF7]"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                  </svg>
                  Apply as Investor
                </Link>
                <Link
                  href="/apply/startup"
                  onClick={() => setApplyOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] text-text-primary font-medium transition-all duration-150 hover:bg-[rgba(74,108,247,0.05)] hover:text-[#4A6CF7]"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
                    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                  Apply as Startup
                </Link>
              </div>
            </div>
          </div>

          {/* Star */}
          <div className="relative" style={{ marginLeft: "10px" }}>
            {!starSettled && (
              <>
                <span className="star-sparkle star-sparkle-1" />
                <span className="star-sparkle star-sparkle-2" />
                <span className="star-sparkle star-sparkle-3" />
                <span className="star-sparkle star-sparkle-4" />
              </>
            )}
            <div className={`nav-star${starSettled ? " settled" : ""}`}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="star-grad" x1="4" y1="4" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#F5D76E" />
                  </linearGradient>
                  <radialGradient id="star-highlight" cx="40%" cy="35%" r="35%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </radialGradient>
                  <filter id="star-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="blur" />
                    <feOffset dx="0.4" dy="0.6" result="offset" />
                    <feFlood floodColor="#8B7020" floodOpacity="0.35" />
                    <feComposite in2="offset" operator="in" result="shadow" />
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <polygon
                  points="14,2 17.2,10.2 26,10.8 19.2,16.6 21.2,25.2 14,20.4 6.8,25.2 8.8,16.6 2,10.8 10.8,10.2"
                  fill="url(#star-grad)"
                  filter="url(#star-shadow)"
                />
                <polygon
                  points="14,2 17.2,10.2 26,10.8 19.2,16.6 21.2,25.2 14,20.4 6.8,25.2 8.8,16.6 2,10.8 10.8,10.2"
                  fill="url(#star-highlight)"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="xl:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-text-primary transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-text-primary transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-text-primary transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`xl:hidden mobile-menu overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (link.scrollId) scrollToSection(e, link.scrollId);
                setMenuOpen(false);
              }}
              className="text-text-secondary hover:text-text-primary transition-colors text-[15px] font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="text-text-secondary hover:text-text-primary transition-colors text-[15px] font-medium"
          >
            Sign In
          </Link>
          <div className="flex gap-3 pt-2">
            <Link
              href="/apply/investor"
              onClick={() => setMenuOpen(false)}
              className="nav-apply-btn text-[14px] font-medium text-white"
            >
              Apply as Investor
            </Link>
            <Link
              href="/apply/startup"
              onClick={() => setMenuOpen(false)}
              className="nav-apply-btn text-[14px] font-medium text-white"
            >
              Apply as Startup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
