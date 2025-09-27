import { WASTE_ENUM } from '@acme/acme-db/constants'
import { z } from 'zod'
import { WasteMessagesType } from './waste_inventory.types'

const errorMessage = <T extends WasteMessagesType>(message: T) => ({ message })

export const createWasteInventorySchema = z.object({
  contamination_level: z
    .number({ ...errorMessage('ZOD_EXPECTED_NUMBER') })
    .min(0)
    .max(1)
    .optional(),
  date_collected: z.string().datetime({ ...errorMessage('ZOD_EXPECTED_DATE_TIME') }),
  expiry_date: z
    .string()
    .datetime({ ...errorMessage('ZOD_EXPECTED_DATE_TIME') })
    .optional(),
  location: z.string({ ...errorMessage('ZOD_EXPECTED_STRING') }).max(100, { ...errorMessage('ZOD_TOO_LONG') }),
  properties: z.record(z.any({ ...errorMessage('ZOD_EXPECTED_OBJECT') })).optional(),
  quality_grade: z.enum(['pristine', 'standard', 'degraded'], { ...errorMessage('ZOD_EXPECTED_STRING') }).optional(),
  quantity_kg: z.string({ ...errorMessage('ZOD_EXPECTED_STRING') }),
  waste_type: z.enum(WASTE_ENUM, { ...errorMessage('ZOD_EXPECTED_STRING') }),
})

export const updateWasteInventorySchema = createWasteInventorySchema.partial()
