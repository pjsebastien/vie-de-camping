import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact - Vie de Camping',
  description: 'Contactez Vie de Camping pour toute question concernant les campings en France.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        backgroundColor: '#003580',
        padding: 'clamp(2.5rem, 6vw, 4rem) 0',
        color: 'var(--color-white)'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 'var(--font-bold)',
            marginBottom: 'var(--space-3)',
            textAlign: 'center'
          }}>
            Nous contacter
          </h1>
          <p style={{
            fontSize: 'var(--text-lg)',
            textAlign: 'center',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Une question, une suggestion ou besoin d'aide ? N'hésitez pas à nous contacter
          </p>
        </div>
      </section>

      {/* Contenu principal */}
      <section style={{
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        backgroundColor: 'var(--color-white)'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gap: 'var(--space-8)'
          }}>

            {/* Informations importantes */}
            <div style={{
              backgroundColor: '#f0f7ff',
              border: '2px solid #003580',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)'
            }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: '#003580',
                marginBottom: 'var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)'
              }}>
                ℹ️ Information importante
              </h2>
              <div style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.8',
                color: 'var(--color-gray-700)'
              }}>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  <strong>Vie de Camping est un site d'information</strong> présentant les campings classés en France. Nous ne sommes pas une plateforme de réservation.
                </p>
                <p style={{ marginBottom: 'var(--space-3)' }}>
                  Pour toute demande concernant :
                </p>
                <ul style={{ marginLeft: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
                  <li style={{ marginBottom: 'var(--space-2)' }}>
                    <strong>Réservations</strong> : contactez directement les campings
                  </li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>
                    <strong>Tarifs et disponibilités</strong> : contactez directement les établissements
                  </li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>
                    <strong>Services et équipements</strong> : renseignez-vous auprès des campings
                  </li>
                </ul>
                <p>
                  Les coordonnées des campings sont disponibles sur leurs fiches détaillées sur notre site.
                </p>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-4)',
                textAlign: 'center'
              }}>
                📧 Formulaire de contact
              </h2>
              <p style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-gray-600)',
                textAlign: 'center',
                marginBottom: 'var(--space-6)'
              }}>
                Vous pouvez nous contacter pour toute question concernant le site Vie de Camping
              </p>

              <div style={{
                backgroundColor: '#F8F9FA',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                border: '1px solid var(--color-gray-200)'
              }}>
                <form style={{
                  display: 'grid',
                  gap: 'var(--space-5)'
                }}>
                  {/* Nom */}
                  <div>
                    <label htmlFor="name" style={{
                      display: 'block',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-semibold)',
                      color: 'var(--color-gray-900)',
                      marginBottom: 'var(--space-2)'
                    }}>
                      Nom et prénom <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      style={{
                        width: '100%',
                        padding: 'var(--space-3)',
                        fontSize: 'var(--text-base)',
                        border: '2px solid var(--color-gray-300)',
                        borderRadius: 'var(--radius-md)',
                        transition: 'border-color var(--transition-base)'
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" style={{
                      display: 'block',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-semibold)',
                      color: 'var(--color-gray-900)',
                      marginBottom: 'var(--space-2)'
                    }}>
                      Email <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      style={{
                        width: '100%',
                        padding: 'var(--space-3)',
                        fontSize: 'var(--text-base)',
                        border: '2px solid var(--color-gray-300)',
                        borderRadius: 'var(--radius-md)',
                        transition: 'border-color var(--transition-base)'
                      }}
                    />
                  </div>

                  {/* Sujet */}
                  <div>
                    <label htmlFor="subject" style={{
                      display: 'block',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-semibold)',
                      color: 'var(--color-gray-900)',
                      marginBottom: 'var(--space-2)'
                    }}>
                      Sujet <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      style={{
                        width: '100%',
                        padding: 'var(--space-3)',
                        fontSize: 'var(--text-base)',
                        border: '2px solid var(--color-gray-300)',
                        borderRadius: 'var(--radius-md)',
                        transition: 'border-color var(--transition-base)',
                        backgroundColor: 'var(--color-white)'
                      }}
                    >
                      <option value="">-- Sélectionnez un sujet --</option>
                      <option value="question-generale">Question générale sur le site</option>
                      <option value="signalement">Signaler une erreur ou information incorrecte</option>
                      <option value="suggestion">Suggestion d'amélioration</option>
                      <option value="proprietaire">Je suis propriétaire d'un camping</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" style={{
                      display: 'block',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-semibold)',
                      color: 'var(--color-gray-900)',
                      marginBottom: 'var(--space-2)'
                    }}>
                      Message <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={8}
                      required
                      style={{
                        width: '100%',
                        padding: 'var(--space-3)',
                        fontSize: 'var(--text-base)',
                        border: '2px solid var(--color-gray-300)',
                        borderRadius: 'var(--radius-md)',
                        transition: 'border-color var(--transition-base)',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Notice */}
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)',
                    lineHeight: '1.6'
                  }}>
                    <p style={{ marginBottom: 'var(--space-2)' }}>
                      En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour répondre à votre demande conformément à notre{' '}
                      <Link href="/politique-confidentialite" style={{ color: '#003580', textDecoration: 'underline' }}>
                        politique de confidentialité
                      </Link>.
                    </p>
                    <p>
                      <span style={{ color: '#dc2626' }}>*</span> Champs obligatoires
                    </p>
                  </div>

                  {/* Bouton */}
                  <button
                    type="submit"
                    style={{
                      padding: 'var(--space-4) var(--space-6)',
                      backgroundColor: '#003580',
                      color: 'var(--color-white)',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-bold)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-base)',
                      width: '100%'
                    }}
                  >
                    Envoyer le message
                  </button>
                </form>

                {/* Note technique */}
                <div style={{
                  marginTop: 'var(--space-6)',
                  padding: 'var(--space-4)',
                  backgroundColor: '#fff3cd',
                  border: '1px solid #ffc107',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  color: '#856404'
                }}>
                  <strong>Note :</strong> Ce formulaire est actuellement en mode démonstration. Pour rendre ce formulaire fonctionnel, vous devrez configurer un service d'envoi d'emails (ex: Resend, SendGrid, ou utiliser une API Route Next.js avec Nodemailer).
                </div>
              </div>
            </div>

            {/* Autres moyens de contact */}
            <div>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-gray-900)',
                marginBottom: 'var(--space-6)',
                textAlign: 'center'
              }}>
                Autres informations
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--space-5)'
              }}>
                {/* Temps de réponse */}
                <div style={{
                  backgroundColor: '#F8F9FA',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-5)',
                  textAlign: 'center',
                  border: '1px solid var(--color-gray-200)'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>⏱️</div>
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--color-gray-900)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    Temps de réponse
                  </h3>
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)',
                    lineHeight: '1.6'
                  }}>
                    Nous nous efforçons de répondre à toutes les demandes sous 48 heures ouvrées
                  </p>
                </div>

                {/* Support technique */}
                <div style={{
                  backgroundColor: '#F8F9FA',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-5)',
                  textAlign: 'center',
                  border: '1px solid var(--color-gray-200)'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>🛠️</div>
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--color-gray-900)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    Support technique
                  </h3>
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)',
                    lineHeight: '1.6'
                  }}>
                    Pour tout problème technique avec le site, décrivez précisément le problème rencontré
                  </p>
                </div>

                {/* Propriétaires */}
                <div style={{
                  backgroundColor: '#F8F9FA',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-5)',
                  textAlign: 'center',
                  border: '1px solid var(--color-gray-200)'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>🏕️</div>
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--color-gray-900)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    Propriétaires de camping
                  </h3>
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)',
                    lineHeight: '1.6'
                  }}>
                    Pour toute demande de modification d'informations concernant votre établissement
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ rapide */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
        backgroundColor: '#F5F5F5'
      }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-6)',
              textAlign: 'center'
            }}>
              Questions fréquentes
            </h2>

            <div style={{
              display: 'grid',
              gap: 'var(--space-4)'
            }}>
              <details style={{
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
                border: '1px solid var(--color-gray-200)'
              }}>
                <summary style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  color: '#003580',
                  cursor: 'pointer',
                  marginBottom: 'var(--space-3)'
                }}>
                  Puis-je réserver un camping via votre site ?
                </summary>
                <p style={{
                  fontSize: 'var(--text-base)',
                  lineHeight: '1.7',
                  color: 'var(--color-gray-700)'
                }}>
                  Non, Vie de Camping est un site d'information uniquement. Pour effectuer une réservation, vous devez contacter directement le camping de votre choix via les coordonnées disponibles sur sa fiche.
                </p>
              </details>

              <details style={{
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
                border: '1px solid var(--color-gray-200)'
              }}>
                <summary style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  color: '#003580',
                  cursor: 'pointer',
                  marginBottom: 'var(--space-3)'
                }}>
                  Comment signaler une information incorrecte ?
                </summary>
                <p style={{
                  fontSize: 'var(--text-base)',
                  lineHeight: '1.7',
                  color: 'var(--color-gray-700)'
                }}>
                  Utilisez le formulaire de contact ci-dessus en sélectionnant le sujet "Signaler une erreur ou information incorrecte" et indiquez-nous précisément l'information à corriger ainsi que le camping concerné.
                </p>
              </details>

              <details style={{
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
                border: '1px solid var(--color-gray-200)'
              }}>
                <summary style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  color: '#003580',
                  cursor: 'pointer',
                  marginBottom: 'var(--space-3)'
                }}>
                  D'où proviennent les informations sur les campings ?
                </summary>
                <p style={{
                  fontSize: 'var(--text-base)',
                  lineHeight: '1.7',
                  color: 'var(--color-gray-700)'
                }}>
                  Les données concernant les campings (classements, capacités, équipements) proviennent de sources officielles publiques. Nous nous efforçons de maintenir ces informations à jour, mais nous recommandons toujours de vérifier directement auprès des établissements.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Liens utiles */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) 0',
        backgroundColor: 'var(--color-white)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-gray-900)',
            marginBottom: 'var(--space-4)'
          }}>
            Informations légales
          </h2>
          <div style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/mentions-legales"
              style={{
                display: 'inline-block',
                padding: 'var(--space-3) var(--space-6)',
                backgroundColor: '#003580',
                color: 'var(--color-white)',
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                fontWeight: 'var(--font-semibold)',
                transition: 'all var(--transition-base)'
              }}
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              style={{
                display: 'inline-block',
                padding: 'var(--space-3) var(--space-6)',
                backgroundColor: 'var(--color-white)',
                color: '#003580',
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                fontWeight: 'var(--font-semibold)',
                border: '2px solid #003580',
                transition: 'all var(--transition-base)'
              }}
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
