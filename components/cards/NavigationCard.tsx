import React from 'react'
import Link from 'next/link'
import { Icon } from '../ui/Icon'

interface NavigationCardProps {
  title: string
  description: string
  href: string
  icon: string
  count?: number
}

export function NavigationCard({
  title,
  description,
  href,
  icon,
  count
}: NavigationCardProps) {
  return (
    <Link href={href} className="card" style={{ textDecoration: 'none' }}>
      <div className="card__header">
        <Icon name={icon} size="xl" style={{ color: 'var(--color-primary)' }} />
      </div>

      <div className="card__body">
        <h3 className="card__title" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
          {title}
        </h3>

        <p style={{ color: 'var(--color-gray-600)', marginBottom: '0' }}>
          {description}
        </p>

        {count !== undefined && (
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-primary)',
            fontWeight: 'var(--font-semibold)',
            marginTop: 'var(--space-3)',
            marginBottom: '0'
          }}>
            {count} disponibles
          </p>
        )}
      </div>
    </Link>
  )
}
