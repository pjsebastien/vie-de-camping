'use client'

import { CampingSearch } from '@/components/campings/CampingSearch'
import type { Camping } from '@/lib/types'

interface CampingFilterWrapperProps {
  campings: Camping[]
  departement: string
}

export default function CampingFilterWrapper({ campings, departement }: CampingFilterWrapperProps) {
  return (
    <CampingSearch campings={campings} showAdvancedFilters={true} />
  )
}
