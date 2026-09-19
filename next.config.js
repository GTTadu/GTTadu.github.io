/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 管理者ページをビルドから除外
  experimental: {
    cpus: 1,
  },
}

module.exports = nextConfig