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
      {["j", "j"].map((_, i) => (
        <span key={i} style={{ position: "relative", display: "inline-block" }}>
          {/* Base layer: bottom portion in dark */}
          <span style={{ color: dark, clipPath: "inset(52% 0 0 0)" }}>j</span>
          {/* Overlay: top portion in purple */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              color: purple,
              clipPath: "inset(0 0 46% 0)",
              pointerEvents: "none",
            }}
          >
            j
          </span>
        </span>
      ))}
    </span>
  );
}
