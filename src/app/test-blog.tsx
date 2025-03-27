'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TestBlog() {
  const [blogData, setBlogData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setBlogData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    }

    fetchBlogData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Test Blog Links</h1>
      
      <div className="space-y-4 mb-8">
        <Link href="/blog" className="px-4 py-2 bg-blue-500 text-white rounded block w-fit">
          Go to Blog Page
        </Link>
        
        <Link href="/blog/langchain-chatbot" className="px-4 py-2 bg-green-500 text-white rounded block w-fit">
          Go to Langchain Chatbot Article
        </Link>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">API Response</h2>
        
        {loading && <p>Loading blog data...</p>}
        
        {error && <p className="text-red-500">Error: {error}</p>}
        
        {blogData && (
          <pre className="bg-black text-green-400 p-4 rounded overflow-auto">
            {JSON.stringify(blogData, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
} 