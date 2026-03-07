"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300 ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="font-playfair text-lg md:text-xl font-bold tracking-[0.25em] text-foreground">
          NEXUS
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-silver hover:text-foreground transition-colors text-sm font-outfit">
            How It Works
          </a>
          <a href="#for-investors" className="text-silver hover:text-foreground transition-colors text-sm font-outfit">
            For Investors
          </a>
          <a href="#for-startups" className="text-silver hover:text-foreground transition-colors text-sm font-outfit">
            For Startups
          </a>
          <div className="flex items-center gap-3 ml-4">
            <a href="#" className="btn-ghost px-4 py-2 rounded-lg text-sm font-outfit font-medium">
              Sign In
            </a>
            <a href="#" className="btn-gold-outline px-4 py-2 rounded-lg text-sm font-outfit font-medium">
              Apply Now
            </a>
          </div>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden mobile-menu overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          <a
            href="#how-it-works"
            onClick={() => setMenuOpen(false)}
            className="text-silver hover:text-foreground transition-colors text-sm font-outfit"
          >
            How It Works
          </a>
          <a
            href="#for-investors"
            onClick={() => setMenuOpen(false)}
            className="text-silver hover:text-foreground transition-colors text-sm font-outfit"
          >
            For Investors
          </a>
          <a
            href="#for-startups"
            onClick={() => setMenuOpen(false)}
            className="text-silver hover:text-foreground transition-colors text-sm font-outfit"
          >
            For Startups
          </a>
          <div className="flex gap-3 pt-2">
            <a href="#" className="btn-ghost px-4 py-2 rounded-lg text-sm font-outfit font-medium">
              Sign In
            </a>
            <a href="#" className="btn-gold-outline px-4 py-2 rounded-lg text-sm font-outfit font-medium">
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
