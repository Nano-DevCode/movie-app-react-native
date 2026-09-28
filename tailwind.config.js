/** @type {import('tailwindcss').Config} */
const { appColors } = require("./src/shared/constants/colors");
module.exports = {
  darkMode: "class",
  // Incluye src y rutas comunes de Expo Router
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: appColors,
    },
  },
  plugins: [],
};