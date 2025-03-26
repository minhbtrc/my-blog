'use client'

import { useState, useEffect } from 'react'
import SearchButton from './searchButton'
import PlayButton from './playButton'
import Menu from './menu'
import Theme from '@/app/footer/theme'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  return (
    <div className="w-full px-6 py-3 bg-base-100/80 border-b-2 border-base-300 flex flex-row gap-4 items-center backdrop-blur">
      <Link href={'/'}>
        <motion.div 
          className="font-satoshi text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ 
            textShadow: "0 0 8px rgba(59, 130, 246, 0.5)", 
          }}
        >
          Minh&apos;s Space
        </motion.div>
      </Link>
      {isMounted && <SearchButton />}
      <span className="grow" />
      {isMounted && <PlayButton />}
      {isMounted && <Theme />}
      {isMounted && <Menu />}
    </div>
  )
}
