import { z } from 'zod'
import { ProcessingModulesMessagesType } from './processing_modules.types'

const errorMessage = <T extends ProcessingModulesMessagesType>(message: T) => ({ message })

export const moduleFiltersSchema = z.object({
  limit: z
    .number(errorMessage('ZOD_EXPECTED_NUMBER'))
    .min(1, errorMessage('ZOD_TOO_SHORT'))
    .max(100, errorMessage('ZOD_TOO_LONG'))
    .default(20),
  page: z.number(errorMessage('ZOD_EXPECTED_NUMBER')).min(1, errorMessage('ZOD_TOO_SHORT')).default(1),
  status: z.enum(['active', 'maintenance', 'broken', 'offline'], errorMessage('ZOD_EXPECTED_STRING')).optional(),
  type: z.string(errorMessage('ZOD_EXPECTED_STRING')).optional(),
})

export const createModuleSchema = z.object({
  capabilities: z.record(z.any(errorMessage('ZOD_TOO_LONG'))).optional(),
  efficiency_rating: z.number(errorMessage('ZOD_EXPECTED_NUMBER')).min(0).max(1).default(1),
  module_type: z.string(errorMessage('ZOD_EXPECTED_STRING')).min(1),
  name: z.string(errorMessage('ZOD_EXPECTED_STRING')).min(1, errorMessage('ZOD_TOO_SHORT')),
  power_consumption_kw: z.number(errorMessage('ZOD_EXPECTED_NUMBER')).min(0.01),
  throughput_kg_per_hour: z.number(errorMessage('ZOD_EXPECTED_NUMBER')).min(0.01),
})

export const updateModuleSchema = z.object({
  capabilities: z.record(z.any(errorMessage('ZOD_TOO_LONG'))).optional(),
  efficiency_rating: z
    .number(errorMessage('ZOD_EXPECTED_NUMBER'))
    .min(0, errorMessage('ZOD_TOO_SHORT'))
    .max(1, errorMessage('ZOD_TOO_LONG'))
    .optional(),
  power_consumption_kw: z
    .number(errorMessage('ZOD_EXPECTED_NUMBER'))
    .min(0.01, errorMessage('ZOD_TOO_SHORT'))
    .optional(),
  status: z.enum(['active', 'maintenance', 'broken', 'offline'], errorMessage('ZOD_EXPECTED_STRING')).optional(),
  throughput_kg_per_hour: z
    .number(errorMessage('ZOD_EXPECTED_NUMBER'))
    .min(0.01, errorMessage('ZOD_TOO_SHORT'))
    .optional(),
})

export const maintenanceSchema = z.object({
  description: z.string(errorMessage('ZOD_EXPECTED_STRING')).optional(),
  duration_hours: z.number(errorMessage('ZOD_EXPECTED_NUMBER')).optional(),
  maintenance_type: z.string(errorMessage('ZOD_EXPECTED_STRING')).min(1, errorMessage('ZOD_TOO_SHORT')),
  parts_replaced: z.array(z.string(errorMessage('ZOD_EXPECTED_STRING')), errorMessage('ZOD_TOO_LONG')).optional(),
  performed_by: z.string(errorMessage('ZOD_EXPECTED_STRING')).uuid(errorMessage('ZOD_INVALID_UUID')).optional(),
  scheduled_date: z
    .string(errorMessage('ZOD_EXPECTED_STRING'))
    .datetime(errorMessage('ZOD_EXPECTED_DATE_TIME'))
    .optional(),
})
