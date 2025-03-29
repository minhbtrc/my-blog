'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Terminal, Play, Pause, ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react'
import ky from 'ky'
import useSWR from 'swr'
import { useState, useEffect, useRef } from 'react'
import React, { Fragment } from 'react'
import { Code, Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'

import Profile from '@/components/profile'
import Tags from '@/components/tags'

// Animated Particle Component for Hero Background
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(37,99,235,0.1),transparent)] dark:bg-[radial-gradient(circle_at_50%_25%,rgba(56,189,248,0.1),transparent)]" />
      
      {/* Code-inspired floating elements */}
      {Array.from({ length: 30 }).map((_, i) => {
        // Create various sized particles with different shapes
        const size = Math.random() * 12 + 3;
        const duration = Math.random() * 30 + 15;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const targetX = Math.random() * 100;
        const targetY = Math.random() * 100;
        
        // Create different shapes to represent code and tech elements
        const shapes = [
          "rounded-full", // dots (periods, commas)
          "rounded-sm", // brackets, braces
          "h-1.5 w-6", // underscores, dashes
          "h-6 w-1.5", // pipes, vertical bars
          "rounded-md rotate-45", // diamonds (special chars)
          "rounded-md", // code blocks
        ];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Different colors for different tech domains
        const colors = [
          "bg-blue-500/15 dark:bg-blue-400/15", // Python
          "bg-yellow-500/15 dark:bg-yellow-400/15", // JavaScript
          "bg-green-500/15 dark:bg-green-400/15", // Node.js
          "bg-purple-500/15 dark:bg-purple-400/15", // AI/ML
          "bg-pink-500/15 dark:bg-pink-400/15", // React
          "bg-teal-500/15 dark:bg-teal-400/15", // NextJS
          "bg-orange-500/15 dark:bg-orange-400/15", // TensorFlow
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={i}
            className={`absolute ${shape} ${color}`}
            style={{
              width: shape.includes('w-') ? undefined : size,
              height: shape.includes('h-') ? undefined : size,
              top: `${initialY}%`,
              left: `${initialX}%`,
            }}
            animate={{
              y: [`${initialY}%`, `${targetY}%`],
              x: [`${initialX}%`, `${targetX}%`],
              opacity: [Math.random() * 0.5 + 0.2, Math.random() * 0.3 + 0.1, Math.random() * 0.5 + 0.2],
              rotate: shape.includes('rotate') ? [0, 180, 360] : undefined,
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              rotate: { duration: duration * 1.5, repeat: Infinity, ease: "linear" }
            }}
          />
        );
      })}
      
      {/* Special code symbols */}
      {Array.from({ length: 6 }).map((_, i) => {
        const symbols = ["{ }", "( )", "[ ]", "< >", "// ", "/**/"];
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const targetX = Math.random() * 100;
        const targetY = Math.random() * 100;
        const symbol = symbols[i % symbols.length];
        
        return (
          <motion.div
            key={`symbol-${i}`}
            className="absolute text-blue-500/20 dark:text-cyan-400/20 font-mono text-lg font-bold"
            style={{
              top: `${initialY}%`,
              left: `${initialX}%`,
            }}
            animate={{
              y: [`${initialY}%`, `${targetY}%`],
              x: [`${initialX}%`, `${targetX}%`],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {symbol}
          </motion.div>
        );
      })}
    </div>
  );
};

