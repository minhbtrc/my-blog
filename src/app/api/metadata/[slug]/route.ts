import { NextRequest, NextResponse } from 'next/server'

// Mock data that would normally come from a database
const BLOGS = {
  'langchain-chatbot': {
    title: 'Building a Privacy-First AI Chatbot with LangChain',
    description: 'The langchain-chatbot repository is a comprehensive implementation of an AI-powered conversational tool designed for developers and...',
    date: '2023-07-15',
    readingTime: '8 min read',
    tags: ['ai', 'langchain', 'privacy', 'development'],
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Get the slug from the params
    const { slug } = params;
    
    // Look up the blog post in our mock data
    const metadata = BLOGS[slug];
    
    if (!metadata) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 