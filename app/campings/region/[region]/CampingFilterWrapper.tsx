'use client'

import { CampingSearch } from '@/components/campings/CampingSearch'
import type { Camping } from '@/lib/types'

interface CampingFilterWrapperProps {
  campings: Camping[]
  region: string
}

export default function CampingFilterWrapper({ campings, region }: CampingFilterWrapperProps) {
  return (
    <CampingSearch campings={campings} showAdvancedFilters={true} />
  )
}
