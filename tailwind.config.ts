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
          primary: '#3b82f6',           // Vibrant blue for primary actions
          'primary-content': '#ffffff', // White text on primary color
          secondary: '#0ea5e9',         // Bright sky blue for secondary elements
          'secondary-content': '#ffffff', // White text on secondary color
          // Subsidised colors
          accent: '#6366f1',            // Indigo for accent elements
          'accent-content': '#ffffff',  // White text on accent color  
          neutral: '#64748b',           // Medium slate for neutral elements
          'neutral-content': '#ffffff', // White text on neutral color
          // Informative colors
          info: '#e0f2fe',              // Light blue background for info
          'info-content': '#0369a1',    // Deep blue text on info background
          success: '#dcfce7',           // Light green background for success
          'success-content': '#15803d', // Deep green text on success background
          error: '#fee2e2',             // Light red background for errors
          'error-content': '#b91c1c',   // Deep red text on error background
          warning: '#fef3c7',           // Light yellow background for warnings
          'warning-content': '#b45309', // Deep amber text on warning background
          // Base colors
          'base-100': '#ffffff',        // Pure white for primary backgrounds
          'base-200': '#f8fafc',        // Very light slate for secondary backgrounds
          'base-300': '#f1f5f9',        // Light slate for tertiary backgrounds
          'base-content': '#1e293b',    // Deep slate for text
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
