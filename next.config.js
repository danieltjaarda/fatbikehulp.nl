/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is now stable in Next.js 14
  async redirects() {
    return [
      {
        source: '/locatie',
        destination: '/locatie/joure',
        permanent: true, // 301 redirect voor SEO
      },
    ]
  },
  // Use SWC for faster builds and smaller output
  swcMinify: true,
  // Optimize for modern browsers
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
    // Target modern browsers - reduces polyfills
    emotion: false,
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression
  compress: true,
  // Remove powered-by header for security
  poweredByHeader: false,
  // Optimize JavaScript output for modern browsers
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
  // Enable modern JavaScript features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
