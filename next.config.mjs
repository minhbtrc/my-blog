import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// Force environment variables
process.env.DISABLE_CLIENT_REFERENCE_MANIFEST = 'true'
process.env.NEXT_DISABLE_EXTRACTION = '1'

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
  swcMinify: false,
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
  output: 'standalone',
  experimental: {
    // Remove all experimental options
  }
}

export default withMDX(nextConfig)
