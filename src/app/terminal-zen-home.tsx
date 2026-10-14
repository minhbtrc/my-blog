'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Github, Linkedin } from 'lucide-react'
import { profile } from '@/data/profile'

const reveal = (i: number) => ({ animationDelay: `${i * 90}ms`, animationFillMode: 'backwards' as const })

export default function TerminalZenHome() {
  return (
    <div className="relative flex min-h-[80vh] items-center overflow-hidden px-5 py-14 sm:px-6 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04]" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-primary/[0.07]" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-4xl items-center gap-10 md:grid-cols-[13rem_1fr] md:gap-16">
        <div className="flex flex-col items-center gap-4 animate-fade-up motion-reduce:animate-none md:self-start md:pt-8" style={reveal(0)}>
          <div className="rounded-full p-1.5 ring-1 ring-primary/40">
            <Image src="/profile.png" alt={profile.name} width={176} height={176} className="h-36 w-36 rounded-full object-cover shadow-lg md:h-44 md:w-44" priority />
          </div>
          <span className="rounded-full border border-base-300 px-3 py-1 font-mono text-xs text-base-content/70"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" aria-hidden="true" />Ho Chi Minh City</span>
        </div>

        <div className="min-w-0 text-center md:text-left">
          <p className="mb-5 font-mono text-xs text-primary animate-fade-up motion-reduce:animate-none" style={reveal(1)}>minhbtc@ai-eng:~$ whoami</p>
          <h1 className="animate-fade-up text-6xl leading-[0.95] tracking-tighter motion-reduce:animate-none sm:text-8xl" style={reveal(2)}>
            <span className="font-light">Minh</span>{' '}
            <span className="relative font-bold text-primary">
              Bui
              <span className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded bg-primary/70" aria-hidden="true" />
            </span>
            <span className="ml-2 inline-block h-[0.7em] w-[0.08em] translate-y-[0.03em] animate-blink bg-base-content/70 motion-reduce:animate-none" aria-hidden="true" />
          </h1>
          <p className="mt-8 animate-fade-up font-mono text-xs uppercase tracking-[0.14em] sm:text-sm text-base-content/60 motion-reduce:animate-none" style={reveal(3)}>{profile.title}</p>
          <p className="mx-auto mt-4 max-w-xl animate-fade-up text-xl leading-9 text-base-content/75 motion-reduce:animate-none md:mx-0" style={reveal(4)}>
            I build AI systems for <span className="font-medium text-base-content">document-heavy workflows</span>, from <span className="font-medium text-base-content">retrieval and agent orchestration</span> to <span className="font-medium text-base-content">enterprise integration</span> and product delivery.
          </p>

          <dl className="mt-8 grid animate-fade-up grid-cols-3 gap-4 border-y border-base-300 py-4 text-left motion-reduce:animate-none" style={reveal(5)}>
            {profile.highlights.map((h: { value: string; label: string }) => (
              <div key={h.label}>
                <dt className="text-lg font-semibold tracking-tight text-base-content sm:text-2xl">{h.value}</dt>
                <dd className="mt-1 text-xs leading-5 text-base-content/60">{h.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center justify-center gap-3 motion-reduce:animate-none md:justify-start" style={reveal(6)}>
            <Link href="/about" className="btn btn-primary gap-2 font-medium">Experience &amp; projects <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/blog" className="btn btn-outline gap-2 font-medium">Read the blog <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="btn btn-ghost btn-square"><Github className="h-5 w-5" aria-hidden="true" /></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="btn btn-ghost btn-square"><Linkedin className="h-5 w-5" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}
