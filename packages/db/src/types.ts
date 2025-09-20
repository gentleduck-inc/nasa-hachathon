import type { InferInsertModel, InferSelectModel } from 'drizzle-orm/table'
import type {
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

// Type exports for use throughout the application
export type Organization = InferSelectModel<typeof organizations>
export type NewOrganization = InferInsertModel<typeof organizations>
export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>
export type UserRole = InferSelectModel<typeof userRoles>
export type NewUserRole = InferInsertModel<typeof userRoles>
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
