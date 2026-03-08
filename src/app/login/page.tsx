"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const ease = [0.25, 0.4, 0.25, 1] as const;

function RoleCard({
  title,
  subtitle,
  icon,
  href,
  delay,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href: string;
  delay: number;
}) {
  const router = useRouter();

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease }}
      onClick={() => router.push(href)}
      className="flex-1 min-w-[260px] rounded-3xl p-8 md:p-10 text-left cursor-pointer group relative overflow-hidden transition-all duration-300 hover:-translate-y-[3px]"
      style={{
        background: "rgba(255, 255, 255, 0.45)",
        backdropFilter: "blur(20px) saturate(1.2)",
        WebkitBackdropFilter: "blur(20px) saturate(1.2)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 16px 48px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 0 30px rgba(74, 108, 247, 0.15)";
        e.currentTarget.style.borderColor = "rgba(74, 108, 247, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
      }}
    >
      {/* Gradient border glow on hover */}
      <div
        className="absolute inset-[-1px] rounded-[25px] opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"
        style={{
          background:
            "conic-gradient(from 0deg, #4A6CF7, #7C5CFC, #14b8a6, #4A6CF7)",
          animation: "rotate-border 3s linear infinite",
        }}
      />

      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
          boxShadow: "0 4px 15px rgba(74, 108, 247, 0.3)",
        }}
      >
        {icon}
      </div>

      <h2
        className="text-[22px] md:text-[24px] font-normal text-text-primary mb-2"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {title}
      </h2>
      <p className="text-text-muted text-[15px] leading-[1.6]">{subtitle}</p>
    </motion.button>
  );
}

export default function LoginPage() {
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
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="text-center mb-10"
        >
          <h1
            className="text-[32px] md:text-[40px] font-normal text-text-primary mb-3"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Welcome Back
          </h1>
          <p className="text-text-muted text-[16px]">
            Sign in to your Nexus account
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="flex flex-col md:flex-row gap-5 mb-10 w-full max-w-[640px]">
          <RoleCard
            title="Sign In as Investor"
            subtitle="View your daily startup matches and manage your pipeline."
            href="/dashboard/investor"
            delay={0.15}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
              </svg>
            }
          />
          <RoleCard
            title="Sign In as Startup"
            subtitle="See who is interested in your company and track your fundraise."
            href="/dashboard/founder"
            delay={0.25}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L4 7v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5z" />
                <path d="M12 8v4l2 2" />
              </svg>
            }
          />
        </div>

        {/* Email / Password mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          className="w-full max-w-[420px] mb-8"
        >
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-[48px] rounded-xl text-[15px] text-text-primary placeholder:text-text-muted outline-none px-4"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-[48px] rounded-xl text-[15px] text-text-primary placeholder:text-text-muted outline-none px-4"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
              }}
            />
          </div>
        </motion.div>

        {/* Bottom links */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45, ease }}
          className="text-text-muted text-[14px] text-center"
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/apply/investor"
            className="text-accent-blue hover:underline font-medium"
          >
            Apply as Investor
          </Link>
          <span className="mx-1.5 text-text-muted/40">|</span>
          <Link
            href="/apply/startup"
            className="text-accent-blue hover:underline font-medium"
          >
            Apply as Startup
          </Link>
        </motion.p>
      </div>
    </main>
  );
}
