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
import { cn } from "@/lib/utils";

// Enhanced blog data with more examples
const FALLBACK_BLOGS = [
  {
    route: "/blog/building-blog-with-ai",
    title: "How I Built My Blog with ChatGPT & Cursor — As an AI Engineer, Not a Frontend Dev",
    description: "My journey building a modern, developer-centric blog using AI tools like Cursor and GPT-4o, despite having limited frontend experience.",
    date: "2025-03-29",
    readingTime: "10 min read",
    tags: ["ai", "development", "cursor", "gpt4", "nextjs"],
    featured: true
  },
  {
    route: "/blog/langchain-chatbot",
    title: "Building a Privacy-First AI Chatbot with LangChain",
    description: "The langchain-chatbot repository is a comprehensive implementation of an AI-powered conversational tool designed for developers and enthusiasts in the AI space.",
    date: "2024-12-15",
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

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -5,
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }
};

const SearchBar = ({ onFilterToggle, filterOpen, selectedTagsCount, searchQuery, setSearchQuery }) => {
  
  return (
    <motion.div
      className="max-w-2xl mx-auto mb-10"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ delay: 0.3 }}
    >
      <div className="relative group">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg blur-lg -z-10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="bg-white/10 dark:bg-slate-800/30 backdrop-blur-md p-1 rounded-lg shadow-sm border border-gray-700/50 dark:border-slate-700/50 flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-blue-400" />
            </div>
            <Input
              type="text"
              placeholder="Search articles... (Ctrl+K)"
              className={cn(
                "w-full py-3 pl-10 pr-12 bg-gray-800/80 dark:bg-slate-800/80 border-0 rounded-md text-base transition-all duration-300",
                "focus:border-blue-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 shadow-inner font-mono text-gray-300"
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <kbd className="hidden md:inline-flex items-center gap-1 text-[10px] font-medium bg-gray-700 dark:bg-slate-700 px-1.5 py-0.5 rounded border border-gray-600 dark:border-slate-600 text-gray-300 dark:text-gray-400">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
          
          <motion.button
            onClick={onFilterToggle}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-3 py-3 rounded-md flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md",
              filterOpen 
                ? 'bg-blue-900/60 dark:bg-blue-900/30 text-blue-400 dark:text-blue-400 ring-2 ring-blue-800 dark:ring-blue-900'
                : 'bg-gray-800/90 dark:bg-slate-700/90 text-gray-300 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-blue-900/20 hover:text-blue-400 dark:hover:text-blue-400'
            )}
          >
            <Filter className={`h-4 w-4 mr-2 transition-transform duration-300 ${filterOpen ? 'rotate-180' : ''}`} />
            <span className="text-sm font-medium">filter</span>
            {selectedTagsCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white"
              >
                {selectedTagsCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
      
      {/* CALL TO ACTION TEXT */}
      <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2 font-mono">
        🧭 Start with featured posts or try <kbd className="px-1.5 py-0.5 bg-gray-800 dark:bg-slate-800 rounded text-gray-400">Ctrl + K</kbd> to search
      </p>
    </motion.div>
  );
};

