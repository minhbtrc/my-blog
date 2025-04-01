"use client";

import React, { 
  Suspense, 
  useState, 
  useEffect, 
  useRef,
  useMemo 
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from 'next-themes';
import { Search, X, Filter, ArrowRight, Clock, Calendar, Play, Terminal, Pin } from "lucide-react";
import Link from 'next/link';
import { Input } from "@/components/ui/input";

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
    featured: false
  },
  // Adding a few more example posts
  {
    route: "/blog/vector-databases",
    title: "Vector Databases Explained: When and Why You Need Them",
    description: "A deep dive into vector databases, their relationship with embedding models, and how they power semantic search and RAG applications.",
    date: "2024-11-10",
    readingTime: "12 min read",
    tags: ["ai", "databases", "embeddings", "rag"],
    featured: false
  },
  {
    route: "/blog/ai-agents-architecture",
    title: "Designing Reliable AI Agent Architecture",
    description: "Exploring patterns and anti-patterns for building reliable, deterministic AI agents that can actually accomplish real-world tasks.",
    date: "2024-10-05",
    readingTime: "15 min read",
    tags: ["ai", "agents", "architecture", "langchain"],
    featured: false
  }
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
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

// Add typing animation variant
const typingContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const typingCharacter = {
  hidden: { opacity: 0, y: 5 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

const SearchBar = ({ onFilterToggle, filterOpen, selectedTagsCount, searchQuery, setSearchQuery }) => {
  // Split the placeholder into characters for typing animation
  const placeholder = "search_posts.py";
  const placeholderChars = placeholder.split("");
  
  return (
    <motion.div
      className="max-w-3xl mx-auto mb-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2 border-b border-muted/30 py-2">
        <div className="flex items-center text-muted-foreground text-sm font-mono">
          minh@ai-lab:~$
        </div>
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder={placeholder}
            className="w-full py-1 px-2 bg-transparent border-0 rounded-none text-sm font-mono text-blue-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {!searchQuery && (
            <motion.div 
              className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-2 overflow-hidden"
              variants={typingContainer}
              initial="hidden"
              animate="show"
            >
              {placeholderChars.map((char, index) => (
                <motion.span
                  key={index}
                  variants={typingCharacter}
                  className="text-sm font-mono text-blue-400/50"
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          )}
          
          <motion.span 
            className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-2 bg-blue-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          
          <div className="absolute inset-y-0 right-2 flex items-center">
            <kbd className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono bg-muted/30 px-1.5 py-0.5 rounded border border-muted/20 text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
        
        <motion.button
          onClick={onFilterToggle}
          whileTap={{ scale: 0.95 }}
          className={`px-2 py-1 rounded text-xs font-mono flex items-center ${
            filterOpen 
              ? 'text-blue-400'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Filter className={`h-3.5 w-3.5 mr-1 transition-transform duration-300 ${filterOpen ? 'rotate-180' : ''}`} />
          <span>filter</span>
          {selectedTagsCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-400/20 text-[10px] text-blue-400"
            >
              {selectedTagsCount}
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

const FilterTags = ({ isOpen, tags, selectedTags, onTagClick, onClearTags }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div 
      className="max-w-3xl mx-auto mb-8 font-mono text-sm border-l-2 border-muted/30 pl-4 py-2"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-blue-400">
          # Filter by tag
        </span>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearTags}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center"
          >
            <X className="h-3 w-3 mr-1" />
            clear
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <button 
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`text-xs font-mono py-0.5 px-2 transition-colors ${
              selectedTags.includes(tag)
                ? 'text-blue-400 bg-blue-400/10' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const FeaturedPost = ({ post }) => (
  <motion.div
    variants={item}
    className="mb-8 border-l-2 border-blue-400/50 pl-4 space-y-2"
  >
    <div className="flex items-center gap-2">
      <Pin className="h-3.5 w-3.5 text-blue-400" />
      <span className="text-blue-400 text-xs font-mono">Featured</span>
    </div>
    
    <Link href={post.route} className="block space-y-2 group">
      <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
        <Calendar className="h-3 w-3" />
        <span>{formatDate(post.date)}</span>
        <span>•</span>
        <Clock className="h-3 w-3" />
        <span>{post.readingTime}</span>
      </div>
      
      <h2 className="text-xl md:text-2xl font-semibold group-hover:text-blue-400 transition-colors">
        {post.title}
      </h2>
      
      <p className="text-sm text-muted-foreground">
        {post.description}
      </p>
      
      <div className="text-xs font-mono text-muted-foreground opacity-60">
        {post.tags.map((tag, i) => (
          <React.Fragment key={tag}>
            <span>{tag}</span>
            {i < post.tags.length - 1 && <span className="mx-1">•</span>}
          </React.Fragment>
        ))}
      </div>
      
      <div className="text-sm text-blue-400 font-mono group-hover:underline underline-offset-4 inline-flex items-center">
        → Read
      </div>
    </Link>
  </motion.div>
);

const BlogPost = ({ post, index }) => (
  <motion.div
    variants={item}
    className="mb-6 border-l border-muted/30 pl-4 space-y-2 hover:border-blue-400/30 transition-colors"
  >
    <Link href={post.route} className="block space-y-2 group">
      <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
        <span className="font-mono text-purple-400">post</span>
        <span className="font-mono text-muted-foreground">(</span>
        <span className="font-mono text-yellow-300">"</span>
        <span className="text-yellow-300">{post.title}</span>
        <span className="font-mono text-yellow-300">"</span>
        <span className="font-mono text-muted-foreground">)</span>
      </h3>
      
      <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
        <span>•</span>
        <span>{formatDate(post.date)}</span>
        <span>•</span>
        <span>{post.readingTime}</span>
      </div>
      
      <div className="text-xs font-mono text-muted-foreground opacity-60">
        <span>•</span>
        {post.tags.map((tag, i) => (
          <React.Fragment key={tag}>
            <span className="ml-1">{tag}</span>
            {i < post.tags.length - 1 && <span className="mx-0.5">•</span>}
          </React.Fragment>
        ))}
      </div>
      
      <div className="text-xs text-blue-400 font-mono group-hover:underline underline-offset-4 inline-flex items-center">
        <span>•</span>
        <span className="ml-1">→ Read</span>
      </div>
    </Link>
  </motion.div>
);

const ShellView = ({ posts }) => (
  <motion.div
    className="space-y-1 font-mono text-sm"
    variants={container}
    initial="hidden"
    animate="show"
  >
    <motion.div variants={item} className="text-muted-foreground mb-4">
      <span className="text-blue-400">minh@ai-lab:~$</span> cat posts.txt
    </motion.div>
    
    {posts.map((post, index) => (
      <motion.div 
        key={post.route}
        variants={item}
        className="flex gap-2 pl-2 border-l border-muted/30 hover:border-blue-400/30 transition-colors"
      >
        <span className="text-muted-foreground">-</span>
        <Link 
          href={post.route}
          className="hover:text-blue-400 transition-colors truncate"
        >
          <span className="text-muted-foreground">{formatDate(post.date).replace(',', '')}</span>
          <span className="text-muted-foreground mx-1">|</span>
          <span>{post.title}</span>
        </Link>
      </motion.div>
    ))}
  </motion.div>
);

const EmptyState = ({ onClear }) => {
  return (
    <motion.div 
      className="py-8 text-center font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-muted-foreground mb-4 inline-block">
        <Terminal className="h-10 w-10 mx-auto" />
      </div>
      <div className="space-y-2">
        <div className="text-lg font-semibold">
          <span className="text-red-400">Error:</span> No posts found
        </div>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          # We couldn't find any posts matching your criteria
        </p>
        <button 
          onClick={onClear}
          className="mt-4 text-blue-400 text-sm hover:underline underline-offset-4"
        >
          clear_filters()
        </button>
      </div>
    </motion.div>
  );
};

// Toggle view component
const ViewToggle = ({ viewMode, setViewMode }) => (
  <div className="flex items-center justify-end mb-6 text-xs font-mono">
    <div className="flex rounded-md overflow-hidden border border-muted/30">
      <button
        onClick={() => setViewMode('list')}
        className={`px-3 py-1 ${viewMode === 'list' ? 'bg-blue-400/10 text-blue-400' : 'text-muted-foreground hover:text-foreground'}`}
      >
        List
      </button>
      <button
        onClick={() => setViewMode('shell')}
        className={`px-3 py-1 ${viewMode === 'shell' ? 'bg-blue-400/10 text-blue-400' : 'text-muted-foreground hover:text-foreground'}`}
      >
        Shell
      </button>
    </div>
  </div>
);

// Main blog page component
function BlogPageContent() {
  const { resolvedTheme } = useTheme();
  const [blogs] = useState(FALLBACK_BLOGS);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'shell'
  
  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = blogs.flatMap(blog => blog.tags || []);
    return [...new Set(tags)].sort();
  }, [blogs]);
  
  // Filter posts based on search and tags
  const filteredPosts = useMemo(() => {
    return blogs.filter(post => {
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      
      const matchesTags = selectedTags.length === 0 || 
        (post.tags && selectedTags.every(tag => post.tags.includes(tag)));
      
      return matchesSearch && matchesTags;
    });
  }, [blogs, searchQuery, selectedTags]);
  
  // Separate featured posts
  const featuredPost = useMemo(() => {
    return filteredPosts.find(post => post.featured);
  }, [filteredPosts]);
  
  const regularPosts = useMemo(() => {
    return filteredPosts.filter(post => !post.featured);
  }, [filteredPosts]);
  
  // Tag click handler
  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery("");
  };
  
  // Command+K handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('input[type="text"]')?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const hasResults = filteredPosts.length > 0;
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 text-center"
      >
        <h1 className="text-2xl font-semibold mb-1">Blog</h1>
        <p className="text-sm text-muted-foreground font-mono">
          # Notes on AI engineering, development, and research
        </p>
      </motion.div>
      
      {/* Search and filter */}
      <SearchBar 
        onFilterToggle={() => setFilterOpen(prev => !prev)}
        filterOpen={filterOpen}
        selectedTagsCount={selectedTags.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <AnimatePresence>
        {filterOpen && (
          <FilterTags 
            isOpen={filterOpen}
            tags={allTags}
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
            onClearTags={clearFilters}
          />
        )}
      </AnimatePresence>
      
      {/* Blog content */}
      {hasResults ? (
        <>
          {viewMode === 'list' ? (
            <>
              {/* View toggle */}
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
              
              {/* Featured post */}
              {featuredPost && !searchQuery && selectedTags.length === 0 && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={container}
                >
                  <FeaturedPost post={featuredPost} />
                </motion.div>
              )}
              
              {/* Regular posts */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={container}
                className="mb-8"
              >
                {regularPosts.map((post, index) => (
                  <BlogPost key={post.route} post={post} index={index} />
                ))}
              </motion.div>
            </>
          ) : (
            <>
              {/* View toggle */}
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
              
              {/* Shell view */}
              <ShellView posts={filteredPosts} />
            </>
          )}
        </>
      ) : (
        <EmptyState onClear={clearFilters} />
      )}
    </div>
  );
}

// Main export with Suspense
export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen"></div>}>
      <BlogPageContent />
    </Suspense>
  );
} 