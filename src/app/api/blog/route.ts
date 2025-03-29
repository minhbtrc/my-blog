import { NextResponse } from 'next/server';

// Mock data - these would be loaded/fetched from a database in a real app
const BLOGS = [
  {
    slug: 'langchain-chatbot',
    route: '/blog/langchain-chatbot',
    title: 'Building a Privacy-First AI Chatbot with LangChain',
    description: 'The langchain-chatbot repository is a comprehensive implementation of an AI-powered conversational tool designed for developers and...',
    date: '2023-07-15',
    readingTime: '8 min read',
    tags: ['ai', 'langchain', 'privacy', 'development'],
  }
];

export async function GET() {
  // In a real app, we would fetch from a database or content source
  return NextResponse.json(BLOGS.map(blog => blog.route));
} 