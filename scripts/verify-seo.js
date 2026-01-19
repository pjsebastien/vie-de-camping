#!/usr/bin/env node

/**
 * Script de vérification SEO avant déploiement
 * Vérifie que tous les fichiers SEO essentiels sont présents et valides
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 Vérification SEO - Vie de Camping\n')
console.log('=' .repeat(60))

let errors = 0
let warnings = 0
let success = 0

function checkFile(filePath, description) {
  const fullPath = path.join(process.cwd(), filePath)
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${description}`)
    console.log(`   📁 ${filePath}`)
    success++
    return true
  } else {
    console.log(`❌ ${description}`)
    console.log(`   📁 ${filePath} - MANQUANT`)
    errors++
    return false
  }
}

function checkOptionalFile(filePath, description) {
  const fullPath = path.join(process.cwd(), filePath)
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${description}`)
    console.log(`   📁 ${filePath}`)
    success++
    return true
  } else {
    console.log(`⚠️  ${description}`)
    console.log(`   📁 ${filePath} - OPTIONNEL`)
    warnings++
    return false
  }
}

console.log('\n📋 FICHIERS SEO ESSENTIELS\n')

// Fichiers SEO critiques
checkFile('app/sitemap.ts', 'Sitemap dynamique')
checkFile('app/robots.ts', 'Robots.txt')
checkFile('app/manifest.ts', 'PWA Manifest')
checkFile('app/layout.tsx', 'Layout avec métadonnées')

console.log('\n🔀 REDIRECTIONS 301\n')

checkFile('next.config.redirects.js', 'Configuration redirections (à intégrer)')
checkFile('redirects-301-mapping.md', 'Documentation redirections')

console.log('\n📄 PAGES LÉGALES\n')

checkFile('app/mentions-legales/page.tsx', 'Mentions légales')
checkFile('app/politique-confidentialite/page.tsx', 'Politique de confidentialité')
checkFile('app/contact/page.tsx', 'Page contact')
checkFile('app/a-propos/page.tsx', 'Page à propos')

console.log('\n📊 DONNÉES\n')

checkFile('data/vie-de-camping.json', 'Base de données campings')
checkFile('lib/regions.ts', 'Données régions/départements')

console.log('\n🖼️ ASSETS\n')

checkOptionalFile('public/images/camping.jpg', 'Image principale (Open Graph)')
checkOptionalFile('public/images/logos/logo-black.png', 'Logo noir')
checkOptionalFile('public/images/logos/logo-white.png', 'Logo blanc')
checkOptionalFile('public/vie de camping favicon.png', 'Favicon')

console.log('\n📚 DOCUMENTATION\n')

checkOptionalFile('DEPLOIEMENT-SEO.md', 'Guide de déploiement SEO')
checkOptionalFile('README.md', 'Documentation projet')

console.log('\n' + '='.repeat(60))
console.log('\n📈 RÉSUMÉ\n')
console.log(`✅ Succès: ${success}`)
console.log(`⚠️  Avertissements: ${warnings}`)
console.log(`❌ Erreurs: ${errors}`)

if (errors === 0) {
  console.log('\n🎉 Tous les fichiers SEO essentiels sont présents!')
  console.log('✅ Site prêt pour le déploiement SEO')

  console.log('\n📋 PROCHAINES ÉTAPES:\n')
  console.log('1. Intégrer next.config.redirects.js dans next.config.js')
  console.log('2. Exécuter: npm run build')
  console.log('3. Vérifier qu\'il n\'y a pas d\'erreurs de build')
  console.log('4. Déployer sur Vercel')
  console.log('5. Vérifier sitemap: https://www.viedecamping.fr/sitemap.xml')
  console.log('6. Soumettre le sitemap à Google Search Console')

  process.exit(0)
} else {
  console.log('\n⚠️  Certains fichiers SEO essentiels sont manquants')
  console.log('❌ Veuillez corriger les erreurs avant de déployer')
  process.exit(1)
}
