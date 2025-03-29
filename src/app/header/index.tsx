'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu as MenuIcon, X, Home, BookOpen, User, Mail, Terminal, Command } from 'lucide-react'
import clsx from 'clsx'
import PlayButton from './playButton'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'About', href: '/about', icon: User },
  { name: 'Contact', href: '/contact', icon: Mail },
]

export default function Header() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-gray-950/60 dark:bg-slate-900/60 backdrop-blur-md border-b border-gray-800/40 dark:border-slate-800/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Terminal-style Logo */}
        <Link href="/" className="flex items-center group">
          <div className="flex items-center bg-gray-800/80 dark:bg-slate-800/80 px-3 py-1.5 rounded border border-gray-700/50 dark:border-slate-700/50 group-hover:bg-gray-700/80 dark:group-hover:bg-slate-700/80 transition-colors">
            <Terminal className="h-4 w-4 text-green-400 dark:text-green-400 mr-2" />
            <div className="flex items-center">
              <span className="text-green-400 dark:text-green-400 font-bold mr-1.5 text-sm font-mono">$</span>
              <span className="font-mono text-gray-300 dark:text-gray-300 text-sm mr-1">whoami</span>
              <motion.span 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                className="text-gray-300 dark:text-gray-300 font-mono text-sm"
              >
                _
              </motion.span>
            </div>
          </div>
          <div className="ml-2 font-mono text-xs px-2 py-0.5 bg-gray-800/80 dark:bg-slate-800/80 text-gray-300 dark:text-gray-300 rounded border border-gray-700/50 dark:border-slate-700/50 hidden sm:block">
            minh@ai-engineer
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3">
          <nav className="flex items-center mr-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname?.startsWith(item.href))
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors relative group font-mono',
                    isActive
                      ? 'text-blue-400 dark:text-blue-400'
                      : 'text-gray-400 dark:text-gray-400 hover:text-gray-300 dark:hover:text-gray-300'
                  )}
                >
                  <span className="relative z-10 flex items-center">
                    {isActive && <Command className="h-3.5 w-3.5 mr-1.5" />}
                    {item.name.toLowerCase()}
                  </span>
                  
                  {/* Active item background */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gray-800/80 dark:bg-slate-800/80 rounded-md -z-0 border border-gray-700/50 dark:border-slate-700/50"
                      layoutId="navbar-bg"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  
                  {/* Active item indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-500 rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {mounted && <PlayButton />}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {mounted && <PlayButton />}
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md bg-gray-800/80 dark:bg-slate-800/80 text-gray-300 dark:text-gray-300 hover:text-gray-100 dark:hover:text-gray-100 hover:bg-gray-700/80 dark:hover:bg-slate-700/80 transition-colors ml-2 border border-gray-700/50 dark:border-slate-700/50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-gray-900/95 dark:bg-slate-900/95 border-b border-gray-800/40 dark:border-slate-800/40"
        >
          <nav className="flex flex-col p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname?.startsWith(item.href))
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  className={clsx(
                    'flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors gap-3 my-1 font-mono',
                    isActive
                      ? 'text-blue-400 dark:text-blue-400 bg-gray-800 dark:bg-slate-800 border border-gray-700/50 dark:border-slate-700/50'
                      : 'text-gray-400 dark:text-gray-400 hover:text-gray-300 dark:hover:text-gray-300 hover:bg-gray-800/50 dark:hover:bg-slate-800/50'
                  )}
                >
                  <Icon size={16} />
                  {item.name.toLowerCase()}
                </Link>
              )
            })}
            
            <div className="mt-3 pt-3 border-t border-gray-800/40 dark:border-slate-800/40">
              <div className="flex items-center bg-gray-800/60 dark:bg-slate-800/60 px-2 py-1 rounded text-xs font-mono text-gray-400 dark:text-gray-400">
                <span className="text-green-400 dark:text-green-400">$</span>
                <span className="ml-1.5">minh@ai-engineer</span>
              </div>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
