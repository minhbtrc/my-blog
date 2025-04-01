import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
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
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pop-in': 'pop-in 200ms cubic-bezier(0, 0, 0.2, 1)',
        'fade-in': 'fade-in 300ms ease-in-out',
        'blink': 'blink 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fade-up 400ms ease-out',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
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
          primary: '#059669',           // Emerald accent
          'primary-content': '#ffffff', // White text on primary color
          secondary: '#0f766e',         // Teal for secondary elements
          'secondary-content': '#ffffff', // White text on secondary
          // Accent color - using a muted variant of primary
          accent: '#10b981',            // Lighter emerald for accent
          'accent-content': '#ffffff',  // White text on accent
          neutral: '#64748b',           // Slate gray for neutral elements
          'neutral-content': '#ffffff', // White text on neutral
          // Informative colors - more subtle
          info: '#f0fdfa',              // Very light teal for info background
          'info-content': '#134e4a',    // Darker teal for info text
          success: '#f0fdf4',           // Very light green background
          'success-content': '#166534', // Dark green text
          error: '#fef2f2',             // Very light red background
          'error-content': '#b91c1c',   // Dark red text
          warning: '#fffbeb',           // Very light amber background
          'warning-content': '#92400e', // Dark amber text
          // Base colors
          'base-100': '#ffffff',        // Pure white for primary backgrounds
          'base-200': '#f8fafc',        // Very light slate for secondary backgrounds
          'base-300': '#f1f5f9',        // Light slate for tertiary backgrounds
          'base-content': '#0f172a',    // Very dark slate for text
        },
        dark: {
          'color-scheme': 'dark',
          // Main colors
          primary: '#3b82f6',           // Blue accent (more vibrant in dark)
          'primary-content': '#ffffff', // White text
          secondary: '#64748b',         // Slate gray (same as light)
          'secondary-content': '#ffffff', // White text
          // Accent color
          accent: '#60a5fa',            // Lighter blue for accent in dark mode
          'accent-content': '#0f172a',  // Very dark text on light accent
          neutral: '#475569',           // Darker slate for neutral elements
          'neutral-content': '#f8fafc', // Very light text
          // Informative colors
          info: '#1e293b',              // Dark slate for info background
          'info-content': '#e2e8f0',    // Light slate text
          success: '#022c22',           // Very dark green background
          'success-content': '#86efac', // Light green text
          error: '#450a0a',             // Very dark red background
          'error-content': '#fecaca',   // Light red text
          warning: '#451a03',           // Very dark amber background
          'warning-content': '#fde68a', // Light amber text
          // Base colors - darker, more modern
          'base-100': '#0f172a',        // Dark slate for primary background
          'base-200': '#1e293b',        // Slightly lighter for secondary
          'base-300': '#334155',        // Medium slate for tertiary
          'base-content': '#f8fafc',    // Very light slate for text
        },
      },
    ],
  },
}

export default config
