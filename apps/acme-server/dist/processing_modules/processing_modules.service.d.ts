import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '~/drizzle';
interface ModuleFilters {
    type?: string;
    status?: 'active' | 'maintenance' | 'broken' | 'offline';
    page?: number;
    limit?: number;
}
interface CreateModuleInput {
    name: string;
    module_type: string;
    throughput_kg_per_hour: number;
    power_consumption_kw: number;
    efficiency_rating?: number;
    capabilities?: Record<string, any>;
}
interface UpdateModuleInput {
    status?: 'active' | 'maintenance' | 'broken' | 'offline';
    throughput_kg_per_hour?: number;
    power_consumption_kw?: number;
    efficiency_rating?: number;
    capabilities?: Record<string, any>;
}
interface MaintenanceInput {
    maintenance_type: string;
    description?: string;
    scheduled_date?: string;
    performed_by?: string;
    parts_replaced?: string[];
    duration_hours?: number;
}
export declare class ProcessingModulesService {
    private db;
    constructor(db: NodePgDatabase<typeof schema>);
    listModules(filters: ModuleFilters): Promise<{
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
    getModuleById(id: string): Promise<any>;
    createModule(input: CreateModuleInput): Promise<any>;
    updateModule(id: string, input: UpdateModuleInput): Promise<any>;
    reserveModule(id: string): Promise<{
        token: `${string}-${string}-${string}-${string}-${string}`;
        module: any;
    } | undefined>;
    releaseModule(id: string): Promise<any>;
    setMaintenance(id: string, input: MaintenanceInput): Promise<any>;
    private buildFilters;
    private format;
}
export {};
