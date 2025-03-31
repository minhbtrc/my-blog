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
    className="relative overflow-hidden card border-l-4 border-l-blue-500 dark:border-l-blue-600 border-t border-r border-b border-gray-200 dark:border-slate-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in group"
    whileHover={{ 
      scale: 1.01, 
      y: -5,
      boxShadow: "0 0 15px 2px rgba(52, 211, 153, 0.2)"
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    {/* Terminal-inspired header */}
    <div className="bg-gray-50 dark:bg-slate-800/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-700/70 py-2 px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/40 dark:bg-red-500 ring-1 ring-red-600/30 dark:ring-red-700 shadow-sm group-hover:animate-pulse"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/40 dark:bg-yellow-500 ring-1 ring-yellow-600/30 dark:ring-yellow-700 shadow-sm group-hover:animate-pulse delay-75"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/40 dark:bg-green-500 ring-1 ring-green-600/30 dark:ring-green-700 shadow-sm group-hover:animate-pulse delay-150"></div>
      </div>
      <div className="flex items-center">
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 mr-2 bg-gray-100/80 dark:bg-slate-700/70 px-2 py-0.5 rounded shadow-inner">~/blog</span>
        <motion.div 
          className="px-2 py-0.5 bg-blue-500/90 text-white text-xs font-medium rounded-md flex items-center shadow-sm"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <FileText className="h-3 w-3 mr-1" />
          <span>Post</span>
        </motion.div>
      </div>
    </div>

    <div className="p-6 bg-white dark:bg-slate-800/80 backdrop-blur-md transition-colors duration-300 relative z-10">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0"></div>
      
      {/* Status badges */}
      {new Date(post.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-md transform rotate-3 shadow-lg z-20 group-hover:scale-110 transition-transform">
          🆕 NEW
        </div>
      )}
      
      {/* Trending badge for our example */}
      {post.title.includes("ChatGPT") && (
        <div className="absolute top-3 right-3 bg-orange-500/90 text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-md z-20 flex items-center">
          <span className="mr-1">🚀</span> TRENDING
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center text-xs text-gray-600 dark:text-slate-400 mb-3 space-x-4">
            <span className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1 text-blue-500 dark:text-blue-400" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1 text-blue-500 dark:text-blue-400" />
              {post.readingTime}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {post.title}
          </h2>
        </div>
      </div>

      <div className="pl-3 border-l-2 border-blue-500 dark:border-blue-600 mb-4 bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-r-md backdrop-blur-sm">
        <p className="text-gray-600 dark:text-slate-300 typing-animation">
          {post.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags?.slice(0, 3).map((tag) => {
          // Define emoji icon for each tag
          const tagIcons = {
            'ai': '🧠',
            'development': '💻',
            'cursor': '🖱️',
            'gpt4': '🤖',
            'nextjs': '⚡',
            'langchain': '⛓️',
            'privacy': '🔒'
          };
          
          return (
            <motion.span 
              key={tag}
              className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 transition-colors border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700 hover:scale-105 transform"
              whileHover={{ 
                boxShadow: "0 0 8px 1px rgba(59, 130, 246, 0.5)",
                y: -1
              }}
            >
              <span className="mr-1">{tagIcons[tag] || <Hash className="h-3 w-3" />}</span>
              {tag}
            </motion.span>
          );
        })}
      </div>

      <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-900/60 p-3 rounded-md border border-gray-200 dark:border-slate-700 mt-6 backdrop-blur-md">
        <div className="flex items-center text-sm font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-800/90 px-2.5 py-1 rounded-md border border-gray-200 dark:border-slate-700">
          <span className="text-green-600 dark:text-green-400 font-bold">$</span>
          <span className="ml-1.5">read-article --title {post.title.split(' ')[0].toLowerCase()} --open</span>
          <span className="ml-1 animate-blink">|</span>
        </div>

        <Link 
          href={post.route || `/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group-hover:underline bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        >
          <span>Execute</span>
          <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gray-50 dark:bg-slate-900/80 border-t border-gray-200 dark:border-slate-700/50 py-1.5 px-3 flex items-center justify-between text-[10px] font-mono text-gray-500 dark:text-gray-400 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5 shadow-sm animate-pulse"></div>
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Ready
          </motion.span>
        </div>
        <span className="bg-gray-100 dark:bg-slate-800/50 px-1.5 py-0.5 rounded">
          {Math.floor(Math.random() * 200) + 350} Lines
        </span>
      </div>
      
      {/* Add a subtle diagonal pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDYwTDYwIDBIMzBMMCA1MFoiIGZpbGw9IiM1MDkwQzA0MCIvPgo8L3N2Zz4=')] opacity-5 mix-blend-soft-light pointer-events-none z-[-1]"></div>
      
      {/* Scan line animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent z-[-1] pointer-events-none opacity-0 group-hover:opacity-100"
        animate={{ 
          y: ["100%", "-100%"]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2, 
          ease: "linear"
        }}
      />
    </div>
  </motion.div>
);


const RegularPostsSection = ({ posts, hasFeatured }) => {
  if (!posts.length) return null;
  
  return (
    <motion.section
      className="mb-16 w-full max-w-none"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="flex items-center mb-6">
        <BookOpen className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
        <h2 className="text-2xl font-bold text-gray-100 dark:text-slate-100">
          {hasFeatured ? 'All Articles' : 'Articles'}
        </h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
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
    <main className="bg-white dark:bg-slate-900 relative pb-16">
      <CodeSymbolsBackground />
      <div className="max-w-4xl mx-auto space-y-10">
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
          <>
            {/* <ResultsCount count={featuredPosts.length + regularPosts.length} /> */}
            <RegularPostsSection posts={regularPosts} />
          </>
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