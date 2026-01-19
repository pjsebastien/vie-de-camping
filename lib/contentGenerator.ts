import { Camping } from './types'

/**
 * Génère un texte de présentation du camping basé sur ses caractéristiques
 */
export function generateCampingPresentation(camping: Camping): string {
  const parts: string[] = []

  // Phrase sur le classement
  if (camping.classement === 'Aire naturelle') {
    parts.push(`Le camping ${camping.nom} est une aire naturelle de camping`)
  } else if (camping.classement.includes('étoile')) {
    parts.push(`Le camping ${camping.nom} dispose d'un classement ${camping.classement}`)
  }

  // Phrase sur la localisation avec population si disponible
  if (camping.populationCommune) {
    if (camping.populationCommune >= 50000) {
      parts.push(`situé à ${camping.commune}, ville de ${camping.populationCommune.toLocaleString('fr-FR')} habitants`)
    } else if (camping.populationCommune >= 10000) {
      parts.push(`situé à ${camping.commune} (${camping.populationCommune.toLocaleString('fr-FR')} habitants)`)
    } else {
      parts.push(`situé dans la commune de ${camping.commune}`)
    }
  } else {
    parts.push(`situé à ${camping.commune}`)
  }

  // Phrase sur la capacité si disponible
  if (camping.nombreEmplacements && camping.nombreEmplacements > 0) {
    if (camping.nombreEmplacements >= 200) {
      parts.push(`Ce camping de grande capacité propose ${camping.nombreEmplacements} emplacements`)
    } else if (camping.nombreEmplacements >= 100) {
      parts.push(`Cet établissement propose ${camping.nombreEmplacements} emplacements`)
    } else if (camping.nombreEmplacements >= 50) {
      parts.push(`Ce camping compte ${camping.nombreEmplacements} emplacements`)
    } else {
      parts.push(`Cet établissement familial compte ${camping.nombreEmplacements} emplacements`)
    }
  }

  return parts.join('. ') + '.'
}

/**
 * Génère les points clés du camping
 */
export function generateCampingKeyPoints(camping: Camping, campingsInCommune: number): string[] {
  const points: string[] = []

  // Point sur le classement officiel
  if (camping.classement) {
    points.push(`Classement officiel Atout France : ${camping.classement}`)
  }

  // Point sur la capacité
  if (camping.nombreEmplacements && camping.nombreEmplacements > 0) {
    if (camping.nombreEmplacements >= 150) {
      points.push(`Capacité importante avec ${camping.nombreEmplacements} emplacements`)
    } else if (camping.nombreEmplacements >= 50) {
      points.push(`${camping.nombreEmplacements} emplacements disponibles`)
    } else {
      points.push(`Camping à taille humaine avec ${camping.nombreEmplacements} emplacements`)
    }
  }

  // Point sur le contexte local
  if (campingsInCommune === 1) {
    points.push(`Unique camping classé de la commune`)
  } else if (campingsInCommune <= 3) {
    points.push(`Un des ${campingsInCommune} campings classés de ${camping.commune}`)
  } else {
    points.push(`Situé dans une commune disposant de ${campingsInCommune} campings classés`)
  }

  // Point sur la capacité d'accueil si disponible
  if (camping.capacite && camping.capacite > 0) {
    points.push(`Capacité d'accueil : ${camping.capacite} personnes`)
  }

  return points
}

/**
 * Analyse la répartition des classements
 */
export function analyzeClassements(campings: Camping[]): {
  total: number
  byClassement: Record<string, number>
  dominant: string | null
} {
  const byClassement: Record<string, number> = {}

  for (const camping of campings) {
    const classement = camping.classement
    byClassement[classement] = (byClassement[classement] || 0) + 1
  }

  // Trouver le classement dominant
  let dominant: string | null = null
  let maxCount = 0

  for (const [classement, count] of Object.entries(byClassement)) {
    if (count > maxCount) {
      maxCount = count
      dominant = classement
    }
  }

  return {
    total: campings.length,
    byClassement,
    dominant,
  }
}

/**
 * Génère un texte sur l'offre de camping dans une commune
 */
