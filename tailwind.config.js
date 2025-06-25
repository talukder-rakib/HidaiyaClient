/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef7f2',
          100: '#d5eae0',
          200: '#addcca',
          300: '#7cc7ae',
          400: '#4aad8d',
          500: '#29BB89', // Primary green
          600: '#1E6F5C', // Darker green
          700: '#164939',
          800: '#0d251e',
          900: '#030704',
        },
        secondary: {
          50: '#fdf9e9',
          100: '#f8edba',
          200: '#f2df8b',
          300: '#ecd05c',
          400: '#e6c22d',
          500: '#E6B325', // Gold
          600: '#b58813',
          700: '#845f0e',
          800: '#523608',
          900: '#200d03',
        },
        accent: {
          50: '#f0ecf9',
          100: '#d6ccee',
          200: '#beace3',
          300: '#a68cd8',
          400: '#8e6cce',
          500: '#6247AA', // Purple
          600: '#4f3988',
          700: '#3b2a66',
          800: '#261c44',
          900: '#130d22',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
      },
      fontFamily: {
        'bengali': ['"Noto Sans Bengali"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};