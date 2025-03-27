'use client'
import { useCallback, useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Code, FileText, Sparkles, Star } from 'lucide-react'
import ky from 'ky'
import useSWR from 'swr'
import { usePathname } from 'next/navigation'

import { BlogCard } from '@/components/blog'
import Profile from '@/components/profile'
import Tags from '@/components/tags'

// Animated Particle Component for Hero Background
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/5 via-sky-800/5 to-teal-800/5 dark:from-indigo-900/20 dark:via-sky-800/20 dark:to-teal-800/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(56,189,248,0.12),transparent)]" />
      
      {Array.from({ length: 30 }).map((_, i) => {
        const size = Math.random() * 8 + 2;
        const duration = Math.random() * 30 + 15;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const targetX = Math.random() * 100;
        const targetY = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-sky-500/20 dark:bg-sky-400/10"
            style={{
              width: size,
              height: size,
              top: `${initialY}%`,
              left: `${initialX}%`,
            }}
            animate={{
              y: [`${initialY}%`, `${targetY}%`],
              x: [`${initialX}%`, `${targetX}%`],
              opacity: [Math.random() * 0.5 + 0.2, Math.random() * 0.3 + 0.1, Math.random() * 0.5 + 0.2],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};

// Terminal-inspired hero section with typing animation
const TerminalHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-3xl"
    >
      <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
        <div className="overflow-hidden">
          <motion.span
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="inline-block mr-4 text-slate-800 dark:text-slate-50"
          >
            Welcome to my
          </motion.span>
        </div>
        <div className="overflow-hidden">
          <motion.span
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 0.2 
            }}
            className="inline-block bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 bg-clip-text text-transparent animate-gradient"
          >
            AI Engineering Space
          </motion.span>
        </div>
      </h1>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "35%" }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-sky-500 to-indigo-500 mb-8 rounded-full"
      />
      
      <motion.div 
        className="relative p-4 glass rounded-lg font-mono text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="flex gap-1.5 absolute top-3 left-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
        </div>
        <div className="pt-4 pb-1">
          <span className="text-sky-600 dark:text-sky-400">minh@ai-blog</span>:<span className="text-indigo-500 dark:text-indigo-400">~</span>$ <span className="typing-effect text-slate-700 dark:text-slate-300">
            Exploring the intersection of AI, machine learning, and privacy-first engineering. 
            I build intelligent systems that help businesses leverage the power of AI while 
            maintaining data security and efficiency.
          </span>
          <span className="inline-block w-2 h-4 bg-sky-500/70 animate-pulse ml-1"></span>
        </div>
      </motion.div>
    </motion.div>
  );
};

function HeroTags() {
  const { data, error, isLoading } = useSWR('/api/tag', async (url) => {
    const res = await ky.get(url).json<string[]>()
    return Array.isArray(res) ? res : []
  })
  
  const pathname = usePathname()
  
  if (isLoading) {
    return (
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-7 w-16 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-full"></div>
        ))}
      </div>
    )
  }
  
  if (error || !data || data.length === 0) {
    return null
  }
  
  return (
    <Tags 
      tags={data}
      readOnly={false}
      baseUrl={pathname.startsWith('/blog') ? '/blog' : '/'}
    />
  )
}

export default function Home() {
  return (
    <div className="w-full relative z-10 min-h-screen">
      {/* Hero Section with Enhanced Visuals */}
      <section className="relative w-full py-20 overflow-visible">
        {/* Animated Background */}
        <ParticleBackground />
        
        <div className="container relative z-20 mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex flex-col space-y-6">
                <TerminalHero />
                
                <motion.div
                  className="flex flex-wrap gap-3 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <Suspense fallback={
                    <div className="flex gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-7 w-16 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-full"></div>
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
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  <Link href="/blog">
                    <motion.button
                      className="btn-gradient rounded-full px-8 py-3 font-medium relative overflow-hidden group"
                      whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(14, 165, 233, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">Explore Articles</span>
                      <motion.span 
                        className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                      />
                      <ArrowRight className="ml-2 inline-block w-5 h-5 relative z-10" />
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
        </div>
      </section>

      {/* Divider with visual flair */}
      <div className="relative h-px w-full max-w-5xl mx-auto my-16">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
        <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-sky-500/50"></div>
      </div>
      
      {/* Latest Posts Section */}
      <section className="container mx-auto px-4 md:px-6 mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-sky-500" />
            Latest Posts
          </h2>
          
          <Link 
            href="/blog" 
            className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 flex items-center gap-1 text-sm font-medium group bg-sky-50 dark:bg-sky-900/20 px-4 py-2 rounded-full hover:bg-sky-100 dark:hover:bg-sky-800/30 transition-colors"
          >
            <span>View all posts</span>
            <motion.span
              whileHover={{ x: 4 }}
              className="inline-block"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={
            <div className="col-span-full space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-[200px] bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
              ))}
            </div>
          }>
            {['blog/langchain-chatbot'].map((route) => (
              <BlogCard 
                key={route}
                route={route}
                title="Building a privacy-first LangChain Chatbot"
                description="Learn how to build a secure, privacy-centric chatbot using LangChain, integrating large language models while keeping user data protected."
                date="2023-07-15"
                tags={["LangChain", "AI", "Privacy"]}
                image="/images/placeholders/placeholder1.jpg"
              />
            ))}
          </Suspense>
        </div>
      </section>
      
      {/* Featured content section */}
      <section className="container mx-auto px-4 md:px-6 mb-20">
        <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white flex items-center">
          <Star className="w-5 h-5 mr-2 text-indigo-500" />
          Featured Content
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card p-6 bg-gradient-to-br from-white to-sky-50 dark:from-slate-800 dark:to-slate-800">
            <div className="flex items-start">
              <div className="p-3 bg-sky-50 dark:bg-sky-900/30 rounded-full mr-4">
                <Code className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">Open Source Projects</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  Explore my open-source contributions and projects focused on privacy-preserving machine learning.
                </p>
                <Link 
                  href="/projects" 
                  className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 text-sm font-medium inline-flex items-center"
                >
                  View projects
                  <ArrowRight className="ml-1 w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="card p-6 bg-gradient-to-br from-white to-indigo-50 dark:from-slate-800 dark:to-slate-800">
            <div className="flex items-start">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mr-4">
                <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">Research Papers</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  Read my latest research papers and articles on AI ethics and machine learning techniques.
                </p>
                <Link 
                  href="/research" 
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium inline-flex items-center"
                >
                  View research
                  <ArrowRight className="ml-1 w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
