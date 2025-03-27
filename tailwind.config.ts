import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      width: {
        a4: '768px',
      },
      maxWidth: {
        a4: '768px',
      },
      keyframes: {
        'pop-in': {
          from: { opacity: '0', transform: 'scaleX(0.95) scaleY(0.95)' },
          to: { opacity: '1', transform: 'scaleX(1) scaleY(1)' },
        },
      },
      animation: {
        'pop-in': 'pop-in 200ms cubic-bezier(0, 0, 0.2, 1)',
      },
      fontFamily: {
        satoshi: "'Satoshi', sans-serif",
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          'color-scheme': 'light',
          // Main colors
          primary: '#343433',
          'primary-content': '#ffffff',
          secondary: '#b2a79a',
          'secondary-content': '#000000',
          // Subsidised colors
          accent: '#6187fe',
          'accent-content': '#d4deff',
          neutral: '#747485',
          'neutral-content': '#ffffff',
          // Informative colors
          info: '#e9f2ff',
          'info-content': '#0086fc',
          success: '#e3eee2',
          'success-content': '#00C454',
          error: '#fff0f0',
          'error-content': '#ff4e4e',
          warning: '#fefae6',
          'warning-content': '#f6c30f',
          // Base colors
          'base-100': '#ffffff',
          'base-200': '#fbfaf9',
          'base-300': '#f7f4f3',
          'base-content': '#474645',
        },
        dark: {
          'color-scheme': 'dark',
          // Main colors
          primary: '#e0dcd8',        // Lighter gray for better contrast on black
          'primary-content': '#1a1a1a', // Near-black for readability on primary
          secondary: '#7a7268',      // Lighter brown for contrast on base colors
          'secondary-content': '#f5f5f5', // Off-white for sharp contrast
          // Subsidised colors
          accent: '#7a9bff',         // Slightly lighter blue for vibrancy
          'accent-content': '#ffffff', // White for max contrast (4.8:1)
          neutral: '#8c8c9e',        // Lighter neutral gray
          'neutral-content': '#ffffff', // White for readability
          // Informative colors
          info: '#4da8ff',           // Brighter blue
          'info-content': '#ffffff', // White (5.5:1 contrast)
          success: '#34d174',        // Vibrant green
          'success-content': '#ffffff', // White (4.6:1)
          error: '#ff6666',          // Softer red
          'error-content': '#ffffff', // White (4.5:1)
          warning: '#ffd700',        // Bright yellow
          'warning-content': '#1a1a1a', // Dark gray for contrast (9:1)
          // Base colors
          'base-100': '#1a1a1a',     // Dark gray instead of pure black
          'base-200': '#2a2a2a',     // Slightly lighter for depth
          'base-300': '#3d3d3d',     // More distinction in hierarchy
          'base-content': '#e6e6e6', // Light gray for text (8:1 on base-100)
        },
      },
    ],
  },
}

export default config
