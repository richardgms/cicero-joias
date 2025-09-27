const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ['uploadthing.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
  },
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui'],
  },
  poweredByHeader: false,
};

module.exports = withBundleAnalyzer(nextConfig);
