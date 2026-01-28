import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'
import { TenteSubNav } from '@/components/tentes/TenteSubNav'

export const metadata: Metadata = {
  title: 'Tente de toit 4 places : solutions pour familles nombreuses',
  description: 'Tente de toit 4 places : quelles options pour dormir à 4 ? Grandes tentes, solutions hybrides et configurations familiales. Code promo -120€.',
  keywords: ['tente de toit 4 places', 'tente de toit familiale', 'grande tente de toit', 'tente toit 4 personnes'],
}

export default function TenteToit4PlacesPage() {
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
            <span>4 Places</span>
          </nav>

          <div className="tente-hero-grid">
            <div className="tente-hero-text">
              <h1>Tente de toit 4 places : <span>les solutions pour familles</span></h1>
              <p className="tente-hero-lead">
                Vous êtes 4 et cherchez une <strong>tente de toit</strong> ? Les vraies 4 places confortables
                sont rares et chères. Heureusement, des configurations malignes permettent à une famille de 4
                de voyager en tente de toit sans se ruiner. Découvrez les solutions qui fonctionnent vraiment.
              </p>

              <div className="hero-trust-badges">
                <div className="hero-badge"><span className="hero-badge-icon">👨‍👩‍👧‍👦</span><span>Familles 4</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">💡</span><span>Solutions malignes</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">💰</span><span>Budget maîtrisé</span></div>
              </div>

              <div className="hero-cta-group">
                <a href={st09pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-primary-pro">
                  Voir la ST09PRO (parents) →
                </a>
                <Link href="#solutions" className="cta-secondary-pro">Voir les solutions</Link>
              </div>
            </div>

            <div className="tente-hero-image">
              <Image
                src={st09pro.media.images.general[2]}
                alt="Tente de toit 4 places KAILOP configuration familiale"
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

      {/* Réalité */}
      <section className="tente-section">
        <div className="container">
          <div style={{ maxWidth: '900px' }}>
            <h2>La réalité des tentes "4 places"</h2>
            <p>
              Soyons honnêtes : beaucoup de tentes annoncées "4 places" sont en réalité confortables pour
              2 adultes + 2 enfants maximum. Une vraie tente 4 places adultes nécessite une surface de
              200 x 200 cm ou plus, pèse 100+ kg et coûte 4000-6000€. Ces modèles XXL existent mais restent
              rares et nécessitent un véhicule adapté (galerie renforcée, gros 4x4).
            </p>
            <p>
              Pour la majorité des familles de 4, la solution la plus pratique et économique est de combiner
              une tente de toit 2-3 places avec un couchage dans le véhicule. Cette configuration offre
              plusieurs avantages : confort, intimité, et budget maîtrisé.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Les solutions pour dormir à 4</h2>
          <div className="tente-benefits-grid">
            <div className="tente-benefit-card" style={{ border: '2px solid var(--color-green-500)', background: 'var(--color-green-50)' }}>
              <div className="tente-benefit-icon">🏆</div>
              <h3>Tente + véhicule (recommandé)</h3>
              <p>Parents dans la tente de toit, enfants dans le véhicule (banquette ou matelas). Chacun son espace, confort optimal. Budget : ~2500€.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🏕️</div>
              <h3>Tente de toit + tente sol</h3>
              <p>Parents ou ados en tente de toit, enfants en tente classique au sol. Économique et flexible. Budget : ~2800€.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🚗</div>
              <h3>Deux véhicules</h3>
              <p>2 tentes de toit standard sur 2 véhicules. Flexibilité totale, possibilité de se séparer. Budget : ~5000€.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">👑</div>
              <h3>Tente XXL</h3>
              <p>Modèles "King Size" ou "Family" pour 4 dans une seule tente. Surface 200x200 cm+, poids 120+ kg. Budget : 4000-6000€.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration recommandée */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Notre configuration recommandée</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)', maxWidth: '700px' }}>
            Pour une famille de 4 (2 adultes + 2 enfants), nous recommandons une tente KAILOP pour les parents,
            combinée à un couchage enfants dans le véhicule. C'est la solution la plus pratique et économique.
          </p>

          <div className="tente-products-grid">
            {/* ST09PRO */}
            <article className="product-card-pro">
              <div className="product-card-image">
                <Image src={st09pro.media.images.general[0]} alt="Tente de toit familiale KAILOP ST09PRO" width={550} height={400} style={{ objectFit: 'cover' }} />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(st09pro.pricing.original_eur, st09pro.pricing.current_eur)}%</span>
                  <span className="badge-bestseller">Pour les parents</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {st09pro.model}</h3>
                <p className="product-card-subtitle">Ouverture latérale • 3 fenêtres • Espace couple généreux</p>
                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">📐</span><span>{st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width} cm</span></div>
                  <div className="product-spec"><span className="product-spec-icon">⚖️</span><span>{st09pro.weight.net_kg} kg</span></div>
                  <div className="product-spec"><span className="product-spec-icon">👥</span><span>2 adultes confort</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌀</span><span>3 fenêtres ventilées</span></div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)' }}>
                  La ST09PRO offre l'espace le plus généreux pour les parents. Pendant que vous dormez confortablement dans la tente, les enfants ont leur espace dans le véhicule.
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

            {/* Couchage enfants */}
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)' }}>
              <h3 style={{ marginBottom: 'var(--space-3)', color: 'var(--color-gray-800)' }}>Pour les enfants</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ padding: 'var(--space-3)', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }}>
                  <h4 style={{ marginBottom: 'var(--space-1)', color: 'var(--color-gray-700)' }}>Option A : Banquette + matelas</h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>Banquette arrière rabattue + matelas gonflable voiture. Budget : 50-100€.</p>
                </div>
                <div style={{ padding: 'var(--space-3)', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }}>
                  <h4 style={{ marginBottom: 'var(--space-1)', color: 'var(--color-gray-700)' }}>Option B : Tente classique</h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>Tente de camping 2 places au sol pour les enfants. Budget : 100-200€.</p>
                </div>
                <div style={{ padding: 'var(--space-3)', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }}>
                  <h4 style={{ marginBottom: 'var(--space-1)', color: 'var(--color-gray-700)' }}>Option C : Van avec lit</h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)' }}>Si vous avez un van aménagé, les enfants dorment dans le lit du van.</p>
                </div>
              </div>
              <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', fontStyle: 'italic' }}>
                Cette configuration offre l'avantage de séparer les espaces : intimité pour les parents, autonomie pour les enfants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Questions fréquentes - Tente de toit 4 places</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Existe-t-il des tentes de toit vraiment confortables pour 4 adultes ?</summary>
              <p>Elles existent (modèles XL ou "King Size") mais sont rares, lourdes (100-130 kg) et chères (4000-6000€). Elles nécessitent aussi un véhicule avec une capacité de charge importante (galerie renforcée, 4x4 ou grand SUV). Pour 4 adultes régulièrement, deux tentes standard sont souvent plus pratiques.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Peut-on mettre 2 tentes de toit sur un seul véhicule ?</summary>
              <p>Théoriquement oui sur un véhicule très long (camping-car, grand 4x4 avec remorque). En pratique, c'est compliqué et peu stable. Mieux vaut deux véhicules ou une tente + couchage véhicule.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Mes enfants de 12 et 14 ans peuvent-ils dormir ensemble dans une tente ?</summary>
              <p>Oui, c'est même une configuration idéale ! Deux ados dans une tente 2-3 places KAILOP, parents dans une autre (ou dans le véhicule si c'est un van). Chacun son espace, tout le monde est content.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Quel véhicule pour une famille de 4 avec tente de toit ?</summary>
              <p>Un SUV familial (Tiguan, 3008, RAV4) ou un van (Transporter, Vito, Trafic) sont idéaux. Les enfants peuvent dormir sur la banquette arrière rabattue ou dans le van aménagé.</p>
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
            <Link href="/tente-de-toit-5-places/" className="internal-link-pro">
              <div className="internal-link-icon">👨‍👩‍👧‍👦</div>
              <div className="internal-link-text"><h4>5 places</h4><p>Grandes familles</p></div>
            </Link>
            <Link href="/meilleures-tentes-de-toit/" className="internal-link-pro">
              <div className="internal-link-icon">🏆</div>
              <div className="internal-link-text"><h4>Comparatif complet</h4><p>Toutes les tentes</p></div>
            </Link>
            <Link href="/tente-de-toit-pour-van/" className="internal-link-pro">
              <div className="internal-link-icon">🚐</div>
              <div className="internal-link-text"><h4>Pour van</h4><p>Configuration idéale</p></div>
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
