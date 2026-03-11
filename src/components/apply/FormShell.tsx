"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const ease = [0.25, 0.4, 0.25, 1] as const;

/* ─── Progress Indicator ─── */
function Progress({
  total,
  current,
  labels,
}: {
  total: number;
  current: number;
  labels: string[];
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-center gap-0">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex items-center">
            {/* Circle */}
            <div
              className={`rounded-full transition-all duration-500 ${
                i < current
                  ? "w-3 h-3"
                  : i === current
                  ? "w-3.5 h-3.5"
                  : "w-3 h-3"
              }`}
              style={{
                background:
                  i <= current
                    ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)"
                    : "rgba(0,0,0,0.1)",
                boxShadow:
                  i === current
                    ? "0 0 0 4px rgba(74, 108, 247, 0.15)"
                    : "none",
              }}
            />
            {/* Connecting line */}
            {i < total - 1 && (
              <div className="w-10 md:w-16 h-0.5 mx-1 rounded-full overflow-hidden bg-black/[0.06]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: i < current ? "100%" : "0%",
                    background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-text-muted text-[13px] text-center mt-4">
        Step {current + 1} of {total} &middot; {labels[current]}
      </p>
    </div>
  );
}

/* ─── Animated Checkmark ─── */
function AnimatedCheckmark() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto mb-6">
      <defs>
        <linearGradient id="checkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4A6CF7" />
          <stop offset="100%" stopColor="#7C5CFC" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="40"
        cy="40"
        r="36"
        stroke="url(#checkGrad)"
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.path
        d="M24 40 L35 51 L56 30"
        stroke="url(#checkGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ─── Confetti ─── */
function Confetti() {
  const colors = ["#4A6CF7", "#7C5CFC", "#0d9488", "#D97706", "#059669"];
  const particles = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1.5,
    size: 4 + Math.random() * 4,
    color: colors[i % colors.length],
    drift: -20 + Math.random() * 40,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: `${p.x}%`,
            top: "-10px",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: [0, 0.8, 0.6, 0],
            y: [0, 200, 500, 800],
            x: [0, p.drift, p.drift * 1.5],
          }}
          transition={{
            duration: 3,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Confirmation ─── */
function Confirmation({ email }: { email: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease }}
      className="text-center py-4"
    >
      <Confetti />
      <AnimatedCheckmark />
      <h2
        className="text-[24px] md:text-[28px] font-normal text-text-primary mb-4"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Application Received
      </h2>
      <p className="text-text-secondary text-[16px] leading-[1.7] mb-8 max-w-md mx-auto">
        Thank you for applying to Urgenc. Our review team will evaluate your
        application within 48 hours. You will receive an email at{" "}
        <span className="font-medium text-text-primary">{email || "your address"}</span>{" "}
        with our decision.
      </p>

      <div
        className="rounded-xl p-6 text-left mb-8"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        }}
      >
        <p className="text-text-primary text-[16px] font-semibold mb-4">
          What happens next?
        </p>
        {[
          "Our team reviews your application (48 hours)",
          "If approved, you will receive an invite to create your profile",
          "Once your profile is complete, you will start receiving matches",
        ].map((item, i) => (
          <div key={i} className="flex gap-3 mb-3 last:mb-0">
            <span className="text-text-muted text-[15px] font-medium shrink-0">
              {i + 1}.
            </span>
            <span className="text-text-secondary text-[15px]">{item}</span>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="inline-block px-6 py-3 rounded-full text-[15px] font-medium text-text-secondary transition-all duration-250 hover:bg-black/[0.03]"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        Return to Home
      </Link>
    </motion.div>
  );
}

/* ─── Main FormShell ─── */
export default function FormShell({
  steps,
  stepLabels,
  getEmail,
}: {
  steps: ReactNode[];
  stepLabels: string[];
  getEmail: () => string;
}) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const total = steps.length;
  const isLast = current === total - 1;

  const next = () => {
    if (isLast) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 1500);
      return;
    }
    setDirection(1);
    setCurrent((c) => c + 1);
  };

  const back = () => {
    setDirection(-1);
    setCurrent((c) => Math.max(0, c - 1));
  };

  return (
    <main className="relative min-h-screen bg-base text-text-primary">
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 -top-[5%] right-[10%]" />
        <div className="blob blob-lavender animate-blob-2 top-[50%] -left-[5%]" />
        <div className="blob blob-peach animate-blob-3 bottom-[5%] right-[20%]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 md:pt-32 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-[620px] mx-auto rounded-3xl"
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(20px) saturate(1.2)",
            WebkitBackdropFilter: "blur(20px) saturate(1.2)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
          }}
        >
          <div className="p-8 md:p-12">
            {submitted ? (
              <Confirmation email={getEmail()} />
            ) : (
              <>
                <Progress
                  total={total}
                  current={current}
                  labels={stepLabels}
                />

                <div className="relative overflow-hidden min-h-[300px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, x: direction * 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction * -30 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      {steps[current]}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-10">
                  {current > 0 ? (
                    <button
                      onClick={back}
                      className="flex items-center gap-2 px-5 py-3 rounded-full text-[15px] font-medium text-text-secondary transition-all duration-250 hover:bg-black/[0.03]"
                      style={{
                        background: "rgba(255, 255, 255, 0.3)",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    onClick={next}
                    disabled={submitting}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 ${
                      isLast ? "px-8" : ""
                    }`}
                    style={{
                      background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                      boxShadow: isLast
                        ? "0 6px 25px rgba(74, 108, 247, 0.4)"
                        : "0 4px 15px rgba(74, 108, 247, 0.3)",
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isLast ? (
                      "Submit Application"
                    ) : (
                      <>
                        Continue
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

/* ─── Reusable Form Components ─── */

export function FormLabel({
  children,
  required,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-[14px] font-semibold text-text-primary mb-2">
      {children}
      {required && <span className="text-accent-blue ml-0.5">*</span>}
    </label>
  );
}

export function TextInput({
  placeholder,
  prefix,
  suffix,
  value,
  onChange,
  type = "text",
  maxLength,
}: {
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-[16px]">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full h-[52px] rounded-xl text-[16px] text-text-primary placeholder:text-text-muted outline-none transition-all duration-200"
        style={{
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          paddingLeft: prefix ? "32px" : "16px",
          paddingRight: suffix ? "40px" : "16px",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(74, 108, 247, 0.5)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74, 108, 247, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-[16px]">
          {suffix}
        </span>
      )}
    </div>
  );
}

export function TextArea({
  placeholder,
  value,
  onChange,
  maxLength,
  rows = 4,
}: {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
  rows?: number;
}) {
  const charColor =
    maxLength && value.length >= maxLength
      ? "#EF4444"
      : maxLength && value.length >= maxLength * 0.87
      ? "#D97706"
      : "#94A3B8";

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className="w-full rounded-xl text-[16px] text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 resize-y min-h-[120px] py-4"
        style={{
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(74, 108, 247, 0.5)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74, 108, 247, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      {maxLength && (
        <span className="absolute bottom-3 right-4 text-[12px]" style={{ color: charColor }}>
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  );
}

export function SelectInput({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[52px] rounded-xl text-[16px] text-text-primary outline-none transition-all duration-200 appearance-none cursor-pointer"
        style={{
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          paddingLeft: "16px",
          paddingRight: "40px",
          color: value ? "#0F172A" : "#94A3B8",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(74, 108, 247, 0.5)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74, 108, 247, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        width="16"
        height="16"
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
  );
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder,
}: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div>
      <div className="relative">
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) toggle(e.target.value);
          }}
          className="w-full h-[52px] rounded-xl text-[16px] outline-none transition-all duration-200 appearance-none cursor-pointer"
          style={{
            background: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            paddingLeft: "16px",
            paddingRight: "40px",
            color: "#94A3B8",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(74, 108, 247, 0.5)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74, 108, 247, 0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <option value="">{placeholder || "Select..."}</option>
          {options
            .filter((o) => !selected.includes(o))
            .map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
        </select>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          <AnimatePresence>
            {selected.map((s) => (
              <motion.button
                key={s}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => toggle(s)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] text-accent-blue bg-accent-blue/[0.08] border border-accent-blue/20 hover:bg-accent-blue/[0.12] transition-colors"
              >
                {s}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: ReactNode;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div
        className="w-5 h-5 rounded-lg shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200"
        style={{
          background: checked
            ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)"
            : "rgba(255, 255, 255, 0.3)",
          border: checked
            ? "none"
            : "2px solid rgba(0, 0, 0, 0.15)",
        }}
        onClick={(e) => {
          e.preventDefault();
          onChange(!checked);
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span
        className="text-[15px] text-text-secondary leading-[1.5]"
        onClick={() => onChange(!checked)}
      >
        {label}
      </span>
    </label>
  );
}

export function FileUpload({
  accept,
  maxSizeMB,
  label,
}: {
  accept: string;
  maxSizeMB: number;
  label: string;
}) {
  const [file, setFile] = useState<{ name: string; size: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFile = (f: File) => {
    setFile({ name: f.name, size: `${(f.size / 1024 / 1024).toFixed(1)} MB` });
    setUploading(true);
    setProgress(0);
    // Fake upload
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return p + 10;
      });
    }, 120);
  };

  const clear = () => {
    setFile(null);
    setProgress(0);
    setUploading(false);
  };

  if (file) {
    return (
      <div
        className="rounded-xl p-4 flex items-center gap-3"
        style={{
          background: "rgba(255, 255, 255, 0.3)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {!uploading && progress >= 100 && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            <span className="text-[14px] font-medium text-text-primary truncate">
              {file.name}
            </span>
            <span className="text-[12px] text-text-muted shrink-0">{file.size}</span>
          </div>
          {uploading && (
            <div className="h-1 rounded-full bg-black/[0.04] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
                }}
              />
            </div>
          )}
        </div>
        <button
          onClick={clear}
          className="text-text-muted hover:text-text-primary transition-colors shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <label
      className="flex flex-col items-center justify-center h-[140px] rounded-xl cursor-pointer transition-all duration-200 hover:border-accent-blue/30 hover:bg-accent-blue/[0.02]"
      style={{
        border: "2px dashed rgba(0, 0, 0, 0.12)",
      }}
    >
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      <span className="text-text-muted text-[15px] mt-2">{label}</span>
      <span className="text-text-muted/60 text-[12px] mt-1">
        Max {maxSizeMB}MB
      </span>
    </label>
  );
}
