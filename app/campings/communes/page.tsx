import type { Metadata } from 'next'
import Link from 'next/link'
import { groupCampingsByCommune } from '@/lib/groupings'
import { slugify } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Campings par commune - Vie de Camping',
  description: 'Découvrez tous les campings classés de France organisés par commune. Plus de 2000 communes avec des campings classés.',
}

export default function CommunesPage() {
  const campingsByCommune = groupCampingsByCommune()
  const communes = Object.keys(campingsByCommune).sort()

  // Grouper par première lettre pour meilleure organisation
  const communesByLetter: Record<string, string[]> = {}

  for (const commune of communes) {
    const firstLetter = commune.charAt(0).toUpperCase()
    if (!communesByLetter[firstLetter]) {
      communesByLetter[firstLetter] = []
    }
    communesByLetter[firstLetter].push(commune)
  }

  const letters = Object.keys(communesByLetter).sort()

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
          <nav style={{
            marginBottom: 'var(--space-5)',
            display: 'flex',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
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
              Accueil
            </Link>
            <span style={{ opacity: 0.5 }}>•</span>
            <Link
              href="/campings/regions/"
              style={{
                color: 'var(--color-white)',
                textDecoration: 'none',
                fontSize: 'var(--text-sm)',
                opacity: 0.9,
                transition: 'opacity var(--transition-base)'
              }}
            >
              Voir par régions
            </Link>
            <span style={{ opacity: 0.5 }}>•</span>
            <Link
              href="/campings/departements/"
              style={{
                color: 'var(--color-white)',
                textDecoration: 'none',
                fontSize: 'var(--text-sm)',
                opacity: 0.9,
                transition: 'opacity var(--transition-base)'
              }}
            >
              Voir par départements
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
              Campings par commune
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-6)'
            }}>
              La France compte {communes.length.toLocaleString('fr-FR')} communes avec des campings classés. Recherchez facilement votre destination de vacances idéale.
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
                  {communes.length.toLocaleString('fr-FR')}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  Communes
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-bold)',
                  color: '#FEBB02'
                }}>
                  {Object.values(campingsByCommune).reduce((sum, camps) => sum + camps.length, 0).toLocaleString('fr-FR')}
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

      {/* Index alphabétique */}
      <section style={{
        padding: 'var(--space-6) 0',
        backgroundColor: 'var(--color-white)',
        borderBottom: '1px solid var(--color-gray-200)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div className="container">
          <nav style={{
            display: 'flex',
            gap: 'var(--space-2)',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px',
                  padding: '0 var(--space-3)',
                  backgroundColor: '#003580',
                  color: 'var(--color-white)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 'var(--font-bold)',
                  fontSize: 'var(--text-sm)',
                  transition: 'all var(--transition-base)'
                }}
              >
                {letter}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Liste des communes par lettre */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        padding: 'clamp(2rem, 4vw, 3rem) 0'
      }}>
        <div className="container">
          {letters.map((letter) => {
            const communesInLetter = communesByLetter[letter]

            return (
              <section
                key={letter}
                id={`letter-${letter}`}
                style={{
                  marginBottom: 'clamp(2rem, 4vw, 3rem)'
                }}
              >
                {/* Titre de la lettre */}
                <div style={{
                  marginBottom: 'var(--space-6)',
                  paddingBottom: 'var(--space-4)',
                  borderBottom: '3px solid #003580'
                }}>
                  <h2 style={{
                    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                    fontWeight: 'var(--font-bold)',
                    color: '#003580',
                    marginBottom: 'var(--space-2)'
                  }}>
                    {letter}
                  </h2>
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)'
                  }}>
                    {communesInLetter.length} commune{communesInLetter.length > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Grid des communes */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 'clamp(0.75rem, 2vw, 1rem)'
                }}>
                  {communesInLetter.map((commune) => {
                    const count = campingsByCommune[commune].length

                    return (
                      <Link
                        key={commune}
                        href={`/campings/commune/${slugify(commune)}/`}
                        style={{
                          textDecoration: 'none',
                          backgroundColor: 'var(--color-white)',
                          border: '1px solid var(--color-gray-200)',
                          borderRadius: 'var(--radius-lg)',
                          padding: 'var(--space-4)',
                          transition: 'all var(--transition-base)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 'var(--space-3)',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                        }}
                      >
                        <div style={{
                          fontSize: 'var(--text-base)',
                          fontWeight: 'var(--font-semibold)',
                          color: 'var(--color-gray-900)',
                          flex: 1
                        }}>
                          {commune}
                        </div>
                        <div style={{
                          backgroundColor: '#003580',
                          color: 'var(--color-white)',
                          padding: 'var(--space-1) var(--space-3)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-semibold)',
                          whiteSpace: 'nowrap'
                        }}>
                          {count}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>

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
              Recherche plus large ?
            </h2>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-gray-600)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-6)'
            }}>
              Explorez les campings par région ou département pour une vision d'ensemble.
            </p>
            <div style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/campings/regions/"
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
                Voir les régions
              </Link>
              <Link
                href="/campings/departements/"
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
                Voir les départements
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
