# Guide de Déploiement SEO - Vie de Camping

**Date:** 19 janvier 2026
**URL Canonique:** https://www.viedecamping.fr/

---

## ✅ CHECKLIST AVANT DÉPLOIEMENT

### 1. Fichiers SEO Générés

- [x] **sitemap.ts** - Sitemap XML dynamique généré automatiquement
- [x] **robots.ts** - Fichier robots.txt optimisé
- [x] **manifest.ts** - PWA manifest pour référencement mobile
- [x] **layout.tsx** - Métadonnées globales enrichies (Open Graph, Twitter Cards)
- [x] **redirects-301-mapping.md** - Documentation complète des redirections
- [x] **next.config.redirects.js** - Configuration des redirections 301

### 2. Redirections 301

**Fichier à utiliser:** `next.config.redirects.js`

**Action requise:**
1. Remplacer le contenu actuel de `next.config.js` par celui de `next.config.redirects.js`
2. OU copier la fonction `redirects()` dans votre `next.config.js` existant

**Nombre de redirections:** 73 URLs anciennes → Nouvelles URLs pertinentes

**Impact SEO:**
- Préservation du jus SEO des anciennes pages
- Pas de contenu dupliqué
- Pas de pages 404

### 3. Métadonnées Pages

**Pages avec métadonnées complètes:**
- ✅ Homepage (layout.tsx global)
- ✅ Toutes les pages régions (metadata export)
- ✅ Toutes les pages départements (metadata export)
- ✅ Toutes les pages communes (metadata export)
- ✅ Toutes les pages campings individuels (metadata export)
- ✅ Pages statiques (à propos, contact, mentions légales, politique de confidentialité)

**Métadonnées incluses:**
- Title dynamique avec template
- Description unique par page
- Open Graph pour réseaux sociaux
- Twitter Cards
- Canonical URLs
- Keywords pertinents

---

## 🚀 ÉTAPES DE DÉPLOIEMENT

### Étape 1: Vérification Build Local

```bash
# Build du site
npm run build

# Vérifier qu'il n'y a pas d'erreurs
# Vérifier la génération du sitemap dans .next/server/app/sitemap.xml
# Vérifier la génération du robots.txt dans .next/server/app/robots.txt
```

### Étape 2: Test des Redirections

```bash
# Démarrer le serveur en mode production
npm run build
npm start

# Tester quelques redirections manuellement:
# http://localhost:3000/camping-en-bretagne-conseils-avis-les-meilleurs-on-vous-dit-tout
# → Doit rediriger vers /campings/region/bretagne/

# http://localhost:3000/camping-a-arcachon-conseils-avis-la-selection-des-meilleurs
# → Doit rediriger vers /campings/commune/arcachon/
```

### Étape 3: Déploiement Vercel

```bash
# Push sur le repository Git
git add .
git commit -m "feat: ajout redirections 301 et optimisations SEO"
git push origin main

# Vercel déploie automatiquement
# Vérifier le dashboard Vercel pour les erreurs
```

### Étape 4: Vérification Post-Déploiement

**URLs à tester:**

1. **Sitemap XML**
   ```
   https://www.viedecamping.fr/sitemap.xml
   ```
   - Doit afficher un XML valide
   - Doit contenir toutes les URLs (régions, départements, communes, campings)

2. **Robots.txt**
   ```
   https://www.viedecamping.fr/robots.txt
   ```
   - Doit contenir la référence au sitemap
   - Doit autoriser l'indexation (Allow: /)

3. **Manifest**
   ```
   https://www.viedecamping.fr/manifest.webmanifest
   ```
   - Doit retourner un JSON valide

4. **Redirections (échantillon)**
   ```
   https://www.viedecamping.fr/camping-en-bretagne-conseils-avis-les-meilleurs-on-vous-dit-tout
   https://www.viedecamping.fr/camping-a-arcachon-conseils-avis-la-selection-des-meilleurs
   https://www.viedecamping.fr/table-camping
   ```
   - Chacune doit retourner un code 301
   - Chacune doit rediriger vers la bonne URL

---

## 📊 CONFIGURATION GOOGLE SEARCH CONSOLE

### Étape 1: Vérifier la Propriété

