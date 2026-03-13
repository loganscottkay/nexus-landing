"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Startup Qualifications", href: "/qualifications/startup" },
  { label: "Investor Qualifications", href: "/qualifications/investor" },
];

function NavUnicornSVG() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="navBody" x1="10" y1="30" x2="65" y2="65">
          <stop stopColor="#F0E6FF" />
          <stop offset="1" stopColor="#C4B5E0" />
        </linearGradient>
        <linearGradient id="navMane" x1="30" y1="5" x2="50" y2="35">
          <stop stopColor="#4A6CF7" />
          <stop offset="0.5" stopColor="#7C5CFC" />
          <stop offset="1" stopColor="#D946EF" />
        </linearGradient>
        <linearGradient id="navHorn" x1="54" y1="0" x2="58" y2="20">
          <stop stopColor="#D4AF37" />
          <stop offset="0.85" stopColor="#F5D76E" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id="navWing" x1="30" y1="25" x2="45" y2="40">
          <stop stopColor="rgba(255,255,255,0.4)" />
          <stop offset="1" stopColor="rgba(196,181,224,0.4)" />
        </linearGradient>
      </defs>

      {/* Tail */}
      <path className="nav-unicorn-mane-idle" d="M8 42C3 36 -2 38 2 44C5 48 4 46 8 50C6 46 1 42 4 38" stroke="url(#navMane)" strokeWidth="3" strokeLinecap="round" fill="none" style={{ transformOrigin: "8px 44px" }} />

      {/* Body */}
      <ellipse cx="35" cy="44" rx="20" ry="12" fill="url(#navBody)" />

      {/* Wings */}
      <path d="M30 34C27 26 22 22 20 28C18 34 24 36 30 36Z" fill="url(#navWing)" style={{ transformOrigin: "30px 34px" }} />
      <path d="M34 32C32 24 28 20 26 26C24 32 29 34 34 34Z" fill="url(#navWing)" style={{ transformOrigin: "34px 32px" }} />

      {/* Neck */}
      <path d="M48 38C49 32 52 26 50 22C48 18 46 20 46 24L44 38Z" fill="url(#navBody)" />

      {/* Head */}
      <ellipse cx="53" cy="21" rx="7" ry="6" fill="url(#navBody)" />

      {/* Ear */}
      <path d="M50 15L48 10L51 14Z" fill="#C4B5E0" />

      {/* Horn */}
      <path d="M56 15L58 4L54 14Z" fill="url(#navHorn)" />
      <path d="M55.5 12L57 8" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
      <path d="M55.8 10L57.2 6" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />

      {/* Eye */}
      <circle cx="55" cy="20" r="1.5" fill="#1E1B4B" />
      <circle cx="55.5" cy="19.5" r="0.5" fill="white" />

      {/* Nostril */}
      <circle cx="59" cy="22" r="0.7" fill="#B8A5D4" />

      {/* Mane strands */}
      <path className="nav-unicorn-mane-idle" d="M50 14C48 11 45 15 43 12C41 9 39 14 37 11" stroke="url(#navMane)" strokeWidth="3" strokeLinecap="round" fill="none" style={{ transformOrigin: "44px 13px" }} />
      <path className="nav-unicorn-mane-idle" d="M49 17C47 14 44 18 42 15C40 12 38 17 36 14" stroke="url(#navMane)" strokeWidth="2.5" strokeLinecap="round" fill="none" style={{ transformOrigin: "43px 16px" }} />
      <path className="nav-unicorn-mane-idle" d="M48 20C46 17 44 21 42 18C40 15 38 20 36 17" stroke="url(#navMane)" strokeWidth="2" strokeLinecap="round" fill="none" style={{ transformOrigin: "42px 18px" }} />

      {/* Legs (static in navbar - no gallop) */}
      <line x1="42" y1="53" x2="44" y2="66" stroke="#B8A5D4" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="36" y1="53" x2="34" y2="66" stroke="#B8A5D4" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="30" y1="53" x2="28" y2="66" stroke="#B8A5D4" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="24" y1="53" x2="26" y2="66" stroke="#B8A5D4" strokeWidth="3.5" strokeLinecap="round" />

      {/* Hooves */}
      <circle cx="44" cy="66" r="1.5" fill="#9B8EC4" />
      <circle cx="34" cy="66" r="1.5" fill="#9B8EC4" />
      <circle cx="28" cy="66" r="1.5" fill="#9B8EC4" />
      <circle cx="26" cy="66" r="1.5" fill="#9B8EC4" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
            <span className="mr-1">🚀</span> Founding cohort coming soon. Join the waitlist &rarr;
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
            className="shrink-0 justify-self-start flex items-center"
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
            <span
              className={isHome ? "nav-unicorn-entrance" : "nav-unicorn-resting"}
              style={{ marginLeft: "8px", display: "inline-flex", alignItems: "center" }}
            >
              <NavUnicornSVG />
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

          {/* Mobile: Join Waitlist + hamburger */}
          <div className="lg:hidden flex items-center gap-3 justify-self-end">
            <Link
              href="/waitlist"
              className="font-semibold text-white rounded-full"
              style={{
                letterSpacing: "0.3px",
                fontSize: "12px",
                padding: "7px 16px",
                background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              Join Waitlist
            </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2"
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
              { label: "Preview: Investor Dashboard", href: "/dashboard/investor" },
              { label: "Preview: Startup Dashboard", href: "/dashboard/founder" },
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

      {/* Navbar unicorn CSS */}
      <style>{`
        /* Entrance animation on home page: starts invisible, slides in from left */
        .nav-unicorn-entrance {
          opacity: 0;
          transform: translateX(-40px);
          animation: navUnicornSlideIn 1.5s ease-out 0.3s forwards;
        }
        @keyframes navUnicornSlideIn {
          0% { opacity: 0; transform: translateX(-40px); }
          30% { opacity: 1; }
          100% { opacity: 1; transform: translateX(0); }
        }

        /* Resting state on non-home pages: visible immediately, no entrance */
        .nav-unicorn-resting {
          opacity: 1;
          transform: translateX(0);
        }

        /* Idle mane sway (always active once visible) */
        .nav-unicorn-mane-idle {
          animation: navManeSway 3s ease-in-out infinite alternate;
        }
        @keyframes navManeSway {
          0% { transform: rotate(-2deg); }
          100% { transform: rotate(2deg); }
        }
      `}</style>
    </>
  );
}
