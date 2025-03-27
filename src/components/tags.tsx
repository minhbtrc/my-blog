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
          <div className="text-sm font-semibold flex items-center gap-1 text-slate-300">
            <TagIcon className="w-4 h-4" />
            Tags
          </div>
          
          {showToggle && sortedTags.length > limit && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs flex items-center text-slate-400 hover:text-slate-300"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-1" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 mr-1" />
                  Show all ({sortedTags.length})
                </>
              )}
            </button>
          )}
        </div>
      )}
      
      {tags.length === 0 && showNoTagsMessage ? (
        <div className="text-sm text-slate-500 italic">No tags available</div>
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
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <span className="mr-1 w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                    {tag}
                  </Link>
                </motion.div>
              ) : (
                <motion.button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`
                    inline-flex items-center px-2.5 py-1 rounded-full text-xs transition-colors
                    ${
                      isSelected
                        ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-800/50 hover:bg-indigo-800/60'
                        : 'bg-slate-800/60 text-slate-400 border border-slate-700/50 hover:bg-slate-700/60 hover:text-slate-300'
                    }
                  `}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <span 
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      isSelected ? 'bg-indigo-400' : 'bg-slate-600'
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
        <span className="tech-tag">
          {tagIcon}
          <span>{tag}</span>
        </span>
      ) : (
        <Link
          href={href}
          className="tech-tag"
        >
          {tagIcon}
          <span>{tag}</span>
        </Link>
      )}
    </motion.div>
  )
}
