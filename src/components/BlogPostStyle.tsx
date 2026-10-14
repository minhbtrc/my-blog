import type { ReactNode } from 'react'
import { Article, Callout, CodeBlock, Definitions, Figure, Lead, PostBody, PostFooter, PostHeader, Pullquote } from '@/components/post'

/**
 * Wrapper used by published posts. It delegates to the shared article system in
 * `@/components/post`; new posts should import from there directly (docs/blog-style-guide.md).
 */
interface BlogPostStyleProps {
  children: ReactNode
  title: string
  subtitle?: string
  date?: string
  readTime?: string
  readingTime?: string
  tags?: string[]
  coverImage?: string | { src: string; alt: string; caption?: string }
  author?: string | { name: string; avatar?: string }
}

export function BlogPostStyle({ children, title, subtitle, date, readTime, readingTime, tags = [], coverImage, author }: BlogPostStyleProps) {
  const cover = typeof coverImage === 'string' ? { src: coverImage, alt: title } : coverImage
  return (
    <Article>
      <PostHeader
        title={title}
        subtitle={subtitle}
        date={date}
        readingTime={readTime ?? readingTime}
        tags={tags}
        author={typeof author === 'string' ? author : author?.name}
      />
      {cover && <Figure src={cover.src} alt={cover.alt} caption={cover.caption} />}
      <PostBody>{children}</PostBody>
      <PostFooter />
    </Article>
  )
}

export function CodeSnippet({ children, code, title, filename, language, caption }: { children?: ReactNode; code?: string; title?: string; filename?: string; language?: string; caption?: string }) {
  return <CodeBlock code={code} title={title ?? filename ?? caption} language={language}>{children}</CodeBlock>
}

export function InfoBox({ children, title, type = 'info' }: { children: ReactNode; title?: string; type?: 'info' | 'warning' | 'tip' | 'success' }) {
  const label = title ?? (type === 'warning' ? 'Caution' : type === 'tip' || type === 'success' ? 'Tip' : 'Note')
  return <Callout label={label}>{children}</Callout>
}

export function ImageWithCaption({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return <Figure src={src} alt={alt} caption={caption} />
}

export function QuoteBlock({ children, author, source }: { children: ReactNode; author?: string; source?: string }) {
  return <Pullquote source={[author, source].filter(Boolean).join(', ') || undefined}>{children}</Pullquote>
}

/** Kept for older posts; renders as a plain definition list rather than coloured cards. */
export function FeatureGrid({ features }: { features: { title: string; description: string }[] }) {
  return <Definitions items={features.map(feature => ({ term: feature.title, text: feature.description }))} />
}

export function StorySection({ children }: { children: ReactNode }) {
  return <Lead>{children}</Lead>
}

export function PersonalNote({ children }: { children: ReactNode }) {
  return <Callout label="Note">{children}</Callout>
}

export function TLDR({ children }: { children: ReactNode }) {
  return <Callout label="Summary">{children}</Callout>
}

