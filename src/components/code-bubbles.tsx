'use client'

import { useEffect, useState } from 'react'

interface BubbleProps {
  size: number;
  left: number;
  animationDuration: number;
  delay: number;
  opacity: number;
}

export default function CodeBubbles() {
  const [bubbles, setBubbles] = useState<BubbleProps[]>([])

  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }).map(() => ({
      size: Math.random() * 100 + 50,
      left: Math.random() * 100,
      animationDuration: Math.random() * 15 + 10,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.5 + 0.1
    }))
    setBubbles(newBubbles)
  }, [])

  if (bubbles.length === 0) return null

  return (
    <div className="code-bubbles">
      {bubbles.map((bubble, i) => (
        <div
          key={i}
          className="code-bubble"
          style={{
            width: bubble.size + 'px',
            height: bubble.size + 'px',
            left: bubble.left + '%',
            animationDuration: bubble.animationDuration + 's',
            animationDelay: bubble.delay + 's',
            opacity: bubble.opacity
          }}
        />
      ))}
    </div>
  )
} 