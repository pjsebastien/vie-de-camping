import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de confidentialité - Vie de Camping',
  description: 'Politique de confidentialité et protection des données personnelles sur Vie de Camping.',
}

export default function PolitiqueConfidentialitePage() {
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
            Politique de confidentialité
          </h1>
          <p style={{
            fontSize: 'var(--text-lg)',
            textAlign: 'center',
            opacity: 0.9
          }}>
            Protection de vos données personnelles et respect de votre vie privée
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

            {/* Introduction */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                1. Introduction
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  La présente politique de confidentialité décrit comment Vie de Camping collecte, utilise et protège vos données personnelles lorsque vous utilisez notre site web.
                </p>
                <p>
                  Nous accordons une grande importance à la protection de votre vie privée et nous nous engageons à respecter la réglementation en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD).
                </p>
              </div>
            </div>

            {/* Responsable du traitement */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                2. Responsable du traitement
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p>
                  Le responsable du traitement des données personnelles est :
                </p>
                <p style={{ marginTop: 'var(--space-3)' }}>
                  <strong>Sébastien P</strong><br />
                  Vie de Camping<br />
                  Email : <Link href="/contact" style={{ color: '#003580', textDecoration: 'underline' }}>Formulaire de contact</Link>
                </p>
              </div>
            </div>

            {/* Données collectées */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                3. Données collectées
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <h3 style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  color: 'var(--color-gray-900)',
                  marginBottom: 'var(--space-3)',
                  marginTop: 'var(--space-4)'
                }}>
                  3.1. Données de navigation
                </h3>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Lors de votre navigation sur notre site, nous collectons automatiquement certaines données techniques :
                </p>
                <ul style={{ marginLeft: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Adresse IP</li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Type de navigateur et version</li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Pages visitées et durée de visite</li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Système d'exploitation</li>
                  <li>Résolution d'écran</li>
                </ul>

                <h3 style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  color: 'var(--color-gray-900)',
                  marginBottom: 'var(--space-3)',
                  marginTop: 'var(--space-4)'
                }}>
                  3.2. Données de contact (si formulaire de contact)
                </h3>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Si vous nous contactez via le formulaire de contact, nous collectons :
                </p>
                <ul style={{ marginLeft: 'var(--space-6)' }}>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Nom et prénom</li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Adresse email</li>
                  <li>Message et contenu de votre demande</li>
                </ul>
              </div>
            </div>

            {/* Utilisation des données */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                4. Utilisation des données
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Les données collectées sont utilisées pour :
                </p>
                <ul style={{ marginLeft: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Assurer le fonctionnement et l'amélioration du site</li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Analyser l'utilisation du site et optimiser l'expérience utilisateur</li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Répondre à vos demandes via le formulaire de contact</li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Assurer la sécurité du site et prévenir les abus</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
                <p>
                  Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers à des fins commerciales.
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                5. Cookies
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil.
                </p>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  <strong>Types de cookies utilisés :</strong>
                </p>
                <ul style={{ marginLeft: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
                  <li style={{ marginBottom: 'var(--space-2)' }}>
                    <strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site
                  </li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>
                    <strong>Cookies de performance :</strong> pour analyser l'utilisation du site
                  </li>
                </ul>
                <p>
                  Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.
                </p>
              </div>
            </div>

            {/* Durée de conservation */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                6. Durée de conservation
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Vos données sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles sont collectées :
                </p>
                <ul style={{ marginLeft: 'var(--space-6)' }}>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Données de navigation : maximum 13 mois</li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>Données de contact : 3 ans après le dernier contact</li>
                  <li>Cookies : selon les paramètres définis (généralement 13 mois maximum)</li>
                </ul>
              </div>
            </div>

            {/* Vos droits */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                7. Vos droits
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
                </p>
                <ul style={{ marginLeft: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
                  <li style={{ marginBottom: 'var(--space-2)' }}>
                    <strong>Droit d'accès :</strong> obtenir une copie de vos données
                  </li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>
                    <strong>Droit de rectification :</strong> corriger des données inexactes
                  </li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>
                    <strong>Droit à l'effacement :</strong> demander la suppression de vos données
                  </li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>
                    <strong>Droit d'opposition :</strong> vous opposer au traitement de vos données
                  </li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>
                    <strong>Droit à la limitation :</strong> limiter le traitement de vos données
                  </li>
                  <li>
                    <strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré
                  </li>
                </ul>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Pour exercer ces droits, contactez-nous via notre <Link href="/contact" style={{ color: '#003580', textDecoration: 'underline' }}>formulaire de contact</Link>.
                </p>
                <p>
                  Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) si vous estimez que vos droits ne sont pas respectés.
                </p>
              </div>
            </div>

            {/* Sécurité */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                8. Sécurité des données
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre :
                </p>
                <ul style={{ marginLeft: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
                  <li style={{ marginBottom: 'var(--space-2)' }}>L'accès non autorisé</li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>La divulgation non autorisée</li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>La modification non autorisée</li>
                  <li>La perte ou la destruction accidentelle</li>
                </ul>
                <p>
                  Nos données sont hébergées sur des serveurs sécurisés (Vercel) avec protocole HTTPS pour garantir la confidentialité des transmissions.
                </p>
              </div>
            </div>

            {/* Modifications */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                borderBottom: '2px solid #003580',
                paddingBottom: 'var(--space-2)'
              }}>
                9. Modifications de la politique
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p>
                  Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page avec une mise à jour de la date de dernière modification. Nous vous encourageons à consulter régulièrement cette page.
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
              href="/mentions-legales"
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
              Mentions légales
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
