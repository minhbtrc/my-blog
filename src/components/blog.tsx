'use client'
import dayjs from 'dayjs'
import useSWR from 'swr'
import ky from 'ky'

import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { memo } from 'react'

// Define Blog type for TypeScript
interface Blog {
  title: string;
  date: string;
  tags: string[];
  description: string;
  route?: string;
  image?: string | null;
}

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

export function useBlog(route: string) {
  const apiRoute = normalizeApiRoute(route);
  return useSWR(`/api${apiRoute}`, async (api: string) => {
    console.log(`Fetching blog data from: ${api}`);
    try {
      const data = await ky.get(api).json<Blog>();
      console.log(`Blog data for ${route}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching blog data for ${route}:`, error);
      return {
        date: new Date().toISOString(),
        tags: [],
        title: '',
        description: '',
      }; // Ensure it matches the Blog type
    }
  });
}

export const BlogCard = memo(function BlogCard({
  route,
}: {
  route: string
}) {
  // Fetch blog data using the custom hook
  const { data, isLoading } = useBlog(route);
  
  // Format the display date using dayjs
  const displayDate = data?.date 
    ? dayjs(data.date).format('MMM D, YYYY')
    : null;
    
  // Generate proper href for the blog post
  const href = route.startsWith('blog/') || route.startsWith('/blog/') 
    ? `/blog/${route.replace(/^(\/)?blog\//, '')}`
    : `/blog/${route}`;

  // Placeholder gradient for loading state
  const loadingGradient = "bg-gradient-to-r from-base-300/40 to-base-300/20 animate-pulse";

  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="relative overflow-hidden rounded-xl border border-base-300/30 bg-base-200/40 backdrop-blur-sm hover:bg-base-200/60 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <Link 
        className="block p-6"
        href={href}
      >
        <div className="grid grid-cols-1 gap-4">
          {/* Date and tags row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
            {/* Date with calendar icon */}
            {isLoading ? (
              <div className={`h-5 w-32 rounded ${loadingGradient}`}></div>
            ) : displayDate && (
              <div className="flex items-center gap-1.5 text-base-content/60 text-sm">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={data?.date?.toString()}>{displayDate}</time>
              </div>
            )}
          </div>
          
          {/* Title with hover effect */}
          {isLoading ? (
            <div className={`h-7 w-full rounded ${loadingGradient}`}></div>
          ) : (
            <h3 className="text-xl md:text-2xl font-bold tracking-tight hover:text-primary transition-colors line-clamp-2">
              {data?.title || 'Untitled Post'}
            </h3>
          )}
          
          {/* Description */}
          {isLoading ? (
            <>
              <div className={`h-4 w-full rounded ${loadingGradient}`}></div>
              <div className={`h-4 w-3/4 rounded ${loadingGradient}`}></div>
            </>
          ) : (
            <p className="text-base-content/70 line-clamp-2 text-sm leading-relaxed">
              {data?.description || 'No description available.'}
            </p>
          )}
          
          {/* Read more button */}
          <div className="flex justify-end mt-2">
            <motion.div
              className="flex items-center gap-1.5 text-primary font-medium text-sm"
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Read article
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
})

export function LiteBlogCard({ route }: { route: string }) {
  const { data: { title = '', description = '' } = {} } = useBlog(route)
  const linkRoute = normalizeLinkRoute(route);

  return (
    <Link
      className="w-full grid grid-cols-12 gap-2 py-6 border-t border-base-300 cursor-pointer relative group"
      href={`/blog/${linkRoute}`}
    >
      <h3 className="col-span-full font-semibold tracking-tight leading-tight">
        {title}
      </h3>
      <p className="col-span-full text-sm opacity-60 line-clamp-2">
        {description}
      </p>
    </Link>
  )
}
