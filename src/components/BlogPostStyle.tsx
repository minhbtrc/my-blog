'use client'

import React, { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark } from 'lucide-react'
import { motion } from 'framer-motion'

interface BlogPostStyleProps {
  children: ReactNode
  title: string
  date: string
  readTime: string
  tags: string[]
  coverImage?: string | {
    src: string
    alt: string
    caption?: string
  }
  author?: {
    name: string
    avatar: string
  }
}

export function BlogPostStyle({
  children,
  title,
  date,
  readTime,
  tags,
  coverImage,
  author
}: BlogPostStyleProps) {
  const coverImageSrc = typeof coverImage === 'string' ? coverImage : coverImage?.src
  const coverImageAlt = typeof coverImage === 'string' ? title : coverImage?.alt || title
  const coverImageCaption = typeof coverImage === 'string' ? undefined : coverImage?.caption

  return (
    <motion.article
      className="max-w-3xl mx-auto px-4 py-12 md:py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Back Link */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>
      </motion.div>

      {/* Header */}
      <header className="mb-12 space-y-6">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono pt-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
            <span className="text-muted-foreground/30">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
            {author && (
              <>
                <span className="text-muted-foreground/30">•</span>
                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>{author.name}</span>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Cover Image */}
        {coverImageSrc && (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-muted/30">
              <Image
                src={coverImageSrc}
                alt={coverImageAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
            {coverImageCaption && (
              <p className="text-center text-sm text-muted-foreground font-mono">
                {coverImageCaption}
              </p>
            )}
          </motion.div>
        )}
      </header>

      {/* Content */}
      <motion.div
        className="blog-content prose prose-neutral dark:prose-invert max-w-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {children}
      </motion.div>

      {/* Footer / Share */}
      <motion.div
        className="mt-16 pt-8 border-t border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Thanks for reading!
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

export function CodeSnippet({ code, language = 'bash', filename }: { code: string, language?: string, filename?: string }) {
  return (
    <div className="my-8 rounded-lg overflow-hidden border border-border bg-card">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
          <span className="text-xs font-mono text-muted-foreground">{filename}</span>
          <span className="text-xs font-mono text-muted-foreground uppercase">{language}</span>
        </div>
      )}
      <div className="p-4 overflow-x-auto bg-card">
        <pre className="font-mono text-sm text-card-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

export function InfoBox({ children, type = 'info' }: { children: ReactNode, type?: 'info' | 'warning' | 'tip' }) {
  const styles = {
    info: 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
    warning: 'bg-yellow-50/50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300',
    tip: 'bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300'
  }

  return (
    <div className={`my-8 p-4 rounded-lg border ${styles[type]} text-sm leading-relaxed`}>
      {children}
    </div>
  )
}

export function ImageWithCaption({ src, alt, caption }: { src: string, alt: string, caption?: string }) {
  return (
    <figure className="my-10">
      <div className="relative rounded-xl overflow-hidden border border-border/50 bg-muted/30">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={675}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground font-mono">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function QuoteBlock({ children, author }: { children: ReactNode, author?: string }) {
  return (
    <blockquote className="my-10 pl-6 border-l-4 border-primary/20 italic">
      <div className="text-xl text-muted-foreground font-serif leading-relaxed">
        "{children}"
      </div>
      {author && (
        <footer className="mt-2 text-sm font-bold text-foreground not-italic">
          — {author}
        </footer>
      )}
    </blockquote>
  )
}

export function FeatureGrid({ features }: { features: { title: string, description: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
      {features.map((feature, index) => (
        <div
          key={index}
          className="p-6 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors"
        >
          <h3 className="text-lg font-bold text-foreground mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  )
}

// Add global style to extend the article-content styles from globals.css
export const blogStyles = `
  /* These styles will be applied to any blog content */
  .blog-content h2 {
    @apply text-3xl font-bold mt-16 mb-6 text-foreground border-b-2 border-border pb-2 tracking-tight;
  }
  
  .blog-content h3 {
    @apply text-2xl font-bold mt-12 mb-4 text-foreground tracking-tight;
  }
  
  .blog-content h4 {
    @apply text-xl font-bold mt-8 mb-3 text-foreground tracking-tight;
  }
  
  .blog-content p {
    @apply mb-6 leading-relaxed text-lg text-muted-foreground;
  }
  
  .blog-content a {
    @apply text-primary border-b border-primary hover:bg-primary/10 transition-none no-underline;
  }
  
  .blog-content ul {
    @apply list-none pl-6 mb-6 space-y-2;
  }
  
  .blog-content ul li {
    @apply relative pl-6;
  }
  
  .blog-content ul li::before {
    content: "■";
    @apply absolute left-0 top-2 text-[0.6em] text-primary;
  }
  
  .blog-content ol {
    @apply list-decimal pl-6 mb-6 space-y-2 font-mono text-muted-foreground;
  }
  
  .blog-content li {
    @apply mb-2 text-lg text-muted-foreground;
  }
  
  .blog-content code {
    @apply font-mono text-sm px-1.5 py-0.5 rounded-md bg-muted text-foreground border border-border;
  }
  
  .blog-content hr {
    @apply my-12 border-t border-border;
  }
  
  .blog-content table {
    @apply w-full border-collapse mb-6 font-mono text-sm;
  }
  
  .blog-content th {
    @apply bg-muted text-foreground font-bold px-4 py-2 text-left border border-border uppercase tracking-wider;
  }
  
  .blog-content td {
    @apply px-4 py-2 border border-border text-muted-foreground;
  }
`

export function StorySection({ children }: { children: ReactNode }) {
  return (
    <div className="relative my-12 pl-8 border-l-2 border-border">
      <div className="absolute -left-[9px] top-0 w-4 h-4 bg-background border-4 border-primary" />
      <div className="text-lg text-muted-foreground leading-relaxed font-medium">
        {children}
      </div>
    </div>
  )
}

export function PersonalNote({ children }: { children: ReactNode }) {
  return (
    <div className="pl-4 pr-6 py-4 border-l-4 border-l-blue-500 bg-blue-50/30 dark:bg-blue-950/20 my-8">
      <div className="flex items-start gap-2">
        <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">{`>`}</span>
        <div className="text-sm font-mono text-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

export function TLDR({ children }: { children: ReactNode }) {
  return (
    <div className="pl-4 pr-6 py-4 border-l-4 border-l-primary bg-muted/30 my-8">
      <div className="flex items-start gap-2">
        <span className="text-xl">⚡</span>
        <div className="text-base text-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}