"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Calendar, Clock, Tag, Search } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// Fallback blog data for testing when API is not working
const FALLBACK_BLOGS = [
  {
    route: "/blog/langchain-chatbot",
    title: "Building a privacy-first LangChain Chatbot",
    description: "Learn how to build a secure, privacy-centric chatbot using LangChain, integrating large language models while keeping user data protected.",
    date: "2023-07-15",
    tags: ["LangChain", "AI", "Privacy"],
    image: "/images/placeholders/placeholder1.jpg"
  }
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTags, setActiveTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    loadInitialData();
    // Load all available tags
    fetch("/api/tag")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllTags(data);
        }
      })
      .catch(err => console.error("Failed to load tags:", err));
  }, []);

  async function loadInitialData() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/blog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Use the API data or fallback to test data if empty
      if (data && data.children && Array.isArray(data.children) && data.children.length > 0) {
        // Transform the data into our expected format
        const transformedBlogs = await Promise.all(data.children.map(async (route) => {
          try {
            const blogData = await fetch(`/api${route}`).then(res => res.json());
            return {
              route,
              title: blogData.title || "Untitled Post",
              description: blogData.description || "No description provided",
              date: blogData.date || new Date().toISOString(),
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
      setBlogs(FALLBACK_BLOGS);
    } finally {
      setIsLoading(false);
    }
  }

  const toggleTag = (tag) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const filteredBlogs = activeTags.length > 0 
    ? blogs.filter(blog => 
        blog.tags && activeTags.some(tag => blog.tags.includes(tag))
      )
    : blogs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/50 to-indigo-50/30 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-16 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 text-center md:text-left"
            >
              <div className="inline-block mb-4 text-xs font-medium px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300 rounded-full">
                All Posts
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-800 dark:text-white">
                <span className="relative">
                  Developer <span className="gradient-text">Blog</span>
                  <span className="absolute -top-6 -right-8">
                    <Sparkles className="w-6 h-6 text-sky-500" />
                  </span>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto md:mx-0">
                Insights, tutorials, and thoughts about AI engineering, machine learning, and building better technical solutions.
              </p>
              
              {/* Search */}
              <div className="max-w-md mx-auto md:mx-0 mb-8 relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="input w-full pl-10"
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-300/10 dark:bg-sky-700/10 rounded-full filter blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-300/10 dark:bg-indigo-700/10 rounded-full filter blur-3xl -z-10"></div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with filter tags */}
          <div className="md:w-1/4">
            <div className="sticky top-24 card p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <Tag className="w-4 h-4 mr-2 text-sky-500" />
                <span>Filter by Topic</span>
              </h2>
              
              <div className="space-y-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium w-full text-left transition-colors ${
                      activeTags.includes(tag) 
                        ? 'bg-sky-500 text-white dark:bg-sky-600'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              
              {activeTags.length > 0 && (
                <button
                  onClick={() => setActiveTags([])}
                  className="mt-4 w-full text-center text-xs font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:w-3/4">
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="card p-0 animate-pulse overflow-hidden">
                    <div className="h-48 bg-slate-200 dark:bg-slate-700 mb-4"></div>
                    <div className="p-6">
                      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-4"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                    </div>
                  </div>
                ))
              ) : filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.route || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <article className="card overflow-hidden flex flex-col">
                      <Link href={blog.route} className="block relative h-48 overflow-hidden">
                        {blog.image ? (
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-500 dark:from-sky-600 dark:to-indigo-700" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70" />
                        
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                            {blog.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="px-2 py-1 text-xs font-medium rounded-full bg-sky-500/90 text-white backdrop-blur-sm">
                                {tag}
                              </span>
                            ))}
                            {blog.tags.length > 2 && (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-500/90 text-white backdrop-blur-sm">
                                +{blog.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </Link>
                      
                      <div className="flex flex-col justify-between flex-grow p-6">
                        <div>
                          <Link href={blog.route}>
                            <h2 className="text-xl font-bold mb-3 text-slate-800 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                              {blog.title}
                            </h2>
                          </Link>
                          <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 line-clamp-3">
                            {blog.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <time>
                              {blog.date ? new Date(blog.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              }) : "No date"}
                            </time>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{Math.max(1, Math.ceil(blog.description.split(' ').length / 200))} min read</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center py-20 text-center">
                  <div className="glass p-8 rounded-xl">
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-4">
                      {activeTags.length > 0 
                        ? `No blog posts found with the selected tags: ${activeTags.join(', ')}`
                        : "No blog posts found"}
                    </p>
                    {activeTags.length > 0 ? (
                      <button
                        onClick={() => setActiveTags([])}
                        className="btn-gradient px-4 py-2 rounded-lg"
                      >
                        Clear Filters
                      </button>
                    ) : (
                      <button
                        onClick={loadInitialData}
                        className="btn-secondary-gradient px-4 py-2 rounded-lg"
                      >
                        Retry
                      </button>
                    )}
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