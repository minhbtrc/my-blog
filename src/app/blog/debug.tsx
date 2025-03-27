'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DebugPage() {
  const [apiStatus, setApiStatus] = useState<string>('Checking...');
  const [apiData, setApiData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function checkApi() {
      try {
        // Check the main blog API
        setApiStatus('Fetching from /api/blog...');
        const response = await fetch('/api/blog');
        
        if (!response.ok) {
          throw new Error(`API returned status ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setApiData(data);
        setApiStatus('API call successful');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setApiStatus('API call failed');
      }
    }
    
    checkApi();
  }, []);
  
  return (
    <div className="container mx-auto p-6 bg-slate-800 text-white">
      <h1 className="text-2xl font-bold mb-4">Blog Route Debug Page</h1>
      
      <div className="mb-6 p-4 border border-slate-600 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">API Status</h2>
        <p className={`text-${apiStatus === 'API call successful' ? 'green' : 'yellow'}-400`}>
          {apiStatus}
        </p>
        {error && <p className="text-red-400 mt-2">Error: {error}</p>}
      </div>
      
      {apiData && (
        <div className="mb-6 p-4 border border-slate-600 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">API Response</h2>
          <pre className="overflow-auto bg-slate-900 p-4 rounded-lg text-slate-300 text-sm">
            {JSON.stringify(apiData, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="flex gap-4">
        <Link href="/" className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600">
          Go to Home
        </Link>
        <Link href="/blog" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500">
          Go to Blog (Standard)
        </Link>
      </div>
    </div>
  );
} 