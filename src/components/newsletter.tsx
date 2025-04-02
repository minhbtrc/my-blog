'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }
    
    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setMessage('Thank you for subscribing!')
      setEmail('')
    }, 1500)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-xl overflow-hidden relative"
    >
      <div className="relative z-10 p-6 bg-gradient-to-br from-base-200/80 via-base-200/60 to-base-200/80 backdrop-blur-sm border border-base-300/30 rounded-xl">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-bold">Stay Updated</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="relative mt-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full h-10 px-3 rounded-lg bg-base-100/50 border border-base-300/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-sm"
                    disabled={status === 'loading' || status === 'success'}
                  />
                </div>
                
                <button
                  type="submit"
                  className={`h-10 px-4 rounded-lg font-medium text-white text-sm transition-all ${
                    status === 'loading' 
                      ? 'bg-primary/70 cursor-wait' 
                      : status === 'success'
                      ? 'bg-success hover:bg-success/90'
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                  disabled={status === 'loading' || status === 'success'}
                >
                  {status === 'loading' ? 'Subscribing...' : 
                   status === 'success' ? 'Subscribed!' : 'Subscribe'}
                </button>
              </div>
              
              {(status === 'success' || status === 'error') && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-1.5 mt-2 ml-1 text-xs ${
                    status === 'success' ? 'text-success' : 'text-error'
                  }`}
                >
                  {status === 'success' ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  <span>{message}</span>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -z-10 top-0 left-0 right-0 bottom-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-800/10 dark:via-purple-800/10 dark:to-pink-800/10" />
      </div>
    </motion.div>
  )
} 