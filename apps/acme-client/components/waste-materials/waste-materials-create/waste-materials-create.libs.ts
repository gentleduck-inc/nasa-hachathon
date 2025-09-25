import { toast } from 'sonner'
import { server_api } from '~/libs/axios'
import { WasteMaterialForm } from './waste-materials-create'

export async function createWasteMaterials(data: WasteMaterialForm) {
  toast.loading('Creating waste materials...', { id: 'createWasteMaterials' })
  const { data: res } = await server_api.post('/waste_materials', data, {})
  return res
}

export async function updateWasteMaterials(id: string, data: WasteMaterialForm) {
  toast.loading('Updating waste materials...', { id: 'updateWasteMaterials' })
  const { data: res } = await server_api.patch(`/waste_materials/${id}`, data, {})
  return res
}

export async function deleteWasteMaterials(id: string) {
  toast.loading('Deleting waste materials...', { id: 'deleteWasteMaterials' })
  const { data: res } = await server_api.delete(`/waste_materials/${id}`, {})
  return res
}
