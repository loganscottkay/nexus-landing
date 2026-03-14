"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import UnicornAnimation from "@/components/UnicornAnimation";
import LottieAnimation from "@/components/LottieAnimation";

const ease = [0.25, 0.4, 0.25, 1] as const;

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");

  // Touched state for validation on blur
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Clipboard tooltip
  const [copied, setCopied] = useState(false);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const allValid =
    name.trim() !== "" &&
    phone.trim() !== "" &&
    email.trim() !== "" &&
    isValidEmail(email) &&
    interest !== "";

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;
    setLoading(true);
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

  const inputBase =
    "w-full h-[52px] md:h-[56px] rounded-2xl px-5 text-[16px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition-all duration-200";
  const getInputStyle = (hasError: boolean) => ({
    background: "rgba(255, 255, 255, 0.8)",
    border: hasError
      ? "1px solid #EF4444"
      : "1px solid rgba(0, 0, 0, 0.08)",
    fontFamily: "var(--font-dm-sans), sans-serif",
    boxShadow: "none",
  });

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#4A6CF7";
    e.target.style.boxShadow = "0 0 0 3px rgba(74, 108, 247, 0.1)";
    e.target.style.background = "#FFFFFF";
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>, hasError: boolean) => {
    e.target.style.borderColor = hasError ? "#EF4444" : "rgba(0, 0, 0, 0.08)";
    e.target.style.boxShadow = "none";
    e.target.style.background = "rgba(255, 255, 255, 0.8)";
  };

  return (
    <>
      <head>
        <title>Join the Waitlist | UrgenC</title>
        <meta
          name="description"
          content="Be first to know when UrgenC launches. Drop your info and we will notify you."
        />
      </head>

      <main className="relative min-h-screen bg-[#FAFAF9] text-text-primary">
        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Background gradient blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="blob blob-blue animate-blob-1" style={{ top: "-5%", right: "10%" }} />
          <div className="blob blob-lavender animate-blob-2" style={{ top: "40%", left: "-5%" }} />
          <div className="blob blob-peach animate-blob-3" style={{ bottom: "10%", right: "20%" }} />
        </div>

        <Navbar />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center min-h-screen pt-32 md:pt-40 pb-20 px-4">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-[11px] tracking-[3px] uppercase font-medium mb-5"
            style={{
              background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            BE FIRST TO KNOW
          </motion.p>

          {/* Headline */}
          <div style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #A855F7)', margin: '0 auto 16px auto' }} />
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease }}
            className="text-[36px] md:text-[48px] font-normal text-center mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Get <span className="gradient-text">Early Access.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7, ease }}
            className="text-[17px] md:text-[18px] text-center mb-10 max-w-[500px] leading-[1.7]"
            style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            UrgenC is launching soon. Drop your info and be the first to know when we go live.
          </motion.p>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9, ease }}
            className="w-full max-w-[480px] rounded-3xl p-6 md:p-10 relative overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(40px) saturate(1.3)",
              WebkitBackdropFilter: "blur(40px) saturate(1.3)",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.06)",
            }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: "20px" }}>
                    {/* Name */}
                    <div>
                      <label
                        className="block text-[14px] font-semibold text-[#0F172A] mb-2"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => handleBlur("name")}
                        placeholder="Full name"
                        className={inputBase}
                        style={getInputStyle(touched.name === true && name.trim() === "")}
                        onFocus={handleFocus}
                        onBlurCapture={(e) => handleInputBlur(e, !!(touched.name && name.trim() === ""))}
                      />
                      <ValidationMessage
                        show={touched.name === true && name.trim() === ""}
                        message="Required"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        className="block text-[14px] font-semibold text-[#0F172A] mb-2"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        placeholder="(555) 123-4567"
                        className={inputBase}
                        style={getInputStyle(touched.phone === true && phone.trim() === "")}
                        onFocus={handleFocus}
                        onBlurCapture={(e) => handleInputBlur(e, !!(touched.phone && phone.trim() === ""))}
                      />
                      <ValidationMessage
                        show={touched.phone === true && phone.trim() === ""}
                        message="Required"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        className="block text-[14px] font-semibold text-[#0F172A] mb-2"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleBlur("email")}
                        placeholder="you@email.com"
                        className={inputBase}
                        style={getInputStyle(
                          touched.email === true &&
                            (email.trim() === "" || !isValidEmail(email))
                        )}
                        onFocus={handleFocus}
                        onBlurCapture={(e) =>
                          handleInputBlur(
                            e,
                            !!(touched.email && (email.trim() === "" || !isValidEmail(email)))
                          )
                        }
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

                    {/* Interest */}
                    <div>
                      <label
                        className="block text-[14px] font-semibold text-[#0F172A] mb-2"
                        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                      >
                        I am interested in...
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={interest}
                          onChange={(e) => setInterest(e.target.value)}
                          onBlur={() => handleBlur("interest")}
                          className={`${inputBase} appearance-none cursor-pointer`}
                          style={{
                            ...getInputStyle(touched.interest === true && interest === ""),
                            color: interest === "" ? "#94A3B8" : "#0F172A",
                            paddingRight: "44px",
                          }}
                          onFocus={handleFocus}
                          onBlurCapture={(e) => handleInputBlur(e, !!(touched.interest && interest === ""))}
                        >
                          <option value="" disabled>
                            Select one
                          </option>
                          <option value="startup">The Startup Side</option>
                          <option value="investor">The Investor Side</option>
                          <option value="both">Both</option>
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
                          className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      <ValidationMessage
                        show={touched.interest === true && interest === ""}
                        message="Required"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={!allValid || loading}
                      className="relative w-full h-[52px] md:h-[56px] rounded-2xl text-[16px] font-semibold text-white overflow-hidden transition-all duration-200"
                      style={{
                        background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                        opacity: allValid ? 1 : 0.5,
                        cursor: allValid ? "pointer" : "not-allowed",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        transform: "scale(1)",
                      }}
                      onMouseEnter={(e) => {
                        if (allValid && !loading) {
                          e.currentTarget.style.transform = "scale(1.02)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 30px rgba(74, 108, 247, 0.3)";
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
                  className="flex flex-col items-center text-center py-6"
                >
                  {/* Animated checkmark */}
                  <div className="lottie-brand w-[60px] h-[60px] md:w-[80px] md:h-[80px]">
                    <LottieAnimation
                      src="/animations/success-check.json"
                      loop={false}
                      autoplay={true}
                    />
                  </div>

                  <h2
                    className="text-[28px] md:text-[32px] font-normal text-[#0F172A] mt-6 mb-3"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    You are on the list.
                  </h2>

                  <p
                    className="text-[16px] leading-[1.7] mb-8 max-w-[360px]"
                    style={{
                      color: "#64748B",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    We will notify you the moment UrgenC goes live.
                  </p>

                  {/* Share buttons */}
                  <div className="flex items-center gap-3 mb-8">
                    {/* Twitter/X share */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 h-[40px] px-4 rounded-full text-[13px] font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        background: "rgba(255, 255, 255, 0.5)",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        backdropFilter: "blur(8px)",
                        color: "#0F172A",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#0F172A">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      Share on X
                    </a>

                    {/* Copy link */}
                    <div className="relative">
                      <button
                        onClick={copyLink}
                        className="inline-flex items-center gap-2 h-[40px] px-4 rounded-full text-[13px] font-medium transition-all duration-200 hover:scale-105"
                        style={{
                          background: "rgba(255, 255, 255, 0.5)",
                          border: "1px solid rgba(0, 0, 0, 0.08)",
                          backdropFilter: "blur(8px)",
                          color: "#0F172A",
                          fontFamily: "var(--font-dm-sans), sans-serif",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                        </svg>
                        Copy Link
                      </button>
                      <AnimatePresence>
                        {copied && (
                          <motion.span
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[12px] font-medium whitespace-nowrap px-2 py-1 rounded-md"
                            style={{ background: "#0F172A", color: "#fff" }}
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
                    Back to Home &rarr;
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Social proof line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.1, ease }}
            className="flex items-center gap-2.5 mt-8"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)" }}
            />
            <p
              className="text-[14px]"
              style={{ color: "#64748B", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Join 400+ founders and investors on the waitlist
            </p>
          </motion.div>
        </div>

        {/* Unicorn arc animation */}
        <UnicornAnimation />
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
        className="text-[13px] mt-1.5"
        style={{ color: "#EF4444", fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        {message}
      </p>
    </div>
  );
}


