'use client'
import { useState, useEffect } from 'react'
import clsx from 'clsx'

import { Disc3 } from 'lucide-react'
import ReactPlayer from 'react-player/youtube'
import Island from '@/components/island'

export default function PlayButton() {
  const [playing, setPlaying] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    return (
      <button className="btn btn-sm rounded-full">
        listen
        <div className="w-4 h-4 bg-base-content text-base-100 rounded-full"></div>
      </button>
    )
  }

  return (
    <button
      className="btn btn-sm rounded-full"
      onClick={() => setPlaying(!playing)}
    >
      <Island>
        <ReactPlayer
          className="invisible !w-dvw !h-dvh fixed top-0 left-0 pointer-events-none"
          url="https://www.youtube.com/watch?v=zhDwjnYZiCo&t=185s"
          playing={playing}
          loop
        />
      </Island>
      listen
      <Disc3
        className={clsx(
          'w-4 h-4 bg-base-content text-base-100 rounded-full animate-[spin_2s_linear_infinite]',
          {
            '[animation-play-state:running]': playing,
            '[animation-play-state:paused]': !playing,
          },
        )}
      />
    </button>
  )
}
