"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

interface ConicGradientButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  borderRadius?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function ConicGradientButton({
  href,
  children,
  className = "",
  style = {},
  borderRadius = "9999px",
  onClick,
  type,
  disabled,
}: ConicGradientButtonProps) {
  const [hovered, setHovered] = useState(false);

  const container: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius,
    display: "inline-flex",
  };

  const spinner: React.CSSProperties = {
    position: "absolute",
    top: "-450%",
    left: "-50%",
    width: "200%",
    height: "1000%",
    background:
      "conic-gradient(transparent 200deg, #8B5CF6, #6366F1, #A78BFA)",
  };

  const overlay: React.CSSProperties = {
    position: "absolute",
    inset: "2px",
    borderRadius,
    background: style.background || "linear-gradient(135deg, #4A6CF7, #7C5CFC)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(139,92,246,0.3)",
    zIndex: 2,
  };

  const content: React.CSSProperties = {
    position: "relative",
    zIndex: 3,
    background: "transparent",
    border: "none",
    color: "inherit",
    font: "inherit",
    cursor: disabled ? "not-allowed" : "pointer",
  };

  const inner = (
    <>
      <motion.div
        style={spinner}
        animate={{ rotate: 360 }}
        transition={{
          duration: hovered ? 2 : 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div style={overlay} />
      {href ? (
        <Link
          href={href}
          className={className}
          style={{ ...style, ...content, background: "transparent", display: "inline-flex" }}
          onClick={onClick}
        >
          {children}
        </Link>
      ) : (
        <button
          type={type || "button"}
          disabled={disabled}
          className={className}
          style={{ ...style, ...content, background: "transparent" }}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );

  return (
    <div
      style={container}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </div>
  );
}
