import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice, getDiscountPercentage } from '@/lib/loadTentesData'
import { TenteSubNav } from '@/components/tentes/TenteSubNav'

export const metadata: Metadata = {
  title: 'Tente de toit pour voiture : compatibilité et meilleurs modèles',
  description: 'Quelle tente de toit pour voiture choisir ? Découvrez les critères de compatibilité, la charge maximale et les meilleurs modèles pour berlines, breaks et SUV.',
  keywords: ['tente de toit voiture', 'tente de toit pour voiture', 'tente voiture', 'camping voiture toit', 'tente toit SUV'],
}

export default function TenteToitVoiturePage() {
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
            <span>Pour Voiture</span>
          </nav>

          <div className="tente-hero-grid">
            <div className="tente-hero-text">
              <h1>Tente de toit pour voiture : <span>compatibilité et installation</span></h1>
              <p className="tente-hero-lead">
                Oui, vous pouvez installer une <strong>tente de toit sur votre voiture</strong> ! Berline, break, SUV compact :
                la plupart des véhicules équipés de barres de toit peuvent accueillir une tente rigide. Découvrez les critères
                de compatibilité et nos recommandations pour trouver le modèle adapté à votre véhicule.
              </p>

              <div className="hero-trust-badges">
                <div className="hero-badge"><span className="hero-badge-icon">⚖️</span><span>À partir de 75 kg</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">📐</span><span>Profil bas 13 cm</span></div>
                <div className="hero-badge"><span className="hero-badge-icon">🚗</span><span>Compatible tous véhicules</span></div>
              </div>

              <div className="hero-cta-group">
                <a href={kp19pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-primary-pro">
                  Voir la KP19PRO (idéale voiture) →
                </a>
                <Link href="#compatibilite" className="cta-secondary-pro">Vérifier compatibilité</Link>
              </div>
            </div>

            <div className="tente-hero-image">
              <Image
                src={kp19pro.media.images.general[2]}
                alt="Tente de toit pour voiture KAILOP installée sur SUV"
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
            <h2>Peut-on vraiment installer une tente de toit sur une voiture ?</h2>
            <p>
              Contrairement aux idées reçues, une <strong>tente de toit</strong> n'est pas réservée aux 4x4 et aux vans
              aménagés. La grande majorité des voitures modernes peuvent accueillir une tente de toit, à condition
              de respecter quelques critères techniques simples. L'élément clé est la capacité de charge de vos barres de toit.
            </p>
            <p>
              Les barres de toit ont deux valeurs de charge : la <strong>charge dynamique</strong> (en roulant) et la
              <strong> charge statique</strong> (à l'arrêt). Pour une tente de toit comme la KAILOP KP19PRO de 75 kg,
              vos barres doivent supporter au minimum 75 kg en dynamique. À l'arrêt, elles supportent généralement
              3 fois plus, ce qui est largement suffisant pour dormir à 2-3 personnes.
            </p>
            <p>
              Les SUV compacts (Tiguan, 3008, Qashqai, RAV4) sont parfaitement adaptés avec des barres supportant souvent
              100 kg ou plus. Les breaks (Passat SW, 308 SW, Octavia Combi) offrent un toit long et plat idéal. Même
              certaines berlines compactes (Golf, 308, Mégane) peuvent accueillir une tente légère avec des barres adaptées.
            </p>
          </div>
        </div>
      </section>

      {/* Compatibilité */}
      <section id="compatibilite" className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Votre voiture est-elle compatible ?</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)', maxWidth: '700px' }}>
            Vérifiez ces 3 critères pour savoir si vous pouvez installer une tente de toit sur votre voiture.
          </p>

          <div className="tente-compatibility-checklist">
            <div className="checklist-item">
              <span className="check-icon">✓</span>
              <div>
                <h3>Barres de toit installées ou installables</h3>
                <p>
                  Votre voiture doit pouvoir recevoir des barres de toit : rails intégrés, barres longitudinales,
                  points de fixation ou rails affleurants. Consultez le manuel de votre véhicule ou un spécialiste
                  pour connaître les options compatibles avec votre modèle.
                </p>
              </div>
            </div>
            <div className="checklist-item">
              <span className="check-icon">✓</span>
              <div>
                <h3>Charge dynamique suffisante (min. 75 kg)</h3>
                <p>
                  Vérifiez la charge dynamique maximale de vos barres de toit. Cette information figure sur les barres
                  ou dans leur documentation. Pour la KP19PRO de 75 kg, vous avez besoin de barres supportant au moins
                  75 kg en charge dynamique. Les barres Thule, Yakima ou d'origine constructeur conviennent généralement.
                </p>
              </div>
            </div>
            <div className="checklist-item">
              <span className="check-icon">✓</span>
              <div>
                <h3>Écartement des barres adapté</h3>
                <p>
                  Les points de fixation de la tente doivent correspondre à l'écartement de vos barres. La plupart des
                  tentes s'adaptent à un écartement de 60 à 120 cm. Les KAILOP sont livrées avec un kit d'installation
                  ajustable compatible avec la majorité des configurations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types de véhicules */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Types de voitures compatibles avec une tente de toit</h2>
          <div className="tente-vehicle-grid">
            <div className="tente-vehicle-card">
              <h3>Berlines et compactes</h3>
              <p><strong>Compatibilité :</strong> Possible avec barres adaptées</p>
              <p><strong>Attention :</strong> Charge souvent limitée à 75 kg maximum. Privilégiez les modèles légers comme la KP19PRO.</p>
              <p><strong>Exemples :</strong> Golf, 308, Mégane, Civic, Focus, Astra</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', marginTop: 'var(--space-2)' }}>
                Astuce : préférez des barres de qualité (Thule, Yakima) pour maximiser la charge supportée.
              </p>
            </div>
            <div className="tente-vehicle-card">
              <h3>Breaks et familiales</h3>
              <p><strong>Compatibilité :</strong> Excellente, toit long et plat</p>
              <p><strong>Avantage :</strong> Plus d'espace de rangement dans le coffre, stabilité accrue.</p>
              <p><strong>Exemples :</strong> Passat SW, 308 SW, Octavia Combi, Golf SW, Leon ST</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', marginTop: 'var(--space-2)' }}>
                Le break est un excellent compromis entre van et voiture pour le camping itinérant.
              </p>
            </div>
            <div className="tente-vehicle-card tente-vehicle-recommended">
              <h3>SUV compacts</h3>
              <p><strong>Compatibilité :</strong> Idéale, structure renforcée</p>
              <p><strong>Avantage :</strong> Garde au sol, charge plus élevée (100+ kg), parfait pour les chemins.</p>
              <p><strong>Exemples :</strong> Tiguan, 3008, Qashqai, RAV4, Tucson, CX-5, Forester</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', marginTop: 'var(--space-2)' }}>
                Le SUV compact est notre recommandation pour une tente de toit voiture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre recommandation */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Notre recommandation pour voiture : KAILOP KP19PRO</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-5)', maxWidth: '700px' }}>
            La KP19PRO est la tente de toit idéale pour les voitures grâce à son poids contenu ({kp19pro.weight.net_kg} kg)
            et son profil ultra-bas ({kp19pro.dimensions.closed_cm.height} cm fermée).
          </p>

          <div className="tente-products-grid" style={{ gridTemplateColumns: '1fr' }}>
            <article className="product-card-pro" style={{ maxWidth: '600px' }}>
              <div className="product-card-image">
                <Image
                  src={kp19pro.media.images.general[0]}
                  alt="Tente de toit KAILOP KP19PRO idéale pour voiture"
                  width={600}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <div className="product-badges">
                  <span className="badge-discount">-{getDiscountPercentage(kp19pro.pricing.original_eur, kp19pro.pricing.current_eur)}%</span>
                  <span className="badge-bestseller">Idéale voiture</span>
                </div>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">KAILOP {kp19pro.model}</h3>
                <p className="product-card-subtitle">Ouverture arrière • {kp19pro.weight.net_kg} kg • Compatible barres 75 kg+</p>

                <div className="product-specs-grid">
                  <div className="product-spec"><span className="product-spec-icon">⚖️</span><span>Poids : {kp19pro.weight.net_kg} kg</span></div>
                  <div className="product-spec"><span className="product-spec-icon">📐</span><span>Fermée : {kp19pro.dimensions.closed_cm.height} cm</span></div>
                  <div className="product-spec"><span className="product-spec-icon">👥</span><span>{kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} personnes</span></div>
                  <div className="product-spec"><span className="product-spec-icon">⚡</span><span>Ouverture 5 secondes</span></div>
                </div>

                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 'var(--space-3)' }}>
                  Avec seulement {kp19pro.dimensions.closed_cm.height} cm d'épaisseur fermée, la KP19PRO offre un profil
                  aérodynamique qui limite la surconsommation de carburant. Son poids de {kp19pro.weight.net_kg} kg est
                  compatible avec la plupart des barres de toit standard. L'ouverture arrière crée un auvent naturel
                  qui protège l'entrée même sous la pluie.
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

                <a href={kp19pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="cta-product-pro">
                  Voir la KP19PRO sur KAILOP
                  <span>-120€ avec le code KAILOP120</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Conseils installation */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Conseils pour installer une tente de toit sur votre voiture</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>Avant l'achat</h3>
              <ul style={{ color: 'var(--color-gray-600)' }}>
                <li>Mesurez la charge dynamique de vos barres actuelles</li>
                <li>Vérifiez l'écartement entre vos barres (généralement 60-120 cm)</li>
                <li>Calculez la hauteur totale de votre véhicule + tente fermée</li>
                <li>Prévoyez le budget pour des barres de qualité si nécessaire</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>Après l'installation</h3>
              <ul style={{ color: 'var(--color-gray-600)' }}>
                <li>Testez la stabilité avant votre premier voyage</li>
                <li>Vérifiez régulièrement le serrage des fixations</li>
                <li>Notez la hauteur totale pour les parkings souterrains</li>
                <li>Adaptez votre conduite (virages moins serrés, attention au vent)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Questions fréquentes sur les tentes de toit pour voiture</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Puis-je installer une tente de toit sur une Clio ou une 208 ?</summary>
              <p>
                Techniquement oui, si vous avez des barres de toit. Mais ces petites voitures ont souvent une charge
                limitée (50-60 kg). Avec des barres premium, certains modèles peuvent atteindre 75 kg. Pour plus de
                confort et de sécurité, un SUV compact ou un break reste préférable.
              </p>
            </details>
            <details className="tente-faq-item">
              <summary>La tente de toit abîme-t-elle le toit de ma voiture ?</summary>
              <p>
                Non, si l'installation est correcte. La tente repose sur les barres de toit, pas directement sur la
                carrosserie. Les barres répartissent le poids sur les points de fixation prévus par le constructeur.
                Utilisez toujours des barres homologuées et respectez les charges maximales.
              </p>
            </details>
            <details className="tente-faq-item">
              <summary>Quelle consommation supplémentaire avec une tente de toit ?</summary>
              <p>
                Comptez 5-15% de consommation en plus selon votre vitesse et le profil aérodynamique de la tente.
                Les tentes rigides comme la KP19PRO ({kp19pro.dimensions.closed_cm.height} cm fermée) impactent moins
                qu'une tente souple. Rouler à 110 km/h plutôt que 130 km/h réduit significativement la surconsommation.
              </p>
            </details>
            <details className="tente-faq-item">
              <summary>Peut-on passer dans les parkings souterrains ?</summary>
              <p>
                Cela dépend de la hauteur de votre véhicule + tente. Avec la KP19PRO fermée (+{kp19pro.dimensions.closed_cm.height} cm),
                un SUV compact fait environ 1,90-2,00 m de haut. La plupart des parkings acceptent jusqu'à 2,00-2,10 m.
                Mesurez votre véhicule équipé et repérez les parkings adaptés à l'avance.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Maillage interne */}
      <section className="tente-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>Continuez votre recherche</h2>
          <div className="internal-links-pro">
            <Link href="/meilleures-tentes-de-toit/" className="internal-link-pro">
              <div className="internal-link-icon">🏆</div>
              <div className="internal-link-text"><h4>Comparatif complet</h4><p>Toutes les meilleures tentes</p></div>
            </Link>
            <Link href="/tente-de-toit-4x4/" className="internal-link-pro">
              <div className="internal-link-icon">🚙</div>
              <div className="internal-link-text"><h4>Tente pour 4x4</h4><p>Overlanding</p></div>
            </Link>
            <Link href="/tente-de-toit-pour-van/" className="internal-link-pro">
              <div className="internal-link-icon">🚐</div>
              <div className="internal-link-text"><h4>Tente pour van</h4><p>Fourgons et utilitaires</p></div>
            </Link>
            <Link href="/tente-de-toit-rigide/" className="internal-link-pro">
              <div className="internal-link-icon">🏠</div>
              <div className="internal-link-text"><h4>Tentes rigides</h4><p>Avantages vs souples</p></div>
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
