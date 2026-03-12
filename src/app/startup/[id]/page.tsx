"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const ease = [0.25, 0.4, 0.25, 1] as const;

/* ─── Startup Data Map ─── */
type TeamMember = {
  initials: string;
  color: string;
  name: string;
  title: string;
  bio: string;
};

type Metric = {
  value: string;
  label: string;
  trend: string;
  trendDir: "up" | "down";
  color: string;
};

type FundAllocation = {
  label: string;
  percent: number;
  color: string;
};

type MRRDataPoint = {
  month: string;
  value: number;
};

type StartupData = {
  name: string;
  initials: string;
  color: string;
  oneLiner: string;
  sector: string;
  sectorTag2?: string;
  stage: string;
  location: string;
  founded: string;
  metrics: Metric[];
  askAmount: string;
  askRound: string;
  funds: FundAllocation[];
  idealProfile: string[];
  team: TeamMember[];
  milestones: { date: string; text: string }[];
  nexusScore: number;
  pitchFounder: { name: string; initials: string; color: string };
  mrrData: MRRDataPoint[];
};

const startupData: Record<string, StartupData> = {
  "1": {
    name: "Luminary AI",
    initials: "LA",
    color: "#4A6CF7",
    oneLiner: "AI-powered contract analysis for legal teams",
    sector: "AI / Machine Learning",
    sectorTag2: "Enterprise SaaS",
    stage: "Seed Stage",
    location: "San Francisco, CA",
    founded: "Jun 2025",
    metrics: [
      { value: "$45K", label: "Monthly Revenue", trend: "+22%", trendDir: "up", color: "#4A6CF7" },
      { value: "2,400", label: "Active Users", trend: "+18%", trendDir: "up", color: "#7C5CFC" },
      { value: "180%", label: "MoM Growth", trend: "+12%", trendDir: "up", color: "#059669" },
      { value: "$2M", label: "Pipeline Value", trend: "+35%", trendDir: "up", color: "#D97706" },
    ],
    askAmount: "$1.5M",
    askRound: "Seed Round",
    funds: [
      { label: "Engineering", percent: 55, color: "#4A6CF7" },
      { label: "Go-to-Market", percent: 30, color: "#7C5CFC" },
      { label: "Operations", percent: 15, color: "#94A3B8" },
    ],
    idealProfile: [
      "Experience in AI/SaaS B2B sales cycles",
      "Check sizes between $100K-$500K",
      "Can provide enterprise customer introductions",
    ],
    team: [
      { initials: "AR", color: "#4A6CF7", name: "Alex Rivera", title: "CEO & Co-Founder", bio: "Former senior PM at Palantir. Stanford CS." },
      { initials: "JK", color: "#7C5CFC", name: "Jordan Kim", title: "CTO & Co-Founder", bio: "Ex-Google Brain researcher. PhD MIT." },
      { initials: "SO", color: "#0d9488", name: "Sam Okafor", title: "Head of Sales", bio: "8 years enterprise SaaS. Previously at Datadog." },
    ],
    milestones: [
      { date: "Mar 2026", text: "Closed $500K pre-seed from Precursor Ventures" },
      { date: "Jan 2026", text: "Launched v2.0 with AI contract comparison" },
      { date: "Nov 2025", text: "First 1,000 users milestone" },
      { date: "Sep 2025", text: "Y Combinator S25 batch acceptance" },
      { date: "Jun 2025", text: "Company founded, initial MVP launched" },
    ],
    nexusScore: 87,
    pitchFounder: { name: "Alex Rivera", initials: "AR", color: "#4A6CF7" },
    mrrData: [
      { month: "Oct", value: 8000 },
      { month: "Nov", value: 14000 },
      { month: "Dec", value: 22000 },
      { month: "Jan", value: 28000 },
      { month: "Feb", value: 36000 },
      { month: "Mar", value: 45000 },
    ],
  },
  "2": {
    name: "Stackpay",
    initials: "SP",
    color: "#0d9488",
    oneLiner: "Embedded payroll infrastructure for platforms",
    sector: "Fintech / Infrastructure",
    stage: "Seed Stage",
    location: "New York, NY",
    founded: "Mar 2025",
    metrics: [
      { value: "$82K", label: "Monthly Revenue", trend: "+28%", trendDir: "up", color: "#4A6CF7" },
      { value: "34", label: "Enterprise Clients", trend: "+6", trendDir: "up", color: "#7C5CFC" },
      { value: "22%", label: "MoM Growth", trend: "+3%", trendDir: "up", color: "#059669" },
      { value: "$4.1M", label: "Pipeline Value", trend: "+41%", trendDir: "up", color: "#D97706" },
    ],
    askAmount: "$3M",
    askRound: "Seed Round",
    funds: [
      { label: "Engineering", percent: 45, color: "#4A6CF7" },
      { label: "Go-to-Market", percent: 35, color: "#7C5CFC" },
      { label: "Operations", percent: 20, color: "#94A3B8" },
    ],
    idealProfile: [
      "Fintech operators or former founders",
      "Check sizes between $250K-$750K",
      "Distribution partnerships in payroll/HR",
    ],
    team: [
      { initials: "MO", color: "#0d9488", name: "Marcus Obi", title: "CEO & Co-Founder", bio: "Ex-Stripe payments lead. Wharton MBA." },
      { initials: "LW", color: "#4A6CF7", name: "Lisa Wang", title: "CTO & Co-Founder", bio: "12 years infrastructure engineering. Ex-AWS." },
      { initials: "DK", color: "#7C5CFC", name: "David Ko", title: "COO", bio: "Former COO at a Series B fintech." },
    ],
    milestones: [
      { date: "Feb 2026", text: "Signed 3 Fortune 500 pilots" },
      { date: "Dec 2025", text: "$50K MRR milestone" },
      { date: "Aug 2025", text: "Launched public API" },
      { date: "May 2025", text: "First enterprise client" },
      { date: "Mar 2025", text: "Company founded" },
    ],
    nexusScore: 91,
    pitchFounder: { name: "Marcus Obi", initials: "MO", color: "#0d9488" },
    mrrData: [
      { month: "Oct", value: 18000 },
      { month: "Nov", value: 28000 },
      { month: "Dec", value: 40000 },
      { month: "Jan", value: 55000 },
      { month: "Feb", value: 68000 },
      { month: "Mar", value: 82000 },
    ],
  },
  "3": {
    name: "NeuralPath",
    initials: "NP",
    color: "#7C5CFC",
    oneLiner: "Developer productivity tools powered by AI",
    sector: "Dev Tools / AI",
    stage: "Pre-Seed",
    location: "Seattle, WA",
    founded: "Aug 2025",
    metrics: [
      { value: "$18K", label: "Monthly Revenue", trend: "+35%", trendDir: "up", color: "#4A6CF7" },
      { value: "1,200", label: "Active Users", trend: "+22%", trendDir: "up", color: "#7C5CFC" },
      { value: "95%", label: "MoM Growth", trend: "+8%", trendDir: "up", color: "#059669" },
      { value: "$900K", label: "Pipeline Value", trend: "+28%", trendDir: "up", color: "#D97706" },
    ],
    askAmount: "$800K",
    askRound: "Pre-Seed Round",
    funds: [
      { label: "Engineering", percent: 65, color: "#4A6CF7" },
      { label: "Go-to-Market", percent: 20, color: "#7C5CFC" },
      { label: "Operations", percent: 15, color: "#94A3B8" },
    ],
    idealProfile: [
      "Dev tools investors",
      "Check sizes between $50K-$200K",
      "Developer community connections",
    ],
    team: [
      { initials: "PS", color: "#7C5CFC", name: "Priya Sharma", title: "CEO & Co-Founder", bio: "Ex-GitHub PM. Carnegie Mellon CS." },
      { initials: "RC", color: "#4A6CF7", name: "Ryan Chen", title: "CTO & Co-Founder", bio: "10 years ML engineering. Ex-Meta AI." },
      { initials: "DL", color: "#0d9488", name: "Dana Lee", title: "Head of Growth", bio: "Previously grew dev community at Vercel." },
    ],
    milestones: [
      { date: "Feb 2026", text: "1,000 active developers" },
      { date: "Dec 2025", text: "Launched VS Code extension" },
      { date: "Oct 2025", text: "Beta launch with 200 users" },
      { date: "Aug 2025", text: "Company founded" },
    ],
    nexusScore: 74,
    pitchFounder: { name: "Priya Sharma", initials: "PS", color: "#7C5CFC" },
    mrrData: [
      { month: "Oct", value: 2000 },
      { month: "Nov", value: 4500 },
      { month: "Dec", value: 7000 },
      { month: "Jan", value: 10000 },
      { month: "Feb", value: 14000 },
      { month: "Mar", value: 18000 },
    ],
  },
  "4": {
    name: "GreenGrid",
    initials: "GG",
    color: "#059669",
    oneLiner: "Smart energy management for commercial buildings",
    sector: "Climate Tech / IoT",
    stage: "Seed Stage",
    location: "Denver, CO",
    founded: "Jan 2025",
    metrics: [
      { value: "$67K", label: "Monthly Revenue", trend: "+15%", trendDir: "up", color: "#4A6CF7" },
      { value: "18", label: "Enterprise Clients", trend: "+4", trendDir: "up", color: "#7C5CFC" },
      { value: "15%", label: "MoM Growth", trend: "-2%", trendDir: "down", color: "#059669" },
      { value: "$3.2M", label: "Pipeline Value", trend: "+52%", trendDir: "up", color: "#D97706" },
    ],
    askAmount: "$2.5M",
    askRound: "Seed Round",
    funds: [
      { label: "Engineering", percent: 50, color: "#4A6CF7" },
      { label: "Go-to-Market", percent: 30, color: "#7C5CFC" },
      { label: "Operations", percent: 20, color: "#94A3B8" },
    ],
    idealProfile: [
      "Climate-focused or ESG investors",
      "Check sizes between $200K-$500K",
      "Enterprise procurement introductions",
    ],
    team: [
      { initials: "TJ", color: "#059669", name: "Tomas Jensen", title: "CEO & Co-Founder", bio: "Former VP Engineering at Nest. MIT EECS." },
      { initials: "NB", color: "#4A6CF7", name: "Nadia Brooks", title: "CTO & Co-Founder", bio: "PhD in smart grid systems. Ex-Siemens." },
      { initials: "KL", color: "#7C5CFC", name: "Kevin Liu", title: "Head of Sales", bio: "10 years enterprise energy sales." },
    ],
    milestones: [
      { date: "Mar 2026", text: "Partnered with 2 Fortune 100 companies" },
      { date: "Jan 2026", text: "Crossed $50K MRR" },
      { date: "Sep 2025", text: "Won TechCrunch Disrupt Climate" },
      { date: "Apr 2025", text: "First pilot deployment" },
      { date: "Jan 2025", text: "Company founded" },
    ],
    nexusScore: 83,
    pitchFounder: { name: "Tomas Jensen", initials: "TJ", color: "#059669" },
    mrrData: [
      { month: "Oct", value: 20000 },
      { month: "Nov", value: 30000 },
      { month: "Dec", value: 38000 },
      { month: "Jan", value: 50000 },
      { month: "Feb", value: 58000 },
      { month: "Mar", value: 67000 },
    ],
  },
  "5": {
    name: "Archetype",
    initials: "AR",
    color: "#e67e22",
    oneLiner: "AI-driven customer persona generation",
    sector: "Enterprise / AI",
    stage: "Pre-Seed",
    location: "Chicago, IL",
    founded: "Oct 2025",
    metrics: [
      { value: "$9K", label: "Monthly Revenue", trend: "+48%", trendDir: "up", color: "#4A6CF7" },
      { value: "680", label: "Active Users", trend: "+15%", trendDir: "up", color: "#7C5CFC" },
      { value: "120%", label: "MoM Growth", trend: "+20%", trendDir: "up", color: "#059669" },
      { value: "$450K", label: "Pipeline Value", trend: "+32%", trendDir: "up", color: "#D97706" },
    ],
    askAmount: "$500K",
    askRound: "Pre-Seed Round",
    funds: [
      { label: "R&D", percent: 55, color: "#4A6CF7" },
      { label: "Go-to-Market", percent: 30, color: "#7C5CFC" },
      { label: "Operations", percent: 15, color: "#94A3B8" },
    ],
    idealProfile: [
      "Enterprise SaaS investors",
      "Check sizes from $1K-$500K+",
      "Marketing/analytics connections",
    ],
    team: [
      { initials: "JF", color: "#e67e22", name: "Jamie Foster", title: "CEO & Co-Founder", bio: "Former product lead at HubSpot." },
      { initials: "MR", color: "#4A6CF7", name: "Mike Reeves", title: "CTO & Co-Founder", bio: "ML engineer. Ex-Salesforce Einstein." },
      { initials: "SK", color: "#7C5CFC", name: "Sara Kim", title: "Head of Design", bio: "Previously led UX at Figma." },
    ],
    milestones: [
      { date: "Feb 2026", text: "500 active users" },
      { date: "Jan 2026", text: "Launched self-serve" },
      { date: "Nov 2025", text: "First 100 users" },
      { date: "Oct 2025", text: "Company founded" },
    ],
    nexusScore: 69,
    pitchFounder: { name: "Jamie Foster", initials: "JF", color: "#e67e22" },
    mrrData: [
      { month: "Oct", value: 0 },
      { month: "Nov", value: 1500 },
      { month: "Dec", value: 3000 },
      { month: "Jan", value: 5000 },
      { month: "Feb", value: 7000 },
      { month: "Mar", value: 9000 },
    ],
  },
  "6": {
    name: "Terraform Health",
    initials: "TH",
    color: "#7C5CFC",
    oneLiner: "Predictive diagnostics using wearable biosignals",
    sector: "Health Tech / AI",
    stage: "Pre-Seed",
    location: "Boston, MA",
    founded: "Sep 2025",
    metrics: [
      { value: "$12K", label: "Monthly Revenue", trend: "+45%", trendDir: "up", color: "#4A6CF7" },
      { value: "890", label: "Beta Users", trend: "+120", trendDir: "up", color: "#7C5CFC" },
      { value: "340%", label: "MoM Growth", trend: "+80%", trendDir: "up", color: "#059669" },
      { value: "$800K", label: "Pipeline Value", trend: "+25%", trendDir: "up", color: "#D97706" },
    ],
    askAmount: "$750K",
    askRound: "Pre-Seed Round",
    funds: [
      { label: "R&D", percent: 60, color: "#4A6CF7" },
      { label: "Clinical Trials", percent: 25, color: "#7C5CFC" },
      { label: "Operations", percent: 15, color: "#94A3B8" },
    ],
    idealProfile: [
      "Health tech or biotech investors",
      "Check sizes between $50K-$200K",
      "Clinical trial connections",
    ],
    team: [
      { initials: "EN", color: "#7C5CFC", name: "Elena Navarro", title: "CEO & Co-Founder", bio: "Former medical director at Fitbit." },
      { initials: "RT", color: "#0d9488", name: "Raj Thakur", title: "CTO & Co-Founder", bio: "PhD biomedical engineering. MIT." },
      { initials: "CM", color: "#4A6CF7", name: "Claire Moore", title: "CSO", bio: "15 years clinical research. Ex-Mayo Clinic." },
    ],
    milestones: [
      { date: "Feb 2026", text: "FDA pre-submission meeting" },
      { date: "Dec 2025", text: "500 beta users" },
      { date: "Oct 2025", text: "Published validation study" },
      { date: "Sep 2025", text: "Company founded" },
    ],
    nexusScore: 78,
    pitchFounder: { name: "Elena Navarro", initials: "EN", color: "#7C5CFC" },
    mrrData: [
      { month: "Oct", value: 1000 },
      { month: "Nov", value: 2500 },
      { month: "Dec", value: 4000 },
      { month: "Jan", value: 6500 },
      { month: "Feb", value: 9000 },
      { month: "Mar", value: 12000 },
    ],
  },
  "7": {
    name: "Canopy Analytics",
    initials: "CA",
    color: "#059669",
    oneLiner: "Real-time carbon tracking for supply chains",
    sector: "Climate Tech / Analytics",
    stage: "Seed Stage",
    location: "Austin, TX",
    founded: "Jan 2025",
    metrics: [
      { value: "$67K", label: "Monthly Revenue", trend: "+15%", trendDir: "up", color: "#4A6CF7" },
      { value: "18", label: "Enterprise Clients", trend: "+4", trendDir: "up", color: "#7C5CFC" },
      { value: "15%", label: "MoM Growth", trend: "-2%", trendDir: "down", color: "#059669" },
      { value: "$3.2M", label: "Pipeline Value", trend: "+52%", trendDir: "up", color: "#D97706" },
    ],
    askAmount: "$2.5M",
    askRound: "Seed Round",
    funds: [
      { label: "Engineering", percent: 50, color: "#4A6CF7" },
      { label: "Go-to-Market", percent: 30, color: "#7C5CFC" },
      { label: "Operations", percent: 20, color: "#94A3B8" },
    ],
    idealProfile: [
      "Climate-focused or ESG investors",
      "Check sizes between $200K-$500K",
      "Enterprise procurement introductions",
    ],
    team: [
      { initials: "LH", color: "#059669", name: "Liam Hayes", title: "CEO & Co-Founder", bio: "Former sustainability lead at Amazon." },
      { initials: "ZP", color: "#4A6CF7", name: "Zara Patel", title: "CTO & Co-Founder", bio: "Built data pipelines at Snowflake." },
      { initials: "OR", color: "#7C5CFC", name: "Owen Reed", title: "Head of Partnerships", bio: "8 years in supply chain consulting." },
    ],
    milestones: [
      { date: "Mar 2026", text: "Signed Fortune 500 pilot" },
      { date: "Jan 2026", text: "Crossed $50K MRR" },
      { date: "Oct 2025", text: "Won Climate Tech award" },
      { date: "Apr 2025", text: "First enterprise client" },
      { date: "Jan 2025", text: "Company founded" },
    ],
    nexusScore: 83,
    pitchFounder: { name: "Liam Hayes", initials: "LH", color: "#059669" },
    mrrData: [
      { month: "Oct", value: 20000 },
      { month: "Nov", value: 30000 },
      { month: "Dec", value: 38000 },
      { month: "Jan", value: 50000 },
      { month: "Feb", value: 58000 },
      { month: "Mar", value: 67000 },
    ],
  },
};

