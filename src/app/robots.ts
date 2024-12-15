import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/en/*',
        '/es/*',
        '/fr/*',
        '/de/*'
      ],
    },
    sitemap: 'https://timesync.world/sitemap.xml',
  }
}