// Code snippets to cycle through
const codeSnippets = [
  {
    title: "Introduction",
    language: "terminal",
    code: `> Minh BTC – AI Engineer 

> Hello world 👋 I create AI tools that understand language, extract insights, and protect privacy.

minh@ai-lab:~$ cat skills.txt
> 🧠 LLMs, NLP, Vector DB
> 🔍 RAG, Extraction, Context
> 🛠️ Python, JS, FastAPI
> ☕ Powered by coffee`
  },
  {
    title: "What I Build",
    language: "terminal",
    code: `> Starting privacy-first AI chatbot...
> Privacy filters: ENABLED
> Model: gpt-3.5-turbo
> Framework: LangChain
> Caffeine levels: OPTIMAL

minh@ai-lab:~$ launch project --name "PDF Reader" --goal "Turn messy documents into clean data"
> Initializing PDF processing pipeline...
> Loading document parsers...
> Configuring extraction templates...
> Project ready!

minh@ai-lab:~$ start pipeline --input "PDF" --output "Structured Info" --tech "LLMs + LangFlow"
> Pipeline running:
> [RUNNING] Document ingestion ████████████ 100%
> [RUNNING] Context processing ████████████ 100%
> [RUNNING] Information extraction ███████▒▒ 78%`
  },
  {
    title: "Work Ethic & Personality",
    language: "terminal",
    code: `> I like building things that work – fast, useful, and simple for others to use.

minh@ai-lab:~$ echo "Code > Slides. I prefer shipping real solutions over just talking about them."
> Code > Slides. I prefer shipping real solutions over just talking about them.

minh@ai-lab:~$ alias hobbies="AI papers, strong coffee, and weekend football ⚽"
> alias created

minh@ai-lab:~$ hobbies
> AI papers, strong coffee, and weekend football ⚽

minh@ai-lab:~$ echo "Always learning. Always building. Sometimes chasing a football like it owes me something."
> Always learning. Always building. Sometimes chasing a football like it owes me something.

minh@ai-lab:~$ deploy --project "Real-world AI" --mission "Make LLMs useful, private, and practical."
> Deployment successful!
> Mission status: ONGOING`
  },
  {
    title: "Values",
    language: "terminal",
    code: `minh@ai-lab:~$ cat values.txt
> 🔒 Privacy matters - especially with user data
> 🤝 Simplicity over complexity
> ⚡ Speed and reliability count
> 📚 Constant learning is non-negotiable

minh@ai-lab:~$ echo "Good AI isn't magic. It's built, tested, improved, and shared."
> Good AI isn't magic. It's built, tested, improved, and shared.

minh@ai-lab:~$ grep -i "philosophy" ./mindset.md
> "Less hype. More helpful AI."
> "Let the models do the talking. I just build the system."
> "Minh BTC — I turn language into code, and code into products."

minh@ai-lab:~$ ./current_project.sh
[RUNNING] AI Chatbot + Agent + RAG System
▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░ 78%

# Let's build something amazing together!`
  }
];

