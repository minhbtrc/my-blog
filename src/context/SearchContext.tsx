'use client'

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react'

interface SearchResult {
  id: string
  title: string
  path: string
  excerpt?: string
}

interface SearchContextType {
  searchTerm: string
  setSearchTerm: (term: string) => void
  results: SearchResult[]
  isSearching: boolean
  performSearch: (term: string) => Promise<void>
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const performSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)
    
    try {
      // In a real app, this would call an actual API
      // Simulating a search result for now
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setResults([
        {
          id: '1',
          title: 'Example search result',
          path: '/blog/example',
          excerpt: 'This is a placeholder search result that matches your query.'
        }
      ])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  return (
    <SearchContext.Provider 
      value={{ 
        searchTerm, 
        setSearchTerm, 
        results, 
        isSearching, 
        performSearch 
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
} 