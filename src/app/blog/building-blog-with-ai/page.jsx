import Image from 'next/image'
import Link from 'next/link'
import { Terminal, Code, Sparkles, ArrowRight, Monitor, Package, Zap } from 'lucide-react'

export const metadata = {
  title: 'How I Built My Blog with ChatGPT & Cursor—As an AI Engineer (Who Hates CSS)',
  description: 'My journey building a modern, developer-centric blog using AI tools like Cursor and GPT-4o, despite having limited frontend experience.'
}

export default function BuildingBlogWithAIPage() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      {/* Header section */}
      <div className="mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div className="inline-flex items-center space-x-2 text-sm font-mono text-neutral-600 dark:text-neutral-400 mb-3 px-2 py-1 bg-neutral-100 dark:bg-neutral-900 rounded-md">
          <Terminal size={14} className="text-neutral-500 dark:text-neutral-400" />
          <span>ai-engineering / blog</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-6 text-neutral-900 dark:text-neutral-50">
          How This Blog Was Built with ChatGPT & Cursor—By an AI Engineer (Who Hates CSS)
        </h1>
        
        <div className="bg-neutral-100 dark:bg-neutral-900 p-5 rounded-lg mb-8">
          <p className="text-lg text-neutral-700 dark:text-neutral-300 italic mb-0">
            The journey of building a modern, developer-centric blog using AI tools like Cursor and GPT-4o, despite limited frontend experience (and a deep fear of CSS).
          </p>
        </div>
      </div>
      
      {/* Introduction */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">Confessions of an AI Engineer</h2>
        <p className="text-lg mb-4 text-neutral-800 dark:text-neutral-200">
          Meet our protagonist—an AI engineer whose digital lair hosts experiments with LLMs, agents, RAG systems, and miscellaneous tech obsessions.
        </p>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Before diving into future rabbit holes, there's a small miracle to share: how a stubborn backend-focused engineer (who dreads anything CSS-related) somehow built a stylish, performant, dev-flavored blog.
        </p>
        <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg mb-6 font-mono text-sm border-l-4 border-neutral-300 dark:border-neutral-700">
          <span className="text-neutral-500 dark:text-neutral-400">{`>`}</span> Quick spoiler: It involved a lot of help from AI friends.
        </div>
        
        <p className="mb-6 text-neutral-700 dark:text-neutral-300">
          This engineer lives for FastAPI, embeddings, LangChain, LlamaIndex, OpenAI APIs, token optimizations—you get the idea. Graphs are beautiful. <span className="font-semibold">CSS flexbox and gradients are nightmares they'd rather delegate to the void.</span>
        </p>

        <div className="flex items-start p-4 bg-neutral-100 dark:bg-neutral-900 border-l-4 border-neutral-300 dark:border-neutral-700 rounded-r-lg mb-6">
          <div className="mt-1 mr-4 flex-shrink-0">
            <Code size={20} className="text-neutral-500 dark:text-neutral-400" />
          </div>
          <p className="m-0 text-neutral-700 dark:text-neutral-300">
            Yet, somehow, there emerges a frontend that looks good enough to fool visitors into believing actual CSS knowledge exists here.
          </p>
        </div>
      </div>

      {/* Main content section: The Loop */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-50">
          The Loop: How Frontend Anxiety Got Outsourced
        </h2>
        
        <p className="text-lg mb-6 text-neutral-800 dark:text-neutral-200">
          Here's the secret weapon—the iterative AI development loop our hero discovered:
        </p>
        
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-5 text-neutral-900 dark:text-neutral-50">The AI-Powered Dev Loop</h3>
          
          <ol className="space-y-6 mb-6">
            <li className="flex">
              <div className="bg-neutral-200 dark:bg-neutral-800 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">1</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1 text-neutral-900 dark:text-neutral-50">Cursor AI Code Sprint</h4>
                <p className="text-neutral-700 dark:text-neutral-300">Write something basic—hero, card, nav. Highlight the ugly bits and pray Cursor knows how to Tailwind better than you do.</p>
              </div>
            </li>
            
            <li className="flex">
              <div className="bg-neutral-200 dark:bg-neutral-800 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">2</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1 text-neutral-900 dark:text-neutral-50">Browser Refresh of Disappointment</h4>
                <p className="text-neutral-700 dark:text-neutral-300">Hit refresh. Embrace reality. It's always underwhelming, which is great—low expectations fuel innovation.</p>
              </div>
            </li>
            
            <li className="flex">
              <div className="bg-neutral-200 dark:bg-neutral-800 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">3</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1 text-neutral-900 dark:text-neutral-50">Screenshot of Shame</h4>
                <p className="text-neutral-700 dark:text-neutral-300">Capture the mediocrity in full HD.</p>
              </div>
            </li>
            
            <li className="flex">
              <div className="bg-neutral-200 dark:bg-neutral-800 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">4</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1 text-neutral-900 dark:text-neutral-50">ChatGPT Design Therapy Session (GPT-4o)</h4>
                <p className="text-neutral-700 dark:text-neutral-300">Drop the screenshot into GPT-4o with desperate pleas like: "Make this look less terrible, more hacker-chic."</p>
              </div>
            </li>
            
            <li className="flex">
              <div className="bg-neutral-200 dark:bg-neutral-800 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">5</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1 text-neutral-900 dark:text-neutral-50">Implement AI Suggestions</h4>
                <p className="text-neutral-700 dark:text-neutral-300">GPT-4o generously provides precise, actionable tips:</p>
                <div className="font-mono text-sm text-neutral-700 dark:text-neutral-300 mt-2 pl-4 border-l-2 border-neutral-300 dark:border-neutral-700">
                  <p className="mb-2">• "Use monospaced fonts for the hacker vibe"</p>
                  <p className="mb-2">• "Put a blinking cursor animation next to your name to pretend you're Neo"</p>
                  <p>• "Hover states, because even backend devs deserve fun interactions"</p>
                </div>
              </div>
            </li>
            
            <li className="flex">
              <div className="bg-neutral-200 dark:bg-neutral-800 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">6</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1 text-neutral-900 dark:text-neutral-50">Repeat Until Satisfied or Less Ashamed</h4>
                <p className="text-neutral-700 dark:text-neutral-300">Rinse, refresh, repeat. It feels like pair programming with a super talented designer who doesn't judge your lack of CSS prowess.</p>
              </div>
            </li>
          </ol>
          
          <div className="mt-8 mb-6 pl-4 border-l-2 border-neutral-300 dark:border-neutral-700">
            <h4 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-neutral-50">Why Does This Loop Actually Work?</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600 dark:text-neutral-400 mr-2 mt-1 flex-shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                <span className="text-neutral-700 dark:text-neutral-300"><strong className="font-semibold">Immediate Gratification:</strong> No context switches. Just the developer, their AI duo, and immediate feedback.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600 dark:text-neutral-400 mr-2 mt-1 flex-shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                <span className="text-neutral-700 dark:text-neutral-300"><strong className="font-semibold">No Guesswork:</strong> GPT-4o provides ultra-specific, practical advice—no more CSS existential dread.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600 dark:text-neutral-400 mr-2 mt-1 flex-shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                <span className="text-neutral-700 dark:text-neutral-300"><strong className="font-semibold">Stealth Learning:</strong> Iterative AI feedback subtly trains the eye. Eventually, they found themselves saying, "Hmm, that's not aligned" before GPT does.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600 dark:text-neutral-400 mr-2 mt-1 flex-shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                <span className="text-neutral-700 dark:text-neutral-300"><strong className="font-semibold">Infinite Availability:</strong> GPT-4o is the midnight companion who never complains or files HR reports.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Example section */}
      <section className="mb-14">
        <div className="pl-4 border-l-2 border-neutral-300 dark:border-neutral-700 mb-10">
          <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50">Example: Hero Section Glow-Up</h3>
          <p className="mb-3 text-neutral-700 dark:text-neutral-300">The first hero section screamed backend developer:</p>
          <ul className="mb-4 space-y-1 pl-6 list-disc text-neutral-700 dark:text-neutral-300">
            <li>Centered text? Check.</li>
            <li>Basic button? Check.</li>
            <li>Personality? Negative.</li>
          </ul>
          
          <p className="mb-3 text-neutral-700 dark:text-neutral-300">GPT-4o gently suggested:</p>
          <ul className="mb-4 space-y-1 pl-6 list-disc text-neutral-700 dark:text-neutral-300">
            <li>"Monospaced fonts for hacker aesthetic"</li>
            <li>"Animated blinking cursor next to your name for personality"</li>
            <li>"Dynamic button hover state for engagement"</li>
            <li>"Shorter line-length to stop hurting readers' eyes"</li>
          </ul>
          
          <p className="italic text-neutral-700 dark:text-neutral-300">Three iterations later, the hero section graduated from "meh" to "wait, this actually looks good?!"</p>
        </div>
      </section>

      <h2 className="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-50 flex items-center">
        <span className="mr-3">
          <Package size={24} className="text-neutral-700 dark:text-neutral-300" />
        </span>
        Stack: Minimalism with AI Magic
      </h2>
      
      <section className="mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-10">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-50 flex items-center">
              <Monitor size={20} className="text-neutral-700 dark:text-neutral-300 mr-2" />
              Framework
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2">Next.js (App Router + TypeScript)</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-50 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700 dark:text-neutral-300 mr-2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>
              Styling
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2">TailwindCSS + Shadcn/UI (true sanity savers)</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-50 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700 dark:text-neutral-300 mr-2"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
              Editor
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2">Cursor AI (it's VSCode, but smarter)</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-50 flex items-center">
              <Sparkles size={20} className="text-neutral-700 dark:text-neutral-300 mr-2" />
              Design Co-pilot
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2">GPT-4o (screenshots & hallucination-free visions)</p>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-50 flex items-center">
              <Zap size={20} className="text-neutral-700 dark:text-neutral-300 mr-2" />
              Deployment
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-2">Vercel</p>
          </div>
        </div>
        
        <div className="pl-4 border-l-2 border-neutral-300 dark:border-neutral-700 mb-12 font-mono text-sm text-neutral-700 dark:text-neutral-300">
          <span className="text-neutral-500 dark:text-neutral-400 mr-2">{`>`}</span>
          No Figma, no endlessly scrolling Dribbble, just a developer, GPT, and a willingness to be repeatedly humbled.
        </div>
      </section>

      <h2 className="text-2xl font-bold mt-16 mb-8 pb-2 border-b border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-50 flex items-center">
        <span className="mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700 dark:text-neutral-300"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
        </span>
        This Approach Actually Works
      </h2>

      {/* Conclusion section */}
      <section className="mb-14">
        <p className="text-lg mb-6 text-neutral-800 dark:text-neutral-200">
          After two weeks, our protagonist went from "help me center this div" to confidently implementing complex UI components using the AI-powered dev loop. Here's what emerged:
        </p>
        
        <div className="space-y-8 mb-10">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-50">This Blog</h3>
            <p className="text-neutral-700 dark:text-neutral-300">
              What you're reading right now—built with Next.js, Tailwind, and AI teammates. Every single component went through the development loop.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-50">Portfolio Site</h3>
            <p className="text-neutral-700 dark:text-neutral-300">
              The results were surprisingly good. Custom animations, responsive design, dark mode—all guided by AI design consultations.
            </p>
          </div>
        </div>
        
        <p className="mb-6 text-neutral-700 dark:text-neutral-300">
          Would anyone call themselves a frontend developer after this process? No. But the CSS terror subsided, and with this AI development loop, anyone can build presentable interfaces that don't make users' eyes bleed.
        </p>
        
        <div className="pl-4 border-l-2 border-neutral-300 dark:border-neutral-700 mb-8">
          <p className="italic text-lg text-neutral-700 dark:text-neutral-300">
            "The best developer tools don't replace your skills—they augment them. This AI loop isn't about letting machines do the work; it's about creating a feedback cycle that helps you improve faster." 
          </p>
          <p className="text-right mt-3 text-neutral-600 dark:text-neutral-400">— A moment of unexpected wisdom</p>
        </div>
      </section>

      {/* Next idea section */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-50">
          The Plot Thickens: An AI Agent to Automate the Loop
        </h2>
        
        <p className="text-lg mb-6 text-neutral-800 dark:text-neutral-200">
          But our story doesn't end here. The development loop still requires manual steps that beg for automation:
        </p>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-start">
            <div className="bg-neutral-200 dark:bg-neutral-800 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
              <span className="font-bold text-neutral-800 dark:text-neutral-200">1</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-neutral-900 dark:text-neutral-50">Taking Screenshots</h3>
              <p className="text-neutral-700 dark:text-neutral-300">Every change requires manually grabbing screenshots of the current state. Tedious.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-neutral-200 dark:bg-neutral-800 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
              <span className="font-bold text-neutral-800 dark:text-neutral-200">2</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-neutral-900 dark:text-neutral-50">Uploading Screenshots</h3>
              <p className="text-neutral-700 dark:text-neutral-300">Manual uploads to GPT-4o for review and suggestions. Click, drag, drop, repeat.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-neutral-200 dark:bg-neutral-800 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
              <span className="font-bold text-neutral-800 dark:text-neutral-200">3</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-neutral-900 dark:text-neutral-50">Copy-Pasting Suggestions</h3>
              <p className="text-neutral-700 dark:text-neutral-300">Recommendations make the journey back to Cursor for implementation. Context-switching feels so 2022.</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">The Plot Twist: Automating Everything</h3>
          
          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            Like any good story, this one needs a sequel. Imagine a local agent for MacOS that could:
          </p>
          
          <ul className="space-y-3 mb-6 pl-4 border-l-2 border-neutral-300 dark:border-neutral-700">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600 dark:text-neutral-400 mr-2 mt-1 flex-shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              <span className="text-neutral-700 dark:text-neutral-300">Detect UI renders in the browser like a vigilant sentinel</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600 dark:text-neutral-400 mr-2 mt-1 flex-shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              <span className="text-neutral-700 dark:text-neutral-300">Capture screens automatically, no human intervention required</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600 dark:text-neutral-400 mr-2 mt-1 flex-shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              <span className="text-neutral-700 dark:text-neutral-300">Whisk screenshots to GPT-4o along with current component code</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600 dark:text-neutral-400 mr-2 mt-1 flex-shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              <span className="text-neutral-700 dark:text-neutral-300">Deliver GPT's feedback directly to the editor like a digital carrier pigeon</span>
            </li>
          </ul>
          
          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            This would create a seamless feedback loop—a symphony of design suggestions flowing into code almost as fast as thoughts form.
          </p>
          
          <div className="pl-4 border-l-2 border-neutral-300 dark:border-neutral-700 mt-8">
            <p className="font-semibold mb-2 text-neutral-800 dark:text-neutral-200">Next Chapter: The Agent Awakens</p>
            <p className="text-neutral-700 dark:text-neutral-300">This is where the next part of our tale begins. A story of automation, intelligence, and perhaps finally conquering the CSS beast once and for all.</p>
          </div>
        </div>
      </section>

      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 mt-16 mb-16">
        <div className="flex justify-between items-center">
          <Link href="/blog" className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to all posts
          </Link>
          
          <div className="text-right">
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-2">Built with</p>
            <div className="flex space-x-4">
              <span className="text-neutral-600 dark:text-neutral-400">Next.js</span>
              <span className="text-neutral-600 dark:text-neutral-400">Tailwind</span>
              <span className="text-neutral-600 dark:text-neutral-400">Cursor</span>
              <span className="text-neutral-600 dark:text-neutral-400">GPT-4o</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
} 