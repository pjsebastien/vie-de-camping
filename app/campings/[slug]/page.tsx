import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { loadCampings, loadCampingBySlug } from '@/lib/loadCampings'
import { DEPARTEMENT_TO_REGION, DEPARTEMENT_NAMES } from '@/lib/regions'
import { slugify } from '@/lib/utils'
import { generateCampingPresentation, generateCampingKeyPoints, generateCampingAdvice, generateCampingFAQ } from '@/lib/contentGenerator'
import { generateEquipementsList, generateHebergementsList } from '@/lib/equipementsGenerator'
import { genererProfilTouristique, genererDescriptionProfil, determinerSejourRecommande } from '@/lib/typologieTouristique'
import { groupCampingsByCommune, groupCampingsByDepartement } from '@/lib/groupings'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const campings = loadCampings()
  return campings.map((camping) => ({ slug: camping.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const camping = loadCampingBySlug(params.slug)
  if (!camping) return { title: 'Camping non trouvé' }

  const departementName = DEPARTEMENT_NAMES[camping.departement] || camping.departement
  const region = DEPARTEMENT_TO_REGION[camping.departement]

  return {
    title: `${camping.nom} | Camping ${camping.classement || ''} ${camping.commune} (${camping.departement})`,
    description: `${camping.nom} : camping ${camping.classement || ''} situé à ${camping.commune}. ${camping.nombreEmplacements ? camping.nombreEmplacements + ' emplacements.' : ''} Réservez votre séjour en ${region || departementName}.`,
    keywords: [camping.nom, `camping ${camping.commune}`, `camping ${departementName}`, `${camping.nom} avis`],
  }
}

export default function CampingPage({ params }: Props) {
  const camping = loadCampingBySlug(params.slug)
  if (!camping) notFound()

  const departementName = DEPARTEMENT_NAMES[camping.departement] || camping.departement
  const region = DEPARTEMENT_TO_REGION[camping.departement]

  // Campings proches
  const campingsByCommune = groupCampingsByCommune()
  const campingsByDepartement = groupCampingsByDepartement()
  const campingsInCommune = campingsByCommune[camping.commune]?.filter(c => c.slug !== camping.slug) || []
  const campingsInDepartement = campingsByDepartement[camping.departement]?.filter(c => c.slug !== camping.slug && c.commune !== camping.commune).slice(0, 6) || []

  // Contenu généré
  const presentation = generateCampingPresentation(camping)
  const keyPoints = generateCampingKeyPoints(camping, campingsInCommune.length + 1)
  const equipements = generateEquipementsList(camping)
  const hebergements = generateHebergementsList(camping)
  const profilTouristique = genererProfilTouristique(camping)
  const descriptionProfil = genererDescriptionProfil(profilTouristique, camping)
  const sejoursRecommandes = determinerSejourRecommande(profilTouristique, camping)
  const campingAdvice = generateCampingAdvice(camping)
  const campingFAQ = generateCampingFAQ(camping)

  const getCampingImage = () => {
    if (camping.classement?.includes('5 étoiles') || camping.classement?.includes('4 étoiles')) return '/images/camping piscine.jpg'
    if (camping.mobilHomes) return '/images/camping mobile home.jpg'
    return '/images/camping.jpg'
  }

  const isPremium = camping.classement?.includes('5 étoiles') || camping.classement?.includes('4 étoiles')
  const stars = camping.classement?.match(/(\d+)\s*étoile/)?.[1]
  const hasCoordinates = camping.latitude && camping.longitude

  return (
    <main>
      {/* Hero */}
      <section style={{
        background: `linear-gradient(rgba(0,53,128,0.88), rgba(0,53,128,0.92)), url(${getCampingImage()}) center/cover`,
        padding: 'var(--space-6) 0',
        color: 'white'
      }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-xs)', opacity: 0.85 }}>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Accueil</Link>
            <span style={{ margin: '0 6px' }}>/</span>
            {region && (<><Link href={`/campings/region/${slugify(region)}/`} style={{ color: 'white', textDecoration: 'none' }}>{region}</Link><span style={{ margin: '0 6px' }}>/</span></>)}
            <Link href={`/campings/departement/${camping.departement}/`} style={{ color: 'white', textDecoration: 'none' }}>{departementName}</Link>
            <span style={{ margin: '0 6px' }}>/</span>
            <Link href={`/campings/commune/${slugify(camping.commune)}/`} style={{ color: 'white', textDecoration: 'none' }}>{camping.commune}</Link>
          </nav>

          {/* Badges */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
            {isPremium && <span style={{ background: '#FEBB02', color: '#003580', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>Premium</span>}
            {camping.classement && <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500 }}>{camping.classement}</span>}
          </div>

          {/* Titre */}
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 'var(--space-2)', lineHeight: 1.15, color: 'white' }}>
            {camping.nom}
          </h1>

          {/* Localisation */}
          <p style={{ fontSize: 'var(--text-base)', opacity: 0.95, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-5)', color: 'white' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {camping.commune}, {departementName} ({camping.departement})
          </p>

          {/* Info boxes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-3)', maxWidth: '700px', marginBottom: 'var(--space-5)' }}>
            {camping.nombreEmplacements && (
              <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: 'var(--space-3)', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: '#FEBB02' }}>{camping.nombreEmplacements}</div>
                <div style={{ fontSize: 'var(--text-xs)', opacity: 0.9, color: 'white' }}>Emplacements</div>
              </div>
            )}
            {stars && (
              <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: 'var(--space-3)', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: '#FEBB02' }}>{'★'.repeat(parseInt(stars))}</div>
                <div style={{ fontSize: 'var(--text-xs)', opacity: 0.9, color: 'white' }}>Classement</div>
              </div>
            )}
            {camping.capacite && (
              <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: 'var(--space-3)', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: '#FEBB02' }}>{camping.capacite}</div>
                <div style={{ fontSize: 'var(--text-xs)', opacity: 0.9, color: 'white' }}>Personnes max</div>
              </div>
            )}
            {camping.piscine && (
              <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: 'var(--space-3)', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: 'var(--text-2xl)' }}>🏊</div>
                <div style={{ fontSize: 'var(--text-xs)', opacity: 0.9, color: 'white' }}>Piscine</div>
              </div>
            )}
            {camping.animauxAcceptes && (
              <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: 'var(--space-3)', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: 'var(--text-2xl)' }}>🐾</div>
                <div style={{ fontSize: 'var(--text-xs)', opacity: 0.9, color: 'white' }}>Animaux OK</div>
              </div>
            )}
          </div>

          {/* Boutons contact */}
          {(camping.telephone || camping.siteWeb) && (
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              {camping.telephone && (
                <a href={`tel:${camping.telephone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FEBB02', color: '#003580', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Appeler maintenant
                </a>
              )}
              {camping.siteWeb && (
                <a href={camping.siteWeb} target="_blank" rel="nofollow noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: 'var(--text-sm)', border: '1px solid rgba(255,255,255,0.3)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  Voir le site officiel
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Contenu principal */}
      <div className="container" style={{ padding: 'var(--space-6) var(--space-4)' }}>
        <div className="camping-layout">

          {/* Colonne principale */}
          <div>
            {/* Présentation SEO */}
            <section style={{ marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--color-gray-900)' }}>
                Bienvenue au {camping.nom}
              </h2>
              <p style={{ lineHeight: 1.7, color: 'var(--color-gray-700)', marginBottom: 'var(--space-3)', fontSize: 'var(--text-base)' }}>
                {presentation}
              </p>
              <p style={{ lineHeight: 1.7, color: 'var(--color-gray-700)', fontSize: 'var(--text-base)' }}>
                Le <strong>{camping.nom}</strong> est situé à <strong>{camping.commune}</strong> dans le <strong>{departementName}</strong>
                {region && <> en <strong>{region}</strong></>}.
                {camping.classement && <> Ce camping <strong>{camping.classement}</strong></>}
                {camping.nombreEmplacements && <> dispose de <strong>{camping.nombreEmplacements} emplacements</strong></>} pour des vacances en plein air réussies.
              </p>
            </section>

            {/* Points forts */}
            {keyPoints.length > 0 && (
              <section style={{ marginBottom: 'var(--space-6)' }}>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--color-gray-900)' }}>
                  Pourquoi choisir le {camping.nom} ?
                </h2>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {keyPoints.slice(0, 5).map((point, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                      <span style={{ color: '#16a34a', fontWeight: 700, fontSize: 'var(--text-base)' }}>✓</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)', lineHeight: 1.5 }}>{point}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Équipements */}
            {equipements.length > 0 && (
              <section style={{ marginBottom: 'var(--space-6)' }}>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--color-gray-900)' }}>
                  Équipements au {camping.nom}
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {equipements.map((eq, i) => (
                    <span key={i} style={{ padding: '6px 14px', background: '#e0f2fe', color: '#0369a1', borderRadius: '20px', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                      {eq.includes('Piscine') ? '🏊 ' : eq.includes('Restaurant') ? '🍽️ ' : eq.includes('Wifi') ? '📶 ' : eq.includes('Animaux') ? '🐾 ' : eq.includes('Laverie') ? '🧺 ' : eq.includes('Jeux') ? '🎮 ' : '• '}
                      {eq}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Hébergements */}
            {hebergements.length > 0 && (
              <section style={{ marginBottom: 'var(--space-6)' }}>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--color-gray-900)' }}>
                  Hébergements disponibles
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
                  {hebergements.map((h, i) => (
                    <div key={i} style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>
                        {h.includes('Mobil') ? '🏠' : h.includes('Tente') ? '⛺' : h.includes('Caravane') ? '🚐' : h.includes('Chalet') ? '🏡' : h.includes('Camping-car') ? '🚙' : '🏕️'}
                      </div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)' }}>{h}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Profil & Séjours */}
            <section style={{ marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--color-gray-900)' }}>
                Profil du {camping.nom}
              </h2>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, color: 'var(--color-gray-700)', marginBottom: 'var(--space-3)' }}>
                {descriptionProfil}
              </p>
              {sejoursRecommandes.length > 0 && (
                <div style={{ display: 'grid', gap: '8px' }}>
                  {sejoursRecommandes.slice(0, 3).map((s, i) => (
                    <div key={i} style={{ padding: '12px 16px', background: '#fffbeb', borderLeft: '4px solid #FEBB02', borderRadius: '0 8px 8px 0', fontSize: 'var(--text-sm)', color: 'var(--color-gray-700)' }}>
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Conseils */}
            <section style={{ marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--color-gray-900)' }}>
                {campingAdvice.title}
              </h2>
              <div style={{ display: 'grid', gap: '12px' }}>
                {campingAdvice.sections.slice(0, 3).map((s, i) => (
                  <div key={i} style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: '6px', color: '#003580' }}>{s.title}</h3>
                    <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--color-gray-600)', margin: 0 }}>{s.content}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            {campingFAQ.length > 0 && (
              <section>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--color-gray-900)' }}>
                  Questions fréquentes sur {camping.nom}
                </h2>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {campingFAQ.slice(0, 4).map((faq, i) => (
                    <details key={i} style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <summary style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: '#003580', cursor: 'pointer' }}>{faq.question}</summary>
                      <p style={{ marginTop: '10px', fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--color-gray-600)' }}>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="camping-sidebar">
            {/* Carte */}
            {hasCoordinates && (
              <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', marginBottom: 'var(--space-4)', border: '1px solid #e5e7eb' }}>
                <div style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-gray-900)', margin: 0 }}>📍 Localisation</h3>
                </div>
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${camping.longitude! - 0.01}%2C${camping.latitude! - 0.01}%2C${camping.longitude! + 0.01}%2C${camping.latitude! + 0.01}&layer=mapnik&marker=${camping.latitude}%2C${camping.longitude}`}
                  style={{ width: '100%', height: '200px', border: 0 }}
                  loading="lazy"
                  title={`Carte ${camping.nom}`}
                />
                <div style={{ padding: '10px 14px', background: '#f8fafc' }}>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${camping.latitude},${camping.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px', background: '#003580', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: 'var(--text-xs)', fontWeight: 600 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
                    Itinéraire Google Maps
                  </a>
                </div>
              </div>
            )}

            {/* Infos pratiques */}
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: 'var(--space-4)', marginBottom: 'var(--space-4)', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--color-gray-900)' }}>Informations pratiques</h3>
              <dl style={{ fontSize: 'var(--text-sm)', display: 'grid', gap: '12px' }}>
                <div>
                  <dt style={{ fontWeight: 600, color: 'var(--color-gray-800)', marginBottom: '2px' }}>📍 Adresse</dt>
                  <dd style={{ color: 'var(--color-gray-600)', margin: 0 }}>{camping.adresse}<br/>{camping.codePostal} {camping.commune}</dd>
                </div>
                <div>
                  <dt style={{ fontWeight: 600, color: 'var(--color-gray-800)', marginBottom: '2px' }}>🏕️ Classement</dt>
                  <dd style={{ color: 'var(--color-gray-600)', margin: 0 }}>{camping.classement || 'Non classé'}</dd>
                </div>
                {camping.dateClassement && (
                  <div>
                    <dt style={{ fontWeight: 600, color: 'var(--color-gray-800)', marginBottom: '2px' }}>📅 Depuis</dt>
                    <dd style={{ color: 'var(--color-gray-600)', margin: 0 }}>{camping.dateClassement}</dd>
                  </div>
                )}
                {camping.email && (
                  <div>
                    <dt style={{ fontWeight: 600, color: 'var(--color-gray-800)', marginBottom: '2px' }}>✉️ Email</dt>
                    <dd style={{ margin: 0 }}><a href={`mailto:${camping.email}`} style={{ color: '#003580', fontSize: 'var(--text-xs)', wordBreak: 'break-all' }}>{camping.email}</a></dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Maillage interne */}
            <div style={{ background: '#003580', borderRadius: '12px', padding: 'var(--space-4)', marginBottom: 'var(--space-4)', color: 'white' }}>
              <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>Explorer la région</h3>
              <div style={{ display: 'grid', gap: '8px' }}>
                <Link href={`/campings/commune/${slugify(camping.commune)}/`} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', textDecoration: 'none', fontSize: 'var(--text-sm)' }}>
                  🏘️ Campings à {camping.commune}
                </Link>
                <Link href={`/campings/departement/${camping.departement}/`} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', textDecoration: 'none', fontSize: 'var(--text-sm)' }}>
                  🗺️ Campings en {departementName}
                </Link>
                {region && (
                  <Link href={`/campings/region/${slugify(region)}/`} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', textDecoration: 'none', fontSize: 'var(--text-sm)' }}>
                    🌍 Campings en {region}
                  </Link>
                )}
              </div>
            </div>

            {/* Campings même commune */}
            {campingsInCommune.length > 0 && (
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: 'var(--space-4)', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--color-gray-900)' }}>
                  Autres campings à {camping.commune}
                </h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {campingsInCommune.slice(0, 4).map((c) => (
                    <Link key={c.slug} href={`/campings/${c.slug}/`} style={{ display: 'block', padding: '10px 12px', background: 'white', borderRadius: '8px', textDecoration: 'none', border: '1px solid #e5e7eb' }}>
                      <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: '#003580', marginBottom: '2px' }}>{c.nom}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{c.classement}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Campings département */}
      {campingsInDepartement.length > 0 && (
        <section style={{ background: '#f8fafc', padding: 'var(--space-6) 0' }}>
          <div className="container">
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--color-gray-900)' }}>
              Autres campings en {departementName}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-3)' }}>
              {campingsInDepartement.map((c) => (
                <Link key={c.slug} href={`/campings/${c.slug}/`} style={{ display: 'block', padding: '16px', background: 'white', borderRadius: '10px', textDecoration: 'none', border: '1px solid #e5e7eb', transition: 'box-shadow 0.2s' }}>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: '#003580', marginBottom: '4px' }}>{c.nom}</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: '2px' }}>{c.commune}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{c.classement}</div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
              <Link href={`/campings/departement/${camping.departement}/`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#003580', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                Voir tous les campings en {departementName} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Campground",
        "name": camping.nom,
        "address": { "@type": "PostalAddress", "streetAddress": camping.adresse, "addressLocality": camping.commune, "postalCode": camping.codePostal, "addressRegion": departementName, "addressCountry": "FR" },
        ...(camping.telephone && { "telephone": camping.telephone }),
        ...(camping.siteWeb && { "url": camping.siteWeb }),
        ...(camping.email && { "email": camping.email }),
        ...(hasCoordinates && { "geo": { "@type": "GeoCoordinates", "latitude": camping.latitude, "longitude": camping.longitude } }),
        ...(camping.nombreEmplacements && { "numberOfRooms": camping.nombreEmplacements }),
        "description": `${camping.nom}, camping ${camping.classement || ''} à ${camping.commune}.`
      })}} />
    </main>
  )
}
