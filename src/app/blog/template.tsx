'use client'
import React, { type ReactNode, useState, useEffect, useRef } from 'react'
import { useSelectedLayoutSegments, usePathname } from 'next/navigation'
import useSWR from 'swr'
import ky from 'ky'

import Link from 'next/link'
import {
  CornerDownRight,
  MessageSquareText,
  Play,
} from 'lucide-react'
import { BlogCard } from '@/components/blog'
import Tags from '@/components/tags'
import { FacebookShare, TwitterShare } from './share'
import Navigation from './navigation'
import ReadingProgress from '@/components/reading-progress'

// Define interface for blog data
interface BlogData {
  tags?: string[];
  children?: string[];
  title?: string;
  description?: string;
  [key: string]: any;
}

// For suspense to work correctly with SSR
const fetcher = async (url: string): Promise<BlogData> => {
  const res = await ky.get(url)
  return res.json()
}

// ClientOnly component to prevent hydration issues
function ClientOnly({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode | null }) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return isMounted ? children : fallback;
}

export default function Template({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  
  // To avoid hydration mismatch, use a ref to disable effects until mounted
  const effectsDisabled = useRef(true)
  
  // Don't fetch any data during SSR to prevent hydration mismatches
  const { data } = useSWR<BlogData>(
    isMounted ? `/api/blog/${segments.join('/')}` : null,
    fetcher,
    { suspense: false }
  )
  
  const tags = data?.tags || []
  const routes = data?.children || []
  
  // Only show social elements on individual blog post pages, not on the main blog listing page
  const isMainBlogPage = pathname === '/blog'

  // Only run effects after component is mounted
  useEffect(() => {
    setIsMounted(true)
    effectsDisabled.current = false
    
    // Simplified scroll handler - we don't need to update showProgress state anymore
    const handleScroll = () => {
      // We can still respond to scroll events if needed
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])
  
  return (
    <div className="w-full flex flex-col items-center relative z-10 bg-[#0B1120]">
      {/* Only render client-side components after mounting */}
      <ClientOnly>
        <ReadingProgress />
      </ClientOnly>
      
      {/* Side controls for article pages */}
      {isMounted && !isMainBlogPage && (
        <div className="fixed top-[50%] -translate-y-[50%] left-0 cursor-pointer group z-30 group">
          <div className="flex flex-col transition-all gap-1 group-hover:gap-2 m-1 p-1 group-hover:p-2 group-hover:bg-[#0e1628] group-hover:rounded-lg group-hover:shadow-lg group-hover:border group-hover:border-blue-900/30">
            <span className="w-1 h-1 rounded-full transition-all flex group-hover:hidden bg-cyan-800/50" />
            <span className="w-1 h-3 rounded-full transition-all flex group-hover:hidden bg-cyan-700/50" />
            <span className="w-1 h-1 rounded-full transition-all flex group-hover:hidden bg-cyan-800/50" />
            <span className="w-1 h-1 rounded-full transition-all flex group-hover:hidden bg-cyan-800/50" />
            <button className="bg-slate-800/80 hover:bg-blue-900/30 text-cyan-400 hover:text-cyan-300 p-2 rounded transition-all hidden group-hover:flex">
              <Play className="w-4 h-4" />
            </button>
            <div className="flex flex-col transition-all hidden group-hover:flex">
              <FacebookShare className="bg-slate-800/80 hover:bg-blue-900/30 text-cyan-400 hover:text-cyan-300 p-2 rounded mb-1" />
              <TwitterShare className="bg-slate-800/80 hover:bg-blue-900/30 text-cyan-400 hover:text-cyan-300 p-2 rounded" />
            </div>
            <Link
              className="bg-slate-800/80 hover:bg-blue-900/30 text-cyan-400 hover:text-cyan-300 p-2 rounded transition-all hidden group-hover:flex"
              href="#question"
            >
              <MessageSquareText className="w-4 h-4" />
            </Link>
            <Link
              className="bg-slate-800/80 hover:bg-blue-900/30 text-cyan-400 hover:text-cyan-300 p-2 rounded transition-all hidden group-hover:flex"
              href="#suggestion"
            >
              <CornerDownRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
      
      <div className="w-full max-w-3xl px-4 my-6">
        <div className="mb-6">
          {/* Render navigation without any animation initially */}
          <ClientOnly>
            <Navigation />
          </ClientOnly>
          
          {/* Controls for article pages */}
          {isMounted && !isMainBlogPage && (
            <div className="w-full flex flex-row gap-2 justify-end py-3 border-t border-b border-blue-900/30 mt-3">
              <FacebookShare className="bg-slate-800/80 hover:bg-blue-900/30 text-slate-400 hover:text-cyan-300 p-1.5 rounded-md transition-colors" />
              <TwitterShare className="bg-slate-800/80 hover:bg-blue-900/30 text-slate-400 hover:text-cyan-300 p-1.5 rounded-md transition-colors" />
              <span className="grow" />
              <button
                className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 hover:from-blue-900/30 hover:to-cyan-900/30 text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs border border-blue-900/40 font-mono transition-all"
              >
                <Play className="w-3.5 h-3.5" />
                listen.js
              </button>
            </div>
          )}
        </div>
        
        {/* Only show tags when client-side */}
        {isMounted && tags.length > 0 && (
          <div className="w-full mb-5">
            <Tags tags={tags} />
          </div>
        )}
        
        {/* Main content */}
        <div className="prose prose-invert max-w-none prose-headings:font-bold prose-p:text-slate-300 prose-headings:text-slate-200 prose-headings:font-mono prose-headings:mt-8 prose-headings:font-normal prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-a:no-underline hover:prose-a:underline prose-headings:tracking-tight prose-pre:bg-slate-800/70 prose-pre:border prose-pre:border-blue-900/30 prose-pre:shadow-md prose-pre:rounded-lg prose-code:text-cyan-300 prose-code:font-mono prose-code:font-normal prose-pre:font-mono prose-pre:text-sm prose-hr:border-blue-900/20 prose-img:rounded-lg prose-img:border prose-img:border-blue-900/20 prose-img:shadow-lg prose-blockquote:border-l-cyan-800 prose-blockquote:bg-slate-900/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-md prose-blockquote:italic prose-strong:text-cyan-100 prose-li:marker:text-cyan-600">
          {children}
        </div>
      </div>
      
      {/* Related articles section */}
      {isMounted && !isMainBlogPage && routes.length > 0 && (
        <div
          id="suggestion"
          className="w-full max-w-3xl px-4 mb-12"
        >
          <div className="flex items-center space-x-2 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
            <h3 className="text-lg font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Related Articles</h3>
          </div>
          
          <div className="space-y-4">
            {[...routes].reverse().map((route, index) => (
              <div key={route} className="relative group">
                {/* Line number */}
                <div className="absolute -left-10 top-4 hidden lg:flex items-center justify-end w-6 h-6 text-slate-600 font-mono text-xs select-none">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                <Link href={route} className="block bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/50 hover:border-slate-600/80 rounded-lg p-4 transition-all duration-200 backdrop-blur-sm">
                  <BlogCard route={route} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Footer quote */}
      {isMounted && !isMainBlogPage && (
        <div className="w-full max-w-3xl px-4 mt-10 border-t border-blue-900/30 pt-6 text-center mb-12">
          <p className="italic text-slate-400 mb-5 font-mono">
          <span className="text-cyan-500">&gt;</span> AI is the new frontier of human potential <span className="animate-pulse">_</span>
          </p>
          <Link 
            href="/contact" 
            className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 hover:from-blue-900/40 hover:to-cyan-900/40 text-cyan-400 hover:text-cyan-300 px-4 py-2 rounded-md inline-block border border-blue-900/40 hover:border-cyan-800/50 transition-colors font-mono text-sm"
          >
            contact.connect()
          </Link>
        </div>
      )}
    </div>
  )
}
