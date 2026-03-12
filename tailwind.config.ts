import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        base: "#FAFAF9",
        "text-primary": "#0F172A",
        "text-secondary": "#64748B",
        "text-muted": "#94A3B8",
        "accent-blue": "#4A6CF7",
        "accent-violet": "#7C5CFC",
        "dark-section": "#0A0A0F",
      },
      fontFamily: {
        serif: ["var(--font-instrument)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      keyframes: {
        "blob-1": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(20px, -15px)" },
          "66%": { transform: "translate(-10px, 20px)" },
        },
        "blob-2": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(-25px, 10px)" },
          "66%": { transform: "translate(15px, -20px)" },
        },
        "blob-3": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(15px, 25px)" },
          "66%": { transform: "translate(-20px, -10px)" },
        },
      },
      animation: {
        "blob-1": "blob-1 30s ease-in-out infinite",
        "blob-2": "blob-2 35s ease-in-out infinite",
        "blob-3": "blob-3 28s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
