import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'
import { TenteSubNav } from '@/components/tentes/TenteSubNav'

export const metadata: Metadata = {
  title: 'Tente de toit pour van : doublez vos couchages sans modifier l\'intérieur',
  description: 'Installer une tente de toit sur votre van ou fourgon aménagé : compatibilité avec VW California, Vito, Trafic, installation sur galerie, meilleurs modèles et code promo.',
  keywords: ['tente de toit van', 'tente van aménagé', 'tente fourgon', 'tente de toit utilitaire', 'camping van', 'vanlife'],
}

export default function TenteToitVanPage() {
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
            <span>Pour Van</span>
          </nav>

          <div className="tente-hero-grid">
            <div className="tente-hero-text">
              <h1>Tente de toit pour van : <span>doublez vos couchages</span></h1>
              <p className="tente-hero-lead">
                Votre van aménagé manque de places pour dormir ? La <strong>tente de toit</strong> crée une chambre
                supplémentaire sans toucher à l'aménagement intérieur. Passez de 2 à 4-5 couchages en quelques
                secondes. Que vous ayez un VW California, Mercedes Vito, Renault Trafic ou Fiat Ducato, découvrez
                comment transformer votre fourgon en véritable base camp familiale.
              </p>

              <div className="hero-trust-badges">
                <div className="hero-badge"><span className="hero-badge-icon">👨‍👩‍👧‍👦</span><span>+2-3 couchages</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">🔧</span><span>Sans modification</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">⚡</span><span>Ouverture 5s</span></div>
              </div>

              <div className="hero-cta-group">
                <a href={kp19pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-primary-pro">
                  Voir la KP19PRO (recommandée van) →
                </a>
                <Link href="#modeles" className="cta-secondary-pro">Comparer les modèles</Link>
              </div>
            </div>

            <div className="tente-hero-image">
              <Image
                src={kp19pro.media.images.general[1]}
                alt="Tente de toit pour van KAILOP montée sur fourgon"
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
            <h2>Pourquoi ajouter une tente de toit à votre van ?</h2>
            <p>
              Le van aménagé offre une liberté incomparable : vous partez où vous voulez, quand vous voulez.
              Mais l'espace de couchage reste limité. Avec deux adultes, le van est confortable. Ajoutez des
              enfants ou des amis, et il devient vite étriqué. Convertir la banquette chaque soir, ranger les
              affaires, partager l'espace... la magie du vanlife s'estompe.
            </p>
            <p>
              La <strong>tente de toit</strong> résout ce problème en créant un étage supplémentaire. Pendant que
              les parents dorment confortablement dans la tente sur le toit, les enfants ont le van pour eux
              (ou l'inverse !). Deux espaces de couchage séparés signifient plus d'intimité, plus de confort,
              et des matins où personne n'a besoin de tout ranger avant le petit-déjeuner.
            </p>
            <p>
              Contrairement à un toit relevable (5000 à 15000€ d'installation, irréversible), une tente de toit
              se monte sur des barres ou une galerie existante. L'investissement est moindre, et vous pouvez
              la démonter pour utiliser le van au quotidien ou la revendre si vous changez de véhicule.
            </p>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Les avantages pour votre van</h2>
          <div className="tente-benefits-grid">
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">👨‍👩‍👧‍👦</div>
              <h3>Plus de couchages</h3>
              <p>Passez de 2 à 4-5 places sans modifier l'aménagement intérieur. Parents en haut, enfants en bas (ou l'inverse !).</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🏠</div>
              <h3>Deux espaces séparés</h3>
              <p>Chacun son espace. Plus besoin de partager un espace unique. L'intimité préservée, le confort multiplié.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">📦</div>
              <h3>Intérieur libre</h3>
              <p>Le lit du van devient espace de vie en journée. Plus de conversion quotidienne banquette/lit. Votre van reste utilisable.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">💰</div>
              <h3>Alternative économique</h3>
              <p>Un toit relevable coûte 5000 à 15000€. Une tente de toit KAILOP : 2500€, et c'est réversible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vans compatibles */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Vans et fourgons compatibles</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-4)', maxWidth: '700px' }}>
            La plupart des vans acceptent une tente de toit avec les bonnes barres ou galerie.
            Voici les configurations les plus courantes.
          </p>
          <div className="tente-table-wrapper">
            <table className="comparison-table-pro">
              <thead>
                <tr>
                  <th>Véhicule</th>
                  <th>Type</th>
                  <th>Installation</th>
                  <th>Compatibilité</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>VW California / Transporter</strong></td>
                  <td>Van compact</td>
                  <td>Barres ou galerie</td>
                  <td><span style={{ color: 'var(--color-green-600)', fontWeight: 600 }}>Excellente</span></td>
                </tr>
                <tr>
                  <td><strong>Mercedes Vito / Marco Polo</strong></td>
                  <td>Van compact</td>
                  <td>Barres ou galerie</td>
                  <td><span style={{ color: 'var(--color-green-600)', fontWeight: 600 }}>Excellente</span></td>
                </tr>
                <tr>
                  <td><strong>Renault Trafic</strong></td>
                  <td>Fourgon</td>
                  <td>Galerie recommandée</td>
                  <td><span style={{ color: 'var(--color-green-600)', fontWeight: 600 }}>Très bonne</span></td>
                </tr>
                <tr>
                  <td><strong>Citroën SpaceTourer</strong></td>
                  <td>Van compact</td>
                  <td>Barres ou galerie</td>
                  <td><span style={{ color: 'var(--color-green-600)', fontWeight: 600 }}>Très bonne</span></td>
                </tr>
                <tr>
                  <td><strong>Fiat Ducato</strong></td>
                  <td>Fourgon L2/L3</td>
                  <td>Galerie obligatoire</td>
                  <td>Bonne (attention hauteur)</td>
                </tr>
                <tr>
                  <td><strong>Ford Transit Custom</strong></td>
                  <td>Fourgon</td>
                  <td>Galerie recommandée</td>
                  <td><span style={{ color: 'var(--color-green-600)', fontWeight: 600 }}>Très bonne</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tente-info-box" style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--color-amber-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-amber-200)' }}>
            <h3 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-amber-800)' }}>Note sur les grands fourgons (Ducato, Sprinter...)</h3>
            <p style={{ color: 'var(--color-amber-700)', fontSize: 'var(--text-sm)' }}>
              Les fourgons hauts (H2, H3) dépassent déjà 2,50 m. Avec une tente de toit, vous franchirez les 3 m.
              Vérifiez les hauteurs de passage (ponts, parkings, ferries) avant de partir. Les vans compacts
              (Transporter, Vito) restent sous 2,50 m équipés, ce qui est plus pratique au quotidien.
            </p>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Installation sur van : les options</h2>
          <div className="tente-comparison-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)' }}>
              <h3 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-gray-800)' }}>Barres de toit renforcées</h3>
              <ul style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', paddingLeft: 'var(--space-3)' }}>
                <li>Solution économique (300-500€)</li>
                <li>Installation rapide</li>
                <li>Convient aux vans compacts</li>
                <li>Charge : 75-100 kg dynamique</li>
              </ul>
              <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', fontStyle: 'italic' }}>Idéal pour : usage occasionnel, vans déjà équipés de rails</p>
            </div>
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-green-50)', borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-green-500)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <h3 style={{ margin: 0, color: 'var(--color-green-700)' }}>Galerie plate</h3>
                <span style={{ padding: '2px 8px', background: 'var(--color-green-500)', color: 'white', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>Recommandé</span>
              </div>
              <ul style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', paddingLeft: 'var(--space-3)' }}>
                <li>Charge supérieure (150+ kg)</li>
                <li>Espace pour panneaux solaires</li>
                <li>Meilleure répartition du poids</li>
                <li>Coût : 800-2000€</li>
              </ul>
              <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', fontStyle: 'italic' }}>Idéal pour : usage intensif, vanlife, longs voyages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos recommandations */}
      <section id="modeles" className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Nos recommandations pour van</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)', maxWidth: '700px' }}>
            Pour les vans, nous recommandons la KP19PRO : profil bas ({kp19pro.dimensions.closed_cm.height} cm fermée),
            légère ({kp19pro.weight.net_kg} kg), et l'ouverture arrière s'adapte parfaitement à la configuration du véhicule.
          </p>

          <div className="tente-products-grid">
            {/* KP19PRO - Recommandée */}
            <article className="product-card-pro">
              <div className="product-card-image">
                <Image src={kp19pro.media.images.general[0]} alt="Tente de toit van KAILOP KP19PRO" width={550} height={400} style={{ objectFit: 'cover' }} />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(kp19pro.pricing.original_eur, kp19pro.pricing.current_eur)}%</span>
                  <span className="badge-bestseller">Recommandée Van</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {kp19pro.model}</h3>
                <p className="product-card-subtitle">Ouverture arrière • Profil ultra-bas • Auvent intégré</p>
                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">⚡</span><span>Ouverture {kp19pro.opening_system_details.opening_time_seconds}s</span></div>
                  <div className="product-spec"><span className="product-spec-icon">⚖️</span><span>{kp19pro.weight.net_kg} kg</span></div>
                  <div className="product-spec"><span className="product-spec-icon">📐</span><span>Profil {kp19pro.dimensions.closed_cm.height} cm</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌧️</span><span>{kp19pro.weather_resistance.waterproof_rating}</span></div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)' }}>
                  Le profil bas de {kp19pro.dimensions.closed_cm.height} cm minimise la prise au vent et la surconsommation. L'ouverture arrière est idéale sur un van : l'échelle se déploie vers l'arrière du véhicule. Espace de couchage {kp19pro.dimensions.open_cm.length}x{kp19pro.dimensions.open_cm.width} cm.
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

            {/* ST09PRO */}
            <article className="product-card-pro">
              <div className="product-card-image">
                <Image src={st09pro.media.images.general[0]} alt="Tente de toit van KAILOP ST09PRO" width={550} height={400} style={{ objectFit: 'cover' }} />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(st09pro.pricing.original_eur, st09pro.pricing.current_eur)}%</span>
                  <span className="badge-premium">3 fenêtres</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {st09pro.model}</h3>
                <p className="product-card-subtitle">Ouverture latérale • 3 fenêtres ventilées • Espace généreux</p>
                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">⚡</span><span>Ouverture {st09pro.opening_system_details.opening_time_seconds}s</span></div>
                  <div className="product-spec"><span className="product-spec-icon">⚖️</span><span>{st09pro.weight.net_kg} kg</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌀</span><span>3 fenêtres ventilées</span></div>
                  <div className="product-spec"><span className="product-spec-icon">📐</span><span>{st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width} cm</span></div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)' }}>
                  La ST09PRO offre un espace intérieur légèrement plus grand ({st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width} cm) et une excellente ventilation avec ses 3 fenêtres. Parfaite pour les voyages dans les régions chaudes.
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
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>Voir les tentes en vidéo</h2>
          <div className="video-grid-pro">
            <div className="video-card-pro">
              <div className="video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${kp19pro.media.video.youtube_id}`}
                  title="Présentation KAILOP KP19PRO"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="video-caption">KAILOP KP19PRO - Ouverture arrière</p>
            </div>
            <div className="video-card-pro">
              <div className="video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${st09pro.media.video.youtube_id}`}
                  title="Présentation KAILOP ST09PRO"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="video-caption">KAILOP ST09PRO - Ouverture latérale</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Questions fréquentes - Tente de toit pour van</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Puis-je garder mon toit relevable ET ajouter une tente ?</summary>
              <p>Non, les deux systèmes ne sont pas compatibles. Si vous avez déjà un toit relevable, vous n'avez pas besoin de tente de toit. La tente est une alternative au toit relevable, pas un complément.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Comment accéder à la tente depuis le van ?</summary>
              <p>Vous utilisez l'échelle télescopique fournie (2,3 m). Certains installent une trappe de toit pour accéder directement depuis l'intérieur, mais ce n'est pas indispensable. La plupart des utilisateurs passent par l'extérieur.</p>
            </details>
            <details className="tente-faq-item">
              <summary>La tente est-elle compatible avec des panneaux solaires ?</summary>
              <p>Oui, avec une galerie. Vous pouvez installer la tente d'un côté et les panneaux de l'autre. Prévoyez une galerie suffisamment grande pour accueillir les deux équipements.</p>
            </details>
            <details className="tente-faq-item">
              <summary>La consommation augmente-t-elle beaucoup ?</summary>
              <p>Comptez +0,5 à 1 L/100 km selon votre conduite et le modèle choisi. La KP19PRO avec son profil de {kp19pro.dimensions.closed_cm.height} cm minimise l'impact. Sur un van qui consomme déjà 9-10 L/100 km, l'augmentation reste marginale.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>Pourquoi choisir KAILOP ?</h2>
          <div className="trust-grid-pro">
            {brand.trust_badges.map((badge, index) => (
              <div key={index} className="trust-card-pro">
                <div className="trust-card-icon">{['🛡️', '🚚', '↩️', '💳'][index]}</div>
                <h4>{badge.label}</h4>
                <p>{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maillage */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>Continuez votre recherche</h2>
          <div className="internal-links-pro">
            <Link href="/meilleures-tentes-de-toit/" className="internal-link-pro">
              <div className="internal-link-icon">🏆</div>
              <div className="internal-link-text"><h4>Comparatif complet</h4><p>Toutes les meilleures tentes</p></div>
            </Link>
            <Link href="/tente-de-toit-voiture/" className="internal-link-pro">
              <div className="internal-link-icon">🚗</div>
              <div className="internal-link-text"><h4>Pour voiture</h4><p>SUV et berlines</p></div>
            </Link>
            <Link href="/tente-de-toit-4x4/" className="internal-link-pro">
              <div className="internal-link-icon">🚙</div>
              <div className="internal-link-text"><h4>Pour 4x4</h4><p>Overlanding</p></div>
            </Link>
            <Link href="/tente-de-toit-rigide/" className="internal-link-pro">
              <div className="internal-link-icon">🏠</div>
              <div className="internal-link-text"><h4>Tentes rigides</h4><p>Avantages vs souples</p></div>
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