export function generateCommuneOffre(
  commune: string,
  campings: Camping[],
  totalInDepartement: number
): string {
  const analysis = analyzeClassements(campings)
  const parts: string[] = []

  // Phrase sur le nombre
  if (campings.length === 1) {
    parts.push(`La commune de ${commune} dispose d'un camping classé`)
  } else if (campings.length <= 3) {
    parts.push(`La commune de ${commune} compte ${campings.length} campings classés`)
  } else {
    parts.push(`Avec ${campings.length} campings classés, ${commune} présente une offre de camping développée`)
  }

  // Phrase sur le poids relatif
  const percentage = Math.round((campings.length / totalInDepartement) * 100)
  if (percentage >= 10) {
    parts.push(`Ces établissements représentent ${percentage}% de l'offre du département`)
  }

  // Phrase sur les emplacements
  const totalEmplacements = campings.reduce((sum, c) => sum + (c.nombreEmplacements || 0), 0)
  if (totalEmplacements > 0) {
    parts.push(`La capacité totale est de ${totalEmplacements} emplacements`)
  }

  return parts.join('. ') + '.'
}

/**
 * Génère un texte sur la typologie des campings d'une commune
 */
export function generateCommuneTypologie(campings: Camping[]): string {
  const analysis = analyzeClassements(campings)
  const parts: string[] = []

  // Distribution des classements
  const classements = Object.entries(analysis.byClassement)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([classement, count]) => `${count} ${classement}`)
    .join(', ')

  parts.push(`Répartition des classements : ${classements}`)

  // Type dominant si pertinent
  if (analysis.dominant && analysis.byClassement[analysis.dominant] >= campings.length * 0.5) {
    parts.push(`Le classement ${analysis.dominant} est majoritaire`)
  }

  return parts.join('. ') + '.'
}

/**
 * Génère un texte sur le camping dans un département
 */
export function generateDepartementOverview(
  departementName: string,
  campings: Camping[],
  communesCount: number
): string {
  const analysis = analyzeClassements(campings)
  const parts: string[] = []

  // Phrase sur le volume
  if (campings.length >= 100) {
    parts.push(`Le département ${departementName} dispose d'une offre de camping importante avec ${campings.length} établissements classés`)
  } else if (campings.length >= 50) {
    parts.push(`Le département ${departementName} compte ${campings.length} campings classés`)
  } else {
    parts.push(`Le département ${departementName} propose ${campings.length} campings classés`)
  }

  // Phrase sur la répartition géographique
  if (communesCount >= 20) {
    parts.push(`Ces campings sont répartis sur ${communesCount} communes`)
  } else if (communesCount > 1) {
    parts.push(`L'offre est présente dans ${communesCount} communes`)
  }

  // Phrase sur la capacité totale
  const totalEmplacements = campings.reduce((sum, c) => sum + (c.nombreEmplacements || 0), 0)
  if (totalEmplacements > 0) {
    parts.push(`La capacité totale représente ${totalEmplacements} emplacements`)
  }

  return parts.join('. ') + '.'
}

/**
 * Génère un texte sur la typologie d'un département
 */
