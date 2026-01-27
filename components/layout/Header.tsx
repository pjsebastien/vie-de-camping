'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTentesMenuOpen, setIsTentesMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsTentesMenuOpen(false)
  }

  const toggleTentesMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsTentesMenuOpen(!isTentesMenuOpen)
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

            {/* Tentes de toit mega menu */}
            <div className="nav-dropdown">
              <button
                className={`nav-dropdown-trigger ${isTentesMenuOpen ? 'active' : ''}`}
                onClick={toggleTentesMenu}
                aria-label="Tentes de toit"
              >
                Tentes de toit
                <span className="dropdown-arrow">▼</span>
              </button>

              {isTentesMenuOpen && (
                <div className="mega-menu mega-menu--open">
                  <div className="mega-menu-content">
                    <div className="mega-menu-column">
                      <h4>Types</h4>
                      <Link href="/meilleures-tentes-de-toit/" onClick={closeMenu}>
                        Comparatif complet
                      </Link>
                      <Link href="/tente-de-toit-rigide/" onClick={closeMenu}>
                        Tentes rigides
                      </Link>
                      <Link href="/fabriquer-tente-toit-diy/" onClick={closeMenu}>
                        DIY et fabrication
                      </Link>
                    </div>
                    <div className="mega-menu-column">
                      <h4>Par véhicule</h4>
                      <Link href="/tente-de-toit-voiture/" onClick={closeMenu}>
                        Voiture
                      </Link>
                      <Link href="/tente-de-toit-4x4/" onClick={closeMenu}>
                        4x4
                      </Link>
                      <Link href="/tente-de-toit-pour-van/" onClick={closeMenu}>
                        Van
                      </Link>
                    </div>
                    <div className="mega-menu-column">
                      <h4>Par capacité</h4>
                      <Link href="/tente-de-toit-2-places/" onClick={closeMenu}>
                        2 places
                      </Link>
                      <Link href="/tente-de-toit-3-places/" onClick={closeMenu}>
                        3 places
                      </Link>
                      <Link href="/tente-de-toit-4-places/" onClick={closeMenu}>
                        4 places
                      </Link>
                      <Link href="/tente-de-toit-5-places/" onClick={closeMenu}>
                        5 places
                      </Link>
                    </div>
                    <div className="mega-menu-column">
                      <h4>Budget</h4>
                      <Link href="/tente-de-toit-pas-cher/" onClick={closeMenu}>
                        Prix abordables
                      </Link>
                      <Link href="/kaylop-tente-de-toit-avis/" onClick={closeMenu}>
                        Marque KAILOP
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

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
