# Guide de navigation - Vie de Camping

## Pages d'accès rapide

### 🏠 Page d'accueil
**URL** : `/`
- Présentation du site
- Contenu éditorial

### 🏕️ Liste complète des campings
**URL** : `/campings/`
- 5 704 campings par ordre alphabétique
- 3 cartes d'accès rapide :
  - Par région
  - Par département
  - Par commune

---

## Navigation par localisation

### 📍 Index des régions
**URL** : `/campings/regions/`

Liste des 13 régions françaises avec campings :
- Nombre de campings par région
- Lien direct vers chaque région

**Exemple** :
- Bretagne → `/campings/region/bretagne/`
- Provence-Alpes-Côte d'Azur → `/campings/region/provence-alpes-cote-d-azur/`

### 🗺️ Index des départements
**URL** : `/campings/departements/`

Liste des ~95 départements organisés par région :
- Nom du département + code (ex: Finistère (29))
- Nombre de campings par département
- Navigation par région

**Exemple** :
- Loire-Atlantique → `/campings/departement/44/`
- Var → `/campings/departement/83/`

### 🏘️ Index des communes
**URL** : `/campings/communes/`

Liste alphabétique des +2000 communes :
- Index alphabétique (A-Z)
- Navigation rapide par lettre
- Nombre de campings par commune

**Exemple** :
- Saint-Jean-de-Monts → `/campings/commune/saint-jean-de-monts/`
- Argelès-sur-Mer → `/campings/commune/argeles-sur-mer/`

---

## Pages de détail

### 🌍 Page Région
**URL** : `/campings/region/[region]/`

**Contenu** :
- Titre : "Camping en {Région}"
- Nombre total de campings
- Liste des départements de la région avec nombre de campings
- Liste complète des campings avec liens vers communes
- Breadcrumb : ← Retour aux campings

**SEO** :
- Title : "Camping en {Région} : tous les campings classés"
- Meta description unique avec statistiques

### 🏛️ Page Département
**URL** : `/campings/departement/[code]/`

**Contenu** :
- Titre : "Camping dans le {Département}"
- Code département + lien vers région
- Liste des communes avec nombre de campings
- Liste complète des campings
- Breadcrumb : Région | Tous les campings

**SEO** :
- Title : "Camping dans le {Département} ({Code}) : campings classés"
- Meta description unique

### 🏘️ Page Commune
**URL** : `/campings/commune/[commune]/`

**Contenu** :
- Titre : "Camping à {Commune}"
- Statistiques (nombre de campings, emplacements, classements)
- Département + Région
- Liste détaillée des campings avec adresses
- Breadcrumb : Département | Région | Tous les campings

**SEO** :
- Title : "Camping à {Commune} : campings classés et informations"
- Meta description avec stats réelles

### ⛺ Page Camping (fiche détail)
**URL** : `/campings/[slug]/`

**Contenu** :
- Nom du camping + classement
- Informations complètes (adresse, département, région)
- Classement et capacité
- Site web (si disponible)
- Liens vers commune, département, région
- Breadcrumb : Commune | Département | Région

**SEO** :
- Title : "{Nom} - {Commune} ({Département}) - Vie de Camping"
- Meta description personnalisée

---

## Navigation dans le header

Le header contient les liens suivants :
1. **Accueil** → `/`
2. **Campings** → `/campings/`
3. **Régions** → `/campings/regions/`
4. **Départements** → `/campings/departements/`
5. **À propos** → `/a-propos/`

---

## Maillage interne

### Parcours utilisateur type

```
Header "Régions"
  ↓
/campings/regions/
  ↓ Clic sur "Bretagne"
/campings/region/bretagne/
  ↓ Clic sur "Finistère (29)"
/campings/departement/29/
  ↓ Clic sur "Concarneau"
/campings/commune/concarneau/
  ↓ Clic sur un camping
/campings/le-camping-des-sables-concarneau/
```

### Liens contextuels

Chaque page contient :
- **Breadcrumb** en haut de page
- **Liens dans le contenu** (noms de lieux cliquables)
- **Navigation latérale** vers niveaux supérieurs/inférieurs

---

## Avantages SEO

### Découvrabilité
- Pages d'index facilitent l'exploration par Google
- Maillage interne dense (chaque page lie vers parents et enfants)
- Breadcrumbs clairs sur toutes les pages

### Contenu unique
- Statistiques réelles par page
- Pas de contenu dupliqué
- Titres et descriptions personnalisés

### Longue traîne
Chaque page cible des requêtes spécifiques :
- "camping bretagne" → page région
- "camping finistere" → page département
- "camping concarneau" → page commune
- "camping [nom exact]" → fiche camping

---

## Commandes pour tester

```bash
# Mode développement
npm run dev

# Build production
npm run build

# URLs à tester
http://localhost:3000/
http://localhost:3000/campings/
http://localhost:3000/campings/regions/
http://localhost:3000/campings/departements/
http://localhost:3000/campings/communes/
http://localhost:3000/campings/region/bretagne/
http://localhost:3000/campings/departement/29/
http://localhost:3000/campings/commune/concarneau/
```
