import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Fira_Code, Source_Code_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import ClientLayout from '../components/ClientLayout'
import './globals.css'
import '../styles/colors.css'
import '../styles/theme.css'
import '../styles/animations.css'

// Define the fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// Define tech-focused fonts
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700'],
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
})

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
})

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} - ${process.env.NEXT_PUBLIC_SITE_DESCRIPTION}`,
  description: process.env.NEXT_PUBLIC_SITE_FULL_DESCRIPTION || 'Personal blog and portfolio website',
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
      className={`${inter.className} ${jetbrainsMono.variable} ${firaCode.variable} ${sourceCodePro.variable}`}
    >
      <body className={`${inter.className} bg-white dark:bg-slate-900`}>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  )
} 