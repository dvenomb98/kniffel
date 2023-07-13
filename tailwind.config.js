const BREAKPOINTS = require('./src/config/breakpoints.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/config/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      small: '0.85rem',
      base: '1rem',
      h4: '1.25rem',
      h3: '1.5rem',
      h2: '1.875rem',
      h1: '2.25rem',
      subheader: ['2.8rem', '1.1'],
      header: ['3.25rem', '1.1'],
    },
    fontWeight: {
      light: 200,
      normal: 400,
      medium: 500,
      bold: 700,
    },
    screens: {
      sm: { max: `${BREAKPOINTS.SM.MAX}px` },
      lg: `${BREAKPOINTS.LG.MIN}px`,
    },
    container: {
      screens: {
        sm: { max: `${BREAKPOINTS.SM.MAX}px` },
        lg: `${BREAKPOINTS.LG.MIN}px`,
      },
    },
    colors: {
      primary: {
        gold: {
          light: '#fef3c7',
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
        error: {
          light: '#e57373',
          DEFAULT: '#f44336',
          dark: '#d32f2f',
        },
        warning: {
          light: '#ffb74d',
          DEFAULT: '#ffa726',
          dark: '#f57c00',
        },
        info: {
          light: '#4fc3f7',
          DEFAULT: '#29b6f6',
          dark: '#0288d1',
        },
        success: {
          light: '#81c784',
          DEFAULT: '#66bb6a',
          dark: '#388e3c',
        },
        gray: '#6b7280',
        black: '#09090b',
      },
      neutral: {
        light: '#f4f4f5',
        DEFAULT: '#121212',
        dark: '#18181b',
      },
      secondary: {
        light: '#f1f5f9',
        DEFAULT: '#94a3b8',
        dark: '#475569',
      },
    },
    extend: {
      height: {
        banner: '500px',
      },
    },
  },
  plugins: [],
};
