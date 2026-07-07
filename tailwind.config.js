/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Epilogue', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        wine: {
          950: '#160308',
          900: '#2a0a14',
          850: '#3d0e1d',
          800: '#8b1a3a',
          700: '#a92848',
          600: '#bc2f52',
          500: '#c63a5d',
          400: '#d4556f',
          300: '#e88ba0',
          200: '#f3c2ce',
          100: '#fbe4ea',
          50: '#fdf6f8',
        },
        cream: {
          50: '#fdfbf8',
          100: '#f8f3ec',
          200: '#f0e8dc',
          300: '#e4d8c7',
        },
        gold: {
          500: '#c89b5a',
          400: '#d9b070',
          300: '#e8cd9c',
        },
        ink: {
          900: '#1d1520',
          700: '#4b3a48',
          500: '#7b6c78',
          400: '#9c8e99',
        },
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '26px',
        '4xl': '32px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(29,21,32,0.04), 0 8px 24px rgba(29,21,32,0.06)',
        'card-hover': '0 2px 4px rgba(29,21,32,0.05), 0 16px 40px rgba(29,21,32,0.10)',
        float: '0 12px 40px rgba(22,3,8,0.35)',
        chat: '0 24px 80px rgba(22,3,8,0.5)',
      },
    },
  },
  plugins: [],
}