export function generateDepartementTypologie(campings: Camping[]): string {
  const analysis = analyzeClassements(campings)
  const parts: string[] = []

  // Compter les étoiles
  const airesNaturelles = analysis.byClassement['Aire naturelle'] || 0
  const uneEtoile = analysis.byClassement['1 étoile'] || 0
  const deuxEtoiles = analysis.byClassement['2 étoiles'] || 0
  const troisEtoiles = analysis.byClassement['3 étoiles'] || 0
  const quatreEtoiles = analysis.byClassement['4 étoiles'] || 0
  const cinqEtoiles = analysis.byClassement['5 étoiles'] || 0

  // Distribution détaillée
  const distribution: string[] = []
  if (airesNaturelles > 0) distribution.push(`${airesNaturelles} aire${airesNaturelles > 1 ? 's' : ''} naturelle${airesNaturelles > 1 ? 's' : ''}`)
  if (uneEtoile > 0) distribution.push(`${uneEtoile} camping 1 étoile`)
  if (deuxEtoiles > 0) distribution.push(`${deuxEtoiles} campings 2 étoiles`)
  if (troisEtoiles > 0) distribution.push(`${troisEtoiles} campings 3 étoiles`)
  if (quatreEtoiles > 0) distribution.push(`${quatreEtoiles} campings 4 étoiles`)
  if (cinqEtoiles > 0) distribution.push(`${cinqEtoiles} campings 5 étoiles`)

  if (distribution.length > 0) {
    parts.push(`L'offre se compose de ${distribution.join(', ')}`)
  }

  // Orientation de l'offre
  const hautDeGamme = quatreEtoiles + cinqEtoiles
  const entreeDeGamme = airesNaturelles + uneEtoile + deuxEtoiles

  if (hautDeGamme > campings.length * 0.4) {
    parts.push(`Le département présente une offre orientée vers les campings bien équipés`)
  } else if (entreeDeGamme > campings.length * 0.5) {
    parts.push(`L'offre est majoritairement composée de campings nature et entrée de gamme`)
  } else {
    parts.push(`L'offre présente une répartition équilibrée entre les différents niveaux de classement`)
  }

  return parts.join('. ') + '.'
}

/**
 * Génère un texte sur le camping dans une région
 */
export function generateRegionOverview(
  region: string,
  campings: Camping[],
  departementsCount: number,
  communesCount: number
): string {
  const analysis = analyzeClassements(campings)
  const parts: string[] = []

  // Phrase sur le volume régional
  if (campings.length >= 500) {
    parts.push(`La région ${region} constitue une destination camping majeure avec ${campings.length} établissements classés`)
  } else if (campings.length >= 200) {
    parts.push(`La région ${region} dispose d'une offre de camping développée comptant ${campings.length} établissements classés`)
  } else {
    parts.push(`La région ${region} compte ${campings.length} campings classés`)
  }

  // Phrase sur la distribution géographique
  parts.push(`Cette offre est répartie sur ${departementsCount} départements et ${communesCount} communes`)

  // Phrase sur la capacité régionale
  const totalEmplacements = campings.reduce((sum, c) => sum + (c.nombreEmplacements || 0), 0)
  if (totalEmplacements > 0) {
    parts.push(`La capacité d'accueil totale de la région atteint ${totalEmplacements} emplacements`)
  }

  return parts.join('. ') + '.'
}

/**
 * Génère un texte sur la typologie régionale
 */
export function generateRegionTypologie(region: string, campings: Camping[]): string {
  const analysis = analyzeClassements(campings)
  const parts: string[] = []

  // Calcul des proportions
  const total = campings.length
  const airesNaturelles = analysis.byClassement['Aire naturelle'] || 0
  const etoiles1et2 = (analysis.byClassement['1 étoile'] || 0) + (analysis.byClassement['2 étoiles'] || 0)
  const etoiles3 = analysis.byClassement['3 étoiles'] || 0
  const etoiles4et5 = (analysis.byClassement['4 étoiles'] || 0) + (analysis.byClassement['5 étoiles'] || 0)

  const pctNature = Math.round((airesNaturelles / total) * 100)
  const pctEntreeGamme = Math.round((etoiles1et2 / total) * 100)
  const pctMilieuGamme = Math.round((etoiles3 / total) * 100)
  const pctHautGamme = Math.round((etoiles4et5 / total) * 100)

  // Profil régional
  if (pctHautGamme >= 30) {
    parts.push(`La région ${region} se caractérise par une forte présence de campings 4 et 5 étoiles (${pctHautGamme}% de l'offre)`)
  } else if (pctNature >= 20) {
    parts.push(`La région ${region} conserve une part significative d'aires naturelles de camping (${pctNature}%)`)
  } else if (pctMilieuGamme >= 40) {
    parts.push(`L'offre de camping en ${region} est dominée par les établissements 3 étoiles (${pctMilieuGamme}%)`)
  } else {
    parts.push(`La région ${region} présente une offre diversifiée sur l'ensemble des catégories de classement`)
  }

  // Distribution complète
  parts.push(`Répartition : ${pctNature}% aires naturelles, ${pctEntreeGamme}% 1-2 étoiles, ${pctMilieuGamme}% 3 étoiles, ${pctHautGamme}% 4-5 étoiles`)

  return parts.join('. ') + '.'
}

