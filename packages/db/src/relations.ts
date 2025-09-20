import { relations } from 'drizzle-orm'
import {
  apiKeys,
  attachments,
  auditLogs,
  comments,
  missionCrew,
  missions,
  organizations,
  processingModules,
  processingRecipes,
  products,
  searchIndex,
  settings,
  simulationRuns,
  userRoles,
  users,
  wasteMaterials,
} from './tables'

/**
 * Organization relations - root tenant entity
 */
export const organizationRelations = relations(organizations, ({ many }) => ({
  auditLogs: many(auditLogs),
  missions: many(missions),
  processingModules: many(processingModules),
  processingRecipes: many(processingRecipes),
  searchIndex: many(searchIndex),
  settings: many(settings),
  users: many(users),
  wasteMaterials: many(wasteMaterials),
}))

/**
 * User relations
 */
export const userRelations = relations(users, ({ one, many }) => ({
  apiKeys: many(apiKeys),
  attachments: many(attachments),
  auditLogs: many(auditLogs),
  comments: many(comments),
  grantedRoles: many(userRoles, {
    relationName: 'roleGranter',
  }),
  missionAssignments: many(missionCrew),
  organization: one(organizations, {
    fields: [users.organization_id],
    references: [organizations.id],
  }),
  roles: many(userRoles),
  settings: many(settings),
  simulationRuns: many(simulationRuns),
}))

/**
 * User roles relations
 */
export const userRoleRelations = relations(userRoles, ({ one }) => ({
  grantedBy: one(users, {
    fields: [userRoles.granted_by],
    references: [users.id],
    relationName: 'roleGranter',
  }),
  user: one(users, {
    fields: [userRoles.user_id],
    references: [users.id],
  }),
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
  crew: many(missionCrew),
  organization: one(organizations, {
    fields: [missions.organization_id],
    references: [organizations.id],
  }),
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
  organization: one(organizations, {
    fields: [wasteMaterials.organization_id],
    references: [organizations.id],
  }),
}))

/**
 * Processing modules relations
 */
export const processingModuleRelations = relations(processingModules, ({ one }) => ({
  organization: one(organizations, {
    fields: [processingModules.organization_id],
    references: [organizations.id],
  }),
}))

/**
 * Processing recipes relations
 */
export const processingRecipeRelations = relations(processingRecipes, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [processingRecipes.organization_id],
    references: [organizations.id],
  }),
  products: many(products),
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
  organization: one(organizations, {
    fields: [auditLogs.organization_id],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [auditLogs.user_id],
    references: [users.id],
  }),
}))

/**
 * Settings relations
 */
export const settingRelations = relations(settings, ({ one }) => ({
  organization: one(organizations, {
    fields: [settings.organization_id],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [settings.user_id],
    references: [users.id],
  }),
}))

/**
 * Search index relations
 */
export const searchIndexRelations = relations(searchIndex, ({ one }) => ({
  organization: one(organizations, {
    fields: [searchIndex.organization_id],
    references: [organizations.id],
  }),
}))

// Type-safe relation helpers for common queries

/**
 * Organization with all related data
 */
export type OrganizationWithRelations = typeof organizations.$inferSelect & {
  users?: (typeof users.$inferSelect)[]
  missions?: (typeof missions.$inferSelect)[]
  wasteMaterials?: (typeof wasteMaterials.$inferSelect)[]
  processingModules?: (typeof processingModules.$inferSelect)[]
  processingRecipes?: (typeof processingRecipes.$inferSelect)[]
}

/**
 * User with organization and roles
 */
export type UserWithRelations = typeof users.$inferSelect & {
  organization?: typeof organizations.$inferSelect
  roles?: (typeof userRoles.$inferSelect)[]
  apiKeys?: (typeof apiKeys.$inferSelect)[]
  missionAssignments?: (typeof missionCrew.$inferSelect & {
    mission?: typeof missions.$inferSelect
  })[]
}

/**
 * Mission with crew and runs
 */
export type MissionWithRelations = typeof missions.$inferSelect & {
  organization?: typeof organizations.$inferSelect
  crew?: (typeof missionCrew.$inferSelect & {
    user?: typeof users.$inferSelect
  })[]
  simulationRuns?: (typeof simulationRuns.$inferSelect)[]
  products?: (typeof products.$inferSelect)[]
}

/**
 * Simulation run with all results
 */
export type SimulationRunWithRelations = typeof simulationRuns.$inferSelect & {
  mission?: typeof missions.$inferSelect
  createdBy?: typeof users.$inferSelect
  products?: (typeof products.$inferSelect & {
    recipe?: typeof processingRecipes.$inferSelect
  })[]
}

/**
 * Product with source data
 */
export type ProductWithRelations = typeof products.$inferSelect & {
  simulationRun?: typeof simulationRuns.$inferSelect
  mission?: typeof missions.$inferSelect
  recipe?: typeof processingRecipes.$inferSelect
}

/**
 * Comment with author and replies
 */
export type CommentWithRelations = typeof comments.$inferSelect & {
  author?: typeof users.$inferSelect
  parentComment?: typeof comments.$inferSelect
  replies?: (typeof comments.$inferSelect)[]
}

/**
 * Processing recipe with organization
 */
export type ProcessingRecipeWithRelations = typeof processingRecipes.$inferSelect & {
  organization?: typeof organizations.$inferSelect
  products?: (typeof products.$inferSelect)[]
}

/**
 * Waste material with organization
 */
export type WasteMaterialWithRelations = typeof wasteMaterials.$inferSelect & {
  organization?: typeof organizations.$inferSelect
}

/**
 * Processing module with organization
 */
export type ProcessingModuleWithRelations = typeof processingModules.$inferSelect & {
  organization?: typeof organizations.$inferSelect
}
