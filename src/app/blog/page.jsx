'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

// Blog data hardcoded for fallback
const fallbackBlogData = [
  {
    route: 'langchain-chatbot',
    title: 'Building a Privacy-First AI Chatbot with LangChain',
    date: '2024-03-26',
    tags: ['ai', 'langchain', 'privacy', 'development'],
    description: 'A comprehensive guide to creating a full-stack AI chatbot using LangChain, with a focus on privacy, customization, and developer experience.',
    image: '/profile1.jpeg'
  }
]

function BlogPageTemp() {
  const searchParams = useSearchParams()
  const tagFilter = searchParams.get('tag')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [blogData, setBlogData] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [allTags, setAllTags] = useState([])
  
  // Fetch blog posts data
  useEffect(() => {
    async function fetchBlogData() {
      try {
        setLoading(true)
        // Fetch all blog posts
        const response = await fetch('/api/blog')
        if (!response.ok) {
          throw new Error(`Error fetching blog posts: ${response.status}`)
        }
        const postRoutes = await response.json()
        
        // Ensure postRoutes is always an array
        if (!Array.isArray(postRoutes)) {
          console.error("postRoutes is not an array:", postRoutes)
          throw new Error("postRoutes.map is not a function. Expected array but received " + typeof postRoutes)
        }
        
        console.log("Fetched post routes:", postRoutes)
        
        // Fetch details for each post
        const postsData = await Promise.all(
          postRoutes.map(async (route) => {
            try {
              const routePath = route.startsWith('/') ? route : `/${route}`
              const detailsResponse = await fetch(`/api/blog${routePath}`)
              if (!detailsResponse.ok) {
                console.error(`Error fetching details for ${route}:`, detailsResponse.status)
                return null
              }
              const data = await detailsResponse.json()
              console.log(`Post details for ${route}:`, data)
              return data
            } catch (err) {
              console.error(`Error processing ${route}:`, err)
              return null
            }
          })
        )
        
        // Filter out any failed requests
        const validPosts = postsData.filter(post => post !== null)
        console.log("Valid posts:", validPosts)
        setBlogData(validPosts.length > 0 ? validPosts : fallbackBlogData)
      } catch (err) {
        console.error('Error fetching blog data:', err)
        setError(err.message)
        // Use fallback data if API fails
        setBlogData(fallbackBlogData)
      } finally {
        setLoading(false)
      }
    }
    
    // Fetch all tags
    async function fetchTags() {
      try {
        const response = await fetch('/api/tag')
        if (!response.ok) {
          throw new Error(`Error fetching tags: ${response.status}`)
        }
        const tags = await response.json()
        console.log('Fetched tags:', tags)
        
        // Remove any duplicates (case-insensitive)
        const uniqueTagsMap = new Map()
        tags.forEach(tag => {
          const lowerTag = tag.toLowerCase()
          if (!uniqueTagsMap.has(lowerTag)) {
            uniqueTagsMap.set(lowerTag, tag)
          }
        })
        
        const uniqueTags = Array.from(uniqueTagsMap.values())
        setAllTags(uniqueTags)
      } catch (err) {
        console.error('Error fetching tags:', err)
        // Extract tags from fallback data as a backup
        const fallbackTags = [...new Set(fallbackBlogData.flatMap(post => post.tags))]
        setAllTags(fallbackTags)
      }
    }
    
    fetchBlogData()
    fetchTags()
  }, [])
  
  // Filter posts by tag
  useEffect(() => {
    if (blogData.length > 0) {
      if (tagFilter) {
        // Ensure case-insensitive filtering
        const tagLower = tagFilter.toLowerCase();
        const filtered = blogData.filter(post => 
          post.tags && post.tags.some(tag => tag.toLowerCase() === tagLower)
        );
        setFilteredPosts(filtered);
      } else {
        setFilteredPosts(blogData);
      }
    }
  }, [tagFilter, blogData])
  
  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 my-8 flex justify-center items-center" style={{ minHeight: '50vh' }}>
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 my-8">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <div className="alert alert-error">
          <p>Error loading blog posts: {error}</p>
          <p>Please try again later</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      
      {tagFilter && (
        <div className="mb-6">
          <p className="text-lg mb-2">
            Showing posts tagged with: <span className="badge badge-primary">{tagFilter}</span>
          </p>
          <Link href="/blog" className="text-blue-500 hover:underline">
            ← Clear filter
          </Link>
        </div>
      )}
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Browse by Tag</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Link 
              key={tag} 
              href={`?tag=${tag}`}
              className={`badge badge-lg ${tagFilter === tag ? 'badge-secondary' : 'badge-primary'} hover:badge-secondary transition-colors`}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <motion.div 
              key={post.route} 
              className="border border-base-300 rounded-lg overflow-hidden shadow-md"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                <Link 
                  href={`/blog/${post.route}`} 
                  className="no-underline"
                >
                  <h2 className="text-2xl font-bold mb-2 hover:text-blue-500 transition-colors">{post.title}</h2>
                </Link>
                <p className="text-sm text-gray-500 mb-2">
                  Published on {new Date(post.date).toLocaleDateString()}
                </p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {post.tags && post.tags.map(tag => (
                    <Link 
                      key={tag} 
                      href={`?tag=${tag}`}
                      className="badge badge-primary hover:badge-secondary transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                <p className="mb-4">{post.description}</p>
                <Link 
                  href={`/blog/${post.route}`} 
                  className="text-blue-500 hover:text-blue-700 transition-colors font-medium"
                >
                  Read more →
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              {tagFilter 
                ? `No posts found with the tag "${tagFilter}"` 
                : "No blog posts found"}
            </p>
            {tagFilter && (
              <Link href="/blog" className="text-blue-500 hover:underline mt-4 inline-block">
                View all posts
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 

export default function BlogPage(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPageTemp />
    </Suspense>
  )
}