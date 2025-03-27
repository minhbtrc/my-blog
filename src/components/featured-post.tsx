'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { BlogCardProps } from './blog'

// Format date helper function
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Use the Blog type from BlogCardProps
type Blog = NonNullable<BlogCardProps['blog']>;

interface FeaturedPostProps {
  post: Blog
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const { title, description, date, readingTime, route, tags } = post
  
  // Normalize the route to ensure it starts with /blog
  const href = route.startsWith('/blog') ? route : `/blog${route.startsWith('/') ? route : `/${route}`}`
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden shadow-lg border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-800/80 hover:shadow-indigo-900/20 hover:shadow-xl transition-all duration-300"
    >
      <div className="p-8 relative">
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full"></div>
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag: string) => (
              <Link 
                key={tag} 
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-900/30 text-indigo-200 hover:bg-indigo-800/40 transition-colors border border-indigo-700/50"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-1.5"></span>
                {tag}
              </Link>
            ))}
          </div>
        )}
        
        {/* Date and reading time */}
        <div className="mb-3 flex gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>{formatDate(date)}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>{readingTime || '5 min'} read</span>
          </div>
        </div>
        
        {/* Title and description */}
        <Link href={href} className="group">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-slate-100 group-hover:text-white transition-colors">
            {title}
          </h2>
        </Link>
        
        <p className="text-slate-400 mb-6 relative">
          {description}
        </p>
        
        {/* Read more link */}
        <div className="mt-auto">
          <Link 
            href={href}
            className="inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300 font-medium group"
          >
            Read article
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
} 