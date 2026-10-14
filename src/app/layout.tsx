import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import ClientLayout from '../components/ClientLayout'
import { ThemeProvider } from '@/components/theme-provider'
import { profile } from '@/data/profile'
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
  title: 'MinhBTC - Personal Blog',
  description: profile.intro,
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
      data-theme="light"
    >
      <body className="font-sans">
        <ThemeProvider>
          <ParticleBackground />
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
} 