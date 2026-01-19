import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { loadCampings, loadCampingBySlug } from '@/lib/loadCampings'
import { DEPARTEMENT_TO_REGION, DEPARTEMENT_NAMES } from '@/lib/regions'
import { slugify } from '@/lib/utils'
import { generateCampingPresentation, generateCampingKeyPoints, generateCampingAdvice, generateCampingFAQ, generateSuggestedActivities } from '@/lib/contentGenerator'
import {
  generateEquipementsList,
  generateHebergementsList,
  generateEnvironnementText,
  generateInfosPratiques
} from '@/lib/equipementsGenerator'
import {
  genererProfilTouristique,
  genererDescriptionProfil,
  genererPointsFortsDeduits,
  determinerSejourRecommande,
  genererComparatifLocal
} from '@/lib/typologieTouristique'
import { groupCampingsByCommune } from '@/lib/groupings'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const campings = loadCampings()

  return campings.map((camping) => ({
    slug: camping.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const camping = loadCampingBySlug(params.slug)

  if (!camping) {
    return {
      title: 'Camping non trouvé - Vie de Camping',
    }
  }

  const title = `${camping.nom} - ${camping.commune} (${camping.departement}) - Vie de Camping`
  const description = `Découvrez ${camping.nom}, camping ${camping.classement} situé à ${camping.commune} (${camping.codePostal}). ${camping.nombreEmplacements ? `${camping.nombreEmplacements} emplacements disponibles.` : ''}`

  return {
    title,
    description,
  }
}

export default function CampingPage({ params }: Props) {
  const camping = loadCampingBySlug(params.slug)

  if (!camping) {
    notFound()
  }

  const departementName = DEPARTEMENT_NAMES[camping.departement] || camping.departement
  const region = DEPARTEMENT_TO_REGION[camping.departement]

  // Contenu généré automatiquement
  const campingsByCommune = groupCampingsByCommune()
  const campingsInCommune = campingsByCommune[camping.commune]?.length || 1
  const presentation = generateCampingPresentation(camping)
  const keyPoints = generateCampingKeyPoints(camping, campingsInCommune)

  // Nouvelles données enrichies
  const equipements = generateEquipementsList(camping)
  const hebergements = generateHebergementsList(camping)
  const environnementText = generateEnvironnementText(camping)
  const infosPratiques = generateInfosPratiques(camping)

  // Typologie touristique déduite
  const profilTouristique = genererProfilTouristique(camping)
  const descriptionProfil = genererDescriptionProfil(profilTouristique, camping)
  const pointsFortsDeduits = genererPointsFortsDeduits(profilTouristique, camping)
  const sejoursRecommandes = determinerSejourRecommande(profilTouristique, camping)
  const comparatifLocal = genererComparatifLocal(camping, campingsByCommune[camping.commune] || [camping])

  // Nouveau contenu enrichi
  const campingAdvice = generateCampingAdvice(camping)
  const campingFAQ = generateCampingFAQ(camping)
  const suggestedActivities = generateSuggestedActivities(camping)

  // Image basée sur le classement
  const getCampingImage = () => {
    if (camping.classement?.includes('Aire naturelle')) return '/images/camping tente.jpg'
    if (camping.classement?.includes('5 étoiles')) return '/images/camping piscine.jpg'
    if (camping.classement?.includes('4 étoiles')) return '/images/camping piscine.jpg'
    if (camping.mobilHomes) return '/images/camping mobile home.jpg'
    if (camping.emplacementsCaravanes) return '/images/camping caravane.jpg'
    return '/images/camping.jpg'
  }

  const campingImage = getCampingImage()

  // Déterminer si c'est un camping premium (4-5 étoiles)
  const isPremium = camping.classement?.includes('5 étoiles') || camping.classement?.includes('4 étoiles')

  return (
    <>
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#003580',
        backgroundImage: `linear-gradient(rgba(0, 53, 128, 0.7), rgba(0, 53, 128, 0.7)), url(${campingImage})`,
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
            <Link href="/" style={{ color: 'var(--color-white)', textDecoration: 'none', opacity: 0.9 }}>
              Accueil
            </Link>
            <span style={{ opacity: 0.5 }}>›</span>
            {region && (
              <>
                <Link href={`/campings/region/${slugify(region)}/`} style={{ color: 'var(--color-white)', textDecoration: 'none', opacity: 0.9 }}>
                  {region}
                </Link>
                <span style={{ opacity: 0.5 }}>›</span>
              </>
            )}
            <Link href={`/campings/departement/${camping.departement}/`} style={{ color: 'var(--color-white)', textDecoration: 'none', opacity: 0.9 }}>
              {departementName}
            </Link>
            <span style={{ opacity: 0.5 }}>›</span>
            <Link href={`/campings/commune/${slugify(camping.commune)}/`} style={{ color: 'var(--color-white)', textDecoration: 'none', opacity: 0.9 }}>
              {camping.commune}
            </Link>
          </nav>

          <div style={{ maxWidth: '1000px' }}>
            {/* Badge premium si applicable */}
            {isPremium && (
              <div style={{
                display: 'inline-block',
                backgroundColor: '#FEBB02',
                color: '#003580',
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
                marginBottom: 'var(--space-4)',
                textTransform: 'uppercase'
              }}>
                ⭐ Premium
              </div>
            )}

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-white)',
              marginBottom: 'var(--space-4)',
              lineHeight: '1.1'
            }}>
              {camping.nom}
            </h1>

            {/* Badges classement et catégorie */}
            <div style={{
              display: 'flex',
              gap: 'var(--space-3)',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-5)',
              alignItems: 'center'
            }}>
              {camping.classement && (
                <span style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'var(--color-white)',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-semibold)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}>
                  {camping.classement}
                </span>
              )}
              {camping.categorie && (
                <span style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'var(--color-white)',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-semibold)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}>
                  {camping.categorie}
                </span>
              )}
            </div>

            {/* Localisation */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              marginBottom: 'var(--space-6)'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{camping.commune}, {departementName} ({camping.departement})</span>
            </div>

            {/* Stats rapides */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 'clamp(1rem, 3vw, 2rem)',
              maxWidth: '800px'
            }}>
              {camping.nombreEmplacements && (
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 'var(--font-bold)',
                    color: '#FEBB02'
                  }}>
                    {camping.nombreEmplacements}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginTop: 'var(--space-1)'
                  }}>
                    Emplacements
                  </div>
                </div>
              )}

              {camping.capacite && (
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 'var(--font-bold)',
                    color: '#FEBB02'
                  }}>
                    {camping.capacite}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginTop: 'var(--space-1)'
                  }}>
                    Personnes
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Présentation */}
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
              Présentation du camping
            </h2>
            <div style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: '1.8',
              color: 'var(--color-gray-700)'
            }}>
              {presentation}
            </div>
          </div>
        </div>
      </section>

      {/* Profil touristique */}
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
              Profil du camping
            </h2>
            <div style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: '1.8',
              color: 'var(--color-gray-700)',
              marginBottom: 'var(--space-5)'
            }}>
              {descriptionProfil}
            </div>

            {comparatifLocal && (
              <div style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-lg)',
                borderLeft: '4px solid #003580',
                fontStyle: 'italic',
                color: 'var(--color-gray-600)'
              }}>
                {comparatifLocal}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Types de séjours adaptés */}
      {sejoursRecommandes.length > 0 && (
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
                Types de séjours adaptés
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--space-4)'
              }}>
                {sejoursRecommandes.map((sejour, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: 'var(--color-white)',
                      border: '1px solid var(--color-gray-200)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-5)',
                      textAlign: 'center',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                    }}
                  >
                    <div style={{
                      fontSize: 'var(--text-3xl)',
                      marginBottom: 'var(--space-3)'
                    }}>
                      {index === 0 ? '👨‍👩‍👧‍👦' : index === 1 ? '🌳' : index === 2 ? '🏕️' : '✨'}
                    </div>
                    <div style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-gray-700)',
                      lineHeight: '1.6'
                    }}>
                      {sejour}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Équipements et services */}
      {equipements.length > 0 && (
        <section style={{
          padding: 'clamp(2rem, 5vw, 3.5rem) 0',
          backgroundColor: '#F5F5F5'
        }}>
          <div className="container">
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-8)',
              textAlign: 'center'
            }}>
              Équipements et services
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: 'var(--space-4)',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {equipements.map((equipement, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'var(--color-white)',
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    border: '1px solid var(--color-gray-200)'
                  }}
                >
                  <div style={{
                    fontSize: 'var(--text-xl)',
                    flexShrink: 0
                  }}>
                    {equipement.includes('Piscine') ? '🏊' :
                     equipement.includes('Restauration') ? '🍽️' :
                     equipement.includes('Wifi') ? '📶' :
                     equipement.includes('Animaux') ? '🐾' :
                     equipement.includes('Supérette') ? '🛒' :
                     equipement.includes('Laverie') ? '🧺' :
                     equipement.includes('Aire de jeux') ? '🎮' :
                     '✓'}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-700)',
                    lineHeight: '1.4'
                  }}>
                    {equipement}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Types d'hébergement */}
      {hebergements.length > 0 && (
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
                Types d'hébergement disponibles
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-4)'
              }}>
                {hebergements.map((hebergement, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#F5F5F5',
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-lg)',
                      textAlign: 'center',
                      border: '1px solid var(--color-gray-200)'
                    }}
                  >
                    <div style={{
                      fontSize: 'var(--text-2xl)',
                      marginBottom: 'var(--space-2)'
                    }}>
                      {hebergement.includes('Mobil') ? '🏠' :
                       hebergement.includes('Tente') ? '⛺' :
                       hebergement.includes('Caravane') ? '🚐' :
                       hebergement.includes('Camping-car') ? '🚙' :
                       hebergement.includes('Chalet') ? '🏡' :
                       '🏕️'}
                    </div>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-gray-700)'
                    }}>
                      {hebergement}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Informations générales */}
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
              marginBottom: 'var(--space-6)'
            }}>
              Informations générales
            </h2>

            <div style={{
              backgroundColor: 'var(--color-white)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-gray-200)'
            }}>
              <dl style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--space-5)',
                fontSize: 'var(--text-base)'
              }}>
                <div>
                  <dt style={{
                    fontWeight: 'var(--font-semibold)',
                    color: 'var(--color-gray-900)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    📍 Localisation
                  </dt>
                  <dd style={{ color: 'var(--color-gray-700)' }}>
                    <Link href={`/campings/commune/${slugify(camping.commune)}/`} style={{ color: '#003580', textDecoration: 'none' }}>
                      {camping.commune}
                    </Link>
                    <br />
                    {camping.codePostal}
                    <br />
                    <Link href={`/campings/departement/${camping.departement}/`} style={{ color: '#003580', textDecoration: 'none' }}>
                      {departementName} ({camping.departement})
                    </Link>
                  </dd>
                </div>

                <div>
                  <dt style={{
                    fontWeight: 'var(--font-semibold)',
                    color: 'var(--color-gray-900)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    🏕️ Capacité
                  </dt>
                  <dd style={{ color: 'var(--color-gray-700)' }}>
                    {camping.classement}
                    {camping.nombreEmplacements && (
                      <>
                        <br />
                        {camping.nombreEmplacements} emplacements
                      </>
                    )}
                    {camping.capacite && (
                      <>
                        <br />
                        {camping.capacite} personnes
                      </>
                    )}
                  </dd>
                </div>

                <div>
                  <dt style={{
                    fontWeight: 'var(--font-semibold)',
                    color: 'var(--color-gray-900)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    📋 Adresse
                  </dt>
                  <dd style={{ color: 'var(--color-gray-700)' }}>
                    {camping.adresse}
                  </dd>
                </div>

                <div>
                  <dt style={{
                    fontWeight: 'var(--font-semibold)',
                    color: 'var(--color-gray-900)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    ✅ Date de classement
                  </dt>
                  <dd style={{ color: 'var(--color-gray-700)' }}>
                    {camping.dateClassement}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      {(camping.telephone || camping.email || camping.siteWeb) && (
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
                Contact
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                alignItems: 'center'
              }}>
                {camping.telephone && (
                  <a
                    href={`tel:${camping.telephone}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-4) var(--space-6)',
                      backgroundColor: '#003580',
                      color: 'var(--color-white)',
                      textDecoration: 'none',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-semibold)',
                      transition: 'all var(--transition-base)',
                      boxShadow: '0 2px 8px rgba(0,53,128,0.2)'
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    {camping.telephone}
                  </a>
                )}

                {camping.siteWeb && (
                  <a
                    href={camping.siteWeb}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-4) var(--space-6)',
                      backgroundColor: '#FEBB02',
                      color: '#003580',
                      textDecoration: 'none',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-semibold)',
                      transition: 'all var(--transition-base)',
                      boxShadow: '0 2px 8px rgba(254,187,2,0.2)'
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    Visiter le site officiel
                  </a>
                )}

                {camping.email && (
                  <a
                    href={`mailto:${camping.email}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      color: '#003580',
                      textDecoration: 'none',
                      fontSize: 'var(--text-base)',
                      transition: 'color var(--transition-base)'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    {camping.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Points forts et caractéristiques */}
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
              marginBottom: 'var(--space-6)'
            }}>
              Points forts
            </h2>

            <div style={{
              display: 'grid',
              gap: 'var(--space-3)'
            }}>
              {keyPoints.map((point, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'var(--color-white)',
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-3)',
                    border: '1px solid var(--color-gray-200)'
                  }}
                >
                  <div style={{
                    color: '#003580',
                    fontSize: 'var(--text-xl)',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    ✓
                  </div>
                  <div style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--color-gray-700)',
                    lineHeight: '1.6'
                  }}>
                    {point}
                  </div>
                </div>
              ))}
            </div>

            {pointsFortsDeduits.length > 0 && (
              <>
                <h3 style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--color-gray-900)',
                  marginTop: 'var(--space-8)',
                  marginBottom: 'var(--space-4)'
                }}>
                  Caractéristiques du séjour
                </h3>

                <div style={{
                  display: 'grid',
                  gap: 'var(--space-3)'
                }}>
                  {pointsFortsDeduits.map((point, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: 'var(--color-white)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--space-3)',
                        border: '1px solid var(--color-gray-200)'
                      }}
                    >
                      <div style={{
                        color: '#FEBB02',
                        fontSize: 'var(--text-xl)',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        •
                      </div>
                      <div style={{
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-gray-700)',
                        lineHeight: '1.6'
                      }}>
                        {point}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Conseils pratiques */}
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
              marginBottom: 'var(--space-8)',
              textAlign: 'center'
            }}>
              {campingAdvice.title}
            </h2>

            <div style={{
              display: 'grid',
              gap: 'var(--space-6)'
            }}>
              {campingAdvice.sections.map((section, index) => (
                <div key={index} style={{
                  backgroundColor: '#F8F9FA',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)',
                  borderLeft: '4px solid #003580'
                }}>
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--color-gray-900)',
                    marginBottom: 'var(--space-3)'
                  }}>
                    {section.title}
                  </h3>
                  <p style={{
                    fontSize: 'var(--text-base)',
                    lineHeight: '1.7',
                    color: 'var(--color-gray-700)',
                    margin: 0
                  }}>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activités suggérées */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        backgroundColor: '#F5F5F5'
      }}>
        <div className="container">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-8)',
              textAlign: 'center'
            }}>
              {suggestedActivities.title}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-5)'
            }}>
              {suggestedActivities.activities.map((activity, index) => (
                <div key={index} style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-5)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all var(--transition-base)'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    marginBottom: 'var(--space-3)',
                    textAlign: 'center'
                  }}>
                    {activity.icon}
                  </div>
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--color-gray-900)',
                    marginBottom: 'var(--space-2)',
                    textAlign: 'center'
                  }}>
                    {activity.title}
                  </h3>
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    lineHeight: '1.6',
                    color: 'var(--color-gray-600)',
                    margin: 0,
                    textAlign: 'center'
                  }}>
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {campingFAQ.length > 0 && (
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
                marginBottom: 'var(--space-8)',
                textAlign: 'center'
              }}>
                ❓ Questions fréquentes
              </h2>

              <div style={{
                display: 'grid',
                gap: 'var(--space-5)'
              }}>
                {campingFAQ.map((item, index) => (
                  <div key={index} style={{
                    backgroundColor: '#F8F9FA',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-6)',
                    border: '1px solid var(--color-gray-200)'
                  }}>
                    <h3 style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-bold)',
                      color: '#003580',
                      marginBottom: 'var(--space-3)'
                    }}>
                      {item.question}
                    </h3>
                    <p style={{
                      fontSize: 'var(--text-base)',
                      lineHeight: '1.7',
                      color: 'var(--color-gray-700)',
                      margin: 0
                    }}>
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* À propos de la commune */}
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
              À propos de {camping.commune}
            </h2>
            <div style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: '1.8',
              color: 'var(--color-gray-700)'
            }}>
              Le camping {camping.nom} est situé à{' '}
              <Link href={`/campings/commune/${slugify(camping.commune)}/`} style={{ color: '#003580', textDecoration: 'underline', fontWeight: 'var(--font-semibold)' }}>
                {camping.commune}
              </Link>, dans le département{' '}
              <Link href={`/campings/departement/${camping.departement}/`} style={{ color: '#003580', textDecoration: 'underline', fontWeight: 'var(--font-semibold)' }}>
                {departementName}
              </Link>
              {region && (
                <>
                  {' '}en région{' '}
                  <Link href={`/campings/region/${slugify(region)}/`} style={{ color: '#003580', textDecoration: 'underline', fontWeight: 'var(--font-semibold)' }}>
                    {region}
                  </Link>
                </>
              )}.
              Cette destination offre un cadre idéal pour vos vacances en camping en France.
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
