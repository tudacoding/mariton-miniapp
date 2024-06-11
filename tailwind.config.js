/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      lalezar: ["Lalezar"],
    },
    extend: {
      animation: {
        "spin-slow": "spin 6s linear infinite",
      },
      colors: {
        //text
        "t-title": "#925E04",
        "t-description": "#A79575",
        "t-button": "#A72929",
        "t-light": "#FDFCDE",
        "t-blur": "#76653D",
      },
    },
  },
  plugins: [daisyui],
};
