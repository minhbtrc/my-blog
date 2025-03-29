'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Play, Pause, ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react';
import { Code, Github, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect, useRef, Suspense } from 'react';
import React, { Fragment, lazy } from 'react';
import dynamic from 'next/dynamic';
import ky from 'ky';
import useSWR from 'swr';

import Tags from '@/components/tags';

// Terminal Hero Component 
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
  const [activeTab, setActiveTab] = useState(0);
  const [isTypingHeader, setIsTypingHeader] = useState(true);
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
  
  const codeSnippets = [
    `> Minh BTC – AI Engineer 

> Hello world 👋 I create AI tools that understand language, extract insights, and protect privacy.

minh@ai-lab:~$ cat skills.txt
> 🧠 LLMs, NLP, Vector DB
> 🔍 RAG, Extraction, Context
> 🛠️ Python, JS, FastAPI
> ☕ Powered by coffee`,
    
    `> Starting privacy-first AI chatbot...
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
> [RUNNING] Information extraction ███████▒▒ 78%`,
    
    `> I like building things that work – fast, useful, and simple for others to use.

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
> Mission status: ONGOING`,
    
    `minh@ai-lab:~$ cat values.txt
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
  ];
  
  const currentSnippet = codeSnippets[currentSnippetIndex];

  // Initialize animation on mount
  useEffect(() => {
    setMounted(true);
    
    const titles = ["Introduction", "What I Build", "Work Ethic & Personality", "Values"];
    setTerminalTitle(titles[currentSnippetIndex]);
    
    // Start with header typing animation
    animateHeaderTyping(currentSnippetIndex);
    
    // Start typing the initial snippet with a small delay after header typing
    setTimeout(() => {
      typeCode(codeSnippets[currentSnippetIndex]);
    }, 1200);
    
    // Schedule the first autoplay transition after 12 seconds
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setTimeout(() => {
        goToNextSnippet();
      }, 12000);
    }
    
    // Start occasional glitch effects
    scheduleRandomGlitch();
    
    return () => {
      clearAllTimers();
    };
  }, []);
  
  // Watch for changes to isAutoPlaying
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setTimeout(() => {
        goToNextSnippet();
      }, 12000);
    } else if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying]);
  
  // Clear all timers - utility function
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
  
  // Function to simulate a glitch effect
  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);
  };
  
  // Schedule random glitches
  const scheduleRandomGlitch = () => {
    if (glitchTimerRef.current) {
      clearTimeout(glitchTimerRef.current);
    }
    
    const randomDelay = Math.random() * 8000 + 5000; // Between 5-13 seconds
    glitchTimerRef.current = setTimeout(() => {
      triggerGlitch();
      scheduleRandomGlitch();
    }, randomDelay);
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
        headerTypingRef.current = setTimeout(typeHeader, Math.random() * 50 + 30); // Slower typing for header
      } else {
        // Pause at end of header command before showing content
        setTimeout(() => {
          setIsTypingHeader(false);
        }, 300);
      }
    };
    
    typeHeader();
  };
  
  // Go to next snippet
  const goToNextSnippet = () => {
    const nextIndex = (currentSnippetIndex + 1) % codeSnippets.length;
    
    // Clear all timers
    clearAllTimers();
    
    // Trigger glitch effect
    triggerGlitch();
    
    // Update states
    setCurrentSnippetIndex(nextIndex);
    setActiveTab(nextIndex);
    
    // Update terminal title
    const titles = ["Introduction", "What I Build", "Work Ethic & Personality", "Values"];
    setTerminalTitle(titles[nextIndex]);
    
    // Animate the header typing first
    animateHeaderTyping(nextIndex);
    
    // Delay starting the code typing until header command is complete
    setTimeout(() => {
      // Start typing the new snippet
      typeCode(codeSnippets[nextIndex]);
    }, 1000);
    
    // Schedule next auto transition if autoplay is on
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setTimeout(() => {
        goToNextSnippet();
      }, 12000);
    }
  };
  
  // Function to simulate typing effect
  const typeCode = (text: string) => {
    setTypedText("");
    let i = 0;
    const speed = 0.5; // Controls typing speed (lower = faster)
    
    const typeNextChar = () => {
      if (i < text.length) {
        setTypedText(prev => prev + text.charAt(i));
        i++;
        
        // Calculate random delay for natural typing feel
        const delay = Math.random() * 5 + speed * 8;
        
        // Longer pauses at punctuation/line breaks for realism
        if (['.', '\n', '!', '?', '>'].includes(text.charAt(i-1))) {
          typingTimerRef.current = setTimeout(typeNextChar, delay * 3);
        } else {
          typingTimerRef.current = setTimeout(typeNextChar, delay);
        }
      }
    };
    
    typeNextChar();
  };
  
  // Handle tab click
  const handleTabClick = (index: number) => {
    // Don't do anything if same tab is clicked
    if (index === currentSnippetIndex) return;
    
    // Clear all timers
    clearAllTimers();
    
    // Update states
    setCurrentSnippetIndex(index);
    setActiveTab(index);
    
    // Update terminal title
    const titles = ["Introduction", "What I Build", "Work Ethic & Personality", "Values"];
    setTerminalTitle(titles[index]);
    
    // Trigger glitch and animate header typing
    triggerGlitch();
    animateHeaderTyping(index);
    
    // Delay typing the content
    setTimeout(() => {
      typeCode(codeSnippets[index]);
    }, 1000);
    
    // Reset auto transition timer if autoplay is on
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setTimeout(() => {
        goToNextSnippet();
      }, 12000);
    }
  };
  
  return (
    <div className="w-full">
      <div className="terminal-window relative rounded-xl overflow-hidden">
        {/* Terminal header/tabs section */}
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {/* Terminal tabs */}
          <div className="flex items-center space-x-1">
            {terminalTabs.map((tab, index) => (
              <button
                key={index}
                className={`px-2 py-1 text-xs rounded-md font-mono flex items-center gap-1 transition-colors ${
                  activeTab === index 
                    ? `text-white ${tab.color}` 
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                }`}
                onClick={() => handleTabClick(index)}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>
          
          <div className="text-xs text-gray-400 font-mono">{terminalTitle}</div>
        </div>
        
        {/* Terminal content area */}
        <div className={`bg-gray-900 p-3 h-[220px] overflow-y-auto font-mono text-sm text-gray-200 relative border-b border-gray-800 ${isGlitching ? 'terminal-glitch' : ''}`}>
          <pre className="whitespace-pre-wrap">
            <div className="terminal-prompt">
              <span className="text-blue-400">minh@ai-lab:~$</span> 
              <span className="text-white ml-1">
                {isTypingHeader ? 
                  "..." : 
                  ["whoami", "ls projects", "cat personality.txt", "grep values mindset.md"][currentSnippetIndex]
                }
              </span>
            </div>
            
            <div className="mt-2">
              {typedText}
              {/* Blinking cursor at the end of typed text */}
              <span className="inline-block w-2 h-4 ml-0.5 bg-blue-400 animate-blink"></span>
            </div>
          </pre>
        </div>

        {/* Terminal Bottom Controls */}
        <div className="bg-gray-800 p-1.5 flex items-center justify-between rounded-b-xl">
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`p-1.5 rounded-md ${isAutoPlaying ? 'bg-green-600/40 text-green-500' : 'bg-slate-700/50 text-slate-400'} hover:bg-slate-700/80`}
              title={isAutoPlaying ? "Auto-playing enabled" : "Auto-playing disabled"}
            >
              {isAutoPlaying ? (
                <Pause className="h-3 w-3" />
              ) : (
                <Play className="h-3 w-3" />
              )}
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const prevIndex = currentSnippetIndex === 0 ? codeSnippets.length - 1 : currentSnippetIndex - 1;
                handleTabClick(prevIndex);
              }}
              className="p-1.5 rounded-md bg-slate-700/50 text-slate-400 hover:bg-slate-700/80"
              title="Previous snippet"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            
            <span className="text-xs text-slate-300 font-mono">{currentSnippetIndex + 1}/{codeSnippets.length}</span>
            
            <button
              onClick={() => {
                const nextIndex = (currentSnippetIndex + 1) % codeSnippets.length;
                handleTabClick(nextIndex);
              }}
              className="p-1.5 rounded-md bg-slate-700/50 text-slate-400 hover:bg-slate-700/80"
              title="Next snippet"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .terminal-window {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                      0 4px 6px -2px rgba(0, 0, 0, 0.05),
                      0 0 0 1px rgba(0, 0, 0, 0.05);
        }
        
        .dark .terminal-window {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 
                      0 10px 10px -5px rgba(0, 0, 0, 0.2),
                      0 0 0 1px rgba(255, 255, 255, 0.05);
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .terminal-glitch {
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both;
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          10% {
            transform: translate(-2px, 2px);
          }
          20% {
            transform: translate(2px, -2px);
          }
          30% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(2px, -2px);
          }
          50% {
            transform: translate(-2px, 2px);
          }
          60% {
            transform: translate(2px, -2px);
          }
          70% {
            transform: translate(-2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          90% {
            transform: translate(-2px, 0);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </div>
  );
};

// Main component that uses the original Home component structure
export default function HomeClient() {
  // Function to show random fun facts when hovering over profile image
  const showRandomFunFact = () => {
    const funFacts = [
      "I build every project with AI",
      "Coffee is my programming fuel",
      "I love exploring new AI frameworks",
      "My terminal is where magic happens",
      "I can solve Rubik's cube in under 2 minutes",
      "Learning a new algorithm is my idea of fun",
      "I debug in my dreams sometimes"
    ];
    return funFacts[Math.floor(Math.random() * funFacts.length)];
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
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* About Me */}
              <Link
                href="/about"
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all shadow-md hover:shadow-blue-500/30"
              >
                <span className="relative z-10">About Me</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-white/10 group-hover:scale-x-100 scale-x-0 origin-left transition-transform duration-500 ease-out rounded-lg -z-10" />
              </Link>

              {/* Blog */}
              <Link
                href="/blog"
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all shadow-md hover:shadow-indigo-500/30"
              >
                <span className="relative z-10">Read Blog</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-white/10 group-hover:scale-x-100 scale-x-0 origin-left transition-transform duration-500 ease-out rounded-lg -z-10" />
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all shadow-md hover:shadow-green-500/30"
              >
                <span className="relative z-10">Contact</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-white/10 group-hover:scale-x-100 scale-x-0 origin-left transition-transform duration-500 ease-out rounded-lg -z-10" />
              </Link>
            </motion.div>
            
            {/* Tags Section */}
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
                      width={112}
                      height={112}
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
                      <p className="text-white text-xs font-mono leading-snug">&quot;{showRandomFunFact()}&quot;</p>
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
            
            {/* Social links */}
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