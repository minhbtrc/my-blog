'use client'
import React, { type ReactNode, useState, useEffect, useRef } from 'react'
import { useSelectedLayoutSegments, usePathname } from 'next/navigation'
import useSWR from 'swr'
import ky from 'ky'
import _clsx from 'clsx'

import Link from 'next/link'
import { BlogCard } from '@/components/blog'
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
          <div className="relative min-h-screen w-full">
            <div className="w-full flex flex-col items-center relative z-10">
              <div className="w-full max-w-3xl">
                {/* Only render client-side components after mounting */}
                <ClientOnly>
                  <ReadingProgress />
                </ClientOnly>
                
                <div className="w-full" data-blog-route={pathname}>
                  {children}
                </div>

                {/* Related articles section */}
                {isMounted && !isMainBlogPage && routes.length > 0 && (
                  <div
                    id="suggestion"
                    className="w-full max-w-3xl px-4 mb-12"
                  >
                    <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-base-content/60">Related articles</h3>
                    
                    <div className="space-y-4">
                      {[...routes].reverse().map(route => (
                        <div key={route} className="relative group">
                          <Link href={route} className="block rounded-md border border-base-300 p-4 transition-colors hover:border-base-content/40">
                            <BlogCard route={route} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </SearchProvider>
      </CommandRegionProvider>
    </BlogProvider>
  )
}
