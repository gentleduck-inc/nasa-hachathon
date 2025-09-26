import { z } from 'zod'

// Use a permissive error message helper to avoid overly narrow literal unions from constants
const errorMessage = (message: string) => ({ message })

const PRODUCT_TYPES = [
  'insulation_panel',
  'storage_container',
  'spare_part',
  'tool',
  'structural_beam',
  'protective_sheet',
  'filter_component',
  'building_brick',
] as const

const WASTE_TYPES = [
  'food_packaging',
  'clothing_fabric',
  'metal_components',
  'foam_insulation',
  'plastic_containers',
  'electronic_waste',
  'organic_waste',
  'paper_cardboard',
] as const

export const createRecipeSchema = z.object({
  description: z.string({ ...errorMessage('ZOD_EXPECTED_STRING') }).optional(),
  energy_required_kwh: z
    .number({ ...errorMessage('ZOD_EXPECTED_NUMBER') })
    .min(0.1, { ...errorMessage('ZOD_TOO_SHORT') })
    .max(1000, { ...errorMessage('ZOD_TOO_LONG') }),
  input_materials: z
    .record(z.enum(WASTE_TYPES), z.number().min(0.1).max(1000))
    .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one input material required' }),
  name: z
    .string({ ...errorMessage('ZOD_EXPECTED_STRING') })
    .min(1, { ...errorMessage('ZOD_TOO_SHORT') })
    .max(200, { ...errorMessage('ZOD_TOO_LONG') }),
  output_products: z
    .record(z.enum(PRODUCT_TYPES), z.number().min(0.1).max(1000))
    .refine((obj) => Object.keys(obj).length > 0, { message: 'At least one output product required' }),
  process_steps: z
    .array(
      z.object({
        description: z.string(),
        duration_minutes: z.number().min(1),
        module_type: z.string(),
        parameters: z.record(z.any()).optional(),
        step_number: z.number(),
      }),
    )
    .min(1),
  processing_time_minutes: z
    .number({ ...errorMessage('ZOD_EXPECTED_NUMBER') })
    .min(1, { ...errorMessage('ZOD_TOO_SHORT') })
    .max(1440, { ...errorMessage('ZOD_TOO_LONG') }),
  quality_score: z
    .number({ ...errorMessage('ZOD_EXPECTED_NUMBER') })
    .min(0.1, { ...errorMessage('ZOD_TOO_SHORT') })
    .max(1.0, { ...errorMessage('ZOD_TOO_LONG') })
    .default(1.0),
  required_modules: z.array(z.string()).min(1, { message: 'At least one module required' }),
  yield_percentage: z
    .number({ ...errorMessage('ZOD_EXPECTED_NUMBER') })
    .min(0.1, { ...errorMessage('ZOD_TOO_SHORT') })
    .max(1.0, { ...errorMessage('ZOD_TOO_LONG') })
    .default(0.85),
})

export const updateRecipeSchema = createRecipeSchema.partial()

export const recipeFiltersSchema = z.object({
  created_by: z.string().uuid().optional(),
  input_waste_type: z.enum(WASTE_TYPES).optional(),
  is_active: z.boolean().optional(),
  limit: z.number().min(1).max(100).default(20),
  max_energy: z.number().min(0).optional(),
  max_time: z.number().min(0).optional(),
  min_yield: z.number().min(0).max(1).optional(),
  output_product_type: z.enum(PRODUCT_TYPES).optional(),
  page: z.number().min(1).default(1),
  required_module: z.string().optional(),
  sort_by: z
    .enum(['name', 'yield_percentage', 'energy_required_kwh', 'processing_time_minutes', 'created_at'])
    .default('created_at'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
})

export const validateRecipeSchema = z.object({
  available_modules: z.array(z.string()),
  available_waste: z.record(z.enum(WASTE_TYPES), z.number().min(0)),
  energy_budget_kwh: z.number().min(0).optional(),
  time_budget_minutes: z.number().min(0).optional(),
})

export const recommendationFiltersSchema = z.object({
  available_waste: z.record(z.enum(WASTE_TYPES), z.number().min(0)),
  desired_products: z.array(z.enum(PRODUCT_TYPES)).optional(),
  max_results: z.number().min(1).max(20).default(10),
  optimization_goal: z.enum(['minimize_energy', 'maximize_yield', 'minimize_time']).default('maximize_yield'),
})
