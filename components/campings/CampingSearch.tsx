'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Camping } from '@/lib/types'
import { slugify } from '@/lib/utils'

interface CampingSearchProps {
  campings: Camping[]
  showAdvancedFilters?: boolean
}

export function CampingSearch({ campings, showAdvancedFilters = true }: CampingSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Filtres
  const [selectedClassement, setSelectedClassement] = useState<string>('')
  const [hasPiscine, setHasPiscine] = useState(false)
  const [hasRestaurant, setHasRestaurant] = useState(false)
  const [hasAnimaux, setHasAnimaux] = useState(false)
  const [hasWifi, setHasWifi] = useState(false)
  const [hasMobilHomes, setHasMobilHomes] = useState(false)
  const [minEmplacements, setMinEmplacements] = useState<number | ''>('')

  // Extraire les classements uniques pour le filtre
  const classements = useMemo(() => {
    const unique = new Set<string>()
    campings.forEach(c => {
      if (c.classement) unique.add(c.classement)
    })
    return Array.from(unique).sort()
  }, [campings])

  // Filtrer les campings
  const filteredCampings = useMemo(() => {
    let results = [...campings]

    // Recherche textuelle
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      results = results.filter(c =>
        c.nom.toLowerCase().includes(query) ||
        c.commune.toLowerCase().includes(query) ||
        c.departement.toLowerCase().includes(query)
      )
    }

    // Filtre par classement
    if (selectedClassement) {
      results = results.filter(c => c.classement === selectedClassement)
    }

    // Filtres équipements
    if (hasPiscine) {
      results = results.filter(c => c.piscine === true)
    }
    if (hasRestaurant) {
      results = results.filter(c => c.restaurant === true)
    }
    if (hasAnimaux) {
      results = results.filter(c => c.animauxAcceptes === true)
    }
    if (hasWifi) {
      results = results.filter(c => c.wifi === true)
    }
    if (hasMobilHomes) {
      results = results.filter(c => c.mobilHomes === true)
    }

    // Filtre par nombre d'emplacements
    if (minEmplacements && minEmplacements > 0) {
      results = results.filter(c =>
        c.nombreEmplacements && c.nombreEmplacements >= minEmplacements
      )
    }

    return results
  }, [campings, searchQuery, selectedClassement, hasPiscine, hasRestaurant, hasAnimaux, hasWifi, hasMobilHomes, minEmplacements])

  const hasActiveFilters = selectedClassement || hasPiscine || hasRestaurant || hasAnimaux || hasWifi || hasMobilHomes || (minEmplacements && minEmplacements > 0)
  const isSearching = searchQuery.trim() || hasActiveFilters

  const resetFilters = () => {
    setSelectedClassement('')
    setHasPiscine(false)
    setHasRestaurant(false)
    setHasAnimaux(false)
    setHasWifi(false)
    setHasMobilHomes(false)
    setMinEmplacements('')
  }

  return (
    <div className="camping-search">
      {/* Barre de recherche principale */}
      <div className="camping-search-bar">
        <div className="camping-search-input-wrapper">
          <svg className="camping-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Rechercher un camping par nom, commune ou département..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="camping-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="camping-search-clear"
              aria-label="Effacer la recherche"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {showAdvancedFilters && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`camping-search-filter-toggle ${showFilters ? 'active' : ''}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            Filtres {hasActiveFilters && <span className="filter-badge">{[selectedClassement, hasPiscine, hasRestaurant, hasAnimaux, hasWifi, hasMobilHomes, minEmplacements].filter(Boolean).length}</span>}
          </button>
        )}
      </div>

      {/* Panneau de filtres avancés */}
      {showAdvancedFilters && showFilters && (
        <div className="camping-search-filters">
          <div className="camping-search-filters-grid">
            {/* Classement */}
            <div className="filter-group">
              <label className="filter-label">Classement</label>
              <select
                value={selectedClassement}
                onChange={(e) => setSelectedClassement(e.target.value)}
                className="filter-select"
              >
                <option value="">Tous les classements</option>
                {classements.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Nombre d'emplacements minimum */}
            <div className="filter-group">
              <label className="filter-label">Emplacements min.</label>
              <input
                type="number"
                value={minEmplacements}
                onChange={(e) => setMinEmplacements(e.target.value ? parseInt(e.target.value) : '')}
                placeholder="Ex: 50"
                min="0"
                className="filter-input"
              />
            </div>
          </div>

          {/* Équipements */}
          <div className="filter-group">
            <label className="filter-label">Équipements et services</label>
            <div className="filter-checkboxes">
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={hasPiscine}
                  onChange={(e) => setHasPiscine(e.target.checked)}
                />
                <span className="checkbox-icon">🏊</span>
                Piscine
              </label>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={hasRestaurant}
                  onChange={(e) => setHasRestaurant(e.target.checked)}
                />
                <span className="checkbox-icon">🍽️</span>
                Restaurant
              </label>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={hasAnimaux}
                  onChange={(e) => setHasAnimaux(e.target.checked)}
                />
                <span className="checkbox-icon">🐕</span>
                Animaux acceptés
              </label>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={hasWifi}
                  onChange={(e) => setHasWifi(e.target.checked)}
                />
                <span className="checkbox-icon">📶</span>
                WiFi
              </label>
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={hasMobilHomes}
                  onChange={(e) => setHasMobilHomes(e.target.checked)}
                />
                <span className="checkbox-icon">🏠</span>
                Mobil-homes
              </label>
            </div>
          </div>

          {hasActiveFilters && (
            <button onClick={resetFilters} className="filter-reset">
              Réinitialiser les filtres
            </button>
          )}
        </div>
      )}

      {/* Résultats */}
      {isSearching && (
        <div className="camping-search-results">
          <div className="camping-search-results-header">
            <span className="results-count">
              {filteredCampings.length} camping{filteredCampings.length > 1 ? 's' : ''} trouvé{filteredCampings.length > 1 ? 's' : ''}
            </span>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="results-reset">
                Effacer les filtres
              </button>
            )}
          </div>

          {filteredCampings.length > 0 ? (
            <div className="camping-search-results-list">
              {filteredCampings.slice(0, 50).map((camping) => (
                <Link
                  key={camping.slug}
                  href={`/campings/${camping.slug}/`}
                  className="camping-search-result-item"
                >
                  <div className="result-item-main">
                    <h4 className="result-item-name">{camping.nom}</h4>
                    <p className="result-item-location">
                      {camping.commune} ({camping.departement})
                      {camping.nombreEmplacements && ` • ${camping.nombreEmplacements} emplacements`}
                    </p>
                    {/* Tags équipements */}
                    <div className="result-item-tags">
                      {camping.piscine && <span className="result-tag">🏊 Piscine</span>}
                      {camping.restaurant && <span className="result-tag">🍽️ Restaurant</span>}
                      {camping.animauxAcceptes && <span className="result-tag">🐕 Animaux</span>}
                      {camping.wifi && <span className="result-tag">📶 WiFi</span>}
                    </div>
                  </div>
                  <div className="result-item-badge">
                    {camping.classement}
                  </div>
                </Link>
              ))}
              {filteredCampings.length > 50 && (
                <p className="results-more">
                  ... et {filteredCampings.length - 50} autres campings. Affinez votre recherche pour voir plus de résultats.
                </p>
              )}
            </div>
          ) : (
            <div className="camping-search-no-results">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
                <path d="M8 8l6 6M14 8l-6 6"/>
              </svg>
              <p>Aucun camping ne correspond à votre recherche.</p>
              <button onClick={resetFilters} className="no-results-reset">
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
