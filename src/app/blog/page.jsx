"use client";

import React, { 
  Suspense, 
  useState, 
  useEffect, 
  useRef,
  useMemo 
} from "react";
import { motion } from "framer-motion";
import { useTheme } from 'next-themes';
import { Search, X, Filter, Code, BookOpen, Tag, Clock, Calendar, ArrowRight, Hash, BookMarked, Sparkles, TrendingUp, FileText, BrainCircuit, Terminal, Map } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Typewriter } from "react-simple-typewriter";

// Enhanced blog data with more examples
const FALLBACK_BLOGS = [
  {
    route: "/blog/langchain-chatbot",
    title: "Building a Privacy-First AI Chatbot with LangChain",
    description: "The langchain-chatbot repository is a comprehensive implementation of an AI-powered conversational tool designed for developers and enthusiasts in the AI space.",
    date: "2023-07-15",
    readingTime: "8 min read",
    tags: ["ai", "langchain", "privacy", "development"],
    featured: true
  },
];

// Helper to format dates nicely
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Main blog page component with proper Suspense boundaries
function BlogPageContent() {
  const { resolvedTheme } = useTheme();
  const [blogs] = useState(FALLBACK_BLOGS);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const exploreSectionRef = useRef(null);
  
  // Track scroll position for sticky tags
  useEffect(() => {
    const handleScroll = () => {
      if (!exploreSectionRef.current) return;
      const exploreSectionPos = exploreSectionRef.current.getBoundingClientRect().top;
      setScrolled(exploreSectionPos < 0);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Popular tags derived from all blog posts
  const popularTags = useMemo(() => {
    const allTags = blogs.flatMap(blog => blog.tags || []);
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  }, [blogs]);
  
  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle tag selection
  const handleTagClick = (tag) => {
    setSelectedTags(prevTags => {
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag);
    } else {
        return [...prevTags, tag];
      }
    });
  };
  
  // Filter blogs based on selected tags
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      // Match selected tags (if any)
      return selectedTags.length === 0 || 
        selectedTags.some(tag => blog.tags?.includes(tag));
    });
  }, [blogs, selectedTags]);
  
  // Separate featured posts from regular posts
  const featuredPosts = useMemo(() => 
    filteredBlogs.filter(blog => blog.featured),
    [filteredBlogs]
  );
  
  const regularPosts = useMemo(() => 
    filteredBlogs.filter(blog => !blog.featured),
    [filteredBlogs]
  );
  
  return (
    <div className="bg-gray-900 dark:bg-slate-900 min-h-screen w-full overflow-hidden">
      {/* Hero section with enhanced styling */}
      <div className="relative overflow-hidden">
        {/* Background gradients - improved for light mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 dark:from-blue-900/20 dark:to-purple-900/20"></div>
        
        {/* Animated code particles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow-delayed"></div>
        
        {/* Code symbols floating in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-25">
          {Array.from({ length: 10 }).map((_, i) => {
            const symbols = ["{}", "[]", "()", "</>", "=>", "&&", "||", "//", "/**/", "..."];
            const size = Math.random() * 20 + 10;
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            
            return (
              <motion.div
                key={i}
                className="absolute text-blue-600 dark:text-blue-400 font-mono text-lg"
                style={{
                  top: `${initialY}%`,
                  left: `${initialX}%`,
                  fontSize: size
                }}
                animate={{
                  y: [0, Math.random() * 30 - 15],
                  opacity: [0.3, 0.8, 0.3],
                  rotate: [0, Math.random() * 40 - 20]
                }}
                transition={{
                  duration: Math.random() * 7 + 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {symbols[i % symbols.length]}
              </motion.div>
            );
          })}
        </div>
        
        <div className="max-w-4xl mx-auto px-4 pt-10 sm:pt-16 relative z-10">
          <motion.div 
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Glassmorphic Title Card */}
            <div className="inline-block relative p-4 rounded-xl backdrop-blur-lg border border-gray-200 dark:border-white/20 bg-white/70 dark:bg-slate-900/40 shadow-lg mb-3">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 dark:from-blue-500/10 dark:to-purple-500/10 rounded-xl"></div>
              <div className="flex items-center justify-center">
                <Sparkles className="h-7 w-7 text-blue-600 dark:text-blue-400 mr-3 animate-sparkle" />
                <h1 className="text-4xl sm:text-5xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-cyan-400">
                  ✨ BLOG.MINH<span className="text-blue-600 dark:text-cyan-400">()</span>
                </h1>
              </div>
              
              {/* Version Badge */}
              <div className="absolute -top-2 -right-2 px-2 py-1 bg-blue-600 dark:bg-blue-700 text-white text-xs font-mono rounded shadow-md transform rotate-3 flex items-center gap-1">
                <Code className="h-3 w-3" />
                <span>v0.2.1-alpha</span>
              </div>
            </div>
            
            {/* Terminal-style subtitle */}
            <div className="font-mono text-sm text-gray-700 dark:text-slate-300 flex items-center justify-center gap-2 bg-gray-800/95 dark:bg-slate-800/95 px-3 py-1.5 rounded-md border border-gray-700 dark:border-slate-700 shadow-sm text-green-400">
              <span className="text-green-400 font-bold">$</span>
              <Typewriter
                words={['// Exploring the edge of AI with code-first storytelling']}
                loop={false}
                cursor={true}
                cursorStyle='_'
                typeSpeed={50}
                delaySpeed={1000}
              />
            </div>
            
            {/* Floating thought bubble */}
            <motion.div 
              className="mt-4 px-3 py-1.5 bg-gray-800 dark:bg-blue-900/30 text-blue-300 dark:text-blue-300 text-xs font-mono rounded-lg inline-flex items-center border border-gray-700 dark:border-blue-800"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            >
              <Code className="h-3.5 w-3.5 mr-1.5" />
              <span>This blog auto-updates as I learn</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full">
              <div className="relative group">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg blur-lg -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-1 rounded-lg shadow-sm border border-gray-200/50 dark:border-slate-700/50 flex items-center gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search articles... (Ctrl+K)"
                      className="w-full py-2.5 pl-10 pr-12 bg-gray-800/80 dark:bg-slate-800/80 border-0 rounded-md text-sm transition-all duration-300 focus:border-blue-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 shadow-inner font-mono text-gray-300"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <kbd className="hidden md:inline-flex items-center gap-1 text-[10px] font-medium bg-gray-700 dark:bg-slate-700 px-1.5 py-0.5 rounded border border-gray-600 dark:border-slate-600 text-gray-300 dark:text-gray-400">
                        <span className="text-xs">⌘</span>K
                      </kbd>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => setFilterOpen(!filterOpen)}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-2.5 rounded-md flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md ${
                      filterOpen 
                        ? 'bg-blue-900/60 dark:bg-blue-900/30 text-blue-400 dark:text-blue-400 ring-2 ring-blue-800 dark:ring-blue-900'
                        : 'bg-gray-800/90 dark:bg-slate-700/90 text-gray-300 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-blue-900/20 hover:text-blue-400 dark:hover:text-blue-400'
                    } border border-gray-700 dark:border-slate-700/80 font-mono`}
                  >
                    <Filter className={`h-4 w-4 mr-2 transition-transform duration-300 ${filterOpen ? 'rotate-180' : ''}`} />
                    <span className="text-sm font-medium">filter</span>
                    {selectedTags.length > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white"
                      >
                        {selectedTags.length}
                      </motion.span>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {filterOpen && (
            <div className="mt-4 p-5 bg-gray-800/95 dark:bg-slate-800/80 border border-gray-700 dark:border-slate-700/80 rounded-lg shadow-lg backdrop-blur-sm animate-in fade-in-50 duration-300 text-gray-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-300 dark:text-slate-300 flex items-center font-mono">
                  <Tag className="h-4 w-4 mr-2 text-blue-400" />
                  <span className="text-green-400 dark:text-green-400 mr-1.5 font-bold">$</span>
                  filter --tags
                </h3>
                {selectedTags.length > 0 && (
                  <button 
                    onClick={() => setSelectedTags([])}
                    className="text-xs text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-all flex items-center font-mono"
                  >
                    <X className="h-3 w-3 mr-1" />
                    clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {popularTags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant={selectedTags.includes(tag) ? "default" : "secondary"} 
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedTags.includes(tag) 
                        ? 'bg-blue-900/60 dark:bg-blue-900/40 text-blue-300 dark:text-blue-300 border border-blue-800 dark:border-blue-800/60 shadow-sm' 
                        : 'bg-gray-700 dark:bg-slate-700 text-gray-300 dark:text-gray-300 hover:bg-gray-600 dark:hover:bg-slate-600 border border-gray-600 dark:border-slate-600'
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    <Hash className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky tag bar */}
      <div 
        className={`fixed top-16 left-0 right-0 z-20 bg-gray-900/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-700 dark:border-slate-800 shadow-sm py-2 px-4 transition-all duration-300 transform ${
          scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex items-center bg-gray-800 dark:bg-slate-800/60 px-2 py-1 rounded-md border border-gray-700 dark:border-slate-700 mr-1 shadow-sm">
            <span className="text-green-400 dark:text-green-400 font-mono text-xs mr-1.5 font-bold">$</span>
            <span className="text-sm font-medium text-gray-300 dark:text-slate-400 whitespace-nowrap font-mono">explore</span>
          </div>
          
          {popularTags.map((tag) => (
            <Badge 
              key={tag} 
              variant={selectedTags.includes(tag) ? "default" : "secondary"} 
              className={`cursor-pointer transition-all hover:scale-105 whitespace-nowrap ${
                selectedTags.includes(tag) 
                  ? 'bg-blue-900/60 dark:bg-blue-900/40 text-blue-300 dark:text-blue-300 border border-blue-800 dark:border-blue-800/60' 
                  : 'bg-gray-700 dark:bg-slate-700 text-gray-300 dark:text-gray-300 hover:bg-gray-600 dark:hover:bg-slate-600 border border-gray-600 dark:border-slate-600'
              }`}
              onClick={() => handleTagClick(tag)}
            >
              <Hash className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 mt-12 pb-20">
        {/* Tag section reference for scroll detection */}
        <div ref={exploreSectionRef}></div>
        
        {/* Category tabs for organizing content */}
        <div className="mb-8 overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex items-center border rounded-md bg-gray-800 dark:bg-slate-800/40 border-gray-700 dark:border-slate-700 p-1 overflow-hidden shadow-sm">
            <motion.button
              className="px-4 py-2 text-gray-300 dark:text-slate-300 font-medium rounded-md bg-gray-900 dark:bg-slate-700/60 shadow-sm border border-gray-700 dark:border-slate-600 font-mono"
              whileHover={{ backgroundColor: "rgba(17, 24, 39, 1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-blue-400 dark:text-blue-400" />
                <span className="text-green-400 dark:text-green-400 mr-1">$</span>
                <span>all-posts</span>
              </div>
            </motion.button>
            
            <motion.button
              className="px-4 py-2 text-gray-400 dark:text-slate-400 font-medium rounded-md hover:bg-gray-700 dark:hover:bg-slate-700/40 font-mono"
              whileHover={{ backgroundColor: "rgba(55, 65, 81, 1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <BrainCircuit className="h-4 w-4 mr-2 text-gray-400 dark:text-slate-500" />
                <span className="text-gray-400 dark:text-gray-500 mr-1">$</span>
                <span>ai-logs</span>
              </div>
            </motion.button>
            
            <motion.button
              className="px-4 py-2 text-gray-400 dark:text-slate-400 font-medium rounded-md hover:bg-gray-700 dark:hover:bg-slate-700/40 font-mono"
              whileHover={{ backgroundColor: "rgba(55, 65, 81, 1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <Terminal className="h-4 w-4 mr-2 text-gray-400 dark:text-slate-500" />
                <span className="text-gray-400 dark:text-gray-500 mr-1">$</span>
                <span>debug-notes</span>
              </div>
            </motion.button>
            
            <motion.button
              className="px-4 py-2 text-gray-400 dark:text-slate-400 font-medium rounded-md hover:bg-gray-700 dark:hover:bg-slate-700/40 font-mono"
              whileHover={{ backgroundColor: "rgba(55, 65, 81, 1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <Map className="h-4 w-4 mr-2 text-gray-400 dark:text-slate-500" />
                <span className="text-gray-400 dark:text-gray-500 mr-1">$</span>
                <span>field-notes</span>
              </div>
            </motion.button>
          </div>
        </div>
        
        {/* Display content based on loading state */}
        {isLoading ? (
          <LoadingState />
        ) : filteredBlogs.length === 0 ? (
          <EmptyState onClear={() => setSelectedTags([])} />
        ) : (
          <BlogContent 
            featuredPosts={featuredPosts} 
            regularPosts={regularPosts} 
          />
        )}
      </div>
      
      {/* Enhanced floating action button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white shadow-lg flex items-center justify-center transform transition-all duration-300 ${
          scrolled ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90'
        }`}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up">
            <path d="m18 15-6-6-6 6"/>
          </svg>
          
          <motion.div 
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.button>
    </div>
  );
}

// Loading skeleton component
function LoadingState() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white dark:bg-slate-800 rounded-lg p-6 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}

// Empty state when no posts match filters
function EmptyState({ onClear }) {
  return (
    <div className="bg-white dark:bg-slate-800/90 border border-gray-700 dark:border-slate-700 rounded-lg p-10 text-center animate-fade-in">
      <Search className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-100 dark:text-white mb-2">No posts found</h3>
      <p className="text-gray-300 dark:text-gray-400 mb-6 max-w-md mx-auto">
        We couldn't find any posts matching your criteria. Try adjusting your filters.
      </p>
      <Button 
        onClick={onClear}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Clear all filters
      </Button>
    </div>
  );
}

// Blog content with featured and regular posts
function BlogContent({ featuredPosts, regularPosts }) {
  return (
    <>
      {/* Results count */}
      <div className="mb-8 flex items-center">
        <div className="bg-gray-800 dark:bg-blue-900/20 text-gray-300 dark:text-blue-300 px-3 py-1.5 rounded-md text-sm font-medium flex items-center border border-gray-700 dark:border-blue-800/30 font-mono shadow-sm">
          <span className="text-green-400 dark:text-green-400 mr-1.5 font-bold">$</span>
          <span className="mr-1.5">find</span>
          <BookMarked className="h-4 w-4 mr-2 text-blue-400 dark:text-blue-400" />
          <span className="text-blue-400 dark:text-blue-400">{featuredPosts.length + regularPosts.length}</span>
          <span className="ml-1 text-gray-300">{featuredPosts.length + regularPosts.length === 1 ? 'article' : 'articles'}</span>
        </div>
      </div>
      
      {/* Featured posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-16 animate-fade-in">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
            <h2 className="text-2xl font-bold text-gray-100 dark:text-slate-100">
              Featured Posts
            </h2>
          </div>
          
          <div className="grid md:grid-cols-1 gap-8">
            {featuredPosts.map((blog, index) => (
              <motion.div 
                key={blog.route || blog.slug}
                className="relative overflow-hidden card border-l-4 border-l-blue-500 dark:border-l-blue-600 border-t border-r border-b border-gray-200 dark:border-slate-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in hover:translate-y-[-2px]"
                style={{ animationDelay: `${index * 150}ms` }}
                whileHover={{ 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
              >
                {/* Terminal-inspired header */}
                <div className="bg-gray-800 dark:bg-slate-800/80 border-b border-gray-700 dark:border-slate-700 py-2 px-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500 ring-1 ring-red-700 dark:ring-red-700 shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 ring-1 ring-yellow-700 dark:ring-yellow-700 shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 ring-1 ring-green-700 dark:ring-green-700 shadow-sm"></div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-mono text-gray-300 dark:text-gray-400 mr-2 bg-gray-700/80 dark:bg-slate-700/70 px-2 py-0.5 rounded shadow-inner">~/blog/featured</span>
                    <motion.div 
                      className="px-2 py-0.5 bg-blue-500/90 text-white text-xs font-medium rounded flex items-center shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      <span>Featured</span>
                    </motion.div>
                  </div>
                </div>
                
                {/* Content with glassmorphism */}
                <div className="p-6 bg-gray-950/95 dark:bg-slate-800/95 backdrop-blur-sm transition-colors duration-300 relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center text-xs text-gray-300 dark:text-slate-400 mb-3 space-x-4">
                        <span className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {formatDate(blog.date)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {blog.readingTime}
                        </span>
                      </div>
                      
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-100 dark:text-slate-100 mb-3 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors">
                        {blog.title}
                      </h2>
                    </div>
                  </div>
                  
                  <div className="pl-3 border-l-2 border-blue-800 dark:border-blue-800 mb-4">
                    <p className="text-gray-300 dark:text-slate-400">
                      {blog.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags && blog.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md bg-blue-900/40 dark:bg-blue-900/20 text-blue-300 dark:text-blue-300 transition-colors border border-blue-800/60 dark:border-blue-800/30"
                      >
                        <Hash className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm font-mono text-gray-300 dark:text-gray-400 bg-gray-800 dark:bg-slate-700/30 px-2 py-1 rounded-md border border-gray-700 dark:border-slate-700">
                      <span className="text-green-400 dark:text-green-400 font-bold">$</span>
                      <span className="ml-1">/read-article</span>
                    </div>
                    
                    <Link 
                      href={blog.route || `/blog/${blog.slug}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group-hover:underline"
                    >
                      <span>Read article</span>
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                  
                  {/* Terminal status line */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-800 dark:bg-slate-700/30 border-t border-gray-700 dark:border-slate-700 py-1 px-3 flex items-center justify-between text-[10px] font-mono text-gray-300 dark:text-gray-400">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5 shadow-sm"></div>
                      <span>Ready</span>
                    </div>
                    <span>{Math.floor(Math.random() * 1000) + 100} lines</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* Regular posts - also enhance with card styling */}
      {regularPosts.length > 0 && (
        <div className="animate-fade-in" style={{ animationDelay: `${featuredPosts.length > 0 ? 200 : 0}ms` }}>
          <div className="flex items-center mb-6">
            <BookOpen className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
            <h2 className="text-2xl font-bold text-gray-100 dark:text-slate-100">
              {featuredPosts.length > 0 ? 'All Articles' : 'Articles'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {regularPosts.map((blog, index) => (
            <Link
                key={blog.route || blog.slug}
                href={blog.route || `/blog/${blog.slug}`}
                className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in block hover:translate-y-[-2px] hover:border-blue-300 dark:hover:border-blue-600/50"
                style={{ animationDelay: `${(index * 100) + 200}ms` }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-violet-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 to-violet-100/10 dark:from-blue-900/5 dark:to-violet-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Mini terminal header */}
                <div className="flex items-center justify-between bg-gray-800 dark:bg-slate-700/30 border-b border-gray-700 dark:border-slate-700 px-3 py-1">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-400 ring-1 ring-red-700 dark:ring-red-700 shadow-sm"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400 ring-1 ring-yellow-700 dark:ring-yellow-700 shadow-sm"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400 ring-1 ring-green-700 dark:ring-green-700 shadow-sm"></div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[10px] font-mono text-gray-300 dark:text-gray-400 bg-gray-700 dark:bg-slate-600/50 px-1.5 py-0.5 rounded shadow-inner">~/blog</span>
                  </div>
                </div>
                
                <div className="p-5 relative z-10 bg-gray-950/95 dark:bg-slate-800/95">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.tags && blog.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md bg-blue-900/40 dark:bg-blue-900/20 text-blue-300 dark:text-blue-300 transition-colors border border-blue-800/60 dark:border-blue-800/30"
                      >
                        <Hash className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="text-lg font-bold text-gray-100 dark:text-slate-100 mb-2 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors">
                    {blog.title}
                  </h2>
                  
                  <p className="text-gray-300 dark:text-slate-400 mb-4 text-sm line-clamp-2">
                    {blog.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-700 dark:border-slate-700/50">
                    <div className="flex items-center text-xs text-gray-300 dark:text-slate-500">
                      <div className="flex items-center mr-4">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{formatDate(blog.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{blog.readingTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-[10px] font-mono text-gray-300 dark:text-gray-400 mr-2 hidden group-hover:inline-flex">
                        <span className="text-green-400 dark:text-green-400 font-bold mr-1">$</span>cat
                      </span>
                      <span className="text-blue-400 dark:text-blue-400 text-sm font-medium flex items-center">
                        Read
                        <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
            </Link>
          ))}
          </div>
        </div>
      )}
    </>
  );
}

// Export with proper Suspense wrapper
export default function BlogPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <BlogPageContent />
    </Suspense>
  );
} 