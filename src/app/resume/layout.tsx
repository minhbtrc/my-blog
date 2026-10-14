import type { Metadata } from 'next'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
  title: `CV | ${profile.name}`,
  description: `${profile.title}. Enterprise AI, agentic systems and technical leadership. `,
  robots: { index: false, follow: false, nocache: true },
}

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children
}
