'use client'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Github, Linkedin, Mail, Send } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true)
      setLoading(false)
    }, 1000)
  }

  return (
    <footer className="w-full border-t border-base-300/30 bg-base-200/30 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* About */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Minh BTC</h3>
            <p className="text-base-content/80 text-sm leading-relaxed">
              A personal blog focused on AI, machine learning, and software development. 
              Sharing insights, tutorials, and thoughts on the latest advancements in technology.
            </p>
            <div className="flex gap-3 pt-2">
              <motion.a 
                href="https://github.com/username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm bg-base-300/50 border-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm bg-base-300/50 border-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a 
                href="mailto:contact@example.com" 
                className="btn btn-circle btn-sm bg-base-300/50 border-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Navigate</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-base-content/70 hover:text-base-content transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-base-content/70 hover:text-base-content transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-base-content/70 hover:text-base-content transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-sm text-base-content/70 hover:text-base-content transition-colors">
                  Resume
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-base-content/70 hover:text-base-content transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Stay Updated</h3>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <p className="text-sm text-base-content/70 mb-2">
                  Subscribe to get notified about new articles and updates.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="input input-sm bg-base-300/50 border-0 w-full focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <motion.button
                    type="submit"
                    className="btn btn-sm btn-primary px-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-xs" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
                <p className="text-xs text-base-content/50 mt-2">
                  I respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <motion.div 
                className="bg-success/10 rounded-lg p-4 flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-base-content">Thanks for subscribing!</h4>
                  <p className="text-sm text-base-content/70 mt-1">
                    You'll receive updates about new content and announcements.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="border-t border-base-300/30 mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-base-content/60">
            © {new Date().getFullYear()} Minh BTC. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-base-content/60 hover:text-base-content transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-base-content/60 hover:text-base-content transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 