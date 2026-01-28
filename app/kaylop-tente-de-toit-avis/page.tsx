import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'
import { TenteSubNav } from '@/components/tentes/TenteSubNav'

export const metadata: Metadata = {
  title: 'KAILOP : avis et test complet des tentes de toit rigides',
  description: 'Avis complet sur les tentes de toit KAILOP : qualité, fiabilité et service client. Test détaillé KP19PRO et ST09PRO. Code promo -120€.',
  keywords: ['kailop avis', 'kailop tente de toit', 'avis tente kailop', 'test kailop', 'kailop qualité'],
}

export default function KaylopAvisPage() {
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
            <span>Avis KAILOP</span>
          </nav>

          <div className="tente-hero-grid">
            <div className="tente-hero-text">
              <h1>KAILOP : <span>avis et test complet</span></h1>
              <p className="tente-hero-lead">
                <strong>KAILOP</strong> propose des tentes de toit rigides à prix compétitif. Mais que valent-elles
                vraiment ? Analyse détaillée de la qualité, du service client et des deux modèles phares
                KP19PRO et ST09PRO. Notre verdict après étude approfondie.
              </p>

              <div className="hero-trust-badges">
                <div className="hero-badge"><span className="hero-badge-icon">⭐</span><span>4.8/5 - KP19PRO</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">⭐</span><span>4.9/5 - ST09PRO</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">🛡️</span><span>Garantie 5 ans</span></div>
              </div>

              <div className="hero-cta-group">
                <a href={kp19pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-primary-pro">
                  Voir le KP19PRO à {formatPrice(kp19pro.pricing.current_eur)} →
                </a>
                <Link href="#comparatif" className="cta-secondary-pro">Comparer les modèles</Link>
              </div>
            </div>

            <div className="tente-hero-image">
              <Image
                src={kp19pro.media.images.general[0]}
                alt="Test et avis tente de toit KAILOP"
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

      {/* Présentation KAILOP */}
      <section className="tente-section">
        <div className="container">
          <div style={{ maxWidth: '900px' }}>
            <h2>KAILOP, c'est quoi ?</h2>
            <p>
              KAILOP est une marque spécialisée dans les tentes de toit rigides haut de gamme à prix accessible.
              Leur promesse : "{brand.promise}" L'entrepôt est situé en France, ce qui garantit une livraison
              rapide et un SAV accessible.
            </p>
            <p>
              Contrairement aux grandes marques qui facturent leur notoriété, KAILOP utilise un modèle de
              vente directe (pas de réseau de revendeurs) et investit moins en marketing traditionnel.
              Résultat : la qualité des composants est équivalente aux marques premium, mais les prix sont
              30 à 40% inférieurs.
            </p>
          </div>

          <div className="trust-grid-pro" style={{ marginTop: 'var(--space-5)' }}>
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

      {/* Avis KP19PRO */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Avis sur le KAILOP KP19PRO</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-5)', alignItems: 'start' }}>
            <div>
              <Image
                src={kp19pro.media.images.general[0]}
                alt="Test KAILOP KP19PRO"
                width={500}
                height={375}
                style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                <span style={{ fontSize: 'var(--text-xl)', color: 'var(--color-amber-500)' }}>★★★★★</span>
                <span style={{ fontWeight: 600, color: 'var(--color-gray-800)' }}>4.8/5</span>
              </div>
            </div>
            <div>
              <h3 style={{ color: 'var(--color-gray-800)', marginBottom: 'var(--space-3)' }}>KAILOP {kp19pro.model}</h3>
              <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>{kp19pro.positioning}</p>

              <div style={{ marginBottom: 'var(--space-3)' }}>
                <h4 style={{ color: 'var(--color-green-600)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>✓ Points positifs</h4>
                <ul style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', paddingLeft: 'var(--space-3)' }}>
                  <li>Ouverture en {kp19pro.opening_system_details.opening_time_seconds}s grâce aux vérins allemands</li>
                  <li>Coque alu légère ({kp19pro.weight.net_kg} kg) et résistante</li>
                  <li>Étanchéité {kp19pro.weather_resistance.waterproof_rating}</li>
                  <li>Profil bas fermé ({kp19pro.dimensions.closed_cm.height} cm)</li>
                  <li>Auvent arrière protège de la pluie</li>
                  <li>Tous accessoires inclus</li>
                </ul>
              </div>

              <div style={{ marginBottom: 'var(--space-3)' }}>
                <h4 style={{ color: 'var(--color-red-600)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>✗ Points à améliorer</h4>
                <ul style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', paddingLeft: 'var(--space-3)' }}>
                  <li>Une seule fenêtre côté (ventilation moyenne)</li>
                  <li>Montage initial à deux personnes</li>
                </ul>
              </div>

              <div className="product-price-section">
                <div className="product-price-row">
                  <span className="product-price-current">{formatPrice(kp19pro.pricing.current_eur)}</span>
                  <span className="product-price-original">{formatPrice(kp19pro.pricing.original_eur)}</span>
                </div>
                <div className="product-promo-code"><span className="promo-label">Code exclusif :</span><span className="promo-code-value">KAILOP120</span></div>
              </div>
              <a href={kp19pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-product-pro" style={{ marginTop: 'var(--space-3)' }}>
                Voir le KP19PRO sur KAILOP<span>-120€ avec KAILOP120</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Avis ST09PRO */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Avis sur le KAILOP ST09PRO</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-5)', alignItems: 'start' }}>
            <div>
              <Image
                src={st09pro.media.images.general[0]}
                alt="Test KAILOP ST09PRO"
                width={500}
                height={375}
                style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                <span style={{ fontSize: 'var(--text-xl)', color: 'var(--color-amber-500)' }}>★★★★★</span>
                <span style={{ fontWeight: 600, color: 'var(--color-gray-800)' }}>4.9/5</span>
              </div>
            </div>
            <div>
              <h3 style={{ color: 'var(--color-gray-800)', marginBottom: 'var(--space-3)' }}>KAILOP {st09pro.model}</h3>
              <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>{st09pro.positioning}</p>

              <div style={{ marginBottom: 'var(--space-3)' }}>
                <h4 style={{ color: 'var(--color-green-600)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>✓ Points positifs</h4>
                <ul style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', paddingLeft: 'var(--space-3)' }}>
                  <li>Ouverture latérale = plus d'espace intérieur</li>
                  <li>3 larges fenêtres - ventilation excellente</li>
                  <li>Surface de couchage plus grande ({st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width} cm)</li>
                  <li>Idéal pour les climats chauds</li>
                  <li>4 fermetures sécurité aluminium</li>
                </ul>
              </div>

              <div style={{ marginBottom: 'var(--space-3)' }}>
                <h4 style={{ color: 'var(--color-red-600)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>✗ Points à améliorer</h4>
                <ul style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', paddingLeft: 'var(--space-3)' }}>
                  <li>Légèrement plus lourd ({st09pro.weight.net_kg} kg)</li>
                  <li>200€ plus cher que le KP19PRO</li>
                </ul>
              </div>

              <div className="product-price-section">
                <div className="product-price-row">
                  <span className="product-price-current">{formatPrice(st09pro.pricing.current_eur)}</span>
                  <span className="product-price-original">{formatPrice(st09pro.pricing.original_eur)}</span>
                </div>
                <div className="product-promo-code"><span className="promo-label">Code exclusif :</span><span className="promo-code-value">KAILOP120</span></div>
              </div>
              <a href={st09pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-product-pro" style={{ marginTop: 'var(--space-3)' }}>
                Voir le ST09PRO sur KAILOP<span>-120€ avec KAILOP120</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comparatif */}
      <section id="comparatif" className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>KP19PRO vs ST09PRO : lequel choisir ?</h2>
          <div className="tente-table-wrapper">
            <table className="comparison-table-pro">
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>KP19PRO</th>
                  <th>ST09PRO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Ouverture</strong></td>
                  <td>Arrière (auvent)</td>
                  <td>Latérale (espace+)</td>
                </tr>
                <tr>
                  <td><strong>Surface</strong></td>
                  <td>{kp19pro.dimensions.open_cm.length}x{kp19pro.dimensions.open_cm.width} cm</td>
                  <td style={{ color: 'var(--color-green-600)', fontWeight: 600 }}>{st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width} cm</td>
                </tr>
                <tr>
                  <td><strong>Poids</strong></td>
                  <td style={{ color: 'var(--color-green-600)', fontWeight: 600 }}>{kp19pro.weight.net_kg} kg</td>
                  <td>{st09pro.weight.net_kg} kg</td>
                </tr>
                <tr>
                  <td><strong>Ventilation</strong></td>
                  <td>Double couche</td>
                  <td style={{ color: 'var(--color-green-600)', fontWeight: 600 }}>3 larges fenêtres</td>
                </tr>
                <tr>
                  <td><strong>Prix</strong></td>
                  <td style={{ color: 'var(--color-green-600)', fontWeight: 600 }}>{formatPrice(kp19pro.pricing.current_eur)}</td>
                  <td>{formatPrice(st09pro.pricing.current_eur)}</td>
                </tr>
                <tr>
                  <td><strong>Idéal pour</strong></td>
                  <td>Couples, roadtrips</td>
                  <td>Familles, climats chauds</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tente-benefits-grid" style={{ marginTop: 'var(--space-5)' }}>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">👫</div>
              <h3>Choisissez le KP19PRO si...</h3>
              <ul style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', paddingLeft: 'var(--space-3)' }}>
                <li>Vous voyagez en couple</li>
                <li>Le budget est prioritaire</li>
                <li>Vous faites beaucoup de roadtrip</li>
                <li>Vous voyagez sous des climats variables</li>
              </ul>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">👨‍👩‍👦</div>
              <h3>Choisissez le ST09PRO si...</h3>
              <ul style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', paddingLeft: 'var(--space-3)' }}>
                <li>Vous êtes une famille avec enfant</li>
                <li>Vous aimez l'espace et l'aération</li>
                <li>Vous restez plusieurs nuits au même endroit</li>
                <li>Vous voyagez dans des régions chaudes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Questions fréquentes sur KAILOP</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>KAILOP est-elle une marque fiable ?</summary>
              <p>Oui. KAILOP est une marque spécialisée dans les tentes de toit rigides avec un positionnement qualité/prix. L'entrepôt est en France, la garantie de 5 ans est effective, et le SAV est réactif. Les composants sont de qualité (vérins allemands, aluminium, tissu technique).</p>
            </details>
            <details className="tente-faq-item">
              <summary>D'où viennent les tentes KAILOP ?</summary>
              <p>Les tentes sont conçues avec des composants européens (vérins allemands notamment) et assemblées avec des standards de qualité premium. L'entrepôt de distribution est situé en France, ce qui garantit une livraison rapide ({brand.logistics.delivery_delay_days}).</p>
            </details>
            <details className="tente-faq-item">
              <summary>Comment se passe le SAV en cas de problème ?</summary>
              <p>KAILOP propose un support par email ({brand.support.email}), des FAQ détaillées et des guides d'installation. La garantie 5 ans couvre la structure, la coque et les composants principaux. Retour possible sous 30 jours.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Pourquoi KAILOP est moins cher que les grandes marques ?</summary>
              <p>KAILOP utilise un modèle de vente directe (pas de réseau de revendeurs) et investit moins en marketing traditionnel. La qualité des composants est équivalente aux marques premium, mais les marges sont réduites.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Puis-je voir une tente KAILOP avant d'acheter ?</summary>
              <p>KAILOP fonctionne principalement en vente en ligne. Cependant, le retour sous 30 jours permet de tester la tente et de la retourner si elle ne convient pas. Certains utilisateurs organisent aussi des rencontres sur les forums.</p>
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
              <div className="internal-link-text"><h4>Comparatif complet</h4><p>Toutes les tentes</p></div>
            </Link>
            <Link href="/tente-de-toit-rigide/" className="internal-link-pro">
              <div className="internal-link-icon">🏠</div>
              <div className="internal-link-text"><h4>Tentes rigides</h4><p>Avantages vs souples</p></div>
            </Link>
            <Link href="/tente-de-toit-pas-cher/" className="internal-link-pro">
              <div className="internal-link-icon">💰</div>
              <div className="internal-link-text"><h4>Pas cher</h4><p>Meilleurs prix</p></div>
            </Link>
            <Link href="/fabriquer-tente-toit-diy/" className="internal-link-pro">
              <div className="internal-link-icon">🔧</div>
              <div className="internal-link-text"><h4>DIY</h4><p>Fabriquer soi-même ?</p></div>
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
