'use client'

import { WasteMaterial } from '@acme/acme-db/types'
import { Button } from '@acme/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@acme/ui/sheet'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { server_api } from '~/libs/axios'
import { WasteInventoryTable } from './waste-inventory.chunks'
import { WasteInventoryCreate } from './waste-inventory-create'

export function WasteInventory() {
  const { data, isLoading } = useQuery<WasteMaterial[]>({
    queryFn: async () => {
      const { data: res } = await server_api.get('/waste_Inventory')
      return res.data
    },
    queryKey: ['waste-Inventory'],
  })

  return (
    <div className="flex-1 p-4 xl:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-semibold text-2xl">Waste Inventory</h1>
          <p className="text-base text-muted-foreground">
            Keep an updated list of waste Inventory to streamline recycling and disposal.
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

export function WasteInventoryEditButton({ id }: { id: string }) {
  return (
    <WasteInventoryCreate
      defaultValues={{
        category: 'plastics',
        composition: {},
        density_kg_per_m3: 1,
        description: 'This is a description for the waste material.',
        name: 'Plastic',
        properties: {},
      }}
      id={id}>
      <Button className="h-auto w-full justify-start p-0 text-start" variant="nothing">
        Edit
      </Button>
    </WasteInventoryCreate>
  )
}
