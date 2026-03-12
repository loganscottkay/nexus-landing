"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waitlistNumber, setWaitlistNumber] = useState(0);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [problem, setProblem] = useState("");
  const [stage, setStage] = useState("");
  const [school, setSchool] = useState("");

  // Touched state for validation on blur
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Clipboard tooltip
  const [copied, setCopied] = useState(false);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const allValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    isValidEmail(email) &&
    oneLiner.trim() !== "" &&
    problem.trim() !== "" &&
    stage !== "";

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;
    setLoading(true);
    setWaitlistNumber(Math.floor(Math.random() * (412 - 347 + 1)) + 347);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const copyLink = () => {
    navigator.clipboard.writeText("https://urgenc.com/waitlist");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const tweetText = encodeURIComponent(
    "Just joined the @urgenc waitlist. Think Tinder but for startups and investors. Check it out \u2192 urgenc.com"
  );

  const ease = [0.25, 0.4, 0.25, 1] as const;

  const inputClass =
    "w-full h-[44px] md:h-[48px] rounded-xl px-4 text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition-all duration-200";
  const inputStyle = (field: string, hasError: boolean) => ({
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(8px)",
    border: hasError
      ? "1px solid #EF4444"
      : "1px solid rgba(0, 0, 0, 0.08)",
    fontFamily: "var(--font-dm-sans), sans-serif",
    boxShadow: "none",
  });

  const labelClass = "block text-[14px] font-semibold text-[#0F172A] mb-1.5";

  return (
    <>
      <head>
        <title>Join the Waitlist | UrgenC</title>
        <meta
          name="description"
          content="Join the UrgenC founding cohort. Tell us your startup idea in 60 seconds. No pitch deck needed."
        />
      </head>

      <main className="relative min-h-screen bg-base text-text-primary">
        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Background gradient blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full opacity-[0.12]"
            style={{
              background:
                "radial-gradient(circle, rgba(74,108,247,0.4) 0%, rgba(124,92,252,0.2) 40%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.1]"
            style={{
              background:
                "radial-gradient(circle, rgba(124,92,252,0.4) 0%, rgba(74,108,247,0.2) 40%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <Navbar />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-28 pb-20 px-4">
          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="w-full max-w-[560px] rounded-2xl md:rounded-3xl p-6 sm:p-10 relative overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              border: "1px solid rgba(0, 0, 0, 0.06)",
            }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Eyebrow */}
                  <p
                    className="text-[11px] tracking-[3px] uppercase font-medium mb-3"
                    style={{
                      background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    FOUNDING COHORT
                  </p>

                  {/* Title */}
                  <h1
                    className="text-[36px] font-normal text-[#0F172A] mb-3"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    Join the Waitlist
                  </h1>

                  {/* Subtitle */}
                  <p
                    className="text-[16px] leading-[1.7] mb-8 max-w-[460px]"
                    style={{
                      color: "#64748B",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    Tell us your idea in 60 seconds or less. No pitch deck
                    needed. No video. Just you and your idea. If it is good, we
                    will be in touch.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name */}
                    <div>
                      <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => handleBlur("name")}
                        placeholder="Full name"
                        className={inputClass}
                        style={inputStyle(
                          "name",
                          touched.name === true && name.trim() === ""
                        )}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(74, 108, 247, 0.5)";
                          e.target.style.boxShadow = "0 0 0 3px rgba(74, 108, 247, 0.08)";
                        }}
                        onBlurCapture={(e) => {
                          if (touched.name && name.trim() === "") {
                            e.target.style.borderColor = "#EF4444";
                          } else {
                            e.target.style.borderColor = "rgba(0, 0, 0, 0.08)";
                          }
                          e.target.style.boxShadow = "none";
                        }}
                      />
                      <ValidationMessage
                        show={touched.name === true && name.trim() === ""}
                        message="Required"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleBlur("email")}
                        placeholder="you@email.com"
                        className={inputClass}
                        style={inputStyle(
                          "email",
                          touched.email === true &&
                            (email.trim() === "" || !isValidEmail(email))
                        )}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(74, 108, 247, 0.5)";
                          e.target.style.boxShadow = "0 0 0 3px rgba(74, 108, 247, 0.08)";
                        }}
                        onBlurCapture={(e) => {
                          if (
                            touched.email &&
                            (email.trim() === "" || !isValidEmail(email))
                          ) {
                            e.target.style.borderColor = "#EF4444";
                          } else {
                            e.target.style.borderColor = "rgba(0, 0, 0, 0.08)";
                          }
                          e.target.style.boxShadow = "none";
                        }}
                      />
                      <ValidationMessage
                        show={touched.email === true && email.trim() === ""}
                        message="Required"
                      />
                      <ValidationMessage
                        show={
                          touched.email === true &&
                          email.trim() !== "" &&
                          !isValidEmail(email)
                        }
                        message="Please enter a valid email"
                      />
                    </div>

                    {/* One Liner */}
                    <div>
                      <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        Your Startup in One Sentence
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={oneLiner}
                          onChange={(e) => {
                            if (e.target.value.length <= 100)
                              setOneLiner(e.target.value);
                          }}
                          onBlur={() => handleBlur("oneLiner")}
                          placeholder="We help [who] do [what] by [how]"
                          className={inputClass}
                          style={{
                            ...inputStyle(
                              "oneLiner",
                              touched.oneLiner === true &&
                                oneLiner.trim() === ""
                            ),
                            paddingRight: "60px",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "rgba(74, 108, 247, 0.5)";
                            e.target.style.boxShadow = "0 0 0 3px rgba(74, 108, 247, 0.08)";
                          }}
                          onBlurCapture={(e) => {
                            if (touched.oneLiner && oneLiner.trim() === "") {
                              e.target.style.borderColor = "#EF4444";
                            } else {
                              e.target.style.borderColor = "rgba(0, 0, 0, 0.08)";
                            }
                            e.target.style.boxShadow = "none";
                          }}
                        />
                        <span
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] tabular-nums font-medium"
                          style={{
                            color:
                              oneLiner.length >= 100
                                ? "#EF4444"
                                : oneLiner.length >= 80
                                ? "#F59E0B"
                                : "#94A3B8",
                          }}
                        >
                          {oneLiner.length}/100
                        </span>
                      </div>
                      <ValidationMessage
                        show={
                          touched.oneLiner === true &&
                          oneLiner.trim() === ""
                        }
                        message="Required"
                      />
                    </div>

                    {/* Problem */}
                    <div>
                      <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        What Problem Are You Solving?
                      </label>
                      <div className="relative">
                        <textarea
                          required
                          value={problem}
                          onChange={(e) => {
                            if (e.target.value.length <= 200)
                              setProblem(e.target.value);
                          }}
                          onBlur={() => handleBlur("problem")}
                          placeholder="Who has this problem and why does it matter?"
                          className="w-full h-[100px] rounded-xl px-4 py-3 text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition-all duration-200 resize-none"
                          style={{
                            ...inputStyle(
                              "problem",
                              touched.problem === true &&
                                problem.trim() === ""
                            ),
                            paddingRight: "60px",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "rgba(74, 108, 247, 0.5)";
                            e.target.style.boxShadow = "0 0 0 3px rgba(74, 108, 247, 0.08)";
                          }}
                          onBlurCapture={(e) => {
                            if (touched.problem && problem.trim() === "") {
                              e.target.style.borderColor = "#EF4444";
                            } else {
                              e.target.style.borderColor = "rgba(0, 0, 0, 0.08)";
                            }
                            e.target.style.boxShadow = "none";
                          }}
                        />
                        <span
                          className="absolute right-4 bottom-3 text-[12px] tabular-nums font-medium"
                          style={{
                            color:
                              problem.length >= 200
                                ? "#EF4444"
                                : problem.length >= 160
                                ? "#F59E0B"
                                : "#94A3B8",
                          }}
                        >
                          {problem.length}/200
                        </span>
                      </div>
                      <ValidationMessage
                        show={
                          touched.problem === true &&
                          problem.trim() === ""
                        }
                        message="Required"
                      />
                    </div>

                    {/* Stage */}
                    <div>
                      <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        Where Are You At?
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={stage}
                          onChange={(e) => setStage(e.target.value)}
                          onBlur={() => handleBlur("stage")}
                          className={`${inputClass} appearance-none cursor-pointer`}
                          style={{
                            ...inputStyle(
                              "stage",
                              touched.stage === true && stage === ""
                            ),
                            color: stage === "" ? "#94A3B8" : "#0F172A",
                            paddingRight: "40px",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "rgba(74, 108, 247, 0.5)";
                            e.target.style.boxShadow = "0 0 0 3px rgba(74, 108, 247, 0.08)";
                          }}
                          onBlurCapture={(e) => {
                            if (touched.stage && stage === "") {
                              e.target.style.borderColor = "#EF4444";
                            } else {
                              e.target.style.borderColor = "rgba(0, 0, 0, 0.08)";
                            }
                            e.target.style.boxShadow = "none";
                          }}
                        >
                          <option value="" disabled>
                            Select your stage
                          </option>
                          <option value="idea">Just an idea</option>
                          <option value="prototype">Built a prototype</option>
                          <option value="early-users">Have early users</option>
                          <option value="revenue">Generating revenue</option>
                        </select>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#94A3B8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      <ValidationMessage
                        show={touched.stage === true && stage === ""}
                        message="Required"
                      />
                    </div>

                    {/* School / Company */}
                    <div>
                      <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        School or Company{" "}
                        <span className="font-normal text-[#94A3B8]">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        placeholder="BU, Northeastern, MIT, Google, etc."
                        className={inputClass}
                        style={inputStyle("school", false)}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(74, 108, 247, 0.5)";
                          e.target.style.boxShadow = "0 0 0 3px rgba(74, 108, 247, 0.08)";
                        }}
                        onBlurCapture={(e) => {
                          e.target.style.borderColor = "rgba(0, 0, 0, 0.08)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={!allValid || loading}
                      className="relative w-full h-[52px] rounded-full text-[16px] font-semibold text-white overflow-hidden transition-all duration-200"
                      style={{
                        background:
                          allValid && !loading
                            ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)"
                            : "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                        opacity: allValid ? 1 : 0.5,
                        cursor: allValid ? "pointer" : "not-allowed",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        transform: "scale(1)",
                      }}
                      onMouseEnter={(e) => {
                        if (allValid && !loading) {
                          e.currentTarget.style.transform = "scale(1.02)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 30px rgba(74, 108, 247, 0.35)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Shimmer sweep */}
                      {allValid && !loading && (
                        <span className="btn-shimmer-sweep" />
                      )}
                      <span className="relative z-10">
                        {loading ? (
                          <span className="inline-flex items-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                          </span>
                        ) : (
                          "Join the Waitlist \u2192"
                        )}
                      </span>
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex flex-col items-center text-center py-4"
                >
                  {/* Animated checkmark */}
                  <AnimatedCheckmark />

                  <h2
                    className="text-[28px] font-normal text-[#0F172A] mt-6 mb-3"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    You are on the list.
                  </h2>

                  <p
                    className="text-[16px] leading-[1.7] mb-6 max-w-[400px]"
                    style={{
                      color: "#64748B",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    We review every submission personally. If your idea has
                    potential, you will hear from us within 5 business days.
                  </p>

                  <p
                    className="text-[20px] font-semibold mb-8"
                    style={{
                      background:
                        "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    Your position: #{waitlistNumber}
                  </p>

                  {/* Share buttons */}
                  <p
                    className="text-[14px] font-semibold text-[#0F172A] mb-3"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    Share UrgenC
                  </p>
                  <div className="flex items-center gap-3 mb-8">
                    {/* Twitter/X share */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                      style={{
                        background: "rgba(255, 255, 255, 0.4)",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#0F172A"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>

                    {/* Copy link */}
                    <div className="relative">
                      <button
                        onClick={copyLink}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                        style={{
                          background: "rgba(255, 255, 255, 0.4)",
                          border: "1px solid rgba(0, 0, 0, 0.08)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0F172A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {copied && (
                          <motion.span
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[12px] font-medium whitespace-nowrap px-2 py-1 rounded-md"
                            style={{
                              background: "#0F172A",
                              color: "#fff",
                            }}
                          >
                            Copied!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <Link
                    href="/"
                    className="text-[14px] font-medium transition-colors duration-200 hover:opacity-80"
                    style={{
                      color: "#4A6CF7",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    Return to Home &rarr;
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
            }}
            className="flex flex-wrap items-center justify-center gap-2 mt-8"
          >
            {[
              {
                text: "< 15% acceptance rate",
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4A6CF7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
              },
              {
                text: "Reviewed by real humans",
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4A6CF7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ),
              },
              {
                text: "100 startup spots in founding cohort",
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4A6CF7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease }}
                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 rounded-full text-[13px]"
                style={{
                  background: "rgba(255, 255, 255, 0.3)",
                  border: "1px solid rgba(0, 0, 0, 0.04)",
                  backdropFilter: "blur(8px)",
                  color: "#64748B",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
              >
                {item.icon}
                {item.text}
              </motion.div>
            ))}
          </motion.div>

          {/* Investor link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="mt-6 text-[14px]"
            style={{
              color: "#64748B",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            Looking to invest instead?{" "}
            <Link
              href="/apply/investor"
              className="font-medium transition-colors duration-200 hover:opacity-80"
              style={{ color: "#4A6CF7" }}
            >
              Apply as Investor
            </Link>
          </motion.p>
        </div>
      </main>
    </>
  );
}

/* ---- Validation Message ---- */
function ValidationMessage({
  show,
  message,
}: {
  show: boolean;
  message: string;
}) {
  return (
    <div
      className="overflow-hidden transition-all duration-200"
      style={{
        maxHeight: show ? "24px" : "0px",
        opacity: show ? 1 : 0,
      }}
    >
      <p
        className="text-[13px] mt-1"
        style={{ color: "#EF4444", fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        {message}
      </p>
    </div>
  );
}

/* ---- Animated Checkmark ---- */
function AnimatedCheckmark() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle
        cx="32"
        cy="32"
        r="28"
        stroke="url(#checkGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        style={{
          strokeDasharray: 176,
          strokeDashoffset: 176,
          animation: "drawCircle 0.5s ease-out forwards",
        }}
      />
      <polyline
        points="22,33 29,40 42,26"
        stroke="url(#checkGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 40,
          strokeDashoffset: 40,
          animation: "drawCheck 0.3s ease-out 0.7s forwards",
        }}
      />
      <defs>
        <linearGradient id="checkGrad" x1="0" y1="0" x2="64" y2="64">
          <stop stopColor="#4A6CF7" />
          <stop offset="1" stopColor="#7C5CFC" />
        </linearGradient>
      </defs>
      <style>{`
        @keyframes drawCircle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}
