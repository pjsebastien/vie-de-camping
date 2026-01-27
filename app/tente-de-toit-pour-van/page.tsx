import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { loadTentesData, formatPrice } from '@/lib/loadTentesData'

export const metadata: Metadata = {
  title: 'Tente de Toit pour Van : Guide Complet Fourgons et Utilitaires',
  description: 'Installer une tente de toit sur votre van ou fourgon aménagé : guide complet. Compatibilité, installation sur toit relevable ou galerie, meilleurs modèles.',
  keywords: ['tente de toit van', 'tente van aménagé', 'tente fourgon', 'tente de toit utilitaire', 'camping van'],
}

export default function TenteToitVanPage() {
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
            <span>Pour Van</span>
          </nav>
          <div class="tente-hero-content"><h1>Tente de Toit pour Van : Doublez Votre Espace de Couchage</h1></div>
          <p className="tente-hero-subtitle">
            Vous avez un van aménagé mais pas assez de couchages ? La tente de toit transforme
            votre fourgon en véritable camping-car familial.
          </p>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <div className="tente-intro">
            <p>
              Le <strong>van aménagé</strong> offre liberté et confort, mais l'espace de couchage est souvent limité.
              En ajoutant une <strong>tente de toit</strong>, vous créez une chambre supplémentaire sans modifier
              l'aménagement intérieur. Idéal pour les familles ou les voyages entre amis.
            </p>
          </div>

          <h2>Pourquoi Ajouter une Tente de Toit à Votre Van ?</h2>
          <div className="tente-benefits-grid">
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">👨‍👩‍👧‍👦</div>
              <h3>Plus de Couchages</h3>
              <p>Passez de 2 à 4-5 places sans modifier l'intérieur. Parents en bas, enfants en haut (ou l'inverse !).</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">🏠</div>
              <h3>Intimité Préservée</h3>
              <p>Deux espaces de couchage séparés. Chacun son espace, plus de confort pour tous.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">📦</div>
              <h3>Intérieur Libre</h3>
              <p>Le lit du van devient espace de vie en journée. Plus besoin de tout ranger le matin.</p>
            </div>
            <div className="tente-benefit-card">
              <div className="tente-benefit-icon">💰</div>
              <h3>Moins Cher qu'un Toit Relevable</h3>
              <p>Un toit relevable coûte 5000-15000€ à installer. Une tente de toit : 2500€, et c'est réversible.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Vans et Fourgons Compatibles</h2>
          <div className="tente-table-wrapper">
            <table className="tente-comparison-table">
              <thead>
                <tr>
                  <th>Véhicule</th>
                  <th>Type</th>
                  <th>Installation</th>
                  <th>Compatibilité</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>VW California / Transporter</td>
                  <td>Van compact</td>
                  <td>Barres ou galerie</td>
                  <td className="highlight-good">Excellente</td>
                </tr>
                <tr>
                  <td>Mercedes Vito / Marco Polo</td>
                  <td>Van compact</td>
                  <td>Barres ou galerie</td>
                  <td className="highlight-good">Excellente</td>
                </tr>
                <tr>
                  <td>Renault Trafic / Traffic</td>
                  <td>Fourgon</td>
                  <td>Galerie recommandée</td>
                  <td className="highlight-good">Très bonne</td>
                </tr>
                <tr>
                  <td>Citroën Spacetourer</td>
                  <td>Van compact</td>
                  <td>Barres ou galerie</td>
                  <td className="highlight-good">Très bonne</td>
                </tr>
                <tr>
                  <td>Fiat Ducato</td>
                  <td>Fourgon L2/L3</td>
                  <td>Galerie obligatoire</td>
                  <td>Bonne (hauteur)</td>
                </tr>
                <tr>
                  <td>Ford Transit Custom</td>
                  <td>Fourgon</td>
                  <td>Galerie recommandée</td>
                  <td className="highlight-good">Très bonne</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tente-info-box">
            <h3>Note sur les fourgons hauts (Ducato, Sprinter...)</h3>
            <p>
              Les grands fourgons (H2, H3) sont déjà hauts. Avec une tente de toit, vous dépasserez 3m.
              Vérifiez les hauteurs de passage (ponts, parkings) avant de partir. Les vans compacts (Transporter, Vito)
              restent sous 2,50m équipés, ce qui est plus pratique au quotidien.
            </p>
          </div>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <h2>Installation sur Van : Les Options</h2>
          <div className="tente-comparison-cards">
            <div className="tente-option-card">
              <h3>Barres de Toit Renforcées</h3>
              <ul>
                <li>Solution économique (300-500€)</li>
                <li>Installation rapide</li>
                <li>Convient aux vans compacts</li>
                <li>Charge : 75-100 kg typique</li>
              </ul>
              <p className="option-ideal">Idéal pour : usage occasionnel, vans déjà équipés de rails</p>
            </div>
            <div className="tente-option-card tente-option-recommended">
              <h3>Galerie Plate (Recommandé)</h3>
              <ul>
                <li>Charge supérieure (150+ kg)</li>
                <li>Espace pour panneaux solaires</li>
                <li>Meilleure répartition du poids</li>
                <li>Coût : 800-2000€</li>
              </ul>
              <p className="option-ideal">Idéal pour : usage intensif, vanlife, voyages longs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Notre Recommandation pour Van</h2>
          <p className="section-intro">
            Pour un van, nous recommandons la KP19PRO : profil bas fermé ({kp19pro.dimensions.closed_cm.height} cm),
            légère ({kp19pro.weight.net_kg} kg), et l'ouverture arrière s'adapte parfaitement à la configuration du véhicule.
          </p>

          <div className="tente-products-grid">
            <article className="tente-product-card">
              <div className="tente-product-image">
                <Image
                  src={kp19pro.media.images.general[0]}
                  alt="Tente de toit KAILOP KP19PRO pour van"
                  width={550}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tente-product-badge">Idéal Van</span>
              </div>
              <div className="tente-product-content">
                <h3>KAILOP {kp19pro.model}</h3>
                <ul className="tente-product-features">
                  <li>Profil bas : {kp19pro.dimensions.closed_cm.height} cm fermé</li>
                  <li>Poids : {kp19pro.weight.net_kg} kg</li>
                  <li>Ouverture arrière (accès facile depuis le van)</li>
                  <li>{kp19pro.capacity.min_persons}-{kp19pro.capacity.max_persons} couchages supplémentaires</li>
                  <li>Matelas mémoire de forme inclus</li>
                </ul>
                <div className="tente-product-price-box">
                  <span className="price-current-large">{formatPrice(kp19pro.pricing.current_eur)}</span>
                  <span className="price-original-large">{formatPrice(kp19pro.pricing.original_eur)}</span>
                </div>
                <a href={kp19pro.affiliate.url} target="_blank" rel="noopener noreferrer nofollow" className="tente-cta-button">
                  {kp19pro.affiliate.cta_label}
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="tente-section">
        <div className="container">
          <h2>Questions Fréquentes - Tente sur Van</h2>
          <div className="tente-faq">
            <details className="tente-faq-item">
              <summary>Puis-je garder mon toit relevable ET ajouter une tente ?</summary>
              <p>Non, les deux systèmes ne sont pas compatibles. Si vous avez déjà un toit relevable, vous n'avez pas besoin de tente de toit. La tente est une alternative au toit relevable, pas un complément.</p>
            </details>
            <details className="tente-faq-item">
              <summary>Comment accéder à la tente depuis le van ?</summary>
              <p>Vous utilisez l'échelle télescopique fournie (2,3m). Certains installent une trappe de toit pour accéder directement depuis l'intérieur, mais ce n'est pas indispensable. La plupart des utilisateurs passent simplement par l'extérieur.</p>
            </details>
            <details className="tente-faq-item">
              <summary>La tente est-elle compatible avec des panneaux solaires ?</summary>
              <p>Oui, avec une galerie. Vous pouvez installer la tente d'un côté et les panneaux de l'autre. Prévoyez une galerie suffisamment grande pour accueillir les deux équipements.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="tente-section tente-section-alt">
        <div className="container">
          <h2>Guides Connexes</h2>
          <div className="tente-internal-links">
            <Link href="/tente-de-toit-voiture/" className="tente-internal-link">
              <span className="link-icon">🚗</span>
              <span className="link-text"><strong>Tente pour Voiture</strong><span>Berlines et SUV</span></span>
            </Link>
            <Link href="/tente-de-toit-4x4/" className="tente-internal-link">
              <span className="link-icon">🚙</span>
              <span className="link-text"><strong>Tente pour 4x4</strong><span>Overlanding</span></span>
            </Link>
            <Link href="/meilleures-tentes-de-toit/" className="tente-internal-link">
              <span className="link-icon">🏆</span>
              <span className="link-text"><strong>Comparatif Complet</strong><span>Tous les modèles 2025</span></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
