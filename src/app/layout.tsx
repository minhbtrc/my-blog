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
import { cn } from '@/lib/utils'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// Import and configure fonts
import { Inter, JetBrains_Mono, Fira_Code, Source_Code_Pro } from 'next/font/google'

// Import ReactPlayer dynamically to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

// Define the fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// Define tech-focused fonts
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700'],
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
})

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
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
  const { resolvedTheme } = useTheme()

  // Track scroll position for sticky header
  const [scrolled, setScrolled] = useState<string>("up")
  const prevScrollY = useRef(0)

  useEffect(() => {
    setMounted(true)
    
    // Update the HTML class based on the theme
    if (resolvedTheme) {
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(resolvedTheme)
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.className} ${jetbrainsMono.variable} ${firaCode.variable} ${sourceCodePro.variable}`}
    >
      <head>
        <title>Minh&apos;s Space | Personal Blog</title>
        <meta name="description" content="minhbtc blog - I write about technology, share my knowledge, talk about life perspectives, history, stories, trips,..." />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getThemePreference() {
                  if (typeof window !== 'undefined' && window.localStorage) {
                    const storedPrefs = window.localStorage.getItem('theme')
                    if (storedPrefs) {
                      return storedPrefs
                    }
                    const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
                    if (userMedia.matches) {
                      return 'dark'
                    }
                  }
                  return 'dark' // default theme
                }
                
                const theme = getThemePreference()
                document.documentElement.classList.add(theme)
              })()
            `,
          }}
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen ${mounted && resolvedTheme === 'dark' ? 'code-bg-dark' : 'code-bg-light'} text-slate-800 dark:text-slate-200 antialiased theme-transition`}>
        {/* Code-like background is now handled by the route group layouts */}
        
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
        
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false}
          disableTransitionOnChange
        >
          <MotionConfig reducedMotion="user">
            {/* Progress bar for page transitions */}
            <NextProgressBar
              height="3px"
              color="rgb(59, 130, 246)"
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
                    <span className="font-mono tracking-tight">minh.btc</span>
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
            <main className="flex-grow z-10 relative">{children}</main>
            
            {/* Footer - increase z-index to ensure it's above other elements */}
            <div className="relative z-30">
              <Footer />
            </div>
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  )
}

function ThemeToggle({ isMobile = false }: { isMobile?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = typeof window !== 'undefined'
  
  // Ensure we're handling correctly on mount
  useEffect(() => {
    if (mounted) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', currentTheme === 'dark')
    }
  }, [mounted])
  
  // Handle toggle with proper HTML class updates
  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(newTheme)
  }
  
  if (!mounted) {
    return (
      <button 
        className={`p-2 rounded-md bg-white dark:bg-slate-800/70 border border-slate-300 dark:border-blue-900/30 text-blue-700 dark:text-cyan-400 transition-all theme-transition ${
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
      onClick={toggleTheme}
      className={`p-2 rounded-md theme-transition ${
        resolvedTheme === 'dark' 
          ? 'bg-slate-800/70 border border-blue-900/30 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 hover:border-blue-800/40' 
          : 'bg-white dark:bg-slate-800/70 border border-slate-300 dark:border-blue-900/30 text-blue-700 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-cyan-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-700/40 dark:hover:border-blue-800/40'
      } transition-all flex items-center shadow-sm ${
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
