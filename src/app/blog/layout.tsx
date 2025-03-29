import { type ReactNode } from 'react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

export async function generateMetadata(): Promise<Metadata> {
  // Simple default metadata
  return {
    title: 'Blog - AI Development Insights',
    description: 'Articles about AI, machine learning, and development'
  }
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
