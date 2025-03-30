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
            alt="MinhBTC" 
            width={32} 
            height={32}
            className="w-full h-full object-cover"
            style={{ borderRadius: '50%' }}
            unoptimized
            priority
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
          href={process.env.NEXT_PUBLIC_GITHUB_URL || ""}
          target="_blank"
        >
          <SiGithub className="w-4 h-4" />
          <span className="grow text-left">GitHub</span>
          <ArrowUpRight className="w-4 h-4 hidden group-hover:flex animate-pop-in" />
        </Link>
        <Link
          className="btn btn-ghost btn-sm flex flex-row gap-4 justify-start items-center font-normal group"
          href={process.env.NEXT_PUBLIC_LINKEDIN_URL || ""}
          target="_blank"
        >
          <SiLinkedin className="w-4 h-4" />
          <span className="grow text-left">LinkedIn</span>
          <ArrowUpRight className="w-4 h-4 hidden group-hover:flex animate-pop-in" />
        </Link>
        {process.env.NEXT_PUBLIC_HUGGINGFACE_URL && (
          <Link
            className="btn btn-ghost btn-sm flex flex-row gap-4 justify-start items-center font-normal group"
            href={process.env.NEXT_PUBLIC_HUGGINGFACE_URL}
            target="_blank"
          >
            <svg viewBox="0 0 95 88" fill="currentColor" className="w-4 h-4">
              <path d="M47.2119 0C26.7279 0 10.1255 16.7482 10.1255 37.4223C10.1255 43.5567 11.8306 49.2766 14.8211 54.2455L0 86.5839H25.5591L32.2099 69.608C36.9538 71.6223 41.9637 72.8446 47.2119 72.8446C67.696 72.8446 84.2984 56.0964 84.2984 35.4223C84.2984 15.8304 67.696 0 47.2119 0ZM26.1682 47.4522C22.1547 47.4522 18.8905 44.1879 18.8905 40.1744C18.8905 36.1608 22.1547 32.8966 26.1682 32.8966C30.1817 32.8966 33.446 36.1608 33.446 40.1744C33.446 44.1879 30.1817 47.4522 26.1682 47.4522ZM47.2119 39.2589C50.2204 39.2589 52.6591 36.8201 52.6591 33.8117C52.6591 30.8033 50.2204 28.3645 47.2119 28.3645C44.2035 28.3645 41.7647 30.8033 41.7647 33.8117C41.7647 36.8201 44.2035 39.2589 47.2119 39.2589ZM68.2557 47.4522C64.2422 47.4522 60.9779 44.1879 60.9779 40.1744C60.9779 36.1608 64.2422 32.8966 68.2557 32.8966C72.2692 32.8966 75.5334 36.1608 75.5334 40.1744C75.5334 44.1879 72.2692 47.4522 68.2557 47.4522Z" />
            </svg>
            <span className="grow text-left">HuggingFace</span>
            <ArrowUpRight className="w-4 h-4 hidden group-hover:flex animate-pop-in" />
          </Link>
        )}
      </PopoverPanel>
    </Popover>
  )
}
