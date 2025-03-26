import type { MDXComponents } from 'mdx/types'

import Link from './components/md/link'
import Image from './components/md/image'
import Toc from './components/md/toc'
import Pre, { Tabs, Tab } from './components/md/highlight'
import Contributors from './components/md/contributors'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: Link,
    img: Image,
    pre: Pre,
    nav: Toc,
    Tabs,
    Tab,
    Contributors,
    ...components,
  }
}
