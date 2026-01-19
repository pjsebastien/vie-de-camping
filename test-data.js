const fs = require('fs')
const path = require('path')

console.log('Testing data load...')

const jsonPath = path.join(process.cwd(), 'data', 'vie-de-camping.json')
console.log(`Reading: ${jsonPath}`)

const content = fs.readFileSync(jsonPath, 'utf-8')
const campings = JSON.parse(content)

console.log(`✅ Loaded ${campings.length} campings`)

// Check first camping
const first = campings[0]
console.log('\nFirst camping:')
console.log(`- Nom: ${first.nom}`)
console.log(`- Commune: ${first.commune}`)
console.log(`- Population commune: ${first.populationCommune || 'N/A'}`)
console.log(`- Population département: ${first.populationDepartement || 'N/A'}`)
console.log(`- Latitude: ${first.latitude || 'N/A'}`)
console.log(`- Longitude: ${first.longitude || 'N/A'}`)
console.log(`- Environnement: ${first.environnement ? first.environnement.join(', ') : 'N/A'}`)

// Count enriched data
let withPopCommune = 0
let withPopDept = 0
let withCoords = 0
let withEnv = 0

for (const camping of campings) {
  if (camping.populationCommune) withPopCommune++
  if (camping.populationDepartement) withPopDept++
  if (camping.latitude && camping.longitude) withCoords++
  if (camping.environnement && camping.environnement.length > 0) withEnv++
}

console.log('\nEnrichment statistics:')
console.log(`- Campings with commune population: ${withPopCommune} / ${campings.length} (${Math.round(withPopCommune/campings.length*100)}%)`)
console.log(`- Campings with département population: ${withPopDept} / ${campings.length} (${Math.round(withPopDept/campings.length*100)}%)`)
console.log(`- Campings with coordinates: ${withCoords} / ${campings.length} (${Math.round(withCoords/campings.length*100)}%)`)
console.log(`- Campings with environment tags: ${withEnv} / ${campings.length} (${Math.round(withEnv/campings.length*100)}%)`)

console.log('\n✅ Data test completed successfully!')
