/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Suprimir avisos de hidratação durante o desenvolvimento
  reactStrictMode: false,
};

module.exports = nextConfig;
