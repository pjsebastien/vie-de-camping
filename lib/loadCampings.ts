import fs from 'fs'
import path from 'path'
import { Camping } from './types'

/**
 * Charge tous les campings depuis le fichier JSON enrichi
 */
export function loadCampings(): Camping[] {
  const jsonPath = path.join(process.cwd(), 'data', 'vie-de-camping.json')
  const fileContent = fs.readFileSync(jsonPath, 'utf-8')
  const campings: Camping[] = JSON.parse(fileContent)

  // Déjà trié par nom dans le fichier JSON
  return campings
}

/**
 * Charge un camping par son slug
 */
export function loadCampingBySlug(slug: string): Camping | null {
  const campings = loadCampings()
  return campings.find(c => c.slug === slug) || null
}
