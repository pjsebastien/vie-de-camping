const fs = require('fs')
const path = require('path')

console.log('🔄 Démarrage du script...')

/**
 * Génère un slug SEO
 */
function generateSlug(nom, commune) {
  return `${nom}-${commune}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Extrait le département du code postal
 */
function getDepartement(codePostal) {
  if (codePostal.startsWith('97') || codePostal.startsWith('98')) {
    return codePostal.substring(0, 3)
  }
  return codePostal.substring(0, 2)
}

/**
 * Parse le CSV des campings
 */
function loadCampingsCSV() {
  const csvPath = path.join(process.cwd(), 'data', 'hebergements_classes.csv')
  console.log(`📂 Lecture ${csvPath}`)

  const content = fs.readFileSync(csvPath, 'utf-8')
  const lines = content.split('\n')

  const campings = new Map()

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const parts = line.split(';')
    if (parts.length < 17) continue
    if (parts[1] !== 'CAMPING') continue

    const nom = parts[5]
    const commune = parts[8]
    const codePostal = parts[7]

    if (!nom || !commune || !codePostal) continue

    const key = `${nom.toLowerCase()}_${commune.toLowerCase()}`

    campings.set(key, {
      slug: generateSlug(nom, commune),
      nom,
      commune,
      codePostal,
      departement: getDepartement(codePostal),
      adresse: parts[6],
      classement: parts[2],
      categorie: parts[3] && parts[3] !== '-' ? parts[3] : null,
      capacite: parts[11] && parts[11] !== '-' ? parseInt(parts[11], 10) : null,
      nombreEmplacements: parts[13] && parts[13] !== '-' ? parseInt(parts[13], 10) : null,
      siteWeb: parts[9] && parts[9] !== '-' ? parts[9] : null,
      dateClassement: parts[0],
      // Nouvelles données CSV
      typeSejour: parts[10] && parts[10] !== '-' ? parts[10] : null,
      classementProroge: parts[16] === 'oui',
    })
  }

  return campings
}

/**
 * Charge les données des communes
 */
function loadCommunesData() {
  const csvPath = path.join(process.cwd(), 'data', 'donnees_communes.csv')
  console.log(`📂 Lecture ${csvPath}`)

  const content = fs.readFileSync(csvPath, 'utf-8')
  const lines = content.split('\n')

  const communes = new Map()

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const parts = line.split(';')
    if (parts.length < 10) continue

    const nomCommune = parts[7]
    const population = parseInt(parts[8], 10)

    if (!nomCommune || isNaN(population)) continue

    communes.set(nomCommune.toLowerCase(), {
      codeCommune: parts[5],
      nomCommune: parts[7],
      population,
      departement: parts[2],
      region: parts[1],
    })
  }

  return communes
}

/**
 * Charge les données des départements
 */
function loadDepartementsData() {
  const csvPath = path.join(process.cwd(), 'data', 'donnees_departements.csv')
  console.log(`📂 Lecture ${csvPath}`)

  const content = fs.readFileSync(csvPath, 'utf-8')
  const lines = content.split('\n')

  const departements = new Map()

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const parts = line.split(';')
    if (parts.length < 9) continue

    const code = parts[2]
    const population = parseInt(parts[7], 10)
    const nombreCommunes = parseInt(parts[6], 10)

    if (!code || isNaN(population)) continue

    departements.set(code, {
      code,
      nom: parts[3],
      population,
      nombreCommunes,
      region: parts[1],
    })
  }

  return departements
}

/**
 * Charge les données des régions
 */
function loadRegionsData() {
  const csvPath = path.join(process.cwd(), 'data', 'donnees_regions.csv')
  console.log(`📂 Lecture ${csvPath}`)

  const content = fs.readFileSync(csvPath, 'utf-8')
  const lines = content.split('\n')

  const regions = new Map()

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const parts = line.split(';')
    if (parts.length < 7) continue

    const code = parts[0]
    const population = parseInt(parts[5], 10)
    const nombreCommunes = parseInt(parts[4], 10)

    if (!code || isNaN(population)) continue

    regions.set(code, {
      code,
      nom: parts[1],
      population,
      nombreCommunes,
    })
  }

  return regions
}

/**
 * Helper: convertit valeur OSM yes/no en boolean
 */
function toBool(value) {
  if (!value) return undefined
  if (value === 'yes' || value === 'true' || value === '1') return true
  if (value === 'no' || value === 'false' || value === '0') return false
  return undefined
}

/**
 * Extrait les données GeoJSON enrichies
 */
function loadGeoData() {
  const geoPath = path.join(process.cwd(), 'data', 'export.geojson')

  if (!fs.existsSync(geoPath)) {
    console.log('⚠️  export.geojson non trouvé, skip geo enrichment')
    return new Map()
  }

  try {
    console.log(`📂 Lecture ${geoPath}`)
    const content = fs.readFileSync(geoPath, 'utf-8')
    const geojson = JSON.parse(content)

    const geoData = new Map()

    if (geojson.type === 'FeatureCollection' && geojson.features) {
      for (const feature of geojson.features) {
        const props = feature.properties || {}
        const geom = feature.geometry

        const nom = props.name || props.nom || props.NAME
        if (!nom) continue

        // Coordonnées
        let lat, lon
        if (geom && geom.type === 'Point' && geom.coordinates) {
          lon = geom.coordinates[0]
          lat = geom.coordinates[1]
        }

        // Environnement et proximité
        const environnement = []
        if (props.natural) environnement.push(props.natural)
        if (props.leisure === 'park') environnement.push('parc')
        if (props.tourism === 'camp_site') environnement.push('camping')

        const proximiteMer = toBool(props.beach) || props.natural === 'beach' || props.natural === 'coastline'
        const proximiteLac = props.natural === 'water' || props.water === 'lake'
        const proximiteRiviere = props.natural === 'water' || props.water === 'river' || props.waterway === 'river'
        const proximiteForet = props.natural === 'wood' || props.landuse === 'forest'
        const proximiteMontagne = props.natural === 'peak' || props.natural === 'mountain_range'

        // Équipements
        const piscine = toBool(props.swimming_pool) || toBool(props['swimming_pool:indoor']) || toBool(props['swimming_pool:outdoor'])
        const restaurant = toBool(props.restaurant) || props.amenity === 'restaurant'
        const bar = toBool(props.bar) || props.amenity === 'bar'
        const epicerie = toBool(props.shop) || toBool(props.kiosk) || props.shop === 'convenience'
        const wifi = toBool(props.wifi) || toBool(props.internet_access) || props.internet_access === 'wlan'
        const laverie = toBool(props.washing_machine) || toBool(props.laundry)
        const aireDeJeux = toBool(props.playground) || props.leisure === 'playground'
        const locationVelos = toBool(props.bicycle_rental) || props.amenity === 'bicycle_rental'

        // Types hébergement
        const emplacementsTentes = toBool(props.tents) || toBool(props.tent_rental)
        const emplacementsCaravanes = toBool(props.caravans) || toBool(props.caravan_site)
        const emplacementsCampingCars = toBool(props.motor_vehicle) || toBool(props.motorhome)
        const chalets = toBool(props.chalets)
        const mobilHomes = toBool(props.mobile_homes) || toBool(props.static_caravans)
        const bungalows = toBool(props.bungalows) || toBool(props.cabin)

        // Accessibilité
        const animauxAcceptes = toBool(props.dog) || toBool(props.dogs) || toBool(props.pets)
        const accessiblePMR = toBool(props.wheelchair) || toBool(props.disabled)
        const ouvertureAnnuelle = toBool(props.permanent) || props.seasonal === 'no'

        // Contact
        const telephone = props.phone || props['contact:phone'] || null
        const email = props.email || props['contact:email'] || null
        const description = props.description || null

        const key = nom.toLowerCase()
        geoData.set(key, {
          lat,
          lon,
          environnement: environnement.length > 0 ? environnement : undefined,
          proximiteMer,
          proximiteLac,
          proximiteRiviere,
          proximiteForet,
          proximiteMontagne,
          piscine,
          restaurant,
          bar,
          epicerie,
          wifi,
          laverie,
          aireDeJeux,
          locationVelos,
          emplacementsTentes,
          emplacementsCaravanes,
          emplacementsCampingCars,
          chalets,
          mobilHomes,
          bungalows,
          animauxAcceptes,
          accessiblePMR,
          ouvertureAnnuelle,
          telephone,
          email,
          description,
        })
      }
    }

    return geoData
  } catch (error) {
    console.log('⚠️  Erreur lecture GeoJSON, skip:', error.message)
    return new Map()
  }
}

/**
 * Fusion des données
 */
function mergeDatas() {
  console.log('🔄 Chargement des données...')

  const campings = loadCampingsCSV()
  const communes = loadCommunesData()
  const departements = loadDepartementsData()
  const regions = loadRegionsData()
  const geo = loadGeoData()

  console.log(`✅ ${campings.size} campings chargés`)
  console.log(`✅ ${communes.size} communes chargées`)
  console.log(`✅ ${departements.size} départements chargés`)
  console.log(`✅ ${regions.size} régions chargées`)
  console.log(`✅ ${geo.size} données geo chargées`)

  console.log('🔄 Fusion des données...')

  const enrichedCampings = []

  for (const [key, camping] of campings) {
    // Enrichir avec les données de commune
    const communeData = communes.get(camping.commune.toLowerCase())
    if (communeData) {
      camping.populationCommune = communeData.population
    }

    // Enrichir avec les données de département
    const deptData = departements.get(camping.departement)
    if (deptData) {
      camping.populationDepartement = deptData.population
      camping.nombreCommunesDepartement = deptData.nombreCommunes
    }

    // Enrichir avec les données de région
    if (deptData) {
      const regionData = regions.get(deptData.region)
      if (regionData) {
        camping.populationRegion = regionData.population
      }
    }

    // Enrichir avec les données geo
    const geoData = geo.get(camping.nom.toLowerCase())
    if (geoData) {
      // Coordonnées
      camping.latitude = geoData.lat
      camping.longitude = geoData.lon
      camping.environnement = geoData.environnement

      // Proximité
      if (geoData.proximiteMer) camping.proximiteMer = geoData.proximiteMer
      if (geoData.proximiteLac) camping.proximiteLac = geoData.proximiteLac
      if (geoData.proximiteRiviere) camping.proximiteRiviere = geoData.proximiteRiviere
      if (geoData.proximiteForet) camping.proximiteForet = geoData.proximiteForet
      if (geoData.proximiteMontagne) camping.proximiteMontagne = geoData.proximiteMontagne

      // Équipements
      if (geoData.piscine) camping.piscine = geoData.piscine
      if (geoData.restaurant) camping.restaurant = geoData.restaurant
      if (geoData.bar) camping.bar = geoData.bar
      if (geoData.epicerie) camping.epicerie = geoData.epicerie
      if (geoData.wifi) camping.wifi = geoData.wifi
      if (geoData.laverie) camping.laverie = geoData.laverie
      if (geoData.aireDeJeux) camping.aireDeJeux = geoData.aireDeJeux
      if (geoData.locationVelos) camping.locationVelos = geoData.locationVelos

      // Types hébergement
      if (geoData.emplacementsTentes) camping.emplacementsTentes = geoData.emplacementsTentes
      if (geoData.emplacementsCaravanes) camping.emplacementsCaravanes = geoData.emplacementsCaravanes
      if (geoData.emplacementsCampingCars) camping.emplacementsCampingCars = geoData.emplacementsCampingCars
      if (geoData.chalets) camping.chalets = geoData.chalets
      if (geoData.mobilHomes) camping.mobilHomes = geoData.mobilHomes
      if (geoData.bungalows) camping.bungalows = geoData.bungalows

      // Accessibilité
      if (geoData.animauxAcceptes) camping.animauxAcceptes = geoData.animauxAcceptes
      if (geoData.accessiblePMR) camping.accessiblePMR = geoData.accessiblePMR
      if (geoData.ouvertureAnnuelle) camping.ouvertureAnnuelle = geoData.ouvertureAnnuelle

      // Contact
      if (geoData.telephone) camping.telephone = geoData.telephone
      if (geoData.email) camping.email = geoData.email
      if (geoData.description) camping.description = geoData.description
    }

    enrichedCampings.push(camping)
  }

  // Trier par nom
  enrichedCampings.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))

  console.log(`✅ ${enrichedCampings.length} campings enrichis`)

  // Statistiques d'enrichissement
  const stats = {
    popCommune: 0,
    popDept: 0,
    coords: 0,
    piscine: 0,
    restaurant: 0,
    wifi: 0,
    animaux: 0,
    pmr: 0,
    mer: 0,
    montagne: 0,
  }

  for (const c of enrichedCampings) {
    if (c.populationCommune) stats.popCommune++
    if (c.populationDepartement) stats.popDept++
    if (c.latitude && c.longitude) stats.coords++
    if (c.piscine) stats.piscine++
    if (c.restaurant) stats.restaurant++
    if (c.wifi) stats.wifi++
    if (c.animauxAcceptes) stats.animaux++
    if (c.accessiblePMR) stats.pmr++
    if (c.proximiteMer) stats.mer++
    if (c.proximiteMontagne) stats.montagne++
  }

  console.log('\n📊 Statistiques d\'enrichissement:')
  console.log(`   Population commune: ${stats.popCommune} (${Math.round(stats.popCommune/enrichedCampings.length*100)}%)`)
  console.log(`   Population département: ${stats.popDept} (${Math.round(stats.popDept/enrichedCampings.length*100)}%)`)
  console.log(`   Coordonnées GPS: ${stats.coords} (${Math.round(stats.coords/enrichedCampings.length*100)}%)`)
  console.log(`   Avec piscine: ${stats.piscine}`)
  console.log(`   Avec restaurant: ${stats.restaurant}`)
  console.log(`   Avec WiFi: ${stats.wifi}`)
  console.log(`   Animaux acceptés: ${stats.animaux}`)
  console.log(`   Accessible PMR: ${stats.pmr}`)
  console.log(`   Proximité mer: ${stats.mer}`)
  console.log(`   Proximité montagne: ${stats.montagne}`)

  // Sauvegarder le JSON
  const outputPath = path.join(process.cwd(), 'data', 'vie-de-camping.json')
  fs.writeFileSync(outputPath, JSON.stringify(enrichedCampings, null, 2), 'utf-8')

  console.log(`\n✅ Fichier généré: ${outputPath}`)
  console.log(`📊 Taille: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`)
}

// Exécution
try {
  mergeDatas()
  console.log('✨ Terminé avec succès!')
} catch (error) {
  console.error('❌ Erreur:', error)
  process.exit(1)
}
