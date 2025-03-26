import { Body, Injectable, Params } from '@/interceptor'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Index } from 'lunr'
import { index, table } from '@/db'

const GetDto = z.object({ slug: z.array(z.string()).default([]) })
const PostDto = z.object({
  q: z
    .string()
    .min(3)
    .transform((e) => e.replace(/[^a-zA-Z0-9]/g, ' '))
    .optional(),
  t: z.string().optional(),
  limit: z.number().default(10),
  offset: z.number().default(0),
})

// Helper function to get route from a child (whether it's a string or an object)
const getRouteFromChild = (child: any): string => {
  if (typeof child === 'string') return child;
  if (child && typeof child === 'object' && child.route) return child.route;
  return '';
};

// Helper function to normalize routes for comparison
const normalizeRoute = (route: string): string => {
  return route.startsWith('/') ? route : `/${route}`;
};

class Route {
  @Injectable()
  static async GET(
    _req: NextRequest,
    @Params(GetDto) { slug }: z.infer<typeof GetDto>,
  ) {
    const pathname = ['/blog', ...slug].join('/')
    // First check for exact route match
    let data = table.find(({ route }) => 
      normalizeRoute(route) === pathname || route === pathname
    );
    
    // If not found in main table, check children objects
    if (!data) {
      for (const parent of table) {
        if (Array.isArray(parent.children)) {
          const childMatch = parent.children.find(child => {
            if (typeof child === 'string') {
              return normalizeRoute(child) === pathname;
            }
            if (typeof child === 'object' && child !== null) {
              return normalizeRoute(child.route) === pathname || 
                     child.route === pathname || 
                     child.route === slug.join('/');
            }
            return false;
          });
          
          if (childMatch) {
            if (typeof childMatch === 'string') {
              // Find the corresponding entry in the table
              data = table.find(item => 
                normalizeRoute(item.route) === normalizeRoute(childMatch)
              );
            } else if (typeof childMatch === 'object') {
              data = childMatch;
            }
            break;
          }
        }
      }
    }
    
    return NextResponse.json(data)
  }

  @Injectable()
  static async POST(
    _req: NextRequest,
    @Body(PostDto) { q, t, limit, offset }: z.infer<typeof PostDto>,
  ) {
    if (q) {
      const document = Index.load(index)
      const results = document.search(q)
      const data = results
        .filter(({ score }) => score >= 1)
        .map(({ ref }) => ref)
        .slice(offset, offset + limit)
      return NextResponse.json(data)
    }
    if (t) {
      try {
        // Convert tag to lowercase for case-insensitive matching
        const tagLower = t.toLowerCase();
        
        // Get routes from both main table and children objects that match the tag
        const mainRoutes = table
          .filter(({ tags }) => Array.isArray(tags) && 
            tags.some(tag => tag.toLowerCase() === tagLower))
          .map(({ route }) => route);
          
        // Get routes from children objects that match the tag
        const childRoutes = table.flatMap(parent => {
          if (Array.isArray(parent.children)) {
            return parent.children
              .filter(child => {
                if (typeof child === 'string') {
                  // Find the corresponding entry in the table
                  const childObj = table.find(item => 
                    normalizeRoute(item.route) === normalizeRoute(child)
                  );
                  return childObj && Array.isArray(childObj.tags) && 
                    childObj.tags.some(tag => tag.toLowerCase() === tagLower);
                }
                if (typeof child === 'object' && child !== null && Array.isArray(child.tags)) {
                  return child.tags.some(tag => tag.toLowerCase() === tagLower);
                }
                return false;
              })
              .map(child => getRouteFromChild(child));
          }
          return [];
        });
        
        // Normalize all routes to be consistent
        const normalizedRoutes = [...mainRoutes, ...childRoutes].map(route => {
          // Strip leading slash for consistency
          return route.startsWith('/') ? route.substring(1) : route;
        });
        
        // Combine routes, remove duplicates, and apply pagination
        const data = [...new Set(normalizedRoutes)]
          .filter(route => route) // Make sure we have no empty routes
          .slice(offset, offset + limit);
          
        console.log('Tag-filtered routes:', data);
        return NextResponse.json(data || []) // Always return an array
      } catch (error) {
        console.error('Error filtering by tag:', error);
        return NextResponse.json([]) // Return empty array on error
      }
    }
    
    // Get blog root children
    const blogRoot = table.find(({ route }) => 
      normalizeRoute(route) === '/blog' || route === 'blog'
    );
    if (!blogRoot) return NextResponse.json([]);
    
    // Process children to get routes (handling both string and object children)
    const childRoutes = blogRoot.children.map(child => {
      return getRouteFromChild(child);
    }).filter(route => route); // Filter out empty routes
    
    // Normalize routes for consistency
    const normalizedRoutes = childRoutes.map(route => {
      // Strip leading slash for consistency
      return route.startsWith('/') ? route.substring(1) : route;
    });
    
    return NextResponse.json(normalizedRoutes.slice(offset, offset + limit))
  }
}

export const { GET, POST } = Route
