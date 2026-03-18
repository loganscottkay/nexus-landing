"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// ---- Configuration ----
const FAKE_TYPING_SPEED = 50;
const FAKE_DELETING_SPEED = 25;
const FAKE_PAUSE_AFTER_TYPE = 800;
const FINAL_TYPING_SPEED = 80;
const PAUSE_BETWEEN_SENTENCES = 500;
const CURSOR_BLINK_INTERVAL = 500;

// Each fake sentence + how many characters to cut off early
const FAKE_SENTENCES: { text: string; cutoff: number }[] = [
  { text: "It's all about who you know.", cutoff: 3 },
  { text: "Just send more cold emails.", cutoff: 3 },
  { text: "There's no way my startup could find an investor.", cutoff: 4 },
];

const FINAL_SENTENCE =
  "The startup world is drowning in ideas. The current problem is not creating. It\u2019s how to prove your idea to the right investors.";

// Character ranges in FINAL_SENTENCE that should be accent-colored
// "your idea" and "right investors"
const ACCENT_RANGES: [number, number][] = (() => {
  const ranges: [number, number][] = [];
  const idx1 = FINAL_SENTENCE.indexOf("your idea");
  if (idx1 !== -1) ranges.push([idx1, idx1 + "your idea".length]);
  const idx2 = FINAL_SENTENCE.indexOf("right investors");
  if (idx2 !== -1) ranges.push([idx2, idx2 + "right investors".length]);
  return ranges;
})();

function isAccentChar(index: number): boolean {
  return ACCENT_RANGES.some(([start, end]) => index >= start && index < end);
}

type Phase =
  | { kind: "typing-fake"; sentenceIdx: number; charIdx: number }
  | { kind: "pause-after-fake"; sentenceIdx: number }
  | { kind: "deleting-fake"; sentenceIdx: number; charIdx: number }
  | { kind: "pause-between"; nextSentenceIdx: number }
  | { kind: "typing-final"; charIdx: number }
  | { kind: "done"; cursorBlinksLeft: number }
  | { kind: "finished" };

