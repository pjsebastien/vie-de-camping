import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice } from '@/lib/loadTentesData'

export const metadata: Metadata = {
  title: 'Tente de Toit 4 Places : Solutions pour Familles Nombreuses',
  description: 'Tente de toit 4 places pour familles : quelles options ? Guide complet sur les grandes tentes, solutions alternatives et conseils pour voyager à 4.',
  keywords: ['tente de toit 4 places', 'tente de toit familiale', 'grande tente de toit', 'tente toit 4 personnes'],
}

export default function TenteToit4PlacesPage() {
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
            <span>4 Places</span>
          </nav>
          <div class="tente-hero-content"><h1>Tente de Toit 4 Places : Solutions pour Voyager en Famille</h1></div>
          <p className="tente-hero-subtitle">
            Vous êtes 4 et voulez dormir ensemble ? Ce guide explore les options : grandes tentes,
            tentes multiples, ou solutions hybrides.
          </p>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <div className="tente-intro">
            <p>
              Trouver une <strong>tente de toit 4 places</strong> confortable n'est pas simple. Les modèles vraiment
              spacieux pour 4 adultes sont rares, lourds et chers. Heureusement, plusieurs solutions existent
              selon votre configuration familiale et votre véhicule.
            </p>
          </div>

          <div className="tente-info-box">
            <h3>La Réalité des "4 Places"</h3>
            <p>
              Beaucoup de tentes annoncées "4 places" sont en réalité confortables pour 2 adultes + 2 enfants.
              Pour 4 adultes, il faut viser des tentes XL (rares et chères) ou envisager des solutions alternatives.
            </p>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Les Solutions pour Dormir à 4</h2>

          <div className="tente-solutions-grid">
            <div className="tente-solution-card">
              <h3>Solution 1 : Tente 2-3 places + Couchage Véhicule</h3>
              <p className="solution-best">Recommandé pour 2 adultes + 2 enfants</p>
              <ul>
                <li>Parents dans la tente de toit</li>
                <li>Enfants dans le véhicule (banquette ou matelas)</li>
                <li>Coût modéré, véhicule standard</li>
                <li>Chacun son espace, intimité préservée</li>
              </ul>
              <p className="solution-cost">Budget : 2500-3000€ (tente seule)</p>
            </div>

            <div className="tente-solution-card">
              <h3>Solution 2 : Tente de Toit XL</h3>
              <p>Pour 4 personnes dans une seule tente</p>
              <ul>
                <li>Modèles XXL ou "King Size" (rares)</li>
                <li>Surface 200 x 200 cm ou plus</li>
                <li>Poids élevé (100+ kg)</li>
                <li>Nécessite galerie renforcée</li>
              </ul>
              <p className="solution-cost">Budget : 4000-6000€</p>
            </div>

            <div className="tente-solution-card">
              <h3>Solution 3 : Deux Véhicules</h3>
              <p>Pour groupes ou familles recomposées</p>
              <ul>
                <li>2 tentes de toit standard</li>
                <li>Flexibilité totale</li>
                <li>Possibilité de se séparer</li>
                <li>Double équipement, double budget</li>
              </ul>
              <p className="solution-cost">Budget : 5000-6000€ (2 tentes)</p>
            </div>

            <div className="tente-solution-card">
              <h3>Solution 4 : Tente de Toit + Tente au Sol</h3>
              <p>Le compromis pratique</p>
              <ul>
                <li>Parents ou ados en tente de toit</li>
                <li>Enfants en tente classique au sol</li>
                <li>Économique et flexible</li>
                <li>Installation plus longue</li>
              </ul>
              <p className="solution-cost">Budget : 2700-3200€</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <h2>Notre Recommandation : Configuration Familiale Optimale</h2>
          <p className="section-intro">
            Pour une famille de 4 (2 adultes + 2 enfants), nous recommandons une tente KAILOP 2-3 places
            combinée à un couchage dans le véhicule. C'est la solution la plus pratique et économique.
          </p>

          <div className="tente-family-config">
            <div className="config-item">
              <h3>Pour les parents</h3>
              <article className="tente-product-card-compact">
                <Image
                  src={st09pro.media.images.general[0]}
                  alt="Tente KAILOP ST09PRO pour famille"
                  width={300}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
                <div>
                  <h4>KAILOP {st09pro.model}</h4>
                  <p>La plus spacieuse : {st09pro.dimensions.open_cm.length} x {st09pro.dimensions.open_cm.width} cm</p>
                  <span className="price-current">{formatPrice(st09pro.pricing.current_eur)}</span>
                  <a href={st09pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="tente-cta-button-small">
                    Voir le produit
                  </a>
                </div>
              </article>
            </div>

            <div className="config-item">
              <h3>Pour les enfants</h3>
              <div className="config-options">
                <p><strong>Option A :</strong> Banquette arrière rabattue + matelas gonflable voiture (50-100€)</p>
                <p><strong>Option B :</strong> Tente de camping classique 2 places (100-200€)</p>
                <p><strong>Option C :</strong> Hamac de toit intérieur si véhicule adapté</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Questions Fréquentes</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Existe-t-il des tentes de toit vraiment confortables pour 4 adultes ?</summary>
              <p>Elles existent (modèles XL ou "King Size") mais sont rares, lourdes (100-130 kg) et chères (4000-6000€). Elles nécessitent aussi un véhicule avec une capacité de charge importante (galerie renforcée, 4x4 ou grand SUV). Pour 4 adultes régulièrement, deux tentes standard sont souvent plus pratiques.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Peut-on mettre 2 tentes de toit sur un seul véhicule ?</summary>
              <p>Théoriquement oui, sur un véhicule très long (camping-car, grand 4x4 avec remorque). En pratique, c'est compliqué et peu stable. Mieux vaut deux véhicules ou une tente + couchage véhicule.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Mes enfants de 12 et 14 ans peuvent-ils dormir ensemble dans une tente 2-3 places ?</summary>
              <p>Oui, c'est même une configuration idéale ! Deux ados dans une tente 2-3 places, parents dans une autre (ou dans le véhicule si c'est un van). Chacun son espace, tout le monde est content.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <h2>Autres Capacités</h2>
          <div className="tente-internal-links">
            <Link href="/tente-de-toit-3-places/" className="tente-internal-link">
              <span className="link-icon">👨‍👩‍👦</span>
              <span className="link-text"><strong>Tente 3 Places</strong><span>Petites familles</span></span>
            </Link>
            <Link href="/tente-de-toit-5-places/" className="tente-internal-link">
              <span className="link-icon">👨‍👩‍👧‍👦</span>
              <span className="link-text"><strong>Tente 5 Places</strong><span>Grandes familles</span></span>
            </Link>
            <Link href="/meilleures-tentes-de-toit/" className="tente-internal-link">
              <span className="link-icon">🏆</span>
              <span className="link-text"><strong>Comparatif Complet</strong><span>Tous les modèles</span></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
