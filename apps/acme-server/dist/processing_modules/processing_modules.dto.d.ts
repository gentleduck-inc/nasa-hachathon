import { z } from 'zod';
export declare const moduleFiltersSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["active", "maintenance", "broken", "offline"]>>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    status?: "active" | "maintenance" | "broken" | "offline" | undefined;
    type?: string | undefined;
}, {
    status?: "active" | "maintenance" | "broken" | "offline" | undefined;
    type?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
}>;
export declare const createModuleSchema: z.ZodObject<{
    name: z.ZodString;
    module_type: z.ZodString;
    throughput_kg_per_hour: z.ZodNumber;
    power_consumption_kw: z.ZodNumber;
    efficiency_rating: z.ZodDefault<z.ZodNumber>;
    capabilities: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    efficiency_rating: number;
    module_type: string;
    power_consumption_kw: number;
    throughput_kg_per_hour: number;
    capabilities?: Record<string, any> | undefined;
}, {
    name: string;
    module_type: string;
    power_consumption_kw: number;
    throughput_kg_per_hour: number;
    capabilities?: Record<string, any> | undefined;
    efficiency_rating?: number | undefined;
}>;
export declare const updateModuleSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["active", "maintenance", "broken", "offline"]>>;
    throughput_kg_per_hour: z.ZodOptional<z.ZodNumber>;
    power_consumption_kw: z.ZodOptional<z.ZodNumber>;
    efficiency_rating: z.ZodOptional<z.ZodNumber>;
    capabilities: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    capabilities?: Record<string, any> | undefined;
    efficiency_rating?: number | undefined;
    power_consumption_kw?: number | undefined;
    status?: "active" | "maintenance" | "broken" | "offline" | undefined;
    throughput_kg_per_hour?: number | undefined;
}, {
    capabilities?: Record<string, any> | undefined;
    efficiency_rating?: number | undefined;
    power_consumption_kw?: number | undefined;
    status?: "active" | "maintenance" | "broken" | "offline" | undefined;
    throughput_kg_per_hour?: number | undefined;
}>;
export declare const maintenanceSchema: z.ZodObject<{
    maintenance_type: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    scheduled_date: z.ZodOptional<z.ZodString>;
    performed_by: z.ZodOptional<z.ZodString>;
    parts_replaced: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    duration_hours: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    maintenance_type: string;
    description?: string | undefined;
    duration_hours?: number | undefined;
    parts_replaced?: string[] | undefined;
    performed_by?: string | undefined;
    scheduled_date?: string | undefined;
}, {
    maintenance_type: string;
    description?: string | undefined;
    duration_hours?: number | undefined;
    parts_replaced?: string[] | undefined;
    performed_by?: string | undefined;
    scheduled_date?: string | undefined;
}>;
