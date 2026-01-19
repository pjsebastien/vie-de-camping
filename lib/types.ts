export interface Camping {
  slug: string;
  nom: string;
  commune: string;
  codePostal: string;
  departement: string;
  adresse: string;
  classement: string;
  categorie: string | null;
  capacite: number | null;
  nombreEmplacements: number | null;
  siteWeb: string | null;
  dateClassement: string;

  // Données CSV supplémentaires
  typeSejour?: string | null;
  classementProroge?: boolean;

  // Données démographiques (INSEE)
  populationCommune?: number;
  populationDepartement?: number;
  populationRegion?: number;
  nombreCommunesDepartement?: number;

  // Coordonnées géographiques
  latitude?: number;
  longitude?: number;

  // Environnement et proximité
  environnement?: string[];
  proximiteMer?: boolean;
  proximiteLac?: boolean;
  proximiteRiviere?: boolean;
  proximiteForet?: boolean;
  proximiteMontagne?: boolean;

  // Équipements et services
  piscine?: boolean;
  restaurant?: boolean;
  bar?: boolean;
  epicerie?: boolean;
  wifi?: boolean;
  laverie?: boolean;
  aireDeJeux?: boolean;
  locationVelos?: boolean;

  // Types hébergement disponibles
  emplacementsTentes?: boolean;
  emplacementsCaravanes?: boolean;
  emplacementsCampingCars?: boolean;
  chalets?: boolean;
  mobilHomes?: boolean;
  bungalows?: boolean;

  // Accessibilité et pratique
  animauxAcceptes?: boolean;
  accessiblePMR?: boolean;
  ouvertureAnnuelle?: boolean;

  // Contact
  telephone?: string | null;
  email?: string | null;
  description?: string | null;
}
