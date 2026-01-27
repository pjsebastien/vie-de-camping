import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'

export const metadata: Metadata = {
  title: 'Tente de toit rigide : avantages et inconvénients',
  description: 'Tout savoir sur les tentes de toit rigides (hardshell). Avantages vs tentes souples, critères de choix, meilleurs modèles et conseils d\'installation.',
  keywords: ['tente de toit rigide', 'hardshell', 'tente de toit coque dure', 'comparatif tente rigide', 'avantages tente rigide'],
  openGraph: {
    title: 'Tente de toit rigide : avantages et inconvénients',
    description: 'Découvrez pourquoi les tentes de toit rigides dominent le marché. Comparatif des meilleurs modèles et conseils pour bien choisir.',
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
      {/* Hero Section */}
      <section className="tente-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span>/</span>
            <Link href="/meilleures-tentes-de-toit/">Tentes de Toit</Link>
            <span>/</span>
            <span>Tentes Rigides</span>
          </nav>

          <div className="tente-hero-content"><h1>Tente de toit rigide : le meilleur pour le camping</h1></div>
          <p className="tente-hero-subtitle">
            Pourquoi les tentes de toit rigides (hardshell) sont devenues la référence pour le camping itinérant.
            Avantages, inconvénients et comparatif des meilleurs modèles.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="tente-section">
        <div className="container">
          <div className="tente-intro">
            <p>
              La <strong>tente de toit rigide</strong>, aussi appelée "hardshell", est équipée d'une coque dure
              (généralement en aluminium ou fibre de verre) qui s'ouvre automatiquement via des vérins hydrauliques.
              Contrairement aux tentes souples qui nécessitent un dépliage manuel, les modèles rigides s'installent
              en <strong>quelques secondes</strong>, offrant un gain de temps considérable et une protection supérieure.
            </p>
          </div>
        </div>
      </section>

      {/* Rigide vs Souple */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Tente de toit rigide vs souple : comparatif</h2>

          <div className="tente-table-wrapper">
            <table className="tente-comparison-table">
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
                  <td className="highlight-good">5 secondes</td>
                  <td>5-15 minutes</td>
                </tr>
                <tr>
                  <td><strong>Temps de fermeture</strong></td>
                  <td className="highlight-good">30 secondes</td>
                  <td>5-10 minutes</td>
                </tr>
                <tr>
                  <td><strong>Aérodynamisme fermée</strong></td>
                  <td className="highlight-good">Excellent (profil bas)</td>
                  <td>Moyen (volume visible)</td>
                </tr>
                <tr>
                  <td><strong>Résistance intempéries</strong></td>
                  <td className="highlight-good">Excellente (coque dure)</td>
                  <td>Bonne</td>
                </tr>
                <tr>
                  <td><strong>Isolation thermique</strong></td>
                  <td className="highlight-good">Supérieure</td>
                  <td>Standard</td>
                </tr>
                <tr>
                  <td><strong>Durabilité</strong></td>
                  <td className="highlight-good">10-15 ans</td>
                  <td>5-10 ans</td>
                </tr>
                <tr>
                  <td><strong>Prix moyen</strong></td>
                  <td>2000-4000€</td>
                  <td className="highlight-good">800-2000€</td>
                </tr>
                <tr>
                  <td><strong>Poids</strong></td>
                  <td>60-90 kg</td>
                  <td className="highlight-good">30-50 kg</td>
                </tr>
                <tr>
                  <td><strong>Espace intérieur</strong></td>
                  <td>Standard</td>
                  <td className="highlight-good">Souvent plus grand</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tente-verdict-box">
            <h3>Notre Verdict</h3>
            <p>
              Si vous prévoyez un <strong>usage régulier</strong> (plus de 10 nuits par an), la tente rigide est
              le meilleur investissement. Le gain de temps quotidien et la durabilité supérieure compensent
              largement la différence de prix. Pour un usage occasionnel, une tente souple peut suffire.
            </p>
          </div>
        </div>
      </section>

      {/* Avantages détaillés */}
      <section className="tente-section">
        <div className="container">
          <h2>Les 7 Avantages d'une Tente de Toit Rigide</h2>

          <div className="tente-advantages-list">
            <div className="tente-advantage-item">
              <div className="advantage-number">1</div>
              <div className="advantage-content">
                <h3>Déploiement Instantané</h3>
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
                <h3>Protection Maximale</h3>
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
                <h3>Aérodynamisme Optimisé</h3>
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
                <h3>Utilisation 4 Saisons</h3>
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
                <h3>Durabilité Exceptionnelle</h3>
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
                <h3>Confort Supérieur</h3>
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
                <h3>Sécurité Renforcée</h3>
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

      {/* Inconvénients honnêtes */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Les Limites à Connaître</h2>
          <p className="section-intro">
            Par souci d'honnêteté, voici les points à considérer avant d'investir dans une tente rigide.
          </p>

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
                rentabilisent rapidement l'investissement.
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
          <h2>Nos Recommandations : Tentes de Toit Rigides KAILOP</h2>
          <p className="section-intro">
            Après avoir testé de nombreux modèles, nous recommandons les tentes KAILOP pour leur excellent
            rapport qualité-prix et leur fabrication européenne.
          </p>

          <div className="tente-products-grid">
            {/* KP19PRO */}
            <article className="tente-product-card">
              <div className="tente-product-image">
                <Image
                  src={kp19pro.media.images.general[0]}
                  alt={`Tente de toit rigide KAILOP ${kp19pro.model}`}
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tente-product-badge">Ouverture Arrière</span>
              </div>
              <div className="tente-product-content">
                <h3>KAILOP {kp19pro.model}</h3>
                <p className="tente-product-positioning">{kp19pro.positioning}</p>

                <div className="tente-product-highlights">
                  <span className="highlight">Coque {kp19pro.materials.shell}</span>
                  <span className="highlight">{kp19pro.weight.net_kg} kg</span>
                  <span className="highlight">{kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} places</span>
                </div>

                <p>
                  L'ouverture arrière crée un <strong>auvent naturel</strong> qui protège l'entrée de la pluie.
                  Idéale pour les climats variables, elle offre un excellent compromis entre espace et praticité.
                </p>

                <div className="tente-product-price-box">
                  <div className="tente-product-prices">
                    <span className="price-current-large">{formatPrice(kp19pro.pricing.current_eur)}</span>
                    <span className="price-original-large">{formatPrice(kp19pro.pricing.original_eur)}</span>
                  </div>
                  <span className="tente-product-delivery">{kp19pro.pricing.delivery}</span>
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
                  alt={`Tente de toit rigide KAILOP ${st09pro.model}`}
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tente-product-badge">Ouverture Latérale</span>
              </div>
              <div className="tente-product-content">
                <h3>KAILOP {st09pro.model}</h3>
                <p className="tente-product-positioning">{st09pro.positioning}</p>

                <div className="tente-product-highlights">
                  <span className="highlight">Coque {st09pro.materials.shell}</span>
                  <span className="highlight">{st09pro.weight.net_kg} kg</span>
                  <span className="highlight">{st09pro.capacity.min_persons}-{st09pro.capacity.max_persons} places</span>
                </div>

                <p>
                  L'ouverture latérale offre un <strong>espace intérieur optimisé</strong> et une meilleure
                  ventilation grâce aux 3 larges fenêtres. Parfaite pour les climats chauds ou les séjours prolongés.
                </p>

                <div className="tente-product-price-box">
                  <div className="tente-product-prices">
                    <span className="price-current-large">{formatPrice(st09pro.pricing.current_eur)}</span>
                    <span className="price-original-large">{formatPrice(st09pro.pricing.original_eur)}</span>
                  </div>
                  <span className="tente-product-delivery">{st09pro.pricing.delivery}</span>
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

      {/* Critères de choix */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Comment Choisir sa Tente de Toit Rigide ?</h2>

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
          <h2>Questions Fréquentes sur les Tentes Rigides</h2>

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
          <h2>Continuez Votre Recherche</h2>
          <div className="tente-internal-links">
            <Link href="/meilleures-tentes-de-toit/" className="tente-internal-link">
              <span className="link-icon">🏆</span>
              <span className="link-text">
                <strong>comparatif</strong>
                <span>Toutes les meilleures tentes de toit</span>
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
                <strong>Tentes Pas Chères</strong>
                <span>Options économiques qualité/prix</span>
              </span>
            </Link>
            <Link href="/kaylop-tente-de-toit-avis/" className="tente-internal-link">
              <span className="link-icon">⭐</span>
              <span className="link-text">
                <strong>Avis KAILOP</strong>
                <span>Ce que pensent les utilisateurs</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
