import React from 'react'
import Image from 'next/image'

interface HeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  stats?: Array<{
    value: string | number
    label: string
  }>
  className?: string
}

export function Hero({
  title,
  subtitle,
  backgroundImage,
  stats,
  className = ''
}: HeroProps) {
  return (
    <section className={`hero ${backgroundImage ? 'hero--with-image' : ''} ${className}`.trim()}>
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="hero__background"
          style={{ objectFit: 'cover' }}
          priority
        />
      )}

      <div className="container">
        <div className="hero__content">
          <h1 className="hero__title">{title}</h1>

          {subtitle && (
            <p className="hero__subtitle">{subtitle}</p>
          )}

          {stats && stats.length > 0 && (
            <div className="hero__stats">
              {stats.map((stat, index) => (
                <div key={index} className="hero__stat">
                  <span className="hero__stat-value">{stat.value}</span>
                  <span className="hero__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
