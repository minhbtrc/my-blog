'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, Star } from 'lucide-react'
import dayjs from 'dayjs'

interface FeaturedPostProps {
  post: {
    title: string
    date: string
    description: string
    slug: string
    image?: string
    tags?: string[]
  }
  isLoading?: boolean
}

export default function FeaturedPost({ post, isLoading = false }: FeaturedPostProps) {
  if (isLoading) {
    return (
      <div className="w-full h-[340px] rounded-2xl bg-base-200/50 animate-pulse">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-base-content/30">Loading featured post...</div>
        </div>
      </div>
    )
  }

  const formattedDate = dayjs(post.date).format('MMMM D, YYYY')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-2xl overflow-hidden border border-base-300/30 bg-gradient-to-br from-base-200/80 to-base-200/30 backdrop-blur-sm shadow-lg relative"
    >
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1.5 bg-primary/90 text-primary-content rounded-full font-medium text-sm flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5" />
          Featured Post
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 h-full">
        <div className="relative h-[200px] md:h-full overflow-hidden">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              width={600}
              height={400}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <span className="text-base-content/40">No image available</span>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center text-base-content/60 text-sm mb-3">
              <Calendar className="w-4 h-4 mr-1.5" />
              {formattedDate}
            </div>
            
            <h2 className="text-2xl font-bold mb-4 line-clamp-2">{post.title}</h2>
            
            <p className="text-base-content/70 line-clamp-3 mb-4">
              {post.description}
            </p>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                {post.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 bg-base-300/50 rounded-full text-xs text-base-content/70">
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="px-2.5 py-1 bg-base-300/50 rounded-full text-xs text-base-content/70">
                    +{post.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="group inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Read full article
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
} 