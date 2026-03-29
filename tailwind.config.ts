import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#FFFFFF",
          secondary: "#F5F5F7",
          tertiary: "#E8E8ED",
          dark: "#000000",
          "dark-secondary": "#1C1C1E",
          "dark-tertiary": "#2C2C2E",
        },
        text: {
          primary: "#000000",
          secondary: "#86868B",
          tertiary: "#AEAEB2",
          "dark-primary": "#FFFFFF",
          "dark-secondary": "#86868B",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 7vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "700" }],
        "title-1": ["clamp(1.75rem, 4vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
        "title-2": ["clamp(1.25rem, 2.5vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "body-large": ["1.125rem", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "28px",
      },
      animation: {
        "message-in-left": "messageInLeft 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        "message-in-right": "messageInRight 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "typing": "typing 1.5s ease-in-out infinite",
        "slide-up-stagger": "slideUpStagger 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        shimmer: "shimmer 2s infinite linear",
      },
      keyframes: {
        messageInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px) scale(0.8)" },
          "100%": { opacity: "1", transform: "translateX(0) scale(1)" },
        },
        messageInRight: {
          "0%": { opacity: "0", transform: "translateX(30px) scale(0.8)" },
          "100%": { opacity: "1", transform: "translateX(0) scale(1)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        typing: {
          "0%": { opacity: "0.3" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.3" },
        },
        slideUpStagger: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
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