/**
 * Enrichit le texte de présentation de commune avec données démographiques
 */
export function generateCommuneContext(
  commune: string,
  campings: Camping[]
): string {
  const parts: string[] = []

  // Récupérer la population depuis le premier camping (tous ont la même)
  const population = campings[0]?.populationCommune

  if (population) {
    if (population >= 100000) {
      parts.push(`${commune} est une grande ville de ${population.toLocaleString('fr-FR')} habitants`)
    } else if (population >= 20000) {
      parts.push(`${commune} est une ville de ${population.toLocaleString('fr-FR')} habitants`)
    } else if (population >= 5000) {
      parts.push(`${commune} compte ${population.toLocaleString('fr-FR')} habitants`)
    } else {
      parts.push(`${commune} est une commune de ${population.toLocaleString('fr-FR')} habitants`)
    }

    // Ajouter contexte camping
    if (campings.length === 1) {
      parts.push('proposant un camping classé')
    } else {
      parts.push(`disposant de ${campings.length} campings classés`)
    }
  }

  return parts.join(' ') + '.'
}

/**
 * Enrichit le texte de présentation de département avec données démographiques
 */
export function generateDepartementContext(
  departementName: string,
  campings: Camping[]
): string {
  const parts: string[] = []

  // Récupérer les données depuis le premier camping
  const population = campings[0]?.populationDepartement
  const nombreCommunes = campings[0]?.nombreCommunesDepartement

  if (population && nombreCommunes) {
    parts.push(`Le département ${departementName} compte ${population.toLocaleString('fr-FR')} habitants répartis sur ${nombreCommunes} communes`)

    // Calculer combien de communes ont des campings
    const communesAvecCampings = new Set(campings.map(c => c.commune.toLowerCase())).size

    if (communesAvecCampings >= nombreCommunes * 0.5) {
      parts.push(`L'offre de camping est très développée avec des établissements présents dans ${communesAvecCampings} communes`)
    } else if (communesAvecCampings >= 20) {
      parts.push(`Les campings sont présents dans ${communesAvecCampings} communes du département`)
    }
  }

  return parts.join('. ') + '.'
}

/**
 * Enrichit le texte de présentation de région avec données démographiques
 */
export function generateRegionContext(
  region: string,
  campings: Camping[]
): string {
  const parts: string[] = []

  // Récupérer la population régionale
  const population = campings[0]?.populationRegion

  if (population) {
    parts.push(`La région ${region}, avec ${population.toLocaleString('fr-FR')} habitants, constitue un territoire touristique important`)

    // Analyser la densité de l'offre camping
    const campingsPerMillion = Math.round((campings.length / population) * 1000000)

    if (campingsPerMillion >= 50) {
      parts.push(`La densité de l'offre camping y est particulièrement élevée avec ${campingsPerMillion} campings par million d'habitants`)
    } else if (campingsPerMillion >= 20) {
      parts.push(`L'offre représente ${campingsPerMillion} campings par million d'habitants`)
    }
  }

  return parts.join('. ') + '.'
}

/**
 * Génère du contenu SEO pour "Meilleurs campings de [lieu]"
 */
