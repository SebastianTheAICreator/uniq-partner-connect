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
          DEFAULT: "#6366F1", // Indigo
          hover: "#4F46E5",
        },
        secondary: {
          DEFAULT: "#EC4899", // Pink
          hover: "#DB2777",
        },
        accent: {
          DEFAULT: "#8B5CF6", // Purple
          hover: "#7C3AED",
        },
        success: {
          DEFAULT: "#10B981", // Emerald
          hover: "#059669",
        },
        warning: {
          DEFAULT: "#F59E0B", // Amber
          hover: "#D97706",
        },
        destructive: {
          DEFAULT: "#EF4444", // Red
          hover: "#DC2626",
        },
        info: {
          DEFAULT: "#3B82F6", // Blue
          hover: "#2563EB",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
