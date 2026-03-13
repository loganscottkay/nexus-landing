"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

const glassCard = {
  background: "rgba(255,255,255,0.45)",
  backdropFilter: "blur(20px) saturate(1.2)",
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
};

const timeSlots: string[] = [];
for (let h = 9; h <= 20; h++) {
  for (let m = 0; m < 60; m += 30) {
    if (h === 20 && m > 0) break;
    const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const ampm = h >= 12 ? "PM" : "AM";
    const mins = m === 0 ? "00" : "30";
    timeSlots.push(`${hour12}:${mins} ${ampm}`);
  }
}

const investorQueue = [
  {
    id: 1,
    initials: "SC",
    color: "#4A6CF7",
    name: "Sarah Chen",
    firm: "Gradient Ventures",
    checkSize: "$250K-$1M",
    status: "active" as const,
    timerHours: 47,
    matchScore: 92,
  },
  {
    id: 2,
    initials: "MW",
    color: "#7C5CFC",
    name: "Marcus Webb",
    firm: "Founder Collective",
    checkSize: "$100K-$500K",
    status: "queued" as const,
    timerHours: null,
    matchScore: 87,
  },
  {
    id: 3,
    initials: "ER",
    color: "#D97706",
    name: "Elena Rodriguez",
    firm: "Precursor Ventures",
    checkSize: "$100K-$250K",
    status: "queued" as const,
    timerHours: null,
    matchScore: 84,
  },
  {
    id: 4,
    initials: "JP",
    color: "#0d9488",
    name: "James Park",
    firm: "Lux Capital",
    checkSize: "$500K-$2M",
    status: "queued" as const,
    timerHours: null,
    matchScore: 79,
  },
];