export function generateBestCampingsContent(
  lieu: string,
  campings: Camping[],
  lieuType: 'region' | 'departement' | 'commune'
): {
  title: string
  introduction: string
  criteria: string[]
  conclusion: string
} {
  const topCampings = campings
    .filter(c => c.classement?.includes('5 étoiles') || c.classement?.includes('4 étoiles'))
    .slice(0, 10)

  const totalWith4or5 = campings.filter(c =>
    c.classement?.includes('5 étoiles') || c.classement?.includes('4 étoiles')
  ).length

  const withPool = campings.filter(c => c.piscine).length
  const withWifi = campings.filter(c => c.wifi).length
  const withRestaurant = campings.filter(c => c.restaurant).length

  const lieuPrep = lieuType === 'region' ? 'en' : lieuType === 'departement' ? 'dans le' : 'à'
  const lieuArticle = lieuType === 'region' ? 'la région' : lieuType === 'departement' ? 'le département' : 'la commune'

  const title = `Meilleurs campings ${lieuPrep} ${lieu}`

  const introduction = lieuType === 'region'
    ? `${lieu} compte parmi les destinations camping privilégiées en France. Avec ${campings.length} établissements classés dont ${totalWith4or5} campings 4 et 5 étoiles, ${lieuArticle} offre un large choix pour vos vacances en camping. Les meilleurs campings de ${lieu} se distinguent par leurs équipements complets, leur emplacement privilégié et la qualité de leurs services.`
    : lieuType === 'departement'
    ? `Vous recherchez les meilleurs campings ${lieuPrep} ${lieu} ? Cette sélection présente les établissements les mieux notés et les plus équipés parmi les ${campings.length} campings classés du département. Ces campings d'exception combinent confort moderne, services de qualité et situation géographique idéale pour découvrir ${lieu}.`
    : `${lieu} propose ${campings.length} camping${campings.length > 1 ? 's' : ''} classé${campings.length > 1 ? 's' : ''} pour vos vacances. ${campings.length > 1 ? 'Ces établissements offrent' : 'Cet établissement offre'} des prestations variées adaptées à tous les types de séjours, du camping nature au camping haut de gamme avec piscine et animations.`

  const criteria: string[] = []

  if (totalWith4or5 > 0) {
    criteria.push(`**Classement premium** : ${totalWith4or5} camping${totalWith4or5 > 1 ? 's' : ''} 4 ou 5 étoiles garantissant un haut niveau de confort et d'équipement`)
  }

  if (withPool > campings.length * 0.3) {
    criteria.push(`**Équipements aquatiques** : ${withPool} établissement${withPool > 1 ? 's' : ''} avec piscine pour profiter de la baignade sur place`)
  }

  if (withWifi > campings.length * 0.5) {
    criteria.push(`**Connectivité** : ${withWifi} camping${withWifi > 1 ? 's' : ''} équipé${withWifi > 1 ? 's' : ''} WiFi pour rester connecté pendant vos vacances`)
  }

  if (withRestaurant > 0) {
    criteria.push(`**Services de restauration** : ${withRestaurant} camping${withRestaurant > 1 ? 's proposent' : ' propose'} bar, snack ou restaurant sur place`)
  }

  const totalEmplacements = campings.reduce((sum, c) => sum + (c.nombreEmplacements || 0), 0)
  if (totalEmplacements > 0) {
    criteria.push(`**Grande capacité** : ${totalEmplacements.toLocaleString('fr-FR')} emplacements au total pour accueillir tous types de séjours`)
  }

  const conclusion = lieuType === 'region'
    ? `Ces meilleurs campings ${lieuPrep} ${lieu} sont sélectionnés selon leur classement officiel Atout France, leurs équipements et les services proposés. Que vous recherchiez un camping familial avec animations, un établissement calme en pleine nature ou un camping haut de gamme avec spa et piscine chauffée, vous trouverez votre bonheur dans cette sélection des ${topCampings.length > 0 ? topCampings.length : campings.length} meilleurs campings de ${lieuArticle}.`
    : `Pour choisir le meilleur camping ${lieuPrep} ${lieu}, prenez en compte vos priorités : proximité des sites touristiques, présence d'une piscine, type d'hébergements (emplacements nus, mobil-homes, chalets), animations proposées. Tous les campings présentés sont classés selon le référentiel Atout France, garantissant un niveau de qualité contrôlé.`

  return { title, introduction, criteria, conclusion }
}

/**
 * Génère des suggestions de types de séjours selon le profil du camping
 */
