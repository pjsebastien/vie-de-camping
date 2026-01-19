import { MetadataRoute } from 'next'
import campings from '@/data/vie-de-camping.json'
import { DEPARTEMENT_TO_REGION, DEPARTEMENT_NAMES } from '@/lib/regions'
import { slugify } from '@/lib/utils'

/**
 * Génère le sitemap XML pour tout le site
 * Next.js génère automatiquement le fichier sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.viedecamping.fr'
  const currentDate = new Date()

  const sitemap: MetadataRoute.Sitemap = []

  // Extract unique regions from DEPARTEMENT_TO_REGION
  const uniqueRegions = Array.from(new Set(Object.values(DEPARTEMENT_TO_REGION)))

  // ========================================
  // 1. PAGES STATIQUES
  // ========================================

  sitemap.push(
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/a-propos/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/mentions-legales/`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite/`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    }
  )

  // ========================================
  // 2. PAGES DE LISTING/INDEX
  // ========================================

  sitemap.push(
    {
      url: `${baseUrl}/campings/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/campings/regions/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/campings/departements/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/campings/communes/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  )

  // ========================================
  // 3. PAGES RÉGIONS (13 régions)
  // ========================================

  uniqueRegions.forEach((region) => {
    sitemap.push({
      url: `${baseUrl}/campings/region/${slugify(region)}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // ========================================
  // 4. PAGES DÉPARTEMENTS (96+ départements)
  // ========================================

  Object.keys(DEPARTEMENT_NAMES).forEach((deptCode) => {
    sitemap.push({
      url: `${baseUrl}/campings/departement/${deptCode}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // ========================================
  // 5. PAGES COMMUNES (Unique communes)
  // ========================================

  const uniqueCommunes = new Set<string>()
  campings.forEach((camping: any) => {
    if (camping.commune) {
      uniqueCommunes.add(camping.commune)
    }
  })

  uniqueCommunes.forEach((commune) => {
    sitemap.push({
      url: `${baseUrl}/campings/commune/${slugify(commune)}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  })

  // ========================================
  // 6. PAGES CAMPINGS INDIVIDUELS
  // ========================================

  campings.forEach((camping: any) => {
    if (camping.slug) {
      sitemap.push({
        url: `${baseUrl}/campings/${camping.slug}/`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    }
  })

  return sitemap
}
