'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Always use dark theme
  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light')
    root.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }, [])

  // Create a provider that enforces dark mode
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
    >
      {children}
    </NextThemesProvider>
  )
} 