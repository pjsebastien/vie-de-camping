import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllDepartements, getCampingsByDepartement, getCommunesInDepartement } from '@/lib/groupings'
import { DEPARTEMENT_TO_REGION } from '@/lib/regions'
import { slugify } from '@/lib/utils'
import { generateDepartementOverview, generateDepartementTypologie, generateBestCampingsContent, generateChoosingTips } from '@/lib/contentGenerator'
import CampingFilterWrapper from './CampingFilterWrapper'

type Props = {
  params: { departement: string }
}

export async function generateStaticParams() {
  const departements = getAllDepartements()

  return departements.map((departement) => ({
    departement,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getCampingsByDepartement(params.departement)

  if (!data) {
    return {
      title: 'Département non trouvé - Vie de Camping',
    }
  }

  const title = `Camping dans le ${data.departementName} (${data.departement}) : campings classés`
  const description = `Tous les ${data.campings.length} campings classés dans le département ${data.departementName} (${data.departement}) : liste complète par commune et classement.`

  return {
    title,
    description,
  }
}

export default function DepartementPage({ params }: Props) {
  const data = getCampingsByDepartement(params.departement)

  if (!data) {
    notFound()
  }

  const { departement, departementName, campings } = data
  const region = DEPARTEMENT_TO_REGION[departement]
  const communes = getCommunesInDepartement(departement)

  // Grouper les campings par commune
  const campingsByCommune: Record<string, typeof campings> = {}
  for (const camping of campings) {
    if (!campingsByCommune[camping.commune]) {
      campingsByCommune[camping.commune] = []
    }
    campingsByCommune[camping.commune].push(camping)
  }

  // Contenu généré automatiquement
  const overviewText = generateDepartementOverview(departementName, campings, communes.length)
  const typologieText = generateDepartementTypologie(campings)
  const bestCampingsContent = generateBestCampingsContent(`${departementName} (${departement})`, campings, 'departement')
  const choosingTips = generateChoosingTips('departement')

  // Stats
  const stats = {
    total: campings.length,
    communes: communes.length,
    with4or5stars: campings.filter(c => c.classement?.includes('5 étoiles') || c.classement?.includes('4 étoiles')).length,
    withPool: campings.filter(c => c.piscine).length,
  }

  // Top campings
  const topCampings = campings
    .filter(c => c.classement?.includes('5 étoiles') || c.classement?.includes('4 étoiles'))
    .slice(0, 4)

  return (
    <>
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#003580',
        backgroundImage: 'linear-gradient(rgba(0, 53, 128, 0.9), rgba(0, 53, 128, 0.9)), url(/images/camping.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        color: 'var(--color-white)',
        marginTop: '0'
      }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav style={{
            marginBottom: 'var(--space-5)',
            display: 'flex',
            gap: 'var(--space-3)',
            flexWrap: 'wrap',
            alignItems: 'center',
            fontSize: 'var(--text-sm)'
          }}>
            <Link
              href="/"
              style={{
                color: 'var(--color-white)',
                textDecoration: 'none',
                opacity: 0.9
              }}
            >
              Accueil
            </Link>
            <span style={{ opacity: 0.5 }}>›</span>
            {region && (
              <>
                <Link
                  href={`/campings/region/${slugify(region)}/`}
                  style={{
                    color: 'var(--color-white)',
                    textDecoration: 'none',
                    opacity: 0.9
                  }}
                >
                  {region}
                </Link>
                <span style={{ opacity: 0.5 }}>›</span>
              </>
            )}
            <span style={{ opacity: 0.9 }}>{departementName}</span>
          </nav>

          <div style={{ maxWidth: '900px' }}>
            <div style={{
              backgroundColor: '#FEBB02',
              color: '#003580',
              display: 'inline-block',
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              marginBottom: 'var(--space-4)'
            }}>
              Département {departement}
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-white)',
              marginBottom: 'var(--space-4)',
              lineHeight: '1.1'
            }}>
              Camping dans le {departementName}
            </h1>

            {region && (
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: 'var(--space-6)'
              }}>
                Région {region}
              </p>
            )}

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 'clamp(1rem, 3vw, 2rem)',
              maxWidth: '600px'
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 'var(--font-bold)',
                  color: '#FEBB02'
                }}>
                  {stats.total}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginTop: 'var(--space-1)'
                }}>
                  Campings
                </div>
              </div>

              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 'var(--font-bold)',
                  color: '#FEBB02'
                }}>
                  {stats.communes}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginTop: 'var(--space-1)'
                }}>
                  Communes
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        backgroundColor: 'var(--color-white)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-5)'
            }}>
              Le camping dans le département
            </h2>
            <div style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: '1.8',
              color: 'var(--color-gray-700)'
            }}>
              {overviewText}
            </div>
          </div>
        </div>
      </section>

      {/* Typologie Section */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        backgroundColor: '#F5F5F5'
      }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-5)'
            }}>
              Typologie de l'offre
            </h2>
            <div style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: '1.8',
              color: 'var(--color-gray-700)',
              marginBottom: 'var(--space-8)'
            }}>
              {typologieText}
            </div>

            {/* Quick stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-4)'
            }}>
              {stats.with4or5stars > 0 && (
                <div style={{
                  backgroundColor: 'var(--color-white)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-gray-200)'
                }}>
                  <div style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-bold)',
                    color: '#003580',
                    marginBottom: 'var(--space-2)'
                  }}>
                    {stats.with4or5stars}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)'
                  }}>
                    Campings 4★ et 5★
                  </div>
                </div>
              )}

              {stats.withPool > 0 && (
                <div style={{
                  backgroundColor: 'var(--color-white)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-gray-200)'
                }}>
                  <div style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-bold)',
                    color: '#003580',
                    marginBottom: 'var(--space-2)'
                  }}>
                    {stats.withPool}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)'
                  }}>
                    Avec piscine
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Top Campings (si disponibles) */}
      {topCampings.length > 0 && (
        <section style={{
          padding: 'clamp(2rem, 5vw, 3.5rem) 0',
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
              Campings recommandés
            </h2>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-gray-600)',
              textAlign: 'center',
              marginBottom: 'var(--space-8)'
            }}>
              Sélection haut de gamme dans le {departementName}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2rem)'
            }}>
              {topCampings.map((camping) => (
                <Link
                  key={camping.slug}
                  href={`/campings/${camping.slug}/`}
                  style={{
                    textDecoration: 'none',
                    backgroundColor: 'var(--color-white)',
                    border: '2px solid #FEBB02',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-5)',
                    transition: 'all var(--transition-base)',
                    display: 'block',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: 'var(--space-4)',
                    backgroundColor: '#FEBB02',
                    color: '#003580',
                    padding: 'var(--space-1) var(--space-3)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-bold)',
                    textTransform: 'uppercase'
                  }}>
                    Recommandé
                  </div>

                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--color-gray-900)',
                    marginBottom: 'var(--space-3)',
                    marginTop: 'var(--space-2)',
                    lineHeight: '1.3'
                  }}>
                    {camping.nom}
                  </h3>

                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    📍 {camping.commune}
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: 'var(--space-2)',
                    flexWrap: 'wrap',
                    marginBottom: 'var(--space-3)'
                  }}>
                    {camping.classement && (
                      <span style={{
                        backgroundColor: '#003580',
                        color: 'var(--color-white)',
                        padding: 'var(--space-1) var(--space-2)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-semibold)'
                      }}>
                        {camping.classement}
                      </span>
                    )}
                    {camping.nombreEmplacements && (
                      <span style={{
                        backgroundColor: 'var(--color-gray-100)',
                        color: 'var(--color-gray-700)',
                        padding: 'var(--space-1) var(--space-2)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--text-xs)'
                      }}>
                        {camping.nombreEmplacements} empl.
                      </span>
                    )}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    color: '#003580',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-semibold)'
                  }}>
                    Voir le camping
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Communes Section */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        backgroundColor: '#F5F5F5'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-gray-900)',
            marginBottom: 'var(--space-2)',
            textAlign: 'center'
          }}>
            Communes avec des campings
          </h2>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-gray-600)',
            textAlign: 'center',
            marginBottom: 'var(--space-8)'
          }}>
            {communes.length} commune{communes.length > 1 ? 's' : ''} dans le {departementName}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            {communes.map((commune) => {
              const count = campingsByCommune[commune]?.length || 0
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
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                  }}
                >
                  <div style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-semibold)',
                    color: 'var(--color-gray-900)'
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
                    minWidth: '32px',
                    textAlign: 'center'
                  }}>
                    {count}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Meilleurs campings */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        backgroundColor: 'var(--color-white)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-6)',
              textAlign: 'center'
            }}>
              {bestCampingsContent.title}
            </h2>

            <p style={{
              fontSize: 'var(--text-lg)',
              lineHeight: '1.7',
              color: 'var(--color-gray-700)',
              marginBottom: 'var(--space-6)'
            }}>
              {bestCampingsContent.introduction}
            </p>

            {bestCampingsContent.criteria.length > 0 && (
              <div style={{
                backgroundColor: '#f0f7ff',
                border: '2px solid #003580',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                marginBottom: 'var(--space-6)'
              }}>
                <h3 style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-bold)',
                  color: '#003580',
                  marginBottom: 'var(--space-4)'
                }}>
                  🎯 Points clés de la sélection
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'grid',
                  gap: 'var(--space-3)'
                }}>
                  {bestCampingsContent.criteria.map((criterion, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      gap: 'var(--space-3)',
                      fontSize: 'var(--text-base)',
                      lineHeight: '1.6',
                      color: 'var(--color-gray-700)'
                    }}>
                      <span style={{
                        color: '#2c5f2d',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-bold)',
                        flexShrink: 0
                      }}>✓</span>
                      <span>{criterion.replace(/\*\*/g, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p style={{
              fontSize: 'var(--text-base)',
              lineHeight: '1.7',
              color: 'var(--color-gray-700)'
            }}>
              {bestCampingsContent.conclusion}
            </p>
          </div>
        </div>
      </section>

      {/* Comment choisir */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        backgroundColor: '#F5F5F5'
      }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-6)',
              textAlign: 'center'
            }}>
              💡 Comment choisir votre camping dans le {departementName}
            </h2>

            <div style={{
              display: 'grid',
              gap: 'var(--space-4)'
            }}>
              {choosingTips.map((tip, index) => (
                <div key={index} style={{
                  backgroundColor: 'var(--color-white)',
                  borderLeft: '4px solid #003580',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-5)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: 'var(--space-3)',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      backgroundColor: '#003580',
                      color: 'var(--color-white)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'var(--font-bold)',
                      fontSize: 'var(--text-base)',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <p style={{
                      fontSize: 'var(--text-base)',
                      lineHeight: '1.6',
                      color: 'var(--color-gray-700)',
                      margin: 0
                    }}>
                      {tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Liste complète des campings avec filtre */}
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
            Liste complète des campings
          </h2>

          <CampingFilterWrapper campings={campings} departement={departement} />
        </div>
      </section>
    </>
  )
}
