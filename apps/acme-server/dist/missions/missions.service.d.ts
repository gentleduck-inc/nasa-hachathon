import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '~/drizzle';
import { AssignCrewDto, CreateMissionDto, MissionStatistics, MissionTimeline, MissionWithCrew, UpdateMissionDto, UpdateMissionStatusDto } from './missions.types';
export declare class MissionsService {
    private db;
    constructor(db: NodePgDatabase<typeof schema>);
    createMission(data: CreateMissionDto, createdBy: string): Promise<any>;
    getMissions(): Promise<any>;
    getMissionById(id: string): Promise<MissionWithCrew | undefined>;
    updateMission(data: UpdateMissionDto & {
        id: string;
    }): Promise<any>;
    deleteMission(id: string): Promise<{
        id: any;
    } | undefined>;
    updateMissionStatus(id: string, data: UpdateMissionStatusDto): Promise<any>;
    assignCrew(missionId: string, data: AssignCrewDto): Promise<any>;
    removeCrew(missionId: string, userId: string): Promise<{
        id: any;
    } | undefined>;
    getMissionStatistics(id: string): Promise<MissionStatistics | undefined>;
    getMissionTimeline(id: string): Promise<MissionTimeline | undefined>;
}
