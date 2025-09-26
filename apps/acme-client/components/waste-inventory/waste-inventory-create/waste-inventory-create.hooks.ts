'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { WasteMaterialForm } from './waste-inventory-create'
import { createWasteInventory, deleteWasteInventory, updateWasteInventory } from './waste-inventory-create.libs'

export function useWasteInventoryMutations() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const createMutation = useMutation({
    mutationFn: (payload: WasteMaterialForm) => createWasteInventory(payload),
    onError: () => {
      toast.error('Error creating waste Inventory', { id: 'createWasteInventory' })
    },
    onSuccess: (newItem) => {
      console.log(newItem)
      toast.success('Waste Inventory created successfully', { id: 'createWasteInventory' })
      queryClient.setQueryData<WasteMaterialForm[]>(['waste-Inventory'], (old) =>
        old ? [...old, newItem.data] : [newItem.data],
      )
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: WasteMaterialForm }) => updateWasteInventory(id, payload),
    onError: () => {
      toast.error('Error updating waste Inventory', { id: 'updateWasteInventory' })
    },
    onSuccess: (updatedItem) => {
      toast.success('Waste Inventory updated successfully', { id: 'updateWasteInventory' })
      queryClient.setQueryData<WasteMaterialForm[]>(['waste-Inventory'], (old) =>
        // @ts-ignore Because we know the id will exist
        old ? old.map((item) => (item.id === updatedItem.data.id ? updatedItem.data : item)) : [updatedItem.data],
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteWasteInventory(id),
    onError: () => {
      toast.error('Error deleting waste Inventory', { id: 'deleteWasteInventory' })
    },
    onSuccess: (deletedItem) => {
      toast.success('Waste Inventory deleted successfully', { id: 'deleteWasteInventory' })
      queryClient.setQueryData<WasteMaterialForm[]>(['waste-Inventory'], (old) =>
        // @ts-ignore Because we know the id will exist
        old ? old.filter((item) => item.id !== deletedItem.data.id) : [],
      )
    },
  })

  return { createMutation, deleteMutation, router, updateMutation }
}
