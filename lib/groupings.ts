import { Camping } from './types'
import { loadCampings } from './loadCampings'
import { DEPARTEMENT_TO_REGION, DEPARTEMENT_NAMES } from './regions'
import { slugify } from './utils'

/**
 * Regroupe les campings par région
 */
export function groupCampingsByRegion(): Record<string, Camping[]> {
  const campings = loadCampings()
  const grouped: Record<string, Camping[]> = {}

  for (const camping of campings) {
    const region = DEPARTEMENT_TO_REGION[camping.departement]
    if (region) {
      if (!grouped[region]) {
        grouped[region] = []
      }
      grouped[region].push(camping)
    }
  }

  return grouped
}

/**
 * Regroupe les campings par département
 */
export function groupCampingsByDepartement(): Record<string, Camping[]> {
  const campings = loadCampings()
  const grouped: Record<string, Camping[]> = {}

  for (const camping of campings) {
    const dept = camping.departement
    if (!grouped[dept]) {
      grouped[dept] = []
    }
    grouped[dept].push(camping)
  }

  return grouped
}

/**
 * Regroupe les campings par commune
 */
export function groupCampingsByCommune(): Record<string, Camping[]> {
  const campings = loadCampings()
  const grouped: Record<string, Camping[]> = {}

  for (const camping of campings) {
    const commune = camping.commune
    if (!grouped[commune]) {
      grouped[commune] = []
    }
    grouped[commune].push(camping)
  }

  return grouped
}

/**
 * Récupère les campings d'une région par son slug
 */
export function getCampingsByRegionSlug(regionSlug: string): {
  region: string
  campings: Camping[]
} | null {
  const grouped = groupCampingsByRegion()

  for (const [region, campings] of Object.entries(grouped)) {
    if (slugify(region) === regionSlug) {
      return { region, campings }
    }
  }

  return null
}

/**
 * Récupère les campings d'un département par son code
 */
export function getCampingsByDepartement(deptCode: string): {
  departement: string
  departementName: string
  campings: Camping[]
} | null {
  const grouped = groupCampingsByDepartement()
  const campings = grouped[deptCode]

  if (!campings) {
    return null
  }

  const departementName = DEPARTEMENT_NAMES[deptCode] || deptCode

  return {
    departement: deptCode,
    departementName,
    campings,
  }
}

/**
 * Récupère les campings d'une commune par son slug
 */
export function getCampingsByCommuneSlug(communeSlug: string): {
  commune: string
  campings: Camping[]
} | null {
  const grouped = groupCampingsByCommune()

  for (const [commune, campings] of Object.entries(grouped)) {
    if (slugify(commune) === communeSlug) {
      return { commune, campings }
    }
  }

  return null
}

/**
 * Liste toutes les régions disponibles
 */
export function getAllRegions(): string[] {
  const grouped = groupCampingsByRegion()
  return Object.keys(grouped).sort()
}

/**
 * Liste tous les départements disponibles
 */
export function getAllDepartements(): string[] {
  const grouped = groupCampingsByDepartement()
  return Object.keys(grouped).sort()
}

/**
 * Liste toutes les communes disponibles
 */
export function getAllCommunes(): string[] {
  const grouped = groupCampingsByCommune()
  return Object.keys(grouped).sort()
}

/**
 * Récupère les départements d'une région
 */
export function getDepartementsInRegion(region: string): string[] {
  const departements = new Set<string>()

  for (const [dept, reg] of Object.entries(DEPARTEMENT_TO_REGION)) {
    if (reg === region) {
      departements.add(dept)
    }
  }

  return Array.from(departements).sort()
}

/**
 * Récupère les communes d'un département
 */
export function getCommunesInDepartement(deptCode: string): string[] {
  const campings = loadCampings()
  const communes = new Set<string>()

  for (const camping of campings) {
    if (camping.departement === deptCode) {
      communes.add(camping.commune)
    }
  }

  return Array.from(communes).sort()
}
