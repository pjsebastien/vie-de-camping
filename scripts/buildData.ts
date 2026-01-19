import fs from 'fs'
import path from 'path'

interface CampingCSVRow {
  dateClassement: string
  typologie: string
  classement: string
  categorie: string
  mention: string
  nom: string
  adresse: string
  codePostal: string
  commune: string
  siteWeb: string
  typeSejour: string
  capacite: string
  chambres: string
  emplacements: string
  unites: string
  logements: string
  proroge: string
}

interface CommuneData {
  codeCommune: string
  nomCommune: string
  population: number
  departement: string
  region: string
}

interface DepartementData {
  code: string
  nom: string
  population: number
  nombreCommunes: number
  region: string
}

interface RegionData {
  code: string
  nom: string
  population: number
  nombreCommunes: number
}

interface GeoData {
  lat?: number
  lon?: number
  environnement?: string[]
}

interface CampingEnriched {
  slug: string
  nom: string
  commune: string
  codePostal: string
  departement: string
  adresse: string
  classement: string
  categorie: string | null
  capacite: number | null
  nombreEmplacements: number | null
  siteWeb: string | null
  dateClassement: string

  // Nouvelles données enrichies
  populationCommune?: number
  populationDepartement?: number
  populationRegion?: number
  nombreCommunesDepartement?: number
  latitude?: number
  longitude?: number
  environnement?: string[]
}

/**
 * Génère un slug SEO
 */
function generateSlug(nom: string, commune: string): string {
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
function getDepartement(codePostal: string): string {
  if (codePostal.startsWith('97') || codePostal.startsWith('98')) {
    return codePostal.substring(0, 3)
  }
  return codePostal.substring(0, 2)
}

/**
 * Parse le CSV des campings
 */
function loadCampingsCSV(): Map<string, CampingEnriched> {
  const csvPath = path.join(process.cwd(), 'data', 'hebergements_classes.csv')
  const content = fs.readFileSync(csvPath, 'utf-8')
  const lines = content.split('\n')

  const campings = new Map<string, CampingEnriched>()

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
    })
  }

  return campings
}

/**
 * Charge les données des communes
 */
function loadCommunesData(): Map<string, CommuneData> {
  const csvPath = path.join(process.cwd(), 'data', 'donnees_communes.csv')
  const content = fs.readFileSync(csvPath, 'utf-8')
  const lines = content.split('\n')

  const communes = new Map<string, CommuneData>()

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
function loadDepartementsData(): Map<string, DepartementData> {
  const csvPath = path.join(process.cwd(), 'data', 'donnees_departements.csv')
  const content = fs.readFileSync(csvPath, 'utf-8')
  const lines = content.split('\n')

  const departements = new Map<string, DepartementData>()

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
function loadRegionsData(): Map<string, RegionData> {
  const csvPath = path.join(process.cwd(), 'data', 'donnees_regions.csv')
  const content = fs.readFileSync(csvPath, 'utf-8')
  const lines = content.split('\n')

  const regions = new Map<string, RegionData>()

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
 * Extrait les données GeoJSON (simplifié)
 * On cherche juste lat/lon et tags environnement
 */
function loadGeoData(): Map<string, GeoData> {
  const geoPath = path.join(process.cwd(), 'data', 'export.geojson')

  // Vérifier si le fichier existe
  if (!fs.existsSync(geoPath)) {
    console.log('export.geojson non trouvé, skip geo enrichment')
    return new Map()
  }

  try {
    const content = fs.readFileSync(geoPath, 'utf-8')
    const geojson = JSON.parse(content)

    const geoData = new Map<string, GeoData>()

    if (geojson.type === 'FeatureCollection' && geojson.features) {
      for (const feature of geojson.features) {
        const props = feature.properties || {}
        const geom = feature.geometry

        // Chercher le nom du camping
        const nom = props.name || props.nom || props.NAME
        if (!nom) continue

        // Extraire lat/lon
        let lat, lon
        if (geom && geom.type === 'Point' && geom.coordinates) {
          lon = geom.coordinates[0]
          lat = geom.coordinates[1]
        }

        // Extraire environnement
        const environnement: string[] = []
        if (props.natural) environnement.push(props.natural)
        if (props.leisure === 'park') environnement.push('parc')
        if (props.tourism === 'camp_site') environnement.push('camping')

        const key = nom.toLowerCase()
        geoData.set(key, {
          lat,
          lon,
          environnement: environnement.length > 0 ? environnement : undefined,
        })
      }
    }

    return geoData
  } catch (error) {
    console.log('Erreur lecture GeoJSON, skip:', error)
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

  const enrichedCampings: CampingEnriched[] = []

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
      camping.latitude = geoData.lat
      camping.longitude = geoData.lon
      camping.environnement = geoData.environnement
    }

    enrichedCampings.push(camping)
  }

  // Trier par nom
  enrichedCampings.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))

  console.log(`✅ ${enrichedCampings.length} campings enrichis`)

  // Sauvegarder le JSON
  const outputPath = path.join(process.cwd(), 'data', 'vie-de-camping.json')
  fs.writeFileSync(outputPath, JSON.stringify(enrichedCampings, null, 2), 'utf-8')

  console.log(`✅ Fichier généré: ${outputPath}`)
  console.log(`📊 Taille: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`)
}

// Exécution
try {
  mergeDatas()
} catch (error) {
  console.error('❌ Erreur:', error)
  process.exit(1)
}
