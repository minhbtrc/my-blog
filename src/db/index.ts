import 'server-only'
import { z } from 'zod'
import tablejson from './table.json'
import indexjson from './index.json'
import { env } from '@/config/env'

//edit view

// Define the blog post schema with recursive children
const BlogPost = z.object({
  route: z.string(),
  title: z.string(),
  image: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
  content: z.string(),
  date: z.coerce.date()
});

// Add recursive children to the schema
type BlogPostType = z.infer<typeof BlogPost> & {
  children: (BlogPostType | string)[]
};

const BlogPostWithChildren: z.ZodType<BlogPostType> = BlogPost.extend({
  children: z.lazy(() => z.array(z.union([BlogPostWithChildren, z.string()])))
});

// Database
const TableDto = z.array(BlogPostWithChildren);

const data = TableDto.parse(tablejson)
const unpublished = data
  .filter(({ date }) => env !== 'development' && date > new Date())
  .map(({ route }) => route)

// Helper function to check if a child is a string or an object
const processChildren = (children: (BlogPostType | string)[]) => {
  return children.filter(child => {
    if (typeof child === 'string') {
      return !unpublished.includes(child);
    } else {
      return !unpublished.includes(child.route);
    }
  });
};

export const table = data
  .filter(({ route }) => !unpublished.includes(route))
  .map(item => ({
    ...item,
    children: processChildren(item.children)
  }));

// Index
const IndexDto = z.object({
  version: z.string(),
  fields: z.array(z.string()),
  fieldVectors: z.array(z.tuple([z.string(), z.array(z.number())])),
  invertedIndex: z.array(z.tuple([z.string(), z.any()])),
  pipeline: z.array(z.string()),
})
export const index = IndexDto.parse(indexjson)
