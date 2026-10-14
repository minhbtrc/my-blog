import type { Metadata } from 'next'
import AboutContent from '@/components/about-content'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
  title: `About | ${profile.name}`,
  description: profile.intro,
}

export default function About() {
  return <AboutContent />
}
