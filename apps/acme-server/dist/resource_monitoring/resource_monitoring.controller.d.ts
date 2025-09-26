import { ResourceMonitoringService } from './resource_monitoring.service';
export declare class ResourceMonitoringController {
    private readonly resourceMonitoringService;
    constructor(resourceMonitoringService: ResourceMonitoringService);
    listUsage(query: {
        page?: number;
        limit?: number;
        resource_type?: string;
        module_id?: string;
        processing_run_id?: string;
        start_date?: string;
        end_date?: string;
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
    createUsage(body: {
        resource_type: string;
        quantity_used: number | string;
        unit: string;
        usage_date: string;
        module_id?: string;
        processing_run_id?: string;
        cost_estimate?: number | string;
    }): Promise<any>;
    dailySummary(query: {
        start_date?: string;
        end_date?: string;
    }): Promise<{
        energy_consumed_kwh: number;
        module_uptime_percent: number;
        processing_efficiency: number;
        products_created_count: number;
        waste_processed_kg: number;
        created_at: Date;
        id: string;
        metric_date: Date;
        products_by_type: unknown;
        quality_score_average: number | null;
        waste_types_processed: unknown;
    }[] | undefined>;
    efficiency(query: {
        start_date?: string;
        end_date?: string;
    }): Promise<{
        date: Date;
        module_uptime_percent: number;
        processing_efficiency: number;
        quality: number;
    }[] | undefined>;
    forecasting(query: {
        days_ahead?: number;
    }): Promise<{
        based_on_days: number;
        forecast: {
            date: Date;
            energy_consumed_kwh: number;
            processing_efficiency: number;
        }[];
    } | undefined>;
}
