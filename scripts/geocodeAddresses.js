const fs = require('fs')
const path = require('path')
const https = require('https')

/**
 * Simple HTTP GET request
 */
function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(e)
        }
      })
    }).on('error', reject)
  })
}

/**
 * Geocode une adresse via l'API Adresse du gouvernement français
 * API gratuite, 1M requêtes/jour, pas de clé nécessaire
 */
async function geocodeAddress(camping) {
  const query = `${camping.adresse}, ${camping.codePostal} ${camping.commune}, France`
  const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=1`

  try {
    const data = await httpGet(url)

    if (data.features && data.features.length > 0) {
      const coords = data.features[0].geometry.coordinates
      const score = data.features[0].properties.score // 0-1, confiance du résultat

      return {
        latitude: coords[1],
        longitude: coords[0],
        geocodeScore: score
      }
    }
  } catch (error) {
    console.error(`Erreur geocoding ${camping.nom}:`, error.message)
  }

  return null
}

/**
 * Geocode tous les campings qui n'ont pas de coordonnées
 */
async function geocodeAllCampings() {
  console.log('🔄 Chargement du fichier JSON...')

  const jsonPath = path.join(process.cwd(), 'data', 'vie-de-camping.json')
  const campings = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

  console.log(`✅ ${campings.length} campings chargés`)

  // Compter combien n'ont pas de coordonnées
  const sansCoords = campings.filter(c => !c.latitude || !c.longitude)
  console.log(`📍 ${sansCoords.length} campings sans coordonnées GPS`)

  if (sansCoords.length === 0) {
    console.log('✅ Tous les campings ont déjà des coordonnées!')
    return
  }

  console.log(`🌍 Démarrage du geocoding...`)
  console.log(`⏱️  Temps estimé: ~${Math.ceil(sansCoords.length / 10)} secondes (10 requêtes/sec)`)

  let geocoded = 0
  let failed = 0

  for (let i = 0; i < campings.length; i++) {
    const camping = campings[i]

    // Skip si déjà des coordonnées
    if (camping.latitude && camping.longitude) {
      continue
    }

    // Geocode
    const result = await geocodeAddress(camping)

    if (result) {
      camping.latitude = result.latitude
      camping.longitude = result.longitude
      camping.geocodeScore = result.geocodeScore
      geocoded++

      if (geocoded % 100 === 0) {
        console.log(`   Geocodé: ${geocoded}/${sansCoords.length}`)
      }
    } else {
      failed++
    }

    // Rate limiting: 10 requêtes/seconde max
    if (i % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  console.log(`\n📊 Résultats:`)
  console.log(`   ✅ Geocodés avec succès: ${geocoded}`)
  console.log(`   ❌ Échecs: ${failed}`)
  console.log(`   📍 Total avec coordonnées: ${campings.filter(c => c.latitude && c.longitude).length} / ${campings.length}`)

  // Sauvegarder
  console.log(`\n💾 Sauvegarde du fichier...`)
  fs.writeFileSync(jsonPath, JSON.stringify(campings, null, 2), 'utf-8')

  const size = (fs.statSync(jsonPath).size / 1024 / 1024).toFixed(2)
  console.log(`✅ Fichier sauvegardé: ${jsonPath}`)
  console.log(`📊 Taille: ${size} MB`)
  console.log(`\n✨ Terminé!`)
}

// Exécution
geocodeAllCampings().catch(error => {
  console.error('❌ Erreur:', error)
  process.exit(1)
})
