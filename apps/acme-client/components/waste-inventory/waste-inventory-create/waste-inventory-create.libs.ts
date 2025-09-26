import { toast } from 'sonner'
import { server_api } from '~/libs/axios'
import { WasteMaterialForm } from './waste-inventory-create'

export async function createWasteInventory(data: WasteMaterialForm) {
  toast.loading('Creating waste Inventory...', { id: 'createWasteInventory' })
  const { data: res } = await server_api.post('/waste_Inventory', data, {})
  return res
}

export async function updateWasteInventory(id: string, data: WasteMaterialForm) {
  toast.loading('Updating waste Inventory...', { id: 'updateWasteInventory' })
  const { data: res } = await server_api.patch(`/waste_Inventory/${id}`, data, {})
  return res
}

export async function deleteWasteInventory(id: string) {
  toast.loading('Deleting waste Inventory...', { id: 'deleteWasteInventory' })
  const { data: res } = await server_api.delete(`/waste_Inventory/${id}`, {})
  return res
}
