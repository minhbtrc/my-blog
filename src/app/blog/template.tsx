'use client'
import React, { type ReactNode, useState, useEffect, useRef } from 'react'
import { useSelectedLayoutSegments, usePathname } from 'next/navigation'
import useSWR from 'swr'
import ky from 'ky'
import _clsx from 'clsx'

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
import { BlogProvider } from '@/context/BlogContext'
import { CommandRegionProvider } from '@/context/CommandRegionContext'
import { SearchProvider } from '@/context/SearchContext'

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
  const segments = useSelectedLayoutSegments() || []
  const pathname = usePathname()
  const [isMounted, setMounted] = useState(false)
  
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
    setMounted(true)
    effectsDisabled.current = false
    
    // Simplified scroll handler - we don't need to update showProgress state anymore
    const handleScroll = () => {
      // We can still respond to scroll events if needed
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])
  
  return (
    <BlogProvider>
      <CommandRegionProvider>
        <SearchProvider>
          <div className="relative min-h-screen w-full code-bg-light dark:code-bg-dark">
            <div className="w-full flex flex-col items-center px-4 py-12 sm:py-16 relative z-10">
              <div className="w-full max-w-3xl">
                {/* Only render client-side components after mounting */}
                <ClientOnly>
                  <ReadingProgress />
                </ClientOnly>
                
                {/* Side controls for article pages */}
                {isMounted && !isMainBlogPage && (
                  <div className="fixed top-[50%] -translate-y-[50%] left-0 cursor-pointer group z-30 group">
                    <div className="flex flex-col transition-all gap-1 group-hover:gap-2 m-1 p-1 group-hover:p-2 group-hover:bg-white dark:group-hover:bg-gray-900 group-hover:rounded-lg group-hover:shadow-lg group-hover:border group-hover:border-gray-200 dark:group-hover:border-gray-700">
                      <span className="w-1 h-1 rounded-full transition-all flex group-hover:hidden bg-gray-400 dark:bg-gray-600" />
                      <span className="w-1 h-3 rounded-full transition-all flex group-hover:hidden bg-gray-400 dark:bg-gray-600" />
                      <span className="w-1 h-1 rounded-full transition-all flex group-hover:hidden bg-gray-400 dark:bg-gray-600" />
                      <span className="w-1 h-1 rounded-full transition-all flex group-hover:hidden bg-gray-400 dark:bg-gray-600" />
                      <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 p-2 rounded transition-all hidden group-hover:flex">
                        <Play className="w-4 h-4" />
                      </button>
                      <div className="flex flex-col transition-all hidden group-hover:flex">
                        <FacebookShare className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 p-2 rounded mb-1" />
                        <TwitterShare className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 p-2 rounded" />
                      </div>
                      <Link
                        className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 p-2 rounded transition-all hidden group-hover:flex"
                        href="#question"
                      >
                        <MessageSquareText className="w-4 h-4" />
                      </Link>
                      <Link
                        className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 p-2 rounded transition-all hidden group-hover:flex"
                        href="#suggestion"
                      >
                        <CornerDownRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}
                
                <div className="w-full">
                  <div className="mb-6">
                    {/* Render navigation without any animation initially */}
                    <ClientOnly>
                      <Navigation />
                    </ClientOnly>
                    
                    {/* Controls for article pages */}
                    {/* {isMounted && !isMainBlogPage && (
                      <div className="w-full flex flex-row gap-2 justify-end py-3 border-t border-b border-gray-200 dark:border-blue-900/30 mt-3">
                        <FacebookShare className="bg-gray-100 hover:bg-gray-200 dark:bg-slate-800/80 dark:hover:bg-blue-900/30 text-gray-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-cyan-300 p-1.5 rounded-md transition-colors" />
                        <TwitterShare className="bg-gray-100 hover:bg-gray-200 dark:bg-slate-800/80 dark:hover:bg-blue-900/30 text-gray-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-cyan-300 p-1.5 rounded-md transition-colors" />
                        <span className="grow" />
                        <button
                          className="bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 dark:from-blue-900/20 dark:to-cyan-900/20 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs border border-blue-200 dark:border-blue-900/40 font-mono transition-all"
                        >
                          <Play className="w-3.5 h-3.5" />
                          listen.js
                        </button>
                      </div>
                    )} */}
                  </div>
                  
                  {/* Only show tags when client-side */}
                  {isMounted && tags.length > 0 && (
                    <div className="w-full mb-5">
                      <Tags tags={tags} />
                    </div>
                  )}
                  
                  {/* Main content */}
                  <div className="prose dark:prose-invert max-w-none 
                  prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-slate-300 
                  prose-headings:text-gray-800 dark:prose-headings:text-gray-200 
                  prose-headings:font-mono prose-headings:mt-8 prose-headings:font-normal 
                  prose-a:text-gray-700 dark:prose-a:text-gray-300 hover:prose-a:text-gray-900 dark:hover:prose-a:text-gray-100 
                  prose-a:no-underline hover:prose-a:underline prose-headings:tracking-tight 
                  prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900/80 
                  prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 
                  prose-pre:shadow-md prose-pre:rounded-lg prose-code:text-gray-700 dark:prose-code:text-gray-300 
                  prose-code:font-mono prose-code:font-normal prose-pre:font-mono prose-pre:text-sm 
                  prose-hr:border-gray-200 dark:prose-hr:border-gray-700 
                  prose-img:rounded-lg prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700 
                  prose-img:shadow-lg prose-blockquote:border-l-gray-400 dark:prose-blockquote:border-l-gray-600 
                  prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-900/50 prose-blockquote:py-1 
                  prose-blockquote:px-4 prose-blockquote:rounded-r-md prose-blockquote:italic 
                  prose-strong:text-gray-800 dark:prose-strong:text-gray-200 
                  prose-li:marker:text-gray-500 dark:prose-li:marker:text-gray-500 
                  [&>h2]:border-b [&>h2]:border-gray-200 dark:[&>h2]:border-gray-700 [&>h2]:pb-1 
                  [&>h3::before]:content-['#'] [&>h3::before]:text-gray-400 dark:[&>h3::before]:text-gray-500 [&>h3::before]:mr-1 [&>h3::before]:opacity-70
                  [&>hr]:h-px [&>hr]:bg-gradient-to-r [&>hr]:from-gray-200 [&>hr]:to-gray-300 dark:[&>hr]:from-gray-700 dark:[&>hr]:to-gray-600 [&>hr]:border-0"
                  data-blog-id="building-blog-with-ai">
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
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-400"></div>
                      <h3 className="text-lg font-mono text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-400">Related Articles</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {[...routes].reverse().map((route, index) => (
                        <div key={route} className="relative group">
                          {/* Line number */}
                          <div className="absolute -left-10 top-4 hidden lg:flex items-center justify-end w-6 h-6 text-gray-400 dark:text-gray-500 font-mono text-xs select-none">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          
                          <Link href={route} className="block bg-gray-50 hover:bg-gray-100 dark:bg-gray-900/60 dark:hover:bg-gray-900/80 border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-lg p-4 transition-all duration-200 backdrop-blur-sm">
                            <BlogCard route={route} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Footer quote
                {isMounted && !isMainBlogPage && (
                  <div className="w-full max-w-3xl px-4 mt-10 border-t border-gray-200 dark:border-blue-900/30 pt-6 text-center mb-12">
                    <p className="italic text-gray-500 dark:text-slate-400 mb-5 font-mono">
                    <span className="text-blue-500 dark:text-cyan-500">&gt;</span> AI is the new frontier of human potential <span className="animate-pulse">_</span>
                    </p>
                    <Link 
                      href="/contact" 
                      className="bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 dark:from-blue-900/30 dark:to-cyan-900/30 dark:hover:from-blue-900/40 dark:hover:to-cyan-900/40 text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 px-4 py-2 rounded-md inline-block border border-blue-200 hover:border-blue-300 dark:border-blue-900/40 dark:hover:border-cyan-800/50 transition-colors font-mono text-sm"
                    >
                      contact.connect()
                    </Link>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </SearchProvider>
      </CommandRegionProvider>
    </BlogProvider>
  )
}
