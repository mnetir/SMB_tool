/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#356DFF',
          hover: '#2558D8',
          active: '#1A45B0',
          soft: '#EEF3FF',
        },
        success: { DEFAULT: '#22C55E', soft: '#DCFCE7' },
        warning: { DEFAULT: '#F59E0B', soft: '#FEF3C7' },
        danger: { DEFAULT: '#EF4444', soft: '#FEE2E2' },
        info: { DEFAULT: '#06B6D4', soft: '#CFFAFE' },
        neutral: '#64748B',
        surface: { DEFAULT: '#FFFFFF', soft: '#F8FAFC' },
        border: '#DBE3F0',
        'text-primary': '#1F2937',
        'text-secondary': '#475569',
        'text-muted': '#6B7280',
      },
      fontFamily: {
        primary: ['IranYekanX', 'IranYekan', 'Vazirmatn', 'Tahoma', 'sans-serif'],
        secondary: ['Inter', 'Roboto', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '18px',
        xl: '24px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0,0,0,0.04)',
        md: '0 4px 20px rgba(0,0,0,0.05)',
        lg: '0 10px 30px rgba(0,0,0,0.08)',
        xl: '0 16px 40px rgba(0,0,0,0.16)',
        focus: '0 0 0 3px rgba(53,109,255,0.25)',
      },
      zIndex: {
        dropdown: '100',
        sticky: '200',
        sidebar: '300',
        overlay: '400',
        modal: '500',
        drawer: '500',
        toast: '600',
        tooltip: '700',
      },
    },
  },
  plugins: [],
};