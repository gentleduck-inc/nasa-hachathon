import { ProductInventoryService } from './product_inventory.service';
export declare class ProductInventoryController {
    private readonly productInventoryService;
    constructor(productInventoryService: ProductInventoryService);
    list(query: {
        page?: number;
        limit?: number;
        product_type?: string;
        location?: string;
        available?: boolean;
    }): Promise<{
        items: any[];
        pagination: {
            has_next: boolean;
            has_previous: boolean;
            limit: number;
            page: number;
            total: number;
            total_pages: number;
        };
    } | undefined>;
    add(body: {
        product_type: string;
        quantity: number;
        total_mass_kg: string | number;
        location: string;
        quality_score?: number;
        production_run_id?: string;
        properties?: Record<string, any>;
    }): Promise<any>;
    reserve(id: string, body: {
        amount: number;
    }): Promise<any>;
    consume(id: string, body: {
        amount: number;
    }): Promise<any>;
    availability(): Promise<{
        available: unknown;
        product_type: "insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick";
        total_quantity: unknown;
    }[] | undefined>;
    locations(): Promise<{
        count: unknown;
        location: string;
        total_quantity: unknown;
    }[] | undefined>;
}
