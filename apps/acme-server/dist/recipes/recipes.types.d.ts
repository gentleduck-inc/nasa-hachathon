import { RecipesMessages } from './recipes.constants';
export type RecipesMessagesType = (typeof RecipesMessages)[number];
declare const CreateRecipeDto_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodObjectDef<{
    description: import("zod").ZodOptional<import("zod").ZodString>;
    energy_required_kwh: import("zod").ZodNumber;
    input_materials: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodEnum<["food_packaging", "clothing_fabric", "metal_components", "foam_insulation", "plastic_containers", "electronic_waste", "organic_waste", "paper_cardboard"]>, import("zod").ZodNumber>, Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>, Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>>;
    name: import("zod").ZodString;
    output_products: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodEnum<["insulation_panel", "storage_container", "spare_part", "tool", "structural_beam", "protective_sheet", "filter_component", "building_brick"]>, import("zod").ZodNumber>, Partial<Record<"insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick", number>>, Partial<Record<"insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick", number>>>;
    process_steps: import("zod").ZodArray<import("zod").ZodObject<{
        description: import("zod").ZodString;
        duration_minutes: import("zod").ZodNumber;
        module_type: import("zod").ZodString;
        parameters: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>;
        step_number: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
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
    processing_time_minutes: import("zod").ZodNumber;
    quality_score: import("zod").ZodDefault<import("zod").ZodNumber>;
    required_modules: import("zod").ZodArray<import("zod").ZodString, "many">;
    yield_percentage: import("zod").ZodDefault<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny>, {
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
export declare class CreateRecipeDto extends CreateRecipeDto_base {
}
declare const UpdateRecipeDto_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodObjectDef<{
    description: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodString>>;
    energy_required_kwh: import("zod").ZodOptional<import("zod").ZodNumber>;
    input_materials: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodEnum<["food_packaging", "clothing_fabric", "metal_components", "foam_insulation", "plastic_containers", "electronic_waste", "organic_waste", "paper_cardboard"]>, import("zod").ZodNumber>, Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>, Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>>>;
    name: import("zod").ZodOptional<import("zod").ZodString>;
    output_products: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodEnum<["insulation_panel", "storage_container", "spare_part", "tool", "structural_beam", "protective_sheet", "filter_component", "building_brick"]>, import("zod").ZodNumber>, Partial<Record<"insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick", number>>, Partial<Record<"insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick", number>>>>;
    process_steps: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
        description: import("zod").ZodString;
        duration_minutes: import("zod").ZodNumber;
        module_type: import("zod").ZodString;
        parameters: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>;
        step_number: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
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
    processing_time_minutes: import("zod").ZodOptional<import("zod").ZodNumber>;
    quality_score: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
    required_modules: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    yield_percentage: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
}, "strip", import("zod").ZodTypeAny>, {
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
export declare class UpdateRecipeDto extends UpdateRecipeDto_base {
}
declare const RecipeFiltersDto_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodObjectDef<{
    created_by: import("zod").ZodOptional<import("zod").ZodString>;
    input_waste_type: import("zod").ZodOptional<import("zod").ZodEnum<["food_packaging", "clothing_fabric", "metal_components", "foam_insulation", "plastic_containers", "electronic_waste", "organic_waste", "paper_cardboard"]>>;
    is_active: import("zod").ZodOptional<import("zod").ZodBoolean>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
    max_energy: import("zod").ZodOptional<import("zod").ZodNumber>;
    max_time: import("zod").ZodOptional<import("zod").ZodNumber>;
    min_yield: import("zod").ZodOptional<import("zod").ZodNumber>;
    output_product_type: import("zod").ZodOptional<import("zod").ZodEnum<["insulation_panel", "storage_container", "spare_part", "tool", "structural_beam", "protective_sheet", "filter_component", "building_brick"]>>;
    page: import("zod").ZodDefault<import("zod").ZodNumber>;
    required_module: import("zod").ZodOptional<import("zod").ZodString>;
    sort_by: import("zod").ZodDefault<import("zod").ZodEnum<["name", "yield_percentage", "energy_required_kwh", "processing_time_minutes", "created_at"]>>;
    sort_order: import("zod").ZodDefault<import("zod").ZodEnum<["asc", "desc"]>>;
}, "strip", import("zod").ZodTypeAny>, {
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
export declare class RecipeFiltersDto extends RecipeFiltersDto_base {
}
declare const ValidateRecipeDto_base: import("nestjs-zod").ZodDto<{
    available_modules: string[];
    available_waste: Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>;
    energy_budget_kwh?: number | undefined;
    time_budget_minutes?: number | undefined;
}, import("zod").ZodObjectDef<{
    available_modules: import("zod").ZodArray<import("zod").ZodString, "many">;
    available_waste: import("zod").ZodRecord<import("zod").ZodEnum<["food_packaging", "clothing_fabric", "metal_components", "foam_insulation", "plastic_containers", "electronic_waste", "organic_waste", "paper_cardboard"]>, import("zod").ZodNumber>;
    energy_budget_kwh: import("zod").ZodOptional<import("zod").ZodNumber>;
    time_budget_minutes: import("zod").ZodOptional<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny>, {
    available_modules: string[];
    available_waste: Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>;
    energy_budget_kwh?: number | undefined;
    time_budget_minutes?: number | undefined;
}>;
export declare class ValidateRecipeDto extends ValidateRecipeDto_base {
}
declare const RecommendationFiltersDto_base: import("nestjs-zod").ZodDto<{
    available_waste: Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>;
    max_results: number;
    optimization_goal: "minimize_energy" | "maximize_yield" | "minimize_time";
    desired_products?: ("insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick")[] | undefined;
}, import("zod").ZodObjectDef<{
    available_waste: import("zod").ZodRecord<import("zod").ZodEnum<["food_packaging", "clothing_fabric", "metal_components", "foam_insulation", "plastic_containers", "electronic_waste", "organic_waste", "paper_cardboard"]>, import("zod").ZodNumber>;
    desired_products: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodEnum<["insulation_panel", "storage_container", "spare_part", "tool", "structural_beam", "protective_sheet", "filter_component", "building_brick"]>, "many">>;
    max_results: import("zod").ZodDefault<import("zod").ZodNumber>;
    optimization_goal: import("zod").ZodDefault<import("zod").ZodEnum<["minimize_energy", "maximize_yield", "minimize_time"]>>;
}, "strip", import("zod").ZodTypeAny>, {
    available_waste: Partial<Record<"food_packaging" | "clothing_fabric" | "metal_components" | "foam_insulation" | "plastic_containers" | "electronic_waste" | "organic_waste" | "paper_cardboard", number>>;
    desired_products?: ("insulation_panel" | "storage_container" | "spare_part" | "tool" | "structural_beam" | "protective_sheet" | "filter_component" | "building_brick")[] | undefined;
    max_results?: number | undefined;
    optimization_goal?: "minimize_energy" | "maximize_yield" | "minimize_time" | undefined;
}>;
export declare class RecommendationFiltersDto extends RecommendationFiltersDto_base {
}
export interface RecipeItem {
    id: string;
    name: string;
    description?: string;
    input_materials: Record<string, number>;
    output_products: Record<string, number>;
    processing_time_minutes: number;
    energy_required_kwh: number;
    required_modules: string[];
    yield_percentage: number;
    quality_score: number;
    process_steps: Array<{
        step_number: number;
        description: string;
        duration_minutes: number;
        module_type: string;
        parameters?: Record<string, any>;
    }>;
    created_by?: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    efficiency_score: number;
    usage_count: number;
}
export interface RecipeValidation {
    is_feasible: boolean;
    validation_results: {
        materials_available: boolean;
        modules_available: boolean;
        energy_sufficient: boolean;
        time_sufficient: boolean;
    };
    missing_requirements: {
        materials?: Record<string, number>;
        modules?: string[];
        additional_energy_kwh?: number;
        additional_time_minutes?: number;
    };
    estimated_outputs: Record<string, number>;
    resource_utilization: {
        energy_percent: number;
        time_percent: number;
    };
}
export interface RecipeRecommendation {
    recipe_id: string;
    recipe_name: string;
    suitability_score: number;
    reasoning: string;
    estimated_outputs: Record<string, number>;
    resource_requirements: {
        energy_kwh: number;
        time_minutes: number;
        modules: string[];
    };
    waste_utilization: Record<string, number>;
}
export {};
