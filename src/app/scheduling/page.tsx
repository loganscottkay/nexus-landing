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

const proposedTimes = [
  "Wed Mar 15, 2:00 PM",
  "Thu Mar 16, 10:00 AM",
  "Fri Mar 17, 3:30 PM",
];

const counterTimes = [
  "Mon Mar 18, 11:00 AM",
  "Tue Mar 19, 2:30 PM",
  "Wed Mar 20, 4:00 PM",
];

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

export default function SchedulingPage() {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
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

      <Sidebar role="investor" activeLabel="Scheduling" />

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
              Manage your meeting proposals and upcoming calls.
            </p>
          </motion.div>

          {/* Card 1 - Times proposed, waiting for response */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-5 mb-4"
            style={glassCard}
          >
            <div className="flex items-start gap-3 mb-4">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full text-white font-semibold"
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#4A6CF7",
                  fontSize: "14px",
                }}
              >
                LA
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p
                      className="text-text-primary font-semibold"
                      style={{ fontSize: "16px" }}
                    >
                      Luminary AI
                    </p>
                    <p
                      className="text-text-muted"
                      style={{ fontSize: "13px" }}
                    >
                      Seed Stage &middot; AI/ML
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
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
                      Times proposed
                    </span>
                  </div>
                </div>
                <p
                  className="mt-2 font-medium"
                  style={{ fontSize: "15px", color: "#4A6CF7" }}
                >
                  47h left to schedule
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {proposedTimes.map((time) => (
                <span
                  key={time}
                  className="rounded-xl px-3 py-2"
                  style={{
                    fontSize: "13px",
                    background: "rgba(255,255,255,0.3)",
                    border: "1px solid rgba(255,255,255,0.5)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {time}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 2 - Counter-proposal received */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-5 mb-4"
            style={glassCard}
          >
            <div className="flex items-start gap-3 mb-4">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full text-white font-semibold"
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#7C5CFC",
                  fontSize: "14px",
                }}
              >
                TH
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p
                      className="text-text-primary font-semibold"
                      style={{ fontSize: "16px" }}
                    >
                      Terraform Health
                    </p>
                    <p
                      className="text-text-muted"
                      style={{ fontSize: "13px" }}
                    >
                      Pre-Seed &middot; Health Tech
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                      style={{
                        fontSize: "12px",
                        backgroundColor: "rgba(217,119,6,0.1)",
                        color: "#D97706",
                        fontWeight: 500,
                      }}
                    >
                      <span
                        className="inline-flex rounded-full h-2 w-2"
                        style={{ backgroundColor: "#D97706" }}
                      />
                      Counter-proposal received
                    </span>
                  </div>
                </div>
                <p
                  className="mt-2 font-medium"
                  style={{ fontSize: "15px", color: "#D97706" }}
                >
                  24h left
                </p>
              </div>
            </div>

            {/* Selectable counter-proposed times */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-4">
              {counterTimes.map((time, idx) => {
                const isSelected = selectedTime === idx;
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(idx)}
                    className="rounded-xl px-3 py-2 text-left transition-all duration-200 w-full sm:w-auto"
                    style={{
                      fontSize: "13px",
                      height: "56px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: isSelected
                        ? "rgba(74,108,247,0.1)"
                        : "rgba(255,255,255,0.3)",
                      border: isSelected
                        ? "1px solid rgba(74,108,247,0.3)"
                        : "1px solid rgba(255,255,255,0.5)",
                      color: isSelected ? "#4A6CF7" : "var(--text-secondary)",
                      fontWeight: isSelected ? 600 : 400,
                      cursor: "pointer",
                    }}
                  >
                    {isSelected && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3 4.3L6 11.6L2.7 8.3"
                          stroke="#4A6CF7"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {time}
                  </button>
                );
              })}
            </div>

            <button
              className="w-full rounded-full py-2.5 text-white font-medium transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                fontSize: "14px",
              }}
            >
              Confirm Selected Time
            </button>
            <div className="text-center mt-2">
              <button
                onClick={() => setShowModal(true)}
                className="hover:underline"
                style={{ fontSize: "13px", color: "#0891B2" }}
              >
                Suggest Different Times
              </button>
            </div>
          </motion.div>

          {/* Card 3 - Call confirmed */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl p-5 mb-6"
            style={glassCard}
          >
            <div className="flex items-start gap-3 mb-4">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full text-white font-semibold"
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#059669",
                  fontSize: "14px",
                }}
              >
                CA
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p
                      className="text-text-primary font-semibold"
                      style={{ fontSize: "16px" }}
                    >
                      Canopy Analytics
                    </p>
                    <p
                      className="text-text-muted"
                      style={{ fontSize: "13px" }}
                    >
                      Seed Stage &middot; Climate Tech
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                    style={{
                      fontSize: "12px",
                      backgroundColor: "rgba(5,150,105,0.1)",
                      color: "#059669",
                      fontWeight: 500,
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5 3.5L5.5 9.5L2.5 6.5"
                        stroke="#059669"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Call confirmed
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0"
                  >
                    <rect
                      x="2"
                      y="3"
                      width="14"
                      height="13"
                      rx="2"
                      stroke="#059669"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2 7H16"
                      stroke="#059669"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 2V4"
                      stroke="#059669"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 2V4"
                      stroke="#059669"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p
                    className="text-text-primary font-semibold"
                    style={{ fontSize: "16px" }}
                  >
                    Wed Mar 15, 2:00 PM
                  </p>
                </div>

                <button
                  className="mt-2 hover:underline font-medium"
                  style={{ fontSize: "13px", color: "#0891B2" }}
                >
                  Add to Calendar
                </button>
              </div>
            </div>
          </motion.div>

          {/* 72-Hour Enforcement Display */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
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

      {/* Suggest Different Times Modal */}
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
                    Suggest Different Times
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
                    background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                    fontSize: "14px",
                  }}
                >
                  Send Counter-Proposal
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
