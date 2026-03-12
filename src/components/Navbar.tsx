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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
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

  // Close preview dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (previewRef.current && !previewRef.current.contains(e.target as Node)) {
        setPreviewOpen(false);
      }
    }
    if (previewOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [previewOpen]);

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
            className="shrink-0 justify-self-start"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <span
              className="text-[22px] md:text-[26px] font-normal transition-all duration-300"
              style={{
                fontFamily: "'Instrument Serif', serif",
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

            {/* Preview dropdown */}
            <div ref={previewRef} className="relative">
              <button
                onClick={() => setPreviewOpen(!previewOpen)}
                className="nav-link whitespace-nowrap flex items-center gap-1.5"
                style={{ fontSize: "14px", fontWeight: 500, color: "#475569", letterSpacing: "0.3px" }}
              >
                Preview
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
                  style={{ transform: previewOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Dropdown */}
              <div
                className="absolute top-full left-1/2 pt-2"
                style={{
                  transform: "translateX(-50%)",
                  pointerEvents: previewOpen ? "auto" : "none",
                }}
              >
                <div
                  className="rounded-2xl"
                  style={{
                    background: "#FFFFFF",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
                    padding: "12px",
                    minWidth: "280px",
                    opacity: previewOpen ? 1 : 0,
                    transform: previewOpen ? "scale(1)" : "scale(0.95)",
                    transformOrigin: "top center",
                    transition: previewOpen
                      ? "opacity 0.15s ease-out, transform 0.15s ease-out"
                      : "opacity 0.1s ease-in, transform 0.1s ease-in",
                  }}
                >
                  <Link
                    href="/dashboard/investor"
                    onClick={() => setPreviewOpen(false)}
                    className="group flex items-center gap-3 rounded-xl transition-all duration-150"
                    style={{ padding: "14px 18px" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#F0F4FF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                    </svg>
                    <div className="flex-1">
                      <span
                        className="block font-semibold"
                        style={{ fontSize: "15px", color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        Investor Dashboard
                      </span>
                      <span
                        className="block"
                        style={{ fontSize: "12px", color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", marginTop: "2px" }}
                      >
                        See what investors see on UrgenC.
                      </span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>

                  {/* Divider */}
                  <div className="mx-3" style={{ height: "1px", background: "rgba(0, 0, 0, 0.06)" }} />

                  <Link
                    href="/dashboard/founder"
                    onClick={() => setPreviewOpen(false)}
                    className="group flex items-center gap-3 rounded-xl transition-all duration-150"
                    style={{ padding: "14px 18px" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#F0F4FF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
                      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                    </svg>
                    <div className="flex-1">
                      <span
                        className="block font-semibold"
                        style={{ fontSize: "15px", color: "#0F172A", fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        Startup Dashboard
                      </span>
                      <span
                        className="block"
                        style={{ fontSize: "12px", color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif", marginTop: "2px" }}
                      >
                        See what founders see on UrgenC.
                      </span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
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
              { label: "Preview: Investor Dashboard", href: "/dashboard/investor" },
              { label: "Preview: Startup Dashboard", href: "/dashboard/founder" },
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
            <Link
              href="/apply/investor"
              onClick={() => setMenuOpen(false)}
              className="mt-4 text-[14px] transition-colors hover:opacity-80"
              style={{ color: "#4A6CF7", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              I am an investor &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
