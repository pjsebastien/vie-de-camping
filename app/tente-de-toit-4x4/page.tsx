import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'
import { TenteSubNav } from '@/components/tentes/TenteSubNav'

export const metadata: Metadata = {
  title: 'Tente de toit 4x4 : le choix des aventuriers tout-terrain',
  description: 'Quelle tente de toit pour 4x4 choisir ? Découvrez les meilleurs modèles pour l\'overlanding et l\'aventure tout-terrain. Comparatif, conseils et avis.',
  keywords: ['tente de toit 4x4', 'tente toit tout terrain', 'overlanding', 'tente de toit raid', 'camping 4x4'],
}

export default function TenteToit4x4Page() {
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
            <span>Pour 4x4</span>
          </nav>

          <div className="tente-hero-grid">
            <div className="tente-hero-text">
              <h1>Tente de toit 4x4 : <span>l'équipement des aventuriers</span></h1>
              <p className="tente-hero-lead">
                Le 4x4 et la <strong>tente de toit</strong> forment le duo parfait pour l'overlanding et l'aventure
                tout-terrain. Avec un véhicule capable d'aller partout et un hébergement autonome sur le toit,
                vous accédez aux spots les plus reculés en totale liberté. Découvrez les tentes de toit conçues
                pour résister aux conditions les plus exigeantes.
              </p>

              <div className="hero-trust-badges">
                <div className="hero-badge"><span className="hero-badge-icon">🏔️</span><span>Overlanding</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">🌧️</span><span>4 saisons</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">🛡️</span><span>Ultra-résistant</span></div>
              </div>

              <div className="hero-cta-group">
                <a href={st09pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-primary-pro">
                  Voir la ST09PRO (recommandée 4x4) →
                </a>
                <Link href="#modeles" className="cta-secondary-pro">Voir les modèles</Link>
              </div>
            </div>

            <div className="tente-hero-image">
              <Image
                src={st09pro.media.images.general[0]}
                alt="Tente de toit 4x4 KAILOP en situation overlanding"
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
            <h2>Pourquoi le 4x4 est-il idéal pour la tente de toit ?</h2>
            <p>
              Le 4x4 offre des avantages uniques pour le camping avec tente de toit. Sa structure renforcée supporte
              facilement des charges de 100 kg ou plus sur le toit. Sa garde au sol élevée permet d'accéder à des
              terrains inaccessibles aux véhicules classiques : pistes forestières, chemins de montagne, plages
              isolées, déserts...
            </p>
            <p>
              L'overlanding (voyage tout-terrain en autonomie) connaît un essor mondial. Les amateurs de raid, d'aventure
              et de grands espaces choisissent le combo 4x4 + tente de toit pour sa polyvalence. Vous pouvez rouler
              toute la journée sur des pistes difficiles, puis vous arrêter au coucher du soleil, ouvrir votre tente
              en 5 secondes et profiter d'une vue imprenable sur un paysage sauvage.
            </p>
            <p>
              Les tentes de toit rigides comme les KAILOP sont particulièrement adaptées aux 4x4 : leur coque aluminium
              résiste aux branches et aux intempéries, leur étanchéité PU5000+ vous protège des pires conditions météo,
              et leur ouverture rapide est précieuse quand vous arrivez fatigué après une longue journée de piste.
            </p>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Les avantages du 4x4 pour la tente de toit</h2>
          <div className="tente-benefits-grid">
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">💪</div>
              <h3>Capacité de charge élevée</h3>
              <p>Les 4x4 supportent 100-150 kg de charge dynamique, contre 75 kg pour une voiture. Vous pouvez choisir des tentes plus spacieuses ou ajouter des accessoires.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🏔️</div>
              <h3>Accès aux spots reculés</h3>
              <p>Fin de pistes, bords de rivière, clairières en forêt, plages sauvages. La tente de toit vous offre l'hébergement sur place.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🛡️</div>
              <h3>Stabilité renforcée</h3>
              <p>L'empattement large et le poids du 4x4 offrent une excellente stabilité, même par vent fort ou sur terrain incliné.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🌍</div>
              <h3>Polyvalence voyage</h3>
              <p>Le 4x4 avec tente de toit est aussi à l'aise sur autoroute qu'en hors-piste. Alternez visites et aventures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4x4 compatibles */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>4x4 compatibles avec une tente de toit</h2>
          <div className="tente-vehicle-grid">
            <div className="tente-vehicle-card">
              <h3>4x4 compacts</h3>
              <p><strong>Capacité :</strong> 75-100 kg de charge dynamique</p>
              <p><strong>Exemples :</strong> Suzuki Jimny, Dacia Duster, Jeep Renegade</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', marginTop: 'var(--space-2)' }}>Parfaits pour solo/couple. Légers et maniables.</p>
            </div>
            <div className="tente-vehicle-card tente-vehicle-recommended">
              <h3>4x4 moyens</h3>
              <p><strong>Capacité :</strong> 100-150 kg de charge dynamique</p>
              <p><strong>Exemples :</strong> Toyota Land Cruiser, Jeep Wrangler, Land Rover Defender</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', marginTop: 'var(--space-2)' }}>Le choix idéal pour l'overlanding sérieux.</p>
            </div>
            <div className="tente-vehicle-card">
              <h3>Pick-up</h3>
              <p><strong>Capacité :</strong> 100-200 kg de charge dynamique</p>
              <p><strong>Exemples :</strong> Toyota Hilux, Ford Ranger, Mitsubishi L200</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', marginTop: 'var(--space-2)' }}>Avec plateau pour rangement. Top pour longs voyages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos recommandations */}
      <section id="modeles" className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Nos recommandations pour 4x4</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)', maxWidth: '700px' }}>
            Les deux modèles KAILOP conviennent aux 4x4. La ST09PRO est notre recommandation pour l'overlanding
            grâce à sa meilleure ventilation pour les climats chauds.
          </p>

          <div className="tente-products-grid">
            {/* ST09PRO */}
            <article className="product-card-pro">
              <div className="product-card-image">
                <Image src={st09pro.media.images.general[0]} alt="Tente de toit 4x4 KAILOP ST09PRO" width={550} height={400} style={{ objectFit: 'cover' }} />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(st09pro.pricing.original_eur, st09pro.pricing.current_eur)}%</span>
                  <span className="badge-bestseller">Recommandée 4x4</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {st09pro.model}</h3>
                <p className="product-card-subtitle">Ouverture latérale • 3 fenêtres • Ventilation optimale</p>
                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">⚡</span><span>Ouverture {st09pro.opening_system_details.opening_time_seconds}s</span></div>
                  <div className="product-spec"><span className="product-spec-icon">⚖️</span><span>{st09pro.weight.net_kg} kg</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌀</span><span>3 fenêtres ventilées</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌧️</span><span>{st09pro.weather_resistance.waterproof_rating}</span></div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)' }}>
                  La ST09PRO est idéale pour l'overlanding. Ses 3 fenêtres ventilées sont parfaites pour les climats chauds (désert, tropiques). Espace intérieur généreux de {st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width} cm.
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
                <Image src={kp19pro.media.images.general[0]} alt="Tente de toit 4x4 KAILOP KP19PRO" width={550} height={400} style={{ objectFit: 'cover' }} />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(kp19pro.pricing.original_eur, kp19pro.pricing.current_eur)}%</span>
                  <span className="badge-premium">Bestseller</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {kp19pro.model}</h3>
                <p className="product-card-subtitle">Ouverture arrière • Auvent intégré • Profil bas</p>
                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">⚡</span><span>Ouverture {kp19pro.opening_system_details.opening_time_seconds}s</span></div>
                  <div className="product-spec"><span className="product-spec-icon">⚖️</span><span>{kp19pro.weight.net_kg} kg</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌧️</span><span>Auvent anti-pluie</span></div>
                  <div className="product-spec"><span className="product-spec-icon">📐</span><span>Profil {kp19pro.dimensions.closed_cm.height} cm</span></div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)' }}>
                  La KP19PRO est parfaite pour les climats variables. Son auvent intégré protège l'entrée de la pluie. Profil bas de {kp19pro.dimensions.closed_cm.height} cm pour réduire la consommation.
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
      <section className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Questions fréquentes - Tente de toit 4x4</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Puis-je rouler sur piste avec la tente montée ?</summary>
              <p>Oui, c'est tout l'intérêt ! Les tentes KAILOP sont conçues pour résister aux vibrations et secousses des pistes. Vérifiez le serrage des attaches avant chaque trajet difficile.</p>
            </details>
            <details className="tente-faq-item">
              <summary>La tente modifie-t-elle le centre de gravité ?</summary>
              <p>Légèrement. Avec 75-80 kg sur le toit, le centre de gravité remonte. Adaptez votre conduite : vitesse réduite dans les virages et dévers. Les 4x4 modernes gèrent très bien cette charge.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Quelle tente pour l'overlanding en climat chaud ?</summary>
              <p>La KAILOP ST09PRO est notre recommandation. Ses 3 larges fenêtres ventilées créent une circulation d'air optimale. L'ouverture latérale favorise aussi la ventilation.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Faut-il une galerie ou des barres suffisent ?</summary>
              <p>Des barres suffisent pour la tente seule. Une galerie est utile si vous voulez ajouter des accessoires (jerricans, plaques, coffre). Les KAILOP s'installent sur barres standard.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Maillage */}
      <section className="tente-section tente-section-alt">
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
            <Link href="/tente-de-toit-pour-van/" className="internal-link-pro">
              <div className="internal-link-icon">🚐</div>
              <div className="internal-link-text"><h4>Pour van</h4><p>Fourgons</p></div>
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
