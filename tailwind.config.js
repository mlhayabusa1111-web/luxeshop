/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        accent: '#E85D04',
        accentLight: '#F48C06',
        accentDark: '#DC2F02',
      },
    },
  },
  plugins: [],
};
