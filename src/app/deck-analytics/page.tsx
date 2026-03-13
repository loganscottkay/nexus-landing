"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Sidebar from "@/components/Sidebar";

const ease = [0.25, 0.4, 0.25, 1] as const;

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

/* ─── Glass Card ─── */
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.45)",
        backdropFilter: "blur(20px) saturate(1.2)",
        WebkitBackdropFilter: "blur(20px) saturate(1.2)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Stat ─── */
function Stat({ value, label, trend, trendDir }: { value: string; label: string; trend: string; trendDir: "up" | "flat" | "new" }) {
  const colors = { up: "#059669", flat: "#64748B", new: "#7C5CFC" };
  const bgs = { up: "rgba(5,150,105,0.08)", flat: "rgba(100,116,139,0.08)", new: "rgba(124,92,252,0.08)" };

  return (
    <div className="text-center">
      <p className="text-[28px] font-semibold text-text-primary leading-none">{value}</p>
      <p className="text-[11px] uppercase tracking-[1px] text-text-muted mt-1.5">{label}</p>
      {trend && (
        <span
          className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[11px] font-medium"
          style={{ background: bgs[trendDir], color: colors[trendDir] }}
        >
          {trendDir === "up" && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          )}
          {trendDir === "flat" && <span>-</span>}
          {trendDir === "new" && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
          {trend}
        </span>
      )}
    </div>
  );
}

/* ─── SVG Line Chart ─── */
function LineChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const data = [1, 0, 2, 1, 3, 2, 1, 4, 3, 2, 5, 3, 2, 4, 6, 3, 5, 4, 7, 5, 3, 6, 4, 8, 5, 7, 9, 6, 8, 12];
  const maxVal = 12;
  const chartWidth = 600;
  const chartHeight = 200;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;
  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  const points = data.map((v, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * plotWidth;
    const y = paddingTop + plotHeight - (v / maxVal) * plotHeight;
    return { x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  const areaPath = `${linePath} L${points[points.length - 1].x},${paddingTop + plotHeight} L${points[0].x},${paddingTop + plotHeight} Z`;

  // Calculate approximate total path length for dash animation
  let totalLength = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    totalLength += Math.sqrt(dx * dx + dy * dy);
  }

  const yTicks = [0, 4, 8, 12];
  const dayLabels = [1, 5, 10, 15, 20, 25, 30];

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      className="w-full"
      style={{ height: "200px" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7C5CFC" />
          <stop offset="100%" stopColor="#4A6CF7" />
        </linearGradient>
        <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C5CFC" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#7C5CFC" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Y-axis grid lines and labels */}
      {yTicks.map((tick) => {
        const y = paddingTop + plotHeight - (tick / maxVal) * plotHeight;
        return (
          <g key={tick}>
            <line x1={paddingLeft} y1={y} x2={chartWidth - paddingRight} y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
            <text x={paddingLeft - 8} y={y + 4} textAnchor="end" fill="#94A3B8" fontSize="11" fontFamily="var(--font-dm-sans), sans-serif">
              {tick}
            </text>
          </g>
        );
      })}

      {/* X-axis labels */}
      {dayLabels.map((day) => {
        const x = paddingLeft + ((day - 1) / (data.length - 1)) * plotWidth;
        return (
          <text key={day} x={x} y={chartHeight - 5} textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="var(--font-dm-sans), sans-serif">
            {day}
          </text>
        );
      })}

      {/* Area fill */}
      <path
        d={areaPath}
        fill="url(#fillGrad)"
        opacity={inView ? 1 : 0}
        style={{ transition: "opacity 0.8s ease-out 0.6s" }}
      />

      {/* Animated line */}
      <path
        d={linePath}
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={inView ? 0 : totalLength}
        style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={3}
          fill="#7C5CFC"
          opacity={inView ? 1 : 0}
          style={{ transition: `opacity 0.3s ease-out ${0.8 + i * 0.03}s` }}
        />
      ))}
    </svg>
  );
}

