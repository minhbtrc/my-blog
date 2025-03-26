import { table } from '@/db'
import { Injectable } from '@/interceptor'
import { NextResponse } from 'next/server'

// Helper function to get the actual object from a string path or object
const getObjectFromChild = (child: any): any => {
  if (typeof child === 'string') {
    // If it's a string path, find the corresponding object in the table
    const path = child.startsWith('/') ? child : `/${child}`;
    return table.find(item => item.route === path);
  }
  return child;
};

// Recursive function to extract tags from nested blog structures
const extractTags = (item: any): string[] => {
  let tags: string[] = [];
  
  // Extract tags from current item
  if (item && Array.isArray(item.tags)) {
    tags = [...item.tags];
  }
  
  // Extract tags from children if they exist
  if (item && Array.isArray(item.children)) {
    for (const child of item.children) {
      if (typeof child === 'string') {
        // For string references, find the actual object
        const childObj = getObjectFromChild(child);
        if (childObj && Array.isArray(childObj.tags)) {
          tags = [...tags, ...childObj.tags];
        }
      } else if (typeof child === 'object' && child !== null) {
        // Recursive call for nested objects
        tags = [...tags, ...extractTags(child)];
      }
    }
  }
  
  return tags;
};

class Route {
  @Injectable()
  static async GET() {
    try {
      // Extract all tags from the table, including nested children
      const allTags = table.flatMap(item => extractTags(item));
      
      // Make sure all tags are strings and filter out any non-string values
      const processedTags = allTags
        .filter(tag => tag !== null && tag !== undefined)
        .map(tag => String(tag));
      
      // Remove duplicates with case insensitivity
      const uniqueTagsMap = new Map();
      for (const tag of processedTags) {
        const lowerTag = tag.toLowerCase();
        if (!uniqueTagsMap.has(lowerTag)) {
          uniqueTagsMap.set(lowerTag, tag);
        }
      }
      
      const uniqueTags = Array.from(uniqueTagsMap.values());
      
      console.log('Extracted tags:', uniqueTags);
      return NextResponse.json(uniqueTags);
    } catch (error) {
      console.error('Error processing tags:', error);
      return NextResponse.json({ error: 'Failed to process tags' }, { status: 500 });
    }
  }
}

export const { GET } = Route
