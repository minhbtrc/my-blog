'use client'

import { useSearchParams } from 'next/navigation'

export function useTag() {
  const params = useSearchParams()
  const tag = params.get('tag') || ''
  return tag
}
