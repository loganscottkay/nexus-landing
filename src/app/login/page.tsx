"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const ease = [0.25, 0.4, 0.25, 1] as const;

export default function LoginPage() {
  return (
    <main className="relative min-h-screen bg-base text-text-primary">
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 -top-[5%] right-[10%]" />
        <div className="blob blob-lavender animate-blob-2 top-[50%] -left-[5%]" />
      </div>

      <Navbar />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="w-full max-w-[420px] rounded-3xl p-8 md:p-10"
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(20px) saturate(1.2)",
            WebkitBackdropFilter: "blur(20px) saturate(1.2)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
          }}
        >
          <h1
            className="text-[28px] md:text-[32px] font-normal text-text-primary text-center mb-2"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Welcome Back
          </h1>
          <p className="text-text-muted text-[15px] text-center mb-8">
            Sign in to your Nexus account
          </p>

          <div className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-[52px] rounded-xl text-[16px] text-text-primary placeholder:text-text-muted outline-none px-4"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-[52px] rounded-xl text-[16px] text-text-primary placeholder:text-text-muted outline-none px-4"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
              }}
            />
          </div>

          <Link
            href="/drops"
            className="w-full h-[52px] rounded-full text-white text-[16px] font-semibold transition-all duration-300 hover:-translate-y-0.5 mb-4 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
              boxShadow: "0 4px 15px rgba(74, 108, 247, 0.3)",
            }}
          >
            Sign In
          </Link>

          <p className="text-text-muted text-[14px] text-center">
            Don&apos;t have an account?{" "}
            <Link href="/apply/investor" className="text-accent-blue hover:underline font-medium">
              Apply Now
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
