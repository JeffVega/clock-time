import type { MetadataRoute } from 'next'
import { baseUrl } from './lib/constant'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/','/timezones', '/timezones/*'],
      disallow: '/api/*',
    },
    sitemap:`${baseUrl}/sitemap.xml` ,
  }
}