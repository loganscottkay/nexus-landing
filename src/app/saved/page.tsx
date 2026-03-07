"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

const ease = [0.25, 0.4, 0.25, 1] as const;

const savedStartups = [
  { id: 1, initials: "LA", color: "#4A6CF7", name: "Luminary AI", desc: "AI-powered contract analysis for legal teams", sector: "AI/ML", stage: "Seed" },
  { id: 2, initials: "SP", color: "#0d9488", name: "Stackpay", desc: "Embedded payroll infrastructure for platforms", sector: "Fintech", stage: "Seed" },
  { id: 3, initials: "NP", color: "#7C5CFC", name: "NeuralPath", desc: "Developer productivity tools powered by AI", sector: "Dev Tools", stage: "Pre-Seed" },
  { id: 4, initials: "GG", color: "#059669", name: "GreenGrid", desc: "Smart energy management for commercial buildings", sector: "Climate", stage: "Seed" },
  { id: 5, initials: "AR", color: "#e67e22", name: "Archetype", desc: "AI-driven customer persona generation", sector: "Enterprise", stage: "Pre-Seed" },
  { id: 6, initials: "TH", color: "#7C5CFC", name: "Terraform Health", desc: "Predictive diagnostics using wearable biosignals", sector: "Health Tech", stage: "Pre-Seed" },
  { id: 7, initials: "CA", color: "#059669", name: "Canopy Analytics", desc: "Real-time carbon tracking for supply chains", sector: "Climate Tech", stage: "Seed" },
];

export default function SavedPage() {
  return (
    <div className="min-h-screen flex bg-base text-text-primary relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 top-[5%] right-[15%]" />
        <div className="blob blob-lavender animate-blob-2 bottom-[20%] left-[8%]" />
        <div className="blob blob-peach animate-blob-3 top-[50%] right-[25%]" />
      </div>

      <Sidebar role="investor" activeLabel="Saved" />

      <div className="flex-1 md:ml-[240px] relative z-10 pb-20 md:pb-8">
        <div className="max-w-[780px] mx-auto px-4 md:px-8 pt-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease }}
            className="text-[24px] md:text-[28px] font-normal text-text-primary mb-8"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Saved Startups
          </motion.h1>

          <div className="space-y-3">
            {savedStartups.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
              >
                <Link
                  href={`/startup/${s.id}`}
                  className="glass flex items-center gap-4 p-5"
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] font-semibold text-text-primary">{s.name}</p>
                    <p className="text-[14px] text-text-muted truncate">{s.desc}</p>
                  </div>
                  <div className="hidden sm:flex gap-1.5 shrink-0">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-accent-blue/5 text-accent-blue border border-accent-blue/15">{s.sector}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/[0.03] text-text-muted border border-black/[0.06]">{s.stage}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
