'use client'
import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

import { Disc3, Volume2, VolumeX } from 'lucide-react'
import ReactPlayer from 'react-player/youtube'
import Island from '@/components/island'

export default function PlayButton() {
  const [playing, setPlaying] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const playerRef = useRef(null)
  const hasUrl = !!process.env.NEXT_PUBLIC_LISTEN_URL
  
  useEffect(() => {
    setIsMounted(true)
    
    // Check if user has previously interacted with the site
    const hasUserInteracted = localStorage.getItem('music-interaction')
    if (hasUserInteracted === 'true') {
      setHasInteracted(true)
    }
    
    // Listen for the first user interaction on the page
    const handleFirstInteraction = () => {
      setHasInteracted(true)
      localStorage.setItem('music-interaction', 'true')
      
      // We can try to start playing after user interaction
      if (hasUrl) {
        setPlaying(true)
      }
      
      // Remove the event listeners after first interaction
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }
    
    window.addEventListener('click', handleFirstInteraction)
    window.addEventListener('touchstart', handleFirstInteraction)
    window.addEventListener('keydown', handleFirstInteraction)
    
    return () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [hasUrl])
  
  if (!isMounted || !hasUrl) {
    return null
  }

  return (
    <button
      className="btn btn-sm rounded-full relative group"
      onClick={() => setPlaying(!playing)}
      aria-label={playing ? "Pause music" : "Play music"}
    >
      <Island>
        <ReactPlayer
          ref={playerRef}
          className="invisible !w-dvw !h-dvh fixed top-0 left-0 pointer-events-none"
          url={process.env.NEXT_PUBLIC_LISTEN_URL}
          playing={playing && hasInteracted}
          loop
          volume={0.7}
          muted={false}
          onError={(e) => console.error("Player error:", e)}
        />
      </Island>
      chill
      {playing ? (
        <Volume2 className="w-4 h-4 text-base-content hidden group-hover:block absolute right-4" />
      ) : (
        <VolumeX className="w-4 h-4 text-base-content hidden group-hover:block absolute right-4" />
      )}
      <Disc3
        className={clsx(
          'w-4 h-4 bg-base-content text-base-100 rounded-full animate-[spin_2s_linear_infinite]',
          {
            '[animation-play-state:running]': playing && hasInteracted,
            '[animation-play-state:paused]': !playing || !hasInteracted,
          },
        )}
      />
      {!hasInteracted && (
        <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-xs bg-base-300 px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Click to enable music
        </span>
      )}
    </button>
  )
}
