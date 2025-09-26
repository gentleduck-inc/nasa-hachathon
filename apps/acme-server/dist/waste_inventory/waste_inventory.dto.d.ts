import { z } from 'zod';
export declare const createWasteInventorySchema: z.ZodObject<{
    category: z.ZodEnum<["plastics", "metals", "foam", "textiles", "composites", "eva_waste", "food_packaging", "structural_elements", "bubble_wrap", "nitrile_gloves", "other"]>;
    composition: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    density_kg_per_m3: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    category: "food_packaging" | "plastics" | "metals" | "foam" | "textiles" | "composites" | "eva_waste" | "structural_elements" | "bubble_wrap" | "nitrile_gloves" | "other";
    properties?: Record<string, any> | undefined;
    description?: string | undefined;
    composition?: Record<string, any> | undefined;
    density_kg_per_m3?: number | undefined;
}, {
    name: string;
    category: "food_packaging" | "plastics" | "metals" | "foam" | "textiles" | "composites" | "eva_waste" | "structural_elements" | "bubble_wrap" | "nitrile_gloves" | "other";
    properties?: Record<string, any> | undefined;
    description?: string | undefined;
    composition?: Record<string, any> | undefined;
    density_kg_per_m3?: number | undefined;
}>;
export declare const updateWasteInventorySchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodEnum<["plastics", "metals", "foam", "textiles", "composites", "eva_waste", "food_packaging", "structural_elements", "bubble_wrap", "nitrile_gloves", "other"]>>;
    composition: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    density_kg_per_m3: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    name: z.ZodOptional<z.ZodString>;
    properties: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    properties?: Record<string, any> | undefined;
    description?: string | undefined;
    category?: "food_packaging" | "plastics" | "metals" | "foam" | "textiles" | "composites" | "eva_waste" | "structural_elements" | "bubble_wrap" | "nitrile_gloves" | "other" | undefined;
    composition?: Record<string, any> | undefined;
    density_kg_per_m3?: number | undefined;
}, {
    name?: string | undefined;
    properties?: Record<string, any> | undefined;
    description?: string | undefined;
    category?: "food_packaging" | "plastics" | "metals" | "foam" | "textiles" | "composites" | "eva_waste" | "structural_elements" | "bubble_wrap" | "nitrile_gloves" | "other" | undefined;
    composition?: Record<string, any> | undefined;
    density_kg_per_m3?: number | undefined;
}>;
