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
        "orb-drift-1": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(30px, -20px)" },
          "50%": { transform: "translate(-15px, 25px)" },
          "75%": { transform: "translate(20px, 10px)" },
        },
        "orb-drift-2": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-25px, 15px)" },
          "50%": { transform: "translate(20px, -30px)" },
          "75%": { transform: "translate(-10px, -20px)" },
        },
        "orb-drift-3": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(15px, 25px)" },
          "50%": { transform: "translate(-30px, -10px)" },
          "75%": { transform: "translate(25px, -15px)" },
        },
      },
      animation: {
        "orb-1": "orb-drift-1 25s ease-in-out infinite",
        "orb-2": "orb-drift-2 22s ease-in-out infinite",
        "orb-3": "orb-drift-3 28s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
