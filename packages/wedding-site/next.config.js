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
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET
  }
}

module.exports = nextConfig
