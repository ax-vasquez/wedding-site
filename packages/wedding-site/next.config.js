const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    HOST: process.env.HOST,
    SANITY_PROJECT: process.env.SANITY_PROJECT,
    SANITY_DATASET: process.env.SANITY_DATASET,
    API_URL: process.env.API_URL,
    REGISTRY_URL: process.env.REGISTRY_URL,
  }
}

module.exports = nextConfig
