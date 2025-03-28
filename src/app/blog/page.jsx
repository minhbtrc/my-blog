"use client";

import React, { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from 'next-themes'
import { Search, X, Filter, Code, BookOpen, Tag, Clock, Calendar, ArrowRight, Hash, BookMarked } from "lucide-react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';

// Fallback blog data for testing
const FALLBACK_BLOGS = [
  {
    route: "/blog/langchain-chatbot",
    title: "Building a Privacy-First AI Chatbot with LangChain",
    description: "The langchain-chatbot repository is a comprehensive implementation of an AI-powered conversational tool designed for developers and...",
    date: "2023-07-15",
    readingTime: "8 min read",
    tags: ["ai", "langchain", "privacy", "development"],
  }
];

function BlogPageContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [tags, setTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const { resolvedTheme: activeTheme } = useTheme();
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasMounted = useRef(false);
  
  // Extract selected tags from URL
  const selectedTagFromUrl = searchParams.get('tag');
  const [selectedTags, setSelectedTags] = useState(
    selectedTagFromUrl ? [selectedTagFromUrl] : []
  );

  const popularTags = ["AI", "React", "Next.js", "TypeScript", "Machine Learning"];

  // State for tag filter UI
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Refs for animation elements
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const moreRef = useRef(null);

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [heroRef.current, featuredRef.current, moreRef.current];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [isLoading, filteredResults]);

  useEffect(() => {
    hasMounted.current = true;
    loadBlogData();
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
      
      if (data && Array.isArray(data) && data.length > 0) {
        // Direct array of route URLs
        const transformedBlogs = await Promise.all(data.map(async (route) => {
          try {
            const blogData = await fetch(`/api${route.startsWith('/') ? route : `/${route}`}`).then(res => res.json());
            return {
              route,
              title: blogData.title || "Untitled Post",
              description: blogData.description || "No description provided",
              date: blogData.date || new Date().toISOString(),
              readingTime: blogData.readingTime || `${Math.max(1, Math.ceil((blogData.description || '').split(' ').length / 200))} min read`,
              tags: blogData.tags || [],
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
            };
          }
        }));
        
        setBlogs(transformedBlogs);
        
        // Extract all unique tags
        const allTags = [];
        transformedBlogs.forEach(blog => {
          if (blog.tags && Array.isArray(blog.tags)) {
            blog.tags.forEach(tag => {
              if (!allTags.includes(tag)) {
                allTags.push(tag);
              }
            });
          }
        });
        
        setTags(allTags);
      } else {
        console.warn("Using fallback blog data");
        setBlogs(FALLBACK_BLOGS);
        
        // Extract tags from fallback blogs
        const fallbackTags = [];
        FALLBACK_BLOGS.forEach(blog => {
          if (blog.tags && Array.isArray(blog.tags)) {
            blog.tags.forEach(tag => {
              if (!fallbackTags.includes(tag)) {
                fallbackTags.push(tag);
              }
            });
          }
        });
        setTags(fallbackTags);
      }
    } catch (error) {
      console.error("Failed to load blogs:", error);
      setBlogs(FALLBACK_BLOGS); // Use fallback data on error
      
      // Extract tags from fallback blogs on error
      const fallbackTags = [];
      FALLBACK_BLOGS.forEach(blog => {
        if (blog.tags && Array.isArray(blog.tags)) {
          blog.tags.forEach(tag => {
            if (!fallbackTags.includes(tag)) {
              fallbackTags.push(tag);
            }
          });
        }
      });
      setTags(fallbackTags);
    } finally {
      setIsLoading(false);
    }
  }

  // Update URL when tags change
  useEffect(() => {
    if (!hasMounted.current) return;
    
    if (selectedTags.length > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('tag', selectedTags[0]); 
      router.push(`/blog?${params.toString()}`);
    } else if (selectedTagFromUrl) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('tag');
      router.push(`/blog?${params.toString()}`);
    }
  }, [selectedTags, router, searchParams, selectedTagFromUrl]);
  
  // Filter blogs based on selected tags and search query
  useEffect(() => {
    const filtered = blogs.filter(blog => {
      const matchesTag = selectedTags.length === 0 || 
        (blog.tags && blog.tags.some(tag => selectedTags.includes(tag)));
      
      const matchesSearch = !searchTerm || 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.description && blog.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      return matchesTag && matchesSearch;
    });

    // Sort by date - newest first
    const sortedResults = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    
    setFilteredResults(sortedResults);
  }, [blogs, selectedTags, searchTerm]);

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
    setSearchTerm('');
    setSelectedTags([]);
  };
  
  // Get featured post (most recent)
  const featuredPost = filteredResults.length > 0 ? filteredResults[0] : null;
  const remainingPosts = filteredResults.length > 1 ? filteredResults.slice(1) : [];
  
  // Format date nicely
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };
  
  // Add JavaScript for sticky tag bar behavior
  useEffect(() => {
    const stickyTagBar = document.getElementById('sticky-tag-bar');
    
    const handleScroll = () => {
      if (window.scrollY > 250) {
        stickyTagBar.classList.remove('-translate-y-full', 'opacity-0');
        stickyTagBar.classList.add('translate-y-0', 'opacity-100');
      } else {
        stickyTagBar.classList.add('-translate-y-full', 'opacity-0');
        stickyTagBar.classList.remove('translate-y-0', 'opacity-100');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section with animation and personality */}
      <div className="relative bg-gradient-to-b from-blue-100 to-white dark:from-slate-900 dark:to-slate-800 py-8 md:py-12 border-b border-slate-200/80 dark:border-blue-900/30 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(30,64,175,0.15),transparent)]"></div>
          {Array.from({ length: 20 }).map((_, i) => {
            const size = Math.random() * 4 + 1;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-blue-500/5 dark:bg-blue-400/10"
                style={{
                  width: size,
                  height: size,
                  top: `${initialY}%`,
                  left: `${initialX}%`,
                  animation: `float ${duration}s infinite ease-in-out ${delay}s`
                }}
              ></div>
            );
          })}
        </div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center">
            {/* Animated Title with better light mode contrast */}
            <div className="w-full text-center mb-6 md:mb-8">
              <div className="mb-3 h-0.5 w-16 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto"></div>
              <h1 className="font-mono font-bold text-4xl md:text-5xl mb-3 animate-fade-in-up bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-400 dark:to-cyan-300">
                blog.minh()
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mt-3 max-w-2xl mx-auto animate-fade-in">
                // Personal insights on AI, LLMs, privacy, and dev
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm md:text-lg mt-3 max-w-2xl mx-auto font-light animate-fade-in-delayed">
                Exploring the cutting edge of AI with code-first storytelling.
              </p>
              
              {/* Tag navigation */}
              <div className="mt-6 flex flex-wrap justify-center gap-2 animate-fade-in-up-delayed">
                <span className="text-xs text-blue-300 dark:text-blue-300 font-mono mr-2 self-center">Explore:</span>
                {tags.slice(0, 6).map(tag => (
                  <button
                    key={`hero-${tag}`}
                    onClick={() => handleTagSelect(tag)}
                    className={`px-2.5 py-1 text-xs rounded-md shadow-sm transition-all duration-300 transform hover:scale-105 ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white border border-blue-500 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/20'
                        : 'bg-slate-800/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-300/50 dark:border-slate-700/70 hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-blue-300/60 dark:hover:border-blue-900/60'
                    }`}
                  >
                    <span className="relative">
                      #{tag}
                      <span className={`absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 transition-transform duration-300 ${selectedTags.includes(tag) ? 'bg-white/40' : 'bg-blue-400/40'} group-hover:scale-x-100`}></span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Enhanced Search Bar */}
            <div className="w-full max-w-xl relative z-10 animate-fade-in-delayed">
              <div className="flex items-center gap-2">
                <div className="relative flex-1 group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-blue-500/70 dark:text-blue-400 transition-colors duration-200" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 rounded-lg border border-slate-300 dark:border-blue-900/40 bg-white/90 dark:bg-slate-800/80 text-slate-800 dark:text-gray-200 placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 dark:focus:border-blue-500 transition-all shadow-sm hover:shadow-md focus:shadow-lg dark:shadow-blue-900/10 hover:dark:shadow-blue-900/20"
                  />
                  {searchTerm && (
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-gray-200 transition-colors duration-200"
                      onClick={() => setSearchTerm('')}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-3 rounded-lg border shadow-lg shadow-blue-900/10 ${selectedTags.length > 0 ? 'border-blue-500 text-blue-400 bg-blue-900/30' : 'border-blue-900/40 text-gray-300 bg-slate-800/80'} hover:bg-slate-700 transition-all flex items-center`}
                >
                  <Filter className="h-4 w-4" />
                </button>
              </div>
              
              {/* Filter dropdown */}
              {showFilters && (
                <div className="absolute mt-2 w-full bg-slate-800/95 border border-blue-900/30 rounded-lg shadow-xl backdrop-blur-sm p-4 z-20 animate-fade-in">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                      <Tag className="h-3 w-3 text-blue-400" />
                      Filter by Tags
                    </h3>
                    {selectedTags.length > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900/40 scrollbar-track-slate-900/20 pr-1">
                    {tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagSelect(tag)}
                        className={`px-2 py-1 text-xs rounded-md flex items-center gap-1 transition-all ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-600/50 text-blue-200 border border-blue-500/60'
                            : 'bg-slate-800/70 text-slate-300 border border-slate-700 hover:bg-slate-700/70 hover:border-blue-900/40'
                        }`}
                      >
                        <Hash className="h-2.5 w-2.5" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-delayed {
          0% { opacity: 0; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fade-in-up-delayed {
          0% { 
            opacity: 0;
            transform: translateY(10px);
          }
          50% { 
            opacity: 0;
            transform: translateY(10px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        /* Hide scrollbar but maintain functionality */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Animation for scroll reveal */
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      
      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-12">
        {/* Stats and filters display */}
        {!isLoading && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-slate-400" />
              <span className="text-xs text-slate-400 font-mono">
                {filteredResults.length} {filteredResults.length === 1 ? 'article' : 'articles'} found
              </span>
            </div>
            
            {/* Active tag display */}
            {selectedTags.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex flex-wrap gap-1">
                  {selectedTags.map(tag => (
                    <span 
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-900/30 text-blue-300 border border-blue-900/40"
                    >
                      {tag}
                      <button 
                        onClick={() => handleTagSelect(tag)}
                        className="ml-1.5 text-blue-300 hover:text-blue-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Loading state */}
        {isLoading && (
          <div className="w-full flex items-center justify-center py-10">
            <div className="flex flex-col items-center">
              <div className="relative w-10 h-10 mb-3">
                <div className="absolute top-0 left-0 right-0 bottom-0 border-2 border-blue-900/30 rounded-full"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 border-2 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
              </div>
              <p className="text-slate-400 font-mono text-xs">Loading articles...</p>
            </div>
          </div>
        )}
        
        {/* No results state */}
        {filteredResults.length === 0 && !isLoading && (
          <div className="w-full rounded-lg bg-slate-800/50 border border-blue-900/20 p-8 text-center my-8">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-slate-700/50">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">No articles found</h3>
            <p className="text-slate-400 mb-4 text-sm">
              No posts match your current search criteria.
            </p>
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
        
        {/* Blog content with featured post */}
        {!isLoading && filteredResults.length > 0 && (
          <div className="space-y-12 animate-fade-in">
            {/* Featured post */}
            {featuredPost && (
              <div ref={featuredRef} className="opacity-0 translate-y-4 transition-all duration-700">
                <div className="relative flex items-center mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></div>
                  <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">Featured Post</span>
                </div>
                
                <Link href={featuredPost.route} className="block group">
                  <article className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/80 dark:to-slate-900/90 border border-slate-200 dark:border-blue-900/30 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] shadow-lg shadow-slate-200/50 dark:shadow-blue-900/10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                      {/* Left side - Feature image and content */}
                      <div className="relative lg:col-span-5 h-64 lg:h-auto border-b lg:border-b-0 lg:border-r border-blue-900/20 overflow-hidden group-hover:brightness-105 transition-all">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 to-purple-800 opacity-90"></div>
                        <div className="absolute inset-0 flex flex-col justify-center p-6 text-white z-10">
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {featuredPost.tags && featuredPost.tags.map(tag => (
                              <span 
                                key={`featured-${tag}`}
                                className="inline-block px-2 py-0.5 text-xs bg-white/20 rounded shadow-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h2 className="text-xl lg:text-2xl font-bold mb-3 font-mono tracking-tight group-hover:translate-x-0.5 transition-transform">{featuredPost.title}</h2>
                          <p className="text-white/90 text-sm line-clamp-3 mb-5">{featuredPost.description}</p>
                          <div className="mt-auto flex items-center justify-between text-xs text-white/80">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1.5" />
                              {formatDate(featuredPost.date)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1.5" />
                              {featuredPost.readingTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right side - Code preview */}
                      <div className="lg:col-span-7 p-6">
                        <div className="bg-slate-900/90 rounded-lg overflow-hidden shadow-inner mb-4 border border-slate-800/80">
                          <div className="flex items-center justify-between bg-slate-800/70 px-4 py-2 text-slate-400 text-xs border-b border-slate-700/50">
                            <div className="flex space-x-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                            </div>
                            <span className="font-mono">blog-preview.js</span>
                          </div>
                          
                          <div className="p-4 font-mono text-sm overflow-hidden">
                            {/* Code lines with animation */}
                            <div className="code-line opacity-0 animate-[code-line-appear_0.3s_0.2s_forwards] text-slate-300">
                              <span className="text-blue-400">import</span> {" "}
                              &#123; article &#125; <span className="text-blue-400">from</span> <span className="text-green-400">'@blog/content'</span>;
                            </div>
                            <div className="code-line opacity-0 animate-[code-line-appear_0.3s_0.4s_forwards] text-slate-300">
                              <span className="text-blue-400">import</span> {" "}
                              &#123; Minh &#125; <span className="text-blue-400">from</span> <span className="text-green-400">'@ai/engineer'</span>;
                            </div>
                            <div className="code-line opacity-0 animate-[code-line-appear_0.3s_0.6s_forwards] text-slate-300"></div>
                            <div className="code-line opacity-0 animate-[code-line-appear_0.3s_0.8s_forwards] text-slate-300">
                              <span className="text-purple-400">function</span> <span className="text-yellow-400">FeaturedBlogPost</span>() &#123;
                            </div>
                            <div className="code-line opacity-0 animate-[code-line-appear_0.3s_1.0s_forwards] text-slate-300">
                              &nbsp;&nbsp;<span className="text-slate-500">// Latest insights on {featuredPost.tags && featuredPost.tags[0]}</span>
                            </div>
                            <div className="code-line opacity-0 animate-[code-line-appear_0.3s_1.2s_forwards] text-slate-300">
                              &nbsp;&nbsp;<span className="text-blue-400">return</span> (
                            </div>
                            <div className="code-line opacity-0 animate-[code-line-appear_0.3s_1.4s_forwards] text-slate-300">
                              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-green-400">Article</span>&gt;
                            </div>
                            <div className="code-line opacity-0 animate-[code-line-appear_0.3s_1.6s_forwards] text-slate-300">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-green-400">Title</span>&gt;<span className="text-orange-400">"{featuredPost.title.substring(0, 25)}..."</span>&lt;/<span className="text-green-400">Title</span>&gt;
                            </div>
                            <div className="code-line opacity-0 animate-[code-line-appear_0.3s_1.8s_forwards] text-slate-300">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-green-400">Author</span>&gt;<span className="text-orange-400">MinhBTC</span>&lt;/<span className="text-green-400">Author</span>&gt;
                            </div>
                            <div className="code-line opacity-0 animate-[code-line-appear_0.3s_2.0s_forwards] text-slate-300">
                              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-green-400">Article</span>&gt;
                            </div>
                            <div className="code-line opacity-0 animate-[code-line-appear_0.3s_2.2s_forwards] text-slate-300">
                              &nbsp;&nbsp;);
                            </div>
                            <div className="code-line opacity-0 animate-[code-line-appear_0.3s_2.4s_forwards] text-slate-300">
                              &#125;
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <span className="inline-flex items-center text-blue-400 group-hover:text-blue-300 font-mono border border-blue-500/30 px-3 py-1 rounded group-hover:border-blue-400/50 transition-all">
                            read_article()
                            <ArrowRight className="h-3.5 w-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            )}
            
            {/* More articles */}
            <div ref={moreRef} className="mt-16 opacity-0 translate-y-4 transition-all duration-700">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">More Articles</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
              </div>

              {filteredResults.length > 1 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults
                    .filter(post => post.route !== featuredPost?.route)
                    .map((post) => (
                      <Link key={post.route} href={post.route} className="group">
                        <article className="h-full bg-slate-800/50 border border-slate-700/30 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                          <div className="p-5 flex flex-col flex-grow">
                            <div className="flex flex-wrap gap-1 mb-3">
                              {post.tags && post.tags.map(tag => (
                                <span 
                                  key={`${post.route}-${tag}`}
                                  className="inline-block px-1.5 py-0.5 text-xs bg-slate-700/80 text-slate-300 rounded group-hover:bg-blue-900/30 group-hover:text-blue-200 transition-colors"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <h3 className="text-lg font-bold mb-2 font-mono group-hover:text-blue-300 transition-colors">{post.title}</h3>
                            <p className="text-slate-400 text-sm flex-grow line-clamp-3 mb-4">{post.description}</p>
                            <div className="mt-auto flex justify-between items-center text-xs text-slate-500">
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1.5" />
                                {formatDate(post.date)}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1.5" />
                                {post.readingTime}
                              </span>
                            </div>
                          </div>
                          
                          {/* Animated line at bottom */}
                          <div className="h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-500"></div>
                        </article>
                      </Link>
                    ))}
                </div>
              ) : (
                <div className="relative bg-slate-800/30 border border-slate-700/30 rounded-lg p-8 text-center animate-fade-in">
                  <div className="flex justify-center mb-4">
                    <BookMarked className="h-12 w-12 text-blue-400 opacity-80" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 font-mono">More posts coming soon</h3>
                  <p className="text-slate-400 max-w-lg mx-auto mb-6">
                    I'm working on more content about AI engineering, LLMs, and front-end development.
                    Check back soon for new articles!
                  </p>
                  
                  <div className="mt-8">
                    <h4 className="text-sm font-medium mb-3 text-slate-300">Browse by popular tags</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {popularTags.map(tag => (
                        <button
                          key={`suggest-${tag}`}
                          onClick={() => handleTagSelect(tag)}
                          className="px-3 py-1.5 text-sm rounded-full bg-blue-900/30 text-blue-300 hover:bg-blue-800/40 transition-colors border border-blue-800/50"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Background decorations */}
                  <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-xl"></div>
                  <div className="absolute -top-3 -left-3 w-16 h-16 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-lg"></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Floating tag filters */}
        {!isLoading && filteredResults.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white p-3 rounded-full flex items-center justify-center shadow-lg hover:shadow-blue-500/20 transition-all transform hover:scale-105"
              aria-label="Filter by tags"
            >
              <Hash className="h-5 w-5" />
            </button>
            
            <div 
              className={`absolute right-0 bottom-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-4 w-60 transition-all duration-300 
                ${isFilterOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible'}`}
            >
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-mono">Filter by tags</p>
              <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                {tags.map(tag => (
                  <button
                    key={`float-${tag}`}
                    onClick={() => handleTagSelect(tag)}
                    className={`px-2 py-1.5 text-xs rounded-md w-full text-left transition-colors flex items-center gap-2
                      ${selectedTags.includes(tag) 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800' 
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300 border border-transparent'
                      }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedTags.includes(tag) ? 'bg-blue-500 dark:bg-blue-400' : 'bg-slate-400 dark:bg-slate-500'}`}></span>
                    {tag}
                  </button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <button 
                  onClick={clearFilters}
                  className="mt-3 w-full text-xs py-1.5 px-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 rounded transition-colors flex items-center justify-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <X className="h-3 w-3" />
                  Clear filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Now add a sticky tag bar that appears when scrolling */}
        <div id="sticky-tag-bar" className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200/80 dark:border-slate-800/80 py-2 transform translate-y-0 transition-all duration-300 opacity-0 -translate-y-full">
          <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Filter:</span>
              <div className="flex flex-wrap gap-1.5 overflow-x-auto max-w-[50vw] pb-1 hide-scrollbar">
                {tags.slice(0, 8).map(tag => (
                  <button
                    key={`sticky-${tag}`}
                    onClick={() => handleTagSelect(tag)}
                    className={`px-2 py-0.5 text-xs rounded-full transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700/70'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <span>Top</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPageContent; 