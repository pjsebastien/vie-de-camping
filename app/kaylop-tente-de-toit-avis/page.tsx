import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice } from '@/lib/loadTentesData'

export const metadata: Metadata = {
  title: 'KAILOP : avis et test complet des tentes de toit',
  description: 'Avis complet sur les tentes de toit KAILOP : qualité, fiabilité et service client. Test détaillé des modèles KP19PRO et ST09PRO.',
  keywords: ['kailop avis', 'kailop tente de toit', 'avis tente kailop', 'test kailop', 'kailop qualité'],
}

export default function KaylopAvisPage() {
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
            <Link href="/meilleures-tentes-de-toit/">Tentes de toit</Link>
            <span>/</span>
            <span>Avis KAILOP</span>
          </nav>
          <div className="tente-hero-content">
            <h1>KAILOP : avis et test des tentes de toit</h1>
            <p className="tente-hero-subtitle">
              KAILOP propose des tentes de toit rigides à prix compétitif. Mais que valent-elles vraiment ?
              Analyse détaillée basée sur les spécifications et retours utilisateurs.
            </p>
          </div>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <div className="tente-intro">
            <p>
              <strong>KAILOP</strong> est une marque positionnée sur le segment des tentes de toit rigides haut de gamme
              à prix accessible. Leur promesse : "{brand.promise}" Nous avons analysé leurs deux modèles
              phares pour vous donner un avis objectif.
            </p>
          </div>

          <div className="tente-brand-overview">
            <h2>KAILOP en Bref</h2>
            <div className="brand-info-grid">
              <div className="brand-info-item">
                <span className="info-label">Positionnement</span>
                <span className="info-value">{brand.positioning}</span>
              </div>
              <div className="brand-info-item">
                <span className="info-label">Entrepôt</span>
                <span className="info-value">{brand.logistics.warehouse_location}</span>
              </div>
              <div className="brand-info-item">
                <span className="info-label">Délai livraison</span>
                <span className="info-value">{brand.logistics.delivery_delay_days}</span>
              </div>
              <div className="brand-info-item">
                <span className="info-label">Support</span>
                <span className="info-value">{brand.support.resources.join(', ')}</span>
              </div>
            </div>

            <div className="brand-badges">
              {brand.trust_badges.map((badge, i) => (
                <div key={i} className="brand-badge">
                  <strong>{badge.label}</strong>
                  <span>{badge.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Notre Avis sur les Modèles KAILOP</h2>

          {/* KP19PRO Review */}
          <div className="tente-review-card">
            <div className="review-header">
              <Image
                src={kp19pro.media.images.general[0]}
                alt="Test KAILOP KP19PRO"
                width={400}
                height={300}
                style={{ objectFit: 'cover' }}
              />
              <div className="review-summary">
                <h3>KAILOP {kp19pro.model}</h3>
                <p className="review-positioning">{kp19pro.positioning}</p>
                <div className="review-rating">
                  <span className="rating-stars">★★★★★</span>
                  <span className="rating-value">4.8/5</span>
                </div>
                <span className="review-price">{formatPrice(kp19pro.pricing.current_eur)}</span>
              </div>
            </div>

            <div className="review-content">
              <div className="review-pros-cons">
                <div className="review-pros">
                  <h4>Points Positifs</h4>
                  <ul>
                    <li>Ouverture en {kp19pro.opening_system_details.opening_time_seconds} secondes grâce aux vérins allemands</li>
                    <li>Coque aluminium légère ({kp19pro.weight.net_kg} kg) et résistante</li>
                    <li>Étanchéité {kp19pro.weather_resistance.waterproof_rating} - tient sous la pluie battante</li>
                    <li>Matelas mémoire de forme confortable ({kp19pro.comfort.mattress_thickness_cm} cm)</li>
                    <li>Profil bas fermé ({kp19pro.dimensions.closed_cm.height} cm) - aérodynamique</li>
                    <li>Tous accessoires inclus (échelle, LED, tapis...)</li>
                    <li>L'auvent arrière protège de la pluie à l'entrée</li>
                  </ul>
                </div>
                <div className="review-cons">
                  <h4>Points à Améliorer</h4>
                  <ul>
                    <li>Une seule fenêtre côté (ventilation moyenne)</li>
                    <li>Espace de rangement intérieur limité</li>
                    <li>Montage initial à deux personnes</li>
                  </ul>
                </div>
              </div>

              <div className="review-verdict">
                <h4>Notre Verdict</h4>
                <p>
                  Le KP19PRO est un excellent choix pour les couples et petites familles qui veulent
                  une tente rigide fiable sans se ruiner. L'ouverture arrière est classique mais efficace.
                  Le rapport qualité-prix est imbattable dans cette gamme.
                </p>
                <a href={kp19pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="tente-cta-button">
                  {kp19pro.affiliate.cta_label}
                </a>
              </div>
            </div>
          </div>

          {/* ST09PRO Review */}
          <div className="tente-review-card">
            <div className="review-header">
              <Image
                src={st09pro.media.images.general[0]}
                alt="Test KAILOP ST09PRO"
                width={400}
                height={300}
                style={{ objectFit: 'cover' }}
              />
              <div className="review-summary">
                <h3>KAILOP {st09pro.model}</h3>
                <p className="review-positioning">{st09pro.positioning}</p>
                <div className="review-rating">
                  <span className="rating-stars">★★★★★</span>
                  <span className="rating-value">4.9/5</span>
                </div>
                <span className="review-price">{formatPrice(st09pro.pricing.current_eur)}</span>
              </div>
            </div>

            <div className="review-content">
              <div className="review-pros-cons">
                <div className="review-pros">
                  <h4>Points Positifs</h4>
                  <ul>
                    <li>Ouverture latérale = plus d'espace intérieur utilisable</li>
                    <li>3 larges fenêtres - ventilation excellente</li>
                    <li>Surface de couchage plus grande ({st09pro.dimensions.open_cm.length} x {st09pro.dimensions.open_cm.width} cm)</li>
                    <li>Même qualité de fabrication que le KP19PRO</li>
                    <li>4 fermetures sécurité aluminium - zéro risque en roulant</li>
                    <li>Idéal pour les climats chauds ou séjours prolongés</li>
                  </ul>
                </div>
                <div className="review-cons">
                  <h4>Points à Améliorer</h4>
                  <ul>
                    <li>Légèrement plus lourd ({st09pro.weight.net_kg} kg)</li>
                    <li>200€ plus cher que le KP19PRO</li>
                    <li>Pas d'auvent naturel (ouverture latérale)</li>
                  </ul>
                </div>
              </div>

              <div className="review-verdict">
                <h4>Notre Verdict</h4>
                <p>
                  Le ST09PRO est le modèle premium de KAILOP. La différence de prix est justifiée par
                  l'espace supplémentaire et la meilleure ventilation. Si vous prévoyez des voyages dans
                  des régions chaudes ou des séjours de plusieurs nuits au même endroit, c'est le meilleur choix.
                </p>
                <a href={st09pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="tente-cta-button">
                  {st09pro.affiliate.cta_label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <h2>KP19PRO vs ST09PRO : Lequel Choisir ?</h2>

          <div className="tente-table-wrapper">
            <table className="tente-comparison-table">
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>KP19PRO</th>
                  <th>ST09PRO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ouverture</td>
                  <td>Arrière (auvent)</td>
                  <td>Latérale (espace+)</td>
                </tr>
                <tr>
                  <td>Surface</td>
                  <td>{kp19pro.dimensions.open_cm.length}x{kp19pro.dimensions.open_cm.width} cm</td>
                  <td className="highlight-good">{st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width} cm</td>
                </tr>
                <tr>
                  <td>Poids</td>
                  <td className="highlight-good">{kp19pro.weight.net_kg} kg</td>
                  <td>{st09pro.weight.net_kg} kg</td>
                </tr>
                <tr>
                  <td>Fenêtres</td>
                  <td>Double couche</td>
                  <td className="highlight-good">3 larges fenêtres</td>
                </tr>
                <tr>
                  <td>Prix</td>
                  <td className="highlight-good">{formatPrice(kp19pro.pricing.current_eur)}</td>
                  <td>{formatPrice(st09pro.pricing.current_eur)}</td>
                </tr>
                <tr>
                  <td>Idéal pour</td>
                  <td>Couples, roadtrips, climat variable</td>
                  <td>Familles, séjours longs, climats chauds</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tente-recommendation-box">
            <h3>Notre Recommandation</h3>
            <div className="recommendation-grid">
              <div className="recommendation-item">
                <h4>Choisissez le KP19PRO si...</h4>
                <ul>
                  <li>Vous voyagez en couple</li>
                  <li>Le budget est prioritaire</li>
                  <li>Vous faites beaucoup de roadtrip (arrêts courts)</li>
                  <li>Vous voyagez sous des climats variables</li>
                </ul>
              </div>
              <div className="recommendation-item">
                <h4>Choisissez le ST09PRO si...</h4>
                <ul>
                  <li>Vous êtes une famille avec enfant</li>
                  <li>Vous aimez l'espace et l'aération</li>
                  <li>Vous restez plusieurs nuits au même endroit</li>
                  <li>Vous voyagez dans des régions chaudes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Questions Fréquentes sur KAILOP</h2>

          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>KAILOP est-elle une marque fiable ?</summary>
              <p>
                Oui. KAILOP est une marque spécialisée dans les tentes de toit rigides avec un positionnement
                qualité/prix. L'entrepôt est en France, la garantie de 5 ans est effective, et le SAV est
                réactif (support par email et guides en ligne). Les composants sont de qualité (vérins allemands,
                aluminium, tissu technique).
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>D'où viennent les tentes KAILOP ?</summary>
              <p>
                Les tentes sont conçues avec des composants européens (vérins allemands notamment) et
                assemblées avec des standards de qualité premium. L'entrepôt de distribution est situé
                en France, ce qui garantit une livraison rapide et un SAV accessible.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Comment se passe le SAV en cas de problème ?</summary>
              <p>
                KAILOP propose un support par email ({brand.support.email}), des FAQ détaillées et des
                guides d'installation. La garantie 5 ans couvre la structure, la coque et les composants
                principaux. En cas de problème, le retour sous 30 jours est possible.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Pourquoi KAILOP est moins cher que les grandes marques ?</summary>
              <p>
                KAILOP utilise un modèle de vente directe (pas de réseau de revendeurs à rémunérer)
                et investit moins en marketing traditionnel. La qualité des composants est équivalente
                aux marques premium, mais les marges sont réduites.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Puis-je voir une tente KAILOP avant d'acheter ?</summary>
              <p>
                KAILOP fonctionne principalement en vente en ligne. Cependant, le retour sous 30 jours
                permet de tester la tente et de la retourner si elle ne convient pas. Certains utilisateurs
                organisent aussi des rencontres sur les forums pour voir les tentes en situation réelle.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <div className="tente-cta-box">
            <h2>Convaincu par KAILOP ?</h2>
            <p>
              Profitez de la livraison gratuite depuis la France et de la garantie 5 ans.
              Retour possible sous 30 jours si vous n'êtes pas satisfait.
            </p>
            <div className="tente-cta-buttons">
              <a
                href={kp19pro.affiliate.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="tente-cta-button tente-cta-primary"
              >
                Voir le KP19PRO ({formatPrice(kp19pro.pricing.current_eur)})
              </a>
              <a
                href={st09pro.affiliate.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="tente-cta-button tente-cta-secondary"
              >
                Voir le ST09PRO ({formatPrice(st09pro.pricing.current_eur)})
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Ressources tentes de toit</h2>
          <div className="tente-internal-links">
            <Link href="/meilleures-tentes-de-toit/" className="tente-internal-link">
              <span className="link-icon">🏆</span>
              <span className="link-text"><strong>comparatif</strong><span>Tous les modèles</span></span>
            </Link>
            <Link href="/tente-de-toit-rigide/" className="tente-internal-link">
              <span className="link-icon">🏠</span>
              <span className="link-text"><strong>Tentes Rigides</strong><span>Avantages et guide</span></span>
            </Link>
            <Link href="/tente-de-toit-pas-cher/" className="tente-internal-link">
              <span className="link-icon">💰</span>
              <span className="link-text"><strong>Tentes Pas Chères</strong><span>Options économiques</span></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