export function generateSejourSuggestions(camping: Camping): string[] {
  const suggestions: string[] = []

  // Selon le classement
  if (camping.classement?.includes('5 étoiles') || camping.classement?.includes('4 étoiles')) {
    suggestions.push('Séjour haut de gamme')
    suggestions.push('Vacances tout confort')
  } else if (camping.classement === 'Aire naturelle') {
    suggestions.push('Camping nature authentique')
    suggestions.push('Séjour écologique')
  }

  // Selon capacité
  if (camping.nombreEmplacements && camping.nombreEmplacements > 150) {
    suggestions.push('Séjour en famille nombreuse')
    suggestions.push('Vacances animées')
  } else if (camping.nombreEmplacements && camping.nombreEmplacements < 50) {
    suggestions.push('Séjour au calme')
    suggestions.push('Camping intimiste')
  }

  // Selon équipements
  if (camping.piscine) {
    suggestions.push('Vacances avec piscine')
  }
  if (camping.restaurant) {
    suggestions.push('Séjour sans souci de restauration')
  }

  // Par défaut
  if (suggestions.length === 0) {
    suggestions.push('Séjour en camping traditionnel')
    suggestions.push('Vacances en plein air')
  }

  return suggestions.slice(0, 6)
}

/**
 * Génère des conseils pour choisir son camping
 */
export function generateChoosingTips(lieuType: 'region' | 'departement' | 'commune'): string[] {
  const baseTips = [
    'Vérifiez le classement officiel Atout France pour garantir un niveau de qualité',
    'Consultez la capacité d\'accueil pour évaluer l\'ambiance (familiale vs calme)',
    'Repérez les équipements essentiels : piscine, wifi, restauration',
  ]

  if (lieuType === 'region') {
    return [
      ...baseTips,
      'Choisissez le département selon vos activités souhaitées (mer, montagne, campagne)',
      'Anticipez les distances entre le camping et les sites touristiques à visiter',
      'Privilégiez les campings bien desservis si vous n\'avez pas de véhicule'
    ]
  } else if (lieuType === 'departement') {
    return [
      ...baseTips,
      'Sélectionnez une commune selon sa proximité avec vos centres d\'intérêt',
      'Vérifiez les types d\'hébergement disponibles (tentes, mobil-homes, chalets)',
      'Consultez les périodes d\'ouverture si vous partez hors saison'
    ]
  } else {
    return [
      ...baseTips,
      'Comparez les tarifs et services inclus entre les différents campings',
      'Renseignez-vous sur les animations et activités proposées',
      'Vérifiez la politique concernant les animaux de compagnie si nécessaire'
    ]
  }
}

/**
 * Génère des conseils et recommandations spécifiques au camping
 */
