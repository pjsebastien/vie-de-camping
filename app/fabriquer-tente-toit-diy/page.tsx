import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'
import { TenteSubNav } from '@/components/tentes/TenteSubNav'

export const metadata: Metadata = {
  title: 'Fabriquer sa tente de toit DIY : bonne ou mauvaise idée ?',
  description: 'Fabriquer sa propre tente de toit : analyse des coûts réels, contraintes techniques et comparaison avec les modèles du commerce. Code promo -120€.',
  keywords: ['fabriquer tente de toit', 'tente de toit DIY', 'tente de toit maison', 'construire tente de toit', 'tente de toit fait maison'],
}

export default function FabriquerTenteToitDiyPage() {
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
            <span>DIY</span>
          </nav>

          <div className="tente-hero-grid">
            <div className="tente-hero-text">
              <h1>Fabriquer sa tente de toit : <span>mythe ou réalité ?</span></h1>
              <p className="tente-hero-lead">
                Face au prix des tentes du commerce, l'idée de <strong>fabriquer sa propre tente de toit</strong>
                peut sembler séduisante. Sur YouTube, des tutoriels promettent une tente DIY pour 500€.
                Mais qu'en est-il vraiment ? Analyse objective des coûts, compétences et risques.
              </p>

              <div className="hero-trust-badges">
                <div className="hero-badge"><span className="hero-badge-icon">⚠️</span><span>Analyse objective</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">💰</span><span>Coûts réels</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">⚖️</span><span>DIY vs Commerce</span></div>
              </div>

              <div className="hero-cta-group">
                <Link href="#comparatif" className="cta-primary-pro">
                  Voir le comparatif DIY vs Commerce →
                </Link>
                <a href={kp19pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-secondary-pro">Alternative clé en main</a>
              </div>
            </div>

            <div className="tente-hero-image">
              <Image
                src={kp19pro.media.images.general[2]}
                alt="Tente de toit DIY vs commerce KAILOP"
                width={600}
                height={450}
                priority
                style={{ objectFit: 'cover' }}
              />
              <span className="hero-image-badge">Alternative : -120€ avec KAILOP120</span>
            </div>
          </div>
        </div>
      </section>

      {/* Avertissement */}
      <section className="tente-section">
        <div className="container">
          <div style={{ maxWidth: '900px', padding: 'var(--space-4)', background: 'var(--color-amber-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-amber-200)', marginBottom: 'var(--space-5)' }}>
            <h3 style={{ color: 'var(--color-amber-800)', marginBottom: 'var(--space-2)' }}>Avertissement</h3>
            <p style={{ color: 'var(--color-amber-700)', fontSize: 'var(--text-sm)' }}>
              Cet article n'a pas pour but de vous décourager, mais de vous donner une vision réaliste.
              Si vous êtes bricoleur confirmé et conscient des contraintes, le DIY peut être une aventure enrichissante.
              Si vous cherchez une solution fiable et rapide, une tente du commerce sera plus adaptée.
            </p>
          </div>

          <div style={{ maxWidth: '900px' }}>
            <h2>Pourquoi vouloir fabriquer sa tente de toit ?</h2>
            <p>
              La motivation principale est économique : l'espoir de diviser le budget par 3 ou 4
              en achetant les matériaux bruts et en assemblant soi-même. Mais le coût réel d'un DIY
              de qualité est souvent sous-estimé. Comptez 800-1500€ minimum pour des matériaux corrects.
            </p>
            <p>
              La personnalisation est un vrai avantage du DIY : vous contrôlez chaque détail et pouvez
              créer une tente sur mesure pour votre véhicule. Mais cela demande une conception préalable
              rigoureuse et des compétences en bricolage avancé.
            </p>
            <p>
              Enfin, pour les passionnés de bricolage, la satisfaction de dormir dans quelque chose
              qu'on a créé de ses mains est une motivation valable. Si c'est votre cas, foncez !
              L'expérience vaut autant que le résultat final.
            </p>
          </div>
        </div>
      </section>

      {/* Les 5 contraintes */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Les 5 contraintes réelles du DIY</h2>
          <div style={{ display: 'grid', gap: 'var(--space-4)', maxWidth: '900px' }}>
            <div style={{ padding: 'var(--space-4)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: 'var(--color-red-100)', color: 'var(--color-red-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>1</span>
                <div>
                  <h3 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-gray-800)' }}>L'étanchéité : le défi majeur</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-2)' }}>
                    C'est LE point critique. Une tente du commerce offre une étanchéité {kp19pro.weather_resistance.waterproof_rating}.
                    Atteindre ce niveau en DIY demande du tissu technique, des coutures thermosoudées, des fermetures étanches...
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>Coût estimé : 200-400€ pour les tissus et joints de qualité</p>
                </div>
              </div>
            </div>

            <div style={{ padding: 'var(--space-4)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: 'var(--color-red-100)', color: 'var(--color-red-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>2</span>
                <div>
                  <h3 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-gray-800)' }}>La structure : poids vs solidité</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-2)' }}>
                    La coque doit être légère pour ne pas surcharger le toit, mais assez solide pour résister au vent et à des années d'utilisation.
                    Bois (lourd), aluminium (outils spécifiques) ou contreplaqué marine (compromis).
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>Coût estimé : 300-600€ pour une structure aluminium correcte</p>
                </div>
              </div>
            </div>

            <div style={{ padding: 'var(--space-4)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: 'var(--color-red-100)', color: 'var(--color-red-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>3</span>
                <div>
                  <h3 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-gray-800)' }}>Le système d'ouverture</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-2)' }}>
                    Les tentes rigides utilisent des vérins hydrauliques de qualité (origine {kp19pro.opening_system_details.origin} sur KAILOP)
                    pour une ouverture en {kp19pro.opening_system_details.opening_time_seconds} secondes. Vérins à gaz basiques : calibrage délicat.
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>Coût estimé : 100-400€ selon le système choisi</p>
                </div>
              </div>
            </div>

            <div style={{ padding: 'var(--space-4)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: 'var(--color-red-100)', color: 'var(--color-red-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>4</span>
                <div>
                  <h3 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-gray-800)' }}>La sécurité routière</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-2)' }}>
                    Une tente mal fixée peut s'ouvrir en roulant, se détacher, ou déséquilibrer le véhicule.
                    En cas d'accident, votre assurance pourrait refuser de couvrir les dommages si l'équipement DIY est mis en cause.
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-red-600)' }}>⚠️ Risque assurance à considérer</p>
                </div>
              </div>
            </div>

            <div style={{ padding: 'var(--space-4)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: 'var(--color-red-100)', color: 'var(--color-red-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>5</span>
                <div>
                  <h3 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-gray-800)' }}>Le temps : des semaines de travail</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-2)' }}>
                    Conception (10-20h), achats (5-10h), fabrication structure (20-40h), couture (15-30h), finitions (10-20h).
                    Total : 60-120 heures de travail, soit 2-3 semaines à temps plein.
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-gray-700)' }}>Valorisé à 15€/h = 900-1800€ de temps investi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparatif */}
      <section id="comparatif" className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>DIY vs Tente du commerce : le vrai comparatif</h2>
          <div className="tente-table-wrapper">
            <table className="comparison-table-pro">
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Tente DIY (réaliste)</th>
                  <th>KAILOP KP19PRO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Coût matériaux</strong></td>
                  <td>800 - 1500€</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><strong>Prix d'achat</strong></td>
                  <td>-</td>
                  <td>{formatPrice(kp19pro.pricing.current_eur)}</td>
                </tr>
                <tr>
                  <td><strong>Temps de fabrication</strong></td>
                  <td>60-120 heures</td>
                  <td>0 (livré prêt)</td>
                </tr>
                <tr>
                  <td><strong>Valeur du temps (15€/h)</strong></td>
                  <td>900 - 1800€</td>
                  <td>0€</td>
                </tr>
                <tr>
                  <td><strong>Coût TOTAL</strong></td>
                  <td style={{ color: 'var(--color-red-600)', fontWeight: 600 }}>1700 - 3300€</td>
                  <td style={{ color: 'var(--color-green-600)', fontWeight: 600 }}>{formatPrice(kp19pro.pricing.current_eur)}</td>
                </tr>
                <tr>
                  <td><strong>Garantie</strong></td>
                  <td>Aucune</td>
                  <td style={{ color: 'var(--color-green-600)' }}>5 ans</td>
                </tr>
                <tr>
                  <td><strong>Étanchéité certifiée</strong></td>
                  <td>Variable</td>
                  <td style={{ color: 'var(--color-green-600)' }}>{kp19pro.weather_resistance.waterproof_rating}</td>
                </tr>
                <tr>
                  <td><strong>Revente possible</strong></td>
                  <td>Difficile</td>
                  <td style={{ color: 'var(--color-green-600)' }}>Bonne cote</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ marginBottom: 'var(--space-2)', color: 'var(--color-gray-800)' }}>Notre analyse</h3>
            <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--text-sm)' }}>
              Si vous valorisez votre temps à 15€/h (moins que le SMIC), le coût total d'une tente DIY
              de qualité équivalente <strong>dépasse souvent celui d'une tente du commerce</strong>.
              Le DIY n'est économiquement intéressant que si vous ne comptez pas votre temps,
              avez déjà du matériel, ou acceptez des compromis sur la qualité.
            </p>
          </div>
        </div>
      </section>

      {/* Alternative */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-3)' }}>L'alternative : une tente clé en main</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)', maxWidth: '700px' }}>
            Si vous préférez une solution fiable et immédiate, les tentes KAILOP offrent un excellent
            rapport qualité-prix avec garantie 5 ans et livraison gratuite depuis la France.
          </p>

          <div className="tente-products-grid">
            <article className="product-card-pro">
              <div className="product-card-image">
                <Image src={kp19pro.media.images.general[0]} alt="Tente de toit KAILOP KP19PRO alternative DIY" width={550} height={400} style={{ objectFit: 'cover' }} />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(kp19pro.pricing.original_eur, kp19pro.pricing.current_eur)}%</span>
                  <span className="badge-bestseller">Clé en main</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {kp19pro.model}</h3>
                <p className="product-card-subtitle">Prêt à l'emploi • Garantie 5 ans • Tout inclus</p>
                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">🛡️</span><span>Garantie 5 ans</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🚚</span><span>Livraison gratuite</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌧️</span><span>{kp19pro.weather_resistance.waterproof_rating}</span></div>
                  <div className="product-spec"><span className="product-spec-icon">⚡</span><span>Ouverture {kp19pro.opening_system_details.opening_time_seconds}s</span></div>
                </div>
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
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Questions fréquentes sur le DIY</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Peut-on vraiment fabriquer une tente de toit pour 500€ ?</summary>
              <p>Oui, mais avec des compromis majeurs. À ce budget, vous aurez une structure basique (bois ou contreplaqué), du tissu standard (pas vraiment étanche), et un système d'ouverture manuel. Pour une qualité comparable aux modèles du commerce, comptez 800-1500€ de matériaux.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Les tutoriels YouTube sont-ils fiables ?</summary>
              <p>Certains sont excellents, d'autres omettent des détails cruciaux (étanchéité, sécurité). Méfiez-vous des vidéos qui ne montrent pas la tente après plusieurs mois d'utilisation et sous la pluie. Les vrais retours d'expérience à long terme sont plus précieux.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Mon assurance couvrira-t-elle un équipement DIY ?</summary>
              <p>C'est le point sensible. En cas d'accident impliquant votre tente DIY (détachement, déséquilibre), votre assurance pourrait invoquer un défaut de conformité pour refuser l'indemnisation. Consultez votre assureur avant de vous lancer.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Combien de temps avant ma première nuit en DIY ?</summary>
              <p>Comptez 2-3 mois minimum entre la décision de construire et la première nuit en conditions réelles. Ce délai inclut la conception, les achats, la fabrication, les tests et les ajustements inévitables.</p>
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
            <Link href="/tente-de-toit-pas-cher/" className="internal-link-pro">
              <div className="internal-link-icon">💰</div>
              <div className="internal-link-text"><h4>Pas cher</h4><p>Meilleurs prix</p></div>
            </Link>
            <Link href="/tente-de-toit-rigide/" className="internal-link-pro">
              <div className="internal-link-icon">🏠</div>
              <div className="internal-link-text"><h4>Tentes rigides</h4><p>Avantages vs souples</p></div>
            </Link>
            <Link href="/kaylop-tente-de-toit-avis/" className="internal-link-pro">
              <div className="internal-link-icon">⭐</div>
              <div className="internal-link-text"><h4>Avis KAILOP</h4><p>Retours utilisateurs</p></div>
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
