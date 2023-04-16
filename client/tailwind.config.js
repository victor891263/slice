/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{ts,tsx}","./public/index.html"],
  theme: {
    extend: {
      width: {
        '5.5': '1.375rem',
      },
      height: {
        '5.5': '1.375rem',
      }
    },
  },
  plugins: [],
}