export function generateCampingAdvice(camping: Camping): {
  title: string
  sections: { title: string; content: string }[]
} {
  const sections: { title: string; content: string }[] = []

  // Conseil réservation
  const capacityLevel = (camping.nombreEmplacements || 0) > 150 ? 'grande capacité' : (camping.nombreEmplacements || 0) < 50 ? 'capacité limitée' : 'capacité moyenne'
  sections.push({
    title: '📅 Meilleure période pour réserver',
    content: camping.nombreEmplacements && camping.nombreEmplacements < 50
      ? `Ce camping de ${capacityLevel} se remplit rapidement en haute saison. Nous vous conseillons de réserver plusieurs semaines à l'avance pour les mois de juillet-août. Les périodes de mai-juin et septembre offrent généralement plus de disponibilités et un cadre plus calme.`
      : `Avec sa ${capacityLevel}, cet établissement offre de bonnes disponibilités. Pour garantir votre emplacement préféré en haute saison (juillet-août), une réservation anticipée reste recommandée. Les périodes de basse saison offrent souvent des tarifs avantageux.`
  })

  // Conseil équipement selon classement
  if (camping.classement === 'Aire naturelle') {
    sections.push({
      title: '🎒 À prévoir pour votre séjour',
      content: `Il s'agit d'une aire naturelle de camping, privilégiant l'authenticité et le contact avec la nature. Prévoyez tout le nécessaire pour un camping en autonomie : tente ou caravane, matériel de cuisine, lampes, etc. Les équipements et services sur place sont volontairement limités pour préserver le caractère naturel du site.`
    })
  } else if (camping.classement?.includes('5 étoiles') || camping.classement?.includes('4 étoiles')) {
    sections.push({
      title: '✨ Profiter pleinement des services premium',
      content: `Ce camping ${camping.classement} propose des prestations haut de gamme. N'hésitez pas à vous renseigner sur les services inclus (animations, clubs enfants, activités sportives) et ceux disponibles en supplément (spa, excursions, restaurants). Certains équipements peuvent nécessiter une réservation préalable en haute saison.`
    })
  }

  // Conseil famille/couple/solo selon capacité et équipements
  if (camping.piscine && (camping.nombreEmplacements || 0) > 100) {
    sections.push({
      title: '👨‍👩‍👧‍👦 Idéal pour les familles',
      content: `Avec sa piscine et sa taille accueillante, ce camping est parfaitement adapté aux séjours en famille. Les enfants pourront profiter des activités aquatiques et rencontrer d'autres jeunes campeurs. Pensez à vérifier les horaires de surveillance de la piscine et les règles spécifiques.`
    })
  } else if ((camping.nombreEmplacements || 0) < 50) {
    sections.push({
      title: '💑 Ambiance intimiste garantie',
      content: `Ce camping de taille réduite offre une atmosphère calme et intimiste, idéale pour les couples ou les personnes recherchant la tranquillité. L'ambiance conviviale favorise les échanges avec les autres campeurs tout en préservant votre intimité.`
    })
  }

  // Conseil environnement local
  sections.push({
    title: '🗺️ Explorer les alentours',
    content: `${camping.commune} et ses environs regorgent de sites à découvrir. Renseignez-vous à l'accueil du camping ou auprès de l'office de tourisme local pour connaître les attractions, randonnées et activités disponibles dans la région. Pensez à planifier vos visites, certains sites touristiques nécessitant une réservation préalable en haute saison.`
  })

  return {
    title: 'Conseils pratiques pour votre séjour',
    sections
  }
}

/**
 * Génère une FAQ contextuelle pour le camping
 */
export function generateCampingFAQ(camping: Camping): { question: string; answer: string }[] {
  const faq: { question: string; answer: string }[] = []

  // Question classement
  faq.push({
    question: `Que signifie le classement "${camping.classement}" ?`,
    answer: camping.classement === 'Aire naturelle'
      ? `Une aire naturelle de camping est un terrain aménagé à la ferme ou en pleine nature, limité à 30 emplacements. Elle privilégie l'authenticité, le calme et le respect de l'environnement avec des équipements volontairement simples.`
      : camping.classement?.includes('étoiles')
      ? `Le classement ${camping.classement} est attribué par Atout France selon des critères précis (équipements, services, confort). Plus le nombre d'étoiles est élevé, plus le niveau de prestation est important. Ce classement garantit un niveau de qualité contrôlé et homologué.`
      : `Ce camping dispose d'un classement officiel délivré par l'organisme Atout France, garantissant un certain niveau de qualité et de conformité aux normes en vigueur.`
  })

  // Question capacité
  if (camping.nombreEmplacements) {
    faq.push({
      question: `Combien d'emplacements compte ce camping ?`,
      answer: `Le camping dispose de ${camping.nombreEmplacements} emplacements${camping.capacite ? ` pouvant accueillir jusqu'à ${camping.capacite} personnes` : ''}. ${camping.nombreEmplacements < 50 ? 'Cette taille modeste garantit une ambiance familiale et conviviale.' : camping.nombreEmplacements > 150 ? 'Cette grande capacité assure de nombreuses disponibilités et des infrastructures complètes.' : 'Cette capacité intermédiaire offre un bon équilibre entre services et tranquillité.'}`
    })
  }

  // Question équipements essentiels
  const mainFeatures = []
  if (camping.piscine) mainFeatures.push('une piscine')
  if (camping.wifi) mainFeatures.push('le WiFi')
  if (camping.restaurant) mainFeatures.push('un service de restauration')
  if (camping.animauxAcceptes) mainFeatures.push('l\'accueil des animaux')

  if (mainFeatures.length > 0) {
    faq.push({
      question: 'Quels sont les principaux équipements disponibles ?',
      answer: `Le camping propose ${mainFeatures.join(', ')}. Pour connaître le détail complet des équipements, services et leurs conditions d'utilisation, nous vous recommandons de contacter directement l'établissement.`
    })
  }

  // Question types hébergement
  const hebergementTypes = []
  if (camping.emplacementsTentes) hebergementTypes.push('emplacements pour tentes')
  if (camping.emplacementsCaravanes) hebergementTypes.push('emplacements pour caravanes')
  if (camping.mobilHomes) hebergementTypes.push('mobil-homes')
  if (camping.chalets) hebergementTypes.push('chalets')

  if (hebergementTypes.length > 0) {
    faq.push({
      question: 'Quels types d\'hébergement sont disponibles ?',
      answer: `Le camping propose : ${hebergementTypes.join(', ')}. Pour les disponibilités, tarifs et caractéristiques détaillées de chaque type d'hébergement, contactez directement le camping.`
    })
  }

  // Question animaux si acceptés
  if (camping.animauxAcceptes) {
    faq.push({
      question: 'Les animaux sont-ils acceptés ?',
      answer: `Oui, ce camping accepte les animaux de compagnie. Des conditions peuvent s'appliquer (supplément tarifaire, races acceptées, zones autorisées). Nous vous recommandons de prévenir le camping lors de votre réservation et de vous renseigner sur les règles spécifiques.`
    })
  }

  return faq
}

