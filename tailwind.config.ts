
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#4A90E2",
          hover: "#357ABD",
        },
        secondary: {
          DEFAULT: "#64D2FF",
          hover: "#4BBAED",
        },
        accent: {
          DEFAULT: "#42E695",
          hover: "#2DCC7D",
        },
        interactive: {
          DEFAULT: "#FF9ECD",
          hover: "#FF85BE",
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
          "50%": { transform: "translateY(-10px)" }
        },
        "text-shine": {
          "0%": {
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "100%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" }
        },
        "glow-pulse": {
          "0%, 100%": { 
            "box-shadow": "0 0 20px 0px rgba(74, 144, 226, 0.3)" 
          },
          "50%": { 
            "box-shadow": "0 0 30px 10px rgba(74, 144, 226, 0.5)" 
          }
        },
        "border-glow": {
          "0%, 100%": { 
            "box-shadow": "0 0 0px 0px rgba(74, 144, 226, 0)",
            "border-color": "rgba(255, 255, 255, 0.05)"
          },
          "50%": { 
            "box-shadow": "0 0 10px 3px rgba(74, 144, 226, 0.3)",
            "border-color": "rgba(74, 144, 226, 0.3)"
          }
        },
        "shimmer": {
          "0%": { 
            "background-position": "-1000px 0"
          },
          "100%": { 
            "background-position": "1000px 0"
          }
        }
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "float": "float 3s ease-in-out infinite",
        "text-shine": "text-shine 3s ease-in-out infinite",
        "gradient-x": "gradient-x 15s ease infinite",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "border-glow": "border-glow 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
