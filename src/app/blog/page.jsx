"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import { useTheme } from 'next-themes'
import { ChevronDown, Search, X, Filter, Tag } from "lucide-react";
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
  
  return (
    <div className="flex flex-col gap-12 max-w-4xl mx-auto px-4 py-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2 text-slate-800 dark:text-slate-200 font-mono uppercase">BLOG</h1>
        <p className="text-slate-700 dark:text-slate-400">
          Thoughts on AI, development, and technology
        </p>
      </header>
      
      {/* Search section */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 rounded-lg border border-gray-200 dark:border-blue-900/30 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
        />
      </div>
      
      {/* Filters section */}
      <div className="w-full">
        <div className="p-4 bg-white/95 dark:bg-slate-800/30 backdrop-blur-sm border border-slate-300 dark:border-blue-900/20 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-slate-800 dark:text-slate-200 font-mono">// FILTERS</h2>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-slate-800 dark:text-slate-200">TAGS</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className={`px-2 py-1 text-sm rounded-md ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-900/40'
                      : 'bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700/50 hover:bg-blue-50 dark:hover:bg-slate-800/80'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Blog count */}
      <div className="w-full text-left">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {filteredResults.length} {filteredResults.length === 1 ? 'article' : 'articles'} found
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="w-full text-center py-12 bg-white dark:bg-slate-800/30 border border-gray-200 dark:border-blue-900/20 rounded-lg">
          <div className="inline-block h-6 w-6 border-2 border-t-transparent border-blue-600 rounded-full animate-spin mb-2"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading posts...</p>
        </div>
      )}
      
      {/* No results state */}
      {filteredResults.length === 0 && !isLoading && (
        <div className="w-full text-center py-12 bg-white dark:bg-slate-800/30 border border-gray-200 dark:border-blue-900/20 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No posts found matching your criteria.
          </p>
          <button
            onClick={clearFilters}
            className="text-blue-600 dark:text-blue-400 text-sm"
          >
            Clear filters
          </button>
        </div>
      )}
      
      {/* Blog list */}
      {!isLoading && filteredResults.length > 0 && (
        <div className="space-y-8 w-full">
          {filteredResults.map((blog) => (
            <Link
              href={blog.route}
              key={blog.route}
              className="block"
            >
              <article className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-blue-900/20 rounded-lg p-5 hover:shadow-md transition-all">
                <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono">
                  {blog.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{blog.description}</p>
                
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {blog.tags && blog.tags.map(tag => (
                      <span 
                        key={`${blog.route}-${tag}`}
                        className="px-2 py-0.5 text-xs rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-500 font-mono">
                    <time dateTime={blog.date}>
                      {new Date(blog.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </time>
                    <span className="mx-2">·</span>
                    <span>{blog.readingTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogPageContent; 