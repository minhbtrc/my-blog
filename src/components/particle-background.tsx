'use client'
import { motion } from 'framer-motion'
import React from 'react'

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(37,99,235,0.1),transparent)] dark:bg-[radial-gradient(circle_at_50%_25%,rgba(56,189,248,0.1),transparent)]" />
      
      {/* Code-inspired floating elements */}
      {Array.from({ length: 30 }).map((_, i) => {
        // Create various sized particles with different shapes
        const size = Math.random() * 12 + 3;
        const duration = Math.random() * 30 + 15;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const targetX = Math.random() * 100;
        const targetY = Math.random() * 100;
        
        // Create different shapes to represent code and tech elements
        const shapes = [
          "rounded-full", // dots (periods, commas)
          "rounded-sm", // brackets, braces
          "h-1.5 w-6", // underscores, dashes
          "h-6 w-1.5", // pipes, vertical bars
          "rounded-md rotate-45", // diamonds (special chars)
          "rounded-md", // code blocks
        ];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Different colors for different tech domains
        const colors = [
          "bg-blue-500/15 dark:bg-blue-400/15", // Python
          "bg-yellow-500/15 dark:bg-yellow-400/15", // JavaScript
          "bg-green-500/15 dark:bg-green-400/15", // Node.js
          "bg-purple-500/15 dark:bg-purple-400/15", // AI/ML
          "bg-pink-500/15 dark:bg-pink-400/15", // React
          "bg-teal-500/15 dark:bg-teal-400/15", // NextJS
          "bg-orange-500/15 dark:bg-orange-400/15", // TensorFlow
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={i}
            className={`absolute ${shape} ${color}`}
            style={{
              width: shape.includes('w-') ? undefined : size,
              height: shape.includes('h-') ? undefined : size,
              top: `${initialY}%`,
              left: `${initialX}%`,
            }}
            animate={{
              y: [`${initialY}%`, `${targetY}%`],
              x: [`${initialX}%`, `${targetX}%`],
              opacity: [Math.random() * 0.5 + 0.2, Math.random() * 0.3 + 0.1, Math.random() * 0.5 + 0.2],
              rotate: shape.includes('rotate') ? [0, 180, 360] : undefined,
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              rotate: { duration: duration * 1.5, repeat: Infinity, ease: "linear" }
            }}
          />
        );
      })}
      
      {/* Special code symbols */}
      {Array.from({ length: 6 }).map((_, i) => {
        const symbols = ["{ }", "( )", "[ ]", "< >", "// ", "/**/"];
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const targetX = Math.random() * 100;
        const targetY = Math.random() * 100;
        const symbol = symbols[i % symbols.length];
        
        return (
          <motion.div
            key={`symbol-${i}`}
            className="absolute text-blue-500/20 dark:text-cyan-400/20 font-mono text-lg font-bold"
            style={{
              top: `${initialY}%`,
              left: `${initialX}%`,
            }}
            animate={{
              y: [`${initialY}%`, `${targetY}%`],
              x: [`${initialX}%`, `${targetX}%`],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {symbol}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ParticleBackground; 