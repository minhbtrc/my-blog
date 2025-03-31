import React from 'react';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import BlogCard from '@/components/ui/BlogCard';
import { themeStyles, cn } from '@/lib/utils';
import { 
  Home, Mail, Heart, Download, ArrowRight, Globe, 
  MoveRight, Github, Calendar, Clock, Tag 
} from 'lucide-react';

export default function ComponentsPage() {
  // Sample blog post for BlogCard demo
  const samplePost = {
    title: "Building Custom UI Components in React and Tailwind",
    description: "Learn how to create reusable, accessible, and theme-aware UI components that work seamlessly in both light and dark modes.",
    date: "2023-07-15",
    readingTime: "8 min read",
    tags: ["react", "tailwind", "ui"],
    route: "/blog/custom-ui-components"
  };

  const featuredPost = {
    title: "Building Autonomous AI Agents with LLMs",
    description: "A deep dive into how to build autonomous AI agents using Large Language Models, vector databases, and reasoning frameworks.",
    date: "2023-08-22",
    readingTime: "15 min read",
    tags: ["ai", "langchain", "development"],
    route: "/blog/autonomous-ai-agents",
    featured: true
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-16">
        <h1 className={themeStyles(
          "text-4xl font-bold mb-4 text-gray-800",
          "text-4xl font-bold mb-4 text-white"
        )}>
          UI Component Showcase
        </h1>
        <p className={themeStyles(
          "text-lg mb-8 text-gray-600",
          "text-lg mb-8 text-slate-300"
        )}>
          A collection of reusable, accessible, and theme-aware components built with React, 
          Tailwind CSS, and Framer Motion.
        </p>
      </div>

      {/* Card Component Showcase */}
      <section className="mb-16">
        <h2 className={themeStyles(
          "text-2xl font-bold mb-6 text-gray-700",
          "text-2xl font-bold mb-6 text-slate-100"
        )}>
          Card Component
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="default" hover>
            <div className="p-6">
              <h3 className={themeStyles(
                "text-lg font-bold mb-2 text-gray-700",
                "text-lg font-bold mb-2 text-slate-100"
              )}>
                Default Card
              </h3>
              <p className={themeStyles(
                "text-sm text-gray-500",
                "text-sm text-slate-300"
              )}>
                A simple card with default styling and hover effects.
              </p>
            </div>
          </Card>

          <Card variant="glass" hover>
            <div className="p-6">
              <h3 className={themeStyles(
                "text-lg font-bold mb-2 text-gray-700",
                "text-lg font-bold mb-2 text-slate-100"
              )}>
                Glass Card
              </h3>
              <p className={themeStyles(
                "text-sm text-gray-500",
                "text-sm text-slate-300"
              )}>
                A card with a glass effect and backdrop blur.
              </p>
            </div>
          </Card>

          <Card variant="gradient" hover>
            <div className="p-6">
              <h3 className={themeStyles(
                "text-lg font-bold mb-2 text-gray-700",
                "text-lg font-bold mb-2 text-slate-100"
              )}>
                Gradient Card
              </h3>
              <p className={themeStyles(
                "text-sm text-gray-500",
                "text-sm text-slate-300"
              )}>
                A card with a subtle gradient background.
              </p>
            </div>
          </Card>

          <Card variant="outline" hover>
            <div className="p-6">
              <h3 className={themeStyles(
                "text-lg font-bold mb-2 text-gray-700",
                "text-lg font-bold mb-2 text-slate-100"
              )}>
                Outline Card
              </h3>
              <p className={themeStyles(
                "text-sm text-gray-500",
                "text-sm text-slate-300"
              )}>
                A card with only border and no background.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Button Component Showcase */}
      <section className="mb-16">
        <h2 className={themeStyles(
          "text-2xl font-bold mb-6 text-gray-700",
          "text-2xl font-bold mb-6 text-slate-100"
        )}>
          Button Component
        </h2>

        <div className="space-y-8">
          {/* Button Variants */}
          <div>
            <h3 className={themeStyles(
              "text-lg font-semibold mb-4 text-gray-600",
              "text-lg font-semibold mb-4 text-slate-200"
            )}>
              Button Variants
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="gradient">Gradient</Button>
            </div>
          </div>

          {/* Button Sizes */}
          <div>
            <h3 className={themeStyles(
              "text-lg font-semibold mb-4 text-gray-600",
              "text-lg font-semibold mb-4 text-slate-200"
            )}>
              Button Sizes
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>

          {/* Buttons with Icons */}
          <div>
            <h3 className={themeStyles(
              "text-lg font-semibold mb-4 text-gray-600",
              "text-lg font-semibold mb-4 text-slate-200"
            )}>
              Buttons with Icons
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default" icon={<Home className="w-4 h-4" />}>
                Home
              </Button>
              <Button variant="primary" icon={<Mail className="w-4 h-4" />}>
                Contact
              </Button>
              <Button 
                variant="outline" 
                icon={<Heart className="w-4 h-4" />}
                iconPosition="right"
              >
                Like
              </Button>
              <Button 
                variant="gradient" 
                icon={<Download className="w-4 h-4" />}
                iconPosition="left"
              >
                Download
              </Button>
              <Button
                variant="secondary"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Next Step
              </Button>
            </div>
          </div>

          {/* Full Width Button */}
          <div>
            <h3 className={themeStyles(
              "text-lg font-semibold mb-4 text-gray-600",
              "text-lg font-semibold mb-4 text-slate-200"
            )}>
              Full Width Button
            </h3>
            <Button variant="gradient" fullWidth>
              Submit Form
            </Button>
          </div>

          {/* Link Buttons */}
          <div>
            <h3 className={themeStyles(
              "text-lg font-semibold mb-4 text-gray-600",
              "text-lg font-semibold mb-4 text-slate-200"
            )}>
              Link Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="default" 
                href="/" 
                icon={<Home className="w-4 h-4" />}
              >
                Home
              </Button>
              <Button 
                variant="primary" 
                href="https://github.com" 
                external 
                icon={<Github className="w-4 h-4" />}
              >
                GitHub
              </Button>
              <Button 
                variant="outline" 
                href="https://example.com" 
                external 
                icon={<Globe className="w-4 h-4" />}
              >
                Website
              </Button>
              <Button 
                variant="ghost" 
                href="/blog" 
                icon={<MoveRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Blog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* BlogCard Component Showcase */}
      <section className="mb-16">
        <h2 className={themeStyles(
          "text-2xl font-bold mb-6 text-gray-700",
          "text-2xl font-bold mb-6 text-slate-100"
        )}>
          Blog Card Component
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BlogCard post={samplePost} />
          <BlogCard post={featuredPost} featured />
        </div>
      </section>
    </div>
  );
}