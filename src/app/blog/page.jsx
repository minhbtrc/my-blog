'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2, Calendar, Tag, ArrowLeft, Info, Search, Sparkles, BookOpen } from 'lucide-react'
import Image from 'next/image'

// Blog data hardcoded for fallback
const fallbackBlogData = [
  {
    route: 'langchain-chatbot',
    title: 'Building a Privacy-First AI Chatbot with LangChain',
    date: '2024-03-26',
    tags: ['ai', 'langchain', 'privacy', 'development'],
    description: 'A comprehensive guide to creating a full-stack AI chatbot using LangChain, with a focus on privacy, customization, and developer experience.',
    image: '/profile.jpeg',
    _uniqueId: 'fallback-langchain-chatbot'
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
        const routesArray = Array.isArray(postRoutes) ? postRoutes : 
                           (postRoutes && typeof postRoutes === 'object' ? Object.values(postRoutes) : []);
        
        console.log("Post routes before processing:", routesArray);
        
        // If no post routes, use fallback data
        if (routesArray.length === 0) {
          console.log("No blog routes found, using fallback data");
          setBlogData(fallbackBlogData);
          setLoading(false);
          return;
        }
        
        // Fetch details for each post
        const postsData = await Promise.all(
          routesArray.map(async (route) => {
            try {
              const routePath = route.startsWith('/') ? route : `/${route}`
              const detailsResponse = await fetch(`/api/blog${routePath}`)
              if (!detailsResponse.ok) {
                console.error(`Error fetching details for ${route}:`, detailsResponse.status)
                return null
              }
              const data = await detailsResponse.json()
              
              // Skip parent blog entry or entries without title
              if (data.route === '/blog' || data.route === 'blog' || !data.title) {
                console.log(`Skipping entry: ${data.route} (no title or parent blog entry)`);
                return null
              }
              
              console.log(`Processed post: ${data.route} - ${data.title}`);
              return {
                ...data,
                // Add a unique ID to help identify duplicates
                _uniqueId: `${data.route}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
              }
            } catch (err) {
              console.error(`Error processing ${route}:`, err)
              return null
            }
          })
        )
        
        // Filter out any failed requests
        const validPosts = postsData.filter(post => post !== null)
        
        // Check for duplicate posts (by route)
        const routeCounts = {};
        validPosts.forEach(post => {
          const normalizedRoute = post.route.replace(/^(\/)?blog\//, '');
          routeCounts[normalizedRoute] = (routeCounts[normalizedRoute] || 0) + 1;
        });
        
        const duplicates = Object.entries(routeCounts)
          .filter(([_, count]) => count > 1)
          .map(([route]) => route);
          
        if (duplicates.length > 0) {
          console.warn('Duplicate posts detected:', duplicates);
          
          // Deduplicate posts - keep only the first occurrence of each route
          const uniqueRoutes = new Set();
          const dedupedPosts = validPosts.filter(post => {
            const normalizedRoute = post.route.replace(/^(\/)?blog\//, '');
            if (uniqueRoutes.has(normalizedRoute)) {
              return false;
            }
            uniqueRoutes.add(normalizedRoute);
            return true;
          });
          
          console.log(`Removed ${validPosts.length - dedupedPosts.length} duplicate posts`);
          setBlogData(dedupedPosts.length > 0 ? dedupedPosts : fallbackBlogData);
        } else {
          console.log("No duplicates found, total posts:", validPosts.length);
          setBlogData(validPosts.length > 0 ? validPosts : fallbackBlogData);
        }
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
      console.log("Blog data before filtering:", blogData.map(post => post.title));
      
      if (tagFilter) {
        // Ensure case-insensitive filtering
        const tagLower = tagFilter.toLowerCase();
        const filtered = blogData.filter(post => 
          post.tags && post.tags.some(tag => tag.toLowerCase() === tagLower)
        );
        console.log(`Filtered posts for tag "${tagFilter}":`, filtered.map(post => post.title));
        setFilteredPosts(filtered);
      } else {
        console.log("No tag filter, using all blog data");
        setFilteredPosts(blogData);
      }
    } else {
      console.log("No blog data available, using empty array");
      setFilteredPosts([]);
    }
  }, [tagFilter, blogData])
  
  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="animate-spin w-10 h-10 text-primary mx-auto mb-4" />
          <p className="text-base-content/70">Loading blog posts...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Blog</h1>
        </div>
        <div className="alert alert-error bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
          <Info className="w-6 h-6 text-red-500 mr-3" />
          <div>
            <p className="font-medium mb-1">Error loading blog posts</p>
            <p className="text-base-content/70 text-sm">{error}</p>
            <p className="mt-4 text-sm">Please try again later or check your connection.</p>
          </div>
        </div>
      </div>
    )
  }
  
  // Get featured post (first post or null if none)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  
  // Other posts (excluding featured when not filtering by tag)
  const allPosts = filteredPosts;
  
  console.log("Posts to be rendered:", allPosts.map(p => `${p.route} - ${p.title}`));
  console.log("Total posts to render:", allPosts.length);
  
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-14"
      >
        {/* Header section with improved spacing */}
        <header className="space-y-8">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
            Blog
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-base-300/30 pb-8">
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-end">
                {allTags.slice(0, 4).map((tag, index) => (
                  <Link 
                    key={`tag-${tag}-${index}`}
                    href={`?tag=${tag}`}
                    className={`
                      inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-200
                      ${tagFilter === tag 
                        ? 'bg-primary text-primary-content shadow-md' 
                        : 'bg-base-300/40 hover:bg-primary/20 text-base-content/90 hover:text-primary'}
                    `}
                  >
                    <Tag className="w-3 h-3 mr-1.5 shrink-0" />
                    <span>{tag}</span>
                  </Link>
                ))}
                {allTags.length > 4 && (
                  <button 
                    className="text-sm text-primary hover:text-primary/80 px-2 flex items-center"
                    onClick={() => document.getElementById('topics-section').scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span>+{allTags.length - 4} more</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </header>
        
        {/* Tag filter info */}
        {tagFilter && (
          <motion.div 
            className="p-4 border border-primary/20 rounded-xl bg-primary/5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Tag className="w-4 h-4 text-primary mr-2" />
                <p className="font-medium">
                  Showing posts tagged with: <span className="text-primary">{tagFilter}</span>
                </p>
              </div>
              <Link 
                href="/blog" 
                className="text-sm px-3 py-1 rounded-full bg-base-200 hover:bg-base-300 transition-colors"
              >
                Clear filter
              </Link>
            </div>
          </motion.div>
        )}
        
        {/* Article List section */}
        <section>
          <h2 className="text-2xl font-bold mb-8 flex items-center border-l-4 border-primary pl-4">
            {tagFilter 
              ? <><Tag className="w-5 h-5 mr-2 text-primary" /> Posts tagged with <span className="text-primary ml-1">{tagFilter}</span></> 
              : "All Articles"}
          </h2>
          
          {allPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allPosts.map((post, index) => (
                <motion.article 
                  key={`post-${index}-${post.route}`} 
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-base-300/30"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                >
                  {/* Featured image or gradient background */}
                  <div className="h-48 relative overflow-hidden">
                    {post.image ? (
                      <Image 
                        src={post.image} 
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-base-content/10" />
                      </div>
                    )}
                    
                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                    
                    {/* Title overlaid on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary-content transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-white/80">
                          <Calendar className="w-3.5 h-3.5" />
                          <time dateTime={post.date} className="text-sm">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                        
                        <div className="flex gap-1">
                          {post.tags && post.tags.slice(0, 2).map((tag, tagIndex) => (
                            <Link 
                              key={`tag-${tagIndex}-${tag}`}
                              href={`?tag=${tag}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center px-2 py-0.5 bg-primary/80 text-white rounded-full text-xs"
                            >
                              <span>{tag}</span>
                            </Link>
                          ))}
                          {post.tags && post.tags.length > 2 && (
                            <span className="px-2 py-0.5 bg-base-200/80 text-white/90 rounded-full text-xs">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content section */}
                  <Link 
                    href={`/blog/${post.route.replace(/^(\/)?blog\//, '')}`} 
                    className="block p-5 bg-base-200/90 backdrop-blur-sm flex-1 flex flex-col"
                  >
                    <p className="text-base-content/70 line-clamp-3 leading-relaxed mb-4 text-sm flex-1">
                      {post.description}
                    </p>
                    
                    <div className="flex justify-end mt-auto">
                      <motion.span 
                        className="inline-flex items-center text-primary font-medium text-sm group-hover:underline"
                        whileHover={{ x: 3 }}
                      >
                        Read article
                        <ArrowLeft className="w-4 h-4 ml-1.5 rotate-180" />
                      </motion.span>
                    </div>
                  </Link>
                  
                  {/* Highlight accent line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-16 bg-base-200/20 rounded-xl border border-base-300/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="max-w-md mx-auto">
                <div className="bg-base-200/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 border border-base-300/30">
                  <BookOpen className="w-12 h-12 text-base-content/20" />
                </div>
                <p className="text-xl font-medium mb-4">
                  {tagFilter 
                    ? `No posts found with the tag "${tagFilter}"` 
                    : "No blog posts found"}
                </p>
                <p className="text-base-content/70 mb-6 leading-relaxed">
                  {tagFilter 
                    ? "Try selecting a different tag or check back later for new content." 
                    : "Check back soon for new articles and insights!"}
                </p>
                {tagFilter && (
                  <Link 
                    href="/blog" 
                    className="btn btn-primary btn-sm rounded-full px-6"
                  >
                    View all posts
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </section>
        
        {/* All Topics - only visible when there are many tags */}
        {allTags.length > 4 && (
          <section id="topics-section" className="pt-10">
            <h2 className="text-xl font-bold mb-4 border-l-4 border-primary pl-4">All Topics</h2>
            <div className="flex flex-wrap gap-3 p-4 bg-base-200/30 rounded-xl border border-base-300/30">
              {allTags.map((tag, index) => (
                <Link 
                  key={`all-tag-${tag}-${index}`}
                  href={`?tag=${tag}`}
                  className={`
                    inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${tagFilter === tag 
                      ? 'bg-primary text-primary-content shadow-md' 
                      : 'bg-base-300/50 hover:bg-primary/20 text-base-content/80 hover:text-primary'}
                  `}
                >
                  <Tag className="w-3 h-3 mr-1.5 shrink-0" />
                  <span>{tag}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </motion.div>
    </div>
  )
} 

export default function BlogPage(){
  return (
    <Suspense fallback={
      <div className="w-full max-w-5xl mx-auto px-4 py-12 flex justify-center items-center" style={{ minHeight: '50vh' }}>
        <div className="text-center">
          <Loader2 className="animate-spin w-10 h-10 text-primary mx-auto mb-4" />
          <p className="text-base-content/70">Loading blog...</p>
        </div>
      </div>
    }>
      <BlogPageTemp />
    </Suspense>
  )
}