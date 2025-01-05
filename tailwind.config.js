/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Bodoni Moda', 'serif'],
        'sans': ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}