/**
 * Génère des activités suggérées selon le profil du camping
 */
export function generateSuggestedActivities(camping: Camping): {
  title: string
  activities: { icon: string; title: string; description: string }[]
} {
  const activities: { icon: string; title: string; description: string }[] = []

  // Activités aquatiques
  if (camping.piscine) {
    activities.push({
      icon: '🏊',
      title: 'Activités aquatiques',
      description: 'Profitez de la piscine du camping pour vous rafraîchir et vous détendre. Renseignez-vous sur les horaires d\'ouverture et les éventuelles activités aquatiques organisées.'
    })
  }

  // Activités nature
  if (camping.classement === 'Aire naturelle' || (camping.nombreEmplacements || 0) < 50) {
    activities.push({
      icon: '🥾',
      title: 'Randonnées et nature',
      description: 'Le cadre naturel se prête parfaitement aux balades et randonnées. Découvrez les sentiers alentours et partez à la découverte de la faune et la flore locales.'
    })
  }

  // Activités sportives
  if ((camping.nombreEmplacements || 0) > 100) {
    activities.push({
      icon: '⚽',
      title: 'Sports et loisirs',
      description: 'Les campings de cette taille proposent généralement des terrains de sports et des activités organisées. Renseignez-vous à l\'accueil sur le planning des animations.'
    })
  }

  // Découverte locale
  activities.push({
    icon: '🏛️',
    title: 'Découverte du patrimoine local',
    description: `Partez à la découverte de ${camping.commune} et de sa région. Visitez les sites historiques, marchés locaux et participez aux événements culturels organisés à proximité.`
  })

  // Gastronomie
  if (camping.restaurant) {
    activities.push({
      icon: '🍽️',
      title: 'Gastronomie locale',
      description: 'En plus du service de restauration sur place, découvrez les spécialités culinaires de la région dans les restaurants et marchés locaux.'
    })
  } else {
    activities.push({
      icon: '🍽️',
      title: 'Découverte gastronomique',
      description: 'Explorez les restaurants, fermes et producteurs locaux pour découvrir les spécialités culinaires de la région. Les marchés locaux sont également une excellente option.'
    })
  }

  // Détente
  if (camping.classement?.includes('4 étoiles') || camping.classement?.includes('5 étoiles')) {
    activities.push({
      icon: '💆',
      title: 'Bien-être et détente',
      description: 'Profitez des équipements de standing du camping pour vous relaxer. Certains établissements proposent des espaces bien-être, massages ou activités de relaxation.'
    })
  }

  return {
    title: 'Activités à proximité et sur place',
    activities
  }
}

