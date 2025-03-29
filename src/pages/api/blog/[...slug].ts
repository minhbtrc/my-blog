import { NextApiRequest, NextApiResponse } from 'next';

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Convert the slug array to a string path
    const slug = req.query.slug as string[];
    const path = slug.join('/');
    
    // Look up the blog post in our mock data
    const blogPost = BLOGS[path];
    
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    return res.status(200).json(blogPost);
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 