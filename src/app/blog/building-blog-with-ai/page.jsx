import Image from 'next/image'
import { Terminal, Code, Sparkles, ArrowRight, Monitor, Zap, BookOpen, Lightbulb, Eye, Calendar, Clock } from 'lucide-react'

export const metadata = {
  title: 'Building a Dev-Centric Blog with ChatGPT & Cursor (from a CSS-Hating AI Engineer)',
  description: 'My journey building a modern, developer-centric blog using AI tools like Cursor and GPT-4o, despite limited frontend experience.'
}

export default function BuildingBlogWithAIPage() {
  return (
    <article className="prose max-w-none">
      {/* Header section */}
      <div className="mt-6">
        <h1 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-50 leading-tight">
          Building a Dev-Centric Blog with ChatGPT & Cursor
          <span className="block text-xl text-neutral-600 dark:text-neutral-400 font-normal mt-3">from a CSS-Hating AI Engineer</span>
        </h1>        
        <p className="text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
          My journey building a modern, developer-centric blog using AI tools like Cursor and GPT-4o, despite limited frontend experience (and a deep fear of CSS).
        </p>
      </div>
      
      {/* Terminal Homepage Screenshot */}
      <div className="mb-12">
        <div className="relative rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-lg">
          <Image 
            src="/images/blog/blog-homepage.png" 
            alt="Terminal-inspired blog homepage with profile picture" 
            width={1200} 
            height={675} 
            className="w-full h-auto"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent">
            <p className="text-white text-sm font-mono">Terminal-inspired homepage with profile photo and theme toggle</p>
          </div>
        </div>
      </div>
      
      {/* Introduction */}
      <section className="mb-16 relative">
        <div className="absolute left-0 top-1/2 w-12 h-12 border-l-2 border-t-2 border-neutral-200 dark:border-neutral-800 -ml-6 -mt-6"></div>
        
        <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
          Confessions of an AI Engineer
        </h2>
        
        <p className="text-xl mb-6 text-neutral-800 dark:text-neutral-200 leading-relaxed">
          Hey friends! Welcome to my digital lair—where experiments with AI, LLMs, agents, RAG systems, and miscellaneous tech obsessions come to life.
        </p>
        
        <p className="mb-6 text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
          Before we get lost in future rabbit holes, I want to share a small miracle: how I, a stubborn backend-focused AI engineer (who dreads anything involving CSS), somehow built a stylish, performant, dev-flavored blog.
        </p>
        
        <div className="font-mono text-sm bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 p-5 rounded-md mb-6 border-l-4 border-blue-500 dark:border-blue-600 shadow-sm">
          <span className="text-blue-600 dark:text-blue-400 font-bold">{`>`}</span> Quick spoiler: It involved a lot of help from my AI friends.
        </div>
        
        <p className="mb-6 text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
          I live for FastAPI & Backend Architecture, Embeddings & Vector Databases, LangChain & LlamaIndex, and Token Optimizations & OpenAI APIs. Graphs are beautiful. <span className="font-semibold text-blue-700 dark:text-blue-400">CSS flexbox and gradients are nightmares I'd rather delegate to the void.</span>
        </p>

        <p className="mb-6 text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
          Yet, here I am, with a frontend that looks good enough to fool visitors into believing I actually know what I'm doing.
        </p>
      </section>

      <hr className="border-t border-neutral-200 dark:border-neutral-800 my-12" />
      
      {/* Tech Stack Section */}
      <section className="mb-16 relative">
        <div className="absolute right-0 top-0 w-20 h-20 bg-gradient-to-bl from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 -z-10 rounded-full blur-2xl"></div>
        
        <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
          Stack: Minimalism with AI Magic
        </h2>
        
        <p className="text-xl mb-8 text-neutral-800 dark:text-neutral-200 leading-relaxed">
          When you hate CSS but still need a decent-looking blog, you reach for these tools:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border-l-4 border-green-500 dark:border-green-600 pl-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors rounded-r-md group">
            <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-50 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
              Framework
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2 leading-relaxed">
              Next.js 14 (App Router + TypeScript) for seamless routing, server components, and type safety.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold">Why?</span> Fast builds, instant previews, and excellent AI tool integration.
            </p>
          </div>
          
          <div className="border-l-4 border-blue-500 dark:border-blue-600 pl-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors rounded-r-md group">
            <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-50 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
              Styling
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2 leading-relaxed">
              TailwindCSS + Shadcn/UI for utility-first CSS and pre-built accessible components.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold">Why?</span> No more context-switching to CSS files. AI tools generate Tailwind classes effortlessly.
            </p>
          </div>
          
          <div className="border-l-4 border-purple-500 dark:border-purple-600 pl-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors rounded-r-md group">
            <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-50 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
              Editor
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2 leading-relaxed">
              Cursor AI — VSCode's smarter sibling with integrated AI coding capabilities.
            </p>
          </div>
          
          <div className="border-l-4 border-amber-500 dark:border-amber-600 pl-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors rounded-r-md group">
            <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-50 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
              Design Co-pilot
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2 leading-relaxed">
              GPT-4o — The AI design consultant that never sleeps or judges my taste.
            </p>
          </div>
          
          <div className="border-l-4 border-teal-500 dark:border-teal-600 pl-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors rounded-r-md group">
            <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-50 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
              Deployment
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Vercel for seamless git-based deployments, analytics, and performance monitoring.
            </p>
          </div>
        </div>
        
        <div className="p-6 bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 rounded-lg mb-6 shadow-sm">
          <h4 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-50 flex items-center">
            <Code size={18} className="mr-2 text-red-500 dark:text-red-400" />
            What's Notably Missing:
          </h4>
          <ul className="space-y-2 pl-6 list-disc text-neutral-700 dark:text-neutral-300">
            <li className="leading-relaxed">Figma designs (who has time?)</li>
            <li className="leading-relaxed">Dribbble inspiration boards (too overwhelming)</li>
            <li className="leading-relaxed">Design skills (compensated for with AI)</li>
            <li className="leading-relaxed">Patience for CSS troubleshooting (life's too short)</li>
          </ul>
        </div>
        
        <div className="font-mono text-sm text-neutral-700 dark:text-neutral-300 border-l-4 border-neutral-400 dark:border-neutral-600 pl-6 py-4 italic bg-neutral-50 dark:bg-neutral-900 rounded-r-md">
          No Figma, no endlessly scrolling Dribbble, just me, GPT, and a willingness to humble myself repeatedly.
        </div>
      </section>

      <hr className="border-t border-neutral-200 dark:border-neutral-800 my-12" />

      {/* The Loop Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
          The Loop: How I Outsourced My Frontend Anxiety
        </h2>
        
        <p className="text-xl mb-8 text-neutral-800 dark:text-neutral-200 leading-relaxed">
          Here's my secret weapon—the iterative AI development loop:
        </p>
        
        <div className="mb-8 relative">
          <div className="absolute left-0 top-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 -z-10 rounded-full blur-xl -ml-8 -mt-8"></div>
          
          <h3 className="text-2xl font-semibold mb-6 text-neutral-900 dark:text-neutral-50 inline-block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            The AI-Powered Dev Loop
          </h3>
          
          <ol className="space-y-6 mb-8 pl-6 list-decimal">
            <li className="bg-white dark:bg-neutral-900 p-5 rounded-lg shadow-sm">
              <h4 className="font-medium text-lg mb-2 text-neutral-900 dark:text-neutral-50 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full mr-3 font-bold">1</span>
                Cursor AI Code Sprint
              </h4>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">I write something basic—hero, card, nav. I highlight the ugly bits and pray Cursor knows how to Tailwind better than I do.</p>
            </li>
            
            <li className="bg-white dark:bg-neutral-900 p-5 rounded-lg shadow-sm">
              <h4 className="font-medium text-lg mb-2 text-neutral-900 dark:text-neutral-50 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full mr-3 font-bold">2</span>
                Browser Refresh of Disappointment
              </h4>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">Hit refresh. Embrace reality. It's always underwhelming, which is great—low expectations fuel innovation.</p>
            </li>
            
            <li className="bg-white dark:bg-neutral-900 p-5 rounded-lg shadow-sm">
              <h4 className="font-medium text-lg mb-2 text-neutral-900 dark:text-neutral-50 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full mr-3 font-bold">3</span>
                Screenshot of Shame
              </h4>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">Capture my mediocrity in full HD.</p>
            </li>
            
            <li className="bg-white dark:bg-neutral-900 p-5 rounded-lg shadow-sm">
              <h4 className="font-medium text-lg mb-2 text-neutral-900 dark:text-neutral-50 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full mr-3 font-bold">4</span>
                ChatGPT Design Therapy Session (GPT-4o)
              </h4>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">Drop the screenshot into GPT-4o with desperate pleas like: "Make this look less terrible, more hacker-chic."</p>
            </li>
            
            <li className="bg-white dark:bg-neutral-900 p-5 rounded-lg shadow-sm">
              <h4 className="font-medium text-lg mb-2 text-neutral-900 dark:text-neutral-50 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full mr-3 font-bold">5</span>
                Implement AI Suggestions
              </h4>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">GPT-4o generously provides precise, actionable tips:</p>
              <div className="font-mono text-sm text-neutral-700 dark:text-neutral-300 mt-3 pl-5 border-l-2 border-blue-400 dark:border-blue-600 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-r-md">
                <p className="mb-2">• "Use monospaced fonts for the hacker vibe"</p>
                <p className="mb-2">• "Put a blinking cursor animation next to your name to pretend you're Neo"</p>
                <p>• "Hover states, because even backend devs deserve fun interactions"</p>
              </div>
            </li>
            
            <li className="bg-white dark:bg-neutral-900 p-5 rounded-lg shadow-sm">
              <h4 className="font-medium text-lg mb-2 text-neutral-900 dark:text-neutral-50 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full mr-3 font-bold">6</span>
                Repeat Until Satisfied or Less Ashamed
              </h4>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">Rinse, refresh, repeat. It feels like pair programming with a super talented designer who doesn't judge my lack of CSS prowess.</p>
            </li>
          </ol>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800">
            <h4 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-50 flex items-center">
              <Lightbulb size={20} className="mr-2 text-amber-500 dark:text-amber-400" />
              Why Does This Loop Actually Work?
            </h4>
            <ul className="space-y-4 pl-6 list-disc">
              <li className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <strong className="font-semibold text-blue-700 dark:text-blue-400">Immediate Gratification:</strong> No context switches. Just me, my AI duo, and immediate feedback.
              </li>
              <li className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <strong className="font-semibold text-blue-700 dark:text-blue-400">No Guesswork:</strong> GPT-4o provides ultra-specific, practical advice—no more CSS existential dread.
              </li>
              <li className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <strong className="font-semibold text-blue-700 dark:text-blue-400">Stealth Learning:</strong> Iterative AI feedback subtly trained my eye. Now I catch myself saying, "Hmm, that's not aligned" before GPT does.
              </li>
              <li className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <strong className="font-semibold text-blue-700 dark:text-blue-400">Infinite Availability:</strong> GPT-4o is my midnight companion who never complains or files HR reports.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-t border-neutral-200 dark:border-neutral-800 my-8" />

      {/* Example section */}
      <section className="mb-16 relative">
        <div className="absolute right-0 top-1/3 w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 -z-10 rounded-full blur-xl"></div>
        
        <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
          Example: Hero Section Glow-Up
        </h2>
        
        <p className="text-xl mb-8 text-neutral-800 dark:text-neutral-200 leading-relaxed">
          Let's walk through how one component evolved through this AI feedback loop:
        </p>
        
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-neutral-50 inline-block bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            Before: Basic Hero (Iteration 1)
          </h3>
          
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-sm mb-8 border border-neutral-200 dark:border-neutral-800">
            <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Initial state: A bland, uninspired hero section with:
            </p>
            
            <ul className="pl-6 list-disc mb-4 text-neutral-700 dark:text-neutral-300 space-y-2">
              <li className="leading-relaxed">Plain text header</li>
              <li className="leading-relaxed">Default paragraph styling</li>
              <li className="leading-relaxed">Basic button with no hover effects</li>
              <li className="leading-relaxed">No visual hierarchy</li>
            </ul>
          </div>
          
          <h3 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-neutral-50 inline-block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            GPT-4o Suggestions
          </h3>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-lg shadow-sm mb-8 border border-blue-100 dark:border-blue-800">
            <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
              After showing GPT-4o a screenshot, it suggested:
            </p>
            
            <ul className="pl-6 list-disc mb-0 space-y-2">
              <li className="text-neutral-700 dark:text-neutral-300 leading-relaxed">Add spacing and padding for breathing room</li>
              <li className="text-neutral-700 dark:text-neutral-300 leading-relaxed">Improve typography with font weight variations</li>
              <li className="text-neutral-700 dark:text-neutral-300 leading-relaxed">Include subtle background styling</li>
              <li className="text-neutral-700 dark:text-neutral-300 leading-relaxed">Add hover effects to the button</li>
              <li className="text-neutral-700 dark:text-neutral-300 leading-relaxed">Incorporate a visual element or subtle pattern</li>
            </ul>
          </div>
          
          <h3 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-neutral-50 inline-block bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">
            After: Improved Hero (Iteration 3)
          </h3>
          
          <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 p-6 rounded-lg shadow-sm border border-green-100 dark:border-green-800">
            <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Final state after three iterations:
            </p>
            <div className="text-neutral-600 dark:text-neutral-400 text-lg italic">
              "A minimalist yet visually compelling design with purposeful spacing, varied typography, and subtle animations."
            </div>
          </div>
        </div>
        
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed border-l-4 border-amber-500 dark:border-amber-600 pl-6 py-4 bg-amber-50 dark:bg-amber-900/20 rounded-r-md">
          The difference? Night and day. After three iterations, we went from "clearly made by a backend dev" to "intentional minimal design." The AI suggested changes I wouldn't have thought to make—like the subtle gradient background and the secondary button for hierarchy.
        </p>
      </section>

      <hr className="border-t border-neutral-200 dark:border-neutral-800 my-12" />

      {/* Results Section */}
      <section className="mb-16 relative">
        <div className="absolute left-0 top-0 w-20 h-20 bg-gradient-to-br from-teal-100 to-green-100 dark:from-teal-900/20 dark:to-green-900/20 -z-10 rounded-full blur-2xl"></div>
        
        <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
          Final Results & Features
        </h2>

        <p className="text-xl mb-8 text-neutral-800 dark:text-neutral-200 leading-relaxed">
          After two weeks, I went from "help me center this div" to confidently implementing complex UI components using my AI-powered dev loop. Here's what emerged:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border-l-4 border-blue-500 dark:border-blue-600 pl-6 py-4 bg-white dark:bg-neutral-900 shadow-sm rounded-md">
            <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-50 flex items-center">
              <Monitor size={20} className="mr-2 text-blue-500 dark:text-blue-400" />
              This Blog
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
              What you're reading right now—built with Next.js, Tailwind, and AI teammates. Every single component went through my development loop.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">Next.js</span>
              <span className="inline-block px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">Tailwind</span>
              <span className="inline-block px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">Cursor AI</span>
            </div>
          </div>
          
          <div className="border-l-4 border-purple-500 dark:border-purple-600 pl-6 py-4 bg-white dark:bg-neutral-900 shadow-sm rounded-md">
            <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-50 flex items-center">
              <Sparkles size={20} className="mr-2 text-purple-500 dark:text-purple-400" />
              Portfolio Site
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
              The results were surprisingly good. Custom animations, responsive design, dark mode—all guided by AI design consultations.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full">Animations</span>
              <span className="inline-block px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full">Responsive</span>
              <span className="inline-block px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full">Dark Mode</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 p-6 rounded-lg shadow-sm mb-8">
          <p className="mb-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg">
            Would I call myself a frontend developer after this process? No. But the CSS terror subsided, and with this AI development loop, anyone can build presentable interfaces that don't make users' eyes bleed.
          </p>
        </div>
        
        <blockquote className="border-l-4 border-green-500 dark:border-green-600 pl-6 py-4 bg-green-50 dark:bg-green-900/20 rounded-r-md mb-6">
          <p className="italic text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            "The best developer tools don't replace your skills—they augment them. This AI loop isn't about letting machines do the work; it's about creating a feedback cycle that helps you improve faster."
          </p>
          <footer className="text-right mt-4 text-neutral-600 dark:text-neutral-400">— A moment of unexpected wisdom</footer>
        </blockquote>
      </section>

      <hr className="border-t border-neutral-200 dark:border-neutral-800 my-12" />

      {/* Next Idea section */}
      <section className="mb-16 relative">
        <div className="absolute right-0 top-1/4 w-24 h-24 bg-gradient-to-bl from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 -z-10 rounded-full blur-3xl"></div>
        
        <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
          Next Idea: Automated Dev Loop
        </h2>
        
        <p className="text-xl mb-8 text-neutral-800 dark:text-neutral-200 leading-relaxed">
          What's next? I'm exploring ways to automate this entire feedback loop. Imagine this:
        </p>

        {/* Enhanced unified component card with consistent grid layout */}
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-950/50 p-6 mb-10 shadow-sm">
          {/* Top row with 3 components */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-sm border-t-4 border-blue-500 dark:border-blue-600 hover:translate-y-[-2px] transition-all duration-200 h-full">
              <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50 flex items-center">
                <Code size={20} className="mr-3 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                Code Editor
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">Code changes trigger automatic renders in development server</p>
            </div>
            
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-sm border-t-4 border-purple-500 dark:border-purple-600 hover:translate-y-[-2px] transition-all duration-200 h-full">
              <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50 flex items-center">
                <Monitor size={20} className="mr-3 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                UI Renderer
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">Captures screenshots at set intervals or on significant changes</p>
            </div>
            
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-sm border-t-4 border-green-500 dark:border-green-600 hover:translate-y-[-2px] transition-all duration-200 h-full">
              <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50 flex items-center">
                <Zap size={20} className="mr-3 text-green-500 dark:text-green-400 flex-shrink-0" />
                Local Agent
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">Orchestrates the flow between components</p>
            </div>
          </div>
          
          {/* GPT-4o Analysis with improved visual styling */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-lg shadow-sm mb-6 border border-blue-100 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
            <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50 flex items-center">
              <Eye size={20} className="mr-3 text-blue-500 dark:text-blue-400 flex-shrink-0" />
              GPT-4o Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 rounded-full mr-3">
                  <Eye size={16} />
                </div>
                <div>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">Evaluates UI</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Analyzes screenshots visually</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400 rounded-full mr-3">
                  <Lightbulb size={16} />
                </div>
                <div>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">Suggests improvements</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Provides actionable feedback</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/60 text-green-600 dark:text-green-400 rounded-full mr-3">
                  <Code size={16} />
                </div>
                <div>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">Generates code</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Creates implementation fixes</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Timeline-style feedback loop visualization */}
          <div className="bg-neutral-900 dark:bg-neutral-950 p-6 rounded-lg shadow-md text-center">
            <h4 className="text-neutral-100 dark:text-neutral-200 font-medium mb-4 flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
              Continuous Feedback Loop
            </h4>
            
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2 md:gap-0">
              <div className="px-3 py-2 bg-blue-900/40 text-blue-300 rounded font-mono">Code</div>
              <ArrowRight size={20} className="text-purple-400 mx-1 hidden md:block" />
              <div className="px-3 py-2 bg-indigo-900/40 text-indigo-300 rounded font-mono">Render</div>
              <ArrowRight size={20} className="text-purple-400 mx-1 hidden md:block" />
              <div className="px-3 py-2 bg-purple-900/40 text-purple-300 rounded font-mono">Screenshot</div>
              <ArrowRight size={20} className="text-purple-400 mx-1 hidden md:block" />
              <div className="px-3 py-2 bg-fuchsia-900/40 text-fuchsia-300 rounded font-mono">GPT-4o</div>
              <ArrowRight size={20} className="text-purple-400 mx-1 hidden md:block" />
              <div className="px-3 py-2 bg-pink-900/40 text-pink-300 rounded font-mono">Code Changes</div>
              <div className="flex items-center justify-center w-8 h-8 bg-green-900/30 text-green-400 rounded-full mx-2">
                <div className="w-6 h-6 rounded-full border-2 border-green-400 border-t-transparent animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
          Why Does This Loop Actually Work?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-sm border-l-4 border-blue-500 dark:border-blue-600 hover:translate-y-[-2px] transition-all duration-200 h-full">
            <h4 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50 flex items-center">
              <Eye size={20} className="mr-3 text-blue-500 dark:text-blue-400 flex-shrink-0" />
              Visual Context {'>'} Text
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              GPT-4o can see what you've built and suggest specific fixes. No more "add margin-left" guessing games.
            </p>
          </div>
          
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-sm border-l-4 border-purple-500 dark:border-purple-600 hover:translate-y-[-2px] transition-all duration-200 h-full">
            <h4 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50 flex items-center">
              <ArrowRight size={20} className="mr-3 text-purple-500 dark:text-purple-400 flex-shrink-0" />
              Incremental Refinement
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Each loop brings you 10-20% closer to a decent design. After 3-5 iterations, you'll have something surprisingly good.
            </p>
          </div>
          
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-sm border-l-4 border-green-500 dark:border-green-600 hover:translate-y-[-2px] transition-all duration-200 h-full">
            <h4 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50 flex items-center">
              <BookOpen size={20} className="mr-3 text-green-500 dark:text-green-400 flex-shrink-0" />
              Design Pattern Learning
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              After a while, you'll recognize good patterns without AI help. It's like having a mentor who's available 24/7.
            </p>
          </div>
        </div>
      </section>
      
      <hr className="border-t border-neutral-200 dark:border-neutral-800 my-12" />

      {/* Final Reflections section */}
      <section className="mb-16 relative">
        <div className="absolute left-0 top-1/3 w-32 h-32 bg-gradient-to-br from-amber-100 to-red-100 dark:from-amber-900/20 dark:to-red-900/20 -z-10 rounded-full blur-3xl -ml-16"></div>
        
        <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
          Final Reflections: AI as a Frontend Cheat-Code
        </h2>
        
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-sm mb-8">
          <ul className="mb-0 space-y-4 pl-6 list-disc">
            <li className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg">You don't need design skills; you just need AI patience.</li>
            <li className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg">Screenshots beat text prompts for UI. GPT sees what your words can't describe.</li>
            <li className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg">Building alongside AI isn't just efficient—it's genuinely fun.</li>
            <li className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg">The barrier between backend and frontend is blurrier than my eyesight at 3 AM (in a good way).</li>
          </ul>
        </div>
        
        <p className="text-xl mb-8 text-neutral-700 dark:text-neutral-300 leading-relaxed bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 p-6 rounded-lg shadow-sm">
          To every dev who's ever felt "I'm terrible at frontend": Try this loop. It's like discovering cheat codes for real life.
        </p>

        <div className="border-l-4 border-amber-500 dark:border-amber-600 pl-6 py-6 bg-white dark:bg-neutral-900 rounded-md shadow-sm mb-8">
          <p className="font-semibold text-xl mb-4 text-neutral-900 dark:text-neutral-50 flex items-center">
            <BookOpen size={18} className="mr-2 text-amber-500 dark:text-amber-400" />
            Coming Soon:
          </p>
          <ul className="space-y-2 pl-6 list-disc text-neutral-700 dark:text-neutral-300">
            <li className="leading-relaxed">Deep dive into my document chunking adventures</li>
            <li className="leading-relaxed">AI-powered Projects showcase</li>
            <li className="leading-relaxed">Maybe open-source my AI-crafted blog template</li>
          </ul>
        </div>
        
        <p className="italic text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
          Stay tuned—and if you're building cool stuff with AI, hit me up!
        </p>
      </section>

      {/* <hr className="border-t border-neutral-200 dark:border-neutral-800 my-12" /> */}

      {/* Footer
      <footer className="pt-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-sm">
          <Link href="/blog" className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4 md:mb-0 group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to all posts
          </Link>
          
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-2">Built with</p>
            <div className="flex space-x-4 text-sm">
              <span className="text-blue-600 dark:text-blue-400">Next.js</span>
              <span className="text-teal-600 dark:text-teal-400">Tailwind</span>
              <span className="text-purple-600 dark:text-purple-400">Cursor</span>
              <span className="text-amber-600 dark:text-amber-400">GPT-4o</span>
            </div>
          </div>
        </div>
      </footer> */}
    </article>
  )
} 