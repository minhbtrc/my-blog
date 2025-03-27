'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Terminal, Play, Pause, ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react'
import ky from 'ky'
import useSWR from 'swr'
import { useState, useEffect, useRef } from 'react'

import Profile from '@/components/profile'
import Tags from '@/components/tags'

// Animated Particle Component for Hero Background
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 dark:from-indigo-900/20 dark:via-blue-800/20 dark:to-teal-800/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(37,99,235,0.1),transparent)]" />
      
      {Array.from({ length: 30 }).map((_, i) => {
        const size = Math.random() * 8 + 2;
        const duration = Math.random() * 30 + 15;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const targetX = Math.random() * 100;
        const targetY = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10 dark:bg-sky-400/10"
            style={{
              width: size,
              height: size,
              top: `${initialY}%`,
              left: `${initialX}%`,
            }}
            animate={{
              y: [`${initialY}%`, `${targetY}%`],
              x: [`${initialX}%`, `${targetX}%`],
              opacity: [Math.random() * 0.5 + 0.2, Math.random() * 0.3 + 0.1, Math.random() * 0.5 + 0.2],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
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
    code: `from langchain.embeddings import VertexAIEmbeddings
from langchain.llms import VertexAI
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA

class RAGSystem:
    def __init__(self, documents, model="text-bison@002"):
        self.llm = VertexAI(model_name=model)
        self.embeddings = VertexAIEmbeddings()
        self.vectorstore = self._create_vectorstore(documents)
        self.retriever = self.vectorstore.as_retriever(
            search_type="mmr",
            search_kwargs={"k": 5, "fetch_k": 10}
        )
        self.qa_chain = self._setup_qa_chain()
        
    def _create_vectorstore(self, documents):
        return Chroma.from_documents(
            documents=documents,
            embedding=self.embeddings
        )
    
    def answer_question(self, question):
        result = self.qa_chain({"query": question})
        return {
            "answer": result["result"],
            "sources": [doc.metadata for doc in result["source_documents"]]
        }`
  },
  {
    title: "AI Conversation Demo",
    language: "terminal",
    code: `::: COFFEE FUELED AI DEMO :::

[MINH@SYSTEM] ~ $ python coffee_ai.py
Loading AI model... Done.
Initializing knowledge bases... Done.
Brewing coffee... ☕ Done!

AI> Hello! I'm an AI assistant built by Minh. 
    How can I help you today?

USER> What can you tell me about RAG systems?

AI> Retrieval Augmented Generation (RAG) combines 
retrieval systems with generative AI:

1. Retrieves relevant documents
2. Augments the prompt with this information
3. Generates responses using retrieved context

This approach reduces hallucinations while 
providing up-to-date information with factual 
accuracy. Perfect for domain specialization!

USER> How does LoRA work for fine-tuning?

AI> Low-Rank Adaptation (LoRA) is an efficient 
fine-tuning technique that:

1. Freezes pre-trained model weights
2. Injects trainable rank decomposition matrices
3. Only trains these small adapter matrices

For a weight matrix W:
W + ΔW = W + A×B (where rank r << full size)

This reduces trainable parameters by ~10,000× 
while allowing fine-tuning on consumer GPUs.

Minh uses this to create specialized models 
while consuming dangerous amounts of coffee!`
  },
  {
    title: "NLP Research Note",
    language: "markdown",
    code: `# Contextual Re-ranking for RAG

## Key Innovation

Our CRAG system implements a two-stage retrieval:

1. **Initial Retrieval:** Dense embedding similarity 
   search using VertexAIEmbeddings

2. **Contextual Re-ranking:** Cross-encoder model that 
   considers:
   - Query-document relevance
   - Conversation history context
   - Document quality metrics

3. **Adaptive Fusion:** Dynamic weighting between 
   embedding similarity and re-ranking scores

## Results

| Metric | Base RAG | CRAG (Ours) |
|--------|---------|------------|
| NDCG@5 | 0.782   | **0.851**  |
| Answer Accuracy | 0.814 | **0.876** |
| Hallucination Rate | 0.156 | **0.087** |

Written at 3am with my 4th coffee of the night.
The caffeine definitely helped with the math.
`
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
      "RAG System Implementation ☕",
      "AI Conversation Demo 💬",
      "NLP Research Note 📝"
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-3xl"
    >
      <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
        <div className="overflow-hidden">
          <motion.span
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="inline-block text-slate-800 dark:text-slate-50"
          >
            Yooooo
          </motion.span>
        </div>
      </h1>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "35%" }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-dark))] mb-8 rounded-full"
      />
      
      <motion.div 
        className={terminalClass}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        whileHover={{ boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)" }}
        onClick={handleTerminalClick}
      >
        {/* Matrix code background for tech feel */}
        <div className="matrix-code">
          {renderMatrixCode()}
        </div>
        
        {/* Terminal header */}
        <div className="terminal-header">
          <div className="flex gap-1.5">
            <motion.div 
              className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-600 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              onClick={(e) => {
                e.stopPropagation();
                triggerGlitch();
                setTerminalTitle("Neural connection aborted! ⚠️");
                setTimeout(() => setTerminalTitle(
                  ["RAG System Implementation ☕", "AI Conversation Demo 💬", "NLP Research Note 📝"][currentSnippetIndex]
                ), 1500);
              }}
            />
            <motion.div 
              className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-600 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              onClick={(e) => {
                e.stopPropagation();
                triggerGlitch();
              }}
            />
            <motion.div 
              className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-600 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              onClick={(e) => {
                e.stopPropagation();
                // Cycle through snippets on green button click
                goToNextSnippet();
              }}
            />
          </div>
          <div className="text-xs flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <motion.span
              key={terminalTitle}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {terminalTitle}
            </motion.span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                togglePause();
              }}
              className={`transition-colors ml-1 ${isPaused ? 'text-orange-500' : 'hover:text-[rgb(var(--color-accent))]'}`}
              title={isPaused ? "Resume typing" : "Pause typing"}
            >
              {isPaused ? 
                <span className="text-base font-bold text-orange-500">❚❚</span> : 
                <span className="text-base">❙❙</span>}
            </button>
          </div>
          <div className="terminal-controls">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                togglePause();
              }}
              className={`transition-colors ${isPaused ? 'text-orange-500' : 'hover:text-[rgb(var(--color-accent))]'}`}
              title={isPaused ? "Resume typing" : "Pause typing"}
            >
              {isPaused ? 
                <span className="text-xl font-bold text-orange-500">❚❚</span> : 
                <span className="text-xl">❙❙</span>}
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleAutoPlay();
              }}
              className={`hover:text-[rgb(var(--color-accent))] transition-colors ${!isAutoPlaying ? 'text-orange-500' : ''}`}
              title={isAutoPlaying ? "Stop auto-play" : "Start auto-play"}
            >
              {isAutoPlaying ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                goToPrevSnippet();
              }}
              className="hover:text-[rgb(var(--color-accent))] transition-colors"
              title="Previous snippet"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                goToNextSnippet();
              }}
              className="hover:text-[rgb(var(--color-accent))] transition-colors"
              title="Next snippet"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                resetCurrentSnippet();
              }}
              className="hover:text-[rgb(var(--color-accent))] transition-colors"
              title="Restart current snippet"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        {/* Terminal body - MAKING IT SHORTER */}
        <div className="terminal-body" style={{ height: '320px' }}>
          <div className="terminal-line">
            <span className="terminal-prompt">minh@coffee-engineer</span>:<span className="terminal-prompt-directory">~/projects/ai-systems</span>$ {
              currentSnippet.language === 'python' ? 'cat rag_system.py' : 
              currentSnippet.language === 'terminal' ? './coffee_ai.py' : 
              currentSnippet.language === 'markdown' ? 'cat research_notes.md' :
              'python run.py'
            }
          </div>
          <div className="relative overflow-x-auto">
            <pre className={`code-animated ${currentSnippet.language}`}>
              <code>
                {typedText}
                {isAiThinking && (
                  <motion.span 
                    className="ai-thinking"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ▋
                  </motion.span>
                )}
                {!isAiThinking && <span className="terminal-cursor">▋</span>}
              </code>
            </pre>
          </div>
        </div>
        
        {/* Terminal footer with typing indicator */}
        <div className="px-4 py-2 bg-[#1a1a1a] border-t border-[#334155] flex justify-between items-center text-xs">
          <div className="text-slate-400 flex items-center">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                color: ["#64ffda", "#ff7edb", "#64ffda"]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="mr-2"
            >
              {isPaused ? '☕' : '💻'}
            </motion.div>
            <span>{Math.floor((typedText.length / currentSnippet.code.length) * 100)}% | {currentSnippetIndex + 1}/{codeSnippets.length}</span>
            {clickCount > 0 && clickCount < 5 && <span className="ml-2 text-xs opacity-50">Neural access: {5-clickCount} more clicks</span>}
          </div>
          <div className="flex items-center gap-1.5">
            <motion.span 
              className="inline-block w-2 h-2 rounded-full"
              animate={{ 
                backgroundColor: isPaused ? 
                  ['#FF4500', '#FFD700', '#FF4500'] : 
                  'rgb(var(--color-accent))'
              }}
              transition={{ duration: 1, repeat: isPaused ? Infinity : 0 }}
            />
            <span className="text-[rgb(var(--color-accent))] font-semibold">Coffee-Powered Mode</span>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex flex-wrap gap-4 pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <Link href="/blog">
          <motion.button
            className="bg-slate-700 hover:bg-slate-800 text-white rounded-lg px-8 py-3 font-medium relative overflow-hidden group shadow-sm"
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(15, 23, 42, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore Articles</span>
            <motion.span 
              className="absolute inset-0 bg-white/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
            />
            <ArrowRight className="ml-2 inline-block w-5 h-5 relative z-10" />
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
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
    <main className="w-full flex flex-col flex-grow relative z-10">
      {/* Hero Section with Enhanced Visuals */}
      <section className="relative w-full flex-grow py-20 overflow-visible">
        {/* Animated Background */}
        <ParticleBackground />
        
        <div className="container relative z-20 mx-auto px-4 md:px-6 h-full flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start h-full">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex flex-col space-y-6">
                <TerminalHero />
              </div>
            </div>
            
            {/* Profile Card */}
            <motion.div 
              className="lg:col-span-4"
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
  )
}