1. Se connecter à [Google Search Console](https://search.google.com/search-console)
2. Ajouter la propriété: `https://www.viedecamping.fr`
3. Méthodes de vérification disponibles:
   - **Fichier HTML** (uploadé dans `/public/`)
   - **Balise HTML** (ajoutée dans `verification` du layout.tsx)
   - **Google Analytics** (si déjà installé)
   - **Google Tag Manager**
   - **DNS TXT Record**

**Recommandation:** Utiliser la balise HTML dans metadata

```tsx
// Dans app/layout.tsx, décommenter et remplacer:
verification: {
  google: 'votre-code-google-ici',
}
```

### Étape 2: Soumettre le Sitemap

1. Dans Google Search Console → **Sitemaps**
2. Ajouter: `https://www.viedecamping.fr/sitemap.xml`
3. Cliquer sur **Envoyer**

**Résultat attendu:**
- Statut: Réussite
- URLs découvertes: ~8000+ (5703 campings + 2000+ communes + 96 départements + 13 régions + pages statiques)

### Étape 3: Soumettre les Redirections

1. Dans Google Search Console → **Changement d'adresse** (si applicable)
2. OU simplement attendre que Google crawle les redirections

**Important:**
- Les redirections 301 sont automatiquement suivies par Google
- Le jus SEO est transféré à ~90-95%
- Délai de traitement: 2-8 semaines

### Étape 4: Demander une Réindexation

Pour les pages principales:
1. Google Search Console → **Inspection de l'URL**
2. Entrer l'URL (ex: `https://www.viedecamping.fr/`)
3. Cliquer sur **Demander une indexation**

**URLs prioritaires à réindexer:**
- Homepage
- /campings/
- /campings/regions/
- /campings/departements/
- Top 10 pages régions (Bretagne, Provence-Alpes-Côte d'Azur, etc.)

---

## 🔍 CONFIGURATION BING WEBMASTER TOOLS

### Étapes

1. Se connecter à [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Ajouter le site: `https://www.viedecamping.fr`
3. Vérifier via:
   - Balise HTML (dans verification metadata)
   - Fichier XML
   - DNS

4. Soumettre le sitemap: `https://www.viedecamping.fr/sitemap.xml`

---

## 📈 ANALYTICS ET SUIVI

### Google Analytics 4 (Recommandé)

**Installation:**

1. Créer une propriété GA4 sur [Google Analytics](https://analytics.google.com)
2. Récupérer le Measurement ID (format: `G-XXXXXXXXXX`)
3. Installer `@next/third-parties` (optionnel) OU ajouter le script dans layout.tsx:

```tsx
// Dans app/layout.tsx, ajouter dans <head>:
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

**Événements à tracker:**
- Clics sur liens campings
- Clics sur téléphone/email
- Utilisation des filtres
- Navigation par région/département

### Plausible Analytics (Alternative Privacy-Friendly)

**Installation:**

```tsx
// Dans app/layout.tsx, ajouter dans <head>:
<Script
  defer
  data-domain="viedecamping.fr"
  src="https://plausible.io/js/script.js"
/>
```

**Avantages:**
- Pas de cookies
- Conforme RGPD sans bannière
- Simple et léger

---

## 🌐 DONNÉES STRUCTURÉES (SCHEMA.ORG)

### Structured Data Déjà Implémenté

**À FAIRE:** Ajouter JSON-LD sur les pages campings

Exemple de structure pour une page camping:

```tsx
// Dans app/campings/[slug]/page.tsx, ajouter dans le JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Campground',
      name: camping.nom,
      description: `Camping ${camping.classement} à ${camping.commune}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: camping.commune,
        addressRegion: camping.departement,
        addressCountry: 'FR',
      },
      telephone: camping.numeroTelephone,
      url: camping.siteWeb,
      starRating: camping.classement?.includes('étoiles')
        ? {
            '@type': 'Rating',
            ratingValue: camping.classement.match(/\d+/)?.[0] || '0',
            bestRating: '5',
          }
        : undefined,
      amenityFeature: [
        camping.piscine && { '@type': 'LocationFeatureSpecification', name: 'Piscine', value: true },
        camping.accesBornesWifi && { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
        camping.restauration && { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
      ].filter(Boolean),
    }),
  }}
/>
```

### Breadcrumb Schema (À ajouter)

Exemple pour les pages géographiques:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: 'https://www.viedecamping.fr/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Régions',
          item: 'https://www.viedecamping.fr/campings/regions/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Bretagne',
          item: 'https://www.viedecamping.fr/campings/region/bretagne/',
        },
      ],
    }),
  }}
/>
```

---

## ⚡ OPTIMISATIONS PERFORMANCE

### Core Web Vitals Cibles

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **TTFB (Time to First Byte):** < 600ms

### Optimisations Déjà Implémentées

✅ Static Site Generation (SSG)
✅ Images optimisées avec Next.js Image
✅ CSS inline (pas de fichiers externes critiques)
✅ Minification automatique (Next.js)
✅ Compression Gzip/Brotli (Vercel)

### Optimisations Supplémentaires Recommandées

1. **CDN Images:**
   - Héberger les images sur Cloudinary ou Vercel Blob
   - Formats WebP/AVIF automatiques

2. **Lazy Loading:**
   - Déjà activé sur Next.js Image (loading="lazy")
   - Vérifier que seules les images above-the-fold ont `priority={true}`

3. **Preconnect:**
   ```tsx
   // Dans app/layout.tsx, ajouter dans <head>:
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="dns-prefetch" href="https://www.google-analytics.com" />
   ```

---

## 🔐 SÉCURITÉ & CONFORMITÉ

### Headers de Sécurité (Vercel)

Ajouter dans `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

### HTTPS & Certificats

