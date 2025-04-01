'use client'
import { useState, useEffect, useRef } from 'react'
import { AppProgressBar as NextProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from 'next-themes'
import { MotionConfig } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code, Home, User, Mail, Menu, X, Moon, Sun, Github, Command } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { cn } from '../lib/utils'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Footer from './footer'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showCommandMenu, setShowCommandMenu] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()

  // Track scroll position for sticky header
  const [scrolled, setScrolled] = useState<boolean>(false)
  const prevScrollY = useRef(0)

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
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [resolvedTheme])

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
          {/* Header */}
          <header
            className={cn(
              "sticky top-0 z-50 w-full transition-all duration-300 border-b",
              scrolled 
                ? "backdrop-blur-md bg-base-100/80 border-base-200" 
                : "bg-transparent border-transparent"
            )}
          >
            <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="font-medium text-base text-base-content group">
                <span className="flex items-center gap-2">
                  <span className="relative h-8 w-8 overflow-hidden rounded-md bg-primary flex items-center justify-center">
                    <span className="text-primary-content font-medium">D</span>
                  </span>
                  <span className="font-mono font-medium tracking-tight">
                    DevBlog
                  </span>
                </span>
              </Link>

              {/* Command menu trigger (desktop) */}
              <div className="hidden md:flex items-center">
                <button 
                  className="mr-6 text-xs text-base-content/60 hover:text-base-content border border-base-200 rounded-md px-3 py-1.5 flex items-center gap-2"
                  onClick={() => setShowCommandMenu(true)}
                >
                  <Command className="h-3.5 w-3.5" />
                  <span>Search...</span>
                  <kbd className="ml-2 font-mono text-[10px] bg-base-200 px-1.5 py-0.5 rounded">⌘K</kbd>
                </button>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={cn(
                      "relative px-3 py-2 rounded-md text-sm transition-colors",
                      pathname === link.path
                        ? "text-primary font-medium"
                        : "text-base-content/70 hover:text-base-content"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {link.label}
                    </span>
                    {pathname === link.path && (
                      <motion.span
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}
                <div className="ml-2 p-1">
                  <ThemeToggle />
                </div>
              </nav>

              {/* Mobile menu button */}
              <div className="flex md:hidden items-center gap-2">
                <ThemeToggle isMobile />
                <button
                  type="button"
                  className="rounded-md text-base-content/70 hover:text-base-content"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Menu className="h-5 w-5" aria-hidden="true" />
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
                    <Dialog.Panel className="w-full max-w-sm rounded-lg bg-base-100 p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-5">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                          <span className="flex items-center gap-2">
                            <span className="relative h-7 w-7 overflow-hidden rounded-md bg-primary flex items-center justify-center">
                              <span className="text-primary-content font-medium">D</span>
                            </span>
                            <span className="font-mono font-medium text-sm">
                              DevBlog
                            </span>
                          </span>
                        </Link>
                        <button
                          type="button"
                          className="rounded-md text-base-content/70 hover:text-base-content"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                      
                      {/* Command menu trigger (mobile) */}
                      <div className="mb-4">
                        <button 
                          className="w-full text-sm text-base-content/60 hover:text-base-content border border-base-200 rounded-md px-4 py-2 flex items-center"
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
                              "block rounded-md px-3 py-2 text-base transition-colors",
                              pathname === link.path
                                ? "bg-base-200 text-primary font-medium"
                                : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="flex items-center gap-3">
                              {link.icon}
                              {link.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-base-200">
                        <a
                          href="https://github.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center rounded-md px-3 py-2 text-base text-base-content/70 hover:bg-base-200 hover:text-base-content"
                        >
                          <Github className="mr-3 h-4 w-4" />
                          GitHub
                        </a>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          {/* Command Menu Modal - Placeholder for now, would implement full search functionality */}
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
                      <Dialog.Panel className="w-full max-w-md rounded-lg bg-base-100 shadow-lg border border-base-200">
                        <div className="p-2">
                          <div className="flex items-center p-2 border-b border-base-200">
                            <Command className="h-4 w-4 mr-2 text-base-content/50" />
                            <input 
                              type="text" 
                              className="w-full bg-transparent focus:outline-none text-base-content" 
                              placeholder="Search posts, topics..."
                              autoFocus
                            />
                            <kbd className="ml-2 font-mono text-xs bg-base-200 px-1.5 py-0.5 rounded text-base-content/60">Esc</kbd>
                          </div>
                          
                          <div className="py-6 px-2 text-sm text-base-content/60 text-center">
                            Type to search blog posts and pages
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

// Simplified theme toggle
function ThemeToggle({ isMobile = false }: { isMobile?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      aria-label="Toggle theme"
      className={cn(
        "flex items-center justify-center rounded-md transition-colors",
        isMobile 
          ? "text-base-content/70 hover:text-base-content" 
          : "h-9 w-9 bg-base-200/50 text-base-content hover:bg-base-200"
      )}
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 20 }}
          transition={{ duration: 0.15 }}
        >
          {isDark ? (
            <Moon className="h-[18px] w-[18px]" />
          ) : (
            <Sun className="h-[18px] w-[18px]" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
} 