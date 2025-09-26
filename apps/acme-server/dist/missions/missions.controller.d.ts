import type { ResponseType } from '~/common/types';
import { MissionsService } from './missions.service';
import { AssignCrewDto, CreateMissionDto, UpdateMissionDto, UpdateMissionStatusDto } from './missions.types';
export declare class MissionsController {
    private readonly missionsService;
    constructor(missionsService: MissionsService);
    createMission(body: CreateMissionDto, req: any): Promise<ResponseType<Awaited<ReturnType<typeof this.missionsService.createMission>>, any>>;
    getMissions(): Promise<{
        data: any;
        message: string;
        state: string;
    }>;
    getMissionById(id: string): Promise<{
        data: import("./missions.types").MissionWithCrew | undefined;
        message: string;
        state: string;
    }>;
    updateMission(id: string, body: UpdateMissionDto): Promise<{
        data: any;
        message: string;
        state: string;
    }>;
    deleteMission(id: string): Promise<{
        data: {
            id: any;
        } | undefined;
        message: string;
        state: string;
    }>;
    updateMissionStatus(id: string, body: UpdateMissionStatusDto): Promise<{
        data: any;
        message: string;
        state: string;
    }>;
    assignCrew(missionId: string, body: AssignCrewDto): Promise<{
        data: any;
        message: string;
        state: string;
    }>;
    removeCrew(missionId: string, userId: string): Promise<{
        data: {
            id: any;
        } | undefined;
        message: string;
        state: string;
    }>;
    getMissionStatistics(id: string): Promise<{
        data: import("./missions.types").MissionStatistics | undefined;
        message: string;
        state: string;
    }>;
    getMissionTimeline(id: string): Promise<{
        data: import("./missions.types").MissionTimeline | undefined;
        message: string;
        state: string;
    }>;
}
