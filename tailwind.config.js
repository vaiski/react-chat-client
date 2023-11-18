/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "chat": "#edeff2",
      },
      animation: {
        pulsate: "pulsate 1.2s infinite both"
      },
      keyframes: {
        pulsate: {
          "0%": { opacity: .2 },
          "30%": { opacity: 1 },
          "100%": { opacity: .2 },
        }
      }
    },
  },
  darkMode: "class",
  plugins: [
  ],
}

