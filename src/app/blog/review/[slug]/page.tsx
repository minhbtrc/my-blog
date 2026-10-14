import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isProjectReviewEnabled, projectStories, readingMinutes } from '@/data/project-stories'
import { Article, Callout, FigurePair, Figure, Lead, PostBody, PostFooter, PostHeader, References, Steps } from '@/components/post'
import Mermaid from '@/components/Mermaid'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Project story | Local draft', robots: { index: false, follow: false } }

export default function ProjectStoryPage({ params }: { params: { slug: string } }) {
  if (!isProjectReviewEnabled()) notFound()
  const story = projectStories.find(item => item.slug === params.slug)
  if (!story) notFound()
  return (
    <Article>
      <Link href="/blog/review" className="mb-8 inline-block text-sm text-base-content/70 hover:text-primary">← All project drafts</Link>
      <PostHeader
        kicker="Project notes"
        title={story.title}
        subtitle={story.summary}
        author="Minh Bui"
        readingTime={`${readingMinutes(story)} min read`}
        status="Unpublished draft"
        tags={story.stack}
      />
      <PostBody>
        <Lead><p>{story.lead}</p></Lead>
        <Steps title="The workflow at a glance" items={story.flow} />
        {story.diagram && <Mermaid chart={story.diagram.chart} caption={story.diagram.caption} />}
        {story.sections.map((section, i) => (
          <section id={`section-${i + 1}`} key={section.title} className="post-section">
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, p) => <p key={p}>{paragraph}</p>)}
            {section.points && <ul>{section.points.map(point => <li key={point}>{point}</li>)}</ul>}
            {section.figures && (section.figures.length > 1 ? <FigurePair items={section.figures} /> : <Figure {...section.figures[0]} />)}
          </section>
        ))}
        <Callout label="Before publication">
          <p>This draft was prepared from the project record and the available implementation. It follows engineering stages and does not assert an exact development chronology. Please confirm:</p>
          <ul className="list-disc space-y-1 pl-5">
            {story.reviewNotes.map(note => <li key={note}>{note}</li>)}
          </ul>
        </Callout>
        <References items={story.sources} title="Project references" />
      </PostBody>
      <PostFooter backHref={`/about#project-${story.slug}`} backLabel="Back to this project in About" />
    </Article>
  )
}
