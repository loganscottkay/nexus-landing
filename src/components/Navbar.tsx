"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const applyRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
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
      className={`fixed top-0 left-0 right-0 z-50 glass-nav ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="text-lg md:text-xl font-bold tracking-[0.3em] text-text-primary"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          NEXUS
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#how-it-works"
            onClick={(e) => scrollToSection(e, "how-it-works")}
            className="nav-link text-text-secondary text-[15px] font-medium"
            style={{ letterSpacing: "0.3px" }}
          >
            How It Works
          </Link>
          <Link
            href="/#for-investors"
            onClick={(e) => scrollToSection(e, "for-investors")}
            className="nav-link text-text-secondary text-[15px] font-medium"
            style={{ letterSpacing: "0.3px" }}
          >
            For Investors
          </Link>
          <Link
            href="/#for-startups"
            onClick={(e) => scrollToSection(e, "for-startups")}
            className="nav-link text-text-secondary text-[15px] font-medium"
            style={{ letterSpacing: "0.3px" }}
          >
            For Startups
          </Link>
          <div className="flex items-center ml-4" style={{ gap: "24px" }}>
            <Link
              href="/login"
              className="nav-signin text-text-secondary text-[15px] font-medium"
              style={{ letterSpacing: "0.3px" }}
            >
              Sign In
            </Link>
            <div className="relative" ref={applyRef}>
              <button
                onClick={() => setApplyOpen(!applyOpen)}
                className="btn-primary btn-shimmer px-5 py-2.5 text-[15px] font-medium flex items-center gap-1.5"
                style={{ letterSpacing: "0.3px" }}
              >
                Apply Now
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${applyOpen ? "rotate-180" : ""}`}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div
                className="absolute right-0 top-full mt-2 w-[220px] rounded-2xl p-2 transition-all duration-200"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                  opacity: applyOpen ? 1 : 0,
                  transform: applyOpen ? "translateY(0)" : "translateY(-8px)",
                  pointerEvents: applyOpen ? "auto" : "none",
                }}
              >
                <Link
                  href="/apply/investor"
                  onClick={() => setApplyOpen(false)}
                  className="block px-5 py-3 rounded-xl text-[15px] text-text-primary font-medium transition-colors duration-150 hover:bg-[rgba(74,108,247,0.05)] hover:text-[#4A6CF7]"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  Apply as Investor
                </Link>
                <Link
                  href="/apply/startup"
                  onClick={() => setApplyOpen(false)}
                  className="block px-5 py-3 rounded-xl text-[15px] text-text-primary font-medium transition-colors duration-150 hover:bg-[rgba(74,108,247,0.05)] hover:text-[#4A6CF7]"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  Apply as Startup
                </Link>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
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

      <div
        className={`md:hidden mobile-menu overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          <Link
            href="/#how-it-works"
            onClick={(e) => { scrollToSection(e, "how-it-works"); setMenuOpen(false); }}
            className="text-text-secondary hover:text-text-primary transition-colors text-[15px]"
          >
            How It Works
          </Link>
          <Link
            href="/#for-investors"
            onClick={(e) => { scrollToSection(e, "for-investors"); setMenuOpen(false); }}
            className="text-text-secondary hover:text-text-primary transition-colors text-[15px]"
          >
            For Investors
          </Link>
          <Link
            href="/#for-startups"
            onClick={(e) => { scrollToSection(e, "for-startups"); setMenuOpen(false); }}
            className="text-text-secondary hover:text-text-primary transition-colors text-[15px]"
          >
            For Startups
          </Link>
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
              className="btn-primary px-5 py-2.5 text-[14px] font-medium"
            >
              Apply as Investor
            </Link>
            <Link
              href="/apply/startup"
              onClick={() => setMenuOpen(false)}
              className="btn-primary px-5 py-2.5 text-[14px] font-medium"
            >
              Apply as Startup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
