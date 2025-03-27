'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  return (
    <footer className="w-full bg-base-200/50 border-t border-base-300/30">      
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and Tagline */}
          <div className="md:col-span-4">
            <Link href="/">
              <h3 className="font-satoshi font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
                Minh&apos;s Space
              </h3>
            </Link>
            <p className="text-base-content/70 text-sm max-w-md mb-6">
              Exploring AI, machine learning, and software engineering
              through hands-on tutorials and practical insights.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/minhbtrc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-base-content/60 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/minhbtcm00/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-base-content/60 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:contact@minhbtc.blog" 
                className="text-base-content/60 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="md:col-span-2">
            <h4 className="font-medium text-base mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Topics */}
          <div className="md:col-span-3">
            <h4 className="font-medium text-base mb-4">Topics</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog?tag=AI" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/blog?tag=LLM" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Large Language Models
                </Link>
              </li>
              <li>
                <Link href="/blog?tag=Tutorial" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/blog?tag=RAG" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Retrieval Augmented Generation
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter and Legal */}
          <div className="md:col-span-3">
            <div className="mb-6">
              <h4 className="font-medium text-base mb-4">Stay Updated</h4>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full h-10 px-3 rounded-lg bg-base-100/50 border border-base-300/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-sm"
                />
                <button
                  type="button"
                  className="h-10 px-4 rounded-lg font-medium text-white text-sm bg-primary hover:bg-primary/90 transition-all"
                >
                  Subscribe
                </button>
              </div>
            </div>
            
            <h4 className="font-medium text-base mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-base-content/70 hover:text-primary transition-colors text-sm">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-base-300/30 mt-12 pt-8">
          <p className="text-sm text-base-content/60 mb-4 sm:mb-0">
            © {currentYear} MinhBTC. All rights reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-base-300/30 hover:bg-base-300/50 text-base-content/60 hover:text-primary transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
} 