import { NextRequest, NextResponse } from 'next/server'
import { table } from '@/db'

// Helper function to normalize routes for comparison
const normalizeRoute = (route: string): string => {
  return route.startsWith('/') ? route : `/${route}`;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug
    const blogPath = `/blog/${slug}`
    
    // First, check if we have this entry directly in the table
    let blogData = table.find(
      (entry) => normalizeRoute(entry.route) === blogPath || entry.route === slug
    )

    // If not found directly, search in children
    if (!blogData) {
      // Check in each parent's children array
      for (const parent of table) {
        if (Array.isArray(parent.children)) {
          // Look for the slug in children (which can be strings or objects)
          const childMatch = parent.children.find((child) => {
            if (typeof child === 'string') {
              return normalizeRoute(child) === blogPath || child === slug
            }
            if (typeof child === 'object' && child !== null) {
              return (
                normalizeRoute(child.route) === blogPath ||
                child.route === blogPath ||
                child.route === slug
              )
            }
            return false
          })

          if (childMatch) {
            if (typeof childMatch === 'string') {
              // If the child is a string, find its corresponding entry in the table
              blogData = table.find(
                (item) => normalizeRoute(item.route) === normalizeRoute(childMatch)
              )
            } else {
              // If the child is an object, use it directly
              blogData = childMatch
            }
            break
          }
        }
      }
    }

    if (blogData) {
      // Return blog metadata
      return NextResponse.json({
        title: blogData.title || 'Untitled Post',
        description: blogData.description || 'No description provided',
        date: blogData.date || new Date().toISOString(),
        tags: blogData.tags || [],
        readingTime: '5 min read',
        image: blogData.image || null,
      })
    }

    // If no blog post was found
    return NextResponse.json(
      { error: 'Blog post not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Error fetching blog metadata:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 