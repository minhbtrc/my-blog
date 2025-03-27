'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ReadingProgress() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const progressRef = useRef(0)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  })

  // Update the ref when scrollYProgress changes
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      progressRef.current = latest
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  // Hide progress bar at the very top of the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 150) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    
    // Check the initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Calculate reading progress percentage for aria-valuenow
  const progressPercentage = Math.round(progressRef.current * 100)

  return (
    <>
      <div 
        className="fixed top-16 left-0 right-0 h-1.5 z-40 bg-transparent cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercentage}
        title="Scroll to top"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left animate-shimmer"
          style={{ 
            scaleX,
            opacity: isVisible ? 1 : 0,
            height: isHovered ? '8px' : '100%',
            transition: 'opacity 0.3s ease, height 0.2s ease',
            boxShadow: isHovered 
              ? '0 0 12px rgba(168, 85, 247, 0.7)' 
              : '0 0 8px rgba(168, 85, 247, 0.5)'
          }}
        />
      </div>
      
      {isHovered && isVisible && (
        <motion.div 
          className="fixed top-20 right-4 bg-base-200 text-base-content shadow-lg px-3 py-2 rounded-md z-40 flex items-center gap-2 text-sm border border-base-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          role="tooltip"
          aria-live="polite"
        >
          <ArrowUp className="w-4 h-4" /> 
          <span>Scroll to top</span>
        </motion.div>
      )}
    </>
  )
} 