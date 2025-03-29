export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
  author: {
    name: string
    url: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Blog UI",
  description: "A modern blog platform with a beautiful UI",
  url: "https://blog-ui.example.com",
  ogImage: "/images/og-image.jpg",
  links: {
    twitter: "https://twitter.com/example",
    github: "https://github.com/example/blog-ui",
  },
  author: {
    name: "Example Author",
    url: "https://example.com",
  },
} 