import { readFileSync } from 'fs'
import { scan, type Dree } from 'dree'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { select, selectAll } from 'unist-util-select'
import { toString } from 'mdast-util-to-string'
import { frontmatter } from 'micromark-extension-frontmatter'
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter'
import toml from 'toml'
import { z } from 'zod'
import { resolve, parse } from 'path'
import { writeFileSync } from 'fs'
import { util } from 'webpack'
import lunr from 'lunr'
import { isURL } from '@/lib/utils'

type ExtendedDree = Omit<Dree, 'children'> & {
  title: string
  image: string
  tags: string[]
  description: string
  content: string
  children?: ExtendedDree[]
  date: Date
}

type Tree = {
  route: string
  children: Tree[]
  title: string
  image: string
  tags: string[]
  description: string
  content: string
  date: Date
}

function dreelize(root: string): ExtendedDree | null {
  const dree = scan<ExtendedDree>(
    root,
    {
      size: false,
      sizeInBytes: false,
      hash: false,
      matches: '**/page.{md,mdx}',
      extensions: ['md', 'mdx'],
    },
    (node) => {
      const file = readFileSync(node.path, 'utf-8')
      const md = fromMarkdown(file, {
        extensions: [frontmatter(['yaml', 'toml'])],
        mdastExtensions: [frontmatterFromMarkdown(['yaml', 'toml'])],
      })
      
      // Try to extract both YAML and TOML frontmatter
      const matterNode = select('root > yaml', md) || select('root > toml', md) || {}
      const heading = select('root > heading', md) || {}
      const paragraph = select('root > paragraph', md) || {}
      const text = selectAll('heading, paragraph', md)
      const images = selectAll('image', md)
      
      const [image = ''] = images.map((image) => {
        try {
          const { url } = Object.assign({ url: '' }, image)
          if (!url) return '';
          
          // Check if it's a valid URL
          if (isURL(url)) return url
          
          // Handle relative paths with extra safety
          try {
            const { dir } = parse(node.path)
            const { name, ext } = parse(url)
            if (!name || !ext) return '';
            
            const resolvedPath = resolve(dir, url);
            if (!resolvedPath) return '';
            
            const img = readFileSync(resolvedPath)
            const hash = util
              .createHash('xxhash64')
              .update(img)
              .digest('hex')
              .toString()
              .substring(0, 8)
            const out = `/_next/static/media/${name}.${hash}${ext}`
            return out;
          } catch (err) {
            console.error('Error processing image path:', err);
            return '';
          }
        } catch (err) {
          console.error('Error in image mapping:', err);
          return '';
        }
      })
      
      // Check if this is a YAML or TOML frontmatter
      let tags = []
      let date = new Date()
      
      try {
        const matterContent = toString(matterNode)
        
        // Check if it's YAML (starts with ---)
        if (file.trim().startsWith('---')) {
          // Extract YAML frontmatter
          const yamlMatch = file.match(/---\s*([\s\S]*?)\s*---/)
          if (yamlMatch && yamlMatch[1]) {
            const yamlContent = yamlMatch[1]
            
            // Extract tags
            const tagsMatch = yamlContent.match(/tags:\s*\[(.*?)\]/)
            if (tagsMatch && tagsMatch[1]) {
              tags = tagsMatch[1]
                .split(',')
                .map(tag => tag.trim().replace(/"/g, '').replace(/'/g, ''))
                .filter(tag => tag)
            }
            
            // Extract date
            const dateMatch = yamlContent.match(/date:\s*"?([^"\n]+)"?/)
            if (dateMatch && dateMatch[1]) {
              date = new Date(dateMatch[1])
            }
          }
        } else if (matterContent) {
          // Assume it's TOML if not YAML
          const parsedToml = toml.parse(matterContent)
          if (parsedToml.tags) {
            if (typeof parsedToml.tags === 'string') {
              tags = parsedToml.tags
                .split(',')
                .map((e: string) => e.trim())
                .filter((e: string) => !!e)
            } else if (Array.isArray(parsedToml.tags)) {
              tags = parsedToml.tags
            }
          }
          
          if (parsedToml.date) {
            date = new Date(parsedToml.date)
          }
        }
      } catch (error) {
        console.error('Error parsing frontmatter:', error)
      }
      
      node.title = toString(heading)
      node.image = image
      node.tags = tags
      node.date = date
      node.description = toString(paragraph)
      node.content = text
        .map((e) => toString(e))
        .join(' ')
        .replaceAll('\n', ' ')
        
      console.log(`Processed page '${node.path}' with tags:`, tags)
    },
  )
  return dree
}

function trielize(
  parentRoute: string,
  { name, children = [] }: ExtendedDree,
): Tree {
  const route = `${parentRoute}/${name}`
  const index = children.findIndex(({ type }) => type === 'file')
  const [
    only = {
      title: '',
      image: '',
      tags: [],
      description: '',
      value: '',
      content: '',
      date: new Date(),
    },
  ] = index >= 0 ? children.splice(index, 1) : []
  return {
    route,
    children: children
      .map((child) => trielize(route, child))
      .sort((a, b) => {
        if (a.date > b.date) return -1
        if (b.date > a.date) return 1
        if (a.title > b.title) return -1
        if (b.title > a.title) return 1
        return 0
      }),
    title: only.title,
    image: only.image,
    tags: only.tags,
    description: only.description,
    content: only.content || '',
    date: only.date,
  }
}

function flatten({ children = [], ...node }: Tree): Blog[] {
  return [
    { ...node, children: children.map(({ route }) => route) },
    ...children.map((child) => flatten(child)).flat(),
  ]
}

// Parse data
const root = resolve(process.cwd(), './src/app/blog')
const dree = dreelize(root)
if (!dree) throw new Error('Empty contents')
const tree = trielize('', dree)
// Write table
const table = flatten(tree)
writeFileSync('src/db/table.json', JSON.stringify(table, null, 2))
// Write index
const document = lunr(function () {
  this.ref('route')
  this.field('title')
  this.field('description')
  this.field('content')
  table.forEach((doc) => this.add(doc))
})
writeFileSync('src/db/index.json', JSON.stringify(document, null, 2))
