import React from 'react'

interface HeroCleanProps {
  title: string
  subtitle?: string
  stats?: Array<{ value: string | number; label: string }>
  children?: React.ReactNode
  className?: string
}

export function HeroClean({ title, subtitle, stats, children, className = '' }: HeroCleanProps) {
  return (
    <section
      className={`hero-clean ${className}`.trim()}
      style={{
        backgroundColor: 'var(--color-white)',
        padding: 'var(--space-10) 0 var(--space-8) 0',
        borderBottom: '1px solid var(--color-gray-200)'
      }}
    >
      <div className="container">
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-gray-900)',
            marginBottom: 'var(--space-4)',
            lineHeight: 'var(--leading-tight)'
          }}>
            {title}
          </h1>

          {subtitle && (
            <p style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-gray-600)',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: stats ? 'var(--space-6)' : '0',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              {subtitle}
            </p>
          )}

          {stats && stats.length > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'var(--space-8)',
              marginTop: 'var(--space-6)',
              flexWrap: 'wrap'
            }}>
              {stats.map((stat, index) => (
                <div key={index} style={{
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--color-primary)',
                    lineHeight: '1'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-600)',
                    marginTop: 'var(--space-2)',
                    fontWeight: 'var(--font-medium)'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {children && (
            <div style={{ marginTop: 'var(--space-6)' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
