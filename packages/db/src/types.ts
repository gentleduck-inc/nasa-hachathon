import type { InferInsertModel, InferSelectModel } from 'drizzle-orm/table'
import type {
  apiKeys,
  attachments,
  auditLogs,
  comments,
  missionCrew,
  missions,
  processingModules,
  processingRecipes,
  products,
  recyclingScenarios,
  searchIndex,
  settings,
  simulationRuns,
  users,
  wasteMaterials,
} from './tables'

// Enum types - extracted from the pgEnum definitions
export type UserRole = 'admin' | 'mission_commander' | 'crew_member' | 'engineer' | 'scientist'
export type MissionStatus = 'planning' | 'active' | 'completed' | 'aborted'
export type WasteType =
  | 'plastics'
  | 'metals'
  | 'foam'
  | 'textiles'
  | 'composites'
  | 'eva_waste'
  | 'food_packaging'
  | 'structural_elements'
  | 'bubble_wrap'
  | 'nitrile_gloves'
  | 'other'
export type ModuleStatus = 'active' | 'maintenance' | 'broken' | 'offline'
export type RunStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'
export type ProductType =
  | 'brick'
  | 'tile'
  | 'utensil'
  | 'container'
  | 'tool'
  | 'structural_component'
  | 'insulation'
  | 'filter'
  | 'decorative_item'
  | 'spare_part'

// Base table types for select and insert operations
export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>
export type ApiKey = InferSelectModel<typeof apiKeys>
export type NewApiKey = InferInsertModel<typeof apiKeys>
export type Mission = InferSelectModel<typeof missions>
export type NewMission = InferInsertModel<typeof missions>
export type MissionCrew = InferSelectModel<typeof missionCrew>
export type NewMissionCrew = InferInsertModel<typeof missionCrew>
export type WasteMaterial = InferSelectModel<typeof wasteMaterials>
export type NewWasteMaterial = InferInsertModel<typeof wasteMaterials>
export type ProcessingModule = InferSelectModel<typeof processingModules>
export type NewProcessingModule = InferInsertModel<typeof processingModules>
export type ProcessingRecipe = InferSelectModel<typeof processingRecipes>
export type NewProcessingRecipe = InferInsertModel<typeof processingRecipes>
export type RecyclingScenario = InferSelectModel<typeof recyclingScenarios>
export type NewRecyclingScenario = InferInsertModel<typeof recyclingScenarios>
export type SimulationRun = InferSelectModel<typeof simulationRuns>
export type NewSimulationRun = InferInsertModel<typeof simulationRuns>
export type Product = InferSelectModel<typeof products>
export type NewProduct = InferInsertModel<typeof products>
export type Comment = InferSelectModel<typeof comments>
export type NewComment = InferInsertModel<typeof comments>
export type Attachment = InferSelectModel<typeof attachments>
export type NewAttachment = InferInsertModel<typeof attachments>
export type AuditLog = InferSelectModel<typeof auditLogs>
export type NewAuditLog = InferInsertModel<typeof auditLogs>
export type Setting = InferSelectModel<typeof settings>
export type NewSetting = InferInsertModel<typeof settings>
export type SearchIndex = InferSelectModel<typeof searchIndex>
export type NewSearchIndex = InferInsertModel<typeof searchIndex>

// Enhanced relation types with full nested data
export type UserWithRelations = User & {
  apiKeys?: ApiKey[]
  missionAssignments?: (MissionCrew & {
    mission?: Mission
  })[]
  createdMissions?: Mission[]
  createdScenarios?: RecyclingScenario[]
  createdWasteMaterials?: WasteMaterial[]
  createdModules?: ProcessingModule[]
  createdRecipes?: ProcessingRecipe[]
  simulationRuns?: SimulationRun[]
  comments?: Comment[]
  attachments?: Attachment[]
  settings?: Setting[]
  auditLogs?: AuditLog[]
}

export type MissionWithRelations = Mission & {
  createdBy?: User
  crew?: (MissionCrew & {
    user?: User
  })[]
  simulationRuns?: (SimulationRun & {
    createdBy?: User
    scenario?: RecyclingScenario
  })[]
  products?: (Product & {
    recipe?: ProcessingRecipe
    simulationRun?: SimulationRun
  })[]
}

export type RecyclingScenarioWithRelations = RecyclingScenario & {
  createdBy?: User
  simulationRuns?: (SimulationRun & {
    createdBy?: User
    mission?: Mission
  })[]
}

