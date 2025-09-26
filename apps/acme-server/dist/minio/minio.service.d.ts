import type { Readable } from 'node:stream';
import { ConfigService } from '@nestjs/config';
import { type WinstonLogger } from 'nest-winston';
export declare class MinioService {
    private readonly config;
    private readonly logger;
    private readonly s3;
    private readonly bucket;
    constructor(config: ConfigService, logger: WinstonLogger);
    ensureBucketExists(): Promise<void>;
    uploadFile(key: string, body: Buffer, contentType: string): Promise<string | undefined>;
    getFile(key: string): Promise<Readable | undefined>;
}
