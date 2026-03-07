"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
            className="text-text-secondary hover:text-text-primary transition-colors text-[15px]"
          >
            How It Works
          </Link>
          <Link
            href="/#for-investors"
            onClick={(e) => scrollToSection(e, "for-investors")}
            className="text-text-secondary hover:text-text-primary transition-colors text-[15px]"
          >
            For Investors
          </Link>
          <Link
            href="/#for-investors"
            onClick={(e) => scrollToSection(e, "for-investors")}
            className="text-text-secondary hover:text-text-primary transition-colors text-[15px]"
          >
            For Startups
          </Link>
          <div className="flex items-center gap-3 ml-4" style={{ gap: "12px" }}>
            <Link
              href="/drops"
              className="text-text-secondary hover:text-text-primary transition-colors text-[15px] font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/apply/investor"
              className="btn-primary px-5 py-2.5 text-[14px] font-medium"
            >
              Apply Now
            </Link>
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
            href="/#for-investors"
            onClick={(e) => { scrollToSection(e, "for-investors"); setMenuOpen(false); }}
            className="text-text-secondary hover:text-text-primary transition-colors text-[15px]"
          >
            For Startups
          </Link>
          <div className="flex gap-3 pt-2">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-text-secondary hover:text-text-primary transition-colors text-[15px] font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/apply/investor"
              onClick={() => setMenuOpen(false)}
              className="btn-primary px-5 py-2.5 text-[14px] font-medium"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
