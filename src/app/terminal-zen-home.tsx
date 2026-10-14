'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Download } from 'lucide-react'
import { profile } from '@/data/profile'

export default function TerminalZenHome() {
  return (
    <div className="relative flex min-h-[78vh] items-center px-5 py-14 sm:px-6 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04]" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="relative mx-auto grid w-full max-w-3xl items-center gap-10 md:grid-cols-[12rem_1fr] md:gap-14">
        <div className="flex flex-col items-center gap-4 md:self-start md:pt-6">
          <Image src="/profile.png" alt={profile.name} width={160} height={160} className="h-32 w-32 rounded-full object-cover shadow-md md:h-40 md:w-40" priority />
          <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs text-primary">Ho Chi Minh City</span>
        </div>
        <div className="min-w-0 text-center md:text-left">
          <p className="mb-4 font-mono text-xs text-primary">minhbtc@ai-eng:~$ whoami</p>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Minh Bui</h1>
          <p className="mt-5 text-xl font-medium leading-8">{profile.title}</p>
          <p className="mt-3 text-base leading-8 text-base-content/70">{profile.intro}</p>
          <p className="mt-5 font-mono text-xs leading-6 text-base-content/70">Agentic AI · Technical leadership · Enterprise delivery</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link href="/about" className="btn btn-primary gap-2 font-medium">Experience & projects <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/resume" className="btn btn-outline gap-2 font-medium"><Download className="h-4 w-4" aria-hidden="true" />View CV</Link>
          </div>
          <Link href="/blog" className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">Read the blog <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </div>
  )
}
