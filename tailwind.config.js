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
      keyframes: {
        colorChange: {
          '0%':   { color: '#d9f99d' },  // lime-200
          '25%':  { color: '#ddd6fe' },  // violet-200
          '50%':  { color: '#99f6e4' },  // teal-200
          '75%':  { color: '#f5d0fe' },  // fuchsia-200
          '100%': { color: '#d9f99d' },  // back to lime-200
        },
      },
      animation: {
        colorChange: 'colorChange 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
