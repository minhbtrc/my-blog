import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: 'Blog | Minh BTC',
  description: 'Latest articles and thoughts on technology, AI, and more',
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
      <div className="max-w-3xl mx-auto">
        <p className="text-center mb-12">
          Welcome to my blog. This page is being set up. Check back soon for new articles!
        </p>
        <div className="text-center">
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 