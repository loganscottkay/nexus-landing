"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

const ease = [0.25, 0.4, 0.25, 1] as const;

/* ─── Types ─── */
interface Investor {
  id: number;
  initials: string;
  color: string;
  name: string;
  firm: string;
  title: string;
  checkSize: string;
  stageFocus: string;
  sectors: string[];
  thesis: string;
  note?: string;
  timerMinutes: number;
  status: "pending" | "accepted" | "declined";
  scheduledCall?: string;
}

/* ─── Fake Data ─── */
const initialInvestors: Investor[] = [
  {
    id: 1,
    initials: "SC",
    color: "#4A6CF7",
    name: "Sarah Chen",
    firm: "Gradient Ventures",
    title: "Partner",
    checkSize: "$250K - $1M",
    stageFocus: "Seed",
    sectors: ["AI", "Enterprise SaaS"],
    thesis:
      "We back technical founders building AI-native products that replace entire workflows, not just augment them. Looking for pre-seed to seed companies with strong technical moats and early enterprise traction.",
    note: "Your contract analysis approach is exactly what our portfolio company was trying to build internally. Would love to chat about your NLP pipeline.",
    timerMinutes: 47 * 60 + 23,
    status: "pending",
  },
  {
    id: 2,
    initials: "MW",
    color: "#7C5CFC",
    name: "Marcus Webb",
    firm: "Founder Collective",
    title: "Principal",
    checkSize: "$100K - $500K",
    stageFocus: "Seed",
    sectors: ["SaaS", "Developer Tools"],
    thesis:
      "We invest exclusively at pre-seed and seed. We look for founders who have been the customer for the problem they are solving.",
    timerMinutes: 31 * 60 + 8,
    status: "pending",
  },
  {
    id: 3,
    initials: "ER",
    color: "#D97706",
    name: "Elena Rodriguez",
    firm: "Precursor Ventures",
    title: "General Partner",
    checkSize: "$100K - $250K",
    stageFocus: "Pre-Seed",
    sectors: ["AI", "Fintech", "Climate"],
    thesis:
      "Earliest check in the first round. We care about the clarity of the founder vision and the size of the market more than current traction.",
    note: "Saw your demo video and the UX is incredibly clean for this stage. Would love to discuss your go-to-market.",
    timerMinutes: 8 * 60 + 45,
    status: "pending",
  },
  {
    id: 4,
    initials: "JP",
    color: "#0d9488",
    name: "James Park",
    firm: "Lux Capital",
    title: "Associate",
    checkSize: "$500K - $2M",
    stageFocus: "Seed / Series A",
    sectors: ["Deep Tech", "AI", "Healthcare"],
    thesis:
      "We back scientists and engineers solving hard problems that others overlook. Long time horizons. We are patient capital.",
    timerMinutes: 62 * 60 + 11,
    status: "pending",
  },
  {
    id: 5,
    initials: "PS",
    color: "#059669",
    name: "Priya Sharma",
    firm: "Lightspeed Venture Partners",
    title: "Principal",
    checkSize: "$250K - $1M",
    stageFocus: "Seed",
    sectors: ["AI", "SaaS"],
    thesis:
      "We look for category-defining companies at the earliest stages. Speed to conviction is our edge.",
    timerMinutes: 0,
    status: "accepted",
    scheduledCall: "Mar 12 at 2:00 PM",
  },
];


