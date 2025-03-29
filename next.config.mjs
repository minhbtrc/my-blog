import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true,
    domains: [
      'avatars.githubusercontent.com',
      'www.gravatar.com',
      'github.com',
      'raw.githubusercontent.com',
      'cdn-lfs-us-1.hf.co'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  reactStrictMode: false,
  trailingSlash: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: [],
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@headlessui/react',
      'react-icons',
      'zustand'
    ],
  },
  compiler: {
    styledComponents: true,
  },
}

export default withMDX(nextConfig)
