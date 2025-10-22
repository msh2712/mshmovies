/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        title: ['"Bebas Neue", sans-serif'],
        des: ['"Libertinus Serif Display", system-ui'],
        kids: ['"Unbounded", sans-serif'],
      },
    },
  },
  plugins: [],
};
