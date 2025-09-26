import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '~/drizzle';
import { CreateWasteInventoryDto, UpdateWasteInventoryDto } from './waste_inventory.types';
export declare class WasteInventorysService {
    private db;
    constructor(db: NodePgDatabase<typeof schema>);
    createWasteInventory(data: CreateWasteInventoryDto): Promise<{
        waste_type: "food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard";
        created_at: Date;
        id: string;
        updated_at: Date;
        contamination_level: number | null;
        date_collected: Date;
        expiry_date: Date | null;
        location: string;
        properties: unknown;
        quality_grade: string | null;
        quantity_kg: string;
        version: number;
    } | undefined>;
    getWasteInventorys(): Promise<{
        waste_type: "food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard";
        created_at: Date;
        id: string;
        updated_at: Date;
        contamination_level: number | null;
        date_collected: Date;
        expiry_date: Date | null;
        location: string;
        properties: unknown;
        quality_grade: string | null;
        quantity_kg: string;
        version: number;
    }[] | undefined>;
    getWasteInventoryById(id: string): Promise<{
        waste_type: "food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard";
        created_at: Date;
        id: string;
        updated_at: Date;
        contamination_level: number | null;
        date_collected: Date;
        expiry_date: Date | null;
        location: string;
        properties: unknown;
        quality_grade: string | null;
        quantity_kg: string;
        version: number;
    } | undefined>;
    updateWasteInventory(data: UpdateWasteInventoryDto & {
        id: string;
    }): Promise<{
        contamination_level: number | null;
        created_at: Date;
        date_collected: Date;
        expiry_date: Date | null;
        id: string;
        location: string;
        properties: unknown;
        quality_grade: string | null;
        quantity_kg: string;
        updated_at: Date;
        version: number;
        waste_type: "food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard";
    } | undefined>;
    deleteWasteInventory(id: string): Promise<{
        id: string;
    } | undefined>;
}