/* ─── UrgenC Score Label ─── */
function nexusLabel(score: number): string {
  if (score >= 85) return "Strong";
  if (score >= 75) return "Promising";
  return "Early";
}

/* ─── SVG Chart ─── */
function MRRChart({ data, color }: { data: MRRDataPoint[]; color: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setDrawn(true), 100);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const width = 680;
  const height = 240;
  const padL = 60;
  const padR = 20;
  const padT = 20;
  const padB = 40;

  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  // Dynamic max value based on data
  const rawMax = Math.max(...data.map((d) => d.value));
  const maxVal = Math.ceil(rawMax / 10000) * 10000 || 10000;
  const tickCount = 5;
  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => Math.round((maxVal / tickCount) * i));

  const points = data.map((d, i) => ({
    x: padL + (i / (data.length - 1)) * chartW,
    y: padT + chartH - (d.value / maxVal) * chartH,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x},${padT + chartH} L${points[0].x},${padT + chartH} Z`;

  const pathLength = 1200;
  const gradientId = `areaGrad-${color.replace("#", "")}`;

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {yTicks.map((tick) => {
        const y = padT + chartH - (tick / maxVal) * chartH;
        return (
          <g key={tick}>
            <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
            <text x={padL - 8} y={y + 4} textAnchor="end" fill="#94A3B8" fontSize="11" fontFamily="var(--font-dm-sans), sans-serif">
              ${tick / 1000}K
            </text>
          </g>
        );
      })}

      {/* X labels */}
      {data.map((d, i) => (
        <text key={d.month} x={points[i].x} y={height - 8} textAnchor="middle" fill="#94A3B8" fontSize="12" fontFamily="var(--font-dm-sans), sans-serif">
          {d.month}
        </text>
      ))}

      {/* Area */}
      <path d={areaPath} fill={`url(#${gradientId})`} opacity={drawn ? 1 : 0} style={{ transition: "opacity 0.5s ease 0.8s" }} />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        strokeDashoffset={drawn ? 0 : pathLength}
        style={{ transition: `stroke-dashoffset 1.2s ease-out` }}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={color} stroke="#FAFAF9" strokeWidth="2" opacity={drawn ? 1 : 0} style={{ transition: `opacity 0.3s ease ${0.8 + i * 0.1}s` }} />
      ))}
    </svg>
  );
}

