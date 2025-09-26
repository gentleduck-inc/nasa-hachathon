import type { ResponseType } from '~/common/types';
import { WasteInventorysService } from './waste_inventory.service';
import { CreateWasteInventoryDto, UpdateWasteInventoryDto } from './waste_inventory.types';
export declare class WasteInventorysController {
    private readonly wasteInventorysService;
    constructor(wasteInventorysService: WasteInventorysService);
    createWasteInventory(body: CreateWasteInventoryDto): Promise<ResponseType<Awaited<ReturnType<typeof this.wasteInventorysService.createWasteInventory>>, any>>;
    getWasteInventorys(): Promise<{
        data: {
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
        }[] | undefined;
        message: string;
        state: string;
    }>;
    getWasteInventoryById(id: string): Promise<{
        data: {
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
        } | undefined;
        message: string;
        state: string;
    }>;
    updateWasteInventory(id: string, body: UpdateWasteInventoryDto): Promise<{
        data: {
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
        } | undefined;
        message: string;
        state: string;
    }>;
    deleteWasteInventory(id: string): Promise<{
        data: {
            id: string;
        } | undefined;
        message: string;
        state: string;
    }>;
}
