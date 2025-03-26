'use client'

import { ArrowUp } from 'lucide-react'

export default function ToTop() {
  return (
    <button
      className="btn btn-xs btn-ghost btn-square"
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <ArrowUp className="w-3 h-3" />
    </button>
  )
}