// Terminal-inspired hero section with interactive code snippets
const TerminalHero = () => {
  const [mounted, setMounted] = useState(false);
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [terminalTitle, setTerminalTitle] = useState("AI System Design");
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // New state for terminal tabs
  const [showFunFact, setShowFunFact] = useState(false); // New state for profile hover reveal
  const [isTypingHeader, setIsTypingHeader] = useState(true); // New state for typing animation in header
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const glitchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const headerTypingRef = useRef<NodeJS.Timeout | null>(null);
  
  // Terminal tabs configuration
  const terminalTabs = [
    { name: "Intro", icon: "👋", color: "bg-blue-600" },
    { name: "Projects", icon: "🛠️", color: "bg-green-600" },
    { name: "Personality", icon: "☕", color: "bg-amber-600" },
    { name: "Values", icon: "🚀", color: "bg-purple-600" }
  ];
  
  // Fun facts for profile hover
  const funFacts = [
    "I've trained models on coffee consumption data. The results were... stimulating.",
    "I often debug in my dreams and wake up with solutions.",
    "I can explain neural networks to both developers and grandparents.",
    "I'm fluent in human languages and machine learning algorithms."
  ];
  
  const currentSnippet = codeSnippets[currentSnippetIndex];

  // Clear all timers - not dependent on any other functions
  const clearAllTimers = () => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    if (glitchTimerRef.current) {
      clearTimeout(glitchTimerRef.current);
      glitchTimerRef.current = null;
    }
    if (headerTypingRef.current) {
      clearTimeout(headerTypingRef.current);
      headerTypingRef.current = null;
    }
  };
  
  // Function to simulate a glitch effect - not dependent on other functions
  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);
  };
  
  // Function to randomly trigger glitches during typing - less frequent
  const scheduleRandomGlitch = () => {
    if (glitchTimerRef.current) {
      clearTimeout(glitchTimerRef.current);
    }
    
    const randomDelay = Math.random() * 8000 + 5000; // Between 5-13 seconds - much less frequent
    glitchTimerRef.current = setTimeout(() => {
      triggerGlitch();
      scheduleRandomGlitch();
    }, randomDelay);
  };
  
  // Go to next snippet - defined first so it can be used elsewhere
  const goToNextSnippet = () => {
    const nextIndex = (currentSnippetIndex + 1) % codeSnippets.length;
    
    // Clear all timers
    clearAllTimers();
    
    // Trigger glitch effect
    triggerGlitch();
    
    // Update snippet index
    setCurrentSnippetIndex(nextIndex);
    
    // Update terminal title
    const titles = [
      "Introduction",
      "What I Build",
      "Work Ethic & Personality",
      "Values"
    ];
    setTerminalTitle(titles[nextIndex]);
    
    // Delay before starting to type the header command
    setTimeout(() => {
      // Animate typing the header command
      animateHeaderTyping(nextIndex);
    
      // Delay starting the code typing until header command is complete
      setTimeout(() => {
    // Start typing the new snippet
    typeCode(codeSnippets[nextIndex].code);
      }, 1200); // Wait for header command to finish
    }, 800); // Pause between snippets
  };
  
  // Animate typing in the header
  const animateHeaderTyping = (snippetIndex: number) => {
    setIsTypingHeader(true);
    
    const commands = [
      "whoami && echo 'Hello world'",
      "run projects --list", 
      "cat personality.txt",
      "grep -i 'values' mindset.md"
    ];
    
    const command = commands[snippetIndex];
    let i = 0;
    let _headerText = "";
    
    const typeHeader = () => {
      if (i < command.length) {
        _headerText += command.charAt(i);
        i++;
        headerTypingRef.current = setTimeout(typeHeader, Math.random() * 70 + 40); // Slower typing for header
      } else {
        // Pause at end of header command before showing content
        setTimeout(() => {
          setIsTypingHeader(false);
        }, 300);
      }
    };
    
    typeHeader();
  };
  
  // Function to simulate typing effect with variable speed and thinking pauses
  const typeCode = (code: string) => {
    let i = 0;
    setTypedText("");
    scheduleRandomGlitch();
    
    const typing = () => {
      if (isPaused) {
        typingTimerRef.current = setTimeout(typing, 100); // Check for unpause
        return;
      }
      
      if (i < code.length) {
        // Special handling for the AI conversation simulation
        if (currentSnippetIndex === 1 && code.substring(i, i+11) === '[thinking]') {
          setIsAiThinking(true);
          i += 11;
          // Pause for "thinking" effect
          typingTimerRef.current = setTimeout(() => {
            setIsAiThinking(false);
            typing();
          }, 2000);
          return;
        }
        
        // Vary typing speed for more natural feel, but slower overall
        const char = code.charAt(i);
        
        // Significantly vary the speed based on character type and position
        let delay = 20; // increased base speed for smoother animation
        
        if (char === '\n') {
          delay = 250; // Longer pause at line breaks
        } else if ([',', '.', '!', '?', ':'].includes(char)) {
          delay = 180; // Pause at punctuation
        } else if (char === ' ' && Math.random() > 0.8) {
          delay = 250; // Occasional pause at spaces (thinking)
        } else {
          // Random typing speed with occasional "bursts" of fast typing
          const burstMode = Math.random() > 0.9; // Less frequent bursts
          delay = burstMode ? 
            Math.random() * 15 + 10 : // Slower fast burst
            Math.random() * 50 + 20; // Slower normal speed
        }
        
        setTypedText(prev => prev + char);
        i++;
        typingTimerRef.current = setTimeout(typing, delay);
      } else if (isAutoPlaying && !isPaused) {
        // When typing is complete, schedule next snippet after longer delay
        autoPlayTimerRef.current = setTimeout(() => {
          goToNextSnippet();
        }, 12000); // Wait longer for readability
      }
    };
    
    typing();
  };
  
  // Initialize animation on mount
  useEffect(() => {
    // Set mounted state to true
    setMounted(true);
    
    // Update titles for the snippets
    const titles = [
      "Introduction",
      "What I Build",
      "Work Ethic & Personality",
      "Values"
    ];
    setTerminalTitle(titles[currentSnippetIndex]);
    
    // Wait a bit before starting animations to ensure DOM is ready
    const initialTimer = setTimeout(() => {
      // Start with first snippet
      animateHeaderTyping(currentSnippetIndex);
      
      // Start typing the first snippet - delay to wait for header command
      setTimeout(() => {
        typeCode(codeSnippets[currentSnippetIndex].code);
      }, 1000);
      
      // Schedule random glitches
      scheduleRandomGlitch();
    }, 1000); // Longer delay for better DOM loading
    
    // Clean up all timers on unmount
    return () => {
      clearTimeout(initialTimer);
      clearAllTimers();
    };
  }, []); // Empty dependency array to run only on mount
  
  // Load a new snippet and start typing animation with a title change
  const loadSnippet = (index: number) => {
    clearAllTimers();
    setCurrentSnippetIndex(index);
    setActiveTab(index); // Update active tab
    
    // Fun titles that change with each snippet
    const titles = [
      "Introduction",
      "What I Build",
      "Work Ethic & Personality",
      "Values"
    ];
    
    setTerminalTitle(titles[index]);
    
    // Create a typing animation reset effect
    setTypedText("");
    
    // Delay before starting to animate
    setTimeout(() => {
      // Animate typing the header command
      animateHeaderTyping(index);
      
      // Delay to wait for header typing to finish
      setTimeout(() => {
    typeCode(codeSnippets[index].code);
      }, 1200);
    }, 800);
  };

  // Handle tab click
  const handleTabClick = (index: number) => {
    triggerGlitch();
    loadSnippet(index);
  };
  
  // Show a random fun fact
  const showRandomFunFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
  };
  
  // Go to previous snippet
  const goToPrevSnippet = () => {
    const prevIndex = currentSnippetIndex === 0 ? codeSnippets.length - 1 : currentSnippetIndex - 1;
    triggerGlitch();
    loadSnippet(prevIndex);
  };
  
  // Reset current snippet
  const resetCurrentSnippet = () => {
    triggerGlitch();
    loadSnippet(currentSnippetIndex);
  };
  
  // Toggle auto-play
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  };

  // Toggle pause
  const togglePause = () => {
    setIsPaused(!isPaused);
  };
  
  // Handle terminal click for easter egg
  const handleTerminalClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 10) {
      setEasterEggActive(true);
        return 0;
      }
      return newCount;
    });
  };
  
  // Generate matrix code background effect
  const renderMatrixCode = () => {
    const phrases = [
      "def train_llm():",
      "import coffee",
      "class RAGSystem:",
      "import torch",
      "coffee.brew()",
      "from langchain import",
      "fine_tuning()",
      "caffeine_level++",
      "embedding = model()",
      "def tokenize(text):",
      "prompt_template =",
      "<s>[INST]</s>",
      "async def generate()",
      "coffee.refill()",
      "agents.initialize()",
      "PEFT adapter loaded",
      "query = retriever()"
    ];
    
    return Array.from({ length: 12 }).map((_, index) => {
      const randomLeft = Math.random() * 100;
      const randomDelay = Math.random() * 3;
      const randomDuration = 3 + Math.random() * 2;
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      
      return (
        <div 
          key={index}
          className="matrix-code-line"
          style={{
            left: `${randomLeft}%`,
            animationDelay: `${randomDelay}s`,
            animationDuration: `${randomDuration}s`
          }}
        >
          {randomPhrase}
        </div>
      );
    });
  };

  // Add a glitching class when triggered
  const terminalClass = `terminal-window relative ${easterEggActive ? 'animate-bounce' : ''} ${isGlitching ? 'glitch' : ''}`;

  // Create a helper function for syntax highlighting
  const SyntaxHighlighter = ({ code, language }: { code: string; language: string }) => {
    if (!code) return null;
    
    const lines = code.split('\n');

  return (
      <div className="syntax-highlighter">
        {lines.map((line: string, lineIndex: number) => {
          let segments: Array<{ type: string; text: string }> = [];
          
          if (language === 'python') {
            // Keywords
            const keywords = ['from', 'import', 'class', 'def', 'return', 'self', 'print', 'if', 'else', 'for', 'in', 'as'];
            const literals = ['True', 'False', 'None'];
            
            // Create regex patterns
            const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
            const _commentPattern = /(#.*)/g;
            const stringPattern = /(["'])(?:(?=(\\?))\2.)*?\1/g;
            const _numberPattern = /\b(\d+)\b/g;
            const _literalPattern = new RegExp(`\\b(${literals.join('|')})\\b`, 'g');
            
            // Process text with regex
            let lastIndex = 0;
            const plainText = line;
            let match;
            
            // Process keywords
            while ((match = keywordPattern.exec(plainText)) !== null) {
              if (match.index > lastIndex) {
                segments.push({ type: 'plain', text: plainText.substring(lastIndex, match.index) });
              }
              segments.push({ type: 'keyword', text: match[0] });
              lastIndex = match.index + match[0].length;
            }
            
            // Add remaining text
            if (lastIndex < plainText.length) {
              segments.push({ type: 'plain', text: plainText.substring(lastIndex) });
            }
            
            // If no keywords were found, just use the whole line
            if (segments.length === 0) {
              segments.push({ type: 'plain', text: line });
            }
            
            // Further process each segment for strings, comments, and numbers
            segments = segments.flatMap(segment => {
              if (segment.type !== 'plain') return [segment];
              
              const parts = [];
              const text = segment.text;
              let lastIdx = 0;
              
              // Process strings
              stringPattern.lastIndex = 0;
              while ((match = stringPattern.exec(text)) !== null) {
                if (match.index > lastIdx) {
                  parts.push({ type: 'plain', text: text.substring(lastIdx, match.index) });
                }
                parts.push({ type: 'string', text: match[0] });
                lastIdx = match.index + match[0].length;
              }
              
              if (lastIdx < text.length) {
                parts.push({ type: 'plain', text: text.substring(lastIdx) });
              }
              
              return parts.length > 0 ? parts : [segment];
            });
            
            // Add further processing as needed
          }
          else if (language === 'terminal') {
            // Simple processing for terminal content
            if (line.startsWith('[') && line.includes(']')) {
              const bracketEnd = line.indexOf(']') + 1;
              segments.push({ type: 'info', text: line.substring(0, bracketEnd) });
              segments.push({ type: 'plain', text: line.substring(bracketEnd) });
            } 
            else if (line.startsWith('//')) {
              segments.push({ type: 'comment', text: line });
            }
            else if (line.startsWith('>')) {
              segments.push({ type: 'output', text: line });
            }
            else if (line.includes('const') || line.includes('let') || line.includes('var')) {
              segments.push({ type: 'keyword', text: line });
            }
            else {
              segments.push({ type: 'plain', text: line });
            }
          }
          else {
            segments.push({ type: 'plain', text: line });
          }

          return (
            <div 
              key={lineIndex}
              className="terminal-line"
            >
              {segments.map((segment, segIndex) => {
                let className = '';
                
                switch (segment.type) {
                  case 'keyword':
                    className = 'text-pink-500 dark:text-pink-400';
                    break;
                  case 'string':
                    className = 'text-green-500 dark:text-green-400';
                    break;
                  case 'comment':
                    className = 'text-slate-500 dark:text-slate-400';
                    break;
                  case 'number':
                    className = 'text-amber-500 dark:text-amber-400';
                    break;
                  case 'info':
                    className = 'text-yellow-500 dark:text-yellow-400';
                    break;
                  case 'output':
                    className = 'text-cyan-500 dark:text-cyan-400';
                    break;
                  default:
                    className = '';
                }
                
                return (
                  <Fragment key={segIndex}>
                    {className ? (
                      <span className={className}>{segment.text}</span>
                    ) : (
                      segment.text
                    )}
                  </Fragment>
                );
              })}
        </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Terminal outer container with improved styling */}
      <motion.div 
        className={terminalClass}
        onClick={handleTerminalClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.01, transition: { duration: 0.3, ease: "easeOut" } }}
      >
        {/* Terminal header/tabs section */}
        <div className="bg-gray-900 rounded-t-xl px-4 py-2 flex items-center justify-between border-b border-gray-800">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

          {/* Terminal tabs */}
          <div className="flex items-center space-x-1">
            {terminalTabs.map((tab, index) => (
              <motion.button
                key={index}
                className={`px-2 py-1 text-xs rounded-md font-mono flex items-center gap-1 transition-colors ${
                  activeTab === index 
                    ? `text-white ${tab.color}` 
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                }`}
                onClick={() => handleTabClick(index)}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -5 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.name}</span>
              </motion.button>
            ))}
          </div>
          
          <div className="text-xs text-gray-400 font-mono">{terminalTitle}</div>
        </div>
        
        {/* Terminal content area */}
        <div className="bg-gray-900 p-3 h-[280px] overflow-y-auto font-mono text-sm text-gray-200 relative border-b border-gray-800">
        {easterEggActive ? (
          // Matrix easter egg
          <>
            <div className="absolute inset-0 bg-black overflow-hidden">
              {renderMatrixCode()}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-green-500 font-mono text-xl text-center">
                <div className="animate-pulse">NEURAL INTERFACE ACTIVATED</div>
                <div className="text-sm mt-2">Coffee consumption level: CRITICAL</div>
              </div>
            </div>
          </>
        ) : (
            <>
            <pre className="whitespace-pre-wrap terminal-content">
              {/* Header command with typing effect - stable positioning */}
              <div className="terminal-prompt">
                <span className="text-blue-400">minh@ai-lab:~$</span> 
                <span className="text-white ml-1 mr-1">
                  {isTypingHeader ? 
                    ["whoami && echo 'Hello world'", "run projects --list", "cat personality.txt", "grep -i 'values' mindset.md"][currentSnippetIndex] :
                    ["whoami && echo 'Hello world'", "run projects --list", "cat personality.txt", "grep -i 'values' mindset.md"][currentSnippetIndex]
                  }
                </span>
                
                {/* Blinking cursor if typing header */}
                {isTypingHeader && (
                  <span className="inline-block cursor-blink ml-1">▌</span>
                )}
          </div>
              
              {/* Code content (only shown after command typed) - with smoother transition */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: mounted && !isTypingHeader ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-2"
                >
                  <SyntaxHighlighter code={typedText} language={currentSnippet.language} />
                  {isAiThinking && (
                    <span className="inline-block cursor-blink ml-1">▌</span>
                  )}
                </motion.div>
            </pre>
            </>
        )}
        </div>

        {/* Terminal Bottom Controls */}
        <motion.div 
          className="bg-gray-800/95 dark:bg-gray-800 p-1.5 flex items-center justify-between rounded-b-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center space-x-1.5">
            <button
              onClick={toggleAutoPlay}
              className={`p-1.5 rounded-md ${isAutoPlaying ? 'bg-green-600/40 text-green-500 dark:text-green-400' : 'bg-slate-700/50 text-slate-400'} hover:bg-slate-700/80`}
              title={isAutoPlaying ? "Auto-playing enabled" : "Auto-playing disabled"}
            >
              {isAutoPlaying ? (
                <Pause className="h-3 w-3" />
              ) : (
                <Play className="h-3 w-3" />
              )}
            </button>
            
            <button
              onClick={togglePause}
              className={`p-1.5 rounded-md ${isPaused ? 'bg-amber-600/40 text-amber-500 dark:text-amber-400' : 'bg-slate-700/50 text-slate-400'} hover:bg-slate-700/80`}
              title={isPaused ? "Resume typing" : "Pause typing"}
            >
              {isPaused ? (
                <Play className="h-3 w-3" />
              ) : (
                <Pause className="h-3 w-3" />
              )}
            </button>
            
            <button
              onClick={resetCurrentSnippet}
              className="p-1.5 rounded-md bg-slate-700/50 text-slate-400 hover:bg-slate-700/80"
              title="Restart typing animation"
            >
              <RefreshCw className="h-3 w-3" />
            </button>
            </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPrevSnippet}
              className="p-1.5 rounded-md bg-slate-700/50 text-slate-400 hover:bg-slate-700/80"
              title="Previous snippet"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            
            <span className="text-xs text-slate-300 font-mono">{currentSnippetIndex + 1}/{codeSnippets.length}</span>
            
            <button
              onClick={goToNextSnippet}
              className="p-1.5 rounded-md bg-slate-700/50 text-slate-400 hover:bg-slate-700/80"
              title="Next snippet"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Terminal styling */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .terminal-content {
          min-height: 260px;
        }
        
        .terminal-prompt {
          height: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        .terminal-line {
          min-height: 1.2rem;
          animation: none !important;
          opacity: 1 !important;
          transition: opacity 0.2s ease-in;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .cursor-blink {
          animation: blink 1s ease-in-out infinite;
        }
        
        @keyframes animate-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: animate-gradient 15s ease infinite;
        }
        
        /* Enhanced terminal styling */
        .terminal-window {
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 
                      0 8px 10px -6px rgba(0, 0, 0, 0.1),
                      0 0 0 1px rgba(0, 0, 0, 0.05);
        }
        
        .dark .terminal-window {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 
                      0 10px 10px -5px rgba(0, 0, 0, 0.2),
                      0 0 0 1px rgba(255, 255, 255, 0.05);
        }
        
        .light .terminal-window {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                      0 4px 6px -2px rgba(0, 0, 0, 0.05),
                      0 0 0 1px rgba(0, 0, 0, 0.05);
        }
        
        .glitch {
          animation: glitch 0.5s cubic-bezier(.25, .46, .45, .94) both;
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        /* Matrix code animation */
        .matrix-code-line {
          position: absolute;
          color: #0f0;
          font-size: 0.8rem;
          text-shadow: 0 0 5px #0f0;
          white-space: nowrap;
          top: -20px;
          animation: matrix-drop linear infinite;
        }
        
        @keyframes matrix-drop {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(400px);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HeroTags() {
  const { data, error, isLoading } = useSWR('/api/tag', async (url) => {
    const res = await ky.get(url).json<string[]>()
    return Array.isArray(res) ? res : []
  })
  
  if (isLoading) {
    return (
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-7 w-16 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-full"></div>
        ))}
      </div>
    )
  }
  
  if (error || !data || data.length === 0) {
    return null
  }

  return (
    <Tags 
      tags={data}
      readOnly={false}
    />
  )
}

export default function Home() {
  // Create the function to provide random fun facts
  const funFacts = [
    "I've trained models on coffee consumption data. The results were... stimulating.",
    "I often debug in my dreams and wake up with solutions.",
    "I can explain neural networks to both developers and grandparents.",
    "I'm fluent in human languages and machine learning algorithms."
  ];
  
  const _showRandomFunFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
  };
  
  return (
      <main className="w-full flex flex-col flex-grow relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
          {/* Left column - Introduction */}
          <div className="flex flex-col space-y-5 md:space-y-6 md:col-span-7 pt-4 md:pt-0">
            {/* Header section with improved hierarchy */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl font-bold font-mono tracking-tight">
                <motion.span 
                  className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  MINHBTC
                </motion.span>
              </h1>
              <motion.p 
                className="text-xl text-slate-600 dark:text-slate-300 font-medium"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                AI Engineer
              </motion.p>

              {/* Currently building badge */}
              <motion.div 
                className="inline-flex items-center mt-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-300 font-mono">
                  Currently building: <span className="text-blue-600 dark:text-blue-400">AI Chatbot + Agent + RAG</span>
                </span>
              </motion.div>
        </div>
        
            {/* Concise description */}
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Building real-world AI systems — one coffee at a time.{" "}
                <span className="text-blue-500 dark:text-blue-400 relative inline-block animate-bounce cursor-help" title="Coffee-driven development">
                  ☕
                </span>
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                I specialize in AI/ML systems with a focus on <span className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer">LLMs</span>, <span className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline cursor-pointer">NLP</span>, and <span className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline cursor-pointer">retrieval-augmented generation</span> for practical applications.
              </p>
            </motion.div>
            
            {/* CTA Buttons with equal height, spacing and improved hover effects */}
            <motion.div 
              className="flex flex-wrap items-center gap-3 mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                href="/about" 
                className="group px-5 py-2.5 text-sm font-bold rounded-lg bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700 shadow-sm hover:shadow-md hover:shadow-blue-500/20 hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:outline-none relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="font-bold">About Me</span>
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out -z-10"></span>
                </span>
              </Link>
              
              <Link 
                href="/blog" 
                className="group px-5 py-2.5 text-sm font-bold rounded-lg bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-700 shadow-sm hover:shadow-md hover:shadow-indigo-500/20 hover:scale-[1.02] focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:outline-none relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="font-bold">Read Blog</span>
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out -z-10"></span>
                </span>
              </Link>
              
              <Link 
                href="/contact" 
                className="group px-5 py-2.5 text-sm font-bold rounded-lg bg-green-600 text-white transition-all duration-300 hover:bg-green-700 shadow-sm hover:shadow-md hover:shadow-green-500/20 hover:scale-[1.02] focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:outline-none flex items-center"
              >
                <span className="flex items-center gap-2">
                  <span className="font-bold">Contact</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>
            
            {/* Enhanced Tags Section */}
            <motion.div 
              className="pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center mb-2">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span role="img" aria-label="Interests" className="text-blue-500 dark:text-blue-400">🧩</span>
                  <span className="font-mono">Interests:</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {["LLMs", "RAG", "NLP", "Agents", "AI Systems"].map((tag, index) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="group inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/70 border border-slate-300/50 dark:border-blue-900/30 text-slate-700 dark:text-slate-300 text-xs hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-blue-300/50 dark:hover:border-blue-800/40 transition-all cursor-pointer font-mono hover:shadow-sm hover:scale-105 transform"
                  >
                    <span className="mr-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/70 group-hover:scale-110 transition-transform"></span>
                    <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tag}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Connected profile photo & terminal */}
          <div className="md:col-span-5 flex flex-col">
            {/* Unified card to visually connect profile and terminal */}
              <motion.div 
              className="rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/95 dark:to-slate-800/90 border border-slate-300 dark:border-slate-700/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10 dark:hover:shadow-blue-900/10 ring-1 ring-slate-300/70 dark:ring-slate-700/50"
              initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Top profile section */}
              <div className="p-4 pb-0 flex items-start">
                <div className="relative group w-28 h-28">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
                  <div className="relative rounded-xl overflow-hidden shadow-md ring-1 ring-slate-300/70 dark:ring-slate-700/50 transform transition-transform group-hover:scale-[1.02] group-hover:shadow-lg duration-300">
                    <img 
                      src="/new_profile.png" 
                      alt="MinhBTC"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.src = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
                        e.currentTarget.onerror = null;
                      }}
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Pulsing effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-cyan-400/10 dark:from-blue-600/20 dark:to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Fun fact hover reveal */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-xs font-mono leading-snug">&quot;{_showRandomFunFact()}&quot;</p>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-mono text-sm text-slate-700 dark:text-slate-300">
                    <div className="flex items-center mb-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span>Online & coding</span>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 ml-4 mt-1.5 space-y-1">
                      <p className="flex items-center gap-1.5">
                        <span className="text-amber-500">☕ </span>  Fueled by coffee
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span className="text-cyan-500">🧠</span> Build everything with AI
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span className="text-purple-500">💻</span> AI Engineer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Visual connector - vertical line */}
              <div className="flex justify-center my-1">
                <div className="h-4 w-0.5 bg-gradient-to-b from-blue-300/40 to-cyan-300/40 dark:from-blue-500/30 dark:to-cyan-500/30"></div>
              </div>
              
              {/* Terminal with improved styling and reduced height */}
              <div className="px-3 pb-3 transform transition-all duration-300">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <TerminalHero />
              </motion.div>
            </div>
            </motion.div>
            
            {/* Social links - now as a floating bar */}
            <motion.div 
              className="flex justify-center gap-3 mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="flex gap-2 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800/90 backdrop-blur-sm shadow-md border border-slate-300 dark:border-slate-700/50">
                <a 
                  href="https://github.com/minhbtrc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110 hover:shadow-sm"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a 
                  href="https://linkedin.com/in/minhbtcm00" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110 hover:shadow-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a 
                  href="mailto:minh.btrc@gmail.com" 
                  className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110 hover:shadow-sm"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a 
                  href="/blog" 
                  className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110 hover:shadow-sm"
                  aria-label="Blog"
                >
                  <Code className="h-4 w-4" />
                </a>
          </div>
            </motion.div>
    </div>
        </div>
        
        {/* Improved separator for content sections */}
        <motion.div 
          className="mt-16 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300/50 dark:via-slate-700/50 to-transparent"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-slate-900 px-4 text-sm text-slate-500 dark:text-slate-400 font-mono">
                &lt;/hero&gt;
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