/* ─── Outcome Pill ─── */
function OutcomePill({ outcome }: { outcome: "Expressed Interest" | "No Action" | "Viewing" | "Call Completed" }) {
  if (outcome === "Call Completed") {
    return (
      <span
        className="text-[12px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap"
        style={{ background: "rgba(74,108,247,0.08)", color: "#4A6CF7" }}
      >
        Call Completed
      </span>
    );
  }
  if (outcome === "Expressed Interest") {
    return (
      <span
        className="text-[12px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap"
        style={{ background: "rgba(5,150,105,0.08)", color: "#059669" }}
      >
        Expressed Interest
      </span>
    );
  }
  if (outcome === "Viewing") {
    return (
      <span
        className="text-[12px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap animate-pulse"
        style={{ background: "rgba(74,108,247,0.08)", color: "#4A6CF7" }}
      >
        Viewing
      </span>
    );
  }
  return (
    <span
      className="text-[12px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap"
      style={{ background: "rgba(100,116,139,0.08)", color: "#64748B" }}
    >
      No Action
    </span>
  );
}

/* ─── Viewer Data ─── */
const viewers: {
  initials: string;
  color: string;
  name: string;
  firm: string;
  checkSize: string;
  date: string;
  timeSpent: string;
  outcome: "Expressed Interest" | "No Action" | "Viewing" | "Call Completed";
}[] = [
  { initials: "SC", color: "#4A6CF7", name: "Sarah Chen", firm: "Gradient Ventures", checkSize: "$250K-$1M", date: "Today, 9:14 AM", timeSpent: "6 min 23 sec", outcome: "Expressed Interest" },
  { initials: "MW", color: "#7C5CFC", name: "Marcus Webb", firm: "Founder Collective", checkSize: "$100K-$500K", date: "Today, 8:02 AM", timeSpent: "4 min 11 sec", outcome: "Expressed Interest" },
  { initials: "JP", color: "#0d9488", name: "James Park", firm: "Lux Capital", checkSize: "$500K-$2M", date: "Today, 7:30 AM", timeSpent: "2 min 45 sec", outcome: "Expressed Interest" },
  { initials: "ER", color: "#D97706", name: "Elena Rodriguez", firm: "Precursor Ventures", checkSize: "$100K-$250K", date: "Yesterday", timeSpent: "5 min 08 sec", outcome: "Expressed Interest" },
  { initials: "PS", color: "#059669", name: "Priya Sharma", firm: "Lightspeed Venture Partners", checkSize: "$250K-$1M", date: "Mar 5", timeSpent: "8 min 12 sec", outcome: "Call Completed" },
  { initials: "DK", color: "#4A6CF7", name: "David Kim", firm: "a16z", checkSize: "$500K-$2M", date: "Mar 4", timeSpent: "3 min 44 sec", outcome: "Call Completed" },
  { initials: "RG", color: "#e67e22", name: "Rachel Green", firm: "Index Ventures", checkSize: "$1M-$5M", date: "Mar 3", timeSpent: "1 min 02 sec", outcome: "No Action" },
  { initials: "TL", color: "#6366F1", name: "Tommy Liu", firm: "Sequoia Scout", checkSize: "$100K-$500K", date: "Mar 1", timeSpent: "2 min 00 sec", outcome: "No Action" },
];

