import { WasteMessages } from './waste_inventory.constants';
export type WasteMessagesType = (typeof WasteMessages)[number];
declare const CreateWasteInventoryDto_base: import("nestjs-zod").ZodDto<{
    name: string;
    category: "food_packaging" | "plastics" | "metals" | "foam" | "textiles" | "composites" | "eva_waste" | "structural_elements" | "bubble_wrap" | "nitrile_gloves" | "other";
    properties?: Record<string, any> | undefined;
    description?: string | undefined;
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
    category: "food_packaging" | "plastics" | "metals" | "foam" | "textiles" | "composites" | "eva_waste" | "structural_elements" | "bubble_wrap" | "nitrile_gloves" | "other";
    properties?: Record<string, any> | undefined;
    description?: string | undefined;
    composition?: Record<string, any> | undefined;
    density_kg_per_m3?: number | undefined;
}>;
export declare class CreateWasteInventoryDto extends CreateWasteInventoryDto_base {
}
declare const UpdateWasteInventoryDto_base: import("nestjs-zod").ZodDto<{
    name?: string | undefined;
    properties?: Record<string, any> | undefined;
    description?: string | undefined;
    category?: "food_packaging" | "plastics" | "metals" | "foam" | "textiles" | "composites" | "eva_waste" | "structural_elements" | "bubble_wrap" | "nitrile_gloves" | "other" | undefined;
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
    name?: string | undefined;
    properties?: Record<string, any> | undefined;
    description?: string | undefined;
    category?: "food_packaging" | "plastics" | "metals" | "foam" | "textiles" | "composites" | "eva_waste" | "structural_elements" | "bubble_wrap" | "nitrile_gloves" | "other" | undefined;
    composition?: Record<string, any> | undefined;
    density_kg_per_m3?: number | undefined;
}>;
export declare class UpdateWasteInventoryDto extends UpdateWasteInventoryDto_base {
}
export {};
