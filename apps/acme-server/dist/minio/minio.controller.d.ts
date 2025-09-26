import type { Response } from 'express';
import type { ResponseType } from '~/common/types';
import type { MinioMessage } from './minio.constants';
import { MinioService } from './minio.service';
export declare class MinioController {
    private readonly minioService;
    constructor(minioService: MinioService);
    upload(file: any): Promise<ResponseType<Awaited<ReturnType<typeof this.minioService.uploadFile>>, typeof MinioMessage>>;
    download(filename: string, res: Response): Promise<void>;
}
