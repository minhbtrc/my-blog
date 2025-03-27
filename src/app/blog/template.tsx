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
    <div className="w-full flex flex-col items-center relative z-10 bg-slate-900">
      {/* Only render client-side components after mounting */}
      <ClientOnly>
        <ReadingProgress />
      </ClientOnly>
      
      {/* Side controls for article pages */}
      {isMounted && !isMainBlogPage && (
        <div className="fixed top-[50%] -translate-y-[50%] left-0 cursor-pointer group z-30 group">
          <div className="flex flex-col transition-all gap-1 group-hover:gap-2 m-1 p-1 group-hover:p-2 group-hover:bg-slate-800 group-hover:rounded-lg group-hover:shadow-lg group-hover:border group-hover:border-slate-700">
            <span className="w-1 h-1 rounded-full transition-all flex group-hover:hidden bg-slate-600" />
            <span className="w-1 h-3 rounded-full transition-all flex group-hover:hidden bg-slate-600" />
            <span className="w-1 h-1 rounded-full transition-all flex group-hover:hidden bg-slate-600" />
            <span className="w-1 h-1 rounded-full transition-all flex group-hover:hidden bg-slate-600" />
            <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded transition-all hidden group-hover:flex">
              <Play className="w-4 h-4" />
            </button>
            <div className="flex flex-col transition-all hidden group-hover:flex">
              <FacebookShare className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded mb-1" />
              <TwitterShare className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded" />
            </div>
            <Link
              className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded transition-all hidden group-hover:flex"
              href="#question"
            >
              <MessageSquareText className="w-4 h-4" />
            </Link>
            <Link
              className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded transition-all hidden group-hover:flex"
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
            <div className="w-full flex flex-row gap-2 justify-end py-3 border-t border-b border-slate-700 mt-3">
              <FacebookShare />
              <TwitterShare />
              <span className="grow" />
              <button
                className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-sm"
              >
                <Play className="w-4 h-4" />
                Listen
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
        <div className="prose prose-invert max-w-none prose-headings:font-bold prose-p:text-slate-300 prose-headings:text-slate-200 prose-a:text-slate-400 hover:prose-a:text-slate-300">
          {children}
        </div>
      </div>
      
      {/* Related articles section */}
      {isMounted && !isMainBlogPage && routes.length > 0 && (
        <div
          id="suggestion"
          className="w-full max-w-3xl px-4 mb-12"
        >
          <h3 className="text-lg font-bold mb-5 text-slate-200">Related Articles</h3>
          <div className="space-y-4">
            {[...routes].reverse().map((route) => (
              <div key={route}>
                <BlogCard route={route} />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Footer quote */}
      {isMounted && !isMainBlogPage && (
        <div className="w-full max-w-3xl px-4 mt-10 border-t border-slate-700 pt-6 text-center mb-12">
          <p className="italic text-slate-400 mb-5">
          &quot;AI is the new frontier of human potential&quot;
          </p>
          <Link href="/contact" className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded inline-block">
            Let&apos;s innovate—reach out!
          </Link>
        </div>
      )}
    </div>
  )
}