export type SimulationRunWithRelations = SimulationRun & {
  mission?: Mission
  scenario?: RecyclingScenario
  createdBy?: User
  products?: (Product & {
    recipe?: ProcessingRecipe
    mission?: Mission
  })[]
}

export type ProductWithRelations = Product & {
  simulationRun?: SimulationRun & {
    createdBy?: User
    scenario?: RecyclingScenario
    mission?: Mission
  }
  mission?: Mission
  recipe?: ProcessingRecipe & {
    createdBy?: User
  }
}

export type CommentWithRelations = Comment & {
  author?: User
  parentComment?: Comment
  replies?: (Comment & {
    author?: User
  })[]
}

export type ProcessingRecipeWithRelations = ProcessingRecipe & {
  createdBy?: User
  products?: (Product & {
    mission?: Mission
    simulationRun?: SimulationRun
  })[]
}

export type WasteMaterialWithRelations = WasteMaterial & {
  createdBy?: User
}

export type ProcessingModuleWithRelations = ProcessingModule & {
  createdBy?: User
}

export type AttachmentWithRelations = Attachment & {
  uploadedBy?: User
}

export type AuditLogWithRelations = AuditLog & {
  user?: User
}

export type SettingWithRelations = Setting & {
  user?: User
}

// Partial types for updates
export type UserUpdate = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
export type MissionUpdate = Partial<Omit<Mission, 'id' | 'created_at' | 'updated_at'>>
export type RecyclingScenarioUpdate = Partial<Omit<RecyclingScenario, 'id' | 'created_at' | 'updated_at'>>
export type SimulationRunUpdate = Partial<Omit<SimulationRun, 'id' | 'created_at' | 'updated_at'>>
export type ProductUpdate = Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
export type WasteMaterialUpdate = Partial<Omit<WasteMaterial, 'id' | 'created_at' | 'updated_at'>>
export type ProcessingModuleUpdate = Partial<Omit<ProcessingModule, 'id' | 'created_at' | 'updated_at'>>
export type ProcessingRecipeUpdate = Partial<Omit<ProcessingRecipe, 'id' | 'created_at' | 'updated_at'>>
export type CommentUpdate = Partial<Omit<Comment, 'id' | 'created_at' | 'updated_at'>>

// JSON field types for better type safety
export interface RecipeInputs {
  [materialId: string]: {
    quantity_kg: number
    required: boolean
  }
}

export interface RecipeOutputs {
  [productType: string]: {
    quantity_kg: number
    quality_multiplier: number
  }
}

export interface ProcessStep {
  step_number: number
  module_type: string
  description: string
  duration_minutes: number
  temperature_celsius?: number
  pressure_bar?: number
  parameters?: Record<string, any>
}

export interface AutomatedFlow {
  steps: Array<{
    id: string
    type: 'collection' | 'preprocessing' | 'processing' | 'postprocessing' | 'output'
    module_ids: string[]
    duration_minutes: number
    automated: boolean
    description: string
    next_step_ids: string[]
  }>
  parallel_processing: boolean
  estimated_crew_time_minutes: number
}

export interface MaterialComposition {
  elements: Record<string, number> // element -> percentage
  compounds?: Record<string, number>
  impurities?: Record<string, number>
}

export interface ModuleCapabilities {
  supported_materials: WasteType[]
  max_temperature_celsius: number
  min_temperature_celsius: number
  max_pressure_bar?: number
  supported_operations: string[]
  quality_factors: Record<string, number>
}

export interface ProductProperties {
  dimensions?: {
    length_mm: number
    width_mm: number
    height_mm: number
  }
  weight_kg: number
  color?: string
  durability_rating: number
  temperature_resistance_celsius?: {
    min: number
    max: number
  }
  structural_properties?: {
    tensile_strength_mpa: number
    compressive_strength_mpa: number
    flexibility_rating: number
  }
}

export interface SourceMaterials {
  [materialId: string]: {
    quantity_used_kg: number
    waste_type: WasteType
    original_source: string
    processing_date: string
  }
}

export interface SimulationConfig {
  mission_duration_days: number
  crew_size: number
  waste_generation_rates: Record<WasteType, number> // kg per day
  available_modules: string[]
  energy_constraints: {
    max_daily_kwh: number
    peak_power_kw: number
  }
  optimization_goals: {
    minimize_waste: number // weight 0-1
    maximize_utility: number // weight 0-1
    minimize_energy: number // weight 0-1
    minimize_crew_time: number // weight 0-1
  }
}

