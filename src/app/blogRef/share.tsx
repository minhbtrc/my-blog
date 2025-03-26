'use client'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import Link from 'next/link'
import { SiFacebook, SiX } from '@icons-pack/react-simple-icons'
import Island from '@/components/island'

const MotionLink = motion(Link)

function ClientFacebookShare({ className = '' }: { className?: string }) {
  const params = new URLSearchParams({
    u: typeof location !== 'undefined' ? location.href : '#',
  }).toString()
  return (
    <MotionLink
      className={clsx('btn btn-circle btn-sm', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      href={`https://www.facebook.com/sharer/sharer.php?${params}`}
      target="_blank"
    >
      <SiFacebook className="h-4 w-4" />
    </MotionLink>
  )
}

export function FacebookShare({ className = '' }: { className?: string }) {
  return (
    <Island>
      <ClientFacebookShare className={className} />
    </Island>
  )
}

function ClientTwitterShare({ className = '' }: { className?: string }) {
  const params = new URLSearchParams({
    url: typeof location !== 'undefined' ? location.href : '#',
  }).toString()
  return (
    <MotionLink
      className={clsx('btn btn-circle btn-sm', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      href={`https://twitter.com/intent/tweet?${params}`}
      target="_blank"
    >
      <SiX className="h-4 w-4" />
    </MotionLink>
  )
}

export function TwitterShare({ className = '' }: { className?: string }) {
  return (
    <Island>
      <ClientTwitterShare className={className} />
    </Island>
  )
}
