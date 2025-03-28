'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Terminal, Play, Pause, ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react'
import ky from 'ky'
import useSWR from 'swr'
import { useState, useEffect, useRef } from 'react'
import React from 'react'
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
    title: "LLM System Design",
    language: "python",
    code: `# AI System Design by Minh BTC
# RAG Pipeline with In-Context Learning

from langchain.embeddings import VertexAIEmbeddings
from langchain.llms import VertexAI
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA

class RAGSystem:
    def __init__(self, documents, model="text-bison@002"):
        # Initialize core components
        self.llm = VertexAI(model_name=model)
        self.embeddings = VertexAIEmbeddings()
        self.vectorstore = self._create_vectorstore(documents)
        
        # Configure retriever with Maximal Marginal Relevance
        self.retriever = self.vectorstore.as_retriever(
            search_type="mmr",
            search_kwargs={"k": 5, "fetch_k": 10}
        )
        
        # Create QA chain with custom prompt template
        self.qa_chain = self._setup_qa_chain()
    
    def _create_vectorstore(self, documents):
        # Process documents and create vector embeddings
        print("Indexing documents...")
        return Chroma.from_documents(
            documents=documents,
            embedding=self.embeddings
        )
    
    def _setup_qa_chain(self):
        # Custom prompt with context injection
        template = """
        Answer the question based only on the following context:
        {context}
        
        Question: {query}
        
        Answer:"""
        
        # Create chain with source attribution
        return RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.retriever,
            return_source_documents=True,
            chain_type_kwargs={"prompt": template}
        )
    
    def answer_question(self, question):
        # Process query and generate response
        print(f"Processing query: {question}")
        result = self.qa_chain({"query": question})
        
        # Return formatted response with sources
        return {
            "answer": result["result"],
            "sources": [doc.metadata for doc in result["source_documents"]]
        }`
  },
  {
    title: "AI Conversation Demo",
    language: "terminal",
    code: `::: MINH BUI TRAN CONG | AI ENGINEER :::

minh@ai-lab:~$ ./about-me.sh

[INFO] Initializing profile data...
[INFO] Loading experiences...
[INFO] Starting self-introduction sequence...

// ====================================
// Personal Information
// ====================================
const profile = {
  name: "Minh Bui Tran Cong",
  role: "AI Engineer",
  location: "Ho Chi Minh City, Vietnam",
  focus: ["LLMs", "NLP", "RAG", "Multimodal AI"],
  languages: ["Python", "TypeScript", "JavaScript"],
  frameworks: ["PyTorch", "LangChain", "Transformers", "React", "Next.js"],
  hobbies: ["Reading tech papers", "Football", "Coffee brewing"],
  contact: "minh.btrc@gmail.com"
};

// ====================================
// Experience Summary
// ====================================
const experience = [
  {
    company: "FPT Software AI Center",
    role: "AI Engineer",
    period: "2024 - Present",
    highlights: [
      "Working with cutting-edge AI solutions",
      "Developing Retrieval Augmented Generation systems",
      "Optimizing LLMs for production environments"
    ]
  },
  {
    company: "SPARTAN",
    role: "AI Engineer",
    period: "2023 - 2024",
    highlights: [
      "Led PDF Parser module development",
      "Implemented LLM-based data extraction",
      "Created integrated data mining pipelines"
    ]
  }
];

// ====================================
// Education
// ====================================
const education = {
  university: "Ho Chi Minh University of Technology",
  degree: "Computer Science",
  graduation: 2023,
  specialization: "Artificial Intelligence"
};

console.log("Always learning, always building!");
console.log("Let's connect and build something amazing together.")

minh@ai-lab:~$ _`
  },
  {
    title: "NLP Research Note",
    language: "markdown",
    code: `# Research Notes: Contextual Re-ranking for RAG
## By Minh BTC | AI Engineer

## Key Innovation
Our contextual re-ranking approach (CRAG) enhances traditional RAG systems through a two-stage retrieval architecture:

1. **Initial Retrieval:** Dense embedding similarity search using VertexAIEmbeddings to identify candidate documents
   - Chunk size: 512 tokens with 128 token overlap
   - Top-k sampling: 10 initial candidates

2. **Contextual Re-ranking:** Cross-encoder model evaluates documents considering:
   - Query-document semantic relevance
   - Conversation history context window
   - Document freshness and authority metrics
   - Text quality signals (coherence, informativeness)

3. **Adaptive Fusion:** Dynamic weighting between embedding similarity and re-ranking scores
   - Learns optimal weighting based on query type
   - Adapts to different domains automatically

## Experimental Results

| Metric | Base RAG | CRAG (Ours) |
|--------|---------|------------|
| NDCG@5 | 0.782   | **0.851**  |
| Answer Accuracy | 0.814 | **0.876** |
| Hallucination Rate | 0.156 | **0.087** |
| Latency Increase | 0ms | +125ms |
| Memory Usage | 1.0x | 1.3x |

## Next Steps
- Fine-tune re-ranker on domain-specific data
- Implement caching layer to reduce latency
- Explore contrastive learning approaches
- Test with Vietnamese language models

## References
- Fusion-in-Decoder: Zhao et al. (2023)
- ColBERT re-ranking: Khattab et al. (2022)
- Cross-encoder modeling: Hu et al. (2021)

Revision: v0.4 (Working Draft)
Last updated: Today @ 3:27 AM (after my 4th coffee)`
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
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const glitchTimerRef = useRef<NodeJS.Timeout | null>(null);
  
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
      "About Minh BTC",
      "NLP Research Notes"
    ];
    setTerminalTitle(titles[nextIndex]);
    
    // Start typing the new snippet
    typeCode(codeSnippets[nextIndex].code);
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
    
    // Fun titles that change with each snippet
    const titles = [
      "RAG System Implementation ☕",
      "AI Conversation Demo 💬",
      "NLP Research Note 📝"
    ];
    
    setTerminalTitle(titles[index]);
    typeCode(codeSnippets[index].code);
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
    }
  };
  
  // Start typing when component mounts - only once
  useEffect(() => {
    // Initial typing animation
    typeCode(currentSnippet.code);
    
    // Cleanup on unmount
    return () => clearAllTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once on mount
  
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

  return (
    <div className="relative z-0 mt-4">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/95 dark:bg-slate-800/30 backdrop-blur-sm border border-slate-300/80 dark:border-blue-900/30 rounded-t-lg shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
          <div className="font-mono text-xs text-slate-700 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-800/30 px-3 py-0.5 rounded-md backdrop-blur-sm">
            {easterEggActive && isAiThinking ? "AI_THINKING.exe" : terminalTitle}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetCurrentSnippet}
            className="p-1 text-slate-500 hover:text-blue-700 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
            aria-label="Reset snippet"
          >
            <RefreshCw size={14} />
          </button>
          <button
            onClick={togglePause}
            className="p-1 text-slate-500 hover:text-blue-700 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
            aria-label={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        onClick={handleTerminalClick}
        className={`relative font-mono p-6 text-sm md:text-base overflow-hidden bg-white/95 dark:bg-slate-800/30 backdrop-blur-sm border border-t-0 border-slate-300/80 dark:border-blue-900/30 rounded-b-lg shadow-md h-[380px] transition-colors ${isGlitching ? 'glitch' : ''}`}
        style={{ cursor: 'default' }}
      >
        {/* Terminal Decorations - Path and Prompt */}
        <div className="flex items-center mb-2 text-slate-700 dark:text-slate-400 text-sm">
          <span className="text-blue-700 dark:text-cyan-400">minh@ai-lab</span>
          <span className="text-slate-500 mx-1">:</span>
          <span className="text-indigo-700 dark:text-blue-400">~/projects</span>
          <span className="text-slate-500 mx-1">$</span>
        </div>

        {/* Code Display Area */}
        {easterEggActive ? (
          renderMatrixCode()
        ) : (
          <div className="relative min-h-full">
            <pre className={`text-slate-800 dark:text-slate-400 overflow-auto whitespace-pre ${currentSnippet.language === 'terminal' ? 'font-mono text-sm leading-relaxed' : ''}`}>
              {typedText}
            </pre>
          </div>
        )}

        {/* Terminal Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-3 border-t border-slate-200 dark:border-blue-900/30 bg-slate-50/95 dark:bg-slate-800/30 backdrop-blur-sm">
          <div className="flex space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevSnippet();
              }}
              className="p-1.5 rounded-md text-slate-600 hover:text-blue-700 dark:text-slate-400 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
              aria-label="Previous snippet"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNextSnippet();
              }}
              className="p-1.5 rounded-md text-slate-600 hover:text-blue-700 dark:text-slate-400 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
              aria-label="Next snippet"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="flex items-center">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-500 mr-2">
              snippet {currentSnippetIndex + 1}/{codeSnippets.length}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleAutoPlay();
              }}
              className={`p-1.5 rounded-md ${
                isAutoPlaying
                  ? 'text-blue-700 dark:text-cyan-400 bg-blue-50 dark:bg-slate-800/70'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70'
              } transition-colors`}
              aria-label={isAutoPlaying ? "Auto-play on" : "Auto-play off"}
            >
              <Play size={16} />
            </button>
          </div>
        </div>
      </div>
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
  return (
    <div className="w-full h-full max-w-full mx-auto relative z-10">
      <main className="w-full flex flex-col flex-grow relative z-10">
        {/* Page background with subtle pattern for light and dark modes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Remove duplicate gradient background */}
          {/* Add subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)]"></div>
        </div>
        
        {/* Hero Section with Enhanced Visuals */}
        <section className="relative w-full flex-grow pt-6 pb-20 overflow-visible bg-transparent">
          {/* Animated Background */}
          <ParticleBackground />
          
          <div className="container relative z-20 mx-auto px-4 md:px-6 h-full flex flex-col bg-transparent">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start h-full bg-transparent">
              {/* Main Content */}
              <div className="lg:col-span-8 space-y-8 bg-transparent">
                <div className="flex flex-col space-y-6 bg-transparent">
                  <TerminalHero />
                </div>
              </div>
              
              {/* Profile Card */}
              <motion.div 
                className="lg:col-span-4 bg-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <Profile />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
