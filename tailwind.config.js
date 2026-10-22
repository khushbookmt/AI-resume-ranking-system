/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#0B1120',
          surface: '#111A2E',
          raised: '#182338',
          border: '#233150',
        },
        light: {
          DEFAULT: '#F6F7FB',
          surface: '#FFFFFF',
          raised: '#FFFFFF',
          border: '#E2E6F0',
        },
        signal: {
          amber: '#F5A623',
          teal: '#2DD4BF',
          indigo: '#6C7BFF',
          rose: '#FB7185',
          emerald: '#34D399',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(120,140,190,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,140,190,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        scan: 'scan 2.4s linear infinite',
        'fade-up': 'fade-up 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}
