/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React from 'react'
import useSWR from 'swr'
import ky from 'ky'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Define Blog type for TypeScript
interface Blog {
  title: string;
  date: string;
  tags: string[];
  description: string;
  route?: string;
  image?: string | null;
  readTime?: string;
}

// Define metadata interface
interface BlogMetadata {
  title: string;
  date: string;
  tags: string[];
  description: string;
  readingTime?: string;
}

const fetcher = (url: string) => ky.get(url).json<BlogMetadata>();

// Helper functions for API and link routes
function normalizeApiRoute(route: string): string {
  // Remove leading slash for API routes
  if (route.startsWith('/')) {
    return route.slice(1)
  }
  return route
}

function normalizeLinkRoute(route: string): string {
  // Remove blog/ prefix if exists
  let normalized = route.replace(/^\/?(blog\/)?/, '')
  // Ensure no leading slash
  if (normalized.startsWith('/')) {
    normalized = normalized.slice(1)
  }
  return normalized
}

// Custom hook to fetch blog data
export function useBlog(route: string): Promise<{
  date: string;
  tags: string[];
  title: string;
  description: string;
  [key: string]: any;
}> {
  const apiRoute = normalizeApiRoute(route)
  return new Promise((resolve, reject) => {
    fetch(`/api/blog/${apiRoute}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        console.error('Error fetching blog data:', error)
        reject(error)
      })
  })
}

// Generate a placeholder gradient based on the route
export function getPlaceholderGradient(route: string | undefined) {
  if (!route) return 'from-gray-400 to-gray-600'
  
  const str = route.replace(/[^a-zA-Z0-9]/g, '')
  const hash = str.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  
  const h1 = Math.abs(hash) % 360
  const h2 = (h1 + 30) % 360
  const s = 70
  const l = 60
  
  return `from-[hsl(${h1},${s}%,${l}%)] to-[hsl(${h2},${s}%,${l}%)]`
}

// Blog card props interface
export interface BlogCardProps {
  title?: string;
  description?: string;
  date?: string;
  readingTime?: string;
  route?: string;
  tags?: string[];
  image?: string;
  blog?: {
    title: string;
    description: string;
    date: string;
    readingTime: string;
    route: string;
    tags: string[];
    image: string;
  }
}

export function BlogCard({ route }: { route: string }) {
  const url = route.replace('content/', '')
  const { data, isLoading, error } = useSWR<BlogMetadata>(
    `/api/metadata/${url}`,
    fetcher,
  )

  return (
    <Link
      href={`/blog/${url}`}
      className="block w-full h-full bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/50 hover:border-blue-900/40 transition-all duration-300 rounded-lg p-6 backdrop-blur-sm relative shadow-md hover:shadow-lg hover:shadow-blue-900/10 group"
    >
      {/* Terminal window header decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Code editor line numbers decoration */}
      <div className="absolute top-6 -left-6 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-slate-600 font-mono text-xs select-none flex flex-col items-end">
        <div>01</div>
        <div>02</div>
        <div>03</div>
        <div>04</div>
      </div>
      
      <div className="relative">
        {isLoading ? (
          <div className="w-full flex flex-col gap-3 animate-pulse">
            <div className="h-5 bg-slate-700/60 rounded w-3/4"></div>
            <div className="h-3 bg-slate-700/60 rounded w-full mt-1"></div>
            <div className="h-3 bg-slate-700/60 rounded w-5/6 mt-1"></div>
            <div className="h-3 bg-slate-700/60 rounded w-1/2 mt-1"></div>
            <div className="flex gap-2 mt-2">
              <div className="h-4 w-14 bg-slate-700/60 rounded-md"></div>
              <div className="h-4 w-14 bg-slate-700/60 rounded-md"></div>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold mb-3 text-slate-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-colors line-clamp-2">
              {data?.title || 'Unknown Article'}
            </h3>
            <p className="text-sm text-slate-400 mb-4 line-clamp-3 font-light">
              {data?.description || 'No description available'}
            </p>
            {data?.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {data.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-slate-800/70 text-cyan-300 border border-blue-900/30 font-mono"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/70 mr-1.5"></span>
                    {tag}
                  </span>
                ))}
                {data.tags.length > 3 && (
                  <span className="text-xs text-slate-500 font-mono">+{data.tags.length - 3}</span>
                )}
              </div>
            )}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                {data?.date && (
                  <span className="flex items-center text-slate-500 font-mono">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-cyan-400/70" />
                    {new Date(data.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                )}
                {data?.readingTime && (
                  <span className="flex items-center text-slate-500">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-cyan-400/70" />
                    {data.readingTime}
                  </span>
                )}
              </div>
              <span className="text-slate-500 group-hover:text-cyan-400 font-mono text-xs transition-all">
                read()<span className="group-hover:ml-0.5 transition-all">→</span>
              </span>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-500/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>
        )}
      </div>
    </Link>
  )
}

// Helper function to estimate read time
const estimateReadTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

export function LiteBlogCard({ route }: { route: string }) {
  const apiRoute = route.startsWith('/') ? route : `/${route}`;
  const { data, isLoading } = useSWR<{
    title?: string;
    description?: string;
    [key: string]: any;
  }>(`/api${apiRoute}`, url => fetch(url).then(res => res.json()), {
    fallbackData: { title: '', description: '' }
  });

  const linkRoute = normalizeLinkRoute(route);
  const title = data?.title || 'Unknown Article';
  const description = data?.description || 'No description available';

  return (
    <Link
      className="block w-full py-4 border-t border-blue-900/20 hover:bg-slate-800/50 rounded transition-all px-3 -mx-3 group"
      href={`/blog/${linkRoute}`}
    >
      <h3 className="font-medium text-slate-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 line-clamp-1 mb-1 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-400 line-clamp-2 font-light">
        {description}
      </p>
    </Link>
  )
}
