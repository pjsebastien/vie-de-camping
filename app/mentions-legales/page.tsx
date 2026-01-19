import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions légales - Vie de Camping',
  description: 'Mentions légales du site Vie de Camping, guide des campings classés en France.',
}

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        backgroundColor: '#003580',
        padding: 'clamp(2.5rem, 6vw, 4rem) 0',
        color: 'var(--color-white)'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 'var(--font-bold)',
            marginBottom: 'var(--space-3)',
            textAlign: 'center'
          }}>
            Mentions légales
          </h1>
          <p style={{
            fontSize: 'var(--text-lg)',
            textAlign: 'center',
            opacity: 0.9
          }}>
            Informations légales concernant le site Vie de Camping
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        backgroundColor: 'var(--color-white)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>

            {/* Éditeur du site */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                1. Éditeur du site
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  <strong>Nom :</strong> Sébastien P<br />
                  <strong>Site web :</strong> <Link href="/" style={{ color: '#003580', textDecoration: 'underline' }}>www.viedecamping.fr</Link><br />
                  <strong>Email :</strong> <a href="/contact" style={{ color: '#003580', textDecoration: 'underline' }}>Formulaire de contact</a>
                </p>
              </div>
            </div>

            {/* Hébergement */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                2. Hébergement
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Ce site est hébergé par :
                </p>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  <strong>Vercel Inc.</strong><br />
                  440 N Barranca Ave #4133<br />
                  Covina, CA 91723<br />
                  États-Unis<br />
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#003580', textDecoration: 'underline' }}>https://vercel.com</a>
                </p>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                3. Propriété intellectuelle
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  L'ensemble du contenu de ce site (structure, textes, images, logos, graphismes, etc.) est la propriété exclusive de Vie de Camping, sauf mention contraire.
                </p>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de Vie de Camping.
                </p>
                <p>
                  Les données concernant les campings (classements, capacités, équipements) proviennent de sources officielles publiques et sont présentées à titre informatif.
                </p>
              </div>
            </div>

            {/* Données et informations */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                4. Données et informations
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Les informations présentées sur ce site concernant les campings (classements, capacités, équipements, coordonnées) sont fournies à titre indicatif et proviennent de données officielles publiques.
                </p>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Vie de Camping s'efforce de maintenir ces informations à jour et exactes, mais ne peut garantir l'exhaustivité, la précision ou l'actualité des données présentées.
                </p>
                <p>
                  Nous recommandons aux utilisateurs de vérifier directement auprès des établissements les informations essentielles avant toute réservation (disponibilités, tarifs, équipements, périodes d'ouverture).
                </p>
              </div>
            </div>

            {/* Liens externes */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                5. Liens externes
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Le site Vie de Camping peut contenir des liens vers des sites web externes (sites officiels des campings, offices de tourisme, etc.).
                </p>
                <p>
                  Ces liens sont fournis à titre informatif. Vie de Camping n'exerce aucun contrôle sur le contenu de ces sites externes et décline toute responsabilité quant à leur contenu, leur disponibilité ou leurs pratiques en matière de confidentialité.
                </p>
              </div>
            </div>

            {/* Responsabilité */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                6. Limitation de responsabilité
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Vie de Camping ne saurait être tenu responsable :
                </p>
                <ul style={{ marginLeft: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Des dommages directs ou indirects résultant de l'utilisation du site</li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>De l'exactitude, de la précision ou de l'exhaustivité des informations disponibles sur le site</li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Des interruptions, dysfonctionnements ou indisponibilités temporaires du site</li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Des litiges ou problèmes survenus avec les établissements de camping référencés</li>
                </ul>
                <p>
                  L'utilisateur reste seul responsable de l'utilisation qu'il fait des informations présentes sur le site.
                </p>
              </div>
            </div>

            {/* Loi applicable */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                7. Loi applicable
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p>
                  Les présentes mentions légales sont soumises au droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français compétents.
                </p>
              </div>
            </div>

            {/* Date de mise à jour */}
            <div style={{
              padding: 'var(--space-4)',
              backgroundColor: '#F5F5F5',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-gray-600)',
              textAlign: 'center'
            }}>
              Dernière mise à jour : Janvier 2026
            </div>

          </div>
        </div>
      </section>

      {/* Liens utiles */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
        backgroundColor: '#F5F5F5',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-gray-900)',
            marginBottom: 'var(--space-4)'
          }}>
            Pages liées
          </h2>
          <div style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/politique-confidentialite"
              style={{
                display: 'inline-block',
                padding: 'var(--space-3) var(--space-6)',
                backgroundColor: '#003580',
                color: 'var(--color-white)',
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                fontWeight: 'var(--font-semibold)',
                transition: 'all var(--transition-base)'
              }}
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/contact"
              style={{
                display: 'inline-block',
                padding: 'var(--space-3) var(--space-6)',
                backgroundColor: 'var(--color-white)',
                color: '#003580',
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                fontWeight: 'var(--font-semibold)',
                border: '2px solid #003580',
                transition: 'all var(--transition-base)'
              }}
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
