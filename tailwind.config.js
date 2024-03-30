const { rgb } = require("color-convert");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/pages/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        workspace: { 300: "#b28500", 200: "#e5ab00", 100: "#ffbf00" },
        storage: { 300: "#2b6f00", 200: "#328200", 100: "#399400" },
        customer: { 300: "#334155", 200: "#475466", 100: "#5b6676" },
      },
    },
  },
  plugins: [],
};
