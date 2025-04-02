import { NextRequest, NextResponse } from 'next/server';
import { getBlogBySlug } from '@/data/blogs';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    // Convert the slug array to a string path
    const path = params.slug.join('/');
    
    // Look up the blog post in our data system
    const blogPost = getBlogBySlug(path);
    
    if (!blogPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Transform to expected format if needed
    const response = {
      title: blogPost.title,
      description: blogPost.description,
      date: blogPost.date,
      readingTime: blogPost.readingTime,
      tags: blogPost.tags,
      content: blogPost.content,
      featuredImage: blogPost.featuredImage,
      children: [],
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 