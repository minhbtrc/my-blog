/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import useSWR from 'swr'
import ky from 'ky'

import Link from 'next/link'
import { Calendar} from 'lucide-react'

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

// Define BlogMetadata type
interface BlogMetadata {
  title: string;
  date: string;
  tags: string[];
  description: string;
  readingTime?: string;
}

// Fetcher function for SWR
const fetcher = (url: string) => ky.get(url).json<BlogMetadata>();

// Helper function to normalize API routes
function normalizeApiRoute(route: string): string {
  // Ensure route starts with a slash for API calls
  const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
  console.log(`Normalized API route: ${route} → ${normalizedRoute}`);
  return normalizedRoute;
}

// Helper function to normalize link routes
function normalizeLinkRoute(route: string): string {
  // Check if the route already has blog/ prefix
  if (route.startsWith('blog/') || route.startsWith('/blog/')) {
    // If it does, use it as is
    return route;
  }
  
  // If no blog prefix, return the route as is
  return route;
}

// Custom hook to fetch blog data
export function useBlog(route: string): Promise<{
  date: string;
  tags: string[];
  title: string;
  description: string;
  [key: string]: any;
}> {
  const apiRoute = route.startsWith('/') ? route : `/${route}`;
  return fetch(`/api${apiRoute}`)
    .then(res => res.json())
    .catch(error => {
      console.error(`Error fetching blog data for ${route}:`, error);
      return {
        date: new Date().toISOString(),
        tags: [],
        title: '',
        description: '',
      };
    });
}

// If this is a getPlaceholderGradient function, keep it
export function getPlaceholderGradient(route: string | undefined) {
  if (!route || typeof route !== 'string') {
    return 'from-blue-500 to-cyan-500'; // Default gradient
  }
  
  // Generate a deterministic gradient based on the route
  const hash = route.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-indigo-500 to-purple-500',
    'from-purple-500 to-pink-500',
    'from-red-500 to-orange-500',
    'from-amber-500 to-yellow-500',
    'from-emerald-500 to-teal-500',
    'from-teal-500 to-cyan-500',
    'from-blue-500 to-indigo-500',
  ];
  
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
}

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
      className="block w-full h-full bg-gradient-to-b from-slate-800 to-slate-800/80 hover:from-slate-800/90 hover:to-slate-800/70 transition-colors duration-300 rounded-xl border border-slate-700 overflow-hidden group relative shadow-md hover:shadow-xl hover:shadow-indigo-900/10"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="p-6">
        {isLoading ? (
          <div className="w-full flex flex-col gap-3 animate-pulse">
            <div className="h-5 bg-slate-700 rounded w-3/4"></div>
            <div className="h-3 bg-slate-700 rounded w-full mt-1"></div>
            <div className="h-3 bg-slate-700 rounded w-5/6 mt-1"></div>
            <div className="h-3 bg-slate-700 rounded w-1/2 mt-1"></div>
            <div className="flex gap-2 mt-2">
              <div className="h-4 w-14 bg-slate-700 rounded-full"></div>
              <div className="h-4 w-14 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold mb-3 text-slate-100 group-hover:text-white transition-colors line-clamp-2">
              {data?.title || 'Unknown Article'}
            </h3>
            <p className="text-sm text-slate-400 mb-4 line-clamp-3">
              {data?.description || 'No description available'}
            </p>
            {data?.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {data.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-700/50 text-slate-300 border border-slate-700/30"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-400 mr-1.5"></span>
                    {tag}
                  </span>
                ))}
                {data.tags.length > 3 && (
                  <span className="text-xs text-slate-500">+{data.tags.length - 3}</span>
                )}
              </div>
            )}
            <div className="flex items-center text-xs text-slate-500">
              {data?.date && (
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-indigo-400/70" />
                  {new Date(data.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-indigo-500/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
      className="block w-full py-4 border-t border-slate-700 hover:bg-slate-800/50 rounded transition-colors px-3 -mx-3"
      href={`/blog/${linkRoute}`}
    >
      <h3 className="font-medium text-slate-200 hover:text-white line-clamp-1 mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-400 line-clamp-2">
        {description}
      </p>
    </Link>
  )
}
