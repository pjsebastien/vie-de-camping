import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'
import { TenteSubNav } from '@/components/tentes/TenteSubNav'

export const metadata: Metadata = {
  title: 'Tente de toit 3 places : le format familial compact',
  description: 'Tente de toit 3 places pour couple avec enfant ou trio d\'amis. Découvrez les meilleurs modèles, conseils et code promo exclusif -120€.',
  keywords: ['tente de toit 3 places', 'tente de toit famille', 'tente de toit trio', 'tente toit enfant'],
}

export default function TenteToit3PlacesPage() {
  const data = loadTentesData()
  const brand = data.brand
  const kp19pro = data.models.find(m => m.model === 'KP19PRO')!
  const st09pro = data.models.find(m => m.model === 'ST09PRO')!

  return (
    <main className="tente-page">
      {/* Promo Banner */}
      <div className="promo-banner">
        <div className="promo-banner-content">
          <span className="promo-text"><strong>-120€</strong> sur votre tente de toit</span>
          <span className="promo-code">KAILOP120</span>
          <span className="promo-text">Code exclusif activé au clic</span>
        </div>
      </div>

      {/* Navigation */}
      <TenteSubNav />

      {/* Hero */}
      <section className="tente-hero-pro">
        <div className="container">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span>/</span>
            <Link href="/meilleures-tentes-de-toit/">Tentes de Toit</Link>
            <span>/</span>
            <span>3 Places</span>
          </nav>

          <div className="tente-hero-grid">
            <div className="tente-hero-text">
              <h1>Tente de toit 3 places : <span>idéal pour les familles</span></h1>
              <p className="tente-hero-lead">
                La <strong>tente de toit 3 places</strong> est le format parfait pour un couple avec un enfant.
                Vous voyagez à trois sans être à l'étroit, avec un espace de couchage généreux où chacun
                trouve sa place. C'est aussi le choix des couples qui veulent du grand confort ou accueillir
                un invité occasionnel.
              </p>

              <div className="hero-trust-badges">
                <div className="hero-badge"><span className="hero-badge-icon">👨‍👩‍👦</span><span>Famille 3</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">📐</span><span>220x152 cm</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">⚡</span><span>Ouverture 5s</span></div>
              </div>

              <div className="hero-cta-group">
                <a href={st09pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-primary-pro">
                  Voir la ST09PRO (recommandée) →
                </a>
                <Link href="#modeles" className="cta-secondary-pro">Comparer les modèles</Link>
              </div>
            </div>

            <div className="tente-hero-image">
              <Image
                src={st09pro.media.images.general[1]}
                alt="Tente de toit 3 places KAILOP pour famille"
                width={600}
                height={450}
                priority
                style={{ objectFit: 'cover' }}
              />
              <span className="hero-image-badge">-120€ avec KAILOP120</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="tente-section">
        <div className="container">
          <div style={{ maxWidth: '900px' }}>
            <h2>Pour qui la tente 3 places ?</h2>
            <p>
              La tente 3 places est souvent le meilleur choix pour les jeunes familles. Deux adultes et un
              enfant dorment confortablement, avec encore de la place pour les affaires. Mais ce format
              s'adresse aussi aux couples qui veulent du grand confort : plus d'espace pour bouger la nuit,
              ranger ses affaires de voyage, ou simplement s'étaler.
            </p>
            <p>
              Un trio d'amis en road trip peut aussi opter pour ce format. Trois adultes peuvent dormir,
              même si c'est un peu plus serré qu'à deux. Pour un week-end ou quelques nuits, ça fonctionne
              très bien. Pour un voyage de plusieurs semaines, considérez deux tentes ou un format plus grand.
            </p>
            <p>
              Les modèles KAILOP sont officiellement notés 2-3 places, avec une surface de couchage de
              220 x 152 cm pour la ST09PRO. C'est l'équivalent d'un grand lit Queen Size, suffisant pour
              deux adultes et un enfant jusqu'à 10-12 ans.
            </p>
          </div>
        </div>
      </section>

      {/* Configurations */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Configurations possibles</h2>
          <div className="tente-benefits-grid">
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">👨‍👩‍👦</div>
              <h3>Couple + 1 enfant</h3>
              <p>La configuration classique. Deux adultes et un enfant jusqu'à 10-12 ans dorment parfaitement. L'enfant peut dormir au milieu ou en tête/pied.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">👫</div>
              <h3>Couple confort+</h3>
              <p>Vous aimez l'espace ? La 3 places offre de la marge pour bouger, stocker vos affaires de nuit, et ne pas se sentir à l'étroit.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">👥</div>
              <h3>Trio d'amis</h3>
              <p>Road trip entre amis ? Trois adultes peuvent dormir, même si c'est un peu serré. Idéal pour quelques nuits, moins pour un long voyage.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">👤</div>
              <h3>Solo luxe</h3>
              <p>Voyageur solo exigeant ? La 3 places vous offre un espace royal pour dormir, travailler, ranger votre équipement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos recommandations */}
      <section id="modeles" className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Nos recommandations pour 3 personnes</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)', maxWidth: '700px' }}>
            Pour une famille de 3, nous recommandons la ST09PRO pour son espace supplémentaire.
            La KP19PRO reste une excellente option pour un budget plus serré.
          </p>

          <div className="tente-products-grid">
            {/* ST09PRO - Recommandée */}
            <article className="product-card-pro">
              <div className="product-card-image">
                <Image src={st09pro.media.images.general[0]} alt="Tente de toit 3 places KAILOP ST09PRO" width={550} height={400} style={{ objectFit: 'cover' }} />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(st09pro.pricing.original_eur, st09pro.pricing.current_eur)}%</span>
                  <span className="badge-bestseller">Recommandée familles</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {st09pro.model}</h3>
                <p className="product-card-subtitle">Ouverture latérale • 3 fenêtres • La plus spacieuse</p>
                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">📐</span><span>{st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width} cm</span></div>
                  <div className="product-spec"><span className="product-spec-icon">⚖️</span><span>{st09pro.weight.net_kg} kg</span></div>
                  <div className="product-spec"><span className="product-spec-icon">👥</span><span>{st09pro.capacity.min_persons}-{st09pro.capacity.max_persons} places</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌀</span><span>3 fenêtres ventilées</span></div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)' }}>
                  Avec {st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width} cm d'espace de couchage, c'est le modèle le plus spacieux pour les familles. Ses 3 fenêtres assurent une bonne aération pour les nuits chaudes.
                </p>
                <div className="product-price-section">
                  <div className="product-price-row">
                    <span className="product-price-current">{formatPrice(st09pro.pricing.current_eur)}</span>
                    <span className="product-price-original">{formatPrice(st09pro.pricing.original_eur)}</span>
                  </div>
                  <div className="product-promo-code"><span className="promo-label">Code exclusif :</span><span className="promo-code-value">KAILOP120</span></div>
                </div>
                <a href={st09pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-product-pro">
                  Voir la ST09PRO sur KAILOP<span>-120€ avec KAILOP120</span>
                </a>
              </div>
            </article>

            {/* KP19PRO */}
            <article className="product-card-pro">
              <div className="product-card-image">
                <Image src={kp19pro.media.images.general[0]} alt="Tente de toit 3 places KAILOP KP19PRO" width={550} height={400} style={{ objectFit: 'cover' }} />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(kp19pro.pricing.original_eur, kp19pro.pricing.current_eur)}%</span>
                  <span className="badge-premium">Meilleur prix</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {kp19pro.model}</h3>
                <p className="product-card-subtitle">Ouverture arrière • Auvent intégré • Plus légère</p>
                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">📐</span><span>{kp19pro.dimensions.open_cm.length}x{kp19pro.dimensions.open_cm.width} cm</span></div>
                  <div className="product-spec"><span className="product-spec-icon">⚖️</span><span>{kp19pro.weight.net_kg} kg</span></div>
                  <div className="product-spec"><span className="product-spec-icon">👥</span><span>{kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} places</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌧️</span><span>Auvent anti-pluie</span></div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)' }}>
                  Légèrement plus compacte mais tout aussi confortable pour une famille de 3. L'auvent arrière est pratique les jours de pluie. 200€ moins cher que la ST09PRO.
                </p>
                <div className="product-price-section">
                  <div className="product-price-row">
                    <span className="product-price-current">{formatPrice(kp19pro.pricing.current_eur)}</span>
                    <span className="product-price-original">{formatPrice(kp19pro.pricing.original_eur)}</span>
                  </div>
                  <div className="product-promo-code"><span className="promo-label">Code exclusif :</span><span className="promo-code-value">KAILOP120</span></div>
                </div>
                <a href={kp19pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-product-pro">
                  Voir la KP19PRO sur KAILOP<span>-120€ avec KAILOP120</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Questions fréquentes - Tente de toit 3 places</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Jusqu'à quel âge un enfant peut-il dormir avec nous ?</summary>
              <p>Confortablement, jusqu'à 10-12 ans environ. Au-delà, l'enfant prend autant de place qu'un adulte et une configuration à deux espaces (tente + véhicule) devient plus adaptée. Tout dépend aussi de la corpulence de chacun.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Peut-on dormir à 3 adultes ?</summary>
              <p>C'est possible pour quelques nuits, mais serré pour un long voyage. Les tentes KAILOP offrent 150-152 cm de largeur, soit environ 50 cm par personne. Ça passe, mais ce n'est pas optimal pour 3 adultes au quotidien sur plusieurs semaines.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Notre bébé peut-il dormir dans la tente de toit ?</summary>
              <p>Oui, avec les précautions habituelles (lit de voyage adapté, barrières si nécessaire). Beaucoup de familles voyagent avec des bébés en tente de toit. Veillez à sécuriser l'échelle quand le bébé commence à se déplacer.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Quelle tente pour un enfant qui bouge beaucoup la nuit ?</summary>
              <p>Les deux modèles sont sécurisés avec des fenêtres à fermeture éclair et des bords relevés. Les enfants ne peuvent pas tomber accidentellement. Nous recommandons la ST09PRO pour l'espace supplémentaire si votre enfant a besoin de bouger.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Maillage */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>Autres capacités</h2>
          <div className="internal-links-pro">
            <Link href="/tente-de-toit-2-places/" className="internal-link-pro">
              <div className="internal-link-icon">👫</div>
              <div className="internal-link-text"><h4>2 places</h4><p>Pour couples</p></div>
            </Link>
            <Link href="/tente-de-toit-4-places/" className="internal-link-pro">
              <div className="internal-link-icon">👨‍👩‍👧‍👦</div>
              <div className="internal-link-text"><h4>4 places</h4><p>Grandes familles</p></div>
            </Link>
            <Link href="/meilleures-tentes-de-toit/" className="internal-link-pro">
              <div className="internal-link-icon">🏆</div>
              <div className="internal-link-text"><h4>Comparatif complet</h4><p>Toutes les tentes</p></div>
            </Link>
            <Link href="/tente-de-toit-pas-cher/" className="internal-link-pro">
              <div className="internal-link-icon">💰</div>
              <div className="internal-link-text"><h4>Pas cher</h4><p>Meilleurs prix</p></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <div className="floating-cta">
        <a href={brand.affiliate.default_url} target="_blank" rel="noopener noreferrer nofollow" className="floating-cta-button">🎁 -120€ avec KAILOP120</a>
      </div>
    </main>
  )
}
