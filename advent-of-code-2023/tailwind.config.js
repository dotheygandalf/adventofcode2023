/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // that is animation class
      animation: {
        fade: "fadeOut 2s ease-in-out",
      },

      // that is actual animation
      keyframes: (theme) => ({
        fadeOut: {
          "0%": { color: theme("colors.green.600") },
          "100%": { color: theme("colors.red.900") },
        },
      }),
    },
  },
  plugins: [],
};
