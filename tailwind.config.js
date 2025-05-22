/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette
        sage: {
          50: '#f6f7f5',
          100: '#e6ebe3',
          200: '#cdd8c7',
          300: '#adc0a3',
          400: '#8aa47e',
          500: '#698961',
          600: '#516d4b',
          700: '#40563c',
          800: '#354631',
          900: '#2c3a29',
        },
        // Secondary palette
        terracotta: {
          50: '#fdf5f3',
          100: '#f9e5e0',
          200: '#f3ccc2',
          300: '#eaa99a',
          400: '#e07d65',
          500: '#d65f42',
          600: '#c44a31',
          700: '#a33a29',
          800: '#853226',
          900: '#6e2c23',
        },
        // Accent palette
        lavender: {
          50: '#f7f7fd',
          100: '#eeeefa',
          200: '#dddef5',
          300: '#c2c3ec',
          400: '#a3a2df',
          500: '#8580d0',
          600: '#6c67b9',
          700: '#5a5599',
          800: '#4b4880',
          900: '#413e6a',
        },
        // Neutral palette
        cream: {
          50: '#fefcf7',
          100: '#fef9ee',
          200: '#fcf3dd',
          300: '#f9e8c1',
          400: '#f5d696',
          500: '#f0c16a',
          600: '#e5a748',
          700: '#c7853a',
          800: '#a06a34',
          900: '#83582f',
        },
        // Success, warning, error states
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'medium': '0 6px 30px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}