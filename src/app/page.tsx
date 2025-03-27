'use client'
import { useCallback, useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, AlertCircle, Calendar, Sparkles } from 'lucide-react'
import ky from 'ky'
import useSWR from 'swr'
import clsx from 'clsx'

import { BlogCard } from '@/components/blog'
import Tags from '@/components/tags'
import Island from '@/components/island'
import InfiniteLoading from '@/components/infiniteLoading'
import Profile from '@/components/profile'
import FeaturedPost from '@/components/featured-post'
import Newsletter from '@/components/newsletter'

import { useSignalSwitch } from '@/lib/hooks/useSignal'
import { useTag } from '@/lib/hooks/useTag'

interface BlogRoute {
  route: string
  [key: string]: any
}

type PostRouteType = string | BlogRoute

function HeroTags() {
  const { data: tags = [] } = useSWR('/api/tag', async (api: string) => {
    const data = await ky.get(api).json<string[]>()
    return data
  }, { 
    revalidateOnFocus: false,
    revalidateOnMount: true
  })
  
  // Color mappings for consistent tag colors
  const colorMap: Record<string, string> = {
    'AI': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40',
    'ML': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/40',
    'NLP': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/40',
    'Tutorial': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800/40',
    'Dev': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/40',
    'LLM': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 hover:bg-cyan-200 dark:hover:bg-cyan-800/40',
    'Privacy': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/40',
    'Agents': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800/40',
    'RAG': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/40',
  }
  
  // Default color for tags not in the mapping
  const defaultColor = 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/40'
  
  // Show at most 4 tags in the hero section
  const displayTags = tags.slice(0, 4)
  
  return (
    <div className="flex flex-wrap gap-3">
      {displayTags.map((tag, i) => (
        <Link href={`/blog?tag=${tag}`} key={tag}>
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${colorMap[tag] || defaultColor}`}>
            #{tag}
          </span>
        </Link>
      ))}
    </div>
  )
}

function TagList() {
  const tag = useTag()  
  const { data: tags = [] } = useSWR('/api/tag', async (api: string) => {
    const data = await ky.get(api).json<string[]>()
    return data
  }, { 
    revalidateOnFocus: true,
    revalidateOnMount: true,
    dedupingInterval: 0 // Disable deduping to ensure fresh data
  })
  return (
    <Tags className="flex flex-row flex-wrap gap-2" value={tags} active={tag} />
  )
}

function BlogList() {
  const tag = useTag()
  const reset = useSignalSwitch(tag)
  const [{ disabled, blogs }, setData] = useState<{
    disabled: boolean
    blogs: string[]
  }>({ disabled: false, blogs: [] })
  const limit = 10
  const offset = blogs.length

  useEffect(() => {
    // Initial data load
    const loadInitialData = async () => {
      try {
        console.log('Loading initial blog data with tag:', tag);
        const data = await ky
          .post('/api/blog', {
            json: {
              t: tag,
              limit,
              offset: 0,
            },
          })
          .json<string[]>();
        
        console.log('Initial blog routes loaded:', data);
        
        if (Array.isArray(data)) {
          setData({
            disabled: data.length < limit,
            blogs: data,
          });
        } else {
          console.error('Blog API did not return an array:', data);
        }
      } catch (error) {
        console.error('Error loading initial blog data:', error);
      }
    };
    
    loadInitialData();
  }, [tag, limit]);

  const onLoad = useCallback(async () => {
    try {
      console.log('Loading more blogs with offset:', offset);
      const data = await ky
        .post('/api/blog', {
          json: {
            t: tag,
            limit,
            offset,
          },
        })
        .json<string[]>()
      
      console.log('Additional blog routes loaded:', data);
      
      if (!Array.isArray(data)) {
        console.error('Blog API did not return an array:', data);
        return;
      }
      
      return setData(({ blogs: [...blogs] }) => {
        data.forEach((item, i) => (blogs[offset + i] = item))
        return { disabled: data.length !== limit, blogs }
      })
    } catch (error) {
      console.error('Error loading more blog data:', error);
    }
  }, [limit, offset, tag, blogs])

  useEffect(() => {
    if (reset) setData({ disabled: false, blogs: [] })
  }, [reset])

  if (blogs.length === 0) {
    return (
      <motion.div 
        className="col-span-full text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="font-medium text-xl mb-2">No posts found</h3>
        <p className="text-base-content/70 mb-4">
          {tag ? `No blog posts found for the tag "${tag}". Try another tag.` : 
            "There aren't any blog posts published yet. Check back soon!"}
        </p>
        {tag && (
          <Link href="/">
            <motion.button
              className="btn btn-primary btn-sm rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Posts
            </motion.button>
          </Link>
        )}
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      {blogs.map((route, i) => (
        <motion.div
          key={route}
          initial={{ y: 8 * (i + 1), opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <BlogCard route={route} />
        </motion.div>
      ))}
      <div className="flex justify-center py-4">
        <InfiniteLoading onLoad={onLoad} disabled={disabled} />
        {disabled && blogs.length > 0 && (
          <p className="text-xs text-base-content/50 ml-2 mt-2">
            <span>You've reached the bottom</span> 🎉
          </p>
        )}
      </div>
    </div>
  )
}

export default function Page() {
  const { data: featuredPost, error: featuredError } = useSWR('/api/featured-post', async (api: string) => {
    try {
      return await ky.get(api).json<{
        title: string
        date: string
        description: string
        slug: string
        image?: string
        tags?: string[]
      }>()
    } catch (err) {
      console.error('Error fetching featured post:', err)
      return null
    }
  }, { 
    fallbackData: {
      title: "Building an AI-Powered Chatbot with LangChain",
      date: "2023-10-15",
      description: "Learn how to create a sophisticated chatbot using LangChain, vector databases, and modern LLMs for enhanced conversational experiences.",
      slug: "langchain-chatbot",
      image: "/blog/langchain-preview.jpg",
      tags: ["AI", "LLM", "Tutorial"]
    },
    revalidateOnFocus: false
  })

  const defaultPost = {
    title: "Building an AI-Powered Chatbot with LangChain",
    date: "2023-10-15",
    description: "Learn how to create a sophisticated chatbot using LangChain, vector databases, and modern LLMs for enhanced conversational experiences.",
    slug: "langchain-chatbot",
    image: "/blog/langchain-preview.jpg",
    tags: ["AI", "LLM", "Tutorial"]
  }

  return (
    <div className="space-y-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-800/10 dark:via-purple-800/10 dark:to-pink-800/10 animate-gradient-slow" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.1),transparent)]" />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-blue-500/10 dark:bg-blue-400/10"
                style={{
                  width: `${Math.random() * 8 + 2}px`,
                  height: `${Math.random() * 8 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex flex-col space-y-6 max-w-3xl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <h1 className="font-bold text-5xl md:text-6xl tracking-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-block"
                  >
                    Welcome to my{' '}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-shimmer"
                  >
                    Blog
                  </motion.span>
                </h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "40%" }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 rounded-full"
                />
              </motion.div>
              
              <motion.p 
                className="text-lg text-base-content/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Exploring the intersection of AI, machine learning, and software engineering
                through hands-on tutorials and practical insights. I'm on a mission to make
                complex AI concepts accessible and useful for everyone.
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-3 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Suspense fallback={
                  <div className="flex gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-7 w-16 bg-base-300/40 animate-pulse rounded-full"></div>
                    ))}
                  </div>
                }>
                  <HeroTags />
                </Suspense>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Link href="/blog">
                  <motion.button
                    className="btn btn-primary rounded-full px-6 relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Explore Articles</span>
                    <motion.span 
                      className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                    />
                    <ArrowRight className="ml-1 w-4 h-4 relative z-10" />
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button
                    className="btn btn-outline rounded-full px-6 border-2 hover:bg-base-200/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    About Me
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Profile Card */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Profile />
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full bg-base-300/30 mx-auto max-w-5xl" />

      {/* Latest Posts Section */}
      <section className="space-y-6 px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          <Link 
            href="/blog" 
            className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-medium group"
          >
            <span>View all</span>
            <motion.span
              whileHover={{ x: 4 }}
              className="inline-block"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.span>
          </Link>
        </div>
        
        <Suspense fallback={
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[160px] bg-base-200/40 rounded-xl animate-pulse"></div>
            ))}
          </div>
        }>
          <BlogList />
        </Suspense>
      </section>
    </div>
  )
}
