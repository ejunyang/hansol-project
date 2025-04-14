import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0C0E12",
        "bg-teriary": "#22262F",
        "bg-disabled": "#22262F",
        "bg-alt": "#13161B",

        "border-primary": "#373A41",
        "border-disable": "#373A41",
        "border-secondary": "#22262F",

        "text-disable": "#85888E",
        "text-quaternary": "#94979C",
        "text-secondary": "#CECFD2",
        "text-teriary": "#94979C",

        brand: "#67C3ED",
        "brand-500": "#41B4E8",
        "brand-700": "#8DD2F1",
        error: "#F04438",
        "error-500": "#F04438",
        "error-600": "#F36960",
        "error-700": "#F68F88",
        purple: "#684DD4",
        "gray-700": "#CECFD2",

        selectedBox: "rgba(12, 14, 18, 0.5)",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        customScreen: "calc(100% - 20%)",
      },
      gridTemplateColumns: {
        customGrid: "grid-template-column:repeat(24, minmax(0, 1fr))",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
} satisfies Config;
