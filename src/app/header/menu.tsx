'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import Link from 'next/link'
import { ArrowUpRight, Mail, Rss } from 'lucide-react'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Image from 'next/image'

export default function Menu() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    return (
      <button className="btn btn-sm btn-circle border-0 border-transparent">
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-base-300">
          {/* Placeholder for unmounted state */}
          <div className="w-full h-full bg-base-300"></div>
        </div>
      </button>
    )
  }
  
  return (
    <Popover>
      <PopoverButton className="btn btn-sm btn-circle border-0 border-transparent">
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-base-300">
          <Image 
            src="/new_profile.png" 
            alt="Minh BTC" 
            width={32} 
            height={32}
            className="w-full h-full object-cover"
            style={{ borderRadius: '50%' }}
          />
        </div>
      </PopoverButton>
      <PopoverPanel
        anchor={{ gap: 5 }}
        className="z-10 flex flex-col p-2 border-2 border-base-300 bg-base-100 rounded-box w-60 shadow-lg animate-pop-in"
      >
        {/* Menu */}
        <motion.span
          className="text-xs font-light opacity-60 mx-3 mb-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
        >
          MENU
        </motion.span>
        <Link
          className="btn btn-ghost btn-sm flex flex-row gap-4 justify-start items-center font-normal"
          href="/"
        >
          <Rss className="w-4 h-4" />
          
          Blog
        </Link>
        {/* About */}
        <motion.span
          className="text-xs font-light opacity-60 mx-3 mb-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
        >
          ABOUT ME
        </motion.span>
        <Link
          className="btn btn-ghost btn-sm flex flex-row gap-4 justify-start items-center font-normal group"
          href="https://github.com/minhbtrc"
          target="_blank"
        >
          <SiGithub className="w-4 h-4" />
          <span className="grow text-left">GitHub</span>
          <ArrowUpRight className="w-4 h-4 hidden group-hover:flex animate-pop-in" />
        </Link>
        <Link
          className="btn btn-ghost btn-sm flex flex-row gap-4 justify-start items-center font-normal group"
          href="https://www.linkedin.com/in/minhbtcm00/"
          target="_blank"
        >
          <SiLinkedin className="w-4 h-4" />
          <span className="grow text-left">LinkedIn</span>
          <ArrowUpRight className="w-4 h-4 hidden group-hover:flex animate-pop-in" />
        </Link>

        <motion.span
          className="text-xs font-light opacity-60 mx-3 mb-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
        >
          CONTACT
        </motion.span>
        
        <Link
          className="btn btn-ghost btn-sm flex flex-row gap-4 justify-start items-center font-normal group"
          href="mailto:minh.btrc@gmail.com"
          target="_blank"
        >
          <Mail className="w-4 h-4" />
          <span className="grow text-left">Contact</span>
          <ArrowUpRight className="w-4 h-4 hidden group-hover:flex animate-pop-in" />
        </Link>
      </PopoverPanel>
    </Popover>
  )
}
