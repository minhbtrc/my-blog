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
  blue: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 hover:bg-blue-500/20',
  purple: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20',
  green: 'bg-green-500/10 text-green-700 dark:text-green-300 hover:bg-green-500/20',
  orange: 'bg-orange-500/10 text-orange-700 dark:text-orange-300 hover:bg-orange-500/20',
  red: 'bg-red-500/10 text-red-700 dark:text-red-300 hover:bg-red-500/20'
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
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full rounded-xl overflow-hidden shadow-md"
    >
      <div className="relative z-10 p-8 bg-base-200/80 backdrop-blur-sm border border-base-300/30 rounded-xl">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-base-100 shadow-xl mb-6">
              <Image 
                src="/profile.jpeg" 
                alt="Minh BTC" 
                width={112} 
                height={112}
                className="w-full h-full object-cover"
                style={{ borderRadius: '50%' }}
              />
            </div>
            {/* Decorative circles */}
            <motion.div
              className="absolute -z-10 -top-1 -left-1 w-30 h-30 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-md"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
          
          <h2 className="text-2xl font-black font-satoshi mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Minh BTC</h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-2 items-center"
          >
            <p className="text-base-content/80 text-lg flex items-center justify-center gap-2">
              <span>AI Engineer</span> 
              <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full text-white font-bold text-xs">
                🇻🇳
              </span>
            </p>
            <p className="text-base-content/60 text-sm max-w-[240px]">
              Building intelligent systems with a focus on privacy and efficiency
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 mb-6"
        >
          <h3 className="text-base font-semibold mb-3 text-base-content/70 text-left">Specializations</h3>
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
        </motion.div>

        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col gap-4 mt-6"
        >
          <h3 className="text-base font-semibold text-base-content/70 text-left">Connect</h3>
          <div className="flex justify-center gap-3">
            <Link
              href="https://github.com/minhbtrc"
              target="_blank"
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-base-300/50 transition-all transform hover:scale-110"
              aria-label="GitHub Profile"
            >
              <SiGithub className="w-5 h-5 text-base-content/70 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/minhbtcm00/"
              target="_blank"
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-base-300/50 transition-all transform hover:scale-110"
              aria-label="LinkedIn Profile"
            >
              <SiLinkedin className="w-5 h-5 text-base-content/70 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </Link>
            <Link
              href="mailto:contact@minhbtc.blog"
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-base-300/50 transition-all transform hover:scale-110"
              aria-label="Email Me"
            >
              <Mail className="w-5 h-5 text-base-content/70 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
            </Link>
            <Link
              href="/resume"
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-base-300/50 transition-all transform hover:scale-110"
              aria-label="Resume"
            >
              <FileText className="w-5 h-5 text-base-content/70 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
            </Link>
          </div>
          <Link
            href="/about"
            className="mt-2 btn btn-primary btn-sm w-full rounded-full"
          >
            View Full Profile
          </Link>
        </motion.div>
      </div>
      
      {/* Background gradient effect */}
      <motion.div 
        className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200/20 via-base-200/0 to-purple-200/20 dark:from-blue-900/20 dark:via-base-900/0 dark:to-purple-900/20" 
        animate={{ 
          boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.3)", "0 0 0px rgba(59, 130, 246, 0)"]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  )
} 