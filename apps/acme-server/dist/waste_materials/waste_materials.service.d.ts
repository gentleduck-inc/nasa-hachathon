import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '~/drizzle';
import { CreateWasteMaterialDto, UpdateWasteMaterialDto } from './waste_materials.types';
export declare class WasteMaterialsService {
    private db;
    constructor(db: NodePgDatabase<typeof schema>);
    createWasteMaterial(data: CreateWasteMaterialDto): Promise<any>;
    getWasteMaterials(): Promise<any>;
    getWasteMaterialById(id: string): Promise<any>;
    updateWasteMaterial(data: UpdateWasteMaterialDto & {
        id: string;
    }): Promise<any>;
    deleteWasteMaterial(id: string): Promise<{
        id: any;
    } | undefined>;
}