/* ─── Page ─── */
export default function DeckAnalytics() {
  return (
    <div className="min-h-screen flex bg-base text-text-primary relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 top-[5%] right-[15%]" />
        <div className="blob blob-lavender animate-blob-2 bottom-[20%] left-[8%]" />
        <div className="blob blob-peach animate-blob-3 top-[50%] right-[25%]" />
      </div>

      <Sidebar role="founder" activeLabel="Deck Analytics" />

      <div className="flex-1 md:ml-[240px] relative z-10 pb-20 md:pb-8">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 pt-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease }}
            className="flex items-center justify-between mb-8"
          >
            <h1
              className="text-[24px] md:text-[28px] font-normal text-text-primary"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Deck Analytics
            </h1>
            <p className="text-text-muted text-[14px] hidden sm:block">{today}</p>
          </motion.div>

          {/* Top Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
          >
            <GlassCard className="p-6 md:p-8 mb-6">
              <div className="flex flex-wrap justify-between gap-6">
                <Stat value="12" label="Total Views" trend="18%" trendDir="up" />
                <div className="hidden md:block w-px h-10 self-center bg-black/[0.06]" />
                <Stat value="4.2 min" label="Avg View Time" trend="" trendDir="flat" />
                <div className="hidden md:block w-px h-10 self-center bg-black/[0.06]" />
                <Stat value="67%" label="View-to-Interest Rate" trend="5%" trendDir="up" />
                <div className="hidden md:block w-px h-10 self-center bg-black/[0.06]" />
                <Stat value="3" label="Views Today" trend="New" trendDir="new" />
              </div>
            </GlassCard>
          </motion.div>

          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease }}
          >
            <GlassCard className="p-6 md:p-8 mb-6">
              <div className="mb-5">
                <h3 className="text-[18px] font-semibold text-text-primary">Deck Views Over Time</h3>
                <p className="text-[13px] text-text-muted mt-0.5">Last 30 days</p>
              </div>
              <LineChart />
            </GlassCard>
          </motion.div>

          {/* Viewer Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
          >
            <GlassCard className="p-6 md:p-8">
              <h3 className="text-[18px] font-semibold text-text-primary mb-5">Viewer Details</h3>

              {/* Desktop header */}
              <div className="hidden md:flex items-center gap-3 px-2 pb-3 border-b border-black/[0.06] text-[11px] uppercase tracking-[1px] text-text-muted">
                <div className="w-10 shrink-0" />
                <div className="flex-1 min-w-[120px]">Name</div>
                <div className="w-[110px] shrink-0">Check Size</div>
                <div className="w-[120px] shrink-0">Date Viewed</div>
                <div className="w-[100px] shrink-0">Time Spent</div>
                <div className="w-[130px] shrink-0 text-right">Outcome</div>
              </div>

              {viewers.map((viewer, i) => (
                <motion.div
                  key={viewer.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 + i * 0.06, ease }}
                >
                  {/* Desktop row */}
                  <div
                    className={`hidden md:flex items-center gap-3 px-2 py-3 rounded-lg transition-colors hover:bg-black/[0.02] ${
                      i < viewers.length - 1 ? "border-b border-black/[0.04]" : ""
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                      style={{ backgroundColor: viewer.color }}
                    >
                      {viewer.initials}
                    </div>
                    <div className="flex-1 min-w-[120px]">
                      <p className="text-[15px] font-semibold text-text-primary">{viewer.name}</p>
                      <p className="text-[13px] text-text-muted">{viewer.firm}</p>
                    </div>
                    <div className="w-[110px] shrink-0 text-[14px] text-text-primary">{viewer.checkSize}</div>
                    <div className="w-[120px] shrink-0 text-[13px] text-text-muted">{viewer.date}</div>
                    <div className="w-[100px] shrink-0 text-[13px] text-text-muted">{viewer.timeSpent}</div>
                    <div className="w-[130px] shrink-0 text-right">
                      <OutcomePill outcome={viewer.outcome} />
                    </div>
                  </div>

                  {/* Mobile row */}
                  <div
                    className={`md:hidden py-4 transition-colors hover:bg-black/[0.02] ${
                      i < viewers.length - 1 ? "border-b border-black/[0.04]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                        style={{ backgroundColor: viewer.color }}
                      >
                        {viewer.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-semibold text-text-primary">{viewer.name}</p>
                        <p className="text-[13px] text-text-muted">{viewer.firm}</p>
                      </div>
                      <OutcomePill outcome={viewer.outcome} />
                    </div>
                    <div className="flex items-center gap-4 ml-[52px] text-[13px] text-text-muted">
                      <span>{viewer.checkSize}</span>
                      <span>{viewer.date}</span>
                      <span>{viewer.timeSpent}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
