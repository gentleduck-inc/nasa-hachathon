import { z } from 'zod'
import { ProcessingRunsMessagesType } from './processing_runs.types'

const errorMessage = <T extends ProcessingRunsMessagesType>(message: T) => ({ message })

export const createRunSchema = z.object({
  estimated_outputs: z.record(z.number({ ...errorMessage('ZOD_EXPECTED_NUMBER') })).optional(),
  input_quantities: z
    .record(z.number({ ...errorMessage('ZOD_EXPECTED_NUMBER') }))
    .refine((o) => Object.keys(o || {}).length > 0, errorMessage('ZOD_TOO_SHORT')),
  module_id: z
    .string({ ...errorMessage('ZOD_EXPECTED_STRING') })
    .uuid(errorMessage('ZOD_INVALID_UUID'))
    .optional(),
  name: z.string({ ...errorMessage('ZOD_EXPECTED_STRING') }).min(1, errorMessage('ZOD_TOO_SHORT')),
  recipe_id: z.string({ ...errorMessage('ZOD_EXPECTED_STRING') }).uuid(errorMessage('ZOD_INVALID_UUID')),
})

export const runFiltersSchema = z.object({
  date_from: z
    .string({ ...errorMessage('ZOD_EXPECTED_STRING') })
    .datetime({ ...errorMessage('ZOD_EXPECTED_DATE_TIME') })
    .optional(),
  date_to: z
    .string({ ...errorMessage('ZOD_EXPECTED_STRING') })
    .datetime({ ...errorMessage('ZOD_EXPECTED_DATE_TIME') })
    .optional(),
  limit: z
    .number({ ...errorMessage('ZOD_EXPECTED_NUMBER') })
    .min(1, { ...errorMessage('ZOD_TOO_SHORT') })
    .max(100, { ...errorMessage('ZOD_TOO_LONG') })
    .default(20),
  module_id: z
    .string({ ...errorMessage('ZOD_EXPECTED_STRING') })
    .uuid({ ...errorMessage('ZOD_INVALID_UUID') })
    .optional(),
  page: z
    .number({ ...errorMessage('ZOD_EXPECTED_NUMBER') })
    .min(1, { ...errorMessage('ZOD_TOO_SHORT') })
    .default(1),
  recipe_id: z
    .string({ ...errorMessage('ZOD_EXPECTED_STRING') })
    .uuid({ ...errorMessage('ZOD_INVALID_UUID') })
    .optional(),
  status: z.enum(['queued', 'running', 'paused', 'completed', 'failed']).optional(),
})
