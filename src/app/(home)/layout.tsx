import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { type ReactNode as _ReactNode } from 'react';
import '@/app/globals.css';
import PageContainer from '@/components/page-container'

export const metadata: Metadata = {
  title: 'Minh BTC | AI Engineer',
  description: 'AI Engineer showcasing projects and research',
};

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