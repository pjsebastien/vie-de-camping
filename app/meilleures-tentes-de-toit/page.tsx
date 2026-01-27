import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'

export const metadata: Metadata = {
  title: 'Meilleures tentes de toit : comparatif et sélection des modèles',
  description: 'Comparatif des meilleures tentes de toit rigides. Choisissez votre tente de toit : critères, modèles testés, prix et conseils d\'experts pour SUV, 4x4 et van.',
  keywords: ['tente de toit', 'comparatif tente de toit', 'meilleure tente de toit', 'tente de toit rigide', 'tente de toit 4x4', 'tente de toit voiture'],
  openGraph: {
    title: 'Meilleures tentes de toit : comparatif et sélection',
    description: 'Comparatif complet pour choisir la meilleure tente de toit. Avis et conseils d\'experts.',
    type: 'article',
  },
}

export default function MeilleuresTentesToitPage() {
  const data = loadTentesData()
  const brand = data.brand
  const models = data.models

  const kp19pro = models.find(m => m.model === 'KP19PRO')!
  const st09pro = models.find(m => m.model === 'ST09PRO')!

  return (
    <main className="tente-page">
      {/* Hero Section */}
      <section className="tente-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span>/</span>
            <Link href="/materiel-camping/">Matériel camping</Link>
            <span>/</span>
            <span>Tentes de toit</span>
          </nav>

          <div className="tente-hero-content">
            <h1>Meilleures tentes de toit : le comparatif complet</h1>
            <p className="tente-hero-subtitle">
              Transformez votre véhicule en refuge mobile. Comparez les meilleures tentes de toit rigides,
              testées et approuvées pour SUV, 4x4 et van.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="tente-section">
        <div className="container">
          <div className="tente-intro">
            <p>
              La <strong>tente de toit</strong> révolutionne le camping itinérant. Plus besoin de chercher un terrain plat,
              de monter une tente au sol ou de réserver un hébergement. En quelques secondes, votre véhicule se transforme
              en chambre avec vue. Trouvez la <strong>meilleure tente de toit</strong> selon votre véhicule,
              votre budget et vos besoins.
            </p>
          </div>

          {/* Navigation rapide */}
          <div className="tente-nav-box">
            <h2>Accès rapide</h2>
            <div className="tente-nav-grid">
              <div className="tente-nav-column">
                <h3>Par type de véhicule</h3>
                <ul>
                  <li><Link href="/tente-de-toit-voiture/">Tente de toit pour voiture</Link></li>
                  <li><Link href="/tente-de-toit-4x4/">Tente de toit pour 4x4</Link></li>
                  <li><Link href="/tente-de-toit-pour-van/">Tente de toit pour van</Link></li>
                </ul>
              </div>
              <div className="tente-nav-column">
                <h3>Par nombre de places</h3>
                <ul>
                  <li><Link href="/tente-de-toit-2-places/">Tente de toit 2 places</Link></li>
                  <li><Link href="/tente-de-toit-3-places/">Tente de toit 3 places</Link></li>
                  <li><Link href="/tente-de-toit-4-places/">Tente de toit 4 places</Link></li>
                  <li><Link href="/tente-de-toit-5-places/">Tente de toit 5 places</Link></li>
                </ul>
              </div>
              <div className="tente-nav-column">
                <h3>Guides spécialisés</h3>
                <ul>
                  <li><Link href="/tente-de-toit-rigide/">Tentes de toit rigides</Link></li>
                  <li><Link href="/tente-de-toit-pas-cher/">Tentes de toit pas chères</Link></li>
                  <li><Link href="/fabriquer-tente-toit-diy/">Fabriquer sa tente (DIY)</Link></li>
                  <li><Link href="/kaylop-tente-de-toit-avis/">Avis KAILOP</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparatif des modèles */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Comparatif des Meilleures Tentes de Toit Rigides</h2>
          <p className="section-intro">
            Nous avons analysé les meilleures tentes de toit rigides du marché. Voici notre sélection 2025,
            basée sur le rapport qualité-prix, la durabilité et le confort.
          </p>

          {/* Tableau comparatif */}
          <div className="tente-table-wrapper">
            <table className="tente-comparison-table">
              <thead>
                <tr>
                  <th>Modèle</th>
                  <th>Ouverture</th>
                  <th>Capacité</th>
                  <th>Poids</th>
                  <th>Prix</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>KAILOP KP19PRO</strong>
                    <span className="badge badge-best">Meilleur rapport qualité-prix</span>
                  </td>
                  <td>Arrière</td>
                  <td>{kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} pers.</td>
                  <td>{kp19pro.weight.net_kg} kg</td>
                  <td>
                    <span className="price-current">{formatPrice(kp19pro.pricing.current_eur)}</span>
                    <span className="price-original">{formatPrice(kp19pro.pricing.original_eur)}</span>
                  </td>
                  <td><span className="rating">4.8/5</span></td>
                </tr>
                <tr>
                  <td>
                    <strong>KAILOP ST09PRO</strong>
                    <span className="badge badge-premium">Premium</span>
                  </td>
                  <td>Latérale</td>
                  <td>{st09pro.capacity.min_persons}-{st09pro.capacity.max_persons} pers.</td>
                  <td>{st09pro.weight.net_kg} kg</td>
                  <td>
                    <span className="price-current">{formatPrice(st09pro.pricing.current_eur)}</span>
                    <span className="price-original">{formatPrice(st09pro.pricing.original_eur)}</span>
                  </td>
                  <td><span className="rating">4.9/5</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Fiches produits */}
          <div className="tente-products-grid">
            {/* KP19PRO */}
            <article className="tente-product-card">
              <div className="tente-product-image">
                <Image
                  src={kp19pro.media.images.general[0]}
                  alt={`Tente de toit KAILOP ${kp19pro.model}`}
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tente-product-badge">-{getDiscountPercentage(kp19pro.pricing.original_eur, kp19pro.pricing.current_eur)}%</span>
              </div>
              <div className="tente-product-content">
                <h3>KAILOP {kp19pro.model} - Ouverture Arrière</h3>
                <p className="tente-product-positioning">{kp19pro.positioning}</p>

                <ul className="tente-product-features">
                  <li>Ouverture en {kp19pro.opening_system_details.opening_time_seconds} secondes</li>
                  <li>Capacité : {kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} personnes</li>
                  <li>Matelas mémoire de forme {kp19pro.comfort.mattress_thickness_cm} cm</li>
                  <li>Étanchéité {kp19pro.weather_resistance.waterproof_rating}</li>
                  <li>Coque aluminium {kp19pro.weight.net_kg} kg</li>
                  <li>Compatible SUV, 4x4, barres de toit</li>
                </ul>

                <div className="tente-product-price-box">
                  <div className="tente-product-prices">
                    <span className="price-current-large">{formatPrice(kp19pro.pricing.current_eur)}</span>
                    <span className="price-original-large">{formatPrice(kp19pro.pricing.original_eur)}</span>
                  </div>
                  <span className="tente-product-delivery">Livraison gratuite</span>
                </div>

                <div className="tente-product-badges">
                  {brand.trust_badges.slice(0, 3).map((badge, i) => (
                    <span key={i} className="trust-badge">{badge.label}</span>
                  ))}
                </div>

                <a
                  href={kp19pro.affiliate.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="tente-cta-button"
                >
                  {kp19pro.affiliate.cta_label}
                </a>
              </div>
            </article>

            {/* ST09PRO */}
            <article className="tente-product-card">
              <div className="tente-product-image">
                <Image
                  src={st09pro.media.images.general[0]}
                  alt={`Tente de toit KAILOP ${st09pro.model}`}
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tente-product-badge">-{getDiscountPercentage(st09pro.pricing.original_eur, st09pro.pricing.current_eur)}%</span>
              </div>
              <div className="tente-product-content">
                <h3>KAILOP {st09pro.model} - Ouverture Latérale</h3>
                <p className="tente-product-positioning">{st09pro.positioning}</p>

                <ul className="tente-product-features">
                  <li>Ouverture latérale en {st09pro.opening_system_details.opening_time_seconds} secondes</li>
                  <li>Capacité : {st09pro.capacity.min_persons}-{st09pro.capacity.max_persons} personnes</li>
                  <li>3 larges fenêtres ventilées</li>
                  <li>Étanchéité {st09pro.weather_resistance.waterproof_rating}</li>
                  <li>Coque aluminium {st09pro.weight.net_kg} kg</li>
                  <li>4 fermetures sécurité aluminium</li>
                </ul>

                <div className="tente-product-price-box">
                  <div className="tente-product-prices">
                    <span className="price-current-large">{formatPrice(st09pro.pricing.current_eur)}</span>
                    <span className="price-original-large">{formatPrice(st09pro.pricing.original_eur)}</span>
                  </div>
                  <span className="tente-product-delivery">Livraison gratuite</span>
                </div>

                <div className="tente-product-badges">
                  {brand.trust_badges.slice(0, 3).map((badge, i) => (
                    <span key={i} className="trust-badge">{badge.label}</span>
                  ))}
                </div>

                <a
                  href={st09pro.affiliate.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="tente-cta-button"
                >
                  {st09pro.affiliate.cta_label}
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Pourquoi choisir une tente de toit */}
      <section className="tente-section">
        <div className="container">
          <h2>Pourquoi Choisir une Tente de Toit ?</h2>

          <div className="tente-benefits-grid">
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🚀</div>
              <h3>Installation Ultra-Rapide</h3>
              <p>
                Fini les 20 minutes de montage. Une tente de toit rigide s'ouvre en <strong>moins de 5 secondes</strong>
                grâce aux vérins hydrauliques. Arrivez, ouvrez, dormez.
              </p>
            </div>

            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🏔️</div>
              <h3>Dormez N'importe Où</h3>
              <p>
                Terrain en pente, sol humide, cailloux... peu importe. Votre lit est sur le toit,
                toujours <strong>plat et au sec</strong>. Plus de compromis sur le spot.
              </p>
            </div>

            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🛡️</div>
              <h3>Sécurité Renforcée</h3>
              <p>
                Surélevé à 2 mètres du sol, vous êtes <strong>à l'abri des animaux</strong> et des intempéries.
                La coque rigide protège des éléments et des intrusions.
              </p>
            </div>

            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">💰</div>
              <h3>Économies à Long Terme</h3>
              <p>
                Plus de frais d'hôtel ni de camping. Une tente de toit est <strong>rentabilisée en quelques voyages</strong>.
                Liberté totale, budget maîtrisé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment choisir */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Comment Choisir sa Tente de Toit ?</h2>

          <div className="tente-criteria-list">
            <div className="tente-criterion">
              <h3>1. Type d'ouverture</h3>
              <p>
                <strong>Ouverture arrière (KP19PRO)</strong> : classique, offre un auvent naturel. Idéale pour les climats variables.<br />
                <strong>Ouverture latérale (ST09PRO)</strong> : plus d'espace intérieur, meilleure ventilation avec 3 fenêtres.
              </p>
              <Link href="/tente-de-toit-rigide/" className="tente-link">En savoir plus sur les tentes rigides →</Link>
            </div>

            <div className="tente-criterion">
              <h3>2. Capacité</h3>
              <p>
                Les tentes {kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} places conviennent aux couples et petites familles.
                Pour les familles nombreuses, consultez nos guides par capacité.
              </p>
              <div className="tente-links-row">
                <Link href="/tente-de-toit-2-places/">2 places</Link>
                <Link href="/tente-de-toit-3-places/">3 places</Link>
                <Link href="/tente-de-toit-4-places/">4 places</Link>
                <Link href="/tente-de-toit-5-places/">5 places</Link>
              </div>
            </div>

            <div className="tente-criterion">
              <h3>3. Compatibilité véhicule</h3>
              <p>
                Vérifiez la <strong>charge dynamique</strong> de vos barres de toit (minimum 75 kg recommandé).
                Les tentes KAILOP sont compatibles avec la plupart des SUV, 4x4 et véhicules équipés de barres.
              </p>
              <div className="tente-links-row">
                <Link href="/tente-de-toit-voiture/">Voiture</Link>
                <Link href="/tente-de-toit-4x4/">4x4</Link>
                <Link href="/tente-de-toit-pour-van/">Van</Link>
              </div>
            </div>

            <div className="tente-criterion">
              <h3>4. Budget</h3>
              <p>
                Une tente de toit rigide de qualité coûte entre 2000€ et 3500€. C'est un investissement,
                mais la durabilité (garantie 5 ans) et les économies réalisées le justifient.
              </p>
              <Link href="/tente-de-toit-pas-cher/" className="tente-link">Voir les options économiques →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Spécifications techniques détaillées */}
      <section className="tente-section">
        <div className="container">
          <h2>Spécifications Techniques Complètes</h2>

          <div className="tente-specs-comparison">
            <div className="tente-specs-card">
              <h3>KAILOP KP19PRO</h3>
              <table className="tente-specs-table">
                <tbody>
                  <tr>
                    <td>Dimensions ouvert</td>
                    <td>{kp19pro.dimensions.open_cm.length} x {kp19pro.dimensions.open_cm.width} x {kp19pro.dimensions.open_cm.height} cm</td>
                  </tr>
                  <tr>
                    <td>Dimensions fermé</td>
                    <td>{kp19pro.dimensions.closed_cm.length} x {kp19pro.dimensions.closed_cm.width} x {kp19pro.dimensions.closed_cm.height} cm</td>
                  </tr>
                  <tr>
                    <td>Poids net</td>
                    <td>{kp19pro.weight.net_kg} kg</td>
                  </tr>
                  <tr>
                    <td>Matériaux coque</td>
                    <td>{kp19pro.materials.shell} + {kp19pro.materials.base}</td>
                  </tr>
                  <tr>
                    <td>Tissu</td>
                    <td>{kp19pro.materials.fabric}</td>
                  </tr>
                  <tr>
                    <td>Matelas</td>
                    <td>{kp19pro.materials.mattress} ({kp19pro.comfort.mattress_thickness_cm} cm)</td>
                  </tr>
                  <tr>
                    <td>Étanchéité</td>
                    <td>{kp19pro.weather_resistance.waterproof_rating}</td>
                  </tr>
                  <tr>
                    <td>Protection UV</td>
                    <td>{kp19pro.weather_resistance.uv_protection}</td>
                  </tr>
                  <tr>
                    <td>Vérins</td>
                    <td>{kp19pro.opening_system_details.type} ({kp19pro.opening_system_details.origin})</td>
                  </tr>
                  <tr>
                    <td>Échelle</td>
                    <td>{kp19pro.installation.ladder.material}, {kp19pro.installation.ladder.length_m}m</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="tente-specs-card">
              <h3>KAILOP ST09PRO</h3>
              <table className="tente-specs-table">
                <tbody>
                  <tr>
                    <td>Dimensions ouvert</td>
                    <td>{st09pro.dimensions.open_cm.length} x {st09pro.dimensions.open_cm.width} x {st09pro.dimensions.open_cm.height} cm</td>
                  </tr>
                  <tr>
                    <td>Dimensions fermé</td>
                    <td>{st09pro.dimensions.closed_cm.length} x {st09pro.dimensions.closed_cm.width} x {st09pro.dimensions.closed_cm.height} cm</td>
                  </tr>
                  <tr>
                    <td>Poids net</td>
                    <td>{st09pro.weight.net_kg} kg</td>
                  </tr>
                  <tr>
                    <td>Matériaux coque</td>
                    <td>{st09pro.materials.shell} + {st09pro.materials.base}</td>
                  </tr>
                  <tr>
                    <td>Tissu</td>
                    <td>{st09pro.materials.fabric}</td>
                  </tr>
                  <tr>
                    <td>Matelas</td>
                    <td>{st09pro.materials.mattress} ({st09pro.comfort.mattress_thickness_cm} cm)</td>
                  </tr>
                  <tr>
                    <td>Étanchéité</td>
                    <td>{st09pro.weather_resistance.waterproof_rating}</td>
                  </tr>
                  <tr>
                    <td>Protection UV</td>
                    <td>{st09pro.weather_resistance.uv_protection}</td>
                  </tr>
                  <tr>
                    <td>Vérins</td>
                    <td>{st09pro.opening_system_details.type} ({st09pro.opening_system_details.origin})</td>
                  </tr>
                  <tr>
                    <td>Échelle</td>
                    <td>{st09pro.installation.ladder.material}, {st09pro.installation.ladder.length_m}m</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Accessoires inclus */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Accessoires Inclus avec Chaque Tente</h2>
          <p className="section-intro">
            Les tentes KAILOP sont livrées avec tout le nécessaire pour partir immédiatement.
            Aucun achat supplémentaire requis.
          </p>

          <div className="tente-accessories-grid">
            {kp19pro.included_accessories.map((accessory, index) => (
              <div key={index} className="tente-accessory-item">
                <span className="accessory-check">✓</span>
                <span>{accessory}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tente-section">
        <div className="container">
          <h2>Questions Fréquentes sur les Tentes de Toit</h2>

          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Quelle est la différence entre une tente de toit souple et rigide ?</summary>
              <p>
                Une <strong>tente de toit rigide</strong> (hardshell) possède une coque dure qui s'ouvre via des vérins.
                Elle est plus rapide à déployer (5 secondes vs 5-10 minutes), plus aérodynamique fermée, et mieux isolée.
                Une tente souple est moins chère mais demande plus de manipulation et résiste moins bien aux intempéries.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Ma voiture peut-elle supporter une tente de toit ?</summary>
              <p>
                La plupart des véhicules avec barres de toit peuvent accueillir une tente. Vérifiez la <strong>charge dynamique</strong>
                de vos barres (minimum 75 kg recommandé). En statique (à l'arrêt), les barres supportent généralement 3 fois plus.
                Les SUV, 4x4, breaks et vans sont parfaitement adaptés.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Combien de temps pour installer une tente de toit ?</summary>
              <p>
                La première installation (fixation sur les barres) prend environ <strong>30 minutes à deux personnes</strong>.
                Ensuite, l'ouverture/fermeture quotidienne se fait <strong>en 5 secondes</strong> par une seule personne
                grâce aux vérins hydrauliques.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Peut-on dormir dans une tente de toit en hiver ?</summary>
              <p>
                Oui. Les tentes KAILOP sont <strong>4 saisons</strong> avec une étanchéité PU5000+. Le matelas à mémoire de forme
                isole du froid. Pour un confort optimal par temps froid, ajoutez un sac de couchage adapté et une couverture isolante.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Est-ce légal de dormir n'importe où avec une tente de toit ?</summary>
              <p>
                En France, le bivouac est généralement toléré s'il est <strong>discret, d'une nuit, sans installation au sol</strong>.
                Les tentes de toit facilitent le bivouac légal car rien n'est posé au sol. Évitez les zones protégées,
                propriétés privées et interdictions locales.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Quelle est la durée de vie d'une tente de toit ?</summary>
              <p>
                Une tente de toit rigide de qualité dure <strong>10 à 15 ans</strong> avec un entretien minimal.
                La garantie KAILOP de 5 ans couvre la structure, la coque et les composants principaux.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="tente-section tente-cta-section">
        <div className="container">
          <div className="tente-cta-box">
            <h2>Prêt à Transformer Votre Véhicule en Refuge Mobile ?</h2>
            <p>
              Découvrez les tentes de toit KAILOP, garanties 5 ans, livrées gratuitement depuis la France.
            </p>
            <div className="tente-cta-buttons">
              <a
                href={brand.affiliate.default_url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="tente-cta-button tente-cta-primary"
              >
                Voir les tentes KAILOP
              </a>
              <Link href="/kaylop-tente-de-toit-avis/" className="tente-cta-button tente-cta-secondary">
                Lire les avis clients
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Maillage interne */}
      <section className="tente-section">
        <div className="container">
          <h2>Explorer Nos Guides Tentes de Toit</h2>
          <div className="tente-internal-links">
            <Link href="/tente-de-toit-rigide/" className="tente-internal-link">
              <span className="link-icon">🏠</span>
              <span className="link-text">
                <strong>Tentes de Toit Rigides</strong>
                <span>Avantages, inconvénients et comparatif</span>
              </span>
            </Link>
            <Link href="/tente-de-toit-4x4/" className="tente-internal-link">
              <span className="link-icon">🚙</span>
              <span className="link-text">
                <strong>Tente de Toit pour 4x4</strong>
                <span>Guide spécial tout-terrain</span>
              </span>
            </Link>
            <Link href="/tente-de-toit-pas-cher/" className="tente-internal-link">
              <span className="link-icon">💰</span>
              <span className="link-text">
                <strong>Tentes de Toit Pas Chères</strong>
                <span>Les meilleures options économiques</span>
              </span>
            </Link>
            <Link href="/fabriquer-tente-toit-diy/" className="tente-internal-link">
              <span className="link-icon">🔧</span>
              <span className="link-text">
                <strong>Fabriquer sa Tente de Toit</strong>
                <span>DIY : fausse bonne idée ?</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
