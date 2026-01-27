import { Metadata } from 'next'
import Link from 'next/link'
import { loadTentesData, formatPrice } from '@/lib/loadTentesData'

export const metadata: Metadata = {
  title: 'Tente de Toit 5 Places : Solutions pour Grandes Familles',
  description: 'Tente de toit 5 places : existe-t-elle vraiment ? Guide complet sur les solutions pour voyager à 5+ en famille avec tentes de toit.',
  keywords: ['tente de toit 5 places', 'tente de toit grande famille', 'tente toit 5 personnes', 'camping famille nombreuse'],
}

export default function TenteToit5PlacesPage() {
  const data = loadTentesData()
  const brand = data.brand
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
            <span>5 Places</span>
          </nav>
          <h1>Tente de Toit 5 Places : Mythe ou Réalité ?</h1>
          <p className="tente-hero-subtitle">
            Vous êtes 5 ou plus et rêvez de camping en tente de toit ? Soyons honnêtes :
            les vraies tentes 5 places sont exceptionnelles. Voici les alternatives réalistes.
          </p>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <div className="tente-intro">
            <p>
              Chercher une <strong>tente de toit 5 places</strong> où tout le monde dort confortablement
              est comme chercher une licorne. Les rares modèles qui existent sont énormes, très lourds,
              et nécessitent des véhicules spéciaux. Mais des solutions existent pour les familles nombreuses !
            </p>
          </div>

          <div className="tente-warning-box">
            <h3>La Vérité sur les "5 Places"</h3>
            <p>
              Une tente annoncée "5 places" signifie généralement : 5 personnes peuvent techniquement s'allonger,
              mais avec 40 cm de largeur par personne. Pour 5 adultes, c'est inconfortable.
              Pour 2 adultes + 3 enfants, ça peut fonctionner dans certains modèles XXL.
            </p>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Solutions Réalistes pour 5+ Personnes</h2>

          <div className="tente-solutions-grid">
            <div className="tente-solution-card tente-solution-recommended">
              <h3>Solution 1 : Tente de Toit + Véhicule</h3>
              <p className="solution-best">La plus pratique pour familles</p>
              <ul>
                <li>Parents en tente de toit (2 personnes)</li>
                <li>Enfants dans le véhicule (2-3 personnes)</li>
                <li>Possibilité d'un van ou SUV avec banquette convertible</li>
                <li>Un seul véhicule, budget maîtrisé</li>
              </ul>
              <p className="solution-example">
                Exemple : KAILOP ST09PRO ({formatPrice(st09pro.pricing.current_eur)}) + van avec couchage
              </p>
            </div>

            <div className="tente-solution-card">
              <h3>Solution 2 : Deux Tentes de Toit</h3>
              <p>Pour ceux qui ont deux véhicules</p>
              <ul>
                <li>2 tentes 2-3 places</li>
                <li>Flexibilité totale (se séparer, inviter)</li>
                <li>Chaque "camp" est autonome</li>
                <li>Budget plus élevé mais durable</li>
              </ul>
              <p className="solution-example">
                Budget : ~5000€ pour deux tentes KAILOP
              </p>
            </div>

            <div className="tente-solution-card">
              <h3>Solution 3 : Tente de Toit + Auvent/Tente Sol</h3>
              <p>Le compromis économique</p>
              <ul>
                <li>Tente de toit pour 2-3 personnes</li>
                <li>Auvent latéral ou tente au sol pour les autres</li>
                <li>Espace de vie agrandi</li>
                <li>Installation plus longue</li>
              </ul>
              <p className="solution-example">
                Budget : ~3000€ (tente + auvent)
              </p>
            </div>

            <div className="tente-solution-card">
              <h3>Solution 4 : Tente de Toit XXL</h3>
              <p>Pour les budgets conséquents</p>
              <ul>
                <li>Modèles "King Size" ou "Family"</li>
                <li>Surface 200 x 240 cm ou plus</li>
                <li>Poids 120-150 kg</li>
                <li>Nécessite galerie spéciale + gros véhicule</li>
              </ul>
              <p className="solution-example">
                Budget : 5000-8000€ + équipement véhicule
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <h2>Configuration Recommandée : Famille de 5</h2>

          <div className="tente-family-layout">
            <div className="layout-visual">
              <div className="layout-tent">
                <h4>Tente de Toit</h4>
                <p>2 adultes</p>
                <p className="layout-comfort">Confort optimal</p>
              </div>
              <div className="layout-vehicle">
                <h4>Véhicule (Van/SUV)</h4>
                <p>3 enfants</p>
                <p className="layout-comfort">Banquette + matelas</p>
              </div>
            </div>

            <div className="layout-details">
              <h3>Pourquoi cette configuration ?</h3>
              <ul>
                <li><strong>Confort :</strong> Chacun a assez d'espace pour bien dormir</li>
                <li><strong>Intimité :</strong> Parents et enfants ont des espaces séparés</li>
                <li><strong>Budget :</strong> Une seule tente de toit à acheter</li>
                <li><strong>Praticité :</strong> Un seul véhicule à gérer</li>
              </ul>

              <a
                href={brand.affiliate.default_url}
                target="_blank"
                rel="noopener noreferrer"
                className="tente-cta-button"
              >
                Voir les tentes KAILOP
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Questions Fréquentes</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Existe-t-il des tentes de toit vraiment confortables pour 5 adultes ?</summary>
              <p>Non, pas vraiment. Les plus grandes tentes du marché (type "Family" ou "King Size") peuvent accueillir 5 personnes techniquement, mais avec un confort limité (40 cm de largeur par personne). Pour 5 adultes qui veulent bien dormir, deux tentes ou une configuration mixte est préférable.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Quel véhicule pour une famille de 5 avec tente de toit ?</summary>
              <p>Un van type VW Transporter, Mercedes Vito ou Renault Trafic est idéal : la tente sur le toit pour les parents, la banquette arrière convertie en lit pour les enfants. Un grand SUV (Touareg, Q7, Land Cruiser) peut aussi convenir avec aménagement intérieur.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Peut-on ajouter un toit relevable ET une tente de toit ?</summary>
              <p>Non, ces deux équipements occupent le même espace (le toit). Un toit relevable est une alternative à la tente de toit, pas un complément. Pour plus de couchages, combinez tente de toit + couchage intérieur ou + tente au sol.</p>
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
            <Link href="/tente-de-toit-4-places/" className="tente-internal-link">
              <span className="link-icon">👨‍👩‍👧‍👦</span>
              <span className="link-text"><strong>Tente 4 Places</strong><span>Familles de 4</span></span>
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
