'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu as MenuIcon, X, Home, BookOpen, User, Mail, Terminal, Command, Code, ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import PlayButton from './playButton'
import Theme from './theme'

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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-gradient-to-r from-white/95 to-purple-50/95 dark:from-slate-900/95 dark:to-purple-950/95" : "bg-transparent"
    } backdrop-blur-md ${
      scrolled ? "border-b border-purple-100 dark:border-purple-900/20 shadow-sm" : ""
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Modern Logo - Updated */}
        <Link href="/" className="flex items-center group transition-all duration-300 hover:scale-105">
          <div className="flex items-center">
            <div className="flex items-center mr-2 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex justify-center items-center rounded-full bg-white dark:bg-slate-900 p-2 shadow-md">
                <Code className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400">
                MinhBTC
              </span>
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-indigo-500 mt-0.5 transition-all duration-300"></div>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <nav className="flex items-center mr-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname?.startsWith(item.href))
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group',
                    isActive
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
                  )}
                >
                  <span className="relative z-10 flex items-center">
                    <item.icon className={`${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} h-3.5 w-3.5 mr-1.5 transition-opacity duration-200`} />
                    {item.name}
                  </span>
                  
                  {/* Subtle hover effect */}
                  <span className={`absolute inset-0 rounded-md -z-0 transition-colors duration-200 ${
                    isActive ? 'bg-purple-50 dark:bg-purple-900/20' : 'group-hover:bg-slate-50 dark:group-hover:bg-slate-800/20'
                  }`}></span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {mounted && <PlayButton />}
            
            {/* Theme Toggle */}
            <Theme />
            
            {/* Contact button */}
            <Link 
              href="/contact" 
              className={`
                hidden sm:flex items-center gap-1 text-sm px-3 py-1.5 rounded-full 
                ${scrolled 
                  ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-700 text-white shadow-md' 
                  : 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800/40 border border-purple-200 dark:border-purple-800/30'
                }
                transition-all duration-300
              `}
            >
              <Mail className="h-3.5 w-3.5 mr-0.5" />
              <span>Contact</span>
              <ArrowRight className="h-3 w-3 ml-0.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {mounted && <PlayButton />}
          
          {/* Mobile Theme Toggle */}
          <Theme />
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`
              p-2 rounded-full 
              ${scrolled 
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg'
                : 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800/40 border border-purple-200 dark:border-purple-800/30'
              }
              transition-all ml-2 hover:scale-105 active:scale-95
            `}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <MenuIcon size={20} />
              </motion.div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800/50"
          >
            <nav className="flex flex-col p-4">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname?.startsWith(item.href))
                const Icon = item.icon
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={clsx(
                        'flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors gap-3 my-1',
                        isActive
                          ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/20'
                      )}
                    >
                      <Icon size={16} />
                      {item.name}
                    </Link>
                  </motion.div>
                )
              })}
              
              <motion.div 
                className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-center">
                  <Link 
                    href="/contact" 
                    onClick={closeMenu}
                    className="flex items-center gap-2 text-sm px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-sm"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contact Me</span>
                  </Link>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
