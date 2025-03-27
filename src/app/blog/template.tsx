'use client'
import { type ReactNode, useState, useEffect } from 'react'
import { useSelectedLayoutSegments } from 'next/navigation'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import ky from 'ky'

import Link from 'next/link'
import {
  CornerDownRight,
  MessageSquareText,
  Play,
} from 'lucide-react'
import { BlogCard } from '@/components/blog'
import Tags from '@/components/tags'
import { FacebookShare, TwitterShare } from './share'
import Navigation from './navigation'

export default function Template({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments()
  const [mounted, setMounted] = useState(false)
  const { data: { tags = [], children: routes = [] } = {} } = useSWR(
    `/api/blog/${segments.join('/')}`,
    async (api: string) => {
      const data = await ky.get(api).json<Blog>()
      return data
    },
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      {mounted && (
        <div className="fixed top-[50%] -translate-y-[50%] left-0 cursor-pointer group z-10 group">
          <div className="flex flex-col transition-all gap-1 group-hover:gap-2 m-1 p-1 group-hover:p-2 group-hover:bg-base-100 group-hover:rounded-box group-hover:shadow-lg group-hover:border-2 group-hover:border-base-300">
            <span className="w-1 h-1 rounded-full transition-all flex group-hover:hidden bg-base-300" />
            <span className="w-1 h-3 rounded-full transition-all flex group-hover:hidden bg-base-300" />
            <span className="w-1 h-1 rounded-full transition-all flex group-hover:hidden bg-base-300" />
            <span className="w-1 h-1 rounded-full transition-all flex group-hover:hidden bg-base-300" />
            <button className="btn btn-square btn-sm transition-all hidden group-hover:flex">
              <Play className="w-4 h-4 fill-base-content" />
            </button>
            <div className="join join-vertical transition-all hidden group-hover:flex">
              <FacebookShare className="join-item" />
              <TwitterShare className="join-item" />
            </div>
            <Link
              className="btn btn-square btn-sm transition-all hidden group-hover:flex"
              href="#question"
            >
              <MessageSquareText className="w-4 h-4" />
            </Link>
            <Link
              className="btn btn-square btn-sm transition-all hidden group-hover:flex"
              href="#suggestion"
            >
              <CornerDownRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
      <motion.article
        className="w-full my-16 prose prose-p:tracking-[-.25px]"
        initial={{ y: 64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="not-prose mb-8 flex flex-col gap-0">
          <Navigation />
          <div className="w-full flex flex-row gap-2 justify-end py-3 border-y border-base-300">
            <FacebookShare />
            <TwitterShare />
            <span className="grow" />
            <motion.button
              className="btn btn-sm rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Play className="w-4 h-4 fill-base-content" />
              Listen to Article
            </motion.button>
          </div>
        </div>
        {tags.length > 0 && (
          <div className="not-prose w-full mb-2">
            <Tags value={tags} />
          </div>
        )}
        {children}
      </motion.article>
      {/*<div*/}
      {/*  id="question"*/}
      {/*  className="w-full max-w-[65ch] bg-base-200 border-2 border-base-300 p-4 rounded-box flex flex-col gap-1"*/}
      {/*>*/}
      {/*  <p className="font-bold">You have questions?</p>*/}
      {/*  <p>*/}
      {/*    <span className="opacity-60">*/}
      {/*      To ask questions, you can create issues on{' '}*/}
      {/*    </span>*/}
      {/*    <Link*/}
      {/*      className="text-info-content hover:underline inline-flex"*/}
      {/*      href="https://github.com/misterbo271"*/}
      {/*      target="_blank"*/}
      {/*    >*/}
      {/*      my GitHub.*/}
      {/*      <ExternalLink className="w-3 h-3" />*/}
      {/*    </Link>*/}
      {/*  </p>*/}
      {/*</div>*/}
      <div
        id="suggestion"
        className="w-full max-w-[65ch] grid grid-cols-12 gap-4"
      >
        {[...routes].reverse().map((route, i) => (
          <motion.div
            key={route}
            className="col-span-full"
            initial={{ y: 8 * (i + 1), opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BlogCard route={route} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
