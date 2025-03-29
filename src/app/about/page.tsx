import dynamic from 'next/dynamic'

const AboutContent = dynamic(() => import('@/components/about-content'), {
  ssr: true
})

export default function AboutPage() {
  return <AboutContent />
} 