'use client'

import { ArrowUp } from 'lucide-react'

export default function ToTop() {
  return (
    <button
      className="text-slate-400 hover:text-slate-200 transition-colors footer-link"
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  )
}
