import { sql } from 'drizzle-orm'
import {
  boolean,
  decimal,
  foreignKey,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  real,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'mission_commander', 'crew_member', 'engineer', 'scientist'])
export const missionStatusEnum = pgEnum('mission_status', ['planning', 'active', 'completed', 'aborted'])
export const wasteTypeEnum = pgEnum('waste_type', [
  'plastics',
  'metals',
  'foam',
  'textiles',
  'composites',
  'eva_waste',
  'food_packaging',
  'structural_elements',
  'bubble_wrap',
  'nitrile_gloves',
  'other',
])
export const moduleStatusEnum = pgEnum('module_status', ['active', 'maintenance', 'broken', 'offline'])
export const runStatusEnum = pgEnum('run_status', ['queued', 'running', 'completed', 'failed', 'cancelled'])
export const productTypeEnum = pgEnum('product_type', [
  'brick',
  'tile',
  'utensil',
  'container',
  'tool',
  'structural_component',
  'insulation',
  'filter',
  'decorative_item',
  'spare_part',
])

/**
 * Organizations represent mission agencies or companies (NASA, SpaceX, etc.)
 * Multi-tenant root entity
 */
export const organizations = pgTable(
  'organizations',
  {
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    description: text('description'),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 200 }).notNull(),
    settings: jsonb('settings').default(sql`'{}'::jsonb`),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    version: integer('version').default(1).notNull(),
  },
  (table) => [
    index('active_orgs_idx').on(table.created_at).where(sql`deleted_at IS NULL`),
    uniqueIndex('org_slug_idx').on(table.slug),
  ],
)

/**
 * Users - astronauts, engineers, mission control personnel
 */
