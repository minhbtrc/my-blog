'use client'
import { useState, useEffect, useRef } from 'react'
import { AppProgressBar as NextProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from 'next-themes'
import { MotionConfig } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code, Home, User, Mail, Menu, X, Moon, Sun, Disc3, Coffee, Github } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import clsx from 'clsx'
import Footer from './footer'
import dynamic from 'next/dynamic'
import { cn } from '../lib/utils'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// Import ReactPlayer dynamically to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

// Add the HuggingFace icon component at the end of imports
const HuggingFaceIcon = () => (
  <svg viewBox="0 0 95 88" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
    <path d="M47.2119 0C26.7279 0 10.1255 16.7482 10.1255 37.4223C10.1255 43.5567 11.8306 49.2766 14.8211 54.2455L0 86.5839H25.5591L32.2099 69.608C36.9538 71.6223 41.9637 72.8446 47.2119 72.8446C67.696 72.8446 84.2984 56.0964 84.2984 35.4223C84.2984 15.8304 67.696 0 47.2119 0ZM26.1682 47.4522C22.1547 47.4522 18.8905 44.1879 18.8905 40.1744C18.8905 36.1608 22.1547 32.8966 26.1682 32.8966C30.1817 32.8966 33.446 36.1608 33.446 40.1744C33.446 44.1879 30.1817 47.4522 26.1682 47.4522ZM47.2119 39.2589C50.2204 39.2589 52.6591 36.8201 52.6591 33.8117C52.6591 30.8033 50.2204 28.3645 47.2119 28.3645C44.2035 28.3645 41.7647 30.8033 41.7647 33.8117C41.7647 36.8201 44.2035 39.2589 47.2119 39.2589ZM68.2557 47.4522C64.2422 47.4522 60.9779 44.1879 60.9779 40.1744C60.9779 36.1608 64.2422 32.8966 68.2557 32.8966C72.2692 32.8966 75.5334 36.1608 75.5334 40.1744C75.5334 44.1879 72.2692 47.4522 68.2557 47.4522Z" fill="currentColor"/>
  </svg>
);

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const playerRef = useRef(null)
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()

  // Track scroll position for sticky header
  const [scrolled, setScrolled] = useState<string>("up")
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
      if (currentScrollY > 80) {
        setScrolled(prevScrollY.current < currentScrollY ? "down" : "up")
      } else {
        setScrolled("up")
      }
      prevScrollY.current = currentScrollY
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Check if user has previously interacted with the music
    const hasUserInteracted = localStorage.getItem('music-interaction')
    if (hasUserInteracted === 'true') {
      setHasInteracted(true)
    }

    // Listen for the first user interaction on the page
    const handleFirstInteraction = () => {
      setHasInteracted(true)
      localStorage.setItem('music-interaction', 'true')
      
      // Remove the event listeners after first interaction
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }
    
    window.addEventListener('click', handleFirstInteraction)
    window.addEventListener('touchstart', handleFirstInteraction)
    window.addEventListener('keydown', handleFirstInteraction)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [resolvedTheme])

  // Matrix code rain effect
  useEffect(() => {
    if (!mounted) return;
    
    const createMatrixCodeRain = () => {
      if (resolvedTheme !== 'dark') return; // Only create matrix effect in dark mode
      
      // Create canvas element
      const canvas = document.createElement('canvas');
      canvas.className = 'matrix-code';
      document.body.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
      const fontSize = 14;
      const columns = Math.floor(canvas.width / fontSize);
      
      const drops: number[] = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
      }
      
      const draw = () => {
        if (!ctx) return;
        ctx.fillStyle = resolvedTheme === 'dark' ? 'rgba(15, 23, 42, 0.05)' : 'rgba(240, 249, 255, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = resolvedTheme === 'dark' ? '#22d3ee' : '#3b82f6';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
            drops[i] = 0;
          }
          
          drops[i]++;
        }
      };
      
      const matrixInterval = setInterval(draw, 45);
      
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        clearInterval(matrixInterval);
        window.removeEventListener('resize', handleResize);
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      };
    };
    
    const cleanup = createMatrixCodeRain();
    return cleanup;
  }, [mounted, resolvedTheme]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])
  
  // Function to toggle music playback
  const toggleMusic = () => {
    setIsPlaying(prev => !prev)
  }

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { path: '/blog', label: 'Blog', icon: <Code className="w-4 h-4" /> },
    { path: '/about', label: 'About', icon: <User className="w-4 h-4" /> },
    { path: '/contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> }
  ]

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MotionConfig reducedMotion="user">
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
          <div className={`w-full h-full min-h-screen ${mounted && resolvedTheme === 'dark' ? 'code-bg-dark' : 'code-bg-light'} bg-white dark:bg-slate-900`}>
            {/* Light particles effect (only in dark mode) */}
            {mounted && resolvedTheme === 'dark' && (
              <div className="light-particles">
                {[...Array(15)].map((_, i) => (
                  <div 
                    key={i}
                    className="light-particle"
                    style={{
                      width: `${Math.random() * 200 + 50}px`,
                      height: `${Math.random() * 200 + 50}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDuration: `${Math.random() * 30 + 15}s`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  />
                ))}
              </div>
            )}
            
            {mounted && process.env.NEXT_PUBLIC_LISTEN_URL && (
              <div className="hidden">
                <ReactPlayer
                  ref={playerRef}
                  url={process.env.NEXT_PUBLIC_LISTEN_URL}
                  playing={isPlaying && hasInteracted}
                  loop
                  volume={0.7}
                  muted={false}
                  controls={false}
                  onError={(e) => console.error("Player error:", e)}
                />
              </div>
            )}
            
            {/* Progress bar for page transitions */}
            <NextProgressBar
              height="3px"
              color={resolvedTheme === 'dark' ? '#22d3ee' : '#3b82f6'}
              options={{ showSpinner: false }}
              shallowRouting
            />
            
            {/* Header */}
            <header className={`sticky top-0 w-full z-30 transition-all duration-300 ${scrolled === "down" ? "-translate-y-full" : "translate-y-0"} ${mounted ? "bg-white/95 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800/50 dark:shadow-blue-900/5" : ""}`}>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  {/* Logo */}
                  <Link href="/" className="text-xl font-bold text-blue-700 dark:text-cyan-400 flex items-center hover:text-blue-800 dark:hover:text-cyan-300 transition-colors">
                    <div className="mr-2 w-8 h-8 rounded bg-gradient-to-br from-blue-700 to-indigo-700 dark:from-cyan-500 dark:to-blue-700 flex items-center justify-center text-white shadow-md">
                      <Code className="w-5 h-5" />
                    </div>
                    <span className="font-mono tracking-tight">{process.env.NEXT_PUBLIC_SITE_NAME?.toLowerCase() || 'minh.btc'}</span>
                  </Link>
                  
                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map(link => (
                      <Link
                        key={link.path}
                        href={link.path}
                        className={`text-sm transition-colors font-mono hover:text-blue-700 dark:hover:text-cyan-300 flex items-center ${
                          pathname === link.path 
                            ? 'text-blue-700 dark:text-cyan-400' 
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {link.icon}
                        <span className="ml-1">{link.label}</span>
                      </Link>
                    ))}
                    
                    {/* Theme toggle */}
                    <ThemeToggle />
                    
                    {/* Music toggle */}
                    {process.env.NEXT_PUBLIC_LISTEN_URL && mounted && (
                      <button 
                        onClick={toggleMusic}
                        className={`p-2 rounded-md bg-white dark:bg-slate-800/70 border border-slate-300 dark:border-blue-900/30 text-blue-700 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-700/40 dark:hover:border-blue-800/40 transition-all flex items-center shadow-sm`}
                        aria-label="Toggle music"
                      >
                        <Disc3 className={`h-4 w-4 ${isPlaying ? 'animate-spin' : ''}`} 
                          style={{ animationDuration: '3s' }} 
                        />
                      </button>
                    )}
                  </nav>
                  
                  {/* Mobile Navigation Button */}
                  <div className="flex md:hidden gap-3">
                    {/* Theme toggle */}
                    <ThemeToggle />
                    
                    {/* Music toggle - mobile */}
                    {process.env.NEXT_PUBLIC_LISTEN_URL && mounted && (
                      <button 
                        onClick={toggleMusic}
                        className={`p-2 rounded-md bg-white dark:bg-slate-800/70 border border-slate-300 dark:border-blue-900/30 text-blue-700 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-700/40 dark:hover:border-blue-800/40 transition-all flex items-center shadow-sm`}
                        aria-label="Toggle music"
                      >
                        <Disc3 className={`h-4 w-4 ${isPlaying ? 'animate-spin' : ''}`} 
                          style={{ animationDuration: '3s' }} 
                        />
                      </button>
                    )}
                    
                    <button
                      onClick={() => setMobileMenuOpen(true)}
                      className="p-2 rounded-md bg-white dark:bg-slate-800/70 border border-slate-300 dark:border-blue-900/30 text-blue-700 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-700/40 dark:hover:border-blue-800/40 transition-all flex items-center shadow-sm"
                    >
                      <Menu className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Mobile menu, show/hide based on menu state */}
              {mounted && (
                <div className="md:hidden">
                  <Transition.Root show={mobileMenuOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50" onClose={setMobileMenuOpen}>
                      <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/90 backdrop-blur-md" />
                      </Transition.Child>

                      <div className="fixed inset-0 z-50 flex">
                        <Transition.Child
                          as={Fragment}
                          enter="transition ease-in-out duration-300 transform"
                          enterFrom="-translate-x-full"
                          enterTo="translate-x-0"
                          leave="transition ease-in-out duration-300 transform"
                          leaveFrom="translate-x-0"
                          leaveTo="-translate-x-full"
                        >
                          <Dialog.Panel className="relative flex flex-col max-w-xs w-full bg-white dark:bg-slate-900 h-full overflow-y-auto pb-12 shadow-xl">
                            <div className="px-4 pt-5 pb-2 flex">
                              <button
                                type="button"
                                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400 dark:text-gray-500"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <span className="sr-only">Close menu</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>

                            <div className="mt-8 px-4">
                              <div className="space-y-6">
                                {navLinks.map(link => (
                                  <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`block text-lg transition-colors font-mono hover:text-blue-700 dark:hover:text-cyan-300 flex items-center ${
                                      pathname === link.path 
                                        ? 'text-blue-700 dark:text-cyan-400' 
                                        : 'text-slate-700 dark:text-slate-300'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {link.icon}
                                    <span className="ml-2">{link.label}</span>
                                  </Link>
                                ))}
                                
                                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                                  <ThemeToggle isMobile={true} />
                                </div>
                              </div>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </Dialog>
                  </Transition.Root>
                </div>
              )}
            </header>
            
            {/* Main Content */}
            <main className="flex-grow z-10 relative text-slate-800 dark:text-slate-200">{children}</main>
            
            {/* Floating Buy Me a Coffee Button */}
            {mounted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed bottom-6 right-6 z-50"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL || ""} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-[0_4px_12px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_16px_rgba(245,158,11,0.4)] border border-amber-600/20 transition-all duration-300 group"
                    aria-label="Support my work by buying me a coffee"
                    title="Support my work by buying me a coffee"
                  >
                    <div className="relative">
                      <Coffee className="h-5 w-5" />
                      <motion.div 
                        className="absolute top-0 left-0 w-full h-full opacity-70"
                        animate={{ y: [0, -12, 0] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.5,
                          repeatDelay: 3,
                          ease: "easeInOut"
                        }}
                      >
                        <span className="block h-1 w-1 rounded-full bg-white absolute top-0 right-0"></span>
                      </motion.div>
                    </div>
                    <span className="font-medium">Buy me a coffee</span>
                    <span className="hidden md:flex items-center justify-center w-5 h-5 bg-white text-amber-600 rounded-full text-xs font-bold">♥</span>
                  </Link>
                </motion.div>
                <div className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </div>
              </motion.div>
            )}
            
            {/* Footer - increase z-index to ensure it's above other elements */}
            <div className="relative z-30">
              <Footer />
            </div>
          </div>

          {/* NProgress bar for page transitions */}
          <NextProgressBar
            height="4px"
            color={resolvedTheme === 'dark' ? '#22d3ee' : '#3b82f6'}
            options={{ showSpinner: false }}
            shallowRouting
          />
        </div>
      </MotionConfig>
    </ThemeProvider>
  )
}

function ThemeToggle({ isMobile = false }: { isMobile?: boolean }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.body.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : 'light')
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        'rounded-lg p-2 transition-colors duration-200',
        'hover:bg-slate-100 dark:hover:bg-slate-800',
        'focus:outline-none focus:ring-2 focus:ring-sky-500',
        isMobile ? 'w-full flex items-center gap-3 px-3 py-2' : ''
      )}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-5 w-5 text-amber-500" />
          {isMobile && <span>Light Mode</span>}
        </>
      ) : (
        <>
          <Moon className="h-5 w-5 text-slate-800" />
          {isMobile && <span>Dark Mode</span>}
        </>
      )}
    </button>
  )
} 