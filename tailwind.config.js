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
        primary: "#F0C233",
        light: "#FFFCE1",
        //text
        "t-title": "#925E04",
        "t-description": "#A79575",
        "t-button": "#A72929",
        "t-light": "#FDFCDE",
        "t-blur": "#76653D",
        "t-dark": "#615031",

        //background
        card: "#EBEAD2",
        base: "#915D0A",
        //button
        "b-primary": "#F0C233",
        "b-secondary": "#C9B785",
      },
    },
  },
  plugins: [daisyui],
};
