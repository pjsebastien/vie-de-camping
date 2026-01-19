import { Camping } from './types'

/**
 * Génère une liste des équipements disponibles
 */
export function generateEquipementsList(camping: Camping): string[] {
  const equipements: string[] = []

  if (camping.piscine) equipements.push('Piscine')
  if (camping.restaurant) equipements.push('Restaurant')
  if (camping.bar) equipements.push('Bar')
  if (camping.epicerie) equipements.push('Épicerie')
  if (camping.wifi) equipements.push('WiFi')
  if (camping.laverie) equipements.push('Laverie')
  if (camping.aireDeJeux) equipements.push('Aire de jeux')
  if (camping.locationVelos) equipements.push('Location de vélos')

  return equipements
}

/**
 * Génère une liste des types d'hébergement disponibles
 */
export function generateHebergementsList(camping: Camping): string[] {
  const hebergements: string[] = []

  if (camping.emplacementsTentes) hebergements.push('Emplacements pour tentes')
  if (camping.emplacementsCaravanes) hebergements.push('Emplacements pour caravanes')
  if (camping.emplacementsCampingCars) hebergements.push('Emplacements pour camping-cars')
  if (camping.chalets) hebergements.push('Chalets')
  if (camping.mobilHomes) hebergements.push('Mobil-homes')
  if (camping.bungalows) hebergements.push('Bungalows')

  return hebergements
}

/**
 * Génère du texte sur l'environnement du camping
 */
export function generateEnvironnementText(camping: Camping): string | null {
  const proximites: string[] = []

  if (camping.proximiteMer) proximites.push('la mer')
  if (camping.proximiteLac) proximites.push('un lac')
  if (camping.proximiteRiviere) proximites.push('une rivière')
  if (camping.proximiteForet) proximites.push('une forêt')
  if (camping.proximiteMontagne) proximites.push('la montagne')

  if (proximites.length === 0) return null

  if (proximites.length === 1) {
    return `Le camping est situé à proximité de ${proximites[0]}`
  } else if (proximites.length === 2) {
    return `Le camping est situé à proximité de ${proximites.join(' et ')}`
  } else {
    const derniere = proximites.pop()
    return `Le camping est situé à proximité ${proximites.join(', ')} et ${derniere}`
  }
}

/**
 * Génère des informations pratiques
 */
export function generateInfosPratiques(camping: Camping): string[] {
  const infos: string[] = []

  if (camping.animauxAcceptes) {
    infos.push('Animaux acceptés')
  }

  if (camping.accessiblePMR) {
    infos.push('Accessible aux personnes à mobilité réduite')
  }

  if (camping.ouvertureAnnuelle) {
    infos.push('Ouvert toute l\'année')
  }

  if (camping.classementProroge) {
    infos.push('Classement prorogé')
  }

  return infos
}

/**
 * Génère statistiques d'équipements pour une commune
 */
export function generateCommuneEquipementsStats(campings: Camping[]): string | null {
  const stats = {
    piscine: 0,
    restaurant: 0,
    wifi: 0,
    animaux: 0,
  }

  for (const c of campings) {
    if (c.piscine) stats.piscine++
    if (c.restaurant) stats.restaurant++
    if (c.wifi) stats.wifi++
    if (c.animauxAcceptes) stats.animaux++
  }

  const details: string[] = []
  if (stats.piscine > 0) details.push(`${stats.piscine} avec piscine`)
  if (stats.restaurant > 0) details.push(`${stats.restaurant} avec restaurant`)
  if (stats.wifi > 0) details.push(`${stats.wifi} avec WiFi`)
  if (stats.animaux > 0) details.push(`${stats.animaux} acceptant les animaux`)

  if (details.length === 0) return null

  return `Parmi les campings de la commune : ${details.join(', ')}`
}

/**
 * Génère statistiques d'équipements pour un département
 */
export function generateDepartementEquipementsStats(campings: Camping[]): string | null {
  const stats = {
    piscine: 0,
    wifi: 0,
    animaux: 0,
  }

  for (const c of campings) {
    if (c.piscine) stats.piscine++
    if (c.wifi) stats.wifi++
    if (c.animauxAcceptes) stats.animaux++
  }

  const pctPiscine = Math.round((stats.piscine / campings.length) * 100)
  const pctWifi = Math.round((stats.wifi / campings.length) * 100)
  const pctAnimaux = Math.round((stats.animaux / campings.length) * 100)

  const details: string[] = []
  if (pctPiscine >= 5) details.push(`${pctPiscine}% disposent d'une piscine`)
  if (pctWifi >= 5) details.push(`${pctWifi}% proposent le WiFi`)
  if (pctAnimaux >= 5) details.push(`${pctAnimaux}% acceptent les animaux`)

  if (details.length === 0) return null

  return `Équipements : ${details.join(', ')}`
}
