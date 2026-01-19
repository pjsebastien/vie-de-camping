# Vie de Camping

Site Next.js 14 répertoriant les campings classés en France.

## Technologies

- Next.js 14 (App Router)
- TypeScript
- Génération statique (SSG)
- CSS vanilla

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le site sera accessible sur http://localhost:3000

## Build de production

```bash
npm run build
```

Le build génère un site statique dans le dossier `out/`.

## Structure du projet

```
├── app/                      # Pages Next.js (App Router)
│   ├── layout.tsx           # Layout global
│   ├── page.tsx             # Page d'accueil
│   ├── campings/
│   │   ├── page.tsx         # Liste des campings
│   │   └── [slug]/
│   │       └── page.tsx     # Page détail camping
│   └── a-propos/
│       └── page.tsx         # Page à propos
├── data/
│   └── hebergements_classes.csv  # Données source (Atout France)
├── lib/
│   ├── types.ts             # Types TypeScript
│   └── loadCampings.ts      # Chargement et parsing CSV
└── public/                  # Fichiers statiques
```

## Données

Les données proviennent du classement officiel Atout France.
Le fichier CSV contient 5704 campings classés en France.

## Fonctionnalités

- Liste complète des campings français
- Page détaillée pour chaque camping
- Génération automatique de slugs SEO
- Métadonnées optimisées pour le référencement
- Site 100% statique (pas de JavaScript côté client)
- HTML visible dans le code source

## SEO

- Chaque camping a une URL unique : `/campings/[slug]/`
- Meta title et description personnalisés
- HTML sémantique (section, article, header, nav)
- Génération statique pour performances optimales
