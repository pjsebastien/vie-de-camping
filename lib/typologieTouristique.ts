import { Camping } from './types'

/**
 * Type de profil touristique déduit
 */
export interface ProfilTouristique {
  taille: 'micro' | 'petit' | 'moyen' | 'grand' | 'très grand'
  ambiance: string[]  // ['calme', 'familial', 'nature', 'rural']
  standing: 'basique' | 'standard' | 'confort' | 'premium' | 'luxe'
  contexteLocal: string[]  // ['zone rurale', 'ville moyenne', 'grande ville']
  typeClientele: string[]  // ['camping traditionnel', 'camping-car', 'hébergements équipés']
}

/**
 * Détermine la taille du camping
 */
function determineTaille(camping: Camping): ProfilTouristique['taille'] {
  const emplacements = camping.nombreEmplacements || 0

  if (emplacements === 0) return 'petit'
  if (emplacements <= 25) return 'micro'
  if (emplacements <= 100) return 'petit'
  if (emplacements <= 200) return 'moyen'
  if (emplacements <= 400) return 'grand'
  return 'très grand'
}

/**
 * Détermine l'ambiance du camping
 */
function determineAmbiance(camping: Camping): string[] {
  const ambiances: string[] = []
  const emplacements = camping.nombreEmplacements || 0
  const population = camping.populationCommune || 0

  // Basé sur la taille
  if (emplacements <= 50) {
    ambiances.push('calme')
    ambiances.push('intimiste')
  }

  if (emplacements <= 25) {
    ambiances.push('familial')
  }

  // Basé sur le type
  if (camping.classement === 'Aire naturelle') {
    ambiances.push('nature')
    ambiances.push('authentique')
  }

  // Basé sur la localisation
  if (population < 1000) {
    ambiances.push('rural')
    ambiances.push('isolé')
  } else if (population < 5000) {
    ambiances.push('village')
  }

  // Basé sur la catégorie
  if (camping.categorie === 'LOISIRS') {
    ambiances.push('animé')
  } else if (camping.categorie === 'TOURISME') {
    ambiances.push('touristique')
  }

  return ambiances.filter((v, i, a) => a.indexOf(v) === i) // Unique
}

/**
 * Détermine le standing
 */
function determineStanding(camping: Camping): ProfilTouristique['standing'] {
  const classement = camping.classement.toLowerCase()

  if (classement.includes('5 étoiles')) return 'luxe'
  if (classement.includes('4 étoiles')) return 'premium'
  if (classement.includes('3 étoiles')) return 'confort'
  if (classement.includes('2 étoiles') || classement.includes('1 étoile')) return 'standard'
  return 'basique'  // Aire naturelle
}

/**
 * Détermine le contexte local
 */
function determineContexteLocal(camping: Camping): string[] {
  const contextes: string[] = []
  const population = camping.populationCommune || 0
  const popDept = camping.populationDepartement || 0

  // Contexte de la commune
  if (population >= 100000) {
    contextes.push('grande ville')
    contextes.push('zone urbaine')
  } else if (population >= 20000) {
    contextes.push('ville moyenne')
    contextes.push('zone périurbaine')
  } else if (population >= 5000) {
    contextes.push('petite ville')
  } else if (population >= 1000) {
    contextes.push('village')
    contextes.push('zone rurale')
  } else {
    contextes.push('hameau')
    contextes.push('zone rurale isolée')
  }

  // Densité départementale
  const nombreCommunes = camping.nombreCommunesDepartement || 1
  const densite = popDept / nombreCommunes

  if (densite < 1000) {
    contextes.push('département peu dense')
  } else if (densite > 5000) {
    contextes.push('département très peuplé')
  }

  return contextes.filter((v, i, a) => a.indexOf(v) === i)
}

/**
 * Détermine le type de clientèle cible
 */
function determineTypeClientele(camping: Camping): string[] {
  const types: string[] = []

  // Basé sur le type de classement
  if (camping.classement === 'Aire naturelle') {
    types.push('camping traditionnel')
    types.push('amateurs de nature')
  }

  // Basé sur les hébergements équipés
  if (camping.mobilHomes || camping.chalets || camping.bungalows) {
    types.push('hébergements équipés')
    types.push('séjours tout confort')
  }

  // Basé sur les emplacements
  if (camping.emplacementsCampingCars) {
    types.push('camping-cars')
  }

  if (camping.emplacementsTentes) {
    types.push('tentes et toiles')
  }

  if (camping.emplacementsCaravanes) {
    types.push('caravanes')
  }

  // Par défaut
  if (types.length === 0) {
    types.push('tous types de séjours')
  }

  return types.filter((v, i, a) => a.indexOf(v) === i)
}

/**
 * Génère le profil touristique complet
 */
export function genererProfilTouristique(camping: Camping): ProfilTouristique {
  return {
    taille: determineTaille(camping),
    ambiance: determineAmbiance(camping),
    standing: determineStanding(camping),
    contexteLocal: determineContexteLocal(camping),
    typeClientele: determineTypeClientele(camping),
  }
}

/**
 * Génère un texte descriptif du profil
 */
