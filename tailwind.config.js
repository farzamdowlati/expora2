/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'noir-primary': '#4A5FB0',
        'noir-accent': '#F1A909',
        'noir-dark': '#1a1a1a',
        'noir-darker': '#0a0a0a',
      },
      fontFamily: {
        'calligraphy': ['Great Vibes', 'cursive'],
        'professional': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'fade-out': 'fadeOut 0.8s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0px)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
} 