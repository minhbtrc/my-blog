import Image from 'next/image'
import Link from 'next/link'
import { Terminal, Code, Sparkles, ArrowRight, Monitor, Package, Zap } from 'lucide-react'

export const metadata = {
  title: 'How I Built My Blog with ChatGPT & Cursor—As an AI Engineer (Who Hates CSS)',
  description: 'My journey building a modern, developer-centric blog using AI tools like Cursor and GPT-4o, despite having limited frontend experience.'
}

export default function BuildingBlogWithAIPage() {
  return (
    <article className="prose max-w-none">
      <div className="relative mt-6 mb-12">
        {/* Background decoration */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl z-0"></div>
        <div className="absolute top-12 right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl z-0"></div>
        
        {/* Title with code terminal styling */}
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 text-sm font-mono text-blue-500 mb-3 border border-blue-500/20 bg-blue-500/5 rounded-full px-4 py-1">
            <Terminal size={16} />
            <span>ai-engineer/blog</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            🧠 How I Built My Blog with ChatGPT & Cursor—As an AI Engineer (Who Hates CSS)
          </h1>
          
          <div className="bg-base-200 p-6 rounded-lg border border-neutral mb-8 relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 bg-blue-500/20 w-32 h-32 rounded-full blur-2xl -mr-16 -mt-16 opacity-50"></div>
            <p className="italic text-lg mb-0 text-base-content relative z-10">
              My journey building a modern, developer-centric blog using AI tools like Cursor and GPT-4o, despite having limited frontend experience (and a deep fear of CSS).
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-8 flex flex-col space-y-6">
        <div className="relative border-l-4 border-blue-500 pl-6 py-1">
          <h2 className="text-2xl font-mono font-bold mb-3">👋 Confessions of an AI Engineer</h2>
          <p className="text-xl font-serif italic leading-relaxed mb-4">
            Hey friends! Welcome to my digital lair—where experiments with AI, LLMs, agents, RAG systems, and miscellaneous tech obsessions come to life.
          </p>
          <p className="leading-relaxed">
            Before we get lost in future rabbit holes, I want to share a small miracle: how I, a stubborn backend-focused AI engineer (who dreads anything involving CSS), somehow built a stylish, performant, dev-flavored blog.
          </p>
          <p className="font-mono text-sm bg-base-200 p-3 rounded-md mt-3">
            <span className="text-green-500">{`>`}</span> Quick spoiler: It involved a lot of help from my AI friends.
          </p>
        </div>
        
        <p className="text-lg">
          I live for FastAPI, embeddings, LangChain, LlamaIndex, OpenAI APIs, token optimizations—you get the idea. Graphs are beautiful. <span className="font-semibold text-red-500">CSS flexbox and gradients are nightmares I'd rather delegate to the void.</span>
        </p>

        <div className="flex items-start bg-base-200/50 p-5 rounded-lg border-l-4 border-purple-500">
          <div className="mt-1 mr-4 flex-shrink-0">
            <Code size={24} className="text-purple-500" />
          </div>
          <p className="m-0 text-base-content">
            Yet, here I am, with a frontend that looks good enough to fool visitors into believing I actually know what I'm doing.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-mono font-bold mt-16 mb-8 pb-2 border-b border-slate-200 flex items-center">
        <span className="mr-3 p-2 bg-purple-500/10 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
        </span>
        📊 The Loop: How I Outsourced My Frontend Anxiety
      </h2>
      
      <p className="text-lg mb-6">
        Here's my secret weapon—the iterative AI development loop:
      </p>
      
      <div className="relative mt-8 mb-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl"></div>
        
        <div className="bg-base-200/50 p-6 rounded-lg border border-purple-500/20 shadow-md mb-8">
          <h3 className="text-xl font-mono font-bold text-purple-500 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 mr-2"><path d="M12 22c6 0 8-4 8-8V6l-8-4-8 4v8c0 4 2 8 8 8Z"/><path d="M12 22V2"/></svg>
            🌬️ The AI-Powered Dev Loop
          </h3>
          
          <ol className="space-y-6 mb-6">
            <li className="flex">
              <div className="bg-purple-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                <span className="font-bold text-purple-500">1</span>
              </div>
              <div>
                <h4 className="text-lg font-mono font-bold mb-1">Cursor AI Code Sprint</h4>
                <p>I write something basic—hero, card, nav. I highlight the ugly bits and pray Cursor knows how to Tailwind better than I do.</p>
              </div>
            </li>
            
            <li className="flex">
              <div className="bg-purple-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                <span className="font-bold text-purple-500">2</span>
              </div>
              <div>
                <h4 className="text-lg font-mono font-bold mb-1">Browser Refresh of Disappointment</h4>
                <p>Hit refresh. Embrace reality. It's always underwhelming, which is great—low expectations fuel innovation.</p>
              </div>
            </li>
            
            <li className="flex">
              <div className="bg-purple-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                <span className="font-bold text-purple-500">3</span>
              </div>
              <div>
                <h4 className="text-lg font-mono font-bold mb-1">Screenshot of Shame</h4>
                <p>Capture my mediocrity in full HD.</p>
              </div>
            </li>
            
            <li className="flex">
              <div className="bg-purple-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                <span className="font-bold text-purple-500">4</span>
              </div>
              <div>
                <h4 className="text-lg font-mono font-bold mb-1">ChatGPT Design Therapy Session (GPT-4o)</h4>
                <p>Drop the screenshot into GPT-4o with desperate pleas like: "Make this look less terrible, more hacker-chic."</p>
              </div>
            </li>
            
            <li className="flex">
              <div className="bg-purple-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                <span className="font-bold text-purple-500">5</span>
              </div>
              <div>
                <h4 className="text-lg font-mono font-bold mb-1">Implement AI Suggestions</h4>
                <p>GPT-4o generously provides precise, actionable tips:</p>
                <div className="bg-base-300 p-3 rounded-md mt-2 font-mono text-sm">
                  <p className="mb-2"><span className="text-green-500">•</span> "Use monospaced fonts for the hacker vibe"</p>
                  <p className="mb-2"><span className="text-green-500">•</span> "Put a blinking cursor animation next to your name to pretend you're Neo"</p>
                  <p><span className="text-green-500">•</span> "Hover states, because even backend devs deserve fun interactions"</p>
                </div>
              </div>
            </li>
            
            <li className="flex">
              <div className="bg-purple-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                <span className="font-bold text-purple-500">6</span>
              </div>
              <div>
                <h4 className="text-lg font-mono font-bold mb-1">Repeat Until Satisfied or Less Ashamed</h4>
                <p>Rinse, refresh, repeat. It feels like pair programming with a super talented designer who doesn't judge my lack of CSS prowess.</p>
              </div>
            </li>
          </ol>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-5 rounded-lg my-6">
            <h4 className="text-lg font-mono font-bold mb-3">🌐 Why Does This Loop Actually Work?</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 mr-2 mt-1 flex-shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                <span><strong className="font-semibold">Immediate Gratification:</strong> No context switches. Just me, my AI duo, and immediate feedback.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 mr-2 mt-1 flex-shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                <span><strong className="font-semibold">No Guesswork:</strong> GPT-4o provides ultra-specific, practical advice—no more CSS existential dread.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 mr-2 mt-1 flex-shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                <span><strong className="font-semibold">I Learned Real Design Principles:</strong> Iterative AI feedback subtly trained my eye. Now I catch myself saying, "Hmm, that's not aligned" before GPT does.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 mr-2 mt-1 flex-shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                <span><strong className="font-semibold">Infinite Availability:</strong> GPT-4o is my midnight companion who never complains or files HR reports.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-base-200/80 p-6 rounded-lg border-l-4 border-yellow-500 mb-10">
        <h3 className="text-xl font-mono font-bold text-yellow-500 mb-3">🧪 Example: Hero Section Glow-Up</h3>
        <p className="mb-3">My first hero section screamed backend dev:</p>
        <ul className="mb-4 space-y-1 pl-6 list-disc">
          <li>Centered text? Check.</li>
          <li>Basic button? Check.</li>
          <li>Personality? Negative.</li>
        </ul>
        
        <p className="mb-3">GPT-4o gently suggested:</p>
        <ul className="mb-4 space-y-1 pl-6 list-disc">
          <li>"Monospaced fonts for hacker aesthetic"</li>
          <li>"Animated blinking cursor next to your name for personality"</li>
          <li>"Dynamic button hover state for engagement"</li>
          <li>"Shorter line-length to stop hurting readers' eyes"</li>
        </ul>
        
        <p className="italic">Three iterations later, my hero section graduated from "meh" to "wait, this actually looks good?!"</p>
      </div>

      <h2 className="text-3xl font-bold mt-16 mb-8 pb-2 border-b border-slate-200 flex items-center">
        <span className="mr-3 p-2 bg-blue-500/10 rounded-lg">
          <Package size={24} className="text-blue-500" />
        </span>
        🛠 Stack: Minimalism with AI Magic
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="bg-base-200/50 p-5 rounded-lg border border-blue-500/20 transition-all hover:shadow-md hover:border-blue-500/40">
          <div className="flex items-center mb-3">
            <div className="bg-blue-500/20 p-2 rounded-full mr-3">
              <Monitor size={20} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-mono font-semibold">Framework</h3>
          </div>
          <p className="pl-10">Next.js (App Router + TypeScript)</p>
        </div>
        
        <div className="bg-base-200/50 p-5 rounded-lg border border-blue-500/20 transition-all hover:shadow-md hover:border-blue-500/40">
          <div className="flex items-center mb-3">
            <div className="bg-blue-500/20 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>
            </div>
            <h3 className="text-xl font-mono font-semibold">Styling</h3>
          </div>
          <p className="pl-10">TailwindCSS + Shadcn/UI (thank you for saving my sanity)</p>
        </div>
        
        <div className="bg-base-200/50 p-5 rounded-lg border border-blue-500/20 transition-all hover:shadow-md hover:border-blue-500/40">
          <div className="flex items-center mb-3">
            <div className="bg-blue-500/20 p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
            </div>
            <h3 className="text-xl font-mono font-semibold">Editor</h3>
          </div>
          <p className="pl-10">Cursor AI (it's VSCode, but smarter)</p>
        </div>
        
        <div className="bg-base-200/50 p-5 rounded-lg border border-blue-500/20 transition-all hover:shadow-md hover:border-blue-500/40">
          <div className="flex items-center mb-3">
            <div className="bg-blue-500/20 p-2 rounded-full mr-3">
              <Sparkles size={20} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-mono font-semibold">Design Co-pilot</h3>
          </div>
          <p className="pl-10">GPT-4o (screenshots & hallucination-free visions)</p>
        </div>
        
        <div className="md:col-span-2 bg-base-200/50 p-5 rounded-lg border border-blue-500/20 transition-all hover:shadow-md hover:border-blue-500/40">
          <div className="flex items-center mb-3">
            <div className="bg-blue-500/20 p-2 rounded-full mr-3">
              <Zap size={20} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-mono font-semibold">Deployment</h3>
          </div>
          <p className="pl-10">Vercel</p>
        </div>
      </div>
      
      <div className="bg-base-200/50 p-5 rounded-lg border-l-4 border-green-500 mb-12">
        <p className="font-mono text-sm mb-0">
          <span className="text-green-500 mr-2">{`>`}</span>
          No Figma, no endlessly scrolling Dribbble, just me, GPT, and a willingness to humble myself repeatedly.
        </p>
      </div>

      <h2 className="text-3xl font-mono font-bold mt-16 mb-8 pb-2 border-b border-slate-200 flex items-center">
        <span className="mr-3 p-2 bg-purple-500/10 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
        </span>
        🌟 Final Reflections: AI as a Frontend Cheat-Code
      </h2>
      
      <div className="bg-base-200 p-6 rounded-lg border border-neutral shadow-sm my-8">
        <ul className="space-y-4">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 mr-3 mt-1 flex-shrink-0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <p className="text-lg">You don't need design skills; you just need AI patience.</p>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 mr-3 mt-1 flex-shrink-0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <p className="text-lg">Screenshots beat text prompts for UI. GPT sees what your words can't describe.</p>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 mr-3 mt-1 flex-shrink-0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <p className="text-lg">Building alongside AI isn't just efficient—it's genuinely fun.</p>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 mr-3 mt-1 flex-shrink-0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <p className="text-lg">The barrier between backend and frontend is blurrier than my eyesight at 3 AM (in a good way).</p>
          </li>
        </ul>
      </div>
      
      <div className="relative mb-10">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl"></div>
        <div className="bg-base-200/50 p-6 rounded-lg border border-purple-500/20 shadow-md">
          <p className="text-xl font-mono font-bold mb-4 text-center">
            To every dev who's ever felt "I'm terrible at frontend": Try this loop. It's like discovering cheat codes for real life.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-mono font-bold mt-16 mb-6 pb-2 border-b border-slate-200 flex items-center">
        <span className="mr-3 p-2 bg-blue-500/10 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
        </span>
        🚀 Coming Soon:
      </h2>
      
      <ul className="list-disc pl-5 space-y-2 mb-6">
        <li>Deep dive into my document chunking adventures</li>
        <li>AI-powered Projects showcase</li>
        <li>Maybe open-source my AI-crafted blog template</li>
      </ul>
      
      <p className="text-lg mb-8">
        Stay tuned—and if you're building cool stuff with AI, hit me up!
      </p>

      
      
      <div className="border-t border-purple-200/20 pt-8 mt-16 mb-16">
        <div className="flex items-center justify-between">
          <Link href="/blog" className="flex items-center text-purple-500 hover:text-purple-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to all posts
          </Link>
          
          
        </div>
      </div>
    </article>
  )
} 