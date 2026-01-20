/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export' removed - incompatible with dynamic routes (sitemap, robots, redirects)
  // Vercel handles SSG automatically
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // ========================================
  // REDIRECTIONS 301 - VIE DE CAMPING
  // Migration ancien blog → nouveau site data-driven
  // Date: 19 janvier 2026
  // ========================================

  async redirects() {
    return [

      // ========================================
      // CATÉGORIE 1: PAGES GÉOGRAPHIQUES
      // ========================================

      // --- Communes/Villes ---
      {
        source: '/camping-a-arcachon-conseils-avis-la-selection-des-meilleurs',
        destination: '/campings/commune/arcachon/',
        permanent: true,
      },
      {
        source: '/camping-a-arcachon-conseils-avis-la-selection-des-meilleurs/',
        destination: '/campings/commune/arcachon/',
        permanent: true,
      },
      {
        source: '/camping-a-argeles-sur-mer-bons-plans-avis-on-vous-dit-tout',
        destination: '/campings/commune/argeles-sur-mer/',
        permanent: true,
      },
      {
        source: '/camping-a-argeles-sur-mer-bons-plans-avis-on-vous-dit-tout/',
        destination: '/campings/commune/argeles-sur-mer/',
        permanent: true,
      },
      {
        source: '/camping-ramatuelle',
        destination: '/campings/commune/ramatuelle/',
        permanent: true,
      },
      {
        source: '/camping-ramatuelle/',
        destination: '/campings/commune/ramatuelle/',
        permanent: true,
      },
      {
        source: '/noirmoutier-vacances-camping',
        destination: '/campings/commune/noirmoutier-en-l-ile/',
        permanent: true,
      },
      {
        source: '/noirmoutier-vacances-camping/',
        destination: '/campings/commune/noirmoutier-en-l-ile/',
        permanent: true,
      },

      // --- Départements (Îles) ---
      {
        source: '/camping-ile-de-re',
        destination: '/campings/departement/17/',
        permanent: true,
      },
      {
        source: '/camping-ile-de-re/',
        destination: '/campings/departement/17/',
        permanent: true,
      },
      {
        source: '/camping-oleron',
        destination: '/campings/departement/17/',
        permanent: true,
      },
      {
        source: '/camping-oleron/',
        destination: '/campings/departement/17/',
        permanent: true,
      },
      {
        source: '/camping-en-ardeche-bons-plans-les-meilleurs-on-vous-dit-tout',
        destination: '/campings/departement/07/',
        permanent: true,
      },
      {
        source: '/camping-en-ardeche-bons-plans-les-meilleurs-on-vous-dit-tout/',
        destination: '/campings/departement/07/',
        permanent: true,
      },
      {
        source: '/camping-vende',
        destination: '/campings/departement/85/',
        permanent: true,
      },
      {
        source: '/camping-vende/',
        destination: '/campings/departement/85/',
        permanent: true,
      },

      // --- Régions ---
      {
        source: '/camping-en-bretagne-conseils-avis-les-meilleurs-on-vous-dit-tout',
        destination: '/campings/region/bretagne/',
        permanent: true,
      },
      {
        source: '/camping-en-bretagne-conseils-avis-les-meilleurs-on-vous-dit-tout/',
        destination: '/campings/region/bretagne/',
        permanent: true,
      },
      {
        source: '/camping-en-corse-conseils-avis-les-meilleurs-on-vous-dit-tout',
        destination: '/campings/region/corse/',
        permanent: true,
      },
      {
        source: '/camping-en-corse-conseils-avis-les-meilleurs-on-vous-dit-tout/',
        destination: '/campings/region/corse/',
        permanent: true,
      },

      // --- International (hors scope) → Homepage ---
      {
        source: '/camping-en-espagne',
        destination: '/',
        permanent: true,
      },
      {
        source: '/camping-en-espagne/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/camping-portugal-nos-conseils-pour-bien-profiter-de-votre-sejour',
        destination: '/',
        permanent: true,
      },
      {
        source: '/camping-portugal-nos-conseils-pour-bien-profiter-de-votre-sejour/',
        destination: '/',
        permanent: true,
      },

      // ========================================
      // CATÉGORIE 2: PAGES THÉMATIQUES CAMPING
      // ========================================

      // Note: Les destinations ci-dessous pointent vers des pages thématiques
      // qui doivent être créées: /campings/themes/[theme]/
      // Si ces pages n'existent pas encore, rediriger temporairement vers /campings/

      {
        source: '/meilleurs-campings-naturistes',
        destination: '/campings/themes/naturiste/',
        permanent: true,
      },
      {
        source: '/meilleurs-campings-naturistes/',
        destination: '/campings/themes/naturiste/',
        permanent: true,
      },
      {
        source: '/pourquoi-le-camping-5-etoiles-est-si-populaire',
        destination: '/campings/themes/5-etoiles/',
        permanent: true,
      },
      {
        source: '/pourquoi-le-camping-5-etoiles-est-si-populaire/',
        destination: '/campings/themes/5-etoiles/',
        permanent: true,
      },
      {
        source: '/pourquoi-choisir-un-camping-ecolo',
        destination: '/campings/themes/ecologique/',
        permanent: true,
      },
      {
        source: '/pourquoi-choisir-un-camping-ecolo/',
        destination: '/campings/themes/ecologique/',
        permanent: true,
      },
      {
        source: '/avantage-mobil-home-camping',
        destination: '/campings/themes/mobil-home/',
        permanent: true,
      },
      {
        source: '/avantage-mobil-home-camping/',
        destination: '/campings/themes/mobil-home/',
        permanent: true,
      },
      {
        source: '/camping-cabane-dans-les-arbres',
        destination: '/campings/themes/hebergements-insolites/',
        permanent: true,
      },
      {
        source: '/camping-cabane-dans-les-arbres/',
        destination: '/campings/themes/hebergements-insolites/',
        permanent: true,
      },
      {
        source: '/camping-chez-lhabitant',
        destination: '/campings/themes/hebergements-insolites/',
        permanent: true,
      },
      {
        source: '/camping-chez-lhabitant/',
        destination: '/campings/themes/hebergements-insolites/',
        permanent: true,
      },
      {
        source: '/camping-dans-une-yourte-le-meilleur-des-deux-mondes',
        destination: '/campings/themes/hebergements-insolites/',
        permanent: true,
      },
      {
        source: '/camping-dans-une-yourte-le-meilleur-des-deux-mondes/',
        destination: '/campings/themes/hebergements-insolites/',
        permanent: true,
      },
      {
        source: '/dormir-dans-une-bulle',
        destination: '/campings/themes/hebergements-insolites/',
        permanent: true,
      },
      {
        source: '/dormir-dans-une-bulle/',
        destination: '/campings/themes/hebergements-insolites/',
        permanent: true,
      },

      // --- Contenu éditorial générique → Homepage ---
      {
        source: '/le-camping-cest-la-vie',
        destination: '/',
        permanent: true,
      },
      {
        source: '/le-camping-cest-la-vie/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/le-camping-en-france',
        destination: '/',
        permanent: true,
      },
      {
        source: '/le-camping-en-france/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/camping-les-vacances-les-plus-economiques',
        destination: '/',
        permanent: true,
      },
      {
        source: '/camping-les-vacances-les-plus-economiques/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/camping-la-dive-avis',
        destination: '/campings/',
        permanent: true,
      },
      {
        source: '/camping-la-dive-avis/',
        destination: '/campings/',
        permanent: true,
      },

      // ========================================
      // CATÉGORIE 3: MATÉRIEL ET ÉQUIPEMENT
      // ========================================

      // Note: Ces redirections pointent vers /materiel-camping/
      // Cette page doit être créée. Voir documentation pour le contenu.

      // --- Tentes de toit (23 URLs) ---
      {
        source: '/barres-toit-necessaires-pour-tente-toit',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/barres-toit-necessaires-pour-tente-toit/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/chauffage-tente-toit-astuces',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/chauffage-tente-toit-astuces/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/fabriquer-tente-toit-diy',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/fabriquer-tente-toit-diy/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/facteurs-choix-vehicule-tente-toit',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/facteurs-choix-vehicule-tente-toit/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/install-tente-toit-quelques-etapes-faciles',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/install-tente-toit-quelques-etapes-faciles/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/meilleures-tentes-de-toit',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/meilleures-tentes-de-toit/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/spots-reve-campeurs-tente-toit',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/spots-reve-campeurs-tente-toit/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tente-de-toit-rigide',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tente-de-toit-rigide/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tente-mini',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tente-mini/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tente-toit-4x4-xc60-volvo',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tente-toit-4x4-xc60-volvo/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tente-toit-gonflable-secrets-reveles',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tente-toit-gonflable-secrets-reveles/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tente-toit-skoda-camping',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tente-toit-skoda-camping/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tente-toit-skoda',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tente-toit-skoda/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tente-toit-voiture-4x4-2',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tente-toit-voiture-4x4-2/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-citroen-picasso',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-citroen-picasso/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-haut-gamme-transforment-aventures-plein-air',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-haut-gamme-transforment-aventures-plein-air/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-impermeables',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-impermeables/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-kangoo',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-kangoo/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-legeres',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-legeres/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-nissan-patrol',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-nissan-patrol/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-opel',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-opel/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-toyota',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/tentes-toit-toyota/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/toits-relevables-vs-tentes-de-toit-confort-camping',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/toits-relevables-vs-tentes-de-toit-confort-camping/',
        destination: '/materiel-camping/',
        permanent: true,
      },

      // --- Autre matériel ---
      {
        source: '/table-camping',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/table-camping/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/comment-entretenir-et-stocker-votre-table-de-camping-pour-garantir-sa-longevite',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/comment-entretenir-et-stocker-votre-table-de-camping-pour-garantir-sa-longevite/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/preparez-votre-prochain-camping-les-meilleurs-materiaux-et-accessoires-a-emporter',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/preparez-votre-prochain-camping-les-meilleurs-materiaux-et-accessoires-a-emporter/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/les-5-barres-de-toit-incontournables-pour-equiper-votre-voiture-avec-style',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/les-5-barres-de-toit-incontournables-pour-equiper-votre-voiture-avec-style/',
        destination: '/materiel-camping/',
        permanent: true,
      },

      // --- Véhicules ---
      {
        source: '/les-5-meilleures-voitures-pour-partir-en-camping-en-2024',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/les-5-meilleures-voitures-pour-partir-en-camping-en-2024/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/van-amenage-ou-camping-car-lequel-choisir-pour-vos-aventures-nomades',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/van-amenage-ou-camping-car-lequel-choisir-pour-vos-aventures-nomades/',
        destination: '/materiel-camping/',
        permanent: true,
      },

      // ========================================
      // CATÉGORIE 4: PAGES STRUCTURELLES
      // ========================================

      {
        source: '/about',
        destination: '/a-propos/',
        permanent: true,
      },
      {
        source: '/about/',
        destination: '/a-propos/',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/campings/',
        permanent: true,
      },
      {
        source: '/blog/',
        destination: '/campings/',
        permanent: true,
      },
      {
        source: '/destination',
        destination: '/campings/regions/',
        permanent: true,
      },
      {
        source: '/destination/',
        destination: '/campings/regions/',
        permanent: true,
      },
      {
        source: '/type-de-camping',
        destination: '/campings/',
        permanent: true,
      },
      {
        source: '/type-de-camping/',
        destination: '/campings/',
        permanent: true,
      },

      // --- Catégories (Archives) ---
      {
        source: '/category/destination',
        destination: '/campings/regions/',
        permanent: true,
      },
      {
        source: '/category/destination/',
        destination: '/campings/regions/',
        permanent: true,
      },
      {
        source: '/category/materiel-de-camping',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/category/materiel-de-camping/',
        destination: '/materiel-camping/',
        permanent: true,
      },
      {
        source: '/category/type-de-camping',
        destination: '/campings/',
        permanent: true,
      },
      {
        source: '/category/type-de-camping/',
        destination: '/campings/',
        permanent: true,
      },
      {
        source: '/category/vie-de-camping',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/vie-de-camping/',
        destination: '/',
        permanent: true,
      },

      // ========================================
      // CATÉGORIE 5: HORS SUJET
      // ========================================

      {
        source: '/les-avantages-de-plonger-en-binome-securite-partage-et-progression',
        destination: '/',
        permanent: true,
      },
      {
        source: '/les-avantages-de-plonger-en-binome-securite-partage-et-progression/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/les-meilleurs-itineraires-de-velo-en-milieu-urbain',
        destination: '/',
        permanent: true,
      },
      {
        source: '/les-meilleurs-itineraires-de-velo-en-milieu-urbain/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/voyage-sur-mesure-ou-camper-et-vivre-des-experiences-authentiques',
        destination: '/',
        permanent: true,
      },
      {
        source: '/voyage-sur-mesure-ou-camper-et-vivre-des-experiences-authentiques/',
        destination: '/',
        permanent: true,
      },

    ]
  },
}

module.exports = nextConfig
