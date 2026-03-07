import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0F",
        foreground: "#E8E8ED",
        "accent-blue": "#4A6CF7",
        "accent-violet": "#7C5CFC",
        "accent-gold": "#D4AF37",
        silver: "#9CA3AF",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(30px, -20px)" },
          "66%": { transform: "translate(-20px, 15px)" },
        },
        "shimmer": {
          "0%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
          "100%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        "float-slow": "float 20s ease-in-out infinite",
        "float-slower": "float 25s ease-in-out infinite reverse",
        "float-slowest": "float 30s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
