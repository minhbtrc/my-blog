import Link from 'next/link'
import Mermaid from '@/components/Mermaid'
import { Article, Callout, CodeBlock, Definitions, Figure, FigurePair, Lead, PostBody, PostFooter, PostHeader, References, Steps, Table } from '@/components/post'
import { readingMinutes, type ProjectStory } from '@/data/project-stories'

/**
 * Renders a project story. Published pages pass no `reviewNotes`; the local review page passes them
 * so open author questions never reach production.
 */
export function StoryArticle({ story, review = false }: { story: ProjectStory; review?: boolean }) {
  return (
    <Article>
      {review && <Link href="/blog/review" className="mb-8 inline-block text-sm text-base-content/70 hover:text-primary">← All project stories</Link>}
      <PostHeader
        kicker="Project notes"
        title={story.title}
        subtitle={story.summary}
        author="Minh Bui"
        date={story.date}
        readingTime={`${readingMinutes(story)} min read`}
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
            {section.definitions && <Definitions items={section.definitions} />}
            {section.steps && <Steps items={section.steps} />}
            {section.diagrams?.map(diagram => <Mermaid key={diagram.caption} chart={diagram.chart} caption={diagram.caption} />)}
            {section.table && <Table {...section.table} />}
            {section.code?.map(block => <CodeBlock key={block.title ?? block.code} title={block.title} language={block.language} code={block.code} />)}
            {section.figures && (section.figures.length > 1 ? <FigurePair items={section.figures} /> : <Figure {...section.figures[0]} />)}
            {section.callout && <Callout label={section.callout.label}><p>{section.callout.text}</p></Callout>}
          </section>
        ))}
        {story.takeaways && story.takeaways.length > 0 && (
          <section className="post-section">
            <h2>Takeaways</h2>
            <ul>{story.takeaways.map(item => <li key={item}>{item}</li>)}</ul>
          </section>
        )}
        {review && (
          <Callout label="Before publication">
            <p>Open author questions for this story. These never appear on the published page. Please confirm:</p>
            <ul className="list-disc space-y-1 pl-5">{story.reviewNotes.map(note => <li key={note}>{note}</li>)}</ul>
          </Callout>
        )}
        <References items={story.sources} title="References" />
      </PostBody>
      <PostFooter />
    </Article>
  )
}
