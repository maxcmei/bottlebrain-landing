/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Epilogue', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        wine: {
          900: '#5f1028',
          800: '#8b1a3a',
          700: '#a92848',
          500: '#c63a5d',
          400: '#d4556f',
        },
        rose: {
          300: '#f4a0a0',
          200: '#ffd7dd',
          100: '#ffe8ee',
          50: '#fff7f8',
        },
        ink: {
          900: '#1d1520',
          700: '#4b3a48',
          500: '#7b6c78',
        },
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '26px',
        '4xl': '32px',
      },
    },
  },
  plugins: [],
}
