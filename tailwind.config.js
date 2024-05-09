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
    },
  },
  plugins: [daisyui],
};
