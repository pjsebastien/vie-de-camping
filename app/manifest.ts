import { MetadataRoute } from 'next'

/**
 * Génère le fichier manifest.json pour PWA
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vie de Camping - Guide des campings en France',
    short_name: 'Vie de Camping',
    description: 'Découvrez les meilleurs campings de France : campings classés, aires naturelles, emplacements, régions et destinations pour vos vacances.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2c5f2d',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    categories: ['travel', 'lifestyle'],
    lang: 'fr',
    dir: 'ltr',
  }
}
