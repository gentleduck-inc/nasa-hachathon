'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { WasteMaterialForm } from './waste-materials-create'
import { createWasteMaterials, deleteWasteMaterials, updateWasteMaterials } from './waste-materials-create.libs'

export function useWasteMaterialsMutations() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const createMutation = useMutation({
    mutationFn: (payload: WasteMaterialForm) => createWasteMaterials(payload),
    onError: () => {
      toast.error('Error creating waste materials', { id: 'createWasteMaterials' })
    },
    onSuccess: (newItem) => {
      console.log(newItem)
      toast.success('Waste materials created successfully', { id: 'createWasteMaterials' })
      queryClient.setQueryData<WasteMaterialForm[]>(['waste-materials'], (old) =>
        old ? [...old, newItem.data] : [newItem.data],
      )
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: WasteMaterialForm }) => updateWasteMaterials(id, payload),
    onError: () => {
      toast.error('Error updating waste materials', { id: 'updateWasteMaterials' })
    },
    onSuccess: (updatedItem) => {
      toast.success('Waste materials updated successfully', { id: 'updateWasteMaterials' })
      queryClient.setQueryData<WasteMaterialForm[]>(['waste-materials'], (old) =>
        // @ts-ignore Because we know the id will exist
        old ? old.map((item) => (item.id === updatedItem.data.id ? updatedItem.data : item)) : [updatedItem.data],
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteWasteMaterials(id),
    onError: () => {
      toast.error('Error deleting waste materials', { id: 'deleteWasteMaterials' })
    },
    onSuccess: (deletedItem) => {
      toast.success('Waste materials deleted successfully', { id: 'deleteWasteMaterials' })
      queryClient.setQueryData<WasteMaterialForm[]>(['waste-materials'], (old) =>
        // @ts-ignore Because we know the id will exist
        old ? old.filter((item) => item.id !== deletedItem.data.id) : [],
      )
    },
  })

  return { createMutation, deleteMutation, router, updateMutation }
}
