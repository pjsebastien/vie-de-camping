'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo" onClick={closeMenu}>
            <Image
              src="/images/logos/logo-black.png"
              alt="Vie de Camping - Guide des campings en France"
              width={180}
              height={40}
              priority
            />
          </Link>

          <button
            className={`hamburger ${isMenuOpen ? 'hamburger--active' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu de navigation"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
          </button>

          <nav
            className={`nav ${isMenuOpen ? 'nav--open' : ''}`}
            aria-label="Navigation principale"
          >
            <Link href="/" className="nav-link" onClick={closeMenu}>
              Accueil
            </Link>
            <Link href="/campings/" className="nav-link" onClick={closeMenu}>
              Campings
            </Link>
            <Link href="/campings/regions/" className="nav-link" onClick={closeMenu}>
              Régions
            </Link>
            <Link href="/campings/departements/" className="nav-link" onClick={closeMenu}>
              Départements
            </Link>
            <Link href="/materiel-camping/" className="nav-link" onClick={closeMenu}>
              Matériel
            </Link>
            <Link href="/a-propos/" className="nav-link" onClick={closeMenu}>
              À propos
            </Link>
          </nav>
        </div>
      </div>

      {/* Overlay pour fermer le menu en cliquant à l'extérieur */}
      {isMenuOpen && (
        <div
          className="nav-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  )
}