export const users = pgTable(
  'users',
  {
    avatar_url: text('avatar_url'),
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    email: varchar('email', { length: 255 }).notNull().unique(),
    first_name: varchar('first_name', { length: 100 }).notNull(),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    is_active: boolean('is_active').default(true).notNull(),
    last_login_at: timestamp('last_login_at', { withTimezone: true }),
    last_name: varchar('last_name', { length: 100 }).notNull(),
    organization_id: uuid('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'restrict' }),
    password_hash: varchar('password_hash', { length: 255 }).notNull(),
    settings: jsonb('settings').default(sql`'{}'::jsonb`),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    username: varchar('username', { length: 100 }).notNull().unique(),
    version: integer('version').default(1).notNull(),
  },
  (table) => [
    index('active_users_idx').on(table.is_active, table.last_login_at).where(sql`deleted_at IS NULL`),
    uniqueIndex('user_email_idx').on(table.email),
    index('org_users_idx').on(table.organization_id, table.created_at),
    uniqueIndex('user_username_idx').on(table.username),
  ],
)

/**
 * User roles - RBAC system
 */
export const userRoles = pgTable(
  'user_roles',
  {
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    granted_by: uuid('granted_by').references(() => users.id, { onDelete: 'restrict' }),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    role: userRoleEnum('role').notNull(),
    user_id: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => [
    index('role_users_idx').on(table.role, table.created_at),
    uniqueIndex('user_role_unique_idx').on(table.user_id, table.role).where(sql`deleted_at IS NULL`),
  ],
)

/**
 * API keys and session tokens
 */
export const apiKeys = pgTable(
  'api_keys',
  {
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    expires_at: timestamp('expires_at', { withTimezone: true }),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    is_active: boolean('is_active').default(true).notNull(),
    key_hash: varchar('key_hash', { length: 255 }).notNull().unique(),
    last_used_at: timestamp('last_used_at', { withTimezone: true }),
    name: varchar('name', { length: 100 }).notNull(),
    permissions: jsonb('permissions').default(sql`'[]'::jsonb`),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    user_id: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => [
    index('active_keys_idx').on(table.is_active, table.expires_at).where(sql`deleted_at IS NULL`),
    uniqueIndex('api_key_hash_idx').on(table.key_hash),
    index('user_keys_idx').on(table.user_id, table.created_at),
  ],
)

/**
 * Mars missions - each mission has its own waste profile and timeline
 */
export const missions = pgTable(
  'missions',
  {
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    crew_size: smallint('crew_size').notNull().default(8),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    description: text('description'),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    landing_date: timestamp('landing_date', { withTimezone: true }),
    landing_site: varchar('landing_site', { length: 100 }).default('Jezero Crater'),
    launch_date: timestamp('launch_date', { withTimezone: true }),
    mission_duration_days: integer('mission_duration_days').notNull().default(1095),
    name: varchar('name', { length: 200 }).notNull(),
    organization_id: uuid('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'restrict' }),
    return_date: timestamp('return_date', { withTimezone: true }),
    settings: jsonb('settings').default(sql`'{}'::jsonb`),
    status: missionStatusEnum('status').default('planning').notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    version: integer('version').default(1).notNull(),
  },
  (table) => [
    index('active_missions_idx').on(table.status, table.landing_date).where(sql`deleted_at IS NULL`),
    index('org_missions_idx').on(table.organization_id, table.created_at),
    index('status_missions_idx').on(table.status, table.launch_date),
  ],
)

/**
 * Mission crew assignments
 */
export const missionCrew = pgTable(
  'mission_crew',
  {
    assigned_at: timestamp('assigned_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    mission_id: uuid('mission_id')
      .notNull()
      .references(() => missions.id, { onDelete: 'cascade' }),
    removed_at: timestamp('removed_at', { withTimezone: true }),
    role: userRoleEnum('role').notNull(),
    specialization: varchar('specialization', { length: 100 }),
    user_id: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => [
    uniqueIndex('mission_crew_unique_idx').on(table.mission_id, table.user_id).where(sql`removed_at IS NULL`),
    index('user_missions_idx').on(table.user_id, table.assigned_at),
  ],
)

/**
 * Waste materials catalog - defines what waste types we can process
 */
export const wasteMaterials = pgTable(
  'waste_materials',
  {
    category: wasteTypeEnum('category').notNull(),
    composition: jsonb('composition').default(sql`'{}'::jsonb`),
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    density_kg_per_m3: decimal('density_kg_per_m3', { precision: 8, scale: 2 }),
    description: text('description'),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 100 }).notNull(),
    organization_id: uuid('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'restrict' }),
    processing_difficulty: smallint('processing_difficulty').default(1),
    properties: jsonb('properties').default(sql`'{}'::jsonb`),
    recyclability_score: real('recyclability_score').default(0),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    version: integer('version').default(1).notNull(),
  },
  (table) => [
    index('materials_category_idx').on(table.category, table.recyclability_score),
    index('materials_name_idx').on(table.name),
    index('org_materials_idx').on(table.organization_id, table.category),
  ],
)

/**
 * Processing modules - equipment that transforms waste into products
 */
export const processingModules = pgTable(
  'processing_modules',
  {
    capabilities: jsonb('capabilities').default(sql`'{}'::jsonb`),
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    crew_time_minutes_per_kg: decimal('crew_time_minutes_per_kg', { precision: 6, scale: 2 }).default('0'),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    description: text('description'),
    efficiency_rating: real('efficiency_rating').default(1.0),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    maintenance_hours_per_day: decimal('maintenance_hours_per_day', { precision: 4, scale: 2 }).default('0'),
    module_type: varchar('module_type', { length: 50 }).notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    organization_id: uuid('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'restrict' }),
    power_consumption_kw: decimal('power_consumption_kw', { precision: 8, scale: 2 }).notNull(),
    status: moduleStatusEnum('status').default('active').notNull(),
    throughput_kg_per_hour: decimal('throughput_kg_per_hour', { precision: 8, scale: 2 }).notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    version: integer('version').default(1).notNull(),
  },
  (table) => [
    index('org_modules_idx').on(table.organization_id, table.module_type),
    index('status_modules_idx').on(table.status, table.throughput_kg_per_hour),
    index('modules_type_idx').on(table.module_type, table.efficiency_rating),
  ],
)

/**
 * Processing recipes - how to convert specific waste materials into products
 */
export const processingRecipes = pgTable(
  'processing_recipes',
  {
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    crew_time_minutes: integer('crew_time_minutes').default(0),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    description: text('description'),
    energy_required_kwh: decimal('energy_required_kwh', { precision: 8, scale: 3 }).notNull(),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    inputs: jsonb('inputs').notNull(),
    name: varchar('name', { length: 200 }).notNull(),
    organization_id: uuid('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'restrict' }),
    output_product_type: productTypeEnum('output_product_type').notNull(),
    outputs: jsonb('outputs').notNull(),
    process_steps: jsonb('process_steps').notNull(),
    processing_time_minutes: integer('processing_time_minutes').notNull(),
    quality_score: real('quality_score').default(1.0),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    version: integer('version').default(1).notNull(),
    yield_percentage: real('yield_percentage').default(0.8),
  },
  (table) => [
    index('recipes_efficiency_idx').on(table.yield_percentage, table.energy_required_kwh),
    index('org_recipes_idx').on(table.organization_id, table.output_product_type),
    index('recipes_product_type_idx').on(table.output_product_type, table.quality_score),
  ],
)

/**
 * Simulation runs - each optimization/simulation attempt
 */
export const simulationRuns = pgTable(
  'simulation_runs',
  {
    completed_at: timestamp('completed_at', { withTimezone: true }),
    config: jsonb('config').notNull(),
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    created_by: uuid('created_by')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    description: text('description'),
    error_message: text('error_message'),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    mission_id: uuid('mission_id')
      .notNull()
      .references(() => missions.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 200 }).notNull(),
    progress_percent: smallint('progress_percent').default(0),
    results: jsonb('results').default(sql`'{}'::jsonb`),
    run_type: varchar('run_type', { length: 50 }).notNull(),
    started_at: timestamp('started_at', { withTimezone: true }),
    status: runStatusEnum('status').default('queued').notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    version: integer('version').default(1).notNull(),
  },
  (table) => [
    index('active_runs_idx').on(table.status, table.progress_percent).where(sql`deleted_at IS NULL`),
    index('mission_runs_idx').on(table.mission_id, table.created_at),
    index('status_runs_idx').on(table.status, table.created_at),
    index('user_runs_idx').on(table.created_by, table.created_at),
  ],
)

/**
 * Products created from recycled waste
 */
export const products = pgTable(
  'products',
  {
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    creation_date: timestamp('creation_date', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    description: text('description'),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    is_in_use: boolean('is_in_use').default(false),
    mass_kg: decimal('mass_kg', { precision: 8, scale: 3 }).notNull(),
    mission_id: uuid('mission_id')
      .notNull()
      .references(() => missions.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 200 }).notNull(),
    product_type: productTypeEnum('product_type').notNull(),
    properties: jsonb('properties').default(sql`'{}'::jsonb`),
    quality_score: real('quality_score').default(1.0),
    recipe_id: uuid('recipe_id').references(() => processingRecipes.id, { onDelete: 'set null' }),
    simulation_run_id: uuid('simulation_run_id').references(() => simulationRuns.id, { onDelete: 'cascade' }),
    source_materials: jsonb('source_materials').notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    version: integer('version').default(1).notNull(),
    volume_m3: decimal('volume_m3', { precision: 8, scale: 4 }),
  },
  (table) => [
    index('mission_products_idx').on(table.mission_id, table.product_type),
    index('run_products_idx').on(table.simulation_run_id, table.creation_date),
    index('type_products_idx').on(table.product_type, table.quality_score),
  ],
)

/**
 * Comments and notes on missions, runs, products, etc.
 */
export const comments = pgTable(
  'comments',
  {
    attachments: jsonb('attachments').default(sql`'[]'::jsonb`),
    author_id: uuid('author_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    entity_id: uuid('entity_id').notNull(),
    entity_type: varchar('entity_type', { length: 50 }).notNull(),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    parent_comment_id: uuid('parent_comment_id'),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    version: integer('version').default(1).notNull(),
  },
  (table) => [
    index('entity_comments_idx').on(table.entity_type, table.entity_id, table.created_at),
    index('author_comments_idx').on(table.author_id, table.created_at),
    index('parent_comments_idx').on(table.parent_comment_id, table.created_at),
    foreignKey({
      columns: [table.parent_comment_id],
      foreignColumns: [table.id],
      name: 'comments_parent_comment_fk',
    }).onDelete('cascade'),
  ],
)

/**
 * File attachments for documentation, images, 3D models, etc.
 */
export const attachments = pgTable(
  'attachments',
  {
    checksum_sha256: varchar('checksum_sha256', { length: 64 }),
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    deleted_at: timestamp('deleted_at', { withTimezone: true }),
    filename: varchar('filename', { length: 255 }).notNull(),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    is_public: boolean('is_public').default(false),
    metadata: jsonb('metadata').default(sql`'{}'::jsonb`),
    mime_type: varchar('mime_type', { length: 100 }).notNull(),
    original_filename: varchar('original_filename', { length: 255 }).notNull(),
    size_bytes: integer('size_bytes').notNull(),
    storage_path: text('storage_path').notNull(),
    storage_provider: varchar('storage_provider', { length: 50 }).default('local'),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    uploaded_by: uuid('uploaded_by').references(() => users.id, { onDelete: 'set null' }),
  },
  (table) => [
    uniqueIndex('attachments_checksum_idx').on(table.checksum_sha256).where(sql`checksum_sha256 IS NOT NULL`),
    index('attachments_type_idx').on(table.mime_type, table.size_bytes),
    index('uploader_attachments_idx').on(table.uploaded_by, table.created_at),
  ],
)

/**
 * Audit log - tracks all significant actions in the system
 */
export const auditLogs = pgTable(
  'audit_logs',
  {
    action: varchar('action', { length: 100 }).notNull(),
    changes: jsonb('changes').default(sql`'{}'::jsonb`),
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    entity_id: uuid('entity_id').notNull(),
    entity_type: varchar('entity_type', { length: 50 }).notNull(),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    ip_address: varchar('ip_address', { length: 45 }),
    organization_id: uuid('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    user_agent: text('user_agent'),
    user_id: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  },
  (table) => [
    index('entity_actions_idx').on(table.entity_type, table.entity_id, table.created_at),
    index('org_actions_idx').on(table.organization_id, table.action, table.created_at),
    index('audit_logs_time_partition_idx').on(table.created_at),
    index('user_actions_idx').on(table.user_id, table.created_at),
  ],
)

/**
 * Settings - system and user preferences stored as key-value pairs
 */
export const settings = pgTable(
  'settings',
  {
    category: varchar('category', { length: 50 }).default('general'),
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    description: text('description'),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    is_system: boolean('is_system').default(false),
    key: varchar('key', { length: 100 }).notNull(),
    organization_id: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
    value: jsonb('value').notNull(),
  },
  (table) => [
    index('settings_category_idx').on(table.category, table.is_system),
    uniqueIndex('org_settings_unique_idx').on(table.organization_id, table.key).where(sql`organization_id IS NOT NULL`),
    uniqueIndex('user_settings_unique_idx').on(table.user_id, table.key).where(sql`user_id IS NOT NULL`),
  ],
)

/**
 * Full-text search index for searchable content
 */
export const searchIndex = pgTable(
  'search_index',
  {
    content: text('content').notNull(),
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    entity_id: uuid('entity_id').notNull(),
    entity_type: varchar('entity_type', { length: 50 }).notNull(),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    organization_id: uuid('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    search_vector: text('search_vector'),
    tags: jsonb('tags').default(sql`'[]'::jsonb`),
    title: text('title').notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => [
    uniqueIndex('entity_search_unique_idx').on(table.entity_type, table.entity_id),
    index('org_search_idx').on(table.organization_id, table.entity_type),
    index('search_tags_idx').on(table.tags),
  ],
)
