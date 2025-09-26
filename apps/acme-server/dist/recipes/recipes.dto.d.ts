import { z } from 'zod';
export declare const createRecipeSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    energy_required_kwh: z.ZodNumber;
    input_materials: z.ZodEffects<z.ZodRecord<z.ZodEnum<["food_packaging", "clothing_fabric", "metal_components", "foam_insulation", "plastic_containers", "electronic_waste", "organic_waste", "paper_cardboard"]>, z.ZodNumber>, Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>, Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>>;
    name: z.ZodString;
    output_products: z.ZodEffects<z.ZodRecord<z.ZodEnum<["insulation_panel", "storage_container", "spare_part", "tool", "structural_beam", "protective_sheet", "filter_component", "building_brick"]>, z.ZodNumber>, Partial<Record<"insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick", number>>, Partial<Record<"insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick", number>>>;
    process_steps: z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        duration_minutes: z.ZodNumber;
        module_type: z.ZodString;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        step_number: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        module_type: string;
        description: string;
        duration_minutes: number;
        step_number: number;
        parameters?: Record<string, any> | undefined;
    }, {
        module_type: string;
        description: string;
        duration_minutes: number;
        step_number: number;
        parameters?: Record<string, any> | undefined;
    }>, "many">;
    processing_time_minutes: z.ZodNumber;
    quality_score: z.ZodDefault<z.ZodNumber>;
    required_modules: z.ZodArray<z.ZodString, "many">;
    yield_percentage: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    energy_required_kwh: number;
    input_materials: Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>;
    output_products: Partial<Record<"insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick", number>>;
    process_steps: {
        module_type: string;
        description: string;
        duration_minutes: number;
        step_number: number;
        parameters?: Record<string, any> | undefined;
    }[];
    processing_time_minutes: number;
    quality_score: number;
    required_modules: string[];
    yield_percentage: number;
    description?: string | undefined;
}, {
    name: string;
    energy_required_kwh: number;
    input_materials: Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>;
    output_products: Partial<Record<"insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick", number>>;
    process_steps: {
        module_type: string;
        description: string;
        duration_minutes: number;
        step_number: number;
        parameters?: Record<string, any> | undefined;
    }[];
    processing_time_minutes: number;
    required_modules: string[];
    description?: string | undefined;
    quality_score?: number | undefined;
    yield_percentage?: number | undefined;
}>;
export declare const updateRecipeSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    energy_required_kwh: z.ZodOptional<z.ZodNumber>;
    input_materials: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodEnum<["food_packaging", "clothing_fabric", "metal_components", "foam_insulation", "plastic_containers", "electronic_waste", "organic_waste", "paper_cardboard"]>, z.ZodNumber>, Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>, Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>>>;
    name: z.ZodOptional<z.ZodString>;
    output_products: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodEnum<["insulation_panel", "storage_container", "spare_part", "tool", "structural_beam", "protective_sheet", "filter_component", "building_brick"]>, z.ZodNumber>, Partial<Record<"insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick", number>>, Partial<Record<"insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick", number>>>>;
    process_steps: z.ZodOptional<z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        duration_minutes: z.ZodNumber;
        module_type: z.ZodString;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        step_number: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        module_type: string;
        description: string;
        duration_minutes: number;
        step_number: number;
        parameters?: Record<string, any> | undefined;
    }, {
        module_type: string;
        description: string;
        duration_minutes: number;
        step_number: number;
        parameters?: Record<string, any> | undefined;
    }>, "many">>;
    processing_time_minutes: z.ZodOptional<z.ZodNumber>;
    quality_score: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    required_modules: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    yield_percentage: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    energy_required_kwh?: number | undefined;
    input_materials?: Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>> | undefined;
    output_products?: Partial<Record<"insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick", number>> | undefined;
    process_steps?: {
        module_type: string;
        description: string;
        duration_minutes: number;
        step_number: number;
        parameters?: Record<string, any> | undefined;
    }[] | undefined;
    processing_time_minutes?: number | undefined;
    quality_score?: number | undefined;
    required_modules?: string[] | undefined;
    yield_percentage?: number | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    energy_required_kwh?: number | undefined;
    input_materials?: Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>> | undefined;
    output_products?: Partial<Record<"insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick", number>> | undefined;
    process_steps?: {
        module_type: string;
        description: string;
        duration_minutes: number;
        step_number: number;
        parameters?: Record<string, any> | undefined;
    }[] | undefined;
    processing_time_minutes?: number | undefined;
    quality_score?: number | undefined;
    required_modules?: string[] | undefined;
    yield_percentage?: number | undefined;
}>;
export declare const recipeFiltersSchema: z.ZodObject<{
    created_by: z.ZodOptional<z.ZodString>;
    input_waste_type: z.ZodOptional<z.ZodEnum<["food_packaging", "clothing_fabric", "metal_components", "foam_insulation", "plastic_containers", "electronic_waste", "organic_waste", "paper_cardboard"]>>;
    is_active: z.ZodOptional<z.ZodBoolean>;
    limit: z.ZodDefault<z.ZodNumber>;
    max_energy: z.ZodOptional<z.ZodNumber>;
    max_time: z.ZodOptional<z.ZodNumber>;
    min_yield: z.ZodOptional<z.ZodNumber>;
    output_product_type: z.ZodOptional<z.ZodEnum<["insulation_panel", "storage_container", "spare_part", "tool", "structural_beam", "protective_sheet", "filter_component", "building_brick"]>>;
    page: z.ZodDefault<z.ZodNumber>;
    required_module: z.ZodOptional<z.ZodString>;
    sort_by: z.ZodDefault<z.ZodEnum<["name", "yield_percentage", "energy_required_kwh", "processing_time_minutes", "created_at"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    sort_by: "created_at" | "name" | "energy_required_kwh" | "processing_time_minutes" | "yield_percentage";
    sort_order: "asc" | "desc";
    is_active?: boolean | undefined;
    created_by?: string | undefined;
    input_waste_type?: "food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard" | undefined;
    max_energy?: number | undefined;
    max_time?: number | undefined;
    min_yield?: number | undefined;
    output_product_type?: "insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick" | undefined;
    required_module?: string | undefined;
}, {
    is_active?: boolean | undefined;
    created_by?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
    input_waste_type?: "food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard" | undefined;
    max_energy?: number | undefined;
    max_time?: number | undefined;
    min_yield?: number | undefined;
    output_product_type?: "insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick" | undefined;
    required_module?: string | undefined;
    sort_by?: "created_at" | "name" | "energy_required_kwh" | "processing_time_minutes" | "yield_percentage" | undefined;
    sort_order?: "asc" | "desc" | undefined;
}>;
export declare const validateRecipeSchema: z.ZodObject<{
    available_modules: z.ZodArray<z.ZodString, "many">;
    available_waste: z.ZodRecord<z.ZodEnum<["food_packaging", "clothing_fabric", "metal_components", "foam_insulation", "plastic_containers", "electronic_waste", "organic_waste", "paper_cardboard"]>, z.ZodNumber>;
    energy_budget_kwh: z.ZodOptional<z.ZodNumber>;
    time_budget_minutes: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    available_modules: string[];
    available_waste: Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>;
    energy_budget_kwh?: number | undefined;
    time_budget_minutes?: number | undefined;
}, {
    available_modules: string[];
    available_waste: Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>;
    energy_budget_kwh?: number | undefined;
    time_budget_minutes?: number | undefined;
}>;
export declare const recommendationFiltersSchema: z.ZodObject<{
    available_waste: z.ZodRecord<z.ZodEnum<["food_packaging", "clothing_fabric", "metal_components", "foam_insulation", "plastic_containers", "electronic_waste", "organic_waste", "paper_cardboard"]>, z.ZodNumber>;
    desired_products: z.ZodOptional<z.ZodArray<z.ZodEnum<["insulation_panel", "storage_container", "spare_part", "tool", "structural_beam", "protective_sheet", "filter_component", "building_brick"]>, "many">>;
    max_results: z.ZodDefault<z.ZodNumber>;
    optimization_goal: z.ZodDefault<z.ZodEnum<["minimize_energy", "maximize_yield", "minimize_time"]>>;
}, "strip", z.ZodTypeAny, {
    available_waste: Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>;
    max_results: number;
    optimization_goal: "minimize_energy" | "maximize_yield" | "minimize_time";
    desired_products?: ("insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick")[] | undefined;
}, {
    available_waste: Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>;
    desired_products?: ("insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick")[] | undefined;
    max_results?: number | undefined;
    optimization_goal?: "minimize_energy" | "maximize_yield" | "minimize_time" | undefined;
}>;
