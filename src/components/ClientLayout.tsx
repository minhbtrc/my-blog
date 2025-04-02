'use client'
import { useState, useEffect, useRef } from 'react'
import { AppProgressBar as NextProgressBar } from 'next-nprogress-bar'
import { MotionConfig } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code, Home, User, Mail, Menu, X, Github, Command, Terminal, Disc3 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { cn } from '../lib/utils'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Footer from './footer'
import dynamic from 'next/dynamic'

// Dynamically import ReactPlayer to prevent SSR issues
const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false })


// PlayButton component for terminal-style music control
function PlayButton() {
  const [playing, setPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const playerRef = useRef(null)
  const hasUrl = !!process.env.NEXT_PUBLIC_LISTEN_URL
  
  useEffect(() => {
    setMounted(true)
    
    // Check for previous user interaction
    const hasUserInteracted = localStorage.getItem('music-interaction')
    if (hasUserInteracted === 'true') {
      setHasInteracted(true)
    }
    
    // Listen for first interaction
    const handleFirstInteraction = () => {
      setHasInteracted(true)
      localStorage.setItem('music-interaction', 'true')
    }
    
    window.addEventListener('click', handleFirstInteraction, { once: true })
    
    return () => {
      window.removeEventListener('click', handleFirstInteraction)
    }
  }, [])
  
  const togglePlay = () => {
    setPlaying(prev => !prev)
  }
  
  if (!mounted || !hasUrl) {
    return null
  }
  
  return (
    <>
      {/* Hidden player */}
      <div className="fixed top-0 left-0 invisible pointer-events-none">
        <ReactPlayer
          ref={playerRef}
          url={process.env.NEXT_PUBLIC_LISTEN_URL}
          playing={playing && hasInteracted}
          loop
          volume={0.7}
          muted={false}
          controls={false}
          width="0"
          height="0"
          onError={(e) => console.error("Player error:", e)}
        />
      </div>
      
      {/* Button */}
      <button
        onClick={togglePlay}
        className="relative group text-base-content/70 hover:text-base-content transition-colors cursor-pointer"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        <Disc3 
          className={cn(
            "h-4 w-4",
            playing && hasInteracted && "animate-[spin_3s_linear_infinite]"
          )}
        />
        
        {/* Tooltip on hover */}
        <span className="hidden group-hover:block absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs font-mono bg-base-300 text-base-content px-2 py-1 rounded whitespace-nowrap z-50">
          {playing ? "Pause" : "Listen"} {!hasInteracted && "(Click to enable)"}
        </span>
      </button>
    </>
  )
}

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
  const [currentTheme, setCurrentTheme] = useState<string | undefined>('loading') // Track theme separately

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
      console.log('Initial theme:', resolvedTheme);
      setCurrentTheme(resolvedTheme);
      
      // Ensure the theme is applied to the document
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(resolvedTheme)
      document.documentElement.setAttribute('data-theme', resolvedTheme)
      document.body.setAttribute('data-theme', resolvedTheme)
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

  // Monitor theme changes at the document level
  useEffect(() => {
    if (!mounted) return;
    
    // Set initial theme based on document class
    const root = document.documentElement;
    const initialHasLightClass = root.classList.contains('light');
    const initialHasDarkClass = root.classList.contains('dark');
    const initialDataTheme = root.getAttribute('data-theme');
    
    let initialTheme = currentTheme;
    if (initialHasLightClass || initialDataTheme === 'light') {
      initialTheme = 'light';
    } else if (initialHasDarkClass || initialDataTheme === 'dark') {
      initialTheme = 'dark';
    }
    
    console.log('Initial document theme detection:', {
      hasLightClass: initialHasLightClass,
      hasDarkClass: initialHasDarkClass,
      dataTheme: initialDataTheme,
      detectedTheme: initialTheme,
      currentThemeState: currentTheme
    });
    
    if (initialTheme && initialTheme !== currentTheme) {
      setCurrentTheme(initialTheme);
    }
    
    // Monitor class changes for better theme detection
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === 'class' ||
          mutation.attributeName === 'data-theme'
        ) {
          const element = mutation.target as HTMLElement;
          const hasLightClass = element.classList.contains('light');
          const hasDarkClass = element.classList.contains('dark');
          const dataTheme = element.getAttribute('data-theme');
          
          let detectedTheme;
          if (hasLightClass || dataTheme === 'light') {
            detectedTheme = 'light';
          } else if (hasDarkClass || dataTheme === 'dark') {
            detectedTheme = 'dark';
          } else {
            console.warn('Observer could not determine theme from classes or attributes');
            return; // Skip processing if we can't detect theme
          }
          
          console.log('Observer detected DOM change:', {
            attributeChanged: mutation.attributeName,
            hasLightClass,
            hasDarkClass,
            dataTheme,
            detectedTheme,
            currentThemeState: currentTheme
          });
          
          if (detectedTheme && detectedTheme !== currentTheme) {
            console.log('Observer detected theme change to:', detectedTheme);
            setCurrentTheme(detectedTheme);
            
            // Apply CSS variables immediately
            if (detectedTheme === 'light') {
              document.documentElement.style.setProperty('--base-100', '#ffffff');
              document.documentElement.style.setProperty('--base-content', '#0f172a');
              document.documentElement.style.setProperty('--primary', '#059669');
            } else {
              document.documentElement.style.setProperty('--base-100', '#0f172a');
              document.documentElement.style.setProperty('--base-content', '#f8fafc');
              document.documentElement.style.setProperty('--primary', '#3b82f6');
            }
            
            // Force a reflow to ensure theme changes are applied
            document.body.style.display = 'none';
            document.body.offsetHeight;
            document.body.style.display = '';
          }
        }
      });
    });
    
    // Observe document element for class and data-theme changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    });
    
    return () => {
      observer.disconnect();
    };
  }, [mounted, currentTheme]);

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
                  <span className="text-primary">[minhbtc@ai-eng]</span>
                  <span className="text-base-content/60 mx-1">-</span>
                  <span className="text-primary">[{typedPath}]</span>
                  {/* <span 
                    className={cn(
                      "inline-block w-2 h-4 align-middle ml-1 bg-primary",
                      cursorVisible ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
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
              {/* Remove Command K button but keep the functionality via keyboard shortcut */}
              
              {/* PlayButton - Music control */}
              <PlayButton />
              
              {/* Theme Toggle */}
              <button
                aria-label="Toggle theme"
                className={`transition-all dark-transition hover:rotate-180 duration-300 cursor-pointer ${
                  resolvedTheme === 'dark' 
                    ? 'text-blue-400/80 hover:text-blue-400' 
                    : 'text-emerald-600/80 hover:text-emerald-600'
                }`}
                onClick={() => {
                  // Use currentTheme as fallback if resolvedTheme is undefined
                  const activeTheme = resolvedTheme || currentTheme || 'light';
                  const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
                  console.log(`Switching theme from ${activeTheme} to ${newTheme}`);
                  
                  // Update the state
                  setCurrentTheme(newTheme);
                  setTheme(newTheme);
                  
                  // Force immediate DOM update for daisyUI
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(newTheme);
                  document.documentElement.setAttribute('data-theme', newTheme);
                  
                  // Apply theme-specific colors manually to speed up transition
                  if (newTheme === 'light') {
                    document.documentElement.style.setProperty('--base-100', '#ffffff');
                    document.documentElement.style.setProperty('--base-content', '#0f172a');
                    document.documentElement.style.setProperty('--primary', '#059669');
                  } else {
                    document.documentElement.style.setProperty('--base-100', '#0f172a');
                    document.documentElement.style.setProperty('--base-content', '#f8fafc');
                    document.documentElement.style.setProperty('--primary', '#3b82f6');
                  }
                  
                  // Force a reflow/repaint to ensure styles are applied immediately
                  document.body.style.display = 'none';
                  document.body.offsetHeight; // Trigger reflow
                  document.body.style.display = '';
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={resolvedTheme === 'dark' ? 'dark' : 'light'}
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                  >
                    {
                    resolvedTheme === 'dark' ? (
                      <span className="text-sm relative">🌙</span>
                    ) : (<span className="text-sm relative">☀️</span>)
                    }
                  </motion.div>
                </AnimatePresence>
              </button>
              
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
                          minhbtc@ai-eng:~$ _
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
                        href={process.env.NEXT_PUBLIC_GITHUB_URL}
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
  );
} 