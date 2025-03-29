/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['example.com'],
  },
  // Add experimental features to help with development
  experimental: {
    // More options for development
    serverComponentsExternalPackages: [],
  },
  // Disable React strict mode for now
  reactStrictMode: false,
}

module.exports = nextConfig 