export interface SimulationResults {
  total_waste_processed_kg: number
  total_products_created: number
  total_energy_used_kwh: number
  total_crew_time_hours: number
  waste_reduction_percentage: number
  products_by_type: Record<ProductType, number>
  efficiency_metrics: {
    waste_to_product_ratio: number
    energy_per_kg_waste: number
    crew_time_per_kg_waste: number
  }
  recommendations: string[]
  timeline: Array<{
    day: number
    events: Array<{
      type: 'waste_collection' | 'processing' | 'product_creation'
      description: string
      materials_involved: string[]
      energy_used_kwh?: number
    }>
  }>
}

// API response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

// Filter and sort types for queries
export interface UserFilters {
  role?: UserRole
  is_active?: boolean
  created_after?: Date
  created_before?: Date
}

export interface MissionFilters {
  status?: MissionStatus
  created_by?: string
  crew_size_min?: number
  crew_size_max?: number
  launch_date_after?: Date
  launch_date_before?: Date
}

export interface RecyclingScenarioFilters {
  scenario_type?: string
  is_public?: boolean
  created_by?: string
  success_rate_min?: number
}

export interface SimulationRunFilters {
  status?: RunStatus
  run_type?: string
  created_by?: string
  mission_id?: string
  scenario_id?: string
  created_after?: Date
  created_before?: Date
}

export interface ProductFilters {
  product_type?: ProductType
  mission_id?: string
  recipe_id?: string
  simulation_run_id?: string
  quality_score_min?: number
  is_in_use?: boolean
  created_after?: Date
  created_before?: Date
}

export interface WasteMaterialFilters {
  category?: WasteType
  is_public?: boolean
  created_by?: string
  recyclability_score_min?: number
  processing_difficulty_max?: number
}

export interface ProcessingModuleFilters {
  module_type?: string
  status?: ModuleStatus
  is_public?: boolean
  created_by?: string
  efficiency_rating_min?: number
}

export interface ProcessingRecipeFilters {
  output_product_type?: ProductType
  is_public?: boolean
  created_by?: string
  quality_score_min?: number
  yield_percentage_min?: number
}

export type SortDirection = 'asc' | 'desc'

export interface SortOptions {
  field: string
  direction: SortDirection
}

// Dashboard and analytics types
export interface DashboardMetrics {
  total_missions: number
  active_missions: number
  total_waste_processed_kg: number
  total_products_created: number
  total_energy_saved_kwh: number
  waste_reduction_percentage: number
  top_waste_types: Array<{
    type: WasteType
    quantity_kg: number
    percentage: number
  }>
  top_product_types: Array<{
    type: ProductType
    quantity: number
    percentage: number
  }>
  recent_activities: Array<{
    id: string
    type: 'mission_created' | 'simulation_run' | 'product_created' | 'scenario_created'
    description: string
    user: User
    created_at: Date
  }>
}

export interface WasteAnalytics {
  waste_by_type: Record<
    WasteType,
    {
      total_generated_kg: number
      total_processed_kg: number
      processing_rate: number
    }
  >
  processing_efficiency: {
    average_yield_percentage: number
    energy_efficiency_kwh_per_kg: number
    time_efficiency_hours_per_kg: number
  }
  trends: Array<{
    date: Date
    waste_generated_kg: number
    waste_processed_kg: number
    products_created: number
  }>
}

export interface MissionAnalytics {
  mission_statistics: {
    average_duration_days: number
    average_crew_size: number
    completion_rate: number
    success_metrics: Record<string, number>
  }
  resource_utilization: {
    average_waste_per_day_kg: number
    average_products_per_day: number
    energy_efficiency_trends: Array<{
      mission_id: string
      mission_name: string
      total_energy_kwh: number
      efficiency_rating: number
    }>
  }
}

// Error types
export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface DatabaseError {
  table: string
  operation: 'create' | 'read' | 'update' | 'delete'
  message: string
  constraint?: string
}

// Event types for real-time updates
export interface SimulationEvent {
  simulation_id: string
  event_type: 'started' | 'progress_update' | 'completed' | 'failed'
  progress_percent?: number
  message?: string
  timestamp: Date
}

export interface SystemEvent {
  event_type: 'module_status_change' | 'mission_update' | 'user_action'
  entity_id: string
  entity_type: string
  data: Record<string, any>
  timestamp: Date
}
