import Image from 'next/image'
import Link from 'next/link'
import ResumeGenerator from '@/components/ResumeGenerator'
import { profile } from '@/data/profile'

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-6 sm:py-16">
      <p className="font-mono text-xs tracking-wide text-primary">Curriculum vitae</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{profile.name}</h1>
      <p className="mt-3 text-lg">{profile.title}</p>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-base-content/80">{profile.intro}</p>
      <p className="mb-6 mt-4 font-mono text-xs leading-6 text-base-content/70">English · {profile.resume.pages} pages · PDF · Updated <time dateTime={profile.resume.updated}>{new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(profile.resume.updated))}</time></p>
      <ResumeGenerator />
      <figure className="mt-10">
        <a href={profile.resume.url} target="_blank" rel="noopener noreferrer" aria-label="Open the complete CV PDF in a new tab" className="block overflow-hidden rounded-md border border-base-300 shadow-sm">
          <Image src="/resume/preview.png" alt="First page of Minh Bui Tran Cong’s CV, showing enterprise AI experience and technical leadership at FPT Software AI Center" width={849} height={1201} className="h-auto w-full" priority />
        </a>
        <figcaption className="mt-3 text-xs leading-6 text-base-content/70">Page 1 of {profile.resume.pages}. <a className="text-primary hover:underline" href={profile.resume.url} target="_blank" rel="noopener noreferrer">Open the full PDF<span className="sr-only"> (opens in a new tab)</span></a> or <Link href="/about" className="text-primary hover:underline">read the profile online</Link>.</figcaption>
      </figure>
    </div>
  )
}
