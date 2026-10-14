import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Shared building blocks for every article on the site (published posts and project stories).
 * Rules live in docs/blog-style-guide.md. Short version: one accent colour, neutral surfaces,
 * DaisyUI tokens only, no emoji, no coloured callouts, no decorative card grids.
 */

export interface PostMeta {
  title: string
  subtitle?: string
  /** Short category line above the title, e.g. "Project notes". */
  kicker?: string
  /** ISO date (2025-11-22) or any human-readable string. */
  date?: string
  readingTime?: string
  tags?: string[]
  author?: string
  status?: string
}

function formatDate(value?: string) {
  if (!value) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function PostHeader({ title, subtitle, kicker, date, readingTime, tags = [], author, status }: PostMeta) {
  const meta = [author, formatDate(date), readingTime, status].filter(Boolean)
  return (
    <header className="post-header">
      {kicker && <p className="post-kicker">{kicker}</p>}
      <h1 className="post-title">{title}</h1>
      {subtitle && <p className="post-subtitle">{subtitle}</p>}
      {meta.length > 0 && <p className="post-meta">{meta.join('  ·  ')}</p>}
      {tags.length > 0 && <p className="post-tags">{tags.join('  ·  ')}</p>}
    </header>
  )
}

/** Summary shown directly under the title. Use for the one-paragraph "what this post is". */
export function Lead({ children }: { children: ReactNode }) {
  return <div className="post-lead">{children}</div>
}

/** Neutral aside. `label` is a short word such as Note, Caution, Trade-off, Evidence boundary. */
export function Callout({ label = 'Note', children }: { label?: string; children: ReactNode }) {
  return (
    <aside className="post-callout">
      <p className="post-callout-label">{label}</p>
      <div>{children}</div>
    </aside>
  )
}

export function CodeBlock({
  children,
  code,
  title,
  language,
}: {
  children?: ReactNode
  code?: string
  title?: string
  language?: string
}) {
  return (
    <figure className="post-code">
      {(title || language) && (
        <figcaption>
          <span>{title}</span>
          <span>{language}</span>
        </figcaption>
      )}
      <pre tabIndex={0}>
        <code>{code ?? children}</code>
      </pre>
    </figure>
  )
}

export function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
}: {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}) {
  return (
    <figure className="post-figure">
      <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 768px) 720px, 100vw" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/** Side by side images (before/after). Each item needs a caption so the comparison is labelled. */
export function FigurePair({ items }: { items: { src: string; alt: string; caption: string; width?: number; height?: number }[] }) {
  return (
    <div className="post-figure-pair">
      {items.map(item => (
        <Figure key={item.src} {...item} />
      ))}
    </div>
  )
}

/** Numbered stages. Replaces ad-hoc flow charts for simple linear pipelines. */
export function Steps({ items, title }: { items: (string | { title: string; text?: string })[]; title?: string }) {
  return (
    <figure className="post-steps">
      {title && <figcaption>{title}</figcaption>}
      <ol>
        {items.map((item, index) => {
          const step = typeof item === 'string' ? { title: item } : item
          return (
            <li key={step.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{step.title}</strong>
                {step.text && <p>{step.text}</p>}
              </div>
            </li>
          )
        })}
      </ol>
    </figure>
  )
}

/** Term / explanation pairs. Replaces the old coloured FeatureGrid cards. */
export function Definitions({ items }: { items: { term: string; text: ReactNode }[] }) {
  return (
    <dl className="post-definitions">
      {items.map(item => (
        <div key={item.term}>
          <dt>{item.term}</dt>
          <dd>{item.text}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Compact comparison table. Use for trade-offs, before/after and option summaries. */
export function Table({ caption, headers, rows }: { caption?: string; headers: string[]; rows: ReactNode[][] }) {
  return (
    <figure className="post-table">
      <div>
        <table>
          <thead>
            <tr>{headers.map(header => <th key={header} scope="col">{header}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, i) => <tr key={i}>{row.map((cell, j) => (j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>))}</tr>)}
          </tbody>
        </table>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export function Pullquote({ children, source }: { children: ReactNode; source?: string }) {
  return (
    <blockquote className="post-quote">
      <div>{children}</div>
      {source && <footer>{source}</footer>}
    </blockquote>
  )
}

export interface Reference {
  label: string
  url: string
  note?: string
}

export function References({ items, title = 'References' }: { items: Reference[]; title?: string }) {
  if (items.length === 0) return null
  return (
    <section className="post-references" aria-labelledby="references-heading">
      <h2 id="references-heading">{title}</h2>
      <ul>
        {items.map(item => (
          <li key={item.url}>
            {item.url.startsWith('/') ? (
              <Link href={item.url}>{item.label}</Link>
            ) : (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            )}
            {item.note && <span> · {item.note}</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function PostFooter({ backHref = '/blog', backLabel = 'All posts' }: { backHref?: string; backLabel?: string }) {
  return (
    <footer className="post-footer">
      <Link href={backHref}>← {backLabel}</Link>
    </footer>
  )
}

export function Article({ children }: { children: ReactNode }) {
  return <article className="post">{children}</article>
}

export function PostBody({ children }: { children: ReactNode }) {
  return <div className="post-prose">{children}</div>
}
