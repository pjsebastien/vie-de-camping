import React from 'react'
import { Icon } from '../ui/Icon'

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{
        width: '64px',
        height: '64px',
        margin: '0 auto var(--space-4) auto',
        backgroundColor: 'var(--color-primary-light)',
        color: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon name={icon} size="xl" />
      </div>

      <h3 style={{
        fontSize: 'var(--text-xl)',
        marginBottom: 'var(--space-3)',
        color: 'var(--color-gray-900)'
      }}>
        {title}
      </h3>

      <p style={{
        color: 'var(--color-gray-600)',
        marginBottom: '0',
        lineHeight: 'var(--leading-relaxed)'
      }}>
        {description}
      </p>
    </div>
  )
}
