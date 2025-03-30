'use client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SiGithub } from '@icons-pack/react-simple-icons'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Island from '@/components/island'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ToTop from './totop'
import Link from 'next/link'
import { SiLinkedin, SiGithub as Github } from '@icons-pack/react-simple-icons'
import { Mail, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <div className="w-full px-6 py-6 border-t border-slate-700 flex flex-row gap-2 items-center dark:bg-slate-900 bg-white footer-container">
      <div className="flex-1 text-sm text-gray-500 dark:text-gray-400">
        © 2025 MinhBTC. All rights reserved.
      </div>
      
      <Link href="https://github.com/minhbtc" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
        <Github className="h-5 w-5" />
      </Link>
      <Link href="https://www.linkedin.com/in/minh-bui-tran-cong" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
        <Linkedin className="h-5 w-5" />
      </Link>
      {/* <Link href="mailto:contact@example.com" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
        <Mail className="h-5 w-5" />
      </Link> */}
    </div>
  )
}
