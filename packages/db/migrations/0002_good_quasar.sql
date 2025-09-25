ALTER TABLE "waste_materials" DROP CONSTRAINT "waste_materials_created_by_users_id_fk";
--> statement-breakpoint
DROP INDEX "created_by_materials_idx";--> statement-breakpoint
ALTER TABLE "waste_materials" DROP COLUMN "created_by";