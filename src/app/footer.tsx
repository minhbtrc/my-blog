'use client'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

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
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">MinhBTC</h3>
            <p className="text-base-content/80 text-sm leading-relaxed">
              A personal blog about AI, machine learning, and software development.
              Sharing insights, tutorials, and thoughts on the latest advancements in technology.
            </p>
            <div className="flex gap-3 pt-2">
              <motion.a 
                href={process.env.NEXT_PUBLIC_GITHUB_URL || ""} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm bg-base-300/50 border-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a 
                href={process.env.NEXT_PUBLIC_LINKEDIN_URL || ""} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm bg-base-300/50 border-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              {process.env.NEXT_PUBLIC_HUGGINGFACE_URL && (
                <motion.a 
                  href={process.env.NEXT_PUBLIC_HUGGINGFACE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm bg-base-300/50 border-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg viewBox="0 0 95 88" fill="currentColor" className="w-4 h-4">
                    <path d="M47.2119 0C26.7279 0 10.1255 16.7482 10.1255 37.4223C10.1255 43.5567 11.8306 49.2766 14.8211 54.2455L0 86.5839H25.5591L32.2099 69.608C36.9538 71.6223 41.9637 72.8446 47.2119 72.8446C67.696 72.8446 84.2984 56.0964 84.2984 35.4223C84.2984 15.8304 67.696 0 47.2119 0ZM26.1682 47.4522C22.1547 47.4522 18.8905 44.1879 18.8905 40.1744C18.8905 36.1608 22.1547 32.8966 26.1682 32.8966C30.1817 32.8966 33.446 36.1608 33.446 40.1744C33.446 44.1879 30.1817 47.4522 26.1682 47.4522ZM47.2119 39.2589C50.2204 39.2589 52.6591 36.8201 52.6591 33.8117C52.6591 30.8033 50.2204 28.3645 47.2119 28.3645C44.2035 28.3645 41.7647 30.8033 41.7647 33.8117C41.7647 36.8201 44.2035 39.2589 47.2119 39.2589ZM68.2557 47.4522C64.2422 47.4522 60.9779 44.1879 60.9779 40.1744C60.9779 36.1608 64.2422 32.8966 68.2557 32.8966C72.2692 32.8966 75.5334 36.1608 75.5334 40.1744C75.5334 44.1879 72.2692 47.4522 68.2557 47.4522Z" />
                  </svg>
                </motion.a>
              )}
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
                      <span>
                        Subscribe
                      </span>
                    )}
                  </motion.button>
                </div>
                <p className="text-xs text-base-content/50 mt-2">
                  Your privacy matters. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <motion.div 
                className="bg-success/10 rounded-lg p-4 flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>
                  Thanks for subscribing! You&apos;ll receive updates about new content and announcements.
                </span>
              </motion.div>
            )}
          </div>
        </div>

        <div className="border-t border-base-300/30 mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-base-content/60">
            © {new Date().getFullYear()} MinhBTC. All rights reserved.
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