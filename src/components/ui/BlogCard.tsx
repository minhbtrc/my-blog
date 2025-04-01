import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
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
  return (
    <Link
      href={post.route || '#'}
      className={cn(
        "group relative flex flex-col py-6 border-b border-base-200 last:border-0",
        "transition-colors duration-200 hover:bg-base-200/30",
        className
      )}
    >
      {/* Minimal header with date */}
      <div className="flex items-center gap-3 text-xs text-base-content/60 mb-2.5">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-base-content/40" />
          {formatDate(post.date)}
        </span>
        {featured && (
          <span className="text-primary/80 text-xs font-medium">
            Featured
          </span>
        )}
      </div>

      {/* Title and description only */}
      <h2 className="text-lg font-medium text-base-content mb-2 leading-snug group-hover:text-primary transition-colors">
        {post.title}
      </h2>

      <p className="text-sm text-base-content/70 mb-3 line-clamp-2">
        {post.description}
      </p>
      
      {/* Minimal read more indicator */}
      <div className="mt-auto">
        <div className="flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Read post <ArrowRight className="ml-1 h-3 w-3" />
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
