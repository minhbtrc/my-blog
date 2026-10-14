'use client'
import { useState, useEffect, useRef } from 'react'
import { AppProgressBar as NextProgressBar } from 'next-nprogress-bar'
import { MotionConfig } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code, Home, User, Mail, Menu, X, Github, Command, Terminal, Disc3, FileText, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { cn } from '../lib/utils'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Footer from './footer'
import { profile } from '@/data/profile'
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
  const [searchQuery, setSearchQuery] = useState('')

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
    const handleScroll = () => setScrolled(window.scrollY > 10)
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setShowCommandMenu(open => !open)
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

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
    setShowCommandMenu(false)
    setSearchQuery('')
  }, [pathname])

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { path: '/blog', label: 'Blog', icon: <Code className="w-4 h-4" /> },
    { path: '/about', label: 'About', icon: <User className="w-4 h-4" /> },
    { path: '/contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
    { path: '/resume', label: 'CV', icon: <FileText className="w-4 h-4" /> }
  ]

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:rounded focus:bg-base-100 focus:px-4 focus:py-3 focus:text-primary">Skip to content</a>
        {/* Terminal Header */}
        <header
          className={cn(
            "sticky top-0 z-50 w-full transition-all duration-300 font-mono border-b border-base-200/10",
            scrolled
              ? "bg-base-100/90 backdrop-blur"
              : "bg-transparent"
          )}
        >
          <div className="max-w-5xl mx-auto gap-3 px-4 sm:px-6 py-3 flex items-center justify-between">
            {/* Left: Mac buttons + terminal */}
            <div className="flex min-w-0 items-center gap-3">
              {/* Mac-style window controls */}
              <div className="hidden shrink-0 gap-1.5 sm:flex" aria-hidden="true">
                <div className="h-3 w-3 rounded-full bg-primary"></div>
                <div className="h-3 w-3 rounded-full bg-base-content/35"></div>
                <div className="h-3 w-3 rounded-full bg-base-content/35"></div>
              </div>

              {/* Terminal path display */}
              <Link href="/" className="group">
                <span className="text-xs font-mono text-base-content/70 whitespace-nowrap">
                  <span className="text-primary">[minhbtc@ai-eng]</span>
                  <span className="hidden lg:inline">
                    <span className="text-base-content/60 mx-1">-</span>
                    <span className="text-primary">[{typedPath}]</span>
                  </span>

                </span>
              </Link>
            </div>

            {/* Center: Navigation Links */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  aria-current={pathname === link.path ? 'page' : undefined}
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
            <div className="flex shrink-0 items-center gap-1 sm:gap-3 text-sm font-mono text-base-content/70">
              {/* Remove Command K button but keep the functionality via keyboard shortcut */}

              {/* PlayButton - Music control */}
              <PlayButton />

              {/* Theme Toggle */}
              <button
                aria-label="Toggle theme"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-primary hover:bg-base-200"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mounted && resolvedTheme === 'dark' ? 'dark' : 'light'}
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                  >
                    {
                    mounted && resolvedTheme === 'dark' ? (
                      <Moon className="h-4 w-4" aria-hidden="true" />
                    ) : (<Sun className="h-4 w-4" aria-hidden="true" />)
                    }
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Mobile Menu Toggle - Only visible on smaller screens */}
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-base-200 hover:text-base-content md:hidden"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
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
                    <Dialog.Title className="sr-only">Navigation</Dialog.Title>
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
                        href={profile.github}
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
                      <Dialog.Title className="sr-only">Find a page</Dialog.Title>
                      <div className="p-2">
                        <div className="flex items-center p-2 border-b border-base-200">
                          <span className="text-primary mr-2">$</span>
                          <input
                            type="text"
                            className="w-full bg-transparent focus:outline-none text-base-content text-sm"
                            placeholder="find a page..."
                            aria-label="Find a page"
                            value={searchQuery}
                            onChange={event => setSearchQuery(event.target.value)}
                            autoFocus
                          />
                          <kbd className="ml-2 font-mono text-xs bg-base-200 px-1.5 py-0.5 rounded text-base-content/60">Esc</kbd>
                        </div>

                        <nav aria-label="Quick navigation" className="space-y-1 p-2">
                          {navLinks.filter(link => link.label.toLowerCase().includes(searchQuery.toLowerCase())).map(link => (
                            <Link key={link.path} href={link.path} onClick={() => setShowCommandMenu(false)} className="flex items-center gap-3 rounded px-3 py-3 text-sm hover:bg-base-200">{link.icon}{link.label}</Link>
                          ))}
                          {!navLinks.some(link => link.label.toLowerCase().includes(searchQuery.toLowerCase())) && <p className="p-3 text-sm text-base-content/70">No matching pages.</p>}
                        </nav>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        )}

        {/* Main content */}
        <main id="main-content" className="flex-grow">
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
