'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'

export default function ReadingProgress() {
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  
  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar after scrolling past a certain point (e.g., 150px)
      const scrollPosition = window.scrollY
      setVisible(scrollPosition > 150)
    }
    
    // Set up scroll event listener
    window.addEventListener('scroll', handleScroll)
    
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  if (!visible) return null
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  )
} 