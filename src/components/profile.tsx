'use client'

import { motion } from 'framer-motion'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Heart } from 'lucide-react'
import { useState } from 'react'

interface SkillTagProps {
  label: string
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'coffee' | 'neutral'
  description: string
}

const colorMap = {
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40',
  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/40',
  green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/40',
  orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800/40',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/40',
  coffee: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/40',
  neutral: 'bg-slate-100 text-slate-800 dark:bg-slate-800/40 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50'
}

function SkillTag({ label, color, description }: SkillTagProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  
  return (
    <div className="relative">
      <motion.span 
        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-help ${colorMap[color]}`}
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {label}
      </motion.span>
      
      {showTooltip && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-white dark:bg-slate-800/90 shadow-md rounded-md text-xs text-slate-700 dark:text-slate-300 z-50 border border-slate-200 dark:border-slate-700"
        >
          {description}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-slate-800 border-r border-b border-slate-200 dark:border-slate-700"></div>
        </motion.div>
      )}
    </div>
  )
}

export default function Profile() {
  return (
    <div className="bg-white/95 dark:bg-slate-800/30 backdrop-blur-sm shadow-md border border-slate-200/50 dark:border-blue-900/20 rounded-xl overflow-hidden">
      <div className="p-6">
        {/* Profile header */}
        <div className="flex flex-col items-center text-center">
          {/* Profile picture */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-md ring-1 ring-slate-300 dark:ring-slate-600">
              <Image 
                src="/new_profile.png" 
                alt="Minh BTC" 
                width={96} 
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online indicator with coffee animation */}
            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-slate-600 dark:bg-slate-500 flex items-center justify-center">
              <span className="text-[8px] animate-pulse">☕</span>
            </div>
          </div>
          
          {/* Name */}
          <h2 className="text-2xl font-bold mb-1 text-slate-800 dark:text-slate-200">
            Minh BTC
          </h2>
          
          {/* Title and description */}
          <div className="mb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-slate-700 dark:text-slate-300">AI Engineer</span>
              <span className="inline-flex items-center justify-center w-5 h-5 bg-slate-600 dark:bg-slate-500 rounded-full text-white text-xs">
                🇻🇳
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 italic">Powered by code & coffee</p>
          </div>
        </div>
        
        {/* Specializations */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3 text-slate-600 dark:text-slate-400 flex items-center">
            <span className="text-slate-700 dark:text-slate-500 mr-1.5">⚡</span>Specializations
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <SkillTag 
              label="AI/LLM/NLP" 
              color="neutral" 
              description="Large Language Models & Natural Language Processing applications"
            />
            <SkillTag 
              label="Agents" 
              color="neutral" 
              description="Building autonomous AI agents for various tasks"
            />
            <SkillTag 
              label="RAG" 
              color="neutral" 
              description="Retrieval Augmented Generation for knowledge-based AI"
            />
            <SkillTag 
              label="Tech" 
              color="neutral" 
              description="Software engineering & full-stack development"
            />
          </div>
        </div>
        
        {/* Coffee counter */}
        <div className="mb-6 bg-slate-100/70 dark:bg-slate-800/50 rounded-lg py-2 px-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600 dark:text-slate-400">Today&apos;s coffee:</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-700 dark:text-slate-500">☕</span>
              <span className="text-slate-700 dark:text-slate-500">☕</span>
              <span className="text-slate-700 dark:text-slate-500">☕</span>
              <span className="text-slate-700 dark:text-slate-500 animate-pulse">☕</span>
              <span className="text-slate-400">☕</span>
            </div>
          </div>
        </div>
        
        {/* Connect */}
        <div>
          <h3 className="text-sm font-medium mb-3 text-slate-600 dark:text-slate-400 flex items-center">
            <span className="text-slate-700 dark:text-slate-500 mr-1.5">🔗</span>Connect
          </h3>
          <div className="flex justify-center gap-4 mb-4">
            <Link
              href="https://github.com/minhbtrc"
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-600/50 text-slate-700 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              aria-label="GitHub Profile"
            >
              <SiGithub className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/minhbtcm00/"
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-600/50 text-slate-700 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <SiLinkedin className="w-4 h-4" />
            </Link>
            <Link
              href="mailto:contact@minhbtc.blog"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-600/50 text-slate-700 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              aria-label="Email Me"
            >
              <Mail className="w-4 h-4" />
            </Link>
            <Link
              href="https://github.com/sponsors/minhbtrc"
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 dark:hover:bg-pink-800/40 text-pink-700 dark:text-pink-300 hover:text-pink-800 dark:hover:text-pink-200 transition-colors"
              aria-label="Sponsor Me on GitHub"
            >
              <Heart className="w-4 h-4" fill="currentColor" />
            </Link>
          </div>
          
          <Link href="/about" className="w-full block">
            <button className="w-full py-2 px-4 rounded-lg bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700 text-white text-sm font-medium transition-colors shadow-sm hover:shadow-md">
              View Full Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
} 