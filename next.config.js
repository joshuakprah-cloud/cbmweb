/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/((?!admin).*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src-elem 'self' 'unsafe-inline' blob: https://checkout.paystack.com https://js.paystack.co https://checkout.gointerpay.net/ https://checkout.rch.io/v2.22/fingerprint https://www.googletagmanager.com/gtag/ https://s3-eu-west-1.amazonaws.com/pstk-public-files/js/pusher.min.js https://applepay.cdn-apple.com/jsapi/v1.1.0/apple-pay-sdk.js https://www.googletagmanager.com/debug/ 'sha384-QQMs28J0n8Mw4Q1CHlPa/iPNoI8cHTH141eSbWme69K7V+4TvvHzfFm+PuE4JpxF' 'nonce-RINXNVIrIZNGZZnX' 'sha384-kYN1NbScnNOnyvDqahb4am4uYrSJh/+eDDN9ipiMT/Xx6ivmTHrN4Eh1JD6JZ2Ek' ;",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig
