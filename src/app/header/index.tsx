'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu as MenuIcon, X, Home, BookOpen, User, Mail, Moon, Sun } from 'lucide-react'
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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md border-b border-base-300/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <motion.div 
            className="font-satoshi font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Minh&apos;s Space
          </motion.div>
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
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors relative group',
                    isActive
                      ? 'text-primary'
                      : 'text-base-content/70 hover:text-base-content'
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Active item background */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-md -z-0"
                      layoutId="navbar-bg"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  
                  {/* Active item indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
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
            
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-base-200/50 text-base-content/70 hover:text-base-content hover:bg-base-200 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {mounted && <PlayButton />}
          
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 mx-2 rounded-full bg-base-200/50 text-base-content/70 hover:text-base-content hover:bg-base-200 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          )}
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md bg-base-200/50 text-base-content/70 hover:text-base-content hover:bg-base-200 transition-colors"
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
          className="md:hidden bg-base-100 border-b border-base-300/30"
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
                    'flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors gap-3',
                    isActive
                      ? 'text-primary bg-primary/5'
                      : 'text-base-content/70 hover:text-base-content hover:bg-base-200/50'
                  )}
                >
                  <Icon size={16} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </motion.div>
      )}
    </header>
  )
}
