/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E1E1E',
        secondary: '#2F2F2F',
        tertiary: '#3F3F3F',
        quaternary: '#4F4F4F',
        // BKMRK: gonna need clean uo here
        white: '#FFFFFF',
        lightModeBlack: '#1A1A1A',
        darkModeBlack: '#333333',
      },
      backgroundImage: (theme) => ({
        'light-mode': "url('./src/assets/Images/light-bg.jpg')",
        'dark-mode': "url('./src/assets/Images/dark-bg.jpg')",
      }),
    },
  },
  plugins: [],
};
