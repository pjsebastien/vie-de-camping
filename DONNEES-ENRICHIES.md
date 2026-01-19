# Données enrichies - Vie de Camping

## Vue d'ensemble

Le fichier `data/vie-de-camping.json` contient 5 703 campings avec des données enrichies provenant de 4 sources:

1. **CSV Atout France** (hebergements_classes.csv) - Données officielles de classement
2. **INSEE** (donnees_communes.csv, donnees_departements.csv, donnees_regions.csv) - Données démographiques
3. **OpenStreetMap** (export.geojson) - Équipements, services, coordonnées GPS
4. **Script de fusion** (buildData.js) - Enrichissement et consolidation

## Statistiques d'enrichissement

D'après la dernière génération:

- **96%** des campings ont la population de leur commune
- **98%** ont la population de leur département
- **36%** ont des coordonnées GPS (latitude/longitude)
- **98 campings** avec piscine répertoriée
- **453 campings** avec WiFi
- **193 campings** accessibles PMR
- **39 campings** acceptant les animaux

## Données disponibles par camping

### Données de base (CSV Atout France)

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `slug` | string | Identifiant URL unique | "camping-des-sables-concarneau" |
| `nom` | string | Nom commercial | "CAMPING DES SABLES" |
| `commune` | string | Commune | "CONCARNEAU" |
| `codePostal` | string | Code postal | "29900" |
| `departement` | string | Code département | "29" |
| `adresse` | string | Adresse complète | "15 rue des Sables" |
| `classement` | string | Classement officiel | "3 étoiles", "Aire naturelle" |
| `categorie` | string\|null | Catégorie | "TOURISME", "LOISIRS" |
| `capacite` | number\|null | Capacité en personnes | 270 |
| `nombreEmplacements` | number\|null | Nombre d'emplacements | 90 |
| `siteWeb` | string\|null | Site web officiel | "https://..." |
| `dateClassement` | string | Date du classement | "28/11/2024" |
| `typeSejour` | string\|null | Type de séjour | À documenter |
| `classementProroge` | boolean | Classement prorogé | true/false |

### Données démographiques (INSEE)

| Propriété | Type | Description | Source |
|-----------|------|-------------|--------|
| `populationCommune` | number | Population de la commune | INSEE |
| `populationDepartement` | number | Population du département | INSEE |
| `populationRegion` | number | Population de la région | INSEE |
| `nombreCommunesDepartement` | number | Nombre de communes dans le département | INSEE |

### Coordonnées géographiques (OSM)

| Propriété | Type | Description |
|-----------|------|-------------|
| `latitude` | number | Latitude GPS |
| `longitude` | number | Longitude GPS |

### Environnement et proximité (OSM)

| Propriété | Type | Description | Utilité pour vacanciers |
|-----------|------|-------------|------------------------|
| `environnement` | string[] | Tags environnement | Type de cadre naturel |
| `proximiteMer` | boolean | Proche de la mer | Vacances balnéaires |
| `proximiteLac` | boolean | Proche d'un lac | Activités nautiques douces |
| `proximiteRiviere` | boolean | Proche d'une rivière | Pêche, canoë |
| `proximiteForet` | boolean | Proche d'une forêt | Randonnées, nature |
| `proximiteMontagne` | boolean | Proche de la montagne | Randonnées, ski |

### Équipements et services (OSM)

| Propriété | Type | Description | Utilité pour vacanciers |
|-----------|------|-------------|------------------------|
| `piscine` | boolean | Piscine disponible | Baignade sur place |
| `restaurant` | boolean | Restaurant sur place | Restauration sans quitter le camping |
| `bar` | boolean | Bar sur place | Convivialité |
| `epicerie` | boolean | Épicerie/boutique | Courses de dépannage |
| `wifi` | boolean | WiFi disponible | Connexion internet |
| `laverie` | boolean | Laverie disponible | Lessive sur place |
| `aireDeJeux` | boolean | Aire de jeux | Enfants |
| `locationVelos` | boolean | Location de vélos | Mobilité douce |

### Types d'hébergement disponibles (OSM)

| Propriété | Type | Description | Utilité pour vacanciers |
|-----------|------|-------------|------------------------|
| `emplacementsTentes` | boolean | Emplacements pour tentes | Camping traditionnel |
| `emplacementsCaravanes` | boolean | Emplacements pour caravanes | Caravaning |
| `emplacementsCampingCars` | boolean | Emplacements pour camping-cars | Camping-car |
| `chalets` | boolean | Chalets disponibles | Hébergement en dur |
| `mobilHomes` | boolean | Mobil-homes disponibles | Confort |
| `bungalows` | boolean | Bungalows disponibles | Alternative au mobil-home |

### Accessibilité et pratique (OSM)

| Propriété | Type | Description | Utilité pour vacanciers |
|-----------|------|-------------|------------------------|
| `animauxAcceptes` | boolean | Animaux acceptés | Vacances avec animal de compagnie |
| `accessiblePMR` | boolean | Accessible PMR | Personnes à mobilité réduite |
| `ouvertureAnnuelle` | boolean | Ouvert toute l'année | Vacances hors saison |

### Contact (OSM)

| Propriété | Type | Description |
|-----------|------|-------------|
| `telephone` | string\|null | Numéro de téléphone |
| `email` | string\|null | Adresse email |
| `description` | string\|null | Description du camping |

## Comment utiliser ces données

### Dans les pages campings

Le générateur `lib/equipementsGenerator.ts` fournit des fonctions pour afficher les données:

```typescript
import { generateEquipementsList, generateHebergementsList, generateEnvironnementText } from '@/lib/equipementsGenerator'

const equipements = generateEquipementsList(camping)  // ['Piscine', 'WiFi', ...]
const hebergements = generateHebergementsList(camping)  // ['Emplacements pour tentes', ...]
const environnement = generateEnvironnementText(camping)  // "Le camping est situé à proximité de la mer et d'une forêt"
```

### Dans le contenu généré

Le générateur `lib/contentGenerator.ts` utilise automatiquement:
- La population communale pour contextualiser la localisation
- Les données démographiques pour calculer des densités
- Les statistiques d'équipements pour les pages communes/départements

## Amélioration de la couverture des données

Pour améliorer le taux de couverture des données OSM (actuellement 36% pour les coordonnées):

1. **Contribuer à OpenStreetMap** - Ajouter les campings manquants
2. **Utiliser d'autres sources** - APIs tierces (Google Places, etc.)
3. **Geocoding** - Convertir les adresses en coordonnées
4. **Compléter manuellement** - Pour les campings prioritaires

## Script de génération

Pour régénérer le fichier vie-de-camping.json avec les données enrichies:

```bash
node scripts/buildData.js
```

Le script affiche des statistiques d'enrichissement pour vérifier la qualité des données.

## Prochaines étapes possibles

### Filtres et recherche
- Filtrer par équipements (piscine, WiFi, etc.)
- Filtrer par environnement (mer, montagne, etc.)
- Filtrer par types d'hébergement
- Recherche géographique par coordonnées

### Affichage enrichi
- Cartes interactives (Leaflet, Mapbox)
- Badges visuels pour équipements
- Photos des campings (sources externes)
- Avis utilisateurs

### SEO avancé
- Pages thématiques ("Campings avec piscine en Bretagne")
- Pages par équipement
- Comparateurs de campings
- Guides de voyage

## Sources et licences

- **Atout France**: Données officielles de classement des hébergements touristiques
- **INSEE**: Données démographiques françaises (open data)
- **OpenStreetMap**: Données géographiques et équipements (ODbL)
