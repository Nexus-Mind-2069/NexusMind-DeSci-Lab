/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neonBlue: "#00eaff",
        neonGreen: "#39ff14",
        neonPink: "#ff007f",
        darkBg: "#0d0d0d",
      },
    },
  },
  plugins: [],
};