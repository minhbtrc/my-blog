'use client'
import dayjs from 'dayjs'
import useSWR from 'swr'
import ky from 'ky'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight, Clock, TagIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { memo, useState, useMemo } from 'react'

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

export const BlogCard = ({ date, title, tags, route, description, image }: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate a placeholder gradient based on the route if no image is provided
  const placeholderStyle = useMemo(() => {
    if (image) return {};
    
    // Hash the route to generate consistent colors for the same route
    const hash = route.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = (hash % 60) + 180; // Blue to indigo range (180-240)
    const hue2 = ((hash * 17) % 60) + 220; // Indigo to violet range (220-280)
    
    return {
      background: `linear-gradient(135deg, hsl(${hue1}, 80%, 60%), hsl(${hue2}, 80%, 60%))`
    };
  }, [route, image]);
  
  // Placeholder image based on the first tag
  const placeholderImage = useMemo(() => {
    if (image) return image;
    if (tags && tags.length > 0) {
      const tagHash = tags[0].split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return `/images/placeholders/placeholder${(tagHash % 5) + 1}.jpg`;
    }
    return "/images/placeholders/placeholder1.jpg";
  }, [image, tags]);

  return (
    <Link href={route} passHref>
      <div 
        className="card group h-full flex flex-col transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="relative h-48 overflow-hidden rounded-t-xl"
          style={placeholderStyle}
        >
          {placeholderImage && (
            <Image
              src={placeholderImage}
              alt={title || "Blog post"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
          
          {tags && tags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-2 py-1 text-xs font-medium rounded-full bg-sky-500/90 text-white backdrop-blur-sm">
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-500/90 text-white backdrop-blur-sm">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-col justify-between flex-grow p-5">
          <div>
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {title || "Untitled Post"}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3">
              {description || "No description provided"}
            </p>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <time className="text-xs text-slate-500 dark:text-slate-400">
              {date ? new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }) : "No date"}
            </time>
            
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3 h-3 mr-1" />
              <span>{estimateReadTime(description || "")} min read</span>
            </div>
          </div>
        </div>
        
        <div 
          className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-indigo-500 transform transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        />
      </div>
    </Link>
  );
};

// Helper function to estimate read time
const estimateReadTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

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
