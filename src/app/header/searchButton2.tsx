'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import useKeyboardJs from 'react-use/lib/useKeyboardJs'
import { useAsync } from 'react-use'
import ky from 'ky'
import clsx from 'clsx'
import useSWR from 'swr'

import { Search } from 'lucide-react'
import Modal from '@/components/ui/modal'
import Island from '@/components/island'
import { LiteBlogCard } from '@/components/blog'
import Tags from '@/components/tags'

import { isMac } from '@/lib/utils'
import { useThrottle } from '@/lib/hooks/useThrottle'

function Kbd() {
  return (
    <span className="join opacity-40">
      <kbd className="kbd kbd-xs join-item -ml-[0.375rem]">
        {isMac() ? '⌘' : 'ctrl'}
      </kbd>
      <kbd className="kbd kbd-xs join-item">k</kbd>
    </span>
  )
}

export default function SearchButton2() {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [, e] = useKeyboardJs(isMac() ? 'command + k' : 'ctrl + k')
  const pathname = usePathname()

  const { data: tags = [] } = useSWR('/api/tag', async (api: string) => {
    const data = await ky.get(api).json<string[]>()
    return data
  })

  const q = useThrottle(keyword, 500)
  const { value = [], loading } = useAsync(async () => {
    if (!q || q.length < 3) return []
    const data = await ky.post('/api/blog', { json: { q } }).json<string[]>()
    return data
  }, [q])

  useEffect(() => {
    if (e) setOpen(true)
  }, [e])

  useEffect(() => {
    if (pathname) setOpen(false)
  }, [pathname])

  return (
    <>
      <button className="btn btn-sm rounded-full" onClick={() => setOpen(true)}>
        <Island>
          <Kbd />
        </Island>
        <Search className="w-3 h-3 mr-0" />
      </button>
      <Modal open={open} onCancel={() => setOpen(false)} closable={false}>
        <div className="grid grid-cols-12 gap-y-8 relative">
          <label className="sticky -top-6 z-10 col-span-full -m-6 mb-0 input input-lg rounded-b-none bg-base-200 !border-none !outline-none flex flex-row items-center gap-6">
            <Search className="w-4 h-4" />
            <input
              type="text"
              className="grow text-sm"
              placeholder="Type here to search..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              data-autofocus
            />
            <kbd className="kbd kbd-sm">Esc</kbd>
          </label>
          {/* Loading */}
          <div
            className={clsx('col-span-full flex flex-row justify-center', {
              hidden: !loading,
            })}
          >
            <span className="loading loading-spinner loading-sm" />
          </div>
          {/* Topics */}
          <div
            className={clsx('col-span-full flex flex-col gap-2', {
              hidden: loading,
            })}
          >
            <Tags value={tags} />
          </div>
          {/* Results */}
          <div
            className={clsx('col-span-full grid grid-cols-12 gap-2', {
              hidden: loading || !value.length,
            })}
          >
            <p className="opacity-60 text-sm font-semibold">BLOGS</p>
            {value.map((route) => (
              <div key={route} className="col-span-full">
                <LiteBlogCard route={route} />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  )
}
