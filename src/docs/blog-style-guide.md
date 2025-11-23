# Blog Post Style Guide

This document provides guidelines for maintaining consistent styling across all blog posts.

## Table of Contents
- [Using the BlogPostStyle Component](#using-the-blogpoststyle-component)
- [Common Blog Components](#common-blog-components)
- [CSS Classes for Direct HTML Use](#css-classes-for-direct-html-use)
- [Markdown Styling Guide](#markdown-styling-guide)
- [Example Blog Post](#example-blog-post)

## Using the BlogPostStyle Component

The `BlogPostStyle` component provides a standardized wrapper for all blog posts. It handles the layout and styling of common elements like titles, metadata, tags, and featured images.

### Basic Usage

```jsx
import { BlogPostStyle } from '@/components/BlogPostStyle';

export const metadata = {
  title: 'Your Blog Post Title',
  description: 'A brief description of your blog post.'
}

export default function YourBlogPostPage() {
  return (
    <BlogPostStyle
      title="Your Blog Post Title"
      subtitle="Optional subtitle that appears under the main title"
      date="2023-05-15"
      readingTime="5 min read"
      tags={["nextjs", "react", "tutorial"]}
      coverImage={{
        src: "/images/blog/your-cover-image.jpg",
        alt: "Description of the image",
        caption: "Optional caption for the image"
      }}
      author={{
        name: "Your Name",
        avatar: "/images/avatars/your-avatar.jpg" // Optional
      }}
    >
      {/* Your blog post content goes here */}
      <h2>Introduction</h2>
      <p>This is the start of your blog post content...</p>
      
      {/* Rest of your content */}
    </BlogPostStyle>
  );
}
```

### Props Reference

| Prop | Type | Description |
|------|------|-------------|
| `title` | string | **Required.** The main title of the blog post. |
| `subtitle` | string | Optional subtitle displayed below the main title. |
| `date` | string | Publication date in ISO format (YYYY-MM-DD). |
| `readingTime` | string | Estimated reading time (e.g., "5 min read"). |
| `tags` | string[] | Array of tags for the blog post. |
| `coverImage` | object | Featured image configuration. |
| `coverImage.src` | string | Path to the image file. |
| `coverImage.alt` | string | Alt text for the image. |
| `coverImage.caption` | string | Optional caption displayed below the image. |
| `author` | object | Author information. |
| `author.name` | string | Author's name. |
| `author.avatar` | string | Path to the author's avatar image. |

## Common Blog Components

The style system includes several helper components to consistently style common blog elements:

### CodeSnippet

For displaying code snippets with optional title and caption:

```jsx
import { CodeSnippet } from '@/components/BlogPostStyle';

<CodeSnippet 
  language="javascript" 
  title="Example.js" 
  caption="A simple JavaScript example">
  const greeting = 'Hello, World!';
  console.log(greeting);
</CodeSnippet>
```

### InfoBox

For creating highlighted information boxes in different styles (info, warning, success, error):

```jsx
import { InfoBox } from '@/components/BlogPostStyle';

<InfoBox type="warning" title="Important Note">
  This feature is currently in beta and might change in future releases.
</InfoBox>
```

### ImageWithCaption

For displaying images with captions:

```jsx
import { ImageWithCaption } from '@/components/BlogPostStyle';

<ImageWithCaption
  src="/images/blog/diagram.png"
  alt="Architecture diagram"
  caption="System architecture overview"
  width={800}
  height={450}
/>
```

### QuoteBlock

For displaying quotes with optional attribution:

```jsx
import { QuoteBlock } from '@/components/BlogPostStyle';

<QuoteBlock 
  author="Albert Einstein" 
  source="Speech to the German Physical Society, 1918">
  The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.
</QuoteBlock>
```

### FeatureGrid

For displaying features in a grid layout:

```jsx
import { FeatureGrid } from '@/components/BlogPostStyle';
import { Code, Lightbulb, Zap, Shield } from 'lucide-react';

<FeatureGrid 
  features={[
    {
      title: "Easy to Use",
      description: "Simple API that can be implemented in minutes",
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
      color: "border-amber-500"
    },
    {
      title: "Performant",
      description: "Optimized for speed and efficiency",
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      color: "border-blue-500"
    },
    // Add more features as needed
  ]}
/>
```

## CSS Classes for Direct HTML Use

If you prefer to use direct HTML instead of the helper components, you can use these CSS classes:

### General Structure

- `.blog-content` - Main content wrapper class
- `.blog-info-box` - Information box with variants `.info`, `.warning`, `.success`, `.error`
- `.blog-quote` - Styled blockquote
- `.blog-code-snippet` - Code snippet container
- `.blog-image-caption` - Image caption
- `.blog-feature-grid` - Grid container for features
- `.blog-feature-item` - Individual feature item

### Usage Example

```jsx
<div className="blog-content">
  <h2>Getting Started</h2>
  <p>Let's begin with the basics...</p>
  
  <div className="blog-info-box info">
    <h4>Note</h4>
    <p>This is an important information to keep in mind.</p>
  </div>
  
  <blockquote className="blog-quote">
    <p>A well-written quote that adds value to your content.</p>
    <footer>— Author Name</footer>
  </blockquote>
</div>
```

## Markdown Styling Guide

If you're writing your blog posts in Markdown, these guidelines will help ensure a consistent style:

### Headings

Use proper heading hierarchy:

```markdown
## Main Section (H2)
### Sub-Section (H3)
#### Minor Section (H4)
```

### Lists

For unordered lists:

```markdown
- First item
- Second item
- Third item with a nested list:
  - Nested item 1
  - Nested item 2
```

For ordered lists:

```markdown
1. First step
2. Second step
3. Third step with a nested list:
   1. Nested step 1
   2. Nested step 2
```

### Code

Inline code: `` `const example = 'code';` ``

Code blocks:

````markdown
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```
````

### Links and Images

Links: `[Link text](https://example.com)`

Images: `![Alt text](/path/to/image.jpg)`

## Example Blog Post

Here's a simplified example of a blog post using the standardized style:

```jsx
import { 
  BlogPostStyle, 
  CodeSnippet, 
  InfoBox, 
  ImageWithCaption, 
  QuoteBlock, 
  FeatureGrid 
} from '@/components/BlogPostStyle';
import { Code, Lightbulb, Zap } from 'lucide-react';

export const metadata = {
  title: 'Getting Started with Next.js',
  description: 'Learn how to build powerful applications with Next.js'
}

export default function NextJsGuidePage() {
  return (
    <BlogPostStyle
      title="Getting Started with Next.js"
      subtitle="A beginner's guide to building powerful applications"
      date="2023-05-15"
      readingTime="8 min read"
      tags={["nextjs", "react", "web-development"]}
      coverImage={{
        src: "/images/blog/nextjs-cover.jpg",
        alt: "Next.js logo on a gradient background",
        caption: "Next.js - The React Framework for Production"
      }}
      author={{
        name: "Jane Developer",
        avatar: "/images/avatars/jane.jpg"
      }}
    >
      <h2>Introduction</h2>
      <p>
        Next.js is a React framework that provides a variety of built-in features 
        to enhance the development experience. It simplifies the process of building 
        React applications by providing structure, conventions, and optimizations.
      </p>
      
      <InfoBox type="info" title="What You'll Learn">
        This guide covers the basics of setting up a Next.js project, 
        understanding its core features, and deploying your application.
      </InfoBox>
      
      <h2>Installation</h2>
      <p>
        Getting started with Next.js is straightforward. You can create a new project using:
      </p>
      
      <CodeSnippet 
        language="bash" 
        title="Terminal" 
        caption="Creating a new Next.js project">
        npx create-next-app@latest my-next-app
      </CodeSnippet>
      
      <h2>Key Features</h2>
      
      <FeatureGrid 
        features={[
          {
            title: "Server-Side Rendering",
            description: "Render React components on the server for improved performance and SEO",
            icon: <Zap className="w-5 h-5 text-blue-500" />,
            color: "border-blue-500"
          },
          {
            title: "File-Based Routing",
            description: "Create routes based on your file structure without complex configuration",
            icon: <Code className="w-5 h-5 text-purple-500" />,
            color: "border-purple-500"
          },
          {
            title: "Built-in API Routes",
            description: "Create API endpoints as part of your Next.js application",
            icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
            color: "border-amber-500"
          }
        ]}
      />
      
      <h2>Conclusion</h2>
      <p>
        Next.js provides a powerful and flexible framework for building modern web applications.
        By leveraging its features, you can create fast, SEO-friendly, and user-friendly applications.
      </p>
      
      <QuoteBlock 
        author="Vercel Team" 
        source="Next.js Documentation">
        Next.js gives you the best developer experience with all the features you need for production.
      </QuoteBlock>
    </BlogPostStyle>
  );
}
```

By following these guidelines, you'll ensure a consistent style across all blog posts, making it easier to maintain and update your content in the future. 