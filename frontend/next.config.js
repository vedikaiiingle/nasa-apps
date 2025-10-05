/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gibs.earthdata.nasa.gov', 'cmr.earthdata.nasa.gov'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/:path*`,
      },
    ]
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable filesystem cache in development to prevent ENOENT errors
      config.cache = false;
    }
    return config;
  },
}

module.exports = nextConfig
