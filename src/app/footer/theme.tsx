import { useCallback, useMemo, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import clsx from 'clsx'

import { Monitor, Moon, Sun } from 'lucide-react'

export type ThemeProps = {
  className?: string
}

export default function Theme({ className }: ThemeProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const MotionIcon = useMemo(() => {
    if (!isMounted) return motion.div;
    
    switch (resolvedTheme) {
      case 'light':
        return motion(Sun)
      case 'dark':
        return motion(Moon)
      default:
        return motion(Monitor)
    }
  }, [resolvedTheme, isMounted])

  const toggleTheme = useCallback(() => {
    if (!isMounted) return;
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(newTheme)
  }, [resolvedTheme, setTheme, isMounted])

  if (!isMounted) return null;

  return (
    <button
      className={clsx('btn btn-square btn-xs', 
        resolvedTheme === 'dark' ? 'btn-ghost text-cyan-400' : 'btn-ghost text-blue-600',
        className)}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <MotionIcon
        className="w-3 h-3"
        initial={{ scale: 0, opacity: 0, rotate: 180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
      />
    </button>
  )
}
