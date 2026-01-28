'use client'

import { CampingSearch } from '@/components/campings/CampingSearch'
import type { Camping } from '@/lib/types'

interface CampingFilterWrapperProps {
  campings: Camping[]
  commune: string
}

export default function CampingFilterWrapper({ campings, commune }: CampingFilterWrapperProps) {
  return (
    <CampingSearch campings={campings} showAdvancedFilters={true} />
  )
}
