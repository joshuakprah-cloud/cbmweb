/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://thagospel.com',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/404', '/500'],
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  gzip: true,
  additionalPaths: async (config) => {
    // Add dynamic paths here if needed
    return []
  },
  transform: async (config, path) => {
    // Custom transform for paths
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },
}
