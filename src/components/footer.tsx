'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowUp, 
  Code, 
  Bot, 
  BookOpen, 
  Coffee 
} from 'lucide-react'

export default function Footer() {
  const [hovered, setHovered] = useState<string | null>(null)
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const socialLinks = [
    { 
      icon: <Github className="w-5 h-5" />, 
      href: 'https://github.com/minhbtc', 
      label: 'GitHub',
      color: 'hover:text-[#333]'
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      href: 'https://linkedin.com/in/minhbtc', 
      label: 'LinkedIn',
      color: 'hover:text-[#0077B5]'
    },
    { 
      icon: <Twitter className="w-5 h-5" />, 
      href: 'https://twitter.com/minhbtc', 
      label: 'Twitter',
      color: 'hover:text-[#1DA1F2]'
    },
    { 
      icon: <Mail className="w-5 h-5" />, 
      href: 'mailto:contact@minhbtc.com', 
      label: 'Email',
      color: 'hover:text-primary'
    }
  ]
  
  const footerLinks = [
    {
      title: 'Content',
      icon: <BookOpen className="w-4 h-4 mr-2" />,
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Topics',
      icon: <Code className="w-4 h-4 mr-2" />,
      links: [
        { label: 'AI', href: '/?tag=ai' },
        { label: 'Machine Learning', href: '/?tag=machine-learning' },
        { label: 'LangChain', href: '/?tag=langchain' },
        { label: 'Privacy', href: '/?tag=privacy' }
      ]
    },
    {
      title: 'Resources',
      icon: <Bot className="w-4 h-4 mr-2" />,
      links: [
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Projects', href: '/projects' },
        { label: 'Privacy Policy', href: '/privacy' }
      ]
    }
  ]
  
  return (
    <footer className="w-full bg-base-200 border-t border-base-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Branding & Social */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="font-mono text-xl font-bold inline-flex items-center">
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                minh.btc
              </span>
              <span className="animate-pulse ml-1">_</span>
            </Link>
            
            <p className="text-base-content/70 text-sm mt-2 max-w-md">
              AI Engineer exploring the boundaries of artificial intelligence, privacy, and ethical development.
              I write about my journey and share insights on cutting-edge technologies.
            </p>
            
            <div className="flex space-x-3 mt-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-base-300/50 ${link.color} transition-colors relative group`}
                  whileHover={{ y: -3 }}
                  onMouseEnter={() => setHovered(link.label)}
                  onMouseLeave={() => setHovered(null)}
                  aria-label={link.label}
                >
                  {link.icon}
                  {hovered === link.label && (
                    <motion.span
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-base-300 text-base-content px-2 py-1 rounded text-xs whitespace-nowrap"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                    >
                      {link.label}
                    </motion.span>
                  )}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Footer Links */}
          {footerLinks.map((section, i) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-medium text-base-content flex items-center">
                {section.icon}
                {section.title}
              </h4>
              <nav className="flex flex-col space-y-2">
                {section.links.map((link, j) => (
                  <motion.div key={link.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + j * 0.05 }}>
                    <Link 
                      href={link.href}
                      className="text-base-content/70 text-sm hover:text-primary transition-colors inline-flex items-center"
                    >
                      <span className="mr-1 opacity-0 group-hover:opacity-100">›</span> 
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-base-300 py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-base-content/60 mb-4 md:mb-0">
            © {new Date().getFullYear()} Minh BTC. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <Link href="/feed.xml" className="text-xs text-base-content/60 hover:text-primary flex items-center">
              <Code className="w-3 h-3 mr-1" />
              RSS Feed
            </Link>
            
            <button 
              onClick={scrollToTop}
              className="p-2 rounded-full bg-base-300/50 hover:bg-primary/20 hover:text-primary transition-colors text-base-content/70"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            
            <Link 
              href="https://ko-fi.com/minhbtc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs bg-[#29abe0]/10 hover:bg-[#29abe0]/20 text-[#29abe0] px-3 py-1.5 rounded-full transition-colors"
            >
              <Coffee className="w-3 h-3 mr-1.5" />
              Buy me a coffee
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 