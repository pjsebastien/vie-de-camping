import type { Metadata } from 'next'
import Link from 'next/link'
import campings from '@/data/vie-de-camping.json'
import { slugify } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Campings avec Mobil-Homes - Location en France',
  description: 'Découvrez notre sélection de campings proposant la location de mobil-homes en France. Confort, équipements modernes et séjour clé en main.',
}

// Filtrer les campings qui ont des mobil-homes
const campingsAvecMobilHomes = campings.filter(camping => camping.mobilHomes === true)

export default function CampingsMobilHomePage() {
  return (
    <div className="container" style={{ padding: 'var(--space-8) var(--container-padding)' }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'var(--space-8)',
        padding: 'var(--space-8) 0',
        borderBottom: '1px solid var(--color-gray-200)'
      }}>
        <h1 style={{
          fontSize: 'var(--text-4xl)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--color-gray-900)',
          marginBottom: 'var(--space-4)'
        }}>
          Campings avec Mobil-Homes 🏠
        </h1>
        <p style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--color-gray-600)',
          maxWidth: '800px',
          margin: '0 auto var(--space-3) auto'
        }}>
          Le confort d'un logement avec l'esprit camping
        </p>
        <p style={{
          fontSize: 'var(--text-base)',
          color: 'var(--color-primary)',
          fontWeight: 'var(--font-semibold)'
        }}>
          {campingsAvecMobilHomes.length} campings proposant des mobil-homes
        </p>
      </div>

      {/* Pourquoi choisir un Mobil-Home */}
      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--font-bold)',
          marginBottom: 'var(--space-6)',
          textAlign: 'center'
        }}>
          Pourquoi Choisir un Mobil-Home ?
        </h2>

        <div className="grid grid-3" style={{ gap: 'var(--space-6)' }}>
          <div className="card">
            <div className="card__body">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>🛏️</div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
                Confort Optimal
              </h3>
              <p style={{ color: 'var(--color-gray-600)', lineHeight: '1.6' }}>
                Chambres séparées, cuisine équipée, salle de bain privée et terrasse couverte.
                Tout le confort d'un logement de vacances.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card__body">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>🎒</div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
                Clé en Main
              </h3>
              <p style={{ color: 'var(--color-gray-600)', lineHeight: '1.6' }}>
                Pas de tente à monter ni de matériel à transporter. Arrivez les mains vides
                et profitez dès le premier jour.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card__body">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>🌳</div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
                Esprit Camping
              </h3>
              <p style={{ color: 'var(--color-gray-600)', lineHeight: '1.6' }}>
                Profitez des infrastructures du camping (piscine, animations, activités)
                avec le confort en plus.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card__body">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>👨‍👩‍👧‍👦</div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
                Idéal Famille
              </h3>
              <p style={{ color: 'var(--color-gray-600)', lineHeight: '1.6' }}>
                Espace suffisant pour toute la famille (2 à 3 chambres), avec intimité
                et espaces de vie séparés.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card__body">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>💰</div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
                Bon Rapport Qualité/Prix
              </h3>
              <p style={{ color: 'var(--color-gray-600)', lineHeight: '1.6' }}>
                Moins cher qu'un gîte ou hôtel, plus confortable qu'une tente.
                Le meilleur compromis pour des vacances en famille.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card__body">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}>☀️</div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
                Toutes Saisons
              </h3>
              <p style={{ color: 'var(--color-gray-600)', lineHeight: '1.6' }}>
                Isolés et chauffables, les mobil-homes modernes permettent de camper
                même hors saison estivale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Équipements Standard */}
      <section className="card" style={{ marginBottom: 'var(--space-10)', backgroundColor: 'var(--color-gray-50)' }}>
        <div className="card__body">
          <h2 style={{
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-bold)',
            marginBottom: 'var(--space-6)',
            color: 'var(--color-primary)'
          }}>
            Équipements Standard d'un Mobil-Home
          </h2>

          <div className="grid grid-2" style={{ gap: 'var(--space-6)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)', fontWeight: 'var(--font-semibold)' }}>
                🏠 Intérieur
              </h3>
              <ul style={{ paddingLeft: 'var(--space-5)', lineHeight: '2' }}>
                <li>2 à 3 chambres avec literie fournie</li>
                <li>Cuisine équipée (réfrigérateur, plaques, micro-ondes)</li>
                <li>Salle de bain avec douche et WC</li>
                <li>Salon avec coin repas</li>
                <li>Chauffage et/ou climatisation</li>
                <li>Vaisselle et ustensiles de cuisine</li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)', fontWeight: 'var(--font-semibold)' }}>
                🌿 Extérieur
              </h3>
              <ul style={{ paddingLeft: 'var(--space-5)', lineHeight: '2' }}>
                <li>Terrasse couverte semi-intégrée</li>
                <li>Salon de jardin (table + chaises)</li>
                <li>Parking privatif à proximité</li>
                <li>Branchement électrique inclus</li>
                <li>Emplacement délimité et arboré</li>
                <li>Parfois BBQ ou plancha fournis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Conseils de Réservation */}
      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--font-bold)',
          marginBottom: 'var(--space-6)',
          textAlign: 'center'
        }}>
          💡 Conseils pour Bien Réserver
        </h2>

        <div className="grid grid-2" style={{ gap: 'var(--space-5)' }}>
          <div className="card">
            <div className="card__body">
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
                ✅ À Vérifier Avant de Réserver
              </h3>
              <ul style={{ paddingLeft: 'var(--space-5)', lineHeight: '1.8' }}>
                <li>Capacité (nombre de couchages réels)</li>
                <li>Année du mobil-home (préférez récent)</li>
                <li>Draps et linge de lit inclus ou option ?</li>
                <li>Ménage de fin de séjour inclus ?</li>
                <li>Distance des sanitaires/piscine</li>
                <li>Orientation de la terrasse (sud = mieux)</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card__body">
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
                📅 Quand Réserver ?
              </h3>
              <ul style={{ paddingLeft: 'var(--space-5)', lineHeight: '1.8' }}>
                <li><strong>Haute saison:</strong> Réserver 6-12 mois à l'avance</li>
                <li><strong>Juillet-Août:</strong> Les meilleurs emplacements partent vite</li>
                <li><strong>Hors saison:</strong> Réservation possible 1-2 mois avant</li>
                <li><strong>Dernière minute:</strong> Promotions intéressantes parfois</li>
                <li><strong>Week-ends:</strong> Disponibilités limitées, anticiper</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Prix Indicatifs */}
      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--font-bold)',
          marginBottom: 'var(--space-6)',
          textAlign: 'center'
        }}>
          💰 Prix Indicatifs par Semaine
        </h2>

        <div className="grid grid-3" style={{ gap: 'var(--space-5)' }}>
          <div className="card" style={{ border: '2px solid var(--color-gray-300)' }}>
            <div className="card__body" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', color: 'var(--color-primary)' }}>
                Basse Saison
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', marginBottom: 'var(--space-3)' }}>
                Avril-Mai / Sept-Oct
              </p>
              <p style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', margin: 'var(--space-3) 0' }}>
                300€ - 500€
              </p>
            </div>
          </div>

          <div className="card" style={{ border: '2px solid var(--color-primary)' }}>
            <div className="card__body" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', color: 'var(--color-primary)' }}>
                Moyenne Saison
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', marginBottom: 'var(--space-3)' }}>
                Juin / Début Juillet
              </p>
              <p style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', margin: 'var(--space-3) 0' }}>
                600€ - 900€
              </p>
            </div>
          </div>

          <div className="card" style={{ border: '2px solid var(--color-gray-300)' }}>
            <div className="card__body" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', color: 'var(--color-primary)' }}>
                Haute Saison
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', marginBottom: 'var(--space-3)' }}>
                Juillet-Août
              </p>
              <p style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', margin: 'var(--space-3) 0' }}>
                900€ - 1 500€+
              </p>
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 'var(--space-5)', color: 'var(--color-gray-600)', fontSize: 'var(--text-sm)' }}>
          * Prix moyens pour un mobil-home 4-6 personnes. Variations selon région, équipements et standing du camping.
        </p>
      </section>

      {/* Liste des Campings */}
      <section>
        <h2 style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--font-bold)',
          marginBottom: 'var(--space-6)',
          textAlign: 'center'
        }}>
          Campings avec Mobil-Homes ({campingsAvecMobilHomes.length})
        </h2>

        <div className="grid grid-3" style={{ gap: 'var(--space-5)' }}>
          {campingsAvecMobilHomes.slice(0, 12).map((camping) => (
            <Link
              key={camping.slug}
              href={`/campings/${camping.slug}/`}
              className="card"
              style={{ textDecoration: 'none' }}
            >
              <div className="card__body">
                <h3 style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  marginBottom: 'var(--space-2)',
                  color: 'var(--color-gray-900)'
                }}>
                  {camping.nom}
                </h3>
                <p style={{
                  color: 'var(--color-gray-600)',
                  fontSize: 'var(--text-sm)',
                  marginBottom: 'var(--space-2)'
                }}>
                  📍 {camping.commune}, {camping.departement}
                </p>
                <p style={{
                  color: 'var(--color-primary)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-medium)'
                }}>
                  {camping.classement}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {campingsAvecMobilHomes.length > 12 && (
          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link
              href="/campings/"
              className="button"
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-white)',
                padding: 'var(--space-4) var(--space-8)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                fontWeight: 'var(--font-semibold)'
              }}
            >
              Voir tous les campings
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
