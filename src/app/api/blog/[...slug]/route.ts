import { NextRequest, NextResponse } from 'next/server';

// Mock data that would normally come from a database
const BLOGS = {
  'langchain-chatbot': {
    title: 'Building a Privacy-First AI Chatbot with LangChain',
    description: 'The langchain-chatbot repository is a comprehensive implementation of an AI-powered conversational tool designed for developers and...',
    date: '2023-07-15',
    readingTime: '8 min read',
    tags: ['ai', 'langchain', 'privacy', 'development'],
    children: [],
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    // Convert the slug array to a string path
    const path = params.slug.join('/');
    
    // Look up the blog post in our mock data
    const blogPost = BLOGS[path];
    
    if (!blogPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(blogPost);
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 