'use client'

import Link from 'next/link'
import { Github } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Footer() {
  const year = new Date().getFullYear()
  
  return (
    <footer className="w-full border-t border-base-200 py-6 mt-12">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-xs text-base-content/60">
            © {year} DevBlog. All rights reserved.
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-4 text-xs">
            <Link 
              href="/" 
              className="text-base-content/60 hover:text-base-content transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className="text-base-content/60 hover:text-base-content transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="text-base-content/60 hover:text-base-content transition-colors"
            >
              About
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-base-content/60 hover:text-base-content transition-colors flex items-center gap-1"
            >
              <Github className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 