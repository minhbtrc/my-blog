'use client'
import { useState, useEffect, useRef } from 'react'
import { AppProgressBar as NextProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from 'next-themes'
import { MotionConfig } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code, Home, User, Mail, Menu, X, Moon, Sun, Disc3, Terminal, GithubIcon } from 'lucide-react'
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
      data-theme="dark"
    >
      <head>
        <title>Minh&apos;s Space | Personal Blog</title>
        <meta name="description" content="minhbtc blog - I write about technology, share my knowledge, talk about life perspectives, history, stories, trips,..." />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-[#0B1120] text-slate-200`}>
        {/* Code matrix background effect */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[url('/images/code-pattern.svg')] bg-repeat" />
        </div>
        
        {/* Vertical code lines decoration */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/30 to-blue-500/0"
              style={{ left: `${i * 5}%` }}
            />
          ))}
        </div>
        
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
        
        <ThemeProvider attribute="class" defaultTheme="dark">
          <NextProgressBar height="3px" color="rgba(56, 189, 248, 0.8)" />
          <MotionConfig reducedMotion="user">
            {/* Sticky Navigation Bar */}
            <header 
              className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                scrolled ? 'bg-[#0B1120]/90 backdrop-blur-md shadow-md shadow-blue-900/10' : 'bg-transparent'
              }`}
            >
              {mounted && (
                <div className="container mx-auto px-4 md:px-6">
                  <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                      <motion.div 
                        className="font-mono text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <span className="flex items-center gap-1">
                          <Terminal className="w-5 h-5 text-cyan-400/70" />
                          minh.btc<span className="animate-pulse text-cyan-400">_</span>
                        </span>
                      </motion.div>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                      {navLinks.map((link) => (
                        <Link 
                          key={link.path} 
                          href={link.path}
                          className={`relative px-4 py-2 inline-flex items-center space-x-2 font-mono text-sm ${
                            pathname === link.path 
                              ? 'text-cyan-400' 
                              : 'text-slate-300 hover:text-cyan-300'
                          } transition-colors duration-200`}
                        >
                          <span className="inline-flex">{link.icon}</span>
                          <span>
                            {pathname === link.path ? `${link.label}()` : link.label}
                          </span>
                          {pathname === link.path && (
                            <motion.span 
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500/70 to-cyan-500/0 rounded-full"
                              layoutId="navbar-indicator"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </Link>
                      ))}
                      
                      {/* GitHub Link */}
                      <a 
                        href="https://github.com/minhbtrc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-4 py-2 inline-flex items-center space-x-2 font-mono text-sm text-slate-300 hover:text-cyan-300 transition-colors duration-200"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      
                      {/* Listen Button for music */}
                      {mounted && process.env.NEXT_PUBLIC_LISTEN_URL && (
                        <button 
                          className="ml-2 p-2 rounded-md bg-slate-800/70 border border-blue-900/30 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 hover:border-blue-800/40 transition-all relative group"
                          aria-label={isPlaying ? "Pause music" : "Play music"}
                          onClick={toggleMusic}
                        >
                          <Disc3 
                            className={clsx(
                              "w-4 h-4",
                              isPlaying && "animate-[spin_6s_linear_infinite]"
                            )}
                          />
                        </button>
                      )}
                      
                      {/* Theme Toggle Button */}
                      <ThemeToggle />
                    </nav>
                    
                    {/* Mobile Navigation Trigger */}
                    <div className="flex items-center md:hidden">
                      {mounted && process.env.NEXT_PUBLIC_LISTEN_URL && (
                        <button 
                          className="mr-2 p-2 rounded-md bg-slate-800/70 border border-blue-900/30 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 hover:border-blue-800/40 transition-all"
                          aria-label={isPlaying ? "Pause music" : "Play music"}
                          onClick={toggleMusic}
                        >
                          <Disc3 
                            className={clsx(
                              "w-4 h-4",
                              isPlaying && "animate-[spin_6s_linear_infinite]"
                            )}
                          />
                        </button>
                      )}
                      
                      <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2 rounded-md bg-slate-800/70 border border-blue-900/30 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 hover:border-blue-800/40 transition-all"
                        aria-label="Open main menu"
                      >
                        <Menu className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Mobile Menu */}
                    <AnimatePresence>
                      {mobileMenuOpen && (
                        <motion.div
                          className="fixed inset-0 z-50 lg:hidden bg-[#0B1120]/90 backdrop-blur-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="fixed inset-0 overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden">
                              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <motion.div
                                  className="pointer-events-auto w-screen max-w-md"
                                  initial={{ x: "100%" }}
                                  animate={{ x: 0 }}
                                  exit={{ x: "100%" }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                  <div className="flex h-full flex-col overflow-y-auto bg-[#0e1628] shadow-xl border-l border-blue-900/30">
                                    <div className="px-4 py-6 sm:px-6">
                                      <div className="flex items-center justify-between">
                                        <div className="font-mono text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                          <Terminal className="w-5 h-5 text-cyan-400/70 inline-block mr-1" />
                                          minh.btc<span className="animate-pulse text-cyan-400">_</span>
                                        </div>
                                        <button
                                          type="button"
                                          className="rounded-md p-2 bg-slate-800/70 border border-blue-900/30 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 hover:border-blue-800/40 transition-all"
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                          <span className="sr-only">Close panel</span>
                                          <X className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                      <nav className="flex flex-col space-y-2">
                                        {navLinks.map((link) => (
                                          <Link
                                            key={link.path}
                                            href={link.path}
                                            className={`py-3 px-4 rounded-md font-mono flex items-center space-x-3 ${
                                              pathname === link.path
                                                ? 'text-cyan-400 bg-slate-800/70 border border-blue-900/30'
                                                : 'text-slate-300 hover:bg-slate-800/40 hover:text-cyan-300'
                                            }`}
                                            onClick={() => setMobileMenuOpen(false)}
                                          >
                                            <span>{link.icon}</span>
                                            <span>
                                              {pathname === link.path ? `${link.label}()` : link.label}
                                            </span>
                                          </Link>
                                        ))}
                                        
                                        <div className="flex items-center pt-4 mt-4 border-t border-blue-900/20">
                                          <ThemeToggle isMobile />
                                        </div>
                                      </nav>
                                    </div>
                                  </div>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </header>
            
            {/* Main Content */}
            <main className="flex-grow pt-24 z-10 relative">{children}</main>
            
            {/* Footer */}
            <Footer />
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  )
}

function ThemeToggle({ isMobile = false }: { isMobile?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = typeof window !== 'undefined'
  
  if (!mounted) {
    return (
      <button 
        className={`p-2 rounded-md bg-slate-800/70 border border-blue-900/30 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 hover:border-blue-800/40 transition-all ${
          isMobile ? 'w-full justify-center text-sm' : ''
        }`}
        aria-label="Toggle dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
    )
  }
  
  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={`p-2 rounded-md bg-slate-800/70 border border-blue-900/30 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 hover:border-blue-800/40 transition-all flex items-center ${
        isMobile ? 'w-full justify-center text-sm gap-2' : ''
      }`}
      aria-label="Toggle dark mode"
    >
      {resolvedTheme === 'dark' ? (
        <>
          <Sun className="h-4 w-4" />
          {isMobile && <span className="font-mono">theme.light()</span>}
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          {isMobile && <span className="font-mono">theme.dark()</span>}
        </>
      )}
    </button>
  )
}
