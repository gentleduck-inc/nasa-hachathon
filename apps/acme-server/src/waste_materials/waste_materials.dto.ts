import { z } from 'zod'

// Enums must match your `wasteTypeEnum`
export const createWasteMaterialSchema = z.object({
  category: z.string(),
  composition: z.record(z.any()).optional(),
  created_by: z.string().uuid(),
  density_kg_per_m3: z.number().optional(),
  description: z.string().optional(),
  is_public: z.boolean().optional(),
  name: z.string().max(100),
  processing_difficulty: z.number().min(1).max(5).optional(),
  properties: z.record(z.any()).optional(),
  recyclability_score: z.number().min(0).max(1).optional(),
})

export type CreateWasteMaterialDto = z.infer<typeof createWasteMaterialSchema>

export const updateWasteMaterialSchema = createWasteMaterialSchema.partial().extend({
  id: z.string().uuid(),
})

export type UpdateWasteMaterialDto = z.infer<typeof updateWasteMaterialSchema>
