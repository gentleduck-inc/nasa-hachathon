import { MissionsMessages } from './missions.constants';
export type MissionsMessagesType = (typeof MissionsMessages)[number];
declare const CreateMissionDto_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodEffectsDef<import("zod").ZodEffects<import("zod").ZodObject<{
    crew_size: import("zod").ZodDefault<import("zod").ZodNumber>;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    landing_date: import("zod").ZodOptional<import("zod").ZodString>;
    landing_site: import("zod").ZodDefault<import("zod").ZodString>;
    launch_date: import("zod").ZodOptional<import("zod").ZodString>;
    mission_duration_days: import("zod").ZodDefault<import("zod").ZodNumber>;
    name: import("zod").ZodString;
    return_date: import("zod").ZodOptional<import("zod").ZodString>;
    settings: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>;
    status: import("zod").ZodDefault<import("zod").ZodEnum<["planning", "active", "completed", "aborted"]>>;
}, "strip", import("zod").ZodTypeAny, {
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
}>>, {
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
export declare class CreateMissionDto extends CreateMissionDto_base {
}
declare const UpdateMissionDto_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodObjectDef<{
    crew_size: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
    description: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodString>>;
    landing_date: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodString>>;
    landing_site: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodString>>;
    launch_date: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodString>>;
    mission_duration_days: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
    name: import("zod").ZodOptional<import("zod").ZodString>;
    return_date: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodString>>;
    settings: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>>;
    status: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEnum<["planning", "active", "completed", "aborted"]>>>;
}, "strip", import("zod").ZodTypeAny>, {
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
export declare class UpdateMissionDto extends UpdateMissionDto_base {
}
declare const AssignCrewDto_base: import("nestjs-zod").ZodDto<{
    role: "admin" | "engineer" | "scientist" | "mission_commander" | "crew_member";
    user_id: string;
    specialization?: string | undefined;
}, import("zod").ZodObjectDef<{
    role: import("zod").ZodEnum<["admin", "mission_commander", "crew_member", "engineer", "scientist"]>;
    specialization: import("zod").ZodOptional<import("zod").ZodString>;
    user_id: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    role: "admin" | "engineer" | "scientist" | "mission_commander" | "crew_member";
    user_id: string;
    specialization?: string | undefined;
}>;
export declare class AssignCrewDto extends AssignCrewDto_base {
}
declare const UpdateMissionStatusDto_base: import("nestjs-zod").ZodDto<{
    status: "aborted" | "active" | "completed" | "planning";
}, import("zod").ZodObjectDef<{
    status: import("zod").ZodEnum<["planning", "active", "completed", "aborted"]>;
}, "strip", import("zod").ZodTypeAny>, {
    status: "aborted" | "active" | "completed" | "planning";
}>;
export declare class UpdateMissionStatusDto extends UpdateMissionStatusDto_base {
}
export interface MissionWithCrew {
    id: string;
    name: string;
    description?: string;
    status: string;
    crew_size: number;
    mission_duration_days: number;
    landing_site: string;
    launch_date?: Date;
    landing_date?: Date;
    return_date?: Date;
    settings?: Record<string, any>;
    created_at: Date;
    updated_at: Date;
    version: number;
    crew: Array<{
        user_id: string;
        role: string;
        specialization?: string;
        assigned_at: Date;
        user: {
            id: string;
            first_name: string;
            last_name: string;
            email: string;
            role: string;
        };
    }>;
    created_by_user: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
    };
}
export interface MissionStatistics {
    total_simulations: number;
    active_simulations: number;
    completed_simulations: number;
    total_products_created: number;
    total_waste_processed_kg: number;
    total_energy_consumed_kwh: number;
    average_efficiency_score: number;
    crew_utilization_hours: number;
}
export interface MissionTimeline {
    events: Array<{
        date: Date;
        event_type: 'launch' | 'landing' | 'milestone' | 'simulation' | 'crew_change';
        title: string;
        description?: string;
        metadata?: Record<string, any>;
    }>;
}
export {};
