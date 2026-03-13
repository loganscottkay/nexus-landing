"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

const storySections = [
  {
    title: "Where It Started",
    body: "Best friends since high school. Logan studied Hospitality and Data Science at BU. Benjamin studied Finance and Marketing at Northeastern. For years we brainstormed startup ideas every weekend and kept hitting the same wall.",
  },
  {
    title: "The Problem",
    body: "The startup world felt like a closed club. Cold emails went nowhere. Networking events were useless. And everyone around us felt the same FOMO.",
  },
  {
    title: "The Moment It Clicked",
    body: "One night Benjamin said it: the problem is not finding an idea. The problem is that founders and investors literally cannot find each other. That was the moment.",
  },
  {
    title: "What UrgenC Is",
    body: "A matching app. Founders pitch. Investors swipe. Matches lead to real calls. Think Tinder but for startup deals.",
  },
  {
    title: "Why Now",
    body: "AI is lowering the barrier to build. More people than ever want in. UrgenC is the door.",
  },
];

function HoverCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="h-full"
    >
      <div
        className="rounded-xl md:rounded-2xl p-6 md:p-8 h-full"
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid rgba(0, 0, 0, ${hovered ? 0.1 : 0.06})`,
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          boxShadow: hovered ? "0 8px 30px rgba(0, 0, 0, 0.08)" : "0 0 0 rgba(0, 0, 0, 0)",
          transition: "all 0.25s ease",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function StoryPage() {
  return (
    <>
      <Navbar />

      {/* Atmospheric background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#FAFAF9]" />
        <div className="blob blob-blue animate-blob-1" style={{ top: "10%", left: "15%" }} />
        <div className="blob blob-lavender animate-blob-2" style={{ top: "40%", right: "10%" }} />
        <div className="blob blob-peach animate-blob-3" style={{ top: "70%", left: "30%" }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      <main className="relative z-10 pt-32 pb-24">
        {/* Header */}
        <div className="max-w-[700px] mx-auto px-6 text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-[40px] md:text-[48px] font-normal mb-5"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.06 }}
            className="text-[18px] leading-[1.7]"
            style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            How two best friends from high school ended up building the platform they wished existed.
          </motion.p>
        </div>

        {/* Story sections */}
        <div className="max-w-[700px] mx-auto px-6">
          <div className="flex flex-col" style={{ gap: "20px" }}>
            {storySections.map((section, i) => (
              <HoverCard key={section.title} delay={i * 0.06}>
                <h2
                  className="font-normal mb-4"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "28px",
                    color: "#0F172A",
                  }}
                >
                  {section.title}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "16px",
                    color: "#475569",
                    lineHeight: 1.7,
                  }}
                >
                  {section.body}
                </p>
              </HoverCard>
            ))}
          </div>
        </div>

        {/* Meet the Founders */}
        <div className="max-w-[700px] mx-auto px-6 mt-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease }}
            className="text-[32px] font-normal text-center mb-10"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Meet the Founders
          </motion.h2>

          <div className="grid md:grid-cols-2 items-stretch" style={{ gap: "20px" }}>
            {/* Logan */}
            <HoverCard>
              <div className="p-0 md:p-0" style={{ minHeight: "280px" }}>
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src="/images/logan.webp"
                    alt="Logan Kay"
                    width={80}
                    height={80}
                    className="rounded-full object-cover shrink-0"
                    style={{ width: "80px", height: "80px" }}
                  />
                  <div>
                    <p
                      className="font-semibold"
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "20px",
                        color: "#0F172A",
                      }}
                    >
                      Logan Kay
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "14px",
                        color: "#94A3B8",
                      }}
                    >
                      Co-Founder
                    </p>
                  </div>
                </div>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "14px",
                    color: "#94A3B8",
                  }}
                >
                  Boston University | AI Implementation @ Harvard Business School
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "15px",
                    color: "#475569",
                    lineHeight: 1.7,
                  }}
                >
                  Logan brings the technical firepower and operational rigor. He spearheaded AI implementation across admissions and operations at Harvard Business School and obsesses over making complex systems simple and accessible. He is the architect behind the UrgenC scoring engine and platform infrastructure.
                </p>
              </div>
            </HoverCard>

            {/* Benjamin */}
            <HoverCard delay={0.06}>
              <div className="p-0 md:p-0" style={{ minHeight: "280px" }}>
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src="/images/ben.jpeg"
                    alt="Benjamin Matiash"
                    width={80}
                    height={80}
                    className="rounded-full object-cover shrink-0"
                    style={{ width: "80px", height: "80px" }}
                  />
                  <div>
                    <p
                      className="font-semibold"
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "20px",
                        color: "#0F172A",
                      }}
                    >
                      Benjamin Matiash
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "14px",
                        color: "#94A3B8",
                      }}
                    >
                      Co-Founder
                    </p>
                  </div>
                </div>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "14px",
                    color: "#94A3B8",
                  }}
                >
                  Northeastern University | Institutional Equity @ Morgan Stanley
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "15px",
                    color: "#475569",
                    lineHeight: 1.7,
                  }}
                >
                  Benjamin brings the financial acumen and investor perspective. His experience in institutional equity at Morgan Stanley gave him a front-row seat to how capital flows and where it gets stuck. He was the first to articulate the core problem that became UrgenC and leads investor relations, scoring methodology, and go-to-market strategy.
                </p>
              </div>
            </HoverCard>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-[700px] mx-auto px-6 text-center mt-24">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="font-normal mb-8"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "28px",
              color: "#0F172A",
            }}
          >
            Ready to be part of the story?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.06 }}
            className="flex flex-col items-center gap-4"
          >
            <Link
              href="/waitlist"
              className="inline-flex items-center gap-2 px-10 py-4 text-[16px] font-semibold text-white rounded-full transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                boxShadow: "0 6px 25px rgba(74, 108, 247, 0.35)",
              }}
            >
              Join the Waitlist &rarr;
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}
