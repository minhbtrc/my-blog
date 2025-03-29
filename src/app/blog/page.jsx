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

// Enhanced blog data with more examples
const FALLBACK_BLOGS = [
  {
    route: "/blog/building-blog-with-ai",
    title: "How I Built My Blog with ChatGPT & Cursor — As an AI Engineer, Not a Frontend Dev",
    description: "My journey building a modern, developer-centric blog using AI tools like Cursor and GPT-4o, despite having limited frontend experience.",
    date: "2023-08-10",
    readingTime: "6 min read",
    tags: ["ai", "development", "cursor", "gpt4", "nextjs"],
    featured: true
  },
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
              className="w-full py-3 pl-10 pr-12 bg-gray-800/80 dark:bg-slate-800/80 border-0 rounded-md text-base transition-all duration-300 focus:border-blue-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 shadow-inner font-mono text-gray-300"
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
            className={`px-3 py-3 rounded-md flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md ${
              filterOpen 
                ? 'bg-blue-900/60 dark:bg-blue-900/30 text-blue-400 dark:text-blue-400 ring-2 ring-blue-800 dark:ring-blue-900'
                : 'bg-gray-800/90 dark:bg-slate-700/90 text-gray-300 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-blue-900/20 hover:text-blue-400 dark:hover:text-blue-400'
            } border border-gray-700 dark:border-slate-700/80 font-mono`}
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

const CategoryTabs = () => {
  return (
    <motion.section 
      className="bg-white/5 dark:bg-slate-800/5 border border-gray-700/30 dark:border-blue-900/20 rounded-lg p-6 backdrop-blur-sm shadow-md mb-10"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      whileHover={{ 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        translateY: -2 
      }}
      transition={{ delay: 0.4 }}
    >
      <motion.h2 
        className="text-xl font-bold mb-4 border-b border-gray-700/30 dark:border-blue-900/30 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 dark:from-cyan-400 dark:to-blue-400 font-mono flex items-center gap-2"
        variants={fadeIn}
      >
        <Code className="h-5 w-5 text-blue-400 dark:text-cyan-400" />
        browse.categories()
      </motion.h2>
      
      <div className="flex items-center gap-3 pb-2 overflow-x-auto hide-scrollbar">
        <motion.button
          className="px-4 py-3 text-gray-300 dark:text-slate-300 font-medium rounded-md bg-gray-900 dark:bg-slate-700/60 shadow-sm border border-gray-700 dark:border-slate-600 font-mono flex-shrink-0"
          whileHover={{ 
            backgroundColor: "rgba(17, 24, 39, 1)",
            boxShadow: "0 0 15px 1px rgba(59, 130, 246, 0.3)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-400 dark:text-blue-400" />
            <span className="text-green-400 dark:text-green-400 mr-1">$</span>
            <span>all-posts</span>
          </div>
        </motion.button>
        
        <motion.button
          className="px-4 py-3 text-gray-400 dark:text-slate-400 font-medium rounded-md hover:bg-gray-700 dark:hover:bg-slate-700/40 font-mono flex-shrink-0"
          whileHover={{ 
            backgroundColor: "rgba(55, 65, 81, 1)",
            boxShadow: "0 0 12px 1px rgba(192, 132, 252, 0.2)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <BrainCircuit className="h-5 w-5 mr-2 text-purple-400 dark:text-purple-400" />
            <span className="text-purple-400 dark:text-purple-400 mr-1">$</span>
            <span>ai-logs</span>
          </div>
        </motion.button>
        
        <motion.button
          className="px-4 py-3 text-gray-400 dark:text-slate-400 font-medium rounded-md hover:bg-gray-700 dark:hover:bg-slate-700/40 font-mono flex-shrink-0"
          whileHover={{ 
            backgroundColor: "rgba(55, 65, 81, 1)",
            boxShadow: "0 0 12px 1px rgba(34, 211, 238, 0.2)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <Terminal className="h-5 w-5 mr-2 text-cyan-400 dark:text-cyan-400" />
            <span className="text-cyan-400 dark:text-cyan-400 mr-1">$</span>
            <span>debug-notes</span>
          </div>
        </motion.button>
        
        <motion.button
          className="px-4 py-3 text-gray-400 dark:text-slate-400 font-medium rounded-md hover:bg-gray-700 dark:hover:bg-slate-700/40 font-mono flex-shrink-0"
          whileHover={{ 
            backgroundColor: "rgba(55, 65, 81, 1)",
            boxShadow: "0 0 12px 1px rgba(16, 185, 129, 0.2)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <Map className="h-5 w-5 mr-2 text-emerald-400 dark:text-emerald-400" />
            <span className="text-emerald-400 dark:text-emerald-400 mr-1">$</span>
            <span>field-notes</span>
          </div>
        </motion.button>
      </div>
    </motion.section>
  )
};

const StickyTagBar = ({ scrolled, tags, selectedTags, onTagClick }) => {
  return (
    <div 
      className={`fixed top-16 left-0 right-0 z-20 bg-gray-900/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-700 dark:border-slate-800 shadow-sm py-2 px-4 transition-all duration-300 transform ${
        scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar px-4 md:px-8 lg:px-12">
        <div className="flex items-center bg-gray-800 dark:bg-slate-800/60 px-2 py-1 rounded-md border border-gray-700 dark:border-slate-700 mr-1 shadow-sm">
          <span className="text-green-400 dark:text-green-400 font-mono text-xs mr-1.5 font-bold">$</span>
          <span className="text-sm font-medium text-gray-300 dark:text-slate-400 whitespace-nowrap font-mono">explore</span>
        </div>
        
        {tags.map((tag) => (
          <Badge 
            key={tag} 
            variant={selectedTags.includes(tag) ? "default" : "secondary"} 
            className={`cursor-pointer transition-all hover:scale-105 whitespace-nowrap ${
              selectedTags.includes(tag) 
                ? 'bg-blue-900/60 dark:bg-blue-900/40 text-blue-300 dark:text-blue-300 border border-blue-800 dark:border-blue-800/60' 
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

const ResultsCount = ({ count }) => (
  <div className="mb-8 flex items-center">
    <div className="bg-gray-800 dark:bg-blue-900/20 text-gray-300 dark:text-blue-300 px-3 py-1.5 rounded-md text-sm font-medium flex items-center border border-gray-700 dark:border-blue-800/30 font-mono shadow-sm">
      <span className="text-green-400 dark:text-green-400 mr-1.5 font-bold">$</span>
      <span className="mr-1.5">find</span>
      <BookMarked className="h-4 w-4 mr-2 text-blue-400 dark:text-blue-400" />
      <span className="text-blue-400 dark:text-blue-400">{count}</span>
      <span className="ml-1 text-gray-300">{count === 1 ? 'article' : 'articles'}</span>
    </div>
  </div>
);

const FeaturedPostCard = ({ post }) => (
  <motion.div 
    className="relative overflow-hidden card border-l-4 border-l-blue-500 dark:border-l-blue-600 border-t border-r border-b border-gray-200 dark:border-slate-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in hover:translate-y-[-2px]"
    whileHover={cardHover.hover}
    initial="rest"
    whileTap={{ scale: 0.98 }}
    variants={cardHover}
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
              {formatDate(post.date)}
            </span>
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {post.readingTime}
            </span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-gray-100 dark:text-slate-100 mb-3 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
        </div>
      </div>
      
      <div className="pl-3 border-l-2 border-blue-800 dark:border-blue-800 mb-4">
        <p className="text-gray-300 dark:text-slate-400">
          {post.description}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags && post.tags.slice(0, 3).map((tag) => (
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
          href={post.route || `/blog/${post.slug}`}
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
);

const RegularPostCard = ({ post, index }) => (
  <motion.div 
    className="relative overflow-hidden card border-l-4 border-l-blue-500 dark:border-l-blue-600 border-t border-r border-b border-gray-200 dark:border-slate-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in hover:translate-y-[-2px]"
    whileHover={cardHover.hover}
    initial="rest"
    whileTap={{ scale: 0.98 }}
    variants={cardHover}
  >
    <div className="bg-gray-800 dark:bg-slate-800/80 border-b border-gray-700 dark:border-slate-700 py-2 px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500 ring-1 ring-red-700 dark:ring-red-700 shadow-sm"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 ring-1 ring-yellow-700 dark:ring-yellow-700 shadow-sm"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 ring-1 ring-green-700 dark:ring-green-700 shadow-sm"></div>
      </div>
      <div className="flex items-center">
        <span className="text-xs font-mono text-gray-300 dark:text-gray-400 mr-2 bg-gray-700/80 dark:bg-slate-700/70 px-2 py-0.5 rounded shadow-inner">~/blog</span>
        <motion.div 
          className="px-2 py-0.5 bg-blue-500/90 text-white text-xs font-medium rounded flex items-center shadow-sm"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Sparkles className="h-3 w-3 mr-1" />
          <span>Post</span>
        </motion.div>
      </div>
    </div>

    <div className="p-6 bg-gray-950/95 dark:bg-slate-800/95 backdrop-blur-sm transition-colors duration-300 relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center text-xs text-gray-300 dark:text-slate-400 mb-3 space-x-4">
            <span className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {post.readingTime}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-100 dark:text-slate-100 mb-3 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
        </div>
      </div>

      <div className="pl-3 border-l-2 border-blue-800 dark:border-blue-800 mb-4">
        <p className="text-gray-300 dark:text-slate-400">
          {post.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags?.slice(0, 3).map((tag) => (
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
          href={post.route || `/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group-hover:underline"
        >
          <span>Read article</span>
          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gray-800 dark:bg-slate-700/30 border-t border-gray-700 dark:border-slate-700 py-1 px-3 flex items-center justify-between text-[10px] font-mono text-gray-300 dark:text-gray-400">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5 shadow-sm"></div>
          <span>Ready</span>
        </div>
        <span>{Math.floor(Math.random() * 1000) + 100} lines</span>
      </div>
    </div>
  </motion.div>
);

const FeaturedPostsSection = ({ posts }) => {
  if (!posts.length) return null;
  
  return (
    <motion.section
      className="mb-16 w-full max-w-none"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="flex items-center mb-6">
        <TrendingUp className="h-6 w-6 text-yellow-500 dark:text-yellow-400 mr-2" />
        <h2 className="text-2xl font-bold text-gray-100 dark:text-slate-100">
          Featured Posts
        </h2>
        <div className="ml-3 px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded text-yellow-400 text-xs font-medium">
          PINNED
        </div>
      </div>
      
      <div className="grid md:grid-cols-1 gap-8">
        {posts.map((post, index) => (
          <FeaturedPostCard 
            key={post.route || post.slug} 
            post={post}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
};

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

const ScrollToTopButton = ({ scrolled }) => (
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
);

const FooterSection = () => (
  <footer className="border-t border-gray-800 mt-16 py-6 bg-gray-900/80 backdrop-blur-sm w-full">
    <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <motion.div 
          className="flex flex-col items-center md:items-start mb-4 md:mb-0"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm font-mono flex items-center text-gray-400">
            <span className="text-green-400 font-bold mr-1.5">$</span>
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "auto", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="overflow-hidden"
            >
              whoami
            </motion.span>
            <motion.span 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
              className="text-gray-300 ml-1"
            >
              _
            </motion.span>
          </div>
          <motion.div 
            className="mt-2 font-mono text-xs flex items-center text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <span className="bg-gray-800 px-3 py-1 rounded border border-gray-700 shadow-sm">
              minh@ai-engineer ~
            </span>
          </motion.div>
        </motion.div>
        
        <div className="flex space-x-3">
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="https://github.com/minhbtrc" className="text-gray-400 hover:text-gray-300 transition-colors">
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-800 hover:bg-gray-700 border border-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="https://www.linkedin.com/in/minhbtcm00/" className="text-gray-400 hover:text-gray-300 transition-colors">
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-800 hover:bg-gray-700 border border-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/rss" className="text-gray-400 hover:text-gray-300 transition-colors">
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-800 hover:bg-gray-700 border border-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rss"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="mt-6 pt-4 border-t border-gray-800 flex flex-col items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="text-[10px] font-mono text-gray-500 flex items-center">
          <span className="text-gray-400">exit_code=</span>
          <motion.span 
            className="text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            0
          </motion.span> 
          <span className="mx-1">•</span> 
          <span className="text-blue-400">{new Date().getFullYear()}</span>
        </div>
        <motion.div 
          className="mt-2 text-xs font-mono text-gray-500"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="bg-gray-800 px-2 py-0.5 rounded text-[10px]">v0.2.1-alpha</span>
        </motion.div>
      </motion.div>
    </div>
  </footer>
);

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