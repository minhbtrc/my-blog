import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { isProjectReviewEnabled, projectStories, readingMinutes } from '@/data/project-stories'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Project stories | Local review', robots: { index: false, follow: false } }

export default function ProjectReviewPage() {
  if (!isProjectReviewEnabled()) notFound()
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
      <Link href="/blog" className="text-sm text-primary hover:underline">← All blog posts</Link>
      <header className="mb-10 mt-8 border-b border-base-300 pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Local editorial review / {projectStories.length} drafts</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">The stories behind the projects</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-base-content/80">Full engineering walkthroughs for the complete About portfolio: the problem, implementation, design decisions and limits of the available evidence.</p>
        <p className="mt-4 text-sm leading-7 text-base-content/70">These drafts are available only in local development. Existing articles remain intact. Each story ends with specific points for your review before publication.</p>
        <Link href="/about#projects" className="mt-5 inline-block text-sm text-primary hover:underline">View the complete About portfolio →</Link>
      </header>
      <div className="divide-y divide-base-300">
        {projectStories.map((story, index) => <article key={story.slug} className="grid gap-3 py-8 first:pt-0 sm:grid-cols-[3rem_1fr]">
          <span className="font-mono text-sm text-primary">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <p className="mb-2 text-xs text-base-content/60">{story.project} · {readingMinutes(story)} min read · Draft</p>
            <h2 className="text-xl font-semibold leading-8"><Link href={`/blog/review/${story.slug}`} className="hover:text-primary">{story.title}</Link></h2>
            <p className="mt-3 text-sm leading-7 text-base-content/80">{story.summary}</p>
            <p className="mt-3 font-mono text-xs leading-6 text-base-content/60">{story.stack.join(' · ')}</p>
            <Link href={`/blog/review/${story.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">Read draft <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </article>)}
      </div>
    </div>
  )
}
