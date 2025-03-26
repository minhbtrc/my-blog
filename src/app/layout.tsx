import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

import UiProvider from '@/providers/ui.provider'

import Header from './header'
import Footer from './footer'

export const metadata: Metadata = {
  title: 'Minh\'s Space | Personal Blog',
  description:
    'minhbtc blog - I write about technology, share my knowledge, talk about life perspectives, history, stories, trips,...',
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST || ''),
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/tokyo-night-dark.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css"
          integrity="sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww"
          crossOrigin="anonymous"
        />
      </head>
      <body className="overflow-x-hidden">
        <UiProvider>
          <main className="w-full min-h-dvh bg-base-100 flex flex-col gap-0 justify-center">
            {/*<nav className="w-64">*/}
            {/*  <Navbar />*/}
            {/*</nav>*/}
            <div className="flex-1 flex flex-col gap-0 justify-center">
            <header className="w-full sticky top-0 z-10">
              <Header />
            </header>
            <section className="w-full grow grid grid-cols-12 gap-0">
              <div className="col-span-full">{children}</div>
            </section>
            <footer className="w-full">
              <Footer />
            </footer>
            </div>
          </main>
        </UiProvider>
      </body>
      <GoogleAnalytics gaId="G-ZYEVZRRV45" />
    </html>
  )
}
