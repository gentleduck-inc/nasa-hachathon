import { createZodDto } from 'nestjs-zod'
import { RecipesMessages } from './recipes.constants'
import {
  createRecipeSchema,
  recipeFiltersSchema,
  recommendationFiltersSchema,
  updateRecipeSchema,
  validateRecipeSchema,
} from './recipes.dto'

export type RecipesMessagesType = (typeof RecipesMessages)[number]

// DTOS TYPES
export class CreateRecipeDto extends createZodDto(createRecipeSchema) {}
export class UpdateRecipeDto extends createZodDto(updateRecipeSchema) {}
export class RecipeFiltersDto extends createZodDto(recipeFiltersSchema) {}
export class ValidateRecipeDto extends createZodDto(validateRecipeSchema) {}
export class RecommendationFiltersDto extends createZodDto(recommendationFiltersSchema) {}

// Response Types
export interface RecipeItem {
  id: string
  name: string
  description?: string
  input_materials: Record<string, number>
  output_products: Record<string, number>
  processing_time_minutes: number
  energy_required_kwh: number
  required_modules: string[]
  yield_percentage: number
  quality_score: number
  process_steps: Array<{
    step_number: number
    description: string
    duration_minutes: number
    module_type: string
    parameters?: Record<string, any>
  }>
  created_by?: string
  is_active: boolean
  created_at: Date
  updated_at: Date
  efficiency_score: number
  usage_count: number
}

export interface RecipeValidation {
  is_feasible: boolean
  validation_results: {
    materials_available: boolean
    modules_available: boolean
    energy_sufficient: boolean
    time_sufficient: boolean
  }
  missing_requirements: {
    materials?: Record<string, number>
    modules?: string[]
    additional_energy_kwh?: number
    additional_time_minutes?: number
  }
  estimated_outputs: Record<string, number>
  resource_utilization: {
    energy_percent: number
    time_percent: number
  }
}

export interface RecipeRecommendation {
  recipe_id: string
  recipe_name: string
  suitability_score: number
  reasoning: string
  estimated_outputs: Record<string, number>
  resource_requirements: {
    energy_kwh: number
    time_minutes: number
    modules: string[]
  }
  waste_utilization: Record<string, number>
}
