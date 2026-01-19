import { MetadataRoute } from 'next'

/**
 * Génère le fichier robots.txt pour le site
 * Next.js génère automatiquement le fichier robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
        ],
      },
    ],
    sitemap: 'https://www.viedecamping.fr/sitemap.xml',
  }
}
