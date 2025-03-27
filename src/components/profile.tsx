'use client'

import { motion } from 'framer-motion'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, FileText } from 'lucide-react'
import { useState } from 'react'

interface SkillTagProps {
  label: string
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red'
  description: string
}

const colorMap = {
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40',
  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/40',
  green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/40',
  orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800/40',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/40'
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
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-base-200/90 backdrop-blur-sm shadow-lg rounded-md text-xs text-base-content/80 z-50 border border-base-300/30"
        >
          {description}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-base-200 border-r border-b border-base-300/30"></div>
        </motion.div>
      )}
    </div>
  )
}

export default function Profile() {
  return (
    <div className="bg-base-200/30 backdrop-blur-sm border border-base-300/30 rounded-2xl overflow-hidden">
      <div className="p-6">
        {/* Profile header */}
        <div className="flex flex-col items-center text-center">
          {/* Profile picture */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image 
                src="/profile.jpeg" 
                alt="Minh BTC" 
                width={96} 
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          {/* Name */}
          <h2 className="text-2xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Minh BTC
          </h2>
          
          {/* Title and description */}
          <div className="mb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-base-content/80">AI Engineer</span>
              <span className="inline-flex items-center justify-center w-5 h-5 bg-orange-500 rounded-full text-white text-xs">
                🇻🇳
              </span>
            </div>
            <p className="text-base-content/60 text-sm">
              Building intelligent systems with a focus on privacy and efficiency
            </p>
          </div>
        </div>
        
        {/* Specializations */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3 text-base-content/70">Specializations</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <SkillTag 
              label="AI/LLM/NLP" 
              color="blue" 
              description="Large Language Models & Natural Language Processing applications"
            />
            <SkillTag 
              label="Agents" 
              color="purple" 
              description="Building autonomous AI agents for various tasks"
            />
            <SkillTag 
              label="RAG" 
              color="green" 
              description="Retrieval Augmented Generation for knowledge-based AI"
            />
            <SkillTag 
              label="Tech" 
              color="orange" 
              description="Software engineering & full-stack development"
            />
          </div>
        </div>
        
        {/* Connect */}
        <div>
          <h3 className="text-sm font-medium mb-3 text-base-content/70">Connect</h3>
          <div className="flex justify-center gap-4 mb-4">
            <Link
              href="https://github.com/minhbtrc"
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-base-300/50 hover:bg-base-300 transition-colors"
              aria-label="GitHub Profile"
            >
              <SiGithub className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/minhbtcm00/"
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-base-300/50 hover:bg-base-300 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <SiLinkedin className="w-4 h-4" />
            </Link>
            <Link
              href="mailto:contact@minhbtc.blog"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-base-300/50 hover:bg-base-300 transition-colors"
              aria-label="Email Me"
            >
              <Mail className="w-4 h-4" />
            </Link>
            <Link
              href="/resume"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-base-300/50 hover:bg-base-300 transition-colors"
              aria-label="Resume"
            >
              <FileText className="w-4 h-4" />
            </Link>
          </div>
          
          <Link href="/about" className="w-full block">
            <button className="w-full py-2 px-4 rounded-full bg-base-300/50 hover:bg-base-300 transition-colors text-sm font-medium">
              View Full Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
} 