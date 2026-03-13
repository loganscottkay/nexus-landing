import React from "react";

/**
 * Shared unicorn SVG used in both the navbar mascot and waitlist animation.
 * @param size - rendered width/height in px
 * @param prefix - gradient ID prefix to avoid conflicts when multiple instances exist ("nav" or "wl")
 * @param maneClass - CSS class applied to mane/tail paths for animation
 * @param legClasses - optional object with fl/fr/bl/br classes for leg gallop animation
 */
export default function UnicornSVG({
  size,
  prefix,
  maneClass = "",
  legClasses,
}: {
  size: number;
  prefix: string;
  maneClass?: string;
  legClasses?: { fl: string; fr: string; bl: string; br: string };
}) {
  const lf = legClasses?.fl || "";
  const rf = legClasses?.fr || "";
  const lb = legClasses?.bl || "";
  const rb = legClasses?.br || "";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Body: white with subtle lavender tint */}
        <linearGradient id={`${prefix}Body`} x1="20" y1="35" x2="60" y2="75">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F0E6FF" />
        </linearGradient>
        {/* Underside shadow */}
        <linearGradient id={`${prefix}Shadow`} x1="40" y1="45" x2="40" y2="68">
          <stop stopColor="#F0E6FF" stopOpacity="0" />
          <stop offset="1" stopColor="#E8E0F0" />
        </linearGradient>
        {/* Rainbow horn gradient */}
        <linearGradient id={`${prefix}Horn`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#FF6B6B" />
          <stop offset="0.2" stopColor="#FFA94D" />
          <stop offset="0.4" stopColor="#F5D76E" />
          <stop offset="0.6" stopColor="#51CF66" />
          <stop offset="0.8" stopColor="#4A6CF7" />
          <stop offset="1" stopColor="#7C5CFC" />
        </linearGradient>
        {/* Rainbow mane/tail gradient (pastel) */}
        <linearGradient id={`${prefix}Mane`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF9A9A" />
          <stop offset="0.25" stopColor="#FFD480" />
          <stop offset="0.5" stopColor="#A8E6A3" />
          <stop offset="0.75" stopColor="#82B1FF" />
          <stop offset="1" stopColor="#B388FF" />
        </linearGradient>
      </defs>

      {/* === TAIL === */}
      <path
        className={maneClass}
        d="M14 52C8 44 3 46 6 52C9 58 7 55 10 60C8 56 4 48 7 44"
        stroke={`url(#${prefix}Mane)`}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        style={{ transformOrigin: "10px 52px" }}
      />

      {/* === BODY === */}
      <ellipse cx="42" cy="52" rx="24" ry="14" fill={`url(#${prefix}Body)`} />
      {/* Underside shading for dimension */}
      <ellipse cx="42" cy="55" rx="22" ry="10" fill={`url(#${prefix}Shadow)`} />

      {/* === NECK === */}
      <path
        d="M58 46C60 40 63 34 62 28C60 24 57 26 57 30L54 46Z"
        fill={`url(#${prefix}Body)`}
      />

      {/* === HEAD === */}
      <ellipse cx="65" cy="27" rx="9" ry="7" fill={`url(#${prefix}Body)`} />
      {/* Snout (slightly extended) */}
      <ellipse cx="72" cy="29" rx="4" ry="3.5" fill={`url(#${prefix}Body)`} />

      {/* === EAR === */}
      <path d="M62 20L59 13L63 19Z" fill="#E8E0F0" stroke="#D8D0E8" strokeWidth="0.5" />

      {/* === HORN (prominent, rainbow, ~30% of height) === */}
      <path
        d="M66 20L69 2L63 19Z"
        fill={`url(#${prefix}Horn)`}
      />
      {/* Horn spiral lines */}
      <path d="M65.2 16L67.8 14" stroke="rgba(255,255,255,0.6)" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M65.5 12L68 10" stroke="rgba(255,255,255,0.6)" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M66 8L68.2 6" stroke="rgba(255,255,255,0.6)" strokeWidth="0.7" strokeLinecap="round" />
      {/* Sparkle star at horn tip */}
      <path
        d="M69 2L69.6 0.4L70.2 2L71.8 2.6L70.2 3.2L69.6 4.8L69 3.2L67.4 2.6Z"
        fill="white"
        className={`${prefix}-horn-sparkle`}
      />

      {/* === EYE === */}
      <circle cx="68" cy="25" r="2" fill="#1E1B4B" />
      <circle cx="68.8" cy="24.2" r="0.7" fill="white" />

      {/* === NOSTRIL === */}
      <circle cx="75" cy="30" r="0.8" fill="#D8D0E8" />

      {/* === MANE (3 flowing rainbow strands along neck) === */}
      <path
        className={maneClass}
        d="M62 18C59 14 55 18 52 14C49 10 46 16 43 12"
        stroke={`url(#${prefix}Mane)`}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        style={{ transformOrigin: "52px 15px" }}
      />
      <path
        className={maneClass}
        d="M61 22C58 18 54 23 51 19C48 15 45 21 42 17"
        stroke={`url(#${prefix}Mane)`}
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
        style={{ transformOrigin: "51px 20px" }}
      />
      <path
        className={maneClass}
        d="M60 26C57 22 54 27 51 23C48 19 46 25 43 21"
        stroke={`url(#${prefix}Mane)`}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        style={{ transformOrigin: "51px 24px" }}
      />

      {/* === LEGS === */}
      {/* Front left */}
      <line className={lf} x1="54" y1="63" x2="56" y2="82" stroke="#D8D0E8" strokeWidth="3.5" strokeLinecap="round" />
      {/* Front right */}
      <line className={rf} x1="48" y1="63" x2="46" y2="82" stroke="#D8D0E8" strokeWidth="3.5" strokeLinecap="round" />
      {/* Back left */}
      <line className={lb} x1="34" y1="63" x2="32" y2="82" stroke="#D8D0E8" strokeWidth="3.5" strokeLinecap="round" />
      {/* Back right */}
      <line className={rb} x1="28" y1="63" x2="30" y2="82" stroke="#D8D0E8" strokeWidth="3.5" strokeLinecap="round" />

      {/* Hooves */}
      <circle className={lf} cx="56" cy="82" r="1.8" fill="#C4B5E0" />
      <circle className={rf} cx="46" cy="82" r="1.8" fill="#C4B5E0" />
      <circle className={lb} cx="32" cy="82" r="1.8" fill="#C4B5E0" />
      <circle className={rb} cx="30" cy="82" r="1.8" fill="#C4B5E0" />
    </svg>
  );
}
