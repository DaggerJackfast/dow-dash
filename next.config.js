/** @type {import('next').NextConfig} */
const rewrites = async () => {
  const apiPath = process.env.NEXT_PUBLIC_API_PATH;
  const publicApiPath = process.env.API_URL;
  return [
    {
      source: `${apiPath}/:path*`,
      destination: `${publicApiPath}/:path*`
    }
  ]
}
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites
}

module.exports = nextConfig
