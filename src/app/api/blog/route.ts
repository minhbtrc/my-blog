import { NextResponse } from 'next/server';
import { getPublishedBlogs } from '@/data/blogs';

export async function GET() {
  // Fetch from our structured data management system
  const blogs = getPublishedBlogs();
  return NextResponse.json(blogs.map(blog => `/blog/${blog.slug}`));
} 