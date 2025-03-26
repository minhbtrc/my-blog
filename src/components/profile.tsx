'use client'

import { motion } from 'framer-motion'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'
import Link from 'next/link'
import Image from 'next/image'

export default function Profile() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col gap-8 p-8 bg-base-200 rounded-xl shadow-lg border border-base-300/50"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-base-300 shadow-lg mb-4">
          <Image 
            src="/profile1.jpeg" 
            alt="Minh BTC" 
            width={96} 
            height={96}
            className="w-full h-full object-cover"
            style={{ borderRadius: '50%' }}
          />
        </div>
        <h2 className="text-2xl font-bold mb-2">minhbtc</h2>
        <p className="text-base-content/60 text-lg">AI Engineer</p>
      </div>
      
      <div className="section-spacing">
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="badge badge-primary bg-base-300/50 text-base-content/80">AI/LLM/NLP</span>
          <span className="badge badge-primary bg-base-300/50 text-base-content/80">Agents</span>
          <span className="badge badge-primary bg-base-300/50 text-base-content/80">RAG</span>
          <span className="badge badge-primary bg-base-300/50 text-base-content/80">Insights</span>
          <span className="badge badge-primary bg-base-300/50 text-base-content/80">Tech</span>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="https://github.com/minhbtrc"
            target="_blank"
            className="text-base-content/60 hover:text-base-content transition-colors"
          >
            <SiGithub className="w-6 h-6" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/minhbtcm00/"
            target="_blank"
            className="text-base-content/60 hover:text-base-content transition-colors"
          >
            <SiLinkedin className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
} 