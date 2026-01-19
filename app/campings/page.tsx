import type { Metadata } from 'next'
import Link from 'next/link'
import { loadCampings } from '@/lib/loadCampings'
import { getAllRegions, getAllDepartements } from '@/lib/groupings'
import { slugify } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Campings en France - Vie de Camping',
  description: 'Découvrez notre sélection de campings en France. Trouvez le camping idéal pour vos prochaines vacances parmi les plus beaux emplacements du pays.',
}

export default function CampingsPage() {
  const campings = loadCampings()
  const regions = getAllRegions()
  const departements = getAllDepartements()

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
              Campings en France
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-6)'
            }}>
              Découvrez {campings.length.toLocaleString('fr-FR')} campings classés en France. Trouvez l'emplacement idéal pour vos prochaines vacances selon le classement officiel Atout France.
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
                  {campings.length.toLocaleString('fr-FR')}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  Campings
                </div>
              </div>
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
                  {departements.length}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  Départements
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation rapide */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
        backgroundColor: 'var(--color-white)'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-gray-900)',
            marginBottom: 'var(--space-2)',
            textAlign: 'center'
          }}>
            Rechercher par localisation
          </h2>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-gray-600)',
            textAlign: 'center',
            marginBottom: 'var(--space-8)'
          }}>
            Explorez les campings par région, département ou commune
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)'
          }}>
            <Link
              href="/campings/regions/"
              style={{
                textDecoration: 'none',
                backgroundColor: 'var(--color-white)',
                border: '2px solid #003580',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                transition: 'all var(--transition-base)',
                display: 'block'
              }}
            >
              <div style={{
                fontSize: 'var(--text-4xl)',
                marginBottom: 'var(--space-4)',
                textAlign: 'center'
              }}>
                🗺️
              </div>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-bold)',
                color: '#003580',
                marginBottom: 'var(--space-2)',
                textAlign: 'center'
              }}>
                Par région
              </h3>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-gray-600)',
                textAlign: 'center',
                marginBottom: 'var(--space-3)'
              }}>
                {regions.length} régions avec des campings classés
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                color: '#003580',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-semibold)'
              }}>
                Explorer
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>

            <Link
              href="/campings/departements/"
              style={{
                textDecoration: 'none',
                backgroundColor: 'var(--color-white)',
                border: '2px solid #003580',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                transition: 'all var(--transition-base)',
                display: 'block'
              }}
            >
              <div style={{
                fontSize: 'var(--text-4xl)',
                marginBottom: 'var(--space-4)',
                textAlign: 'center'
              }}>
                📍
              </div>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-bold)',
                color: '#003580',
                marginBottom: 'var(--space-2)',
                textAlign: 'center'
              }}>
                Par département
              </h3>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-gray-600)',
                textAlign: 'center',
                marginBottom: 'var(--space-3)'
              }}>
                {departements.length} départements avec campings
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                color: '#003580',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-semibold)'
              }}>
                Explorer
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>

            <Link
              href="/campings/communes/"
              style={{
                textDecoration: 'none',
                backgroundColor: 'var(--color-white)',
                border: '2px solid #003580',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                transition: 'all var(--transition-base)',
                display: 'block'
              }}
            >
              <div style={{
                fontSize: 'var(--text-4xl)',
                marginBottom: 'var(--space-4)',
                textAlign: 'center'
              }}>
                🏘️
              </div>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-bold)',
                color: '#003580',
                marginBottom: 'var(--space-2)',
                textAlign: 'center'
              }}>
                Par commune
              </h3>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-gray-600)',
                textAlign: 'center',
                marginBottom: 'var(--space-3)'
              }}>
                Plus de 2000 communes avec campings
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                color: '#003580',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-semibold)'
              }}>
                Explorer
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Liste complète */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
        backgroundColor: '#F5F5F5'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-gray-900)',
            marginBottom: 'var(--space-2)'
          }}>
            Tous les campings ({campings.length.toLocaleString('fr-FR')})
          </h2>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-gray-600)',
            marginBottom: 'var(--space-6)'
          }}>
            Liste complète par ordre alphabétique
          </p>

          <div style={{
            display: 'grid',
            gap: 'var(--space-4)'
          }}>
            {campings.map((camping) => (
              <article key={camping.slug} style={{
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--color-gray-200)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1rem, 2vw, 1.25rem)',
                transition: 'all var(--transition-base)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 'var(--space-4)',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <h3 style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-bold)',
                      marginBottom: 'var(--space-2)',
                      margin: 0
                    }}>
                      <Link
                        href={`/campings/${camping.slug}/`}
                        style={{
                          color: '#003580',
                          textDecoration: 'none',
                          transition: 'color var(--transition-base)'
                        }}
                      >
                        {camping.nom}
                      </Link>
                    </h3>
                    <p style={{
                      color: 'var(--color-gray-600)',
                      fontSize: 'var(--text-sm)',
                      margin: 0
                    }}>
                      <Link
                        href={`/campings/commune/${slugify(camping.commune)}/`}
                        style={{ color: '#003580', textDecoration: 'none' }}
                      >
                        {camping.commune}
                      </Link>
                      {' '}({camping.departement})
                      {camping.nombreEmplacements && ` • ${camping.nombreEmplacements} emplacements`}
                    </p>
                  </div>

                  <div style={{
                    backgroundColor: '#003580',
                    color: 'var(--color-white)',
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-semibold)',
                    whiteSpace: 'nowrap'
                  }}>
                    {camping.classement}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
        background: 'linear-gradient(135deg, #003580 0%, #0052A3 100%)',
        color: 'var(--color-white)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-white)',
              marginBottom: 'var(--space-3)'
            }}>
              Besoin d'aide pour choisir ?
            </h2>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-6)'
            }}>
              Explorez nos campings par région pour découvrir les meilleurs emplacements selon vos envies de vacances.
            </p>
            <Link
              href="/campings/regions/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-4) var(--space-6)',
                backgroundColor: '#FEBB02',
                color: '#003580',
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                fontWeight: 'var(--font-bold)',
                fontSize: 'var(--text-base)',
                transition: 'all var(--transition-base)',
                boxShadow: '0 4px 12px rgba(254, 187, 2, 0.3)'
              }}
            >
              Explorer par région
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
