import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '~/drizzle';
export declare class ProductInventoryService {
    private db;
    constructor(db: NodePgDatabase<typeof schema>);
    list(params: {
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
    addProduct(body: {
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
    availabilityByType(): Promise<{
        available: unknown;
        product_type: "insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick";
        total_quantity: unknown;
    }[] | undefined>;
    distributionByLocation(): Promise<{
        count: unknown;
        location: string;
        total_quantity: unknown;
    }[] | undefined>;
    private buildFilters;
    private format;
}
