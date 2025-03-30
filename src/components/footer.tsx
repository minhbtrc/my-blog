'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Github, Rss, MessagesSquare, FileCode, Linkedin, Coffee, Heart, Code, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'

// Add HuggingFace icon component
const HuggingFaceIcon = () => (
  <svg viewBox="0 0 95 88" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 mr-1.5">
    <path d="M47.2119 0C26.7279 0 10.1255 16.7482 10.1255 37.4223C10.1255 43.5567 11.8306 49.2766 14.8211 54.2455L0 86.5839H25.5591L32.2099 69.608C36.9538 71.6223 41.9637 72.8446 47.2119 72.8446C67.696 72.8446 84.2984 56.0964 84.2984 35.4223C84.2984 15.8304 67.696 0 47.2119 0ZM26.1682 47.4522C22.1547 47.4522 18.8905 44.1879 18.8905 40.1744C18.8905 36.1608 22.1547 32.8966 26.1682 32.8966C30.1817 32.8966 33.446 36.1608 33.446 40.1744C33.446 44.1879 30.1817 47.4522 26.1682 47.4522ZM47.2119 39.2589C50.2204 39.2589 52.6591 36.8201 52.6591 33.8117C52.6591 30.8033 50.2204 28.3645 47.2119 28.3645C44.2035 28.3645 41.7647 30.8033 41.7647 33.8117C41.7647 36.8201 44.2035 39.2589 47.2119 39.2589ZM68.2557 47.4522C64.2422 47.4522 60.9779 44.1879 60.9779 40.1744C60.9779 36.1608 64.2422 32.8966 68.2557 32.8966C72.2692 32.8966 75.5334 36.1608 75.5334 40.1744C75.5334 44.1879 72.2692 47.4522 68.2557 47.4522Z" />
  </svg>
);

