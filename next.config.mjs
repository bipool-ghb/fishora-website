/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Required for Next.js image optimisation in static export
  images: { unoptimized: true },
  // GitHub Pages serves from /fishora-website/ — remove if you have a custom domain
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
}
export default nextConfig
