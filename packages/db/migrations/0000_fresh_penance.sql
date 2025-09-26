CREATE TYPE "public"."module_status" AS ENUM('active', 'maintenance', 'broken', 'offline');--> statement-breakpoint
CREATE TYPE "public"."product_type" AS ENUM('insulation_panel', 'storage_container', 'spare_part', 'tool', 'structural_beam', 'protective_sheet', 'filter_component', 'building_brick');--> statement-breakpoint
CREATE TYPE "public"."run_status" AS ENUM('queued', 'running', 'paused', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'operator', 'engineer', 'scientist');--> statement-breakpoint
CREATE TYPE "public"."waste_type" AS ENUM('food_packaging', 'clothing_fabric', 'metal_components', 'foam_insulation', 'plastic_containers', 'electronic_waste', 'organic_waste', 'paper_cardboard');--> statement-breakpoint
CREATE TABLE "daily_metrics" (
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"energy_consumed_kwh" numeric(10, 3) DEFAULT '0',
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"metric_date" timestamp with time zone NOT NULL,
	"module_uptime_percent" real DEFAULT 0,
	"processing_efficiency" real DEFAULT 0,
	"products_by_type" jsonb DEFAULT '{}'::jsonb,
	"products_created_count" integer DEFAULT 0,
	"quality_score_average" real DEFAULT 0,
	"waste_processed_kg" numeric(10, 3) DEFAULT '0',
	"waste_types_processed" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
CREATE TABLE "maintenance_records" (
	"completed_date" timestamp with time zone,
	"cost_estimate" numeric(10, 2),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"description" text,
	"duration_hours" numeric(4, 1),
	"efficiency_after" real,
	"efficiency_before" real,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"maintenance_type" varchar(50) NOT NULL,
	"module_id" uuid NOT NULL,
	"notes" text,
	"parts_replaced" jsonb DEFAULT '[]'::jsonb,
	"performed_by" uuid,
	"scheduled_date" timestamp with time zone,
	"status" varchar(20) DEFAULT 'scheduled'
);
--> statement-breakpoint
CREATE TABLE "processing_modules" (
	"capabilities" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"current_recipe_id" uuid,
	"efficiency_rating" real DEFAULT 1,
	"estimated_completion" timestamp with time zone,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"maintenance_hours_remaining" integer DEFAULT 1000,
	"module_type" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"power_consumption_kw" numeric(8, 2) NOT NULL,
	"status" "module_status" DEFAULT 'active' NOT NULL,
	"throughput_kg_per_hour" numeric(8, 2) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "processing_recipes" (
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" uuid,
	"description" text,
	"energy_required_kwh" numeric(8, 3) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"input_materials" jsonb NOT NULL,
	"is_active" boolean DEFAULT true,
	"name" varchar(200) NOT NULL,
	"output_products" jsonb NOT NULL,
	"process_steps" jsonb NOT NULL,
	"processing_time_minutes" integer NOT NULL,
	"quality_score" real DEFAULT 1,
	"required_modules" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"yield_percentage" real DEFAULT 0.85
);
--> statement-breakpoint
CREATE TABLE "processing_runs" (
	"actual_outputs" jsonb,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" uuid,
	"energy_consumed_kwh" numeric(8, 3),
	"error_message" text,
	"estimated_outputs" jsonb NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"input_quantities" jsonb NOT NULL,
	"module_id" uuid NOT NULL,
	"name" varchar(200) NOT NULL,
	"operator_notes" text,
	"progress_percent" smallint DEFAULT 0,
	"quality_check_passed" boolean,
	"recipe_id" uuid NOT NULL,
	"started_at" timestamp with time zone,
	"status" "run_status" DEFAULT 'queued' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_inventory" (
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_available" boolean DEFAULT true,
	"location" varchar(100) NOT NULL,
	"product_type" "product_type" NOT NULL,
	"production_run_id" uuid,
	"properties" jsonb DEFAULT '{}'::jsonb,
	"quality_score" real DEFAULT 1,
	"quantity" integer NOT NULL,
	"reserved_quantity" integer DEFAULT 0,
	"total_mass_kg" numeric(10, 3) NOT NULL,
	"unit_mass_kg" numeric(8, 3),
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resource_usage" (
	"cost_estimate" numeric(10, 2),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"module_id" uuid,
	"processing_run_id" uuid,
	"quantity_used" numeric(10, 3) NOT NULL,
	"resource_type" varchar(50) NOT NULL,
	"unit" varchar(20) NOT NULL,
	"usage_date" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "system_alerts" (
	"alert_type" varchar(50) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"entity_id" uuid,
	"entity_type" varchar(50),
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_resolved" boolean DEFAULT false,
	"message" text NOT NULL,
	"resolution_notes" text,
	"resolved_at" timestamp with time zone,
	"resolved_by" uuid,
	"severity" varchar(20) NOT NULL,
	"title" varchar(200) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"avatar_url" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_login_at" timestamp with time zone,
	"last_name" varchar(100) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"settings" jsonb DEFAULT '{}'::jsonb,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"username" varchar(100) NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "waste_inventory" (
	"contamination_level" real DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"date_collected" timestamp with time zone NOT NULL,
	"expiry_date" timestamp with time zone,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"location" varchar(100) NOT NULL,
	"properties" jsonb DEFAULT '{}'::jsonb,
	"quality_grade" varchar(20) DEFAULT 'standard',
	"quantity_kg" numeric(10, 3) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"version" smallint DEFAULT 1 NOT NULL,
	"waste_type" "waste_type" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "maintenance_records" ADD CONSTRAINT "maintenance_records_module_id_processing_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."processing_modules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance_records" ADD CONSTRAINT "maintenance_records_performed_by_users_id_fk" FOREIGN KEY ("performed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processing_recipes" ADD CONSTRAINT "processing_recipes_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processing_runs" ADD CONSTRAINT "processing_runs_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processing_runs" ADD CONSTRAINT "processing_runs_module_id_processing_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."processing_modules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processing_runs" ADD CONSTRAINT "processing_runs_recipe_id_processing_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."processing_recipes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_inventory" ADD CONSTRAINT "product_inventory_production_run_id_processing_runs_id_fk" FOREIGN KEY ("production_run_id") REFERENCES "public"."processing_runs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_usage" ADD CONSTRAINT "resource_usage_module_id_processing_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."processing_modules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_usage" ADD CONSTRAINT "resource_usage_processing_run_id_processing_runs_id_fk" FOREIGN KEY ("processing_run_id") REFERENCES "public"."processing_runs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "system_alerts" ADD CONSTRAINT "system_alerts_resolved_by_users_id_fk" FOREIGN KEY ("resolved_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "daily_metrics_date_idx" ON "daily_metrics" USING btree ("metric_date");--> statement-breakpoint
CREATE INDEX "daily_metrics_efficiency_idx" ON "daily_metrics" USING btree ("processing_efficiency");--> statement-breakpoint
CREATE INDEX "waste_processed_idx" ON "daily_metrics" USING btree ("waste_processed_kg");--> statement-breakpoint
CREATE INDEX "module_maintenance_idx" ON "maintenance_records" USING btree ("module_id");--> statement-breakpoint
CREATE INDEX "maintenance_date_idx" ON "maintenance_records" USING btree ("scheduled_date");--> statement-breakpoint
CREATE INDEX "maintenance_status_idx" ON "maintenance_records" USING btree ("status");--> statement-breakpoint
CREATE INDEX "maintenance_type_idx" ON "maintenance_records" USING btree ("maintenance_type");--> statement-breakpoint
CREATE INDEX "module_status_idx" ON "processing_modules" USING btree ("status");--> statement-breakpoint
CREATE INDEX "module_type_idx" ON "processing_modules" USING btree ("module_type");--> statement-breakpoint
CREATE INDEX "processing_modules_efficiency_idx" ON "processing_modules" USING btree ("efficiency_rating");--> statement-breakpoint
CREATE INDEX "recipe_active_idx" ON "processing_recipes" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "recipe_efficiency_idx" ON "processing_recipes" USING btree ("yield_percentage","energy_required_kwh");--> statement-breakpoint
CREATE INDEX "created_by_idx" ON "processing_recipes" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "run_status_idx" ON "processing_runs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "run_progress_idx" ON "processing_runs" USING btree ("progress_percent");--> statement-breakpoint
CREATE INDEX "recipe_runs_idx" ON "processing_runs" USING btree ("recipe_id");--> statement-breakpoint
CREATE INDEX "module_runs_idx" ON "processing_runs" USING btree ("module_id");--> statement-breakpoint
CREATE INDEX "completion_date_idx" ON "processing_runs" USING btree ("completed_at");--> statement-breakpoint
CREATE INDEX "product_type_idx" ON "product_inventory" USING btree ("product_type");--> statement-breakpoint
CREATE INDEX "availability_idx" ON "product_inventory" USING btree ("is_available","quantity");--> statement-breakpoint
CREATE INDEX "location_products_idx" ON "product_inventory" USING btree ("location");--> statement-breakpoint
CREATE INDEX "production_run_idx" ON "product_inventory" USING btree ("production_run_id");--> statement-breakpoint
CREATE INDEX "resource_type_idx" ON "resource_usage" USING btree ("resource_type");--> statement-breakpoint
CREATE INDEX "usage_date_idx" ON "resource_usage" USING btree ("usage_date");--> statement-breakpoint
CREATE INDEX "processing_run_usage_idx" ON "resource_usage" USING btree ("processing_run_id");--> statement-breakpoint
CREATE INDEX "module_usage_idx" ON "resource_usage" USING btree ("module_id");--> statement-breakpoint
CREATE INDEX "alert_severity_idx" ON "system_alerts" USING btree ("severity");--> statement-breakpoint
CREATE INDEX "alert_resolved_idx" ON "system_alerts" USING btree ("is_resolved");--> statement-breakpoint
CREATE INDEX "alert_type_idx" ON "system_alerts" USING btree ("alert_type");--> statement-breakpoint
CREATE INDEX "alert_entity_idx" ON "system_alerts" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "active_users_idx" ON "users" USING btree ("is_active","last_login_at") WHERE deleted_at IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "user_username_idx" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX "waste_type_idx" ON "waste_inventory" USING btree ("waste_type","quantity_kg");--> statement-breakpoint
CREATE INDEX "location_idx" ON "waste_inventory" USING btree ("location");--> statement-breakpoint
CREATE INDEX "collection_date_idx" ON "waste_inventory" USING btree ("date_collected");