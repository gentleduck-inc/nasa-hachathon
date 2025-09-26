import { ProcessingModulesMessages } from './processing_modules.constants';
export type ProcessingModulesMessagesType = (typeof ProcessingModulesMessages)[number];
declare const ModuleFiltersDto_base: import("nestjs-zod").ZodDto<{
    limit: number;
    page: number;
    status?: "active" | "maintenance" | "broken" | "offline" | undefined;
    type?: string | undefined;
}, import("zod").ZodObjectDef<{
    type: import("zod").ZodOptional<import("zod").ZodString>;
    status: import("zod").ZodOptional<import("zod").ZodEnum<["active", "maintenance", "broken", "offline"]>>;
    page: import("zod").ZodDefault<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny>, {
    status?: "active" | "maintenance" | "broken" | "offline" | undefined;
    type?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
}>;
export declare class ModuleFiltersDto extends ModuleFiltersDto_base {
}
declare const CreateModuleDto_base: import("nestjs-zod").ZodDto<{
    name: string;
    efficiency_rating: number;
    module_type: string;
    power_consumption_kw: number;
    throughput_kg_per_hour: number;
    capabilities?: Record<string, any> | undefined;
}, import("zod").ZodObjectDef<{
    name: import("zod").ZodString;
    module_type: import("zod").ZodString;
    throughput_kg_per_hour: import("zod").ZodNumber;
    power_consumption_kw: import("zod").ZodNumber;
    efficiency_rating: import("zod").ZodDefault<import("zod").ZodNumber>;
    capabilities: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>;
}, "strip", import("zod").ZodTypeAny>, {
    name: string;
    module_type: string;
    power_consumption_kw: number;
    throughput_kg_per_hour: number;
    capabilities?: Record<string, any> | undefined;
    efficiency_rating?: number | undefined;
}>;
export declare class CreateModuleDto extends CreateModuleDto_base {
}
declare const UpdateModuleDto_base: import("nestjs-zod").ZodDto<{
    capabilities?: Record<string, any> | undefined;
    efficiency_rating?: number | undefined;
    power_consumption_kw?: number | undefined;
    status?: "active" | "maintenance" | "broken" | "offline" | undefined;
    throughput_kg_per_hour?: number | undefined;
}, import("zod").ZodObjectDef<{
    status: import("zod").ZodOptional<import("zod").ZodEnum<["active", "maintenance", "broken", "offline"]>>;
    throughput_kg_per_hour: import("zod").ZodOptional<import("zod").ZodNumber>;
    power_consumption_kw: import("zod").ZodOptional<import("zod").ZodNumber>;
    efficiency_rating: import("zod").ZodOptional<import("zod").ZodNumber>;
    capabilities: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>;
}, "strip", import("zod").ZodTypeAny>, {
    capabilities?: Record<string, any> | undefined;
    efficiency_rating?: number | undefined;
    power_consumption_kw?: number | undefined;
    status?: "active" | "maintenance" | "broken" | "offline" | undefined;
    throughput_kg_per_hour?: number | undefined;
}>;
export declare class UpdateModuleDto extends UpdateModuleDto_base {
}
declare const MaintenanceDto_base: import("nestjs-zod").ZodDto<{
    maintenance_type: string;
    description?: string | undefined;
    duration_hours?: number | undefined;
    parts_replaced?: string[] | undefined;
    performed_by?: string | undefined;
    scheduled_date?: string | undefined;
}, import("zod").ZodObjectDef<{
    maintenance_type: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    scheduled_date: import("zod").ZodOptional<import("zod").ZodString>;
    performed_by: import("zod").ZodOptional<import("zod").ZodString>;
    parts_replaced: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    duration_hours: import("zod").ZodOptional<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny>, {
    maintenance_type: string;
    description?: string | undefined;
    duration_hours?: number | undefined;
    parts_replaced?: string[] | undefined;
    performed_by?: string | undefined;
    scheduled_date?: string | undefined;
}>;
export declare class MaintenanceDto extends MaintenanceDto_base {
}
export {};
