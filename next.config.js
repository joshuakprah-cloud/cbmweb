/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Backward compatibility redirects for old ministry URLs
  async redirects() {
    return [
      // Redirect /sermons/speakers to /sermons/preachers
      {
        source: '/sermons/speakers',
        destination: '/sermons/preachers',
        permanent: true,
      },
      // Keep redirect for children to kids (backward compatibility)
      {
        source: '/ministries/children',
        destination: '/ministries/kids',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
