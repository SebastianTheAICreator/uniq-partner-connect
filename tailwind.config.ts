
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
        border: "rgba(255, 255, 255, 0.1)",
        input: "rgba(255, 255, 255, 0.1)",
        ring: "rgba(255, 255, 255, 0.2)",
        background: "#000000",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#000000",
          hover: "#0a0a0a",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          hover: "rgba(255, 255, 255, 0.1)",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "rgba(255, 255, 255, 0.1)",
          hover: "rgba(255, 255, 255, 0.15)",
          foreground: "#ffffff",
        },
        interactive: {
          DEFAULT: "rgba(255, 255, 255, 0.2)",
          hover: "rgba(255, 255, 255, 0.3)",
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          foreground: "rgba(255, 255, 255, 0.6)",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        luxury: {
          black: "#000000",
          gray: {
            50: "rgba(255, 255, 255, 0.05)",
            100: "rgba(255, 255, 255, 0.1)",
            200: "rgba(255, 255, 255, 0.15)",
            300: "rgba(255, 255, 255, 0.2)",
            400: "rgba(255, 255, 255, 0.3)",
            500: "rgba(255, 255, 255, 0.5)",
            600: "rgba(255, 255, 255, 0.6)",
            700: "rgba(255, 255, 255, 0.7)",
            800: "rgba(255, 255, 255, 0.8)",
            900: "rgba(255, 255, 255, 0.9)",
          }
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
        "luxury-glow": {
          "0%, 100%": { 
            "box-shadow": "0 0 20px rgba(255, 255, 255, 0.1)" 
          },
          "50%": { 
            "box-shadow": "0 0 30px rgba(255, 255, 255, 0.2)" 
          }
        },
        "luxury-pulse": {
          "0%, 100%": { 
            opacity: "1",
            transform: "scale(1)"
          },
          "50%": { 
            opacity: "0.8",
            transform: "scale(1.05)"
          }
        },
        shimmer: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" }
        },
        "luxury-fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px) scale(0.95)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)"
          }
        }
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "luxury-glow": "luxury-glow 3s ease-in-out infinite",
        "luxury-pulse": "luxury-pulse 2s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "luxury-fade-in": "luxury-fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'luxury-md': '0 10px 25px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'luxury-lg': '0 20px 40px -4px rgba(0, 0, 0, 0.6), 0 8px 16px -4px rgba(0, 0, 0, 0.3)',
        'luxury-inner': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
        'luxury-glow': '0 0 20px rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'luxury': '20px',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