export default function FounderSchedulingPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalDates, setModalDates] = useState(["", "", ""]);
  const [modalTimes, setModalTimes] = useState(["9:00 AM", "9:00 AM", "9:00 AM"]);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      {/* Background blobs */}
      <div className="noise-overlay" />
      <div className="blob blob-blue animate-blob-1" />
      <div className="blob blob-purple animate-blob-2" />
      <div className="blob blob-teal animate-blob-3" />

      <Sidebar role="founder" activeLabel="Scheduling" />

      <main className="flex-1 md:ml-[240px] relative z-10 pb-[80px] md:pb-8">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 pt-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "28px",
              }}
              className="text-text-primary font-normal"
            >
              Scheduling
            </h1>
            <p
              className="text-text-muted mt-1"
              style={{ fontSize: "14px" }}
            >
              Manage your investor queue and schedule meetings.
            </p>
          </motion.div>

          {/* Investor Queue */}
          {investorQueue.map((investor, idx) => (
            <motion.div
              key={investor.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
              className="rounded-2xl p-5 mb-4"
              style={glassCard}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full text-white font-semibold"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: investor.color,
                    fontSize: "14px",
                  }}
                >
                  {investor.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p
                          className="text-text-primary font-semibold"
                          style={{ fontSize: "16px" }}
                        >
                          {investor.name}
                        </p>
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5"
                          style={{
                            fontSize: "11px",
                            backgroundColor: "rgba(124,92,252,0.1)",
                            color: "#7C5CFC",
                            fontWeight: 600,
                          }}
                        >
                          #{idx + 1}
                        </span>
                      </div>
                      <p
                        className="text-text-muted"
                        style={{ fontSize: "13px" }}
                      >
                        {investor.firm} &middot; {investor.checkSize}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {investor.status === "active" ? (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                          style={{
                            fontSize: "12px",
                            backgroundColor: "rgba(74,108,247,0.1)",
                            color: "#4A6CF7",
                            fontWeight: 500,
                          }}
                        >
                          <span className="relative flex h-2 w-2">
                            <span
                              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                              style={{ backgroundColor: "#4A6CF7" }}
                            />
                            <span
                              className="relative inline-flex rounded-full h-2 w-2"
                              style={{ backgroundColor: "#4A6CF7" }}
                            />
                          </span>
                          Active
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                          style={{
                            fontSize: "12px",
                            backgroundColor: "rgba(156,163,175,0.1)",
                            color: "#9CA3AF",
                            fontWeight: 500,
                          }}
                        >
                          <span
                            className="inline-flex rounded-full h-2 w-2"
                            style={{ backgroundColor: "#9CA3AF" }}
                          />
                          Queued
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Match score */}
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="text-text-muted"
                      style={{ fontSize: "13px" }}
                    >
                      Match score:
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#7C5CFC",
                        fontWeight: 600,
                      }}
                    >
                      {investor.matchScore}%
                    </span>
                  </div>

                  {/* Timer for active investor */}
                  {investor.status === "active" && investor.timerHours && (
                    <p
                      className="mt-2 font-medium"
                      style={{ fontSize: "15px", color: "#4A6CF7" }}
                    >
                      {investor.timerHours}h left to schedule
                    </p>
                  )}

                  {/* Schedule Meeting button for active investor */}
                  {investor.status === "active" && (
                    <button
                      onClick={() => setShowModal(true)}
                      className="mt-3 w-full rounded-full py-2.5 text-white font-medium transition-opacity hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg, #7C5CFC, #4A6CF7)",
                        fontSize: "14px",
                      }}
                    >
                      Schedule Meeting
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* 72-Hour Enforcement Display */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-2xl p-5"
            style={glassCard}
          >
            <p
              className="text-text-primary font-semibold mb-4"
              style={{ fontSize: "15px" }}
            >
              Scheduling Countdown Rules
            </p>

            <div className="space-y-3">
              {/* Normal */}
              <div className="flex items-center gap-3">
                <div
                  className="flex-shrink-0 rounded-full"
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#4A6CF7",
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-text-secondary"
                      style={{ fontSize: "13px" }}
                    >
                      Normal (&gt;24h remaining)
                    </span>
                    <span
                      style={{ fontSize: "13px", color: "#4A6CF7", fontWeight: 500 }}
                    >
                      48h left
                    </span>
                  </div>
                  <div
                    className="mt-1 rounded-full overflow-hidden"
                    style={{
                      height: 4,
                      backgroundColor: "rgba(74,108,247,0.15)",
                    }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "66%",
                        backgroundColor: "#4A6CF7",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-center gap-3">
                <div
                  className="flex-shrink-0 rounded-full"
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#D97706",
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-text-secondary"
                      style={{ fontSize: "13px" }}
                    >
                      Warning (24h remaining)
                    </span>
                    <span
                      style={{ fontSize: "13px", color: "#D97706", fontWeight: 500 }}
                    >
                      24h left
                    </span>
                  </div>
                  <div
                    className="mt-1 rounded-full overflow-hidden"
                    style={{
                      height: 4,
                      backgroundColor: "rgba(217,119,6,0.15)",
                    }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "33%",
                        backgroundColor: "#D97706",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Critical */}
              <div className="flex items-center gap-3">
                <div
                  className="flex-shrink-0 rounded-full"
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#DC2626",
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-text-secondary"
                      style={{ fontSize: "13px" }}
                    >
                      Critical (12h remaining)
                    </span>
                    <span
                      style={{ fontSize: "13px", color: "#DC2626", fontWeight: 500 }}
                    >
                      12h left
                    </span>
                  </div>
                  <div
                    className="mt-1 rounded-full overflow-hidden"
                    style={{
                      height: 4,
                      backgroundColor: "rgba(220,38,38,0.15)",
                    }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "16%",
                        backgroundColor: "#DC2626",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Expired */}
              <div className="flex items-center gap-3">
                <div
                  className="flex-shrink-0 rounded-full"
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#9CA3AF",
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-text-secondary"
                      style={{ fontSize: "13px" }}
                    >
                      Expired (0h)
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#9CA3AF",
                        fontWeight: 500,
                      }}
                    >
                      Window expired
                    </span>
                  </div>
                  <div
                    className="mt-1 rounded-full overflow-hidden"
                    style={{
                      height: 4,
                      backgroundColor: "rgba(156,163,175,0.15)",
                    }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "0%",
                        backgroundColor: "#9CA3AF",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Schedule Meeting Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
              onClick={() => setShowModal(false)}
            />

            {/* Desktop modal / Mobile bottom sheet */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed z-50
                bottom-0 left-0 right-0 rounded-t-3xl
                md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:max-w-[500px] md:w-full"
              style={{
                ...glassCard,
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(30px) saturate(1.4)",
              }}
            >
              {/* Drag handle for mobile */}
              <div className="flex justify-center pt-3 md:hidden">
                <div
                  className="rounded-full"
                  style={{
                    width: 36,
                    height: 4,
                    backgroundColor: "rgba(0,0,0,0.15)",
                  }}
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-text-primary font-semibold"
                    style={{
                      fontSize: "20px",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    Propose Meeting Times
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-text-muted hover:text-text-primary transition-colors"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 5L5 15M5 5L15 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <p
                  className="text-text-muted mb-4"
                  style={{ fontSize: "13px" }}
                >
                  Propose 3 time options for Sarah Chen to choose from.
                </p>

                <div className="space-y-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i}>
                      <label
                        className="text-text-secondary block mb-1.5"
                        style={{ fontSize: "13px", fontWeight: 500 }}
                      >
                        Option {i + 1}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="date"
                          value={modalDates[i]}
                          onChange={(e) => {
                            const next = [...modalDates];
                            next[i] = e.target.value;
                            setModalDates(next);
                          }}
                          className="flex-1 rounded-xl px-3 py-2.5 text-text-primary outline-none"
                          style={{
                            fontSize: "14px",
                            background: "rgba(255,255,255,0.5)",
                            border: "1px solid rgba(255,255,255,0.6)",
                          }}
                        />
                        <select
                          value={modalTimes[i]}
                          onChange={(e) => {
                            const next = [...modalTimes];
                            next[i] = e.target.value;
                            setModalTimes(next);
                          }}
                          className="flex-1 rounded-xl px-3 py-2.5 text-text-primary outline-none appearance-none"
                          style={{
                            fontSize: "14px",
                            background: "rgba(255,255,255,0.5)",
                            border: "1px solid rgba(255,255,255,0.6)",
                          }}
                        >
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-full rounded-full py-2.5 text-white font-medium mt-6 transition-opacity hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #7C5CFC, #4A6CF7)",
                    fontSize: "14px",
                  }}
                >
                  Send Time Proposal
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
