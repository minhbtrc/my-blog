/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { 
  Tag, 
  Brain,
  Cpu,
  Code,
  Bot,
  LineChart,
  Network,
  Globe,
  BookOpen,
  PenTool,
  Layers,
  Server,
  Database,
  Lock,
  Rocket,
  Cloud,
  ChevronDown,
  ChevronUp,
  TagIcon
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TagsProps {
  tags: string[]
  selectedTags?: string[]
  onChange?: (tags: string[]) => void
  readOnly?: boolean
  className?: string
  showTitle?: boolean
  showToggle?: boolean
  compact?: boolean
  limit?: number
  showNoTagsMessage?: boolean
}

// Function to determine which icon to use based on the tag content
const getTagIcon = (tag: string) => {
  const tagLower = tag.toLowerCase();
  
  if (tagLower.includes('ai') || tagLower.includes('ml') || tagLower.includes('artificial')) {
    return <Brain className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else if (tagLower.includes('llm') || tagLower.includes('language model')) {
    return <Bot className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else if (tagLower.includes('neural') || tagLower.includes('network')) {
    return <Network className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else if (tagLower.includes('tech') || tagLower.includes('technology')) {
    return <Cpu className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else if (tagLower.includes('code') || tagLower.includes('programming') || tagLower.includes('development')) {
    return <Code className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else if (tagLower.includes('data') || tagLower.includes('analytics')) {
    return <LineChart className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else if (tagLower.includes('web') || tagLower.includes('frontend') || tagLower.includes('backend')) {
    return <Globe className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else if (tagLower.includes('devops') || tagLower.includes('deployment')) {
    return <Server className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else if (tagLower.includes('cloud') || tagLower.includes('saas')) {
    return <Cloud className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else if (tagLower.includes('security') || tagLower.includes('privacy')) {
    return <Lock className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else if (tagLower.includes('database') || tagLower.includes('sql')) {
    return <Database className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else if (tagLower.includes('tutorial') || tagLower.includes('guide')) {
    return <BookOpen className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else if (tagLower.includes('ux') || tagLower.includes('design')) {
    return <PenTool className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else if (tagLower.includes('architecture') || tagLower.includes('system')) {
    return <Layers className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else if (tagLower.includes('startup') || tagLower.includes('business')) {
    return <Rocket className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  } else {
    return <Tag className="w-3 h-3 mr-1.5 flex-shrink-0" aria-hidden="true" />;
  }
};

export default function Tags({
  tags,
  selectedTags = [],
  onChange,
  readOnly = true,
  className = '',
  showTitle = true,
  showToggle = true,
  compact = false,
  limit = 15,
  showNoTagsMessage = false
}: TagsProps) {
  const [expanded, setExpanded] = useState(false)
  
  // Sort tags alphabetically
  const sortedTags = useMemo(() => [...tags].sort(), [tags])
  
  // Limit tags shown if not expanded and limit is provided
  const visibleTags = useMemo(() => {
    if (expanded || !limit) return sortedTags
    return sortedTags.slice(0, limit)
  }, [sortedTags, expanded, limit])
  
  // Handle tag selection
  const handleTagClick = (tag: string) => {
    if (readOnly || !onChange) return
    
    // If the tag is already selected, remove it
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag))
    } else {
      // If the tag is not selected, add it
      onChange([...selectedTags, tag])
    }
  }
  
  // If no tags and message is hidden, return null
  if (tags.length === 0 && !showNoTagsMessage) return null
  
  return (
    <div className={`w-full ${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-mono font-semibold flex items-center gap-1.5 text-gray-500">
            <TagIcon className="w-4 h-4" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-500 dark:from-gray-400 dark:to-gray-500">tags[]</span>
          </div>
          
          {showToggle && sortedTags.length > limit && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-mono"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-1" />
                  <span className="text-gray-500">collapse()</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 mr-1" />
                  <span className="text-gray-500">showAll({sortedTags.length})</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
      
      {tags.length === 0 && showNoTagsMessage ? (
        <div className="text-sm text-gray-500 italic font-mono">{/* No tags available */}</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {visibleTags.map(tag => {
              const isSelected = selectedTags.includes(tag)
              
              return readOnly ? (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs hover:bg-gray-200 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all cursor-pointer font-mono"
                  >
                    <span className="mr-1.5 w-1.5 h-1.5 rounded-full bg-gray-500/70 dark:bg-gray-500/70"></span>
                    {tag}
                  </Link>
                </motion.div>
              ) : (
                <motion.button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`
                    inline-flex items-center px-2.5 py-1 rounded-md text-xs transition-all font-mono
                    ${
                      isSelected
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-sm'
                        : 'bg-gray-100/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-200/60 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <span 
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      isSelected ? 'bg-gray-700 dark:bg-gray-300' : 'bg-gray-400 dark:bg-gray-600'
                    }`}
                  ></span>
                  {tag}
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

function TagItem({
  tag,
  readOnly = true,
  baseUrl = '',
}: {
  tag: string
  readOnly?: boolean
  baseUrl?: string
}) {
  const href = `${baseUrl}?tag=${encodeURIComponent(tag)}`
  const tagIcon = getTagIcon(tag);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center"
    >
      {readOnly ? (
        <span className="tech-tag font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 px-2 py-0.5 rounded-md text-xs inline-flex items-center">
          {tagIcon}
          <span>{tag}</span>
        </span>
      ) : (
        <Link
          href={href}
          className="tech-tag font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 px-2 py-0.5 rounded-md text-xs hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all inline-flex items-center"
        >
          {tagIcon}
          <span>{tag}</span>
        </Link>
      )}
    </motion.div>
  )
}
