/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    apiPath: process.env.API_URL,
    websocketHost: process.env.WEBSOCKET_HOST,
    mode: process.env.NODE_ENV
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
