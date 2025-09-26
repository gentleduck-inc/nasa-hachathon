var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { z } from 'zod';
var errorMessage = function (message) { return ({ message: message }); };
var PRODUCT_TYPES = [
    'insulation_panel',
    'storage_container',
    'spare_part',
    'tool',
    'structural_beam',
    'protective_sheet',
    'filter_component',
    'building_brick',
];
var WASTE_TYPES = [
    'food_packaging',
    'clothing_fabric',
    'metal_components',
    'foam_insulation',
    'plastic_containers',
    'electronic_waste',
    'organic_waste',
    'paper_cardboard',
];
export var createRecipeSchema = z.object({
    description: z.string(__assign({}, errorMessage('ZOD_EXPECTED_STRING'))).optional(),
    energy_required_kwh: z
        .number(__assign({}, errorMessage('ZOD_EXPECTED_NUMBER')))
        .min(0.1, __assign({}, errorMessage('ZOD_TOO_SHORT')))
        .max(1000, __assign({}, errorMessage('ZOD_TOO_LONG'))),
    input_materials: z
        .record(z.enum(WASTE_TYPES), z.number().min(0.1).max(1000))
        .refine(function (obj) { return Object.keys(obj).length > 0; }, { message: 'At least one input material required' }),
    name: z
        .string(__assign({}, errorMessage('ZOD_EXPECTED_STRING')))
        .min(1, __assign({}, errorMessage('ZOD_TOO_SHORT')))
        .max(200, __assign({}, errorMessage('ZOD_TOO_LONG'))),
    output_products: z
        .record(z.enum(PRODUCT_TYPES), z.number().min(0.1).max(1000))
        .refine(function (obj) { return Object.keys(obj).length > 0; }, { message: 'At least one output product required' }),
    process_steps: z
        .array(z.object({
        description: z.string(),
        duration_minutes: z.number().min(1),
        module_type: z.string(),
        parameters: z.record(z.any()).optional(),
        step_number: z.number(),
    }))
        .min(1),
    processing_time_minutes: z
        .number(__assign({}, errorMessage('ZOD_EXPECTED_NUMBER')))
        .min(1, __assign({}, errorMessage('ZOD_TOO_SHORT')))
        .max(1440, __assign({}, errorMessage('ZOD_TOO_LONG'))),
    quality_score: z
        .number(__assign({}, errorMessage('ZOD_EXPECTED_NUMBER')))
        .min(0.1, __assign({}, errorMessage('ZOD_TOO_SHORT')))
        .max(1.0, __assign({}, errorMessage('ZOD_TOO_LONG')))
        .default(1.0),
    required_modules: z.array(z.string()).min(1, { message: 'At least one module required' }),
    yield_percentage: z
        .number(__assign({}, errorMessage('ZOD_EXPECTED_NUMBER')))
        .min(0.1, __assign({}, errorMessage('ZOD_TOO_SHORT')))
        .max(1.0, __assign({}, errorMessage('ZOD_TOO_LONG')))
        .default(0.85),
});
export var updateRecipeSchema = createRecipeSchema.partial();
export var recipeFiltersSchema = z.object({
    created_by: z.string().uuid().optional(),
    input_waste_type: z.enum(WASTE_TYPES).optional(),
    is_active: z.boolean().optional(),
    limit: z.number().min(1).max(100).default(20),
    max_energy: z.number().min(0).optional(),
    max_time: z.number().min(0).optional(),
    min_yield: z.number().min(0).max(1).optional(),
    output_product_type: z.enum(PRODUCT_TYPES).optional(),
    page: z.number().min(1).default(1),
    required_module: z.string().optional(),
    sort_by: z
        .enum(['name', 'yield_percentage', 'energy_required_kwh', 'processing_time_minutes', 'created_at'])
        .default('created_at'),
    sort_order: z.enum(['asc', 'desc']).default('desc'),
});
export var validateRecipeSchema = z.object({
    available_modules: z.array(z.string()),
    available_waste: z.record(z.enum(WASTE_TYPES), z.number().min(0)),
    energy_budget_kwh: z.number().min(0).optional(),
    time_budget_minutes: z.number().min(0).optional(),
});
export var recommendationFiltersSchema = z.object({
    available_waste: z.record(z.enum(WASTE_TYPES), z.number().min(0)),
    desired_products: z.array(z.enum(PRODUCT_TYPES)).optional(),
    max_results: z.number().min(1).max(20).default(10),
    optimization_goal: z.enum(['minimize_energy', 'maximize_yield', 'minimize_time']).default('maximize_yield'),
});
//# sourceMappingURL=recipes.dto.js.map