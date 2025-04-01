'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { Sun, Moon, Command } from 'lucide-react'
import { cn } from '@/lib/utils'
import KeyboardShortcut from '@/components/keyboard-shortcut'

export default function TerminalZenHome() {
  const [mounted, setMounted] = useState(false)
  const [showCommandMenu, setShowCommandMenu] = useState(false)
  const [typedName, setTypedName] = useState("")
  const [typedSubtitle, setTypedSubtitle] = useState("")
  const [typingCommand, setTypingCommand] = useState(false)
  const [typedCommand, setTypedCommand] = useState("")
  const [typedOutput, setTypedOutput] = useState("")
  const [showTagline, setShowTagline] = useState(false)
  const [showCTA, setShowCTA] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  
  // Easter egg: shell mode toggle
  const [shellMode, setShellMode] = useState(false)
  const shellClickCount = useRef(0)
  
  // Typing animation for name
  useEffect(() => {
    if (!mounted) return
    
    const name = "MINHBTC"
    let currentIndex = 0
    
    const nameInterval = setInterval(() => {
      if (currentIndex < name.length) {
        setTypedName(name.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(nameInterval)
        
        // Start subtitle typing after name is complete
        let subtitleIndex = 0
        const subtitle = "AI Engineer • RAG, LLMs, Agents"
        
        const subtitleInterval = setInterval(() => {
          if (subtitleIndex < subtitle.length) {
            setTypedSubtitle(subtitle.substring(0, subtitleIndex + 1))
            subtitleIndex++
          } else {
            clearInterval(subtitleInterval)
            
            // Start the command prompt typing
            setTypingCommand(true)
            let commandIndex = 0
            const command = "minh@ai-lab:~$ echo "
            
            const commandInterval = setInterval(() => {
              if (commandIndex < command.length) {
                setTypedCommand(command.substring(0, commandIndex + 1))
                commandIndex++
              } else {
                clearInterval(commandInterval)
                
                // Start typing the command output
                let outputIndex = 0
                const output = '"Building real-world AI systems — one coffee at a time"'
                
                setTimeout(() => {
                  const outputInterval = setInterval(() => {
                    if (outputIndex < output.length) {
                      setTypedOutput(output.substring(0, outputIndex + 1))
                      outputIndex++
                    } else {
                      clearInterval(outputInterval)
                      
                      // Show tagline with fade-in after everything is typed
                      setShowTagline(true)
                      
                      // Show CTA after prompt is complete
                      setTimeout(() => {
                        setShowCTA(true)
                        
                        // Show footer after everything
                        setTimeout(() => {
                          setShowFooter(true)
                        }, 400)
                      }, 600)
                    }
                  }, 25)
                }, 300)
              }
            }, 40)
          }
        }, 25)
      }
    }, 70)
    
    return () => {
      clearInterval(nameInterval)
    }
  }, [mounted])
  
  // Handle cursor blink animation
  useEffect(() => {
    if (!mounted) return
    
    // Blink cursor effect - Removed as we now use CSS animation
    // const cursorInterval = setInterval(() => {
    //   setShowCursor(prev => !prev)
    // }, 530)
    
    // Handle keyboard command
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommandMenu(prev => !prev)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      // clearInterval(cursorInterval)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mounted])
  
  // Set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Toggle theme function
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }
  
  // Easter egg shell mode toggle
  const handleNameClick = () => {
    shellClickCount.current += 1
    
    if (shellClickCount.current >= 3) {
      setShellMode(prev => !prev)
      shellClickCount.current = 0
    }
  }
  
  if (!mounted) return null
  
  return (
    <div className={cn(
      "min-h-screen w-full flex flex-col",
      shellMode ? "font-mono bg-black text-green-400" : isDark ? "bg-gradient-to-br from-zinc-950 to-zinc-900" : "bg-white"
    )}>
      {/* Subtle background grid */}
      {!shellMode && (
        <div 
          className={cn(
            "fixed inset-0 pointer-events-none z-0",
            isDark ? "opacity-[0.04]" : "opacity-[0.03]"
          )}
          style={{ 
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '30px 30px' 
          }}
        />
      )}
      
      {/* Main hero section */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 max-w-3xl w-full">
          {/* Side-by-Side Layout Container */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center justify-items-center">
            {/* Left Column: Profile Image */}
            <div className="flex flex-col items-center">
              <div 
                className={cn(
                  "w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden shadow-md",
                  "animate-fade-in opacity-0 hover:scale-105 transition-transform duration-300"
                )}
                style={{ 
                  animationDelay: `100ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <Image
                  src="/new_profile.png"
                  alt="MinhBTC profile"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                  unoptimized={true}
                  priority={true}
                />
              </div>
              {/* Enhanced Status Badge with hover effect */}
              <div 
                className={cn(
                  "mt-3 px-3 py-1 rounded-full text-xs font-mono inline-flex items-center gap-1.5",
                  "animate-fade-in opacity-0 hover:opacity-90 transition-opacity cursor-default",
                  shellMode ? "bg-green-900/30 text-green-400" : "bg-primary/10 text-primary"
                )}
                style={{ 
                  animationDelay: `400ms`,
                  animationFillMode: 'forwards'
                }}
                title="Current status: Coding"
              >
                <span className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  shellMode ? "bg-green-400" : "bg-primary"
                )}></span>
                <span role="status">
                  {/* Status text changes based on time of day */}
                  {new Date().getHours() < 12 ? "🌅 Morning coding" : 
                   new Date().getHours() < 17 ? "💻 Now coding" : 
                   new Date().getHours() < 22 ? "🌙 Evening hacking" : 
                   "🌠 Late night coding"}
                  <span className="inline-block animate-blink">.</span>
                  <span className="inline-block animate-blink" style={{ animationDelay: '0.3s' }}>.</span>
                  <span className="inline-block animate-blink" style={{ animationDelay: '0.6s' }}>.</span>
                </span>
              </div>
            </div>

            {/* Right Column: Identity information */}
            <div className="flex flex-col items-center">
              {/* Name with animation effect */}
              <h1 
                className={cn(
                  "text-5xl md:text-6xl font-extrabold tracking-tight mb-2 cursor-pointer text-center",
                  shellMode && "text-green-400"
                )}
                onClick={handleNameClick}
              >
                {typedName.slice(0, 4).split('').map((char, i) => (
                  <span 
                    key={i} 
                    className={cn(
                      "inline-block animate-fade-in opacity-0",
                    )}
                    style={{ 
                      animationDelay: `${i * 70}ms`,
                      animationFillMode: 'forwards',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {char}
                  </span>
                ))}
                {typedName.slice(4).split('').map((char, i) => (
                  <span 
                    key={i + 4} 
                    className={cn(
                      "inline-block animate-fade-in opacity-0",
                      !shellMode && "bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent"
                    )}
                    style={{ 
                      animationDelay: `${(i + 4) * 70}ms`,
                      animationFillMode: 'forwards',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {char}
                  </span>
                ))}
              </h1>
              
              {/* Subtle underline detail */}
              <div className={cn(
                "h-[2px] w-16 rounded-full mb-4 mt-1 animate-fade-in opacity-0",
                shellMode ? "bg-green-500/30" : "bg-primary/30"
              )}
                style={{ 
                  animationDelay: `500ms`,
                  animationFillMode: 'forwards'
                }}
              ></div>
              
              {/* Subtitle with typewriter effect */}
              <p className={cn(
                "text-lg md:text-xl font-mono mb-4 text-center",
                shellMode ? "text-green-400/80" : "text-base-content/70"
              )}>
                {typedSubtitle}
              </p>
              
              {/* Terminal prompt and output with typing effect */}
              <div className="mb-6 w-full max-w-md">
                {/* Command prompt */}
                <div className={cn(
                  "flex items-start justify-center font-mono text-sm sm:text-base",
                  shellMode ? "text-green-500" : isDark ? "text-blue-400" : "text-blue-600"
                )}>
                  <div className="text-left inline-block relative">
                    {/* Shell prompt with aria-hidden */}
                    {typingCommand && (
                      <span className="inline-block text-left" aria-hidden="true">
                        <span className={cn(shellMode ? "text-green-500" : isDark ? "text-blue-400" : "text-blue-600")}>
                          {typedCommand}
                        </span>
                        <span className="inline">{typedOutput}</span>
                        {typedOutput && typedOutput.length > 0 && typedOutput.charAt(typedOutput.length - 1) === '"' && (
                          <span className="inline ml-2">☕</span>
                        )}
                        <span 
                          className={cn(
                            "inline-block w-2 h-4 sm:h-5 align-middle translate-y-0.5 animate-blink",
                            shellMode ? "bg-green-400" : isDark ? "bg-blue-400" : "bg-blue-600"
                          )}
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </div>
                </div>
                {/* Screen reader text for terminal output */}
                {typingCommand && typedOutput && (
                  <span className="sr-only">
                    {typedOutput.replace(/"/g, '')}
                  </span>
                )}
              </div>
              
              {/* CTA with animation */}
              <div className={cn(
                "mt-2 mb-6",
                !showCTA && "opacity-0",
                showCTA && "animate-fade-up",
                "self-center"
              )}>
                <Link 
                  href="/blog"
                  className={cn(
                    "text-lg inline-flex items-center relative group",
                    shellMode ? "text-green-400" : "text-primary hover:text-primary/90"
                  )}
                >
                  <span className="mr-1">→</span> 
                  Read the blog
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300",
                    shellMode ? "bg-green-400" : "bg-primary"
                  )} />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Keyboard shortcut hint */}
          <div className={cn(
            "text-xs mt-4",
            shellMode ? "text-green-400/40" : "text-base-content/40",
            !showFooter && "opacity-0",
            showFooter && "animate-fade-in"
          )}>
            Press <KeyboardShortcut keys={['cmd', 'K']} className="mx-1.5" /> to search
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6">
        <div className="container max-w-3xl mx-auto px-4">
          <div className={cn(
            "text-center text-xs",
            shellMode ? "text-green-400/40" : "text-base-content/40",
            !showFooter && "opacity-0",
            showFooter && "animate-fade-in"
          )}>
            Crafted in Vietnam • {new Date().getFullYear()}
          </div>
        </div>
      </footer>
      
      {/* Command menu modal */}
      {showCommandMenu && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[20vh]">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowCommandMenu(false)} />
          <div className={cn(
            "relative w-full max-w-md rounded-lg overflow-hidden",
            shellMode
              ? "bg-black border border-green-500/30"
              : isDark 
                ? "bg-zinc-900 shadow-lg border border-zinc-800" 
                : "bg-white shadow-lg border border-zinc-200"
          )}>
            <div className="p-2">
              <div className={cn(
                "flex items-center p-2 border-b",
                shellMode ? "border-green-500/30" : isDark ? "border-zinc-800" : "border-zinc-200"
              )}>
                <Command className={cn(
                  "h-4 w-4 mr-2",
                  shellMode ? "text-green-400/50" : "text-base-content/50"
                )} />
                <input 
                  type="text" 
                  className={cn(
                    "w-full bg-transparent focus:outline-none",
                    shellMode ? "text-green-400" : "text-base-content",
                    shellMode && "caret-green-400"
                  )}
                  placeholder="Search posts..."
                  autoFocus
                />
                <KeyboardShortcut keys={['Esc']} className="ml-2" />
              </div>
              
              <div className={cn(
                "py-6 px-2 text-sm text-center",
                shellMode ? "text-green-400/60" : "text-base-content/60"
              )}>
                Type to search blog posts and pages
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add fade-in and blink keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out forwards;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
} 