/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#1A1A1A',
        // darkModeBlack: '#333333',
      },
      backgroundImage: (theme) => ({
        'light-mode': "url('./src/assets/Images/light-beach.jpg')",
        'dark-mode': "url('./src/assets/Images/dark-road.jpg')",
      }),
    },
  },
  plugins: [],
};
