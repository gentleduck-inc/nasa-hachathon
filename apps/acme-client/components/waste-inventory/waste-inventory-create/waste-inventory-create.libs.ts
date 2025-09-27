import { toast } from 'sonner'
import { server_api } from '~/libs/axios'
import { WasteMaterialForm } from './waste-inventory-create'

export async function createWasteInventory(data: WasteMaterialForm) {
  toast.loading('Creating waste inventory...', { id: 'createWasteInventory' })
  const { data: res } = await server_api.post('/waste-inventory', data, {})
  return res
}

export async function updateWasteInventory(id: string, data: WasteMaterialForm) {
  toast.loading('Updating waste inventory...', { id: 'updateWasteInventory' })
  const { data: res } = await server_api.patch(`/waste-inventory/${id}`, data, {})
  return res
}

export async function deleteWasteInventory(id: string) {
  toast.loading('Deleting waste inventory...', { id: 'deleteWasteInventory' })
  const { data: res } = await server_api.delete(`/waste-inventory/${id}`, {})
  return res
}
