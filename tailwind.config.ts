
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(240, 3.7%, 15.9%)",
        input: "hsl(240, 3.7%, 15.9%)",
        ring: "hsl(240, 4.9%, 83.9%)",
        background: "#151822",
        foreground: "#f3f3f3",
        primary: {
          DEFAULT: "#1E293B",
          hover: "#0F172A",
        },
        secondary: {
          DEFAULT: "#334155",
          hover: "#1E293B",
        },
        accent: {
          DEFAULT: "#0F172A",
          hover: "#0F172A",
        },
        interactive: {
          DEFAULT: "#4A90E2",
          hover: "#357ABD",
        },
        muted: {
          DEFAULT: "#1A1F2C",
          foreground: "#a1a1aa",
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" }
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" }
        },
        "subtle-glow": {
          "0%, 100%": { 
            "box-shadow": "0 0 10px 0px rgba(74, 144, 226, 0.2)" 
          },
          "50%": { 
            "box-shadow": "0 0 15px 5px rgba(74, 144, 226, 0.3)" 
          }
        },
        "border-pulse": {
          "0%, 100%": { 
            "border-color": "rgba(255, 255, 255, 0.1)"
          },
          "50%": { 
            "border-color": "rgba(74, 144, 226, 0.2)"
          }
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "subtle-glow": "subtle-glow 2s ease-in-out infinite",
        "border-pulse": "border-pulse 2s ease-in-out infinite",
      },
      boxShadow: {
        'classic': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'classic-md': '0 6px 10px -2px rgba(0, 0, 0, 0.2), 0 3px 6px -2px rgba(0, 0, 0, 0.12)',
        'classic-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
        'classic-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.15)',
        'classic-blue': '0 4px 14px 0 rgba(74, 144, 226, 0.25)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
