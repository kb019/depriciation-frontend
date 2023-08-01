/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        background: "#302650",
        navitemBg: "#6A00F4",
        gradientNavBg: "linear-gradient(to right, #6a3093, #a044ff);",
      },
    },
  },
  plugins: [],
};
