import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import {
  dailyMetrics,
  maintenanceRecords,
  processingModules,
  processingRecipes,
  processingRuns,
  productInventory,
  resourceUsage,
  systemAlerts,
  users,
  wasteInventory,
} from './tables'

// ========== USERS ==========
export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>

// ========== WASTE INVENTORY ==========
export type WasteInventory = InferSelectModel<typeof wasteInventory>
export type NewWasteInventory = InferInsertModel<typeof wasteInventory>

// ========== PROCESSING MODULES ==========
export type ProcessingModule = InferSelectModel<typeof processingModules>
export type NewProcessingModule = InferInsertModel<typeof processingModules>

// ========== PROCESSING RECIPES ==========
export type ProcessingRecipe = InferSelectModel<typeof processingRecipes>
export type NewProcessingRecipe = InferInsertModel<typeof processingRecipes>

// ========== PROCESSING RUNS ==========
export type ProcessingRun = InferSelectModel<typeof processingRuns>
export type NewProcessingRun = InferInsertModel<typeof processingRuns>

// ========== PRODUCT INVENTORY ==========
export type ProductInventory = InferSelectModel<typeof productInventory>
export type NewProductInventory = InferInsertModel<typeof productInventory>

// ========== RESOURCE USAGE ==========
export type ResourceUsage = InferSelectModel<typeof resourceUsage>
export type NewResourceUsage = InferInsertModel<typeof resourceUsage>

// ========== SYSTEM ALERTS ==========
export type SystemAlert = InferSelectModel<typeof systemAlerts>
export type NewSystemAlert = InferInsertModel<typeof systemAlerts>

// ========== DAILY METRICS ==========
export type DailyMetric = InferSelectModel<typeof dailyMetrics>
export type NewDailyMetric = InferInsertModel<typeof dailyMetrics>

// ========== MAINTENANCE RECORDS ==========
export type MaintenanceRecord = InferSelectModel<typeof maintenanceRecords>
export type NewMaintenanceRecord = InferInsertModel<typeof maintenanceRecords>
