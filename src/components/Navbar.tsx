"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LottieAnimation from "@/components/LottieAnimation";

const navLinks = [
  { label: "Startup Qualifications", href: "/qualifications/startup" },
  { label: "Investor Qualifications", href: "/qualifications/investor" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
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
          <span className="lg:hidden text-[12px] sm:text-[13px] px-2 text-center">
            <span className="inline-flex items-center mr-1" style={{ verticalAlign: 'middle', opacity: 0.8 }}><LottieAnimation src="/animations/attention-pulse.json" loop={true} className="lottie-brand w-[24px] h-[24px]" /></span> Founding cohort coming soon. Join the waitlist &rarr;
          </span>
          <span className="hidden lg:inline">
            <span className="inline-flex items-center mr-1" style={{ verticalAlign: 'middle', opacity: 0.8 }}><LottieAnimation src="/animations/attention-pulse.json" loop={true} className="lottie-brand w-[24px] h-[24px]" /></span> Founding cohort coming soon. Join the waitlist &rarr;
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
        className="fixed left-0 right-0 z-50"
        style={{
          top: `${topOffset}px`,
          background: scrolled ? "rgba(255,255,255,0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(1.8)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.8)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.04)" : "1px solid transparent",
          boxShadow: scrolled ? "inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 30px rgba(0,0,0,0.04)" : "none",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease, box-shadow 0.4s ease, top 0.2s ease",
        }}
      >
        {/* Bottom shimmer line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden"
          style={{ opacity: scrolled ? 0.2 : 0, transition: "opacity 0.4s ease" }}
        >
          <div className="nav-shimmer-line absolute inset-0" />
        </div>

        <div className="mx-auto px-6 grid items-center h-16 lg:h-20" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
          {/* Far left: Logo */}
          <Link
            href="/"
            className="shrink-0 justify-self-start flex items-center"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <span
              className="text-[22px] md:text-[26px] font-normal transition-all duration-300"
              style={{
                fontFamily: "var(--font-playfair), serif",
                textShadow: logoHovered ? "0 0 20px rgba(74,108,247,0.15)" : "0 0 20px rgba(74,108,247,0)",
              }}
            >
              <span
                className="transition-all duration-300"
                style={logoHovered ? {
                  background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                } : {
                  color: "#0F172A",
                }}
              >
                Urgen
              </span>
              <span
                className="gradient-text"
              >
                C
              </span>
            </span>
          </Link>

          {/* Center: Nav links */}
          <div className="hidden lg:flex items-center justify-self-center" style={{ gap: "28px" }}>
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

            <Link
              href="/story"
              className="nav-link whitespace-nowrap"
              style={{ fontSize: "14px", fontWeight: 500, color: "#475569", letterSpacing: "0.3px" }}
            >
              About
            </Link>
          </div>

          {/* Far right: Join Waitlist */}
          <div className="hidden lg:flex items-center justify-self-end shrink-0">
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

          {/* Mobile: centered Join Waitlist (in center grid column) */}
          <div className="lg:hidden flex items-center justify-self-center">
            <Link
              href="/waitlist"
              className="font-semibold text-white rounded-full"
              style={{
                letterSpacing: "0.3px",
                fontSize: "13px",
                padding: "8px 20px",
                background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              Join Waitlist
            </Link>
          </div>

          {/* Mobile: hamburger (in right grid column) */}
          <div className="lg:hidden flex items-center justify-self-end">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span
                className="block w-6 h-[1.5px] transition-all duration-300"
                style={{ backgroundColor: "#0F172A", ...(menuOpen ? { transform: "rotate(45deg) translateY(4.5px)" } : {}) }}
              />
              <span
                className="block w-6 h-[1.5px] transition-all duration-300"
                style={{ backgroundColor: "#0F172A", ...(menuOpen ? { opacity: 0 } : {}) }}
              />
              <span
                className="block w-6 h-[1.5px] transition-all duration-300"
                style={{ backgroundColor: "#0F172A", ...(menuOpen ? { transform: "rotate(-45deg) translateY(-4.5px)" } : {}) }}
              />
            </button>
          </div>
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
              { label: "Startup Qualifications", href: "/qualifications/startup" },
              { label: "Investor Qualifications", href: "/qualifications/investor" },
              { label: "About", href: "/story" },
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
