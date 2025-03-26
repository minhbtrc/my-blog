'use client'
import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

import { AppProgressBar } from 'next-nprogress-bar'
import Message from '@/components/message'

import '@/styles/global.scss'

/**
 * Provider
 */

export default function UiProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider enableSystem>
      {children}
      <AppProgressBar
        color="#0086fc"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Message />
    </ThemeProvider>
  )
}
