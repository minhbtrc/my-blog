'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Sun, Moon, Command } from 'lucide-react'
import { cn } from '@/lib/utils'
import KeyboardShortcut from '@/components/keyboard-shortcut'

export default function TerminalZenHome() {
  const [mounted, setMounted] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
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
    
    // Blink cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    
    return () => {
      clearInterval(cursorInterval)
    }
  }, [mounted])
  
  // Set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])
  
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
        <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 max-w-prose w-full">
          {/* Name with animation effect */}
          <h1 
            className={cn(
              "text-6xl md:text-7xl font-extrabold tracking-tight mb-2 cursor-pointer",
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
            "text-lg md:text-xl font-mono mb-2",
            shellMode ? "text-green-400/80" : "text-base-content/70"
          )}>
            {typedSubtitle}
          </p>
          
          {/* Terminal prompt and output with typing effect */}
          <div className="mb-6 mt-4 w-full max-w-lg">
            {/* Command prompt */}
            <div className={cn(
              "flex items-start justify-center font-mono text-sm sm:text-base",
              shellMode ? "text-green-500" : "text-blue-400"
            )}>
              <div className="text-left inline-block relative">
                {/* Shell prompt */}
                {typingCommand && (
                  <span className="inline-block text-left">
                    {typedCommand}
                    <span className="inline">{typedOutput}</span>
                    {typedOutput && typedOutput.length > 0 && typedOutput.charAt(typedOutput.length - 1) === '"' && (
                      <span className="inline ml-2">☕</span>
                    )}
                    <span 
                      className={cn(
                        "inline-block w-2 h-4 sm:h-5 align-middle translate-y-0.5",
                        shellMode ? "bg-green-400" : "bg-blue-400",
                        showCursor ? "opacity-100" : "opacity-0"
                      )}
                      aria-hidden="true"
                    />
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* CTA with animation */}
          <div className={cn(
            "mt-4 mb-10",
            !showCTA && "opacity-0",
            showCTA && "animate-fade-up"
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
          
          {/* Keyboard shortcut hint */}
          <div className={cn(
            "text-xs",
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
      
      {/* Add fade-in keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
} 