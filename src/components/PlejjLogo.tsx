"use client";

export default function PlejjLogo({
  size = 26,
  className = "",
  style = {},
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const purple = "#7C5CFC";
  const dark = "#0F172A";

  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        fontWeight: 700,
        fontSize: size,
        display: "inline-flex",
        alignItems: "baseline",
        lineHeight: 1.15,
        letterSpacing: "-0.01em",
        ...style,
      }}
    >
      <span style={{ color: dark }}>Ple</span>
      <span style={{ position: "relative", display: "inline" }}>
        {/* Base layer: bottom portion of "jj" in dark (hooks/descenders only) */}
        <span style={{ color: dark, clipPath: "inset(68% 0 0 0)" }}>jj</span>
        {/* Overlay: top portion of "jj" in purple (dot + stem) with gap below */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            color: purple,
            clipPath: "inset(0 0 38% 0)",
            pointerEvents: "none",
          }}
        >
          jj
        </span>
      </span>
    </span>
  );
}
