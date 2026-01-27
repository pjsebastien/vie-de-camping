import { Metadata } from 'next'
import Link from 'next/link'
import { loadTentesData, formatPrice } from '@/lib/loadTentesData'

export const metadata: Metadata = {
  title: 'Fabriquer sa Tente de Toit DIY : Guide Complet, Coûts et Réalité',
  description: 'Fabriquer sa propre tente de toit : bonne ou mauvaise idée ? Analyse complète des coûts, contraintes techniques, sécurité et comparaison honnête avec les modèles du commerce.',
  keywords: ['fabriquer tente de toit', 'tente de toit DIY', 'tente de toit maison', 'construire tente de toit', 'tente de toit fait maison'],
  openGraph: {
    title: 'Fabriquer sa Tente de Toit DIY : Le Guide Honnête',
    description: 'Tout ce qu\'il faut savoir avant de se lancer dans la fabrication d\'une tente de toit maison.',
    type: 'article',
  },
}

export default function FabriquerTenteToitDiyPage() {
  const data = loadTentesData()
  const brand = data.brand
  const kp19pro = data.models.find(m => m.model === 'KP19PRO')!

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
            <span>Fabriquer sa Tente DIY</span>
          </nav>

          <h1>Fabriquer sa Tente de Toit DIY : Bonne Idée ?</h1>
          <p className="tente-hero-subtitle">
            Construire soi-même sa tente de toit pour économiser : fantasme ou réalité ?
            Analyse objective des coûts, contraintes et risques.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="tente-section">
        <div className="container">
          <div className="tente-intro">
            <p>
              Face au prix des tentes de toit du commerce (2000-4000€), l'idée de <strong>fabriquer sa propre tente</strong>
              peut sembler séduisante. Sur YouTube et les forums, des tutoriels promettent une tente DIY pour 500€.
              Mais qu'en est-il vraiment ? Ce guide analyse <strong>objectivement</strong> les coûts réels,
              les compétences nécessaires et les risques à considérer.
            </p>
          </div>

          <div className="tente-warning-box">
            <h3>Avertissement</h3>
            <p>
              Cet article n'a pas pour but de vous décourager, mais de vous donner une vision réaliste.
              Si vous êtes bricoleur confirmé et conscient des contraintes, le DIY peut être une aventure enrichissante.
              Si vous cherchez une solution fiable et rapide, une tente du commerce sera plus adaptée.
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi le DIY attire */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Pourquoi Vouloir Fabriquer sa Tente de Toit ?</h2>

          <div className="tente-motivations-grid">
            <div className="tente-motivation-card">
              <h3>Économiser de l'argent</h3>
              <p>
                C'est la motivation principale. L'espoir de diviser le budget par 3 ou 4
                en achetant les matériaux bruts et en assemblant soi-même.
              </p>
              <p className="motivation-reality">
                <strong>Réalité :</strong> Le coût réel d'un DIY de qualité est souvent sous-estimé.
                Comptez 800-1500€ minimum pour des matériaux corrects.
              </p>
            </div>

            <div className="tente-motivation-card">
              <h3>Personnalisation totale</h3>
              <p>
                Créer une tente sur mesure, adaptée exactement à son véhicule et ses besoins spécifiques.
              </p>
              <p className="motivation-reality">
                <strong>Réalité :</strong> C'est un vrai avantage du DIY. Vous contrôlez chaque détail.
                Mais cela demande une conception préalable rigoureuse.
              </p>
            </div>

            <div className="tente-motivation-card">
              <h3>Le plaisir de construire</h3>
              <p>
                Pour les bricoleurs, la satisfaction de dormir dans quelque chose qu'on a créé de ses mains.
              </p>
              <p className="motivation-reality">
                <strong>Réalité :</strong> Si c'est votre motivation principale, foncez !
                L'expérience vaut autant que le résultat final.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Les contraintes réelles */}
      <section className="tente-section">
        <div className="container">
          <h2>Les 5 Contraintes Réelles du DIY</h2>

          <div className="tente-constraints-list">
            <div className="tente-constraint-item">
              <div className="constraint-number">1</div>
              <div className="constraint-content">
                <h3>L'Étanchéité : Le Défi Majeur</h3>
                <p>
                  C'est LE point critique. Une tente du commerce comme la KAILOP offre une étanchéité
                  <strong> {kp19pro.weather_resistance.waterproof_rating}</strong> (colonne d'eau de 5000mm).
                  Atteindre ce niveau en DIY demande :
                </p>
                <ul>
                  <li>Du tissu technique imperméable de qualité (pas du tissu de bâche basique)</li>
                  <li>Des coutures thermosoudées ou scotchées avec du seam tape</li>
                  <li>Des fermetures éclair étanches (très coûteuses)</li>
                  <li>Des joints parfaits entre la coque et le tissu</li>
                </ul>
                <p className="constraint-cost">
                  <strong>Coût estimé :</strong> 200-400€ rien que pour les tissus et joints de qualité.
                </p>
              </div>
            </div>

            <div className="tente-constraint-item">
              <div className="constraint-number">2</div>
              <div className="constraint-content">
                <h3>La Structure : Poids vs Solidité</h3>
                <p>
                  La coque doit être suffisamment légère pour ne pas surcharger le toit,
                  mais assez solide pour résister au vent, à la pluie, et à des années d'utilisation.
                </p>
                <ul>
                  <li><strong>Bois :</strong> Lourd, sensible à l'humidité, mais facile à travailler</li>
                  <li><strong>Aluminium :</strong> Léger et résistant, mais nécessite des outils spécifiques (rivetage, soudure)</li>
                  <li><strong>Contreplaqué marine :</strong> Compromis possible, mais poids élevé</li>
                </ul>
                <p className="constraint-cost">
                  <strong>Coût estimé :</strong> 300-600€ pour une structure aluminium correcte.
                </p>
              </div>
            </div>

            <div className="tente-constraint-item">
              <div className="constraint-number">3</div>
              <div className="constraint-content">
                <h3>Le Système d'Ouverture : Complexe et Coûteux</h3>
                <p>
                  Les tentes rigides du commerce utilisent des vérins hydrauliques de qualité
                  (d'origine {kp19pro.opening_system_details.origin} sur les KAILOP) pour une ouverture
                  en {kp19pro.opening_system_details.opening_time_seconds} secondes.
                </p>
                <ul>
                  <li>Vérins à gaz basiques : 30-50€ la paire, mais calibrage délicat</li>
                  <li>Vérins hydrauliques de qualité : 150-300€</li>
                  <li>Système de charnières et pivots : 50-100€</li>
                  <li>Alternative manuelle : moins cher, mais moins pratique</li>
                </ul>
                <p className="constraint-cost">
                  <strong>Coût estimé :</strong> 100-400€ selon le système choisi.
                </p>
              </div>
            </div>

            <div className="tente-constraint-item">
              <div className="constraint-number">4</div>
              <div className="constraint-content">
                <h3>La Sécurité Routière : Ne Pas Négliger</h3>
                <p>
                  Une tente mal fixée ou mal conçue peut s'ouvrir en roulant, se détacher,
                  ou déséquilibrer le véhicule. Les conséquences peuvent être graves.
                </p>
                <ul>
                  <li>Système de verrouillage fiable et redondant</li>
                  <li>Fixations sur barres de toit dimensionnées</li>
                  <li>Répartition équilibrée du poids</li>
                  <li>Test de résistance au vent (simulation ou essai réel)</li>
                </ul>
                <p className="constraint-warning">
                  <strong>Important :</strong> En cas d'accident, votre assurance pourrait refuser
                  de couvrir les dommages si l'équipement DIY est mis en cause.
                </p>
              </div>
            </div>

            <div className="tente-constraint-item">
              <div className="constraint-number">5</div>
              <div className="constraint-content">
                <h3>Le Temps : Des Semaines de Travail</h3>
                <p>
                  Ne sous-estimez pas le temps nécessaire. Entre la conception, l'achat des matériaux,
                  la fabrication et les ajustements, comptez :
                </p>
                <ul>
                  <li><strong>Conception et plans :</strong> 10-20 heures</li>
                  <li><strong>Achats et recherche de matériaux :</strong> 5-10 heures</li>
                  <li><strong>Fabrication de la structure :</strong> 20-40 heures</li>
                  <li><strong>Couture et assemblage tissu :</strong> 15-30 heures</li>
                  <li><strong>Finitions et tests :</strong> 10-20 heures</li>
                </ul>
                <p className="constraint-cost">
                  <strong>Total estimé :</strong> 60-120 heures de travail, soit 2-3 semaines à temps plein.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparatif coût réel */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>DIY vs Tente du Commerce : Le Vrai Comparatif</h2>

          <div className="tente-table-wrapper">
            <table className="tente-comparison-table">
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
                  <td className="highlight-warning">1700 - 3300€</td>
                  <td className="highlight-good">{formatPrice(kp19pro.pricing.current_eur)}</td>
                </tr>
                <tr>
                  <td><strong>Garantie</strong></td>
                  <td>Aucune</td>
                  <td className="highlight-good">5 ans</td>
                </tr>
                <tr>
                  <td><strong>Étanchéité certifiée</strong></td>
                  <td>Variable</td>
                  <td className="highlight-good">{kp19pro.weather_resistance.waterproof_rating}</td>
                </tr>
                <tr>
                  <td><strong>Revente possible</strong></td>
                  <td>Difficile</td>
                  <td className="highlight-good">Bonne cote</td>
                </tr>
                <tr>
                  <td><strong>Assurance en cas d'accident</strong></td>
                  <td className="highlight-warning">Risque de refus</td>
                  <td className="highlight-good">Couvert</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tente-analysis-box">
            <h3>Notre Analyse</h3>
            <p>
              Si vous valorisez votre temps à 15€/h (moins que le SMIC), le coût total d'une tente DIY
              de qualité équivalente <strong>dépasse souvent celui d'une tente du commerce</strong>.
              Sans compter l'absence de garantie et les risques techniques.
            </p>
            <p>
              Le DIY n'est économiquement intéressant que si :
            </p>
            <ul>
              <li>Vous ne comptez pas votre temps (passion du bricolage)</li>
              <li>Vous avez déjà du matériel et des chutes de matériaux</li>
              <li>Vous acceptez des compromis sur la qualité finale</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pour qui le DIY est adapté */}
      <section className="tente-section">
        <div className="container">
          <h2>Pour Qui le DIY Est-il Adapté ?</h2>

          <div className="tente-profiles-grid">
            <div className="tente-profile-card tente-profile-yes">
              <h3>Le DIY est fait pour vous si...</h3>
              <ul>
                <li>Vous êtes bricoleur confirmé (soudure, menuiserie, couture)</li>
                <li>Vous avez accès à un atelier équipé</li>
                <li>Le processus de création vous motive autant que le résultat</li>
                <li>Vous avez du temps libre (plusieurs mois à temps partiel)</li>
                <li>Vous cherchez une solution vraiment personnalisée</li>
                <li>Vous acceptez de faire plusieurs itérations pour perfectionner</li>
              </ul>
            </div>

            <div className="tente-profile-card tente-profile-no">
              <h3>Le DIY n'est PAS pour vous si...</h3>
              <ul>
                <li>Vous voulez une solution fiable rapidement</li>
                <li>Vous n'avez pas d'expérience en bricolage avancé</li>
                <li>La sécurité et la garantie sont prioritaires</li>
                <li>Vous prévoyez de revendre votre équipement un jour</li>
                <li>Vous partez en voyage dans les prochains mois</li>
                <li>Vous sous-estimez régulièrement le temps des projets</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative : tente d'occasion */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>L'Alternative Maligne : La Tente d'Occasion</h2>

          <div className="tente-alternative-box">
            <p>
              Si votre budget est limité mais que vous voulez une tente fiable,
              pensez au <strong>marché de l'occasion</strong>. Les tentes de toit rigides
              gardent bien leur valeur et sont souvent revendues en excellent état par des
              voyageurs qui changent de véhicule.
            </p>
            <h3>Où chercher ?</h3>
            <ul>
              <li>Leboncoin (section "Équipement caravaning")</li>
              <li>Groupes Facebook spécialisés camping/overlanding</li>
              <li>Forums de camping-caristes et 4x4istes</li>
            </ul>
            <p>
              <strong>Budget typique :</strong> 1200-1800€ pour une tente rigide de 2-3 ans en bon état.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tente-section">
        <div className="container">
          <div className="tente-cta-box">
            <h2>Vous Préférez une Solution Clé en Main ?</h2>
            <p>
              Les tentes KAILOP offrent un excellent rapport qualité-prix avec garantie 5 ans,
              livraison gratuite depuis la France, et tout le nécessaire inclus.
            </p>
            <div className="tente-cta-buttons">
              <a
                href={brand.affiliate.default_url}
                target="_blank"
                rel="noopener noreferrer"
                className="tente-cta-button tente-cta-primary"
              >
                Découvrir les tentes KAILOP
              </a>
              <Link href="/meilleures-tentes-de-toit/" className="tente-cta-button tente-cta-secondary">
                Voir le comparatif complet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Questions Fréquentes sur le DIY</h2>

          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Peut-on vraiment fabriquer une tente de toit pour 500€ ?</summary>
              <p>
                Oui, mais avec des compromis majeurs. À ce budget, vous aurez une structure basique
                (bois ou contreplaqué), du tissu standard (pas vraiment étanche), et un système
                d'ouverture manuel. La durabilité et le confort seront limités.
                Pour une qualité comparable aux modèles du commerce, comptez <strong>800-1500€ de matériaux</strong>.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Les tutoriels YouTube sont-ils fiables ?</summary>
              <p>
                Certains sont excellents, d'autres omettent des détails cruciaux (étanchéité, sécurité).
                Méfiez-vous des vidéos qui ne montrent pas la tente après plusieurs mois d'utilisation
                et sous la pluie. Les vrais retours d'expérience à long terme sont plus précieux.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Mon assurance couvrira-t-elle un équipement DIY ?</summary>
              <p>
                C'est le point sensible. En cas d'accident impliquant votre tente DIY
                (détachement, déséquilibre du véhicule), votre assurance pourrait invoquer
                un <strong>défaut de conformité</strong> pour refuser l'indemnisation.
                Consultez votre assureur avant de vous lancer.
              </p>
            </details>

            <details className="tente-faq-item">
              <summary>Combien de temps avant ma première nuit en DIY ?</summary>
              <p>
                Comptez <strong>2-3 mois minimum</strong> entre la décision de construire et la première
                nuit en conditions réelles. Ce délai inclut la conception, les achats, la fabrication,
                les tests et les ajustements inévitables.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Maillage interne */}
      <section className="tente-section">
        <div className="container">
          <h2>Continuez Votre Recherche</h2>
          <div className="tente-internal-links">
            <Link href="/meilleures-tentes-de-toit/" className="tente-internal-link">
              <span className="link-icon">🏆</span>
              <span className="link-text">
                <strong>Comparatif Tentes de Toit</strong>
                <span>Les meilleurs modèles 2025</span>
              </span>
            </Link>
            <Link href="/tente-de-toit-rigide/" className="tente-internal-link">
              <span className="link-icon">🏠</span>
              <span className="link-text">
                <strong>Tentes Rigides</strong>
                <span>Avantages des modèles hardshell</span>
              </span>
            </Link>
            <Link href="/tente-de-toit-pas-cher/" className="tente-internal-link">
              <span className="link-icon">💰</span>
              <span className="link-text">
                <strong>Tentes Pas Chères</strong>
                <span>Options économiques du commerce</span>
              </span>
            </Link>
            <Link href="/kaylop-tente-de-toit-avis/" className="tente-internal-link">
              <span className="link-icon">⭐</span>
              <span className="link-text">
                <strong>Avis KAILOP</strong>
                <span>Retours d'utilisateurs</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
