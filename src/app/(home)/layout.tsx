import { type ReactNode } from 'react'
import PageContainer from '@/components/page-container'

export default function HomeLayout({
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