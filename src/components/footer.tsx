'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'

export default function Footer() {
  const [year] = useState(new Date().getFullYear())
  
  return (
    <footer className="w-full py-12 border-t border-slate-200 dark:border-slate-800 relative z-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Me</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              AI Engineer specializing in LLMs, RAG systems, and agents. I write about AI engineering, NLP, and software development.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/minhbtrc" 
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
                style={{ position: 'relative', zIndex: 50 }}
              >
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a 
                href="https://linkedin.com/in/minhbtcm00" 
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
                style={{ position: 'relative', zIndex: 50 }}
              >
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a 
                href="mailto:contact@minhbtc.blog"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
                style={{ position: 'relative', zIndex: 50 }}
              >
                <Mail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/blog"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 flex items-center cursor-pointer"
                  style={{ position: 'relative', zIndex: 50 }}
                >
                  <ArrowRight className="w-4 h-4 mr-1" />
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 flex items-center cursor-pointer"
                  style={{ position: 'relative', zIndex: 50 }}
                >
                  <ArrowRight className="w-4 h-4 mr-1" />
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 flex items-center cursor-pointer"
                  style={{ position: 'relative', zIndex: 50 }}
                >
                  <ArrowRight className="w-4 h-4 mr-1" />
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/resume"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 flex items-center cursor-pointer"
                  style={{ position: 'relative', zIndex: 50 }}
                >
                  <ArrowRight className="w-4 h-4 mr-1" />
                  Resume
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Copyright at the bottom */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-600 dark:text-slate-400">
            <p>
              © {year} MinhBTC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 