/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        berk: ["Beau Rivage", "cursive"],
        camby: ["Cambay", "sans-serif"],
        inria: ["Inria Serif", "sans-serif"],
        rubik: ["Rubik Variable", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('/src/lib/images/sahiHero.png')",
        pattern: "url('/src/lib/images/pattern.png')",
        "bottom-bg": "url('/src/lib/images/tea-bottom.png')",
      },
      colors: {
        "shahi-orange": "#C9A24A",
        charcoal: "#141210",
        "charcoal-light": "#221E1A",
        cream: "#F7F1E4",
        gold: {
          DEFAULT: "#C9A24A",
          light: "#E4C77E",
          dark: "#9C7B33",
        },
      },
      letterSpacing: {
        widest2: "0.25em",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
