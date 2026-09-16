/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        berk: ["Berkshire Swash", "sans-serif"],
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
        "shahi-orange": "#F28030",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
