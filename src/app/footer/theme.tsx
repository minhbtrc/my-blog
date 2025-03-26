import { useCallback, useMemo, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import clsx from 'clsx'

import { Monitor, Moon, Sun } from 'lucide-react'

export type ThemeProps = {
  className?: string
}

export default function Theme({ className }: ThemeProps) {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const MotionIcon = useMemo(() => {
    if (!isMounted) return motion.div;
    
    switch (theme) {
      case 'light':
        return motion(Sun)
      case 'dark':
        return motion(Moon)
      default:
        return motion(Monitor)
    }
  }, [theme, isMounted])

  const onTheme = useCallback(() => {
    if (!isMounted) return;
    if (theme === 'system') return setTheme('light')
    if (theme === 'light') return setTheme('dark')
    return setTheme('system')
  }, [theme, setTheme, isMounted])

  return (
    <button
      className={clsx('btn btn-square btn-xs btn-ghost', className)}
      onClick={onTheme}
    >
      <MotionIcon
        className="w-3 h-3"
        initial={{ scale: 0, opacity: 0, rotate: 180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
      />
    </button>
  )
}