/* ─── Timer formatter ─── */
function formatTimer(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

function formatTimerSeconds(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

function getTimerStyle(minutes: number): {
  textColor: string;
  borderColor: string;
  pulse: boolean;
} {
  if (minutes < 12 * 60) {
    return {
      textColor: "#EF4444",
      borderColor: "rgba(239, 68, 68, 0.2)",
      pulse: true,
    };
  }
  if (minutes < 24 * 60) {
    return {
      textColor: "#D97706",
      borderColor: "rgba(217, 119, 6, 0.2)",
      pulse: false,
    };
  }
  return {
    textColor: "#64748B",
    borderColor: "rgba(255, 255, 255, 0.5)",
    pulse: false,
  };
}

/* ─── Timer Component ─── */
function CountdownTimer({ initialMinutes }: { initialMinutes: number }) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);

  useEffect(() => {
    if (seconds <= 0) return;
    const underOneHour = seconds < 3600;
    const interval = setInterval(
      () => setSeconds((s) => Math.max(0, s - 1)),
      underOneHour ? 1000 : 60000
    );
    return () => clearInterval(interval);
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const style = getTimerStyle(minutes);
  const display = seconds < 3600 ? formatTimerSeconds(seconds) : formatTimer(minutes);

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium shrink-0 ${
        style.pulse ? "animate-pulse-gentle" : ""
      }`}
      style={{
        background: "rgba(255, 255, 255, 0.35)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: `1px solid ${style.borderColor}`,
        color: style.textColor,
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      {display} left
    </div>
  );
}

/* ─── Decline Modal ─── */
function DeclineModal({
  investorName,
  onConfirm,
  onCancel,
}: {
  investorName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      style={{ background: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(4px)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease }}
        className="w-full max-w-md rounded-3xl p-8"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(24px) saturate(1.3)",
          WebkitBackdropFilter: "blur(24px) saturate(1.3)",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h3
          className="text-[22px] font-normal text-text-primary mb-2"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Decline Interest from {investorName}?
        </h3>
        <p className="text-text-secondary text-[15px] mb-8 leading-[1.6]">
          They will be notified with a generic message. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-12 rounded-full text-[15px] font-medium text-text-secondary transition-all duration-250 hover:bg-black/[0.03]"
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-12 rounded-full text-[15px] font-medium text-white transition-all duration-250 hover:opacity-90"
            style={{
              background: "rgba(239, 68, 68, 0.8)",
            }}
          >
            Confirm Decline
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Investor Card ─── */
function InvestorCard({
  investor,
  onAccept,
  onDecline,
}: {
  investor: Investor;
  onAccept: (id: number) => void;
  onDecline: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isAccepted = investor.status === "accepted";
  const thesisPreview =
    investor.thesis.length > 140
      ? investor.thesis.slice(0, 140) + "..."
      : investor.thesis;

  return (
    <div
      className="rounded-3xl overflow-hidden transition-all duration-300"
      style={{
        background: "rgba(255, 255, 255, 0.45)",
        backdropFilter: "blur(20px) saturate(1.2)",
        WebkitBackdropFilter: "blur(20px) saturate(1.2)",
        border: `1px solid ${
          isAccepted
            ? "rgba(74, 108, 247, 0.3)"
            : "rgba(255, 255, 255, 0.6)"
        }`,
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
      }}
    >
      <div className="p-7 md:p-9 relative">
        {/* Accepted badge */}
        {isAccepted && (
          <div
            className="absolute top-6 right-6 px-3 py-1 rounded-full text-[12px] font-semibold"
            style={{
              background: "rgba(5, 150, 105, 0.1)",
              color: "#059669",
              border: "1px solid rgba(5, 150, 105, 0.2)",
            }}
          >
            Accepted
          </div>
        )}

        {/* Header row */}
        <div className="flex items-start gap-4 mb-0">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ backgroundColor: investor.color }}
            >
              {investor.initials}
            </div>
            <div className="min-w-0">
              <h3 className="text-[18px] md:text-[20px] font-semibold text-text-primary">
                {investor.name}
              </h3>
              <p className="text-text-secondary text-[15px]">{investor.firm}</p>
              <p className="text-text-muted text-[14px]">{investor.title}</p>
            </div>
          </div>
          {!isAccepted && (
            <CountdownTimer initialMinutes={investor.timerMinutes} />
          )}
        </div>

        {/* Divider */}
        <div className="my-5 h-px" style={{ background: "rgba(0, 0, 0, 0.05)" }} />

        {/* Investment details */}
        <div className="flex flex-wrap gap-6 md:gap-10 mb-5">
          <div>
            <p className="text-text-muted text-[11px] tracking-[2px] uppercase mb-1">
              Check Size
            </p>
            <p className="text-text-primary text-[16px] font-semibold">
              {investor.checkSize}
            </p>
          </div>
          <div>
            <p className="text-text-muted text-[11px] tracking-[2px] uppercase mb-1">
              Stage Focus
            </p>
            <p className="text-text-primary text-[16px] font-semibold">
              {investor.stageFocus}
            </p>
          </div>
          <div>
            <p className="text-text-muted text-[11px] tracking-[2px] uppercase mb-1">
              Sectors
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {investor.sectors.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-full text-[12px] text-accent-blue bg-accent-blue/5 border border-accent-blue/15"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Thesis */}
        <div className="mb-5">
          <p className="text-text-muted text-[11px] tracking-[2px] uppercase mb-2">
            Investment Thesis
          </p>
          <AnimatePresence mode="wait">
            {expanded ? (
              <motion.p
                key="full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="text-text-secondary text-[15px] leading-[1.7]"
              >
                {investor.thesis}
              </motion.p>
            ) : (
              <p className="text-text-secondary text-[15px] leading-[1.7]">
                {thesisPreview}
                {investor.thesis.length > 140 && (
                  <button
                    onClick={() => setExpanded(true)}
                    className="text-accent-blue ml-1 hover:underline"
                  >
                    Read more
                  </button>
                )}
              </p>
            )}
          </AnimatePresence>
          {expanded && investor.thesis.length > 140 && (
            <button
              onClick={() => setExpanded(false)}
              className="text-accent-blue text-[14px] mt-1 hover:underline"
            >
              Show less
            </button>
          )}
        </div>

        {/* Personal note */}
        {investor.note && (
          <div
            className="rounded-xl p-4 mb-6"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div className="flex items-start gap-2.5">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-text-muted shrink-0 mt-0.5"
              >
                <path
                  d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"
                  fill="currentColor"
                  opacity="0.3"
                />
                <path
                  d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 .997 0 1.031 1 1.031z"
                  fill="currentColor"
                  opacity="0.3"
                />
              </svg>
              <div>
                <p className="text-text-muted text-[13px] mb-1.5">
                  Personal note from {investor.name.split(" ")[0]}:
                </p>
                <p className="text-text-secondary text-[15px] leading-[1.6] italic">
                  {investor.note}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions / Status */}
        {isAccepted ? (
          <div className="flex items-center gap-2 text-[15px] text-text-secondary">
            {investor.scheduledCall ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>
                  Call scheduled for{" "}
                  <span className="font-medium text-text-primary">
                    {investor.scheduledCall}
                  </span>
                </span>
              </>
            ) : (
              <>
                <div className="w-4 h-4 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
                <span>Scheduling call...</span>
              </>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => onAccept(investor.id)}
              className="flex-1 h-12 rounded-full text-[15px] font-semibold text-white transition-all duration-250 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                boxShadow: "0 4px 15px rgba(74, 108, 247, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(74, 108, 247, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(74, 108, 247, 0.3)";
              }}
            >
              Accept
            </button>
            <button
              onClick={() => onDecline(investor.id)}
              className="flex-1 h-12 rounded-full text-[15px] font-medium text-text-secondary transition-all duration-250 hover:bg-black/[0.03]"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
              }}
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Empty State ─── */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="flex flex-col items-center text-center px-6 py-20"
    >
      <h2
        className="text-[28px] md:text-[32px] font-normal text-text-primary mb-4"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        No Pending Interest
      </h2>
      <p className="text-text-secondary text-[16px] max-w-md leading-[1.7] mb-8">
        When investors express interest in your startup, they will appear here.
        Make sure your profile and deck are up to date to maximize visibility.
      </p>
      <Link
        href="/settings/founder"
        className="px-6 py-3 rounded-full text-[15px] font-medium text-text-secondary transition-all duration-250 hover:bg-black/[0.03]"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        Update Your Profile
      </Link>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function InterestsPage() {
  const [investors, setInvestors] = useState<Investor[]>(initialInvestors);
  const [decliningId, setDecliningId] = useState<number | null>(null);

  const decliningInvestor = investors.find((i) => i.id === decliningId);

  const activeCount = investors.filter(
    (i) => i.status === "pending"
  ).length;

  const handleAccept = useCallback((id: number) => {
    setInvestors((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "accepted" as const } : i
      )
    );
  }, []);

  const handleDeclineConfirm = useCallback(() => {
    if (decliningId === null) return;
    setInvestors((prev) => prev.filter((i) => i.id !== decliningId));
    setDecliningId(null);
  }, [decliningId]);

  return (
    <div className="h-screen flex bg-base text-text-primary overflow-hidden relative">
      {/* Noise */}
      <div className="noise-overlay" />

      {/* Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 top-[5%] right-[20%]" />
        <div className="blob blob-lavender animate-blob-2 bottom-[15%] left-[5%]" />
        <div className="blob blob-peach animate-blob-3 top-[60%] right-[10%]" />
      </div>

      <Sidebar role="founder" activeLabel="Interests" />

      {/* ─── Main Content ─── */}
      <div className="flex-1 md:ml-[240px] flex flex-col h-screen relative z-10 overflow-y-auto pb-20 md:pb-0">
        {/* Top bar */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease }}
          className="px-6 md:px-10 pt-6 pb-4 flex items-center justify-between shrink-0 sticky top-0 z-20"
          style={{
            background: "rgba(250, 250, 249, 0.8)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div>
            <h1
              className="text-[24px] md:text-[28px] font-normal text-text-primary"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Incoming Interest
            </h1>
          </div>

          <div
            className="px-4 py-2 rounded-full text-[14px] font-medium"
            style={{
              background: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
              animation: activeCount > 0 ? "pulse-gentle 2s ease-in-out infinite" : "none",
            }}
          >
            <span className="text-text-primary">{activeCount} Active</span>
          </div>
        </motion.header>

        {/* Feed */}
        <div className="flex-1 px-4 md:px-10">
          <div className="max-w-[680px] mx-auto">
            {investors.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="flex flex-col gap-4 pb-8">
                <AnimatePresence>
                  {investors.map((investor, index) => (
                    <motion.div
                      key={investor.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        marginBottom: 0,
                        overflow: "hidden",
                        transition: { duration: 0.4, ease },
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                        ease,
                      }}
                    >
                      <InvestorCard
                        investor={investor}
                        onAccept={handleAccept}
                        onDecline={setDecliningId}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* ─── Decline Modal ─── */}
      <AnimatePresence>
        {decliningId !== null && decliningInvestor && (
          <DeclineModal
            investorName={decliningInvestor.name}
            onConfirm={handleDeclineConfirm}
            onCancel={() => setDecliningId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
