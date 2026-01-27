import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice } from '@/lib/loadTentesData'

export const metadata: Metadata = {
  title: 'Tente de toit 3 places : pour petites familles et trios',
  description: 'Tente de toit 3 places : le format parfait pour un couple avec enfant ou un groupe de trois amis. Meilleurs modèles et conseils d\'achat.',
  keywords: ['tente de toit 3 places', 'tente de toit famille', 'tente de toit trio', 'tente toit enfant'],
}

export default function TenteToit3PlacesPage() {
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
            <span>3 Places</span>
          </nav>
          <div className="tente-hero-content"><h1>Tente de toit 3 places : le format familial compact</h1></div>
          <p className="tente-hero-subtitle">
            Couple avec enfant, trio d'amis ou voyageur solo qui aime l'espace : la tente 3 places
            offre la flexibilité idéale sans compromis sur le poids.
          </p>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <div className="tente-intro">
            <p>
              La <strong>tente de toit 3 places</strong> est souvent le meilleur choix pour les jeunes familles.
              Deux adultes et un enfant dorment confortablement, avec de la place pour les affaires.
              C'est aussi le format préféré des couples qui veulent du grand confort ou recevoir un invité occasionnel.
            </p>
          </div>

          <h2>Pour Qui la Tente 3 Places ?</h2>
          <div className="tente-use-cases">
            <div className="tente-use-case">
              <h3>👨‍👩‍👦 Couple + 1 Enfant</h3>
              <p>La configuration classique. Deux adultes et un enfant jusqu'à 10-12 ans dorment parfaitement. L'enfant peut dormir au milieu ou en tête/pied.</p>
            </div>
            <div className="tente-use-case">
              <h3>👫 Couple Confort+</h3>
              <p>Vous aimez l'espace ? La 3 places offre de la marge pour bouger, stocker vos affaires de nuit, et ne pas se sentir à l'étroit.</p>
            </div>
            <div className="tente-use-case">
              <h3>👥 Trio d'Amis</h3>
              <p>Road trip entre amis ? Trois adultes peuvent dormir, même si c'est un peu serré. Idéal pour quelques nuits, moins pour un long voyage.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Nos Recommandations : Tentes 2-3 Places KAILOP</h2>
          <p className="section-intro">
            Les modèles KAILOP sont parfaits pour cette configuration : officiellement {kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} places,
            ils accueillent confortablement un couple avec enfant.
          </p>

          <div className="tente-products-grid">
            <article className="tente-product-card">
              <div className="tente-product-image">
                <Image
                  src={st09pro.media.images.general[0]}
                  alt="Tente de toit 3 places KAILOP ST09PRO"
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tente-product-badge">Recommandé Familles</span>
              </div>
              <div className="tente-product-content">
                <h3>KAILOP {st09pro.model}</h3>
                <p className="tente-product-positioning">
                  Avec {st09pro.dimensions.open_cm.length} x {st09pro.dimensions.open_cm.width} cm d'espace de couchage,
                  c'est le modèle le plus spacieux pour les familles.
                </p>
                <ul className="tente-product-features">
                  <li>Capacité : {st09pro.capacity.min_persons}-{st09pro.capacity.max_persons} personnes</li>
                  <li>Surface : {st09pro.dimensions.open_cm.length} x {st09pro.dimensions.open_cm.width} cm</li>
                  <li>3 fenêtres (aération pour les nuits chaudes)</li>
                  <li>Rangements intégrés pour les affaires</li>
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
                  alt="Tente de toit 3 places KAILOP KP19PRO"
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tente-product-badge">Meilleur Prix</span>
              </div>
              <div className="tente-product-content">
                <h3>KAILOP {kp19pro.model}</h3>
                <p className="tente-product-positioning">
                  Légèrement plus compacte mais tout aussi confortable pour une famille de 3.
                  L'auvent arrière est pratique pour les jours de pluie.
                </p>
                <ul className="tente-product-features">
                  <li>Capacité : {kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} personnes</li>
                  <li>Surface : {kp19pro.dimensions.open_cm.length} x {kp19pro.dimensions.open_cm.width} cm</li>
                  <li>Ouverture arrière avec auvent naturel</li>
                  <li>Plus légère : {kp19pro.weight.net_kg} kg</li>
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
          <h2>Questions Fréquentes</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Jusqu'à quel âge un enfant peut-il dormir avec nous ?</summary>
              <p>Confortablement, jusqu'à 10-12 ans environ. Au-delà, l'enfant prend autant de place qu'un adulte et une tente 4 places devient plus adaptée. Tout dépend aussi de la corpulence de chacun.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Peut-on dormir à 3 adultes ?</summary>
              <p>C'est possible pour quelques nuits, mais serré pour un long voyage. Les tentes KAILOP offrent 150 cm de largeur, soit environ 50 cm par personne. Ça passe, mais ce n'est pas optimal pour 3 adultes au quotidien.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Notre bébé peut-il dormir dans la tente de toit ?</summary>
              <p>Oui, avec les précautions habituelles (lit de voyage adapté, barrières de sécurité). Beaucoup de familles voyagent avec des bébés en tente de toit. Veillez à ce que l'échelle soit sécurisée quand le bébé grandit.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Autres Capacités</h2>
          <div className="tente-internal-links">
            <Link href="/tente-de-toit-2-places/" className="tente-internal-link">
              <span className="link-icon">👫</span>
              <span className="link-text"><strong>Tente 2 Places</strong><span>Pour couples</span></span>
            </Link>
            <Link href="/tente-de-toit-4-places/" className="tente-internal-link">
              <span className="link-icon">👨‍👩‍👧‍👦</span>
              <span className="link-text"><strong>Tente 4 Places</strong><span>Familles nombreuses</span></span>
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
