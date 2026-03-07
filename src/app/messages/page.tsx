"use client";

import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";

const ease = [0.25, 0.4, 0.25, 1] as const;

export default function MessagesPage() {
  return (
    <div className="min-h-screen flex bg-base text-text-primary relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 top-[5%] right-[15%]" />
        <div className="blob blob-lavender animate-blob-2 bottom-[20%] left-[8%]" />
        <div className="blob blob-peach animate-blob-3 top-[50%] right-[25%]" />
      </div>

      <Sidebar role="investor" activeLabel="Messages" />

      <div className="flex-1 md:ml-[240px] relative z-10 pb-20 md:pb-8 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="rounded-3xl p-10 md:p-14 text-center max-w-md mx-4"
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(20px) saturate(1.2)",
            WebkitBackdropFilter: "blur(20px) saturate(1.2)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-6"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <h1
            className="text-[28px] md:text-[32px] font-normal text-text-primary mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Messages coming soon
          </h1>
          <p className="text-text-muted text-[15px] leading-[1.7]">
            Direct messaging between matched investors and founders will be available in the next update.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
