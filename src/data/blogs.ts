/**
 * Blogs data file
 * 
 * This file contains all blog entries that will be displayed on the blog page.
 * Blog data is stored in /src/db/blogs.json for easy management.
 */

import blogsData from '@/db/blogs.json';

export interface Blog {
  /** Unique slug for the blog post */
  slug: string;
  /** Title of the blog post */
  title: string;
  /** Short description for preview/SEO */
  description: string;
  /** Publication date (YYYY-MM-DD format) */
  date: string;
  /** Estimated reading time */
  readingTime: string;
  /** Array of tags for categorization */
  tags: string[];
  /** Path to featured image */
  featuredImage?: string;
  /** Markdown content of the blog post */
  content: string;
  /** Whether the post is published */
  published: boolean;
}

/**
 * Array of all blogs imported from the JSON file
 */
export const blogs: Blog[] = blogsData;

/**
 * Helper functions to work with blogs data
 */

/**
 * Get all published blogs
 */
export function getPublishedBlogs(): Blog[] {
  return blogs.filter(blog => blog.published);
}

/**
 * Get blogs by tag
 */
export function getBlogsByTag(tag: string): Blog[] {
  return getPublishedBlogs().filter(blog => 
    blog.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique tags across all published blogs
 */
export function getAllBlogTags(): string[] {
  const tags = new Set<string>();
  
  getPublishedBlogs().forEach(blog => {
    blog.tags.forEach(tag => {
      tags.add(tag.toLowerCase());
    });
  });
  
  return Array.from(tags).sort();
}

/**
 * Get blog by slug
 */
export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find(blog => blog.slug === slug);
}

/**
 * Sort blogs by date (newest first)
 */
export function getSortedBlogs(): Blog[] {
  return [...getPublishedBlogs()].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get latest blogs (limited to a specific count)
 */
export function getLatestBlogs(count: number = 3): Blog[] {
  return getSortedBlogs().slice(0, count);
} 