'use client'

import { useCallback, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

// This component is now hidden since we're only using dark mode
export default function Theme() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(newTheme)
  }, [resolvedTheme, setTheme])
  
  if (!mounted) {
    return (
      <button 
        className="p-2 rounded-md bg-white dark:bg-slate-800/70 border border-slate-300 dark:border-blue-900/30 text-blue-700 dark:text-cyan-400 transition-all theme-transition"
        aria-label="Toggle theme"
      >
        <Moon className="h-4 w-4" />
      </button>
    )
  }
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md theme-transition ${
        resolvedTheme === 'dark' 
          ? 'bg-slate-800/70 border border-blue-900/30 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 hover:border-blue-800/40' 
          : 'bg-white border border-slate-300 text-blue-700 hover:text-blue-800 hover:bg-slate-50 hover:border-blue-700/40'
      } transition-all flex items-center shadow-sm`}
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
} 