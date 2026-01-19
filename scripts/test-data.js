const fs = require('fs')
const path = require('path')

console.log('🔍 Analyse des données enrichies...\n')

const jsonPath = path.join(process.cwd(), 'data', 'vie-de-camping.json')
const campings = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

console.log(`📊 Total campings: ${campings.length}\n`)

// Coordonnées GPS
const avecGPS = campings.filter(c => c.latitude && c.longitude)
console.log(`📍 Coordonnées GPS:`)
console.log(`   ✅ ${avecGPS.length} campings (${((avecGPS.length / campings.length) * 100).toFixed(1)}%)`)

// Données démographiques
const avecPopCommune = campings.filter(c => c.populationCommune)
const avecPopDept = campings.filter(c => c.populationDepartement)
console.log(`\n👥 Données démographiques:`)
console.log(`   📊 Population commune: ${avecPopCommune.length} (${((avecPopCommune.length / campings.length) * 100).toFixed(1)}%)`)
console.log(`   📊 Population département: ${avecPopDept.length} (${((avecPopDept.length / campings.length) * 100).toFixed(1)}%)`)

// Équipements
const avecPiscine = campings.filter(c => c.piscine)
const avecWifi = campings.filter(c => c.wifi)
const avecRestaurant = campings.filter(c => c.restaurant)
const avecEpicerie = campings.filter(c => c.epicerie)
console.log(`\n🏊 Équipements:`)
console.log(`   🏊 Piscine: ${avecPiscine.length}`)
console.log(`   📶 WiFi: ${avecWifi.length}`)
console.log(`   🍽️  Restaurant: ${avecRestaurant.length}`)
console.log(`   🛒 Épicerie: ${avecEpicerie.length}`)

// Hébergements
const avecMobilHomes = campings.filter(c => c.mobilHomes)
const avecChalets = campings.filter(c => c.chalets)
const avecTentes = campings.filter(c => c.emplacementsTentes)
console.log(`\n🏠 Types d'hébergement:`)
console.log(`   🏠 Mobil-homes: ${avecMobilHomes.length}`)
console.log(`   🏡 Chalets: ${avecChalets.length}`)
console.log(`   ⛺ Emplacements tentes: ${avecTentes.length}`)

// Proximité
const avecProxMer = campings.filter(c => c.proximiteMer)
const avecProxLac = campings.filter(c => c.proximiteLac)
const avecProxForet = campings.filter(c => c.proximiteForet)
console.log(`\n🌍 Proximité environnement:`)
console.log(`   🌊 Mer: ${avecProxMer.length}`)
console.log(`   🏞️  Lac: ${avecProxLac.length}`)
console.log(`   🌲 Forêt: ${avecProxForet.length}`)

// Accessibilité
const avecAnimaux = campings.filter(c => c.animauxAcceptes)
const avecPMR = campings.filter(c => c.accessiblePMR)
const ouvertAnnee = campings.filter(c => c.ouvertureAnnuelle)
console.log(`\n♿ Accessibilité:`)
console.log(`   🐕 Animaux acceptés: ${avecAnimaux.length}`)
console.log(`   ♿ PMR: ${avecPMR.length}`)
console.log(`   📅 Ouverture annuelle: ${ouvertAnnee.length}`)

// Taille du fichier
const size = (fs.statSync(jsonPath).size / 1024 / 1024).toFixed(2)
console.log(`\n💾 Taille du fichier: ${size} MB`)
