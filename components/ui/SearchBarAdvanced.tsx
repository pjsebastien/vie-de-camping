'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/utils'
import { DEPARTEMENT_NAMES } from '@/lib/regions'
import type { Camping } from '@/lib/types'

interface SearchBarAdvancedProps {
  campings: Camping[]
  regions: string[]
  departments: string[]
  communes: string[]
  className?: string
}

interface SearchResult {
  type: 'camping' | 'commune' | 'region' | 'departement'
  name: string
  subtitle?: string
  url: string
  count?: number
}

export function SearchBarAdvanced({
  campings,
  regions,
  departments,
  communes,
  className = ''
}: SearchBarAdvancedProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // Filtres
  const [selectedStars, setSelectedStars] = useState<string[]>([])
  const [hasPool, setHasPool] = useState(false)
  const [hasWifi, setHasWifi] = useState(false)
  const [hasRestaurant, setHasRestaurant] = useState(false)

  // Fermer les résultats quand on clique dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filtrer les campings selon les critères
  const getFilteredCampings = () => {
    let filtered = campings

    // Filtre par étoiles
    if (selectedStars.length > 0) {
      filtered = filtered.filter(c => {
        const classement = c.classement || ''
        return selectedStars.some(star => classement.includes(`${star} étoile`))
      })
    }

    // Filtre par équipements
    if (hasPool) {
      filtered = filtered.filter(c => c.piscine === true)
    }
    if (hasWifi) {
      filtered = filtered.filter(c => c.wifi === true)
    }
    if (hasRestaurant) {
      filtered = filtered.filter(c => c.restaurant === true)
    }

    return filtered
  }

  // Recherche en temps réel
  useEffect(() => {
    if (searchQuery.length < 2) {
      setResults([])
      setShowResults(false)
      return
    }

    const query = searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const newResults: SearchResult[] = []
    const filteredCampings = getFilteredCampings()

    // Recherche dans les campings filtrés
    const matchingCampings = filteredCampings
      .filter(c => {
        const name = c.nom.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        const commune = c.commune.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        return name.includes(query) || commune.includes(query)
      })
      .slice(0, 5)

    matchingCampings.forEach(c => {
      newResults.push({
        type: 'camping',
        name: c.nom,
        subtitle: `${c.commune} (${c.departement}) - ${c.classement || 'Non classé'}`,
        url: `/campings/${c.slug}/`
      })
    })

    // Recherche dans les communes
    const matchingCommunes = communes
      .filter(commune => {
        const normalized = commune.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        return normalized.includes(query)
      })
      .slice(0, 5)

    matchingCommunes.forEach(commune => {
      const communeCampings = filteredCampings.filter(c => c.commune === commune)
      if (communeCampings.length > 0) {
        newResults.push({
          type: 'commune',
          name: commune,
          subtitle: `${communeCampings.length} camping${communeCampings.length > 1 ? 's' : ''}`,
          url: `/campings/commune/${slugify(commune)}/`,
          count: communeCampings.length
        })
      }
    })

    // Recherche dans les régions
    const matchingRegions = regions
      .filter(region => {
        const normalized = region.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        return normalized.includes(query)
      })
      .slice(0, 3)

    matchingRegions.forEach(region => {
      const { DEPARTEMENT_TO_REGION } = require('@/lib/regions')
      const regionCampings = filteredCampings.filter(c => DEPARTEMENT_TO_REGION[c.departement] === region)
      if (regionCampings.length > 0) {
        newResults.push({
          type: 'region',
          name: region,
          subtitle: `${regionCampings.length} camping${regionCampings.length > 1 ? 's' : ''}`,
          url: `/campings/region/${slugify(region)}/`,
          count: regionCampings.length
        })
      }
    })

    // Recherche dans les départements
    const matchingDepartments = departments
      .filter(dept => {
        const deptName = DEPARTEMENT_NAMES[dept] || dept
        const normalized = deptName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        return normalized.includes(query) || dept.toLowerCase().includes(query)
      })
      .slice(0, 3)

    matchingDepartments.forEach(dept => {
      const deptCampings = filteredCampings.filter(c => c.departement === dept)
      if (deptCampings.length > 0) {
        newResults.push({
          type: 'departement',
          name: `${DEPARTEMENT_NAMES[dept] || dept} (${dept})`,
          subtitle: `${deptCampings.length} camping${deptCampings.length > 1 ? 's' : ''}`,
          url: `/campings/departement/${dept}/`,
          count: deptCampings.length
        })
      }
    })

    setResults(newResults)
    setShowResults(newResults.length > 0)
  }, [searchQuery, campings, regions, departments, communes, selectedStars, hasPool, hasWifi, hasRestaurant])

  const handleResultClick = (url: string) => {
    router.push(url)
    setShowResults(false)
    setSearchQuery('')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (results.length > 0) {
      handleResultClick(results[0].url)
    }
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'camping': return '🏕️'
      case 'commune': return '📍'
      case 'region': return '🗺️'
      case 'departement': return '🏛️'
      default: return '📍'
    }
  }

  const activeFiltersCount = selectedStars.length + (hasPool ? 1 : 0) + (hasWifi ? 1 : 0) + (hasRestaurant ? 1 : 0)

  return (
    <div ref={searchRef} className={className} style={{ position: 'relative' }}>
      <form onSubmit={handleSearch} style={{
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        border: '1px solid var(--color-gray-200)'
      }}>
        {/* Barre de recherche principale */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-3)',
          marginBottom: showFilters ? 'var(--space-5)' : '0',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Camping, ville, région..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
              style={{
                width: '100%',
                padding: 'var(--space-4) var(--space-4) var(--space-4) var(--space-10)',
                border: '2px solid var(--color-gray-300)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--text-base)',
                outline: 'none',
                transition: 'all var(--transition-base)',
                fontWeight: 'var(--font-medium)'
              }}
              onFocus={(e) => e.target.style.borderColor = '#003580'}
              onBlur={(e) => setTimeout(() => e.target.style.borderColor = 'var(--color-gray-300)', 100)}
            />
            <svg
              style={{
                position: 'absolute',
                left: 'var(--space-4)',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: 'var(--color-gray-500)'
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: 'var(--space-4) var(--space-6)',
              backgroundColor: showFilters || activeFiltersCount > 0 ? '#003580' : 'var(--color-white)',
              color: showFilters || activeFiltersCount > 0 ? 'var(--color-white)' : '#003580',
              border: '2px solid #003580',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-semibold)',
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              whiteSpace: 'nowrap'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="21" x2="4" y2="14"/>
              <line x1="4" y1="10" x2="4" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12" y2="3"/>
              <line x1="20" y1="21" x2="20" y2="16"/>
              <line x1="20" y1="12" x2="20" y2="3"/>
              <line x1="1" y1="14" x2="7" y2="14"/>
              <line x1="9" y1="8" x2="15" y2="8"/>
              <line x1="17" y1="16" x2="23" y2="16"/>
            </svg>
            Filtres {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>

          <button
            type="submit"
            style={{
              padding: 'var(--space-4) var(--space-8)',
              backgroundColor: '#FEBB02',
              color: '#003580',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-bold)',
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(254, 187, 2, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Rechercher
          </button>
        </div>

        {/* Filtres avancés */}
        {showFilters && (
          <div style={{
            padding: 'var(--space-5)',
            backgroundColor: '#F8F9FA',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-gray-300)'
          }}>
            {/* Classement étoiles */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <label style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
                color: '#003580',
                marginBottom: 'var(--space-3)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Classement
              </label>
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                {['1', '2', '3', '4', '5'].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setSelectedStars(prev =>
                        prev.includes(star)
                          ? prev.filter(s => s !== star)
                          : [...prev, star]
                      )
                    }}
                    style={{
                      padding: 'var(--space-3) var(--space-4)',
                      backgroundColor: selectedStars.includes(star) ? '#003580' : 'var(--color-white)',
                      color: selectedStars.includes(star) ? 'var(--color-white)' : '#003580',
                      border: '2px solid #003580',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-semibold)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-base)'
                    }}
                  >
                    {star} ⭐
                  </button>
                ))}
              </div>
            </div>

            {/* Équipements */}
            <div>
              <label style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
                color: '#003580',
                marginBottom: 'var(--space-3)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Équipements
              </label>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  cursor: 'pointer',
                  padding: 'var(--space-2)',
                  backgroundColor: hasPool ? '#E3F2FD' : 'transparent',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-base)'
                }}>
                  <input
                    type="checkbox"
                    checked={hasPool}
                    onChange={(e) => setHasPool(e.target.checked)}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: '#003580'
                    }}
                  />
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: '#1F2937' }}>🏊 Piscine</span>
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  cursor: 'pointer',
                  padding: 'var(--space-2)',
                  backgroundColor: hasWifi ? '#E3F2FD' : 'transparent',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-base)'
                }}>
                  <input
                    type="checkbox"
                    checked={hasWifi}
                    onChange={(e) => setHasWifi(e.target.checked)}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: '#003580'
                    }}
                  />
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: '#1F2937' }}>📶 WiFi</span>
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  cursor: 'pointer',
                  padding: 'var(--space-2)',
                  backgroundColor: hasRestaurant ? '#E3F2FD' : 'transparent',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-base)'
                }}>
                  <input
                    type="checkbox"
                    checked={hasRestaurant}
                    onChange={(e) => setHasRestaurant(e.target.checked)}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: '#003580'
                    }}
                  />
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: '#1F2937' }}>🍽️ Restaurant</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Résultats autocomplete */}
      {showResults && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: 'var(--space-2)',
          backgroundColor: 'var(--color-white)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
          border: '1px solid var(--color-gray-300)',
          maxHeight: '450px',
          overflowY: 'auto',
          zIndex: 50
        }}>
          <div style={{
            padding: 'var(--space-3) var(--space-4)',
            borderBottom: '1px solid var(--color-gray-200)',
            backgroundColor: '#F8F9FA'
          }}>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-semibold)',
              color: '#003580',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {results.length} résultat{results.length > 1 ? 's' : ''}
            </span>
          </div>
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => handleResultClick(result.url)}
              style={{
                width: '100%',
                padding: 'var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                border: 'none',
                borderBottom: index < results.length - 1 ? '1px solid var(--color-gray-200)' : 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0F9FF'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span style={{ fontSize: '1.5rem' }}>{getResultIcon(result.type)}</span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-semibold)',
                  color: '#1F2937'
                }}>
                  {result.name}
                </div>
                {result.subtitle && (
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: '#6B7280',
                    marginTop: 'var(--space-1)'
                  }}>
                    {result.subtitle}
                  </div>
                )}
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
