import type { Metadata } from 'next'
import { loadCampings } from '@/lib/loadCampings'
import { getAllRegions, getAllDepartements, getAllCommunes, groupCampingsByRegion } from '@/lib/groupings'
import { SearchBarAdvanced } from '@/components/ui/SearchBarAdvanced'
import { DestinationCard } from '@/components/cards/DestinationCard'
import { slugify } from '@/lib/utils'
import { loadTentesData, formatPrice } from '@/lib/loadTentesData'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Vie de Camping - Réservez votre camping en France',
  description: 'Découvrez et réservez parmi plus de 5 700 campings classés en France. Comparez les prix, consultez les avis et trouvez le camping idéal pour vos vacances.',
}

export default function HomePage() {
  const campings = loadCampings()
  const regions = getAllRegions()
  const departments = getAllDepartements()
  const communes = getAllCommunes()
  const campingsByRegion = groupCampingsByRegion()
  const tentesData = loadTentesData()
  const kp19pro = tentesData.models.find(m => m.model === 'KP19PRO')!

  // Top 6 régions par nombre de campings
  const topRegions = Object.entries(campingsByRegion)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 6)
    .map(([name, camps]) => ({
      name,
      count: camps.length,
      image: '/images/camping.jpg' // On utilisera l'image par défaut pour le moment
    }))

  // Mapper les images selon la région
  const regionImages: Record<string, string> = {
    'Provence-Alpes-Côte d\'Azur': '/images/camping piscine.jpg',
    'Nouvelle-Aquitaine': '/images/camping.jpg',
    'Occitanie': '/images/camping tente.jpg',
    'Bretagne': '/images/camping caravane.jpg',
    'Auvergne-Rhône-Alpes': '/images/camping mobile home.jpg',
    'Pays de la Loire': '/images/camping.jpg'
  }

  const topRegionsWithImages = topRegions.map(region => ({
    ...region,
    image: regionImages[region.name] || '/images/camping.jpg'
  }))

  return (
    <>
      {/* Hero Section - Style Booking.com */}
      <section style={{
        backgroundColor: '#003580',
        backgroundImage: 'linear-gradient(rgba(0, 53, 128, 0.85), rgba(0, 53, 128, 0.85)), url(/images/camping.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 'clamp(2rem, 5vw, 3.5rem) 0 clamp(2.5rem, 6vw, 4rem) 0',
        color: 'var(--color-white)',
        marginTop: '0'
      }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-white)',
              marginBottom: 'var(--space-3)',
              textAlign: 'center'
            }}>
              Trouvez et réservez le camping parfait
            </h1>
            <p style={{
              fontSize: 'var(--text-xl)',
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              marginBottom: 'var(--space-8)'
            }}>
              Des campings 1 à 5 étoiles dans toute la France
            </p>

            {/* Search Bar - Prominent */}
            <SearchBarAdvanced
              campings={campings}
              regions={regions}
              departments={departments}
              communes={communes}
            />
          </div>
        </div>
      </section>

      {/* Destinations populaires */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        backgroundColor: 'var(--color-white)'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '800px',
            margin: '0 auto var(--space-8) auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-3)'
            }}>
              Destinations populaires
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'var(--color-gray-600)',
              lineHeight: '1.7'
            }}>
              Explorez les régions françaises les plus prisées pour le camping. Des plages méditerranéennes aux montagnes alpines, trouvez la destination qui correspond à vos envies.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: 'clamp(1rem, 3vw, 2rem)' }}>
            {topRegionsWithImages.map((region) => (
              <DestinationCard
                key={region.name}
                title={region.name}
                description={`${region.count} campings`}
                href={`/campings/region/${slugify(region.name)}/`}
                imageSrc={region.image}
                count={region.count}
              />
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: 'var(--space-8)'
          }}>
            <Link
              href="/campings/regions/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-3) var(--space-6)',
                backgroundColor: 'transparent',
                color: '#003580',
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                fontWeight: 'var(--font-semibold)',
                fontSize: 'var(--text-base)',
                border: '2px solid #003580',
                transition: 'all var(--transition-base)'
              }}
            >
              Voir toutes les régions
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Explorez par type */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        backgroundColor: '#F5F5F5'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '800px',
            margin: '0 auto var(--space-8) auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-3)'
            }}>
              Explorez par type de camping
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'var(--color-gray-600)',
              lineHeight: '1.7'
            }}>
              Du luxe 5 étoiles aux aires naturelles, chaque type de camping offre une expérience unique. Découvrez celui qui correspond le mieux à vos attentes.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1rem, 3vw, 2rem)'
          }}>
            <Link
              href="/campings/?type=5etoiles"
              style={{
                textDecoration: 'none',
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--color-gray-200)',
                transition: 'all var(--transition-base)'
              }}
            >
              <div style={{
                position: 'relative',
                height: '160px',
                overflow: 'hidden'
              }}>
                <Image
                  src="/images/camping piscine.jpg"
                  alt="Camping 5 étoiles"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div style={{ padding: 'var(--space-4)' }}>
                <h3 style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  color: 'var(--color-gray-900)',
                  marginBottom: 'var(--space-1)'
                }}>
                  Campings 5 étoiles
                </h3>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-gray-600)'
                }}>
                  Le luxe en pleine nature
                </p>
              </div>
            </Link>

            <Link
              href="/campings/?type=mobil-home"
              style={{
                textDecoration: 'none',
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--color-gray-200)',
                transition: 'all var(--transition-base)'
              }}
            >
              <div style={{
                position: 'relative',
                height: '160px',
                overflow: 'hidden'
              }}>
                <Image
                  src="/images/camping mobile home.jpg"
                  alt="Camping avec mobil-home"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div style={{ padding: 'var(--space-4)' }}>
                <h3 style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  color: 'var(--color-gray-900)',
                  marginBottom: 'var(--space-1)'
                }}>
                  Locations mobil-home
                </h3>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-gray-600)'
                }}>
                  Confort et équipement
                </p>
              </div>
            </Link>

            <Link
              href="/campings/?type=nature"
              style={{
                textDecoration: 'none',
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--color-gray-200)',
                transition: 'all var(--transition-base)'
              }}
            >
              <div style={{
                position: 'relative',
                height: '160px',
                overflow: 'hidden'
              }}>
                <Image
                  src="/images/camping tente.jpg"
                  alt="Camping nature"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div style={{ padding: 'var(--space-4)' }}>
                <h3 style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  color: 'var(--color-gray-900)',
                  marginBottom: 'var(--space-1)'
                }}>
                  Campings nature
                </h3>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-gray-600)'
                }}>
                  Authenticité garantie
                </p>
              </div>
            </Link>

            <Link
              href="/campings/?amenite=piscine"
              style={{
                textDecoration: 'none',
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--color-gray-200)',
                transition: 'all var(--transition-base)'
              }}
            >
              <div style={{
                position: 'relative',
                height: '160px',
                overflow: 'hidden'
              }}>
                <Image
                  src="/images/camping piscine.jpg"
                  alt="Camping avec piscine"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div style={{ padding: 'var(--space-4)' }}>
                <h3 style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  color: 'var(--color-gray-900)',
                  marginBottom: 'var(--space-1)'
                }}>
                  Avec piscine
                </h3>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-gray-600)'
                }}>
                  Baignade sur place
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Tentes de Toit - Section Promo */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        backgroundColor: 'var(--color-white)',
        borderTop: '1px solid var(--color-gray-100)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(1.5rem, 4vw, 2.5rem)',
            alignItems: 'center'
          }}>
            {/* Texte */}
            <div>
              <div style={{
                display: 'inline-block',
                padding: '4px 12px',
                backgroundColor: '#DC2626',
                color: 'white',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-semibold)',
                marginBottom: 'var(--space-3)'
              }}>
                -120€ avec le code KAILOP120
              </div>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-3)',
                lineHeight: '1.2'
              }}>
                Tentes de toit : dormez partout, en toute liberté
              </h2>
              <p style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-gray-600)',
                lineHeight: '1.7',
                marginBottom: 'var(--space-4)'
              }}>
                Transformez votre véhicule en hébergement mobile. Les tentes de toit rigides KAILOP s'ouvrent
                en 5 secondes et offrent un couchage confortable pour 2-3 personnes. Garantie 5 ans, livraison
                gratuite depuis la France.
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-5)'
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  backgroundColor: 'var(--color-gray-100)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-gray-700)'
                }}>🛡️ Garantie 5 ans</span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  backgroundColor: 'var(--color-gray-100)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-gray-700)'
                }}>🚚 Livraison gratuite</span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  backgroundColor: 'var(--color-gray-100)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-gray-700)'
                }}>⚡ Ouverture 5s</span>
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                alignItems: 'center'
              }}>
                <Link
                  href="/meilleures-tentes-de-toit/"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    padding: 'var(--space-3) var(--space-5)',
                    backgroundColor: '#16A34A',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 'var(--font-semibold)',
                    fontSize: 'var(--text-base)',
                    transition: 'all var(--transition-base)'
                  }}
                >
                  Voir les tentes de toit →
                </Link>
                <span style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-gray-500)'
                }}>
                  À partir de <strong style={{ color: 'var(--color-gray-900)' }}>{formatPrice(kp19pro.pricing.current_eur)}</strong>
                </span>
              </div>
            </div>

            {/* Image */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              aspectRatio: '4/3'
            }}>
              <Image
                src={kp19pro.media.images.general[0]}
                alt="Tente de toit KAILOP - Camping en liberté"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div style={{
                position: 'absolute',
                bottom: 'var(--space-3)',
                left: 'var(--space-3)',
                padding: '8px 14px',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                color: 'white',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-medium)'
              }}>
                🎁 Code promo : KAILOP120
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        backgroundColor: '#F5F5F5'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '800px',
            margin: '0 auto var(--space-10) auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-3)'
            }}>
              Pourquoi réserver avec Vie de Camping ?
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'var(--color-gray-600)',
              lineHeight: '1.7'
            }}>
              Votre partenaire de confiance pour des vacances en camping réussies
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto var(--space-4) auto',
                backgroundColor: '#003580',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--text-3xl)',
                color: 'var(--color-white)'
              }}>
                ✓
              </div>
              <h3 style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-semibold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-2)'
              }}>
                Plus de 5 700 campings
              </h3>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-gray-600)',
                lineHeight: '1.6'
              }}>
                La plus grande sélection de campings classés en France
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto var(--space-4) auto',
                backgroundColor: '#003580',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--text-3xl)',
                color: 'var(--color-white)'
              }}>
                ★
              </div>
              <h3 style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-semibold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-2)'
              }}>
                Classement officiel
              </h3>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-gray-600)',
                lineHeight: '1.6'
              }}>
                Tous les campings sont certifiés Atout France
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto var(--space-4) auto',
                backgroundColor: '#003580',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--text-3xl)',
                color: 'var(--color-white)'
              }}>
                🔍
              </div>
              <h3 style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-semibold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-2)'
              }}>
                Recherche simplifiée
              </h3>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-gray-600)',
                lineHeight: '1.6'
              }}>
                Filtrez par région, équipements et type de séjour
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto var(--space-4) auto',
                backgroundColor: '#003580',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--text-3xl)',
                color: 'var(--color-white)'
              }}>
                📍
              </div>
              <h3 style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-semibold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-2)'
              }}>
                Toute la France
              </h3>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-gray-600)',
                lineHeight: '1.6'
              }}>
                De la mer à la montagne, trouvez votre destination
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation rapide */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        backgroundColor: '#F5F5F5'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '800px',
            margin: '0 auto var(--space-8) auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-3)'
            }}>
              Rechercher par zone géographique
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'var(--color-gray-600)',
              lineHeight: '1.7'
            }}>
              Parcourez notre base de données complète par région, département ou commune
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(1rem, 3vw, 1.5rem)'
          }}>
            <Link
              href="/campings/regions/"
              style={{
                textDecoration: 'none',
                padding: 'var(--space-5)',
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-gray-200)',
                transition: 'all var(--transition-base)',
                display: 'block'
              }}
            >
              <div style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-semibold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-1)'
              }}>
                {regions.length} régions
              </div>
              <div style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-gray-600)'
              }}>
                Voir toutes les régions →
              </div>
            </Link>

            <Link
              href="/campings/departements/"
              style={{
                textDecoration: 'none',
                padding: 'var(--space-5)',
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-gray-200)',
                transition: 'all var(--transition-base)',
                display: 'block'
              }}
            >
              <div style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-semibold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-1)'
              }}>
                {departments.length} départements
              </div>
              <div style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-gray-600)'
              }}>
                Voir tous les départements →
              </div>
            </Link>

            <Link
              href="/campings/communes/"
              style={{
                textDecoration: 'none',
                padding: 'var(--space-5)',
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-gray-200)',
                transition: 'all var(--transition-base)',
                display: 'block'
              }}
            >
              <div style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-semibold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-1)'
              }}>
                {communes.length.toLocaleString('fr-FR')} communes
              </div>
              <div style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-gray-600)'
              }}>
                Voir toutes les communes →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{
        padding: 'clamp(4rem, 10vw, 7rem) 0',
        backgroundColor: '#003580',
        backgroundImage: 'linear-gradient(135deg, #003580 0%, #0051A8 100%)',
        color: 'var(--color-white)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-white)',
              marginBottom: 'var(--space-5)',
              lineHeight: '1.2'
            }}>
              Prêt à partir en vacances ?
            </h2>
            <p style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
              marginBottom: 'var(--space-8)',
              opacity: 0.95,
              lineHeight: '1.6'
            }}>
              Commencez à explorer nos {campings.length.toLocaleString('fr-FR')} campings certifiés et trouvez la destination idéale pour vos prochaines vacances en famille
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              alignItems: 'center'
            }}>
              <Link
                href="/campings/regions/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-4) var(--space-8)',
                  backgroundColor: '#FEBB02',
                  color: '#003580',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 'var(--font-bold)',
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                  transition: 'all var(--transition-base)',
                  boxShadow: '0 4px 12px rgba(254, 187, 2, 0.3)'
                }}
              >
                Découvrir les campings
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <p style={{
                fontSize: 'var(--text-sm)',
                opacity: 0.8,
                marginTop: 'var(--space-2)'
              }}>
                Données officielles • Classement Atout France • {regions.length} régions • {departments.length} départements
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
