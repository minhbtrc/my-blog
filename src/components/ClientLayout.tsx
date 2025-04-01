'use client'
import { useState, useEffect, useRef } from 'react'
import { AppProgressBar as NextProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from 'next-themes'
import { MotionConfig } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code, Home, User, Mail, Menu, X, Moon, Sun, Github, Command, Terminal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { cn } from '../lib/utils'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Footer from './footer'

// Animation variants for typing effect
const typingContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const typingCharacter = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showCommandMenu, setShowCommandMenu] = useState(false)
  const [typedPath, setTypedPath] = useState("")
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()

  // Track scroll position for sticky header
  const [scrolled, setScrolled] = useState<boolean>(false)
  const prevScrollY = useRef(0)
  const [cursorVisible, setCursorVisible] = useState(true)

  // Get terminal path based on current pathname
  const getTerminalPath = () => {
    if (pathname === '/') return '~/home'
    if (pathname === '/blog') return '~/blog'
    if (pathname === '/about') return '~/about'
    if (pathname === '/contact') return '~/contact'
    if (pathname?.startsWith('/blog/')) return '~/blog/post'
    return `~${pathname}`
  }

  useEffect(() => {
    setMounted(true)
    
    // Update the theme attributes based on the resolved theme
    if (resolvedTheme) {
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(resolvedTheme)
      document.body.setAttribute('data-theme', resolvedTheme === 'dark' ? 'dark' : 'light')
    }
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
      prevScrollY.current = currentScrollY
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Listen for Cmd+K to open command menu
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommandMenu(prev => !prev)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 600)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
      clearInterval(cursorInterval)
    }
  }, [resolvedTheme])

  // Typing animation for terminal path
  useEffect(() => {
    if (!mounted) return

    const path = getTerminalPath()
    setTypedPath("")
    
    let currentIndex = 0
    const pathInterval = setInterval(() => {
      if (currentIndex < path.length) {
        setTypedPath(path.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(pathInterval)
      }
    }, 30)
    
    return () => {
      clearInterval(pathInterval)
    }
  }, [pathname, mounted])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { path: '/blog', label: 'Blog', icon: <Code className="w-4 h-4" /> },
    { path: '/about', label: 'About', icon: <User className="w-4 h-4" /> },
    { path: '/contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> }
  ]

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MotionConfig reducedMotion="user">
        <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
          {/* Terminal Header */}
          <header
            className={cn(
              "sticky top-0 z-50 w-full transition-all duration-300 font-mono border-b border-base-200/10",
              scrolled 
                ? "bg-base-100/90 backdrop-blur" 
                : "bg-transparent"
            )}
          >
            <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
              {/* Left: Mac buttons + terminal */}
              <div className="flex items-center gap-3">
                {/* Mac-style window controls */}
                <div className="flex gap-1" aria-hidden="true">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
                </div>
                
                {/* Terminal path display */}
                <Link href="/" className="group">
                  <span className="text-xs font-mono text-base-content/70">
                    <span className="text-primary">[minh@ai-lab]</span>
                    <span className="text-base-content/60 mx-1">-</span>
                    <span className="text-primary">[{typedPath}]</span>
                    <span 
                      className={cn(
                        "inline-block w-2 h-4 align-middle ml-1 bg-primary",
                        cursorVisible ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </span>
                </Link>
              </div>
              
              {/* Center: Navigation Links */}
              <nav className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path))
                        ? "text-base-content" 
                        : "text-base-content/70 hover:text-base-content"
                    )}
                  >
                    <span className="relative">
                      {link.label.toLowerCase()}
                      {(pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path))) && (
                        <motion.span
                          className="absolute -bottom-1 left-0 w-full h-px bg-primary"
                          layoutId="navbar-indicator"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </span>
                  </Link>
                ))}
              </nav>
              
              {/* Right: Theme + Search */}
              <div className="flex items-center gap-4 text-sm font-mono text-base-content/70">
                {/* Search Command */}
                <button 
                  className="hover:text-base-content transition-colors cursor-pointer"
                  onClick={() => setShowCommandMenu(true)}
                >
                  <span>⌘K</span>
                </button>
                
                {/* Theme Toggle */}
                <ThemeToggle />
                
                {/* Mobile Menu Toggle - Only visible on smaller screens */}
                <button
                  type="button"
                  className="hover:text-base-content cursor-pointer md:hidden"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </header>

          {/* Mobile menu */}
          <Transition show={mobileMenuOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setMobileMenuOpen}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
              </Transition.Child>

              <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-sm rounded-lg bg-base-100 p-6 shadow-lg font-mono">
                      <div className="flex items-center justify-between mb-5">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                          <span className="flex items-center gap-2">
                            <Terminal className="h-4 w-4 text-primary" />
                            <span className="text-primary text-sm">
                              minh@ai-lab:~$ _
                            </span>
                          </span>
                        </Link>
                        <button
                          type="button"
                          className="text-base-content/70 hover:text-base-content"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                      
                      {/* Command menu trigger (mobile) */}
                      <div className="mb-4">
                        <button 
                          className="w-full text-xs text-base-content/60 hover:text-base-content border border-base-200 rounded-md px-4 py-2 flex items-center"
                          onClick={() => {
                            setShowCommandMenu(true)
                            setMobileMenuOpen(false)
                          }}
                        >
                          <Command className="h-4 w-4 mr-2" />
                          <span>Search...</span>
                          <kbd className="ml-auto font-mono text-xs bg-base-200 px-1.5 py-0.5 rounded">⌘K</kbd>
                        </button>
                      </div>
                      
                      <div className="space-y-1">
                        {navLinks.map((link) => (
                          <Link
                            key={link.path}
                            href={link.path}
                            className={cn(
                              "block px-3 py-2 text-xs transition-colors",
                              pathname === link.path
                                ? "text-primary border-l border-primary pl-2" 
                                : "text-base-content/70 hover:text-base-content hover:border-l hover:border-base-200 hover:pl-2"
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="flex items-center gap-3">
                              {link.icon}
                              {link.label.toLowerCase()}
                            </span>
                          </Link>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-base-200">
                        <a
                          href="https://github.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 text-xs text-base-content/70 hover:text-base-content"
                        >
                          <Github className="mr-3 h-4 w-4" />
                          github
                        </a>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          {/* Command Menu Modal - Terminal-styled */}
          {mounted && (
            <Transition show={showCommandMenu} as={Fragment}>
              <Dialog as="div" className="relative z-50" onClose={() => setShowCommandMenu(false)}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 z-50 overflow-y-auto">
                  <div className="flex min-h-full items-start justify-center p-4 pt-[20vh]">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-200"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-150"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md rounded-lg bg-base-100 shadow-lg border border-base-200 font-mono">
                        <div className="p-2">
                          <div className="flex items-center p-2 border-b border-base-200">
                            <span className="text-primary mr-2">$</span>
                            <input 
                              type="text" 
                              className="w-full bg-transparent focus:outline-none text-base-content text-sm" 
                              placeholder="search posts..."
                              autoFocus
                            />
                            <kbd className="ml-2 font-mono text-xs bg-base-200 px-1.5 py-0.5 rounded text-base-content/60">Esc</kbd>
                          </div>
                          
                          <div className="py-6 px-2 text-xs text-base-content/60 text-center">
                            # type to search blog posts and pages
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          )}

          {/* Main content */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Progress bar for navigation - more subtle */}
          <NextProgressBar
            height="1px"
            color="var(--color-primary, #2563eb)"
            options={{ showSpinner: false }}
            shallowRouting
          />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

// Simplified theme toggle with terminal-style
function ThemeToggle({ isMobile = false }: { isMobile?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      aria-label="Toggle theme"
      className="text-base-content/70 hover:text-base-content transition-all hover:rotate-180 duration-300 cursor-pointer"
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          {isDark ? (
            <span className="text-sm">🌙</span>
          ) : (
            <span className="text-sm">☀️</span>
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
} 