import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import ClientLayout from '../components/ClientLayout'
import dynamic from 'next/dynamic'
import './globals.css'

// Import ParticleBackground with dynamic loading to prevent SSR issues
const ParticleBackground = dynamic(() => import('../components/particle-background'), { 
  ssr: false 
})

// Define the fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Define monospace font
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'MinhBTC - Professional Development Blog',
  description: 'A professional blog focusing on software development and technology.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans">
        <ParticleBackground />
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  )
} 