import { type ReactNode as _ReactNode } from 'react'
import PageContainer from '@/components/page-container'

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageContainer maxWidth="full" withPadding={false}>
      {children}
    </PageContainer>
  )
} 