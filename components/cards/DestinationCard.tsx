import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface DestinationCardProps {
  title: string
  description: string
  href: string
  imageSrc: string
  count?: number
  className?: string
}

export function DestinationCard({
  title,
  description,
  href,
  imageSrc,
  count,
  className = ''
}: DestinationCardProps) {
  return (
    <Link
      href={href}
      className={`destination-card ${className}`.trim()}
      style={{
        textDecoration: 'none',
        display: 'block',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: '1px solid var(--color-gray-200)',
        backgroundColor: 'var(--color-white)',
        boxShadow: 'var(--shadow-card)',
        transition: 'all var(--transition-base)',
        height: '100%'
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '200px',
        overflow: 'hidden'
      }}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {count !== undefined && (
          <div style={{
            position: 'absolute',
            top: 'var(--space-3)',
            right: 'var(--space-3)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'var(--color-white)',
            padding: 'var(--space-2) var(--space-3)',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-semibold)'
          }}>
            {count} {count === 1 ? 'camping' : 'campings'}
          </div>
        )}
      </div>

      <div style={{
        padding: 'var(--space-4)'
      }}>
        <h3 style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--color-gray-900)',
          marginBottom: 'var(--space-2)',
          lineHeight: 'var(--leading-tight)'
        }}>
          {title}
        </h3>

        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-gray-600)',
          lineHeight: 'var(--leading-relaxed)',
          marginBottom: '0'
        }}>
          {description}
        </p>
      </div>
    </Link>
  )
}
