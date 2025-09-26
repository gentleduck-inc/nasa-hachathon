import { z } from 'zod';
export declare const createRunSchema: z.ZodObject<{
    estimated_outputs: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    input_quantities: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodNumber>, Record<string, number>, Record<string, number>>;
    module_id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    recipe_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    input_quantities: Record<string, number>;
    recipe_id: string;
    estimated_outputs?: Record<string, number> | undefined;
    module_id?: string | undefined;
}, {
    name: string;
    input_quantities: Record<string, number>;
    recipe_id: string;
    estimated_outputs?: Record<string, number> | undefined;
    module_id?: string | undefined;
}>;
export declare const runFiltersSchema: z.ZodObject<{
    date_from: z.ZodOptional<z.ZodString>;
    date_to: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
    module_id: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    recipe_id: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["queued", "running", "paused", "completed", "failed"]>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    status?: "queued" | "running" | "paused" | "completed" | "failed" | undefined;
    module_id?: string | undefined;
    recipe_id?: string | undefined;
    date_from?: string | undefined;
    date_to?: string | undefined;
}, {
    status?: "queued" | "running" | "paused" | "completed" | "failed" | undefined;
    module_id?: string | undefined;
    recipe_id?: string | undefined;
    date_from?: string | undefined;
    date_to?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
}>;
