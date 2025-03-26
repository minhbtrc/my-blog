import { type ReactNode } from 'react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { table } from '@/db'

export async function generateMetadata(): Promise<Metadata> {
  const pathname = headers().get('x-forwarded-pathname') || ''
  const { title, image, description } =
    table.find(({ route }) => route === pathname) || {}
  const metadata = { title, description }
  if (image)
    Object.assign(metadata, {
      openGraph: {
        images: [
          {
            url: image,
          },
        ],
      },
    })
  return metadata
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full p-6 flex flex-row justify-center">{children}</div>
  )
}
