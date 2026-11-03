/** @type {import('next').NextConfig} */

// Lab tools are separate projects (own repos and Vercel deployments),
// served under ogrigore.design/lab/* through these rewrites.
const LAB = {
  'wireframe-kit': 'https://wireframe-kit-team-of-one2.vercel.app',
}

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return Object.entries(LAB).flatMap(([slug, origin]) => [
      { source: `/lab/${slug}`, destination: `${origin}/lab/${slug}/` },
      { source: `/lab/${slug}/:path*`, destination: `${origin}/lab/${slug}/:path*` },
    ])
  },
}

export default nextConfig
