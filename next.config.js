/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    socketUrl: process.env.WEBSOCKET_HOST,
    mode: process.env.NODE_ENV,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
