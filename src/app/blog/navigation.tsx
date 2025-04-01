'use client'
import { useMemo } from 'react'
import { useSelectedLayoutSegments } from 'next/navigation'
import useSWR from 'swr'
import ky from 'ky'

import Link from 'next/link'

// Define interface for blog metadata
interface BlogMetadata {
  title?: string;
  description?: string;
  date?: string;
  [key: string]: any;
}

function NavLink({ href }: { href: string }) {
  // Default to empty string for initial render to avoid hydration mismatch
  const { data: name = '' } = useSWR<string>(href, async (api: string) => {
    if (api === '/') return ''
    
    try {
      const data = await ky.get(`/api/${api}`).json<BlogMetadata>()
      return data?.title || ''
    } catch (error) {
      console.error(`Error fetching ${api}:`, error)
      return ''
    }
  }, {
    suspense: false,
    revalidateOnFocus: false
  })
  
  return (
    <Link className="text-emerald-600 dark:text-teal-400 hover:text-emerald-800 dark:hover:text-teal-300 transition-colors" href={href}>
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
    <div className="text-sm">
      <ul className="flex items-center gap-2">
        {routes.map((route, i) => (
          <li key={route} className="flex items-center">
            {i > 0 && <span className="mx-2 text-emerald-400/40 dark:text-teal-600/40">/</span>}
            <NavLink href={route} />
          </li>
        ))}
      </ul>
    </div>
  )
}
