"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

const milestones = [
  {
    year: "2018",
    title: "Where It Started",
    body: "Best friends since high school. Logan studied Hospitality and Data Science at BU. Benjamin studied Finance and Marketing at Northeastern. For years we brainstormed startup ideas every weekend and kept hitting the same wall.",
    side: "left" as const,
  },
  {
    year: "2020",
    title: "The Problem",
    body: "The startup world felt like a closed club. Cold emails went nowhere. Networking events were useless. And everyone around us felt the same FOMO.",
    side: "right" as const,
  },
  {
    year: "2024",
    title: "The Moment It Clicked",
    body: "One night Benjamin said it: the problem is not finding an idea. The problem is that founders and investors literally cannot find each other. That was the moment.",
    side: "left" as const,
  },
  {
    year: "2025",
    title: "What UrgenC Is",
    body: "A matching app. Founders pitch. Investors swipe. Matches lead to real calls. Think Tinder but for startup deals.",
    side: "right" as const,
  },
  {
    year: "2026",
    title: "Why Now",
    body: "AI is lowering the barrier to build. More people than ever want in. UrgenC is the door.",
    side: "left" as const,
  },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export default function StoryPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [revealedMilestones, setRevealedMilestones] = useState<Set<number>>(new Set());
  const [filledMilestones, setFilledMilestones] = useState<Set<number>>(new Set());
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const founderRef = useRef<HTMLDivElement>(null);
  const [foundersRevealed, setFoundersRevealed] = useState(false);
  const reducedMotion = useReducedMotion();

  // Scroll-driven progress for the timeline
  const updateScroll = useCallback(() => {
    const el = timelineRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const timelineTop = rect.top + window.scrollY;
    const timelineHeight = rect.height;
    const viewportMiddle = window.scrollY + window.innerHeight * 0.5;
    const progress = Math.max(0, Math.min(1, (viewportMiddle - timelineTop) / timelineHeight));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setScrollProgress(1);
      setRevealedMilestones(new Set([0, 1, 2, 3, 4]));
      setFilledMilestones(new Set([0, 1, 2, 3, 4]));
      setFoundersRevealed(true);
      return;
    }

    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(updateScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [updateScroll, reducedMotion]);

  // Intersection observer for milestone reveals
  useEffect(() => {
    if (reducedMotion) return;

    const observers: IntersectionObserver[] = [];

    milestoneRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealedMilestones((prev) => new Set(prev).add(i));
            // Fill the circle slightly after reveal
            setTimeout(() => {
              setFilledMilestones((prev) => new Set(prev).add(i));
            }, 200);
          }
        },
        { threshold: 0.3, rootMargin: "-50px 0px" }
      );
      observer.observe(ref);
      observers.push(observer);
    });

    // Founders section
    if (founderRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setFoundersRevealed(true);
        },
        { threshold: 0.2 }
      );
      observer.observe(founderRef.current);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [reducedMotion]);

  // Dot position in pixels relative to timeline
  const dotTop = timelineRef.current
    ? scrollProgress * timelineRef.current.clientHeight
    : 0;

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
        <div className="max-w-[700px] mx-auto px-6 text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 15, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 0.8, ease }}
            className="text-[40px] md:text-[48px] font-normal mb-5"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            className="text-[17px] leading-[1.7]"
            style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            How two best friends decided to open the door to startup investing.
          </motion.p>
        </div>

        {/* Timeline container */}
        <div className="max-w-[900px] mx-auto px-6 relative">
          <div ref={timelineRef} className="relative" style={{ paddingBottom: "40px" }}>
            {/* Timeline line (background - gray) */}
            <div
              className="absolute hidden md:block"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                top: 0,
                bottom: 0,
                width: "2px",
                background: "rgba(0,0,0,0.06)",
              }}
            />
            {/* Timeline line (mobile) */}
            <div
              className="absolute md:hidden"
              style={{
                left: "24px",
                top: 0,
                bottom: 0,
                width: "2px",
                background: "rgba(0,0,0,0.06)",
              }}
            />

            {/* Timeline line (filled - gradient) */}
            <div
              className="absolute hidden md:block"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                top: 0,
                width: "2px",
                height: reducedMotion ? "100%" : `${scrollProgress * 100}%`,
                background: "linear-gradient(180deg, #4A6CF7, #7C5CFC)",
                transition: reducedMotion ? "none" : "height 0.1s linear",
              }}
            />
            {/* Mobile filled line */}
            <div
              className="absolute md:hidden"
              style={{
                left: "24px",
                top: 0,
                width: "2px",
                height: reducedMotion ? "100%" : `${scrollProgress * 100}%`,
                background: "linear-gradient(180deg, #4A6CF7, #7C5CFC)",
                transition: reducedMotion ? "none" : "height 0.1s linear",
              }}
            />

            {/* Tracing dot (desktop) */}
            {!reducedMotion && (
              <div
                className="absolute hidden md:block"
                style={{
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  top: `${dotTop}px`,
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                  boxShadow: "0 0 20px rgba(74,108,247,0.4)",
                  zIndex: 10,
                  willChange: "transform",
                  animation: "dot-pulse 2s ease-in-out infinite",
                }}
              />
            )}
            {/* Tracing dot (mobile) */}
            {!reducedMotion && (
              <div
                className="absolute md:hidden"
                style={{
                  left: "24px",
                  transform: "translate(-50%, -50%)",
                  top: `${dotTop}px`,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                  boxShadow: "0 0 12px rgba(74,108,247,0.3)",
                  zIndex: 10,
                  willChange: "transform",
                  animation: "dot-pulse 2s ease-in-out infinite",
                }}
              />
            )}

            {/* Milestone sections */}
            <div className="flex flex-col" style={{ gap: "80px" }}>
              {milestones.map((milestone, i) => {
                const isRevealed = revealedMilestones.has(i) || reducedMotion;
                const isFilled = filledMilestones.has(i) || reducedMotion;
                const isLeft = milestone.side === "left";

                return (
                  <div
                    key={milestone.title}
                    ref={(el) => { milestoneRefs.current[i] = el; }}
                    className="relative"
                  >
                    {/* Desktop layout */}
                    <div className="hidden md:flex items-center" style={{ minHeight: "120px" }}>
                      {/* Left content */}
                      <div className="flex-1 flex justify-end pr-[60px]">
                        {isLeft && (
                          <div
                            className="max-w-[400px] w-full"
                            style={{
                              opacity: isRevealed ? 1 : 0,
                              transform: isRevealed ? "translateX(0)" : "translateX(-30px)",
                              transition: "all 0.5s ease",
                            }}
                          >
                            <span
                              className="text-[12px] font-medium mb-2 block"
                              style={{
                                background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                              }}
                            >
                              {milestone.year}
                            </span>
                            <h2
                              className="font-normal mb-3"
                              style={{
                                fontFamily: "'Instrument Serif', serif",
                                fontSize: "28px",
                                color: "#0F172A",
                              }}
                            >
                              {milestone.title}
                            </h2>
                            <p
                              style={{
                                fontFamily: "var(--font-dm-sans), sans-serif",
                                fontSize: "15px",
                                color: "#475569",
                                lineHeight: 1.7,
                              }}
                            >
                              {milestone.body}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Center: milestone circle + connector */}
                      <div className="relative flex items-center justify-center" style={{ width: "16px" }}>
                        <div
                          className="w-4 h-4 rounded-full border-2 shrink-0"
                          style={{
                            borderImage: "linear-gradient(135deg, #4A6CF7, #7C5CFC) 1",
                            borderStyle: "solid",
                            background: isFilled
                              ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)"
                              : "white",
                            borderRadius: "50%",
                            border: "2px solid",
                            borderColor: isFilled ? "transparent" : "#4A6CF7",
                            transition: "all 0.3s ease",
                            zIndex: 5,
                          }}
                        />
                        {/* Connector line left */}
                        {isLeft && (
                          <div
                            className="absolute right-full"
                            style={{
                              width: "40px",
                              height: "1px",
                              background: "linear-gradient(90deg, rgba(74,108,247,0.3), #4A6CF7)",
                              opacity: isRevealed ? 1 : 0,
                              transition: "opacity 0.3s ease",
                            }}
                          />
                        )}
                        {/* Connector line right */}
                        {!isLeft && (
                          <div
                            className="absolute left-full"
                            style={{
                              width: "40px",
                              height: "1px",
                              background: "linear-gradient(90deg, #4A6CF7, rgba(74,108,247,0.3))",
                              opacity: isRevealed ? 1 : 0,
                              transition: "opacity 0.3s ease",
                            }}
                          />
                        )}
                      </div>

                      {/* Right content */}
                      <div className="flex-1 pl-[60px]">
                        {!isLeft && (
                          <div
                            className="max-w-[400px] w-full"
                            style={{
                              opacity: isRevealed ? 1 : 0,
                              transform: isRevealed ? "translateX(0)" : "translateX(30px)",
                              transition: "all 0.5s ease",
                            }}
                          >
                            <span
                              className="text-[12px] font-medium mb-2 block"
                              style={{
                                background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                              }}
                            >
                              {milestone.year}
                            </span>
                            <h2
                              className="font-normal mb-3"
                              style={{
                                fontFamily: "'Instrument Serif', serif",
                                fontSize: "28px",
                                color: "#0F172A",
                              }}
                            >
                              {milestone.title}
                            </h2>
                            <p
                              style={{
                                fontFamily: "var(--font-dm-sans), sans-serif",
                                fontSize: "15px",
                                color: "#475569",
                                lineHeight: 1.7,
                              }}
                            >
                              {milestone.body}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mobile layout: all content on right */}
                    <div className="flex md:hidden items-start gap-0">
                      {/* Milestone circle */}
                      <div className="relative flex items-start justify-center shrink-0" style={{ width: "48px", paddingTop: "4px" }}>
                        <div
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{
                            background: isFilled
                              ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)"
                              : "white",
                            border: "2px solid",
                            borderColor: isFilled ? "transparent" : "#4A6CF7",
                            transition: "all 0.3s ease",
                            position: "absolute",
                            left: "18px",
                            zIndex: 5,
                          }}
                        />
                        {/* Connector */}
                        <div
                          className="absolute"
                          style={{
                            left: "31px",
                            top: "8px",
                            width: "17px",
                            height: "1px",
                            background: "linear-gradient(90deg, #4A6CF7, rgba(74,108,247,0.3))",
                            opacity: isRevealed ? 1 : 0,
                            transition: "opacity 0.3s ease",
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div
                        className="flex-1"
                        style={{
                          opacity: isRevealed ? 1 : 0,
                          transform: isRevealed ? "translateX(0)" : "translateX(20px)",
                          transition: "all 0.5s ease",
                        }}
                      >
                        <span
                          className="text-[12px] font-medium mb-1.5 block"
                          style={{
                            background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {milestone.year}
                        </span>
                        <h2
                          className="font-normal mb-2"
                          style={{
                            fontFamily: "'Instrument Serif', serif",
                            fontSize: "24px",
                            color: "#0F172A",
                          }}
                        >
                          {milestone.title}
                        </h2>
                        <p
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "15px",
                            color: "#475569",
                            lineHeight: 1.7,
                          }}
                        >
                          {milestone.body}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Milestone 6: Meet the Founders (full width, centered) */}
            <div
              ref={founderRef}
              className="relative mt-20 md:mt-[120px]"
            >
              {/* Desktop milestone circle */}
              <div className="hidden md:flex justify-center mb-10 relative">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: foundersRevealed
                      ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)"
                      : "white",
                    border: "2px solid",
                    borderColor: foundersRevealed ? "transparent" : "#4A6CF7",
                    transition: "all 0.3s ease",
                    zIndex: 5,
                  }}
                />
              </div>

              {/* Mobile milestone circle */}
              <div className="flex md:hidden mb-6 relative">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: foundersRevealed
                      ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)"
                      : "white",
                    border: "2px solid",
                    borderColor: foundersRevealed ? "transparent" : "#4A6CF7",
                    transition: "all 0.3s ease",
                    position: "absolute",
                    left: "18px",
                    zIndex: 5,
                  }}
                />
              </div>

              <div
                className="text-center"
                style={{
                  opacity: foundersRevealed ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              >
                <h2
                  className="font-normal mb-10"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "32px",
                    color: "#0F172A",
                  }}
                >
                  Meet the Founders
                </h2>

                <div
                  className="grid md:grid-cols-2 items-stretch max-w-[700px] mx-auto"
                  style={{ gap: "20px" }}
                >
                  {/* Logan */}
                  <div
                    style={{
                      opacity: foundersRevealed ? 1 : 0,
                      transform: foundersRevealed ? "scale(1)" : "scale(0.95)",
                      transition: "all 0.5s ease 0.1s",
                    }}
                  >
                    <div
                      className="rounded-xl md:rounded-2xl p-6 md:p-8 h-full"
                      style={{
                        background: "rgba(255, 255, 255, 0.5)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(0, 0, 0, 0.06)",
                      }}
                    >
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
                          textAlign: "left",
                        }}
                      >
                        Logan brings the technical firepower and operational rigor. He spearheaded AI implementation across admissions and operations at Harvard Business School and obsesses over making complex systems simple and accessible. He is the architect behind the UrgenC scoring engine and platform infrastructure.
                      </p>
                    </div>
                  </div>

                  {/* Benjamin */}
                  <div
                    style={{
                      opacity: foundersRevealed ? 1 : 0,
                      transform: foundersRevealed ? "scale(1)" : "scale(0.95)",
                      transition: "all 0.5s ease 0.2s",
                    }}
                  >
                    <div
                      className="rounded-xl md:rounded-2xl p-6 md:p-8 h-full"
                      style={{
                        background: "rgba(255, 255, 255, 0.5)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(0, 0, 0, 0.06)",
                      }}
                    >
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
                          textAlign: "left",
                        }}
                      >
                        Benjamin brings the financial acumen and investor perspective. His experience in institutional equity at Morgan Stanley gave him a front-row seat to how capital flows and where it gets stuck. He was the first to articulate the core problem that became UrgenC and leads investor relations, scoring methodology, and go-to-market strategy.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-12">
                  <Link
                    href="/waitlist"
                    className="inline-flex items-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-white rounded-full transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                      boxShadow: "0 6px 25px rgba(74, 108, 247, 0.35)",
                    }}
                  >
                    Join the Waitlist &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Dot pulse animation */}
      <style jsx global>{`
        @keyframes dot-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
      `}</style>
    </>
  );
}
