/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Garamond', 'Didot', 'serif'],
        sans: ['Avenir', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        luxury: {
          cream: '#F8F1E9', // Primary: Ivory Cream
          charcoal: '#2E2E2E', // Accent: Deep Charcoal
          sienna: '#D96F3A', // Highlight: Burnt Sienna
          sage: '#A8B5A2', // Secondary: Soft Sage Green
          gold: '#C2A874', // Metallic: Antique Gold
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.7s ease-out',
        'subtle-bounce': 'subtleBounce 0.3s ease-in-out',
        'spin-slow': 'spin 3s linear infinite',
        'loading-bar': 'loadingBar 2s ease-in-out infinite',
        'logo-float': 'logoFloat 3s ease-in-out infinite',
        'pulsate': 'pulsate 2s ease-in-out infinite',
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
        subtleBounce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)' },
        },
        loadingBar: {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '0%' },
        },
        logoFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulsate: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
      },
      transitionDuration: {
        2000: '2000ms',
      },
    },
  },
  plugins: [typography, forms],
};
