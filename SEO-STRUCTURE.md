# Structure SEO - Vie de Camping

## Pages générées statiquement

### 1. Page d'accueil
- **Route** : `/`
- **Title** : "Vie de Camping - Découvrez les meilleurs campings de France"
- **Type** : Page éditoriale

### 2. Liste complète des campings
- **Route** : `/campings/`
- **Title** : "Campings en France - Vie de Camping"
- **Nombre de pages** : 1
- **Contenu** : Liste des 5 704 campings

### 3. Pages par région (SEO programmatique)
- **Route** : `/campings/region/[region]/`
- **Title** : "Camping en {Région} : tous les campings classés"
- **Meta description** : "Retrouvez la liste complète des {X} campings classés en {Région} : emplacements, étoiles et localisation."
- **Nombre de pages** : ~13 régions
- **Exemples** :
  - `/campings/region/auvergne-rhone-alpes/`
  - `/campings/region/bretagne/`
  - `/campings/region/provence-alpes-cote-d-azur/`

### 4. Pages par département (SEO programmatique)
- **Route** : `/campings/departement/[departement]/`
- **Title** : "Camping dans le {Département} ({Code}) : campings classés"
- **Meta description** : "Tous les {X} campings classés dans le département {Département} ({Code}) : liste complète par commune et classement."
- **Nombre de pages** : ~95 départements avec campings
- **Exemples** :
  - `/campings/departement/44/` (Loire-Atlantique)
  - `/campings/departement/06/` (Alpes-Maritimes)
  - `/campings/departement/33/` (Gironde)

### 5. Pages par commune (SEO programmatique)
- **Route** : `/campings/commune/[commune]/`
- **Title** : "Camping à {Commune} : campings classés et informations"
- **Meta description** : "Découvrez les {X} camping(s) classé(s) à {Commune} : localisation, classement et informations officielles."
- **Nombre de pages** : ~2 000+ communes avec campings
- **Exemples** :
  - `/campings/commune/saint-jean-de-monts/`
  - `/campings/commune/argeles-sur-mer/`
  - `/campings/commune/biscarrosse/`

### 6. Pages par camping (fiches détaillées)
- **Route** : `/campings/[slug]/`
- **Title** : "{Nom du camping} - {Commune} ({Département}) - Vie de Camping"
- **Meta description** : "Découvrez {Nom du camping}, camping {Classement} situé à {Commune} ({Code postal}). {X} emplacements disponibles."
- **Nombre de pages** : 5 704 campings
- **Exemples** :
  - `/campings/le-domaine-de-la-breche-saint-jean-de-monts/`
  - `/campings/les-pins-argeles-sur-mer/`

## Total des pages générées

- **Pages fixes** : ~5
- **Pages régions** : ~13
- **Pages départements** : ~95
- **Pages communes** : ~2 000+
- **Pages campings** : 5 704

**TOTAL ESTIMÉ** : ~8 000 pages statiques

## Maillage interne (SEO)

### Navigation descendante (du général au particulier)
```
Accueil
  └─ Liste campings
       └─ Région
            └─ Département
                 └─ Commune
                      └─ Camping (fiche détail)
```

### Liens contextuels dans chaque page

#### Page Région
- Lien vers chaque département de la région
- Liens vers toutes les communes
- Liens vers chaque camping

#### Page Département
- Lien vers la région parente
- Liens vers toutes les communes du département
- Liens vers chaque camping

#### Page Commune
- Lien vers le département
- Lien vers la région
- Liens vers chaque camping de la commune

#### Page Camping (fiche détail)
- Breadcrumb : Commune > Département > Région
- Liens dans les informations (commune, département, région)
- Liens contextuels dans le texte

## Optimisation SEO

### Points forts
- ✅ Génération statique (HTML dans le code source)
- ✅ Titles et meta descriptions uniques et pertinents
- ✅ Structure HTML sémantique (section, article, header, nav)
- ✅ URLs SEO-friendly (slugs sans accents)
- ✅ Maillage interne dense et cohérent
- ✅ Contenu unique par page (stats, listes, données factuelles)
- ✅ Pas de contenu dupliqué
- ✅ Données officielles (Atout France)

### Longue traîne
Chaque combinaison génère du trafic potentiel :
- "camping en bretagne"
- "camping finistere"
- "camping saint jean de monts"
- "camping 5 etoiles var"
- etc.

## Données sources
- Fichier : `data/hebergements_classes.csv`
- Source : Classement Atout France
- Campings référencés : 5 704
