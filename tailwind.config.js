/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          ligth:'#9f9',
          DEFAULT:'#0f0',
          dark:'#060',
        },
        secondary: {
          light: '#333',
          DEFAULT: '#222',
          dark: '#000',
        },
        accent: '#f82',    
        background: '#aaa',
        error: '#f55',
      },
      boxShadow: {
        'custom-2xl': '0px 0px 50px rgba(0, 0, 0, 9)',
      },
    },
  },
  plugins: [],
}

