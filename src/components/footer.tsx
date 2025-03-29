'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Github, Twitter, Rss, MessagesSquare, FileCode, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const [year] = useState(new Date().getFullYear())
  const [hasScrolled, setHasScrolled] = useState(false)
  
  useEffect(() => {
    const checkScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', checkScroll)
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])
  
  return (
    <footer className="border-t border-gray-800/40 dark:border-slate-800/40 py-4 bg-gray-950/60 dark:bg-slate-900/60 backdrop-blur-sm relative z-10">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-gray-400 dark:text-gray-400 flex items-center">
              <span className="text-green-400 dark:text-green-400 font-bold mr-1.5">$</span>
              <span className="mr-1">whoami</span>
              <motion.span 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                className="text-gray-300 dark:text-gray-300"
              >
                _
              </motion.span>
            </span>
            <span className="bg-gray-800/80 dark:bg-slate-800/80 px-2 py-0.5 rounded text-xs font-mono text-gray-300 dark:text-gray-300 border border-gray-700/50 dark:border-gray-700/50">
              minh@ai-engineer
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/blog" className="px-2 py-0.5 text-xs font-mono rounded bg-gray-800/80 dark:bg-slate-800/80 text-gray-300 dark:text-gray-300 border border-gray-700/50 dark:border-slate-700/50 hover:bg-gray-700 dark:hover:bg-slate-700 transition-colors flex items-center">
                  <FileCode className="w-3 h-3 mr-1" />
                  blog
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/about" className="px-2 py-0.5 text-xs font-mono rounded bg-gray-800/80 dark:bg-slate-800/80 text-gray-300 dark:text-gray-300 border border-gray-700/50 dark:border-slate-700/50 hover:bg-gray-700 dark:hover:bg-slate-700 transition-colors flex items-center">
                  <MessagesSquare className="w-3 h-3 mr-1" />
                  about
                </Link>
              </motion.div>
            </div>
            
            <div className="flex space-x-1.5">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                <a href="https://github.com/minhbtc-99" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
                  <div className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-800/80 dark:bg-slate-800/80 hover:bg-gray-700 dark:hover:bg-slate-700 border border-gray-700/50 dark:border-slate-700/50">
                    <Github className="w-3.5 h-3.5" />
                  </div>
                </a>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                <a href="https://twitter.com/minhbtc_" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
                  <div className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-800/80 dark:bg-slate-800/80 hover:bg-gray-700 dark:hover:bg-slate-700 border border-gray-700/50 dark:border-slate-700/50">
                    <Twitter className="w-3.5 h-3.5" />
                  </div>
                </a>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link href="/rss" className="text-gray-400 hover:text-gray-300 transition-colors">
                  <div className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-800/80 dark:bg-slate-800/80 hover:bg-gray-700 dark:hover:bg-slate-700 border border-gray-700/50 dark:border-slate-700/50">
                    <Rss className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex justify-between items-center text-[10px] font-mono">
          <span className="bg-gray-800/70 dark:bg-slate-800/70 px-2 py-0.5 rounded text-gray-500 dark:text-gray-500">v0.2.1</span>
          <div className="flex items-center text-gray-500 dark:text-gray-500">
            <span>exit_code=</span>
            <span className="text-green-400 dark:text-green-400 mr-1">0</span>
            <span className="mr-1">•</span>
            <span className="text-blue-400 dark:text-blue-400">{year}</span>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white shadow-lg flex items-center justify-center transform transition-all duration-300 ${
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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
          
          <motion.div 
            className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.button>
    </footer>
  )
} 