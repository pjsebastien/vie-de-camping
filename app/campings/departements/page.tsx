import type { Metadata } from 'next'
import Link from 'next/link'
import { groupCampingsByDepartement } from '@/lib/groupings'
import { DEPARTEMENT_NAMES, DEPARTEMENT_TO_REGION } from '@/lib/regions'
import { slugify } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Campings par département - Vie de Camping',
  description: 'Découvrez tous les campings classés de France organisés par département. Recherche facile par numéro de département.',
}

export default function DepartementsPage() {
  const campingsByDept = groupCampingsByDepartement()
  const departements = Object.keys(campingsByDept).sort()

  // Grouper par région pour meilleure organisation
  const deptsByRegion: Record<string, string[]> = {}

  for (const dept of departements) {
    const region = DEPARTEMENT_TO_REGION[dept]
    if (region) {
      if (!deptsByRegion[region]) {
        deptsByRegion[region] = []
      }
      deptsByRegion[region].push(dept)
    }
  }

  const regions = Object.keys(deptsByRegion).sort()

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
          </nav>

          <div style={{ maxWidth: '800px' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-white)',
              marginBottom: 'var(--space-4)',
              lineHeight: '1.2'
            }}>
              Campings par département
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-6)'
            }}>
              La France compte {departements.length} départements avec des campings classés. Recherchez facilement par numéro ou nom de département.
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
                  {departements.length}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  Départements
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-bold)',
                  color: '#FEBB02'
                }}>
                  {Object.values(campingsByDept).reduce((sum, camps) => sum + camps.length, 0).toLocaleString('fr-FR')}
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

      {/* Main Content - Départements par région */}
      <div style={{
        backgroundColor: 'var(--color-white)',
        padding: 'clamp(2rem, 5vw, 3.5rem) 0'
      }}>
        <div className="container">
          {regions.map((region) => {
            const depts = deptsByRegion[region].sort((a, b) => {
              const nameA = DEPARTEMENT_NAMES[a] || a
              const nameB = DEPARTEMENT_NAMES[b] || b
              return nameA.localeCompare(nameB, 'fr')
            })

            return (
              <section
                key={region}
                style={{
                  marginBottom: 'clamp(2rem, 4vw, 3rem)'
                }}
              >
                {/* Titre de la région */}
                <div style={{
                  marginBottom: 'var(--space-6)',
                  paddingBottom: 'var(--space-4)',
                  borderBottom: '3px solid #003580'
                }}>
                  <h2 style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--color-gray-900)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    <Link
                      href={`/campings/region/${slugify(region)}/`}
                      style={{
                        color: '#003580',
                        textDecoration: 'none',
                        transition: 'color var(--transition-base)'
                      }}
                    >
                      {region}
                    </Link>
                  </h2>
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)'
                  }}>
                    {depts.length} département{depts.length > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Grid des départements */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 'clamp(1rem, 2vw, 1.5rem)'
                }}>
                  {depts.map((dept) => {
                    const deptName = DEPARTEMENT_NAMES[dept] || dept
                    const count = campingsByDept[dept].length

                    return (
                      <Link
                        key={dept}
                        href={`/campings/departement/${dept}/`}
                        style={{
                          textDecoration: 'none',
                          backgroundColor: 'var(--color-white)',
                          border: '1px solid var(--color-gray-200)',
                          borderRadius: 'var(--radius-lg)',
                          padding: 'var(--space-5)',
                          transition: 'all var(--transition-base)',
                          display: 'block',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: 'var(--space-3)'
                        }}>
                          <h3 style={{
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--font-bold)',
                            color: 'var(--color-gray-900)',
                            margin: 0,
                            lineHeight: '1.3'
                          }}>
                            {deptName}
                          </h3>
                          <div style={{
                            backgroundColor: '#003580',
                            color: 'var(--color-white)',
                            padding: 'var(--space-1) var(--space-3)',
                            borderRadius: 'var(--radius-full)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-semibold)',
                            whiteSpace: 'nowrap',
                            marginLeft: 'var(--space-3)'
                          }}>
                            {dept}
                          </div>
                        </div>

                        <div style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-gray-600)',
                          marginBottom: 'var(--space-3)'
                        }}>
                          {count} camping{count > 1 ? 's' : ''}
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          color: '#003580',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-semibold)'
                        }}>
                          Voir les campings
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
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
              Recherche plus précise ?
            </h2>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-gray-600)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-6)'
            }}>
              Affinez votre recherche en explorant les campings par commune ou par région.
            </p>
            <div style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/campings/communes/"
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
                Voir les communes
              </Link>
              <Link
                href="/campings/regions/"
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
                Voir les régions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
