'use client'

import { useState } from 'react'
import type { Camping } from '@/lib/types'

interface CampingFilterProps {
  campings: Camping[]
  onFilterChange: (filtered: Camping[]) => void
}

export default function CampingFilter({ campings, onFilterChange }: CampingFilterProps) {
  const [selectedStars, setSelectedStars] = useState<string[]>([])
  const [hasPool, setHasPool] = useState(false)
  const [hasWifi, setHasWifi] = useState(false)
  const [hasRestaurant, setHasRestaurant] = useState(false)
  const [minCapacity, setMinCapacity] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)

  const applyFilters = (
    stars: string[],
    pool: boolean,
    wifi: boolean,
    restaurant: boolean,
    capacity: number
  ) => {
    let filtered = campings

    if (stars.length > 0) {
      filtered = filtered.filter(c => {
        const classement = c.classement || ''
        return stars.some(star => classement.includes(`${star} étoile`))
      })
    }

    if (pool) filtered = filtered.filter(c => c.piscine === true)
    if (wifi) filtered = filtered.filter(c => c.accesBornesWifi === true)
    if (restaurant) filtered = filtered.filter(c => c.restauration === true)

    if (capacity > 0) {
      filtered = filtered.filter(c => (c.nombreEmplacements || 0) >= capacity)
    }

    onFilterChange(filtered)
  }

  const toggleStar = (star: string) => {
    const newStars = selectedStars.includes(star)
      ? selectedStars.filter(s => s !== star)
      : [...selectedStars, star]
    setSelectedStars(newStars)
    applyFilters(newStars, hasPool, hasWifi, hasRestaurant, minCapacity)
  }

  const togglePool = () => {
    const newHasPool = !hasPool
    setHasPool(newHasPool)
    applyFilters(selectedStars, newHasPool, hasWifi, hasRestaurant, minCapacity)
  }

  const toggleWifi = () => {
    const newHasWifi = !hasWifi
    setHasWifi(newHasWifi)
    applyFilters(selectedStars, hasPool, newHasWifi, hasRestaurant, minCapacity)
  }

  const toggleRestaurant = () => {
    const newHasRestaurant = !hasRestaurant
    setHasRestaurant(newHasRestaurant)
    applyFilters(selectedStars, hasPool, hasWifi, newHasRestaurant, minCapacity)
  }

  const updateCapacity = (capacity: number) => {
    setMinCapacity(capacity)
    applyFilters(selectedStars, hasPool, hasWifi, hasRestaurant, capacity)
  }

  const resetFilters = () => {
    setSelectedStars([])
    setHasPool(false)
    setHasWifi(false)
    setHasRestaurant(false)
    setMinCapacity(0)
    onFilterChange(campings)
  }

  const activeFiltersCount = selectedStars.length +
    (hasPool ? 1 : 0) +
    (hasWifi ? 1 : 0) +
    (hasRestaurant ? 1 : 0) +
    (minCapacity > 0 ? 1 : 0)

  return (
    <div style={{
      backgroundColor: 'var(--color-white)',
      border: '2px solid #003580',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: 'var(--space-6)'
    }}>
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: 'var(--space-4)',
          backgroundColor: '#003580',
          color: 'var(--color-white)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 'var(--text-lg)',
          fontWeight: 'var(--font-bold)'
        }}
      >
        <span>
          🔍 Filtrer les campings
          {activeFiltersCount > 0 && (
            <span style={{
              marginLeft: 'var(--space-3)',
              backgroundColor: '#FEBB02',
              color: '#003580',
              padding: 'var(--space-1) var(--space-3)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)'
            }}>
              {activeFiltersCount}
            </span>
          )}
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform var(--transition-base)'
          }}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div style={{
          padding: 'var(--space-5)',
          display: 'grid',
          gap: 'var(--space-5)'
        }}>
          {/* Classement */}
          <div>
            <div style={{
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-3)'
            }}>
              ⭐ Classement
            </div>
            <div style={{
              display: 'flex',
              gap: 'var(--space-2)',
              flexWrap: 'wrap'
            }}>
              {['5', '4', '3', '2', '1'].map((star) => (
                <button
                  key={star}
                  onClick={() => toggleStar(star)}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    backgroundColor: selectedStars.includes(star) ? '#003580' : 'var(--color-white)',
                    color: selectedStars.includes(star) ? 'var(--color-white)' : '#003580',
                    border: '2px solid #003580',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-semibold)',
                    transition: 'all var(--transition-base)'
                  }}
                >
                  {star} {'★'.repeat(parseInt(star))}
                </button>
              ))}
            </div>
          </div>

          {/* Équipements */}
          <div>
            <div style={{
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-3)'
            }}>
              🏊 Équipements
            </div>
            <div style={{
              display: 'grid',
              gap: 'var(--space-3)'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                cursor: 'pointer',
                fontSize: 'var(--text-base)'
              }}>
                <input
                  type="checkbox"
                  checked={hasPool}
                  onChange={togglePool}
                  style={{
                    width: '20px',
                    height: '20px',
                    accentColor: '#003580',
                    cursor: 'pointer'
                  }}
                />
                <span>🏊 Piscine ({campings.filter(c => c.piscine).length})</span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                cursor: 'pointer',
                fontSize: 'var(--text-base)'
              }}>
                <input
                  type="checkbox"
                  checked={hasWifi}
                  onChange={toggleWifi}
                  style={{
                    width: '20px',
                    height: '20px',
                    accentColor: '#003580',
                    cursor: 'pointer'
                  }}
                />
                <span>📶 WiFi ({campings.filter(c => c.accesBornesWifi).length})</span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                cursor: 'pointer',
                fontSize: 'var(--text-base)'
              }}>
                <input
                  type="checkbox"
                  checked={hasRestaurant}
                  onChange={toggleRestaurant}
                  style={{
                    width: '20px',
                    height: '20px',
                    accentColor: '#003580',
                    cursor: 'pointer'
                  }}
                />
                <span>🍽️ Restauration ({campings.filter(c => c.restauration).length})</span>
              </label>
            </div>
          </div>

          {/* Capacité */}
          <div>
            <div style={{
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-gray-900)',
              marginBottom: 'var(--space-3)'
            }}>
              ⛺ Capacité minimum
            </div>
            <div style={{
              display: 'flex',
              gap: 'var(--space-2)',
              flexWrap: 'wrap'
            }}>
              {[0, 50, 100, 150, 200].map((capacity) => (
                <button
                  key={capacity}
                  onClick={() => updateCapacity(capacity)}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    backgroundColor: minCapacity === capacity ? '#003580' : 'var(--color-white)',
                    color: minCapacity === capacity ? 'var(--color-white)' : '#003580',
                    border: '2px solid #003580',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-semibold)',
                    transition: 'all var(--transition-base)'
                  }}
                >
                  {capacity === 0 ? 'Tous' : `${capacity}+ empl.`}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-3)',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid var(--color-gray-200)'
          }}>
            <button
              onClick={resetFilters}
              style={{
                flex: 1,
                padding: 'var(--space-3) var(--space-4)',
                backgroundColor: 'var(--color-white)',
                color: '#003580',
                border: '2px solid #003580',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-semibold)',
                transition: 'all var(--transition-base)'
              }}
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
