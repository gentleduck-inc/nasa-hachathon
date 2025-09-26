import { WasteMessages } from './waste_materials.constants';
export type WasteMessagesType = (typeof WasteMessages)[number];
declare const CreateWasteMaterialDto_base: import("nestjs-zod").ZodDto<{
    name: string;
    category: "food_packaging" | "other" | "plastics" | "metals" | "foam" | "textiles" | "composites" | "eva_waste" | "structural_elements" | "bubble_wrap" | "nitrile_gloves";
    description?: string | undefined;
    properties?: Record<string, any> | undefined;
    composition?: Record<string, any> | undefined;
    density_kg_per_m3?: number | undefined;
}, import("zod").ZodObjectDef<{
    category: import("zod").ZodEnum<["plastics", "metals", "foam", "textiles", "composites", "eva_waste", "food_packaging", "structural_elements", "bubble_wrap", "nitrile_gloves", "other"]>;
    composition: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>;
    density_kg_per_m3: import("zod").ZodOptional<import("zod").ZodNumber>;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    name: import("zod").ZodString;
    properties: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>;
}, "strip", import("zod").ZodTypeAny>, {
    name: string;
    category: "food_packaging" | "other" | "plastics" | "metals" | "foam" | "textiles" | "composites" | "eva_waste" | "structural_elements" | "bubble_wrap" | "nitrile_gloves";
    description?: string | undefined;
    properties?: Record<string, any> | undefined;
    composition?: Record<string, any> | undefined;
    density_kg_per_m3?: number | undefined;
}>;
export declare class CreateWasteMaterialDto extends CreateWasteMaterialDto_base {
}
declare const UpdateWasteMaterialDto_base: import("nestjs-zod").ZodDto<{
    description?: string | undefined;
    name?: string | undefined;
    properties?: Record<string, any> | undefined;
    category?: "food_packaging" | "other" | "plastics" | "metals" | "foam" | "textiles" | "composites" | "eva_waste" | "structural_elements" | "bubble_wrap" | "nitrile_gloves" | undefined;
    composition?: Record<string, any> | undefined;
    density_kg_per_m3?: number | undefined;
}, import("zod").ZodObjectDef<{
    category: import("zod").ZodOptional<import("zod").ZodEnum<["plastics", "metals", "foam", "textiles", "composites", "eva_waste", "food_packaging", "structural_elements", "bubble_wrap", "nitrile_gloves", "other"]>>;
    composition: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>>;
    density_kg_per_m3: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNumber>>;
    description: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodString>>;
    name: import("zod").ZodOptional<import("zod").ZodString>;
    properties: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>>;
}, "strip", import("zod").ZodTypeAny>, {
    description?: string | undefined;
    name?: string | undefined;
    properties?: Record<string, any> | undefined;
    category?: "food_packaging" | "other" | "plastics" | "metals" | "foam" | "textiles" | "composites" | "eva_waste" | "structural_elements" | "bubble_wrap" | "nitrile_gloves" | undefined;
    composition?: Record<string, any> | undefined;
    density_kg_per_m3?: number | undefined;
}>;
export declare class UpdateWasteMaterialDto extends UpdateWasteMaterialDto_base {
}
export {};
