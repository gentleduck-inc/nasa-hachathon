import { ProcessingModulesService } from './processing_modules.service';
import { CreateModuleDto, MaintenanceDto, ModuleFiltersDto, UpdateModuleDto } from './processing_modules.types';
export declare class ProcessingModulesController {
    private readonly service;
    constructor(service: ProcessingModulesService);
    list(query: ModuleFiltersDto): Promise<{
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
    getById(id: string): Promise<any>;
    create(body: CreateModuleDto): Promise<any>;
    update(id: string, body: UpdateModuleDto): Promise<any>;
    reserve(id: string): Promise<{
        token: `${string}-${string}-${string}-${string}-${string}`;
        module: any;
    } | undefined>;
    release(id: string): Promise<any>;
    maintenance(id: string, body: MaintenanceDto): Promise<any>;
}
