"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "/story" },
  { label: "Startup Qualifications", href: "/qualifications/startup" },
  { label: "Investor Qualifications", href: "/qualifications/investor" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [logoHovered, setLogoHovered] = useState(false);
  const [moonSettled, setMoonSettled] = useState(false);
  const [moonHovered, setMoonHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const moonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMoonSettled(true), 1300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const checkWidth = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setMenuOpen(false);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const topOffset = bannerVisible ? 40 : 0;

  return (
    <>
      {/* Announcement banner */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] transition-all duration-200 overflow-hidden"
        style={{
          height: bannerVisible ? "40px" : "0px",
          opacity: bannerVisible ? 1 : 0,
        }}
      >
        <Link
          href="/waitlist"
          className="flex items-center justify-center w-full h-[40px] text-[13px] font-semibold text-white transition-all duration-200 hover:brightness-110 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          <span className="lg:hidden">
            <span className="mr-1">🚀</span> Join the founding cohort &rarr;
          </span>
          <span className="hidden lg:inline">
            <span className="mr-1">🚀</span> Founding cohort is open. 100 startup spots. Join the waitlist &rarr;
          </span>
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setBannerVisible(false);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-[20px] h-[20px] text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
          aria-label="Dismiss banner"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-200"
        style={{
          top: `${topOffset}px`,
          background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)",
          backdropFilter: "blur(40px) saturate(1.3)",
          WebkitBackdropFilter: "blur(40px) saturate(1.3)",
          borderBottom: "1px solid rgba(0,0,0,0.04)",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.04)" : "none",
        }}
      >
        {/* Bottom shimmer line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden transition-opacity duration-300"
          style={{ opacity: scrolled ? 0.2 : 0.15 }}
        >
          <div className="nav-shimmer-line absolute inset-0" />
        </div>

        <div className="mx-auto px-6 grid items-center h-16 lg:h-20" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
          {/* Far left: Logo */}
          <Link
            href="/"
            className="flex items-center gap-[10px] shrink-0 relative justify-self-start"
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

            {/* Full Moon */}
            <div
              ref={moonRef}
              className={`nav-moon${moonSettled ? " settled" : ""}${moonHovered ? " hovered" : ""}`}
              onMouseEnter={() => setMoonHovered(true)}
              onMouseLeave={() => setMoonHovered(false)}
            >
              {/* Lunar flare (one-time shockwave after settling) */}
              {moonSettled && <div className="lunar-flare" />}

              {/* Twinkle stars around the moon */}
              {moonSettled && (
                <>
                  <span className="moon-twinkle moon-twinkle-1" />
                  <span className="moon-twinkle moon-twinkle-2" />
                  <span className="moon-twinkle moon-twinkle-3" />
                  <span className="moon-twinkle moon-twinkle-4" />
                </>
              )}

              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
              >
                <defs>
                  {/* Spherical gradient: bright center to darker edges */}
                  <radialGradient id="moon-sphere" cx="45%" cy="40%" r="50%">
                    <stop offset="0%" stopColor="#C8CED8" />
                    <stop offset="70%" stopColor="#B0B8C4" />
                    <stop offset="100%" stopColor="#9AA2AE" />
                  </radialGradient>
                </defs>
                {/* Main moon body */}
                <circle cx="16" cy="16" r="13" fill="url(#moon-sphere)" stroke="rgba(200,210,220,0.3)" strokeWidth="1" />
                {/* Craters */}
                <circle cx="10" cy="11" r="3" fill="#9AA2B0" opacity="0.5" />
                <circle cx="19" cy="9" r="2" fill="#A8B0BC" opacity="0.45" />
                <circle cx="21" cy="18" r="3.5" fill="#9AA2B0" opacity="0.4" />
                <circle cx="12" cy="20" r="2.5" fill="#A8B0BC" opacity="0.35" />
                <circle cx="16" cy="15" r="1.5" fill="#9AA2B0" opacity="0.3" />
                <circle cx="8" cy="17" r="2" fill="#A8B0BC" opacity="0.3" />
              </svg>
            </div>

            <span
              className="transition-all duration-300"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "18px",
                letterSpacing: isDesktop ? "5px" : "3px",
                fontWeight: 600,
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
              URGENC
              <span className="relative ml-[-0.15em]">
                <span className="nav-logo-dot" />
              </span>
            </span>
          </Link>

          {/* Center: Nav links */}
          <div className="hidden lg:flex items-center justify-self-center" style={{ gap: "32px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link whitespace-nowrap"
                style={{ fontSize: "14px", fontWeight: 500, color: "#475569", letterSpacing: "0.3px" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Far right: Action buttons */}
          <div className="hidden lg:flex items-center justify-self-end shrink-0" style={{ gap: "16px" }}>
            <Link
              href="/login"
              className="nav-text-btn"
              style={{ fontSize: "14px", fontWeight: 500, color: "#475569" }}
            >
              Sign In
            </Link>

            <Link
              href="/status"
              className="nav-text-btn"
              style={{ fontSize: "14px", fontWeight: 500, color: "#475569" }}
            >
              Check Status
            </Link>

            <Link
              href="/waitlist"
              className="nav-waitlist-btn font-semibold text-white rounded-full"
              style={{
                letterSpacing: "0.3px",
                fontSize: "14px",
                padding: "10px 24px",
                background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              Join Waitlist
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 justify-self-end"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300`}
              style={{ backgroundColor: "#0F172A", ...(menuOpen ? { transform: "rotate(45deg) translateY(4.5px)" } : {}) }}
            />
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300`}
              style={{ backgroundColor: "#0F172A", ...(menuOpen ? { opacity: 0 } : {}) }}
            />
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300`}
              style={{ backgroundColor: "#0F172A", ...(menuOpen ? { transform: "rotate(-45deg) translateY(-4.5px)" } : {}) }}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[70] transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-full"
        }`}
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
        }}
      >
        {/* Close button top-right */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute flex items-center justify-center w-10 h-10"
          style={{ top: "24px", right: "24px" }}
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Nav links stacked vertically, centered */}
        <div className="flex flex-col items-center justify-center h-full px-6">
          <div className="flex flex-col items-center w-full">
            {[
              { label: "About", href: "/story" },
              { label: "Startup Qualifications", href: "/qualifications/startup" },
              { label: "Investor Qualifications", href: "/qualifications/investor" },
              { label: "Sign In", href: "/login" },
              { label: "Check Status", href: "/status" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-full transition-colors hover:text-accent-blue"
                style={{
                  height: "56px",
                  fontSize: "18px",
                  fontWeight: 600,
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  color: "#0F172A",
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Large gradient Join Waitlist button */}
            <div className="mt-8 w-full flex justify-center">
              <Link
                href="/waitlist"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-full font-semibold text-white rounded-full"
                style={{
                  maxWidth: "300px",
                  height: "56px",
                  fontSize: "18px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                }}
              >
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
