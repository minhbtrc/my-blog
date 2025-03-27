'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, RotateCcw, Cpu } from 'lucide-react'

export default function NotFound() {
  const [counter, setCounter] = useState(5)
  const [messages, setMessages] = useState<string[]>([])
  const errorMessages = [
    "Error: Neural pathways disconnected...",
    "Attempting to reconnect synapses...",
    "AI consciousness temporarily offline...",
    "Recalibrating language model parameters...",
    "Running recovery protocol v2.4.1...",
    "Reestablishing quantum entanglement...",
    "Page not found in knowledge database...",
    "Initiating self-repair sequence...",
    "Searching alternate multiverse branches...",
    "404: Content has been consumed by a black hole"
  ]
  
  // Add messages gradually with a typewriter effect
  useEffect(() => {
    if (messages.length < 5) {
      const randomIndex = Math.floor(Math.random() * errorMessages.length)
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, errorMessages[randomIndex]])
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [messages])
  
  // Countdown timer
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [counter])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-base-200/50 backdrop-blur-lg border border-base-300/30 rounded-2xl p-8 md:p-12 shadow-xl max-w-xl"
        >
          {/* Animated CPU icon */}
          <motion.div 
            animate={{ 
              rotateZ: [0, 180, 360],
              boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.5)", "0 0 0px rgba(59, 130, 246, 0)"]
            }}
            transition={{ 
              rotateZ: { duration: 10, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
            }}
            className="mx-auto mb-6 bg-base-300/50 p-4 rounded-full"
          >
            <Cpu size={48} className="text-primary" />
          </motion.div>
          
          <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          
          <div className="bg-base-300/30 rounded-lg p-4 mb-6 font-mono text-sm text-left h-[120px] overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-blue-500"
            >
              &#62; AI assistant rebooting...
            </motion.div>
            {messages.map((message, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.7 }}
                className={i % 2 === 0 ? "text-red-400" : "text-green-400"}
              >
                &#62; {message}
              </motion.div>
            ))}
          </div>
          
          <p className="text-base-content/80 mb-6">
            The page you're looking for has wandered off into a parallel dimension. Our AI is working on retrieving it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary rounded-full px-6"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </motion.button>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline rounded-full px-6"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>
          
          {counter > 0 && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-base-content/60"
            >
              Redirecting to home in {counter} seconds...
            </motion.p>
          )}
        </motion.div>
        
        {/* Decorative floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-500/30"
            initial={{ 
              x: Math.random() * 600 - 300, 
              y: Math.random() * 600 - 300, 
              scale: Math.random() * 0.5 + 0.5 
            }}
            animate={{ 
              x: Math.random() * 600 - 300, 
              y: Math.random() * 600 - 300,
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 10 + 10,
              opacity: { duration: Math.random() * 2 + 1, repeatType: "reverse", repeat: Infinity }
            }}
            style={{ zIndex: -1 }}
          />
        ))}
      </div>
    </div>
  )
}

// Auto-redirect to home after 5 seconds
export function generateMetadata() {
  return {
    title: '404 - Page Not Found | Minh\'s Space',
    description: 'The page you are looking for does not exist or has been moved.'
  }
}
