"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.25, 0.4, 0.25, 1] as const;

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const icons = {
  home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  drops: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  saved: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  ),
  matches: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14h2" /><path d="m7 4 3.22 3.22" /><path d="M3 14h6c.6 0 1 .4 1 1v2c0 .6.4 1 1 1h4" />
    </svg>
  ),
  messages: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  interests: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  analytics: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  profile: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

const investorNav: NavItem[] = [
  { label: "Dashboard", icon: icons.dashboard, href: "/dashboard/investor" },
  { label: "Daily Drops", icon: icons.drops, href: "/drops" },
  { label: "Saved", icon: icons.saved, href: "/saved" },
  { label: "Matches", icon: icons.matches, href: "/matches" },
  { label: "Messages", icon: icons.messages, href: "/messages" },
  { label: "Settings", icon: icons.settings, href: "/settings" },
];

const founderNav: NavItem[] = [
  { label: "Dashboard", icon: icons.dashboard, href: "/dashboard/founder" },
  { label: "Interests", icon: icons.interests, href: "/interests" },
  { label: "Matches", icon: icons.matches, href: "/matches/founder" },
  { label: "Deck Analytics", icon: icons.analytics, href: "/deck-analytics" },
  { label: "Messages", icon: icons.messages, href: "/messages/founder" },
  { label: "Profile", icon: icons.profile, href: "/settings/founder" },
  { label: "Settings", icon: icons.settings, href: "/settings/founder" },
];

export default function Sidebar({
  role,
  activeLabel,
}: {
  role: "investor" | "founder";
  activeLabel: string;
}) {
  const navList = role === "investor" ? investorNav : founderNav;
  const isHomeActive = activeLabel === "Home";

  return (
    <>
      {/* Desktop */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease }}
        className="hidden md:flex flex-col w-[240px] shrink-0 h-screen fixed left-0 top-0 z-30"
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(24px) saturate(1.2)",
          WebkitBackdropFilter: "blur(24px) saturate(1.2)",
          borderRight: "1px solid rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="px-6 pt-7 pb-8">
          <Link href="/" className="text-[22px] font-normal text-text-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>UrgenC</Link>
        </div>
        <nav className="flex-1 px-3">
          {/* Home button */}
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-[15px] transition-all duration-200 relative ${
              isHomeActive
                ? "text-accent-blue font-medium"
                : "text-text-secondary hover:text-text-primary hover:bg-black/[0.03]"
            }`}
          >
            {isHomeActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent-blue rounded-full" />
            )}
            {icons.home}
            Home
          </Link>
          {/* Divider */}
          <div className="border-b border-black/[0.06] mx-2 mb-2 mt-1" />

          {navList.map((item) => {
            const isActive = item.label === activeLabel;
            const activeColor = role === "founder" ? "text-accent-violet" : "text-accent-blue";
            const barColor = role === "founder" ? "bg-accent-violet" : "bg-accent-blue";
            return (
              <Link key={item.label} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-[15px] transition-all duration-200 relative ${isActive ? `${activeColor} font-medium` : "text-text-secondary hover:text-text-primary hover:bg-black/[0.03]"}`}>
                {isActive && <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 ${barColor} rounded-full`} />}
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-6 py-5 border-t border-black/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center text-white text-sm font-semibold">
              {role === "investor" ? "JC" : "LA"}
            </div>
            <div>
              <p className="text-[14px] font-medium text-text-primary">
                {role === "investor" ? "Jordan Chen" : "Luminary AI"}
              </p>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${role === "investor" ? "bg-accent-blue/10 text-accent-blue" : "bg-accent-violet/10 text-accent-violet"}`}>
                {role === "investor" ? "Investor" : "Founder"}
              </span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile bottom tab */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 grid items-center"
        style={{
          gridTemplateColumns: "repeat(5, 1fr)",
          height: "calc(64px + env(safe-area-inset-bottom, 0px))",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          background: "#FFFFFF",
          borderTop: "1px solid rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Home tab on mobile */}
        <Link href="/" className={`flex flex-col items-center justify-center gap-1 py-1 min-h-[44px] ${isHomeActive ? "text-accent-blue" : "text-text-muted"}`}>
          <span className="w-6 h-6 flex items-center justify-center">{icons.home}</span>
          <span className="text-[12px] leading-none">Home</span>
        </Link>
        {navList.slice(0, 4).map((item) => {
          const isActive = item.label === activeLabel;
          const activeColor = role === "founder" ? "text-accent-violet" : "text-accent-blue";
          return (
            <Link key={item.label} href={item.href} className={`flex flex-col items-center justify-center gap-1 py-1 min-h-[44px] ${isActive ? activeColor : "text-text-muted"}`}>
              <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
              <span className="text-[12px] leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
