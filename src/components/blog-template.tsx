'use client'

import React from 'react'

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
    <article className="prose max-w-none">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="badge badge-primary py-2 px-3">{tag}</span>
          ))}
        </div>
        <p className="text-sm opacity-70 mb-2">Published on {date}</p>
        <p className="italic text-lg opacity-80">{description}</p>
      </header>
      <div className="mt-8 blog-content" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
} 