'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface BlogContextType {
  currentPost: string | null
  setCurrentPost: (post: string | null) => void
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export function BlogProvider({ children }: { children: ReactNode }) {
  const [currentPost, setCurrentPost] = useState<string | null>(null)

  return (
    <BlogContext.Provider value={{ currentPost, setCurrentPost }}>
      {children}
    </BlogContext.Provider>
  )
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider')
  }
  return context
} 