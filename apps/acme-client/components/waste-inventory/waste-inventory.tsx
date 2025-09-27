'use client'

import type { WasteInventory } from '@acme/acme-db/types'
import { Button } from '@acme/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@acme/ui/sheet'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { server_api } from '~/libs/axios'
import { WasteInventoryTable } from './waste-inventory.chunks'
import { WasteInventoryCreate } from './waste-inventory-create'

export function WasteInventory() {
  const { data, isLoading } = useQuery<WasteInventory[]>({
    queryFn: async () => {
      const { data: res } = await server_api.get('/waste-inventory')
      return res.data
    },
    queryKey: ['waste-inventory'],
  })

  return (
    <div className="flex-1 p-4 xl:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-semibold text-2xl">Waste Inventory</h1>
          <p className="text-base text-muted-foreground">
            Keep an updated list of waste inventory to streamline recycling and disposal.
          </p>
        </div>
        <WasteInventoryCreateButton />
      </div>

      <WasteInventoryTable data={data ?? []} isLoading={isLoading} />
    </div>
  )
}

export function WasteInventoryCreateButton() {
  return (
    <WasteInventoryCreate id="">
      <Button variant="outline">Add Material</Button>
    </WasteInventoryCreate>
  )
}

export function WasteInventoryEditButton({ data }: { data: WasteInventory }) {
  // Map database waste types to form waste types
  const mapWasteType = (dbType: string) => {
    const mapping: Record<string, string> = {
      clothing_fabric: 'textiles',
      electronic_waste: 'other',
      foam_insulation: 'foam',
      food_packaging: 'food_packaging',
      metal_components: 'metals',
      organic_waste: 'other',
      paper_cardboard: 'other',
      plastic_containers: 'plastics',
    }
    return mapping[dbType] || 'other'
  }

  // Transform the data to match the form schema
  const defaultValues = {
    contamination_level: data.contamination_level || 0,
    date_collected: new Date(data.date_collected).toISOString().slice(0, 16), // Convert to datetime-local format
    expiry_date: data.expiry_date ? new Date(data.expiry_date).toISOString().slice(0, 16) : undefined,
    location: data.location,
    properties: data.properties || {},
    quality_grade: (data.quality_grade as 'pristine' | 'standard' | 'degraded') || 'standard',
    quantity_kg: data.quantity_kg,
    waste_type: mapWasteType(data.waste_type) as any,
  }

  return (
    <WasteInventoryCreate defaultValues={defaultValues} id={data.id}>
      <Button className="h-auto w-full justify-start p-0 text-start" variant="nothing">
        Edit
      </Button>
    </WasteInventoryCreate>
  )
}
