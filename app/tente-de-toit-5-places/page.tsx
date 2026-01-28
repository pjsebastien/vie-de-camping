import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'
import { TenteSubNav } from '@/components/tentes/TenteSubNav'

export const metadata: Metadata = {
  title: 'Tente de toit 5 places : solutions pour grandes familles',
  description: 'Tente de toit 5 places : existe-t-elle vraiment ? Solutions réalistes pour voyager à 5+ en famille avec tentes de toit. Configurations et code promo.',
  keywords: ['tente de toit 5 places', 'tente de toit grande famille', 'tente toit 5 personnes', 'camping famille nombreuse'],
}

export default function TenteToit5PlacesPage() {
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
            <span>5 Places</span>
          </nav>

          <div className="tente-hero-grid">
            <div className="tente-hero-text">
              <h1>Tente de toit 5 places : <span>mythe ou réalité ?</span></h1>
              <p className="tente-hero-lead">
                Vous êtes 5 ou plus et rêvez de camping en tente de toit ? Soyons honnêtes : les vraies
                <strong> tentes 5 places</strong> confortables sont exceptionnelles. Elles existent mais sont énormes,
                très lourdes et coûteuses. Voici les alternatives réalistes qui fonctionnent pour les grandes familles.
              </p>

              <div className="hero-trust-badges">
                <div className="hero-badge"><span className="hero-badge-icon">👨‍👩‍👧‍👦</span><span>Famille 5+</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">💡</span><span>Solutions pratiques</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">✅</span><span>Avis honnête</span></div>
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
                src={st09pro.media.images.general[3]}
                alt="Tente de toit grande famille KAILOP"
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
            <h2>La vérité sur les tentes "5 places"</h2>
            <p>
              Une tente annoncée "5 places" signifie généralement : 5 personnes peuvent techniquement s'allonger,
              mais avec 40 cm de largeur par personne. Pour 5 adultes, c'est inconfortable voire impossible.
              Pour 2 adultes + 3 enfants, ça peut fonctionner dans certains modèles XXL très rares.
            </p>
            <p>
              Les vraies tentes 5 places XXL existent (type "Family" ou "King Size") mais présentent des contraintes
              sérieuses : surface de 200 x 240 cm ou plus, poids de 120-150 kg, et nécessité d'une galerie renforcée
              sur un gros 4x4 ou un camping-car. Budget : 5000-8000€ sans compter l'équipement du véhicule.
            </p>
            <p>
              Pour la majorité des grandes familles, des solutions hybrides sont plus réalistes et plus confortables.
              Voyons lesquelles.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Solutions réalistes pour 5+ personnes</h2>
          <div className="tente-benefits-grid">
            <div className="tente-benefit-card" style={{ border: '2px solid var(--color-green-500)', background: 'var(--color-green-50)' }}>
              <div className="tente-benefit-icon">🏆</div>
              <h3>Tente de toit + véhicule</h3>
              <p>Parents en tente de toit (2 pers.), enfants dans le véhicule (2-3 pers.). Van ou SUV avec banquette convertible. Un seul véhicule, budget maîtrisé.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🚗</div>
              <h3>Deux tentes de toit</h3>
              <p>2 tentes 2-3 places sur 2 véhicules. Flexibilité totale, chaque "camp" est autonome. Idéal pour familles avec ados. Budget : ~5000€.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🏕️</div>
              <h3>Tente de toit + auvent/sol</h3>
              <p>Tente de toit pour 2-3 personnes, auvent latéral ou tente au sol pour les autres. Espace de vie agrandi. Budget : ~3000€.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">👑</div>
              <h3>Tente XXL (rare)</h3>
              <p>Modèles "Family" 200x240 cm+. Poids 120-150 kg, nécessite galerie spéciale + gros 4x4. Budget : 5000-8000€ + équipement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration recommandée */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Notre recommandation : famille de 5</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)', maxWidth: '700px' }}>
            Pour une famille de 5 (2 adultes + 3 enfants), nous recommandons un van ou grand SUV avec une
            tente KAILOP sur le toit pour les parents et l'espace véhicule pour les enfants.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
            {/* Configuration visuelle */}
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)' }}>
              <h3 style={{ marginBottom: 'var(--space-3)', color: 'var(--color-gray-800)', textAlign: 'center' }}>Configuration optimale</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ padding: 'var(--space-3)', background: 'var(--color-green-100)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <p style={{ fontWeight: 600, color: 'var(--color-green-800)', marginBottom: 'var(--space-1)' }}>Tente de toit</p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-green-700)' }}>2 adultes • Confort optimal</p>
                </div>
                <div style={{ padding: 'var(--space-3)', background: 'var(--color-blue-100)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <p style={{ fontWeight: 600, color: 'var(--color-blue-800)', marginBottom: 'var(--space-1)' }}>Van / SUV</p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-blue-700)' }}>3 enfants • Banquette + matelas</p>
                </div>
              </div>
              <ul style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', paddingLeft: 'var(--space-3)' }}>
                <li><strong>Confort :</strong> Chacun a son espace</li>
                <li><strong>Intimité :</strong> Espaces séparés parents/enfants</li>
                <li><strong>Budget :</strong> Une seule tente à acheter</li>
                <li><strong>Pratique :</strong> Un seul véhicule à gérer</li>
              </ul>
            </div>

            {/* Produit recommandé */}
            <article className="product-card-pro">
              <div className="product-card-image">
                <Image src={st09pro.media.images.general[0]} alt="Tente de toit famille KAILOP ST09PRO" width={550} height={400} style={{ objectFit: 'cover' }} />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(st09pro.pricing.original_eur, st09pro.pricing.current_eur)}%</span>
                  <span className="badge-bestseller">Pour les parents</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {st09pro.model}</h3>
                <p className="product-card-subtitle">Ouverture latérale • 3 fenêtres • La plus spacieuse</p>
                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">📐</span><span>{st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width} cm</span></div>
                  <div className="product-spec"><span className="product-spec-icon">⚖️</span><span>{st09pro.weight.net_kg} kg</span></div>
                  <div className="product-spec"><span className="product-spec-icon">👥</span><span>2 adultes confort</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌀</span><span>3 fenêtres ventilées</span></div>
                </div>
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

      {/* Véhicules adaptés */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Véhicules adaptés pour famille de 5</h2>
          <div className="tente-benefits-grid">
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🚐</div>
              <h3>Van aménagé</h3>
              <p>VW Transporter, Mercedes Vito, Renault Trafic. Tente sur le toit, lit dans le van pour 2-3 enfants. La solution idéale.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🚙</div>
              <h3>Grand SUV</h3>
              <p>Touareg, Q7, Land Cruiser. Banquette arrière rabattable + matelas gonflable. Espace suffisant pour 2-3 enfants.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🚗</div>
              <h3>Monospace</h3>
              <p>Sharan, Galaxy, Grand Scenic. 7 places transformables en couchage. Avec tente sur le toit : solution familiale complète.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🏕️</div>
              <h3>Avec tente sol</h3>
              <p>N'importe quel véhicule compatible + tente de camping pour les enfants. Solution économique et flexible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Questions fréquentes - Tente de toit 5 places</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Existe-t-il des tentes de toit vraiment confortables pour 5 adultes ?</summary>
              <p>Non, pas vraiment. Les plus grandes tentes du marché (type "Family" ou "King Size") peuvent accueillir 5 personnes techniquement, mais avec un confort limité (40 cm par personne). Pour 5 adultes qui veulent bien dormir, deux tentes ou une configuration mixte est préférable.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Quel véhicule pour une famille de 5 avec tente de toit ?</summary>
              <p>Un van type VW Transporter, Mercedes Vito ou Renault Trafic est idéal : la tente sur le toit pour les parents, la banquette arrière convertie en lit pour les enfants. Un grand SUV (Touareg, Q7, Land Cruiser) peut aussi convenir avec aménagement intérieur.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Peut-on ajouter un toit relevable ET une tente de toit ?</summary>
              <p>Non, ces deux équipements occupent le même espace (le toit). Un toit relevable est une alternative à la tente de toit, pas un complément. Pour plus de couchages, combinez tente de toit + couchage intérieur ou + tente au sol.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Les enfants sont-ils en sécurité dans le véhicule pendant que nous dormons dans la tente ?</summary>
              <p>Oui, c'est une configuration très courante. Le véhicule est verrouillé, les enfants ont leur espace. Selon l'âge, vous pouvez laisser une fenêtre entrouverte pour la ventilation ou installer un système de communication (babyphone) si les enfants sont petits.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Maillage */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>Autres capacités</h2>
          <div className="internal-links-pro">
            <Link href="/tente-de-toit-3-places/" className="internal-link-pro">
              <div className="internal-link-icon">👨‍👩‍👦</div>
              <div className="internal-link-text"><h4>3 places</h4><p>Couple + enfant</p></div>
            </Link>
            <Link href="/tente-de-toit-4-places/" className="internal-link-pro">
              <div className="internal-link-icon">👨‍👩‍👧‍👦</div>
              <div className="internal-link-text"><h4>4 places</h4><p>Familles de 4</p></div>
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
