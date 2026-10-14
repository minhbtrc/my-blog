"use client";

import React, { 
  Suspense, 
  useState, 
  useEffect, 
  useMemo 
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, Terminal } from "lucide-react";
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { getSortedBlogs } from "@/data/blogs";
import { projectStorySummaries } from "@/data/project-story-list";

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

const SearchBar = ({ onFilterToggle, filterOpen, selectedTagsCount, searchQuery, setSearchQuery }) => {
  // Split the placeholder into characters for typing animation
  const placeholder = "search_posts.py";
  
  return (
    <motion.div
      className="max-w-3xl mx-auto mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2 border-b border-base-300 py-2">
        <div className="flex items-center text-base-content/60 text-sm font-mono">
        minhbtc@ai-eng:~$
        </div>
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder={placeholder}
            className="w-full py-1 px-2 bg-transparent border-0 rounded-none text-sm font-mono text-primary focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          
        </div>
        
        <motion.button
          onClick={onFilterToggle}
          whileTap={{ scale: 0.95 }}
          className={`px-2 py-1 rounded text-xs font-mono flex items-center ${
            filterOpen 
              ? 'text-primary'
              : 'text-base-content/60 hover:text-base-content'
          }`}
        >
          <Filter className={`h-3.5 w-3.5 mr-1 transition-transform duration-300 ${filterOpen ? 'rotate-180' : ''}`} />
          <span>filter</span>
          {selectedTagsCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[10px] text-primary"
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
      className="max-w-3xl mx-auto mb-4 font-mono text-sm border-l-2 border-base-300 pl-4 py-2"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-base-content/60">
          Filter by tag
        </span>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearTags}
            className="text-xs text-base-content/60 hover:text-base-content transition-colors flex items-center"
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
                ? 'text-primary bg-primary/10' 
                : 'text-base-content/70 hover:text-base-content'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const BlogPost = ({ post }) => (
  <motion.div variants={item} className="border-t border-base-300 py-6 first:border-t-0">
    <Link href={post.route} className="group block space-y-2">
      <p className="font-mono text-xs text-base-content/60">
        {formatDate(post.date)}  ·  {post.readingTime}
      </p>
      <h3 className="text-lg font-semibold leading-7 text-base-content transition-colors group-hover:text-primary">{post.title}</h3>
      {post.description && <p className="text-sm leading-6 text-base-content/70">{post.description}</p>}
      <p className="font-mono text-xs text-base-content/50">{(post.tags || []).join('  ·  ')}</p>
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
    <motion.div variants={item} className="text-base-content/60 mb-4">
      <span className="text-primary">minhbtc@ai-eng:~$</span> cat my_posts.txt
    </motion.div>
    
    {posts.map((post, index) => (
      <motion.div 
        key={post.route}
        variants={item}
        className="flex gap-2 pl-2 border-l border-base-300 hover:border-base-content/30 transition-colors"
      >
        <span className="text-base-content/60">-</span>
        <Link 
          href={post.route}
          className="hover:text-primary transition-colors truncate"
        >
          <span className="text-base-content/60">{formatDate(post.date).replace(',', '')}</span>
          <span className="text-base-content/60 mx-1">|</span>
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
      <div className="text-base-content/60 mb-4 inline-block">
        <Terminal className="h-10 w-10 mx-auto" />
      </div>
      <div className="space-y-2">
        <div className="text-lg font-semibold">
          No posts found
        </div>
        <p className="text-xs text-base-content/60 max-w-md mx-auto">
          No posts match the current search or filters.
        </p>
        <button 
          onClick={onClear}
          className="mt-4 text-primary text-sm hover:underline underline-offset-4"
        >
          Clear filters
        </button>
      </div>
    </motion.div>
  );
};

// Toggle view component
const ViewToggle = ({ viewMode, setViewMode }) => (
  <div className="flex items-center justify-end mb-6 text-xs font-mono">
    <div className="flex rounded-md overflow-hidden border border-base-300">
      <button
        onClick={() => setViewMode('list')}
        className={`px-3 py-1 ${viewMode === 'list' ? 'bg-base-200 text-base-content' : 'text-base-content/70 hover:text-base-content'}`}
      >
        List
      </button>
      <button
        onClick={() => setViewMode('shell')}
        className={`px-3 py-1 ${viewMode === 'shell' ? 'bg-base-200 text-base-content' : 'text-base-content/70 hover:text-base-content'}`}
      >
        Shell
      </button>
    </div>
  </div>
);

// Main blog page component
function BlogPageContent() {
  const [blogs, setBlogs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'shell'
  const [isLoading, setIsLoading] = useState(true);
  
  // Load blogs from our structured data management system
  useEffect(() => {
    // Get blogs from our data management system
    const blogData = getSortedBlogs();
    
    // Map the data to match the expected format
    setBlogs(blogData.map(blog => ({
      ...blog,
      route: `/blog/${blog.slug}`,
      featured: blog.featured || false
    })));
    
    setIsLoading(false);
  }, []);
  
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
    <div className="max-w-3xl mx-auto px-4 pt-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-4 text-center"
      >
        <h1 className="text-2xl font-semibold mb-1">Blog</h1>
        <p className="text-sm text-base-content/60">
          Notes on AI engineering, development and research
        </p>
      </motion.div>
      
      {process.env.NODE_ENV === 'development' && (
        <section className="mb-10 border-b border-base-300 pb-2" aria-labelledby="drafts-heading">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="drafts-heading" className="font-mono text-xs uppercase tracking-widest text-base-content/60">Project stories · drafts ({projectStorySummaries.length})</h2>
            <Link href="/blog/review" className="text-xs text-primary hover:underline">Review all →</Link>
          </div>
          <p className="mt-2 text-xs text-base-content/60">Visible only in local development until each story is approved for publication.</p>
          <ul className="mt-4">
            {projectStorySummaries.map(story => (
              <li key={story.slug} className="border-t border-base-300 py-5 first:border-t-0">
                <Link href={`/blog/review/${story.slug}`} className="group block space-y-2">
                  <p className="font-mono text-xs text-base-content/60">Draft  ·  {story.stack.slice(0, 4).join('  ·  ')}</p>
                  <h3 className="text-lg font-semibold leading-7 text-base-content transition-colors group-hover:text-primary">{story.title}</h3>
                  <p className="text-sm leading-6 text-base-content/70">{story.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

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
              
              {/* All posts displayed the same way */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={container}
                className="mb-8"
              >
                {filteredPosts.map(post => (
                  <BlogPost key={post.route} post={post} />
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