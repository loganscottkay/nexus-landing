"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const ease = [0.25, 0.4, 0.25, 1] as const;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="relative min-h-screen bg-base text-text-primary">
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 -top-[5%] right-[10%]" />
        <div className="blob blob-lavender animate-blob-2 top-[50%] -left-[5%]" />
        <div className="blob blob-peach animate-blob-3 bottom-[10%] right-[20%]" />
      </div>

      <Navbar />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="w-full max-w-[420px]"
        >
          {/* Card */}
          <div
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(20px) saturate(1.2)",
              WebkitBackdropFilter: "blur(20px) saturate(1.2)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            }}
          >
            <h1
              className="text-[28px] font-normal text-text-primary mb-2 text-center"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Sign In
            </h1>
            <p className="text-text-muted text-[15px] text-center mb-8">
              Access your Urgenc account
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-text-secondary mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full h-[48px] rounded-xl text-[15px] text-text-primary placeholder:text-text-muted outline-none px-4 transition-all duration-200 focus:ring-2 focus:ring-accent-blue/20"
                  style={{
                    background: "rgba(255, 255, 255, 0.3)",
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                  }}
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-text-secondary mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-[48px] rounded-xl text-[15px] text-text-primary placeholder:text-text-muted outline-none px-4 transition-all duration-200 focus:ring-2 focus:ring-accent-blue/20"
                  style={{
                    background: "rgba(255, 255, 255, 0.3)",
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                  }}
                />
              </div>

              <button
                type="button"
                className="w-full h-[48px] rounded-full text-[15px] font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                  boxShadow: "0 4px 15px rgba(74, 108, 247, 0.3)",
                }}
              >
                Sign In
              </button>
            </div>
          </div>

          <p className="text-text-muted text-[14px] text-center mt-6">
            Account access will be available once Urgenc launches.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
