'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/meilleures-tentes-de-toit/', label: 'Comparatif', icon: '🏆' },
  { href: '/tente-de-toit-rigide/', label: 'Rigides', icon: '🏠' },
  { href: '/tente-de-toit-voiture/', label: 'Voiture', icon: '🚗' },
  { href: '/tente-de-toit-4x4/', label: '4x4', icon: '🚙' },
  { href: '/tente-de-toit-pour-van/', label: 'Van', icon: '🚐' },
  { href: '/tente-de-toit-2-places/', label: '2 places', icon: '👫' },
  { href: '/tente-de-toit-3-places/', label: '3 places', icon: '👨‍👩‍👦' },
  { href: '/tente-de-toit-4-places/', label: '4 places', icon: '👨‍👩‍👧‍👦' },
  { href: '/tente-de-toit-pas-cher/', label: 'Pas cher', icon: '💰' },
  { href: '/kaylop-tente-de-toit-avis/', label: 'Avis KAILOP', icon: '⭐' },
]

export function TenteSubNav() {
  const pathname = usePathname()

  return (
    <nav className="tente-subnav" aria-label="Navigation tentes de toit">
      <div className="container">
        <div className="tente-subnav-scroll">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`tente-subnav-item ${pathname === item.href ? 'active' : ''}`}
            >
              <span className="tente-subnav-icon">{item.icon}</span>
              <span className="tente-subnav-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
