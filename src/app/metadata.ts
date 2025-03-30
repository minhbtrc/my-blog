import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} - ${process.env.NEXT_PUBLIC_SITE_DESCRIPTION}`,
  description: process.env.NEXT_PUBLIC_SITE_FULL_DESCRIPTION || 'Personal blog and portfolio website',
} 