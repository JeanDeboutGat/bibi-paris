/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  // This helps with image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  }
}

module.exports = nextConfig 