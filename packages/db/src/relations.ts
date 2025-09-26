import { relations } from 'drizzle-orm'
import {
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

// Relations
export const userRelations = relations(users, ({ many }) => ({
  createdRecipes: many(processingRecipes),
  maintenanceRecords: many(maintenanceRecords),
  processingRuns: many(processingRuns),
  resolvedAlerts: many(systemAlerts),
}))

export const wasteInventoryRelations = relations(wasteInventory, ({ many }) => ({
  // No direct relations needed for waste inventory
}))

export const processingModuleRelations = relations(processingModules, ({ many }) => ({
  maintenanceRecords: many(maintenanceRecords),
  processingRuns: many(processingRuns),
  resourceUsage: many(resourceUsage),
}))

export const processingRecipeRelations = relations(processingRecipes, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [processingRecipes.created_by],
    references: [users.id],
  }),
  processingRuns: many(processingRuns),
}))

export const processingRunRelations = relations(processingRuns, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [processingRuns.created_by],
    references: [users.id],
  }),
  module: one(processingModules, {
    fields: [processingRuns.module_id],
    references: [processingModules.id],
  }),
  productsCreated: many(productInventory),
  recipe: one(processingRecipes, {
    fields: [processingRuns.recipe_id],
    references: [processingRecipes.id],
  }),
  resourceUsage: many(resourceUsage),
}))

export const productInventoryRelations = relations(productInventory, ({ one }) => ({
  productionRun: one(processingRuns, {
    fields: [productInventory.production_run_id],
    references: [processingRuns.id],
  }),
}))

export const resourceUsageRelations = relations(resourceUsage, ({ one }) => ({
  module: one(processingModules, {
    fields: [resourceUsage.module_id],
    references: [processingModules.id],
  }),
  processingRun: one(processingRuns, {
    fields: [resourceUsage.processing_run_id],
    references: [processingRuns.id],
  }),
}))

export const systemAlertRelations = relations(systemAlerts, ({ one }) => ({
  resolvedBy: one(users, {
    fields: [systemAlerts.resolved_by],
    references: [users.id],
  }),
}))

export const maintenanceRecordRelations = relations(maintenanceRecords, ({ one }) => ({
  module: one(processingModules, {
    fields: [maintenanceRecords.module_id],
    references: [processingModules.id],
  }),
  performedBy: one(users, {
    fields: [maintenanceRecords.performed_by],
    references: [users.id],
  }),
}))
