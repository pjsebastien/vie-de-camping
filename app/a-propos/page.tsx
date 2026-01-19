import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos - Vie de Camping',
  description: 'Découvrez Vie de Camping, votre guide pour trouver les meilleurs campings de France. Notre mission, nos valeurs et notre passion pour le camping.',
}

export default function AProposPage() {
  return (
    <div className="container">
      <h1>À propos de Vie de Camping</h1>

      <section>
        <article>
          <h2>Notre projet</h2>
          <p>
            Vie de Camping est né d'une passion commune pour le camping et la découverte
            des richesses naturelles de la France. Notre objectif est de créer un guide
            complet et fiable pour aider les campeurs, qu'ils soient débutants ou
            expérimentés, à trouver l'emplacement idéal pour leurs vacances.
          </p>
          <p>
            Nous croyons que le camping est bien plus qu'un simple mode d'hébergement :
            c'est une philosophie de vie, une façon de voyager authentique qui permet
            de se reconnecter avec la nature et de vivre des expériences mémorables.
          </p>
        </article>
      </section>

      <section>
        <h2>Notre mission</h2>
        <article>
          <h3>Faciliter votre recherche</h3>
          <p>
            Trouver le bon camping peut être un défi face à l'immense diversité
            de l'offre en France. Notre mission est de simplifier cette recherche
            en vous proposant une plateforme claire, complète et facile à utiliser.
          </p>
        </article>

        <article>
          <h3>Promouvoir le camping français</h3>
          <p>
            La France dispose d'un patrimoine camping exceptionnel, des campings
            familiaux aux établissements haut de gamme, des emplacements nature
            aux complexes avec toutes les commodités. Nous souhaitons mettre en
            valeur cette richesse et encourager le tourisme local.
          </p>
        </article>

        <article>
          <h3>Partager notre passion</h3>
          <p>
            Au-delà du simple référencement, nous voulons créer une communauté
            de passionnés de camping et partager conseils, astuces et bonnes
            pratiques pour profiter au mieux de vos séjours en plein air.
          </p>
        </article>
      </section>

      <section>
        <h2>Nos valeurs</h2>
        <article>
          <ul>
            <li>
              <strong>Authenticité</strong> : Nous privilégions les informations
              vérifiées et les descriptions honnêtes des campings.
            </li>
            <li>
              <strong>Respect de la nature</strong> : Nous encourageons un camping
              responsable qui préserve l'environnement.
            </li>
            <li>
              <strong>Accessibilité</strong> : Le camping doit rester accessible
              à tous, quels que soient le budget et l'expérience.
            </li>
            <li>
              <strong>Convivialité</strong> : Nous valorisons l'esprit de partage
              et d'entraide qui caractérise la communauté des campeurs.
            </li>
          </ul>
        </article>
      </section>

      <section>
        <article>
          <h2>L'avenir de Vie de Camping</h2>
          <p>
            Ce projet n'en est qu'à ses débuts. Nous travaillons activement
            à enrichir notre base de données de campings, à développer de nouvelles
            fonctionnalités et à créer des contenus utiles pour préparer vos vacances.
          </p>
          <p>
            Restez connectés pour suivre l'évolution du site et découvrir
            régulièrement de nouvelles ressources pour vos aventures en camping.
          </p>
        </article>
      </section>

      <section>
        <article>
          <h2>Contact</h2>
          <p>
            Vous avez des questions, des suggestions ou souhaitez contribuer
            au projet ? N'hésitez pas à nous contacter. Nous sommes toujours
            ravis d'échanger avec les passionnés de camping.
          </p>
        </article>
      </section>
    </div>
  )
}
