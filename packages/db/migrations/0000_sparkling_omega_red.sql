CREATE TYPE "public"."mission_status" AS ENUM('planning', 'active', 'completed', 'aborted');--> statement-breakpoint
CREATE TYPE "public"."module_status" AS ENUM('active', 'maintenance', 'broken', 'offline');--> statement-breakpoint
CREATE TYPE "public"."product_type" AS ENUM('brick', 'tile', 'utensil', 'container', 'tool', 'structural_component', 'insulation', 'filter', 'decorative_item', 'spare_part');--> statement-breakpoint
CREATE TYPE "public"."run_status" AS ENUM('queued', 'running', 'completed', 'failed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'mission_commander', 'crew_member', 'engineer', 'scientist');--> statement-breakpoint
CREATE TYPE "public"."waste_type" AS ENUM('plastics', 'metals', 'foam', 'textiles', 'composites', 'eva_waste', 'food_packaging', 'structural_elements', 'bubble_wrap', 'nitrile_gloves', 'other');--> statement-breakpoint
CREATE TABLE "api_keys" (
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone,
	"expires_at" timestamp with time zone,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"key_hash" varchar(255) NOT NULL,
	"last_used_at" timestamp with time zone,
	"name" varchar(100) NOT NULL,
	"permissions" jsonb DEFAULT '[]'::jsonb,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "api_keys_key_hash_unique" UNIQUE("key_hash")
);
--> statement-breakpoint
CREATE TABLE "attachments" (
	"checksum_sha256" varchar(64),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone,
	"filename" varchar(255) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_public" boolean DEFAULT false,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"mime_type" varchar(100) NOT NULL,
	"original_filename" varchar(255) NOT NULL,
	"size_bytes" integer NOT NULL,
	"storage_path" text NOT NULL,
	"storage_provider" varchar(50) DEFAULT 'local',
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"uploaded_by" uuid
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"action" varchar(100) NOT NULL,
	"changes" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"entity_id" uuid NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	"user_id" uuid
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"attachments" jsonb DEFAULT '[]'::jsonb,
	"author_id" uuid NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone,
	"entity_id" uuid NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_comment_id" uuid,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"version" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mission_crew" (
	"assigned_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mission_id" uuid NOT NULL,
	"removed_at" timestamp with time zone,
	"role" "user_role" NOT NULL,
	"specialization" varchar(100),
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "missions" (
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" uuid NOT NULL,
	"crew_size" smallint DEFAULT 8 NOT NULL,
	"deleted_at" timestamp with time zone,
	"description" text,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"landing_date" timestamp with time zone,
	"landing_site" varchar(100) DEFAULT 'Jezero Crater',
	"launch_date" timestamp with time zone,
	"mission_duration_days" integer DEFAULT 1095 NOT NULL,
	"name" varchar(200) NOT NULL,
	"return_date" timestamp with time zone,
	"settings" jsonb DEFAULT '{}'::jsonb,
	"status" "mission_status" DEFAULT 'planning' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"version" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "processing_modules" (
	"capabilities" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" uuid NOT NULL,
	"crew_time_minutes_per_kg" numeric(6, 2) DEFAULT '0',
	"deleted_at" timestamp with time zone,
	"description" text,
	"efficiency_rating" real DEFAULT 1,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL,
	"maintenance_hours_per_day" numeric(4, 2) DEFAULT '0',
	"module_type" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"power_consumption_kw" numeric(8, 2) NOT NULL,
	"status" "module_status" DEFAULT 'active' NOT NULL,
	"throughput_kg_per_hour" numeric(8, 2) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"version" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "processing_recipes" (
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" uuid NOT NULL,
	"crew_time_minutes" integer DEFAULT 0,
	"deleted_at" timestamp with time zone,
	"description" text,
	"energy_required_kwh" numeric(8, 3) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inputs" jsonb NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL,
	"name" varchar(200) NOT NULL,
	"output_product_type" "product_type" NOT NULL,
	"outputs" jsonb NOT NULL,
	"process_steps" jsonb NOT NULL,
	"processing_time_minutes" integer NOT NULL,
	"quality_score" real DEFAULT 1,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"yield_percentage" real DEFAULT 0.8
);
--> statement-breakpoint
CREATE TABLE "products" (
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"creation_date" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone,
	"description" text,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_in_use" boolean DEFAULT false,
	"mass_kg" numeric(8, 3) NOT NULL,
	"mission_id" uuid,
	"name" varchar(200) NOT NULL,
	"product_type" "product_type" NOT NULL,
	"properties" jsonb DEFAULT '{}'::jsonb,
	"quality_score" real DEFAULT 1,
	"recipe_id" uuid,
	"simulation_run_id" uuid,
	"source_materials" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"volume_m3" numeric(8, 4)
);
--> statement-breakpoint
CREATE TABLE "recycling_scenarios" (
	"automated_flow" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" uuid NOT NULL,
	"deleted_at" timestamp with time zone,
	"description" text,
	"estimated_energy_kwh" numeric(8, 3),
	"estimated_time_minutes" integer,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"input_materials" jsonb NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL,
	"name" varchar(200) NOT NULL,
	"output_products" jsonb NOT NULL,
	"recipe_ids" jsonb DEFAULT '[]'::jsonb,
	"scenario_type" varchar(50) NOT NULL,
	"success_rate" real DEFAULT 1,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"version" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "search_index" (
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"entity_id" uuid NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"search_vector" text,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"title" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"category" varchar(50) DEFAULT 'general',
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"description" text,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_system" boolean DEFAULT false,
	"key" varchar(100) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"user_id" uuid,
	"value" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "simulation_runs" (
	"completed_at" timestamp with time zone,
	"config" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" uuid NOT NULL,
	"deleted_at" timestamp with time zone,
	"description" text,
	"error_message" text,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mission_id" uuid,
	"name" varchar(200) NOT NULL,
	"progress_percent" smallint DEFAULT 0,
	"results" jsonb DEFAULT '{}'::jsonb,
	"run_type" varchar(50) NOT NULL,
	"scenario_id" uuid,
	"started_at" timestamp with time zone,
	"status" "run_status" DEFAULT 'queued' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"version" integer DEFAULT 1 NOT NULL
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
	"role" "user_role" DEFAULT 'crew_member' NOT NULL,
	"settings" jsonb DEFAULT '{}'::jsonb,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"username" varchar(100) NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "waste_materials" (
	"category" "waste_type" NOT NULL,
	"composition" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" uuid NOT NULL,
	"deleted_at" timestamp with time zone,
	"density_kg_per_m3" numeric(8, 2),
	"description" text,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL,
	"name" varchar(100) NOT NULL,
	"processing_difficulty" smallint DEFAULT 1,
	"properties" jsonb DEFAULT '{}'::jsonb,
	"recyclability_score" real DEFAULT 0,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"version" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_comment_fk" FOREIGN KEY ("parent_comment_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mission_crew" ADD CONSTRAINT "mission_crew_mission_id_missions_id_fk" FOREIGN KEY ("mission_id") REFERENCES "public"."missions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mission_crew" ADD CONSTRAINT "mission_crew_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "missions" ADD CONSTRAINT "missions_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processing_modules" ADD CONSTRAINT "processing_modules_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "processing_recipes" ADD CONSTRAINT "processing_recipes_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_mission_id_missions_id_fk" FOREIGN KEY ("mission_id") REFERENCES "public"."missions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_recipe_id_processing_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."processing_recipes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_simulation_run_id_simulation_runs_id_fk" FOREIGN KEY ("simulation_run_id") REFERENCES "public"."simulation_runs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recycling_scenarios" ADD CONSTRAINT "recycling_scenarios_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "simulation_runs" ADD CONSTRAINT "simulation_runs_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "simulation_runs" ADD CONSTRAINT "simulation_runs_mission_id_missions_id_fk" FOREIGN KEY ("mission_id") REFERENCES "public"."missions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "simulation_runs" ADD CONSTRAINT "simulation_runs_scenario_id_recycling_scenarios_id_fk" FOREIGN KEY ("scenario_id") REFERENCES "public"."recycling_scenarios"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "waste_materials" ADD CONSTRAINT "waste_materials_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "active_keys_idx" ON "api_keys" USING btree ("is_active","expires_at") WHERE deleted_at IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "api_key_hash_idx" ON "api_keys" USING btree ("key_hash");--> statement-breakpoint
CREATE INDEX "user_keys_idx" ON "api_keys" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "attachments_checksum_idx" ON "attachments" USING btree ("checksum_sha256") WHERE checksum_sha256 IS NOT NULL;--> statement-breakpoint
CREATE INDEX "attachments_type_idx" ON "attachments" USING btree ("mime_type","size_bytes");--> statement-breakpoint
CREATE INDEX "uploader_attachments_idx" ON "attachments" USING btree ("uploaded_by","created_at");--> statement-breakpoint
CREATE INDEX "entity_actions_idx" ON "audit_logs" USING btree ("entity_type","entity_id","created_at");--> statement-breakpoint
CREATE INDEX "audit_logs_time_partition_idx" ON "audit_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "user_actions_idx" ON "audit_logs" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "entity_comments_idx" ON "comments" USING btree ("entity_type","entity_id","created_at");--> statement-breakpoint
CREATE INDEX "author_comments_idx" ON "comments" USING btree ("author_id","created_at");--> statement-breakpoint
CREATE INDEX "parent_comments_idx" ON "comments" USING btree ("parent_comment_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "mission_crew_unique_idx" ON "mission_crew" USING btree ("mission_id","user_id") WHERE removed_at IS NULL;--> statement-breakpoint
CREATE INDEX "user_missions_idx" ON "mission_crew" USING btree ("user_id","assigned_at");--> statement-breakpoint
CREATE INDEX "active_missions_idx" ON "missions" USING btree ("status","landing_date") WHERE deleted_at IS NULL;--> statement-breakpoint
CREATE INDEX "status_missions_idx" ON "missions" USING btree ("status","launch_date");--> statement-breakpoint
CREATE INDEX "created_by_missions_idx" ON "missions" USING btree ("created_by","created_at");--> statement-breakpoint
CREATE INDEX "modules_type_idx" ON "processing_modules" USING btree ("module_type","efficiency_rating");--> statement-breakpoint
CREATE INDEX "status_modules_idx" ON "processing_modules" USING btree ("status","throughput_kg_per_hour");--> statement-breakpoint
CREATE INDEX "modules_public_idx" ON "processing_modules" USING btree ("is_public","module_type");--> statement-breakpoint
CREATE INDEX "created_by_modules_idx" ON "processing_modules" USING btree ("created_by","module_type");--> statement-breakpoint
CREATE INDEX "recipes_efficiency_idx" ON "processing_recipes" USING btree ("yield_percentage","energy_required_kwh");--> statement-breakpoint
CREATE INDEX "recipes_product_type_idx" ON "processing_recipes" USING btree ("output_product_type","quality_score");--> statement-breakpoint
CREATE INDEX "recipes_public_idx" ON "processing_recipes" USING btree ("is_public","output_product_type");--> statement-breakpoint
CREATE INDEX "created_by_recipes_idx" ON "processing_recipes" USING btree ("created_by","output_product_type");--> statement-breakpoint
CREATE INDEX "mission_products_idx" ON "products" USING btree ("mission_id","product_type");--> statement-breakpoint
CREATE INDEX "run_products_idx" ON "products" USING btree ("simulation_run_id","creation_date");--> statement-breakpoint
CREATE INDEX "type_products_idx" ON "products" USING btree ("product_type","quality_score");--> statement-breakpoint
CREATE INDEX "scenarios_type_idx" ON "recycling_scenarios" USING btree ("scenario_type","success_rate");--> statement-breakpoint
CREATE INDEX "scenarios_public_idx" ON "recycling_scenarios" USING btree ("is_public","scenario_type");--> statement-breakpoint
CREATE INDEX "created_by_scenarios_idx" ON "recycling_scenarios" USING btree ("created_by","scenario_type");--> statement-breakpoint
CREATE UNIQUE INDEX "entity_search_unique_idx" ON "search_index" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "search_tags_idx" ON "search_index" USING btree ("tags");--> statement-breakpoint
CREATE INDEX "settings_category_idx" ON "settings" USING btree ("category","is_system");--> statement-breakpoint
CREATE UNIQUE INDEX "user_settings_unique_idx" ON "settings" USING btree ("user_id","key") WHERE user_id IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "system_settings_unique_idx" ON "settings" USING btree ("key") WHERE user_id IS NULL AND is_system = true;--> statement-breakpoint
CREATE INDEX "active_runs_idx" ON "simulation_runs" USING btree ("status","progress_percent") WHERE deleted_at IS NULL;--> statement-breakpoint
CREATE INDEX "mission_runs_idx" ON "simulation_runs" USING btree ("mission_id","created_at");--> statement-breakpoint
CREATE INDEX "status_runs_idx" ON "simulation_runs" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "user_runs_idx" ON "simulation_runs" USING btree ("created_by","created_at");--> statement-breakpoint
CREATE INDEX "scenario_runs_idx" ON "simulation_runs" USING btree ("scenario_id","created_at");--> statement-breakpoint
CREATE INDEX "active_users_idx" ON "users" USING btree ("is_active","last_login_at") WHERE deleted_at IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "user_username_idx" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" USING btree ("role","created_at");--> statement-breakpoint
CREATE INDEX "materials_category_idx" ON "waste_materials" USING btree ("category","recyclability_score");--> statement-breakpoint
CREATE INDEX "materials_name_idx" ON "waste_materials" USING btree ("name");--> statement-breakpoint
CREATE INDEX "materials_public_idx" ON "waste_materials" USING btree ("is_public","category");--> statement-breakpoint
CREATE INDEX "created_by_materials_idx" ON "waste_materials" USING btree ("created_by","category");