export function genererDescriptionProfil(profil: ProfilTouristique, camping: Camping): string {
  const parts: string[] = []

  // Phrase sur la taille et l'ambiance
  const tailleTexte = {
    'micro': 'très petit camping',
    'petit': 'petit camping',
    'moyen': 'camping de taille moyenne',
    'grand': 'grand camping',
    'très grand': 'très grand camping',
  }

  const ambiance = profil.ambiance.slice(0, 2).join(' et ')
  if (ambiance) {
    parts.push(`${tailleTexte[profil.taille]} ${ambiance}`)
  } else {
    parts.push(tailleTexte[profil.taille])
  }

  // Phrase sur le standing
  const standingTexte = {
    'basique': 'Établissement nature sans prétention',
    'standard': 'Établissement aux prestations standards',
    'confort': 'Établissement confortable',
    'premium': 'Établissement haut de gamme',
    'luxe': 'Établissement de luxe',
  }
  parts.push(standingTexte[profil.standing])

  // Contexte local
  const contexte = profil.contexteLocal[0]
  if (contexte) {
    if (contexte.includes('rural') || contexte.includes('village')) {
      parts.push(`implanté en ${contexte}`)
    } else if (contexte.includes('ville')) {
      parts.push(`situé en ${contexte}`)
    }
  }

  return parts.join('. ') + '.'
}

/**
 * Génère des points forts déduits
 */
export function genererPointsFortsDeduits(profil: ProfilTouristique, camping: Camping): string[] {
  const points: string[] = []

  // Points basés sur la taille
  if (profil.taille === 'micro' || profil.taille === 'petit') {
    points.push('Cadre intimiste et convivial')
    points.push('Accueil personnalisé')
  }

  if (profil.taille === 'très grand' || profil.taille === 'grand') {
    points.push('Large choix d\'emplacements')
    points.push('Infrastructure complète')
  }

  // Points basés sur l'ambiance
  if (profil.ambiance.includes('calme')) {
    points.push('Environnement calme et reposant')
  }

  if (profil.ambiance.includes('nature') || profil.ambiance.includes('rural')) {
    points.push('Immersion nature garantie')
  }

  if (profil.ambiance.includes('familial')) {
    points.push('Atmosphère familiale')
  }

  // Points basés sur le standing
  if (profil.standing === 'premium' || profil.standing === 'luxe') {
    points.push('Prestations de qualité supérieure')
  }

  // Points basés sur le contexte
  if (profil.contexteLocal.some(c => c.includes('rural') || c.includes('isolé'))) {
    points.push('Éloignement de l\'agitation urbaine')
  }

  if (profil.contexteLocal.includes('grande ville')) {
    points.push('Accès facile aux commodités urbaines')
  }

  // Points basés sur la population locale
  if (camping.populationCommune && camping.populationCommune < 500) {
    points.push('Authenticité préservée')
  }

  return points.slice(0, 5) // Max 5 points
}

/**
 * Détermine le type de séjour recommandé
 */
export function determinerSejourRecommande(profil: ProfilTouristique, camping: Camping): string[] {
  const sejours: string[] = []

  // Basé sur la taille et l'ambiance
  if (profil.ambiance.includes('calme') || profil.ambiance.includes('nature')) {
    sejours.push('Séjour ressourçant')
    sejours.push('Déconnexion')
  }

  if (profil.taille === 'micro' || profil.taille === 'petit') {
    sejours.push('Week-end au vert')
    sejours.push('Séjour authentique')
  }

  if (profil.ambiance.includes('familial')) {
    sejours.push('Vacances en famille')
  }

  if (camping.classement === 'Aire naturelle') {
    sejours.push('Camping traditionnel')
    sejours.push('Retour aux sources')
  }

  if (profil.standing === 'premium' || profil.standing === 'luxe') {
    sejours.push('Séjour confort')
    sejours.push('Vacances tout équipé')
  }

  // Basé sur la localisation
  if (camping.populationCommune && camping.populationCommune < 2000) {
    sejours.push('Tourisme rural')
  }

  return sejours.filter((v, i, a) => a.indexOf(v) === i).slice(0, 4)
}

/**
 * Génère un comparatif avec la moyenne locale
 */
export function genererComparatifLocal(camping: Camping, campingsCommune: Camping[]): string | null {
  if (campingsCommune.length <= 1) return null

  const moyenneEmplacements = campingsCommune.reduce((sum, c) => sum + (c.nombreEmplacements || 0), 0) / campingsCommune.length
  const emplacements = camping.nombreEmplacements || 0

  if (emplacements === 0 || moyenneEmplacements === 0) return null

  const ratio = emplacements / moyenneEmplacements

  if (ratio >= 1.5) {
    return `Ce camping fait partie des plus grands de la commune avec ${emplacements} emplacements, au-dessus de la moyenne locale (${Math.round(moyenneEmplacements)} emplacements)`
  } else if (ratio <= 0.66) {
    return `Avec ${emplacements} emplacements, ce camping est plus petit que la moyenne de la commune (${Math.round(moyenneEmplacements)} emplacements), offrant ainsi un cadre plus intimiste`
  }

  return null
}
