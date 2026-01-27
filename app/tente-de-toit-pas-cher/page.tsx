import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'

export const metadata: Metadata = {
  title: 'Tente de Toit Pas Cher : Meilleures Options Qualité-Prix 2025',
  description: 'Tente de toit pas cher : les meilleures options sans sacrifier la qualité. Comparatif des tentes économiques, pièges à éviter et vraies bonnes affaires.',
  keywords: ['tente de toit pas cher', 'tente de toit prix', 'tente de toit économique', 'tente de toit budget', 'tente toit bon rapport qualité prix'],
}

export default function TenteToitPasCherPage() {
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
            <span>Pas Cher</span>
          </nav>
          <h1>Tente de Toit Pas Cher : Les Vraies Bonnes Affaires</h1>
          <p className="tente-hero-subtitle">
            Budget serré mais envie de liberté ? Découvrez comment trouver une tente de toit
            économique sans tomber dans les pièges de la mauvaise qualité.
          </p>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <div className="tente-intro">
            <p>
              Une <strong>tente de toit pas chère</strong> existe-t-elle vraiment ? Oui, mais avec des nuances.
              Les prix varient de 500€ (entrée de gamme douteuse) à 5000€ (luxe). Ce guide vous aide à trouver
              le <strong>meilleur rapport qualité-prix</strong> sans mauvaises surprises.
            </p>
          </div>

          <div className="tente-price-ranges">
            <h2>Comprendre les Gammes de Prix</h2>
            <div className="price-range-grid">
              <div className="price-range-card price-range-low">
                <h3>500€ - 1000€</h3>
                <p className="range-label">Entrée de gamme</p>
                <ul>
                  <li>Tentes souples manuelles</li>
                  <li>Qualité variable (souvent médiocre)</li>
                  <li>Étanchéité limitée</li>
                  <li>Durée de vie : 2-5 ans</li>
                </ul>
                <p className="range-verdict verdict-warning">⚠️ Risqué - À éviter pour usage régulier</p>
              </div>

              <div className="price-range-card price-range-mid">
                <h3>1000€ - 2000€</h3>
                <p className="range-label">Milieu de gamme</p>
                <ul>
                  <li>Tentes souples de qualité</li>
                  <li>Premières rigides basiques</li>
                  <li>Étanchéité correcte</li>
                  <li>Durée de vie : 5-8 ans</li>
                </ul>
                <p className="range-verdict verdict-ok">✓ Acceptable pour usage occasionnel</p>
              </div>

              <div className="price-range-card price-range-good">
                <h3>2000€ - 3000€</h3>
                <p className="range-label">Rapport qualité-prix optimal</p>
                <ul>
                  <li>Tentes rigides de qualité</li>
                  <li>Vérins hydrauliques fiables</li>
                  <li>Étanchéité PU5000+</li>
                  <li>Durée de vie : 10-15 ans</li>
                </ul>
                <p className="range-verdict verdict-good">★ Meilleur investissement</p>
              </div>

              <div className="price-range-card price-range-premium">
                <h3>3000€ +</h3>
                <p className="range-label">Premium / Luxe</p>
                <ul>
                  <li>Finitions haut de gamme</li>
                  <li>Options (chauffage, isolation...)</li>
                  <li>Grandes capacités (4+ places)</li>
                  <li>Marques prestigieuses</li>
                </ul>
                <p className="range-verdict">Pour les passionnés sans contrainte budget</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Les Pièges à Éviter</h2>

          <div className="tente-warnings-list">
            <div className="tente-warning-item">
              <h3>🚫 Les marques inconnues sur Amazon/AliExpress</h3>
              <p>
                Des tentes à 600-800€ avec des photos alléchantes mais aucun SAV en France.
                En cas de problème, vous êtes seul. L'étanchéité est souvent catastrophique
                dès la première vraie pluie.
              </p>
            </div>

            <div className="tente-warning-item">
              <h3>🚫 Les "promotions" de -70%</h3>
              <p>
                Un prix barré de 3000€ pour une tente vendue 900€ ? C'est un prix fictif.
                Les vraies promotions sur les tentes de toit sérieuses dépassent rarement -15%.
              </p>
            </div>

            <div className="tente-warning-item">
              <h3>🚫 Les tentes d'occasion sans vérification</h3>
              <p>
                Une occasion peut être une bonne affaire, mais vérifiez l'étanchéité (test au jet d'eau),
                les vérins, les fermetures éclair et le tissu. Demandez les preuves d'achat pour la garantie.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <h2>Notre Recommandation : Le Meilleur Rapport Qualité-Prix</h2>
          <p className="section-intro">
            Après analyse du marché, les tentes KAILOP offrent le meilleur compromis entre prix,
            qualité et garantie. Fabriquées en Europe, garanties 5 ans, livrées depuis la France.
          </p>

          <div className="tente-products-grid">
            <article className="tente-product-card">
              <div className="tente-product-image">
                <Image
                  src={kp19pro.media.images.general[0]}
                  alt="Tente de toit pas cher KAILOP KP19PRO"
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tente-product-badge">Meilleur Prix</span>
              </div>
              <div className="tente-product-content">
                <h3>KAILOP {kp19pro.model}</h3>
                <p className="tente-product-positioning">
                  Le modèle le plus accessible de la gamme premium. Qualité identique aux modèles
                  vendus 3500€ chez d'autres marques.
                </p>

                <div className="tente-value-props">
                  <div className="value-prop">
                    <span className="value-icon">💰</span>
                    <span>Économie de {formatPrice(kp19pro.pricing.original_eur - kp19pro.pricing.current_eur)} vs prix initial</span>
                  </div>
                  <div className="value-prop">
                    <span className="value-icon">🛡️</span>
                    <span>Garantie 5 ans incluse</span>
                  </div>
                  <div className="value-prop">
                    <span className="value-icon">🚚</span>
                    <span>Livraison gratuite France</span>
                  </div>
                  <div className="value-prop">
                    <span className="value-icon">↩️</span>
                    <span>Retour 30 jours si insatisfait</span>
                  </div>
                </div>

                <ul className="tente-product-features">
                  <li>Coque aluminium, vérins allemands</li>
                  <li>Étanchéité {kp19pro.weather_resistance.waterproof_rating}</li>
                  <li>Matelas mémoire de forme inclus</li>
                  <li>Tous accessoires fournis</li>
                </ul>

                <div className="tente-product-price-box">
                  <div className="tente-product-prices">
                    <span className="price-current-large">{formatPrice(kp19pro.pricing.current_eur)}</span>
                    <span className="price-original-large">{formatPrice(kp19pro.pricing.original_eur)}</span>
                  </div>
                  <span className="price-savings">-{getDiscountPercentage(kp19pro.pricing.original_eur, kp19pro.pricing.current_eur)}%</span>
                </div>

                <a
                  href={kp19pro.affiliate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tente-cta-button"
                >
                  {kp19pro.affiliate.cta_label}
                </a>
              </div>
            </article>
          </div>

          <div className="tente-comparison-note">
            <h3>Pourquoi {formatPrice(kp19pro.pricing.current_eur)} est un bon prix ?</h3>
            <p>
              Pour une tente rigide de cette qualité (coque alu, vérins hydrauliques allemands,
              PU5000+, garantie 5 ans), les marques concurrentes demandent 3000-4000€.
              KAILOP propose le même niveau de qualité avec un positionnement prix agressif.
            </p>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Alternatives pour Petits Budgets</h2>

          <div className="tente-alternatives-grid">
            <div className="tente-alternative-card">
              <h3>L'Occasion</h3>
              <p>Budget : 1200-1800€</p>
              <p>
                Une tente rigide de 2-3 ans en bon état sur Leboncoin ou forums spécialisés.
                Vérifiez l'étanchéité et demandez les factures.
              </p>
              <p className="alternative-tip">💡 Recherchez "tente de toit rigide" sur Leboncoin</p>
            </div>

            <div className="tente-alternative-card">
              <h3>La Location</h3>
              <p>Budget : 50-100€/nuit</p>
              <p>
                Tester avant d'acheter ou pour un usage ponctuel. Plusieurs loueurs en France
                proposent des tentes de toit à la semaine.
              </p>
              <p className="alternative-tip">💡 Location = test grandeur nature</p>
            </div>

            <div className="tente-alternative-card">
              <h3>Le Paiement Fractionné</h3>
              <p>Budget : à partir de ~100€/mois</p>
              <p>
                KAILOP propose le paiement en plusieurs fois. Répartissez l'investissement
                sur 10-24 mois sans vous priver.
              </p>
              <p className="alternative-tip">💡 {brand.trust_badges.find(b => b.label.includes('Paiement'))?.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <h2>Questions Fréquentes</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Peut-on vraiment trouver une bonne tente de toit à moins de 1500€ ?</summary>
              <p>Difficilement en neuf pour une tente rigide. Les modèles sous 1500€ sont soit des tentes souples (moins pratiques), soit des marques inconnues sans garantie fiable. L'occasion reste une option pour ce budget.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Les tentes KAILOP sont-elles vraiment de bonne qualité ?</summary>
              <p>Oui. Malgré leur prix inférieur aux grandes marques, les KAILOP utilisent les mêmes composants : coque aluminium, vérins hydrauliques allemands, tissu technique PU5000+. La différence de prix vient du modèle de distribution directe (pas d'intermédiaire) et du marketing moins coûteux.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Vaut-il mieux acheter une tente souple pas chère ou économiser pour une rigide ?</summary>
              <p>Si vous prévoyez un usage régulier (10+ nuits/an), économisez pour une rigide. La différence de confort, de rapidité d'installation et de durabilité justifie l'investissement. Pour 2-3 nuits par an, une souple peut suffire.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Guides Connexes</h2>
          <div className="tente-internal-links">
            <Link href="/meilleures-tentes-de-toit/" className="tente-internal-link">
              <span className="link-icon">🏆</span>
              <span className="link-text"><strong>Comparatif Complet</strong><span>Tous les modèles 2025</span></span>
            </Link>
            <Link href="/tente-de-toit-rigide/" className="tente-internal-link">
              <span className="link-icon">🏠</span>
              <span className="link-text"><strong>Tentes Rigides</strong><span>Pourquoi investir ?</span></span>
            </Link>
            <Link href="/fabriquer-tente-toit-diy/" className="tente-internal-link">
              <span className="link-icon">🔧</span>
              <span className="link-text"><strong>DIY</strong><span>Fabriquer soi-même ?</span></span>
            </Link>
            <Link href="/kaylop-tente-de-toit-avis/" className="tente-internal-link">
              <span className="link-icon">⭐</span>
              <span className="link-text"><strong>Avis KAILOP</strong><span>Retours utilisateurs</span></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
