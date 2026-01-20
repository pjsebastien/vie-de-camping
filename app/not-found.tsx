import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container" style={{
      padding: 'var(--space-10) var(--container-padding)',
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        {/* Grande tente ASCII art */}
        <div style={{
          fontSize: 'var(--text-6xl)',
          marginBottom: 'var(--space-6)',
          lineHeight: '1.2'
        }}>
          ⛺
        </div>

        {/* Titre humoristique */}
        <h1 style={{
          fontSize: 'var(--text-5xl)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--color-gray-900)',
          marginBottom: 'var(--space-4)'
        }}>
          404
        </h1>

        <h2 style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-semibold)',
          color: 'var(--color-primary)',
          marginBottom: 'var(--space-5)'
        }}>
          Oups ! Vous êtes perdu en pleine nature 🌲
        </h2>

        {/* Messages humoristiques */}
        <div style={{
          backgroundColor: 'var(--color-gray-50)',
          padding: 'var(--space-6)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: 'var(--space-6)',
          border: '2px solid var(--color-gray-200)'
        }}>
          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--color-gray-700)',
            marginBottom: 'var(--space-4)',
            lineHeight: '1.6'
          }}>
            On dirait que cette page a décidé de partir camper ailleurs... 🏕️
          </p>

          <div style={{
            display: 'grid',
            gap: 'var(--space-3)',
            textAlign: 'left',
            marginTop: 'var(--space-5)'
          }}>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-gray-600)' }}>
              🧭 Peut-être que votre boussole est déréglée ?
            </p>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-gray-600)' }}>
              🗺️ Ou alors vous avez pris le mauvais sentier de randonnée ?
            </p>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-gray-600)' }}>
              🦌 À moins qu'un chevreuil ait mangé le panneau indicateur...
            </p>
          </div>
        </div>

        {/* Conseil camping humoristique */}
        <div style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-white)',
          padding: 'var(--space-4)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--space-8)',
          fontSize: 'var(--text-sm)',
          fontStyle: 'italic'
        }}>
          💡 <strong>Astuce de campeur :</strong> En cas de perte, retournez toujours au camp de base !
        </div>

        {/* Boutons de navigation */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-4)',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)',
              padding: 'var(--space-4) var(--space-6)',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              fontWeight: 'var(--font-semibold)',
              fontSize: 'var(--text-base)',
              transition: 'all var(--transition-base)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            🏕️ Retour au Camp de Base
          </Link>

          <Link
            href="/campings/"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--color-white)',
              color: 'var(--color-primary)',
              padding: 'var(--space-4) var(--space-6)',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              fontWeight: 'var(--font-semibold)',
              fontSize: 'var(--text-base)',
              border: '2px solid var(--color-primary)',
              transition: 'all var(--transition-base)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-gray-50)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-white)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            🔍 Trouver un Camping
          </Link>
        </div>

        {/* Message de bas de page drôle */}
        <p style={{
          marginTop: 'var(--space-8)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-gray-500)',
          fontStyle: 'italic'
        }}>
          PS : N'oubliez pas d'allumer votre lampe torche la prochaine fois ! 🔦
        </p>
      </div>
    </div>
  )
}
