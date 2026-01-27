import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice } from '@/lib/loadTentesData'

export const metadata: Metadata = {
  title: 'Tente de toit 2 places : pour couples et solo',
  description: 'Les meilleures tentes de toit 2 places pour voyager en couple ou en solo. Modèles compacts, légers et confortables. Comparatif et conseils d\'achat.',
  keywords: ['tente de toit 2 places', 'tente de toit couple', 'tente de toit solo', 'petite tente de toit'],
}

export default function TenteToit2PlacesPage() {
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
            <span>2 Places</span>
          </nav>
          <div className="tente-hero-content"><h1>Tente de toit 2 places : le choix parfait pour couples et solopistes</h1></div>
          <p className="tente-hero-subtitle">
            Compacte, légère et suffisante pour deux : la tente 2 places est le format le plus populaire
            pour le camping itinérant en couple ou les escapades en solo avec du confort.
          </p>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <div className="tente-intro">
            <p>
              La <strong>tente de toit 2 places</strong> représente le meilleur compromis entre confort et praticité.
              Assez grande pour dormir à deux confortablement, assez compacte pour s'adapter à la plupart des véhicules.
              C'est le format plébiscité par les couples voyageurs et les aventuriers solo qui veulent de l'espace.
            </p>
          </div>

          <h2>Pourquoi Choisir une Tente 2 Places ?</h2>
          <div className="tente-benefits-grid">
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">⚖️</div>
              <h3>Poids Optimisé</h3>
              <p>Les modèles 2 places pèsent généralement 60-80 kg, compatibles avec la plupart des barres de toit standard.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">📐</div>
              <h3>Dimensions Compactes</h3>
              <p>Profil bas fermé, s'adapte aux parkings souterrains et consomme moins de carburant.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">💰</div>
              <h3>Prix Accessible</h3>
              <p>Les tentes 2 places sont généralement moins chères que les modèles familiaux.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🚗</div>
              <h3>Compatible Tous Véhicules</h3>
              <p>Du SUV compact au 4x4, en passant par les breaks : presque tous les véhicules peuvent l'accueillir.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Nos Recommandations : Tentes de Toit 2-3 Places</h2>
          <p className="section-intro">
            Les modèles KAILOP sont conçus pour {kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} personnes :
            parfaits pour les couples, avec la possibilité d'accueillir un enfant ou un ami occasionnellement.
          </p>

          <div className="tente-products-grid">
            <article className="tente-product-card">
              <div className="tente-product-image">
                <Image
                  src={kp19pro.media.images.general[0]}
                  alt="Tente de toit 2 places KAILOP KP19PRO"
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tente-product-badge">Choix Couples</span>
              </div>
              <div className="tente-product-content">
                <h3>KAILOP {kp19pro.model}</h3>
                <p className="tente-product-positioning">Surface de couchage : {kp19pro.dimensions.open_cm.length} x {kp19pro.dimensions.open_cm.width} cm — confortable pour 2, possible pour 3.</p>
                <ul className="tente-product-features">
                  <li>Capacité : {kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} personnes</li>
                  <li>Matelas {kp19pro.comfort.mattress_width_cm} cm de large</li>
                  <li>Poids : {kp19pro.weight.net_kg} kg</li>
                  <li>Ouverture arrière avec auvent</li>
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

            <article className="tente-product-card">
              <div className="tente-product-image">
                <Image
                  src={st09pro.media.images.general[0]}
                  alt="Tente de toit 2 places KAILOP ST09PRO"
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tente-product-badge">Plus d'Espace</span>
              </div>
              <div className="tente-product-content">
                <h3>KAILOP {st09pro.model}</h3>
                <p className="tente-product-positioning">Surface de couchage : {st09pro.dimensions.open_cm.length} x {st09pro.dimensions.open_cm.width} cm — encore plus spacieuse.</p>
                <ul className="tente-product-features">
                  <li>Capacité : {st09pro.capacity.min_persons}-{st09pro.capacity.max_persons} personnes</li>
                  <li>Matelas {st09pro.comfort.mattress_width_cm} cm de large</li>
                  <li>Poids : {st09pro.weight.net_kg} kg</li>
                  <li>3 fenêtres, ventilation optimale</li>
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
          </div>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <h2>Questions Fréquentes</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Une tente "2 places" est-elle vraiment confortable pour deux adultes ?</summary>
              <p>Oui, si vous choisissez un modèle de qualité. Les tentes KAILOP offrent 150 cm de largeur de matelas, soit l'équivalent d'un lit double standard. Deux adultes dorment confortablement côte à côte.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Puis-je dormir seul dans une tente 2 places ?</summary>
              <p>Absolument ! C'est même très confortable. Vous avez tout l'espace pour vous, vos affaires, et vous pouvez étaler votre équipement. Beaucoup de voyageurs solo choisissent des tentes 2 places pour le confort supplémentaire.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Et si on veut emmener un enfant ?</summary>
              <p>Les tentes KAILOP sont notées {kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} places. Deux adultes et un enfant peuvent dormir confortablement. Pour deux adultes et deux enfants, envisagez une tente 4 places ou deux tentes.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Autres Capacités</h2>
          <div className="tente-internal-links">
            <Link href="/tente-de-toit-3-places/" className="tente-internal-link">
              <span className="link-icon">👨‍👩‍👦</span>
              <span className="link-text"><strong>Tente 3 Places</strong><span>Pour petites familles</span></span>
            </Link>
            <Link href="/tente-de-toit-4-places/" className="tente-internal-link">
              <span className="link-icon">👨‍👩‍👧‍👦</span>
              <span className="link-text"><strong>Tente 4 Places</strong><span>Pour familles</span></span>
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
