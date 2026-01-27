import fs from 'fs'
import path from 'path'

export interface TrustBadge {
  label: string
  description: string
}

export interface TenteBrand {
  name: string
  category: string
  positioning: string
  promise: string
  affiliate: {
    program: string
    default_url: string
    tracking_param: string
  }
  trust_badges: TrustBadge[]
  logistics: {
    warehouse_location: string
    delivery_delay_days: string
    remote_areas_delay_days: string
  }
  support: {
    email: string
    resources: string[]
  }
}

export interface TenteModel {
  model: string
  sku: string
  type: string
  opening_system: string
  positioning: string
  affiliate: {
    url: string
    cta_label: string
  }
  pricing: {
    current_eur: number
    original_eur: number
    promotion_label: string
    delivery: string
  }
  availability: {
    in_stock: boolean
    units_available: number
    shipping_delay_days: string
  }
  capacity: {
    min_persons: number
    max_persons: number
  }
  dimensions: {
    open_cm: { length: number; width: number; height: number }
    closed_cm: { length: number; width: number; height: number }
    package_cm: { length: number; width: number; height: number }
  }
  weight: {
    net_kg: number
    gross_kg: number
  }
  materials: {
    shell: string
    base: string
    fabric: string
    mosquito_net: string
    mattress: string
  }
  comfort: {
    mattress_thickness_cm: number
    mattress_width_cm: number
    storage: string[]
    lighting: string
    ventilation: string
  }
  installation: {
    vehicle_compatibility: string[]
    excluded_vehicles?: string[]
    installation_time_minutes: number
    persons_required_first_install: number
    daily_use_persons: number
    ladder: {
      material: string
      length_m: number
      max_load_kg?: number
    }
  }
  opening_system_details: {
    type: string
    origin: string
    opening_time_seconds: number
  }
  weather_resistance: {
    waterproof_rating: string
    uv_protection: string
    four_seasons: boolean
    rain_canopy: boolean
    wind_resistant: boolean
  }
  security: {
    fixation_system: string
    road_stability: string
  }
  included_accessories: string[]
  media: {
    images: {
      general: string[]
      interior: string[]
    }
    video: {
      youtube_id: string
      url: string
    }
  }
}

export interface TentesData {
  brand: TenteBrand
  models: TenteModel[]
}

let cachedData: TentesData | null = null

export function loadTentesData(): TentesData {
  if (cachedData) {
    return cachedData
  }

  const filePath = path.join(process.cwd(), 'tentedetoit.json')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  cachedData = JSON.parse(fileContent) as TentesData

  return cachedData
}

export function getModelByName(modelName: string): TenteModel | undefined {
  const data = loadTentesData()
  return data.models.find(m => m.model.toLowerCase() === modelName.toLowerCase())
}

export function getAllModels(): TenteModel[] {
  const data = loadTentesData()
  return data.models
}

export function getBrand(): TenteBrand {
  const data = loadTentesData()
  return data.brand
}

// Fonction utilitaire pour formater le prix
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

// Fonction pour calculer la réduction en pourcentage
export function getDiscountPercentage(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100)
}