export default function Footer() {
  const [year] = useState(new Date().getFullYear())
  const [hasScrolled, setHasScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)
  
  // Add animation values for hover effects
  const heartScale = useMotionValue(1)
  const heartRotate = useTransform(heartScale, [1, 1.2], [0, 10])
  const heartSpring = useSpring(heartScale, { stiffness: 300, damping: 10 })
  
  useEffect(() => {
    const checkScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', checkScroll)
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])
  
  return (
    <footer className="border-t border-slate-200/30 dark:border-slate-800/30 py-6 bg-gradient-to-b from-white via-slate-50 to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/20 backdrop-blur-sm relative z-10 overflow-hidden">
      {/* Background subtle patterns - reduced */}
      <div className="absolute inset-0 z-0 opacity-3 dark:opacity-5">
        <div className="absolute top-0 left-10 w-16 h-16 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-20 h-20 rounded-full bg-indigo-400 blur-3xl"></div>
      </div>
      
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        {/* Upper section with logo and links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 pb-1">
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </div>
            <motion.p 
              className="text-sm text-slate-500 dark:text-slate-400 mt-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            >
              {process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
            </motion.p>
            {process.env.NEXT_PUBLIC_AUTHOR_LOCATION && (
              <motion.p 
                className="text-xs text-slate-400 dark:text-slate-500 flex items-center"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              >
                <span className="inline-block h-1 w-1 rounded-full bg-blue-400 dark:bg-blue-500 mr-1.5"></span>
                {process.env.NEXT_PUBLIC_AUTHOR_LOCATION}
              </motion.p>
            )}
          </motion.div>

          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex flex-col space-y-1.5">
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-400 dark:text-slate-500 mb-1">Navigation</div>
              <motion.div whileHover={{ x: 3 }} className="group">
                <Link href="/" className="text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                  <span>Home</span>
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-indigo-500 mt-0.5 transition-all duration-300"></div>
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 3 }} className="group">
                <Link href="/blog" className="text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                  <span>Blog</span>
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-indigo-500 mt-0.5 transition-all duration-300"></div>
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 3 }} className="group">
                <Link href="/about" className="text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                  <span>About</span>
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-indigo-500 mt-0.5 transition-all duration-300"></div>
                </Link>
              </motion.div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-400 dark:text-slate-500 mb-1">Connect</div>
              <motion.div whileHover={{ x: 3 }} className="group">
                <a href={process.env.NEXT_PUBLIC_GITHUB_URL} target="_blank" rel="noreferrer" className="text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                  <Github className="w-3.5 h-3.5 mr-1.5" />
                  <span>GitHub</span>
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-indigo-500 mt-0.5 transition-all duration-300"></div>
                </a>
              </motion.div>
              <motion.div whileHover={{ x: 3 }} className="group">
                <a href={process.env.NEXT_PUBLIC_LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                  <Linkedin className="w-3.5 h-3.5 mr-1.5" />
                  <span>LinkedIn</span>
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-indigo-500 mt-0.5 transition-all duration-300"></div>
                </a>
              </motion.div>
              {process.env.NEXT_PUBLIC_HUGGINGFACE_URL && (
                <motion.div whileHover={{ x: 3 }} className="group">
                  <a href={process.env.NEXT_PUBLIC_HUGGINGFACE_URL} target="_blank" rel="noreferrer" className="text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                    <HuggingFaceIcon />
                    <span>HuggingFace</span>
                    <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-indigo-500 mt-0.5 transition-all duration-300"></div>
                  </a>
                </motion.div>
              )}
              <motion.div whileHover={{ x: 3 }} className="group">
                <a href={process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL} target="_blank" rel="noreferrer" className="text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
                  <Coffee className="w-3.5 h-3.5 mr-1.5" />
                  <span>Support</span>
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-indigo-500 mt-0.5 transition-all duration-300"></div>
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Divider with animation */}
        <div className="relative h-px my-4">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
          <motion.div 
            className="absolute h-full w-40 bg-gradient-to-r from-transparent via-blue-400 dark:via-blue-500 to-transparent"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: ['calc(-100%)', 'calc(100vw)'], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
          />
        </div>
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center mb-3 md:mb-0">
            <div className="flex items-center">
              <span>© {process.env.NEXT_PUBLIC_COPYRIGHT_YEAR || year} </span>
              <motion.span 
                className="mx-1 text-blue-500 dark:text-blue-400 font-medium"
                animate={{ opacity: [0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                {process.env.NEXT_PUBLIC_AUTHOR_NAME}
              </motion.span>
              <span className="mx-2">•</span>
              <span className="text-xs">All rights reserved</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.div 
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 500 } }} 
              className="text-xs bg-slate-100/80 dark:bg-slate-800/50 px-3 py-1.5 rounded-full text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors shadow-sm"
            >
              <div className="flex items-center">
                <Code className="w-3 h-3 mr-1.5 text-blue-500" />
                <span>v{process.env.NEXT_PUBLIC_SITE_VERSION}</span>
              </div>
            </motion.div>
            
            <motion.a 
              href={process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL} 
              target="_blank" 
              rel="noreferrer"
              onMouseEnter={() => {
                heartScale.set(1.2);
                setHovered(true);
              }}
              onMouseLeave={() => {
                heartScale.set(1);
                setHovered(false);
              }}
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 500 } }} 
              className="relative text-xs bg-gradient-to-r from-amber-500/90 to-amber-600/90 hover:from-amber-500 hover:to-amber-600 px-4 py-1.5 rounded-full text-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="flex items-center">
                <motion.div style={{ scale: heartSpring, rotate: heartRotate }} className="mr-1.5">
                  <Heart className="w-3 h-3" fill={hovered ? "white" : "none"} />
                </motion.div>
                <span className="font-medium">Support</span>
                
                {/* Animated particles on hover */}
                <AnimatePresence>
                  {hovered && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, y: 0, x: 0 }}
                          animate={{ 
                            scale: [0, 1, 0],
                            y: [0, -20 * (i % 2 ? 1.5 : 1)],
                            x: [0, (i - 2) * 10]
                          }}
                          exit={{ scale: 0, y: 0, x: 0 }}
                          transition={{ duration: 0.8 }}
                          className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-white"
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Gradient shine animation */}
              <motion.div 
                className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            </motion.a>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-4 left-4 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 text-white shadow-lg flex items-center justify-center transform transition-all duration-300 ${
          hasScrolled ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90'
        }`}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to top"
      >
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
          
          <motion.div 
            className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full ring-2 ring-green-400/30"
            animate={{ 
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 0 0 rgba(74, 222, 128, 0.5)",
                "0 0 0 4px rgba(74, 222, 128, 0.2)",
                "0 0 0 0 rgba(74, 222, 128, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.button>
    </footer>
  )
} 