import type { ResponseType } from '~/common/types';
import { WasteMaterialsService } from './waste_materials.service';
import { CreateWasteMaterialDto, UpdateWasteMaterialDto } from './waste_materials.types';
export declare class WasteMaterialsController {
    private readonly wasteMaterialsService;
    constructor(wasteMaterialsService: WasteMaterialsService);
    createWasteMaterial(body: CreateWasteMaterialDto): Promise<ResponseType<Awaited<ReturnType<typeof this.wasteMaterialsService.createWasteMaterial>>, any>>;
    getWasteMaterials(): Promise<{
        data: any;
        message: string;
        state: string;
    }>;
    getWasteMaterialById(id: string): Promise<{
        data: any;
        message: string;
        state: string;
    }>;
    updateWasteMaterial(id: string, body: UpdateWasteMaterialDto): Promise<{
        data: any;
        message: string;
        state: string;
    }>;
    deleteWasteMaterial(id: string): Promise<{
        data: {
            id: any;
        } | undefined;
        message: string;
        state: string;
    }>;
}
