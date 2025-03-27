"use client";

// Use type-checking comments to disable ESLint warnings
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect, useRef, Suspense } from "react";
import { Search, ArrowUp, X, Heart, Coffee, Filter, XCircle } from "lucide-react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { motion } from 'framer-motion';

import { BlogCard } from '@/components/blog';
import FeaturedPost from '@/components/featured-post';

// ClientOnly component with explicit next/dynamic import pattern to avoid hydration issues
function ClientOnly({ children, fallback = null }) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return isMounted ? children : fallback;
}

// Fallback blog data for testing when API is not working
const FALLBACK_BLOGS = [
  {
    route: "/blog/langchain-chatbot",
    title: "Building a privacy-first LangChain Chatbot",
    description: "Learn how to build a secure, privacy-centric chatbot using LangChain, integrating large language models while keeping user data protected.",
    date: "2023-07-15",
    readingTime: "8 min read",
    tags: ["LangChain", "AI", "Privacy"],
    image: "/images/placeholders/placeholder1.jpg"
  },
  {
    route: 'blog/vector-embeddings',
    title: 'Vector Embeddings: The Foundation of Modern NLP',
    description: 'Dive deep into vector embeddings and understand how they enable advanced natural language processing and semantic search capabilities.',
    date: '2023-08-22',
    readingTime: '12 min read',
    tags: ['NLP', 'Embeddings', 'AI'],
    image: '/images/placeholders/placeholder2.jpg'
  },
  {
    route: 'blog/ai-privacy',
    title: 'Balancing AI Capabilities with User Privacy',
    description: 'Exploring the tension between advancing AI capabilities and maintaining strong user privacy protections in modern applications.',
    date: '2023-09-05',
    readingTime: '10 min read',
    tags: ['AI', 'Privacy', 'Ethics'],
    image: '/images/placeholders/placeholder3.jpg'
  }
];

function BlogPageContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ 
    tags: [],
    dateRange: { start: null, end: null },
    sortBy: 'date' // 'date', 'title', 'readingTime'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [featuredItem, setFeaturedItem] = useState(null);
  const [tags, setTags] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const isSearching = debouncedSearchTerm.length > 0;
  const isFiltering = filters.tags.length > 0 || filters.dateRange.start || filters.dateRange.end;
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasMounted = useRef(false);
  
  // Extract selected tags from URL
  const selectedTagFromUrl = searchParams.get('tag');
  const [selectedTags, setSelectedTags] = useState(
    selectedTagFromUrl ? [selectedTagFromUrl] : []
  );

  useEffect(() => {
    // Only set this state after the component has mounted to avoid hydration issues
    hasMounted.current = true;
    
    loadBlogData();

    // Add scroll listener for scroll detection
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load blog data from API or use fallback
  async function loadBlogData() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/blog");
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.children && Array.isArray(data.children) && data.children.length > 0) {
        // Transform API data into our format
        const transformedBlogs = await Promise.all(data.children.map(async (route) => {
          try {
            const blogData = await fetch(`/api${route}`).then(res => res.json());
            return {
              route,
              title: blogData.title || "Untitled Post",
              description: blogData.description || "No description provided",
              date: blogData.date || new Date().toISOString(),
              readingTime: blogData.readingTime || `${Math.max(1, Math.ceil((blogData.description || '').split(' ').length / 200))} min read`,
              tags: blogData.tags || [],
              image: blogData.image || null
            };
          } catch (err) {
            console.error(`Failed to load blog data for ${route}:`, err);
            return {
              route,
              title: "Untitled Post",
              description: "Failed to load content",
              date: new Date().toISOString(),
              readingTime: "N/A",
              tags: [],
              image: null
            };
          }
        }));
        setBlogs(transformedBlogs);
      } else {
        console.warn("Using fallback blog data - API returned empty result");
        setBlogs(FALLBACK_BLOGS);
      }
    } catch (error) {
      console.error("Failed to load blogs:", error);
      setBlogs(FALLBACK_BLOGS); // Use fallback data on error
    } finally {
      setIsLoading(false);
    }
  }

  // Update URL when tags change - but only after initial hydration
  useEffect(() => {
    if (!hasMounted.current) return;
    
    if (selectedTags.length > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('tag', selectedTags[0]); // Currently only supporting single tag filtering
      router.push(`/blog?${params.toString()}`);
    } else if (selectedTagFromUrl) {
      // Clear tag parameter if no tags selected
      const params = new URLSearchParams(searchParams.toString());
      params.delete('tag');
      router.push(`/blog?${params.toString()}`);
    }
  }, [selectedTags, router, searchParams, selectedTagFromUrl]);
  
  // Filter blogs based on selected tags and search query
  useEffect(() => {
    // Filter the blogs based on tags and search
    const filtered = blogs.filter(blog => {
      const matchesTag = selectedTags.length === 0 || 
        (blog.tags && blog.tags.some(tag => selectedTags.includes(tag)));
      
      const matchesSearch = !searchTerm || 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.description && blog.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      return matchesTag && matchesSearch;
    });
    
    // Sort by date - oldest first
    const sortedResults = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB; // Ascending order (oldest first)
    });
    
    // Remove image property to ensure no thumbnails are displayed
    const resultsWithoutImages = sortedResults.map(blog => ({
      ...blog,
      image: null
    }));
    
    setFilteredResults(resultsWithoutImages);
    
    // Set featured item - first post in the sorted list
    if (resultsWithoutImages.length > 0) {
      setFeaturedItem(resultsWithoutImages[0]);
    } else {
      setFeaturedItem(null);
    }
  }, [blogs, selectedTags, searchTerm]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle tag selection
  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedTags([]);
  };
  
  // Clear all filters and search
  const clearAll = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };
  
  // Fix jsx global properties
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0" style={{backgroundImage: `radial-gradient(circle at 25px 25px, rgba(80, 100, 150, 0.15) 2%, transparent 0%),
          radial-gradient(circle at 75px 75px, rgba(80, 100, 150, 0.15) 2%, transparent 0%)`,
          backgroundSize: '100px 100px'}} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar for filters - Mobile version */}
          <div 
            className={`fixed inset-0 z-40 lg:hidden transform transition-transform duration-300 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-slate-800 shadow-lg overflow-auto">
              <div className="p-5">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-200">Filters</h3>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-slate-400 hover:text-slate-300 bg-slate-700/50 p-1.5 rounded-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Improved Tag Filter UI for mobile */}
                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></span>
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tags.length > 0 ? (
                        tags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => handleTagSelect(tag)}
                            className={`px-3 py-1.5 rounded-md text-xs ${
                              selectedTags.includes(tag) 
                                ? 'bg-indigo-600 text-white font-medium' 
                                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600/50'
                            } transition-colors`}
                          >
                            {tag}
                          </button>
                        ))
                      ) : (
                        <p className="text-slate-400 text-xs italic">No tags available</p>
                      )}
                    </div>
                  </div>
                  
                  {selectedTags.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center bg-slate-800 px-3 py-1.5 rounded-md border border-indigo-900/50 hover:border-indigo-500/30 transition-colors"
                    >
                      <X className="w-3.5 h-3.5 mr-1.5" />
                      Clear filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
      
          {/* Sidebar - Desktop version */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="sticky top-24">
              <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-5 shadow-sm">
                <h3 className="text-lg font-bold mb-5 text-slate-200 border-b border-slate-700 pb-3">Filters</h3>
                
                {/* Improved Tag Filter UI */}
                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></span>
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tags.length > 0 ? (
                        tags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => handleTagSelect(tag)}
                            className={`px-3 py-1.5 rounded-md text-xs ${
                              selectedTags.includes(tag) 
                                ? 'bg-indigo-600 text-white font-medium' 
                                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600/50'
                            } transition-colors`}
                          >
                            {tag}
                          </button>
                        ))
                      ) : (
                        <p className="text-slate-400 text-xs italic">No tags available</p>
                      )}
                    </div>
                  </div>
                  
                  {selectedTags.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center bg-slate-800 px-3 py-1.5 rounded-md border border-indigo-900/50 hover:border-indigo-500/30 transition-colors"
                    >
                      <X className="w-3.5 h-3.5 mr-1.5" />
                      Clear filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main blog listing */}
          <div className="lg:col-span-9 space-y-8">
            {/* Search and filter bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-slate-800/60 p-4 rounded-lg border border-slate-700 mb-6">
              <div className="flex items-center">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden mr-3 text-slate-400 hover:text-slate-300"
                >
                  <Filter className="w-5 h-5" />
                </button>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2 pr-10 bg-slate-900/80 border border-slate-700 rounded-lg text-slate-300 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
                </div>
              </div>
              
              <div className="flex items-center text-sm text-slate-400 whitespace-nowrap">
                {isLoading ? (
                  <span>Loading...</span>
                ) : (
                  <>
                    <span>
                      {filteredResults.length} {filteredResults.length === 1 ? 'Article' : 'Articles'}
                    </span>
                    {(isSearching || isFiltering) && (
                      <button 
                        onClick={clearAll}
                        className="ml-3 text-indigo-400 hover:text-indigo-300 flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Clear
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {/* Blog posts grid */}
            <div className="max-w-screen-xl mx-auto">
              {isLoading ? (
                <div className="grid gap-8">
                  <div className="w-full h-72 bg-slate-800/60 rounded-lg border border-slate-700 shadow-md animate-pulse"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-64 bg-slate-800/60 rounded-lg border border-slate-700 shadow-md animate-pulse"></div>
                    ))}
                  </div>
                </div>
              ) : filteredResults.length > 0 ? (
                <div className="space-y-16">
                  {/* Featured post with enhanced styling */}
                  {featuredItem && (
                    <div className="transform hover:-translate-y-1 transition-transform duration-300">
                      <FeaturedPost post={featuredItem} />
                    </div>
                  )}
                  
                  {/* Section divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                  
                  {/* Blog articles grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResults
                      .filter(blog => blog.id !== featuredItem?.id) // Exclude featured post
                      .map((blog) => (
                        <motion.div
                          key={blog.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="h-full"
                        >
                          <BlogCard blog={blog} />
                        </motion.div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="bg-slate-800/60 p-8 rounded-lg border border-slate-700 shadow-md max-w-lg">
                    <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-300 mb-2">No articles found</h3>
                    <p className="text-slate-400 mb-6">
                      {isSearching ? 
                        `No articles match "${debouncedSearchTerm}"` : 
                        "No articles match your current filters"}
                    </p>
                    <button
                      onClick={clearAll}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                      Clear {isSearching ? "search" : "filters"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="loading loading-spinner loading-lg"></div></div>}>
      <BlogPageContent />
    </Suspense>
  );
}