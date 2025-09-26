import { z } from 'zod';
export declare const createMissionSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    crew_size: z.ZodDefault<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    landing_date: z.ZodOptional<z.ZodString>;
    landing_site: z.ZodDefault<z.ZodString>;
    launch_date: z.ZodOptional<z.ZodString>;
    mission_duration_days: z.ZodDefault<z.ZodNumber>;
    name: z.ZodString;
    return_date: z.ZodOptional<z.ZodString>;
    settings: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    status: z.ZodDefault<z.ZodEnum<["planning", "active", "completed", "aborted"]>>;
}, "strip", z.ZodTypeAny, {
    status: "aborted" | "active" | "completed" | "planning";
    name: string;
    crew_size: number;
    landing_site: string;
    mission_duration_days: number;
    description?: string | undefined;
    settings?: Record<string, any> | undefined;
    landing_date?: string | undefined;
    launch_date?: string | undefined;
    return_date?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
    status?: "aborted" | "active" | "completed" | "planning" | undefined;
    settings?: Record<string, any> | undefined;
    crew_size?: number | undefined;
    landing_date?: string | undefined;
    landing_site?: string | undefined;
    launch_date?: string | undefined;
    mission_duration_days?: number | undefined;
    return_date?: string | undefined;
}>, {
    status: "aborted" | "active" | "completed" | "planning";
    name: string;
    crew_size: number;
    landing_site: string;
    mission_duration_days: number;
    description?: string | undefined;
    settings?: Record<string, any> | undefined;
    landing_date?: string | undefined;
    launch_date?: string | undefined;
    return_date?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
    status?: "aborted" | "active" | "completed" | "planning" | undefined;
    settings?: Record<string, any> | undefined;
    crew_size?: number | undefined;
    landing_date?: string | undefined;
    landing_site?: string | undefined;
    launch_date?: string | undefined;
    mission_duration_days?: number | undefined;
    return_date?: string | undefined;
}>, {
    status: "aborted" | "active" | "completed" | "planning";
    name: string;
    crew_size: number;
    landing_site: string;
    mission_duration_days: number;
    description?: string | undefined;
    settings?: Record<string, any> | undefined;
    landing_date?: string | undefined;
    launch_date?: string | undefined;
    return_date?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
    status?: "aborted" | "active" | "completed" | "planning" | undefined;
    settings?: Record<string, any> | undefined;
    crew_size?: number | undefined;
    landing_date?: string | undefined;
    landing_site?: string | undefined;
    launch_date?: string | undefined;
    mission_duration_days?: number | undefined;
    return_date?: string | undefined;
}>;
export declare const updateMissionSchema: z.ZodObject<{
    crew_size: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    landing_date: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    landing_site: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    launch_date: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    mission_duration_days: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    name: z.ZodOptional<z.ZodString>;
    return_date: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    settings: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["planning", "active", "completed", "aborted"]>>>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    status?: "aborted" | "active" | "completed" | "planning" | undefined;
    name?: string | undefined;
    settings?: Record<string, any> | undefined;
    crew_size?: number | undefined;
    landing_date?: string | undefined;
    landing_site?: string | undefined;
    launch_date?: string | undefined;
    mission_duration_days?: number | undefined;
    return_date?: string | undefined;
}, {
    description?: string | undefined;
    status?: "aborted" | "active" | "completed" | "planning" | undefined;
    name?: string | undefined;
    settings?: Record<string, any> | undefined;
    crew_size?: number | undefined;
    landing_date?: string | undefined;
    landing_site?: string | undefined;
    launch_date?: string | undefined;
    mission_duration_days?: number | undefined;
    return_date?: string | undefined;
}>;
export declare const assignCrewSchema: z.ZodObject<{
    role: z.ZodEnum<["admin", "mission_commander", "crew_member", "engineer", "scientist"]>;
    specialization: z.ZodOptional<z.ZodString>;
    user_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    role: "admin" | "engineer" | "scientist" | "mission_commander" | "crew_member";
    user_id: string;
    specialization?: string | undefined;
}, {
    role: "admin" | "engineer" | "scientist" | "mission_commander" | "crew_member";
    user_id: string;
    specialization?: string | undefined;
}>;
export declare const updateMissionStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["planning", "active", "completed", "aborted"]>;
}, "strip", z.ZodTypeAny, {
    status: "aborted" | "active" | "completed" | "planning";
}, {
    status: "aborted" | "active" | "completed" | "planning";
}>;
