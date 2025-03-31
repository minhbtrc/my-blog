import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BlogPost {
  route?: string;
  slug?: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags?: string[];
  featured?: boolean;
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  featured?: boolean;
}

export function BlogCard({ post, className, featured = false }: BlogCardProps) {
  const isNew = new Date(post.date) > new Date(Date.now() - 7 * 86400000);

  return (
    <Link
      href={post.route || '#'}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg transition-shadow duration-300 shadow-sm hover:shadow-md backdrop-blur-sm",
        "bg-base-100 border-base-200 hover:bg-base-200",
        className
      )}
    >
      {/* Terminal header */}
      <div className="flex h-8 items-center justify-between px-3 bg-base-200 dark:bg-base-300">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-base-content/60">~/blog</span>
          <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-content">
            {featured ? "Featured" : "Post"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-3 text-xs text-base-content/60 mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" />
            {post.readingTime}
          </span>
        </div>

        {isNew && (
          <div className="absolute top-2 right-2 bg-success text-success-content text-[10px] font-medium px-1.5 py-0.5 rounded">
            NEW
          </div>
        )}
        {featured && (
          <div className="absolute top-2 right-2 bg-warning text-warning-content text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center">
            <span className="mr-1">🚀</span> TRENDING
          </div>
        )}

        <h2 className="text-xl font-mono text-base-content mb-4 leading-relaxed group-hover:text-primary">
          {post.title}
        </h2>

        <p className="text-sm text-base-content/70 mb-6 font-light">
          {post.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded bg-base-200 dark:bg-base-300 px-2 py-0.5 text-xs font-mono text-primary border border-base-300"
            >
              <Hash className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-base-200">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-base-content/60">
              <span className="text-success">$</span>
              read-article --
            </div>
            <div className="text-primary flex items-center gap-1">
              Execute <span className="text-primary">→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
