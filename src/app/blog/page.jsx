"use client";

// Use type-checking comments to disable ESLint warnings
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect, useRef, Suspense } from "react";
import { Search, ArrowUp, X, Heart, Coffee, Filter, XCircle } from "lucide-react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
    <div className="min-h-screen bg-[#0B1120] font-sans">
      {/* Animated code background */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="absolute inset-0 overflow-hidden" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%232563EB' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>
      
      {/* Code matrix effect - subtle, vertical lines like code */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute h-full w-px bg-gradient-to-b from-transparent via-blue-400/40 to-transparent"
              style={{ left: `${i * 5}%`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <header className="mb-12 border-b border-slate-800 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3 font-mono tracking-tight">&gt;_BLOG</h1>
          <p className="text-slate-400 md:text-lg max-w-2xl">
            Exploring the intersection of AI, development, and technology. Deep dives into 
            <span className="px-1.5 py-0.5 rounded bg-slate-800/70 text-cyan-300 text-sm font-mono mx-1 border border-slate-700">code</span>
            and innovation.
          </p>
        </header>
        
        {/* Search and filter section */}
        <div className="mb-8 max-w-3xl flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 hover:border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-300 rounded-md outline-none font-mono text-sm transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden py-2.5 px-4 border border-slate-700 bg-slate-800/50 hover:bg-slate-800 rounded-md text-slate-300 flex items-center gap-2 transition-colors text-sm"
          >
            <Filter className="h-4 w-4 text-slate-400" />
            Filters {selectedTags.length > 0 && `(${selectedTags.length})`}
          </button>
          
          {(searchTerm || selectedTags.length > 0) && (
            <button
              onClick={clearAll}
              className="py-2.5 px-4 border border-slate-700 bg-slate-800/50 hover:bg-slate-800 rounded-md text-slate-300 flex items-center gap-2 transition-colors text-sm"
            >
              <XCircle className="h-4 w-4 text-slate-400" />
              Clear all
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar for filters - Mobile version */}
          <div 
            className={`fixed inset-0 z-40 lg:hidden transform transition-transform duration-300 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#0e1628] shadow-lg overflow-auto border-r border-slate-800">
              <div className="p-5">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-200 font-mono">{/* Filters */}// Filters</h3>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-slate-400 hover:text-slate-300 bg-slate-800/80 p-1.5 rounded-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Tag Filter UI for mobile */}
                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-mono text-cyan-300 mb-3 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span>
                      TAGS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tags.length > 0 ? (
                        tags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => handleTagSelect(tag)}
                            className={`px-3 py-1.5 rounded-md text-xs font-mono ${
                              selectedTags.includes(tag) 
                                ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40 shadow-sm shadow-blue-500/10' 
                                : 'bg-slate-800/70 text-slate-400 hover:text-slate-300 border border-slate-700 hover:border-slate-600'
                            } transition-all`}
                          >
                            {tag}
                          </button>
                        ))
                      ) : (
                        <p className="text-slate-500 text-xs italic font-mono">{/* No tags available */}// No tags available</p>
                      )}
                    </div>
                  </div>
                  
                  {selectedTags.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-slate-400 hover:text-slate-300 flex items-center bg-slate-800/60 px-3 py-1.5 rounded-md border border-slate-700 hover:border-slate-600 transition-colors font-mono"
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
              <div className="bg-gradient-to-b from-slate-800/80 to-[#0e1628]/80 border border-slate-700/50 rounded-lg p-5 shadow-lg backdrop-blur-sm">
                <h3 className="text-lg font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-5 border-b border-slate-800/80 pb-3">// filters.js</h3>
                
                {/* Tag Filter UI */}
                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-mono text-cyan-300 mb-3 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span>
                      TAGS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tags.length > 0 ? (
                        tags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => handleTagSelect(tag)}
                            className={`px-3 py-1.5 rounded-md text-xs font-mono ${
                              selectedTags.includes(tag) 
                                ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40 shadow-sm shadow-blue-500/10' 
                                : 'bg-slate-800/70 text-slate-400 hover:text-slate-300 border border-slate-700 hover:border-slate-600'
                            } transition-all`}
                          >
                            {tag}
                          </button>
                        ))
                      ) : (
                        <p className="text-slate-500 text-xs italic font-mono">{/* No tags available */}// No tags available</p>
                      )}
                    </div>
                  </div>
                  
                  {selectedTags.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-slate-400 hover:text-slate-300 flex items-center bg-slate-800/60 px-3 py-1.5 rounded-md border border-slate-700 hover:border-slate-600 transition-colors font-mono"
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
            
            {/* Featured post */}
            {featuredItem && filteredResults.length > 0 && !isSearching && !isFiltering && (
              <div className="mb-10">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                  <h2 className="text-sm uppercase tracking-wider text-cyan-400 font-mono">Featured Post</h2>
                </div>
                <div className="bg-gradient-to-br from-slate-800/80 to-[#0e1628]/90 border border-slate-700/50 hover:border-cyan-900/30 rounded-xl p-6 transform hover:translate-y-[-2px] transition-all duration-200 shadow-lg hover:shadow-cyan-900/5 group backdrop-blur-sm">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {featuredItem.tags && featuredItem.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagSelect(tag)}
                        className="px-2.5 py-1 text-xs font-mono rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
                    {featuredItem.title}
                  </h3>
                  <p className="text-slate-400 mb-4 line-clamp-2">{featuredItem.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="text-xs text-slate-500 font-mono">
                        {new Date(featuredItem.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        {featuredItem.readingTime}
                      </div>
                    </div>
                    <Link 
                      href={featuredItem.route} 
                      className="inline-flex items-center px-3 py-1.5 text-xs rounded-md bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 hover:text-cyan-300 border border-cyan-500/20 hover:border-cyan-400/30 transition-colors font-mono"
                    >
                      Read more <span className="ml-1.5">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Loading state */}
            {isLoading && (
              <div className="w-full flex flex-col items-center justify-center py-20">
                <div className="mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
                  <span className="text-slate-400 font-mono">{/* Loading blog posts... */}loading.posts()</span>
                </div>
              </div>
            )}
            
            {/* No results state */}
            {filteredResults.length === 0 && !isLoading && (
              <div className="w-full flex flex-col items-center justify-center py-20 px-4 border border-blue-900/20 rounded-lg bg-slate-800/30">
                <div className="mb-4">
                  <span className="text-slate-400 font-mono">{/* No results found for your search */}search.results(0)</span>
                </div>
                <p className="text-slate-500 text-center mb-6 max-w-lg">We couldn&apos;t find any posts matching your criteria. Try adjusting your search or filters.</p>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 rounded-md bg-slate-800/80 border border-blue-900/30 text-cyan-400 hover:bg-slate-800 hover:border-blue-800/40 transition-all text-sm font-mono"
                >
                  clear.filters()
                </button>
              </div>
            )}
            
            {/* Blog list */}
            {!isLoading && filteredResults.length > 0 && (
              <div className="grid gap-6">
                {filteredResults.map((blog, index) => (
                  <div 
                    key={blog.route}
                    className="relative group"
                  >
                    {/* Line number */}
                    <div className="absolute -left-10 top-6 hidden lg:flex items-center justify-end w-6 h-6 text-slate-600 font-mono text-xs select-none">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    {/* Blog card */}
                    <Link 
                      href={blog.route}
                      className="block bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/50 hover:border-slate-600/80 rounded-lg p-6 transition-all duration-200 backdrop-blur-sm"
                    >
                      <div className="mb-2 flex flex-wrap gap-2">
                        {blog.tags && blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs font-mono rounded bg-slate-700/70 text-slate-400"
                            onClick={(e) => {
                              e.preventDefault();
                              handleTagSelect(tag);
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-slate-200 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-colors duration-300">
                        {blog.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">{blog.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="text-xs text-slate-500 font-mono">
                            {new Date(blog.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-xs text-slate-500">
                            {blog.readingTime}
                          </div>
                        </div>
                        <span className="text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                          Read <span className="group-hover:ml-0.5 transition-all">→</span>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
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