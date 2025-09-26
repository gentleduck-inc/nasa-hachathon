import { z } from 'zod';
var errorMessage = function (message) { return ({ message: message }); };
export var moduleFiltersSchema = z.object({
    type: z.string().optional(),
    status: z.enum(['active', 'maintenance', 'broken', 'offline']).optional(),
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(20),
});
export var createModuleSchema = z.object({
    name: z.string(errorMessage('ZOD_EXPECTED_STRING')).min(1, errorMessage('ZOD_TOO_SHORT')),
    module_type: z.string(errorMessage('ZOD_EXPECTED_STRING')).min(1),
    throughput_kg_per_hour: z.number(errorMessage('ZOD_EXPECTED_NUMBER')).min(0.01),
    power_consumption_kw: z.number(errorMessage('ZOD_EXPECTED_NUMBER')).min(0.01),
    efficiency_rating: z.number(errorMessage('ZOD_EXPECTED_NUMBER')).min(0).max(1).default(1),
    capabilities: z.record(z.any()).optional(),
});
export var updateModuleSchema = z.object({
    status: z.enum(['active', 'maintenance', 'broken', 'offline']).optional(),
    throughput_kg_per_hour: z.number().min(0.01).optional(),
    power_consumption_kw: z.number().min(0.01).optional(),
    efficiency_rating: z.number().min(0).max(1).optional(),
    capabilities: z.record(z.any()).optional(),
});
export var maintenanceSchema = z.object({
    maintenance_type: z.string().min(1),
    description: z.string().optional(),
    scheduled_date: z.string().datetime().optional(),
    performed_by: z.string().uuid().optional(),
    parts_replaced: z.array(z.string()).optional(),
    duration_hours: z.number().optional(),
});
//# sourceMappingURL=processing_modules.dto.js.map