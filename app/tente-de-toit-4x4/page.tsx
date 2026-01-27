import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice } from '@/lib/loadTentesData'

export const metadata: Metadata = {
  title: 'Tente de toit pour 4x4 : overlanding et aventure',
  description: 'La tente de toit pour 4x4 est l\'équipement ultime de l\'overlanding. Meilleurs modèles, installation sur galerie, conseils tout-terrain.',
  keywords: ['tente de toit 4x4', 'tente 4x4', 'overlanding', 'tente de toit tout terrain', 'camping 4x4'],
}

export default function TenteToit4x4Page() {
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
            <span>Pour 4x4</span>
          </nav>
          <div className="tente-hero-content"><h1>Tente de toit pour 4x4 : l'équipement ultime de l'overlanding</h1></div>
          <p className="tente-hero-subtitle">
            Le combo 4x4 + tente de toit est la référence de l'overlanding. Accédez aux spots les plus reculés
            et dormez n'importe où en toute autonomie.
          </p>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <div className="tente-intro">
            <p>
              Le <strong>4x4 équipé d'une tente de toit</strong> représente la liberté absolue. Pistes forestières,
              plages isolées, montagnes... votre véhicule devient un <strong>refuge mobile tout-terrain</strong>.
              Ce guide vous aide à choisir et installer la tente idéale pour votre 4x4.
            </p>
          </div>

          <h2>Pourquoi le 4x4 est idéal pour la tente de toit</h2>
          <div className="tente-benefits-grid">
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🏔️</div>
              <h3>Accès Tout-Terrain</h3>
              <p>Pistes, chemins, terrains accidentés : votre 4x4 vous emmène où les voitures classiques ne peuvent pas aller.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">💪</div>
              <h3>Capacité de Charge Supérieure</h3>
              <p>Les 4x4 supportent généralement 100-150 kg sur le toit, contre 75 kg pour une voiture standard.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">📐</div>
              <h3>Hauteur de Caisse</h3>
              <p>La garde au sol élevée compense la hauteur de la tente. Vous passez toujours sous les obstacles.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🛡️</div>
              <h3>Structure Renforcée</h3>
              <p>Châssis solide, points d'ancrage robustes : le 4x4 est conçu pour supporter des charges importantes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>4x4 Populaires pour l'Overlanding</h2>
          <div className="tente-table-wrapper">
            <table className="tente-comparison-table">
              <thead>
                <tr>
                  <th>Véhicule</th>
                  <th>Charge Toit</th>
                  <th>Compatibilité</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Land Rover Defender</td>
                  <td>150+ kg</td>
                  <td className="highlight-good">Excellente</td>
                </tr>
                <tr>
                  <td>Toyota Land Cruiser</td>
                  <td>120-150 kg</td>
                  <td className="highlight-good">Excellente</td>
                </tr>
                <tr>
                  <td>Jeep Wrangler</td>
                  <td>100-130 kg</td>
                  <td className="highlight-good">Excellente</td>
                </tr>
                <tr>
                  <td>Suzuki Jimny</td>
                  <td>50-75 kg</td>
                  <td>Bonne (tente légère)</td>
                </tr>
                <tr>
                  <td>Dacia Duster</td>
                  <td>75-100 kg</td>
                  <td className="highlight-good">Très bonne</td>
                </tr>
                <tr>
                  <td>Nissan Patrol</td>
                  <td>150+ kg</td>
                  <td className="highlight-good">Excellente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <h2>Installation : Barres ou Galerie ?</h2>
          <div className="tente-comparison-cards">
            <div className="tente-option-card">
              <h3>Barres de Toit</h3>
              <ul>
                <li>Installation simple et rapide</li>
                <li>Moins cher (200-400€)</li>
                <li>Convient pour usage occasionnel</li>
                <li>Charge limitée (75-100 kg typique)</li>
              </ul>
            </div>
            <div className="tente-option-card tente-option-recommended">
              <h3>Galerie Complète (Recommandé)</h3>
              <ul>
                <li>Charge supérieure (150+ kg)</li>
                <li>Espace pour accessoires (éclairage, rangement)</li>
                <li>Meilleure répartition du poids</li>
                <li>Plus cher (600-1500€)</li>
                <li>Idéal pour overlanding sérieux</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Nos Recommandations pour 4x4</h2>
          <div className="tente-products-grid">
            <article className="tente-product-card">
              <div className="tente-product-image">
                <Image
                  src={st09pro.media.images.general[0]}
                  alt="Tente de toit KAILOP ST09PRO pour 4x4"
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tente-product-badge">Choix Overlanding</span>
              </div>
              <div className="tente-product-content">
                <h3>KAILOP {st09pro.model}</h3>
                <p className="tente-product-positioning">L'ouverture latérale offre un espace maximal et une excellente ventilation pour les climats chauds souvent rencontrés en overlanding.</p>
                <ul className="tente-product-features">
                  <li>3 larges fenêtres ventilées</li>
                  <li>Étanchéité {st09pro.weather_resistance.waterproof_rating}</li>
                  <li>4 saisons, résistant vent et UV</li>
                  <li>{st09pro.capacity.min_persons}-{st09pro.capacity.max_persons} personnes</li>
                </ul>
                <div className="tente-product-price-box">
                  <span className="price-current-large">{formatPrice(st09pro.pricing.current_eur)}</span>
                  <span className="price-original-large">{formatPrice(st09pro.pricing.original_eur)}</span>
                </div>
                <a href={st09pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="tente-cta-button">
                  {st09pro.affiliate.cta_label}
                </a>
              </div>
            </article>

            <article className="tente-product-card">
              <div className="tente-product-image">
                <Image
                  src={kp19pro.media.images.general[0]}
                  alt="Tente de toit KAILOP KP19PRO pour 4x4"
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tente-product-badge">Meilleur Prix</span>
              </div>
              <div className="tente-product-content">
                <h3>KAILOP {kp19pro.model}</h3>
                <p className="tente-product-positioning">L'ouverture arrière crée un auvent naturel, idéal pour les climats variables et les arrêts rapides.</p>
                <ul className="tente-product-features">
                  <li>Ouverture en {kp19pro.opening_system_details.opening_time_seconds} secondes</li>
                  <li>Auvent intégré (protection pluie)</li>
                  <li>{kp19pro.weight.net_kg} kg seulement</li>
                  <li>{kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} personnes</li>
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

      <section className="tente-section">
        <div className="container">
          <h2>Questions Fréquentes - Tente 4x4</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Puis-je rouler sur piste avec la tente montée ?</summary>
              <p>Oui, c'est tout l'intérêt ! Les tentes rigides KAILOP sont conçues pour résister aux vibrations et secousses des pistes. Vérifiez simplement que les attaches sont bien serrées avant chaque trajet difficile.</p>
            </details>
            <details className="tente-faq-item">
              <summary>La tente modifie-t-elle le centre de gravité ?</summary>
              <p>Légèrement. Avec 75-80 kg sur le toit, le centre de gravité remonte. Sur piste, adaptez votre conduite : vitesse réduite dans les virages et les dévers. Les 4x4 modernes gèrent très bien cette charge.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Quelle galerie pour ma tente KAILOP ?</summary>
              <p>Les marques Front Runner, Rhino-Rack et ARB sont compatibles. L'espacement standard des tentes KAILOP s'adapte à la plupart des galeries du marché. Vérifiez simplement que votre galerie supporte au moins 100 kg.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Ressources tentes de toit</h2>
          <div className="tente-internal-links">
            <Link href="/tente-de-toit-voiture/" className="tente-internal-link">
              <span className="link-icon">🚗</span>
              <span className="link-text"><strong>Tente pour Voiture</strong><span>Berlines et SUV</span></span>
            </Link>
            <Link href="/tente-de-toit-pour-van/" className="tente-internal-link">
              <span className="link-icon">🚐</span>
              <span className="link-text"><strong>Tente pour Van</strong><span>Fourgons aménagés</span></span>
            </Link>
            <Link href="/meilleures-tentes-de-toit/" className="tente-internal-link">
              <span className="link-icon">🏆</span>
              <span className="link-text"><strong>comparatif</strong><span>Tous les modèles</span></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
