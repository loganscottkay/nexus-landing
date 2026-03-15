"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

/* ---- Photo Enlarge Modal ---- */
interface FounderPhoto {
  src: string;
  name: string;
  subtitle: string;
}

function PhotoModal({ photo, onClose }: { photo: FounderPhoto | null; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (photo) {
      requestAnimationFrame(() => setVisible(true));
      const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    } else {
      setVisible(false);
    }
  }, [photo, onClose]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 250);
  }, [onClose]);

  if (!photo) return null;

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
        cursor: "pointer",
      }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        style={{
          position: "fixed",
          top: 24,
          right: 24,
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "none",
          color: "#fff",
          fontSize: 16,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 101,
        }}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Photo */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ cursor: "default" }}
      >
        <Image
          src={photo.src}
          alt={photo.name}
          width={280}
          height={280}
          className="rounded-full object-cover"
          style={{
            width: "min(280px, 60vw)",
            height: "min(280px, 60vw)",
            border: "4px solid rgba(255,255,255,0.8)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            transform: visible ? "scale(1)" : "scale(0.5)",
            opacity: visible ? 1 : 0,
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>

      {/* Name + subtitle */}
      <p
        style={{
          marginTop: 16,
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 20,
          fontWeight: 600,
          color: "#fff",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease 0.1s",
        }}
      >
        {photo.name}
      </p>
      <p
        style={{
          marginTop: 4,
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 14,
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease 0.15s",
        }}
      >
        {photo.subtitle}
      </p>
    </div>
  );
}

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
  const [enlargedPhoto, setEnlargedPhoto] = useState<FounderPhoto | null>(null);
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

    // Check which milestones the fill has reached
    const milestonePositions = milestones.map((_, i) => i / (milestones.length - 1));
    milestonePositions.forEach((pos, i) => {
      if (progress >= pos - 0.02) {
        setActivatedMilestones((prev) => {
          if (prev.has(i)) return prev;
          const next = new Set(prev);
          next.add(i);
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

  // Card mouse-follow glow handler
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  // Render a glassmorphic story card
  const renderCard = (milestone: typeof milestones[number], i: number, align: "left" | "right", isMobile?: boolean) => {
    const isRevealed = revealedCards.has(i) || reducedMotion;
    const isActivated = activatedMilestones.has(i) || reducedMotion;
    const isLeft = milestone.side === "left";

    const slideX = isMobile ? 25 : 40;
    const translateFrom = isLeft && !isMobile ? -slideX : slideX;

    return (
      <div
        className={`story-card${isRevealed ? " story-card--revealed" : ""}${isActivated ? " story-card--activated" : ""}`}
        onMouseMove={handleCardMouseMove}
        style={{
          maxWidth: isMobile ? "calc(100% - 40px)" : "420px",
          width: "100%",
          padding: isMobile ? "24px" : "32px",
          borderRadius: isMobile ? "16px" : "20px",
          textAlign: isMobile ? "left" : align,
          marginLeft: isMobile ? "32px" : undefined,
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed
            ? "translateX(0) scale(1)"
            : `translateX(${translateFrom}px) scale(0.97)`,
          transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
        }}
      >
        <h2
          className={`story-card__title font-normal ${isMobile ? "mb-2" : "mb-3"}`}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: isMobile ? "20px" : "24px",
            color: "#0F172A",
          }}
        >
          {milestone.title}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: isMobile ? "14px" : "15px",
            color: "#475569",
            lineHeight: 1.7,
          }}
        >
          {milestone.body}
        </p>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <PhotoModal photo={enlargedPhoto} onClose={() => setEnlargedPhoto(null)} />

      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#FAFAF9]" />
        {/* Subtle gradient orbs */}
        <div
          className="absolute rounded-full"
          style={{
            top: "8%",
            right: "10%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "45%",
            left: "5%",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(168,85,247,0.03) 0%, transparent 70%)",
          }}
        />
      </div>

      <main className="relative z-10 pt-[140px] pb-24">
        {/* Header */}
        <div className="max-w-[700px] mx-auto px-6 text-center mb-20">
          <div style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #A855F7)', margin: '0 auto 16px auto' }} />
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-[40px] md:text-[48px] font-normal mb-5"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
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

            {/* === BASE LINE (desktop) === */}
            <div
              className="absolute hidden md:block"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                top: 0,
                bottom: 0,
                width: "1.5px",
                background: "rgba(99,102,241,0.1)",
              }}
            />
            {/* === BASE LINE (mobile) === */}
            <div
              className="absolute md:hidden"
              style={{
                left: "20px",
                top: 0,
                bottom: 0,
                width: "1.5px",
                background: "rgba(99,102,241,0.1)",
              }}
            />

            {/* === SCROLL-FILL LINE (desktop) === */}
            <div
              className="absolute hidden md:block"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                top: 0,
                width: "1.5px",
                height: reducedMotion ? "100%" : `${scrollProgress * 100}%`,
                background: "linear-gradient(180deg, #6366F1, #8B5CF6, #A855F7)",
                boxShadow: "0 0 6px rgba(99,102,241,0.1)",
                transition: reducedMotion ? "none" : undefined,
                zIndex: 2,
              }}
            />
            {/* === SCROLL-FILL LINE (mobile) === */}
            <div
              className="absolute md:hidden"
              style={{
                left: "20px",
                transform: "translateX(-0.25px)",
                top: 0,
                width: "1.5px",
                height: reducedMotion ? "100%" : `${scrollProgress * 100}%`,
                background: "linear-gradient(180deg, #6366F1, #8B5CF6, #A855F7)",
                boxShadow: "0 0 6px rgba(99,102,241,0.1)",
                willChange: "height",
                zIndex: 2,
              }}
            />

            {/* === TRACING DOT (desktop) === */}
            {!reducedMotion && (
              <div
                className="absolute hidden md:block pointer-events-none"
                style={{
                  left: "50%",
                  top: `${scrollProgress * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366F1, #A855F7)",
                  boxShadow: "0 0 10px rgba(99,102,241,0.3)",
                  zIndex: 10,
                  willChange: "top",
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
                  transform: "translate(-50%, -50%)",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366F1, #A855F7)",
                  boxShadow: "0 0 10px rgba(99,102,241,0.3)",
                  zIndex: 10,
                  willChange: "top",
                }}
              />
            )}

            {/* === MILESTONES === */}
            <div className="flex flex-col" style={{ gap: "60px" }} >
              <style>{`@media (min-width: 768px) { .story-milestones-gap { gap: 100px !important; } }`}</style>
              {milestones.map((milestone, i) => {
                const isActivated = activatedMilestones.has(i) || reducedMotion;
                const isLeft = milestone.side === "left";
                return (
                  <div
                    key={milestone.title}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className="relative story-milestones-gap"
                  >
                    {/* === MILESTONE MARKER (desktop) === */}
                    <div
                      className={`story-milestone-marker absolute hidden md:block${isActivated ? " story-milestone-marker--active" : ""}`}
                      style={{
                        left: "50%",
                        top: "24px",
                        transform: "translate(-50%, -50%)",
                        zIndex: 5,
                      }}
                    />

                    {/* === MILESTONE MARKER (mobile) === */}
                    <div
                      className={`story-milestone-marker story-milestone-marker--mobile absolute md:hidden${isActivated ? " story-milestone-marker--active" : ""}`}
                      style={{
                        left: "20px",
                        top: "8px",
                        transform: "translate(-50%, 0)",
                        zIndex: 5,
                      }}
                    />

                    {/* === DESKTOP LAYOUT === */}
                    <div className="hidden md:flex items-start">
                      <div className="flex-1 flex justify-end" style={{ paddingRight: "60px" }}>
                        {isLeft && renderCard(milestone, i, "right")}
                      </div>
                      <div style={{ width: "1px" }} />
                      <div className="flex-1" style={{ paddingLeft: "60px" }}>
                        {!isLeft && renderCard(milestone, i, "left")}
                      </div>
                    </div>

                    {/* === MOBILE LAYOUT === */}
                    <div className="flex md:hidden">
                      {renderCard(milestone, i, "left", true)}
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
                    className="story-card h-full"
                    style={{
                      padding: "24px",
                      borderRadius: "20px",
                    }}
                    onMouseMove={handleCardMouseMove}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className="story-founder-photo-ring shrink-0 founder-photo-hover"
                        onClick={() => setEnlargedPhoto({ src: "/images/logan.webp", name: "Logan Kay", subtitle: "Co-Founder | AI Implementation @ Harvard Business School" })}
                        style={{ cursor: "pointer" }}
                      >
                        <Image
                          src="/images/logan.webp"
                          alt="Logan Kay"
                          width={80}
                          height={80}
                          className="rounded-full object-cover"
                          style={{ width: "80px", height: "80px" }}
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            fontFamily: "'Instrument Serif', serif",
                            fontSize: "22px",
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
                      Logan brings the technical firepower and operational rigor. He spearheaded AI implementation across admissions and operations at Harvard Business School and obsesses over making complex systems simple and accessible. He is the architect behind the UrgenC scoring engine and platform infrastructure. A natural communicator with a builder&#39;s instinct, Logan thrives at the intersection of product and people, translating founder pain points into features and turning cold conversations into warm relationships. He leads all product development, engineering, and growth strategy.
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
                    className="story-card h-full"
                    style={{
                      padding: "24px",
                      borderRadius: "20px",
                    }}
                    onMouseMove={handleCardMouseMove}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className="story-founder-photo-ring shrink-0 founder-photo-hover"
                        onClick={() => setEnlargedPhoto({ src: "/images/ben.jpeg", name: "Benjamin Matiash", subtitle: "Co-Founder | Institutional Equities @ Morgan Stanley" })}
                        style={{ cursor: "pointer" }}
                      >
                        <Image
                          src="/images/ben.jpeg"
                          alt="Benjamin Matiash"
                          width={80}
                          height={80}
                          className="rounded-full object-cover"
                          style={{ width: "80px", height: "80px" }}
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            fontFamily: "'Instrument Serif', serif",
                            fontSize: "22px",
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
                      Northeastern University | Institutional Equities @ Morgan Stanley
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
