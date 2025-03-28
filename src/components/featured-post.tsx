'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Code } from 'lucide-react'
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

export default function FeaturedPost({ blog }: { blog: Blog }) {
  if (!blog) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full relative"
    >
      <Link
        href={blog.route}
        className="block relative overflow-hidden group border border-blue-900/40 rounded-lg bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300"
      >
        {/* Top gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/70 to-cyan-500/0"></div>
        
        {/* Main content */}
        <div className="p-6 relative z-10">
          {/* Featured tag */}
          <div className="flex mb-4">
            <span className="bg-blue-900/50 text-cyan-300 text-xs font-mono py-1 px-3 rounded-md flex items-center gap-1.5 border border-blue-800/40">
              <Code className="h-3.5 w-3.5" />
              featured.post
            </span>
          </div>
          
          {/* Title with gradient effect on hover */}
          <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-colors duration-300">
            {blog.title}
          </h2>
          
          {/* Description with lighter font weight */}
          <p className="text-slate-400 mb-6 font-light text-sm sm:text-base">{blog.description}</p>
          
          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags?.map((tag: string) => (
              <span 
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs bg-slate-800/70 text-cyan-300 border border-blue-900/30 font-mono"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/70 mr-1.5"></span>
                {tag}
              </span>
            ))}
          </div>
          
          {/* Footer with date, reading time and CTA */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-xs text-slate-500 font-mono flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-cyan-400/70" />
                {formatDate(blog.date)}
              </span>
              <span className="text-xs text-slate-500 flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-cyan-400/70" />
                {blog.readingTime}
              </span>
            </div>
            <span className="text-cyan-400 font-mono text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              read.article()
              <ArrowRight className="h-3.5 w-3.5 transition-all" />
            </span>
          </div>
          
          {/* Decorative code pattern in the background */}
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-blue-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        </div>
      </Link>
    </motion.div>
  )
} 