'use client'

import { useState } from 'react'
import type { Camping } from '@/lib/types'
import CampingFilter from '@/components/ui/CampingFilter'
import Link from 'next/link'
import { slugify } from '@/lib/utils'

interface CampingFilterWrapperProps {
  campings: Camping[]
  departement: string
}

export default function CampingFilterWrapper({ campings, departement }: CampingFilterWrapperProps) {
  const [filteredCampings, setFilteredCampings] = useState(campings)

  return (
    <>
      <CampingFilter
        campings={campings}
        onFilterChange={setFilteredCampings}
      />

      {/* Résultats */}
      <div style={{
        marginBottom: 'var(--space-4)',
        fontSize: 'var(--text-base)',
        color: 'var(--color-gray-600)'
      }}>
        {filteredCampings.length} camping{filteredCampings.length > 1 ? 's' : ''} trouvé{filteredCampings.length > 1 ? 's' : ''}
        {filteredCampings.length !== campings.length && (
          <span> sur {campings.length} au total</span>
        )}
      </div>

      {/* Liste des campings filtrés */}
      <div style={{
        display: 'grid',
        gap: 'clamp(1rem, 2vw, 1.5rem)'
      }}>
        {filteredCampings.map((camping) => {
          const isPremium = camping.classement?.includes('5 étoiles') || camping.classement?.includes('4 étoiles')

          return (
            <article key={camping.slug} style={{
              backgroundColor: 'var(--color-white)',
              border: '1px solid var(--color-gray-200)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              transition: 'all var(--transition-base)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-3)',
                flexWrap: 'wrap'
              }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <h3 style={{
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-bold)',
                    marginBottom: 'var(--space-2)',
                    margin: 0
                  }}>
                    <Link
                      href={`/campings/${camping.slug}/`}
                      style={{
                        color: '#003580',
                        textDecoration: 'none',
                        transition: 'color var(--transition-base)'
                      }}
                    >
                      {camping.nom}
                    </Link>
                  </h3>

                  {isPremium && (
                    <div style={{
                      display: 'inline-block',
                      backgroundColor: '#FEBB02',
                      color: '#003580',
                      padding: 'var(--space-1) var(--space-3)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-bold)',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--space-2)'
                    }}>
                      ⭐ Premium
                    </div>
                  )}
                </div>

                <div style={{
                  backgroundColor: '#003580',
                  color: 'var(--color-white)',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-semibold)',
                  whiteSpace: 'nowrap'
                }}>
                  {camping.classement}
                </div>
              </div>

              <p style={{
                color: 'var(--color-gray-600)',
                fontSize: 'var(--text-sm)',
                marginBottom: 'var(--space-3)'
              }}>
                📍 <Link
                  href={`/campings/commune/${slugify(camping.commune)}/`}
                  style={{ color: '#003580', textDecoration: 'none' }}
                >
                  {camping.commune}
                </Link> ({camping.departement})
              </p>

              <div style={{
                display: 'flex',
                gap: 'var(--space-4)',
                flexWrap: 'wrap',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-gray-600)',
                marginBottom: 'var(--space-4)'
              }}>
                {camping.nombreEmplacements && (
                  <div>⛺ {camping.nombreEmplacements} emplacements</div>
                )}
                {camping.capacite && (
                  <div>👥 {camping.capacite} personnes</div>
                )}
                {camping.piscine && <div>🏊 Piscine</div>}
                {camping.accesBornesWifi && <div>📶 WiFi</div>}
                {camping.restauration && <div>🍽️ Restauration</div>}
              </div>

              <Link
                href={`/campings/${camping.slug}/`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-5)',
                  backgroundColor: '#003580',
                  color: 'var(--color-white)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 'var(--font-semibold)',
                  fontSize: 'var(--text-sm)',
                  transition: 'all var(--transition-base)'
                }}
              >
                Voir le camping
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </article>
          )
        })}
      </div>
    </>
  )
}
