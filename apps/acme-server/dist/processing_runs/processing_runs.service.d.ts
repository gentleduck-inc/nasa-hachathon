import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '~/drizzle';
interface CreateRunInput {
    name: string;
    recipe_id: string;
    module_id?: string;
    input_quantities: Record<string, number>;
    estimated_outputs?: Record<string, number>;
    idempotencyKey: string;
}
interface RunFilters {
    status?: 'queued' | 'running' | 'paused' | 'completed' | 'failed';
    module_id?: string;
    recipe_id?: string;
    date_from?: string;
    date_to?: string;
    page?: number;
    limit?: number;
}
export declare class ProcessingRunsService {
    private db;
    constructor(db: NodePgDatabase<typeof schema>);
    createRun(input: CreateRunInput): Promise<{
        created_at: Date;
        name: string;
        id: string;
        updated_at: Date;
        status: "queued" | "running" | "paused" | "completed" | "failed";
        created_by: string | null;
        actual_outputs: unknown;
        completed_at: Date | null;
        energy_consumed_kwh: string | null;
        error_message: string | null;
        estimated_outputs: unknown;
        input_quantities: unknown;
        module_id: string;
        operator_notes: string | null;
        progress_percent: number | null;
        quality_check_passed: boolean | null;
        recipe_id: string;
        started_at: Date | null;
    } | undefined>;
    listRuns(filters: RunFilters): Promise<{
        items: {
            actual_outputs: unknown;
            completed_at: Date | null;
            created_at: Date;
            created_by: string | null;
            energy_consumed_kwh: string | null;
            error_message: string | null;
            estimated_outputs: unknown;
            id: string;
            input_quantities: unknown;
            module_id: string;
            name: string;
            operator_notes: string | null;
            progress_percent: number | null;
            quality_check_passed: boolean | null;
            recipe_id: string;
            started_at: Date | null;
            status: "queued" | "running" | "paused" | "completed" | "failed";
            updated_at: Date;
        }[];
        pagination: {
            has_next: boolean;
            has_previous: boolean;
            limit: number;
            page: number;
            total: number;
            total_pages: number;
        };
    } | undefined>;
    getRunById(id: string): Promise<{
        logs: any[];
        steps: never[];
        created_at: Date;
        name: string;
        id: string;
        updated_at: Date;
        status: "queued" | "running" | "paused" | "completed" | "failed";
        created_by: string | null;
        actual_outputs: unknown;
        completed_at: Date | null;
        energy_consumed_kwh: string | null;
        error_message: string | null;
        estimated_outputs: unknown;
        input_quantities: unknown;
        module_id: string;
        operator_notes: string | null;
        progress_percent: number | null;
        quality_check_passed: boolean | null;
        recipe_id: string;
        started_at: Date | null;
    } | undefined>;
    cancelRun(id: string): Promise<{
        actual_outputs: unknown;
        completed_at: Date | null;
        created_at: Date;
        created_by: string | null;
        energy_consumed_kwh: string | null;
        error_message: string | null;
        estimated_outputs: unknown;
        id: string;
        input_quantities: unknown;
        module_id: string;
        name: string;
        operator_notes: string | null;
        progress_percent: number | null;
        quality_check_passed: boolean | null;
        recipe_id: string;
        started_at: Date | null;
        status: "queued" | "running" | "paused" | "completed" | "failed";
        updated_at: Date;
    } | undefined>;
    retryRun(id: string): Promise<{
        actual_outputs: unknown;
        completed_at: Date | null;
        created_at: Date;
        created_by: string | null;
        energy_consumed_kwh: string | null;
        error_message: string | null;
        estimated_outputs: unknown;
        id: string;
        input_quantities: unknown;
        module_id: string;
        name: string;
        operator_notes: string | null;
        progress_percent: number | null;
        quality_check_passed: boolean | null;
        recipe_id: string;
        started_at: Date | null;
        status: "queued" | "running" | "paused" | "completed" | "failed";
        updated_at: Date;
    } | undefined>;
    getLogs(id: string): Promise<any[] | undefined>;
    private buildFilters;
}
export {};
