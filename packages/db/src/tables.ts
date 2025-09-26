import { sql } from 'drizzle-orm'
import {
  boolean,
  decimal,
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
export const userRoleEnum = pgEnum('user_role', ['admin', 'operator', 'engineer', 'scientist'])
export const wasteTypeEnum = pgEnum('waste_type', [
  'food_packaging',
  'clothing_fabric',
  'metal_components',
  'foam_insulation',
  'plastic_containers',
  'electronic_waste',
  'organic_waste',
  'paper_cardboard',
])
export const moduleStatusEnum = pgEnum('module_status', ['active', 'maintenance', 'broken', 'offline'])
export const runStatusEnum = pgEnum('run_status', ['queued', 'running', 'paused', 'completed', 'failed'])
export const productTypeEnum = pgEnum('product_type', [
  'insulation_panel',
  'storage_container',
  'spare_part',
  'tool',
  'structural_beam',
  'protective_sheet',
  'filter_component',
  'building_brick',
])

/**
 * System users - Mars facility operators
 */
export const users = pgTable(
  'users',
  {
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    first_name: varchar('first_name', { length: 100 }).notNull(),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    is_active: boolean('is_active').default(true).notNull(),
    last_name: varchar('last_name', { length: 100 }).notNull(),
    role: userRoleEnum('role').default('operator').notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    username: varchar('username', { length: 100 }).notNull().unique(),
  },
  (table) => [index('users_role_idx').on(table.role), index('active_users_idx').on(table.is_active)],
)

/**
 * Waste materials currently available for processing
 */
export const wasteInventory = pgTable(
  'waste_inventory',
  {
    contamination_level: real('contamination_level').default(0), // 0-1 scale
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    date_collected: timestamp('date_collected', { withTimezone: true }).notNull(),
    expiry_date: timestamp('expiry_date', { withTimezone: true }), // For organic materials
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    location: varchar('location', { length: 100 }).notNull(), // Storage bay, processing area, etc.
    properties: jsonb('properties').default(sql`'{}'::jsonb`), // Material-specific properties
    quality_grade: varchar('quality_grade', { length: 20 }).default('standard'), // pristine, standard, degraded
    quantity_kg: decimal('quantity_kg', { precision: 10, scale: 3 }).notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    version: smallint('version').default(1).notNull(),
    waste_type: wasteTypeEnum('waste_type').notNull(),
  },
  (table) => [
    index('waste_type_idx').on(table.waste_type, table.quantity_kg),
    index('location_idx').on(table.location),
    index('collection_date_idx').on(table.date_collected),
  ],
)

/**
 * Processing equipment/modules
 */
export const processingModules = pgTable(
  'processing_modules',
  {
    capabilities: jsonb('capabilities').default(sql`'{}'::jsonb`), // What materials/operations it supports
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    current_recipe_id: uuid('current_recipe_id'), // Currently running recipe
    efficiency_rating: real('efficiency_rating').default(1.0), // 0-1 scale
    estimated_completion: timestamp('estimated_completion', { withTimezone: true }),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    maintenance_hours_remaining: integer('maintenance_hours_remaining').default(1000),
    module_type: varchar('module_type', { length: 50 }).notNull(), // shredder, extruder, printer, etc.
    name: varchar('name', { length: 100 }).notNull(),
    power_consumption_kw: decimal('power_consumption_kw', { precision: 8, scale: 2 }).notNull(),
    status: moduleStatusEnum('status').default('active').notNull(),
    throughput_kg_per_hour: decimal('throughput_kg_per_hour', { precision: 8, scale: 2 }).notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => [
    index('module_status_idx').on(table.status),
    index('module_type_idx').on(table.module_type),
    index('processing_modules_efficiency_idx').on(table.efficiency_rating),
  ],
)

/**
 * Processing recipes - how to convert waste into products
 */
export const processingRecipes = pgTable(
  'processing_recipes',
  {
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    created_by: uuid('created_by').references(() => users.id),
    description: text('description'),
    energy_required_kwh: decimal('energy_required_kwh', { precision: 8, scale: 3 }).notNull(),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    input_materials: jsonb('input_materials').notNull(), // {"food_packaging": 5.0, "metal_components": 2.0}
    is_active: boolean('is_active').default(true),
    name: varchar('name', { length: 200 }).notNull(),
    output_products: jsonb('output_products').notNull(), // {"storage_container": 6.5}
    process_steps: jsonb('process_steps').notNull(), // Detailed processing instructions
    processing_time_minutes: integer('processing_time_minutes').notNull(),
    quality_score: real('quality_score').default(1.0), // Product quality 0-1
    required_modules: jsonb('required_modules').notNull(), // ["shredder", "extruder"]
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    yield_percentage: real('yield_percentage').default(0.85), // Expected output vs input
  },
  (table) => [
    index('recipe_active_idx').on(table.is_active),
    index('recipe_efficiency_idx').on(table.yield_percentage, table.energy_required_kwh),
    index('created_by_idx').on(table.created_by),
  ],
)

/**
 * Automated processing runs
 */
export const processingRuns = pgTable(
  'processing_runs',
  {
    actual_outputs: jsonb('actual_outputs'), // Actual products created (when completed)
    completed_at: timestamp('completed_at', { withTimezone: true }),
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    created_by: uuid('created_by').references(() => users.id),
    energy_consumed_kwh: decimal('energy_consumed_kwh', { precision: 8, scale: 3 }),
    error_message: text('error_message'),
    estimated_outputs: jsonb('estimated_outputs').notNull(), // Expected products
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    input_quantities: jsonb('input_quantities').notNull(), // Actual materials used
    module_id: uuid('module_id')
      .notNull()
      .references(() => processingModules.id),
    name: varchar('name', { length: 200 }).notNull(),
    operator_notes: text('operator_notes'),
    progress_percent: smallint('progress_percent').default(0),
    quality_check_passed: boolean('quality_check_passed'),
    recipe_id: uuid('recipe_id')
      .notNull()
      .references(() => processingRecipes.id),
    started_at: timestamp('started_at', { withTimezone: true }),
    status: runStatusEnum('status').default('queued').notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => [
    index('run_status_idx').on(table.status),
    index('run_progress_idx').on(table.progress_percent),
    index('recipe_runs_idx').on(table.recipe_id),
    index('module_runs_idx').on(table.module_id),
    index('completion_date_idx').on(table.completed_at),
  ],
)

/**
 * Produced items inventory
 */
export const productInventory = pgTable(
  'product_inventory',
  {
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    is_available: boolean('is_available').default(true), // Available for use
    location: varchar('location', { length: 100 }).notNull(),
    product_type: productTypeEnum('product_type').notNull(),
    production_run_id: uuid('production_run_id').references(() => processingRuns.id),
    properties: jsonb('properties').default(sql`'{}'::jsonb`), // Product-specific properties
    quality_score: real('quality_score').default(1.0),
    quantity: integer('quantity').notNull(),
    reserved_quantity: integer('reserved_quantity').default(0), // Reserved for specific purposes
    total_mass_kg: decimal('total_mass_kg', { precision: 10, scale: 3 }).notNull(),
    unit_mass_kg: decimal('unit_mass_kg', { precision: 8, scale: 3 }),
    updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (table) => [
    index('product_type_idx').on(table.product_type),
    index('availability_idx').on(table.is_available, table.quantity),
    index('location_products_idx').on(table.location),
    index('production_run_idx').on(table.production_run_id),
  ],
)

/**
 * Resource consumption tracking
 */
export const resourceUsage = pgTable(
  'resource_usage',
  {
    cost_estimate: decimal('cost_estimate', { precision: 10, scale: 2 }), // Operational cost
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    module_id: uuid('module_id').references(() => processingModules.id),
    processing_run_id: uuid('processing_run_id').references(() => processingRuns.id),
    quantity_used: decimal('quantity_used', { precision: 10, scale: 3 }).notNull(),
    resource_type: varchar('resource_type', { length: 50 }).notNull(), // power, water, crew_time
    unit: varchar('unit', { length: 20 }).notNull(), // kwh, liters, hours
    usage_date: timestamp('usage_date', { withTimezone: true }).notNull(),
  },
  (table) => [
    index('resource_type_idx').on(table.resource_type),
    index('usage_date_idx').on(table.usage_date),
    index('processing_run_usage_idx').on(table.processing_run_id),
    index('module_usage_idx').on(table.module_id),
  ],
)

/**
 * System alerts and notifications
 */
export const systemAlerts = pgTable(
  'system_alerts',
  {
    alert_type: varchar('alert_type', { length: 50 }).notNull(), // maintenance, resource_low, error, etc.
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    entity_id: uuid('entity_id'), // Reference to the related entity
    entity_type: varchar('entity_type', { length: 50 }), // module, recipe, run, etc.
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    is_resolved: boolean('is_resolved').default(false),
    message: text('message').notNull(),
    resolution_notes: text('resolution_notes'),
    resolved_at: timestamp('resolved_at', { withTimezone: true }),
    resolved_by: uuid('resolved_by').references(() => users.id),
    severity: varchar('severity', { length: 20 }).notNull(), // critical, warning, info
    title: varchar('title', { length: 200 }).notNull(),
  },
  (table) => [
    index('alert_severity_idx').on(table.severity),
    index('alert_resolved_idx').on(table.is_resolved),
    index('alert_type_idx').on(table.alert_type),
    index('alert_entity_idx').on(table.entity_type, table.entity_id),
  ],
)

/**
 * Dashboard metrics and KPIs
 */
export const dailyMetrics = pgTable(
  'daily_metrics',
  {
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    energy_consumed_kwh: decimal('energy_consumed_kwh', { precision: 10, scale: 3 }).default('0'),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    metric_date: timestamp('metric_date', { withTimezone: true }).notNull(),
    module_uptime_percent: real('module_uptime_percent').default(0),
    processing_efficiency: real('processing_efficiency').default(0), // Actual vs theoretical output
    products_by_type: jsonb('products_by_type').default(sql`'{}'::jsonb`),
    products_created_count: integer('products_created_count').default(0),
    quality_score_average: real('quality_score_average').default(0),
    waste_processed_kg: decimal('waste_processed_kg', { precision: 10, scale: 3 }).default('0'),
    waste_types_processed: jsonb('waste_types_processed').default(sql`'{}'::jsonb`),
  },
  (table) => [
    uniqueIndex('daily_metrics_date_idx').on(table.metric_date),
    index('daily_metrics_efficiency_idx').on(table.processing_efficiency),
    index('waste_processed_idx').on(table.waste_processed_kg),
  ],
)

/**
 * Maintenance schedules and logs
 */
export const maintenanceRecords = pgTable(
  'maintenance_records',
  {
    completed_date: timestamp('completed_date', { withTimezone: true }),
    cost_estimate: decimal('cost_estimate', { precision: 10, scale: 2 }),
    created_at: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    description: text('description'),
    duration_hours: decimal('duration_hours', { precision: 4, scale: 1 }),
    efficiency_after: real('efficiency_after'),
    efficiency_before: real('efficiency_before'),
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    maintenance_type: varchar('maintenance_type', { length: 50 }).notNull(), // preventive, corrective, emergency
    module_id: uuid('module_id')
      .notNull()
      .references(() => processingModules.id),
    notes: text('notes'),
    parts_replaced: jsonb('parts_replaced').default(sql`'[]'::jsonb`),
    performed_by: uuid('performed_by').references(() => users.id),
    scheduled_date: timestamp('scheduled_date', { withTimezone: true }),
    status: varchar('status', { length: 20 }).default('scheduled'), // scheduled, in_progress, completed, cancelled
  },
  (table) => [
    index('module_maintenance_idx').on(table.module_id),
    index('maintenance_date_idx').on(table.scheduled_date),
    index('maintenance_status_idx').on(table.status),
    index('maintenance_type_idx').on(table.maintenance_type),
  ],
)
