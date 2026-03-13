"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

const ease = [0.25, 0.4, 0.25, 1] as const;

const steps = [
  { label: "Submitted", status: "complete" },
  { label: "Under Review", status: "active" },
  { label: "Decision", status: "upcoming" },
];

export default function StatusPage() {
  const [email, setEmail] = useState("");
  const [showStatus, setShowStatus] = useState(false);

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
        <AnimatePresence mode="wait">
          {!showStatus ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease }}
              className="w-full max-w-[500px]"
            >
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
                  Check Waitlist Status
                </h1>
                <p className="text-text-muted text-[15px] text-center mb-8">
                  Enter the email you used to join the waitlist.
                </p>

                <div className="space-y-4">
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
                  <button
                    type="button"
                    onClick={() => setShowStatus(true)}
                    className="w-full h-[48px] rounded-full text-[15px] font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                      boxShadow: "0 4px 15px rgba(74, 108, 247, 0.3)",
                    }}
                  >
                    Check Status
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="w-full max-w-[500px]"
            >
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
                <h2
                  className="text-[24px] font-normal text-text-primary mb-6 text-center"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Waitlist Status
                </h2>

                {/* Status pill */}
                <div className="flex justify-center mb-6">
                  <span
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[14px] font-medium"
                    style={{
                      background: "rgba(245, 158, 11, 0.1)",
                      border: "1px solid rgba(245, 158, 11, 0.25)",
                      color: "#92400E",
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: "#F59E0B" }}
                    />
                    Under Review
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] text-text-muted">Submitted</span>
                    <span className="text-[14px] text-text-primary font-medium">March 5, 2026</span>
                  </div>
                  <div
                    className="h-px"
                    style={{ background: "rgba(0, 0, 0, 0.06)" }}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] text-text-muted">Signup Type</span>
                    <span className="text-[14px] text-text-primary font-medium">Waitlist Signup</span>
                  </div>
                </div>

                {/* Progress tracker */}
                <div className="flex items-center justify-between mb-8 px-2">
                  {steps.map((step, i) => (
                    <div key={step.label} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        {step.status === "complete" ? (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)" }}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        ) : step.status === "active" ? (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              background: "rgba(74, 108, 247, 0.1)",
                              border: "2px solid #4A6CF7",
                            }}
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{
                                background: "#4A6CF7",
                                animation: "pulse-gentle 2s ease-in-out infinite",
                              }}
                            />
                          </div>
                        ) : (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              background: "rgba(0, 0, 0, 0.04)",
                              border: "1px solid rgba(0, 0, 0, 0.08)",
                            }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ background: "rgba(0, 0, 0, 0.15)" }}
                            />
                          </div>
                        )}
                        <span
                          className="text-[12px] mt-2 whitespace-nowrap"
                          style={{
                            color:
                              step.status === "upcoming"
                                ? "#94A3B8"
                                : step.status === "active"
                                ? "#4A6CF7"
                                : "#0F172A",
                            fontWeight: step.status === "active" ? 600 : 500,
                          }}
                        >
                          {step.label}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div
                          className="flex-1 h-[2px] mx-3 mt-[-20px]"
                          style={{
                            background:
                              step.status === "complete"
                                ? "linear-gradient(90deg, #22C55E, #4A6CF7)"
                                : "rgba(0, 0, 0, 0.08)",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-text-muted text-[14px] text-center leading-[1.6]">
                  We review all waitlist signups within 5 business days. You will receive an email when a decision is made.
                </p>
              </div>

              {/* Back button */}
              <button
                onClick={() => setShowStatus(false)}
                className="mt-6 text-[14px] text-text-muted hover:text-accent-blue transition-colors mx-auto block"
              >
                Check another email
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
