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
        matte: {
          950: "#050507",
          900: "#0b0b0e",
          850: "#0f0f14",
          800: "#14141b",
          750: "#1a1a24",
          700: "#22222f",
          600: "#2e2e3f",
          500: "#444458",
        },
        gold: {
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#d4af37",
          600: "#b8860b",
          700: "#996515",
          800: "#714605",
        },
        crimson: {
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          900: "#7f1d1d",
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FFF0B3 0%, #D4AF37 50%, #8C6200 100%)",
        "gold-metallic": "linear-gradient(90deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
        "dark-radial": "radial-gradient(ellipse at top, #1a1a24 0%, #050507 70%)",
        "card-gradient": "linear-gradient(180deg, rgba(26,26,36,0.6) 0%, rgba(15,15,20,0.8) 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(212, 175, 55, 0.35)",
        "gold-glow-lg": "0 0 45px -5px rgba(212, 175, 55, 0.5)",
        "crimson-glow": "0 0 20px -2px rgba(239, 68, 68, 0.6)",
        "book-3d": "-20px 25px 50px -10px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 175, 55, 0.15)",
        "card-elevated": "0 10px 30px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
