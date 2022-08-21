/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'min': '640px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      boxShadow:{ '3xl':'1px 1px 24px -3px rgba(0,0,0,0.75)'},
      fontFamily: ['Josefin Sans', 'sans-serif'],
      colors:{
        IceCold: '#a0d2eb',
        FreezePurple: '#e5eaf5',
        MediumPurple: '#d0bdf4',
        PurplePain: '#8458B3',
        HeavyPurple: '#a28089',
        yellowgreen:'linear-gradient(53deg, yellow, transparent,#44ff44)'
      },
    },
  },
  plugins: [],
}
