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
    // Create a variety of bubbles with different sizes and positions
    const newBubbles = Array.from({ length: 20 }).map(() => ({
      size: Math.random() * 100 + 50,
      left: Math.random() * 100,
      animationDuration: Math.random() * 20 + 15, // 15-35s duration
      delay: Math.random() * -30,                // Staggered start
      opacity: Math.random() * 0.3 + 0.1         // Subtle opacity
    }))
    setBubbles(newBubbles)
    
    // Clean up function not needed since we're only setting state once
  }, [])

  // Don't render anything until bubbles are created
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