'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Handle theme application
  React.useEffect(() => {
    try {
      const root = window.document.documentElement
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      // Check for existing theme class on document
      const hasLightClass = root.classList.contains('light')
      const hasDarkClass = root.classList.contains('dark')
      const existingTheme = hasDarkClass ? 'dark' : hasLightClass ? 'light' : null
      
      // Get saved theme from localStorage or use system preference
      const savedTheme = localStorage.getItem('theme') || existingTheme || (prefersDark ? 'dark' : 'light')
      
      console.log('ThemeProvider init - saved theme:', savedTheme);
      console.log('ThemeProvider init - prefers dark:', prefersDark);
      console.log('ThemeProvider init - existing classes:', root.classList.toString());
      
      // Apply theme class and data attribute
      root.classList.remove('light', 'dark')
      root.classList.add(savedTheme)
      root.setAttribute('data-theme', savedTheme)
      
      // Apply CSS variables immediately
      if (savedTheme === 'light') {
        root.style.setProperty('--base-100', '#ffffff');
        root.style.setProperty('--base-content', '#0f172a');
        root.style.setProperty('--primary', '#059669');
      } else {
        root.style.setProperty('--base-100', '#0f172a');
        root.style.setProperty('--base-content', '#f8fafc');
        root.style.setProperty('--primary', '#3b82f6');
      }
      
      // Save theme preference
      localStorage.setItem('theme', savedTheme)
    } catch (error) {
      console.error('Error initializing ThemeProvider:', error);
    }
  }, [])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      {...props}
      onValueChange={(theme) => {
        // When theme changes, update both class and data-theme
        console.log('ThemeProvider - theme changed to:', theme);
        
        try {
          if (!theme) {
            console.warn('ThemeProvider - theme value is undefined or null');
            // Fall back to checking the existing classes
            const root = window.document.documentElement;
            const hasLightClass = root.classList.contains('light');
            const hasDarkClass = root.classList.contains('dark');
            
            if (hasLightClass) theme = 'light';
            else if (hasDarkClass) theme = 'dark';
            else theme = 'light'; // Default fallback
            
            console.log('ThemeProvider - using fallback theme:', theme);
          }
          
          const root = window.document.documentElement
          
          // Log current state before change
          console.log('Before change - classList:', root.classList.toString());
          console.log('Before change - data-theme:', root.getAttribute('data-theme'));
          
          // DaisyUI requires both class and data-theme attribute
          root.classList.remove('light', 'dark')
          root.classList.add(theme)
          root.setAttribute('data-theme', theme)
          
          // Apply CSS variables immediately
          if (theme === 'light') {
            root.style.setProperty('--base-100', '#ffffff');
            root.style.setProperty('--base-content', '#0f172a');
            root.style.setProperty('--primary', '#059669');
          } else {
            root.style.setProperty('--base-100', '#0f172a');
            root.style.setProperty('--base-content', '#f8fafc');
            root.style.setProperty('--primary', '#3b82f6');
          }
          
          // Log state after change
          console.log('After change - classList:', root.classList.toString());
          console.log('After change - data-theme:', root.getAttribute('data-theme'));
          
          // Force a reflow/repaint to ensure theme changes are applied
          document.body.style.display = 'none';
          document.body.offsetHeight; // Trigger reflow
          document.body.style.display = '';
        } catch (error) {
          console.error('Error in ThemeProvider onValueChange:', error);
        }
      }}
    >
      {children}
    </NextThemesProvider>
  )
} 