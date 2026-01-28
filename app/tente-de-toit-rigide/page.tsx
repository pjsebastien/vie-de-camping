import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'
import { TenteSubNav } from '@/components/tentes/TenteSubNav'

export const metadata: Metadata = {
  title: 'Tente de toit rigide : avantages, prix et meilleurs modèles',
  description: 'Tout savoir sur les tentes de toit rigides (hardshell). Comparatif rigide vs souple, avantages, inconvénients et meilleurs modèles à choisir.',
  keywords: ['tente de toit rigide', 'hardshell', 'tente de toit coque dure', 'comparatif tente rigide', 'avantages tente rigide'],
  openGraph: {
    title: 'Tente de toit rigide : avantages, prix et meilleurs modèles',
    description: 'Découvrez pourquoi les tentes de toit rigides dominent le marché. Comparatif et conseils pour bien choisir.',
    type: 'article',
  },
}

export default function TenteToitRigidePage() {
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
          <span className="promo-text">
            <strong>-120€</strong> sur votre tente de toit rigide
          </span>
          <span className="promo-code">KAILOP120</span>
          <span className="promo-text">
            Code exclusif activé au clic
          </span>
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
            <Link href="/meilleures-tentes-de-toit/">Tentes de Toit</Link>
            <span>/</span>
            <span>Tentes Rigides</span>
          </nav>

          <div className="tente-hero-grid">
            <div className="tente-hero-text">
              <h1>
                Tente de toit rigide : <span>le choix des voyageurs exigeants</span>
              </h1>
              <p className="tente-hero-lead">
                Une tente de toit rigide (hardshell) s'ouvre en 5 secondes, résiste à toutes les conditions
                météo et dure 10 à 15 ans. Découvrez pourquoi elle domine le marché et comment bien la choisir.
              </p>

              <div className="hero-trust-badges">
                <div className="hero-badge">
                  <span className="hero-badge-icon">⚡</span>
                  <span>Ouverture 5 sec</span>
                </div>
                <div className="hero-badge">
                  <span className="hero-badge-icon">🛡️</span>
                  <span>Coque aluminium</span>
                </div>
                <div className="hero-badge">
                  <span className="hero-badge-icon">🌧️</span>
                  <span>4 saisons</span>
                </div>
              </div>

              <div className="hero-cta-group">
                <a
                  href={brand.affiliate.default_url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="cta-primary-pro"
                >
                  Voir les tentes rigides KAILOP
                  <span>→</span>
                </a>
                <Link href="#comparatif" className="cta-secondary-pro">
                  Rigide vs Souple
                </Link>
              </div>
            </div>

            <div className="tente-hero-image">
              <Image
                src={kp19pro.media.images.general[1]}
                alt="Tente de toit rigide KAILOP ouverte"
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
          <div className="tente-intro" style={{ maxWidth: '900px' }}>
            <p>
              La <strong>tente de toit rigide</strong>, aussi appelée "hardshell", possède une coque dure
              (généralement en aluminium ou fibre de verre) qui s'ouvre automatiquement via des vérins hydrauliques.
              Contrairement aux tentes souples qui nécessitent un dépliage manuel de plusieurs minutes,
              les modèles rigides s'installent en <strong>quelques secondes</strong>, offrant un gain de temps
              considérable et une protection supérieure contre les éléments.
            </p>
          </div>
        </div>
      </section>

      {/* Rigide vs Souple */}
      <section id="comparatif" className="tente-section tente-section-alt">
        <div className="container">
          <div className="section-header-pro">
            <h2>Tente de toit rigide vs souple</h2>
            <p>Comparez objectivement les deux types pour faire le bon choix selon vos besoins.</p>
          </div>

          <div className="comparison-table-pro">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Tente Rigide (Hardshell)</th>
                  <th>Tente Souple (Softshell)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Temps d'ouverture</strong></td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>5 secondes</td>
                  <td>5-15 minutes</td>
                </tr>
                <tr>
                  <td><strong>Temps de fermeture</strong></td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>30 secondes</td>
                  <td>5-10 minutes</td>
                </tr>
                <tr>
                  <td><strong>Aérodynamisme fermée</strong></td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>Excellent (profil bas)</td>
                  <td>Moyen (volume visible)</td>
                </tr>
                <tr>
                  <td><strong>Résistance intempéries</strong></td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>Excellente (coque dure)</td>
                  <td>Bonne</td>
                </tr>
                <tr>
                  <td><strong>Isolation thermique</strong></td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>Supérieure</td>
                  <td>Standard</td>
                </tr>
                <tr>
                  <td><strong>Durabilité</strong></td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>10-15 ans</td>
                  <td>5-10 ans</td>
                </tr>
                <tr>
                  <td><strong>Prix moyen</strong></td>
                  <td>2000-4000€</td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>800-2000€</td>
                </tr>
                <tr>
                  <td><strong>Poids</strong></td>
                  <td>60-90 kg</td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>30-50 kg</td>
                </tr>
                <tr>
                  <td><strong>Espace intérieur</strong></td>
                  <td>Standard</td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>Souvent plus grand</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tente-verdict-box" style={{ marginTop: 'var(--space-6)' }}>
            <h3>Notre verdict</h3>
            <p>
              Si vous prévoyez un <strong>usage régulier</strong> (plus de 10 nuits par an), la tente rigide est
              le meilleur investissement. Le gain de temps quotidien et la durabilité supérieure compensent
              largement la différence de prix. Pour un usage occasionnel avec budget serré, une tente souple peut convenir.
            </p>
          </div>
        </div>
      </section>

      {/* 7 Avantages */}
      <section className="tente-section">
        <div className="container">
          <div className="section-header-pro">
            <h2>Les 7 avantages d'une tente de toit rigide</h2>
            <p>Pourquoi les voyageurs expérimentés choisissent majoritairement les modèles hardshell.</p>
          </div>

          <div className="tente-advantages-list">
            <div className="tente-advantage-item">
              <div className="advantage-number">1</div>
              <div className="advantage-content">
                <h3>Déploiement instantané</h3>
                <p>
                  Grâce aux vérins hydrauliques (d'origine allemande sur les modèles KAILOP), l'ouverture se fait
                  en <strong>{kp19pro.opening_system_details.opening_time_seconds} secondes</strong> par une seule personne.
                  Vous arrivez sur votre spot, vous déverrouillez, la tente s'ouvre seule.
                  Plus de bataille avec des arceaux ou des toiles.
                </p>
              </div>
            </div>

            <div className="tente-advantage-item">
              <div className="advantage-number">2</div>
              <div className="advantage-content">
                <h3>Protection maximale</h3>
                <p>
                  La coque en <strong>{kp19pro.materials.shell}</strong> protège de la grêle, des branches,
                  et offre une isolation thermique supérieure. L'étanchéité <strong>{kp19pro.weather_resistance.waterproof_rating}</strong>
                  garantit une protection totale même sous des trombes d'eau.
                </p>
              </div>
            </div>

            <div className="tente-advantage-item">
              <div className="advantage-number">3</div>
              <div className="advantage-content">
                <h3>Aérodynamisme optimisé</h3>
                <p>
                  Fermée, une tente rigide ne fait que <strong>{kp19pro.dimensions.closed_cm.height} cm de haut</strong>
                  (KP19PRO). Ce profil bas réduit la prise au vent et la consommation de carburant
                  (jusqu'à 10% d'économie par rapport à une tente souple).
                </p>
              </div>
            </div>

            <div className="tente-advantage-item">
              <div className="advantage-number">4</div>
              <div className="advantage-content">
                <h3>Utilisation 4 saisons</h3>
                <p>
                  Conçues pour affronter toutes les conditions, les tentes rigides sont
                  <strong> résistantes au vent, à la pluie, à la neige et aux UV ({kp19pro.weather_resistance.uv_protection})</strong>.
                  La coque isole du froid en hiver et de la chaleur en été.
                </p>
              </div>
            </div>

            <div className="tente-advantage-item">
              <div className="advantage-number">5</div>
              <div className="advantage-content">
                <h3>Durabilité exceptionnelle</h3>
                <p>
                  Avec une garantie de <strong>5 ans</strong> et une durée de vie de 10-15 ans,
                  une tente rigide est un investissement rentable. Les composants (vérins, charnières, tissu)
                  sont conçus pour résister à des milliers de cycles d'ouverture.
                </p>
              </div>
            </div>

            <div className="tente-advantage-item">
              <div className="advantage-number">6</div>
              <div className="advantage-content">
                <h3>Confort supérieur</h3>
                <p>
                  Les tentes rigides intègrent un matelas permanent (mousse à mémoire de forme de
                  <strong> {kp19pro.comfort.mattress_thickness_cm} cm</strong> sur les KAILOP).
                  Vous retrouvez votre lit fait chaque soir, avec rangements intégrés et éclairage LED.
                </p>
              </div>
            </div>

            <div className="tente-advantage-item">
              <div className="advantage-number">7</div>
              <div className="advantage-content">
                <h3>Sécurité renforcée</h3>
                <p>
                  Le système de verrouillage ({kp19pro.security.fixation_system}) empêche toute ouverture
                  accidentelle en roulage. La structure rigide offre également une meilleure résistance
                  aux tentatives d'intrusion qu'une simple toile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limites à connaître */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <div className="section-header-pro">
            <h2>Les limites à connaître</h2>
            <p>Par souci d'honnêteté, voici les points à considérer avant d'investir dans une tente rigide.</p>
          </div>

          <div className="tente-limits-grid">
            <div className="tente-limit-card">
              <h3>Poids plus élevé</h3>
              <p>
                Avec {kp19pro.weight.net_kg}-{st09pro.weight.net_kg} kg, les tentes rigides pèsent plus lourd
                que les modèles souples. Vérifiez la capacité de charge de vos barres de toit.
              </p>
              <p className="limit-solution">
                <strong>Solution :</strong> Les barres de toit modernes supportent 75-100 kg en dynamique,
                largement suffisant.
              </p>
            </div>

            <div className="tente-limit-card">
              <h3>Prix plus élevé</h3>
              <p>
                Comptez 2000-3500€ pour une tente rigide de qualité, contre 800-1500€ pour une tente souple.
              </p>
              <p className="limit-solution">
                <strong>Solution :</strong> La durabilité (10-15 ans) et les économies d'hébergement
                rentabilisent rapidement l'investissement. Code KAILOP120 = -120€.
              </p>
            </div>

            <div className="tente-limit-card">
              <h3>Hauteur véhicule augmentée</h3>
              <p>
                Même fermée, la tente ajoute {kp19pro.dimensions.closed_cm.height}-{st09pro.dimensions.closed_cm.height} cm
                de hauteur. Attention aux parkings souterrains.
              </p>
              <p className="limit-solution">
                <strong>Solution :</strong> Mesurez votre véhicule équipé et repérez les parkings adaptés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos recommandations */}
      <section className="tente-section">
        <div className="container">
          <div className="section-header-pro">
            <h2>Nos recommandations : tentes de toit rigides KAILOP</h2>
            <p>
              Après avoir analysé le marché, nous recommandons les tentes KAILOP pour leur excellent
              rapport qualité-prix, leurs vérins allemands et leur fabrication européenne.
            </p>
          </div>

          <div className="tente-products-grid">
            {/* KP19PRO */}
            <article className="product-card-pro">
              <div className="product-card-image">
                <Image
                  src={kp19pro.media.images.general[0]}
                  alt={`Tente de toit rigide KAILOP ${kp19pro.model}`}
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(kp19pro.pricing.original_eur, kp19pro.pricing.current_eur)}%</span>
                  <span className="badge-bestseller">Ouverture Arrière</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {kp19pro.model}</h3>
                <p className="product-card-subtitle">{kp19pro.positioning}</p>

                <div className="product-specs-grid">
                  <div className="product-spec">
                    <span className="product-spec-icon">⚡</span>
                    <span>Ouverture {kp19pro.opening_system_details.opening_time_seconds}s</span>
                  </div>
                  <div className="product-spec">
                    <span className="product-spec-icon">⚖️</span>
                    <span>{kp19pro.weight.net_kg} kg</span>
                  </div>
                  <div className="product-spec">
                    <span className="product-spec-icon">👥</span>
                    <span>{kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} places</span>
                  </div>
                  <div className="product-spec">
                    <span className="product-spec-icon">🌧️</span>
                    <span>{kp19pro.weather_resistance.waterproof_rating}</span>
                  </div>
                </div>

                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-4)' }}>
                  L'ouverture arrière crée un <strong>auvent naturel</strong> qui protège l'entrée de la pluie.
                  Idéale pour les climats variables.
                </p>

                <div className="product-price-section">
                  <div className="product-price-row">
                    <span className="product-price-current">{formatPrice(kp19pro.pricing.current_eur)}</span>
                    <span className="product-price-original">{formatPrice(kp19pro.pricing.original_eur)}</span>
                  </div>
                  <div className="product-promo-code">
                    <span className="promo-label">Code exclusif :</span>
                    <span className="promo-code-value">KAILOP120</span>
                  </div>
                </div>

                <a
                  href={kp19pro.affiliate.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="cta-product-pro"
                >
                  Voir la KP19PRO
                  <span>-120€ avec KAILOP120</span>
                </a>
              </div>
            </article>

            {/* ST09PRO */}
            <article className="product-card-pro">
              <div className="product-card-image">
                <Image
                  src={st09pro.media.images.general[0]}
                  alt={`Tente de toit rigide KAILOP ${st09pro.model}`}
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(st09pro.pricing.original_eur, st09pro.pricing.current_eur)}%</span>
                  <span className="badge-premium">Ouverture Latérale</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {st09pro.model}</h3>
                <p className="product-card-subtitle">{st09pro.positioning}</p>

                <div className="product-specs-grid">
                  <div className="product-spec">
                    <span className="product-spec-icon">⚡</span>
                    <span>Ouverture {st09pro.opening_system_details.opening_time_seconds}s</span>
                  </div>
                  <div className="product-spec">
                    <span className="product-spec-icon">⚖️</span>
                    <span>{st09pro.weight.net_kg} kg</span>
                  </div>
                  <div className="product-spec">
                    <span className="product-spec-icon">👥</span>
                    <span>{st09pro.capacity.min_persons}-{st09pro.capacity.max_persons} places</span>
                  </div>
                  <div className="product-spec">
                    <span className="product-spec-icon">🌀</span>
                    <span>3 fenêtres ventilées</span>
                  </div>
                </div>

                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-4)' }}>
                  L'ouverture latérale offre un <strong>espace intérieur optimisé</strong> et une meilleure
                  ventilation. Parfaite pour les climats chauds.
                </p>

                <div className="product-price-section">
                  <div className="product-price-row">
                    <span className="product-price-current">{formatPrice(st09pro.pricing.current_eur)}</span>
                    <span className="product-price-original">{formatPrice(st09pro.pricing.original_eur)}</span>
                  </div>
                  <div className="product-promo-code">
                    <span className="promo-label">Code exclusif :</span>
                    <span className="promo-code-value">KAILOP120</span>
                  </div>
                </div>

                <a
                  href={st09pro.affiliate.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="cta-product-pro"
                >
                  Voir la ST09PRO
                  <span>-120€ avec KAILOP120</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Critères de choix */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <div className="section-header-pro">
            <h2>Comment choisir sa tente de toit rigide ?</h2>
            <p>Les critères clés pour sélectionner le modèle adapté à vos besoins.</p>
          </div>

          <div className="tente-criteria-grid">
            <div className="tente-criterion-card">
              <h3>Type d'ouverture</h3>
              <ul>
                <li><strong>Arrière :</strong> auvent intégré, protection pluie, classique</li>
                <li><strong>Latérale :</strong> plus d'espace, meilleure ventilation</li>
                <li><strong>Pop-up :</strong> ouverture verticale, moins courant</li>
              </ul>
            </div>

            <div className="tente-criterion-card">
              <h3>Matériau de la coque</h3>
              <ul>
                <li><strong>Aluminium :</strong> léger, résistant, excellent rapport qualité-prix</li>
                <li><strong>Fibre de verre :</strong> très léger, mais plus fragile aux chocs</li>
                <li><strong>ABS :</strong> économique, moins durable</li>
              </ul>
            </div>

            <div className="tente-criterion-card">
              <h3>Système d'ouverture</h3>
              <ul>
                <li><strong>Vérins hydrauliques :</strong> ouverture automatique, fiable</li>
                <li><strong>Vérins à gaz :</strong> plus courant, nécessite assistance</li>
                <li><strong>Charnières manuelles :</strong> économique, moins pratique</li>
              </ul>
            </div>

            <div className="tente-criterion-card">
              <h3>Étanchéité</h3>
              <ul>
                <li><strong>PU3000 :</strong> pluie légère à modérée</li>
                <li><strong>PU5000+ :</strong> toutes conditions, recommandé</li>
                <li>Vérifiez aussi les joints et fermetures éclair</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tente-section">
        <div className="container">
          <div className="section-header-pro">
            <h2>Questions fréquentes sur les tentes rigides</h2>
          </div>

          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Une tente rigide s'ouvre-t-elle vraiment en 5 secondes ?</summary>
              <p>
                Oui, avec des vérins hydrauliques de qualité. Les modèles KAILOP utilisent des
                <strong> vérins pneumatiques hydrauliques d'origine allemande</strong> qui permettent
                une ouverture automatique en {kp19pro.opening_system_details.opening_time_seconds} secondes.
                Il suffit de déverrouiller les attaches et la tente s'ouvre seule.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Peut-on laisser ses affaires dans la tente fermée ?</summary>
              <p>
                Oui, c'est l'un des grands avantages des tentes rigides. Le matelas, la literie et
                vos affaires légères restent en place. Évitez toutefois les objets lourds ou de valeur
                pour ne pas surcharger le toit en roulant.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Quelle différence entre ouverture arrière et latérale ?</summary>
              <p>
                <strong>Ouverture arrière (KP19PRO)</strong> : la coque s'ouvre vers l'arrière du véhicule,
                créant un auvent naturel. Meilleure protection contre la pluie à l'entrée.<br /><br />
                <strong>Ouverture latérale (ST09PRO)</strong> : la coque s'ouvre sur le côté,
                offrant plus d'espace intérieur et une meilleure circulation d'air.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Combien de temps dure une tente de toit rigide ?</summary>
              <p>
                Avec un entretien minimal (nettoyage, lubrification des vérins), une tente rigide
                de qualité dure <strong>10 à 15 ans</strong>. La garantie KAILOP de 5 ans couvre
                la structure et les composants principaux.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Faut-il des barres de toit spéciales ?</summary>
              <p>
                Non, les tentes rigides sont compatibles avec la plupart des barres de toit standard.
                Vérifiez simplement que vos barres supportent au moins <strong>75 kg en charge dynamique</strong>
                (en roulant) et que l'espacement correspond aux points de fixation de la tente.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Maillage interne */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <div className="section-header-pro">
            <h2>Continuez votre recherche</h2>
          </div>

          <div className="internal-links-pro">
            <Link href="/meilleures-tentes-de-toit/" className="internal-link-pro">
              <div className="internal-link-icon">🏆</div>
              <div className="internal-link-text">
                <h4>Comparatif complet</h4>
                <p>Toutes les meilleures tentes de toit</p>
              </div>
            </Link>
            <Link href="/tente-de-toit-4x4/" className="internal-link-pro">
              <div className="internal-link-icon">🚙</div>
              <div className="internal-link-text">
                <h4>Tente de toit pour 4x4</h4>
                <p>Overlanding et tout-terrain</p>
              </div>
            </Link>
            <Link href="/tente-de-toit-pas-cher/" className="internal-link-pro">
              <div className="internal-link-icon">💰</div>
              <div className="internal-link-text">
                <h4>Tentes petit budget</h4>
                <p>Options économiques qualité/prix</p>
              </div>
            </Link>
            <Link href="/kaylop-tente-de-toit-avis/" className="internal-link-pro">
              <div className="internal-link-icon">⭐</div>
              <div className="internal-link-text">
                <h4>Avis KAILOP</h4>
                <p>Ce que pensent les utilisateurs</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <div className="floating-cta">
        <a
          href={brand.affiliate.default_url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="floating-cta-button"
        >
          🎁 -120€ avec KAILOP120
        </a>
      </div>
    </main>
  )
}
