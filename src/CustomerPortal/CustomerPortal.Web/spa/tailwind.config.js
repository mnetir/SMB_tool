/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#356DFF', hover: '#2558D8', active: '#1A45B0', soft: '#EEF3FF' },
        success: { DEFAULT: '#22C55E', soft: '#DCFCE7' },
        warning: { DEFAULT: '#F59E0B', soft: '#FEF3C7' },
        danger: { DEFAULT: '#EF4444', soft: '#FEE2E2' },
        info: { DEFAULT: '#06B6D4', soft: '#CFFAFE' },
        neutral: '#64748B',
        surface: { DEFAULT: '#FFFFFF', soft: '#F8FAFC' },
        border: '#DBE3F0',
      },
      fontFamily: {
        primary: ['IranYekanX', 'IranYekan', 'Tahoma', 'sans-serif'],
        secondary: ['Inter', 'Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};