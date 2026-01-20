import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://www.viedecamping.fr'
      : 'http://localhost:3000'
  ),
  title: {
    default: 'Vie de Camping - Guide des Campings en France',
    template: '%s | Vie de Camping',
  },
  description: 'Découvrez les meilleurs campings de France : 5703 établissements classés dans toutes les régions. Trouvez votre camping idéal avec équipements, avis et disponibilités.',
  keywords: [
    'camping France',
    'campings classés',
    'camping 4 étoiles',
    'camping 5 étoiles',
    'vacances camping',
    'réservation camping',
    'camping avec piscine',
    'camping familial',
    'aire naturelle',
    'mobil-home',
    'emplacement tente',
    'camping nature',
  ],
  authors: [{ name: 'Sébastien P' }],
  creator: 'Vie de Camping',
  publisher: 'Vie de Camping',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.viedecamping.fr',
    siteName: 'Vie de Camping',
    title: 'Vie de Camping - Guide des Campings en France',
    description: 'Découvrez les meilleurs campings de France : 5703 établissements classés dans toutes les régions. Trouvez votre camping idéal avec équipements, avis et disponibilités.',
    images: [
      {
        url: '/images/camping.jpg',
        width: 1200,
        height: 630,
        alt: 'Vie de Camping - Guide des campings en France',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vie de Camping - Guide des Campings en France',
    description: 'Découvrez les meilleurs campings de France : 5703 établissements classés dans toutes les régions.',
    images: ['/images/camping.jpg'],
  },
  alternates: {
    canonical: 'https://www.viedecamping.fr',
  },
  verification: {
    // À compléter avec vos codes de vérification
    // google: 'votre-code-google',
    // yandex: 'votre-code-yandex',
    // bing: 'votre-code-bing',
  },
  icons: {
    icon: '/images/vie de camping favicon.png',
    shortcut: '/images/vie de camping favicon.png',
    apple: '/images/vie de camping favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>

        <Header />

        <main className="main" id="main-content">
          {children}
        </main>

        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div>
                <div className="footer-logo">
                  <Image
                    src="/images/logos/logo-black.png"
                    alt="Vie de Camping"
                    width={120}
                    height={36}
                  />
                </div>
                <p className="footer-text">
                  &copy; 2026 Vie de Camping. Tous droits réservés.
                </p>
                <p className="footer-text">
                  Données issues du classement Atout France
                </p>
              </div>
              <nav className="footer-nav" aria-label="Navigation secondaire">
                <Link href="/mentions-legales/" className="footer-link">Mentions légales</Link>
                <Link href="/politique-confidentialite/" className="footer-link">Politique de confidentialité</Link>
                <Link href="/contact/" className="footer-link">Contact</Link>
              </nav>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
