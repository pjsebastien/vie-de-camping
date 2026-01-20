import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Matériel de Camping - Guide et Conseils',
  description: 'Découvrez notre guide complet du matériel de camping : tentes de toit, tables, mobilier, accessoires indispensables pour vos vacances en camping.',
}

export default function MaterielCampingPage() {
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
          Matériel de Camping 🏕️
        </h1>
        <p style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--color-gray-600)',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          Tout ce qu'il faut savoir sur le matériel de camping pour des vacances réussies
        </p>
      </div>

      {/* Introduction */}
      <section style={{ marginBottom: 'var(--space-10)' }}>
        <p style={{
          fontSize: 'var(--text-lg)',
          lineHeight: '1.8',
          color: 'var(--color-gray-700)',
          marginBottom: 'var(--space-5)'
        }}>
          Le choix du bon matériel de camping est essentiel pour profiter pleinement de vos vacances en plein air.
          Que vous soyez amateur de camping sauvage ou que vous préfériez le confort d'un camping équipé,
          nous vous aidons à faire les bons choix.
        </p>
      </section>

      {/* Catégories de Matériel */}
      <div className="grid grid-3" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-10)' }}>
        {/* Tentes de Toit */}
        <div className="card">
          <div className="card__body">
            <h2 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-bold)',
              marginBottom: 'var(--space-3)',
              color: 'var(--color-gray-900)'
            }}>
              🚗 Tentes de Toit
            </h2>
            <p style={{
              color: 'var(--color-gray-600)',
              marginBottom: 'var(--space-4)',
              lineHeight: '1.6'
            }}>
              Pratiques et confortables, les tentes de toit transforment votre véhicule en campement mobile.
            </p>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)', fontWeight: 'var(--font-semibold)' }}>
              Avantages :
            </h3>
            <ul style={{ paddingLeft: 'var(--space-5)', marginBottom: 'var(--space-3)' }}>
              <li>Installation rapide (2-3 minutes)</li>
              <li>Surélevée (protection contre l'humidité)</li>
              <li>Confort de couchage optimal</li>
              <li>Gain de place au sol</li>
            </ul>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>
              💰 Budget : 800€ - 3000€
            </p>
          </div>
        </div>

        {/* Tables et Mobilier */}
        <div className="card">
          <div className="card__body">
            <h2 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-bold)',
              marginBottom: 'var(--space-3)',
              color: 'var(--color-gray-900)'
            }}>
              🪑 Tables et Mobilier
            </h2>
            <p style={{
              color: 'var(--color-gray-600)',
              marginBottom: 'var(--space-4)',
              lineHeight: '1.6'
            }}>
              Un bon mobilier de camping améliore considérablement votre confort quotidien.
            </p>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)', fontWeight: 'var(--font-semibold)' }}>
              Indispensables :
            </h3>
            <ul style={{ paddingLeft: 'var(--space-5)', marginBottom: 'var(--space-3)' }}>
              <li>Table pliante (4-6 personnes)</li>
              <li>Chaises pliantes confortables</li>
              <li>Table de cuisine de camping</li>
              <li>Rangements modulables</li>
            </ul>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>
              💰 Budget : 100€ - 500€
            </p>
          </div>
        </div>

        {/* Véhicules */}
        <div className="card">
          <div className="card__body">
            <h2 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-bold)',
              marginBottom: 'var(--space-3)',
              color: 'var(--color-gray-900)'
            }}>
              🚐 Vans et Camping-Cars
            </h2>
            <p style={{
              color: 'var(--color-gray-600)',
              marginBottom: 'var(--space-4)',
              lineHeight: '1.6'
            }}>
              De plus en plus populaires, les vans aménagés offrent liberté et autonomie.
            </p>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)', fontWeight: 'var(--font-semibold)' }}>
              Types de véhicules :
            </h3>
            <ul style={{ paddingLeft: 'var(--space-5)', marginBottom: 'var(--space-3)' }}>
              <li>Van aménagé (2-3 pers.)</li>
              <li>Fourgon aménagé (4 pers.)</li>
              <li>Camping-car (4-6 pers.)</li>
              <li>Caravane tractable</li>
            </ul>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>
              💰 Budget : 15 000€ - 80 000€
            </p>
          </div>
        </div>

        {/* Accessoires */}
        <div className="card">
          <div className="card__body">
            <h2 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-bold)',
              marginBottom: 'var(--space-3)',
              color: 'var(--color-gray-900)'
            }}>
              🎒 Accessoires Indispensables
            </h2>
            <p style={{
              color: 'var(--color-gray-600)',
              marginBottom: 'var(--space-4)',
              lineHeight: '1.6'
            }}>
              Les petits équipements qui font toute la différence.
            </p>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)', fontWeight: 'var(--font-semibold)' }}>
              À ne pas oublier :
            </h3>
            <ul style={{ paddingLeft: 'var(--space-5)', marginBottom: 'var(--space-3)' }}>
              <li>Lampes et lanternes LED</li>
              <li>Réchaud et ustensiles de cuisine</li>
              <li>Glacière électrique/passive</li>
              <li>Duvets et matelas gonflables</li>
              <li>Trousse de premiers secours</li>
            </ul>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>
              💰 Budget : 200€ - 800€
            </p>
          </div>
        </div>

        {/* Cuisine */}
        <div className="card">
          <div className="card__body">
            <h2 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-bold)',
              marginBottom: 'var(--space-3)',
              color: 'var(--color-gray-900)'
            }}>
              🍳 Cuisine de Camping
            </h2>
            <p style={{
              color: 'var(--color-gray-600)',
              marginBottom: 'var(--space-4)',
              lineHeight: '1.6'
            }}>
              Cuisiner en camping peut être un vrai plaisir avec le bon équipement.
            </p>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)', fontWeight: 'var(--font-semibold)' }}>
              Équipement cuisine :
            </h3>
            <ul style={{ paddingLeft: 'var(--space-5)', marginBottom: 'var(--space-3)' }}>
              <li>Réchaud à gaz 2-3 feux</li>
              <li>Batterie de cuisine camping</li>
              <li>Vaisselle incassable</li>
              <li>Glacière 40-60L</li>
              <li>Jerrican d'eau</li>
            </ul>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>
              💰 Budget : 150€ - 600€
            </p>
          </div>
        </div>

        {/* Confort */}
        <div className="card">
          <div className="card__body">
            <h2 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-bold)',
              marginBottom: 'var(--space-3)',
              color: 'var(--color-gray-900)'
            }}>
              😴 Confort et Repos
            </h2>
            <p style={{
              color: 'var(--color-gray-600)',
              marginBottom: 'var(--space-4)',
              lineHeight: '1.6'
            }}>
              Un bon sommeil est essentiel pour profiter de vos vacances.
            </p>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)', fontWeight: 'var(--font-semibold)' }}>
              Pour bien dormir :
            </h3>
            <ul style={{ paddingLeft: 'var(--space-5)', marginBottom: 'var(--space-3)' }}>
              <li>Matelas gonflable ou autogonflant</li>
              <li>Sac de couchage adapté à la saison</li>
              <li>Oreiller de camping</li>
              <li>Draps ou sac à viande</li>
            </ul>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>
              💰 Budget : 100€ - 400€
            </p>
          </div>
        </div>
      </div>

      {/* Conseils d'Achat */}
      <section className="card" style={{ marginBottom: 'var(--space-10)', backgroundColor: 'var(--color-gray-50)' }}>
        <div className="card__body">
          <h2 style={{
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-bold)',
            marginBottom: 'var(--space-5)',
            color: 'var(--color-primary)'
          }}>
            💡 Conseils pour Bien Choisir
          </h2>

          <div className="grid grid-2" style={{ gap: 'var(--space-5)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
                ✅ Critères de Qualité
              </h3>
              <ul style={{ paddingLeft: 'var(--space-5)', lineHeight: '1.8' }}>
                <li>Privilégiez la légèreté pour le transport</li>
                <li>Vérifiez la facilité de montage/démontage</li>
                <li>Choisissez des matériaux résistants</li>
                <li>Optez pour du matériel compact</li>
                <li>Lisez les avis utilisateurs</li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
                🛒 Où Acheter ?
              </h3>
              <ul style={{ paddingLeft: 'var(--space-5)', lineHeight: '1.8' }}>
                <li>Magasins spécialisés (Decathlon, Au Vieux Campeur)</li>
                <li>Sites en ligne (Amazon, CampingWorld)</li>
                <li>Occasions (Leboncoin, vide-greniers)</li>
                <li>Promotions en fin de saison</li>
                <li>Location pour tester avant d'acheter</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Récapitulatif */}
      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h2 style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--font-bold)',
          marginBottom: 'var(--space-5)',
          textAlign: 'center'
        }}>
          💰 Budget Total par Type de Camping
        </h2>

        <div className="grid grid-3" style={{ gap: 'var(--space-5)' }}>
          <div className="card" style={{ border: '2px solid var(--color-gray-300)' }}>
            <div className="card__body" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', color: 'var(--color-primary)' }}>
                Débutant
              </h3>
              <p style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', margin: 'var(--space-3) 0' }}>
                300€ - 600€
              </p>
              <p style={{ color: 'var(--color-gray-600)' }}>
                Tente classique + équipement basique
              </p>
            </div>
          </div>

          <div className="card" style={{ border: '2px solid var(--color-primary)' }}>
            <div className="card__body" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', color: 'var(--color-primary)' }}>
                Intermédiaire
              </h3>
              <p style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', margin: 'var(--space-3) 0' }}>
                1 000€ - 2 500€
              </p>
              <p style={{ color: 'var(--color-gray-600)' }}>
                Tente de toit ou bon équipement complet
              </p>
            </div>
          </div>

          <div className="card" style={{ border: '2px solid var(--color-gray-300)' }}>
            <div className="card__body" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', color: 'var(--color-primary)' }}>
                Confirmé
              </h3>
              <p style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', margin: 'var(--space-3) 0' }}>
                3 000€ - 10 000€+
              </p>
              <p style={{ color: 'var(--color-gray-600)' }}>
                Van aménagé ou équipement haut de gamme
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div style={{
        textAlign: 'center',
        padding: 'var(--space-8)',
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)', fontWeight: 'var(--font-bold)' }}>
          Prêt pour l'Aventure ?
        </h2>
        <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-5)', opacity: 0.9 }}>
          Trouvez le camping parfait pour tester votre nouveau matériel !
        </p>
        <Link
          href="/campings/"
          className="button"
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-primary)',
            padding: 'var(--space-4) var(--space-8)',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            fontWeight: 'var(--font-semibold)',
            fontSize: 'var(--text-lg)'
          }}
        >
          Découvrir les Campings
        </Link>
      </div>
    </div>
  )
}
