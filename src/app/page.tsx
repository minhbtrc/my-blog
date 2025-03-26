'use client'
import { useCallback, useEffect, useState } from 'react'
import ky from 'ky'
import useSWR from 'swr'
import { motion } from 'framer-motion'
import clsx from 'clsx'

import { BlogCard } from '@/components/blog'
import Tags from '@/components/tags'
import Island from '@/components/island'
import InfiniteLoading from '@/components/infiniteLoading'
import Profile from '@/components/profile'

import { useSignalSwitch } from '@/lib/hooks/useSignal'
import { useTag } from '@/lib/hooks/useTag'

function TagList() {
  const tag = useTag()
  const { data: tags = [] } = useSWR('/api/tag', async (api: string) => {
    const data = await ky.get(api).json<string[]>()
    return data
  }, { 
    revalidateOnFocus: true,
    revalidateOnMount: true,
    dedupingInterval: 0 // Disable deduping to ensure fresh data
  })
  return (
    <Tags className="flex flex-row flex-wrap gap-2" value={tags} active={tag} />
  )
}

function BlogList() {
  const tag = useTag()
  const reset = useSignalSwitch(tag)
  const [{ disabled, blogs }, setData] = useState<{
    disabled: boolean
    blogs: string[]
  }>({ disabled: false, blogs: [] })
  const limit = 10
  const offset = blogs.length

  useEffect(() => {
    // Initial data load
    const loadInitialData = async () => {
      try {
        const data = await ky
          .post('/api/blog', {
            json: {
              t: tag,
              limit,
              offset: 0,
            },
          })
          .json<string[]>();
        
        console.log('Initial blog routes loaded:', data);
        
        if (Array.isArray(data)) {
          setData({
            disabled: data.length < limit,
            blogs: data,
          });
        } else {
          console.error('Blog API did not return an array:', data);
        }
      } catch (error) {
        console.error('Error loading initial blog data:', error);
      }
    };
    
    loadInitialData();
  }, [tag, limit]);

  const onLoad = useCallback(async () => {
    try {
      console.log('Loading more blogs with offset:', offset);
      const data = await ky
        .post('/api/blog', {
          json: {
            t: tag,
            limit,
            offset,
          },
        })
        .json<string[]>()
      
      console.log('Additional blog routes loaded:', data);
      
      if (!Array.isArray(data)) {
        console.error('Blog API did not return an array:', data);
        return;
      }
      
      return setData(({ blogs: [...blogs] }) => {
        data.forEach((item, i) => (blogs[offset + i] = item))
        return { disabled: data.length !== limit, blogs }
      })
    } catch (error) {
      console.error('Error loading more blog data:', error);
    }
  }, [limit, offset, tag, blogs])

  useEffect(() => {
    if (reset) setData({ disabled: false, blogs: [] })
  }, [reset])

  return (
    <>
      {blogs.length > 0 ? (
        blogs.map((route, i) => (
          <motion.div
            key={route}
            className="col-span-full"
            initial={{ y: 8 * (i + 1), opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BlogCard route={route} />
          </motion.div>
        ))
      ) : (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">No blog posts found.</p>
        </div>
      )}
      <div className="col-span-full flex flex-row justify-center">
        <InfiniteLoading onLoad={onLoad} disabled={disabled} />
        <p className={clsx('text-xs', { hidden: !disabled })}>
          <span className="opacity-25">You reached the bottom</span> 🎉
        </p>
      </div>
    </>
  )
}

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center">
      <section className="section">
        <div className="container">
          <div className="grid-layout">
            <div className="content-section text-section">
              <motion.span
                initial={{ x: 16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="font-black font-satoshi text-7xl md:text-8xl leading-tight"
              >
                Blog
              </motion.span>
              <motion.p
                initial={{ x: 32, opacity: 0 }}
                animate={{ x: 0, opacity: 0.6 }}
                transition={{ duration: 0.5 }}
                className="text-lg leading-relaxed"
              >
                Welcome to my digital space! I&apos;m an AI Engineer specializing in LLMs and NLP, with a passion for pushing the boundaries of AI. Here, I share insights on AI, research, and my thoughts on the field.
              </motion.p>
              <Island>
                <TagList />
              </Island>
            </div>
            <div className="content-section profile-section">
              <Island>
                <Profile />
              </Island>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
          <div className="grid grid-cols-12 gap-6">
            <Island>
              <BlogList />
            </Island>
          </div>
        </div>
      </section>
    </div>
  )
}
