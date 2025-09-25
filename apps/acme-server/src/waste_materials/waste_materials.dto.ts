import { WASTE_ENUM } from '@acme/acme-db/constants'
import { z } from 'zod'
import { WasteMessagesType } from './waste_materials.types'

const errorMessage = <T extends WasteMessagesType>(message: T) => ({ message })

export const createWasteMaterialSchema = z.object({
  category: z.enum(WASTE_ENUM, { ...errorMessage('ZOD_EXPECTED_STRING') }),
  composition: z.record(z.any({ ...errorMessage('ZOD_EXPECTED_OBJECT') })).optional(),
  density_kg_per_m3: z.number({ ...errorMessage('ZOD_EXPECTED_NUMBER') }).optional(),
  description: z.string({ ...errorMessage('ZOD_EXPECTED_STRING') }).optional(),
  name: z.string({ ...errorMessage('ZOD_EXPECTED_STRING') }).max(100, { ...errorMessage('ZOD_TOO_LONG') }),
  properties: z.record(z.any({ ...errorMessage('ZOD_EXPECTED_OBJECT') })).optional(),
})

export const updateWasteMaterialSchema = createWasteMaterialSchema.partial()
