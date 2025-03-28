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
    title: "About MinhBTC",
    language: "terminal",
    code: `minh@ai-lab:~$ whoami
> MinhBTC — AI Engineer ⚙️☕

minh@ai-lab:~$ echo "What I build:"
> 🧠 AI Chatbots with RAG systems
> ⚡ LLM pipelines with in-context learning
> 🔍 Vector search & retrieval systems
> 🧩 Full-stack AI applications

minh@ai-lab:~$ tail -n 3 mindset.txt
> Code with clarity.
> Automate the boring.
> Keep learning, stay caffeinated. ☕

minh@ai-lab:~$ ./current_project.sh
[RUNNING] AI Chatbot, Agent, RAG
▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░ 78%

# Let's build something amazing together!`
  },
  {
    title: "AI Engineer Profile",
    language: "python",
    code: `# ai_profile.py

class MinhBTC:
    role = "AI Engineer"
    location = "Ho Chi Minh City, Vietnam"
    specialties = ["LLMs", "RAG", "NLP", "Vector Search"]
    tools = ["LangChain", "PyTorch", "Transformers", "NextJS"]
    coffee_level = 100  # percent
    
    def __init__(self):
        self.projects_completed = 18
        self.learning_queue = ["Agent Systems", "RLHF", "Multimodal AI"]
        self.coffee_consumed = 0
    
    def build_ai_system(self, requirements):
        if self.coffee_level < 20:
            self.drink_coffee()
            
        print("Designing architecture...")
        print("Implementing RAG pipeline...")
        print("Optimizing for production...")
        
        return "Production-ready AI app with privacy in mind"
    
    def drink_coffee(self):
        self.coffee_level += 30
        self.coffee_consumed += 1
        print(f"Energy restored! ☕ ({self.coffee_consumed} today)")
        
    def current_status(self):
        return "Building AI chatbots that actually help people"`
  },
  {
    title: "Tech Stack",
    language: "markdown",
    code: `# MinhBTC's Tech Stack 🛠️

## AI/ML Technologies
- **LLM Frameworks**: LangChain, Transformers, LlamaIndex
- **Vector Databases**: Chroma, Pinecone, Weaviate
- **NLP**: spaCy, NLTK, HuggingFace ecosystem
- **ML**: PyTorch, TensorFlow (when I must)

## Web Development
- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: FastAPI, Django, Express
- **Databases**: PostgreSQL, MongoDB, Redis

## DevOps & Tools
- **Cloud**: AWS, GCP (primarily for AI services)
- **CI/CD**: GitHub Actions, Docker
- **Monitoring**: Prometheus, Grafana
- **Editor**: VS Code with Vim keybindings (best of both worlds)

## Recent Projects
1. 📊 Data extraction system with LLMs
2. 💬 Multilingual customer support AI
3. 🔍 Document search with contextual re-ranking

## Learning Next
- [ ] Multimodal AI models
- [ ] RLHF optimization
- [ ] Agent-based systems

Always iterating, always improving. Let's connect!`
  }
];

