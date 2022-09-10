/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
        sans: ["Canva Sans", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "hero-pattern": "url('../public/assets/landingPagePattern.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
