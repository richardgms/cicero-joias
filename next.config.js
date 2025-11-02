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
  // Fix for WSL file watching on Windows-mounted drives
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300,
      };
    }

    // Suprimir warnings de cache do webpack (strings grandes do Prisma)
    config.infrastructureLogging = {
      level: 'error',
      ...(config.infrastructureLogging || {}),
    };

    // Filtrar warnings específicos
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /Serializing big strings/,
      /webpack\.cache\.PackFileCacheStrategy/,
    ];

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
