'use client'
import { useState, useEffect, useRef } from 'react'
import { AppProgressBar as NextProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from 'next-themes'
import { MotionConfig } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code, Home, User, Mail, Menu, X, Moon, Sun, Disc3 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import clsx from 'clsx'
import Footer from '@/components/footer'
import './globals.css'
import dynamic from 'next/dynamic'

// Import and configure fonts
import { Inter, Roboto_Mono, Fira_Code, Oswald } from 'next/font/google'

// Import ReactPlayer dynamically to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

// Define the fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// Define tech-focused fonts
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
})

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
})

export default function RootLayout({
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

  // Track scroll position for sticky header
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    
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
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [])

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.className} ${robotoMono.variable} ${firaCode.variable} ${oswald.variable}`}
    >
      <head>
        <title>Minh&apos;s Space | Personal Blog</title>
        <meta name="description" content="minhbtc blog - I write about technology, share my knowledge, talk about life perspectives, history, stories, trips,..." />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
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
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextProgressBar height="3px" color="rgba(var(--color-primary))" />
          <MotionConfig reducedMotion="user">
            {/* Sticky Navigation Bar */}
            <header 
              className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
              }`}
            >
              {mounted && (
                <div className="container mx-auto px-4 md:px-6">
                  <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                      <motion.div 
                        className="font-mono text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        minh.btc<span className="animate-pulse">_</span>
                      </motion.div>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                      {navLinks.map((link) => (
                        <Link 
                          key={link.path} 
                          href={link.path}
                          className={`relative px-4 py-2 inline-flex items-center space-x-2 font-medium text-sm ${
                            pathname === link.path 
                              ? 'text-blue-600 dark:text-sky-400' 
                              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                          } transition-colors duration-200`}
                        >
                          <span className="hidden lg:inline-flex">{link.icon}</span>
                          <span>{link.label}</span>
                          {pathname === link.path && (
                            <motion.span 
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-sky-400 rounded-full"
                              layoutId="navbar-indicator"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </Link>
                      ))}
                      
                      {/* Listen Button for music */}
                      {mounted && process.env.NEXT_PUBLIC_LISTEN_URL && (
                        <button 
                          className="ml-2 p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors relative group"
                          aria-label={isPlaying ? "Pause music" : "Play music"}
                          onClick={toggleMusic}
                        >
                          <Disc3 
                            className={clsx(
                              'w-5 h-5 text-blue-400',
                              {
                                'animate-[spin_3s_linear_infinite]': isPlaying && hasInteracted,
                                '[animation-play-state:paused]': !isPlaying || !hasInteracted,
                              },
                            )}
                          />
                          
                          {!hasInteracted && (
                            <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-xs bg-slate-700 dark:bg-slate-800 px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white">
                              Click to enable music
                            </span>
                          )}
                        </button>
                      )}
                      
                      {/* Theme Toggle */}
                      {/* <ThemeToggle /> */}
                    </nav>
                    
                    {/* Mobile Menu Button & Controls */}
                    <div className="md:hidden flex items-center space-x-2">
                      {/* Listen Button for music (mobile) */}
                      {mounted && process.env.NEXT_PUBLIC_LISTEN_URL && (
                        <button 
                          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors relative group"
                          aria-label={isPlaying ? "Pause music" : "Play music"}
                          onClick={toggleMusic}
                        >
                          <Disc3 
                            className={clsx(
                              'w-4 h-4 text-blue-400',
                              {
                                'animate-[spin_3s_linear_infinite]': isPlaying && hasInteracted,
                                '[animation-play-state:paused]': !isPlaying || !hasInteracted,
                              },
                            )}
                          />
                          
                          {!hasInteracted && (
                            <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-xs bg-slate-700 dark:bg-slate-800 px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white z-10">
                              Click to enable music
                            </span>
                          )}
                        </button>
                      )}
                      
                      {/* Theme Toggle */}
                      <ThemeToggle isMobile={true} />
                      
                      {/* Menu Button */}
                      <button 
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                      >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Mobile Navigation */}
              <AnimatePresence>
                {mobileMenuOpen && mounted && (
                  <motion.div 
                    className="md:hidden"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-slate-900 shadow-lg border-t border-slate-200 dark:border-slate-800">
                      {navLinks.map((link) => (
                        <Link 
                          key={link.path} 
                          href={link.path}
                          className={`block px-3 py-2 rounded-lg ${
                            pathname === link.path 
                              ? 'bg-blue-50 dark:bg-sky-900/30 text-blue-600 dark:text-sky-400' 
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          } transition-colors duration-200 flex items-center space-x-2`}
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>
            
            {/* Main Content with padding for the fixed header */}
            <main className="relative pt-20 mt-0 flex-grow">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  )
}

// Theme Toggle Button Component
function ThemeToggle({ isMobile = false }: { isMobile?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={`${isMobile ? 'p-2' : 'ml-1 p-2'} rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors`}
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {resolvedTheme === 'dark' ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </button>
  )
}
