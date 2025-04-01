'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Handle theme application
  React.useEffect(() => {
    const root = window.document.documentElement
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light')
    
    // Apply theme class and data attribute
    root.classList.remove('light', 'dark')
    root.classList.add(savedTheme)
    root.setAttribute('data-theme', savedTheme)
    
    // Save theme preference
    localStorage.setItem('theme', savedTheme)
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
        const root = window.document.documentElement
        root.setAttribute('data-theme', theme)
      }}
    >
      {children}
    </NextThemesProvider>
  )
} 