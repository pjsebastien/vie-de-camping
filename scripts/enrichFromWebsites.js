const fs = require('fs')
const path = require('path')

/**
 * Extrait les équipements depuis le HTML d'un site web
 * Recherche de mots-clés dans le contenu de la page
 */
function extractEquipementsFromHTML(html, url) {
  const equipements = {}
  const text = html.toLowerCase()

  // Équipements
  if (text.includes('piscine')) equipements.piscine = true
  if (text.includes('restaurant')) equipements.restaurant = true
  if (text.includes('bar ') || text.includes('bar.')) equipements.bar = true
  if (text.includes('épicerie') || text.includes('epicerie') || text.includes('supérette')) equipements.epicerie = true
  if (text.includes('wifi') || text.includes('wi-fi')) equipements.wifi = true
  if (text.includes('laverie') || text.includes('lave-linge')) equipements.laverie = true
  if (text.includes('aire de jeux') || text.includes('jeux pour enfants')) equipements.aireDeJeux = true
  if (text.includes('location de vélos') || text.includes('location vélo')) equipements.locationVelos = true

  // Hébergements
  if (text.includes('chalet')) equipements.chalets = true
  if (text.includes('mobil-home') || text.includes('mobile home') || text.includes('mobilhome')) equipements.mobilHomes = true
  if (text.includes('bungalow')) equipements.bungalows = true
  if (text.includes('tente')) equipements.emplacementsTentes = true
  if (text.includes('caravane')) equipements.emplacementsCaravanes = true
  if (text.includes('camping-car') || text.includes('campingcar')) equipements.emplacementsCampingCars = true

  // Accessibilité
  if (text.includes('animaux acceptés') || text.includes('animaux admis') || text.includes('chien accepté')) {
    equipements.animauxAcceptes = true
  }
  if (text.includes('accessible pmr') || text.includes('handicapé') || text.includes('mobilité réduite')) {
    equipements.accessiblePMR = true
  }
  if (text.includes('ouvert toute l\'année') || text.includes('ouvert toute l année')) {
    equipements.ouvertureAnnuelle = true
  }

  // Environnement
  if (text.includes('mer ') || text.includes('plage') || text.includes('bord de mer')) {
    equipements.proximiteMer = true
  }
  if (text.includes('montagne') || text.includes('alpes') || text.includes('pyrénées')) {
    equipements.proximiteMontagne = true
  }
  if (text.includes('lac ') || text.includes('étang')) {
    equipements.proximiteLac = true
  }
  if (text.includes('rivière') || text.includes('bord de l\'eau')) {
    equipements.proximiteRiviere = true
  }
  if (text.includes('forêt') || text.includes('bois')) {
    equipements.proximiteForet = true
  }

  return equipements
}

/**
 * Récupère et analyse un site web
 */
async function scrapeWebsite(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: AbortSignal.timeout(10000) // 10 secondes timeout
    })

    if (!response.ok) {
      return null
    }

    const html = await response.text()
    return extractEquipementsFromHTML(html, url)
  } catch (error) {
    // Timeout ou erreur réseau
    return null
  }
}

/**
 * Enrichit les campings depuis leurs sites web
 */
async function enrichFromWebsites() {
  console.log('🔄 Chargement du fichier JSON...')

  const jsonPath = path.join(process.cwd(), 'data', 'vie-de-camping.json')
  const campings = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

  console.log(`✅ ${campings.length} campings chargés`)

  // Compter combien ont un site web
  const avecSiteWeb = campings.filter(c => c.siteWeb)
  console.log(`🌐 ${avecSiteWeb.length} campings avec site web`)

  if (avecSiteWeb.length === 0) {
    console.log('❌ Aucun camping avec site web!')
    return
  }

  console.log(`\n🕷️  Démarrage du scraping...`)
  console.log(`⚠️  Cela peut prendre du temps (10s par site = ~${Math.ceil(avecSiteWeb.length * 10 / 60)} minutes)`)
  console.log(`💡 Conseil: Interrompre avec Ctrl+C et relancer plus tard, les données déjà scrapées sont conservées\n`)

  let scraped = 0
  let enriched = 0
  let failed = 0

  for (let i = 0; i < campings.length; i++) {
    const camping = campings[i]

    // Skip si pas de site web
    if (!camping.siteWeb) continue

    // Skip si déjà des équipements (optionnel)
    // if (camping.piscine !== undefined) continue

    scraped++
    console.log(`[${scraped}/${avecSiteWeb.length}] Scraping ${camping.nom}...`)

    const equipements = await scrapeWebsite(camping.siteWeb)

    if (equipements && Object.keys(equipements).length > 0) {
      // Fusionner avec données existantes (garder les vraies si déjà présentes)
      Object.keys(equipements).forEach(key => {
        if (camping[key] === undefined || camping[key] === null) {
          camping[key] = equipements[key]
        }
      })

      enriched++
      console.log(`   ✅ ${Object.keys(equipements).length} équipements trouvés`)
    } else {
      failed++
      console.log(`   ⚠️  Aucune donnée extraite`)
    }

    // Rate limiting: 1 requête toutes les 2 secondes (poli)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Sauvegarde intermédiaire tous les 50 campings
    if (scraped % 50 === 0) {
      console.log(`\n💾 Sauvegarde intermédiaire...`)
      fs.writeFileSync(jsonPath, JSON.stringify(campings, null, 2), 'utf-8')
      console.log(`✅ Sauvegardé (${scraped}/${avecSiteWeb.length})\n`)
    }
  }

  console.log(`\n📊 Résultats:`)
  console.log(`   🌐 Sites visités: ${scraped}`)
  console.log(`   ✅ Enrichis: ${enriched}`)
  console.log(`   ❌ Échecs: ${failed}`)

  // Sauvegarder
  console.log(`\n💾 Sauvegarde finale...`)
  fs.writeFileSync(jsonPath, JSON.stringify(campings, null, 2), 'utf-8')

  const size = (fs.statSync(jsonPath).size / 1024 / 1024).toFixed(2)
  console.log(`✅ Fichier sauvegardé: ${jsonPath}`)
  console.log(`📊 Taille: ${size} MB`)
  console.log(`\n✨ Terminé!`)
}

// Exécution
enrichFromWebsites().catch(error => {
  console.error('❌ Erreur:', error)
  process.exit(1)
})
