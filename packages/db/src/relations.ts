import { relations } from 'drizzle-orm'
import {
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

/**
 * User relations
 */
export const userRelations = relations(users, ({ many }) => ({
  apiKeys: many(apiKeys),
  attachments: many(attachments),
  auditLogs: many(auditLogs),
  comments: many(comments),
  createdMissions: many(missions),
  createdModules: many(processingModules),
  createdRecipes: many(processingRecipes),
  createdScenarios: many(recyclingScenarios),
  createdWasteMaterials: many(wasteMaterials),
  missionAssignments: many(missionCrew),
  settings: many(settings),
  simulationRuns: many(simulationRuns),
}))

/**
 * API keys relations
 */
export const apiKeyRelations = relations(apiKeys, ({ one }) => ({
  user: one(users, {
    fields: [apiKeys.user_id],
    references: [users.id],
  }),
}))

/**
 * Mission relations
 */
export const missionRelations = relations(missions, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [missions.created_by],
    references: [users.id],
  }),
  crew: many(missionCrew),
  products: many(products),
  simulationRuns: many(simulationRuns),
}))

/**
 * Mission crew relations
 */
export const missionCrewRelations = relations(missionCrew, ({ one }) => ({
  mission: one(missions, {
    fields: [missionCrew.mission_id],
    references: [missions.id],
  }),
  user: one(users, {
    fields: [missionCrew.user_id],
    references: [users.id],
  }),
}))

/**
 * Waste materials relations
 */
export const wasteMaterialRelations = relations(wasteMaterials, ({ one }) => ({
  createdBy: one(users, {
    fields: [wasteMaterials.created_by],
    references: [users.id],
  }),
}))

/**
 * Processing modules relations
 */
export const processingModuleRelations = relations(processingModules, ({ one }) => ({
  createdBy: one(users, {
    fields: [processingModules.created_by],
    references: [users.id],
  }),
}))

/**
 * Processing recipes relations
 */
export const processingRecipeRelations = relations(processingRecipes, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [processingRecipes.created_by],
    references: [users.id],
  }),
  products: many(products),
}))

/**
 * Recycling scenarios relations
 */
export const recyclingScenarioRelations = relations(recyclingScenarios, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [recyclingScenarios.created_by],
    references: [users.id],
  }),
  simulationRuns: many(simulationRuns),
}))

/**
 * Simulation runs relations
 */
export const simulationRunRelations = relations(simulationRuns, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [simulationRuns.created_by],
    references: [users.id],
  }),
  mission: one(missions, {
    fields: [simulationRuns.mission_id],
    references: [missions.id],
  }),
  products: many(products),
  scenario: one(recyclingScenarios, {
    fields: [simulationRuns.scenario_id],
    references: [recyclingScenarios.id],
  }),
}))

/**
 * Products relations
 */
export const productRelations = relations(products, ({ one }) => ({
  mission: one(missions, {
    fields: [products.mission_id],
    references: [missions.id],
  }),
  recipe: one(processingRecipes, {
    fields: [products.recipe_id],
    references: [processingRecipes.id],
  }),
  simulationRun: one(simulationRuns, {
    fields: [products.simulation_run_id],
    references: [simulationRuns.id],
  }),
}))

/**
 * Comments relations
 */
export const commentRelations = relations(comments, ({ one, many }) => ({
  author: one(users, {
    fields: [comments.author_id],
    references: [users.id],
  }),
  parentComment: one(comments, {
    fields: [comments.parent_comment_id],
    references: [comments.id],
    relationName: 'parentChild',
  }),
  replies: many(comments, {
    relationName: 'parentChild',
  }),
}))

/**
 * Attachments relations
 */
export const attachmentRelations = relations(attachments, ({ one }) => ({
  uploadedBy: one(users, {
    fields: [attachments.uploaded_by],
    references: [users.id],
  }),
}))

/**
 * Audit logs relations
 */
export const auditLogRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, {
    fields: [auditLogs.user_id],
    references: [users.id],
  }),
}))

/**
 * Settings relations
 */
export const settingRelations = relations(settings, ({ one }) => ({
  user: one(users, {
    fields: [settings.user_id],
    references: [users.id],
  }),
}))
