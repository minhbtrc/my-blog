'use client'
import dayjs from 'dayjs'
import useSWR from 'swr'
import ky from 'ky'

import Link from 'next/link'
import { ArrowUpRight, Calendar, ArrowRight } from 'lucide-react'
import Tags from './tags'
import { motion } from 'framer-motion'

// Helper function to normalize API routes
function normalizeApiRoute(route: string): string {
  // Ensure route starts with a slash for API calls
  const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
  console.log(`Normalized API route: ${route} → ${normalizedRoute}`);
  return normalizedRoute;
}

// Helper function to normalize link routes
function normalizeLinkRoute(route: string): string {
  // For links, remove blog/ prefix if it exists
  let normalizedRoute = route;
  if (route.startsWith('blog/')) {
    normalizedRoute = route.substring(5); // Remove 'blog/'
  } else if (route.startsWith('/blog/')) {
    normalizedRoute = route.substring(6); // Remove '/blog/'
  }
  console.log(`Normalized link route: ${route} → ${normalizedRoute}`);
  return normalizedRoute;
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

export function BlogCard({ route }: { route: string }) {
  const { data } = useBlog(route);

  // Ensure default values if `data` is undefined
  const { date = new Date().toISOString(), tags = [], title = '', description = '' } = data ?? {};

  const linkRoute = normalizeLinkRoute(route);
  const formattedDate = dayjs(date).format('MMM DD, YYYY');

  return (
    <motion.div
      whileHover={{ 
        scale: 1.01,
        backgroundColor: 'rgba(var(--color-base-100), 0.8)' 
      }}
      className="w-full rounded-xl border border-base-300/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Link
        className="w-full block p-6"
        href={`/blog/${linkRoute}`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-base-content/60">
              <Calendar className="w-3.5 h-3.5" />
              <p className="text-xs font-medium">
                {formattedDate}
              </p>
            </div>
            
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 bg-base-200 rounded-full text-xs text-base-content/70 hover:bg-base-300 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="px-2.5 py-1 bg-base-200 rounded-full text-xs text-base-content/70">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div>
            <h2 className="font-bold tracking-tight text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
              {title}
            </h2>
            <p className="text-base text-base-content/70 line-clamp-2">
              {description}
            </p>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <motion.div 
              className="flex items-center gap-1 text-primary text-sm font-medium"
              whileHover={{ x: 3 }}
            >
              Read post
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.div>
            
            <motion.div
              whileHover={{ rotate: 45 }}
              className="text-base-content/40 hover:text-primary transition-colors"
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

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
