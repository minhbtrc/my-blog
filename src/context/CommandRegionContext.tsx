'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface CommandRegion {
  id: string
  element: HTMLElement | null
}

interface CommandRegionContextType {
  regions: CommandRegion[]
  registerRegion: (id: string, element: HTMLElement) => void
  unregisterRegion: (id: string) => void
  activeRegion: string | null
  setActiveRegion: (id: string | null) => void
}

const CommandRegionContext = createContext<CommandRegionContextType | undefined>(undefined)

export function CommandRegionProvider({ children }: { children: ReactNode }) {
  const [regions, setRegions] = useState<CommandRegion[]>([])
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  const registerRegion = (id: string, element: HTMLElement) => {
    setRegions(prev => [...prev.filter(r => r.id !== id), { id, element }])
  }

  const unregisterRegion = (id: string) => {
    setRegions(prev => prev.filter(r => r.id !== id))
    if (activeRegion === id) {
      setActiveRegion(null)
    }
  }

  return (
    <CommandRegionContext.Provider 
      value={{ 
        regions, 
        registerRegion, 
        unregisterRegion, 
        activeRegion, 
        setActiveRegion 
      }}
    >
      {children}
    </CommandRegionContext.Provider>
  )
}

export function useCommandRegion() {
  const context = useContext(CommandRegionContext)
  if (context === undefined) {
    throw new Error('useCommandRegion must be used within a CommandRegionProvider')
  }
  return context
} 