/* ─── Section Wrapper ─── */
function SectionCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay, ease }}
      className="rounded-3xl mb-5"
      style={{
        background: "rgba(255, 255, 255, 0.45)",
        backdropFilter: "blur(20px) saturate(1.2)",
        WebkitBackdropFilter: "blur(20px) saturate(1.2)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
      }}
    >
      <div className="p-8 md:p-10">{children}</div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function StartupProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const startup = startupData[id];
  const [lockHovered, setLockHovered] = useState(false);

  if (!startup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base text-text-primary">
        <div className="text-center">
          <h1 className="text-[28px] font-semibold mb-4">Startup not found</h1>
          <p className="text-text-muted mb-6">The startup you are looking for does not exist.</p>
          <Link href="/drops" className="text-accent-blue font-medium hover:underline">
            Back to Matches
          </Link>
        </div>
      </div>
    );
  }

  const scoreLabel = nexusLabel(startup.nexusScore);

  return (
    <div className="min-h-screen flex bg-base text-text-primary relative">
      {/* Noise */}
      <div className="noise-overlay" />

      {/* Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 top-[5%] right-[15%]" />
        <div className="blob blob-lavender animate-blob-2 bottom-[25%] left-[8%]" />
        <div className="blob blob-peach animate-blob-3 top-[55%] right-[25%]" />
      </div>

      <Sidebar role="investor" activeLabel="Daily Drops" />

      {/* ─── Main Content ─── */}
      <div className="flex-1 md:ml-[240px] relative z-10 pb-28">
        <div className="max-w-[780px] mx-auto px-4 md:px-8 pt-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease }}
          >
            <Link
              href="/drops"
              className="inline-flex items-center gap-1.5 text-accent-blue text-[14px] font-medium mb-6 hover:underline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Matches
            </Link>
          </motion.div>

          {/* ═══ HEADER CARD ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <SectionCard>
              <div className="flex items-start gap-5 mb-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0" style={{ backgroundColor: startup.color }}>
                  {startup.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-[24px] md:text-[28px] font-semibold text-text-primary">{startup.name}</h1>
                  <p className="text-text-muted text-[16px] md:text-[17px] mt-1">{startup.oneLiner}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-3 py-1.5 rounded-full text-[13px] text-accent-blue bg-accent-blue/5 border border-accent-blue/20">{startup.sector}</span>
                    {startup.sectorTag2 && (
                      <span className="px-3 py-1.5 rounded-full text-[13px] text-accent-blue bg-accent-blue/5 border border-accent-blue/20">{startup.sectorTag2}</span>
                    )}
                    <span className="px-3 py-1.5 rounded-full text-[13px] text-accent-violet bg-accent-violet/5 border border-accent-violet/20">{startup.stage}</span>
                    <span className="px-3 py-1.5 rounded-full text-[13px] text-text-secondary bg-black/[0.03] border border-black/[0.06] flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {startup.location}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[12px] text-text-muted ml-[76px]">Founded {startup.founded}</p>
            </SectionCard>
          </motion.div>

          {/* ═══ VIDEO PITCH (PROMINENT) ═══ */}
          <SectionCard delay={0.05}>
            <h2 className="text-[20px] md:text-[22px] font-normal text-text-primary mb-5" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Founder Pitch
            </h2>
            <div className="relative rounded-2xl overflow-hidden bg-[#0F172A] aspect-video flex items-center justify-center cursor-pointer group">
              {/* 60 sec pill */}
              <span className="absolute top-3 left-3 z-10 text-[11px] text-white/80 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">60 sec pitch</span>
              {/* Play button */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <polygon points="8,5 20,12 8,19" />
                </svg>
              </div>
              <span className="absolute bottom-3 right-3 text-white/50 text-[12px] bg-black/30 px-2 py-0.5 rounded">1:00</span>
            </div>
            <div className="flex items-center gap-2.5 mt-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" style={{ backgroundColor: startup.pitchFounder.color }}>
                {startup.pitchFounder.initials}
              </div>
              <p className="text-[14px] text-text-secondary">
                <span className="font-medium text-text-primary">{startup.pitchFounder.name}</span>, CEO & Co-Founder
              </p>
            </div>
          </SectionCard>

          {/* ═══ KEY METRICS ═══ */}
          <SectionCard delay={0.1}>
            <h2 className="text-[20px] md:text-[22px] font-normal text-text-primary mb-5" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Key Metrics
            </h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {startup.metrics.map((m) => (
                <motion.div
                  key={m.label}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease }}
                  className="rounded-xl p-5"
                  style={{
                    background: "rgba(255, 255, 255, 0.35)",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    borderTop: `2px solid ${m.color}`,
                  }}
                >
                  <p className="text-[24px] md:text-[28px] font-semibold text-text-primary">{m.value}</p>
                  <p className="text-[12px] text-text-muted uppercase tracking-[1px] mt-1 mb-1">{m.label}</p>
                  <span className={`inline-flex items-center gap-0.5 text-[11px] font-medium ${m.trendDir === "up" ? "text-[#059669]" : "text-[#EF4444]"}`}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      {m.trendDir === "up" ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
                    </svg>
                    {m.trend}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </SectionCard>

          {/* ═══ THE ASK ═══ */}
          <SectionCard delay={0.15}>
            <h2 className="text-[20px] md:text-[22px] font-normal text-text-primary mb-5" style={{ fontFamily: "'Instrument Serif', serif" }}>
              The Ask
            </h2>
            <p className="text-[20px] md:text-[22px] font-semibold text-text-primary mb-5">Raising {startup.askAmount} {startup.askRound}</p>

            <p className="text-text-muted text-[12px] tracking-[2px] uppercase mb-4">Use of Funds</p>
            {/* Stacked bar */}
            <div className="flex h-3 rounded-full overflow-hidden mb-3">
              {startup.funds.map((f) => (
                <div key={f.label} className="h-full" style={{ width: `${f.percent}%`, backgroundColor: f.color }} />
              ))}
            </div>
            <div className="flex gap-4 mb-6">
              {startup.funds.map((f) => (
                <span key={f.label} className="flex items-center gap-1.5 text-[12px] text-text-muted">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: f.color }} />
                  {f.label} {f.percent}%
                </span>
              ))}
            </div>

            <p className="text-text-muted text-[12px] tracking-[2px] uppercase mt-6 mb-3">Ideal Investor Profile</p>
            <ul className="flex flex-col gap-2.5">
              {startup.idealProfile.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-accent-blue mt-1.5 shrink-0" />
                  <span className="text-text-secondary text-[15px] leading-[1.6]">{item}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* ═══ TEAM ═══ */}
          <SectionCard delay={0.2}>
            <h2 className="text-[20px] md:text-[22px] font-normal text-text-primary mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
              The Team
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {startup.team.map((m) => (
                <div
                  key={m.name}
                  className="rounded-2xl p-6 relative"
                  style={{
                    background: "rgba(255, 255, 255, 0.25)",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0" style={{ backgroundColor: m.color }}>
                      {m.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[17px] font-semibold text-text-primary">{m.name}</p>
                      <p className="text-[14px] text-text-muted">{m.title}</p>
                      <p className="text-[14px] text-text-secondary mt-1">{m.bio}</p>
                    </div>
                  </div>
                  <a href="#" className="absolute bottom-5 right-5 text-accent-blue hover:opacity-70 transition-opacity">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ═══ TRACTION ═══ */}
          <SectionCard delay={0.25}>
            <h2 className="text-[20px] md:text-[22px] font-normal text-text-primary mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Traction & Milestones
            </h2>

            {/* Chart */}
            <div className="mb-10">
              <MRRChart data={startup.mrrData} color={startup.color} />
            </div>

            {/* Timeline */}
            <p className="text-text-muted text-[12px] tracking-[2px] uppercase mb-5">Key Milestones</p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {startup.milestones.map((m, i) => (
                <motion.div
                  key={m.date}
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4, ease }}
                  className="flex gap-4 relative"
                >
                  {/* Vertical line */}
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-blue shrink-0 mt-1" />
                    {i < startup.milestones.length - 1 && (
                      <div className="w-px flex-1 bg-black/[0.1]" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="text-text-muted text-[13px]">{m.date}</p>
                    <p className="text-text-primary text-[15px] mt-0.5">{m.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </SectionCard>

          {/* ═══ NEXUS SCORE ═══ */}
          <SectionCard delay={0.28}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[20px] md:text-[22px] font-normal text-text-primary" style={{ fontFamily: "'Instrument Serif', serif" }}>
                UrgenC Score
              </h2>
              <span className="text-[13px] font-medium px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(5,150,105,0.08)", color: "#059669" }}>
                {scoreLabel}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-[36px] font-semibold text-text-primary">{startup.nexusScore}</span>
              <span className="text-[16px] text-text-muted">/100</span>
            </div>
            <div className="h-2 rounded-full bg-black/[0.04] overflow-hidden mb-3">
              <div className="h-full rounded-full" style={{ width: `${startup.nexusScore}%`, background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }} />
            </div>
            <p className="text-[13px] text-text-muted">Scored on vision, team, market, defensibility, and momentum</p>
          </SectionCard>

          {/* ═══ PITCH DECK ═══ */}
          <SectionCard delay={0.3}>
            <h2 className="text-[20px] md:text-[22px] font-normal text-text-primary mb-5" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Pitch Deck
            </h2>

            {/* NDA notice */}
            <div className="rounded-xl p-5 mb-6" style={{ background: "rgba(217, 119, 6, 0.05)", border: "1px solid rgba(217, 119, 6, 0.15)" }}>
              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div>
                  <p className="text-[14px] leading-[1.6]" style={{ color: "#92400E" }}>
                    This document is confidential. By viewing, you agree to the UrgenC Mutual NDA. Your access is watermarked and logged.
                  </p>
                  <a href="#" className="text-[14px] font-medium mt-1 inline-block hover:underline" style={{ color: "#D97706" }}>
                    View NDA Terms
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              className="w-full h-[52px] rounded-full text-white text-[16px] font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                boxShadow: "0 4px 15px rgba(74, 108, 247, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(74, 108, 247, 0.4)";
                setLockHovered(true);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(74, 108, 247, 0.3)";
                setLockHovered(false);
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              >
                {lockHovered ? (
                  <>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 019.33-2.5" />
                  </>
                ) : (
                  <>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </>
                )}
              </svg>
              View Pitch Deck
            </button>
          </SectionCard>
        </div>
      </div>

      {/* ─── Sticky Action Bar ─── */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8, ease }}
        className="fixed bottom-0 left-0 md:left-[240px] right-0 z-40 h-20 flex items-center justify-between px-6 md:px-10"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(24px) saturate(1.2)",
          WebkitBackdropFilter: "blur(24px) saturate(1.2)",
          borderTop: "1px solid rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Left: context */}
        <div className="hidden sm:block min-w-0 mr-4">
          <p className="text-[15px] font-semibold text-text-primary truncate">{startup.name}</p>
          <p className="text-[13px] text-text-muted truncate">{startup.oneLiner}</p>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Pass */}
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-250"
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
              e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(239, 68, 68, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.5)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Save */}
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-250"
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(74, 108, 247, 0.1)";
              e.currentTarget.style.borderColor = "rgba(74, 108, 247, 0.3)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(74, 108, 247, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.5)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
          </button>

          {/* Interested */}
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-250"
            style={{
              background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
              boxShadow: "0 4px 16px rgba(74, 108, 247, 0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(124, 92, 252, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(74, 108, 247, 0.35)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
