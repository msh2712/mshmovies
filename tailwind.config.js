/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Fonts
      fontFamily: {
        inter: ['Inter', 'sans-serif'],  // from Hero
        title: ['"Bebas Neue", sans-serif'],
        des: ['"Libertinus Serif Display", system-ui'],
        kids: ['"Unbounded", sans-serif'],
      },
      // Colors
      colors: {
        dark: '#0f172a',
        darker: '#020617',
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#ec4899',
      },
      // Animations
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        colorChange: {
          '0%':   { color: '#d9f99d' },  
          '25%':  { color: '#ddd6fe' }, 
          '50%':  { color: '#99f6e4' },  
          '75%':  { color: '#f5d0fe' },  // fuchsia-200
          '100%': { color: '#d9f99d' },  // back to lime-200
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        colorChange: 'colorChange 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
