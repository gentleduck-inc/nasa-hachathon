import { ProcessingRunsMessages } from './processing_runs.constants';
export type ProcessingRunsMessagesType = (typeof ProcessingRunsMessages)[number];
declare const CreateRunDto_base: import("nestjs-zod").ZodDto<{
    name: string;
    input_quantities: Record<string, number>;
    recipe_id: string;
    estimated_outputs?: Record<string, number> | undefined;
    module_id?: string | undefined;
}, import("zod").ZodObjectDef<{
    estimated_outputs: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodNumber>>;
    input_quantities: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodNumber>, Record<string, number>, Record<string, number>>;
    module_id: import("zod").ZodOptional<import("zod").ZodString>;
    name: import("zod").ZodString;
    recipe_id: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    name: string;
    input_quantities: Record<string, number>;
    recipe_id: string;
    estimated_outputs?: Record<string, number> | undefined;
    module_id?: string | undefined;
}>;
export declare class CreateRunDto extends CreateRunDto_base {
}
declare const RunFiltersDto_base: import("nestjs-zod").ZodDto<{
    limit: number;
    page: number;
    status?: "queued" | "running" | "paused" | "completed" | "failed" | undefined;
    module_id?: string | undefined;
    recipe_id?: string | undefined;
    date_from?: string | undefined;
    date_to?: string | undefined;
}, import("zod").ZodObjectDef<{
    date_from: import("zod").ZodOptional<import("zod").ZodString>;
    date_to: import("zod").ZodOptional<import("zod").ZodString>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
    module_id: import("zod").ZodOptional<import("zod").ZodString>;
    page: import("zod").ZodDefault<import("zod").ZodNumber>;
    recipe_id: import("zod").ZodOptional<import("zod").ZodString>;
    status: import("zod").ZodOptional<import("zod").ZodEnum<["queued", "running", "paused", "completed", "failed"]>>;
}, "strip", import("zod").ZodTypeAny>, {
    status?: "queued" | "running" | "paused" | "completed" | "failed" | undefined;
    module_id?: string | undefined;
    recipe_id?: string | undefined;
    date_from?: string | undefined;
    date_to?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
}>;
export declare class RunFiltersDto extends RunFiltersDto_base {
}
export {};
