import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'
import { TenteSubNav } from '@/components/tentes/TenteSubNav'

export const metadata: Metadata = {
  title: 'Tente de toit 2 places : le format idéal pour couples et solos',
  description: 'Quelle tente de toit 2 places choisir ? Découvrez les meilleurs modèles pour voyager en couple ou en solo. Comparatif, avis et code promo exclusif.',
  keywords: ['tente de toit 2 places', 'tente de toit couple', 'tente de toit solo', 'petite tente de toit'],
}

export default function TenteToit2PlacesPage() {
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
            <span>2 Places</span>
          </nav>

          <div className="tente-hero-grid">
            <div className="tente-hero-text">
              <h1>Tente de toit 2 places : <span>le choix des couples</span></h1>
              <p className="tente-hero-lead">
                La <strong>tente de toit 2 places</strong> est le format le plus populaire. Compacte, légère,
                compatible avec la plupart des véhicules : elle convient parfaitement aux couples et aux
                voyageurs solo qui aiment l'espace. Avec 150 cm de largeur, vous dormez aussi bien que dans
                un lit double à la maison.
              </p>

              <div className="hero-trust-badges">
                <div className="hero-badge"><span className="hero-badge-icon">👫</span><span>Idéal couple</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">⚖️</span><span>Léger (75 kg)</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">🚗</span><span>Tous véhicules</span></div>
              </div>

              <div className="hero-cta-group">
                <a href={kp19pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-primary-pro">
                  Voir la KP19PRO (2-3 places) →
                </a>
                <Link href="#modeles" className="cta-secondary-pro">Comparer les modèles</Link>
              </div>
            </div>

            <div className="tente-hero-image">
              <Image
                src={kp19pro.media.images.general[2]}
                alt="Tente de toit 2 places KAILOP pour couple"
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
            <h2>Pourquoi choisir une tente 2 places ?</h2>
            <p>
              Le format 2 places représente le meilleur compromis entre confort et praticité. Avec une surface
              de couchage d'environ 215 x 133 cm (KP19PRO) ou 220 x 152 cm (ST09PRO), vous avez suffisamment
              d'espace pour deux adultes et leurs affaires de nuit. Le poids contenu (75-80 kg) reste compatible
              avec les barres de toit standard de la plupart des véhicules.
            </p>
            <p>
              Pour les voyageurs solo, la tente 2 places offre un luxe appréciable : vous pouvez étaler vos
              affaires, lire confortablement avant de dormir, ou simplement profiter de l'espace supplémentaire.
              Et si un ami vous rejoint pour quelques étapes, vous avez de quoi l'accueillir.
            </p>
            <p>
              Les modèles KAILOP sont annoncés 2-3 places : confortable pour 2 adultes, possible pour 2 adultes
              et 1 enfant. Cette flexibilité fait de la tente 2-3 places le format le plus polyvalent du marché.
            </p>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Les avantages du format 2 places</h2>
          <div className="tente-benefits-grid">
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">⚖️</div>
              <h3>Poids optimisé</h3>
              <p>75-80 kg selon le modèle, compatible avec les barres de toit standard. Moins de consommation de carburant.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">📐</div>
              <h3>Dimensions compactes</h3>
              <p>Profil bas fermé (13-28 cm). Passe dans les parkings souterrains et les tunnels sans problème.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">💰</div>
              <h3>Prix accessible</h3>
              <p>Les tentes 2-3 places sont le format standard. Pas de surcoût pour des dimensions XXL.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🚗</div>
              <h3>Compatibilité maximale</h3>
              <p>Du SUV compact au 4x4, en passant par les breaks : presque tous les véhicules peuvent l'accueillir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos recommandations */}
      <section id="modeles" className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Nos recommandations pour 2 personnes</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)', maxWidth: '700px' }}>
            Les deux modèles KAILOP offrent un espace de couchage généreux pour 2 adultes.
            La KP19PRO est plus légère, la ST09PRO plus spacieuse.
          </p>

          <div className="tente-products-grid">
            {/* KP19PRO */}
            <article className="product-card-pro">
              <div className="product-card-image">
                <Image src={kp19pro.media.images.general[0]} alt="Tente de toit 2 places KAILOP KP19PRO" width={550} height={400} style={{ objectFit: 'cover' }} />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(kp19pro.pricing.original_eur, kp19pro.pricing.current_eur)}%</span>
                  <span className="badge-bestseller">Choix couples</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {kp19pro.model}</h3>
                <p className="product-card-subtitle">Ouverture arrière • Profil ultra-bas • Légère</p>
                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">📐</span><span>{kp19pro.dimensions.open_cm.length}x{kp19pro.dimensions.open_cm.width} cm</span></div>
                  <div className="product-spec"><span className="product-spec-icon">⚖️</span><span>{kp19pro.weight.net_kg} kg</span></div>
                  <div className="product-spec"><span className="product-spec-icon">👥</span><span>{kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} places</span></div>
                  <div className="product-spec"><span className="product-spec-icon">📏</span><span>Profil {kp19pro.dimensions.closed_cm.height} cm</span></div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)' }}>
                  La KP19PRO est notre recommandation pour les couples. Son profil ultra-bas ({kp19pro.dimensions.closed_cm.height} cm) minimise la prise au vent. Matelas 150 cm de large, soit l'équivalent d'un lit double.
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
                <Image src={st09pro.media.images.general[0]} alt="Tente de toit 2 places KAILOP ST09PRO" width={550} height={400} style={{ objectFit: 'cover' }} />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(st09pro.pricing.original_eur, st09pro.pricing.current_eur)}%</span>
                  <span className="badge-premium">Plus spacieuse</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {st09pro.model}</h3>
                <p className="product-card-subtitle">Ouverture latérale • 3 fenêtres • Espace max</p>
                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">📐</span><span>{st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width} cm</span></div>
                  <div className="product-spec"><span className="product-spec-icon">⚖️</span><span>{st09pro.weight.net_kg} kg</span></div>
                  <div className="product-spec"><span className="product-spec-icon">👥</span><span>{st09pro.capacity.min_persons}-{st09pro.capacity.max_persons} places</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌀</span><span>3 fenêtres ventilées</span></div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)' }}>
                  La ST09PRO offre un espace encore plus généreux ({st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width} cm). Ses 3 fenêtres assurent une ventilation optimale pour les nuits chaudes.
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

      {/* FAQ */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Questions fréquentes - Tente de toit 2 places</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Une tente "2 places" est-elle vraiment confortable pour deux adultes ?</summary>
              <p>Oui, à condition de choisir un modèle de qualité. Les tentes KAILOP offrent 150 cm de largeur de matelas, soit l'équivalent d'un lit double standard (140 cm). Deux adultes dorment confortablement côte à côte avec de la marge.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Puis-je dormir seul dans une tente 2 places ?</summary>
              <p>C'est même très confortable ! Vous avez tout l'espace pour vous, vos affaires, et vous pouvez lire, travailler sur un ordinateur portable... Beaucoup de voyageurs solo choisissent des tentes 2-3 places pour le confort supplémentaire.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Et si on veut emmener un enfant ?</summary>
              <p>Les tentes KAILOP sont notées 2-3 places. Deux adultes et un enfant (jusqu'à 10-12 ans) dorment confortablement. L'enfant peut dormir au milieu ou en tête/pied selon votre préférence.</p>
            </details>
            <details className="tente-faq-item">
              <summary>La tente 2 places est-elle compatible avec mon véhicule ?</summary>
              <p>La plupart des véhicules avec barres de toit peuvent accueillir une tente 2-3 places. Vérifiez la charge dynamique autorisée sur votre véhicule (75-100 kg minimum recommandé) et l'écartement de vos barres.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Maillage */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>Autres capacités</h2>
          <div className="internal-links-pro">
            <Link href="/tente-de-toit-3-places/" className="internal-link-pro">
              <div className="internal-link-icon">👨‍👩‍👦</div>
              <div className="internal-link-text"><h4>3 places</h4><p>Couple + enfant</p></div>
            </Link>
            <Link href="/tente-de-toit-4-places/" className="internal-link-pro">
              <div className="internal-link-icon">👨‍👩‍👧‍👦</div>
              <div className="internal-link-text"><h4>4 places</h4><p>Familles</p></div>
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
