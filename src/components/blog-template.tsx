'use client'

import React from 'react'
import { themeStyles } from '@/lib/utils'

interface BlogTemplateProps {
  title: string
  date: string
  tags: string[]
  description: string
  content: string
}

export default function BlogTemplate({ 
  title, 
  date, 
  tags, 
  description, 
  content 
}: BlogTemplateProps) {
  return (
    <article className="prose prose-lg max-w-none">
      <header className="mb-8 not-prose">
        <h1 className={themeStyles(
          "text-4xl font-bold mb-4 text-gray-900",
          "text-4xl font-bold mb-4 text-slate-100"
        )}>{title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span 
              key={tag} 
              className={themeStyles(
                "inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200",
                "inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-900/20 text-blue-300 border border-blue-800/30"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className={themeStyles(
          "text-sm text-gray-600 mb-2",
          "text-sm text-slate-400 mb-2"
        )}>Published on {date}</p>
        <p className={themeStyles(
          "italic text-lg text-gray-700",
          "italic text-lg text-slate-300"
        )}>{description}</p>
      </header>
      <div 
        className={themeStyles(
          "mt-8 prose prose-gray prose-lg max-w-none",
          "mt-8 prose prose-invert prose-lg max-w-none prose-pre:bg-slate-800/90 prose-pre:border prose-pre:border-slate-700/50"
        )}
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </article>
  )
} 