"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const sectionFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const viewportConfig = { once: true, amount: 0.2 };

const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const storySections = [
  {
    title: "Where It Started",
    body: "We have been best friends since high school. The kind of friends who stay up until 3am talking about what we want to build someday. After graduation we both landed in Boston but took completely different paths. Logan studied Data Science and Hospitality at Boston University and went on to lead AI implementation at Harvard Business School. Ben studied Finance and Marketing at Northeastern and cut his teeth in institutional equity at Morgan Stanley. Different worlds. But every weekend we would meet up and brainstorm. We filled notebooks with startup ideas. We built spreadsheets. We argued about markets. For years, we were convinced the right idea was out there and we just had not found it yet.",
  },
  {
    title: "The Problem We Kept Hitting",
    body: "Every time we tried to break into the startup world, we hit the same walls. The VC ecosystem felt like a closed club. Networking events were awkward and unproductive. Cold emails disappeared into the void. We had ambition, skills, and capital to deploy but no way to connect with the founders actually building things. And we knew we were not alone. Everyone around us, classmates, coworkers, friends, was talking about startups and AI and feeling like they were missing the wave. People wanted in. They just did not know how.",
  },
  {
    title: "The Moment It Clicked",
    body: 'One night we were on our usual brainstorm and Ben said something that changed everything: the problem is not that we can not think of an idea. The problem is that the people with ideas and the people who want to back them literally can not find each other. That was it. We had been so focused on finding the perfect startup idea that we missed the meta-problem: the startup ecosystem itself was broken. Founders spend months fundraising instead of building. Investors miss great opportunities because they are outside the network. And everyone in between watches from the sidelines feeling like the barrier to entry is too high. So we stopped looking for the perfect idea and started building the infrastructure to connect ideas with the people who believe in them.',
  },
  {
    title: "What Nexus Is",
    body: "Nexus is a matching platform. Think of it like a dating app, but for startups and investors. Founders submit their pitch deck and a 60-second video elevator pitch. Every application gets scored through our proprietary holistic evaluation system, built with entrepreneurship faculty from Harvard Business School, Boston University, and Northeastern. Investors set their preferences and investment range. Our algorithm matches them by fit. When interest is mutual, we schedule a structured 20-minute chemistry call. No cold emails. No awkward networking. No gatekeeping. Just two people who are aligned, connected at the right time. The platform holds everyone accountable. Founders who do not gain traction get cycled out. Investors who ghost get removed. This keeps every match meaningful and every conversation between two serious people.",
  },
  {
    title: "Why Now",
    body: "There has never been a better time to start a company or invest in one. AI is lowering the barrier to building. Remote work means talent is everywhere. And there is a massive wave of people, from college students to professionals to retirees, who want to participate in the startup economy but feel locked out. Nexus is the door. We are not building another VC tool for insiders. We are building the platform that makes startup investing and founding accessible to anyone serious enough to show up. That is why we are starting with investments up to $25K matched with early-stage founders. The startup wave is here. Nexus makes sure you are not watching it from the sidelines.",
  },
];

export default function StoryPage() {
  return (
    <>
      <Navbar />

      {/* Atmospheric background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#FAFAF9]" />
        <div className="blob-1 blob-blue" style={{ top: "10%", left: "15%" }} />
        <div className="blob-2 blob-lavender" style={{ top: "40%", right: "10%" }} />
        <div className="blob-3 blob-peach" style={{ top: "70%", left: "30%" }} />
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
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto px-6 text-center mb-20"
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-[48px] font-normal mb-5"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Our Story
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-[18px] leading-[1.7]"
            style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            How two best friends from high school ended up building the platform they wished existed.
          </motion.p>
        </motion.div>

        {/* Story sections */}
        <div className="max-w-[800px] mx-auto px-6 flex flex-col gap-10">
          {storySections.map((section, i) => (
            <motion.div
              key={section.title}
              variants={sectionFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              transition={{ duration: 0.6, ease, delay: i * 0.05 }}
              className="glass p-8 md:p-10"
            >
              <h2
                className="text-[28px] font-normal mb-5"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {section.title}
              </h2>
              <p
                className="text-[15px] leading-[1.85]"
                style={{ color: "#475569", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {section.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Meet the Founders */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="max-w-[800px] mx-auto px-6 mt-16"
        >
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-[32px] font-normal text-center mb-10"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Meet the Founders
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Logan */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="glass p-7"
            >
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-[18px] font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
                >
                  LK
                </div>
                <div>
                  <p className="text-[22px] font-semibold text-text-primary">Logan Kay</p>
                  <p className="text-[15px] text-text-muted">Co-Founder</p>
                  <p className="text-[14px] text-text-muted mt-0.5">
                    Boston University | Data Science &amp; Hospitality | AI &amp; Ops @ Harvard Business School
                  </p>
                </div>
              </div>
              <p
                className="text-[15px] leading-[1.8]"
                style={{ color: "#475569", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Logan brings the technical firepower and operational rigor. From building AI systems at Harvard Business School to leading data-driven projects, he obsesses over making complex systems simple and accessible. He is the architect behind the Nexus scoring engine and platform infrastructure.
              </p>
            </motion.div>

            {/* Ben */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease }}
              className="glass p-7"
            >
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-[18px] font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg, #7C5CFC, #B06CFC)" }}
                >
                  BK
                </div>
                <div>
                  <p className="text-[22px] font-semibold text-text-primary">Ben Kay</p>
                  <p className="text-[15px] text-text-muted">Co-Founder</p>
                  <p className="text-[14px] text-text-muted mt-0.5">
                    Northeastern University | Finance &amp; Marketing | Institutional Equity @ Morgan Stanley
                  </p>
                </div>
              </div>
              <p
                className="text-[15px] leading-[1.8]"
                style={{ color: "#475569", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                Ben brings the financial acumen and investor perspective. His experience in institutional equity at Morgan Stanley gave him a front-row seat to how capital flows and where it gets stuck. He was the first to articulate the core problem that became Nexus: that the people with ideas and the people who want to back them have no efficient way to find each other. He leads investor relations, scoring methodology, and go-to-market strategy at Nexus.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="max-w-3xl mx-auto px-6 text-center mt-24"
        >
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="text-[32px] font-normal mb-8"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Ready to be part of the story?
          </motion.h2>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col items-center gap-4"
          >
            <Link
              href="/apply/startup"
              className="group btn-shimmer btn-hero-glow inline-flex items-center justify-center gap-2 px-10 py-[18px] text-[15px] md:text-[16px] font-semibold text-white rounded-2xl"
              style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
            >
              Apply for the Founding Cohort
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/apply/investor"
              className="text-[15px] font-medium transition-colors duration-200 hover:text-[#4A6CF7]"
              style={{ color: "#64748B" }}
            >
              Or apply as an investor
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
