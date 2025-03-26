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
      const file = readFileSync(node.path)
      const md = fromMarkdown(file, {
        extensions: [frontmatter(['yaml', 'toml'])],
        mdastExtensions: [frontmatterFromMarkdown(['yaml', 'toml'])],
      })
      const matter = select('root > toml', md)
      const heading = select('root > heading', md) || {}
      const paragraph = select('root > paragraph', md) || {}
      const text = selectAll('heading, paragraph', md)
      const images = selectAll('image', md)
      const [image = ''] = images.map((image) => {
        try {
          const { url } = Object.assign({ url: '' }, image)
          if (isURL(url)) return url
          const { dir } = parse(node.path)
          const { name, ext } = parse(url)
          const img = readFileSync(resolve(dir, url))
          const hash = util
            .createHash('xxhash64')
            .update(img)
            .digest('hex')
            .toString()
            .substring(0, 8)
          const out = `/_next/static/media/${name}.${hash}${ext}`
          return out
        } catch {
          return ''
        }
      })
      const { tags, date } = z
        .object({
          tags: z
            .string()
            .default('')
            .transform((tags) =>
              tags
                .split(',')
                .map((e) => e.trim())
                .filter((e) => !!e),
            ),
          date: z.coerce.date().default(new Date()),
        })
        .parse(toml.parse(toString(matter)))
      node.title = toString(heading)
      node.image = image
      node.tags = tags
      node.date = date
      node.description = toString(paragraph)
      node.content = text
        .map((e) => toString(e))
        .join(' ')
        .replaceAll('\n', ' ')
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