const FilterTags = ({ isOpen, tags, selectedTags, onTagClick, onClearTags }) => {
  if (!isOpen) return null;
  
  return (
    <div className="mt-4 p-5 bg-gray-800/95 dark:bg-slate-800/80 border border-gray-700 dark:border-slate-700/80 rounded-lg shadow-lg backdrop-blur-sm animate-in fade-in-50 duration-300 text-gray-300 max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-300 dark:text-slate-300 flex items-center font-mono">
          <Tag className="h-4 w-4 mr-2 text-blue-400" />
          <span className="text-green-400 dark:text-green-400 mr-1.5 font-bold">$</span>
          filter --tags
        </h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearTags}
            className="text-xs text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-all flex items-center font-mono"
          >
            <X className="h-3 w-3 mr-1" />
            clear
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag) => (
          <Badge 
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "secondary"} 
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedTags.includes(tag)
                ? 'bg-blue-900/60 dark:bg-blue-900/40 text-blue-300 dark:text-blue-300 border border-blue-800 dark:border-blue-800/60 shadow-sm' 
                : 'bg-gray-700 dark:bg-slate-700 text-gray-300 dark:text-gray-300 hover:bg-gray-600 dark:hover:bg-slate-600 border border-gray-600 dark:border-slate-600'
            }`}
            onClick={() => onTagClick(tag)}
          >
            <Hash className="h-3 w-3 mr-1" />
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

const RegularPostCard = ({ post, index }) => (
  <motion.div
    className="flex flex-col overflow-hidden rounded-lg shadow transition-all duration-300
               border border-gray-200 bg-white hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 group relative"
    whileHover={{ 
      scale: 1.02, 
      y: -5,
      boxShadow: "0 0 15px 2px rgba(52, 211, 153, 0.2)"
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    {/* Terminal header (fixed height) */}
    <div className="flex items-center justify-between border-b px-4 py-2
                    bg-gray-100 dark:bg-slate-900 border-gray-200 dark:border-slate-700">
      <div className="flex gap-1.5">
        <div className="h-3 w-3 rounded-full bg-red-500 group-hover:animate-pulse"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500 group-hover:animate-pulse delay-75"></div>
        <div className="h-3 w-3 rounded-full bg-green-500 group-hover:animate-pulse delay-150"></div>
      </div>
      <span className="font-mono text-xs text-gray-500 dark:text-slate-400">
        ~/blog
      </span>
    </div>

    {/* Main content (expandable) */}
    <div className="flex flex-col flex-1 p-6">
      <div className="mb-4 flex items-center gap-4 text-xs text-gray-500 dark:text-slate-400">
        <Calendar className="h-4 w-4 text-blue-500" />
        {formatDate(post.date)}
        <Clock className="h-4 w-4 text-blue-500" />
        {post.readingTime}
      </div>

      {/* Title - Flexible */}
      <h2 className="mb-3 text-xl font-bold text-gray-800 dark:text-slate-200 flex-grow">
        {post.title}
      </h2>

      {/* Description - Fixed lines (line-clamp for consistent height) */}
      <p className="mb-4 text-sm text-gray-600 dark:text-slate-400 line-clamp-2 flex-grow">
        {post.description}
      </p>

      {/* Tags - Fixed height */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {post.tags?.map((tag) => (
          <motion.span
            key={tag}
            className="inline-flex items-center rounded border px-2 py-0.5 text-xs border-gray-200 bg-gray-100 text-blue-600 dark:border-slate-700 dark:bg-slate-700 dark:text-blue-400 cursor-pointer"
            whileHover={{ 
              boxShadow: "0 0 8px 1px rgba(59, 130, 246, 0.5)",
              y: -1,
              scale: 1.05
            }}
            transition={{ duration: 0.2 }}
          >
            <Hash className="mr-1 h-3 w-3" />
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Action Bar - fixed height */}
      <div className="mt-6 flex items-center justify-between border-t pt-4 border-gray-200 dark:border-slate-700">
        <div className="font-mono text-xs text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-gray-200 dark:border-slate-700 flex items-center">
          <span className="text-green-500">$</span>
          <span className="ml-1.5">read-article --title {post.title.split(' ')[0].toLowerCase()} --open</span>
          <span className="ml-1 animate-blink">|</span>
        </div>

        <Link
          href={post.route || `/blog/${post.slug}`}
          className="inline-flex items-center rounded bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600 transition hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        >
          Execute <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </div>
    </div>

    {/* Scan line animation */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent z-[-1] pointer-events-none opacity-0 group-hover:opacity-100"
      animate={{ y: ["100%", "-100%"] }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    />
  </motion.div>
);


const RegularPostsSection = ({ posts, hasFeatured }) => {
  if (!posts.length) return null;
  
  return (
    <motion.section
      className="mb-8 w-full max-w-none"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="flex items-center mb-4">
        <BookOpen className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-2" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">
          {hasFeatured ? 'All Articles' : 'Articles'}
        </h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {posts.map((post, index) => (
          <RegularPostCard 
            key={post.route || post.slug} 
            post={post}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
};

// Loading skeleton component
const LoadingState = () => {
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
};

// Empty state when no posts match filters
const EmptyState = ({ onClear }) => {
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
};

// Main blog page component with proper Suspense boundaries
function BlogPageContent() {
  const { resolvedTheme } = useTheme();
  const [blogs] = useState(FALLBACK_BLOGS);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
      const matchesTag =
        selectedTags.length === 0 ||
        selectedTags.some(tag => blog.tags?.includes(tag));
  
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase());
  
      return matchesTag && matchesSearch;
    });
  }, [blogs, selectedTags, searchQuery]);
  
  
  const regularPosts = useMemo(() => filteredBlogs, [filteredBlogs]);
  
  // Background elements with code symbols
  const CodeSymbolsBackground = () => (
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
  );
  
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 relative py-8">
      <CodeSymbolsBackground />
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <SearchBar
          onFilterToggle={() => setFilterOpen(prev => !prev)}
          filterOpen={filterOpen}
          selectedTagsCount={selectedTags.length}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
 
        <FilterTags
          isOpen={filterOpen}
          tags={popularTags}
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
          onClearTags={() => setSelectedTags([])}
        />
 
        {isLoading ? (
          <LoadingState />
        ) : filteredBlogs.length === 0 ? (
          <EmptyState onClear={() => setSelectedTags([])} />
        ) : (
          <RegularPostsSection posts={regularPosts} />
        )}
      </div>
    </main>
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

/* Additional animation styles */
const globalStyles = `
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

.typing-animation {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 1.5s steps(40, end);
}
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = globalStyles;
  document.head.appendChild(style);
} 