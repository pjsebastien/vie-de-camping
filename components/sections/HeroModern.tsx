import React from 'react'

interface HeroModernProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
}

export function HeroModern({ title, subtitle, children, className = '' }: HeroModernProps) {
  return (
    <section
      className={`hero-modern ${className}`.trim()}
      style={{
        background: 'linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)',
        color: 'var(--color-white)',
        padding: 'var(--space-12) 0 var(--space-10) 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-white)',
            marginBottom: 'var(--space-4)',
            lineHeight: '1.2',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {title}
          </h1>

          {subtitle && (
            <p style={{
              fontSize: 'var(--text-xl)',
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: 'var(--space-8)',
              maxWidth: '700px',
              margin: '0 auto var(--space-8) auto'
            }}>
              {subtitle}
            </p>
          )}

          {children && (
            <div style={{ marginTop: 'var(--space-8)' }}>
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Wave separator */}
      <div style={{
        position: 'absolute',
        bottom: '-1px',
        left: 0,
        right: 0,
        height: '80px',
        overflow: 'hidden',
        lineHeight: 0
      }}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="var(--color-white)"
            opacity="0.5"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="var(--color-white)"
            opacity="0.5"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="var(--color-white)"
          />
        </svg>
      </div>
    </section>
  )
}
