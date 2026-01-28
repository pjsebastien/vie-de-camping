import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'
import { TenteSubNav } from '@/components/tentes/TenteSubNav'

export const metadata: Metadata = {
  title: 'Meilleure tente de toit : comparatif et avis pour bien choisir',
  description: 'Quelle est la meilleure tente de toit ? Comparatif des modèles rigides testés avec avis, prix et conseils. Trouvez la tente de toit idéale pour votre SUV, 4x4 ou van.',
  keywords: ['meilleure tente de toit', 'comparatif tente de toit', 'tente de toit rigide', 'tente de toit avis', 'KAILOP'],
  openGraph: {
    title: 'Meilleure tente de toit : comparatif et avis pour bien choisir',
    description: 'Trouvez la meilleure tente de toit pour vos aventures. Comparatif complet des modèles avec avis et conseils.',
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

      {/* Hero Section */}
      <section className="tente-hero-pro">
        <div className="container">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span>/</span>
            <span>Meilleure tente de toit</span>
          </nav>

          <div className="tente-hero-grid">
            <div className="tente-hero-text">
              <h1>Meilleure tente de toit : <span>notre sélection pour bien choisir</span></h1>
              <p className="tente-hero-lead">
                Vous cherchez la <strong>meilleure tente de toit</strong> pour transformer votre véhicule en
                véritable refuge mobile ? Après avoir testé et comparé les principaux modèles du marché,
                nous avons sélectionné les tentes de toit qui offrent le meilleur rapport qualité-prix,
                une fiabilité éprouvée et un confort optimal pour le camping itinérant.
              </p>

              <div className="hero-trust-badges">
                {brand.trust_badges.map((badge, i) => (
                  <div key={i} className="hero-badge">
                    <span className="hero-badge-icon">{i === 0 ? '🛡️' : i === 1 ? '🚚' : i === 2 ? '↩️' : '💳'}</span>
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>

              <div className="hero-cta-group">
                <a href={brand.affiliate.default_url} target="_blank" rel="noopener noreferrer nofollow" className="cta-primary-pro">
                  Voir les tentes KAILOP →
                </a>
                <Link href="#comparatif" className="cta-secondary-pro">Voir le comparatif</Link>
              </div>
            </div>

            <div className="tente-hero-image">
              <Image
                src={kp19pro.media.images.general[0]}
                alt="Meilleure tente de toit KAILOP montée sur SUV"
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

      {/* Trust Section */}
      <section className="trust-section-pro">
        <div className="container">
          <div className="trust-grid-pro">
            <div className="trust-item-pro">
              <div className="trust-icon-pro">⚡</div>
              <h3>5 secondes</h3>
              <p>Ouverture automatique par vérins hydrauliques allemands</p>
            </div>
            <div className="trust-item-pro">
              <div className="trust-icon-pro">🛏️</div>
              <h3>Matelas intégré</h3>
              <p>Mousse à mémoire de forme 5cm incluse</p>
            </div>
            <div className="trust-item-pro">
              <div className="trust-icon-pro">🌧️</div>
              <h3>4 saisons</h3>
              <p>Étanchéité PU5000+, protection UV50+</p>
            </div>
            <div className="trust-item-pro">
              <div className="trust-icon-pro">🇫🇷</div>
              <h3>Stock France</h3>
              <p>Livraison gratuite en 5-7 jours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction SEO */}
      <section className="tente-section">
        <div className="container">
          <div style={{ maxWidth: '900px' }}>
            <h2>Pourquoi investir dans une tente de toit ?</h2>
            <p>
              La tente de toit révolutionne le camping itinérant. Fini les nuits inconfortables au sol, les terrains
              inadaptés et les longues minutes de montage. Avec une <strong>tente de toit rigide</strong>, vous installez
              votre couchage en quelques secondes, dormez au sec et au chaud quelle que soit la météo, et repartez
              le matin sans effort.
            </p>
            <p>
              Pour trouver la <strong>meilleure tente de toit</strong> adaptée à vos besoins, plusieurs critères comptent :
              le type d'ouverture (arrière ou latérale), la capacité (2 à 5 places), le poids, la compatibilité avec
              votre véhicule et bien sûr le budget. Notre comparatif vous aide à faire le bon choix en toute connaissance
              de cause.
            </p>
            <p>
              Les tentes de toit KAILOP se distinguent par leurs <strong>vérins hydrauliques d'origine allemande</strong>,
              leur coque en aluminium légère et résistante, et leur matelas à mémoire de forme intégré. Avec une garantie
              de 5 ans et un stock basé en France, elles représentent un excellent choix pour les voyageurs exigeants.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation rapide */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-5)' }}>Trouvez la meilleure tente de toit selon vos besoins</h2>
          <div className="internal-links-pro">
            <Link href="/tente-de-toit-voiture/" className="internal-link-pro">
              <div className="internal-link-icon">🚗</div>
              <div className="internal-link-text">
                <h4>Pour voiture</h4>
                <p>Berlines, breaks, SUV compacts</p>
              </div>
            </Link>
            <Link href="/tente-de-toit-4x4/" className="internal-link-pro">
              <div className="internal-link-icon">🚙</div>
              <div className="internal-link-text">
                <h4>Pour 4x4</h4>
                <p>Overlanding et tout-terrain</p>
              </div>
            </Link>
            <Link href="/tente-de-toit-pour-van/" className="internal-link-pro">
              <div className="internal-link-icon">🚐</div>
              <div className="internal-link-text">
                <h4>Pour van</h4>
                <p>Fourgons et utilitaires</p>
              </div>
            </Link>
            <Link href="/tente-de-toit-rigide/" className="internal-link-pro">
              <div className="internal-link-icon">🏠</div>
              <div className="internal-link-text">
                <h4>Tentes rigides</h4>
                <p>Avantages vs souples</p>
              </div>
            </Link>
            <Link href="/tente-de-toit-2-places/" className="internal-link-pro">
              <div className="internal-link-icon">👫</div>
              <div className="internal-link-text">
                <h4>2 places</h4>
                <p>Idéal couples</p>
              </div>
            </Link>
            <Link href="/tente-de-toit-3-places/" className="internal-link-pro">
              <div className="internal-link-icon">👨‍👩‍👦</div>
              <div className="internal-link-text">
                <h4>3 places</h4>
                <p>Famille avec enfant</p>
              </div>
            </Link>
            <Link href="/tente-de-toit-pas-cher/" className="internal-link-pro">
              <div className="internal-link-icon">💰</div>
              <div className="internal-link-text">
                <h4>Petit budget</h4>
                <p>Options économiques</p>
              </div>
            </Link>
            <Link href="/kaylop-tente-de-toit-avis/" className="internal-link-pro">
              <div className="internal-link-icon">⭐</div>
              <div className="internal-link-text">
                <h4>Avis KAILOP</h4>
                <p>Retours utilisateurs</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Comparatif */}
      <section id="comparatif" className="tente-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-3)' }}>Comparatif : les meilleures tentes de toit rigides</h2>
          <p style={{ textAlign: 'center', color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)', maxWidth: '700px', margin: '0 auto var(--space-5)' }}>
            Nous avons sélectionné les <strong>meilleures tentes de toit</strong> du marché selon leurs performances,
            leur rapport qualité-prix et les retours utilisateurs. Les modèles KAILOP se distinguent par leur fiabilité
            et leur fabrication européenne.
          </p>

          {/* Tableau comparatif */}
          <div className="comparison-table-pro" style={{ marginBottom: 'var(--space-6)' }}>
            <table>
              <thead>
                <tr>
                  <th>Modèle</th>
                  <th>Ouverture</th>
                  <th>Capacité</th>
                  <th>Poids</th>
                  <th>Prix</th>
                  <th>Verdict</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>KAILOP KP19PRO</strong></td>
                  <td>Arrière</td>
                  <td>{kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} pers.</td>
                  <td>{kp19pro.weight.net_kg} kg</td>
                  <td>
                    <strong>{formatPrice(kp19pro.pricing.current_eur)}</strong>
                    <br /><small style={{ textDecoration: 'line-through', color: '#9ca3af' }}>{formatPrice(kp19pro.pricing.original_eur)}</small>
                  </td>
                  <td><span className="badge-bestseller">Meilleur rapport qualité-prix</span></td>
                </tr>
                <tr>
                  <td><strong>KAILOP ST09PRO</strong></td>
                  <td>Latérale</td>
                  <td>{st09pro.capacity.min_persons}-{st09pro.capacity.max_persons} pers.</td>
                  <td>{st09pro.weight.net_kg} kg</td>
                  <td>
                    <strong>{formatPrice(st09pro.pricing.current_eur)}</strong>
                    <br /><small style={{ textDecoration: 'line-through', color: '#9ca3af' }}>{formatPrice(st09pro.pricing.original_eur)}</small>
                  </td>
                  <td><span className="badge-premium">Meilleure ventilation</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Fiches produits */}
          <div className="tente-products-grid">
            {/* KP19PRO */}
            <article className="product-card-pro">
              <div className="product-card-image">
                <Image
                  src={kp19pro.media.images.general[0]}
                  alt={`Meilleure tente de toit KAILOP ${kp19pro.model} - ouverture arrière`}
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(kp19pro.pricing.original_eur, kp19pro.pricing.current_eur)}%</span>
                  <span className="badge-bestseller">Bestseller</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {kp19pro.model}</h3>
                <p className="product-card-subtitle">Ouverture arrière • Auvent intégré • {kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} places</p>

                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">⚡</span><span>Ouverture {kp19pro.opening_system_details.opening_time_seconds}s</span></div>
                  <div className="product-spec"><span className="product-spec-icon">⚖️</span><span>{kp19pro.weight.net_kg} kg</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🛏️</span><span>Matelas {kp19pro.comfort.mattress_thickness_cm}cm</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌧️</span><span>{kp19pro.weather_resistance.waterproof_rating}</span></div>
                  <div className="product-spec"><span className="product-spec-icon">📐</span><span>{kp19pro.dimensions.open_cm.length}x{kp19pro.dimensions.open_cm.width}cm</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🔧</span><span>Vérins allemands</span></div>
                </div>

                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)' }}>
                  La KP19PRO est notre choix pour la <strong>meilleure tente de toit</strong> rapport qualité-prix.
                  Son ouverture arrière crée un auvent naturel qui protège l'entrée de la pluie. Le profil de seulement
                  {kp19pro.dimensions.closed_cm.height} cm fermée limite la surconsommation de carburant. Idéale pour
                  les couples ou familles avec un enfant.
                </p>

                <div className="product-price-section">
                  <div className="product-price-row">
                    <span className="product-price-current">{formatPrice(kp19pro.pricing.current_eur)}</span>
                    <span className="product-price-original">{formatPrice(kp19pro.pricing.original_eur)}</span>
                    <span className="product-price-save">-{kp19pro.pricing.original_eur - kp19pro.pricing.current_eur}€</span>
                  </div>
                  <div className="product-promo-code">
                    <span className="promo-label">Code exclusif :</span>
                    <span className="promo-code-value">KAILOP120</span>
                  </div>
                </div>

                <div className="product-trust-row">
                  <span className="product-trust-item"><span className="product-trust-icon">✓</span> Garantie 5 ans</span>
                  <span className="product-trust-item"><span className="product-trust-icon">✓</span> Livraison gratuite</span>
                  <span className="product-trust-item"><span className="product-trust-icon">✓</span> Stock France</span>
                </div>

                <a href={kp19pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-product-pro">
                  Voir la KP19PRO sur KAILOP
                  <span>Code KAILOP120 = -120€ supplémentaires</span>
                </a>
              </div>
            </article>

            {/* ST09PRO */}
            <article className="product-card-pro">
              <div className="product-card-image">
                <Image
                  src={st09pro.media.images.general[0]}
                  alt={`Tente de toit KAILOP ${st09pro.model} - ouverture latérale`}
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(st09pro.pricing.original_eur, st09pro.pricing.current_eur)}%</span>
                  <span className="badge-premium">Premium</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {st09pro.model}</h3>
                <p className="product-card-subtitle">Ouverture latérale • 3 fenêtres • {st09pro.capacity.min_persons}-{st09pro.capacity.max_persons} places</p>

                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">⚡</span><span>Ouverture {st09pro.opening_system_details.opening_time_seconds}s</span></div>
                  <div className="product-spec"><span className="product-spec-icon">⚖️</span><span>{st09pro.weight.net_kg} kg</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🛏️</span><span>Matelas {st09pro.comfort.mattress_thickness_cm}cm</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌧️</span><span>{st09pro.weather_resistance.waterproof_rating}</span></div>
                  <div className="product-spec"><span className="product-spec-icon">📐</span><span>{st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width}cm</span></div>
                  <div className="product-spec"><span className="product-spec-icon">🌀</span><span>3 fenêtres ventilées</span></div>
                </div>

                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)' }}>
                  La ST09PRO est la <strong>meilleure tente de toit</strong> pour les climats chauds grâce à ses
                  3 larges fenêtres ventilées. L'ouverture latérale offre un espace intérieur généreux de
                  {st09pro.dimensions.open_cm.length}x{st09pro.dimensions.open_cm.width} cm. Parfaite pour les
                  séjours prolongés et les voyages en été.
                </p>

                <div className="product-price-section">
                  <div className="product-price-row">
                    <span className="product-price-current">{formatPrice(st09pro.pricing.current_eur)}</span>
                    <span className="product-price-original">{formatPrice(st09pro.pricing.original_eur)}</span>
                    <span className="product-price-save">-{st09pro.pricing.original_eur - st09pro.pricing.current_eur}€</span>
                  </div>
                  <div className="product-promo-code">
                    <span className="promo-label">Code exclusif :</span>
                    <span className="promo-code-value">KAILOP120</span>
                  </div>
                </div>

                <div className="product-trust-row">
                  <span className="product-trust-item"><span className="product-trust-icon">✓</span> Garantie 5 ans</span>
                  <span className="product-trust-item"><span className="product-trust-icon">✓</span> Livraison gratuite</span>
                  <span className="product-trust-item"><span className="product-trust-icon">✓</span> Stock France</span>
                </div>

                <a href={st09pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-product-pro">
                  Voir la ST09PRO sur KAILOP
                  <span>Code KAILOP120 = -120€ supplémentaires</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Vidéos */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-5)' }}>Les tentes KAILOP en action</h2>
          <div className="video-grid-pro">
            <div className="video-card-pro">
              <div className="video-wrapper-pro">
                <iframe
                  src={`https://www.youtube.com/embed/${kp19pro.media.video.youtube_id}`}
                  title={`Meilleure tente de toit KAILOP ${kp19pro.model} en action`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="video-info-pro">
                <h3>KAILOP {kp19pro.model} - Ouverture arrière</h3>
                <p>Découvrez l'ouverture automatique en 5 secondes et l'auvent intégré qui protège de la pluie.</p>
                <a href={kp19pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="tente-cta-button-small">Voir la KP19PRO</a>
              </div>
            </div>
            <div className="video-card-pro">
              <div className="video-wrapper-pro">
                <iframe
                  src={`https://www.youtube.com/embed/${st09pro.media.video.youtube_id}`}
                  title={`Tente de toit KAILOP ${st09pro.model} en action`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="video-info-pro">
                <h3>KAILOP {st09pro.model} - Ouverture latérale</h3>
                <p>L'ouverture latérale offre plus d'espace et une ventilation optimale avec 3 fenêtres.</p>
                <a href={st09pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="tente-cta-button-small">Voir la ST09PRO</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie photos */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-5)' }}>Galerie photos</h2>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h3 style={{ marginBottom: 'var(--space-3)' }}>KAILOP {kp19pro.model}</h3>
            <div className="gallery-grid-pro">
              {kp19pro.media.images.general.slice(0, 4).map((image, index) => (
                <div key={index} className="gallery-item-pro">
                  <Image src={image} alt={`KAILOP ${kp19pro.model} - Vue ${index + 1}`} width={400} height={300} style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <h4 style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)', color: 'var(--color-gray-600)' }}>Intérieur</h4>
            <div className="gallery-grid-pro" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {kp19pro.media.images.interior.map((image, index) => (
                <div key={index} className="gallery-item-pro">
                  <Image src={image} alt={`Intérieur KAILOP ${kp19pro.model}`} width={400} height={300} style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: 'var(--space-3)' }}>KAILOP {st09pro.model}</h3>
            <div className="gallery-grid-pro">
              {st09pro.media.images.general.slice(0, 4).map((image, index) => (
                <div key={index} className="gallery-item-pro">
                  <Image src={image} alt={`KAILOP ${st09pro.model} - Vue ${index + 1}`} width={400} height={300} style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <h4 style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)', color: 'var(--color-gray-600)' }}>Intérieur</h4>
            <div className="gallery-grid-pro" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {st09pro.media.images.interior.map((image, index) => (
                <div key={index} className="gallery-item-pro">
                  <Image src={image} alt={`Intérieur KAILOP ${st09pro.model}`} width={400} height={300} style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi une tente de toit - Section détaillée */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Pourquoi la tente de toit est-elle la meilleure solution pour le camping ?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>Liberté totale de mouvement</h3>
              <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-4)' }}>
                Avec une tente de toit, vous n'êtes plus dépendant des campings ou des réservations d'hôtels. Vous pouvez
                vous arrêter où bon vous semble : au bord d'un lac, dans une forêt, sur un parking avec vue sur la montagne.
                La France autorise le bivouac discret d'une nuit, et la tente de toit est parfaite pour cela puisque rien
                n'est installé au sol.
              </p>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>Confort supérieur au camping traditionnel</h3>
              <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-4)' }}>
                Oubliez les matelas gonflables qui se dégonflent, les sols inégaux et l'humidité remontante. La meilleure
                tente de toit vous offre un vrai lit avec un matelas à mémoire de forme de qualité, toujours sec et propre.
                Vous dormez en hauteur, à l'abri des insectes et des petits animaux. Le matin, vous pliez en 30 secondes
                et vous repartez.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>Économies substantielles</h3>
              <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-4)' }}>
                Une nuit d'hôtel coûte en moyenne 80-120€, un emplacement de camping 20-40€. Avec une tente de toit,
                vos nuits sont gratuites. L'investissement initial de 2000-3000€ est rentabilisé en quelques voyages.
                Sur 10 ans de durée de vie, c'est moins de 1€ par nuit !
              </p>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>Installation et désinstallation express</h3>
              <p style={{ color: 'var(--color-gray-600)' }}>
                Là où une tente classique demande 15-20 minutes de montage (trouver un terrain plat, déplier, tendre les
                haubans...), une tente de toit rigide s'ouvre en 5 secondes chrono. Vous arrivez tard le soir ? Pas de stress.
                Il pleut ? Vous êtes à l'abri en un éclair. C'est cette praticité qui fait de la tente de toit rigide la
                <strong> meilleure solution pour le camping itinérant</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment choisir */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Comment choisir la meilleure tente de toit ?</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)', maxWidth: '800px' }}>
            Pour trouver la meilleure tente de toit adaptée à votre situation, évaluez ces critères essentiels.
          </p>
          <div className="tente-criteria-grid">
            <div className="tente-criterion-card">
              <h3>Type d'ouverture</h3>
              <ul>
                <li><strong>Arrière (KP19PRO)</strong> : auvent naturel, protection pluie</li>
                <li><strong>Latérale (ST09PRO)</strong> : plus d'espace, meilleure ventilation</li>
              </ul>
              <Link href="/tente-de-toit-rigide/" className="tente-link">Rigide vs souple →</Link>
            </div>
            <div className="tente-criterion-card">
              <h3>Capacité</h3>
              <ul>
                <li><strong>2 places</strong> : couples, compact et léger</li>
                <li><strong>3 places</strong> : couple + enfant ou plus de confort</li>
              </ul>
              <div className="tente-links-row" style={{ marginTop: 'var(--space-2)' }}>
                <Link href="/tente-de-toit-2-places/">2 places</Link>
                <Link href="/tente-de-toit-3-places/">3 places</Link>
              </div>
            </div>
            <div className="tente-criterion-card">
              <h3>Compatibilité véhicule</h3>
              <ul>
                <li>Charge dynamique min. 75 kg sur barres de toit</li>
                <li>Compatible SUV, 4x4, breaks, vans</li>
              </ul>
              <div className="tente-links-row" style={{ marginTop: 'var(--space-2)' }}>
                <Link href="/tente-de-toit-voiture/">Voiture</Link>
                <Link href="/tente-de-toit-4x4/">4x4</Link>
                <Link href="/tente-de-toit-pour-van/">Van</Link>
              </div>
            </div>
            <div className="tente-criterion-card">
              <h3>Budget</h3>
              <ul>
                <li>Entrée de gamme : 1500-2000€</li>
                <li><strong>Meilleur rapport Q/P</strong> : 2000-2700€</li>
                <li>Premium : 3000€+</li>
              </ul>
              <Link href="/tente-de-toit-pas-cher/" className="tente-link">Options économiques →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Accessoires inclus */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Tout est inclus dans votre tente KAILOP</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-4)' }}>
            Les tentes KAILOP sont livrées complètes. Aucun achat supplémentaire nécessaire pour partir immédiatement.
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
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Questions fréquentes sur les tentes de toit</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Quelle est la meilleure tente de toit en termes de rapport qualité-prix ?</summary>
              <p>
                Selon notre analyse, la <strong>KAILOP KP19PRO</strong> offre le meilleur rapport qualité-prix du marché.
                À {formatPrice(kp19pro.pricing.current_eur)} (avec le code KAILOP120, soit -120€ supplémentaires), elle propose
                des vérins hydrauliques allemands, une coque aluminium, un matelas mémoire de forme et une garantie de 5 ans.
                C'est la meilleure tente de toit pour ceux qui veulent un équipement fiable sans se ruiner.
              </p>
            </details>
            <details className="tente-faq-item">
              <summary>Tente de toit rigide ou souple : laquelle choisir ?</summary>
              <p>
                La tente rigide (hardshell) est la meilleure option pour un usage régulier : ouverture en 5 secondes,
                meilleure isolation, durabilité supérieure (10-15 ans). La tente souple convient aux budgets serrés et
                aux utilisations occasionnelles. Pour la plupart des voyageurs, la rigide est un investissement plus rentable.
              </p>
            </details>
            <details className="tente-faq-item">
              <summary>Comment fonctionne le code promo KAILOP120 ?</summary>
              <p>
                Le code <strong>KAILOP120</strong> est exclusif à notre site. Il vous offre 120€ de réduction sur votre
                commande KAILOP. Cliquez sur nos liens pour activer le code automatiquement, puis saisissez-le lors du paiement.
                Ce code est cumulable avec les promotions en cours sur le site KAILOP.
              </p>
            </details>
            <details className="tente-faq-item">
              <summary>Ma voiture peut-elle supporter une tente de toit ?</summary>
              <p>
                Oui, la plupart des véhicules avec barres de toit sont compatibles. Vérifiez la charge dynamique de vos
                barres (minimum 75 kg recommandé). Les SUV, 4x4, breaks et vans conviennent parfaitement. Même certaines
                berlines peuvent accueillir une tente légère comme la KP19PRO (75 kg).
              </p>
            </details>
            <details className="tente-faq-item">
              <summary>Peut-on dormir dans une tente de toit en hiver ?</summary>
              <p>
                Oui, les meilleures tentes de toit comme les KAILOP sont conçues pour 4 saisons. L'étanchéité PU5000+
                et la coque aluminium isolent du froid. Ajoutez un sac de couchage adapté et vous serez au chaud même
                par températures négatives.
              </p>
            </details>
            <details className="tente-faq-item">
              <summary>Quelle est la durée de vie d'une tente de toit ?</summary>
              <p>
                Une tente de toit rigide de qualité dure 10 à 15 ans avec un entretien minimal. La garantie KAILOP de 5 ans
                couvre la structure, la coque et les composants principaux. C'est un investissement durable qui se rentabilise
                sur le long terme.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="tente-section" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)' }}>
        <div className="container">
          <div className="tente-cta-box">
            <h2>Trouvez votre meilleure tente de toit</h2>
            <p>Découvrez les tentes KAILOP, garanties 5 ans, livrées gratuitement depuis la France.</p>
            <div className="product-promo-code" style={{ maxWidth: '300px', margin: '0 auto var(--space-4)' }}>
              <span className="promo-label">Code exclusif :</span>
              <span className="promo-code-value">KAILOP120 = -120€</span>
            </div>
            <div className="tente-cta-buttons">
              <a href={brand.affiliate.default_url} target="_blank" rel="noopener noreferrer nofollow" className="cta-primary-pro">Voir les tentes KAILOP →</a>
              <Link href="/kaylop-tente-de-toit-avis/" className="cta-secondary-pro">Lire les avis</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Maillage interne */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>Ressources complémentaires</h2>
          <div className="internal-links-pro">
            <Link href="/tente-de-toit-rigide/" className="internal-link-pro">
              <div className="internal-link-icon">🏠</div>
              <div className="internal-link-text"><h4>Tentes rigides</h4><p>Avantages vs souples</p></div>
            </Link>
            <Link href="/tente-de-toit-4x4/" className="internal-link-pro">
              <div className="internal-link-icon">🚙</div>
              <div className="internal-link-text"><h4>Tente pour 4x4</h4><p>Overlanding</p></div>
            </Link>
            <Link href="/tente-de-toit-pas-cher/" className="internal-link-pro">
              <div className="internal-link-icon">💰</div>
              <div className="internal-link-text"><h4>Petit budget</h4><p>Options économiques</p></div>
            </Link>
            <Link href="/fabriquer-tente-toit-diy/" className="internal-link-pro">
              <div className="internal-link-icon">🔧</div>
              <div className="internal-link-text"><h4>DIY</h4><p>Fabriquer sa tente</p></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <div className="floating-cta">
        <a href={brand.affiliate.default_url} target="_blank" rel="noopener noreferrer nofollow" className="floating-cta-button">
          🎁 -120€ avec KAILOP120
        </a>
      </div>
    </main>
  )
}