✅ Vercel fournit automatiquement:
- Certificat SSL gratuit (Let's Encrypt)
- Renouvellement automatique
- HTTP/2 et HTTP/3
- HSTS préconfiguré

### RGPD

✅ Pages légales créées:
- /mentions-legales/
- /politique-confidentialite/
- /contact/

**À FAIRE si Analytics installé:**
- Bannière de cookies (si utilisation de Google Analytics avec cookies)
- OU utiliser Plausible (pas de cookies, pas de bannière nécessaire)

---

## 📱 MOBILE-FIRST & PWA

### Progressive Web App

✅ Manifest créé (manifest.ts)
✅ Thème couleur défini (#2c5f2d)

**À ajouter (optionnel):**
- Service Worker pour mode offline
- Bouton "Ajouter à l'écran d'accueil"

### Test Mobile

**Outils:**
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [PageSpeed Insights Mobile](https://pagespeed.web.dev/)
- Chrome DevTools (Device Toolbar)

**Cibles:**
- Score Mobile-Friendly: 100%
- Pas d'éléments trop petits pour cliquer
- Viewport responsive
- Texte lisible sans zoom

---

## 🎯 SUIVI POST-DÉPLOIEMENT (30 JOURS)

### Semaine 1

- [ ] Vérifier indexation des pages principales (Google Search Console)
- [ ] Vérifier que les redirections 301 fonctionnent
- [ ] Vérifier les Core Web Vitals (PageSpeed Insights)
- [ ] Corriger erreurs 404 éventuelles

### Semaine 2-4

- [ ] Surveiller le trafic organique (Google Analytics)
- [ ] Vérifier les positions de ranking (Google Search Console)
- [ ] Analyser les requêtes de recherche
- [ ] Identifier les pages à optimiser

### Mois 2-3

- [ ] Créer les pages thématiques manquantes (campings 5 étoiles, naturistes, etc.)
- [ ] Créer la page matériel-camping
- [ ] Ajouter du contenu éditorial supplémentaire
- [ ] Optimiser les pages avec faible CTR

---

## 📋 CHECKLIST FINALE AVANT MISE EN LIGNE

### Configuration DNS

- [ ] Pointer viedecamping.fr vers Vercel
- [ ] Configurer www.viedecamping.fr (CNAME vers Vercel)
- [ ] Attendre propagation DNS (24-48h)
- [ ] Vérifier HTTPS actif sur les deux domaines

### Vérifications Techniques

- [ ] `npm run build` sans erreur
- [ ] Sitemap accessible sur /sitemap.xml
- [ ] Robots.txt accessible sur /robots.txt
- [ ] Manifest accessible sur /manifest.webmanifest
- [ ] Toutes les redirections 301 testées
- [ ] Pages 404 stylisée (à créer si nécessaire)

### SEO

- [ ] Métadonnées complètes sur toutes les pages
- [ ] Pas de contenu dupliqué
- [ ] Hiérarchie H1/H2/H3 correcte
- [ ] Images avec alt text
- [ ] Liens internes cohérents
- [ ] Liens externes en nofollow

### Performance

- [ ] Lighthouse Score > 90 (Performance)
- [ ] Core Web Vitals validés
- [ ] Images optimisées
- [ ] Pas de requêtes bloquantes

### Accessibilité

- [ ] Lighthouse Score > 95 (Accessibility)
- [ ] Navigation au clavier fonctionnelle
- [ ] Contraste couleurs conforme WCAG AA
- [ ] ARIA labels où nécessaire

---

## 🆘 SUPPORT & RESSOURCES

### Documentation

- [Next.js SEO](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search/docs)
- [Vercel Analytics](https://vercel.com/docs/analytics)
- [Schema.org](https://schema.org/)

### Outils de Test

- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/)
- [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools)

### Monitoring

- [Google Analytics](https://analytics.google.com)
- [Plausible](https://plausible.io)
- [Vercel Analytics](https://vercel.com/analytics)
- [Sentry](https://sentry.io) (erreurs)

---

## ✅ RÉSUMÉ

**Fichiers créés pour le SEO:**
1. `app/sitemap.ts` - Sitemap dynamique
2. `app/robots.ts` - Robots.txt
3. `app/manifest.ts` - PWA manifest
4. `app/layout.tsx` - Métadonnées enrichies (modifié)
5. `next.config.redirects.js` - Redirections 301
6. `redirects-301-mapping.md` - Documentation redirections
7. `DEPLOIEMENT-SEO.md` - Ce fichier

**Actions immédiates requises:**
1. Remplacer `next.config.js` par `next.config.redirects.js`
2. Build et déployer sur Vercel
3. Soumettre sitemap à Google Search Console
4. Configurer Google Analytics (optionnel)

**Résultat attendu:**
- Site 100% optimisé SEO
- Redirections 301 préservant le jus SEO
- Indexation complète en 2-4 semaines
- Core Web Vitals excellents
- Mobile-friendly parfait

---

**Préparé par:** Claude (Assistant IA)
**Pour:** Sébastien P - Vie de Camping
**Contact:** Voir page /contact/

🚀 **Prêt pour le déploiement!**
