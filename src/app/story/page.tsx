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
  const [activatedMilestones, setActivatedMilestones] = useState<Set<number>>(new Set());
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const founderRef = useRef<HTMLDivElement>(null);
  const [foundersRevealed, setFoundersRevealed] = useState(false);
  const reducedMotion = useReducedMotion();
  const [dotPulsing, setDotPulsing] = useState<number | null>(null);

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

    // Check which milestones the fill has reached
    const milestonePositions = milestones.map((_, i) => i / (milestones.length - 1));
    milestonePositions.forEach((pos, i) => {
      if (progress >= pos - 0.02) {
        setActivatedMilestones((prev) => {
          if (prev.has(i)) return prev;
          const next = new Set(prev);
          next.add(i);
          // Trigger dot pulse
          setDotPulsing(i);
          setTimeout(() => setDotPulsing(null), 300);
          return next;
        });
      }
    });
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setScrollProgress(1);
      setActivatedMilestones(new Set([0, 1, 2, 3, 4]));
      setRevealedCards(new Set([0, 1, 2, 3, 4]));
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

  // IntersectionObserver for card reveals
  useEffect(() => {
    if (reducedMotion) return;

    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealedCards((prev) => new Set(prev).add(i));
          }
        },
        { threshold: 0.2, rootMargin: "-80px 0px" }
      );
      observer.observe(ref);
      observers.push(observer);
    });

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

  // Calculate dot position as percentage of timeline
  const dotScale = dotPulsing !== null ? 1.4 : 1;

  return (
    <>
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#FAFAF9]" />
        {/* Subtle gradient orbs */}
        <div
          className="absolute rounded-full"
          style={{
            top: "8%",
            right: "10%",
            width: "450px",
            height: "450px",
            background: "radial-gradient(circle, rgba(74,108,247,0.045) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "15%",
            left: "5%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(124,92,252,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <main className="relative z-10 pt-[140px] pb-24">
        {/* Header */}
        <div className="max-w-[700px] mx-auto px-6 text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-[40px] md:text-[48px] font-normal mb-5"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            className="text-[17px] leading-[1.7] max-w-[500px] mx-auto"
            style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            How two best friends decided to open the door to startup investing.
          </motion.p>
        </div>

        {/* Timeline section */}
        <div className="max-w-[960px] mx-auto px-6 relative">
          <div ref={timelineRef} className="relative" style={{ paddingTop: "40px", paddingBottom: "40px" }}>

            {/* === THE VERTICAL LINE (desktop) === */}
            <div
              className="absolute hidden md:block"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                top: 0,
                bottom: 0,
                width: "1px",
                background: "linear-gradient(to bottom, rgba(74,108,247,0.15) 0%, rgba(74,108,247,0.15) 92%, transparent 100%)",
              }}
            />
            {/* === THE VERTICAL LINE (mobile) === */}
            <div
              className="absolute md:hidden"
              style={{
                left: "20px",
                top: 0,
                bottom: 0,
                width: "1px",
                background: "linear-gradient(to bottom, rgba(74,108,247,0.15) 0%, rgba(74,108,247,0.15) 92%, transparent 100%)",
              }}
            />

            {/* === SCROLL-FILL LINE (desktop) === */}
            <div
              className="absolute hidden md:block"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                top: 0,
                width: "1px",
                height: reducedMotion ? "100%" : `${scrollProgress * 100}%`,
                background: "linear-gradient(180deg, #4A6CF7, #7C5CFC)",
                boxShadow: "0 0 8px rgba(74,108,247,0.15)",
                transition: reducedMotion ? "none" : undefined,
              }}
            />
            {/* === SCROLL-FILL LINE (mobile) === */}
            <div
              className="absolute md:hidden"
              style={{
                left: "20px",
                top: 0,
                width: "1px",
                height: reducedMotion ? "100%" : `${scrollProgress * 100}%`,
                background: "linear-gradient(180deg, #4A6CF7, #7C5CFC)",
                boxShadow: "0 0 8px rgba(74,108,247,0.15)",
              }}
            />

            {/* === TRACING DOT (desktop) === */}
            {!reducedMotion && (
              <div
                className="absolute hidden md:block pointer-events-none"
                style={{
                  left: "50%",
                  top: `${scrollProgress * 100}%`,
                  transform: `translate(-50%, -50%) scale(${dotScale})`,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                  border: "2px solid white",
                  boxShadow: "0 0 12px rgba(74,108,247,0.3)",
                  zIndex: 10,
                  willChange: "transform",
                  transition: "transform 0.3s ease",
                }}
              />
            )}
            {/* === TRACING DOT (mobile) === */}
            {!reducedMotion && (
              <div
                className="absolute md:hidden pointer-events-none"
                style={{
                  left: "20px",
                  top: `${scrollProgress * 100}%`,
                  transform: `translate(-50%, -50%) scale(${dotScale})`,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                  border: "2px solid white",
                  boxShadow: "0 0 12px rgba(74,108,247,0.3)",
                  zIndex: 10,
                  willChange: "transform",
                  transition: "transform 0.3s ease",
                }}
              />
            )}

            {/* === MILESTONES === */}
            <div className="flex flex-col" style={{ gap: "140px" }}>
              {milestones.map((milestone, i) => {
                const isActivated = activatedMilestones.has(i) || reducedMotion;
                const isRevealed = revealedCards.has(i) || reducedMotion;
                const isLeft = milestone.side === "left";
                // Calculate milestone position on the line (evenly spaced)
                return (
                  <div
                    key={milestone.title}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className="relative"
                  >
                    {/* === MILESTONE MARKER (desktop) === */}
                    <div
                      className="absolute hidden md:block"
                      style={{
                        left: "50%",
                        top: "24px",
                        transform: "translate(-50%, -50%)",
                        width: isActivated ? "8px" : "6px",
                        height: isActivated ? "8px" : "6px",
                        borderRadius: "50%",
                        background: isActivated
                          ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)"
                          : "rgba(74,108,247,0.2)",
                        border: isActivated ? "none" : "1px solid rgba(74,108,247,0.15)",
                        boxShadow: isActivated ? "0 0 10px rgba(74,108,247,0.2)" : "none",
                        transition: "all 0.4s ease",
                        zIndex: 5,
                      }}
                    />
                    {/* === MILESTONE MARKER (mobile) === */}
                    <div
                      className="absolute md:hidden"
                      style={{
                        left: "20px",
                        top: "8px",
                        transform: "translate(-50%, 0)",
                        width: isActivated ? "8px" : "6px",
                        height: isActivated ? "8px" : "6px",
                        borderRadius: "50%",
                        background: isActivated
                          ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)"
                          : "rgba(74,108,247,0.2)",
                        border: isActivated ? "none" : "1px solid rgba(74,108,247,0.15)",
                        boxShadow: isActivated ? "0 0 10px rgba(74,108,247,0.2)" : "none",
                        transition: "all 0.4s ease",
                        zIndex: 5,
                      }}
                    />

                    {/* === DESKTOP LAYOUT === */}
                    <div className="hidden md:flex items-start">
                      {/* Left side */}
                      <div className="flex-1 flex justify-end" style={{ paddingRight: "60px" }}>
                        {isLeft && (
                          <div
                            className="rounded-2xl transition-transform duration-300 hover:-translate-y-1"
                            style={{
                              maxWidth: "420px",
                              width: "100%",
                              padding: "28px",
                              background: "rgba(255, 255, 255, 0.6)",
                              backdropFilter: "blur(8px)",
                              WebkitBackdropFilter: "blur(8px)",
                              border: "1px solid rgba(0, 0, 0, 0.04)",
                              boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                              textAlign: "right",
                              opacity: isRevealed ? 1 : 0,
                              transform: isRevealed ? "translateY(0)" : "translateY(20px)",
                              transition: "opacity 0.5s ease-out, transform 0.5s ease-out, box-shadow 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)";
                            }}
                          >
                            <h2
                              className="font-normal mb-3"
                              style={{
                                fontFamily: "'Instrument Serif', serif",
                                fontSize: "22px",
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

                      {/* Center spacer for the line */}
                      <div style={{ width: "1px" }} />

                      {/* Right side */}
                      <div className="flex-1" style={{ paddingLeft: "60px" }}>
                        {!isLeft && (
                          <div
                            className="rounded-2xl transition-transform duration-300 hover:-translate-y-1"
                            style={{
                              maxWidth: "420px",
                              width: "100%",
                              padding: "28px",
                              background: "rgba(255, 255, 255, 0.6)",
                              backdropFilter: "blur(8px)",
                              WebkitBackdropFilter: "blur(8px)",
                              border: "1px solid rgba(0, 0, 0, 0.04)",
                              boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                              textAlign: "left",
                              opacity: isRevealed ? 1 : 0,
                              transform: isRevealed ? "translateY(0)" : "translateY(20px)",
                              transition: "opacity 0.5s ease-out, transform 0.5s ease-out, box-shadow 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)";
                            }}
                          >
                            <h2
                              className="font-normal mb-3"
                              style={{
                                fontFamily: "'Instrument Serif', serif",
                                fontSize: "22px",
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

                    {/* === MOBILE LAYOUT === */}
                    <div className="flex md:hidden">
                      <div
                        style={{
                          marginLeft: "44px",
                          maxWidth: "calc(100% - 60px)",
                          padding: "20px",
                          background: "rgba(255, 255, 255, 0.6)",
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                          border: "1px solid rgba(0, 0, 0, 0.04)",
                          boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                          borderRadius: "16px",
                          opacity: isRevealed ? 1 : 0,
                          transform: isRevealed ? "translateY(0)" : "translateY(20px)",
                          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                        }}
                      >
                        <h2
                          className="font-normal mb-2"
                          style={{
                            fontFamily: "'Instrument Serif', serif",
                            fontSize: "22px",
                            color: "#0F172A",
                          }}
                        >
                          {milestone.title}
                        </h2>
                        <p
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "14px",
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
          </div>

          {/* === MEET THE FOUNDERS === */}
          <div
            ref={founderRef}
            style={{ marginTop: "80px" }}
          >
            <div
              className="text-center"
              style={{
                opacity: foundersRevealed ? 1 : 0,
                transform: foundersRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
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
                    className="rounded-2xl p-6 md:p-8 h-full"
                    style={{
                      background: "rgba(255, 255, 255, 0.6)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid rgba(0, 0, 0, 0.04)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
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
                    className="rounded-2xl p-6 md:p-8 h-full"
                    style={{
                      background: "rgba(255, 255, 255, 0.6)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid rgba(0, 0, 0, 0.04)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
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
              <div style={{ marginTop: "40px" }}>
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

        {/* Bottom spacing */}
        <div style={{ height: "60px" }} />
      </main>
    </>
  );
}
