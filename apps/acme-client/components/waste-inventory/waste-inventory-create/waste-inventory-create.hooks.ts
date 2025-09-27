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
      toast.error('Error creating waste inventory', { id: 'createWasteInventory' })
    },
    onSuccess: (newItem) => {
      console.log(newItem)
      toast.success('Waste inventory created successfully', { id: 'createWasteInventory' })
      queryClient.setQueryData<WasteMaterialForm[]>(['waste-inventory'], (old) =>
        old ? [...old, newItem.data] : [newItem.data],
      )
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: WasteMaterialForm }) => updateWasteInventory(id, payload),
    onError: () => {
      toast.error('Error updating waste inventory', { id: 'updateWasteInventory' })
    },
    onSuccess: (updatedItem) => {
      toast.success('Waste inventory updated successfully', { id: 'updateWasteInventory' })
      queryClient.setQueryData<WasteMaterialForm[]>(['waste-inventory'], (old) =>
        // @ts-ignore Because we know the id will exist
        old ? old.map((item) => (item.id === updatedItem.data.id ? updatedItem.data : item)) : [updatedItem.data],
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteWasteInventory(id),
    onError: () => {
      toast.error('Error deleting waste inventory', { id: 'deleteWasteInventory' })
    },
    onSuccess: (deletedItem) => {
      toast.success('Waste inventory deleted successfully', { id: 'deleteWasteInventory' })
      queryClient.setQueryData<WasteMaterialForm[]>(['waste-inventory'], (old) =>
        // @ts-ignore Because we know the id will exist
        old ? old.filter((item) => item.id !== deletedItem.data.id) : [],
      )
    },
  })

  return { createMutation, deleteMutation, router, updateMutation }
}
