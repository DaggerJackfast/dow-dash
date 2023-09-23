/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      mc: "1440px",
      xxl: "1536px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-roboto-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        "telegram-white": "var(--telegram-bg-color)",
        "telegram-black": "var(--telegram-text-color)",
        "telegram-hint": "var(--telegram-hint-color)",
        "telegram-link": "var(--telegram-link-color)",
        "telegram-primary": "var(--telegram-button-color)",
        "telegram-primary-text": "var(--telegram-button-text-color)",
        "telegram-secondary-white": "var(--telegram-secondary-bg-color)",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
