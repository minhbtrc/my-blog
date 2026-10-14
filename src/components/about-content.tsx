import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Github, Linkedin, MapPin } from 'lucide-react'
import { profile } from '@/data/profile'
import { experiences } from '@/data/experiences'
import { projects } from '@/data/projects'
import { education } from '@/data/education'
import { skillCategories } from '@/data/skills'
import { certificates } from '@/data/certificates'
import ResumeGenerator from './ResumeGenerator'

const sections = ['Experience', 'Projects', 'Expertise', 'Education', 'Learning']

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section id={title.toLowerCase()} aria-labelledby={`${title.toLowerCase()}-heading`} className="scroll-mt-24 border-t border-base-300 pt-8 sm:pt-10">
      <h2 id={`${title.toLowerCase()}-heading`} className="mb-7 font-mono text-sm font-medium uppercase tracking-widest text-primary">{title}</h2>
      {children}
    </section>
  )
}

function Points({ items }: { items: string[] }) {
  if (!items.length) return null
  return <ul className="list-outside list-disc space-y-2 pl-5 text-sm leading-7 text-base-content/80 marker:text-primary/60">{items.map(point => <li key={point}>{point}</li>)}</ul>
}

export default function AboutContent() {
  return (
    <div className="mx-auto max-w-3xl space-y-12 py-10 sm:space-y-16 sm:py-16">
      <header>
        <div className="flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:gap-8">
          <div className="min-w-0">
            <p className="mb-3 font-mono text-xs tracking-wide text-primary">About / MinhBTC</p>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{profile.name}</h1>
            <p className="mt-3 text-lg font-medium">{profile.title}</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-base-content/70"><MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />{profile.location}</p>
          </div>
          <Image src="/profile.png" alt={profile.name} width={96} height={96} className="h-20 w-20 shrink-0 rounded-full object-cover sm:h-24 sm:w-24" priority />
        </div>
        <p className="mt-7 text-base leading-8 text-base-content/80">{profile.summary}</p>
        <div className="mt-7"><ResumeGenerator /></div>
        <div className="mt-5 flex flex-wrap gap-5 text-sm text-base-content/70">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary"><Github className="h-4 w-4" aria-hidden="true" />GitHub<span className="sr-only"> (opens in a new tab)</span></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary"><Linkedin className="h-4 w-4" aria-hidden="true" />LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
          <Link href="/contact" className="inline-flex items-center gap-1 hover:text-primary">Get in touch <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <dl className="mt-9 grid gap-5 border-y border-base-300 py-6 sm:grid-cols-3 sm:gap-8">
          {profile.highlights.map(item => <div key={item.label}><dt className="text-xs leading-5 text-base-content/70">{item.label}</dt><dd className="mt-1 text-xl font-semibold tracking-tight">{item.value}</dd></div>)}
        </dl>
        <nav aria-label="Profile sections" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-base-content/70">
          {sections.map(s => <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-primary">{s}</a>)}
        </nav>
      </header>

      <Section title="Experience">
        <div className="space-y-10">
          {experiences.map(company => <article key={company.company} className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">{company.company}</h3>
            {company.positions.map(position => <div key={`${position.title}-${position.period}`} className="space-y-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-medium">{position.title}</p>
                <p className="font-mono text-xs text-base-content/70">{position.period}</p>
              </div>
              {position.description && <p className="text-sm leading-7 text-base-content/80">{position.description}</p>}
              <Points items={position.points} />
              {position.sections?.map(group => <div key={group.title} className="space-y-3 border-l border-base-300 pl-4 sm:pl-5">
                <h4 className="text-sm font-semibold leading-6">{group.title}</h4>
                <Points items={group.points} />
              </div>)}
            </div>)}
          </article>)}
        </div>
      </Section>

      <Section title="Projects">
        <p className="mb-7 text-sm leading-7 text-base-content/70">Current work and earlier projects, from Vietnamese NLP to agent workflows and product development.</p>
        <nav aria-label="Project directory" className="mb-8 grid gap-3 sm:grid-cols-2">{projects.map(project => <a key={project.slug} href={`#project-${project.slug}`} className="rounded border border-base-300 px-4 py-3 text-sm hover:border-primary hover:text-primary">{project.title}</a>)}</nav>
        <div className="space-y-8">
          {projects.map(project => <article id={`project-${project.slug}`} key={project.title} className="scroll-mt-24 rounded-lg border border-base-300 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              {project.status && <span className="rounded border border-base-300 px-2 py-1 font-mono text-xs text-base-content/70">{project.status}</span>}
            </div>
            <p className="mt-2 text-sm leading-7 text-base-content/80">{project.description}</p>
            <p className="mb-5 mt-3 font-mono text-xs leading-6 text-primary">{project.tags.join(' · ')}</p>
            <Points items={project.points || []} />
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
              <Link href={`/blog/${project.slug}`} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">Read the article <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
              {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">{project.url.startsWith('https://github.com/') ? 'View source' : 'Visit project'} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
            </div>
          </article>)}
        </div>
      </Section>

      <Section title="Expertise">
        <dl className="space-y-6">{skillCategories.map(category => <div key={category.title} className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-6"><dt className="text-sm font-semibold">{category.title}</dt><dd className="text-sm leading-7 text-base-content/80">{category.skills.join(' · ')}</dd></div>)}</dl>
      </Section>

      <Section title="Education">
        <div className="space-y-6">{education.map(edu => <article key={edu.title} className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-6"><div><h3 className="font-semibold">{edu.title}</h3><p className="mt-1 text-sm leading-6 text-base-content/70">{edu.institution}</p>{edu.description && <p className="mt-2 text-sm leading-7 text-base-content/80">{edu.description}</p>}{edu.subjects.length > 0 && <p className="mt-2 text-xs leading-6 text-base-content/70">{edu.subjects.join(" · ")}</p>}</div><p className="shrink-0 font-mono text-xs leading-6 text-base-content/70">{edu.period}</p></article>)}</div>
      </Section>

      <Section title="Learning">
        <ul className="divide-y divide-base-300">{certificates.map(cert => <li key={cert.name} className="py-4 first:pt-0"><a href={cert.url} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-5"><div><h3 className="text-sm font-medium leading-6 group-hover:text-primary">{cert.name}</h3><p className="mt-1 text-xs leading-5 text-base-content/70">{cert.issuer} · {cert.date}</p></div><ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-base-content/60 group-hover:text-primary" aria-hidden="true" /><span className="sr-only">Credential (opens in a new tab)</span></a></li>)}</ul>
      </Section>
    </div>
  )
}
