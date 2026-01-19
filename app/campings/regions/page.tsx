import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { groupCampingsByRegion } from '@/lib/groupings'
import { slugify } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Campings par région - Vie de Camping',
  description: 'Découvrez tous les campings classés de France organisés par région. Trouvez facilement les campings dans votre région de vacances préférée.',
}

export default function RegionsPage() {
  const campingsByRegion = groupCampingsByRegion()
  const regions = Object.keys(campingsByRegion).sort()

  // Images par région (mapping amélioré)
  const regionImages: Record<string, string> = {
    'Provence-Alpes-Côte d\'Azur': '/images/camping piscine.jpg',
    'Nouvelle-Aquitaine': '/images/camping.jpg',
    'Occitanie': '/images/camping tente.jpg',
    'Bretagne': '/images/camping caravane.jpg',
    'Auvergne-Rhône-Alpes': '/images/camping mobile home.jpg',
    'Pays de la Loire': '/images/camping.jpg',
    'Corse': '/images/camping piscine.jpg',
    'Normandie': '/images/camping caravane.jpg',
    'Hauts-de-France': '/images/camping.jpg',
    'Grand Est': '/images/camping mobile home.jpg',
    'Bourgogne-Franche-Comté': '/images/camping tente.jpg',
    'Centre-Val de Loire': '/images/camping.jpg',
    'Île-de-France': '/images/camping mobile home.jpg'
  }

  return (
    <>
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#003580',
        backgroundImage: 'linear-gradient(rgba(0, 53, 128, 0.9), rgba(0, 53, 128, 0.9)), url(/images/camping.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 'clamp(3rem, 8vw, 5rem) 0',
        color: 'var(--color-white)',
        marginTop: '0'
      }}>
        <div className="container">
          <nav style={{ marginBottom: 'var(--space-5)' }}>
            <Link
              href="/"
              style={{
                color: 'var(--color-white)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)',
                opacity: 0.9,
                transition: 'opacity var(--transition-base)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Retour à l'accueil
            </Link>
          </nav>

          <div style={{ maxWidth: '800px' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-white)',
              marginBottom: 'var(--space-4)',
              lineHeight: '1.2'
            }}>
              Campings par région
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-6)'
            }}>
              La France compte {regions.length} régions avec des campings classés. Chaque région offre des paysages et des expériences uniques pour vos vacances.
            </p>

            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: 'var(--space-6)',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-bold)',
                  color: '#FEBB02'
                }}>
                  {regions.length}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  Régions
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-bold)',
                  color: '#FEBB02'
                }}>
                  {Object.values(campingsByRegion).reduce((sum, camps) => sum + camps.length, 0).toLocaleString('fr-FR')}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  Campings
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        backgroundColor: 'var(--color-white)'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-gray-900)',
            marginBottom: 'var(--space-8)',
            textAlign: 'center'
          }}>
            Toutes les régions de France
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)'
          }}>
            {regions.map((region) => {
              const campings = campingsByRegion[region]
              const count = campings.length
              const imageUrl = regionImages[region] || '/images/camping.jpg'

              return (
                <Link
                  key={region}
                  href={`/campings/region/${slugify(region)}/`}
                  style={{
                    textDecoration: 'none',
                    backgroundColor: 'var(--color-white)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid var(--color-gray-200)',
                    transition: 'all var(--transition-base)',
                    display: 'block',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                  }}
                >
                  {/* Image */}
                  <div style={{
                    position: 'relative',
                    height: '200px',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-gray-100)'
                  }}>
                    <Image
                      src={imageUrl}
                      alt={`Camping en ${region}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Badge compteur */}
                    <div style={{
                      position: 'absolute',
                      top: 'var(--space-3)',
                      right: 'var(--space-3)',
                      backgroundColor: 'rgba(0, 53, 128, 0.95)',
                      color: 'var(--color-white)',
                      padding: 'var(--space-2) var(--space-3)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-semibold)',
                      backdropFilter: 'blur(4px)'
                    }}>
                      {count} camping{count > 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: 'var(--space-5)' }}>
                    <h3 style={{
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-bold)',
                      color: 'var(--color-gray-900)',
                      marginBottom: 'var(--space-2)',
                      lineHeight: '1.3'
                    }}>
                      {region}
                    </h3>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      color: '#003580',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-semibold)',
                      marginTop: 'var(--space-4)'
                    }}>
                      Découvrir les campings
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
        backgroundColor: '#F5F5F5',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-3)'
            }}>
              Besoin d'aide pour choisir ?
            </h2>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-gray-600)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-6)'
            }}>
              Vous pouvez également rechercher par département ou par commune pour affiner votre recherche.
            </p>
            <div style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/campings/departements/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-6)',
                  backgroundColor: '#003580',
                  color: 'var(--color-white)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 'var(--font-semibold)',
                  fontSize: 'var(--text-base)',
                  transition: 'all var(--transition-base)'
                }}
              >
                Voir les départements
              </Link>
              <Link
                href="/campings/communes/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-6)',
                  backgroundColor: 'var(--color-white)',
                  color: '#003580',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 'var(--font-semibold)',
                  fontSize: 'var(--text-base)',
                  border: '2px solid #003580',
                  transition: 'all var(--transition-base)'
                }}
              >
                Voir les communes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