export default function TypewriterQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasStarted = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [displayText, setDisplayText] = useState("");
  const [isFinal, setIsFinal] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const phaseRef = useRef<Phase>({ kind: "typing-fake", sentenceIdx: 0, charIdx: 0 });

  // Cursor blink
  useEffect(() => {
    if (!showCursor) return;
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, CURSOR_BLINK_INTERVAL);
    return () => clearInterval(interval);
  }, [showCursor]);

  const tick = useCallback(() => {
    const phase = phaseRef.current;

    switch (phase.kind) {
      case "typing-fake": {
        const { text, cutoff } = FAKE_SENTENCES[phase.sentenceIdx];
        const maxChars = text.length - cutoff;
        const nextChar = phase.charIdx + 1;
        setDisplayText(text.slice(0, nextChar));
        if (nextChar >= maxChars) {
          phaseRef.current = { kind: "pause-after-fake", sentenceIdx: phase.sentenceIdx };
          timerRef.current = setTimeout(tick, FAKE_PAUSE_AFTER_TYPE);
        } else {
          phaseRef.current = { kind: "typing-fake", sentenceIdx: phase.sentenceIdx, charIdx: nextChar };
          timerRef.current = setTimeout(tick, FAKE_TYPING_SPEED);
        }
        break;
      }

      case "pause-after-fake": {
        const { text, cutoff } = FAKE_SENTENCES[phase.sentenceIdx];
        const maxChars = text.length - cutoff;
        phaseRef.current = { kind: "deleting-fake", sentenceIdx: phase.sentenceIdx, charIdx: maxChars - 1 };
        timerRef.current = setTimeout(tick, FAKE_DELETING_SPEED);
        break;
      }

      case "deleting-fake": {
        const nextChar = phase.charIdx - 1;
        const { text } = FAKE_SENTENCES[phase.sentenceIdx];
        setDisplayText(text.slice(0, nextChar + 1));
        if (nextChar < 0) {
          setDisplayText("");
          const nextIdx = phase.sentenceIdx + 1;
          if (nextIdx < FAKE_SENTENCES.length) {
            phaseRef.current = { kind: "pause-between", nextSentenceIdx: nextIdx };
          } else {
            phaseRef.current = { kind: "pause-between", nextSentenceIdx: -1 }; // signals final
          }
          timerRef.current = setTimeout(tick, PAUSE_BETWEEN_SENTENCES);
        } else {
          phaseRef.current = { kind: "deleting-fake", sentenceIdx: phase.sentenceIdx, charIdx: nextChar };
          timerRef.current = setTimeout(tick, FAKE_DELETING_SPEED);
        }
        break;
      }

      case "pause-between": {
        if (phase.nextSentenceIdx === -1) {
          setIsFinal(true);
          phaseRef.current = { kind: "typing-final", charIdx: 0 };
          timerRef.current = setTimeout(tick, FINAL_TYPING_SPEED);
        } else {
          phaseRef.current = { kind: "typing-fake", sentenceIdx: phase.nextSentenceIdx, charIdx: 0 };
          timerRef.current = setTimeout(tick, FAKE_TYPING_SPEED);
        }
        break;
      }

      case "typing-final": {
        const nextChar = phase.charIdx + 1;
        setDisplayText(FINAL_SENTENCE.slice(0, nextChar));
        if (nextChar >= FINAL_SENTENCE.length) {
          phaseRef.current = { kind: "done", cursorBlinksLeft: 6 };
          timerRef.current = setTimeout(tick, CURSOR_BLINK_INTERVAL);
        } else {
          phaseRef.current = { kind: "typing-final", charIdx: nextChar };
          timerRef.current = setTimeout(tick, FINAL_TYPING_SPEED);
        }
        break;
      }

      case "done": {
        const left = phase.cursorBlinksLeft - 1;
        if (left <= 0) {
          phaseRef.current = { kind: "finished" };
          setShowCursor(false);
        } else {
          phaseRef.current = { kind: "done", cursorBlinksLeft: left };
          timerRef.current = setTimeout(tick, CURSOR_BLINK_INTERVAL);
        }
        break;
      }

      case "finished":
        break;
    }
  }, []);

  // IntersectionObserver to start animation on viewport entry
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          timerRef.current = setTimeout(tick, FAKE_TYPING_SPEED);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [tick]);

  // Render the displayed text with accent coloring for the final sentence
  const renderText = () => {
    if (!isFinal) {
      return <>{displayText}</>;
    }

    // For the final sentence, color accent characters as they appear
    const chars: React.ReactNode[] = [];
    for (let i = 0; i < displayText.length; i++) {
      if (isAccentChar(i)) {
        chars.push(
          <span
            key={i}
            style={{
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {displayText[i]}
          </span>
        );
      } else {
        chars.push(<span key={i}>{displayText[i]}</span>);
      }
    }
    return <>{chars}</>;
  };

  return (
    <section
      ref={sectionRef}
      className="scroll-stack-section flex items-center justify-center px-4 pt-[80px] pb-[140px] md:px-6 md:py-[40px] w-full"
      style={{
        position: "relative",
        zIndex: 2,
        backgroundColor: "#FAF9F7",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "620px", textAlign: "center" }}>
        <p
          className="text-[20px] md:text-[26px] lg:text-[30px] leading-[1.6]"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 400,
            color: "#334155",
            minHeight: "1.6em",
          }}
        >
          {renderText()}
          {showCursor && (
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "1.15em",
                backgroundColor: "#6366F1",
                marginLeft: "2px",
                verticalAlign: "text-bottom",
                opacity: cursorVisible ? 1 : 0,
                transition: "opacity 0.1s",
              }}
              aria-hidden="true"
            />
          )}
        </p>
      </div>
    </section>
  );
}
