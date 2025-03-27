'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Tag } from 'lucide-react'
import { motion } from 'framer-motion'

export interface TagsProps {
  value?: string[]
  tags?: string[]
  readOnly?: boolean
  baseUrl?: string
  className?: string
}

export default function Tags({ 
  value = [], 
  tags = [],
  readOnly = true,
  baseUrl = '',
  className = ''
}: TagsProps) {
  const tagList = tags.length > 0 ? tags : value;
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tagList.map((tag) => (
        <TagItem
          key={tag}
          tag={tag}
          readOnly={readOnly}
          baseUrl={baseUrl}
        />
      ))}
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

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center"
    >
      {readOnly ? (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary/10 text-primary/90">
          <Tag className="w-3 h-3" />
          <span>{tag}</span>
        </span>
      ) : (
        <Link
          href={href}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary/10 text-primary/90 hover:bg-primary/20 transition-colors"
        >
          <Tag className="w-3 h-3 flex-shrink-0" />
          <span>{tag}</span>
        </Link>
      )}
    </motion.div>
  )
}
