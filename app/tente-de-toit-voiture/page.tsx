import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice } from '@/lib/loadTentesData'

export const metadata: Metadata = {
  title: 'Tente de Toit pour Voiture : Guide 2025 et Modèles Compatibles',
  description: 'Comment installer une tente de toit sur votre voiture ? Guide complet : compatibilité, charge maximale, meilleurs modèles et conseils d\'installation pour berlines, breaks et SUV.',
  keywords: ['tente de toit voiture', 'tente de toit pour voiture', 'tente voiture', 'camping voiture toit'],
}

export default function TenteToitVoiturePage() {
  const data = loadTentesData()
  const brand = data.brand
  const kp19pro = data.models.find(m => m.model === 'KP19PRO')!
  const st09pro = data.models.find(m => m.model === 'ST09PRO')!

  return (
    <main className="tente-page">
      <section className="tente-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span>/</span>
            <Link href="/meilleures-tentes-de-toit/">Tentes de Toit</Link>
            <span>/</span>
            <span>Pour Voiture</span>
          </nav>
          <div class="tente-hero-content"><h1>Tente de Toit pour Voiture : Le Guide Complet</h1></div>
          <p className="tente-hero-subtitle">
            Oui, vous pouvez installer une tente de toit sur votre voiture ! Découvrez les critères
            de compatibilité et les meilleurs modèles pour berlines, breaks et petits SUV.
          </p>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <div className="tente-intro">
            <p>
              Contrairement aux idées reçues, une <strong>tente de toit</strong> n'est pas réservée aux 4x4 et vans.
              La plupart des voitures équipées de <strong>barres de toit</strong> peuvent accueillir une tente,
              à condition de respecter certains critères de charge et de dimensions.
            </p>
          </div>

          <h2>Votre Voiture Est-elle Compatible ?</h2>
          <div className="tente-compatibility-checklist">
            <div className="checklist-item">
              <span className="check-icon">✓</span>
              <div>
                <h3>Barres de toit installées</h3>
                <p>Rails intégrés, barres longitudinales ou points de fixation : votre voiture doit pouvoir recevoir des barres de toit.</p>
              </div>
            </div>
            <div className="checklist-item">
              <span className="check-icon">✓</span>
              <div>
                <h3>Charge dynamique suffisante</h3>
                <p>Vérifiez la charge dynamique maximale de vos barres (en roulant). <strong>Minimum 75 kg recommandé</strong> pour une tente légère.</p>
              </div>
            </div>
            <div className="checklist-item">
              <span className="check-icon">✓</span>
              <div>
                <h3>Écartement des barres adapté</h3>
                <p>Les points de fixation de la tente doivent correspondre à l'écartement de vos barres (généralement 60-120 cm).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Types de Voitures Compatibles</h2>
          <div className="tente-vehicle-grid">
            <div className="tente-vehicle-card">
              <h3>Berlines et Compactes</h3>
              <p><strong>Compatibilité :</strong> Possible avec barres de toit adaptées</p>
              <p><strong>Attention :</strong> Charge souvent limitée à 75 kg. Privilégiez les modèles légers.</p>
              <p><strong>Exemples :</strong> Golf, 308, Mégane, Civic</p>
            </div>
            <div className="tente-vehicle-card">
              <h3>Breaks et Familiales</h3>
              <p><strong>Compatibilité :</strong> Excellente, toit long et plat</p>
              <p><strong>Avantage :</strong> Plus d'espace de rangement dans le coffre</p>
              <p><strong>Exemples :</strong> Passat SW, 308 SW, Octavia Combi</p>
            </div>
            <div className="tente-vehicle-card tente-vehicle-recommended">
              <h3>SUV Compacts</h3>
              <p><strong>Compatibilité :</strong> Idéale, structure renforcée</p>
              <p><strong>Avantage :</strong> Garde au sol, charge plus élevée (100+ kg)</p>
              <p><strong>Exemples :</strong> Tiguan, 3008, Qashqai, RAV4</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <h2>Nos Recommandations pour Voiture</h2>
          <p className="section-intro">
            Pour une voiture standard, nous recommandons la KAILOP KP19PRO : {kp19pro.weight.net_kg} kg,
            compatible avec la plupart des barres de toit.
          </p>

          <div className="tente-products-grid">
            <article className="tente-product-card">
              <div className="tente-product-image">
                <Image
                  src={kp19pro.media.images.general[0]}
                  alt="Tente de toit KAILOP KP19PRO pour voiture"
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tente-product-badge">Idéal voiture</span>
              </div>
              <div className="tente-product-content">
                <h3>KAILOP {kp19pro.model}</h3>
                <ul className="tente-product-features">
                  <li>Poids : {kp19pro.weight.net_kg} kg (compatible barres 75 kg+)</li>
                  <li>Dimensions fermé : {kp19pro.dimensions.closed_cm.length} x {kp19pro.dimensions.closed_cm.width} cm</li>
                  <li>Profil bas : seulement {kp19pro.dimensions.closed_cm.height} cm d'épaisseur</li>
                  <li>Capacité : {kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} personnes</li>
                </ul>
                <div className="tente-product-price-box">
                  <span className="price-current-large">{formatPrice(kp19pro.pricing.current_eur)}</span>
                  <span className="price-original-large">{formatPrice(kp19pro.pricing.original_eur)}</span>
                </div>
                <a href={kp19pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="tente-cta-button">
                  {kp19pro.affiliate.cta_label}
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Questions Fréquentes</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Puis-je installer une tente de toit sur une Clio ou une 208 ?</summary>
              <p>Techniquement oui, si vous avez des barres de toit. Mais ces petites voitures ont souvent une charge limitée (50-60 kg). Vérifiez les specs de vos barres. Pour plus de confort, un SUV compact ou un break est préférable.</p>
            </details>
            <details className="tente-faq-item">
              <summary>La tente abîme-t-elle le toit de ma voiture ?</summary>
              <p>Non, si l'installation est correcte. La tente repose sur les barres de toit, pas directement sur la carrosserie. Les barres répartissent le poids sur les points de fixation prévus par le constructeur.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Quelle consommation supplémentaire ?</summary>
              <p>Comptez 5-15% de consommation en plus selon votre vitesse et le profil aérodynamique de la tente. Les tentes rigides comme la KP19PRO (13 cm fermée) impactent moins qu'une tente souple.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <h2>Guides Connexes</h2>
          <div className="tente-internal-links">
            <Link href="/tente-de-toit-4x4/" className="tente-internal-link">
              <span className="link-icon">🚙</span>
              <span className="link-text"><strong>Tente pour 4x4</strong><span>Guide tout-terrain</span></span>
            </Link>
            <Link href="/tente-de-toit-pour-van/" className="tente-internal-link">
              <span className="link-icon">🚐</span>
              <span className="link-text"><strong>Tente pour Van</strong><span>Fourgons et utilitaires</span></span>
            </Link>
            <Link href="/meilleures-tentes-de-toit/" className="tente-internal-link">
              <span className="link-icon">🏆</span>
              <span className="link-text"><strong>Comparatif Complet</strong><span>Tous les modèles 2025</span></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