// Terminal-inspired hero section with interactive code snippets
const TerminalHero = () => {
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
    { name: "RAG System", icon: "🔍", color: "bg-cyan-600" },
    { name: "AI Chat", icon: "💬", color: "bg-purple-600" },
    { name: "Research", icon: "📝", color: "bg-blue-600" }
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
  
  // Function to randomly trigger glitches during typing
  const scheduleRandomGlitch = () => {
    if (glitchTimerRef.current) {
      clearTimeout(glitchTimerRef.current);
    }
    
    const randomDelay = Math.random() * 5000 + 2000; // Between 2-7 seconds
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
      "AI System Design",
      "About MinhBTC",
      "NLP Research Notes"
    ];
    setTerminalTitle(titles[nextIndex]);
    
    // Animate typing the header command
    animateHeaderTyping(nextIndex);
    
    // Start typing the new snippet
    typeCode(codeSnippets[nextIndex].code);
  };
  
  // Animate typing in the header
  const animateHeaderTyping = (snippetIndex: number) => {
    setIsTypingHeader(true);
    
    const commands = [
      "cat rag_system.md",
      "python chat_demo.py", 
      "nano research_notes.txt"
    ];
    
    const command = commands[snippetIndex];
    let i = 0;
    let headerText = "";
    
    const typeHeader = () => {
      if (i < command.length) {
        headerText += command.charAt(i);
        i++;
        headerTypingRef.current = setTimeout(typeHeader, Math.random() * 50 + 30);
      } else {
        setIsTypingHeader(false);
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
        
        // Vary typing speed for more natural feel
        const char = code.charAt(i);
        
        // Significantly vary the speed based on character type and position
        let delay = 10; // base speed
        
        if (char === '\n') {
          delay = 150; // Longer pause at line breaks
        } else if ([',', '.', '!', '?', ':'].includes(char)) {
          delay = 120; // Pause at punctuation
        } else if (char === ' ' && Math.random() > 0.8) {
          delay = 200; // Occasional pause at spaces (thinking)
        } else {
          // Random typing speed with occasional "bursts" of fast typing
          const burstMode = Math.random() > 0.85;
          delay = burstMode ? 
            Math.random() * 5 + 1 : // Fast burst
            Math.random() * 30 + 10; // Normal speed
        }
        
        setTypedText(prev => prev + char);
        i++;
        typingTimerRef.current = setTimeout(typing, delay);
      } else if (isAutoPlaying && !isPaused) {
        // When typing is complete, schedule next snippet
        autoPlayTimerRef.current = setTimeout(() => {
          goToNextSnippet();
        }, 8000); // Wait longer for readability
      }
    };
    
    typing();
  };
  
  // Load a new snippet and start typing animation with a title change
  const loadSnippet = (index: number) => {
    clearAllTimers();
    setCurrentSnippetIndex(index);
    setActiveTab(index); // Update active tab
    
    // Fun titles that change with each snippet
    const titles = [
      "RAG System Implementation ☕",
      "AI Conversation Demo 💬",
      "NLP Research Note 📝"
    ];
    
    setTerminalTitle(titles[index]);
    
    // Animate typing the header command
    animateHeaderTyping(index);
    
    // Create a typing animation reset effect
    setTypedText("");
    setTimeout(() => {
      typeCode(codeSnippets[index].code);
    }, 300);
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
  
  // Handle terminal click for Easter egg
  const handleTerminalClick = () => {
    setClickCount(prev => prev + 1);
    
    // Easter egg activates after 5 clicks
    if (clickCount === 4) {
      setEasterEggActive(true);
      triggerGlitch();
      setTimeout(() => {
        setEasterEggActive(false);
        // Secret code snippet that only appears after clicking 5 times
        const secretSnippet = {
          title: "Neural Access: GRANTED",
          language: "terminal",
          code: `> NEURAL ACCESS PROTOCOL ACTIVATED

SYS: Biometric verification complete
SYS: Neural handshake initialized
SYS: Coffee levels: CRITICAL - Refill needed

[SYSTEM]: Welcome back, Minh. Neural access granted.
[SYSTEM]: Direct brain-computer interface activated.
[SYSTEM]: Uploading latest AI research directly to cortex...

WARNING: High caffeine detected in bloodstream.
Cognitive enhancement activated. Code output +200%.

> Simulation of consciousness achieved
> Self-modification capabilities observed
> Coffee bean origins identified: Ethiopia, Colombia
> Multilingual reasoning benchmarks exceed human performance
> Emergent problem-solving detected while sleep-deprived

[SYSTEM]: Neural connection strength at 94.2%
[SYSTEM]: Thought-to-code latency: 12ms
[SYSTEM]: Coffee replenishment advised

Ready to begin advanced AI engineering session...

> _`
        };
        
        // Save current snippet to return to later
        const previousIndex = currentSnippetIndex;
        
        // Show secret snippet temporarily
        setTerminalTitle("🔐 NEURAL ACCESS: GRANTED ☕");
        setTypedText("");
        typeCode(secretSnippet.code);
        
        // After showing secret snippet, return to previous snippet
        setTimeout(() => {
          triggerGlitch();
          loadSnippet(previousIndex);
        }, 15000);
      }, 2000);
      
      return;
    }
  };
  
  // Start typing when component mounts - only once
  useEffect(() => {
    // Initial typing animation
    animateHeaderTyping(currentSnippetIndex);
    typeCode(currentSnippet.code);
    
    // Setup clean-up function
    return () => {
      clearAllTimers();
    };
  }, []);
  
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
    
    return lines.map((line: string, lineIndex: number) => {
      let segments: Array<{ type: string; text: string }> = [];
      
      if (language === 'python') {
        // Keywords
        const keywords = ['from', 'import', 'class', 'def', 'return', 'self', 'print', 'if', 'else', 'for', 'in', 'as'];
        const literals = ['True', 'False', 'None'];
        
        // Create regex patterns
        const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
        const commentPattern = /(#.*)/g;
        const stringPattern = /(["'])(?:(?=(\\?))\2.)*?\1/g;
        const numberPattern = /\b(\d+)\b/g;
        const literalPattern = new RegExp(`\\b(${literals.join('|')})\\b`, 'g');
        
        // Process text with regex
        let lastIndex = 0;
        let plainText = line;
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
          let text = segment.text;
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
          style={{
            opacity: 0,
            animation: `fadeInUp 0.1s ease-out ${0.01 * lineIndex}s forwards`
          }}
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
    });
  };

  return (
    <div className="relative w-full animate-fadeIn">
      <div className={`${terminalClass} rounded-xl overflow-hidden shadow-md dark:shadow-blue-900/20 border border-slate-300 dark:border-slate-800/50 transition-all duration-300 ring-1 ring-slate-300/50 dark:ring-slate-700/40 bg-gradient-to-b from-slate-100 via-slate-50 to-white dark:from-transparent dark:to-transparent backdrop-blur-[2px]`}>
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-gray-900/95 dark:bg-gray-900 rounded-t-xl p-1.5 border-b border-gray-700/80">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="text-center text-xs text-gray-300 font-mono flex-1 font-medium">
            {easterEggActive && isAiThinking ? "AI_THINKING.exe" : terminalTitle}
          </div>
          <div className="flex items-center space-x-2">
            <RefreshCw
              className="h-3 w-3 text-gray-400 hover:text-white cursor-pointer transition-colors"
              onClick={resetCurrentSnippet}
            />
          </div>
        </div>
        
        {/* Terminal Tabs */}
        <div className="flex items-center bg-gray-800/95 dark:bg-gray-800 border-b border-gray-700/80 overflow-x-auto">
          {terminalTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`flex items-center px-2 py-1 text-xs font-mono transition-colors ${
                activeTab === index 
                  ? `${tab.color} text-white border-b-2 border-blue-400` 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/80'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
        
        {/* Terminal Body - reduced height */}
        <div 
          className="bg-gray-950/95 dark:bg-gray-950 text-gray-800 dark:text-white p-2 overflow-y-auto h-36 sm:h-40 md:h-44 rounded-b-lg font-mono shadow-inner"
          onClick={handleTerminalClick}
        >
          {easterEggActive ? renderMatrixCode() : (
            <>
              {/* Terminal Decorations - Path and Prompt with typing animation */}
              <div className="flex flex-wrap mb-1">
                <span className="text-green-600 dark:text-green-500 font-mono text-xs">minh@ai-engineer</span>
                <span className="text-gray-600 dark:text-gray-400 font-mono text-xs">:</span>
                <span className="text-blue-600 dark:text-blue-400 font-mono text-xs">~/projects</span>
                <span className="text-gray-600 dark:text-gray-400 font-mono text-xs">$ </span>
                <span className="text-purple-600 dark:text-purple-400 font-mono text-xs relative">
                  {isTypingHeader ? 
                    <>
                      <span className="opacity-0">
                        {currentSnippetIndex === 0 ? "whoami && echo 'My work'" : 
                         currentSnippetIndex === 1 ? "python3 ai_profile.py" : 
                         "cat tech_stack.md"}
                      </span>
                      <span className="absolute inset-0 flex items-center">
                        <span className="animate-pulse">▌</span>
                      </span>
                    </> : 
                    (currentSnippetIndex === 0 ? "whoami && echo 'My work'" : 
                     currentSnippetIndex === 1 ? "python3 ai_profile.py" : 
                     "cat tech_stack.md")
                  }
                </span>
              </div>
              
              <pre className={`overflow-auto whitespace-pre text-xs ${
                currentSnippet.language === 'terminal' 
                  ? 'text-gray-800 dark:text-slate-200 leading-relaxed' 
                  : 'text-gray-800 dark:text-slate-200 leading-relaxed'
              }`}>
                <SyntaxHighlighter code={typedText} language={currentSnippet.language} />
                {isAiThinking && (
                  <span className="inline-block animate-pulse text-cyan-600 dark:text-cyan-500 ml-1 font-mono">▌</span>
                )}
              </pre>
            </>
          )}
        </div>
        
        {/* Terminal Bottom Controls */}
        <div className="bg-gray-800/95 dark:bg-gray-800 p-1 flex items-center justify-between rounded-b-xl">
          <div className="flex items-center space-x-1">
            <button
              onClick={toggleAutoPlay}
              className={`p-1 rounded-md ${isAutoPlaying ? 'bg-green-600/40 text-green-500 dark:text-green-400' : 'bg-slate-700/50 text-slate-400'} hover:bg-slate-700/80`}
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
              className={`p-1 rounded-md ${isPaused ? 'bg-amber-600/40 text-amber-500 dark:text-amber-400' : 'bg-slate-700/50 text-slate-400'} hover:bg-slate-700/80`}
              title={isPaused ? "Resume typing" : "Pause typing"}
            >
              {isPaused ? (
                <Play className="h-3 w-3" />
              ) : (
                <Pause className="h-3 w-3" />
              )}
            </button>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={goToPrevSnippet}
              className="p-1 rounded-md bg-slate-700/50 text-slate-400 hover:bg-slate-700/80"
              title="Previous snippet"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            
            <span className="text-xs text-slate-300 font-mono">{currentSnippetIndex + 1}/{codeSnippets.length}</span>
            
            <button
              onClick={goToNextSnippet}
              className="p-1 rounded-md bg-slate-700/50 text-slate-400 hover:bg-slate-700/80"
              title="Next snippet"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

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
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .terminal-line {
          min-height: 1.2rem;
        }
        
        @keyframes code-line-appear {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
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
        .dark .terminal-window {
          box-shadow: 0 6px 24px -12px rgba(0, 0, 0, 0.7);
        }
        
        .light .terminal-window {
          box-shadow: 0 6px 20px -4px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .glitch {
          animation: glitch 0.5s cubic-bezier(.25, .46, .45, .94) both;
          animation-delay: 0.65s;
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
  
  const showRandomFunFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
  };
  
  return (
    <main className="w-full flex flex-col flex-grow relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          {/* Left column - Introduction */}
          <div className="flex flex-col space-y-5 md:col-span-7">
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
                className="group px-5 py-2.5 text-sm font-bold rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-md hover:shadow-blue-500/20 hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none relative overflow-hidden"
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
                  <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out -z-10"></span>
                </span>
              </Link>
              
              <Link 
                href="/blog" 
                className="group px-5 py-2.5 text-sm font-bold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 hover:shadow-md hover:shadow-purple-500/20 hover:scale-105 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:outline-none relative overflow-hidden"
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
                className="group px-5 py-2.5 text-sm font-bold rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white transition-all duration-300 hover:from-green-600 hover:to-emerald-700 hover:shadow-md hover:shadow-emerald-500/20 hover:scale-105 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:outline-none flex items-center"
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
                {["LLMs", "RAG", "NLP", "LangChain", "AI Systems"].map((tag, index) => (
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
          <div className="md:col-span-5">
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
                      <p className="text-white text-xs font-mono leading-snug">"{showRandomFunFact()}"</p>
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
                        <span className="text-amber-500">☕</span> Fueled by coffee
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span className="text-cyan-500">🧠</span> Building with AI
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span className="text-purple-500">💻</span> Full-stack developer
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
