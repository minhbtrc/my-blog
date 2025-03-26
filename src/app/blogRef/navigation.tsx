'use client'
import { useMemo } from 'react'
import { useSelectedLayoutSegments } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import useSWR from 'swr'
import ky from 'ky'

import Link from 'next/link'

function NavLink({ href }: { href: string }) {
  const { data: name = '#' } = useSWR(href, async (api: string) => {
    if (api === '/') return 'Blog'
    const data = await ky.get(`/api/${api}`).json<Blog | undefined>()
    return data?.title || '#'
  })
  return (
    <Link className="opacity-60" href={href}>
      {name}
    </Link>
  )
}

export default function Navigation() {
  const segments = useSelectedLayoutSegments()
  const routes = useMemo(
    () => [
      '/',
      ...segments.map((segment, i, segments) =>
        ['/blog', ...segments.slice(0, i), segment].join('/'),
      ),
    ],
    [segments],
  )

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <AnimatePresence>
          {routes.map((route, i) => (
            <motion.li
              key={route}
              initial={{ x: 16 * (i + 1), opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 16 * (i + 1), opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NavLink href={route} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}
