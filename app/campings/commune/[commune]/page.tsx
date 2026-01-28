import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCommunes, getCampingsByCommuneSlug, groupCampingsByDepartement } from '@/lib/groupings'
import { DEPARTEMENT_TO_REGION, DEPARTEMENT_NAMES } from '@/lib/regions'
import { slugify } from '@/lib/utils'
import { generateCommuneOffre, generateCommuneTypologie, generateCommuneContext, generateBestCampingsContent, generateChoosingTips } from '@/lib/contentGenerator'
import CampingFilterWrapper from './CampingFilterWrapper'

type Props = {
  params: { commune: string }
}

export async function generateStaticParams() {
  const communes = getAllCommunes()

  return communes.map((commune) => ({
    commune: slugify(commune),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getCampingsByCommuneSlug(params.commune)

  if (!data) {
    return {
      title: 'Commune non trouvée - Vie de Camping',
    }
  }

  const title = `Camping à ${data.commune} : campings classés et informations`
  const description = `Découvrez les ${data.campings.length} camping${data.campings.length > 1 ? 's' : ''} classé${data.campings.length > 1 ? 's' : ''} à ${data.commune} : localisation, classement et informations officielles.`

  return {
    title,
    description,
  }
}

export default function CommunePage({ params }: Props) {
  const data = getCampingsByCommuneSlug(params.commune)

  if (!data) {
    notFound()
  }

  const { commune, campings } = data

  // Récupérer le département et la région du premier camping
  const firstCamping = campings[0]
  const departement = firstCamping.departement
  const departementName = DEPARTEMENT_NAMES[departement] || departement
  const region = DEPARTEMENT_TO_REGION[departement]

  // Statistiques
  const classementStats: Record<string, number> = {}
  let totalEmplacements = 0
  let with5stars = 0
  let with4stars = 0
  let withPool = 0
  let withWifi = 0
  let withRestaurant = 0

  for (const camping of campings) {
    classementStats[camping.classement] = (classementStats[camping.classement] || 0) + 1
    if (camping.nombreEmplacements) {
      totalEmplacements += camping.nombreEmplacements
    }
    if (camping.classement?.includes('5 étoiles')) with5stars++
    if (camping.classement?.includes('4 étoiles')) with4stars++
    if (camping.piscine) withPool++
    if (camping.wifi) withWifi++
    if (camping.restaurant) withRestaurant++
  }

  // Contenu généré automatiquement
  const campingsByDept = groupCampingsByDepartement()
  const totalInDepartement = campingsByDept[departement]?.length || campings.length
  const offreText = generateCommuneOffre(commune, campings, totalInDepartement)
  const typologieText = generateCommuneTypologie(campings)
  const contextText = generateCommuneContext(commune, campings)
  const bestCampingsContent = generateBestCampingsContent(commune, campings, 'commune')
  const choosingTips = generateChoosingTips('commune')

  // Image dynamique (utilise la première image disponible)
  const getCampingImage = () => {
    const firstWithClass = campings.find(c => c.classement?.includes('5 étoiles') || c.classement?.includes('4 étoiles'))
    if (firstWithClass) return '/images/camping piscine.jpg'
    if (campings.some(c => c.mobilHomes)) return '/images/camping mobile home.jpg'
    if (campings.some(c => c.emplacementsCaravanes)) return '/images/camping caravane.jpg'
    return '/images/camping.jpg'
  }

  return (
    <>
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#003580',
        backgroundImage: `linear-gradient(rgba(0, 53, 128, 0.85), rgba(0, 53, 128, 0.85)), url(${getCampingImage()})`,
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
            <Link href="/" style={{ color: 'var(--color-white)', textDecoration: 'none', opacity: 0.9 }}>Accueil</Link>
            <span style={{ opacity: 0.5 }}>›</span>
            {region && (
              <>
                <Link href={`/campings/region/${slugify(region)}/`} style={{ color: 'var(--color-white)', textDecoration: 'none', opacity: 0.9 }}>{region}</Link>
                <span style={{ opacity: 0.5 }}>›</span>
              </>
            )}
            <Link href={`/campings/departement/${departement}/`} style={{ color: 'var(--color-white)', textDecoration: 'none', opacity: 0.9 }}>{departementName}</Link>
            <span style={{ opacity: 0.5 }}>›</span>
            <span style={{ opacity: 0.9 }}>{commune}</span>
          </nav>

          <div style={{ maxWidth: '900px' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-white)',
              marginBottom: 'var(--space-4)',
              lineHeight: '1.2'
            }}>
              Camping à {commune}
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-6)'
            }}>
              {campings.length} camping{campings.length > 1 ? 's' : ''} classé{campings.length > 1 ? 's' : ''} à {commune} - {departementName} ({departement})
            </p>

            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 'clamp(0.75rem, 2vw, 1rem)',
              maxWidth: '600px'
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-bold)',
                  color: '#FEBB02'
                }}>
                  {campings.length}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  Camping{campings.length > 1 ? 's' : ''}
                </div>
              </div>

              {totalEmplacements > 0 && (
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 'var(--font-bold)',
                    color: '#FEBB02'
                  }}>
                    {totalEmplacements}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    Emplacements
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Présentation */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
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
              Le camping à {commune}
            </h2>
            <p style={{
              fontSize: 'var(--text-lg)',
              lineHeight: '1.8',
              color: 'var(--color-gray-700)',
              marginBottom: 'var(--space-6)'
            }}>
              {offreText}
            </p>
          </div>
        </div>
      </section>

      {/* Profil de l'offre */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
        backgroundColor: '#F5F5F5'
      }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-6)'
            }}>
              Profil de l'offre de camping
            </h2>

            <p style={{
              fontSize: 'var(--text-base)',
              lineHeight: '1.8',
              color: 'var(--color-gray-700)',
              marginBottom: 'var(--space-6)'
            }}>
              {typologieText}
            </p>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'clamp(1rem, 2vw, 1.5rem)'
            }}>
              {with5stars > 0 && (
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
                    {with5stars}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)'
                  }}>
                    Camping{with5stars > 1 ? 's' : ''} 5 étoiles
                  </div>
                </div>
              )}

              {with4stars > 0 && (
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
                    {with4stars}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)'
                  }}>
                    Camping{with4stars > 1 ? 's' : ''} 4 étoiles
                  </div>
                </div>
              )}

              {withPool > 0 && (
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
                    🏊 {withPool}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)'
                  }}>
                    Avec piscine
                  </div>
                </div>
              )}

              {withWifi > 0 && (
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
                    📶 {withWifi}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)'
                  }}>
                    Avec WiFi
                  </div>
                </div>
              )}

              {withRestaurant > 0 && (
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
                    🍽️ {withRestaurant}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)'
                  }}>
                    Avec restauration
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Meilleurs campings */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
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
        padding: 'clamp(2rem, 4vw, 3rem) 0',
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
              💡 Comment choisir votre camping à {commune}
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

      {/* Liste des campings */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
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
            Liste des campings à {commune}
          </h2>

          <CampingFilterWrapper campings={campings} commune={commune} />
        </div>
      </section>

      {/* À propos de la commune */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
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
              À propos de {commune}
            </h2>
            <p style={{
              fontSize: 'var(--text-base)',
              lineHeight: '1.8',
              color: 'var(--color-gray-700)',
              marginBottom: 'var(--space-4)'
            }}>
              {contextText}
            </p>
            <p style={{
              fontSize: 'var(--text-base)',
              lineHeight: '1.8',
              color: 'var(--color-gray-700)'
            }}>
              {commune} est située dans le département {departementName} ({departement})
              {region && ` en région ${region}`}. Les {campings.length} camping{campings.length > 1 ? 's' : ''} de la commune {campings.length > 1 ? 'sont classés' : 'est classé'}
              {' '}selon le référentiel Atout France.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Navigation */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
        backgroundColor: 'var(--color-white)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-3)'
            }}>
              Explorer d'autres destinations
            </h2>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-gray-600)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-6)'
            }}>
              Découvrez tous les campings du département ou explorez d'autres communes.
            </p>
            <div style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href={`/campings/departement/${departement}/`}
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
                Voir tout le {departementName}
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
                Toutes les communes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
