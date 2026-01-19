# Système de génération de contenu automatique

## Principe

Le contenu des pages est généré automatiquement **au build** à partir de **règles logiques** et de **statistiques réelles** issues des données CSV.

**Aucune donnée n'est inventée. Aucune API externe n'est utilisée.**

## Architecture

### Fichier principal
`lib/contentGenerator.ts` - Fonctions de génération de contenu basées sur des règles

### Intégration
Le contenu est généré côté serveur (Server Components Next.js) et injecté dans le HTML statique.

## Fonctions disponibles

### Pour les fiches camping

#### `generateCampingPresentation(camping)`
Génère un paragraphe de présentation basé sur :
- Le classement (étoiles vs aire naturelle)
- La localisation (commune)
- La capacité (nombre d'emplacements)

**Règles** :
- Si >= 200 emplacements → "camping de grande capacité"
- Si >= 100 emplacements → "établissement"
- Si >= 50 emplacements → "camping"
- Si < 50 emplacements → "établissement familial"

**Exemple de sortie** :
> "Le camping Les Pins dispose d'un classement 3 étoiles situé à Argelès-sur-Mer. Cet établissement propose 120 emplacements."

#### `generateCampingKeyPoints(camping, campingsInCommune)`
Génère une liste de 3-5 points factuels :
- Classement officiel Atout France
- Capacité avec qualification (importante / adaptée / taille humaine)
- Contexte local (unique / un des X / dans une commune avec X campings)
- Capacité d'accueil en personnes

**Exemple de sortie** :
```
- Classement officiel Atout France : 3 étoiles
- 120 emplacements disponibles
- Un des 5 campings classés de Argelès-sur-Mer
- Capacité d'accueil : 360 personnes
```

### Pour les pages commune

#### `generateCommuneOffre(commune, campings, totalInDepartement)`
Génère un texte sur l'offre de camping dans la commune :
- Volume (1 camping / X campings / offre développée)
- Poids relatif dans le département (si >= 10%)
- Capacité totale en emplacements

**Règles** :
- 1 camping → "dispose d'un camping classé"
- 2-3 campings → "compte X campings classés"
- > 3 campings → "présente une offre de camping développée"

**Exemple de sortie** :
> "Avec 8 campings classés, Saint-Jean-de-Monts présente une offre de camping développée. Ces établissements représentent 15% de l'offre du département. La capacité totale est de 1200 emplacements."

#### `generateCommuneTypologie(campings)`
Génère un texte sur la typologie :
- Distribution des classements
- Classement dominant (si >= 50%)

**Exemple de sortie** :
> "Répartition des classements : 2 2 étoiles, 4 3 étoiles, 2 4 étoiles. Le classement 3 étoiles est majoritaire."

### Pour les pages département

#### `generateDepartementOverview(departementName, campings, communesCount)`
Génère une vue d'ensemble :
- Volume (important / X campings / propose X campings)
- Répartition géographique (nombre de communes)
- Capacité totale

**Règles** :
- >= 100 campings → "offre importante"
- >= 50 campings → "compte X campings"
- < 50 campings → "propose X campings"

**Exemple de sortie** :
> "Le département Vendée dispose d'une offre de camping importante avec 127 établissements classés. Ces campings sont répartis sur 45 communes. La capacité totale représente 18500 emplacements."

#### `generateDepartementTypologie(campings)`
Génère une analyse typologique :
- Distribution détaillée par étoiles
- Orientation de l'offre (haut de gamme / entrée de gamme / équilibrée)

**Règles** :
- Haut de gamme : 4-5 étoiles > 40%
- Entrée de gamme : Aires naturelles + 1-2 étoiles > 50%
- Équilibré : sinon

**Exemple de sortie** :
> "L'offre se compose de 15 aires naturelles, 25 campings 2 étoiles, 45 campings 3 étoiles, 35 campings 4 étoiles, 7 campings 5 étoiles. Le département présente une offre orientée vers les campings bien équipés."

### Pour les pages région

#### `generateRegionOverview(region, campings, departementsCount, communesCount)`
Génère une vue d'ensemble régionale :
- Volume (destination majeure / offre développée / compte X)
- Distribution géographique
- Capacité régionale totale

**Règles** :
- >= 500 campings → "destination camping majeure"
- >= 200 campings → "offre développée"
- < 200 campings → "compte X campings"

**Exemple de sortie** :
> "La région Bretagne constitue une destination camping majeure avec 612 établissements classés. Cette offre est répartie sur 4 départements et 156 communes. La capacité d'accueil totale de la région atteint 85000 emplacements."

#### `generateRegionTypologie(region, campings)`
Génère un profil régional :
- Proportion par catégorie (aires naturelles / 1-2* / 3* / 4-5*)
- Caractérisation de la région

**Règles** :
- Si 4-5* >= 30% → "forte présence haut de gamme"
- Si aires naturelles >= 20% → "part significative aires naturelles"
- Si 3* >= 40% → "dominée par 3 étoiles"
- Sinon → "offre diversifiée"

**Exemple de sortie** :
> "La région Bretagne se caractérise par une forte présence de campings 4 et 5 étoiles (35% de l'offre). Répartition : 8% aires naturelles, 22% 1-2 étoiles, 35% 3 étoiles, 35% 4-5 étoiles."

## Intégration dans les pages

### Fiche camping
```tsx
// Génération au build
const presentation = generateCampingPresentation(camping)
const keyPoints = generateCampingKeyPoints(camping, campingsInCommune)

// Injection dans le HTML
<section>
  <h2>Présentation du camping</h2>
  <p>{presentation}</p>
</section>

<section>
  <h2>Pourquoi choisir ce camping</h2>
  <ul>
    {keyPoints.map((point, index) => (
      <li key={index}>{point}</li>
    ))}
  </ul>
</section>
```

### Page commune
```tsx
const offreText = generateCommuneOffre(commune, campings, totalInDepartement)
const typologieText = generateCommuneTypologie(campings)

<section>
  <h2>Le camping à {commune}</h2>
  <p>{offreText}</p>
</section>
```

### Page département
```tsx
const overviewText = generateDepartementOverview(departementName, campings, communes.length)
const typologieText = generateDepartementTypologie(campings)

<section>
  <h2>Le camping dans le département</h2>
  <p>{overviewText}</p>
</section>
```

### Page région
```tsx
const overviewText = generateRegionOverview(region, campings, departements.length, communesInRegion.size)
const typologieText = generateRegionTypologie(region, campings)

<section>
  <h2>Le camping dans la région</h2>
  <p>{overviewText}</p>
</section>
```

## Avantages SEO

### Contenu unique
- Chaque page a un contenu spécifique basé sur ses propres données
- Pas de risque de contenu dupliqué
- Textes différents pour chaque camping/commune/département/région

### Contenu factuel
- Basé sur des statistiques réelles
- Vérifiable par les moteurs de recherche
- Cohérent avec les données structurées de la page

### Densité sémantique
- Pages plus longues avec plus de texte
- Vocabulaire thématique riche (camping, classement, étoiles, emplacements, etc.)
- Améliore la compréhension du sujet par les moteurs

### HTML statique
- Contenu généré au build
- Visible dans le code source
- Indexable immédiatement par Google

## Garanties

✅ **Aucune invention** : Tous les textes sont générés à partir de règles logiques et de données réelles

✅ **Aucune API** : Tout est calculé localement au moment du build

✅ **Reproductible** : Même input = même output

✅ **Vérifiable** : Les affirmations peuvent être vérifiées dans les données

✅ **Pas de marketing** : Langage neutre et factuel

✅ **Pas de générique** : Chaque texte est adapté aux données spécifiques

## Exemples de règles appliquées

### Capacité d'un camping
```typescript
if (nombreEmplacements >= 200) {
  "camping de grande capacité"
} else if (nombreEmplacements >= 100) {
  "établissement"
} else if (nombreEmplacements >= 50) {
  "camping"
} else {
  "établissement familial"
}
```

### Importance d'une commune
```typescript
if (campingsCount === 1) {
  "dispose d'un camping classé"
} else if (campingsCount <= 3) {
  "compte X campings classés"
} else {
  "présente une offre de camping développée"
}
```

### Profil régional
```typescript
if (pctHautGamme >= 30) {
  "forte présence de campings 4 et 5 étoiles"
} else if (pctNature >= 20) {
  "part significative d'aires naturelles"
} else if (pctMilieuGamme >= 40) {
  "dominée par les établissements 3 étoiles"
} else {
  "offre diversifiée"
}
```

## Résultat

- **~8 000 pages** enrichies avec du contenu unique
- **0 invention**, 100% de données réelles
- **HTML statique** prêt pour l'indexation
- **SEO optimisé** avec densité sémantique accrue
