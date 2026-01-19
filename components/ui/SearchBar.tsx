'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/utils'

interface SearchBarProps {
  regions: string[]
  departments: string[]
  className?: string
}

export function SearchBar({ regions, departments, className = '' }: SearchBarProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedDept, setSelectedDept] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedRegion) {
      router.push(`/campings/region/${slugify(selectedRegion)}/`)
    } else if (selectedDept) {
      router.push(`/campings/departement/${selectedDept}/`)
    } else if (searchQuery) {
      router.push(`/campings/?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className={className}
      style={{
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-4)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid var(--color-gray-200)',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 'var(--space-3)',
        maxWidth: '900px',
        margin: '0 auto'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--space-3)'
      }}>
        {/* Search input */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Rechercher un camping, une ville..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--space-3) var(--space-4)',
              border: '1px solid var(--color-gray-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--text-base)',
              outline: 'none',
              transition: 'all var(--transition-base)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-primary)'
              e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--color-gray-300)'
              e.target.style.boxShadow = 'none'
            }}
          />
        </div>

        {/* Region selector */}
        <div>
          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value)
              setSelectedDept('')
            }}
            style={{
              width: '100%',
              padding: 'var(--space-3) var(--space-4)',
              border: '1px solid var(--color-gray-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--text-base)',
              backgroundColor: 'var(--color-white)',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all var(--transition-base)',
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236B7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: 'var(--space-8)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-primary)'
              e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--color-gray-300)'
              e.target.style.boxShadow = 'none'
            }}
          >
            <option value="">Toutes les régions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Department selector */}
        <div>
          <select
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value)
              setSelectedRegion('')
            }}
            style={{
              width: '100%',
              padding: 'var(--space-3) var(--space-4)',
              border: '1px solid var(--color-gray-300)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--text-base)',
              backgroundColor: 'var(--color-white)',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all var(--transition-base)',
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236B7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: 'var(--space-8)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-primary)'
              e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--color-gray-300)'
              e.target.style.boxShadow = 'none'
            }}
          >
            <option value="">Tous les départements</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search button */}
      <button
        type="submit"
        style={{
          padding: 'var(--space-4) var(--space-6)',
          background: 'var(--color-bg-gradient)',
          color: 'var(--color-white)',
          border: 'none',
          borderRadius: 'var(--radius-lg)',
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--font-semibold)',
          cursor: 'pointer',
          transition: 'all var(--transition-base)',
          boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(14, 165, 233, 0.4)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)'
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        Rechercher
      </button>
    </form>
  )
}
