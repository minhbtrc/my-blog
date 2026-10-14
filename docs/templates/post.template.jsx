/**
 * Template for a new blog post. Copy to src/app/blog/<slug>/page.jsx.
 * This file is documentation and is not routed. See docs/blog-style-guide.md.
 */
import { Article, Callout, CodeBlock, Definitions, Figure, Lead, PostBody, PostFooter, PostHeader, References, Steps } from '@/components/post'

export const metadata = {
  title: 'Post title',
  description: 'One sentence that matches the entry in src/db/blogs.json.',
}

export default function Page() {
  return (
    <Article>
      <PostHeader
        title="Post title"
        subtitle="One sentence on what the post covers."
        author="Minh Bui"
        date="2026-01-01"
        readingTime="6 min read"
        tags={['ai', 'python']}
      />
      <PostBody>
        <Lead>
          <p>What this is, what problem it addresses, and what the reader will take away.</p>
        </Lead>

        <h2>Context</h2>
        <p>The situation and the constraint. State only what you observed or built.</p>

        <h2>Approach</h2>
        <Steps
          items={[
            { title: 'First step', text: 'What happens and why.' },
            { title: 'Second step', text: 'What happens and why.' },
          ]}
        />
        <CodeBlock title="src/example.py" language="python">
{`def example():
    return "keep snippets short"`}
        </CodeBlock>

        <h2>Trade-offs</h2>
        <Definitions items={[{ term: 'Option', text: 'Why it was or was not chosen.' }]} />
        <Callout label="Note">
          <p>Use a callout for a caveat or an evidence boundary, not for decoration.</p>
        </Callout>

        <Figure src="/images/<slug>/figure.png" alt="What the image shows" caption="What to notice." width={1200} height={675} />

        <h2>Outcome and next steps</h2>
        <p>What was achieved, what is not yet verified, and what you would measure next.</p>

        <References items={[{ label: 'Official documentation', url: 'https://example.com', note: 'why it is relevant' }]} />
      </PostBody>
      <PostFooter />
    </Article>
  )
}
