/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#356DFF',
        'primary-hover': '#2558D8',
        'primary-active': '#1A45B0',
        'primary-soft': '#EEF3FF',
        success: '#22C55E',
        'success-soft': '#DCFCE7',
        warning: '#F59E0B',
        'warning-soft': '#FEF3C7',
        danger: '#EF4444',
        'danger-soft': '#FEE2E2',
        info: '#06B6D4',
        'info-soft': '#CFFAFE',
      },
    },
  },
  plugins: [],
};