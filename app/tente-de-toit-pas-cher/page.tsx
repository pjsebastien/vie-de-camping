import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'
import { TenteSubNav } from '@/components/tentes/TenteSubNav'

export const metadata: Metadata = {
  title: 'Tente de toit pas cher : les vraies bonnes affaires en 2024',
  description: 'Tente de toit pas cher : comment trouver le meilleur rapport qualité-prix sans sacrifier la qualité. Comparatif, pièges à éviter et code promo -120€.',
  keywords: ['tente de toit pas cher', 'tente de toit prix', 'tente de toit économique', 'tente de toit budget', 'tente toit bon rapport qualité prix'],
}

export default function TenteToitPasCherPage() {
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
            <span>Pas Cher</span>
          </nav>

          <div className="tente-hero-grid">
            <div className="tente-hero-text">
              <h1>Tente de toit pas cher : <span>les vraies bonnes affaires</span></h1>
              <p className="tente-hero-lead">
                Budget serré mais envie d'aventure ? Une <strong>tente de toit pas chère</strong> existe,
                mais attention aux pièges. Les prix varient de 500€ (entrée de gamme douteuse) à 5000€ (luxe).
                Ce comparatif vous aide à trouver le meilleur rapport qualité-prix sans mauvaises surprises.
              </p>

              <div className="hero-trust-badges">
                <div className="hero-badge"><span className="hero-badge-icon">💰</span><span>Meilleur prix</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">🛡️</span><span>Garantie 5 ans</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">🎁</span><span>-120€ exclusif</span></div>
              </div>

              <div className="hero-cta-group">
                <a href={kp19pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-primary-pro">
                  Voir la KP19PRO à {formatPrice(kp19pro.pricing.current_eur)} →
                </a>
                <Link href="#comparatif" className="cta-secondary-pro">Comparer les prix</Link>
              </div>
            </div>

            <div className="tente-hero-image">
              <Image
                src={kp19pro.media.images.general[0]}
                alt="Tente de toit pas cher KAILOP meilleur rapport qualité-prix"
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
            <h2>Combien coûte vraiment une bonne tente de toit ?</h2>
            <p>
              Le marché de la tente de toit est vaste, et les prix varient énormément. D'un côté, des tentes
              à 500-800€ sur Amazon ou AliExpress qui semblent attractives. De l'autre, des marques premium
              qui affichent 4000-5000€ pour des modèles similaires. Où est le juste prix ?
            </p>
            <p>
              La réalité : une tente de toit rigide de qualité (coque aluminium, vérins hydrauliques fiables,
              étanchéité PU5000+, garantie sérieuse) coûte entre 2000 et 3000€. En dessous, vous prenez des
              risques sur la qualité. Au-dessus, vous payez la marque ou des options superflues.
            </p>
            <p>
              Les tentes KAILOP se positionnent exactement dans cette fourchette optimale : qualité premium
              à prix maîtrisé, grâce à un modèle de vente directe sans intermédiaire. C'est notre recommandation
              pour le meilleur rapport qualité-prix.
            </p>
          </div>
        </div>
      </section>

      {/* Gammes de prix */}
      <section id="comparatif" className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Les gammes de prix décryptées</h2>
          <div className="tente-benefits-grid">
            <div className="tente-benefit-card" style={{ borderColor: 'var(--color-red-300)' }}>
              <div className="tente-benefit-icon">⚠️</div>
              <h3>500€ - 1000€</h3>
              <p style={{ fontWeight: 600, color: 'var(--color-red-600)', marginBottom: 'var(--space-2)' }}>Entrée de gamme - À éviter</p>
              <p>Tentes souples manuelles, qualité variable, étanchéité limitée. Durée de vie 2-5 ans. Marques inconnues, SAV inexistant.</p>
            </div>
            <div className="tente-benefit-card" style={{ borderColor: 'var(--color-amber-300)' }}>
              <div className="tente-benefit-icon">🟡</div>
              <h3>1000€ - 2000€</h3>
              <p style={{ fontWeight: 600, color: 'var(--color-amber-600)', marginBottom: 'var(--space-2)' }}>Milieu de gamme - Usage occasionnel</p>
              <p>Tentes souples de qualité ou rigides basiques. Étanchéité correcte. Durée de vie 5-8 ans. Acceptable si usage 5-10 nuits/an.</p>
            </div>
            <div className="tente-benefit-card" style={{ borderColor: 'var(--color-green-500)', background: 'var(--color-green-50)' }}>
              <div className="tente-benefit-icon">🏆</div>
              <h3>2000€ - 3000€</h3>
              <p style={{ fontWeight: 600, color: 'var(--color-green-600)', marginBottom: 'var(--space-2)' }}>Optimal - Meilleur investissement</p>
              <p>Tentes rigides de qualité, vérins hydrauliques fiables, PU5000+. Durée de vie 10-15 ans. C'est ici que se trouve KAILOP.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">👑</div>
              <h3>3000€ +</h3>
              <p style={{ fontWeight: 600, color: 'var(--color-gray-600)', marginBottom: 'var(--space-2)' }}>Premium - Luxe</p>
              <p>Finitions haut de gamme, options (chauffage, isolation), grandes capacités. Pour passionnés sans contrainte budget.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pièges à éviter */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Les pièges à éviter</h2>
          <div style={{ display: 'grid', gap: 'var(--space-3)', maxWidth: '800px' }}>
            <div style={{ padding: 'var(--space-3)', background: 'var(--color-red-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-red-200)' }}>
              <h3 style={{ marginBottom: 'var(--space-1)', color: 'var(--color-red-800)' }}>🚫 Les marques inconnues sur Amazon/AliExpress</h3>
              <p style={{ color: 'var(--color-red-700)', fontSize: 'var(--text-sm)' }}>
                Des tentes à 600-800€ avec des photos alléchantes mais aucun SAV en France. En cas de problème,
                vous êtes seul. L'étanchéité est souvent catastrophique dès la première vraie pluie.
              </p>
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--color-red-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-red-200)' }}>
              <h3 style={{ marginBottom: 'var(--space-1)', color: 'var(--color-red-800)' }}>🚫 Les "promotions" de -70%</h3>
              <p style={{ color: 'var(--color-red-700)', fontSize: 'var(--text-sm)' }}>
                Un prix barré de 3000€ pour une tente vendue 900€ ? C'est un prix fictif. Les vraies promotions
                sur les tentes de toit sérieuses dépassent rarement -15%. Méfiez-vous des remises trop belles.
              </p>
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--color-red-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-red-200)' }}>
              <h3 style={{ marginBottom: 'var(--space-1)', color: 'var(--color-red-800)' }}>🚫 Les tentes d'occasion sans vérification</h3>
              <p style={{ color: 'var(--color-red-700)', fontSize: 'var(--text-sm)' }}>
                Une occasion peut être une bonne affaire, mais vérifiez l'étanchéité (test au jet d'eau),
                les vérins, les fermetures éclair et le tissu. Demandez les preuves d'achat pour la garantie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre recommandation */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Notre recommandation : le meilleur rapport qualité-prix</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)', maxWidth: '700px' }}>
            Les tentes KAILOP offrent une qualité premium à prix maîtrisé. Fabriquées avec les mêmes composants
            que les grandes marques (coque alu, vérins allemands, PU5000+), elles coûtent 30-40% moins cher grâce
            à la vente directe.
          </p>

          <div className="tente-products-grid">
            {/* KP19PRO - Meilleur prix */}
            <article className="product-card-pro">
              <div className="product-card-image">
                <Image src={kp19pro.media.images.general[0]} alt="Tente de toit pas cher KAILOP KP19PRO" width={550} height={400} style={{ objectFit: 'cover' }} />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(kp19pro.pricing.original_eur, kp19pro.pricing.current_eur)}%</span>
                  <span className="badge-bestseller">Meilleur prix</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {kp19pro.model}</h3>
                <p className="product-card-subtitle">Le modèle le plus accessible de la gamme premium</p>
                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">🛡️</span><span>Garantie 5 ans</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🚚</span><span>Livraison gratuite</span></div>
                  <div className="product-spec"><span className="product-spec-icon">↩️</span><span>Retour 30 jours</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌧️</span><span>{kp19pro.weather_resistance.waterproof_rating}</span></div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)' }}>
                  Coque aluminium, vérins hydrauliques allemands, matelas mémoire de forme inclus. Qualité identique
                  aux modèles vendus 3500€ chez les grandes marques. Économie de {formatPrice(kp19pro.pricing.original_eur - kp19pro.pricing.current_eur)} vs prix initial.
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
                <Image src={st09pro.media.images.general[0]} alt="Tente de toit économique KAILOP ST09PRO" width={550} height={400} style={{ objectFit: 'cover' }} />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(st09pro.pricing.original_eur, st09pro.pricing.current_eur)}%</span>
                  <span className="badge-premium">Plus spacieuse</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {st09pro.model}</h3>
                <p className="product-card-subtitle">Espace supérieur pour 200€ de plus</p>
                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">📐</span><span>{st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width} cm</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌀</span><span>3 fenêtres ventilées</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🛡️</span><span>Garantie 5 ans</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌧️</span><span>{st09pro.weather_resistance.waterproof_rating}</span></div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)' }}>
                  Pour 200€ de plus, vous gagnez un espace de couchage supérieur et 3 fenêtres ventilées.
                  Idéal si vous voyagez dans des régions chaudes ou si vous préférez plus d'espace.
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

      {/* Alternatives */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Alternatives pour petits budgets</h2>
          <div className="tente-benefits-grid">
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🔄</div>
              <h3>L'occasion</h3>
              <p style={{ fontWeight: 600, marginBottom: 'var(--space-1)' }}>Budget : 1200-1800€</p>
              <p>Une tente rigide de 2-3 ans en bon état sur Leboncoin. Vérifiez l'étanchéité et demandez les factures.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🏠</div>
              <h3>La location</h3>
              <p style={{ fontWeight: 600, marginBottom: 'var(--space-1)' }}>Budget : 50-100€/nuit</p>
              <p>Tester avant d'acheter ou pour un usage ponctuel. Plusieurs loueurs en France proposent des tentes de toit.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">💳</div>
              <h3>Le paiement fractionné</h3>
              <p style={{ fontWeight: 600, marginBottom: 'var(--space-1)' }}>À partir de ~100€/mois</p>
              <p>KAILOP propose le paiement en plusieurs fois. Répartissez l'investissement sur 10-24 mois.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">⏰</div>
              <h3>Attendre une promo</h3>
              <p style={{ fontWeight: 600, marginBottom: 'var(--space-1)' }}>Économie : 100-200€</p>
              <p>Black Friday, soldes, fin de saison. Les vraies promos dépassent rarement -15%, mais c'est toujours ça.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Questions fréquentes - Tente de toit pas cher</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Peut-on vraiment trouver une bonne tente de toit à moins de 1500€ ?</summary>
              <p>Difficilement en neuf pour une tente rigide. Les modèles sous 1500€ sont soit des tentes souples (moins pratiques), soit des marques inconnues sans garantie fiable. L'occasion reste une option pour ce budget.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Les tentes KAILOP sont-elles vraiment de bonne qualité malgré leur prix ?</summary>
              <p>Oui. Malgré leur prix inférieur aux grandes marques, les KAILOP utilisent les mêmes composants : coque aluminium, vérins hydrauliques allemands, tissu technique PU5000+. La différence de prix vient du modèle de distribution directe (pas d'intermédiaire) et du marketing moins coûteux.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Vaut-il mieux acheter une tente souple pas chère ou économiser pour une rigide ?</summary>
              <p>Si vous prévoyez un usage régulier (10+ nuits/an), économisez pour une rigide. La différence de confort, de rapidité d'installation et de durabilité justifie l'investissement. Pour 2-3 nuits par an seulement, une souple peut suffire.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Le code KAILOP120 est-il cumulable avec d'autres offres ?</summary>
              <p>Le code KAILOP120 (-120€) est exclusif et s'applique en plus du prix promotionnel affiché. Il n'est pas cumulable avec d'autres codes promo, mais il fonctionne sur les deux modèles KP19PRO et ST09PRO.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>Pourquoi KAILOP est le meilleur rapport qualité-prix</h2>
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
              <div className="internal-link-text"><h4>Tentes rigides</h4><p>Pourquoi investir ?</p></div>
            </Link>
            <Link href="/tente-de-toit-2-places/" className="internal-link-pro">
              <div className="internal-link-icon">👫</div>
              <div className="internal-link-text"><h4>2 places</h4><p>Pour couples</p></div>
            </Link>
            <Link href="/tente-de-toit-voiture/" className="internal-link-pro">
              <div className="internal-link-icon">🚗</div>
              <div className="internal-link-text"><h4>Pour voiture</h4><p>SUV et berlines</p></div>
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
