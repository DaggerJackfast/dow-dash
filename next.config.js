/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    socketUrl: process.env.WEBSOCKET_HOST,
    mode: process.env.NODE_ENV
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
