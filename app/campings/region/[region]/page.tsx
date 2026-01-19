import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllRegions, getCampingsByRegionSlug, getDepartementsInRegion } from '@/lib/groupings'
import { DEPARTEMENT_NAMES } from '@/lib/regions'
import { slugify } from '@/lib/utils'
import { generateRegionOverview, generateRegionTypologie, generateBestCampingsContent, generateChoosingTips } from '@/lib/contentGenerator'
import CampingFilterWrapper from './CampingFilterWrapper'

type Props = {
  params: { region: string }
}

export async function generateStaticParams() {
  const regions = getAllRegions()

  return regions.map((region) => ({
    region: slugify(region),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getCampingsByRegionSlug(params.region)

  if (!data) {
    return {
      title: 'Région non trouvée - Vie de Camping',
    }
  }

  const title = `Camping en ${data.region} : tous les campings classés`
  const description = `Retrouvez la liste complète des ${data.campings.length} campings classés en ${data.region} : emplacements, étoiles et localisation.`

  return {
    title,
    description,
  }
}

export default function RegionPage({ params }: Props) {
  const data = getCampingsByRegionSlug(params.region)

  if (!data) {
    notFound()
  }

  const { region, campings } = data
  const departements = getDepartementsInRegion(region)

  // Grouper les campings par département
  const campingsByDept: Record<string, typeof campings> = {}
  for (const camping of campings) {
    if (!campingsByDept[camping.departement]) {
      campingsByDept[camping.departement] = []
    }
    campingsByDept[camping.departement].push(camping)
  }

  // Compter les communes uniques dans la région
  const communesInRegion = new Set<string>()
  for (const camping of campings) {
    communesInRegion.add(camping.commune)
  }

  // Contenu généré automatiquement
  const overviewText = generateRegionOverview(region, campings, departements.length, communesInRegion.size)
  const typologieText = generateRegionTypologie(region, campings)

  // Stats pour affichage
  const stats = {
    total: campings.length,
    communes: communesInRegion.size,
    departements: departements.length,
    with5stars: campings.filter(c => c.classement?.includes('5 étoiles')).length,
    with4stars: campings.filter(c => c.classement?.includes('4 étoiles')).length,
    withPool: campings.filter(c => c.piscine).length,
  }

  // Images selon région
  const regionImages: Record<string, string> = {
    'Provence-Alpes-Côte d\'Azur': '/images/camping piscine.jpg',
    'Nouvelle-Aquitaine': '/images/camping.jpg',
    'Occitanie': '/images/camping tente.jpg',
    'Bretagne': '/images/camping caravane.jpg',
    'Auvergne-Rhône-Alpes': '/images/camping mobile home.jpg',
    'Pays de la Loire': '/images/camping.jpg',
    'Corse': '/images/camping piscine.jpg',
    'Normandie': '/images/camping caravane.jpg',
  }

  const backgroundImage = regionImages[region] || '/images/camping.jpg'

  // Top campings (5 étoiles ou 4 étoiles)
  const topCampings = campings
    .filter(c => c.classement?.includes('5 étoiles') || c.classement?.includes('4 étoiles'))
    .slice(0, 6)

  // Contenu "Meilleurs campings"
  const bestCampingsContent = generateBestCampingsContent(region, campings, 'region')
  const choosingTips = generateChoosingTips('region')

  return (
    <>
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#003580',
        backgroundImage: `linear-gradient(rgba(0, 53, 128, 0.85), rgba(0, 53, 128, 0.85)), url(${backgroundImage})`,
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
                opacity: 0.9,
                transition: 'opacity var(--transition-base)'
              }}
            >
              Accueil
            </Link>
            <span style={{ opacity: 0.5 }}>›</span>
            <Link
              href="/campings/regions/"
              style={{
                color: 'var(--color-white)',
                textDecoration: 'none',
                opacity: 0.9,
                transition: 'opacity var(--transition-base)'
              }}
            >
              Régions
            </Link>
            <span style={{ opacity: 0.5 }}>›</span>
            <span style={{ opacity: 0.9 }}>{region}</span>
          </nav>

          <div style={{ maxWidth: '900px' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-white)',
              marginBottom: 'var(--space-4)',
              lineHeight: '1.1'
            }}>
              Camping en {region}
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)'
            }}>
              Découvrez les {campings.length} campings classés de la région
            </p>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 'clamp(1rem, 3vw, 2rem)',
              maxWidth: '700px'
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
                  {stats.departements}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginTop: 'var(--space-1)'
                }}>
                  Départements
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
              Le camping dans la région
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
              Profil de l'offre régionale
            </h2>
            <div style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: '1.8',
              color: 'var(--color-gray-700)'
            }}>
              {typologieText}
            </div>

            {/* Quick stats */}
            <div style={{
              marginTop: 'var(--space-8)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-4)'
            }}>
              {stats.with5stars > 0 && (
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
                    {stats.with5stars}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)'
                  }}>
                    Campings 5 étoiles
                  </div>
                </div>
              )}

              {stats.with4stars > 0 && (
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
                    {stats.with4stars}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)'
                  }}>
                    Campings 4 étoiles
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
              Sélection de campings haut de gamme en {region}
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
                  {/* Badge recommandé */}
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
                    📍 {camping.commune} ({camping.departement})
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

      {/* Départements Section */}
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
            Départements de la région
          </h2>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-gray-600)',
            textAlign: 'center',
            marginBottom: 'var(--space-8)'
          }}>
            Explorez les campings par département
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            {departements.map((dept) => {
              const deptName = DEPARTEMENT_NAMES[dept] || dept
              const count = campingsByDept[dept]?.length || 0
              if (count === 0) return null

              return (
                <Link
                  key={dept}
                  href={`/campings/departement/${dept}/`}
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
                  <div>
                    <div style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-semibold)',
                      color: 'var(--color-gray-900)',
                      marginBottom: 'var(--space-1)'
                    }}>
                      {deptName}
                    </div>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-gray-600)'
                    }}>
                      {count} camping{count > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div style={{
                    backgroundColor: '#003580',
                    color: 'var(--color-white)',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-bold)'
                  }}>
                    {dept}
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
              marginBottom: 'var(--space-4)'
            }}>
              {bestCampingsContent.title}
            </h2>
            <p style={{
              fontSize: 'var(--text-lg)',
              lineHeight: '1.8',
              color: 'var(--color-gray-700)',
              marginBottom: 'var(--space-6)'
            }}>
              {bestCampingsContent.introduction}
            </p>

            {/* Critères */}
            {bestCampingsContent.criteria.length > 0 && (
              <div style={{
                backgroundColor: '#F5F5F5',
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-6)',
                border: '2px solid #003580'
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
                  display: 'grid',
                  gap: 'var(--space-3)'
                }}>
                  {bestCampingsContent.criteria.map((criterion, index) => (
                    <li key={index} style={{
                      fontSize: 'var(--text-base)',
                      lineHeight: '1.6',
                      color: 'var(--color-gray-700)',
                      paddingLeft: 'var(--space-4)',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#FEBB02',
                        fontWeight: 'var(--font-bold)'
                      }}>✓</span>
                      {criterion.replace(/\*\*/g, '')}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p style={{
              fontSize: 'var(--text-base)',
              lineHeight: '1.8',
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
              marginBottom: 'var(--space-4)'
            }}>
              💡 Comment choisir votre camping en {region}
            </h2>
            <div style={{
              display: 'grid',
              gap: 'var(--space-4)'
            }}>
              {choosingTips.map((tip, index) => (
                <div key={index} style={{
                  backgroundColor: 'var(--color-white)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  borderLeft: '4px solid #003580',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-3)'
                  }}>
                    <div style={{
                      backgroundColor: '#003580',
                      color: 'var(--color-white)',
                      width: '28px',
                      height: '28px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-bold)',
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

          <CampingFilterWrapper campings={campings} region={region} />
        </div>
      </section>
    </>
  )
}
